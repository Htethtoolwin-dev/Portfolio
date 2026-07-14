import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";

import cardGLB from "../../assets/lanyard/card.glb";
import lanyardTex from "../../assets/lanyard/lanyard.png";

extend({ MeshLineGeometry, MeshLineMaterial });

const BLANK_PIXEL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

const CARD_SCALE = 2.55;
const LANYARD_WIDTH = 1;
const FRONT_FACE_TOP_INSET = 0.08;

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  theme = "dark",
  frontImage = null,
  backImage = null,
  imageFit = "cover",
}) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();
  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(cardGLB);
  const lanyardMap = useTexture(lanyardTex);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability -- three.js texture wrap mode
    lanyardMap.wrapS = THREE.RepeatWrapping;
    lanyardMap.wrapT = THREE.RepeatWrapping;
  }, [lanyardMap]);

  const metalColor = theme === "dark" ? "#e5e5e5" : "#1a1a1a";
  const metalMaterial = useMemo(() => {
    const mat = materials.metal.clone();
    mat.color = new THREE.Color(metalColor);
    mat.metalness = theme === "dark" ? 0.9 : 0.85;
    mat.roughness = 0.25;
    return mat;
  }, [materials.metal, metalColor, theme]);

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return baseMap;

    ctx.drawImage(baseImg, 0, 0, W, H);

    const drawFitted = (img, rect, { topInset = 0 } = {}) => {
      const rx = rect.x * W;
      const ry = rect.y * H + rect.h * H * topInset;
      const rw = rect.w * W;
      const rh = rect.h * H * (1 - topInset);
      const pick = imageFit === "contain" ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex.image) {
      drawFitted(frontTex.image, FRONT_UV_RECT, { topInset: FRONT_FACE_TOP_INSET });
    }
    if (backImage && backTex.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);

  const [curve] = useState(() => {
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    path.curveType = "chordal";
    return path;
  });
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      const j3Pos = j3.current.translation();
      curve.points[0].set(j3Pos.x, j3Pos.y + 1.4, j3Pos.z);
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current?.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={CARD_SCALE}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => {
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation()))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                map-anisotropy={16}
                clearcoat={isMobile ? 0 : 1}
                clearcoatRoughness={theme === "dark" ? 0.15 : 0.1}
                roughness={theme === "dark" ? 0.9 : 0.85}
                metalness={theme === "dark" ? 0.8 : 0.75}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={metalMaterial} />
            <mesh geometry={nodes.clamp.geometry} material={metalMaterial} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#ffffff"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={lanyardMap}
          repeat={[-4, 1]}
          lineWidth={LANYARD_WIDTH}
        />
      </mesh>
    </>
  );
}

function LanyardScene({
  theme = "dark",
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = "cover",
  isMobile = false,
}) {
  const ambientIntensity = theme === "dark" ? Math.PI : Math.PI * 1.4;
  const envIntensity = theme === "dark" ? 1 : 1.35;
  const lightColor = theme === "dark" ? "white" : "#fafafa";

  return (
    <Canvas
      camera={{ position, fov }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ alpha: transparent, antialias: true }}
      onCreated={({ gl }) =>
        gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
      }
    >
      <ambientLight intensity={ambientIntensity} color={lightColor} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={theme === "dark" ? 0.6 : 1.1}
        color={lightColor}
      />
      <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
        <Band
          isMobile={isMobile}
          theme={theme}
          frontImage={frontImage}
          backImage={backImage}
          imageFit={imageFit}
        />
      </Physics>
      <Environment blur={0.75} intensity={envIntensity}>
        <Lightformer intensity={theme === "dark" ? 2 : 3} color={lightColor} position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={theme === "dark" ? 3 : 4} color={lightColor} position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={theme === "dark" ? 3 : 4} color={lightColor} position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={theme === "dark" ? 10 : 12} color={lightColor} position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>
  );
}

export default function Lanyard({
  theme = "dark",
  frontImage = null,
  backImage = null,
  className = "",
}) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`relative z-0 flex h-[min(82vh,720px)] w-full min-h-[500px] items-center justify-center ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-60"
        style={{
          background:
            theme === "dark"
              ? "radial-gradient(circle at 50% 40%, rgba(99,102,241,0.12), transparent 70%)"
              : "radial-gradient(circle at 50% 40%, rgba(0,0,0,0.04), transparent 70%)",
        }}
      />
      <Suspense
        fallback={
          <div className="h-56 w-40 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]" />
        }
      >
        <LanyardScene
          key={theme}
          theme={theme}
          isMobile={isMobile}
          frontImage={frontImage}
          backImage={backImage}
          imageFit="cover"
        />
      </Suspense>
      <p className="pointer-events-none absolute bottom-2 text-xs text-[var(--text-muted)]">
        Drag the card to interact
      </p>
    </div>
  );
}

useGLTF.preload(cardGLB);

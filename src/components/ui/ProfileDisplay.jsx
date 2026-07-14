import { useEffect, useState } from "react";
import { personal } from "../../data/personal";
import { scrollToSection } from "../../utils/scrollTo";
import ProfileCard from "./ProfileCard";

function getEnableTilt() {
  if (typeof window === "undefined") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (window.matchMedia("(hover: none)").matches) return false;
  return true;
}

export default function ProfileDisplay() {
  const [enableTilt, setEnableTilt] = useState(getEnableTilt);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnableTilt(!media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div className="relative mx-auto flex w-full max-w-[min(92vw,22rem)] touch-pan-y justify-center sm:max-w-[min(100%,400px)] lg:mx-0 lg:max-w-[420px] lg:justify-end">
      <div className="pointer-events-none absolute -inset-8 rounded-[2.5rem] bg-indigo-500/15 blur-3xl" />
      <ProfileCard
        className="relative w-full"
        name={personal.name}
        title={personal.role}
        handle={personal.handle}
        status="Open to work"
        avatarUrl={personal.profileCardImage}
        miniAvatarUrl={personal.profileCardImage}
        showHoloPattern={false}
        contactText="Contact Me"
        showUserInfo
        enableTilt={enableTilt}
        enableMobileTilt={false}
        behindGlowEnabled
        behindGlowColor="rgba(99, 102, 241, 0.35)"
        behindGlowSize="50%"
        maxHeight={540}
        onContactClick={() => scrollToSection("#contact")}
      />
    </div>
  );
}

import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  as: Component = "div",
  ...props
}) {
  const { ref, visible } = useScrollReveal();

  return (
    <Component
      ref={ref}
      className={`reveal reveal-${direction} ${visible ? "reveal-visible" : ""} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  );
}

export default function GradientText({ children, className = "", as: Component = "span" }) {
  return (
    <Component
      className={`bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent)] to-violet-400 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-text ${className}`.trim()}
    >
      {children}
    </Component>
  );
}

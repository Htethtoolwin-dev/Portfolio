import Reveal from "./Reveal";

export default function SectionHeading({ title, subtitle }) {
  return (
    <Reveal className="mb-8 text-center sm:mb-12">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl px-1 text-sm text-[var(--text-muted)] sm:mt-4 sm:px-0 sm:text-base">
          {subtitle}
        </p>
      )}
      <div className="mx-auto mt-4 h-1 w-12 overflow-hidden rounded-full bg-[var(--border)]">
        <div className="h-full w-full origin-left rounded-full bg-gradient-to-r from-[var(--accent)] to-violet-400 animate-shimmer-line" />
      </div>
    </Reveal>
  );
}

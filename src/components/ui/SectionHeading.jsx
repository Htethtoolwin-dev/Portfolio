export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-8 text-center sm:mb-12">
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl px-1 text-sm text-[var(--text-muted)] sm:mt-4 sm:px-0 sm:text-base">{subtitle}</p>
      )}
      <div className="mx-auto mt-4 h-1 w-12 rounded-full bg-[var(--accent)]" />
    </div>
  );
}

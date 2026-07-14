export default function SkillBadge({ children }) {
  return (
    <span className="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-1.5 text-sm font-medium text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-md hover:shadow-indigo-500/10">
      {children}
    </span>
  );
}

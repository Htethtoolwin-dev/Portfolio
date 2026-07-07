export default function SkillBadge({ children }) {
  return (
    <span className="rounded-lg border border-[var(--border)] bg-[var(--bg-primary)] px-3 py-1.5 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]">
      {children}
    </span>
  );
}

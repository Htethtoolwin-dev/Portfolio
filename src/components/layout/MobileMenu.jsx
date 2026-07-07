import { X } from "lucide-react";
import { navLinks } from "../../data/nav";
import { scrollToSection } from "../../utils/scrollTo";

export default function MobileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;
  const handleClick = (href) => { scrollToSection(href); onClose(); };

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <nav className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-[var(--border)] bg-[var(--bg-primary)] p-4 shadow-2xl sm:p-6 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]" aria-label="Mobile navigation">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={onClose} aria-label="Close menu" className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <X size={22} />
          </button>
        </div>
        <ul className="mt-6 flex flex-col gap-1 sm:mt-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button onClick={() => handleClick(link.href)} className="flex min-h-12 w-full items-center rounded-lg px-4 text-left text-base text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--accent)]">
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

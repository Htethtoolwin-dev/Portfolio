import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { personal } from "../../data/personal";
import { navLinks } from "../../data/nav";
import { scrollToSection } from "../../utils/scrollTo";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import ThemeToggle from "../ui/ThemeToggle";
import MobileMenu from "./MobileMenu";

export default function Header({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useBodyScrollLock(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b pt-[env(safe-area-inset-top)] backdrop-blur-md transition-all duration-300 ${
          scrolled
            ? "border-[var(--border)] bg-[var(--bg-primary)]/92 shadow-lg shadow-indigo-500/5"
            : "border-transparent bg-[var(--bg-primary)]/70"
        }`}
      >
        <div className="page-container flex items-center justify-between py-3 sm:py-4">
          <button
            onClick={() => scrollToSection("#home")}
            className="group min-h-11 py-2 text-base font-semibold tracking-tight transition-colors hover:text-[var(--accent)] sm:text-lg"
          >
            {personal.name.split(" ")[0]}
            <span className="text-[var(--accent)] transition-transform duration-300 group-hover:scale-125 inline-block">
              .
            </span>
          </button>
          <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="group relative min-h-11 px-1 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition-all duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] md:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

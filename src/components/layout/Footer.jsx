import { ArrowUp, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "../ui/SocialIcons";
import { personal } from "../../data/personal";
import { scrollToSection } from "../../utils/scrollTo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-secondary)] pb-[env(safe-area-inset-bottom)]">
      <div className="page-container flex flex-col items-center gap-6 py-8 text-center sm:py-10 md:flex-row md:justify-between md:text-left">
        <p className="max-w-xs text-xs text-[var(--text-muted)] sm:max-w-none sm:text-sm">&copy; {year} {personal.name}. All rights reserved.</p>
        <div className="flex items-center gap-5">
          {personal.social.github && (
            <a href={personal.social.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="flex min-h-11 min-w-11 items-center justify-center text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]">
              <GitHubIcon size={20} />
            </a>
          )}
          {personal.social.linkedin && (
            <a href={personal.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex min-h-11 min-w-11 items-center justify-center text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]">
              <LinkedInIcon size={20} />
            </a>
          )}
          <a href={`mailto:${personal.email}`} aria-label="Email" className="flex min-h-11 min-w-11 items-center justify-center text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]">
            <Mail size={20} />
          </a>
        </div>
        <button onClick={() => scrollToSection("#home")} className="inline-flex min-h-11 items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--accent)]">
          <ArrowUp size={16} /> Back to top
        </button>
      </div>
    </footer>
  );
}

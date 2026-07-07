import { Download, MapPin } from "lucide-react";
import { personal } from "../../data/personal";
import SectionHeading from "../ui/SectionHeading";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 py-16 sm:py-24">
      <div className="page-container">
        <SectionHeading title="About Me" subtitle="A little bit about my background and what drives me." />
        <div className="grid items-start gap-12 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-3">
            {personal.bio.map((paragraph, index) => (
              <p key={index} className="max-w-prose leading-relaxed text-[var(--text-muted)]">{paragraph}</p>
            ))}
            <div className="flex items-center gap-2 pt-2 text-sm text-[var(--text-muted)]">
              <MapPin size={16} className="text-[var(--accent)]" /> {personal.location}
            </div>
            <div className="pt-4">
              <a href={personal.resumeUrl} download={personal.resumeFileName} aria-label="Download CV as PDF" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] sm:px-6">
                <Download size={16} /> Download CV
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-2">
            {personal.highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-4 text-center sm:p-6">
                <p className="text-xl font-bold text-[var(--accent)] sm:text-2xl">{item.value}</p>
                <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

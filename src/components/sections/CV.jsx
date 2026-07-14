import { Download, ExternalLink } from "lucide-react";
import { personal } from "../../data/personal";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import LazyIframe from "../ui/LazyIframe";

const actionClass =
  "btn-shine inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-secondary)] sm:w-auto sm:px-6";

export default function CV() {
  return (
    <section
      id="cv"
      className="scroll-mt-20 bg-[var(--bg-secondary)] py-16 sm:py-24"
    >
      <div className="page-container">
        <SectionHeading
          title="Htet Htoo Lwin's CV"
          subtitle="View my resume online or download a PDF copy."
        />

        <Reveal className="mx-auto max-w-4xl" delay={100}>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <a
              href={personal.resumeUrl}
              download={personal.resumeFileName}
              className={`${actionClass} bg-[var(--accent)] text-white shadow-lg shadow-indigo-500/25 hover:bg-[var(--accent-hover)] hover:shadow-indigo-500/35`}
            >
              <Download size={16} />
              Download PDF
            </a>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${actionClass} border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]`}
            >
              <ExternalLink size={16} />
              Open in New Tab
            </a>
          </div>

          <div className="card-hover-lift overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] shadow-lg">
            <LazyIframe
              src={personal.resumeUrl}
              title={`${personal.name} - Curriculum Vitae`}
              placeholderClassName="w-full"
              className="h-[50vh] min-h-[280px] w-full sm:h-[58vh] sm:min-h-[360px] lg:h-[70vh] lg:min-h-[480px]"
            />
          </div>

          <p className="mt-4 text-center text-sm text-[var(--text-muted)]">
            If the preview does not load, use{" "}
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              Open in New Tab
            </a>{" "}
            or{" "}
            <a
              href={personal.resumeUrl}
              download={personal.resumeFileName}
              className="text-[var(--accent)] hover:underline"
            >
              Download PDF
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Download,
  MapPin,
  Terminal,
} from "lucide-react";
import { personal } from "../../data/personal";
import { scrollToSection } from "../../utils/scrollTo";
import Button from "../ui/Button";

const stack = ["TypeScript", "React", "Next.js", "PostgreSQL"];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center overflow-hidden scroll-mt-20 pt-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-indigo-500/10 blur-[130px]" />
        <div className="absolute -right-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-violet-500/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 65%, transparent 100%)",
          }}
        />
      </div>

      <div className="page-container relative py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-24">
          <div className="min-w-0">
            <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)]/80 px-3.5 py-2 font-mono text-xs text-[var(--text-muted)] backdrop-blur-md">
              <Terminal size={14} className="text-[var(--accent)]" />
              <span className="text-[var(--accent)]">~/portfolio</span>
              <span aria-hidden="true">$</span>
              <span>open_to_work</span>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            </div>

            <p className="animate-fade-in-up animate-delay-100 mt-7 font-mono text-sm font-medium text-[var(--accent)]">
              Hello, I&apos;m {personal.name}.
            </p>

            <h1 className="animate-fade-in-up animate-delay-200 mt-3 max-w-3xl text-[clamp(2.8rem,5.5vw,4.75rem)] font-bold leading-[0.98] tracking-[-0.05em] text-[var(--text-primary)]">
              Building software that feels
              <span className="relative ml-[0.18em] inline-block text-[var(--accent)]">
                effortless.
                <span className="absolute inset-x-0 -bottom-1 h-1 rounded-full bg-[var(--accent)]/25" />
              </span>
            </h1>

            <p className="animate-fade-in-up animate-delay-300 mt-5 max-w-xl text-base leading-relaxed text-[var(--text-muted)] sm:text-lg">
              {personal.role} focused on thoughtful web and mobile products,
              from intuitive interfaces to reliable backend systems.
            </p>

            <div className="animate-fade-in-up animate-delay-400 mt-7 flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={() => scrollToSection("#projects")}
                className="group w-full sm:w-auto"
              >
                Explore my work
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Button>
              <a
                href={personal.resumeUrl}
                download={personal.resumeFileName}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] sm:w-auto sm:px-6"
              >
                <Download size={17} />
                Download CV
              </a>
            </div>

            <div className="animate-fade-in-up animate-delay-500 mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[var(--text-muted)]">
              <span className="inline-flex items-center gap-2">
                <MapPin size={15} className="text-[var(--accent)]" />
                {personal.location}
              </span>
              <span className="h-1 w-1 rounded-full bg-[var(--border)]" />
              <a
                href={`mailto:${personal.email}`}
                className="transition-colors hover:text-[var(--accent)]"
              >
                {personal.email}
              </a>
            </div>
          </div>

          <div className="animate-fade-in-up animate-delay-300 relative mx-auto w-full max-w-xl lg:mx-0">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-indigo-500/15 via-transparent to-violet-500/15 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]/95 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
                  <Code2 size={13} /> developer.ts
                </div>
                <span className="w-12" aria-hidden="true" />
              </div>

              <div className="overflow-x-auto px-5 py-6 font-mono text-[13px] leading-7 sm:px-7 sm:py-8 sm:text-sm">
                <div>
                  <span className="text-violet-400">const</span>{" "}
                  <span className="text-sky-400">developer</span>{" "}
                  <span className="text-[var(--text-muted)]">=</span>{" "}
                  <span className="text-amber-300">&#123;</span>
                </div>
                <div className="pl-5">
                  <span className="text-indigo-400">name</span>
                  <span className="text-[var(--text-muted)]">: </span>
                  <span className="text-emerald-400">&quot;{personal.name}&quot;</span>
                  <span className="text-[var(--text-muted)]">,</span>
                </div>
                <div className="pl-5">
                  <span className="text-indigo-400">role</span>
                  <span className="text-[var(--text-muted)]">: </span>
                  <span className="text-emerald-400">&quot;{personal.role}&quot;</span>
                  <span className="text-[var(--text-muted)]">,</span>
                </div>
                <div className="pl-5">
                  <span className="text-indigo-400">stack</span>
                  <span className="text-[var(--text-muted)]">: [</span>
                </div>
                <div className="flex flex-wrap gap-x-2 pl-10">
                  {stack.map((item, index) => (
                    <span key={item}>
                      <span className="text-emerald-400">&quot;{item}&quot;</span>
                      {index < stack.length - 1 && (
                        <span className="text-[var(--text-muted)]">,</span>
                      )}
                    </span>
                  ))}
                </div>
                <div className="pl-5 text-[var(--text-muted)]">],</div>
                <div className="pl-5">
                  <span className="text-indigo-400">focus</span>
                  <span className="text-[var(--text-muted)]">: </span>
                  <span className="text-emerald-400">&quot;Web + Mobile&quot;</span>
                  <span className="text-[var(--text-muted)]">,</span>
                </div>
                <div className="pl-5">
                  <span className="text-indigo-400">available</span>
                  <span className="text-[var(--text-muted)]">: </span>
                  <span className="text-orange-400">true</span>
                </div>
                <div>
                  <span className="text-amber-300">&#125;</span>
                  <span className="text-[var(--text-muted)]">;</span>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-[var(--border)] bg-[var(--bg-primary)]/40 px-5 py-4 font-mono text-xs sm:px-7">
                <span className="text-[var(--accent)]">$</span>
                <span className="text-[var(--text-muted)]">npm run build</span>
                <span className="ml-auto text-emerald-400">✓ ready to ship</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("#about")}
        aria-label="Scroll to about section"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 animate-bounce text-[var(--text-muted)] transition-colors hover:text-[var(--accent)] xl:block"
      >
        <ArrowDown size={22} />
      </button>
    </section>
  );
}

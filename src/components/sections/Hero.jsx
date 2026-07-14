import { ArrowDown, Sparkles } from "lucide-react";
import { personal } from "../../data/personal";
import { scrollToSection } from "../../utils/scrollTo";
import Button from "../ui/Button";
import GradientText from "../ui/GradientText";
import ProfileDisplay from "../ui/ProfileDisplay";

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100dvh] items-center scroll-mt-20 overflow-hidden pt-16 sm:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl animate-mesh-drift dark:bg-indigo-500/20 sm:h-96 sm:w-96" />
        <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-violet-500/12 blur-3xl animate-mesh-drift-reverse dark:bg-violet-500/18 sm:h-[28rem] sm:w-[28rem]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl animate-glow-pulse sm:h-80 sm:w-80" />
        <div
          className="absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--accent) 18%, transparent) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="page-container relative grid items-center gap-10 py-12 sm:gap-12 sm:py-16 lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:py-20">
        <div className="order-2 min-w-0 text-center lg:order-1 lg:text-left">
          <p className="animate-fade-in-up mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)]/80 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[var(--accent)] backdrop-blur-sm sm:mb-4 sm:text-sm">
            <Sparkles size={14} className="shrink-0" />
            Hi, I&apos;m
          </p>
          <h1 className="animate-fade-in-up animate-delay-100 text-[clamp(1.875rem,8vw,3.75rem)] font-bold leading-tight tracking-tight">
            <GradientText as="span">{personal.name}</GradientText>
          </h1>
          <p className="animate-fade-in-up animate-delay-200 mt-3 text-lg font-medium sm:mt-4 sm:text-2xl md:text-3xl">
            <span className="text-[var(--text-muted)]">I build as a </span>
            <GradientText as="span">{personal.role}</GradientText>
          </p>
          <p className="animate-fade-in-up animate-delay-300 mx-auto mt-4 max-w-lg text-base leading-relaxed text-[var(--text-muted)] sm:mt-6 sm:text-lg lg:mx-0">
            {personal.tagline}
          </p>
          <div className="animate-fade-in-up animate-delay-400 mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start">
            <Button onClick={() => scrollToSection("#projects")} className="btn-shine w-full sm:w-auto">
              View My Work
            </Button>
            <Button variant="secondary" onClick={() => scrollToSection("#contact")} className="btn-shine w-full sm:w-auto">
              Contact Me
            </Button>
          </div>
        </div>

        <div className="animate-fade-in-up animate-delay-300 order-1 flex justify-center lg:order-2 lg:justify-end">
          <ProfileDisplay />
        </div>
      </div>

      <button
        onClick={() => scrollToSection("#about")}
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-[var(--text-muted)] transition-colors hover:text-[var(--accent)] sm:bottom-8 sm:block"
      >
        <ArrowDown size={24} />
      </button>
    </section>
  );
}

import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { personal } from "../../data/personal";
import { scrollToSection } from "../../utils/scrollTo";
import Button from "../ui/Button";

const avatarSizes = "h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-80 lg:w-80";

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const showProfileImage = personal.profileImage && !imageError;

  return (
    <section id="home" className="relative flex min-h-[100dvh] items-center scroll-mt-20 pt-16 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="page-container relative grid items-center gap-10 py-12 sm:gap-12 sm:py-16 lg:grid-cols-2 lg:gap-16 xl:gap-24 lg:py-20">
        <div className="order-2 min-w-0 text-center lg:order-1 lg:text-left">
          <p className="animate-fade-in-up mb-3 text-xs font-medium uppercase tracking-widest text-[var(--accent)] sm:mb-4 sm:text-sm">Hi, I&apos;m</p>
          <h1 className="animate-fade-in-up animate-delay-100 text-[clamp(1.875rem,8vw,3.75rem)] font-bold leading-tight tracking-tight">{personal.name}</h1>
          <p className="animate-fade-in-up animate-delay-200 mt-3 text-lg font-medium text-[var(--text-muted)] sm:mt-4 sm:text-2xl md:text-3xl">{personal.role}</p>
          <p className="animate-fade-in-up animate-delay-300 mx-auto mt-4 max-w-lg text-base leading-relaxed text-[var(--text-muted)] sm:mt-6 sm:text-lg lg:mx-0">{personal.tagline}</p>
          <div className="animate-fade-in-up animate-delay-300 mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start">
            <Button onClick={() => scrollToSection("#projects")} className="w-full sm:w-auto">View My Work</Button>
            <Button variant="secondary" onClick={() => scrollToSection("#contact")} className="w-full sm:w-auto">Contact Me</Button>
          </div>
        </div>

        <div className="animate-fade-in-up animate-delay-200 order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative shrink-0">
            <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-500/30 blur-2xl sm:-inset-4" />
            {showProfileImage ? (
              <img
                src={personal.profileImage}
                alt={`Portrait of ${personal.name}`}
                onError={() => setImageError(true)}
                className={`relative ${avatarSizes} rounded-full border-2 border-[var(--border)] object-cover object-[center_20%] shadow-lg`}
              />
            ) : (
              <div className={`relative flex items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--bg-secondary)] text-5xl font-bold text-[var(--accent)] sm:text-6xl md:text-7xl lg:text-8xl ${avatarSizes}`}>
                {personal.initials}
              </div>
            )}
          </div>
        </div>
      </div>

      <button onClick={() => scrollToSection("#about")} aria-label="Scroll to about section" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 animate-bounce text-[var(--text-muted)] transition-colors hover:text-[var(--accent)] sm:bottom-8 sm:block">
        <ArrowDown size={24} />
      </button>
    </section>
  );
}

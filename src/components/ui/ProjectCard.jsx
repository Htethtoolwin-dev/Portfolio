import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "./SocialIcons";

function ProjectLinks({ project, variant = "overlay" }) {
  if (!project.liveUrl && !project.githubUrl) return null;
  const overlayClass =
    "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-transform active:scale-95 sm:px-4 sm:text-sm";
  const inlineClass =
    "inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors active:scale-95 sm:text-sm";

  if (variant === "overlay") {
    return (
      <>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${overlayClass} bg-white text-gray-900 hover:scale-105`}
          >
            <ExternalLink size={16} /> Live Demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${overlayClass} border border-white/30 bg-white/10 text-white backdrop-blur hover:scale-105`}
          >
            <GitHubIcon size={16} /> Code
          </a>
        )}
      </>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${inlineClass} bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]`}
        >
          <ExternalLink size={16} /> Live Demo
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${inlineClass} border border-[var(--border)] bg-[var(--bg-primary)] text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]`}
        >
          <GitHubIcon size={16} /> Code
        </a>
      )}
    </div>
  );
}

export default function ProjectCard({ project }) {
  const [imageError, setImageError] = useState(false);
  const showImage = project.image && !imageError;

  return (
    <article className="group card-hover-lift flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] hover:border-[var(--accent)]">
      <div
        className={`relative flex h-40 shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br sm:h-48 ${project.gradient}`}
      >
        {showImage ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            onError={() => setImageError(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <span className="text-3xl font-bold text-white/90 transition-transform duration-500 group-hover:scale-110 sm:text-4xl">
            {project.title.charAt(0)}
          </span>
        )}
        <div className="absolute inset-0 hidden items-center justify-center gap-2 bg-black/60 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100 md:flex md:flex-wrap md:px-4">
          <ProjectLinks project={project} variant="overlay" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        <h3 className="text-lg font-semibold sm:text-xl">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
          {project.description}
        </p>
        <div className="mt-4 shrink-0 space-y-4">
          <div className="md:hidden">
            <ProjectLinks project={project} variant="inline" />
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-[var(--bg-primary)] px-2.5 py-1 text-xs font-medium text-[var(--accent)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

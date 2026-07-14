import { projects } from "../../data/projects";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../ui/ProjectCard";
import Reveal from "../ui/Reveal";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 py-16 sm:py-24">
      <div className="page-container">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of work I'm proud of — from concept to deployment."
        />
        <div className="grid items-stretch gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} className="h-full" delay={index * 100}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

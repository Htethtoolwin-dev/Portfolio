import { skills, skillCategories } from "../../data/skills";
import SectionHeading from "../ui/SectionHeading";
import SkillBadge from "../ui/SkillBadge";
import Reveal from "../ui/Reveal";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-20 overflow-hidden bg-[var(--bg-secondary)] py-16 sm:py-24"
    >
      <div className="pointer-events-none absolute -right-32 top-0 h-64 w-64 rounded-full bg-indigo-500/8 blur-3xl" />
      <div className="page-container relative">
        <SectionHeading
          title="Skills & Tools"
          subtitle="Technologies I work with to bring ideas to life."
        />
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Reveal key={category.key} delay={index * 100}>
              <div className="card-hover-lift min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-4 sm:p-6">
                <h3 className="mb-4 text-lg font-semibold">{category.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills[category.key].map((skill) => (
                    <SkillBadge key={skill}>{skill}</SkillBadge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

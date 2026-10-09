import { profileData } from "@/content/profile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DevPlaceholderBadge } from "@/components/ui/DevPlaceholderBadge";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container, Section, Heading, Link } from "@/components/primitives";

export function SelectedWork() {
  const { projects } = profileData;

  return (
    <Section id="work" spacing="md" bordered>
      <Container>
        <SectionLabel
          number="01"
          label="SELECTED WORK"
          title="Engineered Systems & Projects"
          description="Full-stack web applications and machine learning implementations. Focus on clear architectural boundaries, predictable data pipelines, and responsive clients."
        />

        <div className="space-y-16 sm:space-y-24">
          {projects.map((project, index) => (
            <FadeIn key={project.slug} delay={index * 0.08}>
              <article className="hairline-all bg-surface/50 p-6 sm:p-8 md:p-10 corner-ticks">
                {/* Meta header: Category, Year, Role, Dev Placeholder */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 hairline-b font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <span className="text-accent uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-text-muted">•</span>
                    <span className="text-text-secondary">{project.year}</span>
                    <DevPlaceholderBadge placeholder={project.placeholder} />
                  </div>
                  <span className="text-text-muted uppercase tracking-wider">
                    Role: {project.role}
                  </span>
                </div>

                {/* Main Heading & Tagline */}
                <div className="pt-6 pb-4">
                  <Heading as="h3" size="xl" className="mb-3">
                    {project.title}
                  </Heading>
                  <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-3xl">
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base text-text-muted leading-relaxed max-w-3xl mb-8">
                  {project.description}
                </p>

                {/* Problem vs Outcome: Editorial 2-column comparative block */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 sm:p-6 bg-surface-subtle hairline-all mb-8 text-xs sm:text-sm">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">
                      Constraint / Problem
                    </span>
                    <p className="text-text-secondary leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div className="md:hairline-l md:pl-6">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-accent block mb-2">
                      Engineered Outcome
                    </span>
                    <p className="text-text-secondary leading-relaxed">
                      {project.outcome}
                    </p>
                  </div>
                </div>

                {/* Architectural Highlights */}
                {project.highlights && project.highlights.length > 0 && (
                  <div className="mb-8">
                    <span className="font-mono text-xs uppercase tracking-wider text-text-muted block mb-3">
                      Key Highlights
                    </span>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight, hIdx) => (
                        <li
                          key={hIdx}
                          className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary"
                        >
                          <span className="text-accent select-none font-mono">
                            —
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies used */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 hairline-t">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-[11px] text-text-muted px-2.5 py-1 bg-surface-subtle hairline-all"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions: Conditionally render links ONLY if present */}
                  <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider">
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        variant="editorial"
                        external
                        showArrow
                      >
                        Live Demo
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        variant="mono"
                        external
                        showArrow
                      >
                        Source
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}

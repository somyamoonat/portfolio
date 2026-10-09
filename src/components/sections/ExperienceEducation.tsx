import { profileData } from "@/content/profile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DevPlaceholderBadge } from "@/components/ui/DevPlaceholderBadge";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container, Section, Heading } from "@/components/primitives";

export function ExperienceEducation() {
  const { experience, education, certifications, achievements } = profileData;

  return (
    <Section id="experience" spacing="md" bordered>
      <Container>
        <SectionLabel
          number="03"
          label="BACKGROUND"
          title="Experience & Education"
          description="Chronological record of software development, academic coursework, and technical milestones."
        />

        <div className="space-y-20">
          {/* Experience Sub-block */}
          <div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-text-muted pb-4 hairline-b mb-8">
              <span className="text-accent">[01]</span>
              <span className="text-text-primary">Professional & Project Experience</span>
            </div>

            <div className="divide-y divide-border-hairline">
              {experience.map((item, idx) => (
                <FadeIn key={idx} delay={idx * 0.05}>
                  <div className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-4 font-mono text-xs text-text-muted space-y-1">
                      <div className="text-text-primary font-medium">{item.period}</div>
                      {item.location && <div>{item.location}</div>}
                      <DevPlaceholderBadge placeholder={item.placeholder} className="mt-2" />
                    </div>

                    <div className="md:col-span-8 space-y-4">
                      <div>
                        <Heading as="h3" size="lg">
                          {item.role}
                        </Heading>
                        <div className="font-mono text-xs uppercase tracking-wider text-accent mt-1">
                          {item.organization}
                        </div>
                      </div>

                      <p className="text-sm text-text-secondary leading-relaxed">
                        {item.summary}
                      </p>

                      {item.bullets && item.bullets.length > 0 && (
                        <ul className="space-y-2 pt-2">
                          {item.bullets.map((bullet, bIdx) => (
                            <li
                              key={bIdx}
                              className="flex items-start gap-3 text-xs sm:text-sm text-text-muted"
                            >
                              <span className="text-accent font-mono select-none">—</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Education Sub-block */}
          <div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-text-muted pb-4 hairline-b mb-8">
              <span className="text-accent">[02]</span>
              <span className="text-text-primary">Education</span>
            </div>

            <div className="divide-y divide-border-hairline">
              {education.map((edu, idx) => (
                <FadeIn key={idx} delay={idx * 0.05}>
                  <div className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-4 font-mono text-xs text-text-muted space-y-1">
                      <div className="text-text-primary font-medium">{edu.period}</div>
                      {edu.location && <div>{edu.location}</div>}
                      <DevPlaceholderBadge placeholder={edu.placeholder} className="mt-2" />
                    </div>

                    <div className="md:col-span-8 space-y-2">
                      <Heading as="h3" size="lg">
                        {edu.degree}
                      </Heading>
                      <div className="font-mono text-xs uppercase tracking-wider text-text-secondary">
                        {edu.institution}
                      </div>
                      {edu.notes && (
                        <p className="text-xs sm:text-sm text-text-muted leading-relaxed pt-2">
                          {edu.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Certifications & Achievements Sub-blocks */}
          {(certifications.length > 0 || achievements.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
              {/* Certifications */}
              {certifications.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-text-muted pb-4 hairline-b mb-6">
                    <span className="text-accent">[03]</span>
                    <span className="text-text-primary">Certifications</span>
                  </div>
                  <ul className="space-y-6">
                    {certifications.map((cert, cIdx) => (
                      <li key={cIdx} className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-text-primary">
                            {cert.name}
                          </span>
                          <span className="font-mono text-xs text-text-muted">
                            {cert.year}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                          <span>{cert.issuer}</span>
                          <DevPlaceholderBadge placeholder={cert.placeholder} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Achievements */}
              {achievements.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-text-muted pb-4 hairline-b mb-6">
                    <span className="text-accent">[04]</span>
                    <span className="text-text-primary">Achievements</span>
                  </div>
                  <ul className="space-y-6">
                    {achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-text-primary">
                            {ach.title}
                          </span>
                          <span className="font-mono text-xs text-text-muted">
                            {ach.year}
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary leading-relaxed">
                          {ach.description}
                        </p>
                        <DevPlaceholderBadge placeholder={ach.placeholder} className="mt-1" />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}

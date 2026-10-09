import { profileData } from "@/content/profile";
import { Container, Section, Heading } from "@/components/primitives";
import { DevPlaceholderBadge } from "@/components/ui/DevPlaceholderBadge";
import { FadeIn } from "@/components/motion/FadeIn";

export function Education() {
  const { education, certifications, achievements } = profileData;

  return (
    <Section id="education" spacing="md" bordered>
      <Container>
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent mb-3">
            <span>[04]</span>
            <span className="text-text-muted">/</span>
            <span className="text-text-secondary">EDUCATION & CREDENTIALS</span>
          </div>
          <Heading as="h2" size="xl">
            Academic Background & Recognition
          </Heading>
        </div>

        {/* Compact Typographic Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Education */}
          <div className="lg:col-span-7 space-y-8">
            <span className="font-mono text-xs uppercase tracking-widest text-accent block pb-2 border-b border-border-hairline">
              Degree & Studies
            </span>

            <div className="space-y-8">
              {education.map((edu, idx) => (
                <FadeIn key={idx} delay={idx * 0.05}>
                  <div className="border border-border-hairline bg-surface/50 p-6 sm:p-8 corner-ticks space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                      <span className="text-text-primary font-medium">{edu.period}</span>
                      {edu.location && (
                        <span className="text-text-muted">{edu.location}</span>
                      )}
                      <DevPlaceholderBadge placeholder={edu.placeholder} />
                    </div>

                    <h3 className="font-serif text-2xl text-text-primary font-normal pt-1">
                      {edu.degree}
                    </h3>

                    <div className="font-mono text-xs uppercase tracking-wider text-accent">
                      {edu.institution}
                    </div>

                    {edu.notes && (
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pt-2 border-t border-border-hairline">
                        {edu.notes}
                      </p>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right Column: Certifications & Achievements */}
          <div className="lg:col-span-5 space-y-8">
            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent block pb-2 border-b border-border-hairline mb-6">
                  Certifications
                </span>

                <ul className="space-y-4">
                  {certifications.map((cert, cIdx) => (
                    <FadeIn key={cIdx} delay={cIdx * 0.05}>
                      <li className="p-4 border border-border-hairline bg-surface/30 space-y-1">
                        <div className="flex items-baseline justify-between gap-2">
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
                    </FadeIn>
                  ))}
                </ul>
              </div>
            )}

            {/* Achievements */}
            {achievements && achievements.length > 0 && (
              <div className="pt-4">
                <span className="font-mono text-xs uppercase tracking-widest text-accent block pb-2 border-b border-border-hairline mb-6">
                  Recognitions & Milestones
                </span>

                <ul className="space-y-4">
                  {achievements.map((ach, aIdx) => (
                    <FadeIn key={aIdx} delay={aIdx * 0.05}>
                      <li className="p-4 border border-border-hairline bg-surface/30 space-y-1.5">
                        <div className="flex items-baseline justify-between gap-2">
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
                    </FadeIn>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

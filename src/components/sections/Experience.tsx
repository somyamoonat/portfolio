import { profileData } from "@/content/profile";
import { Container, Section, Heading } from "@/components/primitives";
import { DevPlaceholderBadge } from "@/components/ui/DevPlaceholderBadge";
import { FadeIn } from "@/components/motion/FadeIn";

export function Experience() {
  const { experience } = profileData;

  return (
    <Section id="experience" spacing="md" bordered>
      <Container>
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent mb-3">
            <span>[03]</span>
            <span className="text-text-muted">/</span>
            <span className="text-text-secondary">EXPERIENCE</span>
          </div>
          <Heading as="h2" size="xl">
            Work & Engineering Milestones
          </Heading>
          <p className="mt-3 text-sm md:text-base text-text-secondary max-w-2xl leading-relaxed">
            Chronological record of software development responsibilities, systems delivery, and technical impact.
          </p>
        </div>

        {/* Two-Column List: Dates Left, Details Right */}
        <div className="divide-y divide-border-hairline border-t border-b border-border-hairline">
          {experience.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.05}>
              <div className="py-10 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                {/* Dates & Location on Left */}
                <div className="md:col-span-4 font-mono text-xs space-y-2">
                  <div className="text-text-primary font-medium text-sm">
                    {item.period}
                  </div>
                  {item.location && (
                    <div className="text-text-muted">{item.location}</div>
                  )}
                  <div className="pt-1">
                    <span className="text-text-muted uppercase tracking-wider text-[11px] block">
                      Scope: {item.type}
                    </span>
                    <DevPlaceholderBadge placeholder={item.placeholder} className="mt-2" />
                  </div>
                </div>

                {/* Title, Company, Impact Bullets on Right */}
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-text-primary font-normal">
                      {item.role}
                    </h3>
                    <div className="font-mono text-xs uppercase tracking-wider text-accent mt-1">
                      {item.organization}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Impact Bullets with Concrete Outcomes */}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="space-y-2.5 pt-2">
                      {item.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="flex items-start gap-3 text-xs sm:text-sm text-text-muted leading-relaxed"
                        >
                          <span className="text-accent font-mono select-none shrink-0">—</span>
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
      </Container>
    </Section>
  );
}

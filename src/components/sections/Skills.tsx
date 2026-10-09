import { profileData } from "@/content/profile";
import { Container, Section, Heading } from "@/components/primitives";
import { FadeIn } from "@/components/motion/FadeIn";

export function Skills() {
  const { skills } = profileData;

  return (
    <Section id="skills" spacing="md" bordered>
      <Container>
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent mb-3">
            <span>[05]</span>
            <span className="text-text-muted">/</span>
            <span className="text-text-secondary">SKILLS & DISCIPLINES</span>
          </div>
          <Heading as="h2" size="xl">
            Technical Capabilities
          </Heading>
          <p className="mt-3 text-sm md:text-base text-text-secondary max-w-2xl leading-relaxed">
            Proficiencies across client architecture, backend systems, machine learning workflows, and deployment tooling.
          </p>
        </div>

        {/* Plain Text Lists Grouped by Category (No meters, no progress bars, no logo walls) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 border-t border-b border-border-hairline py-10">
          {skills.map((group, idx) => (
            <FadeIn key={group.category} delay={idx * 0.05}>
              <div className="space-y-4">
                {/* Category Header */}
                <div className="font-mono text-xs uppercase tracking-wider pb-2 border-b border-border-hairline flex items-center justify-between">
                  <span className="text-text-primary font-medium">{group.category}</span>
                  <span className="text-accent">0{idx + 1}</span>
                </div>

                {/* Plain Text List */}
                <ul className="space-y-2 text-sm text-text-secondary">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-baseline gap-2.5 font-sans"
                    >
                      <span className="text-accent font-mono text-xs select-none">•</span>
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}

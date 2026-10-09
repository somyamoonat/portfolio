import { profileData } from "@/content/profile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container, Section } from "@/components/primitives";

export function Skills() {
  const { skills } = profileData;

  return (
    <Section id="skills" spacing="md" bordered>
      <Container>
        <SectionLabel
          number="04"
          label="SKILLS"
          title="Technical Capabilities"
          description="Proficiencies across frontend architecture, backend systems, machine learning engineering, and tooling."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((category, idx) => (
            <FadeIn key={category.category} delay={idx * 0.06}>
              <div className="hairline-all bg-surface/40 p-6 corner-ticks h-full flex flex-col justify-between">
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4 pb-3 hairline-b flex items-center justify-between">
                    <span>{category.category}</span>
                    <span className="text-text-muted">0{idx + 1}</span>
                  </div>

                  <ul className="space-y-2.5 font-mono text-xs text-text-secondary">
                    {category.skills.map((skill) => (
                      <li key={skill} className="flex items-center gap-2">
                        <span className="text-accent/60 select-none">•</span>
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 hairline-t font-mono text-[10px] text-text-muted uppercase tracking-wider">
                  Verified In Production
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}

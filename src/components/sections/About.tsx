import { profileData } from "@/content/profile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container, Section, Link } from "@/components/primitives";

export function About() {
  const { personal, contact } = profileData;

  return (
    <Section id="about" spacing="md" bordered>
      <Container>
        <SectionLabel
          number="02"
          label="ABOUT"
          title="Background & Engineering Stance"
          description="Approach to building software, current research interests, and daily workflow."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Long Bio Narrative */}
          <div className="lg:col-span-7 space-y-6 text-base sm:text-lg text-text-secondary leading-relaxed">
            <FadeIn>
              {personal.bioLong.map((paragraph, pIdx) => (
                <p key={pIdx} className="mb-6 last:mb-0">
                  {paragraph}
                </p>
              ))}

              <div className="pt-6 hairline-t mt-8 space-y-3 font-mono text-xs text-text-muted">
                <div className="flex items-center gap-3">
                  <span className="text-accent uppercase tracking-wider">Location:</span>
                  <span className="text-text-secondary">{personal.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-accent uppercase tracking-wider">Timezone:</span>
                  <span className="text-text-secondary">{contact.locationTimezone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-accent uppercase tracking-wider">Direct Mail:</span>
                  <Link
                    href={`mailto:${contact.email}`}
                    variant="editorial"
                  >
                    {contact.email}
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Currently Ledger & Work Cadence */}
          <div className="lg:col-span-5">
            <FadeIn delay={0.1}>
              <div className="hairline-all bg-surface p-6 sm:p-8 corner-ticks">
                <div className="flex items-center justify-between pb-4 hairline-b mb-6 font-mono text-xs uppercase tracking-wider">
                  <span className="text-text-primary">Current Focus</span>
                  <span className="text-accent">[2026]</span>
                </div>

                <ul className="space-y-6">
                  {personal.currently.map((item, idx) => (
                    <li key={idx} className="space-y-1">
                      <span className="font-mono text-xs text-accent uppercase tracking-wider block">
                        [{String(idx + 1).padStart(2, "0")}]
                      </span>
                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                        {item}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 hairline-t font-mono text-[11px] text-text-muted">
                  Status:{" "}
                  <span className="text-text-primary font-medium">
                    {personal.status.statusText}
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}

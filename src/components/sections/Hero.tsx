import { profileData } from "@/content/profile";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container, Section, Heading, Button, Link } from "@/components/primitives";

export function Hero() {
  const { personal, contact, socials } = profileData;

  return (
    <Section spacing="lg" bordered>
      <Container>
        <FadeIn>
          {/* Eyebrow / Role definition */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-widest text-accent mb-6">
            <span>[00 / PROFILE]</span>
            <span className="text-text-muted">/</span>
            <span className="text-text-secondary">{personal.primaryRole}</span>
          </div>

          {/* Main Editorial Headline */}
          <Heading as="h1" size="display" className="mb-8">
            {personal.name}
          </Heading>

          {/* Direct, specific positioning statement */}
          <p className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-3xl font-light leading-relaxed mb-10">
            {personal.statement}
          </p>

          {/* Sub-specializations list in monospace hairline box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 pb-8 hairline-t hairline-b max-w-3xl mb-10 font-mono text-xs text-text-secondary">
            {personal.subRoles.map((role, idx) => (
              <div key={role} className="flex items-center gap-2">
                <span className="text-text-muted">0{idx + 1}.</span>
                <span className="text-text-primary">{role}</span>
              </div>
            ))}
          </div>

          {/* Action Triggers: Primary Contact & Direct Actions */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
            <Button
              variant="primary"
              href={`mailto:${contact.email}`}
            >
              <span>Get in touch</span>
              <span className="text-accent">→</span>
            </Button>

            <Button
              variant="secondary"
              href={contact.resumeUrl}
              target="_blank"
            >
              <span>Download Resume</span>
              <span className="text-text-muted">↗</span>
            </Button>

            <div className="flex items-center gap-4 ml-auto sm:ml-2 font-mono text-xs uppercase tracking-wider text-text-muted">
              {socials.github && (
                <Link
                  variant="mono"
                  href={socials.github.url}
                >
                  GitHub
                </Link>
              )}
              {socials.linkedin && (
                <Link
                  variant="mono"
                  href={socials.linkedin.url}
                >
                  LinkedIn
                </Link>
              )}
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}

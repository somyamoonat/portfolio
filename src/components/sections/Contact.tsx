"use client";

import { useState } from "react";
import { profileData } from "@/content/profile";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { FadeIn } from "@/components/motion/FadeIn";
import { Container, Section, Heading, Button, Link } from "@/components/primitives";

export function Contact() {
  const { personal, contact, socials } = profileData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section id="contact" spacing="md" bordered>
      <Container>
        <SectionLabel
          number="05"
          label="CONTACT"
          title="Direct Inquiries & Availability"
          description="Open to full-time engineering positions, machine learning research, and select collaborative projects."
        />

        <FadeIn>
          <div className="hairline-all bg-surface p-6 sm:p-10 lg:p-12 corner-ticks">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Primary Direct Channel */}
              <div className="lg:col-span-7 space-y-6">
                <span className="font-mono text-xs uppercase tracking-widest text-accent block">
                  Primary Contact Channel
                </span>

                <Heading as="h3" size="lg" className="sm:text-4xl">
                  Initiate a conversation directly via email.
                </Heading>

                <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl">
                  For opportunities, engineering discussions, or project reviews, reach out at the address below. Responses typically within 24 hours.
                </p>

                {/* Email address with quick-copy button */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href={`mailto:${contact.email}`}
                    variant="editorial"
                    className="font-mono text-base sm:text-lg py-1"
                  >
                    {contact.email}
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyEmail}
                    className="hairline-all bg-surface-subtle"
                    aria-label="Copy email address"
                  >
                    {copied ? "Copied to clipboard" : "Copy email"}
                  </Button>
                </div>

                {/* Calendar URL button: ONLY rendered if contact.calendarUrl is provided */}
                {contact.calendarUrl && (
                  <div className="pt-2">
                    <Link
                      href={contact.calendarUrl}
                      variant="mono"
                      showArrow
                    >
                      Schedule a conversation
                    </Link>
                  </div>
                )}
              </div>

              {/* Auxiliary Meta & Socials */}
              <div className="lg:col-span-5 space-y-8 lg:hairline-l lg:pl-10">
                {/* Availability status */}
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">
                    Current Status
                  </span>
                  <div className="flex items-center gap-2 font-mono text-xs text-text-primary">
                    <span className="w-2 h-2 rounded-full bg-accent" />
                    <span>{personal.status.statusText}</span>
                  </div>
                  <div className="font-mono text-xs text-text-muted mt-1">
                    {contact.locationTimezone}
                  </div>
                </div>

                {/* Resume Download */}
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">
                    Curriculum Vitae
                  </span>
                  <Button
                    variant="secondary"
                    href={contact.resumeUrl}
                    target="_blank"
                    size="sm"
                    className="w-full sm:w-auto"
                  >
                    <span>Download PDF Resume</span>
                    <span className="text-text-muted">↗</span>
                  </Button>
                </div>

                {/* Network profiles */}
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted block mb-2">
                    Online Presence
                  </span>
                  <div className="flex flex-col gap-2 font-mono text-xs">
                    {socials.github && (
                      <a
                        href={socials.github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-accent transition-colors flex items-center justify-between py-1 hairline-b"
                      >
                        <span>{socials.github.label}</span>
                        <span className="text-text-muted">{socials.github.handle} ↗</span>
                      </a>
                    )}
                    {socials.linkedin && (
                      <a
                        href={socials.linkedin.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-accent transition-colors flex items-center justify-between py-1 hairline-b"
                      >
                        <span>{socials.linkedin.label}</span>
                        <span className="text-text-muted">{socials.linkedin.handle} ↗</span>
                      </a>
                    )}
                    {socials.x && (
                      <a
                        href={socials.x.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-secondary hover:text-accent transition-colors flex items-center justify-between py-1 hairline-b"
                      >
                        <span>{socials.x.label}</span>
                        <span className="text-text-muted">{socials.x.handle} ↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}

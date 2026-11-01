"use client";

import { profileData } from "@/content/profile";
import { Container, Section, Heading } from "@/components/primitives";
import { DevPlaceholderBadge } from "@/components/ui/DevPlaceholderBadge";
import { FadeIn } from "@/components/motion/FadeIn";
import { motion, useReducedMotion } from "motion/react";

export function Testimonials() {
  const { testimonials } = profileData;
  const shouldReduceMotion = useReducedMotion();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <Section id="endorsements" spacing="md" bordered>
      <Container>
        {/* Section Header */}
        <FadeIn>
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
              <span className="text-text-secondary font-medium">06</span>
              <span className="text-border-subtle">/</span>
              <span className="tracking-widest">Endorsements</span>
            </div>
            <Heading as="h2" size="xl">
              Collaborator Endorsements
            </Heading>
            <p className="mt-3 text-sm md:text-base text-text-secondary max-w-[65ch] leading-relaxed">
              Perspectives from project teammates, engineering mentors, and technical evaluators on engineering discipline and delivery.
            </p>
          </div>
        </FadeIn>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item, idx) => (
            <FadeIn key={item.author} delay={idx * 0.08}>
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -3,
                        transition: { type: "spring", stiffness: 350, damping: 25 },
                      }
                }
                className="h-full border border-border-hairline glass-card p-6 sm:p-8 flex flex-col justify-between space-y-6 hover-glow cursor-default relative"
              >
                <div>
                  {/* Monospace Header Row */}
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-text-muted pb-4 border-b border-border-hairline">
                    <span className="text-accent font-semibold">[0{idx + 1} / REF]</span>
                    <span className="text-text-muted">{item.relationship}</span>
                  </div>

                  {/* Quote Body */}
                  <div className="mt-5 relative">
                    <span
                      aria-hidden="true"
                      className="font-serif text-4xl text-accent/25 leading-none select-none -top-2 -left-1 absolute"
                    >
                      &ldquo;
                    </span>
                    <blockquote className="font-serif text-base sm:text-lg text-text-primary leading-relaxed font-normal pt-2 pl-4 italic">
                      {item.quote}
                    </blockquote>
                  </div>
                </div>

                {/* Author Metadata Footer */}
                <div className="pt-4 border-t border-border-hairline flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-sans text-sm font-semibold text-text-primary tracking-tight">
                      {item.author}
                    </div>
                    <DevPlaceholderBadge placeholder={item.placeholder} />
                  </div>

                  <div className="font-mono text-xs text-accent font-medium">
                    {item.role}
                  </div>

                  <div className="font-mono text-[11px] text-text-muted">
                    {item.organization}
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}

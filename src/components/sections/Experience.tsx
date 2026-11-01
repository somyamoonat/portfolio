"use client";

import { profileData } from "@/content/profile";
import { Container, Section, Heading } from "@/components/primitives";
import { DevPlaceholderBadge } from "@/components/ui/DevPlaceholderBadge";
import { FadeIn } from "@/components/motion/FadeIn";
import { motion, useReducedMotion } from "motion/react";

export function Experience() {
  const { experience } = profileData;
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section id="experience" spacing="md" bordered>
      <Container>
        {/* Section Header */}
        <FadeIn>
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
              <span className="text-text-secondary font-medium">03</span>
              <span className="text-border-subtle">/</span>
              <span className="tracking-widest">Experience</span>
            </div>
            <Heading as="h2" size="xl">
              Professional Trajectory
            </Heading>
          </div>
        </FadeIn>

        {/* Two-Column List: Dates Left, Details Right */}
        <div className="divide-y divide-border-hairline border-t border-b border-border-hairline">
          {experience.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.05}>
              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        backgroundColor: "color-mix(in srgb, var(--surface) 60%, transparent)",
                        transition: { duration: 0.2 },
                      }
                }
                className="py-10 sm:py-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-xs grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 transition-colors duration-200"
              >
                {/* Dates & Location on Left */}
                <div className="md:col-span-4 font-mono text-xs space-y-2">
                  <div className="flex items-center gap-2 text-text-primary font-semibold text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>{item.period}</span>
                  </div>
                  {item.location && (
                    <div className="text-text-muted pl-3.5">{item.location}</div>
                  )}
                  <div className="pt-1 pl-3.5">
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
                    <div className="font-mono text-xs uppercase tracking-wider text-accent font-medium mt-1">
                      {item.organization}
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-[65ch]">
                    {item.summary}
                  </p>

                  {/* Impact Bullets with Interactive Spring Hover */}
                  {item.bullets && item.bullets.length > 0 && (
                    <ul className="space-y-2.5 pt-2 max-w-[65ch]">
                      {item.bullets.map((bullet, bIdx) => (
                        <motion.li
                          key={bIdx}
                          whileHover={
                            shouldReduceMotion
                              ? undefined
                              : {
                                  x: 4,
                                  transition: { type: "spring", stiffness: 400, damping: 25 },
                                }
                          }
                          className="flex items-start gap-3 text-xs sm:text-sm text-text-muted leading-relaxed cursor-default p-1 -m-1 rounded-xs hover:text-text-primary transition-colors"
                        >
                          <span className="text-accent font-mono select-none shrink-0">—</span>
                          <span>{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}

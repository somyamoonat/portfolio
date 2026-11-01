"use client";

import { profileData } from "@/content/profile";
import { Container } from "@/components/primitives";
import { FadeIn } from "@/components/motion/FadeIn";
import { motion, useReducedMotion } from "motion/react";

export function ImpactMetrics() {
  const { metrics } = profileData;
  const shouldReduceMotion = useReducedMotion();

  if (!metrics || metrics.length === 0) return null;

  return (
    <section
      aria-label="Quantified Engineering Impact"
      className="border-b border-border-hairline bg-surface/40 backdrop-blur-xs relative overflow-hidden"
    >
      <Container>
        <FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-border-hairline">
            {metrics.map((metric, idx) => (
              <motion.div
                key={metric.label}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        backgroundColor: "var(--surface-subtle)",
                        transition: { duration: 0.15 },
                      }
                }
                className={`py-7 px-5 sm:px-6 lg:px-7 flex flex-col justify-between transition-colors ${
                  idx === 0 ? "sm:pl-2 lg:pl-4" : ""
                } ${idx === metrics.length - 1 ? "sm:pr-2 lg:pr-4" : ""}`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-text-muted mb-2">
                    <span className="text-accent font-semibold">[0{idx + 1}]</span>
                    <span>METRIC</span>
                  </div>

                  <div className="font-serif text-3xl sm:text-4xl lg:text-4xl text-text-primary tracking-tight font-normal leading-tight">
                    {metric.value}
                  </div>

                  <div className="font-mono text-xs uppercase tracking-wider text-text-primary font-medium mt-1.5">
                    {metric.label}
                  </div>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed mt-3 pt-3 border-t border-border-hairline/60">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}

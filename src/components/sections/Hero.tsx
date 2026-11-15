"use client";

import { profileData } from "@/content/profile";
import { Container, Section, Button } from "@/components/primitives";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const { personal, contact, socials } = profileData;
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            type: "spring" as const,
            stiffness: 110,
            damping: 20,
            mass: 0.8,
          },
    },
  };

  return (
    <Section spacing="lg" bordered className="relative pt-20 sm:pt-28 md:pt-36 overflow-hidden">
      {/* Subtle, restrained ambient radiant aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,var(--accent-subtle),transparent_75%)] opacity-70"
      />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl"
        >
          {/* 1. Eyebrow line */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-widest mb-6 sm:mb-8"
          >
            <span className="text-accent font-medium">[00 / PROFILE]</span>
            <span className="text-border-subtle" aria-hidden="true">
              /
            </span>
            <span className="text-text-muted">{personal.heroEyebrowRole}</span>
          </motion.div>

          {/* 2. Name as the page's single <h1> */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.95] font-normal text-text-primary mb-8 sm:mb-10 text-balance"
          >
            {personal.name}
          </motion.h1>

          {/* 3. Subline paragraph */}
          <motion.p
            variants={itemVariants}
            className="font-sans font-light text-base sm:text-lg md:text-xl text-text-secondary leading-relaxed max-w-[60ch] mb-10"
          >
            {personal.heroSubline}
          </motion.p>

          {/* 4. Numbered monospace items flanked by hairline rules with tactile spring hover */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 py-4 border-t border-b border-border-hairline mb-10 font-mono text-xs max-w-4xl"
          >
            {personal.heroFocusItems.map((item, idx) => (
              <motion.div
                key={item}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: 3,
                        backgroundColor: "var(--surface-subtle)",
                        transition: { type: "spring", stiffness: 400, damping: 25 },
                      }
                }
                className="flex items-center gap-2 p-2 rounded-xs border border-transparent hover:border-border-hairline transition-colors duration-150"
              >
                <span className="text-accent font-semibold">0{idx + 1}.</span>
                <span className="text-text-primary font-medium">{item}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* 5. Actions row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2"
          >
            <Button
              variant="primary"
              href="#contact"
              className="rounded-none"
            >
              <span>GET IN TOUCH</span>
              <span className="text-accent group-hover:text-white transition-colors select-none" aria-hidden="true">
                →
              </span>
            </Button>

            <Button
              variant="secondary"
              href={contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-none"
            >
              <span>DOWNLOAD RESUME</span>
              <span className="text-text-muted select-none" aria-hidden="true">
                ↗
              </span>
            </Button>

            <div className="flex items-center gap-5 sm:ml-2 font-mono text-xs uppercase tracking-wider text-text-muted">
              {socials.github && (
                <motion.a
                  whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                  href={socials.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent py-1"
                >
                  <span>GITHUB</span>
                  <span className="text-text-muted select-none" aria-hidden="true">
                    ↗
                  </span>
                </motion.a>
              )}
              {socials.linkedin && (
                <motion.a
                  whileHover={shouldReduceMotion ? undefined : { y: -1 }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                  href={socials.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent py-1"
                >
                  <span>LINKEDIN</span>
                  <span className="text-text-muted select-none" aria-hidden="true">
                    ↗
                  </span>
                </motion.a>
              )}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

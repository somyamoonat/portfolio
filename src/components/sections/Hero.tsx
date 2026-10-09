"use client";

import { profileData } from "@/content/profile";
import { Container, Section, Button } from "@/components/primitives";
import { motion, useReducedMotion } from "motion/react";

export function Hero() {
  const { personal, contact } = profileData;
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <Section spacing="lg" bordered className="pt-20 sm:pt-28 md:pt-36">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-5xl"
        >
          {/* Large Typographic Statement containing Full Name */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-text-primary leading-[1.08] font-normal mb-10">
            <span className="block font-mono text-xs sm:text-sm uppercase tracking-wider text-text-muted font-normal mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block mr-2.5 align-middle" aria-hidden="true" />
              <span className="text-text-primary font-medium">{personal.name}</span>
              <span className="text-border-subtle mx-2">/</span>
              <span className="text-text-secondary">{personal.primaryRole}</span>
            </span>
            {personal.statement}
          </h1>

          {/* Location and Current Status */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-6 pb-8 border-t border-b border-border-hairline mb-10 font-mono text-xs text-text-secondary"
          >
            <div className="flex items-center gap-2">
              <span className="text-text-muted">Location:</span>
              <span className="text-text-primary">{personal.location}</span>
            </div>

            {personal.status.availableForWork && (
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                </span>
                <span className="text-text-primary font-medium">
                  {personal.status.statusText}
                </span>
              </div>
            )}
          </motion.div>

          {/* Two Clear Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <Button
              variant="primary"
              href="#work"
            >
              <span>View work</span>
              <span className="text-accent select-none">↓</span>
            </Button>

            <Button
              variant="secondary"
              href={`mailto:${contact.email}`}
            >
              <span>Get in touch</span>
              <span className="text-text-muted select-none">→</span>
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

"use client";

import Image from "next/image";
import { profileData } from "@/content/profile";
import { Container, Section, Heading } from "@/components/primitives";
import { FadeIn } from "@/components/motion/FadeIn";
import { motion, useReducedMotion } from "motion/react";

export function About() {
  const { personal } = profileData;
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            type: "spring" as const,
            stiffness: 100,
            damping: 20,
            mass: 0.8,
          },
    },
  };

  return (
    <Section id="about" spacing="md" bordered>
      <Container>
        {/* Section Header */}
        <FadeIn>
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
              <span className="text-text-secondary font-medium">02</span>
              <span className="text-border-subtle">/</span>
              <span className="tracking-widest">About</span>
            </div>
            <Heading as="h2" size="xl">
              Engineering Practice & Focus
            </Heading>
          </div>
        </FadeIn>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "0px 0px -40px 0px", amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Column 1: Photo / Typographic Portrait Treatment */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <motion.div
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -3,
                      transition: { type: "spring", stiffness: 350, damping: 22 },
                    }
              }
              className="relative group cursor-default"
            >
              {/* Subtle offset hairline accent frame */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 sm:-inset-3 border border-border-hairline pointer-events-none transition-colors duration-200 group-hover:border-accent/40"
              />

              {/* Main portrait container with 4:5 aspect ratio */}
              <div className="relative aspect-[4/5] w-full border border-border-strong glass-card overflow-hidden corner-ticks flex flex-col justify-between p-6 sm:p-8">
                {personal.photo ? (
                  <Image
                    src={personal.photo}
                    alt={`Portrait of ${personal.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-center grayscale contrast-105 transition-transform duration-300 group-hover:scale-102"
                  />
                ) : (
                  /* Refined Typographic Portrait when no image is supplied */
                  <>
                    {/* Top indicator */}
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      <span>Monogram Profile</span>
                      <span className="text-text-secondary">• IST UTC+5:30</span>
                    </div>

                    {/* Architectural Monogram Centerpiece */}
                    <div className="my-auto py-8 text-center select-none">
                      <span className="font-serif text-7xl sm:text-8xl md:text-9xl tracking-tighter text-text-primary/90 font-normal leading-none block transition-transform duration-300 group-hover:scale-105">
                        SM
                      </span>
                      <span className="font-mono text-[11px] tracking-widest uppercase text-text-muted mt-2 block">
                        {personal.name}
                      </span>
                    </div>

                    {/* Bottom Technical Caption */}
                    <div className="pt-4 border-t border-border-hairline font-mono text-[10px] uppercase tracking-wider text-text-muted flex items-center justify-between">
                      <span>{personal.primaryRole}</span>
                      <span className="text-text-secondary">2026</span>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Column 2: Human Bio & Compact Currently List */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-10">
            {/* Short, human bio */}
            <div className="space-y-6 max-w-[65ch]">
              {personal.bioLong.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={
                    idx === 0
                      ? "text-lg sm:text-xl text-text-primary leading-relaxed font-normal"
                      : "text-base text-text-secondary leading-relaxed"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Compact "Currently" List with Spring Hover Items */}
            <div className="border border-border-hairline glass-card p-6 sm:p-8 hover-glow">
              <div className="flex items-center justify-between pb-3 border-b border-border-hairline mb-6 font-mono text-xs uppercase tracking-wider">
                <span className="text-text-primary font-medium">Currently Investigating</span>
                <span className="flex items-center gap-2 text-text-muted text-[10px]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  Active
                </span>
              </div>

              <ul className="space-y-3 font-mono text-xs">
                {personal.currently.map((item, idx) => (
                  <motion.li
                    key={idx}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            x: 4,
                            transition: { type: "spring", stiffness: 400, damping: 25 },
                          }
                    }
                    className="flex items-start gap-3 p-1 rounded-xs hover:bg-surface-subtle/50 transition-colors"
                  >
                    <span className="text-accent font-semibold select-none shrink-0 pt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-text-secondary leading-relaxed font-sans text-sm">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

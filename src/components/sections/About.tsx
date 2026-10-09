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
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
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
          viewport={{ once: true, margin: "0px 0px 250px 0px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Column 1: Photo / Typographic Portrait Treatment */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <div className="relative group">
              {/* Subtle offset hairline accent frame */}
              <div
                aria-hidden="true"
                className="absolute -inset-2 sm:-inset-3 border border-border-hairline pointer-events-none transition-colors duration-200 group-hover:border-border-subtle"
              />

              {/* Main portrait container with 4:5 aspect ratio */}
              <div className="relative aspect-[4/5] w-full border border-border-strong bg-surface overflow-hidden corner-ticks flex flex-col justify-between p-6 sm:p-8">
                {personal.photo ? (
                  <Image
                    src={personal.photo}
                    alt={`Portrait of ${personal.name}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover object-center grayscale contrast-105"
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
                      <span className="font-serif text-7xl sm:text-8xl md:text-9xl tracking-tighter text-text-primary/90 font-normal leading-none block">
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
            </div>
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

            {/* Compact "Currently" List */}
            <div className="border border-border-hairline bg-surface/60 p-6 sm:p-8">
              <div className="flex items-center justify-between pb-3 border-b border-border-hairline mb-6 font-mono text-xs uppercase tracking-wider">
                <span className="text-text-primary font-medium">Currently Investigating</span>
                <span className="flex items-center gap-1.5 text-text-muted text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                  Active
                </span>
              </div>

              <ul className="space-y-3.5 font-mono text-xs">
                {personal.currently.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-text-muted select-none shrink-0 pt-0.5">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-text-secondary leading-relaxed font-sans text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

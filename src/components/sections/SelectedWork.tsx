"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { profileData } from "@/content/profile";
import { Container, Section, Heading } from "@/components/primitives";
import { DevPlaceholderBadge } from "@/components/ui/DevPlaceholderBadge";
import { FadeIn } from "@/components/motion/FadeIn";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export function SelectedWork() {
  const { projects } = profileData;
  const shouldReduceMotion = useReducedMotion();

  // Extract unique categories preserving order
  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category))),
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <Section id="work" spacing="md" bordered>
      <Container>
        {/* Section Header */}
        <FadeIn>
          <div className="mb-10 md:mb-12">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
              <span className="text-text-secondary font-medium">01</span>
              <span className="text-border-subtle">/</span>
              <span className="tracking-widest">Selected Work</span>
            </div>
            <Heading as="h2" size="xl">
              Featured Systems & Architecture
            </Heading>
            <p className="mt-3 text-sm md:text-base text-text-secondary max-w-[65ch] leading-relaxed">
              Selected production builds, distributed architectures, and machine learning implementations exploring concrete technical trade-offs.
            </p>
          </div>
        </FadeIn>

        {/* Buttery-Smooth Category Tabs with Spring Indicator */}
        <FadeIn delay={0.06}>
          <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-border-hairline pb-4 font-mono text-xs">
            <span className="text-text-muted uppercase tracking-wider text-[11px] mr-2 hidden sm:inline-block">
              Filter:
            </span>
            {categories.map((category) => {
              const count =
                category === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === category).length;
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-3.5 py-1.5 rounded-xs transition-colors duration-150 uppercase tracking-wider min-h-[38px] inline-flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${
                    isSelected
                      ? "text-text-primary font-medium"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                  aria-pressed={isSelected}
                >
                  {isSelected && !shouldReduceMotion && (
                    <motion.span
                      layoutId="activeCategoryPill"
                      className="absolute inset-0 bg-surface border border-border-strong rounded-xs shadow-[0_2px_12px_-4px_var(--accent-subtle)] -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 28,
                        mass: 0.7,
                      }}
                    />
                  )}
                  {isSelected && shouldReduceMotion && (
                    <span className="absolute inset-0 bg-surface border border-border-strong rounded-xs -z-10" />
                  )}
                  <span>{category}</span>
                  <span
                    className={`text-[10px] ${
                      isSelected ? "text-accent font-semibold" : "text-text-muted"
                    }`}
                  >
                    [{String(count).padStart(2, "0")}]
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Editorial Project List with Layout Animations */}
        <motion.div
          layout
          className="relative divide-y divide-border-hairline border-t border-b border-border-hairline"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const hasPreview = project.images && project.images.length > 0;
              const previewImage = hasPreview ? project.images[0] : null;

              return (
                <motion.article
                  key={project.slug}
                  layout
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, y: 16 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: -10, transition: { duration: 0.18 } }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 260,
                          damping: 26,
                          mass: 0.8,
                        }
                  }
                  className="group relative"
                >
                  <Link
                    href={`/work/${project.slug}`}
                    className="block py-8 sm:py-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent glass-card border border-transparent hover:border-border-hairline transition-all duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-4">
                      {/* Left: Number + Title + Tagline */}
                      <div className="space-y-3 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                          <span className="text-text-muted group-hover:text-accent uppercase tracking-wider font-semibold transition-colors">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="text-border-subtle">•</span>
                          <span className="text-text-secondary uppercase tracking-wider">
                            {project.category}
                          </span>
                          <DevPlaceholderBadge placeholder={project.placeholder} />
                        </div>

                        <div className="flex items-baseline gap-3">
                          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-text-primary group-hover:text-accent transition-colors font-normal tracking-tight">
                            {project.title}
                          </h3>
                          <span className="font-mono text-text-muted group-hover:text-accent group-hover:translate-x-1.5 transition-all duration-200 inline-block text-lg select-none">
                            →
                          </span>
                        </div>

                        <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-[65ch]">
                          {project.tagline}
                        </p>
                      </div>

                      {/* Right: Tech Tags & Year */}
                      <div className="flex flex-wrap lg:flex-col lg:items-end justify-between lg:justify-start gap-3 shrink-0 pt-2 lg:pt-0">
                        <span className="font-mono text-xs text-text-muted font-medium">
                          {project.year}
                        </span>

                        <div className="flex flex-wrap gap-1.5 max-w-md lg:justify-end">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-[10px] text-text-muted bg-surface-subtle border border-border-hairline px-2 py-0.5 group-hover:border-border-subtle transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="font-mono text-[10px] text-text-muted px-1 py-0.5">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Mobile Preview Image */}
                    {previewImage && (
                      <div className="mt-6 lg:hidden relative aspect-[16/9] w-full border border-border-hairline overflow-hidden bg-surface">
                        <Image
                          src={previewImage.src}
                          alt={previewImage.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 600px"
                          className="object-cover transition-transform duration-300 group-hover:scale-102"
                        />
                      </div>
                    )}
                  </Link>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}

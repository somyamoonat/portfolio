"use client";

import { useState } from "react";
import { profileData } from "@/content/profile";
import { Container, Section, Heading } from "@/components/primitives";
import { FadeIn } from "@/components/motion/FadeIn";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export function Skills() {
  const { skills } = profileData;
  const shouldReduceMotion = useReducedMotion();

  const categories = ["All", ...skills.map((s) => s.category)];
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  return (
    <Section id="skills" spacing="md" bordered>
      <Container>
        {/* Section Header */}
        <FadeIn>
          <div className="mb-10 md:mb-12">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
              <span className="text-text-secondary font-medium">05</span>
              <span className="text-border-subtle">/</span>
              <span className="tracking-widest">Capabilities</span>
            </div>
            <Heading as="h2" size="xl">
              Technical Disciplines
            </Heading>
          </div>
        </FadeIn>

        {/* Interactive Category Switcher Tabs */}
        <FadeIn delay={0.05}>
          <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-border-hairline pb-4 font-mono text-xs">
            <span className="text-text-muted uppercase tracking-wider text-[11px] mr-2 hidden sm:inline-block">
              Filter:
            </span>
            {categories.map((category) => {
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
                      layoutId="activeSkillsTab"
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
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* Grid with Layout Transitions and Hover Glow Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 py-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((group, idx) => (
              <motion.div
                key={group.category}
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
                    : { opacity: 0, scale: 0.96, transition: { duration: 0.16 } }
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
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -3,
                        transition: { type: "spring", stiffness: 350, damping: 22 },
                      }
                }
                className="p-6 border border-border-hairline glass-card hover-glow rounded-xs space-y-4"
              >
                {/* Category Header with item count */}
                <h3 className="font-mono text-xs uppercase tracking-wider pb-3 border-b border-border-hairline flex items-center justify-between">
                  <span className="text-text-primary font-semibold">{group.category}</span>
                  <span className="text-accent font-mono text-[11px]">
                    0{idx + 1}.
                  </span>
                </h3>

                {/* Plain Text List with refined typographic bullets and spring hover */}
                <ul className="space-y-2.5 text-sm text-text-secondary">
                  {group.skills.map((skill) => (
                    <motion.li
                      key={skill}
                      whileHover={
                        shouldReduceMotion
                          ? undefined
                          : {
                              x: 4,
                              transition: { type: "spring", stiffness: 400, damping: 25 },
                            }
                      }
                      className="group flex items-baseline gap-2.5 font-sans leading-relaxed cursor-default p-1 -m-1 rounded-xs hover:bg-surface-subtle/50 transition-colors"
                    >
                      <span className="text-accent font-mono text-xs select-none transition-transform duration-150 group-hover:scale-125">
                        —
                      </span>
                      <span className="group-hover:text-text-primary transition-colors text-xs sm:text-sm">
                        {skill}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}

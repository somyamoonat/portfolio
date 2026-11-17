"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { profileData, type Project } from "@/content/profile";
import { Container, Section, Heading } from "@/components/primitives";
import { DevPlaceholderBadge } from "@/components/ui/DevPlaceholderBadge";
import { FadeIn } from "@/components/motion/FadeIn";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export function SelectedWork() {
  const [projects, setProjects] = useState<Project[]>(profileData.projects);

  useEffect(() => {
    let ignore = false;

    // Fetch dynamic project updates with cache-busting timestamp
    fetch(`/api/admin/projects?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        }
      })
      .catch((err) => {
        console.warn("Could not fetch remote projects, using fallback:", err);
      });

    // Real-time live update handler when Somya edits, adds, or deletes in ProjectManager
    const handleProjectsUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<Project[]>;
      if (customEvent.detail && Array.isArray(customEvent.detail)) {
        setProjects(customEvent.detail);
      }
    };

    window.addEventListener("projects-updated", handleProjectsUpdate);
    return () => {
      ignore = true;
      window.removeEventListener("projects-updated", handleProjectsUpdate);
    };
  }, []);

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
                  className="group relative py-8 sm:py-10 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-xs glass-card border border-transparent hover:border-border-hairline transition-all duration-200"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                    {/* Left: Project Metadata, Title, Description, Tech Tags & Direct Action Buttons */}
                    <div className="lg:col-span-7 space-y-3.5">
                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                        <span className="text-text-muted group-hover:text-accent uppercase tracking-wider font-semibold transition-colors">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-border-subtle">•</span>
                        <span className="text-text-secondary uppercase tracking-wider">
                          {project.category}
                        </span>
                        <span className="text-border-subtle">•</span>
                        <span className="text-text-muted font-medium">{project.year}</span>
                        <DevPlaceholderBadge placeholder={project.placeholder} />
                      </div>

                      <Link
                        href={`/work/${project.slug}`}
                        className="group/title inline-block focus-visible:outline-2 focus-visible:outline-accent rounded-xs"
                      >
                        <div className="flex items-baseline gap-3">
                          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-text-primary group-hover/title:text-accent transition-colors font-normal tracking-tight">
                            {project.title}
                          </h3>
                          <span className="font-mono text-text-muted group-hover/title:text-accent group-hover/title:translate-x-1.5 transition-all duration-200 inline-block text-lg select-none">
                            →
                          </span>
                        </div>
                      </Link>

                      <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-[62ch]">
                        {project.tagline}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[10px] text-text-muted bg-surface-subtle border border-border-hairline px-2 py-0.5 group-hover:border-border-subtle transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Direct External Project Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2.5 pt-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider bg-accent text-white hover:bg-accent/90 rounded-xs transition-colors shadow-xs focus-visible:outline-2 focus-visible:outline-accent font-medium cursor-pointer"
                            title={`Open live app for ${project.title}`}
                          >
                            <span>Live App</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider bg-surface border border-border-hairline text-text-primary hover:text-accent hover:border-accent rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
                            title={`View GitHub repository for ${project.title}`}
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            <span>GitHub</span>
                            <span aria-hidden="true" className="text-text-muted">↗</span>
                          </a>
                        )}

                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-text-muted hover:text-accent border border-transparent hover:border-border-hairline rounded-xs transition-colors"
                        >
                          <span>Case Dossier</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>

                    {/* Right: Architectural Framed Preview with Clickable Link */}
                    {previewImage && (
                      <div className="lg:col-span-5 mt-3 lg:mt-0">
                        <Link
                          href={`/work/${project.slug}`}
                          className="block relative aspect-[16/10] w-full border border-border-hairline group-hover:border-border-strong overflow-hidden bg-surface-subtle rounded-xs transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent"
                          title={`Read case study for ${project.title}`}
                        >
                          <Image
                            src={previewImage.src}
                            alt={previewImage.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 460px"
                            className="object-cover object-top transition-transform duration-300 group-hover:scale-102"
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface/95 via-surface/40 to-transparent p-2.5 flex items-center justify-between font-mono text-[10px] text-text-muted uppercase tracking-wider">
                            <span className="truncate max-w-[200px] text-text-secondary">{project.role}</span>
                            <span className="text-accent group-hover:underline">Case Dossier ↗</span>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}

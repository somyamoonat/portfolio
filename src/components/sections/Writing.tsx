"use client";

import { profileData } from "@/content/profile";
import { Container, Section, Heading } from "@/components/primitives";
import { DevPlaceholderBadge } from "@/components/ui/DevPlaceholderBadge";
import { FadeIn } from "@/components/motion/FadeIn";
import { motion, useReducedMotion } from "motion/react";

export function Writing() {
  const { articles } = profileData;
  const shouldReduceMotion = useReducedMotion();

  if (!articles || articles.length === 0) return null;

  return (
    <Section id="writing" spacing="md" bordered>
      <Container>
        {/* Section Header */}
        <FadeIn>
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
              <span className="text-text-secondary font-medium">07</span>
              <span className="text-border-subtle">/</span>
              <span className="tracking-widest">Perspectives</span>
            </div>
            <Heading as="h2" size="xl">
              Technical Writing & Insights
            </Heading>
            <p className="mt-3 text-sm md:text-base text-text-secondary max-w-[65ch] leading-relaxed">
              Engineering essays, architectural breakdowns, and implementation notes on applied computer vision and full-stack software.
            </p>
          </div>
        </FadeIn>

        {/* Editorial Index Rows */}
        <div className="border-t border-border-hairline divide-y divide-border-hairline">
          {articles.map((article, idx) => (
            <FadeIn key={article.slug} delay={idx * 0.06}>
              <motion.article
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: 4,
                        transition: { type: "spring", stiffness: 350, damping: 25 },
                      }
                }
                className="group py-6 sm:py-8 transition-colors"
              >
                <a
                  href={article.url || "#"}
                  target={article.url?.startsWith("http") ? "_blank" : undefined}
                  rel={article.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-baseline">
                    {/* Index & Timestamp Column */}
                    <div className="md:col-span-3 flex md:flex-col items-center md:items-start justify-between md:justify-start gap-1 font-mono text-xs text-text-muted">
                      <div className="flex items-center gap-2">
                        <span className="text-accent font-semibold">0{idx + 1}.</span>
                        <span className="text-text-primary font-medium">{article.publishedAt}</span>
                      </div>
                      <span className="text-text-muted text-[11px]">{article.readTime}</span>
                    </div>

                    {/* Content Column */}
                    <div className="md:col-span-7 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-serif text-xl sm:text-2xl text-text-primary font-normal group-hover:text-accent transition-colors duration-150 text-balance">
                          {article.title}
                        </h3>
                        <DevPlaceholderBadge placeholder={article.placeholder} />
                      </div>

                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-[62ch]">
                        {article.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[11px] text-text-muted bg-surface-subtle px-2 py-0.5 border border-border-hairline"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Arrow Column */}
                    <div className="md:col-span-2 flex items-center md:justify-end font-mono text-xs text-text-muted group-hover:text-accent transition-colors pt-2 md:pt-0">
                      <span className="inline-flex items-center gap-1 uppercase tracking-wider text-[11px]">
                        <span>{article.url?.startsWith("/") ? "READ CASE" : "READ NOTE"}</span>
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-200 group-hover:translate-x-1"
                        >
                          {article.url?.startsWith("/") ? "→" : "↗"}
                        </span>
                      </span>
                    </div>
                  </div>
                </a>
              </motion.article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}

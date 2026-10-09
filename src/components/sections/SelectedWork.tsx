import Image from "next/image";
import Link from "next/link";
import { profileData } from "@/content/profile";
import { Container, Section, Heading } from "@/components/primitives";
import { DevPlaceholderBadge } from "@/components/ui/DevPlaceholderBadge";
import { FadeIn } from "@/components/motion/FadeIn";

export function SelectedWork() {
  const { projects } = profileData;

  return (
    <Section id="work" spacing="md" bordered>
      <Container>
        {/* Section Header */}
        <FadeIn>
          <div className="mb-12 md:mb-16">
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

        {/* Editorial Numbered List */}
        <div className="relative divide-y divide-border-hairline border-t border-b border-border-hairline">
          {projects.map((project, idx) => {
            const hasPreview = project.images && project.images.length > 0;
            const previewImage = hasPreview ? project.images[0] : null;

            return (
              <FadeIn key={project.slug} delay={idx * 0.04}>
                <Link
                  href={`/work/${project.slug}`}
                  className="group block py-8 sm:py-10 transition-colors duration-150 hover:bg-surface/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-4">
                    {/* Left: Number + Title + Tagline */}
                    <div className="space-y-3 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                        <span className="text-text-muted group-hover:text-accent uppercase tracking-wider font-medium transition-colors">
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
                        <span className="font-mono text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all duration-150 inline-block text-lg select-none">
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
                            className="font-mono text-[10px] text-text-muted bg-surface-subtle border border-border-hairline px-2 py-0.5"
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

                  {/* Mobile Preview Image (Inline, for touch screens without hover) */}
                  {previewImage && (
                    <div className="mt-6 lg:hidden relative aspect-[16/9] w-full border border-border-hairline overflow-hidden bg-surface">
                      <Image
                        src={previewImage.src}
                        alt={previewImage.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 600px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

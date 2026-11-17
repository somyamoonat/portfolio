import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { profileData } from "@/content/profile";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container, Section, Heading } from "@/components/primitives";
import { DevPlaceholderBadge } from "@/components/ui/DevPlaceholderBadge";
import { FadeIn } from "@/components/motion/FadeIn";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return profileData.projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = profileData.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const pageTitle = `${project.title} — ${profileData.personal.name}`;
  const pageDescription = `${project.tagline} ${project.problem}`;

  return {
    title: {
      absolute: pageTitle,
    },
    description: pageDescription,
    alternates: {
      canonical: `https://${profileData.personal.domain}/work/${project.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: `https://${profileData.personal.domain}/work/${project.slug}`,
      siteName: profileData.personal.name,
      type: "article",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      creator: "@somyamoonat",
      images: ["/og-image.png"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = profileData.projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = profileData.projects[projectIndex];
  const prevProject =
    projectIndex > 0 ? profileData.projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < profileData.projects.length - 1
      ? profileData.projects[projectIndex + 1]
      : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `https://${profileData.personal.domain}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Work",
            item: `https://${profileData.personal.domain}/#work`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `https://${profileData.personal.domain}/work/${project.slug}`,
          },
        ],
      },
      {
        "@type": "SoftwareSourceCode",
        name: project.title,
        headline: project.tagline,
        description: `${project.tagline} ${project.problem}`,
        url: `https://${profileData.personal.domain}/work/${project.slug}`,
        author: {
          "@type": "Person",
          name: profileData.personal.name,
          url: `https://${profileData.personal.domain}`,
        },
        image: project.images[0]?.src
          ? `https://${profileData.personal.domain}${project.images[0].src}`
          : `https://${profileData.personal.domain}/og-image.png`,
        programmingLanguage: project.technologies,
        codeRepository: project.githubUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Section spacing="md" bordered className="pt-12 sm:pt-16">
          <Container>
            {/* Top Navigation: Breadcrumb back to work */}
            <FadeIn>
              <div className="mb-8">
                <Link
                  href="/#work"
                  className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted hover:text-accent transition-colors py-1 px-1.5 -mx-1.5 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <span>←</span>
                  <span>Selected Work</span>
                </Link>
              </div>
            </FadeIn>

            {/* Header Content */}
            <FadeIn delay={0.05}>
              <div>
                {/* Category, Year, and Dev Placeholder */}
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-4">
                  <span className="text-accent uppercase tracking-wider font-medium">
                    {project.category}
                  </span>
                  <span className="text-text-muted">•</span>
                  <span className="text-text-secondary">{project.year}</span>
                  <DevPlaceholderBadge placeholder={project.placeholder} />
                </div>

                {/* Main Project Title */}
                <Heading as="h1" size="display" className="mb-6 max-w-4xl">
                  {project.title}
                </Heading>

                {/* Project Tagline */}
                <p className="text-lg sm:text-xl text-text-secondary max-w-[65ch] font-light leading-relaxed mb-6">
                  {project.tagline}
                </p>

                {/* Direct Action CTAs: Live App & GitHub */}
                {(project.liveUrl || project.githubUrl) && (
                  <div className="flex flex-wrap items-center gap-3 mb-10">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 font-mono text-xs uppercase tracking-wider bg-accent text-white hover:bg-accent/90 rounded-xs transition-colors font-medium shadow-xs focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        <span>Launch Live App</span>
                        <span>↗</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider bg-surface border border-border-hairline text-text-primary hover:border-accent hover:text-accent rounded-xs transition-colors focus-visible:outline-2 focus-visible:outline-accent"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        <span>GitHub Repository</span>
                        <span className="text-text-muted">↗</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </FadeIn>

            {/* Architectural Metadata Grid */}
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-t border-b border-border-hairline mb-12 font-mono text-xs">
                <div>
                  <span className="text-text-muted uppercase tracking-wider block mb-1">
                    My Role
                  </span>
                  <span className="text-text-primary">{project.role}</span>
                </div>

                <div>
                  <span className="text-text-muted uppercase tracking-wider block mb-1">
                    Timeline
                  </span>
                  <span className="text-text-primary">{project.year}</span>
                </div>

                <div className="sm:col-span-2 lg:col-span-1">
                  <span className="text-text-muted uppercase tracking-wider block mb-1">
                    Stack
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((t) => (
                      <span key={t} className="text-text-secondary">
                        {t}
                        <span className="text-text-muted mr-1">,</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-text-muted uppercase tracking-wider block mb-1">
                    Links
                  </span>
                  <div className="flex flex-wrap gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-primary hover:text-accent transition-colors py-0.5 px-1 -mx-1 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        Live Demo ↗
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text-muted hover:text-text-primary transition-colors py-0.5 px-1 -mx-1 rounded-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        Source ↗
                      </a>
                    )}
                    {!project.liveUrl && !project.githubUrl && (
                      <span className="text-text-muted">—</span>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Deep Dive: The Problem, What I Built, and Outcome */}
            <FadeIn delay={0.12}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
                {/* Problem Statement */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-text-secondary font-medium">01</span> / The Problem
                  </div>
                  <h2 className="font-serif text-2xl text-text-primary font-normal">
                    Technical Constraints & Motivation
                  </h2>
                  <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-[65ch]">
                    {project.problem}
                  </p>
                </div>

                {/* What I Built & Outcome */}
                <div className="lg:col-span-7 space-y-8 lg:border-l lg:border-border-hairline lg:pl-10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-text-secondary font-medium">02</span> / What I Built
                    </div>
                    <h2 className="font-serif text-2xl text-text-primary font-normal">
                      Architecture & Implementation
                    </h2>
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-[65ch]">
                      {project.description}
                    </p>

                    {/* Highlights Bullet List */}
                    {project.highlights && project.highlights.length > 0 && (
                      <ul className="space-y-2 pt-2 max-w-[65ch]">
                        {project.highlights.map((highlight, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary leading-relaxed p-1 -m-1 rounded-xs hover:bg-surface-subtle/50 transition-colors"
                          >
                            <span className="text-accent font-mono select-none shrink-0">—</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="space-y-4 pt-6 border-t border-border-hairline">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-text-secondary font-medium">03</span> / Outcome & Results
                    </div>
                    <h2 className="font-serif text-2xl text-text-primary font-normal">
                      Delivered System
                    </h2>
                    <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-[65ch]">
                      {project.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Image Gallery */}
            {project.images && project.images.length > 0 && (
              <FadeIn delay={0.16}>
                <div className="mb-20">
                  <div className="flex items-center justify-between pb-3 border-b border-border-hairline mb-6 font-mono text-xs uppercase tracking-wider">
                    <span className="text-text-primary font-medium">System Interface & Wireframes</span>
                    <span className="text-text-muted">
                      {project.images.length} {project.images.length === 1 ? "Image" : "Images"}
                    </span>
                  </div>

                  <div className="space-y-8">
                    {project.images.map((image, idx) => (
                      <div
                        key={idx}
                        className="group border border-border-hairline glass-card hover-glow p-2 sm:p-4 rounded-xs"
                      >
                        <div className="relative aspect-[16/10] w-full overflow-hidden border border-border-hairline bg-surface-subtle rounded-xs">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1152px"
                            className="object-contain transition-transform duration-300 group-hover:scale-101"
                            priority={idx === 0}
                          />
                        </div>
                        <div className="pt-3 px-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] text-text-muted">
                          <span>{image.alt}</span>
                          {project.placeholder && (
                            <span className="text-accent uppercase tracking-wider">
                              [Placeholder Preview — Real Screenshot to be Added]
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Project Navigation: Previous & Next */}
            <FadeIn delay={0.2}>
              <div className="pt-10 border-t border-border-hairline flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
                {prevProject ? (
                  <Link
                    href={`/work/${prevProject.slug}`}
                    className="group flex flex-col items-start font-mono text-xs text-text-muted hover:text-accent transition-colors p-3 rounded-xs border border-transparent hover:border-border-hairline glass-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span className="text-[10px] uppercase tracking-wider text-text-muted group-hover:text-accent transition-transform duration-150 group-hover:-translate-x-1 inline-block">
                      ← Previous Project
                    </span>
                    <span className="text-sm font-serif text-text-primary group-hover:text-accent mt-1">
                      {prevProject.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                <Link
                  href="/#work"
                  className="text-center font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-accent transition-colors py-2.5 px-4 rounded-xs border border-border-hairline hover:border-border-strong glass-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  All Projects
                </Link>

                {nextProject ? (
                  <Link
                    href={`/work/${nextProject.slug}`}
                    className="group flex flex-col items-end text-right font-mono text-xs text-text-muted hover:text-accent transition-colors p-3 rounded-xs border border-transparent hover:border-border-hairline glass-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span className="text-[10px] uppercase tracking-wider text-text-muted group-hover:text-accent transition-transform duration-150 group-hover:translate-x-1 inline-block">
                      Next Project →
                    </span>
                    <span className="text-sm font-serif text-text-primary group-hover:text-accent mt-1">
                      {nextProject.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </FadeIn>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

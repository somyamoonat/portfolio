import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div id="top" className="min-h-screen flex flex-col bg-canvas text-text-primary">
      {/* Accessible Skip-to-content Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-surface focus:text-text-primary focus:border focus:border-border-strong focus:outline-accent font-mono text-xs uppercase tracking-wider shadow-sm"
      >
        Skip to content
      </a>

      {/* Header: Slim, quiet, sticky with border on scroll */}
      <Header />

      {/* Main Content Landmark */}
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* 00 / HERO: Large Typographic Statement */}
        <Hero />

        {/* 01 / SELECTED WORK: Editorial Numbered List with Hover Preview */}
        <SelectedWork />

        {/* 02 / ABOUT: Human Bio, 4:5 Refined Portrait Frame, and Currently List */}
        <About />

        {/* 03 / EXPERIENCE: Two-Column Timeline Ledger */}
        <Experience />

        {/* 04 / EDUCATION: Compact Typographic Degrees & Certifications */}
        <Education />

        {/* 05 / SKILLS: Plain Text Lists Grouped by Category */}
        <Skills />

        {/* 06 / CONTACT: Inquiries & Direct Conversion */}
        <Contact />
      </main>

      {/* Footer: Minimal Landmark */}
      <Footer />
    </div>
  );
}

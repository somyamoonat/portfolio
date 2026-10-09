import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { About } from "@/components/sections/About";
import { ExperienceEducation } from "@/components/sections/ExperienceEducation";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div id="top" className="min-h-screen flex flex-col bg-canvas text-text-primary">
      {/* Sticky Micro-Nav & Status Bar */}
      <Header />

      <main className="flex-1">
        {/* 00 / HERO: 5-Second Positioning Filter */}
        <Hero />

        {/* 01 / SELECTED WORK: Architectural Project Index */}
        <SelectedWork />

        {/* 02 / ABOUT: Background, Stance & Currently Ledger */}
        <About />

        {/* 03 / EXPERIENCE & EDUCATION: Chronological Ledger */}
        <ExperienceEducation />

        {/* 04 / SKILLS: Structured Domain Capabilities */}
        <Skills />

        {/* 05 / CONTACT: 60-Second Inquiries Terminal */}
        <Contact />
      </main>

      {/* Colophon & Footer */}
      <Footer />
    </div>
  );
}

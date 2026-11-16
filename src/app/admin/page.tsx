"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container, Heading } from "@/components/primitives";
import { ProjectManager } from "@/components/admin/ProjectManager";

export default function AdminPage() {
  const [managerOpen, setManagerOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-primary">
      <Header />

      <main className="flex-1 py-12 sm:py-20">
        <Container>
          <div className="max-w-2xl mx-auto border border-border-hairline p-8 sm:p-12 glass-card corner-ticks text-center space-y-6">
            <div className="font-mono text-xs uppercase tracking-widest text-accent">
              [ADMINISTRATION // PROJECT DOSSIER ENGINE]
            </div>

            <Heading as="h1" size="lg">
              Project Ledger &amp; Management Console
            </Heading>

            <p className="text-sm text-text-secondary leading-relaxed max-w-prose mx-auto">
              Manage your engineering projects, synchronize directly with GitHub repositories, and modify case studies live without leaving the application.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4 font-mono text-xs">
              <button
                type="button"
                onClick={() => setManagerOpen(true)}
                className="bg-text-primary text-canvas px-6 py-3 uppercase tracking-wider hover:bg-accent hover:text-white transition-colors rounded-xs font-semibold cursor-pointer"
              >
                Open Project Manager →
              </button>

              <Link
                href="/"
                className="border border-border-hairline text-text-muted hover:text-text-primary px-5 py-3 uppercase tracking-wider transition-colors rounded-xs inline-flex items-center"
              >
                ← Return to Portfolio
              </Link>
            </div>
          </div>
        </Container>
      </main>

      {/* The In-App Project Manager Drawer */}
      <ProjectManager isOpen={managerOpen} onClose={() => setManagerOpen(false)} />

      <Footer />
    </div>
  );
}

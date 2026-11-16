"use client";

import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container, Heading } from "@/components/primitives";
import { ProjectManager } from "@/components/admin/ProjectManager";

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-primary">
      <Header />

      <main className="flex-1 py-10 sm:py-16">
        <Container>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-hairline pb-4">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-1">
                [PRIVATE ADMIN CONSOLE // SOMYA MOONAT]
              </div>
              <Heading as="h1" size="lg">
                Project Dossier Ledger
              </Heading>
            </div>

            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-wider text-text-muted hover:text-accent border border-border-hairline hover:border-accent px-4 py-2 rounded-xs transition-colors self-start sm:self-auto inline-flex items-center gap-1.5"
            >
              <span>← Return to Site</span>
            </Link>
          </div>

          {/* Embedded Full Console */}
          <ProjectManager isOpen={true} onClose={() => {}} embedded={true} />
        </Container>
      </main>

      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container, Section, Heading, Button } from "@/components/primitives";
import { FadeIn } from "@/components/motion/FadeIn";

export const metadata: Metadata = {
  title: "404 — Index Not Found | Somya Moonat",
  description: "The requested route does not exist in this index.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-text-primary">
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 flex items-center focus:outline-none">
        <Section spacing="lg" bordered={false} className="w-full">
          <Container>
            <FadeIn>
              <div className="max-w-2xl border border-border-hairline bg-surface/40 p-8 sm:p-12 corner-ticks">
                {/* Monospace Error Index */}
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent mb-6">
                  <span>[404]</span>
                  <span className="text-text-muted">/</span>
                  <span className="text-text-secondary">INDEX NOT FOUND</span>
                </div>

                {/* Editorial Display Heading */}
                <Heading as="h1" size="display" className="mb-6">
                  Route does not exist.
                </Heading>

                {/* Factual, quiet text */}
                <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-10 max-w-[60ch]">
                  The requested URL was not located in this index. Return to the main dossier or explore selected engineering work.
                </p>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" href="/">
                    <span>Return to overview</span>
                    <span className="text-accent select-none">→</span>
                  </Button>

                  <Button variant="secondary" href="/#work">
                    <span>Selected work</span>
                    <span className="text-text-muted select-none">↓</span>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}

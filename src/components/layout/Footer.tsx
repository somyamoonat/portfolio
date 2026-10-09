import { profileData } from "@/content/profile";
import { Container } from "@/components/primitives";

export function Footer() {
  return (
    <footer className="py-12 bg-canvas text-text-muted font-mono text-xs">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 hairline-b">
          <div className="space-y-1">
            <div className="text-text-primary uppercase tracking-wider font-medium">
              {profileData.personal.name}
            </div>
            <div className="text-text-muted text-[11px]">
              {profileData.personal.domain} • Static-first Next.js
            </div>
          </div>

          {/* Typography Colophon */}
          <div className="text-[11px] text-text-muted space-y-0.5">
            <div>Typefaces: Instrument Serif + Plus Jakarta Sans + JetBrains Mono</div>
            <div>Palette: Atelier Noir with Signal Vermilion Accent</div>
          </div>

          <div className="text-right">
            <a
              href="#top"
              className="hover:text-accent transition-colors uppercase tracking-wider text-[11px]"
            >
              Back to top ↑
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-text-muted">
          <div>
            © 2026 {profileData.personal.name}. All rights reserved.
          </div>
          <div className="text-text-muted">
            Engineered with Next.js App Router & Tailwind CSS.
          </div>
        </div>
      </Container>
    </footer>
  );
}

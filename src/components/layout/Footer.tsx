import { profileData } from "@/content/profile";
import { Container, Link } from "@/components/primitives";
import { FadeIn } from "@/components/motion/FadeIn";

export function Footer() {
  const { personal, contact, socials } = profileData;

  return (
    <footer
      role="contentinfo"
      className="py-12 border-t border-border-hairline bg-canvas text-text-muted font-mono text-xs"
    >
      <Container>
        <FadeIn>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-border-hairline">
          {/* Email link */}
          <div>
            <Link
              href={`mailto:${contact.email}`}
              variant="editorial"
              className="text-xs text-text-secondary"
            >
              {contact.email}
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-6">
            {socials.github && (
              <Link
                href={socials.github.url}
                variant="mono"
                external
              >
                GitHub
              </Link>
            )}
            {socials.linkedin && (
              <Link
                href={socials.linkedin.url}
                variant="mono"
                external
              >
                LinkedIn
              </Link>
            )}
            {socials.x && (
              <Link
                href={socials.x.url}
                variant="mono"
                external
              >
                X
              </Link>
            )}
          </div>
        </div>

          {/* Copyright notice */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-text-muted">
            <div>
              © 2026 {personal.name}
            </div>
            <div>
              somyamoonat.tech
            </div>
          </div>
        </FadeIn>
      </Container>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { profileData } from "@/content/profile";
import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#work", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Background" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 bg-canvas/95 backdrop-blur-xs ${
        scrolled ? "hairline-b shadow-xs shadow-black/20" : "hairline-b"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs">
        {/* Left: Domain & Timezone marker */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-wider text-text-primary hover:text-accent transition-colors"
          >
            {profileData.personal.domain}
          </Link>
          <span className="hidden sm:inline font-mono text-[11px] text-text-muted">
            [IST UTC+5:30]
          </span>
        </div>

        {/* Center: Live Availability Indicator */}
        <div className="hidden md:flex items-center gap-2 font-mono text-[11px] text-text-secondary">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          <span className="truncate max-w-[260px]">
            {profileData.personal.status.statusText}
          </span>
        </div>

        {/* Right: Desktop Navigation + Theme Toggle */}
        <div className="hidden sm:flex items-center gap-6">
          <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-text-secondary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-accent transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="hairline-l pl-5">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary p-2 -mr-2"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? "[Close]" : "[Menu]"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden hairline-b bg-surface px-4 py-4 flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
          <div className="flex items-center justify-between gap-2 text-[11px] text-text-muted pb-2 hairline-b">
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
              <span>{profileData.personal.status.statusText}</span>
            </div>
            <ThemeToggle />
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-secondary hover:text-accent py-1"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

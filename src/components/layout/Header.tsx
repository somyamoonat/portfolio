"use client";

import Link from "next/link";
import { profileData } from "@/content/profile";
import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Accessible Focus Trap and Esc listener for Mobile Menu
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileMenuOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<
          HTMLAnchorElement | HTMLButtonElement
        >('a[href], button:not([disabled])');

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Focus the first item in the menu
    const firstFocusable = menuRef.current?.querySelector<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    firstFocusable?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/#work", label: "Work" },
    { href: "/#about", label: "About" },
    { href: "/#experience", label: "Background" },
    { href: "/#skills", label: "Skills" },
    { href: "/#contact", label: "Contact" },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <header
      role="banner"
      className={`sticky top-0 z-40 w-full transition-colors duration-150 bg-canvas ${
        scrolled ? "border-b border-border-hairline" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs">
        {/* Left: Name / Wordmark */}
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-wider text-text-primary hover:text-accent transition-colors font-medium min-h-[44px] inline-flex items-center py-1 px-1.5 -mx-1.5 rounded-xs focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          {profileData.personal.name}
        </Link>

        {/* Right: Section Links + Theme Toggle */}
        <div className="hidden sm:flex items-center gap-6">
          <nav aria-label="Primary Navigation" className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-text-secondary">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-accent transition-colors min-h-[44px] inline-flex items-center py-1 px-1.5 -mx-1.5 rounded-xs focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="border-l border-border-hairline pl-5 flex items-center">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-3">
          <ThemeToggle />
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary p-2 -mr-2 rounded-xs focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 cursor-pointer min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-dialog"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? "[Close]" : "[Menu]"}
          </button>
        </div>
      </div>

      {/* Accessible Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          ref={menuRef}
          className="sm:hidden border-b border-border-hairline bg-canvas px-4 py-6 flex flex-col gap-4 font-mono text-xs uppercase tracking-wider"
        >
          <div className="flex items-center gap-2 text-[11px] text-text-muted pb-3 border-b border-border-hairline">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" />
            <span>{profileData.personal.status.statusText}</span>
          </div>

          <nav aria-label="Mobile Menu Navigation" className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="text-text-secondary hover:text-accent transition-colors min-h-[44px] flex items-center py-2 px-2.5 -mx-2 rounded-xs focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

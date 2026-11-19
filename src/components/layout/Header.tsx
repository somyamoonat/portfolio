"use client";

import Link from "next/link";
import { profileData } from "@/content/profile";
import { useState, useEffect, useRef } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ProjectManager } from "@/components/admin/ProjectManager";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from "motion/react";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [projectManagerOpen, setProjectManagerOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll depth tracking for editorial progress hairline rule
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 35,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleOpenAdmin = () => setProjectManagerOpen(true);
    const handleOpenCmd = () => setCommandPaletteOpen(true);

    window.addEventListener("open-project-manager", handleOpenAdmin);
    window.addEventListener("open-command-palette", handleOpenCmd);

    // Global Keyboard Shortcuts:
    // Cmd+K / Ctrl+K -> Command Palette
    // Cmd+Shift+E / Ctrl+Shift+E -> Project Manager / Admin
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "E" || e.key === "e")) {
        e.preventDefault();
        setProjectManagerOpen((prev) => !prev);
      } else if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // URL parameter trigger: ?admin=1 or ?edit=1
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("admin") === "1" || params.get("edit") === "1") {
        setTimeout(() => setProjectManagerOpen(true), 0);
      }
    }

    return () => {
      window.removeEventListener("open-project-manager", handleOpenAdmin);
      window.removeEventListener("open-command-palette", handleOpenCmd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
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
    { href: "/#endorsements", label: "Endorsements" },
    { href: "/#writing", label: "Writing" },
    { href: "/#contact", label: "Contact" },
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <header
      role="banner"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "glass-panel border-b border-border-hairline shadow-[0_4px_20px_-10px_var(--accent-subtle)]"
          : "bg-canvas/90 backdrop-blur-xs border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between text-xs">
        {/* Left: Name / Wordmark with subtle spring hover */}
        <Link
          href="/"
          className="group font-mono text-xs uppercase tracking-wider text-text-primary hover:text-accent transition-colors font-medium min-h-[44px] inline-flex items-center py-1 px-1.5 -mx-1.5 rounded-xs focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
        >
          <span className="relative">
            {profileData.personal.name}
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-200 group-hover:w-full"
            />
          </span>
        </Link>

        {/* Right: Section Links with Spring Hover Pill + Resume Button + Theme Toggle */}
        <div className="hidden sm:flex items-center gap-5">
          <nav
            aria-label="Primary Navigation"
            className="relative flex items-center gap-0.5 font-mono text-xs uppercase tracking-wider text-text-secondary"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredNav(link.href)}
                className="relative hover:text-accent transition-colors min-h-[44px] inline-flex items-center py-1.5 px-2.5 rounded-xs focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 text-[11px]"
              >
                {hoveredNav === link.href && !shouldReduceMotion && (
                  <motion.span
                    layoutId="headerNavHover"
                    className="absolute inset-1 bg-surface-subtle/80 border border-border-hairline rounded-xs -z-10"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 28,
                      mass: 0.6,
                    }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            ))}
          </nav>

          <div className="border-l border-border-hairline pl-4 flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="group font-mono text-[11px] text-text-muted hover:text-text-primary px-2 py-1 rounded-xs border border-border-hairline hover:border-border-subtle bg-surface-subtle/50 transition-colors inline-flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent cursor-pointer min-h-[30px]"
              aria-label="Search portfolio and quick actions (Cmd + K)"
              title="Quick Search & Commands (⌘K / Ctrl+K)"
            >
              <span className="text-[10px] text-text-muted group-hover:text-text-secondary transition-colors">
                Search
              </span>
              <kbd className="px-1 py-0.2 rounded-2xs bg-surface border border-border-subtle text-[10px] font-mono leading-none text-text-secondary group-hover:text-accent group-hover:border-accent/40 transition-colors">
                ⌘K
              </kbd>
            </button>

            <a
              href={profileData.contact.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-wider text-text-primary hover:text-accent border border-border-hairline hover:border-accent bg-surface-subtle/60 px-2.5 py-1 transition-colors inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-accent min-h-[30px]"
              aria-label="View or download resume (opens in new tab)"
            >
              <span>Resume</span>
              <span className="text-text-muted select-none text-[10px]" aria-hidden="true">↗</span>
            </a>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            className="font-mono text-[11px] text-text-muted hover:text-text-primary px-2 py-1 rounded-xs border border-border-hairline bg-surface-subtle/50 transition-colors inline-flex items-center gap-1 min-h-[44px] cursor-pointer"
            aria-label="Open command search"
          >
            <span className="text-[10px]">Search</span>
            <kbd className="px-1 py-0.5 rounded-2xs bg-surface border border-border-subtle text-[9px] font-mono text-text-secondary">
              ⌘K
            </kbd>
          </button>
          <ThemeToggle />
          <motion.button
            ref={triggerRef}
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-text-primary p-2 -mr-2 rounded-xs focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 cursor-pointer min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-dialog"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? "[Close]" : "[Menu]"}
          </motion.button>
        </div>
      </div>

      {/* Accessible Animated Mobile navigation drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { type: "spring", stiffness: 320, damping: 28 }
            }
            className="overflow-hidden sm:hidden border-b border-border-hairline glass-panel px-4 py-6 flex flex-col gap-4 font-mono text-xs uppercase tracking-wider"
          >
            <div className="flex items-center gap-2 text-[11px] text-text-muted pb-3 border-b border-border-hairline">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>{profileData.personal.status.statusText}</span>
            </div>

            <motion.nav
              aria-label="Mobile Menu Navigation"
              initial="closed"
              animate="open"
              variants={{
                open: {
                  transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.05,
                    delayChildren: shouldReduceMotion ? 0 : 0.04,
                  },
                },
                closed: {},
              }}
              className="flex flex-col gap-1.5"
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -10 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="text-text-secondary hover:text-accent transition-colors min-h-[44px] flex items-center py-2 px-2.5 -mx-2 rounded-xs focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 hover:bg-surface-subtle/50"
                >
                  <span className="mr-2 text-text-muted select-none">→</span>
                  <span>{link.label}</span>
                </motion.a>
              ))}

              <div className="pt-3 mt-1 border-t border-border-hairline space-y-2">
                <a
                  href={profileData.contact.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] w-full flex items-center justify-between py-2 px-3 bg-surface-subtle border border-border-hairline text-text-primary hover:text-accent hover:border-accent transition-colors"
                >
                  <span>DOWNLOAD RESUME</span>
                  <span className="text-text-muted select-none" aria-hidden="true">↗</span>
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editorial reading progress hairline rule */}
      <motion.div
        style={{ scaleX }}
        className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent origin-left pointer-events-none z-50"
        aria-hidden="true"
      />

      {/* Global In-App Project Manager Drawer */}
      <ProjectManager
        isOpen={projectManagerOpen}
        onClose={() => setProjectManagerOpen(false)}
      />

      {/* Global Developer Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />
    </header>
  );
}

"use client";

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { profileData } from "@/content/profile";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

interface CommandItem {
  id: string;
  category: "Navigation" | "Projects" | "Actions" | "Profiles";
  title: string;
  subtitle?: string;
  badge?: string;
  shortcut?: string;
  action: () => void;
}

function subscribeMounted() {
  return () => {};
}
function getMountedSnapshot() {
  return true;
}
function getServerMountedSnapshot() {
  return false;
}

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const isMounted = useSyncExternalStore(
    subscribeMounted,
    getMountedSnapshot,
    getServerMountedSnapshot
  );

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedNotice, setCopiedNotice] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();

  const handleClose = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    setCopiedNotice(null);
    onClose();
  }, [onClose]);

  // Focus input when palette opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll when palette is active
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // Construct items
  const items: CommandItem[] = [
    // --- Actions ---
    {
      id: "action-copy-email",
      category: "Actions",
      title: "Copy Email Address",
      subtitle: profileData.contact.email,
      badge: "CLIPBOARD",
      action: async () => {
        try {
          await navigator.clipboard.writeText(profileData.contact.email);
          setCopiedNotice("Email copied to clipboard!");
          setTimeout(() => {
            handleClose();
          }, 800);
        } catch {
          window.location.assign(`mailto:${profileData.contact.email}`);
          handleClose();
        }
      },
    },
    {
      id: "action-download-resume",
      category: "Actions",
      title: "Download Résumé (PDF)",
      subtitle: "Open official curriculum vitae in new tab",
      badge: "PDF ↗",
      action: () => {
        window.open(profileData.contact.resumeUrl, "_blank", "noopener,noreferrer");
        handleClose();
      },
    },
    {
      id: "action-toggle-theme",
      category: "Actions",
      title: "Toggle Visual Theme",
      subtitle: "Switch between Atelier Dark and Ivory Light themes",
      badge: "THEME",
      action: () => {
        const currentTheme =
          document.documentElement.getAttribute("data-theme") === "light"
            ? "light"
            : "dark";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", nextTheme);
        document.documentElement.setAttribute("data-theme", nextTheme);
        if (nextTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        handleClose();
      },
    },
    {
      id: "action-admin",
      category: "Actions",
      title: "Project CMS & Photo Manager",
      subtitle: "In-App Admin: edit photos, projects, and cover shots",
      badge: "ADMIN",
      shortcut: "⌘⇧E",
      action: () => {
        handleClose();
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("open-project-manager"));
        }, 150);
      },
    },

    // --- Navigation Sections ---
    {
      id: "nav-hero",
      category: "Navigation",
      title: "00 / Top & Hero",
      subtitle: "Introduction, core statement, and focus areas",
      badge: "SECTION",
      action: () => {
        handleClose();
        router.push("/#top");
      },
    },
    {
      id: "nav-work",
      category: "Navigation",
      title: "01 / Selected Work",
      subtitle: "Production engineering dossiers and live applications",
      badge: "SECTION",
      action: () => {
        handleClose();
        router.push("/#work");
      },
    },
    {
      id: "nav-about",
      category: "Navigation",
      title: "02 / About & Philosophy",
      subtitle: "Engineering background, technical values, and metrics",
      badge: "SECTION",
      action: () => {
        handleClose();
        router.push("/#about");
      },
    },
    {
      id: "nav-experience",
      category: "Navigation",
      title: "03 / Professional Experience",
      subtitle: "Work, research, and technical leadership history",
      badge: "SECTION",
      action: () => {
        handleClose();
        router.push("/#experience");
      },
    },
    {
      id: "nav-education",
      category: "Navigation",
      title: "04 / Education & Academics",
      subtitle: "Academic degrees, coursework, and certifications",
      badge: "SECTION",
      action: () => {
        handleClose();
        router.push("/#education");
      },
    },
    {
      id: "nav-skills",
      category: "Navigation",
      title: "05 / Technical Skills",
      subtitle: "Languages, machine learning stacks, and web systems",
      badge: "SECTION",
      action: () => {
        handleClose();
        router.push("/#skills");
      },
    },
    {
      id: "nav-endorsements",
      category: "Navigation",
      title: "06 / Endorsements & Vouches",
      subtitle: "Mentors, collaborators, and leadership references",
      badge: "SECTION",
      action: () => {
        handleClose();
        router.push("/#endorsements");
      },
    },
    {
      id: "nav-writing",
      category: "Navigation",
      title: "07 / Perspectives & Writing",
      subtitle: "Technical articles, architecture teardowns, and essays",
      badge: "SECTION",
      action: () => {
        handleClose();
        router.push("/#writing");
      },
    },
    {
      id: "nav-contact",
      category: "Navigation",
      title: "08 / Contact & Inquiry",
      subtitle: "Send direct note or copy contact coordinates",
      badge: "SECTION",
      action: () => {
        handleClose();
        router.push("/#contact");
      },
    },

    // --- Projects ---
    ...profileData.projects.map((project) => ({
      id: `project-${project.slug}`,
      category: "Projects" as const,
      title: project.title,
      subtitle: `${project.category} (${project.year}) — ${project.tagline}`,
      badge: project.liveUrl ? "LIVE APP" : "DOSSIER",
      action: () => {
        handleClose();
        router.push(`/#work`);
      },
    })),

    // --- Profiles & Accounts ---
    {
      id: "profile-github",
      category: "Profiles",
      title: "GitHub Profile",
      subtitle: profileData.socials.github?.url || "https://github.com/somyamoonat",
      badge: "EXTERNAL ↗",
      action: () => {
        window.open(profileData.socials.github.url, "_blank", "noopener,noreferrer");
        handleClose();
      },
    },
    {
      id: "profile-leetcode",
      category: "Profiles",
      title: "LeetCode Profile",
      subtitle: profileData.socials.leetcode?.url || "https://leetcode.com/u/somya_moonat/",
      badge: "DSA ↗",
      action: () => {
        window.open(profileData.socials.leetcode?.url, "_blank", "noopener,noreferrer");
        handleClose();
      },
    },
    {
      id: "profile-codeforces",
      category: "Profiles",
      title: "Codeforces Profile",
      subtitle: profileData.socials.codeforces?.url || "https://codeforces.com/profile/somyamoonat22",
      badge: "COMPETITIVE ↗",
      action: () => {
        window.open(profileData.socials.codeforces?.url, "_blank", "noopener,noreferrer");
        handleClose();
      },
    },
    {
      id: "profile-codechef",
      category: "Profiles",
      title: "CodeChef Profile",
      subtitle: profileData.socials.codechef?.url || "https://www.codechef.com/users/somya_moonat",
      badge: "COMPETITIVE ↗",
      action: () => {
        window.open(profileData.socials.codechef?.url, "_blank", "noopener,noreferrer");
        handleClose();
      },
    },
    {
      id: "profile-linkedin",
      category: "Profiles",
      title: "LinkedIn Profile",
      subtitle: profileData.socials.linkedin?.url || "https://www.linkedin.com/in/somya-moonat-041bb4421",
      badge: "NETWORK ↗",
      action: () => {
        window.open(profileData.socials.linkedin.url, "_blank", "noopener,noreferrer");
        handleClose();
      },
    },
    {
      id: "profile-x",
      category: "Profiles",
      title: "X (formerly Twitter)",
      subtitle: profileData.socials.x?.url || "https://x.com/somyamoonat",
      badge: "EXTERNAL ↗",
      action: () => {
        window.open(profileData.socials.x.url, "_blank", "noopener,noreferrer");
        handleClose();
      },
    },
  ];

  // Filtering based on query
  const cleanQuery = query.trim().toLowerCase();
  const filteredItems = cleanQuery
    ? items.filter((item) => {
        const text = `${item.title} ${item.subtitle || ""} ${item.badge || ""} ${item.category}`.toLowerCase();
        return text.includes(cleanQuery);
      })
    : items;

  // Handle keyboard navigation inside the palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredItems.length === 0 ? 0 : (prev + 1) % filteredItems.length
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredItems.length === 0
            ? 0
            : (prev - 1 + filteredItems.length) % filteredItems.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          filteredItems[selectedIndex].action();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, handleClose]);

  // Keep selected item scrolled into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector<HTMLElement>("[data-selected='true']");
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-8"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.18 }}
            onClick={handleClose}
            className="fixed inset-0 bg-canvas/75 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: -6 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="relative w-full max-w-xl bg-surface border border-border-strong shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border-hairline bg-surface-subtle/30">
              <span className="font-mono text-xs text-text-muted select-none">⌘</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or jump to section..."
                className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none font-sans"
                aria-label="Search command palette"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="font-mono text-[10px] text-text-muted hover:text-text-primary uppercase tracking-wider px-1.5 py-0.5 rounded-xs"
                >
                  Clear
                </button>
              )}
              <kbd className="hidden sm:inline-block font-mono text-[10px] text-text-muted bg-surface border border-border-subtle px-1.5 py-0.5 rounded-xs select-none">
                ESC
              </kbd>
            </div>

            {/* Copied Notification Pill */}
            {copiedNotice && (
              <div className="bg-accent text-white px-4 py-1.5 text-xs font-mono tracking-wider flex items-center justify-between">
                <span>{copiedNotice}</span>
                <span className="text-[10px] opacity-80">✓</span>
              </div>
            )}

            {/* Results List */}
            <div
              ref={listRef}
              role="listbox"
              className="flex-1 overflow-y-auto divide-y divide-border-hairline/40 overscroll-contain py-1"
            >
              {filteredItems.length === 0 ? (
                <div className="py-12 px-6 text-center text-text-muted text-xs font-mono">
                  No matching commands, sections, or projects found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      data-selected={isSelected}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={item.action}
                      className={`group px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-accent/10 border-l-2 border-accent pl-[14px]"
                          : "hover:bg-surface-subtle/60 border-l-2 border-transparent"
                      }`}
                    >
                      <div className="flex flex-col min-w-0 pr-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono text-xs tracking-tight truncate ${
                              isSelected ? "text-accent font-medium" : "text-text-primary"
                            }`}
                          >
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="font-mono text-[9px] uppercase tracking-wider px-1 py-0.5 rounded-2xs bg-surface-subtle border border-border-hairline text-text-muted group-hover:text-text-secondary">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        {item.subtitle && (
                          <span className="text-[11px] text-text-muted truncate mt-0.5">
                            {item.subtitle}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.shortcut && (
                          <kbd className="font-mono text-[10px] text-text-muted bg-surface border border-border-hairline px-1.5 py-0.5 rounded-2xs">
                            {item.shortcut}
                          </kbd>
                        )}
                        <span
                          className={`font-mono text-xs select-none transition-transform ${
                            isSelected ? "text-accent translate-x-0.5" : "text-border-subtle"
                          }`}
                        >
                          →
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Bar with Keyboard Cheatsheet */}
            <div className="px-4 py-2 border-t border-border-hairline bg-surface-subtle/50 flex items-center justify-between font-mono text-[10px] text-text-muted">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-surface border border-border-subtle rounded-2xs">↑</kbd>
                  <kbd className="px-1 py-0.5 bg-surface border border-border-subtle rounded-2xs">↓</kbd>
                  <span>navigate</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-surface border border-border-subtle rounded-2xs">↵</kbd>
                  <span>select</span>
                </span>
              </div>
              <span className="tracking-widest uppercase">
                {filteredItems.length} {filteredItems.length === 1 ? "RESULT" : "RESULTS"}
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

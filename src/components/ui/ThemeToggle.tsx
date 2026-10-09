"use client";

import { useEffect, useState } from "react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const active = document.documentElement.getAttribute("data-theme") as "light" | "dark" | null;
    if (active) {
      setTheme(active);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <span
        aria-hidden="true"
        className={`font-mono text-xs text-text-muted select-none ${className}`}
      >
        [--]
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-accent ${className}`}
    >
      [{theme === "dark" ? "Light" : "Dark"}]
    </button>
  );
}

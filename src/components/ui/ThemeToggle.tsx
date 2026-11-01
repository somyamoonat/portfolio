"use client";

import { useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function getServerSnapshot(): "light" | "dark" {
  return "dark";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const shouldReduceMotion = useReducedMotion();

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <motion.button
      type="button"
      whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.92 }}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`relative font-mono text-xs uppercase tracking-wider text-text-secondary hover:text-accent transition-colors min-h-[44px] min-w-[56px] inline-flex items-center justify-center py-1 px-2 -mx-1 rounded-xs focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 cursor-pointer ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, filter: "blur(2px)" }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="inline-flex items-center"
        >
          [{theme === "dark" ? "Light" : "Dark"}]
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  const sizeClasses = {
    sm: "min-h-[44px] px-3.5 py-2 text-[11px]",
    md: "min-h-[44px] px-5 py-2.5 text-xs",
    lg: "min-h-[48px] px-6 py-3.5 text-sm",
  };

  const variantClasses = {
    primary:
      "bg-text-primary text-canvas font-semibold hover:bg-accent hover:text-white active:opacity-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent shadow-[0_2px_10px_-4px_rgba(0,0,0,0.15)]",
    secondary:
      "hairline-all bg-surface text-text-primary hover:border-accent hover:text-accent hover-glow active:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
    ghost:
      "text-text-secondary hover:text-accent hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
  };

  const baseClasses =
    "group inline-flex items-center justify-center gap-2 font-mono uppercase tracking-wider select-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed";

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const motionProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { scale: 1.015, y: -1 },
        whileTap: { scale: 0.98, y: 0 },
        transition: { type: "spring" as const, stiffness: 450, damping: 25 },
      };

  if (href) {
    const isExternal =
      target === "_blank" ||
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:");

    return (
      <motion.a
        href={href}
        target={target || (isExternal ? "_blank" : undefined)}
        rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
        className={combinedClasses}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      disabled={disabled}
      className={combinedClasses}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  );
}

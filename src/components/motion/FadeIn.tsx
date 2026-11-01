"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
  spring?: boolean;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  distance = 16,
  className = "",
  as = "div",
  spring = true,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialOffsets = () => {
    if (shouldReduceMotion || direction === "none") return { x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initial = getInitialOffsets();

  const Component =
    as === "li"
      ? motion.li
      : as === "section"
      ? motion.section
      : as === "article"
      ? motion.article
      : as === "span"
      ? motion.span
      : motion.div;

  return (
    <Component
      initial={{
        opacity: 0,
        x: initial.x,
        y: initial.y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: "0px 0px -40px 0px", amount: 0.08 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : spring
          ? {
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.8,
              delay: Math.min(delay, 0.3),
            }
          : {
              duration: 0.45,
              delay: Math.min(delay, 0.3),
              ease: [0.16, 1, 0.3, 1],
            }
      }
      className={className}
    >
      {children}
    </Component>
  );
}

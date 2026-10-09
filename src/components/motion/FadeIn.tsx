"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "none";
  className?: string;
  as?: "div" | "li" | "section" | "article";
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  as = "div",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialY = () => {
    if (shouldReduceMotion || direction === "none") return 0;
    return direction === "up" ? 14 : -14;
  };

  const Component =
    as === "li"
      ? motion.li
      : as === "section"
      ? motion.section
      : as === "article"
      ? motion.article
      : motion.div;

  return (
    <Component
      initial={{
        opacity: 0,
        y: getInitialY(),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: "0px 0px 250px 0px", amount: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.35,
        delay: shouldReduceMotion ? 0 : Math.min(delay, 0.15),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </Component>
  );
}

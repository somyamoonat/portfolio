"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "none";
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialY = () => {
    if (shouldReduceMotion || direction === "none") return 0;
    return direction === "up" ? 14 : -14;
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: getInitialY(),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

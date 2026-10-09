"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.35,
        ease: "easeOut",
      }}
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 120,
              damping: 20,
              mass: 0.8,
            }
      }
      className="flex-1 flex flex-col"
    >
      {children}
    </motion.div>
  );
}

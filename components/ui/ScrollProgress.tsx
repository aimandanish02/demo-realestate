"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";

/* Thin scroll-position indicator pinned above the nav. Reads as scroll
   guidance without a "scroll down" label. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const reduce = useReducedMotion();

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent"
    />
  );
}

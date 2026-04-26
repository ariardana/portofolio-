"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Background layers: soft grid + animated radial gradient orbs.
 * Respects prefers-reduced-motion.
 */
export default function Background() {
  const reduce = useReducedMotion();

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hero-glow"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-grid-soft opacity-50"
      />

      {/* Floating orbs */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -left-32 top-24 z-0 h-72 w-72 rounded-full bg-accent-400/10 blur-3xl"
        animate={
          reduce
            ? undefined
            : {
                x: [0, 24, -12, 0],
                y: [0, -16, 12, 0],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed -right-32 top-1/3 z-0 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl"
        animate={
          reduce
            ? undefined
            : {
                x: [0, -28, 14, 0],
                y: [0, 18, -10, 0],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-1/2 bottom-0 z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/8 blur-3xl"
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.6, 1, 0.6],
              }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

"use client";

import config from "../config";

/**
 * Background layers: animated cyber grid + scanlines + film noise.
 * Toggleable via `config.theme.*`.
 */
export default function Background() {
  return (
    <>
      {config.theme.enableGrid && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 bg-grid opacity-70"
        />
      )}

      {/* Sweeping horizon line */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-50"
      />

      {/* Big neon orbs */}
      <div
        aria-hidden
        className="pointer-events-none fixed -left-32 top-32 z-0 h-72 w-72 rounded-full bg-neon-cyan/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -right-32 top-1/2 z-0 h-96 w-96 rounded-full bg-neon-magenta/10 blur-3xl"
      />

      {/* Scanline sweep (a single moving line) */}
      {config.theme.enableScanlines && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24 bg-gradient-to-b from-neon-cyan/0 via-neon-cyan/10 to-transparent animate-scan"
        />
      )}
    </>
  );
}

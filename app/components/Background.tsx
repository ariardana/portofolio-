/**
 * Subtle background layers: soft grid + radial accent. Sits behind all content.
 */
export default function Background() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 hero-glow"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-grid-soft opacity-60"
      />
    </>
  );
}

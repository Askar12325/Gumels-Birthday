/**
 * Clamp DPR to [1, 2] for performance.
 */
export function clampedDpr(): number {
  return Math.min(Math.max(window.devicePixelRatio ?? 1, 1), 2);
}

/**
 * Detect mobile (narrow viewport) for particle count branching.
 */
export function isMobile(): boolean {
  return window.innerWidth < 768;
}

/**
 * Map a value from one range to another.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}

/**
 * Linear interpolation.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Returns true if the user prefers reduced motion.
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

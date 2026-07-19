export function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n))
}

export function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
}


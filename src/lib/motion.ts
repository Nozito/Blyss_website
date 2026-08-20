export const EASE_SOFT = "cubic-bezier(0.16, 1, 0.3, 1)";

export const REVEAL_OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 0.2,
  rootMargin: "0px 0px -10% 0px",
};

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

export const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;

export const rangeProgress = (p: number, start: number, end: number) =>
  clamp01((p - start) / Math.max(end - start, 0.0001));

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = rangeProgress(x, edge0, edge1);
  return t * t * (3 - 2 * t);
};

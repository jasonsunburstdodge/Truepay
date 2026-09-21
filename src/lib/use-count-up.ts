"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animates a displayed number toward `target` over `durationMs` whenever
 * `target` changes, instead of snapping instantly. Respects
 * prefers-reduced-motion by jumping straight to the target.
 */
export function useCountUp(target: number, durationMs = 400) {
  const [displayValue, setDisplayValue] = useState(target);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      // Defer out of the synchronous effect body (react-hooks/set-state-in-effect)
      // — still resolves within a frame, well before it'd be perceptible.
      const raf = requestAnimationFrame(() => setDisplayValue(target));
      return () => cancelAnimationFrame(raf);
    }

    const startValue = displayValue;
    const delta = target - startValue;
    if (delta === 0) return;

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(startValue + delta * eased);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    frameRef.current = requestAnimationFrame(step);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs]);

  return displayValue;
}

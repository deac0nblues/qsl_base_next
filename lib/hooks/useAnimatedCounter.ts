'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to `target` over `duration` ms.
 * Preserves decimal precision based on the target value.
 * Pass `enabled = false` to hold at 0 until ready (e.g. waiting for viewport).
 */
export default function useAnimatedCounter(
  target: number,
  duration: number = 1200,
  enabled: boolean = true,
): number {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled) {
      setValue(0);
      return;
    }

    if (duration <= 0) {
      setValue(target);
      return;
    }

    // Determine decimal precision from target to preserve fractional digits
    const decStr = String(target).split('.')[1];
    const decimals = decStr ? decStr.length : 0;
    const factor = Math.pow(10, decimals);

    const start = performance.now();
    const from = 0;

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const raw = from + (target - from) * eased;
      setValue(Math.round(raw * factor) / factor);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration, enabled]);

  return value;
}

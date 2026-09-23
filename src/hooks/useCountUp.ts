"use client";

import { useEffect, useState } from "react";

/** 0 から target まで数値をアニメーションさせる（easeOutCubic） */
export function useCountUp(target: number, durationMs = 1100, enabled = true): number {
  const [value, setValue] = useState(enabled ? 0 : target);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, enabled]);

  return enabled ? value : target;
}

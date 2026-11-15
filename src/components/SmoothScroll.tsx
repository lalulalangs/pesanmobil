"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let isCancelled = false;
    let instance: { destroy: () => void } | null = null;

    import("lenis").then(({ default: Lenis }) => {
      if (isCancelled) return;
      instance = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        anchors: true,
        duration: 1.1,
      });
    });

    return () => {
      isCancelled = true;
      instance?.destroy();
    };
  }, []);

  return null;
}

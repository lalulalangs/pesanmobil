"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: true,
      anchors: true,
      duration: 1.1,
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

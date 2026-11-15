"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { parseConfig, type GradientConfig } from "hazeglow";
import { ArrowRight } from "lucide-react";
import { useLanguage, type Locale } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";

const Hazeglow = dynamic(
  () => import("hazeglow").then((mod) => mod.Hazeglow),
  { ssr: false }
);

export interface HeroCopy {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export const DEFAULT_HERO_HAZEGLOW_CONFIG = parseConfig({
  version: 1,
  seed: 6,
  shape: "pill",
  center: [0.88, 0.86],
  size: [0.73, 0.99],
  roundness: 0,
  softness: 1,
  rotation: 44,
  rampDirection: 1,
  angle: 360,
  warp: 0,
  warpScale: 0.5,
  palette: [
    "#4fc4f0",
    "#a8e0f0",
    "#f0d9a0",
    "#f2a13a",
    "#f0603c",
    "#e83fd0",
  ],
  background: "#fefefe",
  mesh: [],
  grain: 0.4,
  motion: "flow",
  speed: 0.9,
  loop: 10,
  hover: 0,
  hoverMode: "push",
  effect: "none",
  effectSize: 4,
  effectAmount: 0.15,
});

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  localizedCopy?: Partial<Record<Locale, HeroCopy>>;
  logoSrc?: string;
  logoAlt?: string;
  backgroundConfig?: GradientConfig;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Full-bleed hero section with a responsive WebGL2 Hazeglow background
 * that adapts dynamically across all viewport sizes.
 */
export function HeroSection({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  localizedCopy,
  logoSrc,
  logoAlt = "pesanmobil.com",
  backgroundConfig = DEFAULT_HERO_HAZEGLOW_CONFIG,
  className = "",
  children,
}: HeroSectionProps) {
  const { locale } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setPrefersReducedMotion(mediaQuery.matches);
    const frameId = requestAnimationFrame(updateMotion);
    mediaQuery.addEventListener("change", updateMotion);

    const target = sectionRef.current;
    let observer: IntersectionObserver | null = null;
    if (target) {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.05 }
      );
      observer.observe(target);
    }

    return () => {
      cancelAnimationFrame(frameId);
      mediaQuery.removeEventListener("change", updateMotion);
      observer?.disconnect();
    };
  }, []);

  const effectiveConfig = useMemo<GradientConfig>(() => {
    if (!isVisible || prefersReducedMotion) {
      return { ...backgroundConfig, speed: 0 };
    }
    return backgroundConfig;
  }, [backgroundConfig, isVisible, prefersReducedMotion]);

  const activeCopy = localizedCopy?.[locale];
  const resolvedTitle = activeCopy?.title ?? title;
  const resolvedSubtitle = activeCopy?.subtitle ?? subtitle;
  const resolvedCtaLabel = activeCopy?.ctaLabel ?? ctaLabel;
  const resolvedCtaHref = activeCopy?.ctaHref ?? ctaHref;

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      className={`relative isolate w-full h-[100svh] min-h-[100svh] overflow-hidden flex items-end justify-start bg-[#fefefe] font-sans pt-20 pb-8 sm:pt-28 sm:pb-16 lg:pb-20 ${className}`}
    >
      <Hazeglow
        config={effectiveConfig}
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
      />

      {/* Seamless bottom fade into the next section background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-28 sm:h-40 bg-gradient-to-b from-transparent to-[var(--bg)]"
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="w-full max-w-xl flex flex-col items-start text-left gap-3 sm:gap-4">
          {logoSrc && (
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={220}
              height={45}
              priority
              className="h-9 sm:h-11 w-auto object-contain"
            />
          )}

          <h1 className="font-sans text-[34px] sm:text-[48px] lg:text-[56px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#1d1d1f]">
            {resolvedTitle}
          </h1>

          {resolvedSubtitle && (
            <p className="max-w-md text-[15px] sm:text-base font-normal leading-relaxed text-[#525252]">
              {resolvedSubtitle}
            </p>
          )}

          {resolvedCtaLabel && resolvedCtaHref && (
            <div className="mt-2 w-full sm:w-auto">
              <Button
                variant="cta"
                nativeButton={false}
                render={
                  <a
                    href={resolvedCtaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="h-auto w-full sm:w-auto gap-2 px-6 py-3.5 sm:py-3 text-[15px]"
              >
                <span>{resolvedCtaLabel}</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </Button>
            </div>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}

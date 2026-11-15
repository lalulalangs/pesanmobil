"use client";

import { useId, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Film, Image as ImageIcon, Play } from "lucide-react";
import { useLanguage, type Locale } from "@/components/LanguageProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface MediaItem {
  id: string;
  kind: "video" | "image";
  title: Record<Locale, string>;
  ratioLabel: string;
  src?: string;
}

const PRIMARY_MEDIA: MediaItem = {
  id: "video-handover",
  kind: "video",
  title: {
    id: "Serah Terima Unit",
    en: "Vehicle Handover",
  },
  ratioLabel: "Video 4:5",
};

const SECONDARY_MEDIA: MediaItem[] = [
  {
    id: "video-walkthrough",
    kind: "video",
    title: {
      id: "Cek Kondisi Armada",
      en: "Fleet Inspection",
    },
    ratioLabel: "Video 16:9",
  },
  {
    id: "photo-interior",
    kind: "image",
    title: {
      id: "Interior Kabin Bersih",
      en: "Clean Cabin Interior",
    },
    ratioLabel: "Foto 1:1",
  },
  {
    id: "photo-exterior",
    kind: "image",
    title: {
      id: "Eksterior Siap Jalan",
      en: "Road-Ready Exterior",
    },
    ratioLabel: "Foto 1:1",
  },
];

interface MediaCopy {
  sectionLabel: string;
  headline: string;
  playVideoLabel: (title: string) => string;
  previewActiveNote: string;
}

const COPY: Record<Locale, MediaCopy> = {
  id: {
    sectionLabel: "Galeri foto dan video armada",
    headline: "Intip kondisi unit sebelum jalan",
    playVideoLabel: (title) => `Putar video ${title}`,
    previewActiveNote: "Aset video akan segera tersedia",
  },
  en: {
    sectionLabel: "Fleet photo and video gallery",
    headline: "Take a closer look before you drive",
    playVideoLabel: (title) => `Play video ${title}`,
    previewActiveNote: "Video asset coming soon",
  },
};

export function MediaGallerySection() {
  const { locale } = useLanguage();
  const copy = COPY[locale];
  const rawId = useId().replace(/:/g, "");
  const filterId = `blackhole-warp-${rawId}`;

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      const turbulence = turbulenceRef.current;
      const displacement = displacementRef.current;
      if (!grid) return;

      const cards = gsap.utils.toArray<HTMLElement>(
        "[data-gallery-card]",
        grid
      );
      if (cards.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const gridRect = grid.getBoundingClientRect();
        const centerX = gridRect.left + gridRect.width / 2;
        const centerY = gridRect.top + gridRect.height / 2;

        // Compute radial pull vectors toward the center singularity per card
        const vectors = cards.map((card) => {
          const rect = card.getBoundingClientRect();
          const dx = centerX - (rect.left + rect.width / 2);
          const dy = centerY - (rect.top + rect.height / 2);
          const angleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
          return {
            x: dx * 0.72,
            y: dy * 0.72,
            rotation: Math.max(-18, Math.min(18, angleDeg * 0.12)),
          };
        });

        gsap.set(cards, {
          opacity: 0,
          x: (index) => vectors[index].x,
          y: (index) => vectors[index].y,
          scaleX: 0.18,
          scaleY: 1.75,
          skewX: (index) => (index % 2 === 0 ? -16 : 16),
          rotation: (index) => vectors[index].rotation,
          clipPath: "inset(10% 24% 10% 24% round 999px)",
          filter: `url(#${filterId})`,
          transformPerspective: 1000,
          rotationX: 22,
        });

        if (displacement) {
          gsap.set(displacement, { attr: { scale: 72 } });
        }
        if (turbulence) {
          gsap.set(turbulence, { attr: { baseFrequency: "0.032 0.012" } });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: grid,
            start: "top 86%",
            once: true,
          },
          onComplete: () => {
            gsap.set(cards, {
              clearProps: "transform,filter,clipPath,opacity",
            });
          },
        });

        // Phase 1: Spaghettification snap out of the singularity
        tl.to(cards, {
          opacity: 1,
          x: 0,
          y: 0,
          scaleX: 1.04,
          scaleY: 0.96,
          skewX: 0,
          rotation: 0,
          rotationX: 0,
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          duration: 0.72,
          stagger: { amount: 0.18, from: "center" },
          ease: "power4.out",
        });

        // Unwind SVG gravitational distortion in parallel
        if (displacement) {
          tl.to(
            displacement,
            {
              attr: { scale: 0 },
              duration: 0.85,
              ease: "power3.out",
            },
            0
          );
        }
        if (turbulence) {
          tl.to(
            turbulence,
            {
              attr: { baseFrequency: "0.002 0.002" },
              duration: 0.85,
              ease: "power2.out",
            },
            0
          );
        }

        // Phase 2: Elastic rebound to crisp normal layout
        tl.to(
          cards,
          {
            scaleX: 1,
            scaleY: 1,
            duration: 0.48,
            stagger: { amount: 0.1, from: "center" },
            ease: "elastic.out(1, 0.65)",
          },
          "-=0.22"
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [filterId] }
  );

  const renderCard = (item: MediaItem, sizeClass: string) => {
    const title = item.title[locale];
    const isVideo = item.kind === "video";
    const isPreviewing = activeVideoId === item.id;

    return (
      <article
        key={item.id}
        data-gallery-card
        className={`group relative w-full rounded-2xl overflow-hidden bg-[var(--bg)] border border-[var(--border)] focus-within:ring-2 focus-within:ring-[var(--brand)] focus-within:ring-offset-2 ${sizeClass}`}
      >
        {isVideo && item.src && isPreviewing ? (
          <video
            src={item.src}
            controls
            playsInline
            autoPlay
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="relative h-full w-full bg-[#f1f5f9] flex flex-col items-center justify-center p-5 text-center transition-transform duration-300 ease-out group-hover:scale-[1.02]">
            {isVideo ? (
              <button
                type="button"
                onClick={() =>
                  setActiveVideoId((prev) =>
                    prev === item.id ? null : item.id
                  )
                }
                aria-label={copy.playVideoLabel(title)}
                className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--cta)] text-[var(--cta-on)] shadow-[0_2px_8px_rgba(234,88,12,0.28)] transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
              >
                <Play
                  className="w-5 h-5 fill-current ml-0.5"
                  aria-hidden="true"
                />
              </button>
            ) : (
              <ImageIcon
                className="mb-3 w-7 h-7 text-[var(--muted-text)]"
                aria-hidden="true"
              />
            )}

            <p className="text-[13px] font-medium text-[var(--fg-2)]">
              {item.ratioLabel}
            </p>
            {isVideo && isPreviewing ? (
              <p className="mt-1 text-[12px] text-[var(--muted-text)] flex items-center gap-1">
                <Film className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{copy.previewActiveNote}</span>
              </p>
            ) : null}
          </div>
        )}

        <span className="pointer-events-none absolute bottom-3.5 left-3.5 rounded-full bg-[var(--fg)] px-3 py-1 text-[12px] font-medium text-white">
          {title}
        </span>
      </article>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="galeri"
      aria-label={copy.sectionLabel}
      className="w-full bg-[var(--surface)] py-12 sm:py-20 font-sans overflow-hidden"
    >
      {/* Hidden SVG filter for gravitational spaghettification warp */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
      >
        <defs>
          <filter
            id={filterId}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.002 0.002"
              numOctaves="2"
              seed="8"
              result="warpNoise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="warpNoise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
        <h2 className="mb-6 sm:mb-8 text-[28px] sm:text-[34px] font-semibold tracking-tight text-[var(--fg)] leading-tight">
          {copy.headline}
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch gap-3 sm:gap-4"
        >
          <div className="lg:col-span-5 flex">
            {renderCard(
              PRIMARY_MEDIA,
              "aspect-[4/5] max-h-[440px] lg:max-h-none lg:aspect-auto lg:min-h-[500px] lg:h-full"
            )}
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
            {renderCard(
              SECONDARY_MEDIA[0],
              "col-span-2 aspect-video lg:aspect-auto lg:min-h-[260px]"
            )}
            {renderCard(
              SECONDARY_MEDIA[1],
              "col-span-1 aspect-square lg:aspect-auto lg:min-h-[224px]"
            )}
            {renderCard(
              SECONDARY_MEDIA[2],
              "col-span-1 aspect-square lg:aspect-auto lg:min-h-[224px]"
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

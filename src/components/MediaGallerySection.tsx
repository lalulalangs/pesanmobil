"use client";

import { useRef, useState } from "react";
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
  colClass: string;
  src?: string;
}

const MEDIA_ITEMS: MediaItem[] = [
  {
    id: "video-handover",
    kind: "video",
    title: {
      id: "Serah Terima Unit",
      en: "Vehicle Handover",
    },
    ratioLabel: "Video 4:5",
    colClass:
      "col-span-2 lg:col-span-5 aspect-[4/5] max-h-[420px] lg:max-h-none lg:h-full",
  },
  {
    id: "video-walkthrough",
    kind: "video",
    title: {
      id: "Cek Kondisi Armada",
      en: "Fleet Inspection",
    },
    ratioLabel: "Video 16:9",
    colClass: "col-span-2 aspect-video",
  },
  {
    id: "photo-interior",
    kind: "image",
    title: {
      id: "Interior Kabin Bersih",
      en: "Clean Cabin Interior",
    },
    ratioLabel: "Foto 1:1",
    colClass: "col-span-1 aspect-square",
  },
  {
    id: "photo-exterior",
    kind: "image",
    title: {
      id: "Eksterior Siap Jalan",
      en: "Road-Ready Exterior",
    },
    ratioLabel: "Foto 1:1",
    colClass: "col-span-1 aspect-square",
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
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
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

        gsap.fromTo(
          cards,
          {
            opacity: 0,
            x: (_index, el: HTMLElement) => {
              const rect = el.getBoundingClientRect();
              return (centerX - (rect.left + rect.width / 2)) * 0.55;
            },
            y: (_index, el: HTMLElement) => {
              const rect = el.getBoundingClientRect();
              return (centerY - (rect.top + rect.height / 2)) * 0.55;
            },
            scaleX: 0.28,
            scaleY: 1.35,
            skewX: (index) => (index % 2 === 0 ? -12 : 12),
            rotation: (index) => (index % 2 === 0 ? -6 : 6),
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            rotation: 0,
            duration: 0.95,
            stagger: { amount: 0.22, from: "center" },
            ease: "elastic.out(1, 0.72)",
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: grid,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  const primaryCard = MEDIA_ITEMS[0];
  const secondaryCards = MEDIA_ITEMS.slice(1);

  const renderCard = (item: MediaItem) => {
    const title = item.title[locale];
    const isVideo = item.kind === "video";
    const isPreviewing = activeVideoId === item.id;

    return (
      <article
        key={item.id}
        data-gallery-card
        className={`group relative rounded-2xl overflow-hidden bg-[var(--bg)] border border-[var(--border)] focus-within:ring-2 focus-within:ring-[var(--brand)] focus-within:ring-offset-2 ${item.colClass}`}
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
                <Play className="w-5 h-5 fill-current ml-0.5" aria-hidden="true" />
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
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
        <h2 className="mb-6 sm:mb-8 text-[28px] sm:text-[34px] font-semibold tracking-tight text-[var(--fg)] leading-tight">
          {copy.headline}
        </h2>

        <div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4"
        >
          <div className="lg:col-span-5 grid grid-cols-2 lg:block gap-3 sm:gap-4">
            {renderCard(primaryCard)}
          </div>
          <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
            {secondaryCards.map(renderCard)}
          </div>
        </div>
      </div>
    </section>
  );
}

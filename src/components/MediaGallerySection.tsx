"use client";

import { useState } from "react";
import { Film, Image as ImageIcon, Play } from "lucide-react";
import { useLanguage, type Locale } from "@/components/LanguageProvider";

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
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const renderCard = (item: MediaItem, sizeClass: string) => {
    const title = item.title[locale];
    const isVideo = item.kind === "video";
    const isPreviewing = activeVideoId === item.id;

    return (
      <article
        key={item.id}
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

        <span className="pointer-events-none absolute bottom-3.5 left-3.5 rounded-full bg-gradient-to-b from-[#34373c] to-[#18191c] border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_2px_8px_rgba(0,0,0,0.22)] px-3.5 py-1 text-[12px] font-medium text-white">
          {title}
        </span>
      </article>
    );
  };

  return (
    <section
      id="galeri"
      aria-label={copy.sectionLabel}
      className="w-full bg-[var(--bg)] py-12 sm:py-20 font-sans"
    >
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
        <h2 className="mb-6 sm:mb-8 text-[28px] sm:text-[34px] font-semibold tracking-tight text-[var(--fg)] leading-tight">
          {copy.headline}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-stretch gap-3 sm:gap-4">
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

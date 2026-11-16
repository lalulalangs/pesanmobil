"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { useLanguage, type Locale } from "@/components/LanguageProvider";

gsap.registerPlugin(useGSAP, Observer);

const HERO_PILL_CLASS =
  "inline-flex items-center rounded-full bg-gradient-to-b from-[#fb923c] to-[#ea580c] border border-[#ea580c] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_rgba(234,88,12,0.25)] px-4 py-1.5 text-[13px] font-button font-medium text-[#1d1d1f]";

const ABOUT_SLIDES = [
  "about-slide-1",
  "about-slide-2",
  "about-slide-3",
  "about-slide-4",
  "about-slide-5",
];

interface HighlightCard {
  id: string;
  accent: boolean;
  icon: typeof ShieldCheck;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
}

const HIGHLIGHT_CARDS: HighlightCard[] = [
  {
    id: "verified-units",
    accent: false,
    icon: ShieldCheck,
    title: {
      id: "Unit Terawat & Siap Jalan",
      en: "Well-Maintained Vehicles",
    },
    description: {
      id: "Setiap mobil dan motor dicek kebersihan serta performanya sebelum diserahkan ke kamu.",
      en: "Every car and motorbike is checked for cleanliness and performance before handover.",
    },
  },
  {
    id: "transparent-process",
    accent: true,
    icon: CheckCircle2,
    title: {
      id: "Proses Jelas & Transparan",
      en: "Clear & Transparent Process",
    },
    description: {
      id: "Rincian tarif, durasi, dan ketentuan sewa disampaikan di awal lewat WhatsApp tanpa biaya tersembunyi.",
      en: "Rates, duration, and rental terms are shared upfront on WhatsApp with no hidden fees.",
    },
  },
  {
    id: "fast-response",
    accent: true,
    icon: Clock,
    title: {
      id: "Respons Cepat & Fleksibel",
      en: "Fast & Flexible Support",
    },
    description: {
      id: "Mau lepas kunci, pakai pengemudi, atau atur ulang jam jemput, tim kami siap bantu koordinasikan.",
      en: "Whether self-drive, with a driver, or adjusting pick-up times, our team coordinates it quickly.",
    },
  },
  {
    id: "pickup-delivery",
    accent: false,
    icon: MapPin,
    title: {
      id: "Antar-Jemput Tepat Titik",
      en: "On-Point Delivery & Pick-Up",
    },
    description: {
      id: "Unit bisa diantar ke bandara, pelabuhan, hotel, atau alamat sesuai jadwal kedatanganmu.",
      en: "Vehicles can be delivered to the airport, harbor, hotel, or address right on schedule.",
    },
  },
];

interface AboutCopy {
  pageTitle: string;
  introLabel: string;
  introEyebrow: string;
  placeholderLabel: string;
  p1Before: string;
  p1Strong1: string;
  p1Middle: string;
  p1Strong2: string;
  p2Before: string;
  p2Strong1: string;
  p2Middle: string;
  p2Strong2: string;
  whyLabel: string;
  whyEyebrow: string;
  whyTitle: string;
  whyDescription: string;
  carouselAria: string;
  prevSlideAria: string;
  nextSlideAria: string;
}

const COPY: Record<Locale, AboutCopy> = {
  id: {
    pageTitle: "Tentang pesanmobil.com",
    introLabel: "Tentang kami",
    introEyebrow: "Kenal Lebih Dekat",
    placeholderLabel: "Lorem ipsum dolor sit amet",
    p1Before: "Selamat datang di pesanmobil.com, tempat di mana ",
    p1Strong1: "perjalanan nyaman dimulai dari unit yang tepat untukmu.",
    p1Middle: " Kami hadir untuk membuat proses sewa mobil dan motor terasa ",
    p1Strong2: "mudah, rapi, dan tanpa ribet.",
    p2Before: "Mulai dari kebutuhan harian, perjalanan kerja, hingga liburan keluarga, ",
    p2Strong1: "setiap unit kami siapkan dalam kondisi bersih dan terawat.",
    p2Middle: " Cukup pilih unit dan jadwalnya, lalu ",
    p2Strong2: "tim kami bantu bereskan semuanya lewat WhatsApp.",
    whyLabel: "Keunggulan layanan",
    whyEyebrow: "Kenapa Pilih Kami",
    whyTitle: "Perjalanan lebih tenang di setiap rute",
    whyDescription:
      "Dari pengecekan unit hingga pengantaran ke titik jemput, semuanya kami tangani satu pintu agar kamu tinggal fokus menikmati perjalanan.",
    carouselAria: "Galeri foto tentang kami",
    prevSlideAria: "Foto sebelumnya",
    nextSlideAria: "Foto berikutnya",
  },
  en: {
    pageTitle: "About pesanmobil.com",
    introLabel: "About us",
    introEyebrow: "Know More About Us",
    placeholderLabel: "Lorem ipsum dolor sit amet",
    p1Before: "Welcome to pesanmobil.com, where ",
    p1Strong1: "a comfortable journey starts with the right vehicle.",
    p1Middle: " We make renting a car or motorbike feel ",
    p1Strong2: "simple, reliable, and hassle-free.",
    p2Before: "From daily errands and business trips to family getaways, ",
    p2Strong1: "every vehicle is kept clean and road-ready.",
    p2Middle: " Pick your unit and schedule, and ",
    p2Strong2: "our team handles the rest with you on WhatsApp.",
    whyLabel: "Why choose us",
    whyEyebrow: "Why Choose Us",
    whyTitle: "Charting a smoother trip on every route",
    whyDescription:
      "From vehicle prep to on-time delivery at your pick-up point, everything is coordinated in one place so you can travel with peace of mind.",
    carouselAria: "About us photo gallery",
    prevSlideAria: "Previous photo",
    nextSlideAria: "Next photo",
  },
};

export function AboutSection() {
  const { locale } = useLanguage();
  const copy = COPY[locale];

  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const goToOffsetRef = useRef<(delta: number) => void>(() => {});
  const goToIndexRef = useRef<(index: number) => void>(() => {});

  useGSAP(
    () => {
      const track = trackRef.current;
      const slides = slideRefs.current.filter(
        (el): el is HTMLButtonElement => el !== null
      );
      if (!track || slides.length === 0) return;

      const count = slides.length;
      const state = { offset: 0 };
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const getStepPx = () => {
        const cardWidth = slides[0]?.offsetWidth || 680;
        return cardWidth * 0.94;
      };

      const render = () => {
        const stepPx = getStepPx();
        slides.forEach((slide, index) => {
          const rel = gsap.utils.wrap(-count / 2, count / 2, index - state.offset);
          const absRel = Math.abs(rel);
          const scale = gsap.utils.clamp(0.78, 1, 1 - absRel * 0.16);
          const opacity =
            absRel > 1.85 ? 0 : gsap.utils.clamp(0.55, 1, 1 - absRel * 0.28);

          gsap.set(slide, {
            xPercent: -50,
            yPercent: -50,
            x: rel * stepPx,
            scale,
            opacity,
            zIndex: Math.round(10 - absRel * 3),
          });
        });
      };

      const snapTo = (targetOffset: number) => {
        gsap.to(state, {
          offset: targetOffset,
          duration: prefersReducedMotion ? 0 : 0.45,
          ease: "power3.out",
          overwrite: true,
          onUpdate: render,
        });
      };

      goToOffsetRef.current = (delta: number) => {
        snapTo(Math.round(state.offset) + delta);
      };

      goToIndexRef.current = (targetIndex: number) => {
        const rounded = Math.round(state.offset);
        const rel = gsap.utils.wrap(-count / 2, count / 2, targetIndex - rounded);
        if (rel !== 0) snapTo(rounded + rel);
      };

      render();

      const observer = Observer.create({
        target: track,
        type: "wheel,touch,pointer",
        lockAxis: true,
        dragMinimum: 6,
        onChangeX: (self) => {
          const stepPx = getStepPx();
          const isWheel = self.event?.type === "wheel";
          state.offset += isWheel ? self.deltaX / stepPx : -self.deltaX / stepPx;
          render();
        },
        onRelease: () => {
          snapTo(Math.round(state.offset));
        },
        onStop: () => {
          snapTo(Math.round(state.offset));
        },
      });

      const onResize = () => render();
      window.addEventListener("resize", onResize);

      return () => {
        observer.kill();
        window.removeEventListener("resize", onResize);
      };
    },
    { scope: trackRef }
  );

  return (
    <div className="w-full bg-[var(--bg)] pt-28 pb-16 sm:pt-36 sm:pb-24 font-sans">
      <h1 className="sr-only">{copy.pageTitle}</h1>

      {/* Section 1: Infinite Center-Focused Carousel & Editorial Intro */}
      <section aria-label={copy.introLabel} className="w-full pb-14 sm:pb-20">
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={copy.carouselAria}
          className="relative w-full h-[220px] sm:h-[340px] lg:h-[420px] overflow-hidden select-none touch-pan-y cursor-grab active:cursor-grabbing"
        >
          {ABOUT_SLIDES.map((slideId, index) => (
            <button
              key={slideId}
              ref={(el) => {
                slideRefs.current[index] = el;
              }}
              type="button"
              onClick={() => goToIndexRef.current(index)}
              aria-label={`Slide ${index + 1}`}
              className="absolute left-1/2 top-1/2 w-[78vw] sm:w-[68vw] lg:w-[64vw] max-w-[820px] h-full rounded-2xl bg-[#f4f4f5] border border-[var(--border)]/70 flex items-center justify-center overflow-hidden p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
            >
              <p className="text-[14px] text-[var(--muted-text)] text-center">
                {copy.placeholderLabel}
              </p>
            </button>
          ))}

          <button
            type="button"
            onClick={() => goToOffsetRef.current(-1)}
            aria-label={copy.prevSlideAria}
            className="hidden sm:inline-flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 h-10 w-10 items-center justify-center rounded-full bg-white/95 border border-[var(--border)] text-[var(--fg)] shadow-[0_2px_10px_rgba(29,29,31,0.08)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => goToOffsetRef.current(1)}
            aria-label={copy.nextSlideAria}
            className="hidden sm:inline-flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 h-10 w-10 items-center justify-center rounded-full bg-white/95 border border-[var(--border)] text-[var(--fg)] shadow-[0_2px_10px_rgba(29,29,31,0.08)] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">

          <div className="mt-8 sm:mt-10">
            <span className={HERO_PILL_CLASS}>
              {copy.introEyebrow}
            </span>

            <div className="mt-6 flex flex-col gap-6 max-w-[68ch]">
              <p className="text-[20px] sm:text-[26px] leading-[1.4] text-[var(--muted-text)] font-normal">
                {copy.p1Before}
                <span className="font-medium text-[var(--fg)]">
                  {copy.p1Strong1}
                </span>
                {copy.p1Middle}
                <span className="font-medium text-[var(--fg)]">
                  {copy.p1Strong2}
                </span>
              </p>

              <p className="text-[20px] sm:text-[26px] leading-[1.4] text-[var(--muted-text)] font-normal">
                {copy.p2Before}
                <span className="font-medium text-[var(--fg)]">
                  {copy.p2Strong1}
                </span>
                {copy.p2Middle}
                <span className="font-medium text-[var(--fg)]">
                  {copy.p2Strong2}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Why Choose Us Bento Grid */}
      <section aria-label={copy.whyLabel} className="w-full pt-4 sm:pt-8">
        <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:items-stretch">
            {/* Left Tall Visual Card */}
            <article className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-[var(--fg)] text-white p-6 sm:p-8 flex flex-col justify-between min-h-[380px] sm:min-h-[460px]">
              <div className="relative z-10 flex items-start justify-between">
                <span className={HERO_PILL_CLASS}>
                  {copy.whyEyebrow}
                </span>
              </div>

              <p className="my-12 text-center text-[13px] text-white/50">
                {copy.placeholderLabel}
              </p>

              <div className="relative z-10 flex flex-col gap-2.5">
                <h2 className="text-[26px] sm:text-[32px] font-semibold tracking-tight leading-tight text-white">
                  {copy.whyTitle}
                </h2>
                <p className="text-[14px] sm:text-[15px] text-white/80 leading-relaxed max-w-[38ch]">
                  {copy.whyDescription}
                </p>
              </div>
            </article>

            {/* Right 2x2 Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HIGHLIGHT_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <article
                    key={card.id}
                    className={`rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-10 border ${
                      card.accent
                        ? "bg-gradient-to-b from-[#38bdf8] to-[#009cde] border-[#009cde] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_rgba(0,156,222,0.22)] text-[var(--fg)]"
                        : "bg-[var(--bg)] border-[var(--border)]/80 shadow-[0_2px_12px_rgba(29,29,31,0.04)] text-[var(--fg)]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${
                        card.accent
                          ? "bg-[var(--fg)] text-white"
                          : "bg-[#f4f4f5] text-[var(--fg)]"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </span>

                    <div>
                      <h3 className="text-[20px] font-semibold tracking-tight leading-snug text-[var(--fg)]">
                        {card.title[locale]}
                      </h3>
                      <p
                        className={`mt-2.5 text-[14px] leading-relaxed ${
                          card.accent
                            ? "text-[var(--fg)]/85"
                            : "text-[var(--muted-text)]"
                        }`}
                      >
                        {card.description[locale]}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

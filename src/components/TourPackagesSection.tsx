"use client";

import { ArrowRight, Clock, Users } from "lucide-react";
import { useLanguage, type Locale } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";

interface TourPackage {
  id: string;
  name: Record<Locale, string>;
  category: string;
  duration: Record<Locale, string>;
  seats: number;
  unitInfo: string;
  description: Record<Locale, string>;
  priceIdr: string;
}

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: "tour-city",
    name: { id: "Paket City Tour", en: "City Tour Package" },
    category: "City Tour",
    duration: { id: "10 jam", en: "10 hours" },
    seats: 6,
    unitInfo: "Avanza / Xpander",
    description: {
      id: "Keliling destinasi favorit dalam kota termasuk unit, BBM area kota, dan pengemudi ramah.",
      en: "Explore top city highlights with vehicle, city fuel, and a friendly driver included.",
    },
    priceIdr: "Rp 750.000",
  },
  {
    id: "tour-fullday",
    name: { id: "Paket Wisata Full Day", en: "Full Day Tour Package" },
    category: "Full Day",
    duration: { id: "12 jam", en: "12 hours" },
    seats: 6,
    unitInfo: "Innova Reborn",
    description: {
      id: "Perjalanan seharian lebih nyaman untuk rute pantai atau perbukitan bersama keluarga.",
      en: "Comfortable full-day trip for beach or scenic routes with your family.",
    },
    priceIdr: "Rp 950.000",
  },
  {
    id: "tour-2d1n",
    name: { id: "Paket Wisata 2H1M", en: "2D1N Tour Package" },
    category: "Overnight",
    duration: { id: "2H1M", en: "2D1N" },
    seats: 6,
    unitInfo: "Innova Zenix",
    description: {
      id: "Rute wisata dua hari satu malam dengan jadwal fleksibel sesuai destinasi pilihanmu.",
      en: "Two-day, one-night itinerary with flexible stops tailored to your wish list.",
    },
    priceIdr: "Rp 1.950.000",
  },
  {
    id: "tour-group",
    name: { id: "Paket Rombongan Hiace", en: "Hiace Group Tour" },
    category: "Group Tour",
    duration: { id: "12 jam", en: "12 hours" },
    seats: 14,
    unitInfo: "Toyota Hiace",
    description: {
      id: "Cocok untuk rombongan kantor atau keluarga besar dengan kabin lega dan bagasi luas.",
      en: "Ideal for office outings or big families with spacious seating and luggage room.",
    },
    priceIdr: "Rp 1.550.000",
  },
];

interface TourCopy {
  sectionLabel: string;
  headline: string;
  subtitle: string;
  placeholderLabel: string;
  startFrom: string;
  perPackage: string;
  maxPassengers: (count: number) => string;
  bookLabel: string;
}

const COPY: Record<Locale, TourCopy> = {
  id: {
    sectionLabel: "Daftar paket wisata",
    headline: "Paket wisata praktis, tinggal duduk santai",
    subtitle:
      "Pilih paket perjalanan sesuai rencana liburanmu. Unit, pengemudi, dan rute sudah siap kami bantu atur lewat WhatsApp.",
    placeholderLabel: "Lorem ipsum dolor sit amet",
    startFrom: "Mulai dari",
    perPackage: "/ paket",
    maxPassengers: (count) => `Maks. ${count} orang`,
    bookLabel: "Tanya Paket Ini",
  },
  en: {
    sectionLabel: "Tour packages",
    headline: "Hassle-free tour packages, just sit back and enjoy",
    subtitle:
      "Pick a package that fits your trip plan. Our team will arrange the vehicle, driver, and route right on WhatsApp.",
    placeholderLabel: "Lorem ipsum dolor sit amet",
    startFrom: "Start from",
    perPackage: "/ package",
    maxPassengers: (count) => `Max ${count} pax`,
    bookLabel: "Ask About Package",
  },
};

export function TourPackagesSection() {
  const { locale } = useLanguage();
  const copy = COPY[locale];
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";

  const getWhatsappHref = (pkg: TourPackage) => {
    const title = pkg.name[locale];
    const message =
      locale === "id"
        ? `Halo pesanmobil.com, saya tertarik dengan ${title} (${pkg.priceIdr} / paket). Bisa info jadwal & detailnya?`
        : `Hello pesanmobil.com, I am interested in ${title} (${pkg.priceIdr} / package). Could you share the schedule and details?`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
  };

  return (
    <section
      aria-label={copy.sectionLabel}
      className="w-full bg-[var(--bg)] pt-28 pb-16 sm:pt-36 sm:pb-24 font-sans"
    >
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="mb-10 sm:mb-12">
          <h1 className="text-[32px] sm:text-[42px] font-semibold tracking-tight text-[var(--fg)] leading-tight max-w-[22ch]">
            {copy.headline}
          </h1>
          <p className="mt-3 text-[15px] sm:text-[17px] text-[var(--muted-text)] max-w-[60ch]">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TOUR_PACKAGES.map((pkg) => (
            <article
              key={pkg.id}
              className="flex flex-col rounded-2xl border border-[var(--border)]/80 bg-[var(--bg)] p-4 shadow-[0_2px_12px_rgba(29,29,31,0.04)]"
            >
              <div className="relative h-[180px] w-full rounded-xl bg-[#f4f4f5] p-4 flex items-center justify-center overflow-hidden">
                <span className="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-[12px] font-medium text-[var(--fg)] shadow-[0_1px_2px_rgba(29,29,31,0.06)]">
                  {pkg.category}
                </span>
                <p className="text-[13px] text-[var(--muted-text)] text-center">
                  {copy.placeholderLabel}
                </p>
              </div>

              <div className="mt-4 flex flex-1 flex-col gap-2">
                <h2 className="text-[18px] font-semibold text-[var(--fg)] leading-snug">
                  {pkg.name[locale]}
                </h2>

                <div className="flex items-center gap-1.5 text-[13px] text-[var(--muted-text)]">
                  <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{pkg.duration[locale]}</span>
                </div>

                <div className="flex items-center gap-2 text-[13px] text-[var(--muted-text)]">
                  <span className="inline-flex items-center gap-1.5">
                    <Users
                      className="w-3.5 h-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{copy.maxPassengers(pkg.seats)}</span>
                  </span>
                  <span>· {pkg.unitInfo}</span>
                </div>

                <p className="mt-1 text-[14px] text-[var(--muted-text)] leading-relaxed">
                  {pkg.description[locale]}
                </p>

                <div className="mt-auto pt-3">
                  <p className="text-[12px] text-[var(--muted-text)]">
                    {copy.startFrom}
                  </p>
                  <p className="mt-0.5 text-[18px] font-semibold text-[var(--fg)] leading-tight">
                    {pkg.priceIdr}{" "}
                    <span className="text-[13px] font-normal text-[var(--muted-text)]">
                      {copy.perPackage}
                    </span>
                  </p>

                  <Button
                    variant="default"
                    nativeButton={false}
                    render={
                      <a
                        href={getWhatsappHref(pkg)}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    className="mt-3.5 h-9 w-full gap-1.5 rounded-full px-4 text-[13px] font-medium ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-gradient-to-b from-[#38bdf8] to-[#009cde] hover:from-[#1eb3f0] hover:to-[#008bc7] border-[#009cde] focus-visible:border-[#009cde] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_rgba(0,156,222,0.25)]"
                  >
                    <span>{copy.bookLabel}</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 shrink-0"
                      aria-hidden="true"
                    />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

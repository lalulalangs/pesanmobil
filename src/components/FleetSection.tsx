"use client";

import Link from "next/link";
import { Briefcase, Settings2, Users } from "lucide-react";
import { useLanguage, type Locale } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";

type TransmissionType = "auto-manual" | "automatic" | "manual";

interface VehicleItem {
  id: string;
  name: string;
  category: string;
  transmission: TransmissionType;
  seats: number;
  luggage: number;
  priceIdr: string;
}

const FLEET_ITEMS: VehicleItem[] = [
  {
    id: "toyota-yaris",
    name: "Toyota Yaris",
    category: "Hatchback",
    transmission: "auto-manual",
    seats: 5,
    luggage: 2,
    priceIdr: "Rp 450.000",
  },
  {
    id: "alphard",
    name: "Alphard",
    category: "Minivan",
    transmission: "automatic",
    seats: 7,
    luggage: 4,
    priceIdr: "Rp 1.850.000",
  },
  {
    id: "lexus-nx-300",
    name: "Lexus NX - 300",
    category: "SUV",
    transmission: "automatic",
    seats: 5,
    luggage: 3,
    priceIdr: "Rp 1.650.000",
  },
  {
    id: "camry",
    name: "Camry",
    category: "Sedan",
    transmission: "automatic",
    seats: 5,
    luggage: 3,
    priceIdr: "Rp 1.250.000",
  },
  {
    id: "innova",
    name: "Innova",
    category: "Minivan",
    transmission: "manual",
    seats: 7,
    luggage: 3,
    priceIdr: "Rp 550.000",
  },
  {
    id: "toyota-fortuner",
    name: "Toyota Fortuner",
    category: "SUV",
    transmission: "automatic",
    seats: 7,
    luggage: 3,
    priceIdr: "Rp 1.150.000",
  },
  {
    id: "innova-zenix",
    name: "Innova Zenix",
    category: "MPV",
    transmission: "auto-manual",
    seats: 7,
    luggage: 3,
    priceIdr: "Rp 750.000",
  },
  {
    id: "terios",
    name: "Terios",
    category: "SUV",
    transmission: "auto-manual",
    seats: 7,
    luggage: 2,
    priceIdr: "Rp 450.000",
  },
];

interface FleetCopy {
  sectionLabel: string;
  title: string;
  subtitle: string;
  startFrom: string;
  perDay: string;
  seeMore: string;
  placeholderLabel: string;
  seatsLabel: (count: number) => string;
  luggageLabel: (count: number) => string;
  transmissionLabels: Record<TransmissionType, string>;
}

const COPY: Record<Locale, FleetCopy> = {
  id: {
    sectionLabel: "Daftar armada pilihan",
    title: "Pilihan armada terbaik bulan ini",
    subtitle:
      "Nikmati perjalanan yang nyaman dengan pilihan unit terawat siap pakai.",
    startFrom: "Mulai dari",
    perDay: "/ hari",
    seeMore: "Lihat Semua",
    placeholderLabel: "Lorem ipsum dolor sit amet",
    seatsLabel: (count) => `${count} kursi`,
    luggageLabel: (count) => `${count} bagasi`,
    transmissionLabels: {
      "auto-manual": "Matic/Manual",
      automatic: "Matic",
      manual: "Manual",
    },
  },
  en: {
    sectionLabel: "Top picks fleet",
    title: "Top picks vehicle this month",
    subtitle:
      "Experience a comfortable journey with our well-maintained top picks.",
    startFrom: "Start from",
    perDay: "/ day",
    seeMore: "See More",
    placeholderLabel: "Lorem ipsum dolor sit amet",
    seatsLabel: (count) => `${count} seats`,
    luggageLabel: (count) => `${count} luggage`,
    transmissionLabels: {
      "auto-manual": "Automatic/Manual",
      automatic: "Automatic",
      manual: "Manual",
    },
  },
};

export function FleetSection() {
  const { locale } = useLanguage();
  const copy = COPY[locale];

  return (
    <section
      id="armada"
      aria-label={copy.sectionLabel}
      className="w-full bg-[var(--bg)] py-14 sm:py-20 font-sans"
    >
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="mb-8 sm:mb-10">
          <h2 className="text-[28px] sm:text-[34px] font-semibold tracking-tight text-[var(--fg)] leading-tight">
            {copy.title}
          </h2>
          <p className="mt-2 text-[15px] sm:text-[16px] text-[var(--muted-text)] max-w-[60ch]">
            {copy.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          {FLEET_ITEMS.map((vehicle) => (
            <article key={vehicle.id} className="flex flex-col">
              {/* Image placeholder box */}
              <div className="relative h-[196px] w-full rounded-2xl bg-[#f4f4f5] p-4 flex items-center justify-center overflow-hidden">
                <span className="absolute top-3.5 left-3.5 rounded-full bg-white px-3 py-1 text-[12px] font-medium text-[var(--fg)] shadow-[0_1px_2px_rgba(29,29,31,0.06)]">
                  {vehicle.category}
                </span>
                <div className="px-4 text-center">
                  <p className="text-[13px] text-[var(--muted-text)]">
                    {copy.placeholderLabel}
                  </p>
                </div>
              </div>

              {/* Vehicle details */}
              <div className="mt-3.5 flex flex-col gap-1.5">
                <h3 className="text-[17px] font-semibold text-[var(--fg)] leading-snug">
                  {vehicle.name}
                </h3>

                <div className="flex items-center gap-1.5 text-[13px] text-[var(--muted-text)]">
                  <Settings2
                    className="w-3.5 h-3.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{copy.transmissionLabels[vehicle.transmission]}</span>
                </div>

                <div className="flex items-center gap-3.5 text-[13px] text-[var(--muted-text)]">
                  <span
                    className="inline-flex items-center gap-1.5"
                    aria-label={copy.seatsLabel(vehicle.seats)}
                  >
                    <Users className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{vehicle.seats}</span>
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5"
                    aria-label={copy.luggageLabel(vehicle.luggage)}
                  >
                    <Briefcase
                      className="w-3.5 h-3.5 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{vehicle.luggage}</span>
                  </span>
                </div>

                <div className="mt-1.5">
                  <p className="text-[12px] text-[var(--muted-text)]">
                    {copy.startFrom}
                  </p>
                  <p className="mt-0.5 text-[18px] font-semibold text-[var(--fg)] leading-tight">
                    {vehicle.priceIdr}{" "}
                    <span className="text-[13px] font-normal text-[var(--muted-text)]">
                      {copy.perDay}
                    </span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 sm:mt-12 flex justify-center">
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href="/mobil" />}
            className="h-10 rounded-lg border-[var(--border)] bg-white px-5 text-[14px] font-medium text-[var(--fg)] hover:bg-[var(--surface)] shadow-[0_1px_2px_rgba(29,29,31,0.04)]"
          >
            {copy.seeMore}
          </Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import alphardImg from "../../assets/armada/alphard.webp";
import avanzaImg from "../../assets/armada/avanza.webp";
import beatImg from "../../assets/armada/beat.webp";
import camryImg from "../../assets/armada/camry.webp";
import fortunerImg from "../../assets/armada/fortuner.webp";
import lexusImg from "../../assets/armada/lexus.webp";
import nmaxImg from "../../assets/armada/nmax.webp";
import rebornImg from "../../assets/armada/reborn.webp";
import teriosImg from "../../assets/armada/terios.webp";
import varioImg from "../../assets/armada/vario.webp";
import vespaImg from "../../assets/armada/vespa.webp";
import yarisImg from "../../assets/armada/yaris.webp";
import zenixImg from "../../assets/armada/zenix.webp";
import {
  ArrowRight,
  Bike,
  Briefcase,
  Car,
  Gauge,
  Settings2,
  Users,
} from "lucide-react";
import { useLanguage, type Locale } from "@/components/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ServiceTab = "lepas-kunci" | "private" | "paket-wisata";
type VehicleType = "mobil" | "motor";
type TransmissionType = "auto-manual" | "automatic" | "manual";

interface FleetItem {
  id: string;
  service: Exclude<ServiceTab, "paket-wisata">;
  vehicleType?: VehicleType;
  name: string;
  category: string;
  transmission?: TransmissionType;
  seats?: number;
  luggage?: number;
  engineCc?: string;
  helmets?: number;
  priceIdr: string;
  image?: StaticImageData;
}

export const FLEET_ITEMS: FleetItem[] = [
  // Lepas Kunci - Mobil
  {
    id: "toyota-yaris",
    service: "lepas-kunci",
    vehicleType: "mobil",
    name: "Toyota Yaris",
    category: "Hatchback",
    transmission: "auto-manual",
    seats: 5,
    luggage: 2,
    priceIdr: "Rp 450.000",
    image: yarisImg,
  },
  {
    id: "alphard",
    service: "lepas-kunci",
    vehicleType: "mobil",
    name: "Alphard",
    category: "Minivan",
    transmission: "automatic",
    seats: 7,
    luggage: 4,
    priceIdr: "Rp 1.850.000",
    image: alphardImg,
  },
  {
    id: "lexus-nx-300",
    service: "lepas-kunci",
    vehicleType: "mobil",
    name: "Lexus NX - 300",
    category: "SUV",
    transmission: "automatic",
    seats: 5,
    luggage: 3,
    priceIdr: "Rp 1.650.000",
    image: lexusImg,
  },
  {
    id: "camry",
    service: "lepas-kunci",
    vehicleType: "mobil",
    name: "Camry",
    category: "Sedan",
    transmission: "automatic",
    seats: 5,
    luggage: 3,
    priceIdr: "Rp 1.250.000",
    image: camryImg,
  },
  {
    id: "innova",
    service: "lepas-kunci",
    vehicleType: "mobil",
    name: "Innova",
    category: "Minivan",
    transmission: "manual",
    seats: 7,
    luggage: 3,
    priceIdr: "Rp 550.000",
    image: rebornImg,
  },
  {
    id: "toyota-fortuner",
    service: "lepas-kunci",
    vehicleType: "mobil",
    name: "Toyota Fortuner",
    category: "SUV",
    transmission: "automatic",
    seats: 7,
    luggage: 3,
    priceIdr: "Rp 1.150.000",
    image: fortunerImg,
  },
  {
    id: "innova-zenix",
    service: "lepas-kunci",
    vehicleType: "mobil",
    name: "Innova Zenix",
    category: "MPV",
    transmission: "auto-manual",
    seats: 7,
    luggage: 3,
    priceIdr: "Rp 750.000",
    image: zenixImg,
  },
  {
    id: "terios",
    service: "lepas-kunci",
    vehicleType: "mobil",
    name: "Terios",
    category: "SUV",
    transmission: "auto-manual",
    seats: 7,
    luggage: 2,
    priceIdr: "Rp 450.000",
    image: teriosImg,
  },
  {
    id: "toyota-avanza",
    service: "lepas-kunci",
    vehicleType: "mobil",
    name: "Toyota Avanza",
    category: "MPV",
    transmission: "auto-manual",
    seats: 7,
    luggage: 2,
    priceIdr: "Rp 400.000",
    image: avanzaImg,
  },
  // Lepas Kunci - Motor
  {
    id: "honda-beat",
    service: "lepas-kunci",
    vehicleType: "motor",
    name: "Honda Beat",
    category: "Scooter",
    transmission: "automatic",
    engineCc: "110cc",
    helmets: 2,
    priceIdr: "Rp 90.000",
    image: beatImg,
  },
  {
    id: "honda-vario-160",
    service: "lepas-kunci",
    vehicleType: "motor",
    name: "Honda Vario 160",
    category: "Scooter",
    transmission: "automatic",
    engineCc: "160cc",
    helmets: 2,
    priceIdr: "Rp 125.000",
    image: varioImg,
  },
  {
    id: "yamaha-nmax",
    service: "lepas-kunci",
    vehicleType: "motor",
    name: "Yamaha NMAX",
    category: "Maxi",
    transmission: "automatic",
    engineCc: "155cc",
    helmets: 2,
    priceIdr: "Rp 150.000",
    image: nmaxImg,
  },
  {
    id: "vespa-primavera",
    service: "lepas-kunci",
    vehicleType: "motor",
    name: "Vespa Primavera",
    category: "Classic",
    transmission: "automatic",
    engineCc: "150cc",
    helmets: 2,
    priceIdr: "Rp 250.000",
    image: vespaImg,
  },
  // Private (dengan supir)
  {
    id: "private-avanza",
    service: "private",
    name: "Toyota Avanza",
    category: "MPV",
    transmission: "automatic",
    seats: 7,
    luggage: 2,
    priceIdr: "Rp 650.000",
    image: avanzaImg,
  },
  {
    id: "private-innova",
    service: "private",
    name: "Innova Reborn",
    category: "Minivan",
    transmission: "automatic",
    seats: 7,
    luggage: 3,
    priceIdr: "Rp 850.000",
    image: rebornImg,
  },
  {
    id: "private-zenix",
    service: "private",
    name: "Innova Zenix",
    category: "MPV",
    transmission: "automatic",
    seats: 7,
    luggage: 3,
    priceIdr: "Rp 1.050.000",
    image: zenixImg,
  },
  {
    id: "private-alphard",
    service: "private",
    name: "Alphard",
    category: "Minivan",
    transmission: "automatic",
    seats: 7,
    luggage: 4,
    priceIdr: "Rp 2.250.000",
    image: alphardImg,
  },
];

interface FleetCopy {
  sectionLabel: string;
  title: string;
  subtitle: string;
  tabsAria: string;
  vehicleTypeAria: string;
  tabs: Record<ServiceTab, string>;
  vehicleTypes: Record<VehicleType, string>;
  startFrom: string;
  perDay: string;
  withDriverNote: string;
  seeMore: string;
  placeholderLabel: string;
  seatsLabel: (count: number) => string;
  luggageLabel: (count: number) => string;
  helmetsLabel: (count: number) => string;
  customTripTitle: string;
  tourDescBefore: string;
  tourDescLink: string;
  tourDescAfter: string;
  customTripCta: string;
  customTripWhatsappText: string;
  transmissionLabels: Record<TransmissionType, string>;
}

const COPY: Record<Locale, FleetCopy> = {
  id: {
    sectionLabel: "Daftar armada pilihan",
    title: "Pilihan armada terbaik bulan ini",
    subtitle:
      "Nikmati perjalanan yang nyaman dengan pilihan unit terawat siap pakai.",
    tabsAria: "Kategori layanan",
    vehicleTypeAria: "Pilih jenis kendaraan",
    tabs: {
      "lepas-kunci": "Lepas Kunci",
      private: "Private",
      "paket-wisata": "Paket Wisata",
    },
    vehicleTypes: {
      mobil: "Mobil",
      motor: "Motor",
    },
    startFrom: "Mulai dari",
    perDay: "/ hari",
    withDriverNote: "Termasuk supir",
    seeMore: "Lihat Semua",
    placeholderLabel: "Lorem ipsum dolor sit amet",
    seatsLabel: (count) => `${count} kursi`,
    luggageLabel: (count) => `${count} bagasi`,
    helmetsLabel: (count) => `${count} helm`,
    customTripTitle: "Lagi cari paket wisata atau mau atur rute sendiri?",
    tourDescBefore: "Kita punya ",
    tourDescLink: "pilihan paket wisata yang sudah tersedia",
    tourDescAfter:
      ", tapi kamu juga bisa custom trip sendiri kok. Yuk diskusiin bareng lewat chat kami!",
    customTripCta: "Chat Custom Trip",
    customTripWhatsappText:
      "Halo pesanmobil.com, saya mau diskusi untuk buat custom trip wisata.",
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
    tabsAria: "Service categories",
    vehicleTypeAria: "Select vehicle type",
    tabs: {
      "lepas-kunci": "Self-Drive",
      private: "Private Driver",
      "paket-wisata": "Tour Package",
    },
    vehicleTypes: {
      mobil: "Car",
      motor: "Motorbike",
    },
    startFrom: "Start from",
    perDay: "/ day",
    withDriverNote: "With driver",
    seeMore: "See More",
    placeholderLabel: "Lorem ipsum dolor sit amet",
    seatsLabel: (count) => `${count} seats`,
    luggageLabel: (count) => `${count} luggage`,
    helmetsLabel: (count) => `${count} helmets`,
    customTripTitle: "Looking for a tour package or planning your own route?",
    tourDescBefore: "We already have ",
    tourDescLink: "ready-made tour packages you can browse",
    tourDescAfter:
      ", or you can customize your own trip freely. Let's chat and plan it together!",
    customTripCta: "Chat Custom Trip",
    customTripWhatsappText:
      "Hello pesanmobil.com, I would like to discuss creating a custom tour trip.",
    transmissionLabels: {
      "auto-manual": "Automatic/Manual",
      automatic: "Automatic",
      manual: "Manual",
    },
  },
};

export interface FleetSectionProps {
  showSeeMore?: boolean;
  standalone?: boolean;
}

export function FleetSection({
  showSeeMore = true,
  standalone = false,
}: FleetSectionProps = {}) {
  const { locale } = useLanguage();
  const copy = COPY[locale];

  const [serviceTab, setServiceTab] = useState<ServiceTab>("lepas-kunci");
  const [vehicleType, setVehicleType] = useState<VehicleType>("mobil");
  const carouselRef = useRef<HTMLDivElement>(null);

  const resetCarouselScroll = () => {
    carouselRef.current?.scrollTo({ left: 0, behavior: "instant" });
  };

  const handleTabChange = (nextValue: string | null) => {
    if (
      nextValue === "lepas-kunci" ||
      nextValue === "private" ||
      nextValue === "paket-wisata"
    ) {
      setServiceTab(nextValue);
      resetCarouselScroll();
    }
  };

  const handleVehicleTypeChange = (nextType: VehicleType) => {
    setVehicleType(nextType);
    resetCarouselScroll();
  };

  const filteredItems = FLEET_ITEMS.filter((item) => {
    if (item.service !== serviceTab) return false;
    if (serviceTab === "lepas-kunci") {
      return item.vehicleType === vehicleType;
    }
    return true;
  });

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "6285177623290";
  const customTripHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    copy.customTripWhatsappText
  )}`;

  const seeMoreHref =
    serviceTab === "lepas-kunci"
      ? `/mobil?layanan=lepas-kunci&jenis=${vehicleType}`
      : `/mobil?layanan=${serviceTab}`;

  const HeadingTag = standalone ? "h1" : "h2";

  return (
    <section
      id="armada"
      aria-label={copy.sectionLabel}
      className={`w-full bg-[var(--bg)] font-sans ${
        standalone ? "pt-28 pb-16 sm:pt-36 sm:pb-24" : "py-14 sm:py-20"
      }`}
    >
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="mb-6 sm:mb-8">
          <HeadingTag className="text-[28px] sm:text-[34px] font-semibold tracking-tight text-[var(--fg)] leading-tight">
            {copy.title}
          </HeadingTag>
          <p className="mt-2 text-[15px] sm:text-[16px] text-[var(--muted-text)] max-w-[60ch]">
            {copy.subtitle}
          </p>
        </div>

        <Tabs value={serviceTab} onValueChange={handleTabChange}>
          <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:min-h-[44px]">
            <TabsList
              aria-label={copy.tabsAria}
              className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex rounded-full bg-[#f4f4f5] p-1 h-10 sm:h-11 group-data-horizontal/tabs:h-10 sm:group-data-horizontal/tabs:h-11"
            >
              {(["lepas-kunci", "private", "paket-wisata"] as ServiceTab[]).map(
                (tabKey) => (
                  <TabsTrigger
                    key={tabKey}
                    value={tabKey}
                    className="rounded-full px-3 sm:px-5 text-[13px] sm:text-[14px] font-medium text-[var(--muted-text)] data-active:bg-gradient-to-b data-active:from-[#fb923c] data-active:to-[#ea580c] data-active:border-[#ea580c] data-active:text-[var(--fg)] data-active:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_rgba(234,88,12,0.25)] focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
                  >
                    {copy.tabs[tabKey]}
                  </TabsTrigger>
              ))}
            </TabsList>

            {serviceTab === "lepas-kunci" && (
              <div
                role="radiogroup"
                aria-label={copy.vehicleTypeAria}
                className="flex items-center gap-2"
              >
                <Button
                  type="button"
                  role="radio"
                  aria-checked={vehicleType === "mobil"}
                  variant={vehicleType === "mobil" ? "default" : "outline"}
                  onClick={() => handleVehicleTypeChange("mobil")}
                  className={`h-9 rounded-full px-4 text-[13px] font-medium gap-1.5 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                    vehicleType === "mobil"
                      ? "bg-gradient-to-b from-[#38bdf8] to-[#009cde] hover:from-[#1eb3f0] hover:to-[#008bc7] border-[#009cde] focus-visible:border-[#009cde] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_rgba(0,156,222,0.25)]"
                      : "bg-white text-[var(--fg-2)] border-[var(--border)] hover:bg-[var(--surface)]"
                  }`}
                >
                  <Car className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{copy.vehicleTypes.mobil}</span>
                </Button>
                <Button
                  type="button"
                  role="radio"
                  aria-checked={vehicleType === "motor"}
                  variant={vehicleType === "motor" ? "default" : "outline"}
                  onClick={() => handleVehicleTypeChange("motor")}
                  className={`h-9 rounded-full px-4 text-[13px] font-medium gap-1.5 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                    vehicleType === "motor"
                      ? "bg-gradient-to-b from-[#38bdf8] to-[#009cde] hover:from-[#1eb3f0] hover:to-[#008bc7] border-[#009cde] focus-visible:border-[#009cde] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_rgba(0,156,222,0.25)]"
                      : "bg-white text-[var(--fg-2)] border-[var(--border)] hover:bg-[var(--surface)]"
                  }`}
                >
                  <Bike className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{copy.vehicleTypes.motor}</span>
                </Button>
              </div>
            )}
          </div>
        </Tabs>

        {serviceTab === "paket-wisata" ? (
          <div className="rounded-2xl border border-[var(--border)]/80 bg-[var(--surface)] p-6 sm:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-[62ch]">
              <h3 className="text-[20px] sm:text-[22px] font-semibold tracking-tight text-[var(--fg)] leading-snug">
                {copy.customTripTitle}
              </h3>
              <p className="mt-2.5 text-[15px] sm:text-[16px] text-[var(--muted-text)] leading-relaxed">
                {copy.tourDescBefore}
                <Link
                  href="/paket-wisata"
                  className="font-medium text-[var(--brand-link)] underline underline-offset-4 hover:text-[var(--brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] rounded-xs"
                >
                  {copy.tourDescLink}
                </Link>
                {copy.tourDescAfter}
              </p>
            </div>
            <Button
              variant="cta"
              nativeButton={false}
              render={
                <a
                  href={customTripHref}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              className="h-11 w-full md:w-auto gap-2 px-6 text-[14px] shrink-0"
            >
              <span>{copy.customTripCta}</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Button>
          </div>
        ) : (
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-5 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-8 sm:overflow-visible"
          >
            {filteredItems.map((vehicle) => (
              <article
                key={vehicle.id}
                className="flex flex-col w-[76vw] max-w-[280px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink"
              >
                {/* Vehicle image box */}
                <div className="relative h-[196px] w-full rounded-2xl bg-[#f4f4f5] flex items-center justify-center overflow-hidden">
                  <span className="absolute top-3.5 left-3.5 z-10 rounded-full bg-white px-3 py-1 text-[12px] font-medium text-[var(--fg)] shadow-[0_1px_2px_rgba(29,29,31,0.06)]">
                    {vehicle.category}
                  </span>
                  {vehicle.image ? (
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      sizes="(max-width: 639px) 280px, (max-width: 1023px) 340px, 266px"
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="px-4 text-center">
                      <p className="text-[13px] text-[var(--muted-text)]">
                        {copy.placeholderLabel}
                      </p>
                    </div>
                  )}
                </div>

                {/* Vehicle details */}
                <div className="mt-3.5 flex flex-col gap-1.5">
                  <h3 className="text-[17px] font-semibold text-[var(--fg)] leading-snug">
                    {vehicle.name}
                  </h3>

                  {vehicle.vehicleType === "motor" ? (
                    <>
                      <div className="flex items-center gap-1.5 text-[13px] text-[var(--muted-text)]">
                        <Settings2
                          className="w-3.5 h-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>
                          {vehicle.transmission
                            ? copy.transmissionLabels[vehicle.transmission]
                            : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[13px] text-[var(--muted-text)]">
                        {vehicle.engineCc && (
                          <span className="inline-flex items-center gap-1.5">
                            <Gauge
                              className="w-3.5 h-3.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{vehicle.engineCc}</span>
                          </span>
                        )}
                        {vehicle.helmets && (
                          <span>· {copy.helmetsLabel(vehicle.helmets)}</span>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 text-[13px] text-[var(--muted-text)]">
                        <Settings2
                          className="w-3.5 h-3.5 shrink-0"
                          aria-hidden="true"
                        />
                        <span>
                          {vehicle.transmission
                            ? copy.transmissionLabels[vehicle.transmission]
                            : ""}
                        </span>
                      </div>
                      <div className="flex items-center gap-3.5 text-[13px] text-[var(--muted-text)]">
                        {vehicle.seats && (
                          <span
                            className="inline-flex items-center gap-1.5"
                            aria-label={copy.seatsLabel(vehicle.seats)}
                          >
                            <Users
                              className="w-3.5 h-3.5 shrink-0"
                              aria-hidden="true"
                            />
                            <span>{vehicle.seats}</span>
                          </span>
                        )}
                        {vehicle.luggage && (
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
                        )}
                      </div>
                    </>
                  )}

                  <div className="mt-1.5">
                    <p className="text-[12px] text-[var(--muted-text)]">
                      {copy.startFrom}
                      {vehicle.service === "private"
                        ? ` · ${copy.withDriverNote}`
                        : ""}
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
        )}

        {showSeeMore && serviceTab !== "paket-wisata" && filteredItems.length > 6 && (
          <div className="mt-10 sm:mt-12 flex justify-center">
            <Button
              variant="default"
              nativeButton={false}
              render={<Link href={seeMoreHref} />}
              className="h-10 w-full sm:w-auto gap-2 rounded-full px-6 text-[14px] font-medium ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-gradient-to-b from-[#38bdf8] to-[#009cde] hover:from-[#1eb3f0] hover:to-[#008bc7] border-[#009cde] focus-visible:border-[#009cde] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_rgba(0,156,222,0.25)]"
            >
              <span>{copy.seeMore}</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

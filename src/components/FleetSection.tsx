"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Briefcase,
  Car,
  Clock,
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
  service: ServiceTab;
  vehicleType?: VehicleType;
  name: string;
  category: string;
  transmission?: TransmissionType;
  seats?: number;
  luggage?: number;
  engineCc?: string;
  helmets?: number;
  duration?: Record<Locale, string>;
  unitInfo?: string;
  priceIdr: string;
}

const FLEET_ITEMS: FleetItem[] = [
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
  },
  // Paket Wisata
  {
    id: "tour-city",
    service: "paket-wisata",
    name: "Paket City Tour",
    category: "City Tour",
    duration: { id: "10 jam", en: "10 hours" },
    seats: 6,
    unitInfo: "Avanza / Xpander",
    priceIdr: "Rp 750.000",
  },
  {
    id: "tour-fullday",
    service: "paket-wisata",
    name: "Paket Wisata Full Day",
    category: "Full Day",
    duration: { id: "12 jam", en: "12 hours" },
    seats: 6,
    unitInfo: "Innova Reborn",
    priceIdr: "Rp 950.000",
  },
  {
    id: "tour-2d1n",
    service: "paket-wisata",
    name: "Paket Wisata 2H1M",
    category: "Overnight",
    duration: { id: "2H1M", en: "2D1N" },
    seats: 6,
    unitInfo: "Innova Zenix",
    priceIdr: "Rp 1.950.000",
  },
  {
    id: "tour-group",
    service: "paket-wisata",
    name: "Paket Rombongan Hiace",
    category: "Group Tour",
    duration: { id: "12 jam", en: "12 hours" },
    seats: 14,
    unitInfo: "Toyota Hiace",
    priceIdr: "Rp 1.550.000",
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
  perPackage: string;
  withDriverNote: string;
  seeMore: string;
  detailLabel: string;
  placeholderLabel: string;
  seatsLabel: (count: number) => string;
  luggageLabel: (count: number) => string;
  helmetsLabel: (count: number) => string;
  maxPassengers: (count: number) => string;
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
    perPackage: "/ paket",
    withDriverNote: "Termasuk supir",
    seeMore: "Lihat Semua",
    detailLabel: "Detail",
    placeholderLabel: "Lorem ipsum dolor sit amet",
    seatsLabel: (count) => `${count} kursi`,
    luggageLabel: (count) => `${count} bagasi`,
    helmetsLabel: (count) => `${count} helm`,
    maxPassengers: (count) => `Maks. ${count} orang`,
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
    perPackage: "/ package",
    withDriverNote: "With driver",
    seeMore: "See More",
    detailLabel: "Details",
    placeholderLabel: "Lorem ipsum dolor sit amet",
    seatsLabel: (count) => `${count} seats`,
    luggageLabel: (count) => `${count} luggage`,
    helmetsLabel: (count) => `${count} helmets`,
    maxPassengers: (count) => `Max ${count} pax`,
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

  const seeMoreHref =
    serviceTab === "lepas-kunci"
      ? `/mobil?layanan=lepas-kunci&jenis=${vehicleType}`
      : `/mobil?layanan=${serviceTab}`;

  return (
    <section
      id="armada"
      aria-label={copy.sectionLabel}
      className="w-full bg-[var(--bg)] py-14 sm:py-20 font-sans"
    >
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-[28px] sm:text-[34px] font-semibold tracking-tight text-[var(--fg)] leading-tight">
            {copy.title}
          </h2>
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
                )
              )}
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

        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-pl-5 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-8 sm:overflow-visible"
        >
          {filteredItems.map((vehicle) => (
            <article
              key={vehicle.id}
              className="flex flex-col w-[76vw] max-w-[280px] shrink-0 snap-start sm:w-auto sm:max-w-none sm:shrink"
            >
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

                {vehicle.service === "paket-wisata" ? (
                  <>
                    <div className="flex items-center gap-1.5 text-[13px] text-[var(--muted-text)]">
                      <Clock
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{vehicle.duration?.[locale]}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[13px] text-[var(--muted-text)]">
                      {vehicle.seats && (
                        <span className="inline-flex items-center gap-1.5">
                          <Users
                            className="w-3.5 h-3.5 shrink-0"
                            aria-hidden="true"
                          />
                          <span>{copy.maxPassengers(vehicle.seats)}</span>
                        </span>
                      )}
                      {vehicle.unitInfo && <span>· {vehicle.unitInfo}</span>}
                    </div>
                  </>
                ) : vehicle.vehicleType === "motor" ? (
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
                      {vehicle.service === "paket-wisata"
                        ? copy.perPackage
                        : copy.perDay}
                    </span>
                  </p>
                </div>

                {vehicle.service === "paket-wisata" && (
                  <div className="mt-2.5">
                    <Button
                      variant="default"
                      nativeButton={false}
                      render={
                        <Link
                          href={`/mobil?layanan=paket-wisata&paket=${vehicle.id}`}
                        />
                      }
                      className="h-9 w-full gap-1.5 rounded-full px-4 text-[13px] font-medium ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-gradient-to-b from-[#38bdf8] to-[#009cde] hover:from-[#1eb3f0] hover:to-[#008bc7] border-[#009cde] focus-visible:border-[#009cde] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_rgba(0,156,222,0.25)]"
                    >
                      <span>{copy.detailLabel}</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 shrink-0"
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredItems.length > 6 && (
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

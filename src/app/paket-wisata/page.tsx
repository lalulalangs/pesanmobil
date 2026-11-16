import type { Metadata } from "next";
import { TourPackagesSection } from "@/components/TourPackagesSection";

export const metadata: Metadata = {
  title: "Paket Wisata | pesanmobil.com",
  description:
    "Pilihan paket wisata harian, city tour, hingga rombongan dengan unit nyaman dan pengemudi profesional di pesanmobil.com.",
};

export default function PaketWisataPage() {
  return (
    <main className="w-full min-h-screen bg-[var(--bg)] text-[var(--fg)] font-sans">
      <TourPackagesSection />
    </main>
  );
}

import type { Metadata } from "next";
import { FleetSection } from "@/components/FleetSection";

export const metadata: Metadata = {
  title: "Daftar Unit | pesanmobil.com",
  description:
    "Pilihan unit mobil dan motor lepas kunci maupun dengan pengemudi profesional di pesanmobil.com.",
};

export default function DaftarUnitPage() {
  return (
    <main className="w-full min-h-screen bg-[var(--bg)] text-[var(--fg)] font-sans">
      <FleetSection showSeeMore={false} standalone />
    </main>
  );
}

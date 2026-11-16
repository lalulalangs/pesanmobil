import type { Metadata } from "next";
import { AboutSection } from "@/components/AboutSection";

export const metadata: Metadata = {
  title: "Tentang Kami — pesanmobil.com",
  description:
    "Kenali layanan sewa mobil dan motor terpercaya pesanmobil.com. Unit bersih, proses transparan, dan dukungan WhatsApp yang responsif.",
};

export default function TentangKamiPage() {
  return (
    <main className="w-full min-h-screen bg-[var(--bg)] text-[var(--fg)] font-sans">
      <AboutSection />
    </main>
  );
}

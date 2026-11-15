import dynamic from "next/dynamic";
import { FleetSection } from "@/components/FleetSection";
import { HeroSection } from "@/components/HeroSection";

const BookingSection = dynamic(() =>
  import("@/components/BookingSection").then((mod) => mod.BookingSection)
);

const whatsappNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";

const HERO_CONTENT = {
  title: "Perjalanan nyaman dimulai dari unit yang pas buat kamu",
  subtitle:
    "Pilih unit yang kamu mau, lalu kirim chat ke WhatsApp agar tim kami bantu siapkan unitnya",
  ctaLabel: "Booking Sekarang",
  ctaHref: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Halo pesanmobil.com, saya mau tanya ketersediaan unit sewa mobil."
  )}`,
  localizedCopy: {
    id: {
      title: "Perjalanan nyaman dimulai dari unit yang pas buat kamu",
      subtitle:
        "Pilih unit yang kamu mau, lalu kirim chat ke WhatsApp agar tim kami bantu siapkan unitnya",
      ctaLabel: "Booking Sekarang",
      ctaHref: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Halo pesanmobil.com, saya mau tanya ketersediaan unit sewa mobil."
      )}`,
    },
    en: {
      title: "A comfortable journey starts with the right vehicle for you",
      subtitle:
        "Pick the unit you want and chat with us on WhatsApp so our team can prepare it for you",
      ctaLabel: "Book Now",
      ctaHref: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hello pesanmobil.com, I would like to check car rental availability."
      )}`,
    },
  },
};

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-[var(--bg)] text-[var(--fg)] font-sans">
      <HeroSection
        title={HERO_CONTENT.title}
        subtitle={HERO_CONTENT.subtitle}
        ctaLabel={HERO_CONTENT.ctaLabel}
        ctaHref={HERO_CONTENT.ctaHref}
        localizedCopy={HERO_CONTENT.localizedCopy}
      />
      <FleetSection />
      <BookingSection />
    </main>
  );
}

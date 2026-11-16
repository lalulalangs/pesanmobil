"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import footerArtwork from "../../assets/dibawah-footer.jpg";
import { useLanguage, type Locale } from "@/components/LanguageProvider";

interface FooterLink {
  label: Record<Locale, string>;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  title: Record<Locale, string>;
  links: FooterLink[];
}

const COLUMNS: FooterColumn[] = [
  {
    title: { id: "Area Layanan", en: "Service Areas" },
    links: [
      { label: { id: "Mataram", en: "Mataram" }, href: "/#booking" },
      {
        label: { id: "Kuta Mandalika", en: "Kuta Mandalika" },
        href: "/#booking",
      },
      { label: { id: "Senggigi", en: "Senggigi" }, href: "/#booking" },
      { label: { id: "Bandara Lombok", en: "Lombok Airport" }, href: "/#booking" },
      { label: { id: "Pelabuhan Bangsal", en: "Bangsal Harbor" }, href: "/#booking" },
    ],
  },
  {
    title: { id: "Pilihan Layanan", en: "Our Services" },
    links: [
      { label: { id: "Sewa Mobil Lepas Kunci", en: "Self-Drive Car" }, href: "/#armada" },
      { label: { id: "Sewa Motor Lepas Kunci", en: "Self-Drive Motorbike" }, href: "/#armada" },
      { label: { id: "Sewa Dengan Pengemudi", en: "With Driver" }, href: "/#armada" },
      { label: { id: "Paket Wisata", en: "Tour Packages" }, href: "/paket-wisata" },
    ],
  },
  {
    title: { id: "Bantuan", en: "Support" },
    links: [
      { label: { id: "Formulir Booking", en: "Booking Form" }, href: "/#booking" },
      { label: { id: "Galeri Unit", en: "Fleet Gallery" }, href: "/#galeri" },
      { label: { id: "Pertanyaan Umum", en: "FAQ" }, href: "/#faq" },
    ],
  },
  {
    title: { id: "Tentang & Legal", en: "About & Legal" },
    links: [
      { label: { id: "Daftar Armada", en: "Car List" }, href: "/mobil" },
      { label: { id: "Tentang Kami", en: "About Us" }, href: "/tentang" },
      {
        label: { id: "Kebijakan Privasi", en: "Privacy Policy" },
        href: "/kebijakan-privasi",
      },
      {
        label: { id: "Syarat & Ketentuan", en: "Terms & Conditions" },
        href: "/syarat-ketentuan",
      },
    ],
  },
  {
    title: { id: "Media Sosial", en: "Social Media" },
    links: [
      {
        label: { id: "Instagram", en: "Instagram" },
        href: "https://instagram.com",
        external: true,
      },
      {
        label: { id: "Facebook", en: "Facebook" },
        href: "https://facebook.com",
        external: true,
      },
      {
        label: { id: "TikTok", en: "TikTok" },
        href: "https://tiktok.com",
        external: true,
      },
    ],
  },
];

export function Footer() {
  const { locale } = useLanguage();

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  const whatsappHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    locale === "id"
      ? "Halo pesanmobil.com, saya ingin bertanya tentang layanan sewa kendaraan."
      : "Hello pesanmobil.com, I would like to ask about your rental service."
  )}`;

  return (
    <footer className="w-full bg-[var(--bg)] pt-14 sm:pt-16 font-sans">
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
        >
          <Image
            src="/logo.png"
            alt="pesanmobil.com"
            width={140}
            height={29}
            className="h-7 w-auto"
          />
        </Link>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {COLUMNS.map((column, colIndex) => (
            <div key={column.title.en} className="flex flex-col gap-3">
              <h3 className="text-[13px] font-medium text-[var(--meta)]">
                {column.title[locale]}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((item) => (
                  <li key={item.label.en}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14px] text-[var(--fg)] hover:text-[var(--brand-link)] transition-colors"
                      >
                        {item.label[locale]}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[14px] text-[var(--fg)] hover:text-[var(--brand-link)] transition-colors"
                      >
                        {item.label[locale]}
                      </Link>
                    )}
                  </li>
                ))}
                {colIndex === 2 && (
                  <li>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[14px] text-[var(--fg)] hover:text-[var(--brand-link)] transition-colors"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-[13px] text-[var(--muted-text)]">
          <p>Copyright pesanmobil.com 2026</p>
          <p className="inline-flex items-center gap-1.5">
            <span>Made with</span>
            <Heart
              className="w-3.5 h-3.5 text-red-500 fill-red-500 shrink-0"
              aria-label="love"
            />
            <span>in Lombok, Indonesia</span>
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 sm:h-20 bg-gradient-to-b from-[var(--bg)] to-transparent"
        />
        <Image
          src={footerArtwork}
          alt=""
          aria-hidden="true"
          sizes="100vw"
          className="w-full h-auto block"
        />
      </div>
    </footer>
  );
}

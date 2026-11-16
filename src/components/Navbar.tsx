"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage, type Locale } from "@/components/LanguageProvider";

interface NavItem {
  href: string;
  label: Record<Locale, string>;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: { id: "Beranda", en: "Home" } },
  { href: "/mobil", label: { id: "Daftar Mobil", en: "Car List" } },
  { href: "/paket-wisata", label: { id: "Paket Wisata", en: "Tour Packages" } },
  { href: "/tentang-kami", label: { id: "Tentang Kami", en: "About Us" } },
];

const SCROLL_THRESHOLD_PX = 16;

export function Navbar() {
  const pathname = usePathname();
  const { locale, setLocale } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-8 pt-3 sm:pt-4 font-sans">
      <nav
        aria-label={locale === "id" ? "Navigasi utama" : "Main navigation"}
        className={`relative overflow-hidden mx-auto max-w-[1200px] transition-[background-color,border-color,box-shadow,padding,border-radius] duration-200 ${
          isScrolled
            ? "rounded-full bg-white/95 md:bg-white/85 md:backdrop-blur-md border border-[var(--border)]/70 shadow-[0_2px_16px_rgba(29,29,31,0.06)] px-5 sm:px-6 py-2"
            : "rounded-none bg-transparent border border-transparent px-1 sm:px-2 py-2"
        }`}
      >
        <div className="relative z-10 flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="shrink-0 flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
          >
            <Image
              src="/logo.png"
              alt="pesanmobil.com"
              width={140}
              height={29}
              priority
              className="h-5 sm:h-7 w-auto object-contain"
            />
          </Link>

          {/* Right: Links + Language Switcher + Mobile Toggle */}
          <div className="flex items-center gap-5 sm:gap-6">
            <ul className="hidden md:flex items-center gap-6 text-[14px] font-medium">
              {NAV_ITEMS.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`py-1 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 rounded ${
                        active
                          ? "text-[var(--fg)] font-semibold"
                          : "text-[var(--fg-2)] hover:text-[var(--fg)]"
                      }`}
                    >
                      {item.label[locale]}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div
              role="group"
              aria-label={locale === "id" ? "Pilih bahasa" : "Select language"}
              className="inline-flex items-center rounded-full border border-[var(--border)]/80 bg-[var(--surface)]/80 p-0.5"
            >
              {(["id", "en"] as const).map((lang) => {
                const selected = locale === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLocale(lang)}
                    aria-pressed={selected}
                    className={`min-w-[32px] min-h-[26px] px-2.5 py-0.5 rounded-full text-[12px] font-semibold uppercase tracking-wide transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] ${
                      selected
                        ? "bg-white text-[var(--fg)] shadow-xs"
                        : "text-[var(--muted-text)] hover:text-[var(--fg)]"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={
                mobileOpen
                  ? locale === "id"
                    ? "Tutup menu navigasi"
                    : "Close navigation menu"
                  : locale === "id"
                    ? "Buka menu navigasi"
                    : "Open navigation menu"
              }
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-[var(--border)] bg-white/80 text-[var(--fg)] hover:bg-[var(--surface)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
            >
              {mobileOpen ? (
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden mx-auto max-w-[1200px] mt-2 backdrop-blur-md bg-white/95 border border-[var(--border)] rounded-2xl p-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-4 py-2.5 rounded-xl text-[15px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] ${
                  active
                    ? "bg-[var(--surface)] text-[var(--fg)] font-semibold"
                    : "text-[var(--fg-2)] hover:bg-[var(--surface)]"
                }`}
              >
                {item.label[locale]}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

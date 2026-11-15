"use client";

import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import faqBg from "../../assets/mas-amba-bingung-loh-ya.jpg";
import { useLanguage, type Locale } from "@/components/LanguageProvider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

interface FaqItemData {
  id: string;
  question: Record<Locale, string>;
  answer: Record<Locale, string>;
}

const FAQ_ITEMS: FaqItemData[] = [
  {
    id: "faq-0",
    question: {
      id: "Apa saja syarat sewa mobil lepas kunci di pesanmobil.com?",
      en: "What are the requirements for self-drive rentals?",
    },
    answer: {
      id: "Cukup siapkan KTP, SIM A yang masih aktif, serta verifikasi data singkat sebelum unit kami serahkan. Prosesnya cepat dan dibantu langsung oleh tim kami lewat WhatsApp.",
      en: "You only need a valid ID card, an active driver's license, and a quick verification before handover. Our team will guide you smoothly on WhatsApp.",
    },
  },
  {
    id: "faq-1",
    question: {
      id: "Kenapa sewa lepas kunci minimal berdurasi 2 hari?",
      en: "Why is the minimum self-drive duration 2 days?",
    },
    answer: {
      id: "Biar jadwal penyiapan, pengecekan kebersihan, dan serah terima unit lebih nyaman tanpa terburu-buru. Kalau kamu butuh durasi kurang dari 2 hari, kamu tetap bisa pilih opsi Dengan Pengemudi.",
      en: "It ensures enough time for thorough preparation, cleaning, and smooth handover. If you need less than 2 days, you can still choose our With Driver option.",
    },
  },
  {
    id: "faq-2",
    question: {
      id: "Apakah unit bisa diantar ke bandara, stasiun, atau hotel?",
      en: "Can the vehicle be delivered to the airport, station, or hotel?",
    },
    answer: {
      id: "Bisa banget! Tulis saja titik jemput yang kamu mau di form pemesanan, lalu tim kami akan atur jadwal pengantaran dan penjemputan unit sesuai jam kedatanganmu.",
      en: "Yes! Just enter your preferred pick-up point in the booking form, and our team will arrange delivery and pick-up right on schedule.",
    },
  },
  {
    id: "faq-3",
    question: {
      id: "Bagaimana cara booking dan memastikan unitnya tersedia?",
      en: "How do I book and confirm unit availability?",
    },
    answer: {
      id: "Pilih lokasi, tanggal, opsi layanan, dan unit di form pemesanan lalu klik Booking. Detail pesananmu langsung masuk ke WhatsApp agar tim kami cek ketersediaan saat itu juga.",
      en: "Pick your location, dates, service option, and unit in the booking form and click Booking. Your summary opens directly in WhatsApp so our team can confirm availability right away.",
    },
  },
  {
    id: "faq-4",
    question: {
      id: "Bagaimana sistem pembayaran dan jika ingin ubah jadwal?",
      en: "How do payments and schedule changes work?",
    },
    answer: {
      id: "Pembayaran dilakukan setelah tim kami mengonfirmasi ketersediaan unit dan rincian biayanya. Jika ada perubahan jam atau tanggal, cukup kabari kami lebih awal lewat WhatsApp.",
      en: "Payment is made after our team confirms unit availability and total pricing. If your travel time changes, just let us know in advance via WhatsApp.",
    },
  },
];

interface FaqCopy {
  sectionLabel: string;
  headline: string;
  helperText: string;
  ctaLabel: string;
  whatsappText: string;
}

const COPY: Record<Locale, FaqCopy> = {
  id: {
    sectionLabel: "Pertanyaan yang sering diajukan",
    headline: "Masih ada yang bikin bingung? Cek di sini, yuk",
    helperText:
      "Tim kami selalu siap kasih jawaban cepat dan jelas kapan pun kamu butuh.",
    ctaLabel: "Chat Tim Kami",
    whatsappText:
      "Halo pesanmobil.com, saya ada beberapa pertanyaan seputar sewa unit.",
  },
  en: {
    sectionLabel: "Frequently asked questions",
    headline: "General questions asked by customers",
    helperText:
      "Our friendly team is always here to help you with quick, clear answers whenever needed.",
    ctaLabel: "Contact Us",
    whatsappText:
      "Hello pesanmobil.com, I have a few questions about renting a vehicle.",
  },
};

export function FaqSection() {
  const { locale } = useLanguage();
  const copy = COPY[locale];

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";
  const ctaHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    copy.whatsappText
  )}`;

  return (
    <section
      id="faq"
      aria-label={copy.sectionLabel}
      className="relative isolate overflow-hidden w-full bg-[var(--bg)] py-14 sm:py-24 font-sans"
    >
      <Image
        src={faqBg}
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="pointer-events-none -z-20 object-cover object-center opacity-50"
      />
      {/* Soft white overlay and seamless vertical edge fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,#ffffff_0%,rgba(255,255,255,0.82)_18%,rgba(255,255,255,0.78)_50%,rgba(255,255,255,0.84)_82%,#ffffff_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.55)_45%,rgba(255,255,255,0.25)_100%)]"
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Headline top, Support CTA bottom */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <h2 className="text-[28px] sm:text-[36px] font-semibold tracking-tight text-[var(--fg)] leading-tight max-w-[16ch]">
              {copy.headline}
            </h2>

            <div className="flex flex-col items-start gap-4 max-w-[36ch]">
              <p className="text-[15px] text-[var(--fg-2)] leading-relaxed">
                {copy.helperText}
              </p>
              <Button
                variant="cta"
                nativeButton={false}
                render={
                  <a
                    href={ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="h-10 gap-2 px-5 text-[14px]"
              >
                <span>{copy.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Right Column: Accordion Cards */}
          <div className="lg:col-span-7">
            <Accordion defaultValue={["faq-0"]} className="gap-3">
              {FAQ_ITEMS.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="rounded-2xl bg-[var(--bg)] border border-[var(--border)]/80 shadow-[0_2px_12px_rgba(29,29,31,0.04)] px-5 sm:px-6 py-1.5 not-last:border-b"
                >
                  <AccordionTrigger className="items-center py-3.5 text-[15px] sm:text-[16px] font-semibold text-[var(--fg)] hover:no-underline [&>[data-slot=accordion-trigger-icon]]:hidden">
                    <span className="pr-3 leading-snug">
                      {item.question[locale]}
                    </span>
                    <span
                      aria-hidden="true"
                      className="ml-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 bg-[#f4f4f5] border-[var(--border)] text-[var(--fg-2)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] group-aria-expanded/accordion-trigger:bg-gradient-to-b group-aria-expanded/accordion-trigger:from-[#38bdf8] group-aria-expanded/accordion-trigger:to-[#009cde] group-aria-expanded/accordion-trigger:border-[#009cde] group-aria-expanded/accordion-trigger:text-white group-aria-expanded/accordion-trigger:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_6px_rgba(0,156,222,0.25)]"
                    >
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-aria-expanded/accordion-trigger:rotate-180" />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] sm:text-[15px] text-[var(--muted-text)] leading-relaxed pb-4 pr-10">
                    {item.answer[locale]}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

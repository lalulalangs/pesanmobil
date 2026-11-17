import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import tabIcon from "../../assets/1on1-logo.jpg";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const switzer = localFont({
  src: "./fonts/Switzer-Medium.woff2",
  weight: "500",
  style: "normal",
  variable: "--font-switzer",
});

export const metadata: Metadata = {
  title: "pesanmobil.com: Sewa Mobil Lepas Kunci dan dengan Pengemudi",
  icons: {
    icon: tabIcon.src,
    shortcut: tabIcon.src,
    apple: tabIcon.src,
  },
  description:
    "Pesan rental mobil dan motor mudah, cepat, dan terpercaya. Berbasis di Bali dan melayani seluruh Indonesia untuk sewa harian, mingguan, bulanan lepas kunci atau dengan pengemudi.",
  keywords: [
    "pesan mobil",
    "rental mobil",
    "sewa mobil",
    "rental mobil bali",
    "sewa mobil bali",
    "rental mobil lepas kunci",
    "sewa mobil dengan supir",
    "rental avanza",
    "rental innova zenix",
    "rental hiace",
    "rental mobil seluruh indonesia",
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${geist.variable} ${switzer.variable} font-sans`}>
      <body className="font-sans antialiased bg-[var(--bg)] text-[var(--fg)] selection:bg-[var(--brand)] selection:text-white">
        <LanguageProvider>
          <SmoothScroll />
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}

"use client";

import { memo, useEffect, useMemo, useState, type FormEvent } from "react";
import {
  ArrowRight,
  Calendar,
  CalendarCheck,
  Info,
  KeyRound,
  MapPin,
  UserCheck,
} from "lucide-react";
import { useLanguage, type Locale } from "@/components/LanguageProvider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ServiceMode = "without-driver" | "with-driver";

interface BookingCopy {
  sectionLabel: string;
  pickupLocationLabel: string;
  pickupLocationPlaceholder: string;
  pickupDateLabel: string;
  pickupTimeAria: string;
  returnDateLabel: string;
  returnTimeAria: string;
  optionLabel: string;
  withoutDriverLabel: string;
  withDriverLabel: string;
  submitLabel: string;
  minDaysTitle: string;
  minDaysDescription: string;
  invalidRangeTitle: string;
  invalidRangeDescription: string;
  missingLocationFallback: string;
}

const COPY: Record<Locale, BookingCopy> = {
  id: {
    sectionLabel: "Formulir pemesanan kendaraan",
    pickupLocationLabel: "Lokasi Penjemputan",
    pickupLocationPlaceholder: "Kota, bandara, hotel, atau alamat",
    pickupDateLabel: "Tanggal & Jam Ambil",
    pickupTimeAria: "Jam ambil kendaraan",
    returnDateLabel: "Tanggal & Jam Kembali",
    returnTimeAria: "Jam kembali kendaraan",
    optionLabel: "Opsi:",
    withoutDriverLabel: "Lepas Kunci",
    withDriverLabel: "Dengan Pengemudi",
    submitLabel: "Booking",
    minDaysTitle: "Sewa lepas kunci minimal 2 hari, ya!",
    minDaysDescription:
      "Biar tetap nyaman, pemesanan lepas kunci minimal berdurasi 2 hari (48 jam). Yuk tambah tanggal pengembalianmu atau pilih opsi Dengan Pengemudi!",
    invalidRangeTitle: "Cek lagi tanggal kembalimu, yuk!",
    invalidRangeDescription:
      "Tanggal & jam kembali harus setelah waktu ambil kendaraan biar jadwalmu bisa kami proses.",
    missingLocationFallback: "Belum ditentukan",
  },
  en: {
    sectionLabel: "Vehicle booking form",
    pickupLocationLabel: "Pick Up Location",
    pickupLocationPlaceholder: "City, airport, hotel, or address",
    pickupDateLabel: "Pick Up Date & Time",
    pickupTimeAria: "Pick up time",
    returnDateLabel: "Return Date & Time",
    returnTimeAria: "Return time",
    optionLabel: "Option:",
    withoutDriverLabel: "Without Driver",
    withDriverLabel: "With Driver",
    submitLabel: "Booking",
    minDaysTitle: "Self-drive rentals start at 2 days!",
    minDaysDescription:
      "To keep things smooth, self-drive bookings require at least 2 days (48 hours). Please extend your return date or switch to With Driver!",
    invalidRangeTitle: "Please check your return date!",
    invalidRangeDescription:
      "Your return date and time must be later than the pick up time so we can arrange your schedule.",
    missingLocationFallback: "Not specified yet",
  },
};

const MIN_SELF_DRIVE_HOURS = 48;

const TIME_OPTIONS = Array.from({ length: 48 }, (_, index) => {
  const hour = String(Math.floor(index / 2)).padStart(2, "0");
  const minute = index % 2 === 0 ? "00" : "30";
  return `${hour}:${minute}`;
});

const TIME_CONTENT_CLASS =
  "max-h-60 min-w-[116px] rounded-xl border border-[var(--border)] bg-white p-1 shadow-[0_8px_24px_rgba(29,29,31,0.1)] ring-0";
const TIME_ITEM_CLASS =
  "rounded-lg py-1.5 pl-2.5 pr-8 text-[13px] text-[var(--fg)] focus:bg-[#f4f4f5] focus:text-[var(--fg)] data-[selected]:bg-[#009cde]/10 data-[selected]:text-[#0077ae] data-[selected]:font-medium";

const TimeSelectItems = memo(function TimeSelectItems() {
  return (
    <>
      {TIME_OPTIONS.map((time) => (
        <SelectItem key={time} value={time} className={TIME_ITEM_CLASS}>
          {time}
        </SelectItem>
      ))}
    </>
  );
});

function getOffsetDateInput(daysFromToday: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function BookingSection() {
  const { locale } = useLanguage();
  const copy = COPY[locale];

  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("10:00");
  const [serviceMode, setServiceMode] =
    useState<ServiceMode>("without-driver");

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      setPickupDate((prev) => prev || getOffsetDateInput(1));
      setReturnDate((prev) => prev || getOffsetDateInput(3));
    });
    return () => cancelAnimationFrame(frameId);
  }, []);

  const durationHours = useMemo(() => {
    if (!pickupDate || !returnDate || !pickupTime || !returnTime) {
      return null;
    }
    const start = new Date(`${pickupDate}T${pickupTime}:00`);
    const end = new Date(`${returnDate}T${returnTime}:00`);
    const diffMs = end.getTime() - start.getTime();
    if (Number.isNaN(diffMs)) return null;
    return diffMs / (1000 * 60 * 60);
  }, [pickupDate, pickupTime, returnDate, returnTime]);

  const isInvalidRange = durationHours !== null && durationHours <= 0;
  const isBelowSelfDriveMin =
    serviceMode === "without-driver" &&
    durationHours !== null &&
    durationHours > 0 &&
    durationHours < MIN_SELF_DRIVE_HOURS;

  const showWarning = isInvalidRange || isBelowSelfDriveMin;
  const isSubmitDisabled = showWarning || !pickupDate || !returnDate;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitDisabled) return;

    const whatsappNumber =
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";

    const locationText =
      pickupLocation.trim() || copy.missingLocationFallback;
    const modeText =
      serviceMode === "without-driver"
        ? copy.withoutDriverLabel
        : copy.withDriverLabel;

    const message =
      locale === "id"
        ? [
            "Halo pesanmobil.com, saya mau booking unit dengan detail berikut:",
            `- Lokasi Penjemputan: ${locationText}`,
            `- Ambil: ${pickupDate} pukul ${pickupTime}`,
            `- Kembali: ${returnDate} pukul ${returnTime}`,
            `- Opsi: ${modeText}`,
          ].join("\n")
        : [
            "Hello pesanmobil.com, I would like to book a vehicle with these details:",
            `- Pick Up Location: ${locationText}`,
            `- Pick Up: ${pickupDate} at ${pickupTime}`,
            `- Return: ${returnDate} at ${returnTime}`,
            `- Option: ${modeText}`,
          ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="booking"
      aria-label={copy.sectionLabel}
      className="w-full bg-[var(--bg)] py-12 sm:py-20 font-sans"
    >
      <div className="w-full max-w-[1200px] mx-auto px-5 sm:px-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-[var(--bg)] border border-[var(--border)]/80 shadow-[0_4px_24px_rgba(29,29,31,0.06)] p-5 sm:p-7"
        >
          {/* Top Row: Location, Pick Up Date & Time, Return Date & Time */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Pick Up Location */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              <Label
                htmlFor="pickup-location"
                className="text-[14px] font-semibold text-[var(--fg)]"
              >
                {copy.pickupLocationLabel}
              </Label>
              <div className="h-12 rounded-xl bg-[#f4f4f5] px-3.5 flex items-center gap-2.5 border border-transparent focus-within:border-[var(--brand)] focus-within:bg-white transition-colors">
                <MapPin
                  className="w-4 h-4 shrink-0 text-[var(--muted-text)]"
                  aria-hidden="true"
                />
                <Input
                  id="pickup-location"
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  placeholder={copy.pickupLocationPlaceholder}
                  className="border-0 bg-transparent px-0 h-auto shadow-none focus-visible:ring-0 text-[14px] text-[var(--fg)] placeholder:text-[var(--muted-text)]"
                />
              </div>
            </div>

            {/* Pick Up Date & Time */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              <Label
                htmlFor="pickup-date"
                className="text-[14px] font-semibold text-[var(--fg)]"
              >
                {copy.pickupDateLabel}
              </Label>
              <div className="h-12 rounded-xl bg-[#f4f4f5] px-3.5 flex items-center gap-2 border border-transparent focus-within:border-[var(--brand)] focus-within:bg-white transition-colors">
                <Calendar
                  className="w-4 h-4 shrink-0 text-[var(--muted-text)]"
                  aria-hidden="true"
                />
                <Input
                  id="pickup-date"
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  required
                  className="border-0 bg-transparent px-0 h-auto shadow-none focus-visible:ring-0 focus-visible:border-transparent text-[13px] sm:text-[14px] text-[var(--fg)] flex-1 min-w-0"
                />
                <span
                  className="h-5 w-px bg-[var(--border)] shrink-0"
                  aria-hidden="true"
                />
                <Select
                  value={pickupTime}
                  onValueChange={(value) => {
                    if (value) setPickupTime(value);
                  }}
                >
                  <SelectTrigger
                    id="pickup-time"
                    aria-label={copy.pickupTimeAria}
                    className="border-0 bg-transparent px-0 h-auto data-[size=default]:h-auto shadow-none focus-visible:ring-0 focus-visible:border-transparent text-[13px] sm:text-[14px] text-[var(--fg)] w-[72px] shrink-0 gap-1"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    alignItemWithTrigger={false}
                    side="bottom"
                    align="end"
                    sideOffset={8}
                    data-lenis-prevent
                    className={TIME_CONTENT_CLASS}
                  >
                    <TimeSelectItems />
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Return Date & Time */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              <Label
                htmlFor="return-date"
                className="text-[14px] font-semibold text-[var(--fg)]"
              >
                {copy.returnDateLabel}
              </Label>
              <div
                className={`h-12 rounded-xl bg-[#f4f4f5] px-3.5 flex items-center gap-2 border transition-colors ${
                  showWarning
                    ? "border-[#d97706] bg-[#fffbeb]/40"
                    : "border-transparent focus-within:border-[var(--brand)] focus-within:bg-white"
                }`}
              >
                <CalendarCheck
                  className="w-4 h-4 shrink-0 text-[var(--muted-text)]"
                  aria-hidden="true"
                />
                <Input
                  id="return-date"
                  type="date"
                  value={returnDate}
                  min={pickupDate || undefined}
                  onChange={(e) => setReturnDate(e.target.value)}
                  required
                  aria-invalid={showWarning}
                  className="border-0 bg-transparent px-0 h-auto shadow-none focus-visible:ring-0 focus-visible:border-transparent aria-invalid:ring-0 aria-invalid:border-transparent text-[13px] sm:text-[14px] text-[var(--fg)] flex-1 min-w-0"
                />
                <span
                  className="h-5 w-px bg-[var(--border)] shrink-0"
                  aria-hidden="true"
                />
                <Select
                  value={returnTime}
                  onValueChange={(value) => {
                    if (value) setReturnTime(value);
                  }}
                >
                  <SelectTrigger
                    id="return-time"
                    aria-label={copy.returnTimeAria}
                    className="border-0 bg-transparent px-0 h-auto data-[size=default]:h-auto shadow-none focus-visible:ring-0 focus-visible:border-transparent aria-invalid:ring-0 aria-invalid:border-transparent text-[13px] sm:text-[14px] text-[var(--fg)] w-[72px] shrink-0 gap-1"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent
                    alignItemWithTrigger={false}
                    side="bottom"
                    align="end"
                    sideOffset={8}
                    data-lenis-prevent
                    className={TIME_CONTENT_CLASS}
                  >
                    <TimeSelectItems />
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Bottom Row: Service Option (With / Without Driver) + Booking CTA */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="text-[14px] font-medium text-[var(--muted-text)] mr-1">
                {copy.optionLabel}
              </span>
              <div
                role="radiogroup"
                aria-label={copy.optionLabel}
                className="inline-flex flex-wrap items-center gap-2"
              >
                <Button
                  type="button"
                  role="radio"
                  aria-checked={serviceMode === "without-driver"}
                  variant={
                    serviceMode === "without-driver" ? "default" : "outline"
                  }
                  onClick={() => setServiceMode("without-driver")}
                  className={`h-9 rounded-full px-4 text-[13px] font-medium gap-1.5 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                    serviceMode === "without-driver"
                      ? "bg-gradient-to-b from-[#38bdf8] to-[#009cde] hover:from-[#1eb3f0] hover:to-[#008bc7] border-[#009cde] focus-visible:border-[#009cde] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_rgba(0,156,222,0.25)]"
                      : "bg-white text-[var(--fg-2)] border-[var(--border)] hover:bg-[var(--surface)]"
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{copy.withoutDriverLabel}</span>
                </Button>

                <Button
                  type="button"
                  role="radio"
                  aria-checked={serviceMode === "with-driver"}
                  variant={
                    serviceMode === "with-driver" ? "default" : "outline"
                  }
                  onClick={() => setServiceMode("with-driver")}
                  className={`h-9 rounded-full px-4 text-[13px] font-medium gap-1.5 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${
                    serviceMode === "with-driver"
                      ? "bg-gradient-to-b from-[#38bdf8] to-[#009cde] hover:from-[#1eb3f0] hover:to-[#008bc7] border-[#009cde] focus-visible:border-[#009cde] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_8px_rgba(0,156,222,0.25)]"
                      : "bg-white text-[var(--fg-2)] border-[var(--border)] hover:bg-[var(--surface)]"
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{copy.withDriverLabel}</span>
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              variant="cta"
              disabled={isSubmitDisabled}
              className="h-11 w-full sm:w-auto gap-2 px-7 text-[15px] disabled:opacity-50"
            >
              <span>{copy.submitLabel}</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </Button>
          </div>

          {/* Friendly Tokopedia-style guardrail warning */}
          {showWarning && (
            <Alert className="mt-4 rounded-xl border-[#f59e0b]/50 bg-[#fffbeb] px-4 py-3 text-[#92400e]">
              <Info className="w-4 h-4 text-[#d97706]" aria-hidden="true" />
              <AlertTitle className="font-semibold text-[#78350f]">
                {isInvalidRange ? copy.invalidRangeTitle : copy.minDaysTitle}
              </AlertTitle>
              <AlertDescription className="text-[#92400e]">
                {isInvalidRange
                  ? copy.invalidRangeDescription
                  : copy.minDaysDescription}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </div>
    </section>
  );
}

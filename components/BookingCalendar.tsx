import React, { useEffect, useMemo, useRef, useState } from "react";
import { t, type Lang } from "../src/i18n";

type PendingBooking = {
  selectedDate: string;
  selectedISO: string;
  name: string;
  phone: string;
  kids: string;
  notes: string;
  rentalType: string;
  depositToPay: number;
  totalPrice: number;
  sessionId?: string;
};

const PENDING_KEY = "juga_pending_booking_v1";

type RentalOpt = { label: string; value: string; schedule: string };

type Props = {
  lang: Lang;
};

const BookingCalendar: React.FC<Props> = ({ lang }) => {
  const tr = t(lang);
  const bc = tr?.bookingCalendar ?? {};

  const T = {
    badge: bc.badge ?? "Calendari Algemesí 2026",
    titlePre: bc.titlePre ?? "Reserva la teua",
    titleHighlight: bc.titleHighlight ?? "Festa",
    introPre: bc.introPre ?? "Les dates en",
    introHighlight1: bc.introHighlight1 ?? "VERD",
    introMid: bc.introMid ?? "ja estan",
    introHighlight2: bc.introHighlight2 ?? "RESERVADES",
    introPost: bc.introPost ?? "i bloquejades automàticament.",
    chooseDayTitle: bc.chooseDayTitle ?? "Quan és el cumple?",
    chooseDaySubtitle:
      bc.chooseDaySubtitle ?? "Tria un dia disponible al calendari per a començar.",
    reservedTag: bc.reservedTag ?? "RESERVAT",
    holidayTag: bc.holidayTag ?? "FESTIU",
    legendBooked: bc.legendBooked ?? "RESERVAT",
    legendSelected: bc.legendSelected ?? "Selecció",
    legendFree: bc.legendFree ?? "Lliure",
    legendHoliday: bc.legendHoliday ?? "Festiu",
    formTitle: bc.formTitle ?? "Dades de l’esdeveniment",
    nextStep: bc.nextStep ?? "SEGÜENT PAS 🚀",
    payTitle: bc.payTitle ?? "Pagament segur",
    modify: bc.modify ?? "← MODIFICAR",
    payButton: bc.payButton ?? "PAGAR AMB TARGETA (STRIPE) 🥳",
    redirecting: bc.redirecting ?? "REDIRIGINT A STRIPE...",
    missingFields: bc.missingFields ?? "Completa nom i WhatsApp abans de pagar.",
    dateTaken: bc.dateTaken ?? "Eixa data ja està reservada. Tria una altra.",
    paidNoPending:
      bc.paidNoPending ??
      "Pagament rebut, però no s’ha trobat la reserva pendent. Escriu-nos per WhatsApp.",
    paidRegisterFail:
      bc.paidRegisterFail ??
      "Pagament OK, però ha fallat el registre. Escriu-nos per WhatsApp amb el justificant.",
    labels: {
      responsible: bc.labels?.responsible ?? "Responsable de la festa",
      fullNamePH: bc.labels?.fullNamePH ?? "Nom complet",
      whatsapp: bc.labels?.whatsapp ?? "WhatsApp de contacte",
      whatsappPH: bc.labels?.whatsappPH ?? "6XX XXX XXX",
      rentalConfig: bc.labels?.rentalConfig ?? "Configuració del lloguer",
      autoRates: bc.labels?.autoRates ?? "(Les tarifes s’ajusten automàticament segons el dia)",
      cleaningTitle: bc.labels?.cleaningTitle ?? "SERVEI DE NETEJA",
      cleaningSub: bc.labels?.cleaningSub ?? "60€ - A consultar amb el local",
      payToday: bc.labels?.payToday ?? "Pagament reserva hui (50%)",
      summaryTitle: bc.labels?.summaryTitle ?? "Resum de la selecció",
      base: bc.labels?.base ?? "Lloguer base:",
      schedule: bc.labels?.schedule ?? "Horari:",
      cleaning: bc.labels?.cleaning ?? "Servei neteja:",
      total: bc.labels?.total ?? "Total lloguer:",
      deposit: bc.labels?.deposit ?? "PAGAMENT RESERVA:",
      infoTitle: bc.labels?.infoTitle ?? "📋 INFORMACIÓ ADDICIONAL:",
      info1: bc.labels?.info1 ?? "• La fiança de {SECURITY_DEPOSIT}€ s’abona en efectiu el dia de l’esdeveniment.",
      info2: bc.labels?.info2 ?? "• El servei de neteja de {CLEANING_FEE}€ s’ha de sol·licitar a banda.",
      info3: bc.labels?.info3 ?? "• En pagar, et redirigim a Stripe. En tornar, es marca com a RESERVAT.",
      reservedOkTitle: bc.labels?.reservedOkTitle ?? "RESERVAT!",
      reservedOkTextPre: bc.labels?.reservedOkTextPre ?? "La teua data",
      reservedOkTextPost: bc.labels?.reservedOkTextPost ?? "ja està marcada en VERD.",
      sendProof: bc.labels?.sendProof ?? "ENVIAR JUSTIFICANT PER WHATSAPP 📄",
    },
  };

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedISO, setSelectedISO] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLDivElement>(null);

  // Ajusta estos importes si cambian
  const CLEANING_FEE = 60;
  const SECURITY_DEPOSIT = 100;
  const PHONE_NUMBER = "34669106393";

  const WEB_APP_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbw_mTR8MsfkzXEOnwGQBZwnLdzGBE2JcIpg5HCjlAsHh7qUUi7N-ZiEJMrQ5udJ4EXI/exec";

  // ✅ Mínimo de negocio (bloquea antes de este día)
  const businessMinDate = new Date(2026, 0, 20);
  businessMinDate.setHours(0, 0, 0, 0);

  // ✅ Festivos 2026 (CV + Algemesí locales)
  // Fuentes: Calendarios Ideal (CV) + calendario municipal/CEV para Algemesí
  const HOLIDAYS_2026: string[] = [
    "2026-01-01",
    "2026-01-06",
    "2026-03-19",
    "2026-04-03",
    "2026-04-06",
    "2026-05-01",
    "2026-06-12", // Algemesí (San Onofre)
    "2026-06-24",
    "2026-08-15",
    "2026-09-08", // Algemesí (Nuestra Señora de la Salud)
    "2026-10-09",
    "2026-10-12",
    "2026-12-08",
    "2026-12-25",
  ];

  const holidaySet = useMemo(() => new Set(HOLIDAYS_2026), []);
  function isHolidayISO(iso: string) {
    return holidaySet.has(iso);
  }

  // ✅ Mes inicial automático (sin quedarse en enero)
  function getInitialMonthIndex() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let m = 0;

    // Si estamos en 2026, abre en el mes actual
    if (today.getFullYear() === 2026) m = today.getMonth();

    // Si hoy es antes del mínimo permitido, abre en el mes del mínimo
    if (today < businessMinDate) m = businessMinDate.getMonth();

    return Math.max(0, Math.min(11, m));
  }

  const [month, setMonth] = useState<number>(() => getInitialMonthIndex());

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    kids: "15",
    notes: "",
    rentalType: "80",
    cleaning: false,
  });

  const months = useMemo(
    () => [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ],
    []
  );

  const ALL_RENTAL_OPTIONS: RentalOpt[] = useMemo(
    () => [
      { label: "Lunes a Jueves (80€)", value: "80", schedule: "10:00–21:30" },
      { label: "Viernes / Víspera de festivo (100€)", value: "100", schedule: "10:00–21:30" },
      { label: "Sábado, domingo y festivos (160€)", value: "160", schedule: "10:00–21:30" },
    ],
    []
  );

  function isoToDate(iso: string) {
    const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
    const dt = new Date(y, m - 1, d);
    dt.setHours(0, 0, 0, 0);
    return dt;
  }

  function dateToISO(dt: Date) {
    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const d = String(dt.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function getAllowedOptionsForISO(iso: string): RentalOpt[] {
    const dt = isoToDate(iso);
    const dow = dt.getDay(); // 0 domingo ... 6 sábado

    const isHoliday = isHolidayISO(iso);

    const next = new Date(dt);
    next.setDate(next.getDate() + 1);
    const nextISO = dateToISO(next);
    const isEveOfHoliday = isHolidayISO(nextISO);

    // Festivo => tarifa festivo
    if (isHoliday) return ALL_RENTAL_OPTIONS.filter((o) => o.value === "160");

    // Sábado o domingo => tarifa festivo
    if (dow === 6 || dow === 0) return ALL_RENTAL_OPTIONS.filter((o) => o.value === "160");

    // Viernes o víspera de festivo => tarifa viernes
    if (dow === 5 || isEveOfHoliday) return ALL_RENTAL_OPTIONS.filter((o) => o.value === "100");

    // Lunes-jueves => tarifa semana
    return ALL_RENTAL_OPTIONS.filter((o) => o.value === "80");
  }

  const rentalOptions: RentalOpt[] = selectedISO ? getAllowedOptionsForISO(selectedISO) : [];

  useEffect(() => {
    if (!selectedISO) return;
    const allowed = getAllowedOptionsForISO(selectedISO);
    if (allowed.length === 0) return;

    const allowedValues = new Set(allowed.map((o) => o.value));
    if (!allowedValues.has(formData.rentalType)) {
      setFormData((prev) => ({ ...prev, rentalType: allowed[0].value }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedISO]);

  const basePrice = parseFloat(String(formData.rentalType).split("_")[0]);
  const cleaningPrice = 0;
  const totalPrice = basePrice + cleaningPrice;
  const depositToPay = totalPrice / 2;

  const selectedOpt = ALL_RENTAL_OPTIONS.find((o) => o.value === formData.rentalType);
  const selectedSchedule = selectedOpt?.schedule || "-";
  const selectedTarifaLabel = selectedOpt?.label || formData.rentalType;

  const getToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };

  function normalizeSheetDateToISO(v: any): string | null {
    if (v === null || v === undefined) return null;

    if (typeof v === "string") {
      const s = v.trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;

      const d = new Date(s);
      if (!Number.isNaN(d.getTime())) {
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
      }

      if (s.includes("T")) {
        const cut = s.split("T")[0];
        if (/^\d{4}-\d{2}-\d{2}$/.test(cut)) return cut;
      }

      return null;
    }

    const d = new Date(v);
    if (!Number.isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }

    return null;
  }

  async function fetchBookedSet(): Promise<Set<string>> {
    const res = await fetch(`${WEB_APP_ENDPOINT}?t=${Date.now()}`, { cache: "no-store" });
    const data = await res.json().catch(() => null);

    if (!data?.ok || !Array.isArray(data?.rows) || data.rows.length < 2) return new Set();

    const rows: any[][] = data.rows;
    const header = rows[0].map((h) => String(h).trim().toLowerCase());
    const iDate = header.indexOf("date");
    const iStatus = header.indexOf("status");

    if (iDate === -1 || iStatus === -1) return new Set();

    const s = new Set<string>();
    for (let i = 1; i < rows.length; i++) {
      const iso = normalizeSheetDateToISO(rows[i][iDate]);
      const st = String(rows[i][iStatus] || "").trim().toUpperCase();
      if (iso && (st === "RESERVADO" || st === "PENDIENTE")) s.add(iso);
    }
    return s;
  }

  async function loadDates() {
    try {
      const s = await fetchBookedSet();
      setBookedDates(s);
    } catch (e) {
      console.error("Error al cargar fechas:", e);
    }
  }

  useEffect(() => {
    loadDates();
  }, []);

  // ✅ Al seleccionar fecha, baja al formulario
  useEffect(() => {
    if (selectedISO && formRef.current) {
      const timer = setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [selectedISO]);

  // ✅ Si hay fecha seleccionada (o vuelves de Stripe), salta al mes de esa fecha
  useEffect(() => {
    if (!selectedISO) return;
    const dt = isoToDate(selectedISO);
    setMonth(Math.max(0, Math.min(11, dt.getMonth())));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedISO]);

  const handleDateClick = (d: number, isPast: boolean, isBooked: boolean, iso: string) => {
    if (isPast || isBooked) return;
    setSelectedDate(`${d} de ${months[month]} 2026`);
    setSelectedISO(iso);
    setSubmitted(false);
    setPaymentStep(false);
  };

  function savePendingBooking(sessionId?: string) {
    if (!selectedISO || !selectedDate) return;

    const pending: PendingBooking = {
      selectedISO,
      selectedDate,
      name: formData.name,
      phone: formData.phone,
      kids: formData.kids,
      notes: formData.notes,
      rentalType: formData.rentalType,
      depositToPay: Number(depositToPay.toFixed(2)),
      totalPrice: Number(totalPrice.toFixed(2)),
      sessionId,
    };

    localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  }

  function readPendingBooking(): PendingBooking | null {
    try {
      const raw = localStorage.getItem(PENDING_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as PendingBooking;
    } catch {
      return null;
    }
  }

  function clearPendingBooking() {
    localStorage.removeItem(PENDING_KEY);
  }

  async function registerReservation(pending: PendingBooking) {
    const notesPack =
      `WEB_RESERVA | Pago Stripe (señal) | Session: ${pending.sessionId || ""} | ` +
      `Señal: ${pending.depositToPay}€ | Tarifa: ${selectedTarifaLabel} | Horario: ${selectedSchedule} | ` +
      `Niños: ${pending.kids || "-"} | ` +
      `Limpieza: A CONSULTAR | Fianza: ${SECURITY_DEPOSIT}€ | Total alquiler: ${pending.totalPrice}€ | ` +
      `${pending.notes ? "Notas: " + pending.notes : ""}`;

    const body = new URLSearchParams({
      action: "new",
      date: pending.selectedISO || "",
      name: pending.name || "",
      phone: pending.phone || "",
      notes: notesPack,
    }).toString();

    const r = await fetch(WEB_APP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body,
    });

    const txt = await r.text();
    if (!r.ok || txt.trim() !== "OK") {
      throw new Error(txt || "ERROR registrando en Goo

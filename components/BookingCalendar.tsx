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

  // ✅ ultra-safe: si i18n aún no tiene bookingCalendar, no crashea
  const bc = (tr && (tr as any).bookingCalendar) ? (tr as any).bookingCalendar : {};

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
      info1:
        bc.labels?.info1 ??
        "• La fiança de {SECURITY_DEPOSIT}€ s’abona en efectiu el dia de l’esdeveniment.",
      info2:
        bc.labels?.info2 ??
        "• El servei de neteja de {CLEANING_FEE}€ s’ha de sol·licitar a banda.",
      info3:
        bc.labels?.info3 ??
        "• En pagar, et redirigim a Stripe. En tornar, es marca com a RESERVAT.",
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

  // ✅ Festivos 2026 (CV + Algemesí locales) — revisaremos lista luego si quieres
  const HOLIDAYS_2026: string[] = [
    "2026-01-01",
    "2026-01-06",
    "2026-03-19",
    "2026-04-03",
    "2026-04-06",
    "2026-05-01",
    "2026-06-12", // Algemesí (Sant Onofre) - ojo: confirmar
    "2026-06-24",
    "2026-08-15",
    "2026-09-08", // Algemesí (Mare de Déu de la Salut) - ojo: confirmar
    "2026-10-09",
    "2026-10-12",
    "2026-12-08",
    "2026-12-25",
  ];

  // ✅ más robusto que useMemo aquí (evita movidas al pegar/recompilar)
  const holidaySet = new Set(HOLIDAYS_2026);
  function isHolidayISO(iso: string) {
    return holidaySet.has(iso);
  }

  // ✅ Mes inicial automático (sin quedarse en enero)
  function getInitialMonthIndex() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let m = 0;
    if (today.getFullYear() === 2026) m = today.getMonth();
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

    if (isHoliday) return ALL_RENTAL_OPTIONS.filter((o) => o.value === "160");
    if (dow === 6 || dow === 0) return ALL_RENTAL_OPTIONS.filter((o) => o.value === "160");
    if (dow === 5 || isEveOfHoliday) return ALL_RENTAL_OPTIONS.filter((o) => o.value === "100");

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
      throw new Error(txt || "ERROR registrando en Google Sheet.");
    }

    setBookedDates((prev) => new Set([...prev, pending.selectedISO]));
    setSubmitted(true);

    await loadDates();

    const waMsg =
      `¡Hola! He reservado el día ${pending.selectedDate}.\n` +
      `👤: ${pending.name}\n` +
      `💳 Pago Reserva (Stripe): ${pending.depositToPay}€\n` +
      `📅 Tarifa: ${selectedTarifaLabel}\n` +
      `🕒 Horario: ${selectedSchedule}\n` +
      `👶 Niños: ${pending.kids || "-"}\n` +
      `⚠️ Recordatorio: Fianza de ${SECURITY_DEPOSIT}€ en efectivo y Limpieza (${CLEANING_FEE}€) a consultar.\n` +
      `🧾 Session: ${pending.sessionId || "-"}`;

    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(waMsg)}`, "_blank");
  }

  // ✅ Retorno de Stripe
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paid = params.get("paid");
    const sessionId = params.get("session_id") || undefined;

    if (!paid) return;

    const cleanUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, "", cleanUrl);

    if (paid === "0") {
      setPaymentStep(true);
      return;
    }

    if (paid === "1") {
      const pending = readPendingBooking();

      if (!pending) {
        alert(T.paidNoPending);
        return;
      }

      setSelectedISO(pending.selectedISO);
      setSelectedDate(pending.selectedDate);
      setFormData((prev) => ({
        ...prev,
        name: pending.name,
        phone: pending.phone,
        kids: pending.kids,
        notes: pending.notes,
        rentalType: pending.rentalType,
      }));

      setPaymentStep(false);
      setIsSubmitting(true);

      pending.sessionId = sessionId;

      registerReservation(pending)
        .then(() => clearPendingBooking())
        .catch((err: any) => {
          console.error(err);
          alert(`${T.paidRegisterFail}\n\nMotivo: ${err?.message || "desconocido"}`);
        })
        .finally(() => setIsSubmitting(false));
    }
  }, []);

  async function goToStripeCheckout() {
    if (!selectedISO || !selectedDate) return;

    if (!formData.name || !formData.phone) {
      alert(T.missingFields);
      return;
    }

    setIsSubmitting(true);

    try {
      const liveSet = await fetchBookedSet();
      setBookedDates(liveSet);

      if (liveSet.has(selectedISO)) {
        alert(T.dateTaken);
        setIsSubmitting(false);
        return;
      }

      savePendingBooking();

      const r = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedISO,
          formatted_date: selectedDate,
          name: formData.name,
          phone: formData.phone,
          kids: formData.kids,
          notes: formData.notes,
          rentalType: formData.rentalType,
          depositToPay: Number(depositToPay.toFixed(2)),
          totalPrice: Number(totalPrice.toFixed(2)),
        }),
      });

      const data = await r.json();

      if (!r.ok || !data?.url) throw new Error(data?.error || "No se pudo crear el checkout.");

      window.location.href = data.url;
    } catch (err: any) {
      console.error(err);
      alert(err?.message || "Error iniciando el pago. Inténtalo de nuevo.");
      setIsSubmitting(false);
    }
  }

  const daysArr = Array.from({ length: new Date(2026, month + 1, 0).getDate() }, (_, i) => i + 1);
  const firstDay = new Date(2026, month, 1).getDay();
  const blanks = Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }, (_, i) => i);

  return (
    <div id="reserva" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 font-['Quicksand']">
      <div className="relative mb-20 text-center">
        <div className="inline-block px-8 py-3 bg-blue-600 rounded-full text-white font-black text-sm uppercase mb-6 shadow-xl animate-bounce">
          {T.badge}
        </div>

        <h2 className="text-6xl md:text-8xl font-black text-blue-700 mb-6 font-['Baloo_2'] tracking-tighter">
          {T.titlePre} <span className="text-orange-500">{T.titleHighlight}</span>
        </h2>

        <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-bold italic bg-white/40 backdrop-blur-sm p-6 rounded-[30px] border border-white/60">
          {T.introPre} <span className="text-green-600 font-black">{T.introHighlight1}</span>{" "}
          {T.introMid} <span className="text-green-600 font-black">{T.introHighlight2}</span>{" "}
          {T.introPost}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Calendario */}
        <div className="w-full lg:w-5/12 bg-white rounded-[50px] shadow-2xl p-10 border border-blue-50 relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <button
              onClick={() => setMonth((m) => Math.max(0, m - 1))}
              className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-2xl hover:bg-blue-600 hover:text-white transition-all text-xl disabled:opacity-20"
              disabled={month === 0}
            >
              ◀
            </button>
            <h3 className="text-2xl font-black text-gray-800 uppercase font-['Baloo_2']">
              {months[month]} 2026
            </h3>
            <button
              onClick={() => setMonth((m) => Math.min(11, m + 1))}
              className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-2xl hover:bg-blue-600 hover:text-white transition-all text-xl disabled:opacity-20"
              disabled={month === 11}
            >
              ▶
            </button>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {["LU", "MA", "MI", "JU", "VI", "SA", "DO"].map((d) => (
              <div key={d} className="text-center font-black text-blue-300 text-[12px] py-2">
                {d}
              </div>
            ))}
            {blanks.map((b) => (
              <div key={`b-${b}`} className="h-12 md:h-14"></div>
            ))}

            {daysArr.map((d) => {
              const checkDate = new Date(2026, month, d);
              checkDate.setHours(0, 0, 0, 0);

              const today = getToday();
              const isPast = checkDate < today || checkDate < businessMinDate;

              const iso = `2026-${(month + 1).toString().padStart(2, "0")}-${d
                .toString()
                .padStart(2, "0")}`;

              const isBooked = bookedDates.has(iso);
              const isSelected = selectedISO === iso;
              const isHoliday = isHolidayISO(iso);

              return (
                <button
                  key={d}
                  disabled={isPast || isBooked}
                  onClick={() => handleDateClick(d, isPast, isBooked, iso)}
                  className={`h-12 md:h-14 rounded-2xl flex flex-col items-center justify-center text-lg font-black transition-all transform relative
                    ${
                      isPast
                        ? "bg-gray-50 text-gray-200 cursor-not-allowed"
                        : isBooked
                        ? "bg-green-600 text-white shadow-lg border-2 border-green-700 cursor-not-allowed scale-95"
                        : isSelected
                        ? "bg-blue-600 text-white shadow-xl scale-110 z-10 ring-4 ring-blue-100"
                        : isHoliday
                        ? "bg-orange-50 text-orange-700 border border-orange-200 hover:bg-orange-100 hover:scale-105"
                        : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-100 hover:scale-105"
                    }
                  `}
                >
                  {d}

                  {isBooked && (
                    <span className="absolute bottom-1 text-[6px] font-black uppercase text-white/80">
                      {T.reservedTag}
                    </span>
                  )}

                  {!isBooked && !isPast && isHoliday && !isSelected && (
                    <span className="absolute bottom-1 text-[6px] font-black uppercase text-orange-700/80">
                      {T.holidayTag}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 text-[11px] font-black uppercase">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-full">
              <span className="w-2 h-2 bg-white rounded-full"></span> {T.legendBooked}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full">
              <span className="w-2 h-2 bg-white rounded-full"></span> {T.legendSelected}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-700 rounded-full border border-orange-200">
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span> {T.legendHoliday}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 text-gray-400 rounded-full border border-gray-200">
              {T.legendFree}
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div ref={formRef} className="w-full lg:w-7/12 min-h-[500px]">
          {!selectedDate ? (
            <div className="h-full bg-blue-50/30 rounded-[50px] border-4 border-dashed border-blue-200 flex flex-col items-center justify-center p-12 text-center">
              <div className="text-6xl mb-8 animate-bounce">🎈</div>
              <h3 className="text-3xl font-black text-blue-400 uppercase font-['Baloo_2']">
                {T.chooseDayTitle}
              </h3>
              <p className="text-gray-400 mt-4 font-bold text-lg">{T.chooseDaySubtitle}</p>
            </div>
          ) : submitted ? (
            <div className="bg-white rounded-[50px] shadow-2xl p-12 border-4 border-green-500 text-center animate-[zoomIn_0.3s_ease-out]">
              <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center text-5xl mx-auto mb-10 shadow-xl">
                ✓
              </div>
              <h4 className="text-5xl font-black text-gray-800 mb-6 font-['Baloo_2']">
                {T.labels.reservedOkTitle}
              </h4>
              <p className="text-gray-500 mb-8 font-bold text-xl leading-relaxed">
                {T.labels.reservedOkTextPre} <span className="text-green-600">{selectedDate}</span>{" "}
                {T.labels.reservedOkTextPost}
              </p>
              <button
                onClick={() => window.open(`https://wa.me/${PHONE_NUMBER}`, "_blank")}
                className="bg-[#25D366] text-white px-10 py-5 rounded-[25px] font-black text-xl hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3 mx-auto"
              >
                {T.labels.sendProof}
              </button>
            </div>
          ) : !paymentStep ? (
            <div className="bg-white rounded-[50px] shadow-2xl p-10 border-4 border-blue-600 animate-[fadeInRight_0.4s_ease-out]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPaymentStep(true);
                }}
                className="space-y-8"
              >
                <div className="bg-blue-600 p-6 rounded-[30px] text-white flex justify-between items-center shadow-lg">
                  <div>
                    <h3 className="text-3xl font-black font-['Baloo_2']">{T.formTitle}</h3>
                    <p className="text-blue-100 font-bold uppercase tracking-widest">{selectedDate}</p>
                  </div>
                  <span className="text-4xl animate-pulse">🎉</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-2">
                      {T.labels.responsible}
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none font-black text-lg focus:ring-2 focus:ring-blue-600 transition-all"
                      placeholder={T.labels.fullNamePH}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase ml-2">
                      {T.labels.whatsapp}
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl outline-none font-black text-lg focus:ring-2 focus:ring-blue-600 transition-all"
                      placeholder={T.labels.whatsappPH}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100">
                  <p className="font-black text-blue-600 uppercase mb-2 tracking-widest text-sm">
                    {T.labels.rentalConfig}
                  </p>
                  <p className="text-xs font-black text-gray-400 uppercase mb-6 tracking-widest">
                    {T.labels.autoRates}
                  </p>

                  <div className="space-y-3 mb-8">
                    {rentalOptions.map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                          formData.rentalType === opt.value
                            ? "bg-blue-600 border-blue-600 text-white shadow-md"
                            : "bg-white border-gray-100 text-gray-600 hover:border-blue-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="rentalType"
                          value={opt.value}
                          checked={formData.rentalType === opt.value}
                          onChange={() => setFormData({ ...formData, rentalType: opt.value })}
                          className="hidden"
                        />
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            formData.rentalType === opt.value ? "border-white" : "border-gray-300"
                          }`}
                        >
                          {formData.rentalType === opt.value && (
                            <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-lg">{opt.label}</span>
                          <span
                            className={`text-xs font-black ${
                              formData.rentalType === opt.value ? "text-white/90" : "text-gray-400"
                            }`}
                          >
                            Horario: {opt.schedule}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="p-6 rounded-3xl border-2 border-blue-100 bg-white flex items-center justify-between group cursor-default opacity-80">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-3xl bg-blue-50">
                        🧼
                      </div>
                      <div>
                        <p className="font-black text-lg text-gray-800">{T.labels.cleaningTitle}</p>
                        <p className="text-xs font-black text-orange-500 uppercase tracking-tighter">
                          {T.labels.cleaningSub}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg border-2 border-gray-200 flex items-center justify-center bg-gray-50">
                        <span className="text-gray-300 font-black text-xs">?</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-600 p-8 rounded-[40px] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                  <div className="text-center md:text-left">
                    <p className="text-xs font-black text-blue-200 uppercase tracking-widest mb-1">
                      {T.labels.payToday}
                    </p>
                    <p className="text-5xl font-black tracking-tighter">{depositToPay.toFixed(2)}€</p>
                    <p className="text-xs font-black text-blue-200 uppercase tracking-widest mt-2">
                      Horario: {selectedSchedule}
                    </p>
                  </div>

                  <button className="w-full md:w-auto bg-white text-blue-600 px-12 py-5 rounded-[25px] font-black text-xl hover:bg-blue-50 shadow-xl transform active:scale-95 transition-all">
                    {T.nextStep}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-[50px] shadow-2xl p-10 border border-gray-100 animate-[fadeInRight_0.4s_ease-out]">
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={() => setPaymentStep(false)}
                  className="text-blue-600 font-black hover:underline flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {T.modify}
                </button>
                <h4 className="text-3xl font-black text-gray-800 font-['Baloo_2'] uppercase tracking-tight">
                  {T.payTitle}
                </h4>
              </div>

              <div className="mb-10 p-8 bg-blue-50 rounded-[40px] border border-blue-100 shadow-inner">
                <h5 className="text-xs font-black text-blue-400 uppercase mb-4 tracking-widest">
                  {T.labels.summaryTitle}
                </h5>
                <div className="space-y-2 text-gray-700 font-bold">
                  <p className="flex justify-between">
                    <span>{T.labels.base}</span> <span>{basePrice}€</span>
                  </p>
                  <p className="flex justify-between text-gray-400 italic text-sm">
                    <span>{T.labels.schedule}</span> <span>{selectedSchedule}</span>
                  </p>
                  <p className="flex justify-between text-gray-400 italic text-sm">
                    <span>{T.labels.cleaning}</span> <span>A consultar</span>
                  </p>
                  <div className="h-px bg-blue-200 my-4"></div>
                  <p className="flex justify-between text-xl text-gray-800 font-black">
                    <span>{T.labels.total}</span> <span>{totalPrice}€</span>
                  </p>
                  <p className="flex justify-between text-blue-600 text-3xl font-black pt-2">
                    <span>{T.labels.deposit}</span> <span>{depositToPay.toFixed(2)}€</span>
                  </p>

                  <div className="bg-white/80 p-5 rounded-2xl mt-6 border border-blue-200 text-xs text-gray-500 leading-relaxed shadow-sm">
                    <p className="text-blue-800 font-black mb-1">{T.labels.infoTitle}</p>
                    <p>
                      {String(T.labels.info1 || "").replace(
                        "{SECURITY_DEPOSIT}",
                        String(SECURITY_DEPOSIT)
                      )}
                    </p>
                    <p>
                      {String(T.labels.info2 || "").replace(
                        "{CLEANING_FEE}",
                        String(CLEANING_FEE)
                      )}
                    </p>
                    <p>{T.labels.info3}</p>
                  </div>
                </div>
              </div>

              <button
                disabled={isSubmitting}
                onClick={goToStripeCheckout}
                className="w-full bg-blue-600 text-white py-6 rounded-[25px] font-black text-2xl hover:bg-blue-700 disabled:opacity-50 shadow-2xl transition-all transform active:scale-95 flex items-center justify-center gap-4 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    {T.redirecting}
                  </>
                ) : (
                  <>{T.payButton}</>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;

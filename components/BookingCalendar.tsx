import React, { useState, useEffect, useRef } from "react";

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

const BookingCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedISO, setSelectedISO] = useState<string | null>(null);
  const [month, setMonth] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [paymentStep, setPaymentStep] = useState(false);
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set());
  const formRef = useRef<HTMLDivElement>(null);

  const CLEANING_FEE = 60;
  const SECURITY_DEPOSIT = 100;
  const PHONE_NUMBER = "34669106393";

  // ✅ Tu endpoint de Google Apps Script (el Web App /exec)
  const WEB_APP_ENDPOINT =
    "https://script.google.com/macros/s/AKfycbw_mTR8MsfkzXEOnwGQBZwnLdzGBE2JcIpg5HCjlAsHh7qUUi7N-ZiEJMrQ5udJ4EXI/exec";

  // ⚠️ Festivos 2026 (YYYY-MM-DD)
  const HOLIDAYS_2026: string[] = [];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    kids: "15",
    notes: "",
    rentalType: "80",
    cleaning: false,
  });

  const months = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
  ];

  type RentalOpt = { label: string; value: string; schedule: string };

  const ALL_RENTAL_OPTIONS: RentalOpt[] = [
    { label: "Lunes a Jueves (80€)", value: "80", schedule: "10:00–21:30" },
    { label: "Viernes / Víspera de festivo (130€)", value: "130", schedule: "10:00–21:30" },
    { label: "Sábado, domingo y festivos (15:00–21:30) (150€)", value: "150_PM", schedule: "15:00–21:30" },
    { label: "Sábado, domingo y festivos (10:00–21:30) (200€)", value: "200", schedule: "10:00–21:30" },
  ];

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

  function isHolidayISO(iso: string) {
    return HOLIDAYS_2026.includes(iso);
  }

  function getAllowedOptionsForISO(iso: string): RentalOpt[] {
    const dt = isoToDate(iso);
    const dow = dt.getDay(); // 0=Dom,1=Lun,...6=Sáb

    const isHoliday = isHolidayISO(iso);

    const next = new Date(dt);
    next.setDate(next.getDate() + 1);
    const nextISO = dateToISO(next);
    const isEveOfHoliday = isHolidayISO(nextISO);

    if (isHoliday) return ALL_RENTAL_OPTIONS.filter((o) => o.value === "150_PM" || o.value === "200");
    if (dow === 6 || dow === 0) return ALL_RENTAL_OPTIONS.filter((o) => o.value === "150_PM" || o.value === "200");
    if (dow === 5 || isEveOfHoliday) return ALL_RENTAL_OPTIONS.filter((o) => o.value === "130");
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

  const basePrice = parseFloat(formData.rentalType.split("_")[0]);
  const cleaningPrice = 0;
  const totalPrice = basePrice + cleaningPrice;
  const depositToPay = totalPrice / 2;

  const selectedOpt = ALL_RENTAL_OPTIONS.find((o) => o.value === formData.rentalType);
  const selectedSchedule = selectedOpt?.schedule || "-";

  const getToday = () => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const businessMinDate = new Date(2026, 0, 20);
  businessMinDate.setHours(0, 0, 0, 0);

  /**
   * ✅ Carga fechas desde el WebApp (doGet) -> JSON { ok:true, rows:[...]}
   * Evita CSV/HTML y problemas con comas en notes.
   */
  async function loadDates() {
    try {
      const res = await fetch(`${WEB_APP_ENDPOINT}?t=${Date.now()}`, { cache: "no-store" });

      // doGet puede devolver HTML si hay error, así que protegemos
      const txt = await res.text();

      let payload: any;
      try {
        payload = JSON.parse(txt);
      } catch {
        console.error("Respuesta no JSON desde Apps Script:", txt);
        return;
      }

      if (!payload?.ok || !Array.isArray(payload?.rows) || payload.rows.length < 2) {
        return;
      }

      const rows: any[][] = payload.rows;
      const headerRow = rows[0].map((h) => String(h).trim().toLowerCase());

      const dateIdx = headerRow.indexOf("date");
      const statusIdx = headerRow.indexOf("status");

      if (dateIdx === -1 || statusIdx === -1) return;

      const reserved = new Set<string>();
      for (let i = 1; i < rows.length; i++) {
        const r = rows[i];
        const date = String(r[dateIdx] || "").trim();
        const st = String(r[statusIdx] || "").trim().toUpperCase();
        if (date && st === "RESERVADO") reserved.add(date);
      }

      setBookedDates(reserved);
    } catch (e) {
      console.error("Error al cargar fechas:", e);
    }
  }

  useEffect(() => {
    loadDates();
  }, []);

  useEffect(() => {
    if (selectedISO && formRef.current) {
      const timer = setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return () => clearTimeout(timer);
    }
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
    const body = new URLSearchParams({
      action: "new",
      date: pending.selectedISO || "",
      name: pending.name || "",
      phone: pending.phone || "",
      kids: pending.kids || "",
      formatted_date: pending.selectedDate || "",
      notes:
        `WEB_RESERVA | Pago Stripe (señal) | Session: ${pending.sessionId || ""} | ` +
        `Señal: ${pending.depositToPay}€ | Tarifa: ${pending.rentalType} | Horario: ${selectedSchedule} | ` +
        `Limpieza: A CONSULTAR | Fianza: ${SECURITY_DEPOSIT}€ | Total alquiler: ${pending.totalPrice}€ | ` +
        `${pending.notes ? "Notas: " + pending.notes : ""}`,
    }).toString();

    const r = await fetch(WEB_APP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body,
    });

    const txt = await r.text();
    if (!r.ok || txt.trim() !== "OK") {
      throw new Error(txt || "No se pudo registrar la reserva.");
    }

    // ✅ Refresco real desde la hoja (no solo “optimista”)
    await loadDates();

    setSubmitted(true);

    const waMsg =
      `¡Hola! He reservado el día ${pending.selectedDate}.\n` +
      `👤: ${pending.name}\n` +
      `💳 Pago Reserva (Stripe): ${pending.depositToPay}€\n` +
      `📅 Tarifa: ${pending.rentalType}\n` +
      `🕒 Horario: ${selectedSchedule}\n` +
      `⚠️ Recordatorio: Fianza de ${SECURITY_DEPOSIT}€ en efectivo y Limpieza (${CLEANING_FEE}€) a consultar.\n` +
      `🧾 Session: ${pending.sessionId || "-"}`;

    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(waMsg)}`, "_blank");
  }

  // ✅ Detecta vuelta desde Stripe
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
        alert("Pago recibido, pero no se encontró la reserva pendiente. Escríbenos por WhatsApp.");
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
          alert("Pago OK, pero falló el registro. Escríbenos por WhatsApp.");
        })
        .finally(() => setIsSubmitting(false));
    }
  }, []);

  // ✅ Stripe Checkout
  async function goToStripeCheckout() {
    if (!selectedISO || !selectedDate) return;
    if (!formData.name || !formData.phone) {
      alert("Completa nombre y WhatsApp antes de pagar.");
      return;
    }

    setIsSubmitting(true);
    try {
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

      if (!r.ok || !data?.url) {
        throw new Error(data?.error || "No se pudo crear el checkout.");
      }

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
      {/* ... TU JSX NO CAMBIA ... */}
      {/* Mantén todo igual desde aquí hacia abajo */}
      {/* (He omitido el resto por longitud; pega tu JSX actual tal cual) */}
      {/* Solo asegúrate de NO tocar lo visual */}
      <div className="relative mb-20 text-center">
        <div className="inline-block px-8 py-3 bg-blue-600 rounded-full text-white font-black text-sm uppercase mb-6 shadow-xl animate-bounce">
          Calendario Algemesí 2026
        </div>
        <h2 className="text-6xl md:text-8xl font-black text-blue-700 mb-6 font-['Baloo_2'] tracking-tighter">
          Reserva tu <span className="text-orange-500">Fiesta</span>
        </h2>
        <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-bold italic bg-white/40 backdrop-blur-sm p-6 rounded-[30px] border border-white/60">
          Las fechas en <span className="text-green-600 font-black">VERDE</span> ya están{" "}
          <span className="text-green-600 font-black">RESERVADAS</span> y bloqueadas automáticamente.
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
              const iso = `2026-${(month + 1).toString().padStart(2, "0")}-${d.toString().padStart(2, "0")}`;

              const isBooked = bookedDates.has(iso);
              const isSelected = selectedISO === iso;

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
                        : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-100 hover:scale-105"
                    }
                  `}
                >
                  {d}
                  {isBooked && (
                    <span className="absolute bottom-1 text-[6px] font-black uppercase text-white/80">
                      RESERVADO
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 text-[11px] font-black uppercase">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-full">
              <span className="w-2 h-2 bg-white rounded-full"></span> RESERVADO
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-full">
              <span className="w-2 h-2 bg-white rounded-full"></span> Selección
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 text-gray-400 rounded-full border border-gray-200">
              Libre
            </div>
          </div>
        </div>

        {/* Formulario */}
        {/* Aquí pega tu bloque exacto sin cambios */}
        <div ref={formRef} className="w-full lg:w-7/12 min-h-[500px]">
          {/* ... pega tu UI actual completa ... */}
          {/* No la repito para no duplicar 300 líneas */}
          {/* IMPORTANTE: nada visual afecta a la sincronización */}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;

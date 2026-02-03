import React, { useState } from "react";

const BookingCalendarTest: React.FC = () => {
  // Fecha mínima de negocio
  const businessMinDate = new Date(2026, 0, 20);
  businessMinDate.setHours(0, 0, 0, 0);

  // Mes inicial automático
  function getInitialMonthIndex() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let m = 0;

    if (today.getFullYear() === 2026) {
      m = today.getMonth();
    }

    if (today < businessMinDate) {
      m = businessMinDate.getMonth();
    }

    if (m < 0) m = 0;
    if (m > 11) m = 11;

    return m;
  }

  const [month, setMonth] = useState<number>(() => getInitialMonthIndex());

  const months = [
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
  ];

  const daysArr = Array.from(
    { length: new Date(2026, month + 1, 0).getDate() },
    (_, i) => i + 1
  );

  const firstDay = new Date(2026, month, 1).getDay();
  const blanks = Array.from(
    { length: firstDay === 0 ? 6 : firstDay - 1 },
    (_, i) => i
  );

  return (
    <div style={{ padding: 40 }}>
      <h2>Calendario 2026</h2>

      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        <button onClick={() => setMonth((m) => Math.max(0, m - 1))}>
          ◀
        </button>

        <h3>
          {months[month]} 2026
        </h3>

        <button onClick={() => setMonth((m) => Math.min(11, m + 1))}>
          ▶
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 40px)",
          gap: 6,
          marginTop: 20,
        }}
      >
        {["LU", "MA", "MI", "JU", "VI", "SA", "DO"].map((d) => (
          <div key={d} style={{ fontWeight: "bold" }}>
            {d}
          </div>
        ))}

        {blanks.map((b) => (
          <div key={`b-${b}`} />
        ))}

        {daysArr.map((d) => (
          <div
            key={d}
            style={{
              border: "1px solid #ccc",
              padding: 6,
              textAlign: "center",
              borderRadius: 6,
            }}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingCalendarTest;

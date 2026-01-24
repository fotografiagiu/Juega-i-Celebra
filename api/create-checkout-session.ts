import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

// ✅ Calcula precio base desde rentalType (tu formato actual)
function getBasePriceFromRentalType(rentalType: any): number | null {
  const rt = String(rentalType || "").trim();

  // Admitimos "150_PM" o "150" etc.
  const n = Number(rt.split("_")[0]);

  // Solo permitimos los precios reales que usas
  const allowed = new Set([80, 130, 150, 200]);
  if (!Number.isFinite(n) || !allowed.has(n)) return null;

  return n;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const origin =
      req.headers.origin ||
      (req.headers["x-forwarded-proto"] && req.headers["x-forwarded-host"]
        ? `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}`
        : null);

    if (!origin) return res.status(400).json({ error: "Missing origin" });

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: "STRIPE_SECRET_KEY missing" });
    }

    // ✅ Lo que llega desde BookingCalendar
    const {
      date,
      formatted_date,
      name,
      phone,
      rentalType,
      kids,
      notes,
    } = (req.body || {}) as Record<string, any>;

    // Validaciones mínimas
    if (!date || typeof date !== "string") {
      return res.status(400).json({ error: "Missing date" });
    }
    if (!name || typeof name !== "string") {
      return res.status(400).json({ error: "Missing name" });
    }
    if (!phone || typeof phone !== "string") {
      return res.status(400).json({ error: "Missing phone" });
    }

    // ✅ Calcula importe real en servidor (ANTI-manipulación)
    const basePrice = getBasePriceFromRentalType(rentalType);
    if (basePrice === null) {
      return res.status(400).json({ error: "Invalid rentalType" });
    }

    const totalPrice = basePrice; // limpieza “a consultar” fuera, fianza fuera
    const depositToPay = totalPrice / 2; // 50%

    // ✅ Modo prueba REAL (sin tocar front):
    // En Vercel env: STRIPE_FORCE_AMOUNT_CENTS=100 para cobrar 1€.
    // Luego lo borras y vuelve al importe real automáticamente.
    const forced = process.env.STRIPE_FORCE_AMOUNT_CENTS
      ? Number(process.env.STRIPE_FORCE_AMOUNT_CENTS)
      : null;

    const unitAmount = Number.isFinite(forced as number) && (forced as number) > 0
      ? Math.round(forced as number)
      : Math.round(depositToPay * 100);

    // Seguridad extra: nunca cobrar 0
    if (!Number.isFinite(unitAmount) || unitAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: "Reserva Juga i Celebra (señal)",
              description: formatted_date
                ? `Fecha: ${formatted_date}`
                : `Fecha: ${date}`,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],

      metadata: {
        date: String(date || ""),
        formatted_date: String(formatted_date || ""),
        name: String(name || ""),
        phone: String(phone || ""),
        rentalType: String(rentalType || ""),
        kids: String(kids || ""),
        depositToPay_eur: String((unitAmount / 100).toFixed(2)),
        totalPrice_eur: String(totalPrice),
        notes: String(notes || ""),
      },

      success_url: `${origin}/?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?paid=0`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return res.status(500).json({
      error: "Stripe error",
      details: err?.message || "Unknown error",
    });
  }
}

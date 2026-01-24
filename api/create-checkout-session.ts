import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

// ✅ Calcula precio base desde rentalType (ANTI-MANIPULACIÓN)
function getBasePriceFromRentalType(rentalType: any): number | null {
  const rt = String(rentalType || "").trim();
  const n = Number(rt.split("_")[0]);

  // Precios reales permitidos
  const allowed = new Set([80, 130, 150, 200]);
  if (!Number.isFinite(n) || !allowed.has(n)) return null;

  return n;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: "STRIPE_SECRET_KEY missing" });
    }

    // 📥 Datos desde el frontend
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

    // 💰 Precio real calculado en servidor
    const basePrice = getBasePriceFromRentalType(rentalType);
    if (basePrice === null) {
      return res.status(400).json({ error: "Invalid rentalType" });
    }

    const totalPrice = basePrice;
    const depositToPay = totalPrice / 2; // 50%

    // 🧪 FORZADO DE PRUEBA (1€) si existe la env
    const forced = process.env.STRIPE_FORCE_AMOUNT_CENTS
      ? Number(process.env.STRIPE_FORCE_AMOUNT_CENTS)
      : null;

    const unitAmount =
      Number.isFinite(forced as number) && (forced as number) > 0
        ? Math.round(forced as number)
        : Math.round(depositToPay * 100);

    if (!Number.isFinite(unitAmount) || unitAmount <= 0) {
      return res.status(400).json({ error: "Invalid amount" });
    }

    // 🧾 SESIÓN STRIPE
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
        date: String(date),
        formatted_date: String(formatted_date || ""),
        name: String(name),
        phone: String(phone),
        rentalType: String(rentalType),
        kids: String(kids || ""),
        depositToPay_eur: String((unitAmount / 100).toFixed(2)),
        totalPrice_eur: String(totalPrice),
        notes: String(notes || ""),
      },

      // ✅ URLs FIJAS (CLAVE DE ESTA PRUEBA)
      success_url:
        "https://jugaicelebra.com/?paid=1&session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://jugaicelebra.com/?paid=0",
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

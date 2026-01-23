import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

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

    if (!origin) {
      return res.status(400).json({ error: "Missing origin" });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: "STRIPE_SECRET_KEY missing" });
    }

    // ✅ Lee lo que mandas desde BookingCalendar
    const {
      depositToPay,
      date,
      formatted_date,
      name,
      phone,
      rentalType,
      totalPrice,
      notes,
    } = (req.body || {}) as Record<string, any>;

    const amountEUR = Number(depositToPay);

    // Validaciones duras (evita cobros raros)
    if (!Number.isFinite(amountEUR) || amountEUR <= 0) {
      return res.status(400).json({ error: "Invalid depositToPay" });
    }
    if (!date || typeof date !== "string") {
      return res.status(400).json({ error: "Missing date" });
    }

    const unitAmount = Math.round(amountEUR * 100); // céntimos

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

      // ✅ Guardamos datos útiles dentro de Stripe (para rastrear)
      metadata: {
        date: String(date || ""),
        formatted_date: String(formatted_date || ""),
        name: String(name || ""),
        phone: String(phone || ""),
        rentalType: String(rentalType || ""),
        depositToPay: String(amountEUR),
        totalPrice: String(totalPrice ?? ""),
      },

      // Si quieres verlos en el dashboard como "cliente"
      customer_email: undefined,

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

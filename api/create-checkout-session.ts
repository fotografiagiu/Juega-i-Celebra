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
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: "STRIPE_SECRET_KEY missing" });
    }

    // Detectar origin (fallback)
    const origin =
      req.headers.origin ||
      (req.headers["x-forwarded-proto"] && req.headers["x-forwarded-host"]
        ? `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}`
        : null);

    // Base URL CANONICAL (para no romper el “pending” por www/sin-www)
    const baseUrl = (process.env.PUBLIC_BASE_URL || origin || "").trim();
    if (!baseUrl) return res.status(400).json({ error: "Missing base url" });

    const {
      depositToPay,
      date,
      formatted_date,
      name,
      phone,
      email,
      rentalType,
      tarifa,
      totalPrice,
      notes,
      schedule,
    } = (req.body || {}) as Record<string, any>;

    const customerEmail = String(email || "").trim().toLowerCase();
    if (!customerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return res.status(400).json({ error: "Missing email" });
    }

    const amountEUR = Number(depositToPay);

    if (!Number.isFinite(amountEUR) || amountEUR <= 0) {
      return res.status(400).json({ error: "Invalid depositToPay" });
    }
    if (!date || typeof date !== "string") {
      return res.status(400).json({ error: "Missing date" });
    }

    const unitAmount = Math.round(amountEUR * 100); // céntimos
    const fecha = String(formatted_date || date);
    const hora = String(schedule || "10:00–21:30");
    const tarifaLabel = String(tarifa || rentalType || "");
    const totalLabel = totalPrice == null || totalPrice === "" ? "" : String(totalPrice);

    const bookingSummary = [
      name ? `Nombre: ${name}` : "",
      `Fecha: ${fecha}`,
      `Horario: ${hora}`,
      tarifaLabel ? `Tarifa: ${tarifaLabel}` : "",
      `Señal pagada: ${amountEUR.toFixed(2)}€`,
      totalLabel ? `Total alquiler: ${totalLabel}€` : "",
    ]
      .filter(Boolean)
      .join(" · ");

    const metadata = {
      date: String(date || ""),
      formatted_date: String(formatted_date || ""),
      name: String(name || ""),
      phone: String(phone || ""),
      email: customerEmail,
      rentalType: String(rentalType || ""),
      tarifa: tarifaLabel,
      schedule: hora,
      depositToPay: String(amountEUR),
      totalPrice: totalLabel,
      notes: String(notes || ""),
    };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail,
      payment_intent_data: {
        description: `Reserva Juga i Celebra · ${fecha} · ${hora}`,
        receipt_email: customerEmail,
        metadata,
      },
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Reserva Juga i Celebra (señal) · ${fecha}`,
              description: bookingSummary,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      metadata,
      success_url: `${baseUrl}/?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/?paid=0`,
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

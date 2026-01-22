import Stripe from "stripe";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Solo permitimos POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Detectar dominio correctamente (Vercel / producción)
    const origin =
      req.headers.origin ||
      (req.headers["x-forwarded-proto"] && req.headers["x-forwarded-host"]
        ? `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}`
        : null);

    if (!origin) {
      return res.status(400).json({ error: "Missing origin" });
    }

    const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
    const PRICE_ID = process.env.STRIPE_PRICE_ID;

    if (!SECRET_KEY) {
      return res.status(500).json({ error: "STRIPE_SECRET_KEY missing" });
    }

    if (!PRICE_ID) {
      return res.status(500).json({ error: "STRIPE_PRICE_ID missing" });
    }

    if (!PRICE_ID.startsWith("price_")) {
      return res
        .status(500)
        .json({ error: "STRIPE_PRICE_ID is not a valid price id" });
    }

    // Crear sesión de Checkout
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${origin}/?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?paid=0`,
    });

    return res.status(200).json({
      url: session.url,
    });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return res.status(500).json({
      error: "Stripe error",
      details: err?.message || "Unknown error",
    });
  }
}

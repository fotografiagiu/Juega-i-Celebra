import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const origin =
      req.headers.origin ||
      (req.headers["x-forwarded-proto"] && req.headers["x-forwarded-host"]
        ? `${req.headers["x-forwarded-proto"]}://${req.headers["x-forwarded-host"]}`
        : undefined);

    if (!origin) {
      return res.status(400).json({ error: "Missing origin" });
    }

    const SECRET = process.env.STRIPE_SECRET_KEY;
    const PRICE_ID = process.env.STRIPE_PRICE_ID;

    if (!SECRET) {
      return res.status(500).json({ error: "STRIPE_SECRET_KEY missing" });
    }
    if (!PRICE_ID) {
      return res.status(500).json({ error: "STRIPE_PRICE_ID missing" });
    }
    if (!PRICE_ID.startsWith("price_")) {
      return res.status(500).json({ error: "STRIPE_PRICE_ID is not a price_ id" });
    }

    // (Opcional) puedes recibir datos del cliente aquí si luego quieres metadata
    // const { date, name, phone } = req.body || {};

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: `${origin}/?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?paid=0`,
      // metadata: { date: String(date || ""), name: String(name || ""), phone: String(phone || "") },
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    // Importante: no loguees claves. Esto es seguro.
    console.error("Stripe create session error:", err?.message || err);
    return res.status(500).json({ error: "Stripe error", details: err?.message || "unknown" });
  }
}

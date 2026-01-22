import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { date, slot, name, phone, email } = req.body || {};

    // Tu PRICE ID (NO el prod_)
    const PRICE_ID = "price_1SyrnR88uZvg70EJUKqSUw";

    // Dominio base (para que funcione en preview/prod)
    const origin = req.headers.origin || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: PRICE_ID, quantity: 1 }],
      success_url: `${origin}/?paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?paid=0`,
      // Opcional pero recomendable
      customer_email: email || undefined,
      metadata: {
        date: date || "",
        slot: slot || "",
        name: name || "",
        phone: phone || "",
        email: email || "",
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: err?.message || "Stripe error" });
  }
}

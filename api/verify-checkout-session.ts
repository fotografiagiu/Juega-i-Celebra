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

    const sessionId = String(req.body?.sessionId || "").trim();
    if (!sessionId) {
      return res.status(400).json({ ok: false, paid: false, error: "Missing sessionId" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") {
      return res.status(400).json({
        ok: false,
        paid: false,
        error: "Payment not completed",
      });
    }

    return res.status(200).json({
      ok: true,
      paid: true,
      email:
        session.customer_details?.email ||
        session.customer_email ||
        session.metadata?.email ||
        "",
      metadata: session.metadata || {},
    });
  } catch (err: any) {
    console.error("Verify checkout error:", err);
    return res.status(500).json({
      ok: false,
      paid: false,
      error: "Verify checkout error",
      details: err?.message || "Unknown error",
    });
  }
}

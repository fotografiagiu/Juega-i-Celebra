import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { totalPrice, optionName } = req.body;

    if (!totalPrice) {
      return res.status(400).json({ error: "Missing total price" });
    }

    // 🔥 SOLO COBRAMOS EL 50% DE LA RESERVA
    const depositAmount = Math.round((Number(totalPrice) / 2) * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: depositAmount,
            product_data: {
              name: "Reserva Juga i Celebra",
              description: `Señal 50% - ${optionName || "Reserva"}`,
            },
          },
        },
      ],
      success_url: `${process.env.SITE_URL}/pago-ok`,
      cancel_url: `${process.env.SITE_URL}/pago-cancelado`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return res.status(500).json({
      error: error.message || "Stripe error",
    });
  }
}


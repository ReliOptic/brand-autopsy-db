import { NextResponse, type NextRequest } from "next/server";
import { getStripe, PLANS } from "@/lib/stripe";
import { publicEnv } from "@/config/env";

interface CheckoutPayload {
  planId: unknown;
  annual: unknown;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = (await req.json()) as CheckoutPayload;
    const planId = typeof body.planId === "string" ? body.planId : "";
    // `annual` is reserved for future annual billing toggling. Currently
    // a single monthly price ID is used; annual flag is logged only.
    const annual = body.annual === true;

    const plan = PLANS[planId];
    if (!plan || !plan.stripePriceId) {
      return NextResponse.json(
        { error: "Plan not available" },
        { status: 400 },
      );
    }

    const siteUrl = publicEnv.siteUrl;

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: plan.stripePriceId, quantity: 1 }],
      success_url: `${siteUrl}/account?checkout=success`,
      cancel_url: `${siteUrl}/pricing`,
      metadata: { planId, annual: String(annual) },
    });

    console.log(
      JSON.stringify({
        event: "stripe.checkout.session_created",
        plan_id: planId,
        annual,
        session_id: session.id,
      }),
    );

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Checkout failed";
    console.error(
      JSON.stringify({ event: "stripe.checkout.error", message }),
    );
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

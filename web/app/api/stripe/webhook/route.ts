/**
 * Stripe webhook handler.
 *
 * Handles:
 *   - checkout.session.completed
 *   - customer.subscription.updated
 *   - customer.subscription.deleted
 *
 * Persists subscription state to data/subscriptions.json — keyed by
 * stripe customer id, with the user email mirrored for join-on-read.
 * The api_keys.json store (managed by /api/keys) is intentionally left
 * untouched: its schema is { [userId]: ApiKey[] } and a separate file
 * keeps the two stores from corrupting each other.
 *
 * Verifies the request signature with STRIPE_WEBHOOK_SECRET via
 * `stripe.webhooks.constructEvent()`. App Router uses `req.text()` for the
 * raw request body, so no body-parser config is needed (Next 13+).
 */

import { NextResponse, type NextRequest } from "next/server";
import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { getStripe } from "@/lib/stripe";
import type { Stripe } from "stripe";

const SUBSCRIPTIONS_PATH = join(process.cwd(), "..", "data", "subscriptions.json");

type Tier = "free" | "pro" | "enterprise";

interface SubscriptionRecord {
  stripe_customer_id: string;
  stripe_subscription_id: string | null;
  email: string | null;
  tier: Tier;
  updated_at: string;
}

type SubscriptionsFile = Record<string, SubscriptionRecord>;

async function readSubscriptions(): Promise<SubscriptionsFile> {
  try {
    const raw = await readFile(SUBSCRIPTIONS_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as SubscriptionsFile;
    }
    return {};
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return {};
    throw err;
  }
}

async function writeSubscriptions(data: SubscriptionsFile): Promise<void> {
  await mkdir(dirname(SUBSCRIPTIONS_PATH), { recursive: true });
  await writeFile(SUBSCRIPTIONS_PATH, JSON.stringify(data, null, 2), "utf8");
}

async function setTierForCustomer(
  customerId: string,
  tier: Tier,
  subscriptionId: string | null,
  email: string | null,
): Promise<void> {
  const data = await readSubscriptions();
  const existing = data[customerId];
  data[customerId] = {
    stripe_customer_id: customerId,
    stripe_subscription_id: subscriptionId ?? existing?.stripe_subscription_id ?? null,
    email: email ?? existing?.email ?? null,
    tier,
    updated_at: new Date().toISOString(),
  };
  await writeSubscriptions(data);
  console.log(
    JSON.stringify({
      event: "stripe.webhook.tier_updated",
      customer_id: customerId,
      email,
      tier,
    }),
  );
}

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;
  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id ?? null;
  const email = session.customer_details?.email ?? session.customer_email ?? null;
  if (!customerId) return;
  await setTierForCustomer(customerId, "pro", subscriptionId, email);
}

async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
): Promise<void> {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;
  const status = subscription.status;
  const activeStatuses: Stripe.Subscription.Status[] = [
    "active",
    "trialing",
    "past_due",
  ];
  const tier: Tier = activeStatuses.includes(status) ? "pro" : "free";
  await setTierForCustomer(customerId, tier, subscription.id, null);
}

async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
): Promise<void> {
  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;
  await setTierForCustomer(customerId, "free", subscription.id, null);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "STRIPE_WEBHOOK_SECRET not configured" },
      { status: 500 },
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  // App Router: use raw text body for signature verification.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    console.error(
      JSON.stringify({ event: "stripe.webhook.signature_error", message }),
    );
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        );
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription,
        );
        break;
      default:
        console.log(
          JSON.stringify({
            event: "stripe.webhook.unhandled",
            type: event.type,
          }),
        );
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook handler failed";
    console.error(
      JSON.stringify({
        event: "stripe.webhook.handler_error",
        type: event.type,
        message,
      }),
    );
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

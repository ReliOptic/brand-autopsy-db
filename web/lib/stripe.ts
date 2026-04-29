/**
 * Stripe client and plan definitions.
 * Requires: npm install stripe
 * Env vars sourced from @/config/env.
 */

import { serverEnv } from "@/config/env";

export interface PricingPlanLimits {
  api_requests_per_day: number | null; // null = unlimited
  pdf_exports_per_day: number | null;
  layers_accessible: number;
  brands: number | null; // null = all
}

export interface PricingPlan {
  id: "free" | "pro" | "enterprise";
  name: string;
  price: number | null; // null = contact sales
  currency: string;
  interval: "month" | "year" | null;
  stripePriceId: string | null; // null until Stripe product created
  features: string[];
  limits: PricingPlanLimits;
  cta: string;
  highlighted: boolean;
}

export const PLANS: Record<string, PricingPlan> = {
  free: {
    id: "free",
    name: "Free",
    price: 0,
    currency: "usd",
    interval: "month",
    stripePriceId: null,
    features: [
      "Layer 01 (Brand Identity) for all 513 brands",
      "100 API requests / day",
      "1 PDF brief export / day",
      "Compare up to 2 brands",
      "Analytics overview",
    ],
    limits: {
      api_requests_per_day: 100,
      pdf_exports_per_day: 1,
      layers_accessible: 1,
      brands: null,
    },
    cta: "Get started free",
    highlighted: false,
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 299,
    currency: "usd",
    interval: "month",
    stripePriceId: serverEnv.stripePriceIdPro ?? null,
    features: [
      "All 8 layers for all 513 brands",
      "10,000 API requests / day",
      "Unlimited PDF exports",
      "Compare up to 4 brands",
      "Full analytics + positioning maps",
      "CSV export",
      "Priority support",
    ],
    limits: {
      api_requests_per_day: 10000,
      pdf_exports_per_day: null,
      layers_accessible: 8,
      brands: null,
    },
    cta: "Start Pro",
    highlighted: true,
  },
  enterprise: {
    id: "enterprise",
    name: "Enterprise",
    price: null,
    currency: "usd",
    interval: null,
    stripePriceId: null,
    features: [
      "Everything in Pro",
      "Custom API rate limits",
      "White-label option",
      "Dedicated support",
      "Custom data integrations",
      "Team seats (up to 20)",
      "SLA guarantee",
    ],
    limits: {
      api_requests_per_day: null,
      pdf_exports_per_day: null,
      layers_accessible: 8,
      brands: null,
    },
    cta: "Contact sales",
    highlighted: false,
  },
};

// Stripe client — initialized lazily to avoid build-time errors.
// Use a dynamic require so the build does not fail when the `stripe`
// package has not been installed yet (this file is scaffolding).
let _stripe: import("stripe").Stripe | null = null;

export function getStripe(): import("stripe").Stripe {
  const secret = serverEnv.stripeSecretKey();
  if (!_stripe) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Stripe = require("stripe");
    _stripe = new Stripe(secret, { apiVersion: "2024-06-20" });
  }
  if (!_stripe) {
    throw new Error("Stripe client failed to initialize");
  }
  return _stripe;
}

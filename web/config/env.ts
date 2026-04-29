// Single source of truth for runtime configuration.
// Public vars (NEXT_PUBLIC_*) are inlined at build time and safe to use
// from client components. Server-only vars throw a typed error when
// missing so a misconfigured deploy fails loudly at the call site.

export class MissingEnvVarError extends Error {
  readonly variable: string;
  constructor(variable: string) {
    super(`Missing required environment variable: ${variable}`);
    this.name = "MissingEnvVarError";
    this.variable = variable;
  }
}

function readOptional(name: string): string | undefined {
  const value = process.env[name];
  return value && value.length > 0 ? value : undefined;
}

function readRequired(name: string): string {
  const value = readOptional(name);
  if (!value) throw new MissingEnvVarError(name);
  return value;
}

// Direct references to process.env.NEXT_PUBLIC_* let Next.js statically
// replace these at bundle time for client components.
export const publicEnv = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bautopsy.com",
  stripePublishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
} as const;

// Server-only. Optional vars expose values directly; required vars expose
// getter functions so the throw happens at use-time, not module-load time
// (avoids breaking unrelated server routes during local dev).
export const serverEnv = {
  authGoogleId: readOptional("AUTH_GOOGLE_ID"),
  authGoogleSecret: readOptional("AUTH_GOOGLE_SECRET"),
  authResendKey: readOptional("AUTH_RESEND_KEY"),
  authEmailFrom: readOptional("AUTH_EMAIL_FROM") ?? "noreply@bautopsy.com",
  stripePriceIdPro: readOptional("STRIPE_PRICE_ID_PRO"),
  stripeSecretKey: (): string => readRequired("STRIPE_SECRET_KEY"),
  stripeWebhookSecret: (): string => readRequired("STRIPE_WEBHOOK_SECRET"),
} as const;

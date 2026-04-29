import type { CSSProperties } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { SectionLabel, T } from "@/components/ui-primitives";
import { PLANS, type PricingPlan } from "@/lib/stripe";
import { PricingToggle } from "./pricing-toggle";
import { CheckoutButton } from "./checkout-button";

export const metadata = {
  title: "Pricing — BAUTOPSY",
  description:
    "Simple, transparent pricing for brand intelligence. Free tier available. Pro at $299/month.",
};

interface FaqEntry {
  q: string;
  a: string;
}

const FAQS: ReadonlyArray<FaqEntry> = [
  {
    q: "Is there a free trial?",
    a: "Pro has a 7-day free trial. No credit card required to start.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel from your account settings at any time.",
  },
  {
    q: "What data sources are used?",
    a: "All analysis is based on publicly available information (SEC filings, official company websites, regulatory records). See /about for details.",
  },
  {
    q: "Is this investment advice?",
    a: "No. Brand Autopsy DB is brand strategy research only. See full disclaimer at /about.",
  },
];

const PLAN_ORDER: ReadonlyArray<keyof typeof PLANS> = [
  "free",
  "pro",
  "enterprise",
];

function CheckIcon(): JSX.Element {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke={T.success}
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0, marginTop: 3 }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function formatLimit(value: number | null, suffix: string): string {
  if (value === null) return `Unlimited ${suffix}`;
  return `${value.toLocaleString()} ${suffix}`;
}

interface PlanCardProps {
  plan: PricingPlan;
}

function PlanCard({ plan }: PlanCardProps): JSX.Element {
  const isHighlighted = plan.highlighted;
  const isFree = plan.id === "free";
  const isEnterprise = plan.id === "enterprise";

  const cardStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    padding: 24,
    borderRadius: 6,
    background: isHighlighted ? T.surfaceLift : T.surface,
    border: isHighlighted
      ? `2px solid ${T.accent}`
      : `1px solid ${T.border}`,
    boxShadow: isHighlighted ? `0 0 32px ${T.accent}25` : "none",
  };

  const monthlyAnnualLabel: string =
    plan.price !== null && plan.price > 0
      ? `Billed monthly · save 20% on annual`
      : "";

  return (
    <div style={cardStyle} data-plan-id={plan.id}>
      {isHighlighted && (
        <span
          style={{
            position: "absolute",
            top: -10,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "3px 10px",
            background: T.accent,
            color: "white",
            fontFamily: T.mono,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.12em",
            borderRadius: 3,
            textTransform: "uppercase",
          }}
        >
          Most Popular
        </span>
      )}

      <div
        style={{
          fontFamily: T.mono,
          fontSize: 12,
          color: T.textMuted,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {plan.name}
      </div>

      <div
        style={{
          marginTop: 12,
          display: "flex",
          alignItems: "baseline",
          gap: 4,
        }}
      >
        {plan.price === null ? (
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 36,
              fontWeight: 600,
              color: T.textBright,
              letterSpacing: "-0.02em",
            }}
          >
            Contact
          </span>
        ) : (
          <>
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 14,
                color: T.textMuted,
              }}
            >
              $
            </span>
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 44,
                fontWeight: 600,
                color: T.textBright,
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
              data-monthly-price={plan.price}
            >
              {plan.price}
            </span>
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 13,
                color: T.textMuted,
                marginLeft: 2,
              }}
            >
              /mo
            </span>
          </>
        )}
      </div>

      {plan.price !== null && plan.price > 0 && (
        <div
          style={{
            marginTop: 4,
            fontFamily: T.mono,
            fontSize: 10,
            color: T.textDim,
            letterSpacing: "0.04em",
            minHeight: 14,
          }}
          data-annual-note
          aria-live="polite"
        >
          {monthlyAnnualLabel}
        </div>
      )}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "20px 0 0",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
        }}
      >
        {plan.features.map((feature) => (
          <li
            key={feature}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              fontSize: 13,
              color: T.text,
              lineHeight: 1.45,
            }}
          >
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div
        style={{
          marginTop: 18,
          paddingTop: 14,
          borderTop: `1px solid ${T.border}`,
          fontFamily: T.mono,
          fontSize: 10,
          color: T.textMuted,
          letterSpacing: "0.04em",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <span>API: {formatLimit(plan.limits.api_requests_per_day, "req/day")}</span>
        <span>
          PDF: {formatLimit(plan.limits.pdf_exports_per_day, "exports/day")}
        </span>
        <span>Layers: {plan.limits.layers_accessible}/8</span>
      </div>

      <div style={{ marginTop: 18 }}>
        {isFree && (
          <Link
            href="/waitlist"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              borderRadius: 4,
              background: T.surface,
              border: `1px solid ${T.border}`,
              color: T.text,
              fontFamily: T.mono,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {plan.cta} →
          </Link>
        )}
        {plan.id === "pro" && <CheckoutButton planId={plan.id} cta={plan.cta} />}
        {isEnterprise && (
          <a
            href="mailto:sales@bautopsy.com"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              borderRadius: 4,
              background: "transparent",
              border: `1px solid ${T.borderBright}`,
              color: T.textBright,
              fontFamily: T.mono,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            {plan.cta} →
          </a>
        )}
      </div>
    </div>
  );
}

export default function PricingPage(): JSX.Element {
  const pageStyle: CSSProperties = {
    background: T.bg,
    color: T.text,
    fontFamily: T.sans,
    minHeight: "100vh",
  };

  const containerStyle: CSSProperties = {
    maxWidth: 900,
    margin: "0 auto",
    padding: "60px 24px 80px",
  };

  const headerStyle: CSSProperties = {
    textAlign: "center",
    marginBottom: 32,
  };

  const h1Style: CSSProperties = {
    fontSize: 40,
    fontWeight: 600,
    letterSpacing: "-0.03em",
    lineHeight: 1.05,
    color: T.textBright,
    margin: "12px 0 12px",
  };

  const subtitleStyle: CSSProperties = {
    fontSize: 14,
    color: T.textMuted,
    fontFamily: T.mono,
    letterSpacing: "0.04em",
  };

  const gridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
    alignItems: "stretch",
  };

  const faqSectionStyle: CSSProperties = {
    marginTop: 64,
    paddingTop: 40,
    borderTop: `1px solid ${T.border}`,
  };

  const faqGridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 20,
    marginTop: 20,
  };

  const footerNoteStyle: CSSProperties = {
    marginTop: 60,
    textAlign: "center",
    fontFamily: T.mono,
    fontSize: 10,
    color: T.textDim,
    letterSpacing: "0.1em",
  };

  return (
    <div style={pageStyle}>
      <Navigation />
      <main style={containerStyle}>
        <header style={headerStyle}>
          <SectionLabel accent={T.accent}>PRICING</SectionLabel>
          <h1 style={h1Style}>Simple, transparent pricing.</h1>
          <p style={subtitleStyle}>Cancel anytime. No hidden fees.</p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <PricingToggle />
          </div>
        </header>

        <div style={gridStyle}>
          {PLAN_ORDER.map((id) => {
            const plan = PLANS[id];
            if (!plan) return null;
            return <PlanCard key={plan.id} plan={plan} />;
          })}
        </div>

        <section style={faqSectionStyle} aria-labelledby="faq-heading">
          <SectionLabel accent={T.accent}>FAQ</SectionLabel>
          <h2
            id="faq-heading"
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: T.textBright,
              margin: "8px 0 0",
            }}
          >
            Common questions.
          </h2>
          <div style={faqGridStyle}>
            {FAQS.map((entry) => (
              <div
                key={entry.q}
                style={{
                  border: `1px solid ${T.border}`,
                  borderRadius: 6,
                  padding: 18,
                  background: T.surface,
                }}
              >
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: T.textBright,
                    marginBottom: 6,
                  }}
                >
                  {entry.q}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: T.textMuted,
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {entry.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div style={footerNoteStyle}>
          Prices in USD. Pro plan billed monthly or annually.
        </div>
      </main>
    </div>
  );
}

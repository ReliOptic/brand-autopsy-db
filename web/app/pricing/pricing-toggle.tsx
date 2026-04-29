"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { T } from "@/components/ui-primitives";

type Cycle = "monthly" | "annual";

/**
 * Monthly / annual billing toggle.
 *
 * The pricing page is a Server Component, so this client component updates
 * the rendered price labels in-place via DOM mutation rather than via a
 * shared state container. Each PlanCard tags its monthly price element with
 * `data-monthly-price` and its annual note with `data-annual-note`.
 *
 * Annual = 2 months free (20% savings).
 */
export function PricingToggle(): JSX.Element {
  const [cycle, setCycle] = useState<Cycle>("monthly");

  useEffect(() => {
    const priceEls = document.querySelectorAll<HTMLElement>(
      "[data-monthly-price]",
    );
    priceEls.forEach((el) => {
      const monthly = Number(el.getAttribute("data-monthly-price"));
      if (!Number.isFinite(monthly) || monthly <= 0) return;
      if (cycle === "annual") {
        const annualMonthly = Math.round(monthly * 0.8);
        el.textContent = String(annualMonthly);
      } else {
        el.textContent = String(monthly);
      }
    });

    const noteEls = document.querySelectorAll<HTMLElement>("[data-annual-note]");
    noteEls.forEach((el) => {
      const card = el.closest<HTMLElement>("[data-plan-id]");
      const priceAttr = card?.querySelector<HTMLElement>("[data-monthly-price]");
      const monthly = priceAttr
        ? Number(priceAttr.getAttribute("data-monthly-price"))
        : 0;
      if (!Number.isFinite(monthly) || monthly <= 0) {
        el.textContent = "";
        return;
      }
      if (cycle === "annual") {
        const annualTotal = Math.round(monthly * 12 * 0.8);
        el.textContent = `Billed $${annualTotal.toLocaleString()}/yr · save 20%`;
      } else {
        el.textContent = "Billed monthly · save 20% on annual";
      }
    });
  }, [cycle]);

  const wrapperStyle: CSSProperties = {
    display: "inline-flex",
    padding: 3,
    border: `1px solid ${T.border}`,
    borderRadius: 100,
    background: T.surface,
  };

  const buttonStyle = (active: boolean): CSSProperties => ({
    padding: "6px 14px",
    border: 0,
    borderRadius: 100,
    background: active ? T.accent : "transparent",
    color: active ? "white" : T.textMuted,
    fontFamily: T.mono,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "background-color 120ms ease, color 120ms ease",
  });

  return (
    <div style={wrapperStyle} role="group" aria-label="Billing cycle">
      <button
        type="button"
        style={buttonStyle(cycle === "monthly")}
        aria-pressed={cycle === "monthly"}
        onClick={() => setCycle("monthly")}
      >
        Monthly
      </button>
      <button
        type="button"
        style={buttonStyle(cycle === "annual")}
        aria-pressed={cycle === "annual"}
        onClick={() => setCycle("annual")}
      >
        Annual · 2 mo free
      </button>
    </div>
  );
}

"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { T } from "@/components/ui-primitives";

interface CheckoutButtonProps {
  planId: string;
  cta: string;
}

interface CheckoutResponse {
  url?: string;
  error?: string;
}

export function CheckoutButton({ planId, cta }: CheckoutButtonProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleClick = async (): Promise<void> => {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, annual: false }),
      });
      const data = (await res.json()) as CheckoutResponse;
      if (!res.ok || !data.url) {
        setErrorMessage(data.error ?? "Checkout unavailable. Try again.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setErrorMessage("Network error. Try again.");
      setLoading(false);
    }
  };

  const buttonStyle: CSSProperties = {
    width: "100%",
    height: 40,
    borderRadius: 4,
    background: T.accent,
    border: 0,
    color: "white",
    fontFamily: T.mono,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.7 : 1,
    boxShadow: `0 0 24px ${T.accent}30`,
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        style={buttonStyle}
      >
        {loading ? "Redirecting…" : `${cta} →`}
      </button>
      {errorMessage && (
        <div
          role="alert"
          style={{
            marginTop: 8,
            color: T.error,
            fontFamily: T.mono,
            fontSize: 10,
            letterSpacing: "0.04em",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
}

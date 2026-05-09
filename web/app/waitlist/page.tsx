"use client";

import type { CSSProperties, FormEvent } from "react";
import { useState } from "react";
import { SectionLabel, T } from "@/components/ui-primitives";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

const PERSONA_OPTIONS: ReadonlyArray<{ value: string; label: string }> = [
  { value: "", label: "What describes you best?" },
  { value: "brand_manager", label: "Brand Manager" },
  { value: "strategy_analyst", label: "Strategy Analyst" },
  { value: "agency_director", label: "Agency Director" },
  { value: "investor", label: "Investor" },
  { value: "other", label: "Other" },
];

const PERSONA_PILLS: ReadonlyArray<string> = [
  "Brand Manager",
  "Strategy Analyst",
  "Agency Director",
];

function WaitlistForm(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [persona, setPersona] = useState<string>("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const inputBaseStyle: CSSProperties = {
    width: "100%",
    height: 44,
    padding: "0 14px",
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    color: T.text,
    fontFamily: T.mono,
    fontSize: 13,
    letterSpacing: "0.02em",
    outline: "none",
    transition: "border-color 120ms ease",
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>): void => {
    e.currentTarget.style.borderColor = T.accent;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>): void => {
    e.currentTarget.style.borderColor = T.border;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, persona }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Try again.");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        style={{
          padding: "20px 16px",
          border: `1px solid ${T.success}40`,
          background: `${T.success}12`,
          borderRadius: 4,
          color: T.success,
          fontFamily: T.mono,
          fontSize: 13,
          letterSpacing: "0.02em",
          textAlign: "center",
        }}
      >
        ✓ You&apos;re on the list. We&apos;ll be in touch.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="your@email.com"
        aria-label="Email address"
        style={inputBaseStyle}
      />
      <select
        required
        value={persona}
        onChange={(e) => setPersona(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label="Persona"
        style={{ ...inputBaseStyle, appearance: "none", paddingRight: 32 }}
      >
        {PERSONA_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
            {opt.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        disabled={status === "submitting"}
        style={{
          width: "100%",
          height: 44,
          background: T.accent,
          border: 0,
          borderRadius: 4,
          color: "white",
          fontFamily: T.mono,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: "0.08em",
          cursor: status === "submitting" ? "not-allowed" : "pointer",
          opacity: status === "submitting" ? 0.7 : 1,
          boxShadow: `0 0 24px ${T.accent}30`,
        }}
      >
        {status === "submitting" ? "JOINING..." : "JOIN WAITLIST →"}
      </button>
      {status === "error" && (
        <div
          role="alert"
          style={{
            color: T.error,
            fontFamily: T.mono,
            fontSize: 11,
            letterSpacing: "0.02em",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </div>
      )}
    </form>
  );
}

export default function WaitlistPage(): JSX.Element {
  const pageStyle: CSSProperties = {
    color: T.text,
    fontFamily: T.sans,
    minHeight: "100vh",
  };

  const containerStyle: CSSProperties = {
    maxWidth: 480,
    margin: "0 auto",
    padding: "80px 24px",
  };

  return (
    <div className="app-backdrop" style={pageStyle}>
      <main style={containerStyle}>
        <div style={{ marginBottom: 20 }}>
          <SectionLabel accent={T.accent}>WAITLIST</SectionLabel>
        </div>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: T.textBright,
            margin: "0 0 16px",
          }}
        >
          Get early access.
        </h1>
        <p
          style={{
            fontSize: 15,
            color: T.textSecondary,
            lineHeight: 1.6,
            margin: "0 0 24px",
          }}
        >
          Be first to know when Brand Autopsy DB opens to the public. We&apos;re onboarding brand
          strategists, analysts, and agency teams.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 32,
          }}
        >
          {PERSONA_PILLS.map((p) => (
            <span
              key={p}
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "5px 10px",
                border: `1px solid ${T.border}`,
                borderRadius: 100,
                background: T.surface,
                color: T.textMuted,
                fontFamily: T.mono,
                fontSize: 10,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {p}
            </span>
          ))}
        </div>

        <WaitlistForm />

        <div
          style={{
            marginTop: 24,
            fontFamily: T.mono,
            fontSize: 10,
            color: T.textDim,
            letterSpacing: "0.06em",
            textAlign: "center",
          }}
        >
          No spam. Unsubscribe anytime. ~50 spots available.
        </div>
      </main>
    </div>
  );
}

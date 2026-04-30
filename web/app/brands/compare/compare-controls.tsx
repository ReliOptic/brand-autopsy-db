"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { T } from "@/components/ui-primitives";

interface CompareControlsProps {
  tickerA: string;
  tickerB: string;
}

export function CompareControls({ tickerA, tickerB }: CompareControlsProps): JSX.Element {
  const router = useRouter();
  const [valA, setValA] = useState<string>(tickerA);
  const [valB, setValB] = useState<string>(tickerB);

  const isValid = valA.trim().length > 0 && valB.trim().length > 0;

  const handleSubmit = useCallback((): void => {
    if (!isValid) return;
    const a = valA.trim().toUpperCase();
    const b = valB.trim().toUpperCase();
    router.push(`/brands/compare?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`);
  }, [isValid, valA, valB, router]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") handleSubmit();
  }

  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: "14px 40px",
    background: "rgba(255,255,255,0.03)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 6,
    color: T.textBright,
    fontFamily: T.mono,
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: "0.10em",
    padding: "8px 14px",
    width: 110,
    textAlign: "center" as const,
    textTransform: "uppercase" as const,
    outline: "none",
    transition: "border-color 0.18s ease, box-shadow 0.18s ease",
  };

  const vsStyle: React.CSSProperties = {
    fontFamily: T.mono,
    fontSize: 13,
    color: "rgba(255,255,255,0.28)",
    letterSpacing: "0.12em",
    userSelect: "none",
  };

  const btnStyle: React.CSSProperties = {
    padding: "8px 18px",
    background: isValid ? "rgba(99,102,241,0.90)" : "rgba(99,102,241,0.25)",
    border: `1px solid ${isValid ? "rgba(99,102,241,1)" : "rgba(99,102,241,0.30)"}`,
    borderRadius: 6,
    color: isValid ? "#ffffff" : "rgba(255,255,255,0.35)",
    fontFamily: T.mono,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.07em",
    cursor: isValid ? "pointer" : "not-allowed",
    transition: "background 0.15s ease, color 0.15s ease",
    whiteSpace: "nowrap" as const,
  };

  return (
    <div style={wrapperStyle}>
      <input
        value={valA}
        onChange={(e) => setValA(e.target.value.toUpperCase())}
        onKeyDown={handleKeyDown}
        placeholder="AAPL"
        maxLength={6}
        style={inputStyle}
        aria-label="Ticker A"
      />
      <span style={vsStyle}>vs</span>
      <input
        value={valB}
        onChange={(e) => setValB(e.target.value.toUpperCase())}
        onKeyDown={handleKeyDown}
        placeholder="NFLX"
        maxLength={6}
        style={inputStyle}
        aria-label="Ticker B"
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isValid}
        style={btnStyle}
        aria-label="Compare tickers"
      >
        COMPARE →
      </button>
    </div>
  );
}

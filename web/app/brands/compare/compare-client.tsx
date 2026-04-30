"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { T } from "@/components/ui-primitives";

interface CompareClientProps {
  tickerA: string;
  tickerB: string;
}

export function CompareClient({ tickerA, tickerB }: CompareClientProps): JSX.Element {
  const router = useRouter();
  const refA = useRef<HTMLInputElement>(null);
  const refB = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const a = (refA.current?.value ?? "").trim().toUpperCase();
    const b = (refB.current?.value ?? "").trim().toUpperCase();
    if (!a || !b) return;
    router.push(`/brands/compare?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`);
  }

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 4,
    color: T.textBright,
    fontFamily: T.mono,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.08em",
    padding: "5px 10px",
    width: 90,
    textAlign: "center" as const,
    textTransform: "uppercase" as const,
    outline: "none",
  };

  const btnStyle: React.CSSProperties = {
    padding: "5px 14px",
    background: "rgba(99,102,241,0.25)",
    border: "1px solid rgba(99,102,241,0.5)",
    borderRadius: 4,
    color: T.accentBright,
    fontFamily: T.mono,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.06em",
    cursor: "pointer",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", alignItems: "center", gap: 8 }}
    >
      <input
        ref={refA}
        defaultValue={tickerA}
        placeholder="AAPL"
        maxLength={6}
        style={inputStyle}
        aria-label="Ticker A"
      />
      <span style={{ color: "rgba(255,255,255,0.3)", fontFamily: T.mono, fontSize: 14 }}>
        ↔
      </span>
      <input
        ref={refB}
        defaultValue={tickerB}
        placeholder="NFLX"
        maxLength={6}
        style={inputStyle}
        aria-label="Ticker B"
      />
      <button type="submit" style={btnStyle}>
        COMPARE →
      </button>
    </form>
  );
}

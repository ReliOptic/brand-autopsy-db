"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import type { BrandSummary } from "@/lib/api";
import { T, Ticker } from "@/components/ui-primitives";

interface TickerSelectorProps {
  brands: BrandSummary[];
  onSelect: (brand: BrandSummary) => void;
  onClose: () => void;
}

export function TickerSelector({ brands, onSelect, onClose }: TickerSelectorProps): JSX.Element {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handleKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return brands.slice(0, 50);
    return brands
      .filter(b => {
        return (
          b.ticker.toLowerCase().includes(q) ||
          b.name.toLowerCase().includes(q) ||
          (b.sector ?? "").toLowerCase().includes(q)
        );
      })
      .slice(0, 50);
  }, [brands, query]);

  const overlayStyle: CSSProperties = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(4px)",
    zIndex: 100,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: 80,
  };

  const panelStyle: CSSProperties = {
    width: "min(560px, 92vw)",
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.55)",
  };

  const inputStyle: CSSProperties = {
    width: "100%",
    background: T.bgDeep,
    color: T.textBright,
    border: 0,
    borderBottom: `1px solid ${T.border}`,
    outline: "none",
    padding: "14px 16px",
    fontFamily: T.mono,
    fontSize: 13,
    letterSpacing: "0.04em",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={overlayStyle}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={panelStyle}>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ticker, name, or sector…"
          style={inputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderBottomColor = T.accent;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderBottomColor = T.border;
          }}
        />
        <div style={{ maxHeight: 420, overflowY: "auto" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                padding: "24px 16px",
                textAlign: "center",
                fontFamily: T.mono,
                fontSize: 11,
                color: T.textMuted,
                letterSpacing: "0.06em",
              }}
            >
              NO MATCHES · TRY A DIFFERENT QUERY
            </div>
          ) : (
            filtered.map((b) => (
              <button
                key={b.ticker}
                type="button"
                onClick={() => {
                  onSelect(b);
                  onClose();
                }}
                style={{
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "16px 70px 1fr 130px",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 16px",
                  background: "transparent",
                  border: 0,
                  borderBottom: `1px solid ${T.border}`,
                  cursor: "pointer",
                  textAlign: "left",
                  color: T.text,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${T.accent}14`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 1,
                    background: b.color_primary || T.border,
                  }}
                />
                <Ticker color={T.accentBright} size={12}>
                  {b.ticker}
                </Ticker>
                <span style={{ fontSize: 13, color: T.textBright }}>{b.name}</span>
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 9,
                    color: T.textMuted,
                    letterSpacing: "0.06em",
                    textAlign: "right",
                  }}
                >
                  {(b.sector ?? "—").toUpperCase()}
                </span>
              </button>
            ))
          )}
        </div>
        <div
          style={{
            padding: "8px 16px",
            background: T.bgDeep,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: T.mono,
            fontSize: 9,
            color: T.textDim,
            letterSpacing: "0.08em",
          }}
        >
          <span>{filtered.length} RESULTS</span>
          <span>ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}

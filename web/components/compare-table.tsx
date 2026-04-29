"use client";

import type { CSSProperties } from "react";
import type { BrandDetail } from "@/lib/api";
import { T, Ticker, ConfidenceBadge, RiskBadge } from "@/components/ui-primitives";
import type { ConfidenceLevel, RiskLevel } from "@/components/ui-primitives";

const VOICE_KEYS = [
  "formal_casual",
  "authority_peer",
  "emotional_rational",
  "restrained_bold",
] as const;

type VoiceKey = (typeof VOICE_KEYS)[number];

function voiceVal(brand: BrandDetail, key: VoiceKey): number {
  return brand.voice_matrix?.[key] ?? 5;
}

function availableLayers(brand: BrandDetail): number {
  return brand.layers?.filter((l) => l.available).length ?? 0;
}

function brandConfidence(brand: BrandDetail): ConfidenceLevel {
  const layers = availableLayers(brand);
  if (layers >= 7) return "HIGH";
  if (layers >= 4) return "MEDIUM";
  return "LOW";
}

function brandRisk(_brand: BrandDetail): RiskLevel {
  return "UNKNOWN";
}

function formatTagline(brand: BrandDetail): string {
  if (brand.tagline) return `"${brand.tagline}"`;
  if (brand.archetype_primary) return brand.archetype_primary;
  return brand.sector || "—";
}

interface RowSpec {
  label: string;
  voiceKey?: VoiceKey;
  kind: "text" | "voice" | "color" | "confidence" | "risk";
  text?: (b: BrandDetail) => string;
}

const ROWS: RowSpec[] = [
  { label: "Sector", kind: "text", text: (b) => b.sector || "—" },
  { label: "Industry", kind: "text", text: (b) => b.industry || "—" },
  {
    label: "Archetype",
    kind: "text",
    text: (b) =>
      b.archetype_secondary
        ? `${b.archetype_primary} / ${b.archetype_secondary}`
        : b.archetype_primary || "—",
  },
  { label: "Tagline", kind: "text", text: formatTagline },
  { label: "Voice · Formal↔Casual", kind: "voice", voiceKey: "formal_casual" },
  { label: "Voice · Authority↔Peer", kind: "voice", voiceKey: "authority_peer" },
  { label: "Voice · Emotional↔Rational", kind: "voice", voiceKey: "emotional_rational" },
  { label: "Voice · Restrained↔Bold", kind: "voice", voiceKey: "restrained_bold" },
  { label: "Primary Color", kind: "color" },
  { label: "Layers", kind: "text", text: (b) => `${availableLayers(b)}/8` },
  { label: "Confidence", kind: "confidence" },
  { label: "Legal Risk", kind: "risk" },
];

interface CompareTableProps {
  brands: BrandDetail[];
  onRemove?: (ticker: string) => void;
}

export function CompareTable({ brands, onRemove }: CompareTableProps): JSX.Element {
  const cols = `170px repeat(${brands.length}, 1fr)`;
  const headerStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: cols,
    padding: "10px 14px",
    borderBottom: `1px solid ${T.border}`,
    background: T.bgDeep,
    alignItems: "center",
  };

  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      <div style={headerStyle}>
        <span
          style={{
            fontFamily: T.mono,
            fontSize: 9,
            color: T.textDim,
            letterSpacing: "0.1em",
          }}
        >
          ATTRIBUTE
        </span>
        {brands.map((b) => (
          <div key={b.ticker} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span
              aria-hidden="true"
              style={{
                width: 4,
                height: 14,
                background: b.colors[0]?.hex ?? T.accent,
              }}
            />
            <Ticker color={T.accentBright} size={11}>
              {b.ticker}
            </Ticker>
            <span style={{ fontSize: 10, color: T.textMuted, flex: 1, minWidth: 0 }}>
              {b.name}
            </span>
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(b.ticker)}
                aria-label={`Remove ${b.ticker}`}
                style={{
                  background: "transparent",
                  border: 0,
                  color: T.textMuted,
                  cursor: "pointer",
                  fontSize: 10,
                  padding: 2,
                }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      {ROWS.map((row, i) => {
        let bestIdx = -1;
        if (row.kind === "voice" && row.voiceKey) {
          const nums = brands.map((b) => voiceVal(b, row.voiceKey as VoiceKey));
          const max = Math.max(...nums);
          bestIdx = nums.indexOf(max);
        }
        const rowStyle: CSSProperties = {
          display: "grid",
          gridTemplateColumns: cols,
          padding: "9px 14px",
          borderBottom: `1px solid ${T.border}`,
          background: i % 2 === 0 ? "transparent" : T.bgDeep,
          fontFamily: T.mono,
          fontSize: 11,
          alignItems: "center",
        };
        return (
          <div key={row.label} style={rowStyle}>
            <span style={{ color: T.textMuted, letterSpacing: "0.04em" }}>{row.label}</span>
            {brands.map((b, j) => {
              const isBest = bestIdx === j;
              const cellColor = isBest ? T.accentBright : T.text;
              const cellWeight = isBest ? 600 : 400;
              const cellStyle: CSSProperties = {
                color: cellColor,
                fontWeight: cellWeight,
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                minWidth: 0,
              };
              let content: JSX.Element | string = "—";
              if (row.kind === "text" && row.text) {
                content = row.text(b);
              } else if (row.kind === "voice" && row.voiceKey) {
                content = `${voiceVal(b, row.voiceKey)}/10`;
              } else if (row.kind === "color") {
                const hex = b.colors[0]?.hex ?? T.accent;
                content = (
                  <>
                    <span
                      aria-hidden="true"
                      style={{
                        width: 11,
                        height: 11,
                        background: hex,
                        borderRadius: 1,
                        display: "inline-block",
                      }}
                    />
                    {hex.toUpperCase()}
                  </>
                );
              } else if (row.kind === "confidence") {
                content = <ConfidenceBadge level={brandConfidence(b)} size="xs" />;
              } else if (row.kind === "risk") {
                content = <RiskBadge level={brandRisk(b)} />;
              }
              return (
                <span key={b.ticker} style={cellStyle}>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      minWidth: 0,
                    }}
                  >
                    {content}
                  </span>
                  {isBest && (
                    <span style={{ marginLeft: 4, fontSize: 9, color: T.success }}>▲</span>
                  )}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export function exportCSV(brands: BrandDetail[]): void {
  const headers = ["Field", ...brands.map((b) => b.ticker)];
  const rows = [
    ["Name", ...brands.map((b) => b.name)],
    ["Sector", ...brands.map((b) => b.sector)],
    ["Industry", ...brands.map((b) => b.industry || "")],
    ["Archetype", ...brands.map((b) => b.archetype_primary)],
    ["Secondary Archetype", ...brands.map((b) => b.archetype_secondary || "")],
    ["Tagline", ...brands.map((b) => b.tagline || "")],
    ["Primary Color", ...brands.map((b) => b.colors[0]?.hex ?? "")],
    ["Voice: Formal↔Casual", ...brands.map((b) => String(voiceVal(b, "formal_casual")))],
    ["Voice: Authority↔Peer", ...brands.map((b) => String(voiceVal(b, "authority_peer")))],
    [
      "Voice: Emotional↔Rational",
      ...brands.map((b) => String(voiceVal(b, "emotional_rational"))),
    ],
    ["Voice: Restrained↔Bold", ...brands.map((b) => String(voiceVal(b, "restrained_bold")))],
    ["Layers", ...brands.map((b) => `${availableLayers(b)}/8`)],
  ];
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `brand-compare-${brands.map((b) => b.ticker).join("-")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

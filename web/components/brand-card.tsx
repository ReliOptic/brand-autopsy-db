"use client";

import type { CSSProperties, MouseEvent } from "react";
import type { BrandSummary } from "@/lib/api";
import {
  ColorSwatches,
  ConfidenceBadge,
  LayerPips,
  T,
  Ticker,
  VoiceMini,
  type ConfidenceLevel,
} from "./ui-primitives";

interface BrandCardProps {
  brand: BrandSummary;
  onClick?: () => void;
}

const DEFAULT_PRIMARY = "#6366F1";
const DEFAULT_VOICE: number[] = [5, 5, 5, 5];

interface NormalizedBrand {
  ticker: string;
  name: string;
  sector: string;
  archetypePrimary: string;
  archetypeSecondary: string;
  primary: string;
  swatches: string[];
  voice: number[];
  layers: number;
  confidence: ConfidenceLevel;
  date: string;
  hasDesignMd: boolean;
  visualArchetype: string;
  designReadinessGrade: string;
  designReadinessScore: number;
}

interface BrandWithExtras extends BrandSummary {
  industry?: string;
  archetype_secondary?: string;
  colors?: Array<{ hex: string }> | string[];
  voice_matrix?: {
    formal_casual: number | null;
    authority_peer: number | null;
    emotional_rational: number | null;
    restrained_bold: number | null;
  } | null;
  data_confidence?: ConfidenceLevel;
  has_design_md?: boolean;
  visual_archetype?: string;
  design_readiness_grade?: "DESIGN_READY" | "PARTIAL" | "DRAFT" | "STUB";
  design_readiness_score?: number;
}

function normalize(brand: BrandSummary): NormalizedBrand {
  const b = brand as BrandWithExtras;
  const primary = b.color_primary || DEFAULT_PRIMARY;

  let swatches: string[] = [primary];
  if (Array.isArray(b.colors) && b.colors.length > 0) {
    swatches = b.colors
      .map((c) => (typeof c === "string" ? c : c?.hex))
      .filter((hex): hex is string => Boolean(hex));
    if (swatches.length === 0) swatches = [primary];
  }

  let voice: number[] = DEFAULT_VOICE;
  if (b.voice_matrix) {
    const v = b.voice_matrix;
    voice = [
      v.formal_casual ?? 5,
      v.authority_peer ?? 5,
      v.emotional_rational ?? 5,
      v.restrained_bold ?? 5,
    ];
  }

  const layers = b.layer_count ?? 0;
  const confidence: ConfidenceLevel =
    b.data_confidence ?? (layers >= 7 ? "HIGH" : layers >= 5 ? "MEDIUM" : "LOW");

  return {
    ticker: b.ticker,
    name: b.name,
    sector: b.sector || "—",
    archetypePrimary: b.archetype_primary || "—",
    archetypeSecondary: b.archetype_secondary || "—",
    primary,
    swatches,
    voice,
    layers,
    confidence,
    date: b.analysis_date || "",
    hasDesignMd: Boolean(b.has_design_md),
    visualArchetype: b.visual_archetype || "Unclassified",
    designReadinessGrade: b.design_readiness_grade || "STUB",
    designReadinessScore: b.design_readiness_score || 0,
  };
}


function readinessColor(grade: string): string {
  if (grade === "DESIGN_READY") return T.success;
  if (grade === "PARTIAL") return T.warn;
  return T.textMuted;
}

function DesignReadinessBadge({ grade }: { grade: string }): JSX.Element | null {
  if (grade === "STUB" || !grade) return null;
  const color = readinessColor(grade);
  return (
    <span style={{ fontFamily: T.mono, fontSize: 9, color, border: `1px solid ${color}55`, background: `${color}12`, borderRadius: 2, padding: "2px 5px", letterSpacing: "0.05em" }}>
      {grade.replace("DESIGN_", "")}
    </span>
  );
}

// ───────────── Hybrid card (default grid) ─────────────
export function BrandCardHybrid({ brand, onClick }: BrandCardProps): JSX.Element {
  const n = normalize(brand);
  const handleEnter = (e: MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.borderColor = `${T.accent}60`;
    e.currentTarget.style.transform = "translateY(-1px)";
  };
  const handleLeave = (e: MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.borderColor = T.border;
    e.currentTarget.style.transform = "none";
  };

  const containerStyle: CSSProperties = {
    background: T.surface,
    border: `1px solid ${T.border}`,
    borderRadius: 6,
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 150ms",
    position: "relative",
  };

  const floodStyle: CSSProperties = {
    height: 38,
    background: `linear-gradient(135deg, ${n.primary} 0%, ${n.primary}dd 100%)`,
    position: "relative",
    overflow: "hidden",
  };

  return (
    <div onClick={onClick} style={containerStyle} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div style={floodStyle}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent 0, transparent 4px, rgba(0,0,0,0.06) 4px, rgba(0,0,0,0.06) 5px)",
          }}
        />
        <div style={{ position: "absolute", top: 6, left: 10, display: "flex", alignItems: "center", gap: 6 }}>
          <Ticker color="rgba(255,255,255,0.95)" size={11}>
            {n.ticker}
          </Ticker>
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 9,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.05em",
            }}
          >
            {n.sector.split(" ")[0].toUpperCase()}
          </span>
        </div>
        <div style={{ position: "absolute", top: 6, right: 8, display: "flex", gap: 4 }}>
          <DesignReadinessBadge grade={n.designReadinessGrade} />
          <ConfidenceBadge level={n.confidence} size="xs" />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 4,
            left: 10,
            right: 10,
            color: "rgba(255,255,255,0.95)",
            fontWeight: 600,
            fontSize: 13,
            fontFamily: T.sans,
            letterSpacing: "-0.01em",
            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {n.name}
        </div>
      </div>

      <div style={{ padding: "10px 12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: T.textMuted, letterSpacing: "0.04em" }}>
            ARCHETYPE
          </span>
          <span style={{ fontFamily: T.mono, fontSize: 10, color: T.accentBright }}>
            {n.archetypePrimary}
            {n.archetypeSecondary && n.archetypeSecondary !== "—" ? ` / ${n.archetypeSecondary}` : ""}
          </span>
        </div>
        {n.visualArchetype !== "Unclassified" && (
          <div style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim, marginBottom: 8, letterSpacing: "0.05em" }}>
            {n.visualArchetype.toLowerCase()} · {n.designReadinessScore}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <VoiceMini voice={n.voice} color={T.accent} size="xs" />
          <ColorSwatches colors={n.swatches} max={4} size={10} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 8,
            borderTop: `1px solid ${T.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <LayerPips count={n.layers} size="xs" />
            <span style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim }}>{n.layers}/8</span>
          </div>
          {n.date && <span style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim }}>{n.date}</span>}
        </div>
      </div>
    </div>
  );
}

// ───────────── Row card (table row) ─────────────
export function BrandCardRow({ brand, onClick }: BrandCardProps): JSX.Element {
  const n = normalize(brand);
  const handleEnter = (e: MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.background = T.surface;
  };
  const handleLeave = (e: MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.background = "transparent";
  };

  const rowStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: "70px 1fr 130px 130px 120px 90px 100px 80px",
    alignItems: "center",
    gap: 10,
    padding: "8px 14px",
    cursor: "pointer",
    borderBottom: `1px solid ${T.border}`,
    fontFamily: T.mono,
    fontSize: 11,
  };

  return (
    <div onClick={onClick} style={rowStyle} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 4, height: 14, borderRadius: 1, background: n.primary }} />
        <Ticker color={T.accentBright}>{n.ticker}</Ticker>
      </div>
      <span style={{ color: T.text, fontFamily: T.sans, fontSize: 12, fontWeight: 500 }}>{n.name}</span>
      <span style={{ color: T.textMuted, fontSize: 10 }}>{n.sector}</span>
      <span style={{ color: T.accentBright, fontSize: 10 }}>{n.archetypePrimary}</span>
      <span style={{ color: T.textMuted, fontSize: 9 }}>{n.visualArchetype !== "Unclassified" ? n.visualArchetype : "—"}</span>
      <VoiceMini voice={n.voice} color={T.accent} size="xs" />
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <LayerPips count={n.layers} size="xs" />
      </div>
      <ConfidenceBadge level={n.confidence} size="xs" />
    </div>
  );
}

// ───────────── Identity card (color-flooded) ─────────────
export function BrandCardIdentity({ brand, onClick }: BrandCardProps): JSX.Element {
  const n = normalize(brand);
  const isDarkish = ((): boolean => {
    const hex = n.primary.replace("#", "");
    if (hex.length < 6) return true;
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 < 140;
  })();
  const fg = isDarkish ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.85)";
  const fgDim = isDarkish ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.55)";

  const cardStyle: CSSProperties = {
    background: n.primary,
    borderRadius: 6,
    overflow: "hidden",
    cursor: "pointer",
    padding: 14,
    position: "relative",
    aspectRatio: "1.4 / 1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    border: `1px solid ${T.border}`,
    transition: "transform 150ms",
  };

  const handleEnter = (e: MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.transform = "translateY(-2px)";
  };
  const handleLeave = (e: MouseEvent<HTMLDivElement>): void => {
    e.currentTarget.style.transform = "none";
  };

  return (
    <div onClick={onClick} style={cardStyle} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Ticker color={fg} size={14}>
          {n.ticker}
        </Ticker>
        <span style={{ fontFamily: T.mono, fontSize: 9, color: fgDim, letterSpacing: "0.06em" }}>
          {n.designReadinessGrade !== "STUB" ? n.designReadinessGrade.replace("DESIGN_", "") : `${n.layers}/8`}
        </span>
      </div>
      <div>
        <div style={{ fontSize: 18, fontWeight: 600, color: fg, lineHeight: 1.1, marginBottom: 4 }}>{n.name}</div>
        <div style={{ fontFamily: T.mono, fontSize: 10, color: fgDim, letterSpacing: "0.04em" }}>
          {(n.visualArchetype !== "Unclassified" ? n.visualArchetype : n.archetypePrimary).toUpperCase()}
          {n.archetypeSecondary && n.archetypeSecondary !== "—" ? ` · ${n.archetypeSecondary.toUpperCase()}` : ""}
        </div>
      </div>
    </div>
  );
}

// Backwards-compatible default export — used by older imports
export function BrandCard({ brand, onClick }: BrandCardProps): JSX.Element {
  return <BrandCardHybrid brand={brand} onClick={onClick} />;
}

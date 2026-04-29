// Shared design primitives — Bloomberg Terminal aesthetic
// Tokens, badges, sparklines, voice charts. Ported from primitives.jsx.

import type { CSSProperties, ReactNode } from "react";

// ───────────── Design tokens ─────────────
export const T = {
  bg: "#07070B",
  bgDeep: "#050508",
  surface: "#0F0F17",
  surfaceLift: "#13131D",
  border: "#1E1E2E",
  borderBright: "#2A2A3D",
  accent: "#6366F1",
  accentBright: "#818CF8",
  accentDim: "#4F46E5",
  text: "#E2E8F0",
  textBright: "#F4F4F8",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  textDim: "#3F3F55",
  success: "#10B981",
  warn: "#F59E0B",
  error: "#EF4444",
  mono: "var(--font-jetbrains-mono), 'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
  sans: "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif",
} as const;

// ───────────── Confidence badge ─────────────
export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW";

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  size?: "sm" | "xs";
}

export function ConfidenceBadge({ level, size = "sm" }: ConfidenceBadgeProps) {
  const colorMap: Record<ConfidenceLevel, string> = {
    HIGH: T.success,
    MEDIUM: T.warn,
    LOW: T.error,
  };
  const c = colorMap[level] ?? T.textMuted;
  const sz: CSSProperties =
    size === "xs"
      ? { padding: "1px 5px", fontSize: 9 }
      : { padding: "2px 7px", fontSize: 10 };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        ...sz,
        borderRadius: 3,
        border: `1px solid ${c}40`,
        backgroundColor: `${c}12`,
        color: c,
        fontFamily: T.mono,
        fontWeight: 600,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: 1,
          backgroundColor: c,
          boxShadow: `0 0 6px ${c}`,
        }}
      />
      {level}
    </span>
  );
}

// ───────────── Risk badge ─────────────
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "UNKNOWN";

interface RiskBadgeProps {
  level: RiskLevel;
}

export function RiskBadge({ level }: RiskBadgeProps) {
  const colorMap: Record<RiskLevel, string> = {
    LOW: T.success,
    MEDIUM: T.warn,
    HIGH: T.error,
    UNKNOWN: T.textMuted,
  };
  const c = colorMap[level] ?? T.textMuted;
  const shortLabel = level === "MEDIUM" ? "MED" : level;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 7px",
        fontSize: 10,
        borderRadius: 3,
        border: `1px solid ${c}40`,
        backgroundColor: `${c}12`,
        color: c,
        fontFamily: T.mono,
        fontWeight: 600,
        letterSpacing: "0.06em",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: 1, backgroundColor: c }} />
      RISK {shortLabel}
    </span>
  );
}

// ───────────── Layer pips ─────────────
interface LayerPipsProps {
  count: number;
  total?: number;
  size?: "sm" | "xs";
}

export function LayerPips({ count, total = 8, size = "sm" }: LayerPipsProps) {
  const barColor = count >= 8 ? T.success : count >= 6 ? T.warn : T.error;
  const dim = size === "xs";
  return (
    <span style={{ display: "inline-flex", gap: dim ? 1 : 2 }}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          style={{
            width: dim ? 4 : 6,
            height: dim ? 6 : 8,
            borderRadius: 1,
            backgroundColor: i < count ? barColor : T.border,
            boxShadow: i < count ? `0 0 4px ${barColor}80` : "none",
          }}
        />
      ))}
    </span>
  );
}

// ───────────── Color swatches ─────────────
interface ColorSwatchesProps {
  colors: string[];
  max?: number;
  size?: number;
  gap?: number;
}

export function ColorSwatches({ colors, max = 4, size = 14, gap = 3 }: ColorSwatchesProps) {
  return (
    <span style={{ display: "inline-flex", gap }}>
      {colors.slice(0, max).map((c, i) => (
        <span
          key={i}
          title={c}
          style={{
            width: size,
            height: size,
            borderRadius: 2,
            backgroundColor: c,
            border: `1px solid ${T.borderBright}`,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        />
      ))}
    </span>
  );
}

// ───────────── Mono ticker tag ─────────────
interface TickerProps {
  children: ReactNode;
  color?: string;
  size?: number;
  weight?: number;
}

export function Ticker({ children, color = T.accent, size = 12, weight = 600 }: TickerProps) {
  return (
    <span
      style={{
        fontFamily: T.mono,
        fontSize: size,
        fontWeight: weight,
        color,
        letterSpacing: "0.04em",
      }}
    >
      {children}
    </span>
  );
}

// ───────────── Section label ─────────────
interface SectionLabelProps {
  children: ReactNode;
  color?: string;
  accent?: string;
}

export function SectionLabel({ children, color = T.textMuted, accent }: SectionLabelProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontSize: 10,
        fontFamily: T.sans,
        color,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        fontWeight: 600,
      }}
    >
      {accent && (
        <span
          style={{
            width: 6,
            height: 6,
            backgroundColor: accent,
            borderRadius: 1,
            boxShadow: `0 0 6px ${accent}`,
          }}
        />
      )}
      {children}
    </div>
  );
}

// ───────────── Sparkline ─────────────
interface SparklineProps {
  seed?: string;
  width?: number;
  height?: number;
  color?: string;
  fill?: boolean;
}

export function Sparkline({
  seed = "x",
  width = 60,
  height = 18,
  color = T.accent,
  fill = true,
}: SparklineProps) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
  }
  const rand = (): number => {
    h = (h * 9301 + 49297) % 233280;
    return h / 233280;
  };
  const N = 18;
  const points = Array.from({ length: N }, () => 0.3 + rand() * 0.7);
  const path = points
    .map((v, i) => {
      const x = (i / (N - 1)) * width;
      const y = height - v * height;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const fillPath = fill ? `${path} L${width},${height} L0,${height} Z` : null;
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      {fillPath && <path d={fillPath} fill={`${color}25`} />}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ───────────── Voice mini chart ─────────────
interface VoiceMiniProps {
  voice: number[];
  color?: string;
  size?: "sm" | "xs";
}

export function VoiceMini({ voice, color = T.accent, size = "sm" }: VoiceMiniProps) {
  const labels = ["FRM", "AUT", "EMO", "RES"];
  const w = size === "xs" ? 8 : 10;
  const h = size === "xs" ? 16 : 22;
  return (
    <div style={{ display: "inline-flex", gap: 3, alignItems: "flex-end" }}>
      {voice.map((v, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <span
            style={{
              width: w,
              height: h,
              background: `linear-gradient(to top, ${color} ${v * 10}%, ${T.border} ${v * 10}%)`,
              borderRadius: 1,
            }}
          />
          {size !== "xs" && (
            <span
              style={{
                fontFamily: T.mono,
                fontSize: 8,
                color: T.textDim,
                letterSpacing: "0.05em",
              }}
            >
              {labels[i]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

// ───────────── Voice radar ─────────────
interface VoiceRadarProps {
  voice: number[];
  size?: number;
  color?: string;
  showLabels?: boolean;
}

export function VoiceRadar({
  voice,
  size = 220,
  color = T.accent,
  showLabels = true,
}: VoiceRadarProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.36;
  const labels = [
    "Formal ↔ Casual",
    "Authority ↔ Peer",
    "Emotional ↔ Rational",
    "Restrained ↔ Bold",
  ];
  const angles = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
  const points: Array<[number, number]> = voice.map((v, i) => {
    const rr = (v / 10) * r;
    const angle = angles[i] ?? 0;
    return [cx + Math.cos(angle) * rr, cy + Math.sin(angle) * rr];
  });
  const polygon = points.map((p) => p.join(",")).join(" ");
  return (
    <svg width={size} height={size} style={{ display: "block", overflow: "visible" }}>
      {[0.25, 0.5, 0.75, 1].map((s) => (
        <polygon
          key={s}
          points={angles
            .map((a) => `${cx + Math.cos(a) * r * s},${cy + Math.sin(a) * r * s}`)
            .join(" ")}
          fill="none"
          stroke={color}
          strokeOpacity={0.25}
          strokeWidth={1}
        />
      ))}
      {angles.map((a, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos(a) * r}
          y2={cy + Math.sin(a) * r}
          stroke={color}
          strokeOpacity={0.25}
          strokeWidth={1}
        />
      ))}
      <polygon
        points={polygon}
        fill={color}
        fillOpacity={0.28}
        stroke={color}
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p[0]}
          cy={p[1]}
          r={4}
          fill={color}
          stroke="white"
          strokeOpacity={0.6}
          strokeWidth={1.5}
        />
      ))}
      {showLabels &&
        angles.map((a, i) => {
          const lr = r + 20;
          const x = cx + Math.cos(a) * lr;
          const y = cy + Math.sin(a) * lr;
          const anchor =
            Math.cos(a) > 0.3 ? "start" : Math.cos(a) < -0.3 ? "end" : "middle";
          const label = labels[i] ?? "";
          return (
            <text
              key={i}
              x={x}
              y={y + 3}
              textAnchor={anchor}
              style={{
                fontFamily: T.sans,
                fontSize: 8,
                fill: color,
                fillOpacity: 0.55,
                letterSpacing: "0.03em",
              }}
            >
              {label}
            </text>
          );
        })}
    </svg>
  );
}

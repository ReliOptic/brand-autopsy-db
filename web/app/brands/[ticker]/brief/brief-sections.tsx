import type { CSSProperties } from "react";
import type { BrandDetail } from "@/lib/api";
import { T } from "@/components/ui-primitives";
import type { BriefSectionData } from "./brief-helpers";

// ── Icons ────────────────────────────────────────────────────────────────────
const TargetIcon = (): JSX.Element => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
    <circle cx={12} cy={12} r={10} /><circle cx={12} cy={12} r={4} /><line x1={12} y1={2} x2={12} y2={8} /><line x1={12} y1={16} x2={12} y2={22} />
  </svg>
);
const PersonIcon = (): JSX.Element => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
    <circle cx={12} cy={7} r={4} /><path d="M4 21v-1a8 8 0 0116 0v1" />
  </svg>
);
const CubeIcon = (): JSX.Element => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
  </svg>
);
const GridIcon = (): JSX.Element => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
    <rect x={3} y={3} width={7} height={7} /><rect x={14} y={3} width={7} height={7} /><rect x={3} y={14} width={7} height={7} /><rect x={14} y={14} width={7} height={7} />
  </svg>
);
const ChartIcon = (): JSX.Element => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1={18} y1={20} x2={18} y2={10} /><line x1={12} y1={20} x2={12} y2={4} /><line x1={6} y1={20} x2={6} y2={14} /><line x1={2} y1={20} x2={22} y2={20} />
  </svg>
);

const ICON_MAP: Record<BriefSectionData["iconKey"], () => JSX.Element> = {
  target: TargetIcon, person: PersonIcon, cube: CubeIcon, grid: GridIcon, chart: ChartIcon,
};

const divider: CSSProperties = { height: 1, background: "#e5e5e5", margin: 0 };
const mono: CSSProperties = { fontFamily: T.mono };

// ── Meta bar ─────────────────────────────────────────────────────────────────
export function BriefMeta({ name, date }: { name: string; date: string }): JSX.Element {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 32px 12px", borderBottom: "1px solid #e5e5e5" }}>
      <span style={{ ...mono, fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", color: "#888" }}>BRAND REPORT</span>
      <span style={{ ...mono, fontSize: 9, fontWeight: 500, color: "#1d1d1f", letterSpacing: "0.04em" }}>{name}</span>
      <span style={{ ...mono, fontSize: 9, color: "#888", letterSpacing: "0.06em" }}>{date}</span>
    </div>
  );
}

// ── Hero ─────────────────────────────────────────────────────────────────────
export function RamsHero({ brand, headline, subtitle, accent }: {
  brand: BrandDetail; headline: string; subtitle: string; accent: string;
}): JSX.Element {
  return (
    <>
      <div style={{ padding: "32px 32px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1, paddingRight: 24 }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#1d1d1f", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 14 }}>
            {headline}
          </div>
          {subtitle && (
            <div style={{ fontSize: 12, color: "#6e6e73", lineHeight: 1.6, maxWidth: 520, fontStyle: "italic" }}>
              {subtitle}
            </div>
          )}
        </div>
        {/* Ticker badge */}
        <div style={{
          width: 56, height: 56, borderRadius: 28, background: accent,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <span style={{ ...mono, fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: "0.04em" }}>
            {brand.ticker.slice(0, 3)}
          </span>
        </div>
      </div>
      <div style={divider} />
    </>
  );
}

// ── Section row ───────────────────────────────────────────────────────────────
export function RamsSection({ section, accent, isLast }: {
  section: BriefSectionData; accent: string; isLast: boolean;
}): JSX.Element {
  const Icon = ICON_MAP[section.iconKey];
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: "48px 24px 160px 1fr", gap: "0 12px", padding: "14px 32px", alignItems: "flex-start" }}>
        {/* Number */}
        <div style={{ ...mono, fontSize: 18, fontWeight: 700, color: accent, letterSpacing: "-0.01em", lineHeight: 1 }}>
          {section.num}
        </div>
        {/* Icon */}
        <div style={{ color: "#888", paddingTop: 2 }}>
          <Icon />
        </div>
        {/* Title */}
        <div style={{ fontSize: 12, fontWeight: 600, color: "#1d1d1f", letterSpacing: "0.01em", lineHeight: 1.4, paddingTop: 1 }}>
          {section.title}
        </div>
        {/* Content rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {section.rows.map(({ label, value }) => (
            <div key={label}>
              <div style={{ ...mono, fontSize: 8, fontWeight: 600, letterSpacing: "0.10em", color: "#888", textTransform: "uppercase", marginBottom: 2 }}>
                {label}
              </div>
              <div style={{ fontSize: 11, color: "#1d1d1f", lineHeight: 1.55 }}>
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
      {!isLast && <div style={divider} />}
    </>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
export function BriefFooter({ analysisDate }: { analysisDate: string }): JSX.Element {
  return (
    <div style={{
      borderTop: "1px solid #e5e5e5", padding: "10px 32px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{ ...mono, fontSize: 8, color: "#aaa", letterSpacing: "0.10em" }}>BRAND REPORT · INTERNAL</span>
      <span style={{ ...mono, fontSize: 8, color: "#aaa", letterSpacing: "0.08em" }}>Confidential</span>
      <span style={{ ...mono, fontSize: 8, color: "#aaa" }}>
        {analysisDate} · Page 1/1
      </span>
    </div>
  );
}

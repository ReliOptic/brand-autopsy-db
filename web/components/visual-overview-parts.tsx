import Link from "next/link";
import type { CSSProperties } from "react";
import type { BriefData, BrandDetail } from "@/lib/api";
import { T, VoiceRadar, SectionLabel } from "@/components/ui-primitives";
import type { BrandTheme } from "@/lib/brand-theme";
import { DEFAULT_THEME } from "@/lib/brand-theme";

export const LAYER_NAMES = [
  "Identity", "Audience", "Competitive", "Content DNA",
  "Design Sys", "Channels", "Financial", "Legal",
];

const LAYER_SHORT = ["Ident", "Audnc", "Compet", "Content", "Design", "Chan", "Fin", "Legal"];

interface ArchetypeData {
  essence: string;
  audience: string;
  traits: string[];
}

const ARCHETYPE_ESSENCE: Record<string, ArchetypeData> = {
  Creator:   { essence: "Express yourself",                 audience: "Creators, artists, visionaries",       traits: ["Imagination", "Originality", "Vision"] },
  Magician:  { essence: "Make dreams reality",              audience: "Innovators, transformers, dreamers",   traits: ["Transformation", "Wonder", "Vision"] },
  Hero:      { essence: "Prove your worth",                 audience: "Athletes, achievers, competitors",     traits: ["Courage", "Mastery", "Determination"] },
  Outlaw:    { essence: "Break the rules",                  audience: "Rebels, disruptors, radicals",         traits: ["Freedom", "Disruption", "Revolution"] },
  Explorer:  { essence: "Don't fence me in",                audience: "Adventurers, seekers, independents",   traits: ["Discovery", "Freedom", "Authenticity"] },
  Sage:      { essence: "The truth will set you free",      audience: "Thinkers, professionals, researchers", traits: ["Wisdom", "Knowledge", "Insight"] },
  Ruler:     { essence: "Power isn't everything — it's the only thing", audience: "Executives, leaders, high-achievers", traits: ["Authority", "Prestige", "Stability"] },
  Caregiver: { essence: "Love your neighbour as yourself",  audience: "Families, caregivers, communities",    traits: ["Compassion", "Generosity", "Service"] },
  Everyman:  { essence: "All men and women are created equal", audience: "Everyday people, mainstream consumers", traits: ["Belonging", "Authenticity", "Value"] },
  Jester:    { essence: "You only live once",               audience: "Fun-seekers, young spirits, optimists",traits: ["Joy", "Humor", "Spontaneity"] },
  Lover:     { essence: "You are the only one",             audience: "Romantics, sensory-focused consumers", traits: ["Passion", "Intimacy", "Pleasure"] },
  Innocent:  { essence: "Free to be you and me",            audience: "Optimists, simplicity-seekers, families", traits: ["Purity", "Optimism", "Simplicity"] },
};

export function colorRoleLabel(idx: number): string {
  if (idx === 0) return "Primary";
  if (idx === 1) return "Secondary";
  return `Accent ${idx - 1}`;
}

export function voiceFromBrief(brief: BriefData): number[] {
  const m = brief.voice_matrix;
  if (!m) return [5, 5, 5, 5];
  return [
    m.formal_casual ?? 5,
    m.authority_peer ?? 5,
    m.emotional_rational ?? 5,
    m.restrained_bold ?? 5,
  ];
}

function cardShadow(isLight: boolean): string {
  return isLight
    ? "0 2px 8px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)"
    : "0 2px 8px rgba(0,0,0,0.40), 0 1px 3px rgba(0,0,0,0.25)";
}

function textOnHex(hex: string): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 155
    ? "rgba(0,0,0,0.80)"
    : "rgba(255,255,255,0.90)";
}

export function ArchetypePhilosophyBanner({
  brief,
  brand,
  theme = DEFAULT_THEME,
}: {
  brief: BriefData;
  brand: BrandDetail;
  theme?: BrandTheme;
}): JSX.Element | null {
  const archetype = brief.archetype_primary || brand.archetype_primary;
  const data = archetype ? ARCHETYPE_ESSENCE[archetype] : undefined;
  if (!archetype || !data) return null;

  const divider = theme.isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";

  return (
    <div
      className="ov-grid-archetype"
      style={{
        background: theme.surface,
        borderRadius: theme.radius,
        boxShadow: cardShadow(theme.isLight),
        overflow: "hidden",
        borderTop: `3px solid ${theme.accent}`,
      }}
    >
      {/* Archetype name */}
      <div style={{ padding: "24px 28px" }}>
        <div style={{ fontFamily: T.sans, fontSize: 9, fontWeight: 700, color: theme.textMuted, letterSpacing: "0.1em", marginBottom: 8 }}>
          BRAND ARCHETYPE
        </div>
        <div
          style={{
            fontFamily: T.sans,
            fontSize: 36,
            fontWeight: 800,
            color: theme.accent,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: 6,
          }}
        >
          {archetype}
        </div>
        {brief.archetype_secondary && (
          <div style={{ fontFamily: T.sans, fontSize: 12, color: theme.textMuted, fontWeight: 500, marginTop: 4 }}>
            + {brief.archetype_secondary}
          </div>
        )}
      </div>

      {/* Essence */}
      <div
        style={{
          padding: "24px 28px",
          borderLeft: `1px solid ${divider}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ fontFamily: T.sans, fontSize: 9, fontWeight: 700, color: theme.textMuted, letterSpacing: "0.1em", marginBottom: 10 }}>
          BRAND ESSENCE
        </div>
        <div
          style={{
            fontFamily: T.sans,
            fontSize: 22,
            fontWeight: 600,
            color: theme.text,
            lineHeight: 1.35,
            fontStyle: "italic",
          }}
        >
          "{data.essence}"
        </div>
      </div>

      {/* Core audience + traits */}
      <div
        style={{
          padding: "24px 28px",
          borderLeft: `1px solid ${divider}`,
          background: `${theme.accent}08`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <div>
          <div style={{ fontFamily: T.sans, fontSize: 9, fontWeight: 700, color: theme.textMuted, letterSpacing: "0.1em", marginBottom: 6 }}>
            CORE AUDIENCE
          </div>
          {brief.audience_segments.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {brief.audience_segments.map((seg) => (
                <span
                  key={seg}
                  style={{
                    padding: "3px 9px",
                    borderRadius: Math.max(3, theme.radius / 3),
                    background: theme.accentAlpha15,
                    fontFamily: T.sans,
                    fontSize: 11,
                    fontWeight: 600,
                    color: theme.accentBright,
                    display: "inline-block",
                    width: "fit-content",
                  }}
                >
                  {seg}
                </span>
              ))}
            </div>
          ) : (
            <div style={{ fontFamily: T.sans, fontSize: 13, color: theme.textSecondary, lineHeight: 1.45 }}>
              {data.audience}
            </div>
          )}
        </div>
        {brief.primary_persona ? (
          <div style={{ fontFamily: T.sans, fontSize: 11, color: theme.textMuted, lineHeight: 1.5, fontStyle: "italic" }}>
            {brief.primary_persona}
          </div>
        ) : (
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            {data.traits.map((trait) => (
              <span
                key={trait}
                style={{
                  padding: "4px 10px",
                  borderRadius: Math.max(3, theme.radius / 3),
                  background: theme.accentAlpha15,
                  fontFamily: T.sans,
                  fontSize: 10,
                  fontWeight: 700,
                  color: theme.accentBright,
                  letterSpacing: "0.03em",
                }}
              >
                {trait}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ColorStrip({
  brief,
  brand,
  theme = DEFAULT_THEME,
}: {
  brief: BriefData;
  brand: BrandDetail;
  theme?: BrandTheme;
}): JSX.Element {
  const r = theme.radius;
  const entries =
    brand.colors.length > 0
      ? brand.colors.map((c, i) => ({ hex: c.hex, label: c.name || c.role || colorRoleLabel(i) }))
      : brief.colors.map((hex, i) => ({ hex, label: colorRoleLabel(i) }));
  const colors = entries.slice(0, 6);

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ marginBottom: 10 }}>
        <SectionLabel accent={theme.accent}>COLOR STORY</SectionLabel>
      </div>
      <div
        style={{
          display: "flex",
          borderRadius: r,
          overflow: "hidden",
          height: 96,
          boxShadow: cardShadow(theme.isLight),
        }}
      >
        {colors.map((e, i) => {
          const tc = textOnHex(e.hex);
          return (
            <div
              key={`${e.hex}-${i}`}
              style={{
                flex: i === 0 ? 2 : 1,
                background: e.hex,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "10px 12px",
              }}
            >
              <span
                style={{
                  fontFamily: T.mono,
                  fontSize: 9,
                  fontWeight: 600,
                  color: tc,
                  letterSpacing: "0.08em",
                }}
              >
                {e.hex.toUpperCase()}
              </span>
              <span
                style={{
                  fontFamily: T.sans,
                  fontSize: 8,
                  color: tc,
                  opacity: 0.65,
                  marginTop: 2,
                }}
              >
                {e.label.slice(0, 12)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function VoicePositioningGrid({
  brief,
  brand,
  theme = DEFAULT_THEME,
}: {
  brief: BriefData;
  brand: BrandDetail;
  theme?: BrandTheme;
}): JSX.Element {
  const r = theme.radius;
  const shadow = cardShadow(theme.isLight);
  const voice = voiceFromBrief(brief);
  const msgs = brief.key_messages.slice(0, 3);
  const axes = [
    { label: "Formal / Casual", v: voice[0] },
    { label: "Authority / Peer", v: voice[1] },
    { label: "Emotional / Rational", v: voice[2] },
    { label: "Restrained / Bold", v: voice[3] },
  ];
  const trackBg = theme.isLight ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)";

  return (
    <div className="ov-grid-voice">
      {/* Voice */}
      <div
        style={{
          background: theme.surface,
          borderRadius: r,
          padding: "24px 24px 24px",
          boxShadow: shadow,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div style={{ width: "100%" }}>
          <SectionLabel accent={theme.accent}>BRAND VOICE</SectionLabel>
        </div>
        <VoiceRadar voice={voice} size={310} color={theme.accent} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
          {axes.map((a) => (
            <div key={a.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontFamily: T.sans, fontSize: 10, color: theme.textSecondary, fontWeight: 500 }}>{a.label}</span>
                <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 800, color: theme.accent }}>{a.v}</span>
              </div>
              <div style={{ height: 5, background: trackBg, borderRadius: 3 }}>
                <div
                  style={{
                    height: 5,
                    width: `${a.v * 10}%`,
                    background: theme.accent,
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Positioning */}
      <div
        style={{
          background: theme.surface,
          borderRadius: r,
          padding: "24px 24px 24px 26px",
          boxShadow: shadow,
          borderLeft: `3px solid ${theme.accent}`,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div>
          <div style={{ marginBottom: 10 }}>
            <SectionLabel accent={theme.accent}>POSITIONING</SectionLabel>
          </div>
          <p
            style={{
              fontSize: 18,
              fontWeight: 400,
              color: theme.text,
              lineHeight: 1.75,
              fontStyle: "italic",
              margin: 0,
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            } as CSSProperties}
          >
            {brief.positioning_statement || brand.tagline || "—"}
          </p>
        </div>

        {msgs.length > 0 && (
          <div>
            <div style={{ marginBottom: 12 }}>
              <SectionLabel color={theme.textMuted}>KEY MESSAGES</SectionLabel>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {msgs.map((msg, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 6,
                      height: 6,
                      borderRadius: 2,
                      background: theme.accent,
                      marginTop: 8,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: T.sans,
                      fontSize: 14,
                      color: theme.text,
                      lineHeight: 1.8,
                    }}
                  >
                    {msg}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CoverageChannelsSource({
  brief,
  brand,
  theme = DEFAULT_THEME,
}: {
  brief: BriefData;
  brand: BrandDetail;
  theme?: BrandTheme;
}): JSX.Element {
  const r = theme.radius;
  const shadow = cardShadow(theme.isLight);
  const availableNums = new Set(brand.layers.filter((l) => l.available).map((l) => l.num));
  const availCount = availableNums.size;
  const channels = brief.top_channels.slice(0, 4);
  const fyMatch = brief.financial_headline.match(/FY\d{4}/);
  const fyLabel = fyMatch ? fyMatch[0] : brief.analysis_date.slice(0, 4);
  const coverageColor = availCount === 8 ? T.success : availCount >= 6 ? T.warn : T.error;
  const inactiveBg = theme.isLight ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.03)";

  return (
    <div className="ov-grid-3col">
      {/* Coverage */}
      <div style={{ background: theme.surface, borderRadius: r, padding: "20px", boxShadow: shadow }}>
        <div style={{ marginBottom: 14 }}>
          <SectionLabel accent={coverageColor}>COVERAGE</SectionLabel>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 5 }}>
          {LAYER_NAMES.map((name, i) => {
            const num = i + 1;
            const active = availableNums.has(num);
            return (
              <div
                key={num}
                title={name}
                style={{
                  padding: "7px 4px",
                  borderRadius: 5,
                  background: active ? `${theme.accent}1A` : inactiveBg,
                  textAlign: "center",
                  border: `1px solid ${active ? `${theme.accent}40` : "transparent"}`,
                }}
              >
                <div
                  style={{
                    fontFamily: T.mono,
                    fontSize: 11,
                    fontWeight: 700,
                    color: active ? theme.accentBright : theme.textDim,
                  }}
                >
                  {String(num).padStart(2, "0")}
                </div>
                <div
                  style={{
                    fontFamily: T.sans,
                    fontSize: 7,
                    color: active ? theme.textSecondary : theme.textDim,
                    marginTop: 2,
                    lineHeight: 1.1,
                  }}
                >
                  {LAYER_SHORT[i]}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop: 14, display: "flex", alignItems: "baseline", gap: 6 }}>
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 28,
              fontWeight: 800,
              color: coverageColor,
              lineHeight: 1,
            }}
          >
            {availCount}
          </span>
          <span style={{ fontFamily: T.sans, fontSize: 12, color: theme.textMuted }}>/ 8 layers</span>
          <span
            style={{
              marginLeft: "auto",
              padding: "3px 8px",
              borderRadius: 4,
              background: `${coverageColor}18`,
              fontFamily: T.sans,
              fontSize: 9,
              fontWeight: 700,
              color: coverageColor,
              letterSpacing: "0.06em",
            }}
          >
            {availCount === 8 ? "COMPLETE" : availCount >= 6 ? "HIGH" : "PARTIAL"}
          </span>
        </div>
      </div>

      {/* Channels */}
      <div style={{ background: theme.surface, borderRadius: r, padding: "20px", boxShadow: shadow }}>
        <div style={{ marginBottom: 14 }}>
          <SectionLabel accent={theme.accent}>TOP CHANNELS</SectionLabel>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {channels.length > 0
            ? channels.map((ch, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 22,
                      height: 22,
                      borderRadius: 5,
                      background: i === 0 ? `${theme.accent}28` : `${theme.accent}12`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: T.mono,
                      fontSize: 9,
                      fontWeight: 700,
                      color: theme.accent,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: T.sans,
                      fontSize: 12,
                      color: i === 0 ? theme.text : theme.textSecondary,
                      fontWeight: i === 0 ? 500 : 400,
                    }}
                  >
                    {ch}
                  </span>
                </div>
              ))
            : (
                <span style={{ fontFamily: T.mono, fontSize: 11, color: theme.textDim }}>—</span>
              )}
        </div>
      </div>

      {/* Source */}
      <div style={{ background: theme.surface, borderRadius: r, padding: "20px", boxShadow: shadow }}>
        <div style={{ marginBottom: 14 }}>
          <SectionLabel accent={theme.accentBright}>DATA SOURCE</SectionLabel>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div
              style={{
                fontFamily: T.sans,
                fontSize: 9,
                color: theme.textMuted,
                letterSpacing: "0.08em",
                marginBottom: 5,
              }}
            >
              AUTHORITY
            </div>
            <div
              style={{
                padding: "7px 10px",
                borderRadius: 5,
                background: theme.accentAlpha15,
                fontFamily: T.sans,
                fontSize: 11,
                fontWeight: 600,
                color: theme.accentBright,
              }}
            >
              SEC EDGAR · T1 OFFICIAL
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: T.sans,
                fontSize: 9,
                color: theme.textMuted,
                letterSpacing: "0.08em",
                marginBottom: 4,
              }}
            >
              FILING
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 12, color: theme.text, fontWeight: 500 }}>
              10-K ANNUAL
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: T.sans,
                fontSize: 9,
                color: theme.textMuted,
                letterSpacing: "0.08em",
                marginBottom: 4,
              }}
            >
              PERIOD
            </div>
            <div style={{ fontFamily: T.mono, fontSize: 16, color: theme.textBright, fontWeight: 700 }}>
              {brief.ticker} · {fyLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CtaBar({
  brief,
  onUnlockReport,
  theme = DEFAULT_THEME,
}: {
  brief: BriefData;
  onUnlockReport?: () => void;
  theme?: BrandTheme;
}): JSX.Element {
  const r = theme.radius;
  const reportHref = `/brands/${brief.ticker}?view=report`;
  const btnStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "11px 28px",
    borderRadius: Math.max(4, r / 2),
    background: theme.accent,
    border: "none",
    color: "#ffffff",
    fontFamily: T.sans,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.05em",
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: `0 4px 14px ${theme.accent}55`,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 22px",
        background: theme.surfaceLift,
        borderRadius: r,
        boxShadow: cardShadow(theme.isLight),
      }}
    >
      <div>
        <div
          style={{
            fontFamily: T.sans,
            fontSize: 14,
            fontWeight: 600,
            color: theme.textBright,
            marginBottom: 3,
          }}
        >
          Full Brand Autopsy
        </div>
        <div style={{ fontFamily: T.sans, fontSize: 12, color: theme.textMuted }}>
          8 layers · Identity → Legal
        </div>
      </div>
      {onUnlockReport ? (
        <button type="button" onClick={onUnlockReport} style={btnStyle}>
          VIEW FULL REPORT →
        </button>
      ) : (
        <Link href={reportHref} style={btnStyle}>
          VIEW FULL REPORT →
        </Link>
      )}
    </div>
  );
}

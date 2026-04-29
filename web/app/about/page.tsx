import type { CSSProperties } from "react";
import { Navigation } from "@/components/navigation";
import { SectionLabel, T } from "@/components/ui-primitives";

interface SourceTier {
  tier: string;
  type: string;
  examples: string;
}

interface FrameworkLayer {
  num: string;
  name: string;
  desc: string;
}

const SOURCE_TIERS: ReadonlyArray<SourceTier> = [
  {
    tier: "T1 — Official",
    type: "SEC filings (10-K, 10-Q, 8-K, DEF 14A), IR pages",
    examples: "EDGAR, company investor relations",
  },
  {
    tier: "T2 — Primary Reliable",
    type: "Official interviews, earnings transcripts, regulatory records",
    examples: "Seeking Alpha transcripts, FTC filings",
  },
  {
    tier: "T3 — Secondary Reliable",
    type: "Reputable journalism",
    examples: "WSJ, Bloomberg, Reuters",
  },
  {
    tier: "T4 — Inferred",
    type: "Project interpretation of public data",
    examples: "Explicitly labeled in analysis",
  },
  {
    tier: "T5 — LLM Draft",
    type: "AI-generated, unverified",
    examples: "Never published externally",
  },
];

const FRAMEWORK_LAYERS: ReadonlyArray<FrameworkLayer> = [
  {
    num: "01",
    name: "Brand Identity",
    desc: "Core positioning, archetypes, voice matrix, color system",
  },
  {
    num: "02",
    name: "Audience Map",
    desc: "Primary/secondary segments, psychographics, jobs-to-be-done",
  },
  {
    num: "03",
    name: "Competitive Landscape",
    desc: "Positioning quadrants, 3+ direct competitors, differentiation metrics",
  },
  {
    num: "04",
    name: "Content DNA",
    desc: "Messaging framework, editorial tone, key messages, slogans",
  },
  {
    num: "05",
    name: "Design System",
    desc: "Visual tokens, typography, spatial system, motion",
  },
  {
    num: "06",
    name: "Channel Playbook",
    desc: "Platform presence, content cadence, paid/organic mix",
  },
  {
    num: "07",
    name: "Financial Anatomy",
    desc: "Revenue, margins, brand investment from SEC filings",
  },
  {
    num: "08",
    name: "Legal Review",
    desc: "IP/trademark landscape, litigation risk, project-specific writing guide",
  },
];

const sectionStyle: CSSProperties = {
  marginTop: 48,
};

const sectionHeaderStyle: CSSProperties = {
  fontSize: 20,
  fontWeight: 600,
  letterSpacing: "-0.02em",
  color: T.textBright,
  margin: "12px 0 16px",
};

const paragraphStyle: CSSProperties = {
  fontSize: 14,
  color: T.textSecondary,
  lineHeight: 1.65,
  margin: 0,
};

export default function AboutPage(): JSX.Element {
  const pageStyle: CSSProperties = {
    background: T.bg,
    color: T.text,
    fontFamily: T.sans,
    minHeight: "100vh",
  };

  const containerStyle: CSSProperties = {
    maxWidth: 720,
    margin: "0 auto",
    padding: "40px 24px 80px",
  };

  return (
    <div style={pageStyle}>
      <Navigation />
      <main style={containerStyle}>
        {/* Header */}
        <header>
          <SectionLabel accent={T.accent}>ABOUT</SectionLabel>
          <h1
            style={{
              fontSize: 36,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: T.textBright,
              margin: "12px 0 8px",
            }}
          >
            About BAUTOPSY
          </h1>
          <p
            style={{
              fontSize: 14,
              color: T.textMuted,
              fontFamily: T.mono,
              letterSpacing: "0.04em",
              margin: 0,
            }}
          >
            Methodology, data sources, and legal framework
          </p>
        </header>

        {/* Section 01 */}
        <section style={sectionStyle}>
          <SectionLabel>01 / WHAT IS BAUTOPSY?</SectionLabel>
          <h2 style={sectionHeaderStyle}>A brand intelligence platform.</h2>
          <p style={paragraphStyle}>
            Brand Autopsy DB (BAUTOPSY) is a brand intelligence platform analyzing 513 S&amp;P 500
            companies across 8 strategic layers — from brand identity and voice positioning to
            financial anatomy and legal risk profile. Built for brand strategists, M&amp;A
            analysts, agency directors, and competitive intelligence teams.
          </p>
        </section>

        {/* Section 02 */}
        <section style={sectionStyle}>
          <SectionLabel>02 / DATA SOURCE HIERARCHY</SectionLabel>
          <h2 style={sectionHeaderStyle}>Five tiers of evidence.</h2>
          <div
            style={{
              border: `1px solid ${T.border}`,
              borderRadius: 6,
              background: T.surface,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr 1fr",
                padding: "10px 14px",
                borderBottom: `1px solid ${T.border}`,
                background: T.surfaceLift,
                fontFamily: T.mono,
                fontSize: 10,
                color: T.textDim,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              <span>Tier</span>
              <span>Source Type</span>
              <span>Examples</span>
            </div>
            {SOURCE_TIERS.map((row, i) => (
              <div
                key={row.tier}
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr 1fr",
                  padding: "12px 14px",
                  borderBottom:
                    i === SOURCE_TIERS.length - 1 ? "none" : `1px solid ${T.border}`,
                  fontSize: 12,
                  color: T.textSecondary,
                  lineHeight: 1.5,
                }}
              >
                <span
                  style={{
                    fontFamily: T.mono,
                    color: T.accentBright,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}
                >
                  {row.tier}
                </span>
                <span>{row.type}</span>
                <span style={{ color: T.textMuted }}>{row.examples}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 03 */}
        <section style={sectionStyle}>
          <SectionLabel>03 / THE 8-LAYER FRAMEWORK</SectionLabel>
          <h2 style={sectionHeaderStyle}>Every brand, dissected.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {FRAMEWORK_LAYERS.map((layer) => (
              <div
                key={layer.num}
                style={{
                  display: "grid",
                  gridTemplateColumns: "44px 180px 1fr",
                  alignItems: "baseline",
                  gap: 12,
                  padding: "12px 14px",
                  border: `1px solid ${T.border}`,
                  background: T.surface,
                  borderRadius: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 12,
                    color: T.accentBright,
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                  }}
                >
                  {layer.num}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: T.textBright,
                  }}
                >
                  {layer.name}
                </span>
                <span style={{ fontSize: 13, color: T.textMuted, lineHeight: 1.5 }}>
                  {layer.desc}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 04 */}
        <section style={sectionStyle}>
          <SectionLabel>04 / LEGAL DISCLAIMER</SectionLabel>
          <h2 style={sectionHeaderStyle}>What this is — and isn&apos;t.</h2>
          <div
            style={{
              border: `1px solid ${T.warn}66`,
              background: `${T.warn}14`,
              borderRadius: 6,
              padding: 18,
              fontSize: 13,
              color: T.text,
              lineHeight: 1.65,
            }}
          >
            This platform provides AI-assisted analysis of publicly available information for brand
            strategy research purposes only. Content is not investment advice, legal advice, or
            financial advice. All factual claims reference public sources. Interpretations are
            labeled as such. Company analyses do not imply endorsement, affiliation, or partnership
            with analyzed companies. For corrections or concerns:{" "}
            <span style={{ fontFamily: T.mono, color: T.warn }}>[contact info placeholder]</span>.
          </div>
        </section>

        {/* Section 05 */}
        <section style={sectionStyle}>
          <SectionLabel>05 / UPDATE CADENCE</SectionLabel>
          <h2 style={sectionHeaderStyle}>How often we refresh.</h2>
          <p style={paragraphStyle}>
            Financial data (Layer 07) is refreshed quarterly following SEC earnings filings. Brand
            identity data (Layers 01–06) is reviewed annually or when significant brand changes are
            publicly reported. Analysis timestamps are shown on each brand page.
          </p>
        </section>

        {/* Footer */}
        <footer
          style={{
            marginTop: 64,
            paddingTop: 24,
            borderTop: `1px solid ${T.border}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
            fontFamily: T.mono,
            fontSize: 10,
            color: T.textDim,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          <span>BAUTOPSY · v2.4</span>
          <div style={{ display: "flex", gap: 16 }}>
            <span style={{ color: T.textMuted, cursor: "pointer" }}>Privacy Policy</span>
            <span style={{ color: T.textMuted, cursor: "pointer" }}>Terms of Service</span>
            <span style={{ color: T.textMuted, cursor: "pointer" }}>Contact</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

import Link from "next/link";
import type { CSSProperties } from "react";
import { fetchBrands, fetchHealth } from "@/lib/api";
import type { BrandSummary } from "@/lib/api";
import { SectionLabel, Sparkline, T, Ticker } from "@/components/ui-primitives";

const PERSONAS = [
  {
    tag: "P.A",
    title: "Startup Brand Marketer",
    desc: "Search competitors. Pull a brief. Ship the deck before the standup ends.",
  },
  {
    tag: "P.B",
    title: "Strategy Analyst",
    desc: "Run M&A diligence and competitive overlays without a 3-week junior project.",
  },
  {
    tag: "P.C",
    title: "Agency Strategy Director",
    desc: "Print client-ready 1-pagers. Win pitches with data, not hand-waving.",
  },
] as const;

const TIME_SAVINGS: ReadonlyArray<readonly [string, string, string]> = [
  ["Competitor research", "2–3 weeks", "10 min"],
  ["M&A brand diligence", "3 weeks", "5 days"],
  ["Agency pitch prep", "3–5 days", "30 min"],
];

function ArrowUpRight(): JSX.Element {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke={T.textDim}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

function LogoMark(): JSX.Element {
  return (
    <svg width={20} height={20} viewBox="0 0 18 18" aria-hidden="true">
      <rect x="1" y="1" width="7" height="7" fill={T.accent} />
      <rect x="10" y="1" width="7" height="7" fill="none" stroke={T.accent} strokeWidth={1.2} />
      <rect x="1" y="10" width="7" height="7" fill="none" stroke={T.accent} strokeWidth={1.2} />
      <rect x="10" y="10" width="7" height="7" fill={T.accent} opacity={0.4} />
    </svg>
  );
}

function formatToday(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(2);
  return `${mm}.${dd}.${yy}`;
}

async function safeFetchTicker(): Promise<{
  brands: BrandSummary[];
  total: number;
}> {
  try {
    const data = await fetchBrands({ limit: 8 });
    return { brands: data.brands, total: data.total };
  } catch {
    return { brands: [], total: 513 };
  }
}

async function safeFetchCount(): Promise<number> {
  try {
    const h = await fetchHealth();
    return h.brands_count;
  } catch {
    return 513;
  }
}

export default async function LandingPage(): Promise<JSX.Element> {
  const [tickerData, brandsCount] = await Promise.all([
    safeFetchTicker(),
    safeFetchCount(),
  ]);
  const brands = tickerData.brands;
  const today = formatToday();

  const pageStyle: CSSProperties = {
    background: T.bg,
    color: T.text,
    fontFamily: T.sans,
    minHeight: "100vh",
    overflow: "hidden",
    position: "relative",
  };

  const gridBgStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    opacity: 0.4,
    backgroundImage: `linear-gradient(${T.border} 1px, transparent 1px), linear-gradient(90deg, ${T.border} 1px, transparent 1px)`,
    backgroundSize: "48px 48px",
    maskImage: "radial-gradient(ellipse at center top, black 0%, transparent 70%)",
    WebkitMaskImage: "radial-gradient(ellipse at center top, black 0%, transparent 70%)",
    pointerEvents: "none",
  };

  const glowStyle: CSSProperties = {
    position: "absolute",
    top: -200,
    left: "50%",
    transform: "translateX(-50%)",
    width: 800,
    height: 600,
    borderRadius: "50%",
    background: `radial-gradient(circle, ${T.accent}30 0%, transparent 60%)`,
    filter: "blur(40px)",
    pointerEvents: "none",
  };

  const topBarStyle: CSSProperties = {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 32px",
    borderBottom: `1px solid ${T.border}`,
  };

  const launchButtonStyle: CSSProperties = {
    padding: "7px 14px",
    border: `1px solid ${T.accent}`,
    borderRadius: 3,
    background: `${T.accent}25`,
    color: T.accentBright,
    fontFamily: T.mono,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.06em",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
  };

  const livePillStyle: CSSProperties = {
    display: "inline-flex",
    gap: 6,
    alignItems: "center",
    padding: "4px 10px",
    border: `1px solid ${T.border}`,
    borderRadius: 100,
    background: T.surface,
    marginBottom: 24,
    fontFamily: T.mono,
    fontSize: 10,
    color: T.textMuted,
    letterSpacing: "0.1em",
  };

  const heroH1Style: CSSProperties = {
    fontSize: 72,
    fontWeight: 600,
    letterSpacing: "-0.04em",
    lineHeight: 0.95,
    color: T.textBright,
    margin: "0 0 20px",
  };

  const heroSolidCta: CSSProperties = {
    padding: "12px 22px",
    border: 0,
    borderRadius: 4,
    background: T.accent,
    color: "white",
    fontFamily: T.mono,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "0.06em",
    cursor: "pointer",
    boxShadow: `0 0 30px ${T.accent}40`,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
  };

  const heroOutlineCta: CSSProperties = {
    padding: "12px 22px",
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    background: T.surface,
    color: T.text,
    fontFamily: T.mono,
    fontSize: 12,
    letterSpacing: "0.06em",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
  };

  const tickerStripStyle: CSSProperties = {
    marginTop: 60,
    padding: "12px 16px",
    border: `1px solid ${T.border}`,
    borderRadius: 4,
    background: T.surface,
    display: "flex",
    gap: 28,
    overflow: "hidden",
    justifyContent: "center",
    flexWrap: "wrap",
  };

  return (
    <div style={pageStyle}>
      <div style={gridBgStyle} aria-hidden="true" />
      <div style={glowStyle} aria-hidden="true" />

      {/* Top bar */}
      <header style={topBarStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <LogoMark />
          <span
            style={{
              fontFamily: T.mono,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: T.textBright,
            }}
          >
            BAUTOPSY
          </span>
        </div>
        <nav
          aria-label="Primary"
          style={{
            display: "flex",
            gap: 18,
            fontFamily: T.mono,
            fontSize: 11,
            color: T.textMuted,
            letterSpacing: "0.06em",
          }}
        >
          <span>METHODOLOGY</span>
          <span>PRICING</span>
          <span>DOCS</span>
        </nav>
        <Link href="/dashboard" style={launchButtonStyle}>
          LAUNCH CONSOLE →
        </Link>
      </header>

      {/* Hero */}
      <section
        style={{
          position: "relative",
          textAlign: "center",
          padding: "100px 32px 80px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div style={livePillStyle}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: T.success,
              boxShadow: `0 0 6px ${T.success}`,
            }}
          />
          LIVE · {brandsCount} BRANDS · 8 LAYERS · UPDATED {today}
        </div>
        <h1 style={heroH1Style}>
          Brand strategy,
          <br />
          <span
            style={{
              fontFamily: T.mono,
              fontWeight: 500,
              fontStyle: "italic",
              color: T.accentBright,
            }}
          >
            quantified.
          </span>
        </h1>
        <p
          style={{
            fontSize: 18,
            color: T.textSecondary,
            maxWidth: 620,
            margin: "0 auto 32px",
            lineHeight: 1.5,
          }}
        >
          The Bloomberg Terminal for S&P 500 brand intelligence. Search, dissect and compare {brandsCount}{" "}
          brands across 8 strategic layers — in minutes, not weeks.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
          <Link href="/dashboard" style={heroSolidCta}>
            OPEN CONSOLE →
          </Link>
          <Link href="/dashboard" style={heroOutlineCta}>
            VIEW SAMPLE BRIEF
          </Link>
        </div>

        {/* Live ticker strip */}
        {brands.length > 0 && (
          <div style={tickerStripStyle}>
            {brands.map((b) => (
              <div
                key={b.ticker}
                style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}
              >
                <span
                  style={{
                    width: 4,
                    height: 12,
                    background: b.color_primary || T.accent,
                  }}
                />
                <Ticker size={11}>{b.ticker}</Ticker>
                <Sparkline seed={b.ticker} width={40} height={14} color={T.accent} fill={false} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Time savings */}
      <section
        style={{
          position: "relative",
          padding: "60px 32px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <SectionLabel accent={T.accent}>BEFORE / AFTER</SectionLabel>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginTop: 8,
            marginBottom: 24,
            color: T.textBright,
          }}
        >
          The same job. <span style={{ color: T.accentBright }}>1000× faster.</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {TIME_SAVINGS.map(([job, before, after]) => (
            <div
              key={job}
              style={{
                border: `1px solid ${T.border}`,
                borderRadius: 6,
                padding: 18,
                background: T.surface,
              }}
            >
              <div
                style={{
                  fontFamily: T.mono,
                  fontSize: 9,
                  color: T.textDim,
                  letterSpacing: "0.1em",
                }}
              >
                JOB
              </div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: T.text,
                  marginTop: 4,
                  marginBottom: 14,
                }}
              >
                {job}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 11,
                    color: T.error,
                    textDecoration: "line-through",
                  }}
                >
                  {before}
                </span>
                <ArrowUpRight />
                <span
                  style={{
                    fontFamily: T.mono,
                    fontSize: 22,
                    fontWeight: 600,
                    color: T.success,
                  }}
                >
                  {after}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Personas */}
      <section
        style={{
          position: "relative",
          padding: "40px 32px 80px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <SectionLabel accent={T.accent}>WHO IT&apos;S FOR</SectionLabel>
        <h2
          style={{
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginTop: 8,
            marginBottom: 24,
            color: T.textBright,
          }}
        >
          Built for the brand operator&apos;s stack.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {PERSONAS.map((p) => (
            <div
              key={p.tag}
              style={{
                border: `1px solid ${T.border}`,
                borderRadius: 6,
                padding: 18,
                background: T.surface,
              }}
            >
              <Ticker color={T.accentBright} size={11}>
                {p.tag}
              </Ticker>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: T.textBright,
                  marginTop: 6,
                }}
              >
                {p.title}
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: T.textMuted,
                  marginTop: 6,
                  lineHeight: 1.5,
                }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          position: "relative",
          padding: "60px 32px",
          textAlign: "center",
          borderTop: `1px solid ${T.border}`,
          background: T.bgDeep,
        }}
      >
        <h2
          style={{
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: T.textBright,
          }}
        >
          Open the console. <span style={{ color: T.accentBright }}>Run an autopsy.</span>
        </h2>
        <Link href="/dashboard" style={{ ...heroSolidCta, marginTop: 20 }}>
          LAUNCH CONSOLE →
        </Link>
        <div
          style={{
            marginTop: 36,
            fontFamily: T.mono,
            fontSize: 9,
            color: T.textDim,
            letterSpacing: "0.1em",
          }}
        >
          BAUTOPSY · BRAND AUTOPSY DB · v2.4 · BRAND STRATEGY ANALYSIS · NOT INVESTMENT ADVICE
        </div>
      </section>
    </div>
  );
}

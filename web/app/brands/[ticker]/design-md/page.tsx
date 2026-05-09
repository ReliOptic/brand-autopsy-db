import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchDesignMd, fetchDesignMdJson } from "@/lib/api";
import { AgentPromptCard } from "@/components/agent-prompt-card";
import { DesignMdPreview } from "@/components/design-md-preview";
import { DesignMdViewer } from "@/components/design-md-viewer";
import { SectionLabel, T, Ticker } from "@/components/ui-primitives";

interface PageProps {
  params: Promise<{ ticker: string }>;
}

export default async function BrandDesignMdPage({ params }: PageProps): Promise<JSX.Element> {
  const { ticker } = await params;
  const tickerUp = ticker.toUpperCase();
  let data;
  let designMd;
  try {
    [data, designMd] = await Promise.all([
      fetchDesignMd(tickerUp),
      fetchDesignMdJson(tickerUp),
    ]);
  } catch {
    notFound();
  }

  const primary = designMd.color_palette.find((c) => c.role === "primary")?.hex ?? T.accent;

  return (
    <div className="app-backdrop" style={{ color: T.text, fontFamily: T.sans, minHeight: "calc(100vh - 48px)", padding: "22px 28px 44px" }}>
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <Link href={`/brands/${tickerUp}?view=report`} style={{ color: T.textMuted, fontFamily: T.mono, fontSize: 11, textDecoration: "none" }}>
            ← BACK TO {tickerUp}
          </Link>
          <Link href={`/brands/${tickerUp}`} style={{ color: T.accentBright, fontFamily: T.mono, fontSize: 11, textDecoration: "none" }}>
            OVERVIEW
          </Link>
        </div>
        <section
          className="terminal-panel"
          style={{
            borderRadius: 10,
            padding: "22px 24px",
            marginBottom: 16,
            borderTop: `2px solid ${primary}`,
          }}
        >
          <div className="design-md-hero-grid">
            <div>
              <SectionLabel accent={primary}>PRODUCT DESIGN INTELLIGENCE</SectionLabel>
              <h1 style={{ margin: "10px 0 8px", color: T.textBright, fontSize: 38, lineHeight: 1, letterSpacing: "-0.04em" }}>
                <Ticker color={primary} size={34}>{tickerUp}</Ticker> DESIGN.md
              </h1>
              <p style={{ margin: 0, color: T.textSecondary, fontSize: 14, lineHeight: 1.55, maxWidth: 760 }}>
                Unofficial analytical design summary for {designMd.brand_name}. Use this as a safe, generic visual-system brief for agent prompts, UI sketches, and component exploration—not as permission to copy protected assets.
              </p>
            </div>
            <div className="responsive-two-col" style={{ gap: 8 }}>
              {[
                ["SCORE", String(designMd.design_readiness_score)],
                ["GRADE", designMd.design_readiness_grade],
                ["ARCHETYPE", designMd.visual_archetype],
                ["SOURCE", designMd.source_confidence],
              ].map(([label, value]) => (
                <div key={label} style={{ border: `1px solid ${T.border}`, background: "rgba(7,7,11,0.56)", borderRadius: 6, padding: "10px 12px" }}>
                  <div style={{ color: T.textDim, fontFamily: T.mono, fontSize: 9, letterSpacing: "0.12em" }}>{label}</div>
                  <div style={{ color: label === "SCORE" ? primary : T.textBright, fontFamily: T.mono, fontSize: label === "ARCHETYPE" ? 12 : 16, fontWeight: 700, marginTop: 4 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <DesignMdPreview designMd={designMd} />
          <AgentPromptCard designMd={designMd} markdownContent={data.markdown} />
          <DesignMdViewer data={data} />
        </div>
      </div>
    </div>
  );
}

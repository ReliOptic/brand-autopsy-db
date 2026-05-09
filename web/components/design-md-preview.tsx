import type { BrandDesignMd } from "@/lib/design-md";
import { SectionLabel, T } from "@/components/ui-primitives";
import { DesignSystemScore } from "@/components/design-system-score";

export function DesignMdPreview({ designMd }: { designMd: BrandDesignMd }): JSX.Element {
  const grouped = designMd.color_palette.reduce<Record<string, typeof designMd.color_palette>>((acc, color) => {
    (acc[color.role] ??= []).push(color);
    return acc;
  }, {});
  const primary = designMd.color_palette.find((c) => c.role === "primary")?.hex ?? T.accent;
  const panel = {
    border: `1px solid ${T.border}`,
    background: "rgba(7,7,11,0.62)",
    borderRadius: 8,
    padding: 14,
  } as const;

  return (
    <section className="terminal-panel" style={{ borderRadius: 10, padding: 18, borderTop: `2px solid ${primary}` }}>
      <SectionLabel accent={primary}>PREVIEW CATALOG</SectionLabel>
      <div className="design-md-preview-grid">
        <div>
          <h3 style={{ color: T.textBright, fontSize: 14 }}>Color Swatch Grid</h3>
          {Object.entries(grouped).length ? Object.entries(grouped).map(([role, colors]) => (
            <div key={role} style={{ marginTop: 10 }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textMuted, textTransform: "uppercase" }}>{role}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8, marginTop: 6 }}>
                {colors.map((c) => <div key={c.token} style={{ ...panel, padding: 10 }}><div style={{ width: "100%", height: 54, background: c.hex, border: `1px solid ${T.border}`, borderRadius: 5, boxShadow: `0 0 24px ${c.hex}22` }} /><div style={{ fontFamily: T.mono, fontSize: 10, color: T.text, marginTop: 8 }}>{c.token}</div><div style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim }}>{c.hex}</div></div>)}
              </div>
            </div>
          )) : <p style={{ color: T.textDim }}>Color data not available.</p>}
        </div>
        <div>
          <h3 style={{ color: T.textBright, fontSize: 14 }}>Typography Scale</h3>
          <div style={{ ...panel, marginTop: 10 }}>
            <div style={{ fontSize: 34, fontWeight: 700, color: T.textBright, letterSpacing: "-0.04em", lineHeight: 1 }}>The quick brown fox</div>
            <div style={{ marginTop: 8, fontSize: 15, color: T.text }}>Brand intelligence for S&amp;P 500</div>
            <code style={{ display: "block", marginTop: 8, color: T.accentBright, fontFamily: T.mono }}>{designMd.typography_rules.mono || "Monospace technical labels"}</code>
          </div>
          <h3 style={{ color: T.textBright, fontSize: 14, marginTop: 16 }}>Component Examples</h3>
          <div style={{ ...panel, marginTop: 10 }}>
            <button style={{ background: primary, color: "white", border: 0, borderRadius: 4, padding: "8px 12px", boxShadow: `0 0 22px ${primary}44` }}>Default Button</button>
            <button disabled style={{ marginLeft: 8, background: T.border, color: T.textDim, border: 0, borderRadius: 4, padding: "8px 12px" }}>Disabled</button>
            <div style={{ marginTop: 12, border: `1px solid ${primary}55`, borderRadius: 6, background: `${primary}08`, padding: 12, color: T.text }}>Card: {designMd.component_styling.cards || "Component specs not yet available"}</div>
          </div>
        </div>
        <div>
          <h3 style={{ color: T.textBright, fontSize: 14 }}>Do / Don't</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
            <div>{designMd.dos.map((d) => <div key={d} style={{ border: `1px solid ${T.success}55`, background: `${T.success}08`, borderRadius: 5, padding: 9, marginBottom: 6, color: T.text }}>✓ {d}</div>)}</div>
            <div>{designMd.donts.map((d) => <div key={d} style={{ border: `1px solid ${T.error}55`, background: `${T.error}08`, borderRadius: 5, padding: 9, marginBottom: 6, color: T.text }}>✕ {d}</div>)}</div>
          </div>
        </div>
        <DesignSystemScore designMd={designMd} />
      </div>
    </section>
  );
}

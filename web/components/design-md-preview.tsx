import type { BrandDesignMd } from "@/lib/design-md";
import { SectionLabel, T } from "@/components/ui-primitives";
import { DesignSystemScore } from "@/components/design-system-score";

export function DesignMdPreview({ designMd }: { designMd: BrandDesignMd }): JSX.Element {
  const grouped = designMd.color_palette.reduce<Record<string, typeof designMd.color_palette>>((acc, color) => {
    (acc[color.role] ??= []).push(color);
    return acc;
  }, {});
  const primary = designMd.color_palette.find((c) => c.role === "primary")?.hex ?? T.accent;
  return (
    <section style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 6, padding: 16 }}>
      <SectionLabel accent={primary}>PREVIEW CATALOG</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 14 }}>
        <div>
          <h3 style={{ color: T.textBright, fontSize: 14 }}>Color Swatch Grid</h3>
          {Object.entries(grouped).length ? Object.entries(grouped).map(([role, colors]) => (
            <div key={role} style={{ marginTop: 10 }}>
              <div style={{ fontFamily: T.mono, fontSize: 10, color: T.textMuted, textTransform: "uppercase" }}>{role}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8, marginTop: 6 }}>
                {colors.map((c) => <div key={c.token} style={{ border: `1px solid ${T.border}`, background: T.bg, padding: 8 }}><div style={{ width: 48, height: 48, background: c.hex, border: `1px solid ${T.border}` }} /><div style={{ fontFamily: T.mono, fontSize: 10, color: T.text, marginTop: 6 }}>{c.token}</div><div style={{ fontFamily: T.mono, fontSize: 9, color: T.textDim }}>{c.hex}</div></div>)}
              </div>
            </div>
          )) : <p style={{ color: T.textDim }}>Color data not available.</p>}
        </div>
        <div>
          <h3 style={{ color: T.textBright, fontSize: 14 }}>Typography Scale</h3>
          <div style={{ border: `1px solid ${T.border}`, background: T.bg, padding: 12, marginTop: 10 }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: T.textBright }}>The quick brown fox</div>
            <div style={{ marginTop: 8, fontSize: 15, color: T.text }}>Brand intelligence for S&amp;P 500</div>
            <code style={{ display: "block", marginTop: 8, color: T.accentBright, fontFamily: T.mono }}>{designMd.typography_rules.mono || "Monospace technical labels"}</code>
          </div>
          <h3 style={{ color: T.textBright, fontSize: 14, marginTop: 16 }}>Component Examples</h3>
          <div style={{ border: `1px solid ${T.border}`, background: T.bg, padding: 12, marginTop: 10 }}>
            <button style={{ background: primary, color: "white", border: 0, borderRadius: 4, padding: "8px 12px" }}>Default Button</button>
            <button disabled style={{ marginLeft: 8, background: T.border, color: T.textDim, border: 0, borderRadius: 4, padding: "8px 12px" }}>Disabled</button>
            <div style={{ marginTop: 12, border: `1px solid ${primary}55`, padding: 12, color: T.text }}>Card: {designMd.component_styling.cards || "Component specs not yet available"}</div>
          </div>
        </div>
        <div>
          <h3 style={{ color: T.textBright, fontSize: 14 }}>Do / Don't</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
            <div>{designMd.dos.map((d) => <div key={d} style={{ border: `1px solid ${T.success}55`, padding: 8, marginBottom: 6, color: T.text }}>✓ {d}</div>)}</div>
            <div>{designMd.donts.map((d) => <div key={d} style={{ border: `1px solid ${T.error}55`, padding: 8, marginBottom: 6, color: T.text }}>✕ {d}</div>)}</div>
          </div>
        </div>
        <DesignSystemScore designMd={designMd} />
      </div>
    </section>
  );
}

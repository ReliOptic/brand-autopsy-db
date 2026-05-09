import type { BrandDesignMd } from "@/lib/design-md";
import { T } from "@/components/ui-primitives";

const MAX: Record<keyof BrandDesignMd["score_breakdown"], number> = {
  color_completeness: 20,
  typography_specificity: 15,
  component_completeness: 20,
  layout_specificity: 15,
  do_dont_clarity: 10,
  agent_prompt_usability: 10,
  source_confidence_score: 10,
};

export function DesignSystemScore({ designMd }: { designMd: BrandDesignMd }): JSX.Element {
  return (
    <div style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 4, padding: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <strong style={{ color: T.textBright }}>Design Readiness: {designMd.design_readiness_score}</strong>
        <span style={{ color: T.accentBright, fontFamily: T.mono }}>{designMd.design_readiness_grade}</span>
      </div>
      {Object.entries(designMd.score_breakdown).map(([key, value]) => {
        const max = MAX[key as keyof typeof MAX] ?? 10;
        return (
          <div key={key} style={{ display: "grid", gridTemplateColumns: "170px 1fr 48px", gap: 8, alignItems: "center", marginTop: 6, fontFamily: T.mono, fontSize: 10 }}>
            <span style={{ color: T.textMuted }}>{key.replace(/_/g, " ")}</span>
            <span style={{ height: 10, background: T.border, display: "block" }}><span style={{ display: "block", height: "100%", width: `${Math.min(100, (value / max) * 100)}%`, background: T.accent }} /></span>
            <span style={{ color: T.text }}>{value}/{max}</span>
          </div>
        );
      })}
    </div>
  );
}

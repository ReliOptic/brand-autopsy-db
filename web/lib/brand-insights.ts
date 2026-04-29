import type { BrandDetail } from "@/lib/api";

export const ARCHETYPE_TRAITS: Record<string, string> = {
  "Sage": "knowledge-authority, expertise-led",
  "Ruler": "control, premium positioning, institutional trust",
  "Creator": "innovation, originality, craftsmanship",
  "Explorer": "freedom, discovery, authentic experience",
  "Hero": "courage, transformation, achievement",
  "Outlaw": "disruption, rebellion, counter-culture",
  "Magician": "transformation, vision, making dreams real",
  "Innocent": "optimism, simplicity, wholesome",
  "Everyman": "belonging, accessibility, down-to-earth",
  "Lover": "passion, intimacy, sensory pleasure",
  "Jester": "joy, humor, lightness",
  "Caregiver": "nurturing, protection, service",
};

export function archetypeInsight(a: string, b: string): string {
  const traitA = ARCHETYPE_TRAITS[a] ?? "undefined archetype";
  const traitB = ARCHETYPE_TRAITS[b] ?? "undefined archetype";
  if (a === b) {
    return `Both brands share the ${a} archetype (${traitA}), competing on execution rather than positioning differentiation.`;
  }
  return `${a} (${traitA}) vs ${b} (${traitB}) — fundamentally different brand strategies suggest complementary market positions or direct repositioning competition.`;
}

export function voiceDeltaInsight(a: BrandDetail, b: BrandDetail): string[] {
  if (!a.voice_matrix || !b.voice_matrix) return [];
  const insights: string[] = [];
  const axes = [
    { key: "formal_casual" as const, label: "Formal↔Casual", low: "more formal", high: "more casual" },
    { key: "authority_peer" as const, label: "Authority↔Peer", low: "more authoritative", high: "more peer-like" },
    { key: "emotional_rational" as const, label: "Emotional↔Rational", low: "more emotional", high: "more rational" },
    { key: "restrained_bold" as const, label: "Restrained↔Bold", low: "more restrained", high: "more bold" },
  ];
  for (const axis of axes) {
    const va = a.voice_matrix[axis.key] ?? 5;
    const vb = b.voice_matrix[axis.key] ?? 5;
    const delta = Math.abs(va - vb);
    if (delta >= 3) {
      const leader = va > vb ? a.ticker : b.ticker;
      const direction = va > vb ? axis.high : axis.low;
      insights.push(`${leader} is significantly ${direction} on ${axis.label} (Δ${delta})`);
    }
  }
  return insights;
}

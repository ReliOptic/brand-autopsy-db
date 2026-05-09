import type { BrandDesignMd } from "@/lib/design-md";

export type PromptType = "landing" | "dashboard" | "brief" | "components" | "marketing";

const PREFIX: Record<PromptType, string> = {
  landing: "Build a landing page that translates this public-facing visual system into a generic, non-infringing web experience.",
  dashboard: "Create a data dashboard that follows this visual system's density, color roles, typography hierarchy, and component rules.",
  brief: "Generate a brand brief document using this design language while preserving legal and source-confidence cautions.",
  components: "Build a component library with buttons, cards, navigation, inputs, charts, and usage notes derived from this visual system.",
  marketing: "Design a marketing page that uses the documented atmosphere, layout principles, and do/don't rules without copying protected assets.",
};

export function generateAgentPrompt(
  type: PromptType,
  designMd: BrandDesignMd,
  markdownContent: string,
): string {
  return `${PREFIX[type]}\n\nUse the DESIGN.md below as the visual system for ${designMd.brand_name} (${designMd.ticker}). ${designMd.agent_prompt_guide}\n\nDo not copy logos, trademarks, proprietary product UI, protected trade dress, packaging, or copyrighted marketing copy. Use only generic layout patterns and the documented public-facing visual language.\n\nIncludes: DESIGN.md + visual system + do/don't rules.\n\n${markdownContent}`;
}

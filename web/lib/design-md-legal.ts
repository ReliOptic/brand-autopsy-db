export type LitigationRisk = "HIGH" | "MEDIUM" | "LOW";

export const LEGAL_NOTICE_BOILERPLATE = `This Brand Autopsy design-md artifact is an informational design analysis generated from publicly observable brand signals and internal scoring rules. It is not a brand guideline issued by the company, does not imply endorsement, affiliation, or authorization, and must not be treated as legal advice. All trademarks, logos, product names, and trade dress remain the property of their respective owners. Use the output as a creative reference only, and verify any production use against applicable trademark, copyright, advertising, and platform policies.`;

export const LEGAL_NOTICE_ADDENDUM_HIGH_RISK = `⚠️ Brand-Specific Risk Note: This brand has elevated litigation or trademark-enforcement risk. Avoid close imitation of protected logos, product interfaces, proprietary trade dress, distinctive packaging, advertising layouts, or other source-identifying assets. Route any production design inspired by this analysis through legal review before publication.`;

export function buildLegalNotice(litigationRisk: LitigationRisk): {
  legal_notice: string;
  legal_notice_addendum?: string;
} {
  if (litigationRisk === "HIGH") {
    return {
      legal_notice: LEGAL_NOTICE_BOILERPLATE,
      legal_notice_addendum: LEGAL_NOTICE_ADDENDUM_HIGH_RISK,
    };
  }

  return { legal_notice: LEGAL_NOTICE_BOILERPLATE };
}

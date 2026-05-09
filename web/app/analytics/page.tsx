import { fetchArchetypes, fetchBrands, fetchDesignSystemAnalytics, fetchSectors } from "@/lib/api";
import type { ArchetypeDistribution, BrandSummary, DesignSystemAnalytics, SectorStats } from "@/lib/api";
import { AnalyticsClient } from "./analytics-client";
import { T } from "@/components/ui-primitives";
import { Navigation } from "@/components/navigation";

export const metadata = {
  title: "S&P 500 Brand Strategy Pattern Analysis",
};

export default async function AnalyticsPage(): Promise<JSX.Element> {
  let archetypes: ArchetypeDistribution | null = null;
  let sectors: SectorStats | null = null;
  let brands: BrandSummary[] = [];
  let designSystems: DesignSystemAnalytics | null = null;
  try {
    const [a, s, b, ds] = await Promise.all([
      fetchArchetypes(),
      fetchSectors(),
      fetchBrands({ limit: 1000 }),
      fetchDesignSystemAnalytics(),
    ]);
    archetypes = a;
    sectors = s;
    brands = b.brands;
    designSystems = ds;
  } catch {
    // API may be offline
  }

  if (!archetypes || !sectors) {
    return (
      <div
        style={{
          background: T.bg,
          color: T.text,
          fontFamily: T.sans,
          minHeight: "100vh",
        }}
      >
        <Navigation />
        <div
          style={{
            padding: "60px 28px",
            textAlign: "center",
            color: T.textMuted,
            fontFamily: T.mono,
            fontSize: 12,
            letterSpacing: "0.06em",
          }}
        >
          ANALYTICS API UNAVAILABLE · START THE BACKEND SERVER
        </div>
      </div>
    );
  }

  return (
    <AnalyticsClient
      brands={brands}
      archetypes={archetypes}
      sectors={sectors}
      designSystems={designSystems}
    />
  );
}

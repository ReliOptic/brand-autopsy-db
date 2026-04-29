import { fetchBrands, fetchHealth } from "@/lib/api";
import type { BrandSummary } from "@/lib/api";
import { DashboardClient } from "../dashboard-client";

interface DashboardPageProps {
  searchParams: Promise<{ q?: string; sector?: string; archetype?: string; view?: string }>;
}

interface FetchResult {
  brands: BrandSummary[];
  total: number;
}

async function safeFetchBrands(): Promise<FetchResult> {
  try {
    const data = await fetchBrands({ limit: 1000 });
    return { brands: data.brands, total: data.total };
  } catch {
    return { brands: [], total: 0 };
  }
}

async function safeFetchHealth(): Promise<number> {
  try {
    const h = await fetchHealth();
    return h.brands_count;
  } catch {
    return 0;
  }
}

export default async function DashboardPage({ searchParams }: DashboardPageProps): Promise<JSX.Element> {
  const params = await searchParams;
  const [{ brands, total }, healthCount] = await Promise.all([
    safeFetchBrands(),
    safeFetchHealth(),
  ]);

  return (
    <DashboardClient
      brands={brands}
      totalBrands={total || healthCount || brands.length}
      initialQ={params.q ?? ""}
      initialSector={params.sector ?? ""}
      initialArchetype={params.archetype ?? ""}
      initialView={params.view ?? "hybrid"}
    />
  );
}

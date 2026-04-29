import { Suspense } from "react";
import { fetchBrands } from "@/lib/api";
import type { BrandSummary } from "@/lib/api";
import { CompareContent } from "./compare-content";
import Loading from "./loading";

export default async function ComparePage(): Promise<JSX.Element> {
  let brands: BrandSummary[] = [];
  try {
    const data = await fetchBrands({ limit: 1000 });
    brands = data.brands;
  } catch {
    // API may be offline — render with empty list
  }

  return (
    <Suspense fallback={<Loading />}>
      <CompareContent brands={brands} />
    </Suspense>
  );
}

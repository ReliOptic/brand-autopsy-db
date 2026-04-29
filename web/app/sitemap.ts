import type { MetadataRoute } from "next";
import { fetchBrands } from "@/lib/api";
import { publicEnv } from "@/config/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = publicEnv.siteUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/dashboard`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/compare`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/analytics`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/waitlist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  try {
    const { brands } = await fetchBrands({ limit: 1000 });
    const brandRoutes: MetadataRoute.Sitemap = brands.map((b) => ({
      url: `${BASE_URL}/brands/${b.ticker}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));
    return [...staticRoutes, ...brandRoutes];
  } catch {
    return staticRoutes;
  }
}

import type { MetadataRoute } from "next";
import { publicEnv } from "@/config/env";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = publicEnv.siteUrl;
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/brands/", "/dashboard", "/compare", "/analytics", "/about", "/waitlist"],
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

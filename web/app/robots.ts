import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bautopsy.com";
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

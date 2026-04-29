import type { MetadataRoute } from "next";
import { seoDefaults } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${seoDefaults.siteUrl}/sitemap.xml`,
  };
}

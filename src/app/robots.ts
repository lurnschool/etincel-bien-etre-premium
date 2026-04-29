import type { MetadataRoute } from "next";
import { seoDefaults } from "@/lib/data";

export const dynamic = "force-static";

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

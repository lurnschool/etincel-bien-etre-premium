import type { MetadataRoute } from "next";
import { accompagnementsIndividuels, seoDefaults } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = seoDefaults.siteUrl;
  const now = new Date();

  const staticRoutes = [
    "",
    "/a-propos",
    "/accompagnements",
    "/collectif",
    "/innerdance",
    "/feminin-sacre",
    "/cercles-de-femmes",
    "/retraites",
    "/formations",
    "/cartes-cadeaux",
    "/evenements",
    "/diagnostic",
    "/contact",
    "/mentions-legales",
    "/politique-confidentialite",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const accompagnementsEntries: MetadataRoute.Sitemap = accompagnementsIndividuels.map((a) => ({
    url: `${base}/accompagnements/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...accompagnementsEntries];
}

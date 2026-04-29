import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = "etincel-bien-etre-premium";
const basePath = isGitHubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  // Static export uniquement pour GitHub Pages.
  // Sur Vercel / en dev local, on garde le runtime serveur pour activer
  // les API routes (notamment /api/ai-chat qui appelle Anthropic).
  ...(isGitHubPages && { output: "export" as const }),
  images: { unoptimized: true },
  basePath,
  assetPrefix: isGitHubPages ? `/${repoName}/` : "",
  trailingSlash: true,
  // En mode GitHub Pages on n'embarque que les `page.tsx` — les fichiers
  // `route.ts` (API handlers, qui requièrent un runtime Node) sont exclus.
  pageExtensions: isGitHubPages ? ["tsx"] : ["tsx", "ts"],
  // Expose basePath aux composants client pour préfixer les /public/...
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

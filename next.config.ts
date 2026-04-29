import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = "etincel-bien-etre-premium";

const nextConfig: NextConfig = {
  // Static export pour GitHub Pages
  output: "export",
  // GitHub Pages ne gère pas l'optimization image Next.js
  images: { unoptimized: true },
  // basePath quand servi sur lurnschool.github.io/<repoName>
  basePath: isGitHubPages ? `/${repoName}` : "",
  assetPrefix: isGitHubPages ? `/${repoName}/` : "",
  trailingSlash: true,
};

export default nextConfig;

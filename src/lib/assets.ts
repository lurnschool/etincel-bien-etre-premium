/**
 * Préfixe un chemin /public avec le basePath quand on est sur GitHub Pages.
 * Inutile en local (BASE_PATH = "") mais nécessaire pour /etincel-bien-etre-premium/.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  if (path.startsWith("//") || path.startsWith("http")) return path;
  return `${BASE_PATH}${path}`;
}

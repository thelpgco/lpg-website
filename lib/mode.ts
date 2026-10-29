/**
 * Site data mode: demo (management inspection) vs production (public claims).
 *
 * Set NEXT_PUBLIC_SITE_MODE=demo | production (default production).
 * Demo fixtures live under data/demo/. Production-safe records under data/production/.
 * Never import demo JSON into production-only claim surfaces without isDemo().
 */

export type SiteMode = "demo" | "production";

export function siteMode(): SiteMode {
  const raw = (process.env.NEXT_PUBLIC_SITE_MODE || "production").toLowerCase().trim();
  return raw === "demo" ? "demo" : "production";
}

export function isDemo(): boolean {
  return siteMode() === "demo";
}

export function isProduction(): boolean {
  return siteMode() === "production";
}

/** Banner copy for management review builds only. */
export function demoBannerText(): string | null {
  if (!isDemo()) return null;
  return "Management demonstration mode — sample catalogues, projects and figures are labelled DEMO and are not public company claims.";
}

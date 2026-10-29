import network from "@/data/network.json";
import overridesRaw from "@/data/city-overrides.json";

export type NetworkCity = {
  slug: string;
  name: string;
  province: string;
  popTier: string;
  suppliers: number;
  autoLpg: number;
  localities: string[];
  open24h: number;
  hub: boolean;
};

export type CityOverride = {
  indexable?: boolean;
  verifiedOn?: string;
  testOrderMinutes?: number;
  localNotes?: string[];
  deliveryNote?: string;
};

export type Province = { name: string; code: string; suppliers: number; autoLpg: number; cities: string[] };

const overrides = overridesRaw as unknown as Record<string, CityOverride>;

export const totals = network.totals;
export const networkSource = network.source;
export const networkDate = network.generatedAt;
export const allCities = network.cities as NetworkCity[];
export const provinces = network.provinces as unknown as Record<string, Province>;

export const hubCities = allCities.filter((c) => c.hub);
export const cityBySlug = (slug: string) => allCities.find((c) => c.slug === slug);
export const provinceBySlug = (slug: string) => (provinces[slug] ? { slug, ...provinces[slug] } : undefined);
export const provinceList = Object.entries(provinces)
  .filter(([slug]) => slug !== "islamabad")
  .map(([slug, p]) => ({ slug, ...p }));

export function overrideFor(slug: string): CityOverride {
  const o = overrides[slug];
  return o && typeof o === "object" ? o : {};
}

// A city hub is only indexable once the owner has verified it (Gate L). Everything else is noindex and
// stays out of the sitemap. Users can still open the page and send a request.
export const isCityIndexable = (slug: string) => overrideFor(slug).indexable === true;

/**
 * Cities with a dedicated `app/lpg-in-{slug}/page.tsx` (CityHubStatic).
 * Keep these out of the dynamic `lpg-hub/[slug]` params so filesystem routes own the URL
 * (next.config rewrite only fills gaps for provinces / hubs without a static page).
 */
export const staticCityHubSlugs = [
  "karachi",
  "lahore",
  "islamabad",
  "rawalpindi",
  "faisalabad",
  "peshawar",
  "hyderabad",
  "quetta",
  "multan",
  "gujranwala",
  "murree",
  "muzaffarabad",
  "skardu",
  "gilgit",
  "abbottabad",
] as const;

const staticCityHubSet = new Set<string>(staticCityHubSlugs);

// Dynamic hub params: network hub cities without a static page + province hubs.
export const hubSlugs = [
  ...hubCities.map((c) => c.slug).filter((slug) => !staticCityHubSet.has(slug)),
  ...provinceList.map((p) => p.slug),
];

// Cities shown in the lead form: every city that has a listed partner, plus "other".
export const formCities = [...allCities].sort((a, b) => a.name.localeCompare(b.name));

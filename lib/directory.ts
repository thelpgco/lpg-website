/**
 * LPG supplier / distributor directory for public pages.
 * Internal source files stay in docs/data only — never name them in UI copy.
 */
import byCityRaw from "@/data/directory/by-city.json";
import marketersRaw from "@/data/directory/marketers.json";
import summaryRaw from "@/data/directory/summary.json";

export type ListingTier = "owner_network" | "market_listing" | "national_register";

/** How we group rows for on-page sections. */
export type DisplayBucket = "network_dealers" | "research";

export type DirectoryListing = {
  id: string;
  name: string;
  tier: ListingTier;
  city: string;
  citySlug?: string;
  province: string;
  locality: string;
  address: string;
  phone: string;
  marketer: string;
  role: string;
};

export type DirectorySummary = typeof summaryRaw;

const byCity = byCityRaw as Record<string, DirectoryListing[]>;
const marketers = (marketersRaw as { rows: { company: string; city: string; citySlug: string; province: string; licenceNote: string }[] }).rows;

export const directorySummary = summaryRaw as DirectorySummary;

/** Customer-facing blurbs only — no file names or internal meta. */
export const disclosure = {
  network_dealers: "Dealers and agencies in our active supply network for this area.",
  research: "Additional local distributors listed for this city.",
  owner_network: "Dealers and agencies in our active supply network for this area.",
  market_listing: "Dealers and agencies in our active supply network for this area.",
  national_register: "Additional local distributors listed for this city.",
};

const BUCKET_LABEL: Record<DisplayBucket, string> = {
  network_dealers: "Our network dealers",
  research: "Local distributors",
};

export function displayBucket(tier: ListingTier): DisplayBucket {
  return tier === "national_register" ? "research" : "network_dealers";
}

export function bucketLabel(bucket: DisplayBucket): string {
  return BUCKET_LABEL[bucket];
}

/** @deprecated Prefer bucketLabel — kept for older call sites. */
export function tierLabel(tier: ListingTier): string {
  return bucketLabel(displayBucket(tier));
}

export function listingsForCity(citySlug: string): DirectoryListing[] {
  return byCity[citySlug] ?? [];
}

/** Province names as they appear in the directory and marketer files, keyed by the province hub slug. */
const PROVINCE_ALIASES: Record<string, string[]> = {
  punjab: ["Punjab"],
  sindh: ["Sindh"],
  "khyber-pakhtunkhwa": ["KPK", "Khyber Pakhtunkhwa", "KP"],
  balochistan: ["Balochistan"],
  "gilgit-baltistan": ["Gilgit Baltistan", "Gilgit-Baltistan"],
  "azad-kashmir": ["AJK", "Azad Jammu & Kashmir"],
};
const NOT_A_TOWN = new Set(["unknown", "ajk", "azad"]);
const titleCase = (t: string) => t.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

/** Directory roll-up for a province hub: counts, towns by listings, and licensed marketer plants. */
export function provinceDirectory(provinceSlug: string) {
  const names = new Set(PROVINCE_ALIASES[provinceSlug] ?? []);
  const rows = Object.entries(byCity).flatMap(([slug, list]) =>
    list.filter((x) => names.has(x.province)).map((x) => ({ slug, x })),
  );
  const items = rows.map((r) => r.x);
  const towns = new Map<string, { slug: string; name: string; count: number }>();
  for (const { slug, x } of rows) {
    if (NOT_A_TOWN.has(slug)) continue;
    const t = towns.get(slug) ?? { slug, name: titleCase(x.city), count: 0 };
    t.count += 1;
    towns.set(slug, t);
  }
  const plants = marketers.filter((m) => names.has(m.province));
  return {
    total: items.length,
    dealers: items.filter((x) => displayBucket(x.tier) === "network_dealers").length,
    research: items.filter((x) => displayBucket(x.tier) === "research").length,
    fillingPoints: items.filter((x) => x.role === "lpg_filling_point").length,
    towns: [...towns.values()].sort((a, b) => b.count - a.count),
    plants,
    plantCompanies: [...new Set(plants.map((p) => p.company))],
  };
}

/** Per-city count shown anywhere on the site: the directory the city page lists, else the network roll-up. */
export function listedCount(citySlug: string, fallback = 0): number {
  return listingsForCity(citySlug).length || fallback;
}

export function cityDirectoryStats(citySlug: string) {
  const items = listingsForCity(citySlug);
  const dealers = items.filter((x) => displayBucket(x.tier) === "network_dealers").length;
  const research = items.filter((x) => displayBucket(x.tier) === "research").length;
  return {
    total: items.length,
    dealers,
    research,
    /** aliases used by older pages */
    owner: items.filter((x) => x.tier === "owner_network").length,
    market: items.filter((x) => x.tier === "market_listing").length,
    register: research,
  };
}

/** Names for FAQs / short copy: network dealers first, then research. */
export function namedSuppliersForCity(citySlug: string, limit = 8): DirectoryListing[] {
  const items = listingsForCity(citySlug);
  const order: ListingTier[] = ["owner_network", "market_listing", "national_register"];
  const out: DirectoryListing[] = [];
  for (const t of order) {
    for (const row of items.filter((x) => x.tier === t)) {
      out.push(row);
      if (out.length >= limit) return out;
    }
  }
  return out;
}

export function topCitiesByListings(limit = 12): { slug: string; count: number; name: string }[] {
  return (directorySummary.topCities as [string, number][])
    .slice(0, limit)
    .map(([slug, count]) => {
      const sample = listingsForCity(slug)[0];
      return { slug, count, name: sample?.city || slug.replace(/-/g, " ") };
    });
}

export function ownerNetworkSample(limit = 24): DirectoryListing[] {
  const out: DirectoryListing[] = [];
  for (const slug of Object.keys(byCity).sort()) {
    for (const row of byCity[slug]) {
      if (displayBucket(row.tier) !== "network_dealers") continue;
      out.push({ ...row, citySlug: slug });
      if (out.length >= limit) return out;
    }
  }
  return out;
}

export function marketersForCity(citySlug: string, limit = 12) {
  return marketers.filter((m) => m.citySlug === citySlug).slice(0, limit);
}

export function marketerSample(limit = 20) {
  const seen = new Set<string>();
  const out: { company: string; city: string; province: string }[] = [];
  for (const m of marketers) {
    const key = m.company.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ company: m.company, city: m.city, province: m.province });
    if (out.length >= limit) break;
  }
  return out;
}

export function formatPhoneDisplay(phone: string): string {
  if (!phone) return "";
  if (phone.startsWith("+92") && phone.length >= 12) {
    const rest = phone.slice(3);
    return `0${rest.slice(0, 3)} ${rest.slice(3)}`;
  }
  return phone;
}

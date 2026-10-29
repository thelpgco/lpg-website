import type { MetadataRoute } from "next";
import { isCityIndexable, provinceBySlug } from "@/lib/network";
import { builtPaths, isPublished, lastmodOf } from "@/lib/pages";
import { latestPrice, priceReady } from "@/lib/prices";
import { servicesIndexable } from "@/lib/services";
import { absoluteUrl } from "@/lib/site";

// A URL is listed only if (1) the page is "published" in data/pages.json AND (2) its data gate is open.
// This is the same rule the page's robots meta uses, so the sitemap and the pages cannot disagree.
// `priority` is omitted on purpose (Google ignores it). `lastModified` is only emitted when a person set a real
// `lastmod` for the page in data/pages.json; a build timestamp would be a false freshness signal.
function dataGateOpen(path: string): boolean {
  if (path.startsWith("/lpg-price-in-pakistan/") && path !== "/lpg-price-in-pakistan/") {
    return Boolean(latestPrice?.cities?.[path.split("/")[2]]);
  }
  if (["/lpg-price-in-pakistan/", "/lpg-price-per-kg-in-pakistan/", "/ogra-lpg-notified-price/", "/lpg-cylinder-price-in-pakistan/"].includes(path)) {
    return priceReady;
  }
  if (path.startsWith("/lpg-in-")) {
    const slug = path.replace("/lpg-in-", "").replace(/\/$/, "");
    if (provinceBySlug(slug)) return true; // province hubs: the pages.json status is the gate
    return isCityIndexable(slug); // false for cities without a verification record
  }
  if (path === "/services/" || path.startsWith("/services/")) return servicesIndexable;
  return true;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return builtPaths()
    .filter((p) => isPublished(p) && dataGateOpen(p))
    .sort()
    .map((p) => {
      const lm = lastmodOf(p);
      return { url: absoluteUrl(p), ...(lm ? { lastModified: new Date(lm) } : {}) };
    });
}

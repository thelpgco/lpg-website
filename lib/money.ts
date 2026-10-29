import type { Metadata } from "next";
import { cylinderPrice, latestPrice, notifications, perKgFor, pkr, priceReady, type PriceNotification } from "@/lib/prices";
import { fitDescription, fitTitle, meta } from "@/lib/seo";

/** Shared helpers for the money / price cluster (flagship, per-kg, cylinder price, OGRA, history). */

const parseMonth = (month: string) => new Date(`${month}-01T00:00:00`);

export const monthLong = (month: string) => parseMonth(month).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
const SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const monthShort = (month: string) => {
  const d = parseMonth(month);
  return `${SHORT[d.getMonth()]} ${d.getFullYear()}`;
};

const round2 = (n: number) => Math.round(n * 100) / 100;

export type Mom = {
  from: PriceNotification;
  to: PriceNotification;
  delta: number;
  pct: number;
  direction: "up" | "down" | "unchanged";
};

/** Latest month against the month before it (undefined until two checked months are on file). */
export function momChange(): Mom | undefined {
  const [to, from] = notifications;
  if (!to || !from) return undefined;
  const delta = round2(to.perKgPkr - from.perKgPkr);
  const pct = (delta / from.perKgPkr) * 100;
  return { from, to, delta, pct, direction: delta > 0 ? "up" : delta < 0 ? "down" : "unchanged" };
}

export const signedPct = (pct: number) => `${pct >= 0 ? "+" : "-"}${Math.abs(pct).toFixed(1)}%`;
export const absPct = (pct: number) => `${Math.abs(pct).toFixed(1)}%`;
export const absPkr = (n: number) => pkr(Math.abs(round2(n)));
export const signedPkr = (n: number) => `${n >= 0 ? "+" : "-"}${pkr(Math.abs(round2(n)))}`;

export const verb = (m: Mom) => (m.direction === "up" ? "up" : m.direction === "down" ? "down" : "unchanged");

/** Cylinder gas cost for a given notification (not only the latest). */
export const gasFor = (n: PriceNotification, kg: number) => Math.round(n.perKgPkr * kg);

/** Short sentence used in intros: "Rs 3,296 for an 11.8 kg cylinder". */
export function domesticCylinderGas(): string | undefined {
  const v = cylinderPrice(11.8);
  return v != null ? pkr(v) : undefined;
}

export const perKgText = (): string | undefined => {
  const v = perKgFor();
  return v != null ? pkr(v) : undefined;
};

/**
 * Metadata for money pages. Titles and descriptions carry the live figure; lengths are fitted to 50-60 / 140-160 and
 * fall back to data/meta.json when no verified price is on file.
 */
export function priceMeta(path: string, titles: (n: PriceNotification) => string[], descriptions: (n: PriceNotification) => string[]): Metadata {
  if (!latestPrice) return meta({ path, index: false });
  return meta({
    path,
    index: priceReady,
    title: fitTitle(titles(latestPrice)),
    description: fitDescription(descriptions(latestPrice)),
  });
}

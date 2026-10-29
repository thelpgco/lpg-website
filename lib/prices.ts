import raw from "@/data/prices.json";

export type PriceNotification = {
  month: string;
  effectiveFrom: string;
  perKgPkr: number;
  sourceUrl: string;
  sourceNote?: string;
  verifiedBy: string;
  verifiedOn: string;
  cities?: Record<string, number>;
};

const list = ((raw as { notifications?: PriceNotification[] }).notifications || [])
  .filter((n) => n && typeof n.perKgPkr === "number" && n.perKgPkr > 0 && n.verifiedOn)
  .sort((a, b) => b.effectiveFrom.localeCompare(a.effectiveFrom));

export const notifications = list;
export const latestPrice: PriceNotification | undefined = list[0];

// Pages that show prices stay noindex until a verified notification exists (no empty or guessed numbers).
export const priceReady = Boolean(latestPrice);

export const CYLINDER_SIZES_KG = [5, 11.8, 15, 45.4] as const;

export const perKgFor = (citySlug?: string): number | undefined =>
  latestPrice ? (citySlug && latestPrice.cities?.[citySlug]) || latestPrice.perKgPkr : undefined;

export const cylinderPrice = (kg: number, citySlug?: string): number | undefined => {
  const p = perKgFor(citySlug);
  return p ? Math.round(p * kg) : undefined;
};

export const pkr = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;

export const fmtDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

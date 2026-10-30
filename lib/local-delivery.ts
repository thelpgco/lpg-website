// Twin-city delivery facts written as plain, quotable statements for the Islamabad and Rawalpindi pages, the home
// delivery page and /llms.txt. One source so the answer blocks, FAQ, schema and llms.txt never disagree.
// Areas: owner-confirmed lists (30 Oct 2026) in data/service-areas.json, generated from docs/content-plan/service-areas/.
// Each area is in one city only. `areas` below is the short headline list for the fact block, FAQ and schema; every
// name in it is in the full list. Outlying tehsils are flagged there, and the one-hour target is never promised for them.

import serviceAreasRaw from "@/data/service-areas.json";
import { overrideFor } from "./network";
import { CYLINDER_SIZES_KG, cylinderPrice, fmtDate, latestPrice, pkr } from "./prices";
import { site } from "./site";

export type AreaGroup = { name: string; outlying: boolean; areas: string[] };
type CityAreas = { count: number; groups: AreaGroup[] };
const serviceAreas = serviceAreasRaw as unknown as Record<string, CityAreas>;

/** Full confirmed area list for a city, grouped for display. */
export function areaGroups(slug: string): CityAreas | undefined {
  return serviceAreas[slug];
}

/** "Gujar Khan / Daultala, Kallar Syedan and Taxila / Wah": far tehsils where only the order window is confirmed. */
export function outlyingText(slug: string): string | null {
  const names = (serviceAreas[slug]?.groups ?? []).filter((g) => g.outlying).map((g) => g.name);
  if (!names.length) return null;
  return names.length === 1 ? names[0] : `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export type LocalDelivery = {
  slug: string;
  name: string;
  /** Sectors, towns and societies we take delivery orders from. */
  areas: string[];
  /** The part of the city nearest the G-12 office, where the one-hour target is most reliable. */
  nearest: string;
};

export const localDelivery: Record<string, LocalDelivery> = {
  islamabad: {
    slug: "islamabad",
    name: "Islamabad",
    areas: [
      "G-6 to G-15 (including G-9, G-10, G-11, G-13 and G-14)",
      "F-6, F-7, F-8, F-10, F-11 and F-15",
      "E-7, E-11, D-12 and the Blue Area",
      "I-8, I-9, I-10, I-11, I-14 and I-16",
      "H-8, H-9, H-11 and H-13",
      "DHA Islamabad Phase 1 to 7 and DHA Valley",
      "Bahria Enclave, Park View City and Nova City",
      "B-17 and Multi Gardens",
      "Gulberg Greens and Gulberg Residencia",
      "PWD Housing Scheme, Police Foundation, Jinnah Garden and Soan Garden",
      "Bani Gala, Chak Shahzad, Bhara Kahu, Tarnol, Koral and Ghauri Town",
    ],
    nearest: "G-11, G-12, G-13, G-14, F-11 and E-11, around our Sector G-12 office",
  },
  rawalpindi: {
    slug: "rawalpindi",
    name: "Rawalpindi",
    areas: [
      "Saddar, Raja Bazaar, Lalazar and Dhok Kala Khan",
      "Satellite Town and Westridge",
      "Chaklala Scheme 1 to 3, Gulraiz and Airport Housing Society",
      "Askari 1 to 4, 7 and 10 to 14",
      "Bahria Town Phase 1 to 9",
      "Murree Road, Peshawar Road, Adiala Road and Rawat",
      "Capital Smart City and Blue World City",
      "Taxila, Gujar Khan, Kallar Syedan and Kahuta (delivery window confirmed per order)",
    ],
    nearest: "Bahria Town, Gulraiz, Chaklala and the Peshawar Road belt, on the Islamabad side of the city",
  },
};

export const PAYMENT_TEXT =
  "Cash on delivery for home refills. Any other method (for example bank transfer for commercial accounts) is agreed for that order before dispatch.";

export const HOURS_TEXT = "Orders by phone, WhatsApp and the website are taken 24 hours a day, 7 days a week.";

export function deliveryTimeText(slug: string): string {
  const o = overrideFor(slug);
  const mins = o.testOrderMinutes;
  const name = localDelivery[slug]?.name ?? slug;
  if (typeof mins === "number" && mins <= 60) {
    return `Target about ${mins} minutes (one hour) in covered ${name} areas when a local team is available${
      o.verifiedOn ? ` (set from our team's test order on ${fmtDate(o.verifiedOn)})` : ""
    }. At night, in bad weather or in outlying areas it can take longer, and we tell you the window before you agree.${
      outlyingText(slug) ? ` In ${outlyingText(slug)} the one-hour target does not apply: we confirm the delivery day and time when you order.` : ""
    }`;
  }
  return `Delivery time in ${name} depends on your area and the time of day; we tell you the window before you agree.`;
}

/** "5 kg Rs 1,397 · 11.8 kg Rs 3,296 ..." for the current OGRA month, or null before a price is entered. */
export function priceLine(): string | null {
  if (!latestPrice) return null;
  const sizes = CYLINDER_SIZES_KG.map((kg) => `${kg} kg ${pkr(cylinderPrice(kg)!)}`).join(", ");
  return `${pkr(latestPrice.perKgPkr)} per kg, OGRA-notified, effective ${fmtDate(latestPrice.effectiveFrom)}. Gas price by cylinder: ${sizes}. A cylinder deposit (new cylinder) and the delivery charge for your street are confirmed before you agree.`;
}

export function whoDeliversText(): string {
  return `${site.name} (OGRA licence ${site.licenceNumber}), from its office at ${site.office.line1}, Islamabad, with its twin-city distributor team. Call or WhatsApp ${site.phoneDisplay}.`;
}

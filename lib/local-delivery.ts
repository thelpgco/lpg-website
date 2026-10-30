// Twin-city delivery facts written as plain, quotable statements for the Islamabad and Rawalpindi pages, the home
// delivery page and /llms.txt. One source so the answer blocks, FAQ, schema and llms.txt never disagree.
// Area lists: owner to confirm (docs/content-plan/OWNER_TODO.md, "Facts to confirm"). Remove an area rather than
// keep one we do not reach.

import { overrideFor } from "./network";
import { CYLINDER_SIZES_KG, cylinderPrice, fmtDate, latestPrice, pkr } from "./prices";
import { site } from "./site";

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
      "F-6, F-7, F-8, F-10 and F-11",
      "E-7, E-11 and D-12",
      "I-8, I-9, I-10, I-11, I-14 and I-16",
      "H-8, H-9, H-11 and H-13",
      "B-17 and Multi Gardens",
      "Bahria Town, Bahria Enclave and DHA Phase 1 and 2",
      "Gulberg Greens and Gulberg Residencia",
      "PWD, Police Foundation, Jinnah Garden and Soan Garden",
      "Tarnol, Koral, Ghauri Town and Bhara Kahu",
    ],
    nearest: "G-11, G-12, G-13, G-14, F-11 and E-11, around our Sector G-12 office",
  },
  rawalpindi: {
    slug: "rawalpindi",
    name: "Rawalpindi",
    areas: [
      "Saddar, Raja Bazaar and Commercial Market",
      "Satellite Town and Westridge",
      "Chaklala Scheme III and Askari housing",
      "Bahria Town Phase 1 to 8",
      "DHA Phase 1 and 2",
      "Gulraiz, PWD and Airport Housing Society",
      "Adiala Road, Peshawar Road and Dhok Kala Khan",
    ],
    nearest: "areas on the Islamabad side, such as PWD, Bahria Town and the Peshawar Road belt",
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
    }. At night, in bad weather or in outlying areas it can take longer, and we tell you the window before you agree.`;
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

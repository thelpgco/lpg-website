// Topic hubs for /guides/ and /tools/: every guide and tool is linked from one index page, grouped by topic, so
// crawlers find each page within two clicks of the home page and see the topical clusters. Only published pages
// are listed; labels and blurbs come from data/meta.json so they match each page's own title and description.

import metaRaw from "@/data/meta.json";
import { isPublished } from "./pages";

const meta = metaRaw as Record<string, { title: string; description: string }>;

export type HubItem = { href: string; label: string; blurb: string };
export type HubGroup = { title: string; items: HubItem[] };

/** Strip the brand suffix and keep the part before a colon or pipe as the link label. */
function labelFor(href: string): string {
  const t = meta[href]?.title ?? href;
  return t.split(" | ")[0].trim();
}

function items(hrefs: string[]): HubItem[] {
  return hrefs.filter(isPublished).map((href) => ({ href, label: labelFor(href), blurb: meta[href]?.description ?? "" }));
}

export const guideGroups: HubGroup[] = [
  {
    title: "LPG prices and OGRA",
    items: items([
      "/lpg-price-in-pakistan/",
      "/lpg-cylinder-price-in-pakistan/",
      "/lpg-price-per-kg-in-pakistan/",
      "/ogra-lpg-notified-price/",
      "/lpg-price-in-pakistan/history/",
      "/why-lpg-prices-change-in-pakistan/",
      "/lpg-shortage-pakistan/",
    ]),
  },
  {
    title: "Safety",
    items: items([
      "/lpg-safety/",
      "/what-to-do-if-you-smell-gas/",
      "/lpg-cylinder-blast-causes-and-prevention/",
      "/lpg-leak-detector/",
      "/lpg-regulator-problems-and-repair/",
    ]),
  },
  {
    title: "Cylinders, refills and appliances",
    items: items([
      "/lpg-cylinder-sizes-in-pakistan/",
      "/lpg-cylinders/12-kg-domestic-cylinder/",
      "/lpg-cylinders/45-kg-commercial-cylinder/",
      "/lpg-cylinders/5-kg-cylinder/",
      "/lpg-cylinders/composite-fiber-cylinder/",
      "/lpg-cylinder-refill/",
      "/new-lpg-connection/",
      "/lpg-regulators/",
      "/lpg-stove-price-in-pakistan/",
      "/lpg-geyser-price-in-pakistan/",
      "/lpg-heaters-in-pakistan/",
      "/lpg-kit-price-in-pakistan/",
      "/shop/commercial-lpg-burners/",
      "/shop/lpg-hoses-and-accessories/",
    ]),
  },
  {
    title: "LPG basics and comparisons",
    items: items([
      "/what-is-lpg/",
      "/lpg-composition-and-properties/",
      "/propane-vs-butane/",
      "/how-lpg-is-produced-and-supplied/",
      "/lpg-vs-sui-gas/",
      "/lpg-vs-cng/",
      "/lpg-vs-lng/",
      "/auto-lpg-in-pakistan/",
    ]),
  },
  {
    title: "Buying from a supplier",
    items: items([
      "/how-to-choose-a-licensed-lpg-supplier/",
      "/lpg-companies-in-pakistan/",
      "/lpg-shops-and-agencies/",
      "/lpg-filling-stations/",
      "/lpg-marketing-company-vs-distributor-vs-dealer/",
      "/ogra-lpg-regulations-pakistan/",
    ]),
  },
  {
    title: "Bulk, industry and the LPG business",
    items: items([
      "/lpg-supply-in-pakistan/",
      "/lpg-bowser/",
      "/lpg-vaporizers/",
      "/lpg-plant-in-pakistan/",
      "/lpg-business-in-pakistan/",
    ]),
  },
];

export const toolItems: HubItem[] = items([
  "/tools/lpg-cylinder-price-calculator/",
  "/tools/lpg-cylinder-duration-calculator/",
  "/tools/lpg-vs-sui-gas-cost-calculator/",
  "/tools/lpg-vs-diesel-cost-calculator/",
  "/tools/lpg-tank-size-calculator/",
  "/tools/lpg-litre-to-kg-converter/",
  "/tools/lpg-btu-kwh-converter/",
]);

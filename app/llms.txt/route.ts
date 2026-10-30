import { HOURS_TEXT, PAYMENT_TEXT, areaGroups, deliveryTimeText, localDelivery, priceLine } from "@/lib/local-delivery";
import { isPublished } from "@/lib/pages";
import { addressLine, absoluteUrl, site } from "@/lib/site";

// /llms.txt (llmstxt.org): a plain-text summary for AI assistants, built from the same data as the pages so the
// facts and prices stay in step with them. Rebuilt on every deploy.
export const dynamic = "force-static";

const KEY_PAGES: [string, string][] = [
  ["/lpg-in-islamabad/", "LPG delivery in Islamabad: areas, delivery time, today's price, FAQ"],
  ["/lpg-in-rawalpindi/", "LPG delivery in Rawalpindi: areas, delivery time, today's price, FAQ"],
  ["/lpg-home-delivery/", "How LPG home delivery works and what you pay"],
  ["/order-lpg/", "Order LPG by phone, WhatsApp or form"],
  ["/delivery-areas/", "All cities and provinces we take orders from"],
  ["/lpg-price-in-pakistan/", "Monthly OGRA LPG price in Pakistan, per kg and per cylinder"],
  ["/lpg-cylinder-price-in-pakistan/", "LPG cylinder price by size (5, 11.8, 15, 45.4 kg)"],
  ["/ogra-lpg-notified-price/", "The OGRA notified LPG price explained"],
  ["/lpg-cylinder-sizes-in-pakistan/", "LPG cylinder sizes in Pakistan"],
  ["/commercial-lpg-supply/", "Commercial LPG supply for restaurants, hotels and offices"],
  ["/bulk-lpg-supply/", "Bulk LPG supply and tanks"],
  ["/services/", "LPG engineering services: pipelines, manifolds, tanks, conversions"],
  ["/projects/", "LPG engineering project profiles"],
  ["/lpg-safety/", "LPG safety at home"],
  ["/guides/", "All LPG guides, grouped by topic"],
  ["/tools/", "LPG calculators: cylinder price, duration, cost comparisons"],
  ["/licences-and-compliance/", "OGRA licence and compliance"],
  ["/about/", "About THE LPG CO."],
  ["/contact/", "Contact, address and hours"],
];

export function GET() {
  const price = priceLine();
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.name} (${site.shortName}) is an OGRA-licensed LPG marketer and distributor (licence ${site.licenceNumber}), operating since ${site.foundedYear} from ${addressLine()}. It delivers LPG cylinders in Islamabad and Rawalpindi from its own office, takes orders from across Pakistan through its distributor network, and does commercial, bulk and LPG engineering work.`,
    "",
    "## Key facts",
    `- Phone and WhatsApp: ${site.phoneDisplay}`,
    `- Address: ${addressLine()}`,
    `- Hours: ${HOURS_TEXT}`,
    `- OGRA licence number: ${site.licenceNumber}`,
    `- Payment: ${PAYMENT_TEXT}`,
    "- Cylinder sizes: steel 5 kg, 11.8 kg (domestic), 15 kg and 45.4 kg (commercial); composite (fibre) cylinders where stocked. Refill, exchange or new cylinder.",
    ...(price ? [`- LPG price: ${price}`] : []),
    "",
    ...Object.values(localDelivery).flatMap((d) => [
      `## LPG delivery in ${d.name}`,
      `- Delivery time: ${deliveryTimeText(d.slug)}`,
      `- Areas (${areaGroups(d.slug)?.count ?? "several hundred"} confirmed areas in total; main ones): ${d.areas.join("; ")}.`,
      `- Closest to the office: ${d.nearest}.`,
      `- Page: ${absoluteUrl(`/lpg-in-${d.slug}/`)}`,
      "",
    ]),
    "## Key pages",
    ...KEY_PAGES.filter(([p]) => isPublished(p)).map(([p, label]) => `- [${label}](${absoluteUrl(p)})`),
    "",
    `Full list of pages: ${absoluteUrl("/sitemap.xml")}`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

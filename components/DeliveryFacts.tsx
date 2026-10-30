import Link from "next/link";
import { terms } from "@/lib/commercial";
import { HOURS_TEXT, PAYMENT_TEXT, areaGroups, deliveryTimeText, localDelivery, priceLine, whoDeliversText } from "@/lib/local-delivery";
import { site } from "@/lib/site";

// Plain answer block for a twin-city page: one fact per row, each row a full sentence that can be quoted on its own
// (search snippets and AI answers lift single rows). Server-rendered, no JS.
export default function DeliveryFacts({ slug }: { slug: string }) {
  const d = localDelivery[slug];
  if (!d) return null;
  const price = priceLine();
  const all = areaGroups(slug);
  const rows: [string, React.ReactNode][] = [
    ["Who delivers", `LPG cylinders in ${d.name} are delivered by ${whoDeliversText()}`],
    [
      "Areas",
      `We take delivery orders from ${all ? `${all.count.toLocaleString("en-PK")} areas` : "areas"} across ${d.name}, including ${d.areas.join("; ")}. Closest to us: ${d.nearest}.`,
    ],
    ["Delivery time", deliveryTimeText(slug)],
    ["Price today", price ?? `OGRA notifies the price monthly; call ${site.phoneDisplay} for today's rate.`],
    ["Cylinder sizes", "Steel 5 kg, 11.8 kg (domestic), 15 kg and 45.4 kg (commercial); composite (fibre) cylinders where stocked. Refill, empty-for-full exchange or a new cylinder."],
    ["How to order", `Call or WhatsApp ${site.phoneDisplay} with your sector or area, street and cylinder size, or send the form on this page.`],
    ["Payment", PAYMENT_TEXT],
    ["Hours", HOURS_TEXT],
    ["Safety", terms.partnersCertifiedRule],
  ];
  return (
    <section aria-labelledby="facts-title" className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
      <h2 id="facts-title" className="text-xl font-bold text-ink">
        LPG delivery in {d.name}: quick facts
      </h2>
      <dl className="mt-3 divide-y divide-slate-100">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 py-2 sm:grid-cols-[9rem_1fr] sm:gap-4">
            <dt className="font-semibold text-ink">{k}</dt>
            <dd className="text-ink-700">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 text-sm text-ink-500">
        Prices follow the{" "}
        <Link className="underline" href="/ogra-lpg-notified-price/">
          OGRA notified price
        </Link>{" "}
        and are updated each month. Delivery terms: <Link className="underline" href="/pricing-policy/">pricing policy</Link>.
      </p>
    </section>
  );
}

import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import PriceBlock from "@/components/PriceBlock";
import SpecTable from "@/components/SpecTable";
import { itemsFor } from "@/lib/media";
import { absPct, absPkr, gasFor, momChange, monthLong, priceMeta, signedPct, signedPkr, verb } from "@/lib/money";
import { fmtDate, latestPrice, notifications, pkr } from "@/lib/prices";
import { articleNode } from "@/lib/schema";
import { site } from "@/lib/site";

const PATH = "/lpg-price-in-pakistan/history/";

export const metadata = priceMeta(
  PATH,
  (n) => [
    `LPG Price History in Pakistan: ${pkr(n.perKgPkr)}/kg in ${monthLong(n.month).split(" ")[0]}`,
    `LPG Price History Pakistan: Monthly OGRA Rates (${pkr(n.perKgPkr)}/kg)`,
  ],
  (n) => [
    `Monthly OGRA LPG prices for Pakistan, latest ${pkr(n.perKgPkr)} per kg (${monthLong(n.month)}), with 11.8 and 45.4 kg cylinder gas cost and the change on the month before.`,
    `LPG price history in Pakistan: OGRA monthly rates, the ${monthLong(n.month)} figure of ${pkr(n.perKgPkr)} per kg, cylinder gas costs and month-on-month change.`,
  ],
);

export default function Page() {
  const mom = momChange();
  const maxPrice = Math.max(...notifications.map((n) => n.perKgPkr), 1);

  const rows = notifications.map((n, i) => {
    const prev = notifications[i + 1];
    const delta = prev ? Math.round((n.perKgPkr - prev.perKgPkr) * 100) / 100 : undefined;
    const pct = prev && delta !== undefined ? (delta / prev.perKgPkr) * 100 : undefined;
    return [
      fmtDate(n.effectiveFrom),
      pkr(n.perKgPkr),
      pkr(gasFor(n, 11.8)),
      pkr(gasFor(n, 45.4)),
      delta === undefined || pct === undefined ? "First month on file" : `${signedPkr(delta)} (${signedPct(pct)})`,
      <a key={n.month} className="underline" href={n.sourceUrl} target="_blank" rel="noopener noreferrer">
        OGRA
      </a>,
    ];
  });

  const faqs = [
    {
      q: "Where can I see the LPG price history for Pakistan?",
      a: "This page lists every OGRA monthly notification we have entered, newest first, with cylinder gas cost and month-on-month change. For the complete official archive, use the LPG notified prices section of the OGRA website.",
    },
    {
      q: "How much did LPG go up last month?",
      a: mom
        ? `The notified rate moved from ${pkr(mom.from.perKgPkr)} per kg in ${monthLong(mom.from.month)} to ${pkr(mom.to.perKgPkr)} per kg in ${monthLong(mom.to.month)}: ${signedPkr(mom.delta)} per kg (${signedPct(mom.pct)}). For an 11.8 kg cylinder that is ${signedPkr(gasFor(mom.to, 11.8) - gasFor(mom.from, 11.8))}.`
        : "The change appears here as soon as a second month is on file.",
    },
    {
      q: "How is the cylinder column worked out?",
      a: "Per-kg price multiplied by the kilograms of gas: 11.8 for the domestic cylinder and 45.4 for the commercial one. It is gas only. Delivery, deposit and exchange are confirmed separately.",
    },
    {
      q: "Why does the price move from month to month?",
      a: "International LPG prices, the exchange rate, freight, taxes and margins all feed into the monthly notification. See why LPG prices change in Pakistan.",
    },
    {
      q: "Is the history a forecast?",
      a: "No. Past notifications do not predict the next one. The next price is known only when OGRA notifies it.",
    },
    {
      q: "Can I get an older month that is not in the table?",
      a: `Check the OGRA website for the archive of notified prices, or ask us on ${site.phoneDisplay}.`,
    },
  ];

  const h1 = latestPrice
    ? `LPG price history in Pakistan: ${pkr(latestPrice.perKgPkr)} per kg in ${monthLong(latestPrice.month)}`
    : "LPG price history in Pakistan: monthly OGRA rates";

  return (
    <PageShell
      crumbs={[
        { name: "LPG price in Pakistan", href: "/lpg-price-in-pakistan/" },
        { name: "Price history", href: PATH },
      ]}
      h1={h1}
      intro={
        latestPrice
          ? `${monthLong(latestPrice.month)} is the latest OGRA notified rate at ${pkr(latestPrice.perKgPkr)} per kg.${
              mom ? ` That is ${verb(mom)} ${absPkr(mom.delta)} (${absPct(mom.pct)}) on ${monthLong(mom.from.month)}.` : ""
            } The table below lists every month we have recorded with the 11.8 kg and 45.4 kg cylinder gas cost and the change on the month before.`
          : "Each OGRA monthly LPG consumer price we record appears here with cylinder gas cost and month-on-month change."
      }
      aside={<SiteLeadForm heading="Get today's price and order" />}
    >
      <PriceBlock />

      {latestPrice ? (
        <>
          <H2>Month-on-month OGRA LPG price table</H2>
          <SpecTable
            head={["Effective from", "Per kg", "11.8 kg cylinder", "45.4 kg cylinder", "Change on previous month", "Source"]}
            rows={rows}
            caption="Gas price only. Newest first."
          />
          <P>
            {notifications.length} month{notifications.length === 1 ? "" : "s"} on file, last entered {fmtDate(latestPrice.verifiedOn)} by{" "}
            {latestPrice.verifiedBy}. Each row is added after we check it against the notification, and the table grows by one row
            every month.
          </P>

          <H2>Per-kg price at a glance</H2>
          <div className="mt-3 space-y-2" role="img" aria-label="Bar chart of the OGRA LPG price per kg by month">
            {notifications.map((n, i) => {
              const prev = notifications[i + 1];
              const up = prev ? n.perKgPkr > prev.perKgPkr : false;
              return (
                <div key={n.month} className="flex items-center gap-3 text-sm">
                  <span className="w-32 shrink-0 text-ink-700">{fmtDate(n.effectiveFrom)}</span>
                  <div className="h-5 flex-1 rounded bg-slate-100">
                    <div
                      className={`h-5 rounded ${up ? "bg-flame-600" : "bg-sky-600"}`}
                      style={{ width: `${Math.max(5, Math.round((n.perKgPkr / maxPrice) * 100))}%` }}
                    />
                  </div>
                  <span className="w-24 shrink-0 text-right font-semibold text-ink">{pkr(n.perKgPkr)}</span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <Note title="Call for the current figure" tone="info">
          <p>Call or WhatsApp {site.phoneDisplay} for the current notified rate.</p>
        </Note>
      )}

      <H2>How to read the table</H2>
      <UL
        items={[
          "Per kg is the notified consumer price for gas by weight.",
          "The cylinder columns multiply that figure by 11.8 kg (domestic) and 45.4 kg (commercial). They exclude delivery, deposit and exchange.",
          "The change column compares each month with the one before it in the table.",
          "The source link goes to the OGRA notified prices page. The official notification is final.",
        ]}
      />

      <H2>Use the history when you plan</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Take the gas cost of your usual cylinder from the latest row.</li>
        <li>Multiply any per-kg change by the kg in your cylinder to see the monthly effect.</li>
        <li>Refill on your normal schedule; a change of this size does not justify stockpiling cylinders.</li>
        <li>Compare any quote with the notified rate and ask about delivery and deposit separately.</li>
      </ol>

      <H2>Related pages</H2>
      <P>
        Today&apos;s figure and every cylinder size are on{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>
        . Read{" "}
        <Link className="underline" href="/why-lpg-prices-change-in-pakistan/">
          why LPG prices change
        </Link>{" "}
        and how to read the{" "}
        <Link className="underline" href="/ogra-lpg-notified-price/">
          OGRA notified LPG price
        </Link>
        . Ready to buy? <Link className="underline" href="/order-lpg/">Order LPG</Link>.
      </P>

      <ImageGallery items={itemsFor(PATH)} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: PATH,
          headline: h1,
          description: "Monthly OGRA notified LPG consumer prices with cylinder gas cost and month-on-month change.",
        })}
      />
    </PageShell>
  );
}

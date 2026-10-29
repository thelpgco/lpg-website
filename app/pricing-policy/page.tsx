import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { terms } from "@/lib/commercial";
import { fmtDate, latestPrice, pkr } from "@/lib/prices";
import { monthLong } from "@/lib/money";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/pricing-policy/" });

const faqs = [
  {
    q: "Is the figure on your price page the official OGRA PDF?",
    a: "We enter the monthly consumer per-kg rate after our team checks the OGRA notification cycle. When the on-file note says the figure came via press coverage of that cycle, we say so and ask you to re-check the OGRA page or PDF when you need absolute certainty that day. We do not claim a scanned PDF attachment we do not have.",
  },
  {
    q: "Why is deposit not a fixed rupee amount?",
    a: terms.deposit,
  },
  {
    q: "Do all cities pay the same per-kg gas rate?",
    a: terms.sameOgraRateAllCities
      ? "Yes for the OGRA per-kg consumer baseline we show — same nationwide on this site. Delivery and cylinder terms can still change your total."
      : "Follow the price page and OGRA for any city-specific line.",
  },
  {
    q: "Are calculator results a quote?",
    a: "No. Calculators are planning tools. The price we confirm with you for your city, size and delivery is the one that applies.",
  },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Pricing policy", href: "/pricing-policy/" }]}
      h1="Pricing policy"
      intro={`${company.shortName} confirms the full price before you agree to an order. Gas follows the OGRA consumer notification; delivery, deposit and exchange are stated up front — no surprises on the doorstep.`}
    >
      <Note title="Honesty first" tone="info">
        <p>
          We would rather show a careful, sourced rate and confirm the rest on the call than invent deposits, appliance
          lists or “lowest guaranteed” slogans. If a published figure is out of date after a new OGRA cycle, we correct
          it when we know.
        </p>
      </Note>

      <H2>Where the gas price comes from</H2>
      <P>
        The reference for cylinder gas is the monthly OGRA consumer notification, usually updated around the 1st of each
        month. We publish the per-kg rate with the month, effective date and a link to OGRA’s notified-prices page.
      </P>
      {latestPrice ? (
        <P>
          On file now: <strong>{pkr(latestPrice.perKgPkr)} per kg</strong> for {monthLong(latestPrice.month)} (effective{" "}
          {fmtDate(latestPrice.effectiveFrom)}; entered {fmtDate(latestPrice.verifiedOn)} by {latestPrice.verifiedBy}).
          {latestPrice.sourceNote ? ` Note on file: ${latestPrice.sourceNote}` : ""}{" "}
          <a
            className="underline"
            href={latestPrice.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            OGRA notified prices
          </a>
          .
        </P>
      ) : (
        <P>
          No verified monthly figure is on file yet — call {site.phoneDisplay} for today’s confirmation, and check{" "}
          <a
            className="underline"
            href="https://www.ogra.org.pk/lpg-notified-prices"
            target="_blank"
            rel="noopener noreferrer"
          >
            OGRA
          </a>
          .
        </P>
      )}
      {terms.sameOgraRateAllCities && (
        <P>
          The OGRA per-kg consumer rate we show is the same nationwide; only delivery and cylinder terms change your
          total by city.
        </P>
      )}

      <H2>What the final price can include</H2>
      <SpecTable
        head={["Part", "How we treat it"]}
        rows={[
          ["Gas", "Price per kg × kg of gas — follows OGRA; no “lowest guaranteed” slogans"],
          ["Delivery", terms.delivery],
          ["Deposit", terms.deposit],
          ["Exchange", terms.exchange],
          ["New empty cylinder", terms.newEmpty],
          ["Appliances / accessories", "Quoted for model and city before you agree — no invented standing price list"],
          ["Local charge", "Only if it applies — told to you before you agree"],
        ]}
      />

      <H2>Our commitments</H2>
      <UL
        items={[
          "We confirm the full price for that order before delivery.",
          "We do not ask you to agree without a clear total for gas plus any delivery or cylinder terms that apply.",
          "When our on-file figure relies on the OGRA notification cycle (including press summaries of that cycle), we say so and point you to OGRA to re-check the PDF or page.",
          "If a published on-site figure is out of date, we correct it when we know — target review after each OGRA notification cycle.",
          terms.manufacturer
            ? "Manufacturer-direct pricing on cylinders and appliances we make is confirmed before you buy — not guessed on the page."
            : "Network supply rates are confirmed before you buy.",
        ]}
      />

      <Note title="Calculators and planning tools" tone="info">
        <p>
          Online calculators are estimates for planning. They are not a quote. The price we confirm with you for your
          city, size and delivery applies to that order.
        </p>
      </Note>

      <H2>Compare fairly</H2>
      <P>
        Ask every supplier for the total price and divide by the kg of gas. Ask what is included: gas only, deposit,
        exchange or delivery. Refuse a price that changes only after the cylinder is on your doorstep.
      </P>

      <H2>Where to see the figures</H2>
      <UL
        items={[
          <Link key="1" className="underline" href="/lpg-price-in-pakistan/">
            LPG price in Pakistan
          </Link>,
          <Link key="2" className="underline" href="/lpg-price-per-kg-in-pakistan/">
            LPG 1kg price
          </Link>,
          <Link key="3" className="underline" href="/ogra-lpg-notified-price/">
            OGRA notified price
          </Link>,
          <Link key="4" className="underline" href="/lpg-cylinder-price-in-pakistan/">
            Cylinder gas totals by size
          </Link>,
          <Link key="5" className="underline" href="/order-lpg/">
            Order LPG
          </Link>,
        ]}
      />
      <P>Call or WhatsApp {site.phoneDisplay}.</P>

      <ImageGallery items={itemsFor("/pricing-policy/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

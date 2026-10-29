import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { absPct, absPkr, momChange, monthLong, monthShort, priceMeta, signedPct, signedPkr, verb } from "@/lib/money";
import { CYLINDER_SIZES_KG, cylinderPrice, fmtDate, latestPrice, pkr } from "@/lib/prices";
import { site } from "@/lib/site";

const PATH = "/lpg-price-per-kg-in-pakistan/";

export const metadata = priceMeta(
  PATH,
  (n) => [
    `LPG 1kg Price in Pakistan: ${pkr(n.perKgPkr)} (${monthShort(n.month)} OGRA)`,
    `LPG 1kg Price Today in Pakistan: ${pkr(n.perKgPkr)} per kg`,
  ],
  (n) => [
    `LPG 1kg price in Pakistan is ${pkr(n.perKgPkr)} for ${monthLong(n.month)} (OGRA notified). Quick per-kg table for 1 to 10 kg and how it sets your cylinder price.`,
    `The OGRA LPG rate per kg is ${pkr(n.perKgPkr)} in ${monthLong(n.month)}. See the 1 kg price, what 2, 5 and 10 kg of gas cost, and how the rate moves each month.`,
  ],
);

const QUICK_KG = [1, 2, 3, 5, 10];
const exact = (v: number) => `Rs ${v.toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function Page() {
  const n = latestPrice;
  const mom = momChange();
  const perKg = n ? pkr(n.perKgPkr) : "";

  const faqs = [
    {
      q: "What is the LPG 1kg price today in Pakistan?",
      a: n
        ? `${perKg} per kg for ${monthLong(n.month)}, as notified by OGRA and effective ${fmtDate(n.effectiveFrom)}. ${company.shortName} applies this same rate nationwide.`
        : `OGRA notifies the per-kg price monthly. Call or WhatsApp ${site.phoneDisplay} for today's confirmed figure.`,
    },
    {
      q: "Is the per-kg price the same in Karachi, Lahore and Islamabad?",
      a: company.terms.sameOgraRateAllCities
        ? "Yes. We apply one OGRA-notified per-kg rate in every city we serve across Pakistan. Delivery and cylinder deposit can differ by area and are confirmed before you agree."
        : "The notified rate is the national reference. Delivery and cylinder deposit can differ by area and are confirmed before you agree.",
    },
    {
      q: "Why does a shop quote a different per-kg price?",
      a: "Loose-gas shops add handling, transport and margin, and some quote from an older notification. Compare any quote with the OGRA figure and ask what is included.",
    },
    {
      q: "How do I get from the per-kg price to a cylinder price?",
      a: n
        ? `Multiply ${perKg} by the kilograms of gas: ${pkr(cylinderPrice(11.8)!)} for 11.8 kg domestic and ${pkr(cylinderPrice(45.4)!)} for 45.4 kg commercial. Deposit and delivery sit on top.`
        : "Multiply the per-kg rate by the kilograms of gas in the cylinder. Deposit and delivery sit on top and are confirmed before you agree.",
    },
    {
      q: "Does delivery change the per-kg gas rate?",
      a: "No. Gas follows the OGRA per-kg notification. Delivery is a separate line we confirm for your street before you agree.",
    },
    {
      q: "How do I order at today's rate?",
      a: `Call or WhatsApp ${company.phoneDisplay}, or use order LPG with your city, area and size. We confirm the full total, including any delivery charge, before dispatch.`,
    },
  ];

  return (
    <PageShell
      crumbs={[
        { name: "LPG price in Pakistan", href: "/lpg-price-in-pakistan/" },
        { name: "Price per kg", href: PATH },
      ]}
      h1={n ? `LPG 1 kg price in Pakistan: ${perKg} (${monthLong(n.month)})` : "LPG 1 kg price in Pakistan"}
      intro={
        n
          ? `One kilogram of LPG costs ${perKg} at the OGRA-notified rate effective ${fmtDate(n.effectiveFrom)}.${
              mom ? ` That is ${verb(mom)} ${absPkr(mom.delta)} (${absPct(mom.pct)}) on ${monthLong(mom.from.month)}.` : ""
            } ${company.shortName} (licence ${company.licenceNumber}) applies this rate nationwide — from Karachi to Quetta — then confirms delivery for your street.`
          : `OGRA notifies the LPG price per kg every month. Call or WhatsApp ${site.phoneDisplay} for today's confirmed rate.`
      }
      aside={<SiteLeadForm heading="Ask for today's price" />}
    >
      <Note title="Nationwide rate, local delivery" tone="info">
        <p>
          Gas price is the same OGRA figure in every city we serve; only delivery and cylinder terms vary by area. Named dealers for your city
          are on the city hubs and{" "}
          <Link className="underline" href="/lpg-near-me/">
            LPG near me
          </Link>
          .
        </p>
      </Note>

      {n ? (
        <>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-ink-500">OGRA-notified consumer price, {monthLong(n.month)}</p>
            <p className="mt-1 text-4xl font-bold text-ink">
              {perKg} <span className="text-base font-medium text-ink-500">per kg</span>
            </p>
            {mom ? (
              <p className="mt-2 text-sm text-ink-700">
                {monthLong(mom.from.month)}: {pkr(mom.from.perKgPkr)} per kg &middot; change {signedPkr(mom.delta)} ({signedPct(mom.pct)})
              </p>
            ) : null}
          </div>

          <H2>What 1 to 10 kg of gas costs</H2>
          <SpecTable
            head={["Gas weight", "Gas price"]}
            rows={QUICK_KG.map((kg) => [`${kg} kg`, exact(n.perKgPkr * kg)])}
            caption="Gas only: weight × notified per-kg rate."
          />

          <H2>Cylinder gas cost at today&apos;s rate</H2>
          <SpecTable
            head={["Cylinder", "Gas cost"]}
            rows={CYLINDER_SIZES_KG.map((kg) => [
              `${kg} kg`,
              pkr(cylinderPrice(kg)!),
            ])}
            caption="Gas only. Deposit and delivery confirmed when you order."
          />
        </>
      ) : null}

      <H2>From per kg to a full order</H2>
      <UL
        items={[
          "Gas = OGRA per-kg rate × kilograms in the cylinder",
          company.terms.deposit,
          company.terms.exchange,
          company.terms.delivery,
        ]}
      />
      <P>
        Full monthly story:{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>
        . By size:{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
          price of LPG cylinder
        </Link>
        . City pages:{" "}
        <Link className="underline" href="/lpg-in-karachi/">
          Karachi
        </Link>
        ,{" "}
        <Link className="underline" href="/lpg-in-lahore/">
          Lahore
        </Link>
        ,{" "}
        <Link className="underline" href="/lpg-in-islamabad/">
          Islamabad
        </Link>
        .
      </P>
      <P>
        Ready to buy?{" "}
        <Link className="underline" href="/order-lpg/">
          Order LPG
        </Link>{" "}
        or call {company.phoneDisplay}; we confirm the full price before you agree.
      </P>

      <ImageGallery items={itemsFor("/lpg-price-in-pakistan/")} title="Photos" />
      <Faq items={faqs} title="LPG per-kg price: quick answers" />
    </PageShell>
  );
}

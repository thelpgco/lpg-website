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
    `LPG 1kg Price Today in Pakistan: ${pkr(n.perKgPkr)} (${monthShort(n.month)})`,
    `LPG 1kg Price in Pakistan: ${pkr(n.perKgPkr)} (${monthShort(n.month)} OGRA)`,
    `LPG 1kg Price Today in Pakistan: ${pkr(n.perKgPkr)} per kg`,
  ],
  (n) => [
    `LPG 1kg price in Pakistan is ${pkr(n.perKgPkr)} for ${monthLong(n.month)} (OGRA notified). Quick per-kg table for 1 to 10 kg and how it sets your cylinder price.`,
    `The OGRA LPG rate per kg is ${pkr(n.perKgPkr)} in ${monthLong(n.month)}. See the 1 kg price, what 2, 5 and 10 kg of gas cost, and how the rate moves each month.`,
  ],
);

const QUICK_KG = [1, 2, 3, 5, 10];

/** Typical full-flame gas use (kg/h) from rated input ÷ 12.8 kWh per kg. */
const APPLIANCES: [string, number][] = [
  ["Domestic stove burner (about 2.5 kW)", 0.2],
  ["Room heater (about 3.5 kW)", 0.27],
  ["Storage geyser, 35 gallon (about 10 kW)", 0.8],
  ["Commercial karahi burner (about 15 kW)", 1.2],
  ["Gas tandoor (about 20 kW)", 1.6],
];
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
      q: "LPG ka rate aaj kya hai? (1 kg gas kitne ki hai?)",
      a: n
        ? `${monthLong(n.month)} mein OGRA ka notified rate ${perKg} fi kg hai. 11.8 kg gharelu cylinder ki gas ${pkr(cylinderPrice(11.8)!)} aur 45.4 kg commercial cylinder ki gas ${pkr(cylinderPrice(45.4)!)} banti hai. Delivery aur deposit alag se confirm hote hain.`
        : "OGRA har mahine LPG ka fi kg rate notify karta hai. Aaj ka rate confirm karne ke liye call ya WhatsApp karein.",
    },
    {
      q: "How much gas does a family use in a month?",
      a: n
        ? `A family cooking two or three meals a day often uses one 11.8 kg cylinder in two to four weeks, which is ${pkr(cylinderPrice(11.8)!)} of gas per cylinder at this month's rate. A gas geyser in winter can double that.`
        : "A family cooking two or three meals a day often uses one 11.8 kg cylinder in two to four weeks. A gas geyser in winter can double that.",
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
      h1={n ? `LPG 1 kg price today in Pakistan: ${perKg} per kg (${monthLong(n.month)})` : "LPG 1 kg price today in Pakistan"}
      intro={
        n
          ? `The LPG 1 kg price today in Pakistan is ${perKg}, the OGRA-notified rate effective ${fmtDate(n.effectiveFrom)}.${
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

      {n ? (
        <>
          <H2>What one kilogram of LPG does for you</H2>
          <P>
            A kilogram of LPG holds about 12.8 kWh of heat, so what it costs you per hour depends on the appliance. Use your
            appliance&apos;s rating plate for exact figures; these are typical full-flame values.
          </P>
          <SpecTable
            head={["Appliance", "Typical gas use", "Cost per hour at full flame"]}
            rows={APPLIANCES.map(([name, kgh]) => [name, `about ${kgh} kg/h`, pkr(Math.round(kgh * n.perKgPkr))])}
            caption={`At ${perKg} per kg. Most burners run below full flame, so real costs are usually lower.`}
          />

          <H2>Per kg or per litre?</H2>
          <P>
            LPG is sold by weight in Pakistan because its volume changes with temperature. If a seller quotes per litre, convert
            it: one litre of liquid LPG weighs about 0.54 kg, so {perKg} per kg works out to about{" "}
            {pkr(Math.round(n.perKgPkr * 0.54))} per litre. A per-litre quote well above that is more than the notified rate.
            Try the{" "}
            <Link className="underline" href="/tools/lpg-litre-to-kg-converter/">
              litre to kg converter
            </Link>
            .
          </P>

          <H2>Check that you received full weight</H2>
          <P>
            Every cylinder has its empty weight (tare, marked TW) stamped near the valve. Weigh the full cylinder and subtract
            the tare: the difference is the gas you paid for. For example, a domestic cylinder stamped TW 15.0 kg should weigh
            about 26.8 kg when full. If it weighs 25.8 kg, you are 1 kg short, which is {perKg} of gas at this month&apos;s
            rate. A short fill is a fair reason to refuse the cylinder.
          </P>

          <H2>How OGRA arrives at the per-kg price</H2>
          <P>
            OGRA works out the consumer price each month from a formula set under the LPG policy. The biggest inputs are the
            international contract prices for propane and butane and the rupee–dollar exchange rate, because Pakistan
            imports a large share of its LPG. Freight, margins for producers, marketers and distributors, and taxes are added
            on top. That is why the price often rises in the northern-hemisphere winter, when world LPG demand peaks, and
            why a weaker rupee raises it even when world prices are flat.
          </P>

          <H2>Why a shop may charge more than the notified rate</H2>
          <UL
            items={[
              "It is still selling at last month's rate after a price cut, or has moved to the new rate early after a rise.",
              "It adds a delivery or carrying charge into the per-kg figure instead of showing it separately.",
              "It refills from a bulk cylinder (decanting), which is unsafe and often short-weight.",
              "It charges a deposit or cylinder rent without saying so.",
            ]}
          />
          <P>Ask any seller to split the quote into gas (kg × rate), delivery and deposit, so you can compare like with like.</P>
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

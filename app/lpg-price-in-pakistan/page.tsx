import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import PriceBlock from "@/components/PriceBlock";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { absPct, absPkr, gasFor, momChange, monthLong, monthShort, priceMeta, signedPct, signedPkr, verb } from "@/lib/money";
import { itemsFor } from "@/lib/media";
import { isDemo } from "@/lib/mode";
import { CYLINDER_SIZES_KG, cylinderPrice, fmtDate, latestPrice, pkr } from "@/lib/prices";
import { cylinderByGasKg, deliveryFeeLabel, shellCostLabel } from "@/lib/products";
import { articleNode } from "@/lib/schema";
import { site } from "@/lib/site";

const PATH = "/lpg-price-in-pakistan/";

export const metadata = priceMeta(
  PATH,
  (n) => [
    `LPG Price in Pakistan Today: ${pkr(n.perKgPkr)}/kg (${monthShort(n.month)})`,
    `LPG Rate in Pakistan: ${pkr(n.perKgPkr)} per kg, ${monthLong(n.month)}`,
  ],
  (n) => [
    `OGRA LPG price for ${monthLong(n.month)}: ${pkr(n.perKgPkr)} per kg and ${pkr(gasFor(n, 11.8))} for an 11.8 kg cylinder. See the change on last month, sizes and how to order.`,
    `LPG price in Pakistan: ${pkr(n.perKgPkr)} per kg (OGRA, ${monthLong(n.month)}), ${pkr(gasFor(n, 11.8))} for 11.8 kg. Month-on-month change, cylinder sizes and ordering.`,
  ],
);

const sizeName: Record<number, string> = { 5: "5 kg", 11.8: "11.8 kg (domestic)", 15: "15 kg", 45.4: "45.4 kg (commercial)" };

export default function Page() {
  const n = latestPrice;
  const mom = momChange();
  const perKg = n ? pkr(n.perKgPkr) : "";
  const dom = cylinderPrice(11.8);
  const cyl118 = cylinderByGasKg(11.8);

  const h1 = n ? `LPG price in Pakistan today: ${perKg} per kg (${monthLong(n.month)})` : "LPG price in Pakistan today";
  const intro = n
    ? `The OGRA-notified LPG price for ${monthLong(n.month)} is ${perKg} per kg, so the gas in an 11.8 kg domestic cylinder costs ${pkr(dom!)}. ${
        mom
          ? `That is ${verb(mom)} ${absPct(mom.pct)} on ${monthLong(mom.from.month)} (${pkr(mom.from.perKgPkr)} per kg). `
          : `The rate applies from ${fmtDate(n.effectiveFrom)}. `
      }${company.shortName} applies this rate nationwide across Pakistan, then confirms delivery for your street before you agree.`
    : `OGRA notifies the LPG consumer price every month. Call or WhatsApp ${site.phoneDisplay} and we will confirm today's per-kg rate and your cylinder total.`;

  const momRows = mom
    ? [
        [
          "Price per kg",
          pkr(mom.from.perKgPkr),
          pkr(mom.to.perKgPkr),
          signedPkr(mom.delta),
          signedPct(mom.pct),
        ],
        ...CYLINDER_SIZES_KG.map((kg) => {
          const a = gasFor(mom.from, kg);
          const b = gasFor(mom.to, kg);
          return [`${sizeName[kg]} gas`, pkr(a), pkr(b), signedPkr(b - a), signedPct(((b - a) / a) * 100)];
        }),
      ]
    : [];

  const faqs = [
    {
      q: "What is the LPG price in Pakistan today?",
      a: n
        ? `The OGRA-notified consumer price for ${monthLong(n.month)} is ${perKg} per kg, effective ${fmtDate(n.effectiveFrom)}. That makes the gas in an 11.8 kg domestic cylinder ${pkr(dom!)} and a 45.4 kg commercial cylinder ${pkr(cylinderPrice(45.4)!)}.`
        : `OGRA notifies the consumer price every month. Call or WhatsApp ${site.phoneDisplay} for today's confirmed per-kg rate.`,
    },
    {
      q: "How much did the LPG price change from last month?",
      a: mom
        ? `The notified rate went ${mom.direction} from ${pkr(mom.from.perKgPkr)} per kg in ${monthLong(mom.from.month)} to ${pkr(mom.to.perKgPkr)} per kg in ${monthLong(mom.to.month)}: ${signedPkr(mom.delta)} per kg (${signedPct(mom.pct)}). An 11.8 kg cylinder moves by ${signedPkr(gasFor(mom.to, 11.8) - gasFor(mom.from, 11.8))}.`
        : "We show the month-on-month change as soon as two checked notifications are on file. See the history page for every month we have recorded.",
    },
    {
      q: "Who sets the LPG rate in Pakistan?",
      a: "The Oil and Gas Regulatory Authority (OGRA) notifies the consumer LPG price every month. That notified figure is the reference for the gas price per kilogram. Delivery, cylinder deposit or exchange, and local handling are separate and confirmed before you agree.",
    },
    {
      q: "How is the price of a cylinder calculated?",
      a: "Gas price = notified price per kg x kilograms of gas in the cylinder. An 11.8 kg domestic cylinder is 11.8 x the per-kg rate; a 45.4 kg commercial cylinder is 45.4 x the per-kg rate. Delivery, deposit and exchange terms are added only as we confirm them with you.",
    },
    {
      q: "Why does the LPG price change every month?",
      a: "OGRA revises the notification monthly. International LPG contract prices and the rupee exchange rate are among the usual inputs, so the rate can move up or down. See why LPG prices change in Pakistan for the drivers.",
    },
    {
      q: "Is the price on this page what I will pay at the door?",
      a: doorstepAnswer(),
    },
    {
      q: "Is the LPG price the same in Karachi, Lahore and Islamabad?",
      a: company.terms.sameOgraRateAllCities
        ? "Yes. We apply the same OGRA-notified per-kg rate in every city we serve. Only delivery arrangements and cylinder terms can differ by area, and we confirm them before you agree."
        : "The notified per-kg rate is the national reference. Delivery arrangements and cylinder terms can differ by area, and we confirm them before you agree.",
    },
    {
      q: "What does aaj ka rate or LPG ki kimat mean on this page?",
      a: "People search for aaj ka rate or LPG ki kimat when they want the current price. Here that is the OGRA-notified consumer rate per kg for the current month and the cylinder totals worked out from it, not an informal shop quote.",
    },
    {
      q: "How do I order once I know the rate?",
      a: `Use the form on this page, call or WhatsApp ${site.phoneDisplay}, or go to Order LPG. Give your city, area and cylinder size; we confirm the full price and who delivers before you agree.`,
    },
  ];

  return (
    <PageShell
      crumbs={[{ name: "LPG price in Pakistan", href: PATH }]}
      h1={h1}
      intro={intro}
      aside={<SiteLeadForm heading="Get today's price and order" />}
    >
      <PriceBlock />

      {n && mom ? (
        <>
          <H2>{`Price change: ${monthLong(mom.from.month)} to ${monthLong(mom.to.month)}`}</H2>
          <P>
            {`The OGRA rate went ${mom.direction} by ${absPkr(mom.delta)} per kg (${absPct(mom.pct)}). Because gas is priced by weight, every cylinder size moves by the same percentage.`}
          </P>
          <SpecTable
            head={["", monthShort(mom.from.month), monthShort(mom.to.month), "Change (Rs)", "Change (%)"]}
            rows={momRows}
            caption="Gas price only, from the OGRA notified per-kg rate. Delivery, deposit and exchange are separate."
          />
          <P>
            {`In practice: one 11.8 kg refill costs ${pkr(Math.abs(gasFor(mom.to, 11.8) - gasFor(mom.from, 11.8)))} ${mom.direction === "down" ? "less" : "more"} in gas than it did in ${monthLong(mom.from.month)}; a 45.4 kg commercial cylinder costs ${pkr(Math.abs(gasFor(mom.to, 45.4) - gasFor(mom.from, 45.4)))} ${mom.direction === "down" ? "less" : "more"}. Every month we have on file is on the `}
            <Link className="underline" href="/lpg-price-in-pakistan/history/">
              LPG price history
            </Link>{" "}
            page. Reasons for monthly movement are covered in{" "}
            <Link className="underline" href="/why-lpg-prices-change-in-pakistan/">
              why LPG prices change in Pakistan
            </Link>
            .
          </P>
        </>
      ) : null}

      <H2>Price per kg and by cylinder size</H2>
      <P>
        The per-kg rate drives every cylinder total. Use the table above for the four standard sizes, or see the
        single-number view on{" "}
        <Link className="underline" href="/lpg-price-per-kg-in-pakistan/">
          LPG 1 kg price in Pakistan
        </Link>
        . Which size suits your home or kitchen is covered in{" "}
        <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">
          LPG cylinder sizes in Pakistan
        </Link>
        , and the full gas-versus-deposit-versus-delivery breakdown is on{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
          price of LPG cylinder in Pakistan
        </Link>
        .
      </P>

      <H2>Official rate vs what you pay at the door</H2>
      <P>
        The OGRA figure is the reference for <strong>gas</strong>. For an 11.8 kg domestic cylinder your order breaks
        into three parts:
      </P>
      <SpecTable
        head={["Part of the bill", "What it is", "Amount"]}
        rows={[
          ["Gas", n ? `11.8 kg x ${perKg} per kg (OGRA notified)` : "11.8 kg x notified per-kg rate", dom != null ? pkr(dom) : "Confirmed on order"],
          [
            "Cylinder deposit or new empty",
            company.terms.deposit,
            cyl118 ? `${shellCostLabel(cyl118, "deposit")}; new empty ${shellCostLabel(cyl118, "newEmpty")}` : "Quoted for your size and city before you agree",
          ],
          ["Delivery", company.terms.delivery, cyl118 ? deliveryFeeLabel(cyl118) : "Confirmed with the distributor for your area before you agree"],
        ]}
        caption={isDemo() ? "Deposit, new-empty and delivery amounts are confirmed for your city before you agree." : undefined}
      />
      <P>
        {company.terms.exchange} Our written approach to quoting is on the{" "}
        <Link className="underline" href="/pricing-policy/">
          pricing policy
        </Link>{" "}
        page.
      </P>

      <H2>Same OGRA rate in every city</H2>
      <P>
        {company.terms.sameOgraRateAllCities
          ? "We apply one OGRA-notified per-kg rate nationwide, so Karachi, Lahore and Islamabad share the same gas price. "
          : "The notified rate is the national baseline for gas. "}
        City pages add local ordering detail:
      </P>
      <UL
        items={[
          <Link key="k" className="underline" href="/lpg-price-in-pakistan/karachi/">
            LPG price in Karachi today
          </Link>,
          <Link key="l" className="underline" href="/lpg-price-in-pakistan/lahore/">
            LPG price in Lahore today
          </Link>,
          <span key="h">
            Islamabad, Rawalpindi and our other supply cities are listed in{" "}
            <Link className="underline" href="/delivery-areas/">
              delivery areas
            </Link>
            .
          </span>,
        ]}
      />
      <P>
        Named shops and distributors for each city (from our dealer files and local distributors) sit on the city hubs:{" "}
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
        ,{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>
        .
      </P>

      <H2>Where this figure comes from</H2>
      <P>
        {n
          ? `The ${monthLong(n.month)} rate was entered by ${n.verifiedBy} on ${fmtDate(n.verifiedOn)} from press coverage of the OGRA notification. The `
          : "We enter a rate only after checking the OGRA notification. The "}
        <a className="underline" href={n?.sourceUrl ?? "https://www.ogra.org.pk/lpg-notified-prices"} target="_blank" rel="noopener noreferrer">
          OGRA notified-prices page
        </a>{" "}
        has the official notice. How to read it yourself:{" "}
        <Link className="underline" href="/ogra-lpg-notified-price/">
          OGRA notified LPG price
        </Link>
        .
      </P>

      <H2>Order after you check the rate</H2>
      <P>
        {company.shortName} is an OGRA-licensed LPG marketer and distributor (licence {company.licenceNumber}) operating
        since {company.foundedYear} from {company.officeAddress}. Depending on your area we supply as marketer, reseller
        or through a distributor in our network, and we say which before you agree. Delivery target:{" "}
        {company.deliveryTarget}.
      </P>
      <UL
        items={[
          <span key="o">
            <Link className="underline" href="/order-lpg/">
              Order LPG online
            </Link>{" "}
            - city, area, size and quantity
          </span>,
          <span key="d">
            <Link className="underline" href="/lpg-home-delivery/">
              LPG home delivery
            </Link>{" "}
            - how refill and new-cylinder delivery works
          </span>,
          <span key="c">
            Call or WhatsApp {company.phoneDisplay}; we reply {company.responseTime}
          </span>,
        ]}
      />
      <Note title="New to bottled gas?" tone="info">
        <p>
          Read{" "}
          <Link className="underline" href="/what-is-lpg/">
            what LPG is
          </Link>{" "}
          and{" "}
          <Link className="underline" href="/lpg-safety/">
            LPG safety
          </Link>{" "}
          before your first delivery.
        </p>
      </Note>

      <ImageGallery items={itemsFor(PATH)} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: PATH,
          headline: h1,
          description: n
            ? `OGRA-notified LPG price for ${monthLong(n.month)}: ${perKg} per kg, cylinder gas costs and month-on-month change.`
            : "OGRA-notified LPG consumer price per kg and cylinder gas costs.",
        })}
      />
    </PageShell>
  );
}

function doorstepAnswer(): string {
  return `The figure is the OGRA gas price. Your doorstep total adds only what we confirm before you agree: delivery for your area and, where it applies, a cylinder deposit or new empty. ${company.terms.exchange}`;
}

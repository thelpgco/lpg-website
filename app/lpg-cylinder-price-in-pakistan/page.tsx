import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { absPct, momChange, monthLong, monthShort, priceMeta, verb } from "@/lib/money";
import { isDemo } from "@/lib/mode";
import { cylinderPrice, fmtDate, latestPrice, pkr } from "@/lib/prices";
import { cylinderByGasKg, cylinders, deliveryFeeLabel, gasCostLabel, shellCostLabel } from "@/lib/products";
import { site } from "@/lib/site";

const PATH = "/lpg-cylinder-price-in-pakistan/";

export const metadata = priceMeta(
  PATH,
  (n) => [
    `LPG Gas Cylinder Price in Pakistan: 11.8 kg ${pkr(Math.round(n.perKgPkr * 11.8))}`,
    `LPG Cylinder Price in Pakistan: 11.8 kg Gas ${pkr(Math.round(n.perKgPkr * 11.8))} (${monthShort(n.month)})`,
    `LPG Cylinder Price in Pakistan: 11.8 kg Gas Rs ${Math.round(n.perKgPkr * 11.8).toLocaleString("en-PK")}`,
    `Price of LPG Cylinder in Pakistan: 11.8 kg ${pkr(Math.round(n.perKgPkr * 11.8))}`,
  ],
  (n) => [
    `Price of LPG cylinder in Pakistan, ${monthLong(n.month)}: gas ${pkr(Math.round(n.perKgPkr * 5))} (5 kg), ${pkr(Math.round(n.perKgPkr * 11.8))} (11.8 kg), ${pkr(Math.round(n.perKgPkr * 15))} (15 kg), ${pkr(Math.round(n.perKgPkr * 45.4))} (45.4 kg), plus deposit and delivery.`,
    `LPG cylinder price by size from the OGRA rate of ${pkr(n.perKgPkr)} per kg: 5, 11.8, 15 and 45.4 kg gas cost, cylinder deposit and delivery explained.`,
  ],
);

export default function Page() {
  const n = latestPrice;
  const mom = momChange();
  const list = cylinders();
  const c118 = cylinderByGasKg(11.8);
  const dom = cylinderPrice(11.8);

  const demoTotals =
    isDemo() && c118 && dom != null && c118.demoDepositPkr != null && c118.demoDeliveryFeePkr != null
      ? { gas: dom, deposit: c118.demoDepositPkr, delivery: c118.demoDeliveryFeePkr }
      : undefined;

  const faqs = [
    {
      q: "What is the LPG gas cylinder price in Pakistan today?",
      a: n
        ? `The gas in an 11.8 kg domestic cylinder costs ${pkr(dom!)} at the ${monthLong(n.month)} OGRA rate of ${pkr(n.perKgPkr)} per kg. A 5 kg cylinder is ${pkr(cylinderPrice(5)!)}, a 15 kg cylinder ${pkr(cylinderPrice(15)!)} and a 45.4 kg commercial cylinder ${pkr(cylinderPrice(45.4)!)}. Deposit and delivery are confirmed on top.`
        : `Gas price is the OGRA per-kg rate times the kilograms of gas. Call or WhatsApp ${site.phoneDisplay} for today's figure for your size.`,
    },
    {
      q: "What is the difference between gas price and cylinder price?",
      a: "Gas price is what you pay for the LPG inside, worked out from the OGRA per-kg rate. The cylinder itself (deposit or a new empty) and delivery are separate items, confirmed for your size and city before you agree.",
    },
    {
      q: "Do I pay a deposit on the cylinder?",
      a: company.terms.deposit,
    },
    {
      q: "Can I exchange my empty cylinder?",
      a: company.terms.exchange,
    },
    {
      q: "Why is my local shop price different?",
      a: "Shops add transport, handling and margin, and some still quote last month's rate. Compare any quote with the OGRA per-kg rate times your cylinder's kg, then ask what delivery and deposit are on top.",
    },
    {
      q: "Is a composite cylinder priced differently?",
      a: "Gas is priced by weight in the same way. A composite cylinder is a different shell, so its deposit or purchase price differs from steel. We quote it for your city before you agree.",
    },
  ];

  return (
    <PageShell
      crumbs={[
        { name: "LPG price in Pakistan", href: "/lpg-price-in-pakistan/" },
        { name: "Cylinder price", href: PATH },
      ]}
      h1={n ? `LPG gas cylinder price in Pakistan today: 11.8 kg ${pkr(dom!)} (${monthLong(n.month)})` : "LPG gas cylinder price in Pakistan"}
      intro={
        n
          ? `The LPG cylinder price in Pakistan today is ${pkr(dom!)} for an 11.8 kg domestic cylinder, ${pkr(cylinderPrice(5)!)} for 5 kg, ${pkr(cylinderPrice(15)!)} for 15 kg and ${pkr(cylinderPrice(45.4)!)} for a 45.4 kg commercial cylinder (gas at the OGRA rate of ${pkr(n.perKgPkr)} per kg, effective ${fmtDate(n.effectiveFrom)}).${
              mom ? ` Month on month the rate is ${verb(mom)} ${absPct(mom.pct)}.` : ""
            } ${company.shortName} applies this gas rate nationwide across Pakistan. Your total also depends on the cylinder (deposit or new empty) and delivery — confirmed for your street before you agree.`
          : "A cylinder bill has three parts: the gas, the cylinder itself and delivery. We confirm all three for your size and city before you agree."
      }
      aside={<SiteLeadForm defaultRequest="cylinder_delivery" heading="Get your cylinder total" />}
    >
      <H2>Gas, cylinder and delivery by size</H2>
      <SpecTable
        head={["Cylinder", "Gas (live OGRA rate)", "Cylinder deposit", "New empty cylinder", "Delivery"]}
        rows={list.map((c) => [
          c.name,
          gasCostLabel(c.gasKg) ?? "Confirmed on order",
          shellCostLabel(c, "deposit"),
          shellCostLabel(c, "newEmpty"),
          deliveryFeeLabel(c),
        ])}
        caption={
          n
            ? `Gas = ${pkr(n.perKgPkr)} per kg x kg of gas (${monthLong(n.month)}).${isDemo() ? "" : ""}`
            : undefined
        }
      />

      {demoTotals ? (
        <Note title="Worked example: first-time 11.8 kg customer " tone="info">
          <p>
            Gas {pkr(demoTotals.gas)} + cylinder deposit {pkr(demoTotals.deposit)} + delivery {pkr(demoTotals.delivery)} ={" "}
            <strong>{pkr(demoTotals.gas + demoTotals.deposit + demoTotals.delivery)}</strong>. A repeat refill on an exchanged empty
            drops the deposit line, so the total falls to gas plus delivery.
          </p>
        </Note>
      ) : (
        <Note title="How a typical total is built" tone="info">
          <p>
            {n && dom != null
              ? `First-time 11.8 kg customer: gas ${pkr(dom)} + cylinder deposit + delivery. Repeat refill on an exchanged empty: gas ${pkr(dom)} + delivery. `
              : "First-time customer: gas + cylinder deposit + delivery. Repeat refill on an exchanged empty: gas + delivery. "}
            We quote the deposit and delivery lines for your size and city before you agree.
          </p>
        </Note>
      )}

      <ContentImage
        src="/images/cylinders/17-size-lineup-5-118-15-454.png"
        alt="LPG cylinders in 5, 11.8, 15 and 45.4 kg sizes"
        caption="Gas, cylinder and delivery are priced separately for each size."
      />

      <H2>How each part is priced</H2>
      <UL
        items={[
          <span key="g">
            <strong>Gas:</strong> the OGRA-notified per-kg rate times the kilograms in the cylinder. Same rate in every city we serve.
            Current rate and change on{" "}
            <Link className="underline" href="/lpg-price-in-pakistan/">
              LPG price in Pakistan
            </Link>
            .
          </span>,
          <span key="s">
            <strong>Cylinder:</strong> {company.terms.deposit}
          </span>,
          <span key="x">
            <strong>Exchange:</strong> {company.terms.exchange}
          </span>,
          <span key="d">
            <strong>Delivery:</strong> {company.terms.delivery}
          </span>,
        ]}
      />

      <H2>Choosing a size by price per fill</H2>
      <P>
        Gas costs the same per kg in every size, so the choice is about how fast you use gas and what you can store and carry
        safely. Larger cylinders mean fewer deliveries; smaller ones are easier to move. The size guide has typical uses:{" "}
        <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">
          LPG cylinder sizes in Pakistan
        </Link>
        . Steel and composite compared:{" "}
        <Link className="underline" href="/lpg-cylinders/">
          LPG cylinders
        </Link>
        .
      </P>
      {mom ? (
        <P>
          {`Rate history: ${pkr(mom.from.perKgPkr)} per kg in ${monthLong(mom.from.month)}, ${pkr(mom.to.perKgPkr)} per kg in ${monthLong(mom.to.month)}. `}
          <Link className="underline" href="/lpg-price-in-pakistan/history/">
            See every month on file
          </Link>
          .
        </P>
      ) : null}

      <H2>Order and confirm your total</H2>
      <P>
        {company.shortName} (OGRA licence {company.licenceNumber}) confirms the full figure before dispatch. Use{" "}
        <Link className="underline" href="/order-lpg/">
          Order LPG
        </Link>{" "}
        or call {company.phoneDisplay}. Read the{" "}
        <Link className="underline" href="/pricing-policy/">
          pricing policy
        </Link>{" "}
        for how we quote. For named local suppliers, open{" "}
        <Link className="underline" href="/lpg-near-me/">
          LPG near me
        </Link>{" "}
        or your city hub (for example{" "}
        <Link className="underline" href="/lpg-in-karachi/">
          Karachi
        </Link>
        ).
      </P>

      <ImageGallery items={itemsFor(PATH)} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

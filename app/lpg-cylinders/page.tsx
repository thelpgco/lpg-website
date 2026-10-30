import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { itemsFor } from "@/lib/media";
import { monthLong } from "@/lib/money";
import { isDemo } from "@/lib/mode";
import { cylinderPrice, latestPrice, pkr } from "@/lib/prices";
import { cylinders, gasCostLabel, type CylinderProduct } from "@/lib/products";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-cylinders/" });

function detailHref(c: CylinderProduct): string {
  if (c.type === "composite") return "/lpg-cylinders/composite-fiber-cylinder/";
  if (c.gasKg === 5) return "/lpg-cylinders/5-kg-cylinder/";
  if (c.gasKg === 11.8) return "/lpg-cylinders/12-kg-domestic-cylinder/";
  if (c.gasKg === 45.4) return "/lpg-cylinders/45-kg-commercial-cylinder/";
  return "/lpg-cylinder-sizes-in-pakistan/";
}

const faqs = [
  {
    q: "Which LPG cylinder size do I need?",
    a: "Most homes use the 11.8 kg domestic cylinder. A 5 kg bottle suits light use and portability, 15 kg suits larger households and small food businesses, and 45.4 kg is for commercial kitchens with proper storage.",
  },
  {
    q: "What is the price of an LPG cylinder?",
    a: latestPrice
      ? `Gas is priced at the OGRA rate of ${pkr(latestPrice.perKgPkr)} per kg (${monthLong(latestPrice.month)}): ${pkr(cylinderPrice(11.8)!)} for 11.8 kg, ${pkr(cylinderPrice(5)!)} for 5 kg, ${pkr(cylinderPrice(15)!)} for 15 kg and ${pkr(cylinderPrice(45.4)!)} for 45.4 kg. The cylinder deposit and delivery are confirmed on top.`
      : `Gas is priced at the OGRA per-kg rate times the kg of gas. Call or WhatsApp ${site.phoneDisplay} for your size.`,
  },
  {
    q: "Are composite cylinders safe?",
    a: "Composite (fibre) cylinders are made and certified for LPG use. As with any cylinder, use a suitable regulator, store it upright in a ventilated place and keep it away from heat. Check the marking and condition on delivery.",
  },
  {
    q: "What should I check when a cylinder is delivered?",
    a: "Look for the certification marking, an intact valve seal, no deep dents or rust on steel, and a valve that turns smoothly. If anything looks wrong, do not accept the cylinder and tell us before you pay.",
  },
  {
    q: "Can I exchange my old cylinder?",
    a: terms.exchange,
  },
  {
    q: "How do I order a cylinder or refill?",
    a: `Use the form on this page, go to Order LPG, or call or WhatsApp ${site.phoneDisplay}. Give your city, area, size and whether you need a refill, exchange or a new cylinder. We confirm price and who will deliver before you agree.`,
  },
  {
    q: "Do you deliver cylinders nationwide?",
    a: "Timing depends on your area. The refill section below gives the target, and we confirm it before you agree.",
  },
  {
    q: "Is the gas price the same in every city?",
    a: terms.sameOgraRateAllCities
      ? "The OGRA per-kg consumer rate we publish is the same nationwide; delivery and cylinder terms can change your total and are confirmed for your order."
      : "We confirm the gas rate and any local terms for your city before you agree.",
  },
];

export default function Page() {
  const list = cylinders();
  const demo = isDemo();
  const head = ["Cylinder", "Typical use", latestPrice ? `Gas price (${monthLong(latestPrice.month)})` : "Gas price", "Valve", ...(demo ? ["Empty weight"] : []), "Details"];
  const rows = list.map((c) => [
    c.name,
    c.typicalUse,
    gasCostLabel(c.gasKg) ?? "Confirmed on order",
    c.valve ?? "Confirmed on order",
    ...(demo ? [c.tareKgApprox != null ? `about ${c.tareKgApprox} kg` : "-"] : []),
    <Link key={c.id} className="underline" href={detailHref(c)}>
      View
    </Link>,
  ]);

  return (
    <PageShell
      crumbs={[{ name: "LPG cylinders", href: "/lpg-cylinders/" }]}
      h1="LPG gas cylinders in Pakistan: sizes, steel vs composite and price"
      intro={
        latestPrice
          ? `${company.shortName} supplies steel and composite LPG cylinders nationwide under OGRA licence ${company.licenceNumber}. At the OGRA rate of ${pkr(latestPrice.perKgPkr)} per kg, the gas in an 11.8 kg domestic cylinder costs ${pkr(cylinderPrice(11.8)!)}; a 45.4 kg commercial cylinder ${pkr(cylinderPrice(45.4)!)}. Deposit and delivery are confirmed on top.`
          : `${company.shortName} supplies steel and composite LPG cylinders nationwide under OGRA licence ${company.licenceNumber}. Compare sizes, use and how gas is priced through our distributor network.`
      }
      aside={<SiteLeadForm defaultRequest="composite_cylinder" heading="Ask about a cylinder" />}
    >
      <ContentImage
        src="/images/cylinders/11-domestic-cylinder-branded-front.png"
        alt="Red domestic LPG steel cylinder, full body product view"
        caption="Domestic steel LPG cylinder. Check certification markings on delivery."
      />

      <H2>Compare our cylinders</H2>
      <SpecTable
        head={head}
        rows={rows}
        caption={`Sizes are the weight of gas inside. Gas prices use the live OGRA rate; deposit, new-empty and delivery by size are on the cylinder price page.${demo ? "" : ""}`}
      />
      <P>
        Full size guide: <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">LPG cylinder sizes in Pakistan</Link>.
        Gas, deposit and delivery by size:{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">price of LPG cylinder in Pakistan</Link>.
      </P>

      <H2>Steel or composite?</H2>
      <SpecTable
        head={["", "Steel", "Composite (fibre)"]}
        rows={[
          ["Weight", "Heavier when empty", "Much lighter to carry"],
          ["Rust", "Can rust if stored damp", "Does not rust"],
          ["Gas level", "Check by weight or gauge", "Translucent body shows the liquid level"],
          ["Regulator", "Standard domestic or commercial valve", "Composite-compatible regulator required"],
          ["Best for", "Everyday refill and exchange, commercial kitchens", "Homes that want a lighter bottle and visible gas level"],
        ]}
      />
      <P>
        Composite detail: <Link className="underline" href="/lpg-cylinders/composite-fiber-cylinder/">composite fibre cylinder</Link>.
        New to bottled gas? Read <Link className="underline" href="/what-is-lpg/">what LPG is</Link> and the{" "}
        <Link className="underline" href="/lpg-safety/">LPG safety guide</Link> before your first delivery.
      </P>

      <H2>Certification and what to check on delivery</H2>
      <P>{terms.partnersCertifiedRule}</P>
      <Note title="Five-point delivery check" tone="info">
        <ol className="list-decimal space-y-1 pl-5">
          <li>Certification marking is present and legible.</li>
          <li>Valve seal is intact and the valve turns smoothly.</li>
          <li>No deep dents, bulges or heavy rust (steel) or cracks (composite).</li>
          <li>Regulator and hose fit the valve and are connected by the delivery person.</li>
          <li>Soapy-water check for leaks at the joint, never a flame.</li>
        </ol>
      </Note>
      <P>
        {company.legalName} holds OGRA licence {company.licenceNumber}. When a partner distributor delivers, we tell you who is
        supplying you.
      </P>

      <H2>Refill, exchange and new cylinders</H2>
      <UL
        items={[
          <span key="r">
            <strong>Refill or exchange:</strong> {terms.exchange}
          </span>,
          <span key="d">
            <strong>Deposit:</strong> {terms.deposit}
          </span>,
          <span key="n">
            <strong>New empty:</strong> {terms.newEmpty}
          </span>,
        ]}
      />

      <H2>How to order</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Send your city, area, size and whether you need a refill, exchange or a new cylinder.</li>
        <li>We confirm the gas price, deposit or exchange terms, delivery and who supplies you.</li>
        <li>Check the marking and seal on arrival; refuse a damaged cylinder before you pay.</li>
      </ol>
      <P>
        {terms.delivery} How refills work:{" "}
        <Link className="underline" href="/lpg-cylinder-refill/">
          LPG cylinder refill
        </Link>
        . Order now:{" "}
        <Link className="underline" href="/order-lpg/">
          Order LPG
        </Link>{" "}
        or{" "}
        <Link className="underline" href="/lpg-home-delivery/">
          LPG home delivery
        </Link>
        . New to bottled gas?{" "}
        <Link className="underline" href="/new-lpg-connection/">
          New LPG connection
        </Link>
        .
      </P>

      <ImageGallery items={itemsFor("/lpg-cylinders/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

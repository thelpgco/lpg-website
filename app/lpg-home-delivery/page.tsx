import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { terms } from "@/lib/commercial";
import { company } from "@/lib/company/profile";
import { HOURS_TEXT, deliveryTimeText, localDelivery } from "@/lib/local-delivery";
import { itemsFor } from "@/lib/media";
import { monthLong } from "@/lib/money";
import { cylinderPrice, latestPrice, pkr } from "@/lib/prices";
import { hubCities, overrideFor } from "@/lib/network";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-home-delivery/" });

const faqs = [
  {
    q: "How do I order LPG home delivery?",
    a: `Call or WhatsApp ${site.phoneDisplay}, fill in the form on this page, or use Order LPG. Give your city, area, cylinder size and whether you need a refill, exchange or a new cylinder.`,
  },
  {
    q: "How much does LPG home delivery cost?",
    a: latestPrice
      ? `Gas is priced at the OGRA rate of ${pkr(latestPrice.perKgPkr)} per kg (${monthLong(latestPrice.month)}), which is ${pkr(cylinderPrice(11.8)!)} for an 11.8 kg refill. The delivery charge for your area and any cylinder deposit are confirmed before you agree.`
      : "Gas is priced at the OGRA per-kg rate. The delivery charge for your area and any cylinder deposit are confirmed before you agree.",
  },
  {
    q: "Do I pay before or after delivery?",
    a: "Payment terms are confirmed with the price, before delivery. Cash on delivery is common for refills; any other method is stated for that order.",
  },
  {
    q: "Do you deliver LPG in Islamabad and Rawalpindi?",
    a: `Yes. Our office is on Service Road, Sector G-12, Islamabad, and our twin-city team delivers across the Islamabad sectors and Rawalpindi. ${deliveryTimeText("islamabad")} ${HOURS_TEXT}`,
  },
  {
    q: "Can I order for a restaurant or shop?",
    a: "Yes. Choose commercial supply in the form. For regular or large volumes see commercial LPG supply. We confirm price and timing for your area.",
  },
  {
    q: "Who actually delivers the cylinder?",
    a: `${company.name} is an OGRA-licensed marketer and distributor. We may supply directly, resell, or pass your order to a distributor in the network. We tell you who delivers before you agree.`,
  },
  {
    q: "How fast is LPG home delivery?",
    a: "It depends on your area and whether a local team is free; the response and delivery section above sets out the target. We confirm the window on each order before you agree.",
  },
  {
    q: "What should I check when the cylinder arrives?",
    a: "Check the certification marking, that the seal is intact and that there is no dent, rust patch or smell of gas. Refuse a damaged cylinder and tell us.",
  },
];

export default function Page() {
  const active = hubCities.filter((c) => overrideFor(c.slug).indexable === true);
  return (
    <PageShell
      crumbs={[{ name: "LPG home delivery", href: "/lpg-home-delivery/" }]}
      h1="LPG home delivery across Pakistan"
      intro={
        latestPrice
          ? `${company.shortName} delivers LPG cylinders nationwide through licensed partners — homes, shops and kitchens. Gas for an 11.8 kg refill is ${pkr(cylinderPrice(11.8)!)} at the ${monthLong(latestPrice.month)} OGRA rate. Delivery target ${company.deliveryTarget}; we confirm your street and window before you agree.`
          : `${company.shortName} delivers LPG cylinders nationwide through licensed partners. Delivery target ${company.deliveryTarget}; price and timing are confirmed before you agree.`
      }
      aside={<SiteLeadForm defaultRequest="cylinder_delivery" heading="Order LPG delivery" />}
    >
      <Note title="Trusted delivery nationwide" tone="info">
        <p>
          OGRA licence {company.licenceNumber} · certified cylinders only · {terms.delivery247Note} Open your city page
          for named dealers, or send the form with your area.
        </p>
      </Note>
      <ContentImage
        src="/images/accessories/29-cylinder-regulator-hose-studio.png"
        alt="LPG cylinder with regulator and orange hose ready for domestic use"
        caption="Cylinder delivered with the correct regulator and hose setup."
      />

      <H2>How LPG home delivery works</H2>
      <ol className="mt-3 space-y-3">
        {[
          ["You send the request", "Form, call or WhatsApp with city, area, cylinder size and refill, exchange or new cylinder."],
          ["We match a distributor", "We find who serves your area in our network and check they can fulfil the order."],
          ["We confirm before you agree", "Gas price, delivery charge, any cylinder deposit, payment method and the delivery window. You proceed only if you accept."],
          ["Delivery and handover", "The supplier delivers, connects the cylinder where appropriate, and you check the marking and connection."],
        ].map(([t, d], i) => (
          <li key={t} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {t}
            </p>
            <p className="mt-1 text-ink-700">{d}</p>
          </li>
        ))}
      </ol>
      <P>
        More detail: <Link className="underline" href="/how-it-works/">how ordering works</Link>.
      </P>

      <H2>What you pay</H2>
      <UL
        items={[
          <span key="g">
            <strong>Gas:</strong> OGRA per-kg rate times kg of gas. Live figures on{" "}
            <Link className="underline" href="/lpg-price-in-pakistan/">LPG price in Pakistan</Link>.
          </span>,
          <span key="c">
            <strong>Cylinder:</strong> {terms.deposit} {terms.exchange}
          </span>,
          <span key="d">
            <strong>Delivery:</strong> {terms.delivery}
          </span>,
        ]}
      />
      <P>
        Gas, deposit and delivery by size:{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">price of LPG cylinder in Pakistan</Link>. Our quoting
        rules: <Link className="underline" href="/pricing-policy/">pricing policy</Link>.
      </P>

      <H2>The three roles we may play on your order</H2>
      <P>
        {company.name} is an OGRA-licensed marketer and distributor (licence {company.licenceNumber}). On a given home delivery we
        may act as:
      </P>
      <UL
        items={[
          "Marketer / distributor: supply through our licensed role",
          "Reseller: we sell gas or cylinders we have sourced",
          "Referral partner: we pass your order to a distributor in the network who delivers",
        ]}
      />
      <P>We say which role applies before you agree. When a partner delivers, we tell you who is supplying you.</P>

      <H2>Where we deliver</H2>
      <P>
        We take home-delivery orders across Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan, ICT, AJK and Gilgit-Baltistan.
        Coverage is densest in the hubs below
        {active.length ? ` — ${active.map((c) => c.name).join(", ")} list about a one-hour target in covered areas when a local team is available` : ""}
        . Smaller towns: send a request and we confirm whether we can reach your street.
      </P>
      <ul className="mt-3 flex flex-wrap gap-2">
        {hubCities.map((c) => (
          <li key={c.slug}>
            <Link href={`/lpg-in-${c.slug}/`} className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame">
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
      <P>
        Hub status and targets: <Link className="underline" href="/delivery-areas/">delivery areas</Link>.
      </P>

      <H2>LPG delivery in Islamabad and Rawalpindi</H2>
      <P>
        Our own office is on Service Road, Sector G-12, Islamabad, so the twin cities are where we deliver most. {deliveryTimeText("islamabad")}{" "}
        {HOURS_TEXT}
      </P>
      <UL
        items={[
          <span key="i">
            <Link className="underline" href="/lpg-in-islamabad/">LPG delivery in Islamabad</Link>: {localDelivery.islamabad.areas.slice(0, 5).join("; ")} and more.
          </span>,
          <span key="r">
            <Link className="underline" href="/lpg-in-rawalpindi/">LPG delivery in Rawalpindi</Link>: {localDelivery.rawalpindi.areas.slice(0, 4).join("; ")} and more.
          </span>,
        ]}
      />

      <H2>Response and delivery time</H2>
      <P>
        {terms.responseTime} Delivery timing follows the terms above and is confirmed for your street before you agree.
      </P>
      <Note title="At the door" tone="info">
        <p>{terms.partnersCertifiedRule}</p>
      </Note>

      <H2>Commercial and bulk delivery</H2>
      <P>
        Restaurants, factories and fleets often need 45.4 kg cylinders or bulk supply. See{" "}
        <Link className="underline" href="/commercial-lpg-supply/">commercial LPG supply</Link>,{" "}
        <Link className="underline" href="/industrial-lpg-supply/">industrial LPG supply</Link> and{" "}
        <Link className="underline" href="/bulk-lpg-supply/">bulk LPG supply</Link>. The same confirm-before-you-agree rule applies.
        Ready now? <Link className="underline" href="/order-lpg/">Order LPG</Link>.
      </P>

      <ImageGallery items={itemsFor("/lpg-home-delivery/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

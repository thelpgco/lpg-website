import Link from "next/link";
import ContactButtons from "@/components/ContactButtons";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { terms } from "@/lib/commercial";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { monthLong } from "@/lib/money";
import { cylinderPrice, latestPrice, pkr } from "@/lib/prices";
import { meta } from "@/lib/seo";

export const metadata = meta({ path: "/order-lpg/" });

const faqs = [
  {
    q: "Can I really order LPG online in Pakistan?",
    a: "Yes. Send the form with your city, area and cylinder size, or message us on WhatsApp. Your request is logged and we confirm price and delivery by phone or WhatsApp before you agree. It is a confirmed order request, not a one-click card checkout.",
  },
  {
    q: "How much will my order cost?",
    a: latestPrice
      ? `Gas is the OGRA rate of ${pkr(latestPrice.perKgPkr)} per kg (${monthLong(latestPrice.month)}) times the kg in your cylinder: ${pkr(cylinderPrice(11.8)!)} for 11.8 kg and ${pkr(cylinderPrice(45.4)!)} for 45.4 kg. We add only the delivery and cylinder terms we confirm with you first.`
      : "Gas is the OGRA per-kg rate times the kg in your cylinder. We add only the delivery and cylinder terms we confirm with you first.",
  },
  {
    q: "What happens after I submit the form?",
    a: "We read your city and request type, confirm whether we supply as marketer, reseller or through a distributor, then call or WhatsApp you with the gas price, delivery and cylinder terms and the expected timing. You proceed only if you accept them.",
  },
  {
    q: "Do I pay online?",
    a: "Payment terms are confirmed for your order. Cash on delivery is common for refills, and any other method is stated for that order. This page does not take card payments.",
  },
  {
    q: "How fast will I get a cylinder?",
    a: `${terms.delivery} We confirm timing on each order before you agree.`,
  },
  {
    q: "How fast will you reply to my order?",
    a: terms.responseTime,
  },
  {
    q: "Are partner cylinders certified?",
    a: terms.partnersCertifiedRule,
  },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Order LPG", href: "/order-lpg/" }]}
      h1="Order LPG online in Pakistan: cylinders, refills and gas"
      intro={
        latestPrice
          ? `Order LPG anywhere in Pakistan through ${company.shortName} (OGRA licence ${company.licenceNumber}). Tell us your city, area and cylinder size — we confirm price, who delivers and timing. Gas for an 11.8 kg cylinder is ${pkr(cylinderPrice(11.8)!)} at the ${monthLong(latestPrice.month)} OGRA rate of ${pkr(latestPrice.perKgPkr)} per kg.`
          : `Order LPG anywhere in Pakistan through ${company.shortName} (OGRA licence ${company.licenceNumber}). Tell us your city, area and cylinder size — we confirm price, who delivers and timing.`
      }
      aside={<SiteLeadForm heading="Send your LPG order request" />}
    >
      <Note title="Why order with us" tone="info">
        <p>
          Licensed marketer and distributor · certified cylinders only · nationwide partner network · delivery target{" "}
          {company.deliveryTarget} · {terms.responseTime}
        </p>
      </Note>
      <ContactButtons />
      <P>
        Phone and WhatsApp: <strong>{company.phoneDisplay}</strong>, replies {company.responseTime}. Office: {company.officeAddress}.
      </P>

      <H2>Order in four steps</H2>
      <ol className="mt-3 space-y-3">
        {[
          ["Send your request", "Use the form on this page, WhatsApp or call. Requests are accepted around the clock."],
          ["We match and quote", "We find the distributor for your area and send the gas price, delivery and cylinder terms."],
          ["You agree", "You confirm the total, payment method and delivery window. Nothing is dispatched before this."],
          ["Delivery and check", "The cylinder arrives; you check the marking, seal and connection with the delivery person."],
        ].map(([t, d], i) => (
          <li key={t} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {t}
            </p>
            <p className="mt-1 text-ink-700">{d}</p>
          </li>
        ))}
      </ol>

      <H2>What to tell us so we can quote</H2>
      <UL
        items={[
          "City and area, society or landmark",
          "Cylinder size (for example 11.8 kg domestic or 45.4 kg commercial) and how many",
          "Steel or composite (fibre), if you have a preference",
          "Refill or exchange of an empty you hold, or a new cylinder with gas",
          "Home, shop, restaurant or other use",
          "When you need it; same-day delivery is confirmed for your area on the call",
        ]}
      />

      <H2>Terms of every order</H2>
      <UL
        items={[
          <span key="d">
            <strong>Delivery:</strong> {terms.delivery}
          </span>,
          <span key="a">
            <strong>Ordering hours:</strong> {terms.delivery247Note}
          </span>,
          <span key="dep">
            <strong>Deposit:</strong> {terms.deposit}
          </span>,
          <span key="e">
            <strong>Exchange:</strong> {terms.exchange}
          </span>,
          <span key="n">
            <strong>New cylinders:</strong> {terms.newEmpty}
          </span>,
          <span key="s">
            <strong>Stock:</strong> {terms.stockPolicy}
          </span>,
        ]}
      />
      <Note title="Certified cylinders only" tone="info">
        <p>{terms.partnersCertifiedRule}</p>
      </Note>

      <H2>Who supplies your order</H2>
      <P>
        {company.name} manufactures standard cylinders and is an OGRA-licensed marketer and distributor (licence{" "}
        {company.licenceNumber}). On a given order we may act as:
      </P>
      <UL
        items={[
          "Marketer / distributor: supply through our licensed role",
          "Reseller: we sell gas or cylinders we have sourced",
          "Referral partner: we pass your order to a distributor in the network who delivers",
        ]}
      />
      <P>
        We say which role applies before you agree. More detail:{" "}
        <Link className="underline" href="/how-it-works/">
          how ordering works
        </Link>
        .
      </P>

      <H2>Check the rate and the area first</H2>
      <P>
        Current rate and month-on-month change:{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>
        . Gas, deposit and delivery by size:{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
          price of LPG cylinder
        </Link>
        . Where we deliver:{" "}
        <Link className="underline" href="/delivery-areas/">
          delivery areas
        </Link>{" "}
        and <Link className="underline" href="/lpg-home-delivery/">LPG home delivery</Link>. Cylinder types:{" "}
        <Link className="underline" href="/lpg-cylinders/">
          LPG cylinders
        </Link>
        . Safety basics: <Link className="underline" href="/lpg-safety/">LPG safety</Link>.
      </P>

      <ImageGallery items={itemsFor("/order-lpg/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

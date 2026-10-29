import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { directorySummary } from "@/lib/directory";
import { itemsFor, media } from "@/lib/media";
import { cylinderPrice, latestPrice, pkr } from "@/lib/prices";
import { monthLong } from "@/lib/money";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/how-it-works/" });

const faqs = [
  {
    q: "How do I order LPG from THE LPG CO.?",
    a: `Call or WhatsApp ${site.phoneDisplay}, or use the order form. Tell us your city, street and whether you need a refill, exchange or new connection.`,
  },
  {
    q: "How fast is delivery?",
    a: "Timing depends on your street and whether a local team is free. The delivery step above gives the target, and we confirm it before you agree.",
  },
  {
    q: "Do you deliver in every city in Pakistan?",
    a: `We take orders from every province through our nationwide distributor network. Coverage and timing depend on a local team being available for your street — we confirm that before you agree. See delivery areas and our network.`,
  },
  {
    q: "What does a domestic refill cost?",
    a: latestPrice
      ? `Gas for an 11.8 kg domestic cylinder is about ${pkr(cylinderPrice(11.8)!)} at the ${monthLong(latestPrice.month)} OGRA rate of ${pkr(latestPrice.perKgPkr)} per kg. Delivery, deposit and exchange are confirmed before you agree — they are not buried in the gas figure.`
      : "Gas follows the monthly OGRA notified price per kg. Delivery, deposit and exchange are confirmed before you agree. See the LPG price page for the live figure.",
  },
  {
    q: "What is a cylinder deposit?",
    a: terms.deposit,
  },
  {
    q: "Can I exchange an empty cylinder?",
    a: terms.exchange,
  },
  {
    q: "Who actually brings the cylinder — you or a partner?",
    a: `${company.shortName} is the OGRA-licensed marketer and distributor (licence ${company.licenceNumber}). Depending on your area we supply as marketer, reseller, or by referring the order to a distributor in our network. We tell you which role applies, and the partner name if one is involved, before you agree.`,
  },
  {
    q: "What should I check when the cylinder arrives?",
    a: "Look for dents, heavy rust or damage; check the certification marking and seal; confirm the size; and have the connection checked with soapy water before the delivery person leaves. Refuse a damaged or unmarked cylinder.",
  },
  {
    q: "Is LPG safe for first-time users?",
    a: "Yes, when the cylinder is upright and ventilated, the hose and regulator are made for LPG, and you leak-check joints with soapy water — never a flame. Read the LPG safety guide before first use.",
  },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "How it works", href: "/how-it-works/" }]}
      h1="How ordering LPG works across Pakistan"
      intro={`${company.shortName} (OGRA licence ${company.licenceNumber}) takes orders nationwide. You always know who is supplying your gas, what role we play, the full price and the delivery window before you agree — then a local team brings a certified cylinder to your street.`}
      aside={<SiteLeadForm heading="Start an LPG order" />}
    >
      <Note title="In one line" tone="info">
        <p>
          Contact us → we match your area → we confirm price and timing → certified cylinder delivered → you check the
          marking and connection. About one hour in covered areas when a local team is available; otherwise we confirm
          the window with you first.
        </p>
      </Note>

      <ContentImage
        src={media.emptyFilled.src}
        alt={media.emptyFilled.alt}
        caption="Empty and filled LPG cylinders ready for exchange"
        priority
      />

      <H2>The four steps</H2>
      <ol className="mt-3 space-y-3">
        {[
          [
            "You contact us",
            `Call, WhatsApp ${site.phoneDisplay}, or use the order form. ${terms.delivery247Note} We aim to reply ${site.responseTime}.`,
          ],
          [
            "We match you to supply in your area",
            "We find who serves your street from our nationwide network and say whether we supply as manufacturer/marketer, reseller, or referral partner.",
          ],
          [
            "We confirm price and time",
            `We confirm the full price — gas, delivery and any deposit or exchange — and delivery timing (${site.deliveryTarget}) before you agree.`,
          ],
          [
            "Delivery and check",
            "The local team delivers and connects the cylinder. You check the certification marking, seal and connection with soapy water before they leave.",
          ],
        ].map(([t, d], i) => (
          <li key={t} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {t}
            </p>
            <p className="mt-1 text-ink-700">{d}</p>
          </li>
        ))}
      </ol>

      <H2>What you can order</H2>
      <SpecTable
        head={["Need", "What happens", "Start here"]}
        rows={[
          [
            "Refill / exchange",
            "Empty-for-full when eligible, or a filled cylinder delivered to your address",
            <Link key="r" className="underline" href="/lpg-cylinder-refill/">
              Cylinder refill
            </Link>,
          ],
          [
            "New connection",
            "First cylinder plus regulator and hose guidance for a new home or kitchen",
            <Link key="n" className="underline" href="/new-lpg-connection/">
              New LPG connection
            </Link>,
          ],
          [
            "Home delivery",
            "Street-level delivery through the network; timing confirmed before you agree",
            <Link key="h" className="underline" href="/lpg-home-delivery/">
              LPG home delivery
            </Link>,
          ],
          [
            "Commercial / kitchen",
            "45.4 kg cylinders, routes and standing supply for restaurants and events",
            <Link key="c" className="underline" href="/commercial-lpg-supply/">
              Commercial LPG supply
            </Link>,
          ],
        ]}
        caption="Tell us your city and street so we can confirm stock and timing."
      />

      <H2>Cost: what you pay and what is confirmed on quote</H2>
      <P>
        Gas follows the monthly OGRA notification
        {latestPrice
          ? ` — currently ${pkr(latestPrice.perKgPkr)} per kg (${monthLong(latestPrice.month)}). An 11.8 kg domestic refill is about ${pkr(cylinderPrice(11.8)!)} in gas alone`
          : ""}
        . Delivery, deposit and exchange are separate lines. {terms.deposit} {terms.exchange}
      </P>
      <UL
        items={[
          "Same OGRA gas rate basis nationwide when we quote from the notification.",
          "Doorstep total is confirmed for your size and city before you agree — we do not hide delivery in the gas figure.",
          <>
            Live rates:{" "}
            <Link className="underline" href="/lpg-price-in-pakistan/">
              LPG price in Pakistan
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
              cylinder price
            </Link>
            . Policy:{" "}
            <Link className="underline" href="/pricing-policy/">
              pricing policy
            </Link>
            .
          </>,
        ]}
      />

      <H2>Where we deliver</H2>
      <P>{terms.delivery}</P>
      <P>
        Named-dealer directory on file:{" "}
        {(directorySummary.counts.owner_network + directorySummary.counts.market_listing).toLocaleString("en-PK")} network
        dealers across {directorySummary.counts.cities_indexed.toLocaleString("en-PK")} cities (
        {directorySummary.counts.merged_listings.toLocaleString("en-PK")} listings total). Listings are not a street map —
        we confirm your address on each order.
      </P>
      <P>
        Check coverage on <Link className="underline" href="/delivery-areas/">delivery areas</Link> and{" "}
        <Link className="underline" href="/our-network/">our network</Link>. If your city page exists (for example{" "}
        <Link className="underline" href="/lpg-in-lahore/">Lahore</Link>,{" "}
        <Link className="underline" href="/lpg-in-karachi/">Karachi</Link> or{" "}
        <Link className="underline" href="/lpg-in-islamabad/">Islamabad</Link>), use it for local context — we still confirm
        your street on every order.
      </P>

      <H2>Who supplies you: our three roles</H2>
      <UL
        items={[
          <span key="m">
            <strong>Marketer / distributor:</strong> we are OGRA-licensed (licence {site.licenceNumber}) and supply gas
            and cylinders under our licensed role.
          </span>,
          <span key="r">
            <strong>Reseller:</strong> for some products and orders we buy from a supplier and resell to you; gas still
            follows the OGRA notification.
          </span>,
          <span key="f">
            <strong>Referral partner:</strong> for some orders we introduce you to a distributor in the network who
            supplies and delivers directly; we still confirm price and timing with you first.
          </span>,
        ]}
      />
      <P>
        When a partner supplies you, we tell you. {terms.partnersCertifiedRule} Roles explained:{" "}
        <Link className="underline" href="/lpg-marketing-company-vs-distributor-vs-dealer/">
          marketer vs distributor vs dealer
        </Link>
        . Choosing a seller:{" "}
        <Link className="underline" href="/how-to-choose-a-licensed-lpg-supplier/">
          how to choose a licensed LPG supplier
        </Link>
        .
      </P>

      {terms.manufacturer ? (
        <>
          <H2>Manufacturer as well as marketer</H2>
          <P>
            {site.shortName} manufactures standard LPG cylinder sizes and listed appliances. {terms.stockPolicy} See{" "}
            <Link className="underline" href="/lpg-cylinders/">LPG cylinders</Link> and{" "}
            <Link className="underline" href="/shop/">the shop</Link> for what we stock.
          </P>
        </>
      ) : null}

      <H2>Safety at delivery and first use</H2>
      <UL
        items={[
          "Refuse a damaged, rusty or unmarked cylinder.",
          "Check the certification marking and seal on the shoulder.",
          "Keep the cylinder upright in a ventilated place — never in a basement or bedroom.",
          "Brush soapy water on every joint after connection. Bubbles mean a leak. Never use a flame.",
          "If you smell gas later, leave and follow the smell-gas steps — call 1122 from outside if needed.",
        ]}
      />
      <P>
        Full guides: <Link className="underline" href="/lpg-safety/">LPG safety</Link>,{" "}
        <Link className="underline" href="/what-to-do-if-you-smell-gas/">what to do if you smell gas</Link>,{" "}
        <Link className="underline" href="/lpg-regulators/">regulators</Link>.
      </P>

      <H2>Response time and partner standards</H2>
      <P>
        {terms.responseTime} Partners follow our{" "}
        <Link className="underline" href="/partner-standards/">distributor standards</Link>. Read{" "}
        <Link className="underline" href="/about/">about us</Link> and{" "}
        <Link className="underline" href="/licences-and-compliance/">licences and compliance</Link>.
      </P>

      <H2>Ready to order</H2>
      <P>
        {company.aboutBlurb} Start on <Link className="underline" href="/order-lpg/">order LPG</Link>, see{" "}
        <Link className="underline" href="/lpg-home-delivery/">home delivery</Link>, or{" "}
        <Link className="underline" href="/contact/">contact us</Link>. Something went wrong on a past order?{" "}
        <Link className="underline" href="/complaints/">Complaints</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/how-it-works/")} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: "/how-it-works/",
          headline: "How ordering LPG works across Pakistan",
          description:
            "How to order LPG nationwide from an OGRA-licensed company: steps, price confirmation, delivery timing, partner roles and safety checks at the door.",
        })}
      />
    </PageShell>
  );
}

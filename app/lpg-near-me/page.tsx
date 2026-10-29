import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { terms } from "@/lib/commercial";
import { directorySummary, namedSuppliersForCity, topCitiesByListings } from "@/lib/directory";
import { itemsFor } from "@/lib/media";
import { allCities, hubCities, provinceList, totals } from "@/lib/network";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-near-me/" });

const faqs = [
  {
    q: "How do I find LPG near me?",
    a: "Send your city, area and cylinder size through the form, call or WhatsApp. We match you to a distributor that serves your area, then confirm price and timing before you agree.",
  },
  {
    q: "Do you have a shop near me?",
    a: `Our office is in ${site.office.city}. City pages list dealers and distributors nearby. We still confirm whether that partner can serve your street.`,
  },
  {
    q: "Can I get LPG delivered to my home?",
    a: "Yes, where a distributor serves your area. Delivery terms and timing are confirmed with you before you agree. See home delivery.",
  },
  {
    q: "Is LPG available 24 hours near me?",
    a: `${terms.delivery247Note} Some partners list around-the-clock opening; hours are confirmed when you order.`,
  },
  {
    q: "Why show names and still ask for my area?",
    a: "A name and address show who operates in the city. Matching your street, stock and timing still needs a quick check — that is what the form and call are for.",
  },
  {
    q: "What if my city is not listed?",
    a: "Choose Other in the form and type your city or town. We tell you honestly whether we can reach you.",
  },
  {
    q: "What do I pay?",
    a: "Gas starts from the OGRA-notified rate per kg. Delivery, deposit or exchange can change the total. We confirm the full figure before you agree.",
  },
  {
    q: "Can I find an LPG engineer or auto LPG workshop near me?",
    a: "For engineering work, use the engineering request in the form. For vehicle LPG, see auto LPG and check what to verify before you convert.",
  },
];

export default function Page() {
  const cities = topCitiesByListings(8);

  return (
    <PageShell
      crumbs={[{ name: "LPG near me", href: "/lpg-near-me/" }]}
      h1="LPG near me: find a supplier in your city"
      intro={`${site.name} (OGRA licence ${site.licenceNumber}) connects you to ${totals.suppliers} supply partners across ${totals.citiesWithPartners} cities, with ${directorySummary.counts.merged_listings.toLocaleString("en-PK")} named local listings nationwide. Tell us your area — we confirm who can deliver.`}
      aside={
        <SiteLeadForm
          defaultRequest="cylinder_delivery"
          heading="Find a supplier near me"
          subheading="Pick your city, add your area in the details box and we confirm who can serve you."
          buttonLabel="Find my supplier"
        />
      }
    >
      <Note title="Short answer">
        <p>
          Open your city page for named shops and distributors, or send your city, area and cylinder size here / on
          WhatsApp {site.phoneDisplay}. We confirm the supplier, price and timing before you agree.
        </p>
      </Note>

      <H2>How we match you to a supplier</H2>
      <ol className="mt-3 space-y-3">
        {[
          ["Tell us where you are", "City and area or locality. If you are in a small town, choose Other and type it."],
          ["Tell us what you need", "Home refill, new cylinder, composite cylinder, commercial supply, bulk or engineering."],
          ["We match a supplier", "We check dealers and distributors for your city. If nobody can serve your street, we say so."],
          ["You agree before dispatch", "We name the supplier and state the gas price, delivery terms and timing first."],
        ].map(([t, d], i) => (
          <li key={t} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {t}
            </p>
            <p className="mt-1 text-ink-700">{d}</p>
          </li>
        ))}
      </ol>

      <H2>Suppliers in major cities</H2>
      <ul className="mt-3 space-y-3">
        {cities.map((c) => {
          const names = namedSuppliersForCity(c.slug, 4);
          return (
            <li key={c.slug} className="rounded-lg border border-slate-200 p-4">
              <Link className="font-semibold text-ink hover:underline" href={`/lpg-in-${c.slug}/`}>
                LPG in {c.name}
              </Link>
              <span className="ml-2 text-sm text-ink-500">{c.count} listings</span>
              {names.length > 0 && (
                <p className="mt-2 text-sm text-ink-700">
                  e.g. {names.map((n) => n.name).join("; ")}.{" "}
                  <Link className="underline" href={`/lpg-in-${c.slug}/`}>
                    Full {c.name} list
                  </Link>
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <H2>Main supply hubs</H2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {hubCities.map((c) => (
          <li key={c.slug} className="rounded-lg border border-slate-200 p-3">
            <Link className="font-semibold text-ink hover:underline" href={`/lpg-in-${c.slug}/`}>
              LPG in {c.name}
            </Link>
            <span className="ml-2 text-sm text-ink-500">{c.suppliers} partners</span>
          </li>
        ))}
      </ul>

      <H2>By province or region</H2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {provinceList.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/lpg-in-${p.slug}/`}
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
            >
              LPG in {p.name}
            </Link>
          </li>
        ))}
      </ul>
      <P>
        All cities with listed partners: {allCities.length} on the{" "}
        <Link className="underline" href="/delivery-areas/">
          delivery areas
        </Link>{" "}
        page. We confirm coverage on each order.
      </P>

      <H2>What you can ask us to match</H2>
      <UL
        items={[
          <span key="1">
            <Link className="underline" href="/lpg-home-delivery/">
              Home delivery
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/lpg-cylinder-refill/">
              cylinder refill
            </Link>
          </span>,
          <span key="2">
            <Link className="underline" href="/new-lpg-connection/">
              New LPG connection
            </Link>
          </span>,
          <span key="3">
            <Link className="underline" href="/commercial-lpg-supply/">
              Commercial supply
            </Link>{" "}
            for restaurants and businesses
          </span>,
          <span key="4">
            <Link className="underline" href="/bulk-lpg-supply/">
              Bulk
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/industrial-lpg-supply/">
              industrial
            </Link>{" "}
            supply
          </span>,
          <span key="5">
            <Link className="underline" href="/services/">
              LPG engineering services
            </Link>
          </span>,
        ]}
      />

      <H2>Price and timing</H2>
      <P>
        {terms.delivery} {terms.responseTime} See the current rate on{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>{" "}
        and how we price on{" "}
        <Link className="underline" href="/pricing-policy/">
          pricing policy
        </Link>
        . To order directly, use{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG online
        </Link>
        .
      </P>

      <Note title="Talk to us now" tone="info">
        <p>
          Call {site.phoneDisplay} or message us on{" "}
          <a className="underline" href={`https://wa.me/${site.whatsapp}`}>
            WhatsApp
          </a>
          . Our office is at {site.office.line1}, {site.office.city}.
        </p>
      </Note>

      <ImageGallery items={itemsFor("/lpg-near-me/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

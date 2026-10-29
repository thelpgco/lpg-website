import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { directorySummary, topCitiesByListings } from "@/lib/directory";
import { itemsFor } from "@/lib/media";
import { hubCities, totals } from "@/lib/network";
import { terms } from "@/lib/commercial";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-filling-stations/" });

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-ink">
          <tr>
            {head.map((h) => (
              <th key={h} className="p-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-ink-700">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className="p-3 align-top">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const faqs = [
  {
    q: "What is an LPG filling station?",
    a: "The term is used for two different places. One is a cylinder filling plant, where cylinders are filled under licence. The other is a vehicle LPG station that dispenses gas into vehicle tanks. They are different facilities with different rules.",
  },
  {
    q: "Where can I fill my home LPG cylinder?",
    a: "Do not look for a roadside pump. Home and commercial cylinders are refilled or exchanged through licensed suppliers, distributors and shops, usually by delivery. Never decant gas between cylinders yourself. Send a request and we tell you who can serve your area.",
  },
  {
    q: "Are LPG filling stations open 24 hours?",
    a: "Some listed suppliers in published network data are marked as open around the clock, but hours change and we have not verified them station by station. Call before you travel. We take order requests at any hour; fulfilment follows distributor availability.",
  },
  {
    q: "How do I know a station is legitimate?",
    a: "Ask for its licence or authorisation and check it with OGRA. Look for visible safety equipment, trained staff, certified cylinders or vehicle-rated dispensing equipment, and a clean, ventilated site. Walk away from any place that fills cylinders from other cylinders.",
  },
  {
    q: "Can I fill my car at any LPG station?",
    a: "Only at a station that is authorised to dispense LPG as a vehicle fuel, and only into a vehicle tank that is fitted and certified for LPG. See the auto LPG page for what to check.",
  },
  {
    q: "Why do you not list station addresses?",
    a: "City pages list named shops and plants. We still confirm who can serve your address before you order.",
  },
  {
    q: "Can I list my station or plant with you?",
    a: "If you run a licensed supply operation, apply through the distributor page. We ask for your licence details and verify them before any listing.",
  },
];

export default function Page() {
  const top = topCitiesByListings(6);
  const dir = directorySummary.counts;

  return (
    <PageShell
      crumbs={[{ name: "LPG filling stations", href: "/lpg-filling-stations/" }]}
      h1="LPG filling stations in Pakistan: cylinder plants vs vehicle stations"
      intro={`"LPG filling station" can mean a licensed cylinder filling plant or a vehicle LPG dispensing station. They are different. ${site.name} (OGRA licence ${site.licenceNumber}) explains each, how to check one, and how homes should refill — through licensed delivery, not a roadside pump.`}
      aside={<SiteLeadForm defaultRequest="cylinder_delivery" heading="Find supply in your area" subheading="Tell us your city and area. We confirm who can serve you." buttonLabel="Send request" />}
    >
      <Note title="Short answer">
        <p>
          For a home or shop cylinder, you do not fill it yourself at a pump: you order a refill or exchange from a
          licensed supplier. For a vehicle, you need an authorised vehicle LPG station and a certified vehicle tank. This
          page does not invent a national station address book — city hubs and our network list named dealers where we
          have them on file.
        </p>
      </Note>

      <H2>The two meanings</H2>
      <Table
        head={["", "Cylinder filling plant", "Vehicle LPG station"]}
        rows={[
          ["What it fills", "Home, commercial and industrial cylinders", "Vehicle tanks fitted for LPG"],
          ["Who normally uses it", "Licensed marketers, distributors and their dealers", "Drivers of converted vehicles"],
          ["Open to walk-in customers?", "Usually not; customers get refills by delivery or from a shop", "Yes, at authorised stations"],
          ["What to ask", "Licence, cylinder testing and certification marking", "Authorisation and vehicle-rated equipment"],
          ["Related page", "LPG cylinder refill", "Auto LPG in Pakistan"],
        ]}
      />

      <H2>How to check any LPG facility</H2>
      <UL
        items={[
          "Ask for the licence or authorisation and check it with OGRA.",
          "Cylinders must carry valid certification markings. Refuse damaged or unmarked cylinders.",
          "Fire extinguishers, no smoking signs and clear access are visible.",
          "Staff are trained and follow a written procedure.",
          "The site is ventilated and cylinders are stored upright.",
          "Cylinders are never filled from other cylinders.",
        ]}
      />
      <P>
        Safety background: <Link className="underline" href="/lpg-safety/">LPG safety guide</Link> and{" "}
        <Link className="underline" href="/lpg-cylinder-blast-causes-and-prevention/">cylinder blast causes and prevention</Link>.
      </P>

      <H2>Where to refill a home or shop cylinder</H2>
      <P>
        Order a refill or empty-for-full exchange through a licensed marketer, distributor or shop.{" "}
        {terms.delivery} Directory on file: {dir.merged_listings.toLocaleString("en-PK")} named listings across{" "}
        {dir.cities_indexed.toLocaleString("en-PK")} cities. Never decant gas between cylinders yourself.
      </P>
      <UL
        items={[
          <Link key="r" className="underline" href="/lpg-cylinder-refill/">
            LPG cylinder refill
          </Link>,
          <Link key="o" className="underline" href="/order-lpg/">
            Order LPG
          </Link>,
          <Link key="n" className="underline" href="/lpg-near-me/">
            LPG near me
          </Link>,
        ]}
      />

      <H2>Network and city coverage</H2>
      <P>
        Partner roll-up in our supply network: {totals.suppliers} supply partners across {totals.citiesWithPartners}{" "}
        cities; {totals.autoLpg} flagged for auto LPG. Separately, the named-dealer directory indexes local shops and
        agencies used on city hubs. Neither count is a public walk-in station map or an endorsement of every facility.
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
      <ul className="mt-3 flex flex-wrap gap-2">
        {top.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/lpg-in-${c.slug}/`}
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
            >
              {c.name} ({c.count} listings)
            </Link>
          </li>
        ))}
      </ul>
      <P>
        Operators who want to join:{" "}
        <Link className="underline" href="/become-an-lpg-distributor/">
          become an LPG distributor
        </Link>
        . Network overview:{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>
        .
      </P>

      <H2>Related pages</H2>
      <UL
        items={[
          <Link key="1" className="underline" href="/lpg-cylinder-refill/">LPG cylinder refill</Link>,
          <Link key="2" className="underline" href="/lpg-near-me/">LPG near me</Link>,
          <Link key="3" className="underline" href="/lpg-shops-and-agencies/">LPG shops and agencies</Link>,
          <Link key="4" className="underline" href="/auto-lpg-in-pakistan/">Auto LPG in Pakistan</Link>,
          <Link key="5" className="underline" href="/lpg-plant-in-pakistan/">LPG plants</Link>,
          <Link key="6" className="underline" href="/delivery-areas/">Delivery areas</Link>,
        ]}
      />

      <Note title="Talk to us now" tone="info">
        <p>
          Call {site.phoneDisplay} or message us on <a className="underline" href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a>.
        </p>
      </Note>

      <ImageGallery items={itemsFor("/lpg-filling-stations/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

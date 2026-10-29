import Link from "next/link";
import CityLink from "@/components/CityLink";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import {
  directorySummary,
  formatPhoneDisplay,
  namedSuppliersForCity,
  ownerNetworkSample,
  topCitiesByListings,
} from "@/lib/directory";
import { itemsFor } from "@/lib/media";
import { provinceList } from "@/lib/network";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-shops-and-agencies/" });

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
    q: "What is the difference between an LPG shop and an LPG agency?",
    a: "A shop sells cylinders and refills to customers who walk in or call. An agency or distributor is appointed by a licensed marketer to supply an area, often delivering to shops and customers. People use both words loosely, so ask which licensed marketer supplies the place.",
  },
  {
    q: "How do I find an LPG shop near me?",
    a: "Open your city page for named shops, or send your city and area and we confirm who can serve your street.",
  },
  {
    q: "Is it safe to buy from any LPG shop?",
    a: "Buy from a shop that can name its licensed supplier, shows certified cylinders, stores cylinders upright in a ventilated place and gives you a clear price. Refuse damaged cylinders or unsealed valves.",
  },
  {
    q: "How do I open an LPG shop?",
    a: "You need suitable premises, a safe cylinder store, trained staff and an appointment from a licensed marketer or distributor, along with any approvals that apply to your role and area. Confirm requirements with OGRA and the company you plan to work with. We take applications for our network.",
  },
  {
    q: "Can I get a distributorship from you?",
    a: "We are looking for partners with a real shop, depot or delivery operation, especially outside the biggest cities. Apply on the distributor page and we explain terms when we call.",
  },
  {
    q: "What should I look at when I take a cylinder from a shop?",
    a: "The certification marking on the shoulder, the valve seal, the condition of the body and the connection. If anything looks wrong, do not accept the cylinder.",
  },
  {
    q: "Do shops deliver?",
    a: "Some do. Delivery depends on the shop and its distance from you. Ask before you order and confirm any delivery charge.",
  },
];

export default function Page() {
  const shopSample = ownerNetworkSample(18).filter(
    (r) => /shop|agency|dealer|gas|lpg/i.test(`${r.name} ${r.role}`),
  );
  const cityHints = topCitiesByListings(6);

  return (
    <PageShell
      crumbs={[{ name: "LPG shops and agencies", href: "/lpg-shops-and-agencies/" }]}
      h1="LPG shops and agencies in Pakistan: how they work and how to choose one"
      intro={`An LPG shop or agency sells cylinders and refills to households and businesses, usually under a licensed marketer. ${site.name} (OGRA licence ${site.licenceNumber}) lists ${(directorySummary.counts.owner_network + directorySummary.counts.market_listing).toLocaleString("en-PK")} network dealers and ${directorySummary.counts.merged_listings.toLocaleString("en-PK")} named local listings on file across Pakistan — street coverage confirmed when you order. This page explains how to choose a shop and shows a sample from our network.`}
      aside={<SiteLeadForm defaultRequest="cylinder_delivery" heading="Find a supplier in your area" subheading="Tell us your city and area. We confirm who can serve you." buttonLabel="Send request" />}
    >
      <Note title="Short answer">
        <p>
          Look for a shop that names its licensed supplier, shows certified cylinders and gives a clear price. City
          pages list named shops from our network; we still confirm whether that shop can reach your street. If you run
          a shop and want to supply through us, apply as a partner.
        </p>
      </Note>

      <H2>Shop, agency, dealer and distributor</H2>
      <Table
        head={["Name", "Usual meaning", "Ask"]}
        rows={[
          ["LPG shop", "Retail place selling refills and cylinders", "Who is your licensed supplier?"],
          ["LPG agency or dealer", "Local seller appointed by a distributor or marketer", "Who appointed you and do you deliver?"],
          ["Distributor", "Supplies shops and customers in an area under a marketer", "Which marketer and which areas?"],
          ["Marketing company", "Holds the OGRA marketing licence and sells under its brand", "Licence number and category"],
        ]}
      />
      <P>
        Full comparison: <Link className="underline" href="/lpg-marketing-company-vs-distributor-vs-dealer/">marketing company vs distributor vs dealer</Link>.
      </P>

      <H2>Named shops and agencies</H2>
      <P>A selection from our network. Open a city page for the full list in that city.</P>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-ink">
            <tr>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">City</th>
              <th className="p-3 font-semibold">Area</th>
              <th className="p-3 font-semibold">Listed phone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-ink-700">
            {(shopSample.length ? shopSample : ownerNetworkSample(12)).map((r) => (
              <tr key={r.id}>
                <td className="p-3 font-medium text-ink">{r.name}</td>
                <td className="p-3">
                  {r.citySlug ? (
                    <CityLink className="underline" slug={r.citySlug}>
                      {r.city}
                    </CityLink>
                  ) : (
                    r.city
                  )}
                </td>
                <td className="p-3">{r.locality || "—"}</td>
                <td className="p-3 whitespace-nowrap">
                  {r.phone ? (
                    <a className="underline" href={`tel:${r.phone}`}>
                      {formatPhoneDisplay(r.phone)}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="mt-3 flex flex-wrap gap-2">
        {cityHints.map((c) => {
          const n = namedSuppliersForCity(c.slug, 1)[0];
          return (
            <li key={c.slug}>
              <CityLink className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame" slug={c.slug}>
                {c.name}
                {n ? `: ${n.name}` : ""}
              </CityLink>
            </li>
          );
        })}
      </ul>

      <H2>What a good shop shows you</H2>
      <UL
        items={[
          "A named licensed supplier and a visible licence or appointment",
          "Cylinders stored upright, outdoors or in a ventilated area, away from heat and drains",
          "Certification marking and valve seal on every cylinder you take",
          "Fire extinguisher and no smoking signs",
          "A price stated before you pay, including any delivery or deposit",
          "A phone number that answers",
        ]}
      />
      <P>
        Know your rights: <Link className="underline" href="/pricing-policy/">pricing policy</Link>, <Link className="underline" href="/complaints/">complaints</Link> and{" "}
        <Link className="underline" href="/how-to-choose-a-licensed-lpg-supplier/">how to choose a licensed supplier</Link>.
      </P>

      <H2>If you run a shop or agency</H2>
      <P>
        We work with {(directorySummary.counts.owner_network + directorySummary.counts.market_listing).toLocaleString("en-PK")} network dealers on file and want more reliable shops, depots and delivery operations,
        especially outside the biggest cities. We look for:
      </P>
      <UL
        items={[
          "A real shop or depot and a safe cylinder store",
          "Ability to deliver reliably and handle cylinders safely",
          "Willingness to follow OGRA rules and our partner standards",
          "A phone or WhatsApp number that is answered",
        ]}
      />
      <P>
        Read <Link className="underline" href="/partner-standards/">partner standards</Link> and apply on{" "}
        <Link className="underline" href="/become-an-lpg-distributor/">become an LPG distributor</Link>. Regions we especially want to cover:{" "}
        {provinceList.map((p, i) => (
          <span key={p.slug}>
            <CityLink className="underline" slug={p.slug}>{p.name}</CityLink>
            {i < provinceList.length - 1 ? ", " : "."}
          </span>
        ))}
      </P>

      <H2>Related pages</H2>
      <UL
        items={[
          <Link key="1" className="underline" href="/lpg-near-me/">LPG near me</Link>,
          <Link key="2" className="underline" href="/lpg-filling-stations/">LPG filling stations</Link>,
          <Link key="3" className="underline" href="/lpg-business-in-pakistan/">LPG business in Pakistan</Link>,
          <Link key="4" className="underline" href="/lpg-cylinder-refill/">LPG cylinder refill</Link>,
          <Link key="5" className="underline" href="/our-network/">Our network</Link>,
          <Link key="6" className="underline" href="/delivery-areas/">Delivery areas</Link>,
        ]}
      />

      <Note title="Talk to us now" tone="info">
        <p>
          Call {site.phoneDisplay} or message us on <a className="underline" href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a>.
        </p>
      </Note>

      <ImageGallery items={itemsFor("/lpg-shops-and-agencies/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

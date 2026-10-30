import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { directorySummary } from "@/lib/directory";
import { itemsFor } from "@/lib/media";
import { provinceList } from "@/lib/network";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-business-in-pakistan/" });

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-ink">
          <tr>
            {head.map((h) => (
              <th key={h} className="p-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-ink-700">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className="p-3 align-top">
                  {c}
                </td>
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
    q: "How do I start an LPG business in Pakistan?",
    a: "First decide which part of the chain you want: marketing, bottling, distribution, retail shop, auto-LPG station or installation services. Each has its own licence or approval path. Most newcomers start as a distributor, dealer or shop that buys from a licensed marketer.",
  },
  {
    q: "Do I need an OGRA licence to sell LPG cylinders?",
    a: "It depends on your role. Marketing, bottling and storage are licensed by OGRA. A distributor or dealer normally works under a licensed marketer. Confirm your exact role and requirements with OGRA and the marketer you plan to work with before you invest.",
  },
  {
    q: "How much capital is needed?",
    a: "There is no single figure. A small shop needs premises, a safe cylinder store and stock. A distributor adds vehicles, staff and more stock. A plant needs land, equipment and approvals. Cost depends on your role, city and scale — we discuss ranges on a call rather than publishing a fixed number that would mislead.",
  },
  {
    q: "What makes an LPG business unsafe or non-compliant?",
    a: "Handling uncertified or damaged cylinders, unsafe storage, filling cylinders without authority, mixing up cylinder owners and selling without the required licence or appointment. Our partner standards describe what we expect from distributors.",
  },
  {
    q: "Can I become a THE LPG CO. distributor?",
    a: `Yes. We look for reliable partners with a real shop, depot or delivery operation, especially outside the biggest cities. Apply through the form or call ${site.phoneDisplay} and we explain terms when we speak.`,
  },
  {
    q: "Is LPG profitable in Pakistan?",
    a: "Margins depend on your role, volumes, delivery costs and the rate rules that apply to your activity. Speak to people already working in your city and check OGRA rules before projecting numbers. We do not publish profit figures that we cannot verify for your area.",
  },
  {
    q: "What does THE LPG CO. look for in a partner?",
    a: "Partners must supply only certified cylinders and meet our partner standards. Read partner standards and become an LPG distributor for the full list.",
  },
  {
    q: "Can I buy LPG in volume as a restaurant without becoming a dealer?",
    a: "Yes. Commercial and bulk buyers order supply without opening a shop. See commercial LPG supply and industrial LPG supply.",
  },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Guides", href: "/guides/" }, { name: "LPG business in Pakistan", href: "/lpg-business-in-pakistan/" }]}
      h1="LPG business in Pakistan: roles, licences and how to start"
      intro={`The LPG business in Pakistan has several roles: marketer, bottler, distributor, dealer or shop, auto-LPG station and installer. ${company.name} is an OGRA-licensed marketer and distributor (licence ${company.licenceNumber}), operating since ${company.foundedYear}, with ${(directorySummary.counts.owner_network + directorySummary.counts.market_listing).toLocaleString("en-PK")} network dealers listed across ${directorySummary.counts.cities_indexed.toLocaleString("en-PK")} cities in our public directory.`}
      aside={
        <SiteLeadForm
          defaultRequest="distributor"
          heading="Apply to partner with us"
          buttonLabel="Send application"
        />
      }
    >
      <Note title="Short answer" tone="info">
        <p>
          Pick the role first, then check its licence or appointment path with OGRA and the company you would work with.
          The lowest-barrier route is usually a shop or distributor appointed by a licensed marketer. Bottling plants,
          storage and auto-LPG stations need their own approvals.
        </p>
      </Note>

      <H2>The main roles in the LPG business</H2>
      <Table
        head={["Role", "What it does", "What to confirm before you start"]}
        rows={[
          ["Marketing company", "Buys, brands and sells LPG, holds the OGRA marketing licence", "Licence conditions, supply sources and safety obligations"],
          ["Bottling plant", "Fills cylinders from bulk storage", "Plant approvals, equipment, cylinder testing and safety systems"],
          ["Distributor", "Moves gas and cylinders to dealers and customers in an area", "Appointment terms from the marketer, vehicles, store and staff"],
          ["Dealer, shop or agency", "Sells cylinders and refills to households and businesses", "Premises, safe store, appointment and compliance with the supplying company"],
          ["Auto-LPG station", "Dispenses LPG as a vehicle fuel", "Separate approvals and safety rules; see auto LPG"],
          ["Installer or engineer", "Installs pipelines, tanks and appliances", "Competence, testing procedures and insurance"],
        ]}
      />
      <P>
        The difference between a marketer, a distributor and a dealer is explained in{" "}
        <Link className="underline" href="/lpg-marketing-company-vs-distributor-vs-dealer/">
          marketing company vs distributor vs dealer
        </Link>
        . Licensing context:{" "}
        <Link className="underline" href="/ogra-lpg-regulations-pakistan/">OGRA LPG regulations</Link> and{" "}
        <Link className="underline" href="/lpg-companies-in-pakistan/">LPG companies in Pakistan</Link>.
      </P>

      <H2>Steps before you invest</H2>
      <ol className="mt-3 space-y-3">
        {[
          ["Choose your role", "Shop, distributor, plant, station or installer. Each has a different cost, risk and licence path."],
          ["Check the licence path", "Ask OGRA and the marketer you plan to work with what applies to your role and province."],
          ["Plan a safe site", "Cylinder storage upright, ventilated, away from heat and drains, with fire extinguishers and trained staff."],
          ["Secure certified supply", "Buy only from licensed sources and accept only cylinders with valid certification markings."],
          ["Plan delivery and service", "Vehicles, drivers, a phone that is answered, and a way to handle complaints."],
        ].map(([t, d], i) => (
          <li key={t} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {t}
            </p>
            <p className="mt-1 text-ink-700">{d}</p>
          </li>
        ))}
      </ol>

      <H2>Safety and compliance from day one</H2>
      <UL
        items={[
          "Never accept or sell uncertified, dented or out-of-test cylinders.",
          "Never pour gas from one cylinder into another.",
          "Train staff on leak checks, fire response and what to do if someone smells gas.",
          "Keep receipts and a complaints route for customers.",
        ]}
      />
      <P>
        Read <Link className="underline" href="/lpg-safety/">LPG safety</Link> and{" "}
        <Link className="underline" href="/partner-standards/">partner standards</Link>.
      </P>

      <H2>What it costs to start, line by line</H2>
      <P>
        Every LPG business has the same cost headings; only the amounts change with the role and the city. Plan each one
        before you commit money:
      </P>
      <UL
        items={[
          "Licence and approval fees, plus the time to get them",
          "Premises that meet storage and distance rules: a shop, a godown or a plant site",
          "Cylinder stock and the deposits tied up in it, which is often the largest working-capital item",
          "Transport: a pickup or truck that may legally carry gas cylinders",
          "Safety equipment: extinguishers, signage, ventilation, leak detection",
          "Insurance and staff training",
        ]}
      />
      <P>
        Margins in LPG come from volume, because the gas price itself is capped by the OGRA notification. A business that
        turns over many cylinders a day on a well-run route earns more than one with a higher markup and fewer customers.
      </P>

      <H2>Working with {company.shortName}</H2>
      <P>
        We supply partners who deliver to customers in their area, and we pass orders to the partner who serves each
        customer. {terms.partnersCertifiedRule} Apply on{" "}
        <Link className="underline" href="/become-an-lpg-distributor/">become an LPG distributor</Link>. We are looking
        for more partners, particularly outside the largest cities:{" "}
        {provinceList.map((p, i) => (
          <span key={p.slug}>
            <Link className="underline" href={`/lpg-in-${p.slug}/`}>
              {p.name}
            </Link>
            {i < provinceList.length - 1 ? ", " : "."}
          </span>
        ))}
      </P>
      <P>
        See <Link className="underline" href="/our-network/">our network</Link> and{" "}
        <Link className="underline" href="/how-it-works/">how ordering works</Link> for customers.
      </P>

      <H2>Customers who buy in volume (not sellers)</H2>
      <P>
        If you are a business that wants to buy LPG rather than sell it, see{" "}
        <Link className="underline" href="/commercial-lpg-supply/">commercial LPG supply</Link>,{" "}
        <Link className="underline" href="/bulk-lpg-supply/">bulk LPG supply</Link> and{" "}
        <Link className="underline" href="/industrial-lpg-supply/">industrial LPG supply</Link>. Related:{" "}
        <Link className="underline" href="/lpg-plant-in-pakistan/">LPG plants</Link>,{" "}
        <Link className="underline" href="/lpg-shops-and-agencies/">shops and agencies</Link> and{" "}
        <Link className="underline" href="/lpg-filling-stations/">filling stations</Link>.
      </P>
      <UL
        items={[
          <Link key="1" className="underline" href="/lpg-price-in-pakistan/">
            LPG price in Pakistan
          </Link>,
          <Link key="2" className="underline" href="/pricing-policy/">
            Pricing policy
          </Link>,
          <Link key="3" className="underline" href="/how-lpg-is-produced-and-supplied/">
            How LPG is produced and supplied
          </Link>,
          <Link key="4" className="underline" href="/order-lpg/">
            Order LPG
          </Link>,
        ]}
      />

      <Note title="Talk to us now" tone="info">
        <p>
          Call {site.phoneDisplay} or message us on{" "}
          <a className="underline" href={`https://wa.me/${site.whatsapp}`}>
            WhatsApp
          </a>
          .
        </p>
      </Note>

      <ImageGallery items={itemsFor("/lpg-business-in-pakistan/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

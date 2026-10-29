import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { terms } from "@/lib/commercial";
import { company } from "@/lib/company/profile";
import { directorySummary, marketerSample } from "@/lib/directory";
import { itemsFor } from "@/lib/media";
import { totals } from "@/lib/network";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-companies-in-pakistan/" });

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
    q: "How many LPG companies are there in Pakistan?",
    a: "The number changes as OGRA grants, renews and cancels licences. The reliable source is OGRA's published licence information. We do not publish a count here that could be out of date.",
  },
  {
    q: "How do I check whether an LPG company is licensed?",
    a: "Ask the company for its OGRA licence number and the licence category, then check it against the information OGRA publishes. Also ask which licensed marketer a local shop or distributor works under.",
  },
  {
    q: "What is the difference between a marketer, a distributor and a dealer?",
    a: "A marketer holds the OGRA marketing licence and sells LPG under its brand. A distributor moves gas and cylinders to dealers and customers in an area, usually under a marketer. A dealer or shop sells to households and businesses. See the full comparison page.",
  },
  {
    q: "Is THE LPG CO. a licensed company?",
    a: `${site.name} is an OGRA-licensed marketer and distributor, licence number ${site.licenceNumber}. We state it so you can check it. We also work with a network of supply partners and say who delivers before you agree.`,
  },
  {
    q: "Which company has the cheapest LPG?",
    a: "The gas rate is notified by OGRA, so differences between licensed suppliers usually come from delivery, cylinder terms and service rather than the notified rate. Compare the total you pay, not only a headline number.",
  },
  {
    q: "Do all LPG companies deliver to homes?",
    a: "No. Some focus on bottling and wholesale, others on retail delivery. Check with the supplier in your area whether they deliver to your address and what terms apply.",
  },
  {
    q: "Can I switch between companies' cylinders?",
    a: "Cylinders belong to the company or customer who owns them, and exchange rules differ. Ask what applies before you hand over an empty cylinder. See our exchange and deposit terms on the cylinder refill page.",
  },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "LPG companies in Pakistan", href: "/lpg-companies-in-pakistan/" }]}
      h1="LPG companies in Pakistan: how OGRA licensing works"
      intro={`LPG companies in Pakistan operate under licences from OGRA, the Oil and Gas Regulatory Authority. This guide explains the licence types, who does what and how to check a supplier. ${site.name} is an OGRA-licensed marketer and distributor (licence ${site.licenceNumber}).`}
      aside={<SiteLeadForm defaultRequest="cylinder_delivery" heading="Order from a licensed supplier" buttonLabel="Send request" />}
    >
      <Note title="Short answer">
        <p>
          A legitimate LPG supplier can tell you its OGRA licence number and the category it holds, and you can check
          that against OGRA's published information. Companies play different roles: marketing, bottling, distribution
          and retail. This page explains those roles. It does not rank or review other companies.
        </p>
      </Note>

      <H2>How LPG licensing works in plain terms</H2>
      <P>
        OGRA regulates the LPG sector in Pakistan. It licenses companies to market LPG, to operate bottling and
        storage facilities and to run certain other activities, and it sets and notifies the producer and consumer
        price of LPG each month. Exact licence categories and conditions are defined in OGRA's LPG rules and
        notifications, which change from time to time, so always confirm the current position on OGRA's own
        publications. Our summary page: <Link className="underline" href="/ogra-lpg-regulations-pakistan/">OGRA LPG regulations in Pakistan</Link>.
      </P>

      <H2>Roles in the LPG supply chain</H2>
      <Table
        head={["Role", "What it does", "What a customer can ask"]}
        rows={[
          ["Marketing company", "Holds the marketing licence, sources gas and sells under its name", "Licence number and category"],
          ["Bottling plant", "Fills cylinders from bulk storage under licence", "Which marketer's cylinders are filled there"],
          ["Distributor", "Stores and delivers cylinders in an area, normally under a marketer", "Which marketer supplies them"],
          ["Dealer, shop or agency", "Sells refills and cylinders to households and businesses", "Which distributor or marketer supplies the shop"],
          ["Installer", "Fits pipelines, tanks and appliances", "Competence, testing and written handover"],
        ]}
      />
      <P>
        See the fuller comparison: <Link className="underline" href="/lpg-marketing-company-vs-distributor-vs-dealer/">marketing company vs distributor vs dealer</Link>.
      </P>

      <H2>How to verify an OGRA licence, step by step</H2>
      <ol className="mt-3 list-decimal space-y-2 pl-6 text-ink-700">
        <li>Ask the company for its exact legal name, OGRA licence number and the licence category (for example marketing or distribution). Write them down.</li>
        <li>
          Open the official OGRA website,{" "}
          <a className="underline" href="https://www.ogra.org.pk/" target="_blank" rel="noopener noreferrer">ogra.org.pk</a>, and
          look in its LPG section for licence or licensee information. The layout of the site changes, so use its menu or search
          rather than a link from us or from the seller.
        </li>
        <li>Check that the name, licence number and category you were given match what OGRA publishes, and that the licence is current.</li>
        <li>If you are buying from a shop or local distributor rather than the licence holder, ask which licensed marketer supplies them and repeat the check for that marketer.</li>
        <li>If you cannot find a match, ask the company for a copy of the licence, or contact OGRA through its website to confirm. Do not buy until you are satisfied.</li>
        <li>On delivery, check the cylinder marking, the valve seal and the condition of the cylinder, and get the full price (gas, delivery, deposit or exchange) in writing or on WhatsApp.</li>
      </ol>
      <P>
        This is general guidance, not legal advice. OGRA decides what it publishes and how, and that can change, so the OGRA
        website is always the source to trust.
      </P>
      <P>
        More: <Link className="underline" href="/how-to-choose-a-licensed-lpg-supplier/">how to choose a licensed LPG supplier</Link> and{" "}
        <Link className="underline" href="/pricing-policy/">our pricing policy</Link>.
      </P>

      <H2>Our licence: {company.shortName} as a worked example</H2>
      <P>
        You can use us to practise the check above. {company.legalName} holds an OGRA licence, number{" "}
        <strong>{company.licenceNumber}</strong>, as a marketer and distributor. We have been operating since{" "}
        {company.foundedYear} ({company.yearsOperating} years) from our office in {site.office.city}. Search OGRA for that licence
        number and compare the name with ours; if anything does not match, tell us and we will explain.
      </P>
      <Table
        head={["Fact", "Detail"]}
        rows={[
          ["Licence", `${company.licenceBody}, licence no. ${company.licenceNumber}`],
          ["Licence holder", company.legalName],
          ["Role", "Licensed marketer and distributor; we may supply directly, resell or pass your order to a network partner, and we tell you which before you agree"],
          ["What we do", company.activities.slice(0, 3).join("; ")],
          ["Network", `${totals.suppliers} gas supply partners listed in ${totals.citiesWithPartners} cities; coverage is confirmed per order`],
          ["Cylinder condition", terms.partnersCertifiedRule],
          ["Office", company.officeAddress],
        ]}
      />
      <P>
        Our licence details are on <Link className="underline" href="/licences-and-compliance/">licences and compliance</Link>, our
        standards for partners on <Link className="underline" href="/partner-standards/">partner standards</Link>, and complaints on{" "}
        <Link className="underline" href="/complaints/">complaints</Link>.
      </P>

      <H2>Marketing companies and plant cities</H2>
      <P>
        Sample of marketing companies and plant locations active in Pakistan&apos;s LPG market ({directorySummary.counts.marketer_plant_rows}{" "}
        entries in our directory). Always confirm the current licence on{" "}
        <a className="underline" href="https://www.ogra.org.pk/" target="_blank" rel="noopener noreferrer">
          ogra.org.pk
        </a>
        .
      </P>
      <Table
        head={["Company", "Plant / city", "Province"]}
        rows={marketerSample(18).map((m) => [m.company, m.city, m.province])}
      />
      <P>
        Local shops and distributors are listed on city pages such as{" "}
        <Link className="underline" href="/lpg-in-karachi/">
          Karachi
        </Link>
        ,{" "}
        <Link className="underline" href="/lpg-in-lahore/">
          Lahore
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>
        .
      </P>

      <Note title="Finding a supplier near you" tone="info">
        <p>
          City pages list named dealers so you can see who operates nearby. OGRA remains the source for current licences.
          For a supplier at your address, send a request or use{" "}
          <Link className="underline" href="/lpg-near-me/">
            LPG near me
          </Link>
          .
        </p>
      </Note>

      <H2>Related pages</H2>
      <UL
        items={[
          <Link key="1" className="underline" href="/lpg-supply-in-pakistan/">LPG supply in Pakistan</Link>,
          <Link key="2" className="underline" href="/our-network/">Our network</Link>,
          <Link key="3" className="underline" href="/lpg-near-me/">LPG near me</Link>,
          <Link key="4" className="underline" href="/lpg-business-in-pakistan/">LPG business in Pakistan</Link>,
          <Link key="5" className="underline" href="/lpg-shops-and-agencies/">LPG shops and agencies</Link>,
          <Link key="6" className="underline" href="/order-lpg/">Order LPG online</Link>,
        ]}
      />

      <Note title="Talk to us now" tone="info">
        <p>
          Call {site.phoneDisplay} or message us on <a className="underline" href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a>.
        </p>
      </Note>

      <ImageGallery items={itemsFor("/lpg-companies-in-pakistan/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

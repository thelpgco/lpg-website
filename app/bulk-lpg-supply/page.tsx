import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import GasCostWorked from "@/components/GasCostWorked";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { terms } from "@/lib/commercial";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { projectBySlug } from "@/lib/projects";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/bulk-lpg-supply/" });

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

const showcase = [
  projectBySlug("karachi-factory-bulk-tank-interface"),
  projectBySlug("faisalabad-textile-furnace-conversion"),
].filter(Boolean);

const faqs = [
  {
    q: "What is bulk LPG supply?",
    a: "Bulk LPG supply means gas delivered in large quantities and stored on your site in a fixed tank, instead of in many individual cylinders. A road tanker (bowser) fills the tank when it runs low.",
  },
  {
    q: "When does a bulk tank make sense instead of cylinders?",
    a: "Usually when you handle many cylinders every week, have space and safe distances for a tank, and want fewer deliveries and fewer cylinder changes. Low or irregular use is often better served by cylinders or a cylinder bank. Send your use figures and we advise honestly.",
  },
  {
    q: "What tank sizes are available?",
    a: "Tank capacity is chosen from your gas demand, site layout and the safety distances that apply. We do not list a fixed catalogue size. Use the tank size calculator for a first estimate, then request a quotation.",
  },
  {
    q: "Do you supply the tank or only the gas?",
    a: "Tell us what you need. Gas supply and tank installation are separate pieces of work. Our engineering team handles siting, installation and commissioning, and we confirm who supplies and who owns the tank in writing before work starts.",
  },
  {
    q: "What is the price of bulk LPG?",
    a: "Gas starts from the OGRA-notified rate per kg (same rate nationwide). For bulk, the final figure depends on volume, delivery distance and terms. We quote after you send your location and expected monthly use. See the national price page for the current per-kg rate.",
  },
  {
    q: "How fast is bulk delivery or a site response?",
    a: "Bulk tanker windows are confirmed per site after we know the route, the tank size and how far it can be drawn down safely.",
  },
  {
    q: "Can you deliver bulk LPG in my city?",
    a: `${company.shortName} works nationwide across Pakistan. Bulk delivery depends on a tanker route and a distributor able to serve your area — confirmed case by case for your street. Send your site location and we tell you honestly.`,
  },
  {
    q: "Are cylinders and bulk connections certified?",
    a: "Yes. Every distributor in our network must use certified cylinders; the rule is set out in the safety section above. For tank supply, ask to see the tank's inspection record before the first fill.",
  },
  {
    q: "Do I need approvals for a bulk tank?",
    a: "Storage tanks are regulated and usually need approvals and safety distances to be checked before installation. Requirements depend on tank size and site. Our team explains what applies to your site at the assessment stage. See licences and compliance.",
  },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Bulk LPG supply", href: "/bulk-lpg-supply/" }]}
      h1="Bulk LPG supply in Pakistan: tanks, bowser delivery and cylinder banks"
      intro={`Bulk LPG supply means a fixed storage tank at your site, refilled by road tanker. ${company.shortName} is an OGRA-licensed marketer and distributor (licence ${company.licenceNumber}) with nationwide coverage; we assess your demand and site, then quote supply and installation in writing.`}
      aside={
        <SiteLeadForm
          defaultRequest="bulk_industrial"
          heading="Request a bulk supply quotation"
          buttonLabel="Request quotation"
          subheading="City, monthly use and tank space — we confirm scope before any work."
        />
      }
    >
      <Note title="Short answer">
        <p>
          Bulk supply suits sites with high, steady gas use and room for a tank at a safe distance from buildings and
          boundaries. We do not quote a bulk price without your site details. Send your city, expected monthly use and
          what runs on gas, and we reply with a written scope and price, or tell you honestly if cylinders or a
          cylinder bank fit better.
        </p>
      </Note>

      <H2>Nationwide bulk and industrial capability</H2>
      <P>
        {company.shortName} holds OGRA licence {company.licenceNumber}. For factories, hotels, hospitals and large commercial sites we discuss{" "}
        {company.industrial.join("; ").toLowerCase()}.
      </P>
      <P>
        See{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>
        ,{" "}
        <Link className="underline" href="/delivery-areas/">
          delivery areas
        </Link>
        ,{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/lpg-bowser/">
          LPG bowser
        </Link>
        .
      </P>

      <H2>Cylinders, cylinder bank or bulk tank?</H2>
      <Table
        head={["Option", "Best when", "What to know"]}
        rows={[
          ["Individual cylinders (45.4 kg)", "Low to moderate use, no space for a tank", "Easiest to start. More cylinder handling and more deliveries."],
          ["Cylinder bank on a manifold", "Steady use at one kitchen or plant", "Several cylinders feed one line. Fewer interruptions when one empties. Installation needed."],
          ["Bulk tank with tanker refill", "High, steady demand and enough site space", "Fewer deliveries and no cylinder changes. Needs siting, approvals and installation."],
        ]}
      />
      <P>
        Compare use and capacity with the{" "}
        <Link className="underline" href="/tools/lpg-tank-size-calculator/">
          LPG tank size calculator
        </Link>{" "}
        and the{" "}
        <Link className="underline" href="/tools/lpg-litre-to-kg-converter/">
          litre to kg converter
        </Link>
        . Gas is sold by weight in cylinders and often by volume in tanks, so convert before you compare quotes.
      </P>

      <GasCostWorked kg={45.4} usage="bulk" heading="Worked example: what the gas costs when you compare with 45.4 kg cylinders" />
      <P>
        Use this as a yardstick when you compare cylinders with a tank. A tank quote should show the gas price per kg or per
        litre, the delivery charge per tanker visit and any rental or installation lines separately, so you can compare
        like with like.
      </P>

      <H2>What goes into a bulk quotation</H2>
      <UL
        items={[
          "Daily or monthly gas use, or the appliance list so we can estimate it",
          "Site plan showing the proposed tank area, buildings and boundaries nearby",
          "Road access for a tanker and turning space",
          "Whether you already have a tank or pipeline, or want a new installation",
          "Delivery pattern you expect: scheduled or on call",
        ]}
      />

      <H2>How we handle a bulk enquiry</H2>
      <ol className="mt-3 space-y-3">
        {[
          ["Brief", "You send the details above by form, call or WhatsApp."],
          ["Assessment", "Our engineering team reviews your layout and demand from photos and drawings, or on a visit for larger systems."],
          ["Written scope and price", "Tank capacity, installation scope, supply terms and payment method, stated before any work or dispatch."],
          ["Installation and commissioning", "Installation, testing and handover with a safety briefing for your staff. See storage tank installation."],
          ["Refills", "Refills follow the supply route and schedule agreed in writing. We confirm your street and window on each call-out."],
        ].map(([t, d], i) => (
          <li key={t} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {t}
            </p>
            <p className="mt-1 text-ink-700">{d}</p>
          </li>
        ))}
      </ol>

      <H2>Project examples</H2>
      <P>
        Related bulk and process-heat work is on the{" "}
        <Link className="underline" href="/projects/">
          projects
        </Link>{" "}
        page:
      </P>
      <UL
        items={showcase.map((p) => (
          <Link key={p!.slug} className="underline" href={`/projects/${p!.slug}/`}>
            {p!.title}
          </Link>
        ))}
      />

      <Note title="What we do not claim" tone="warn">
        <p>
          We do not list fixed tank catalogue prices or a guaranteed tanker ETA on this page. Bulk work depends on your
          site, so every quotation is prepared for that site. {terms.delivery}
        </p>
      </Note>

      <H2>Safety and compliance</H2>
      <P>
        Tanks are never filled completely; space is left for gas expansion. Siting, distances and approvals are
        checked before installation, and the system is tested before gas is connected. Read the{" "}
        <Link className="underline" href="/lpg-safety/">
          LPG safety guide
        </Link>
        ,{" "}
        <Link className="underline" href="/licences-and-compliance/">
          our licences and compliance
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/ogra-lpg-regulations-pakistan/">
          OGRA LPG regulations in Pakistan
        </Link>
        . {terms.partnersCertifiedRule}
      </P>

      <H2>Related pages</H2>
      <UL
        items={[
          <Link key="1" className="underline" href="/services/lpg-storage-tank-installation/">
            LPG storage tank installation
          </Link>,
          <Link key="2" className="underline" href="/services/lpg-pipeline-installation/">
            LPG pipeline installation
          </Link>,
          <Link key="3" className="underline" href="/services/lpg-manifold-and-cylinder-bank-installation/">
            Manifold and cylinder bank installation
          </Link>,
          <Link key="4" className="underline" href="/industrial-lpg-supply/">
            Industrial LPG supply
          </Link>,
          <Link key="5" className="underline" href="/commercial-lpg-supply/">
            Commercial LPG supply
          </Link>,
          <Link key="6" className="underline" href="/order-lpg/">
            Order LPG
          </Link>,
        ]}
      />

      <Note title="Talk to us now" tone="info">
        <p>
          Call {company.phoneDisplay} or message us on{" "}
          <a className="underline" href={`https://wa.me/${site.whatsapp}`}>
            WhatsApp
          </a>
          . {terms.responseTime} Or use the engineering form on this page for a written bulk quotation.
        </p>
      </Note>

      <ImageGallery items={itemsFor("/bulk-lpg-supply/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

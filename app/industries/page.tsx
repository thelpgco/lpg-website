import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { IndustryCapabilities } from "@/components/r4plus/IndustryPage";
import { sectors } from "@/components/r4plus/industries-data";
import { terms } from "@/lib/commercial";
import { company } from "@/lib/company/profile";
import { directorySummary } from "@/lib/directory";
import { itemsFor } from "@/lib/media";
import { projects } from "@/lib/projects";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/industries/";
export const metadata = meta({ path });

const faqs = [
  {
    q: "Which industries do you supply with LPG?",
    a: `We take enquiries from restaurants, hotels, textile and food-processing units, poultry farms, hospitals, housing societies, factories and event caterers — nationwide across Pakistan. Whether we can supply a given site depends on its location and size, and we confirm that before you agree.`,
  },
  {
    q: "Do you publish prices for industrial customers?",
    a: "No fixed list. The gas rate follows the OGRA monthly notification (same rate nationwide). Delivery, cylinder terms and volume affect your total, and we quote in writing. See the LPG price in Pakistan page for the current per-kg figure.",
  },
  {
    q: "How fast can you deliver?",
    a: "Timing depends on your city and volume. The coverage note above gives the target, and we confirm it before you agree.",
  },
  {
    q: "Are cylinders certified?",
    a: "Yes. Network partners may supply only certified cylinders. Check the marking and seal when cylinders arrive at your site.",
  },
  {
    q: "Can you show a customer reference?",
    a: "We list a project only with the customer's written consent. See the projects page for what is currently published.",
  },
  {
    q: "Who does the installation?",
    a: "Our engineering team designs, installs and tests pipelines, manifolds and tank connections after a brief and a site assessment. Request a quotation from any sector page or the services hub.",
  },
  {
    q: "Do you cover smaller cities and towns?",
    a: `${company.shortName} works through a nationwide distributor network. Coverage and timing are confirmed for your street — see delivery areas and our network.`,
  },
];

export default function Page() {
  const proj = projects().slice(0, 4);
  const listings = directorySummary.counts.merged_listings.toLocaleString("en-PK");

  return (
    <PageShell
      crumbs={[{ name: "Industries", href: path }]}
      h1="LPG supply by industry: restaurants, hotels, factories and more"
      intro={`${company.shortName} (OGRA licence ${company.licenceNumber}) supplies and engineers LPG for kitchens, hospitals, farms, factories and societies nationwide across Pakistan. Pick your sector for uses, supply options, safety points and a quote form.`}
      aside={
        <SiteLeadForm
          defaultRequest="commercial_supply"
          heading="Request a quote"
          buttonLabel="Request a quotation"
          subheading="Tell us your sector, city and what runs on gas."
        />
      }
    >
      <Note title="Nationwide full-service LPG" tone="info">
        <p>
          {company.shortName} holds OGRA licence {company.licenceNumber}. Roughly {listings} named local listings help us route enquiries. Delivery:{" "}
          {company.terms.delivery}
        </p>
      </Note>

      <ul className="grid gap-4 sm:grid-cols-2">
        {sectors.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/industries/${s.slug}/`}
              className="block h-full rounded-xl border border-slate-200 p-5 transition hover:border-flame hover:shadow-sm"
            >
              <h2 className="font-semibold text-ink">{s.card}</h2>
              <p className="mt-2 text-ink-700">{s.short}</p>
            </Link>
          </li>
        ))}
      </ul>

      <H2>How we work with businesses</H2>
      <P>
        Send a short brief: sector, city, what runs on gas and how much you use today. We check which distributor in our
        network can serve you, confirm price, delivery and terms in writing, and start supply only after you agree. For
        pipelines, manifolds and tanks our engineering team assesses the site first. See{" "}
        <Link className="underline" href="/services/">
          engineering services
        </Link>
        ,{" "}
        <Link className="underline" href="/commercial-lpg-supply/">
          commercial LPG supply
        </Link>
        ,{" "}
        <Link className="underline" href="/bulk-lpg-supply/">
          bulk LPG supply
        </Link>
        ,{" "}
        <Link className="underline" href="/industrial-lpg-supply/">
          industrial LPG supply
        </Link>
        ,{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>
        .
      </P>

      <IndustryCapabilities />

      {proj.length > 0 && (
        <>
          <H2>Project profiles by sector</H2>
          <P>
            Browse all{" "}
            <Link className="underline" href="/projects/">
              projects
            </Link>
            . A sample:
          </P>
          <UL
            items={proj.map((p) => (
              <Link key={p.slug} className="underline" href={`/projects/${p.slug}/`}>
                {p.title}
              </Link>
            ))}
          />
        </>
      )}

      <H2>Safety and compliance</H2>
      <P>
        Read the{" "}
        <Link className="underline" href="/lpg-safety/">
          LPG safety guide
        </Link>
        ,{" "}
        <Link className="underline" href="/licences-and-compliance/">
          licences and compliance
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>
        . {terms.partnersCertifiedRule}
      </P>

      <Note title="Talk to us now" tone="info">
        <p>
          Call {company.phoneDisplay} or message us on{" "}
          <a className="underline" href={`https://wa.me/${site.whatsapp}`}>
            WhatsApp
          </a>
          . {terms.responseTime}
        </p>
      </Note>

      <ImageGallery items={itemsFor(path)} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

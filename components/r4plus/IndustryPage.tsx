import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { sectorBySlug, sectors } from "@/components/r4plus/industries-data";
import { terms } from "@/lib/commercial";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { projectBySlug, projects, type ProjectRecord } from "@/lib/projects";
import { site } from "@/lib/site";

/** Fallback project slugs when a sector has no exact industry match. */
const FALLBACK_PROJECTS: Record<string, string[]> = {
  "food-processing": ["islamabad-restaurant-cylinder-bank-manifold", "karachi-factory-bulk-tank-interface"],
};

function projectsForSector(slug: string): ProjectRecord[] {
  const exact = projects().filter((p) => p.industry === slug).slice(0, 2);
  if (exact.length > 0) return exact;
  const fallback = (FALLBACK_PROJECTS[slug] || [])
    .map((s) => projectBySlug(s))
    .filter((p): p is ProjectRecord => Boolean(p));
  return fallback.slice(0, 2);
}

export function IndustryCapabilities() {
  return (
    <>
      <H2>What we can do for your site</H2>
      <P>
        {company.shortName} is an OGRA-licensed marketer and distributor (licence {company.licenceNumber}) with
        nationwide coverage across Pakistan. On each order we tell you whether we supply directly, resell or refer you
        to a distributor — and we confirm your street before you agree.
      </P>
      <UL
        items={[
          `Supply: ${company.commercial.join("; ")}`,
          "Cylinders: 45.4 kg commercial cylinders, delivered and exchanged, where a distributor can reach your site",
          "Cylinder banks and manifolds: designed, installed and tested by our engineering team",
          "Bulk storage and piping: assessed from your demand and site layout, quoted in writing",
          `Engineering: ${company.engineering.join("; ")}`,
          "Safety: audit, inspection and maintenance contracts",
        ]}
      />
      <P>
        Delivery: {company.terms.delivery} Response: {terms.responseTime}
      </P>
      <Note title="Projects and consent" tone="info">
        <p>
          Named customer projects appear on the{" "}
          <Link className="underline" href="/projects/">
            projects page
          </Link>{" "}
          only with written consent. This industry page describes capabilities and the quotation inputs we need.
        </p>
      </Note>
    </>
  );
}

export default function IndustryPage({ slug }: { slug: string }) {
  const s = sectorBySlug(slug);
  const path = `/industries/${slug}/`;
  const relatedProjects = projectsForSector(slug);
  const orderHref = s.request === "bulk_industrial" ? "/bulk-lpg-supply/" : "/order-lpg/";
  const orderLabel = s.request === "bulk_industrial" ? "Request bulk / industrial supply" : "Order LPG";

  const faqs = [
    ...s.faqs,
    {
      q: "How much will LPG cost for my site?",
      a: "Gas follows the OGRA-notified rate per kg (same rate nationwide). Your total adds delivery and cylinder or tank terms we confirm before you agree. See the LPG price in Pakistan page for the current per-kg figure, then send your volume for a written quote.",
    },
    {
      q: "How fast can you deliver or reply?",
      a: `${terms.delivery} ${terms.responseTime}`,
    },
    {
      q: "Are partner cylinders certified?",
      a: terms.partnersCertifiedRule,
    },
    {
      q: "Do you cover cities outside the major metros?",
      a: `${company.shortName} works nationwide through its distributor network. Coverage and timing are confirmed for your street — see delivery areas and our network, or send the quote form with your city.`,
    },
  ];

  return (
    <PageShell
      crumbs={[
        { name: "Industries", href: "/industries/" },
        { name: s.name, href: path },
      ]}
      h1={s.h1}
      intro={s.intro}
      aside={
        <SiteLeadForm
          defaultRequest={s.request}
          heading="Request a quote"
          buttonLabel="Request a quotation"
          subheading="Tell us your city and what runs on gas. We confirm price, timing and who delivers before you agree."
        />
      }
    >
      <Note title="Short answer">
        <p>
          {s.short} {company.shortName} (OGRA licence {company.licenceNumber}) serves this sector nationwide across
          Pakistan. We do not publish a fixed price: the gas rate follows the OGRA notification and your total depends on
          volume, delivery and cylinder terms, all confirmed before you agree.
        </p>
      </Note>

      <H2>Where {s.name.toLowerCase()} use LPG</H2>
      <UL items={s.uses} />

      <H2>Supply options</H2>
      <SpecTable head={["Option", "When it fits"]} rows={s.supply} />

      <H2>Nationwide coverage and delivery</H2>
      <P>
        {company.aboutBlurb} For this sector: {company.terms.delivery}
      </P>
      <P>
        Check{" "}
        <Link className="underline" href="/delivery-areas/">
          delivery areas
        </Link>
        ,{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>
        ,{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>{" "}
        and{" "}
        <Link className="underline" href={orderHref}>
          {orderLabel}
        </Link>
        .
      </P>

      <H2>What to send for an accurate quote</H2>
      <UL items={s.quoteNeeds} />
      <P>
        For a quick estimate of cylinders needed, try the{" "}
        <Link className="underline" href="/tools/lpg-cylinder-duration-calculator/">
          cylinder duration calculator
        </Link>
        . It is only an estimate.
      </P>

      <H2>Safety points for this sector</H2>
      <UL items={s.safety} />
      <P>
        Read the{" "}
        <Link className="underline" href="/lpg-safety/">
          LPG safety guide
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/what-to-do-if-you-smell-gas/">
          what to do if you smell gas
        </Link>
        . {terms.partnersCertifiedRule}
      </P>

      <IndustryCapabilities />

      {relatedProjects.length > 0 && (
        <>
          <H2>Related project profiles</H2>
          <P>
            See also the full{" "}
            <Link className="underline" href="/projects/">
              projects
            </Link>{" "}
            list.
          </P>
          <UL
            items={relatedProjects.map((p) => (
              <Link key={p.slug} className="underline" href={`/projects/${p.slug}/`}>
                {p.title}
              </Link>
            ))}
          />
        </>
      )}

      <H2>Related services and pages</H2>
      <UL
        items={[
          ...s.services.map((x) => (
            <Link key={x.slug} className="underline" href={`/services/${x.slug}/`}>
              {x.label}
            </Link>
          )),
          ...s.links.map((x) => (
            <Link key={x.href} className="underline" href={x.href}>
              {x.label}
            </Link>
          )),
          <Link key="projects" className="underline" href="/projects/">
            Projects
          </Link>,
          <Link key="order" className="underline" href={orderHref}>
            {orderLabel}
          </Link>,
          <Link key="safety" className="underline" href="/lpg-safety/">
            LPG safety guide
          </Link>,
        ]}
      />

      <H2>Other industries</H2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {sectors
          .filter((o) => o.slug !== slug)
          .map((o) => (
            <li key={o.slug}>
              <Link
                href={`/industries/${o.slug}/`}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
              >
                {o.name}
              </Link>
            </li>
          ))}
      </ul>

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

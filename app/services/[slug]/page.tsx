import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactButtons from "@/components/ContactButtons";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import Link from "next/link";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { terms } from "@/lib/commercial";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { projectBySlug, projects, type ProjectRecord } from "@/lib/projects";
import { serviceBySlug, services, servicesIndexable } from "@/lib/services";
import { serviceDetail } from "@/lib/services-detail";
import { meta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

/** Explicit project links when relatedServices paths do not match the live slug. */
const SERVICE_PROJECT_SLUGS: Record<string, string[]> = {
  "lpg-pipeline-installation": ["lahore-hotel-kitchen-lpg-pipeline", "quetta-housing-society-pipeline-riser"],
  "lpg-storage-tank-installation": ["karachi-factory-bulk-tank-interface"],
  "lpg-manifold-and-cylinder-bank-installation": [
    "islamabad-restaurant-cylinder-bank-manifold",
    "peshawar-hospital-kitchen-manifold",
    "rawalpindi-wedding-hall-cylinder-bank",
  ],
  "boiler-and-furnace-conversion-to-lpg": ["faisalabad-textile-furnace-conversion"],
  "lpg-air-sng-systems": ["karachi-factory-bulk-tank-interface", "faisalabad-textile-furnace-conversion"],
  "lpg-safety-audit-and-inspection": ["peshawar-hospital-kitchen-manifold"],
  "lpg-maintenance-and-amc": ["peshawar-hospital-kitchen-manifold", "karachi-factory-bulk-tank-interface"],
  "lpg-cylinder-testing-and-inspection": ["islamabad-restaurant-cylinder-bank-manifold"],
};

function projectsForService(slug: string): ProjectRecord[] {
  const mapped = (SERVICE_PROJECT_SLUGS[slug] || [])
    .map((s) => projectBySlug(s))
    .filter((p): p is ProjectRecord => Boolean(p));
  if (mapped.length > 0) return mapped.slice(0, 2);

  const path = `/services/${slug}/`;
  return projects()
    .filter((p) => p.relatedServices.some((r) => r === path || r.includes(slug)))
    .slice(0, 2);
}

function ServiceCta({ text, message }: { text: string; message: string }) {
  return (
    <div className="mt-6 rounded-xl border border-flame/30 bg-orange-50 p-4">
      <p className="font-semibold text-ink">{text}</p>
      <ContactButtons className="mt-3" message={message} />
      <p className="mt-2 text-sm text-ink-500">
        Or use the{" "}
        <a className="underline" href="#lead-form">
          quotation form
        </a>
        .
      </p>
    </div>
  );
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) return {};
  return meta({ path: `/services/${s.slug}/`, index: servicesIndexable });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (!s) notFound();
  // Two neighbours in the list (wrapping) so every service page gets inbound links from services that belong with it.
  const idx = services.findIndex((x) => x.slug === s.slug);
  const related = [
    services[(idx + 1) % services.length],
    services[(idx + 2) % services.length],
    services[(idx + services.length - 1) % services.length],
  ];
  const relatedProjects = projectsForService(s.slug);
  const path = `/services/${s.slug}/`;

  const d = serviceDetail[s.slug];
  const faqs = [...s.faqs, ...d.faqs];

  return (
    <PageShell
      crumbs={[
        { name: "Engineering services", href: "/services/" },
        { name: s.name, href: path },
      ]}
      h1={s.name}
      intro={`${s.intro} ${company.shortName} delivers this work nationwide across Pakistan under OGRA licence ${company.licenceNumber}.`}
      aside={
        <SiteLeadForm
          defaultRequest="engineering"
          heading={`Request: ${s.name}`}
          buttonLabel="Request quotation"
          subheading="City, site type and rough load — we confirm scope and timing in writing."
        />
      }
    >
      <p className="text-sm font-medium text-flame-700">For: {s.audience}</p>

      <H2>{s.name}: why it matters</H2>
      {d.why.map((para) => (
        <P key={para.slice(0, 24)}>{para}</P>
      ))}

      <H2>Signs you need it</H2>
      <UL items={d.signs} />

      <H2>{d.tech.title}</H2>
      <SpecTable head={d.tech.head} rows={d.tech.rows} />
      <P>{d.tech.note}</P>

      {d.example && (
        <>
          <H2>Worked example: {d.example.title}</H2>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-ink-700">
            {d.example.lines.map((l) => (
              <li key={l.slice(0, 24)}>{l}</li>
            ))}
          </ol>
        </>
      )}

      <ServiceCta text={d.ctas.mid} message={d.ctas.message} />

      <H2>What is included</H2>
      <UL items={s.scope} />

      <H2>How the job runs</H2>
      <ol className="mt-3 space-y-3">
        {s.process.map((st, i) => (
          <li key={st.title} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {st.title}
            </p>
            <p className="mt-1 text-ink-700">{st.text}</p>
          </li>
        ))}
      </ol>

      <H2>Faults we often find</H2>
      <SpecTable head={["Fault", "Cause and fix"]} rows={d.faults} />

      <H2>What you get in writing</H2>
      <UL items={d.deliverables} />

      <H2>Rules and approvals</H2>
      <P>
        {d.rules} {terms.partnersCertifiedRule}
      </P>

      <H2>What sets the price</H2>
      <UL items={d.costDrivers} />
      <P>
        Every job is quoted in writing. Gas for any cylinders follows the OGRA-notified rate per kg; labour and materials
        are separate lines. {terms.delivery}
      </P>

      <H2>What we need from you</H2>
      <UL items={s.needFromYou} />

      {relatedProjects.length > 0 && (
        <>
          <H2>Related project profiles</H2>
          <P>
            See all{" "}
            <Link className="underline" href="/projects/">
              projects
            </Link>
            .
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

      <H2>Coverage, price and safety</H2>
      <UL
        items={[
          <span key="n">
            Network:{" "}
            <Link className="underline" href="/our-network/">
              our network
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/delivery-areas/">
              delivery areas
            </Link>
          </span>,
          <span key="p">
            Gas rate:{" "}
            <Link className="underline" href="/lpg-price-in-pakistan/">
              LPG price in Pakistan
            </Link>
          </span>,
          <span key="s">
            Safety:{" "}
            <Link className="underline" href="/lpg-safety/">
              LPG safety guide
            </Link>{" "}
            and{" "}
            <Link className="underline" href="/licences-and-compliance/">
              licences and compliance
            </Link>
          </span>,
          <span key="o">
            Cylinder orders:{" "}
            <Link className="underline" href="/order-lpg/">
              order LPG
            </Link>
          </span>,
        ]}
      />

      <H2>Related services</H2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {related.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/services/${r.slug}/`}
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
            >
              {r.name}
            </Link>
          </li>
        ))}
      </ul>
      <P>
        All{" "}
        <Link className="underline" href="/services/">
          LPG engineering services
        </Link>
        ,{" "}
        <Link className="underline" href="/industries/">
          industries
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/commercial-lpg-supply/">
          commercial LPG supply
        </Link>
        .
      </P>

      <ServiceCta text={d.ctas.end} message={d.ctas.message} />
      <P>{terms.responseTime}</P>

      <ImageGallery items={itemsFor(path)} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          description: s.short,
          url: absoluteUrl(path),
          provider: { "@id": absoluteUrl("/#organization") },
          areaServed: { "@type": "Country", name: "Pakistan" },
        }}
      />
    </PageShell>
  );
}

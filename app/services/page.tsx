import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { terms } from "@/lib/commercial";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { projects } from "@/lib/projects";
import { services, servicesIndexable } from "@/lib/services";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/services/", index: servicesIndexable });

const faqs = [
  {
    q: "What engineering services do you offer?",
    a: "Pipelines, manifolds and cylinder banks, storage tanks, boiler and furnace conversion, LPG-air (SNG) systems, safety audits, maintenance (AMC) and cylinder inspection — for homes, societies, hotels, hospitals, restaurants and industry.",
  },
  {
    q: "Do you work nationwide?",
    a: `Yes. ${company.shortName} (OGRA licence ${company.licenceNumber}) engineers and supplies LPG systems across Pakistan. Coverage and timing are confirmed for your street before you agree.`,
  },
  {
    q: "How is a job priced?",
    a: "Every job is quoted in writing after a brief and, where needed, a site assessment. Gas follows the OGRA-notified rate; labour and materials are separate. See LPG price in Pakistan for the current per-kg figure.",
  },
  {
    q: "How fast can you respond?",
    a: `${terms.responseTime} ${terms.delivery}`,
  },
  {
    q: "Are cylinders certified?",
    a: terms.partnersCertifiedRule,
  },
];

export default function Page() {
  const sample = projects().slice(0, 4);

  return (
    <PageShell
      crumbs={[{ name: "Engineering services", href: "/services/" }]}
      h1="LPG installation and engineering services across Pakistan"
      intro={`${company.shortName} is your full-service LPG engineering partner nationwide: design, pipelines, manifolds, tanks, boiler and furnace conversions, safety audits and maintenance — for homes, housing societies, hotels, hospitals, restaurants and industry.`}
      aside={
        <SiteLeadForm
          defaultRequest="engineering"
          heading="Request a quotation"
          buttonLabel="Request quotation"
          subheading="City, site type and rough load — written scope before work starts."
        />
      }
    >
      <Note title="Trusted OGRA-licensed engineering" tone="info">
        <p>
          {company.aboutBlurb} Engineering menu: {company.engineering.join("; ")}.
        </p>
      </Note>

      <div className="grid gap-4 sm:grid-cols-2">
        {services.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}/`}
            className="rounded-xl border border-slate-200 p-5 transition hover:border-flame hover:shadow-sm"
          >
            <h2 className="font-semibold text-ink">{s.name}</h2>
            <p className="mt-1 text-sm text-ink-500">{s.audience}</p>
            <p className="mt-2 text-ink-700">{s.short}</p>
          </Link>
        ))}
      </div>

      <H2>How we work</H2>
      <P>
        Every job starts with a brief and a site assessment, followed by a written scope and price, then installation and
        testing before handover. You deal with one trusted company from assessment to aftercare — with certified-cylinder
        supply available through the same network that delivers across Pakistan. {company.terms.delivery}
      </P>
      <P>
        See{" "}
        <Link className="underline" href="/projects/">
          project profiles
        </Link>{" "}
        from Islamabad, Lahore, Karachi, Faisalabad, Peshawar, Quetta, Multan and Rawalpindi. Safety:{" "}
        <Link className="underline" href="/lpg-safety/">
          LPG hazards and safety
        </Link>
        . Licence:{" "}
        <Link className="underline" href="/licences-and-compliance/">
          licences and compliance
        </Link>
        . Supply:{" "}
        <Link className="underline" href="/commercial-lpg-supply/">
          commercial
        </Link>
        ,{" "}
        <Link className="underline" href="/bulk-lpg-supply/">
          bulk
        </Link>
        ,{" "}
        <Link className="underline" href="/industrial-lpg-supply/">
          industrial
        </Link>
        ,{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>
        ,{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          price
        </Link>
        ,{" "}
        <Link className="underline" href="/our-network/">
          network
        </Link>
        .
      </P>

      {sample.length > 0 && (
        <>
          <H2>Recent project profiles</H2>
          <UL
            items={sample.map((p) => (
              <Link key={p.slug} className="underline" href={`/projects/${p.slug}/`}>
                {p.title}
              </Link>
            ))}
          />
        </>
      )}

      <Note title="Talk to us now" tone="info">
        <p>
          Call {company.phoneDisplay} or message us on{" "}
          <a className="underline" href={`https://wa.me/${site.whatsapp}`}>
            WhatsApp
          </a>
          . {terms.responseTime}
        </p>
      </Note>

      <ImageGallery items={itemsFor("/services/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

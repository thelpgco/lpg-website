import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { company } from "@/lib/company/profile";
import { isDemo } from "@/lib/mode";
import { projects } from "@/lib/projects";
import { itemsFor } from "@/lib/media";
import { services } from "@/lib/services";
import { meta } from "@/lib/seo";

const path = "/projects/";

const list = projects();
export const metadata = meta({ path, index: list.length > 0 && !isDemo() });

export default function Page() {
  const has = list.length > 0;

  const faqs = [
    {
      q: "What kinds of LPG projects do you complete?",
      a: "Restaurant and hotel kitchens, hospital catering, housing-society risers, textile and factory heat, poultry brooders, wedding halls, pipelines, manifolds, tanks and conversions — across major cities in Pakistan.",
    },
    {
      q: "Do you work outside Islamabad?",
      a: `Yes. ${company.shortName} supplies and engineers LPG systems nationwide. Profiles on this page span Islamabad, Lahore, Karachi, Faisalabad, Peshawar, Quetta, Multan and Rawalpindi.`,
    },
    {
      q: "How do I get a quote for my site?",
      a: "Send the engineering form with your city, site type and rough load (or call / WhatsApp). We scope the work, confirm equipment and timing, and give a written quotation before anything starts.",
    },
    {
      q: "Are cylinders on engineering jobs certified?",
      a: "Yes — every network partner must supply certified cylinders only. Check the marking and seal on every bottle delivered to your site.",
    },
  ];

  return (
    <PageShell
      crumbs={[{ name: "Projects", href: path }]}
      h1="LPG engineering projects across Pakistan"
      intro={`${company.shortName} delivers LPG supply and engineering from homes to factories — cylinder banks, pipelines, bulk interfaces and conversions — with trusted partners across Pakistan. Browse project profiles, then request a quotation for your site.`}
      aside={<SiteLeadForm defaultRequest="engineering" heading="Request an engineering quote" buttonLabel="Request quotation" />}
    >
      <Note title="Full-service engineering" tone="info">
        <p>
          Each profile covers load survey, certified equipment, pressure and leak checks, staff briefing and aftercare —
          the same process we follow for your site.
        </p>
      </Note>

      {has ? (
        <>
          <H2>Project profiles</H2>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2">
            {list.map((p) => (
              <li key={p.id} className="rounded-xl border border-slate-200 p-5">
                <h3 className="font-semibold text-ink">
                  <Link className="underline" href={`/projects/${p.slug}/`}>
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-ink-500">
                  {p.city} | {p.industry} | {p.completedOn}
                </p>
                <p className="mt-2 text-ink-700">{p.outcome}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Note title="Ask about your site" tone="info">
          <p>
            Tell us about your site and we will quote the work. See{" "}
            <Link className="underline" href="/services/">
              engineering services
            </Link>
            .
          </p>
        </Note>
      )}

      <H2>Full engineering menu</H2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {services.map((s) => (
          <li key={s.slug}>
            <Link href={`/services/${s.slug}/`} className="block h-full rounded-xl border border-slate-200 p-4 hover:border-flame">
              <p className="font-semibold text-ink">{s.name}</p>
              <p className="mt-1 text-sm text-ink-500">{s.audience}</p>
            </Link>
          </li>
        ))}
      </ul>

      <H2>How every job runs</H2>
      <UL
        items={[
          "Brief and site assessment (load, access, safety distances)",
          "Written scope, equipment list and price before work starts",
          "Installation, pressure / leak testing and staff briefing",
          "Handover pack; AMC available for ongoing inspection",
        ]}
      />
      <P>
        Nationwide supply:{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>
        ,{" "}
        <Link className="underline" href="/delivery-areas/">
          delivery areas
        </Link>
        ,{" "}
        <Link className="underline" href="/industries/">
          industries
        </Link>
        .
      </P>

      <ImageGallery items={itemsFor(path)} title="Engineering and equipment" />
      <Faq items={faqs} />
    </PageShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactButtons from "@/components/ContactButtons";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { isDemo } from "@/lib/mode";
import { projectDetail } from "@/lib/project-detail";
import { projectBySlug, projects } from "@/lib/projects";
import { lastmodOf } from "@/lib/pages";
import { meta } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const label = (href: string) =>
  href.replace(/\/$/, "").split("/").filter(Boolean).pop()?.replace(/-/g, " ").replace(/\blpg\b/g, "LPG") ?? href;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  const d = projectDetail[slug];
  return meta({
    path: `/projects/${slug}/`,
    title: d?.metaTitle ?? p.title,
    description: d?.metaDescription ?? p.outcome.slice(0, 160),
    index: !isDemo() && Boolean(d),
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();
  const d = projectDetail[slug];
  const path = `/projects/${p.slug}/`;
  const sector = p.industry.replace(/-/g, " ");

  return (
    <PageShell
      crumbs={[
        { name: "Projects", href: "/projects/" },
        { name: p.title, href: path },
      ]}
      h1={p.title}
      intro={d ? d.challenge : `${sector} · ${p.city} · completed ${p.completedOn}`}
      aside={<SiteLeadForm defaultRequest="engineering" heading="Request a similar project quote" buttonLabel="Request quotation" />}
    >
      <H2>Project at a glance</H2>
      <SpecTable
        head={["", ""]}
        rows={[
          ["Sector", <Link key="s" className="underline capitalize" href={`/industries/${p.industry}/`}>{sector}</Link>],
          ["City", p.city],
          ["Completed", `${p.completedOn} (exact date on request)`],
          ["System", d?.system ?? p.equipment.join(", ")],
          ["Client", "Name withheld; reference on request with the client's consent"],
          ["Site photos", "To be added"],
        ]}
      />

      <H2>What was in scope</H2>
      <UL items={p.scope} />

      {d && (
        <>
          <H2>How the work was done</H2>
          <ol className="mt-3 space-y-3">
            {d.steps.map((st, i) => (
              <li key={st.title} className="rounded-xl bg-slate-50 p-4">
                <p className="font-semibold text-ink">
                  {i + 1}. {st.title}
                </p>
                <p className="mt-1 text-ink-700">{st.text}</p>
              </li>
            ))}
          </ol>
        </>
      )}

      <H2>Equipment used</H2>
      <UL items={p.equipment} />

      {d && (
        <>
          <H2>Checks before handover</H2>
          <UL items={d.checks} />
        </>
      )}

      <H2>Outcome</H2>
      <P>{p.outcome}</P>

      {d && (
        <>
          <H2>What this means for a similar site</H2>
          <P>{d.forYou}</P>
          <div className="mt-6 rounded-xl border border-flame/30 bg-orange-50 p-4">
            <p className="font-semibold text-ink">Planning something similar in {p.city} or elsewhere? Send us your site details.</p>
            <ContactButtons className="mt-3" message={`Assalam o Alaikum, I want a quote for a project like: ${p.title}. `} />
          </div>
        </>
      )}

      {p.relatedServices.length > 0 && (
        <>
          <H2>Related services and pages</H2>
          <UL
            items={p.relatedServices.map((href) => (
              <Link key={href} className="underline capitalize" href={href}>
                {label(href)}
              </Link>
            ))}
          />
        </>
      )}

      <Note title="About this profile" tone="info">
        <p>
          A real project completed by our team between 2011 and 2016. The client is not named here; a reference can be
          arranged with their consent. Site photos will be added.
        </p>
      </Note>

      <P>
        <Link className="underline" href="/projects/">
          Back to all projects
        </Link>
      </P>

      {d && <Faq items={d.faqs} />}
      {d && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: d.metaTitle,
            description: d.metaDescription,
            image: absoluteUrl("/opengraph-image/"),
            mainEntityOfPage: absoluteUrl(path),
            author: { "@id": absoluteUrl("/#organization") },
            publisher: { "@id": absoluteUrl("/#organization") },
            ...(lastmodOf(path) ? { datePublished: lastmodOf(path), dateModified: lastmodOf(path) } : {}),
            about: {
              "@type": "Service",
              name: d.system,
              description: d.forYou,
              areaServed: { "@type": "City", name: p.city },
              provider: { "@id": absoluteUrl("/#organization") },
            },
          }}
        />
      )}
    </PageShell>
  );
}

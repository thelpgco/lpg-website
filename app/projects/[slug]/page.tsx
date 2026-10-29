import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, P, UL } from "@/components/PageShell";
import { isDemo } from "@/lib/mode";
import { projectBySlug, projects } from "@/lib/projects";
import { meta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects().map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return meta({
    path: `/projects/${slug}/`,
    title: p.title.length > 60 ? `${p.title.slice(0, 57)}...` : p.title,
    description: p.outcome.slice(0, 160),
    index: !isDemo(),
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) notFound();

  return (
    <PageShell
      crumbs={[
        { name: "Projects", href: "/projects/" },
        { name: p.title, href: `/projects/${p.slug}/` },
      ]}
      h1={p.title}
      intro={`${p.industry.replace(/-/g, " ")} · ${p.city} · completed ${p.completedOn}`}
      aside={<SiteLeadForm defaultRequest="engineering" heading="Request a similar project quote" buttonLabel="Request quotation" />}
    >
      <H2>Scope</H2>
      <UL items={p.scope} />

      <H2>Equipment</H2>
      <UL items={p.equipment} />

      <H2>Outcome</H2>
      <P>{p.outcome}</P>

      {p.relatedServices.length > 0 && (
        <>
          <H2>Related pages</H2>
          <UL
            items={p.relatedServices.map((href) => (
              <Link key={href} className="underline" href={href}>
                {href.replace(/\/$/, "").split("/").filter(Boolean).pop()?.replace(/-/g, " ") ?? href}
              </Link>
            ))}
          />
        </>
      )}

      <P>
        <Link className="underline" href="/projects/">
          Back to all projects
        </Link>
      </P>
    </PageShell>
  );
}

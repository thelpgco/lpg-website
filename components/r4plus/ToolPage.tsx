import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, UL } from "@/components/PageShell";
import { itemsFor } from "@/lib/media";

// Shared layout for the R6 calculators: calculator first, then method, limits, FAQ.
export default function ToolPage({
  path,
  crumb,
  h1,
  intro,
  calculator,
  children,
  faqs,
  related,
  request = "cylinder_delivery",
  formHeading = "Need LPG supply?",
}: {
  path: string;
  crumb: string;
  h1: string;
  intro: string;
  calculator: React.ReactNode;
  children: React.ReactNode;
  faqs: { q: string; a: string }[];
  related: { href: string; label: string }[];
  request?: string;
  formHeading?: string;
}) {
  return (
    <PageShell
      crumbs={[{ name: crumb, href: path }]}
      h1={h1}
      intro={intro}
      aside={<SiteLeadForm defaultRequest={request} heading={formHeading} />}
    >
      {calculator}
      <Note title="Estimate only" tone="warn">
        <p>
          Results are rough planning figures from the numbers you enter and the assumptions shown. They are not a quote, a
          measurement, an engineering design or a safety check. For a written price send a request; the gas rate follows
          the OGRA notification (confirm the month on file when you order) and delivery and cylinder terms are confirmed
          before you agree.
        </p>
      </Note>
      {children}
      <H2>Related tools and pages</H2>
      <UL
        items={related.map((r) => (
          <Link key={r.href} className="underline" href={r.href}>{r.label}</Link>
        ))}
      />
      <ImageGallery items={itemsFor(path)} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

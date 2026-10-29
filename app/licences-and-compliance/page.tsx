import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import ImageGallery from "@/components/ImageGallery";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { company } from "@/lib/company/profile";
import { itemsFor, media } from "@/lib/media";
import { meta } from "@/lib/seo";
import { terms } from "@/lib/commercial";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/licences-and-compliance/" });

export default function Page() {
  const licence = media.licenceOfficial;
  return (
    <PageShell
      crumbs={[{ name: "Licences and compliance", href: "/licences-and-compliance/" }]}
      h1="Licences and compliance"
      intro={`${company.legalName} is an OGRA-licensed LPG operator. This page states our licence number, how we handle certified cylinders and who reviews our safety content — without inventing documents we do not hold.`}
    >
      <H2>Our OGRA licence</H2>
      <ContentImage src={licence.src} alt={licence.alt} caption={licence.caption} priority />
      <UL
        items={[
          <span key="a">Licensed by: {site.licenceBody}</span>,
          <span key="b">
            Licence number: <strong>{site.licenceNumber}</strong>
          </span>,
          <span key="c">Licence holder: {site.legalName}</span>,
          <span key="d">Head office: {company.officeAddress}</span>,
        ]}
      />
      <P>
        This is our public licensing information for customers. You can also confirm LPG licensing with OGRA on{" "}
        <a className="underline" href="https://www.ogra.org.pk/" target="_blank" rel="noopener noreferrer">
          ogra.org.pk
        </a>
        . Call or WhatsApp {site.phoneDisplay} if you need the licence number for a procurement file.
      </P>

      <H2>Cylinders</H2>
      <P>
        {terms.partnersCertifiedRule} Check the marking and condition on delivery, and do not accept a damaged cylinder.
      </P>

      <H2>Nationwide supply and partners</H2>
      <P>
        We market and distribute LPG and work with distributors who deliver to customers across Pakistan. Partners are
        asked to meet our{" "}
        <Link className="underline" href="/partner-standards/">
          distributor standards
        </Link>
        . Network coverage is summarised on{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>
        .
      </P>

      <H2>Safety content review</H2>
      <P>
        Safety pages are reviewed by {site.safetyReviewer.name} ({site.safetyReviewer.role}) before they carry a review
        date. See the{" "}
        <Link className="underline" href="/lpg-safety/">
          LPG safety guide
        </Link>{" "}
        and our{" "}
        <Link className="underline" href="/editorial-policy/">
          editorial policy
        </Link>
        .
      </P>

      <H2>Engineering work</H2>
      <P>
        Pipelines, manifolds, tanks and conversions are agreed in a written scope and price before work starts. We tell
        you what site rules and checks apply to your job; we do not invent approvals we cannot support.
      </P>

      <Note title="What this page does not claim" tone="info">
        <p>
          We only show documents and markings we can stand behind. Gallery photos here are reference images, not proof of
          a customer site or a third-party certificate you have not been shown in person.
        </p>
      </Note>

      <H2>More about us</H2>
      <P>
        Read{" "}
        <Link className="underline" href="/about/">
          about us
        </Link>
        , our{" "}
        <Link className="underline" href="/pricing-policy/">
          pricing policy
        </Link>
        , or{" "}
        <Link className="underline" href="/contact/">
          contact us
        </Link>{" "}
        to ask about a licence or certificate.
      </P>
      <ImageGallery items={itemsFor("/licences-and-compliance/")} title="Photos" />
    </PageShell>
  );
}

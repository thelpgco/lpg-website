import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import { itemsFor } from "@/lib/media";
import PageShell, { H2, P, UL } from "@/components/PageShell";
import { company } from "@/lib/company/profile";
import { localBusinessNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { addressLine, site } from "@/lib/site";

export const metadata = meta({ path: "/about/" });

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "About us", href: "/about/" }]}
      h1="About THE LPG CO. PAKISTAN"
      intro={company.aboutBlurb}
    >
      <H2>Our story</H2>
      <P>
        Founded and registered in {company.foundedYear}, {company.legalName} ({company.shortName}) has operated for{" "}
        {company.yearsOperating}+ years as a full-service LPG company for Pakistan. We manufacture standard cylinders and
        supply listed appliances, market and distribute under OGRA licence {company.licenceNumber}, and run engineering
        jobs (pipelines, manifolds, tanks, conversions) through teams and partners nationwide. Gas pricing follows the
        monthly OGRA notification; product pricing on what we manufacture is confirmed before you buy.
      </P>

      <H2>What we do</H2>
      <UL items={[...company.activities]} />

      <H2>Residential, commercial and industrial</H2>
      <P>
        <strong>Homes:</strong> {company.residential.join("; ")}.
      </P>
      <P>
        <strong>Commercial kitchens:</strong> {company.commercial.join("; ")}.
      </P>
      <P>
        <strong>Industry:</strong> {company.industrial.join("; ")}.
      </P>
      <P>
        <strong>Engineering:</strong> {company.engineering.join("; ")}.
      </P>

      <H2>Manufacturer and the three order roles</H2>
      <P>
        <strong>Manufacturer:</strong> we produce standard cylinder sizes and hold inventory for dispatch when your area
        can be served.
      </P>
      <P>On each order we also play one of three supply roles — and we tell you which before you agree:</P>
      <UL
        items={[
          "Marketer / distributor — supply through our OGRA-licensed role",
          "Reseller — we source and sell gas or cylinders to you",
          "Referral partner — we pass your order to a distributor in the network who delivers",
        ]}
      />
      <P>
        Detail on the flow:{" "}
        <Link className="underline" href="/how-it-works/">
          how it works
        </Link>
        .
      </P>

      <H2>Licence and safety</H2>
      <P>
        OGRA licence no. {company.licenceNumber}. Cylinders we supply are meant to carry OGRA certification markings —
        check the marking on delivery. Safety pages are reviewed by {company.safetyTeam.name} before they carry a review
        date. Read our{" "}
        <Link className="underline" href="/editorial-policy/">
          editorial policy
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/licences-and-compliance/">
          licences and compliance
        </Link>
        .
      </P>

      <H2>How we treat distributors and complaints</H2>
      <P>
        Partners must meet the{" "}
        <Link className="underline" href="/partner-standards/">
          distributor standards
        </Link>
        , and if something goes wrong you can use our{" "}
        <Link className="underline" href="/complaints/">
          complaints process
        </Link>
        . Read the{" "}
        <Link className="underline" href="/privacy/">
          privacy policy
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/terms/">
          terms of use
        </Link>
        , or{" "}
        <Link className="underline" href="/contact/">
          contact us
        </Link>
        .
      </P>

      <H2>Where we serve</H2>
      <P>
        Head office: {addressLine()}. Supply and engineering cover Azad Kashmir, Islamabad Capital Territory, Punjab,
        Balochistan, Sindh, Khyber Pakhtunkhwa and Gilgit-Baltistan. Same-day and about-one-hour delivery targets apply
        in covered network areas when a local team is available; every order still confirms your street and window. See{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>
        ,{" "}
        <Link className="underline" href="/delivery-areas/">
          delivery areas
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/projects/">
          projects
        </Link>
        .
      </P>
      <P>
        Call or WhatsApp {site.phoneDisplay}. We aim to reply {site.responseTime} on the same number. Follow us @
        {site.socialHandle} on{" "}
        <a className="underline" href={site.social.facebook} rel="noopener noreferrer" target="_blank">
          Facebook
        </a>
        ,{" "}
        <a className="underline" href={site.social.instagram} rel="noopener noreferrer" target="_blank">
          Instagram
        </a>{" "}
        and our other linked profiles.
      </P>
      <ImageGallery items={itemsFor("/about/")} title="Photos" />
      <JsonLd data={localBusinessNode()} />
    </PageShell>
  );
}

import Link from "next/link";
import ContactButtons from "@/components/ContactButtons";
import ImageGallery from "@/components/ImageGallery";
import { itemsFor } from "@/lib/media";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { company } from "@/lib/company/profile";
import { localBusinessNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { addressLine, site } from "@/lib/site";

export const metadata = meta({ path: "/contact/" });

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Contact", href: "/contact/" }]}
      h1="Contact THE LPG CO. PAKISTAN"
      intro={`Call or WhatsApp ${site.phoneDisplay} — we aim to reply ${site.responseTime} on the same number — or send the form and we will call you back. Head office is in Islamabad; orders are fulfilled nationwide through our network.`}
      aside={<SiteLeadForm heading="Send us a message" />}
    >
      <ContactButtons />

      <H2>Phone and WhatsApp</H2>
      <p className="mt-2 text-ink-700">{site.phoneDisplay}</p>
      <P>
        Use the same number for cylinder orders, appliance quotes, commercial supply and engineering briefs. Tell us your
        city and what you need first so we can route you correctly.
      </P>

      <H2>What to have ready</H2>
      <UL
        items={[
          "Your city and area (street or landmark helps for delivery)",
          "Cylinder size or appliance type, if you know it",
          "Whether you need a refill, exchange, new connection or a quote",
        ]}
      />

      <H2>Social</H2>
      <p className="mt-2 text-ink-700">
        @{site.socialHandle} —{" "}
        <a className="underline" href={site.social.facebook} rel="noopener noreferrer" target="_blank">
          Facebook
        </a>
        ,{" "}
        <a className="underline" href={site.social.instagram} rel="noopener noreferrer" target="_blank">
          Instagram
        </a>
        ,{" "}
        <a className="underline" href={site.social.linkedin} rel="noopener noreferrer" target="_blank">
          LinkedIn
        </a>
      </p>

      <H2>Office</H2>
      <address className="mt-2 not-italic text-ink-700">
        {site.name}
        <br />
        {addressLine()}
      </address>
      <P>
        OGRA licence {company.licenceNumber}. Visiting the office is by arrangement — for most orders, call or WhatsApp is
        faster than a walk-in.
      </P>
      {site.email && (
        <>
          <H2>Email</H2>
          <p className="mt-2 text-ink-700">
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </>
      )}

      <Note tone="danger" title="Smell gas?">
        <p>Do not contact us first. Leave the area and call your local emergency or fire service (for example 1122 where available).</p>
      </Note>

      <H2>Useful pages before you call</H2>
      <P>
        <Link className="underline" href="/how-it-works/">
          How ordering works
        </Link>
        ,{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG rate in Pakistan
        </Link>
        ,{" "}
        <Link className="underline" href="/delivery-areas/">
          delivery areas
        </Link>
        ,{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>
        . To raise a problem with an order, use our{" "}
        <Link className="underline" href="/complaints/">
          complaints page
        </Link>
        .
      </P>
      <ImageGallery items={itemsFor("/contact/")} title="Photos" />
      <JsonLd data={localBusinessNode()} />
    </PageShell>
  );
}

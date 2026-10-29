import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { meta } from "@/lib/seo";
import { terms } from "@/lib/commercial";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/partner-standards/" });

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "How it works", href: "/how-it-works/" },
        { name: "Distributor standards", href: "/partner-standards/" },
      ]}
      h1="LPG distributor standards: what our partners must meet"
      intro={`${company.shortName} passes orders to distributors and suppliers in its nationwide network. These are the operating standards we ask each partner to meet before they receive orders from us.`}
    >
      <Note title="Why this matters to you" tone="info">
        <p>
          When a partner delivers your cylinder, you should still know who is supplying you, what you pay and that the
          cylinder carries a valid certification marking. Ask on the call if anything is unclear.
        </p>
      </Note>

      <H2>What we ask of every partner</H2>
      <UL
        items={[
          "A valid licence or authorisation to sell LPG in their area, which we ask to see.",
          terms.partnersCertifiedRule,
          "Cylinders in sound condition: no deep dents, heavy rust or leaking valves.",
          "A written price list, so that the price we quote you is the price you pay.",
          "Delivery with a connection check: the cylinder is connected and checked with you before the delivery person leaves.",
          "A named contact and a working phone number we can reach.",
          "Honest dealings with customers, including telling you who the supplier is.",
        ]}
      />

      <H2>How we check partners</H2>
      <P>
        We ask for the licence and speak to the partner before sending them orders. Named dealers on city and network
        pages are partners we list for customers. Coverage by area is on the{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>{" "}
        page. Delivery targets follow our commercial terms: {terms.delivery}
      </P>

      <H2>When a partner falls short</H2>
      <P>
        If an order goes wrong, tell us through the{" "}
        <Link className="underline" href="/complaints/">
          complaints page
        </Link>{" "}
        or call {site.phoneDisplay}. We look into it with the partner. Partners that repeatedly fall short stop receiving
        our orders.
      </P>

      <H2>Want to join?</H2>
      <P>
        If you supply LPG and want to join, read{" "}
        <Link className="underline" href="/become-an-lpg-distributor/">
          how to become a distributor
        </Link>
        . For how an order flows and the roles we play, see{" "}
        <Link className="underline" href="/how-it-works/">
          how ordering works
        </Link>
        .
      </P>

      <ImageGallery items={itemsFor("/partner-standards/")} title="Photos" />
      <Note title="How we apply these standards">
        <p>
          These are the operating standards we use when selecting and reviewing distributors. Ask us on the call how they
          apply to your area.
        </p>
      </Note>
    </PageShell>
  );
}

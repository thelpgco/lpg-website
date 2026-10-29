import Link from "next/link";
import PageShell, { H2, P, UL } from "@/components/PageShell";
import { company } from "@/lib/company/profile";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/terms/" });

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Terms", href: "/terms/" }]}
      h1="Terms of use"
      intro={`By using this website or sending a request, you agree to these terms with ${company.name}, an OGRA-licensed LPG company (licence ${company.licenceNumber}).`}
    >
      <H2>Information on this site</H2>
      <P>
        We try to keep the information accurate, but prices change monthly and availability varies by area. Calculators
        and planning tools are estimates. The price we confirm when you order applies to that order.
      </P>

      <H2>Requests and orders</H2>
      <P>
        Sending a form is a request, not a binding order. An order is agreed when we confirm the price, quantity and
        delivery details with you.
      </P>
      <UL
        items={[
          "You must give a reachable phone number and a delivery location we can use",
          "You may refuse a damaged cylinder or appliance before paying — tell us at once",
          "Gas follows the OGRA consumer rate for the month; deposit, exchange and delivery are confirmed separately",
        ]}
      />

      <H2>Delivery by partners</H2>
      <P>
        Some orders are delivered by partner distributors. We tell you when this applies. Partners are asked to meet our{" "}
        <Link className="underline" href="/partner-standards/">
          distributor standards
        </Link>
        .
      </P>

      <H2>Safety</H2>
      <P>
        The safety information on this site is general. Follow the instructions that come with your appliance and
        cylinder, and seek help from a qualified person for installation and repairs. If you smell gas, leave the area
        and call emergency services before contacting us.
      </P>

      <H2>Engineering services</H2>
      <P>Engineering work is agreed in a written scope and price before work starts.</P>

      <H2>Your information and complaints</H2>
      <P>
        How we handle your details is in the{" "}
        <Link className="underline" href="/privacy/">
          privacy policy
        </Link>
        . If an order goes wrong, use the{" "}
        <Link className="underline" href="/complaints/">
          complaints page
        </Link>
        . How an order works is on{" "}
        <Link className="underline" href="/how-it-works/">
          how it works
        </Link>
        .
      </P>

      <H2>Changes</H2>
      <P>
        We may update these terms. The version on this page applies when you use the site.{" "}
        <Link className="underline" href="/contact/">
          Contact us
        </Link>{" "}
        or call {site.phoneDisplay} with any question.
      </P>
    </PageShell>
  );
}

import Link from "next/link";
import PageShell, { H2, P, UL } from "@/components/PageShell";
import { company } from "@/lib/company/profile";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/privacy/" });

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Privacy", href: "/privacy/" }]}
      h1="Privacy policy"
      intro={`This explains how ${company.name} handles the information you give us when you order LPG, request a quote or contact us nationwide.`}
    >
      <H2>What we collect</H2>
      <UL
        items={[
          "Your name, phone number, city and request details when you use a form, call or WhatsApp us",
          "The page you were on when you sent the request, and where you came from (for example a search engine or an advertising link), so we can see which pages help people",
          "A record of the consent wording you agreed to, and the time you agreed",
          "Basic site usage data. We may use Google Analytics to count visits and clicks on the call and WhatsApp buttons. It uses cookies or similar technology and does not tell us who you are",
        ]}
      />

      <H2>How we use it</H2>
      <UL
        items={[
          "To contact you about your request",
          "To pass your request to the distributor who will serve you, so they can deliver",
          "To keep business records and improve our service",
          "To understand which pages and sources lead to requests",
        ]}
      />
      <P>
        Read how the order process works on{" "}
        <Link className="underline" href="/how-it-works/">
          how it works
        </Link>{" "}
        and the standards we ask of the distributors who receive your details on the{" "}
        <Link className="underline" href="/partner-standards/">
          distributor standards
        </Link>{" "}
        page.
      </P>

      <H2>Sharing</H2>
      <P>
        We share your name, phone number, city and request with the distributor who fulfils your order. We do not sell
        your information. We may share details with regulators or law enforcement when the law requires it.
      </P>

      <H2>How long we keep it</H2>
      <P>
        We keep order and contact records as long as needed for delivery, complaints and ordinary business records, then
        delete or anonymise them when they are no longer required. Analytics data follows the tool&apos;s retention
        settings.
      </P>

      <H2>Your choices</H2>
      <P>
        To ask us to correct or delete your information, call or WhatsApp {site.phoneDisplay}. You can also use the{" "}
        <Link className="underline" href="/contact/">
          contact page
        </Link>
        .
      </P>

      <H2>Address</H2>
      <P>
        {site.name}, {site.office.line1}, {site.office.city}, {site.office.country}. OGRA licence{" "}
        {company.licenceNumber}.
      </P>
    </PageShell>
  );
}

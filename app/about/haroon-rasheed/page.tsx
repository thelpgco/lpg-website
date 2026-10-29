import Link from "next/link";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { company } from "@/lib/company/profile";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/about/haroon-rasheed/";

// Kept as a thin, honest landing URL (noindex). Public safety byline is the company safety team, not a personal profile.
export const metadata = meta({ path, index: false });

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "About us", href: "/about/" },
        { name: "Safety leadership", href: path },
      ]}
      h1="Safety leadership — company page"
      intro={`This address is not a personal biography. ${company.shortName} publishes safety review under the company safety team, not under a named individual on the public site. For who we are and how to contact us, use the pages below.`}
    >
      <Note title="Why this page is short" tone="info">
        <p>
          We do not publish personal names, photographs or individual credentials for safety reviewers here. If you
          followed an old or internal link to this URL, the company information you need is on About and the safety
          guides.
        </p>
      </Note>

      <H2>Where to go instead</H2>
      <UL
        items={[
          <span key="a">
            <Link className="underline" href="/about/">
              About {company.shortName}
            </Link>{" "}
            — OGRA licence {company.licenceNumber}, office at {company.officeAddress}, what we do nationwide
          </span>,
          <span key="s">
            <Link className="underline" href="/lpg-safety/">
              LPG safety guide
            </Link>{" "}
            — reviewed by {site.safetyReviewer.name} before a review date is shown
          </span>,
          <span key="w">
            <Link className="underline" href="/what-to-do-if-you-smell-gas/">
              What to do if you smell gas
            </Link>
          </span>,
          <span key="e">
            <Link className="underline" href="/editorial-policy/">
              Editorial policy
            </Link>{" "}
            — how we source prices and safety copy
          </span>,
          <span key="l">
            <Link className="underline" href="/licences-and-compliance/">
              Licences and compliance
            </Link>
          </span>,
        ]}
      />

      <H2>Contact</H2>
      <P>
        Call or WhatsApp {site.phoneDisplay}. We aim to reply {company.responseTime} during active hours. Safety
        emergencies: leave the area and call local emergency services first — then tell us.
      </P>
    </PageShell>
  );
}

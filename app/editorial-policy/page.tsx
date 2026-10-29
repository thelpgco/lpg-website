import Link from "next/link";
import Faq from "@/components/Faq";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { company } from "@/lib/company/profile";
import { latestPrice } from "@/lib/prices";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/editorial-policy/" });

const faqs = [
  {
    q: "How do you source LPG prices?",
    a: "From the monthly OGRA consumer notification cycle. We publish the per-kg rate with month, effective date and a link to OGRA. If our entry note says the figure was checked via press coverage of that cycle pending PDF re-check, the price pages say so. Confirm against OGRA when you need absolute certainty that day.",
  },
  {
    q: "Who reviews safety pages?",
    a: `${site.safetyReviewer.name} provides ${site.safetyReviewer.role.toLowerCase()}. A review date appears on a page only after that review. We do not publish personal reviewer names on the site.`,
  },
  {
    q: "How do I report a mistake?",
    a: `Call or WhatsApp ${site.phoneDisplay}. There is no separate public corrections log yet; the corrected page is the record.`,
  },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Editorial policy", href: "/editorial-policy/" }]}
      h1="Editorial policy"
      intro={`We want you to trust what you read on ${company.shortName} pages — especially on prices and safety. When we do not know something, we say so. When a number is confirmed only on the order call, we do not invent it for the page.`}
    >
      <Note title="Core rule" tone="info">
        <p>
          No fabricated delivery times, partner counts, deposit amounts, licence numbers or appliance price lists. Public
          pages never name internal research files or draft workflow labels.
        </p>
      </Note>

      <H2>What we publish</H2>
      <UL
        items={[
          "Gas prices with the month, effective date and a link to the OGRA notified-prices source. When the on-file entry relies on the notification cycle (including press summaries) pending PDF re-check, price pages disclose that.",
          "Safety content reviewed by our safety team before it carries a review date.",
          "Named dealers and listing counts from our public directory helpers — labelled as listings on file, not as a full street map.",
          "Appliance and accessory pages that quote price on request until a standing list is verified.",
          "Commercial terms (deposit, exchange, delivery) in the wording the company has confirmed — amounts stay quote-confirmed unless a figure is already in that wording.",
        ]}
      />
      {latestPrice && (
        <P>
          Current price entry on file was verified by {latestPrice.verifiedBy} on {latestPrice.verifiedOn}. See{" "}
          <Link className="underline" href="/lpg-price-in-pakistan/">
            LPG price in Pakistan
          </Link>{" "}
          and{" "}
          <Link className="underline" href="/pricing-policy/">
            pricing policy
          </Link>
          .
        </P>
      )}

      <H2>Sources we prefer</H2>
      <UL
        items={[
          "OGRA notifications and official pages for price and licensing",
          "Owner-confirmed company facts (licence number, office address, commercial terms)",
          "Named-dealer directory used on city and network pages",
          "Safety review sign-off before a safety page shows a review date",
        ]}
      />
      <P>
        We do not cite competitor gossip as fact. We do not present planning calculators as binding quotes.
      </P>

      <H2>Reviewers</H2>
      <P>
        Safety content is reviewed by {site.safetyReviewer.name} ({site.safetyReviewer.role}). A page shows a review date
        only after that review. Personal reviewer names are not published on the site. Company background:{" "}
        <Link className="underline" href="/about/">
          about us
        </Link>
        .
      </P>

      <H2>Updates and corrections</H2>
      <P>
        We update prices when OGRA notifies a new consumer price and review guides when facts change. If you find a
        mistake, call or WhatsApp {site.phoneDisplay} and we will correct it. There is no separate public corrections log
        yet; the corrected page is the record. Complaints about an order are handled on the{" "}
        <Link className="underline" href="/complaints/">
          complaints
        </Link>{" "}
        page.
      </P>

      <H2>Commercial interest</H2>
      <P>
        We sell LPG, cylinders, appliances and services. Our guides help you understand LPG, and we say clearly where we
        are the seller. Calculators are planning tools, not quotes — see our{" "}
        <Link className="underline" href="/pricing-policy/">
          pricing policy
        </Link>
        .
      </P>

      <H2>Where this applies</H2>
      <P>
        These rules apply to our{" "}
        <Link className="underline" href="/lpg-safety/">
          LPG safety guide
        </Link>
        , price pages, shop and tool pages, city hubs, and every other guide. Licence display:{" "}
        <Link className="underline" href="/licences-and-compliance/">
          licences and compliance
        </Link>
        .
      </P>

      <Faq items={faqs} />
    </PageShell>
  );
}

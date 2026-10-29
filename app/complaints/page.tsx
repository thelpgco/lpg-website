import Link from "next/link";
import Faq from "@/components/Faq";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/complaints/" });

const faqs = [
  {
    q: "How quickly will you acknowledge my complaint?",
    a: `We aim to acknowledge calls and WhatsApp ${company.responseTime} during active hours. Safety issues are taken first. Form submissions are opened in the same queue — if you need a same-day reply, call ${site.phoneDisplay}.`,
  },
  {
    q: "Do you give a complaint reference number?",
    a: "When we acknowledge your complaint we note the date, your phone number and a short case summary. Ask for that summary to be repeated back to you so you have a clear record. We do not invent a public ticket portal on this page.",
  },
  {
    q: "What if the problem was with a network dealer?",
    a: "Tell us the dealer name if you were given one. We check with that partner against our partner standards and tell you what we found and what we will do.",
  },
  {
    q: "Can I escalate to OGRA?",
    a: "Yes. After using our process, you may also use OGRA’s official channels for licensed marketers. Start at https://www.ogra.org.pk/ and follow the authority’s current complaint instructions. Keep your order details and our responses.",
  },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Complaints", href: "/complaints/" }]}
      h1="Complaints and feedback"
      intro={`If something went wrong with an order, delivery, cylinder, price or partner from ${company.shortName}, tell us. This page explains how to complain, what we do next, how to escalate if you are not satisfied, and when to call emergency services first.`}
      aside={<SiteLeadForm heading="Send a complaint" buttonLabel="Submit complaint" />}
    >
      <Note tone="danger" title="Safety first">
        <p>
          Smell of gas, leak, fire risk or a damaged cylinder? Do not use the cylinder. Leave the area if needed and
          call your local emergency service. Then tell us at once on {site.phoneDisplay}. Guidance:{" "}
          <Link className="underline" href="/what-to-do-if-you-smell-gas/">
            what to do if you smell gas
          </Link>
          .
        </p>
      </Note>

      <H2>Channels</H2>
      <SpecTable
        head={["Channel", "How to use it", "Best for"]}
        rows={[
          [
            "Phone / WhatsApp",
            site.phoneDisplay,
            `Urgent issues; we aim to reply ${company.responseTime} during active hours`,
          ],
          [
            "Form on this page",
            "Describe what happened, city, date and order details",
            "Written record when the issue is not an immediate safety emergency",
          ],
          [
            "Contact page",
            <Link key="c" className="underline" href="/contact/">
              Contact
            </Link>,
            "General feedback or when you prefer the main contact form",
          ],
        ]}
      />
      <P>
        Office: {company.officeAddress}. {terms.delivery247Note}
      </P>

      <H2>What to tell us</H2>
      <UL
        items={[
          "Your name, phone number and city / area",
          "Date and what you ordered (size, refill, appliance or service)",
          "Who delivered, if you were told a partner name",
          "What went wrong, with photos if you have them",
          "What outcome you want (replace, refund of an agreed amount, apology, investigation)",
        ]}
      />

      <H2>What we do next</H2>
      <ol className="mt-3 space-y-3">
        {[
          [
            "Acknowledge",
            `We confirm we have your complaint and repeat back the key facts. Aim: ${company.responseTime} on call/WhatsApp during active hours; safety issues first.`,
          ],
          [
            "Investigate",
            "We check with the team or network dealer who handled the order, and against partner standards where a partner was involved.",
          ],
          [
            "Decide and tell you",
            "We tell you what we found and what we will do — replace, refund of an agreed amount, correction of a price error, or another remedy. We do not invent a fixed calendar-day SLA that we cannot keep for every case.",
          ],
          [
            "Close or escalate",
            "If you accept the outcome, we close the case. If not, use the escalation path below.",
          ],
        ].map(([t, d], i) => (
          <li key={t} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {t}
            </p>
            <p className="mt-1 text-ink-700">{d}</p>
          </li>
        ))}
      </ol>

      <H2>Escalation if you are not satisfied</H2>
      <UL
        items={[
          `Ask to speak to a supervisor on ${site.phoneDisplay} and say you are escalating a complaint.`,
          "Write again via the contact page with “escalation” in your message and the date of your first complaint.",
          "Partners are held to our partner standards — ask us to review the partner again if delivery or price honesty failed.",
          "You may also take the matter to OGRA through the authority’s official complaint process for licensed marketers (ogra.org.pk).",
        ]}
      />
      <P>
        How orders are agreed:{" "}
        <Link className="underline" href="/terms/">
          terms of use
        </Link>
        . Pricing honesty:{" "}
        <Link className="underline" href="/pricing-policy/">
          pricing policy
        </Link>
        . Partner expectations:{" "}
        <Link className="underline" href="/partner-standards/">
          partner standards
        </Link>
        .
      </P>

      <H2>What we will not do</H2>
      <UL
        items={[
          "Ignore a safety complaint",
          "Ask you to accept a damaged or unmarked cylinder to “close” a case",
          "Publish a fake resolution timeline we cannot meet",
        ]}
      />

      <Faq items={faqs} />
    </PageShell>
  );
}

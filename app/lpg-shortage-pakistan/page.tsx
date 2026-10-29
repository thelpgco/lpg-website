import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { itemsFor, media } from "@/lib/media";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-shortage-pakistan/" });

type Update = { date: string; headline: string; detail: string; sourceName: string; sourceUrl: string };

const updates: Update[] = [];

const faqs = [
  { q: "Is there an LPG shortage in Pakistan right now?", a: `We post a shortage only with a dated, named source, and none is posted at the moment. For your own area, call your supplier or us on ${site.phoneDisplay} and we will tell you what we can fill.` },
  { q: "What causes an LPG shortage?", a: "The usual causes are late import cargoes, port or shipping delays, a drop in local gas-field output, strikes or transport disruption, and winter demand rising faster than stock. A price change alone does not create a shortage." },
  { q: "Why does LPG demand rise in winter?", a: "People heat homes and water with gas, and pipeline pressure often falls in cold months, so more households turn to cylinders. Demand can rise faster than supply for a few weeks." },
  { q: "Is a cylinder shortage the same as a price rise?", a: "No. A price change is the monthly OGRA notification. A shortage is cylinders not being available. Prices and shortages sometimes arrive together, but they have different causes." },
  { q: "What should I do if my supplier has no stock?", a: "Ask when the next delivery is due, ask a second licensed supplier, and book a refill early. Do not buy from unlabelled sellers or accept uncertified cylinders just because gas is scarce." },
  { q: "Is it safe to store extra cylinders during a shortage?", a: "No. More cylinders at home raise the fire risk. Keep the usual number, upright, ventilated, away from heat, and order a refill when the current cylinder is about a quarter full." },
  { q: "Does THE LPG CO. guarantee stock?", a: `${terms.stockPolicy} We confirm availability and timing before you agree to an order.` },
  { q: "How do I tell a rumour from a real shortage?", a: "A real claim names a date and a source. Ask two licensed suppliers in your area. A sharp OGRA price rise by itself is not a shortage." },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "LPG price in Pakistan", href: "/lpg-price-in-pakistan/" },
        { name: "LPG shortage in Pakistan", href: "/lpg-shortage-pakistan/" },
      ]}
      h1="LPG shortage in Pakistan: causes, signs and what to do"
      intro={`LPG shortages in Pakistan usually come from late cargoes, port or transport delays, falling local output and winter demand. ${company.shortName} confirms stock and delivery for your area before you agree — this page explains the causes, how to tell a real shortage from a rumour, and how to protect your supply.`}
      aside={<SiteLeadForm heading="Check stock in your area" />}
    >
      <Note title="Current status" tone="info">
        <p>
          We post only shortage reports that carry a date and a named source.{" "}
          {updates.length === 0 ? "None is posted at the moment." : `Latest entry: ${updates[0].date}.`} For stock in
          your area, call or WhatsApp {site.phoneDisplay}.
        </p>
      </Note>

      <ContentImage
        src={media.warehouseCylinders.src}
        alt={media.warehouseCylinders.alt}
        caption="Cylinder stock at a warehouse"
        priority
      />

      <H2>Dated and sourced updates</H2>
      {updates.length > 0 ? (
        <SpecTable
          head={["Date", "What happened", "Source"]}
          rows={updates.map((u) => [
            u.date,
            <span key={u.date}>
              <strong>{u.headline}.</strong> {u.detail}
            </span>,
            <a key={u.sourceUrl} className="underline" href={u.sourceUrl} target="_blank" rel="noopener noreferrer">
              {u.sourceName}
            </a>,
          ])}
        />
      ) : (
        <>
          <P>
            No dated, sourced shortage report is on file for the current month. When one appears, we post it here as a
            dated line with four things: the date, what was reported, the named source (an OGRA notice or a published
            news report) and a link to it. Social media rumours are not posted.
          </P>
          <P>
            If your own area is short of cylinders today, that is a local stock question rather than a national report:
            call or WhatsApp {site.phoneDisplay} and we tell you what we can fill, or use the quick test below to check a
            claim before you act on it.
          </P>
        </>
      )}

      <H2>What causes LPG shortages in Pakistan</H2>
      <SpecTable
        head={["Cause", "How it shows up", "How long it usually lasts"]}
        rows={[
          ["Late or reduced import cargoes", "Terminals and bottling plants run low", "Days to weeks, until a cargo arrives"],
          ["Port, customs or shipping delays", "Cargo waits at port", "Days"],
          ["Lower local gas-field output", "Less LPG extracted at processing plants", "Weeks to months"],
          ["Road, strike or transport disruption", "Tankers cannot reach plants or distributors", "Days"],
          ["Winter demand spike", "Pipeline pressure falls and more homes use cylinders", "Several weeks each winter"],
          ["Panic buying and stockpiling", "Local stocks empty faster than plants refill", "Days, then settles"],
          ["Pricing or policy uncertainty", "Some sellers hold stock back", "Until the notification or rule is clear"],
        ]}
        caption="General causes seen in the LPG chain. Not a report on any one event."
      />

      <H2>Real shortage or rumour? A quick test</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Check whether the claim names a date and a source. A claim with neither is a rumour.</li>
        <li>Ask two licensed suppliers in your area, not one.</li>
        <li>
          Look at the monthly price on{" "}
          <Link className="underline" href="/lpg-price-in-pakistan/">
            LPG price in Pakistan
          </Link>
          . A sharp rise by itself is not a shortage.
        </li>
        <li>Check the OGRA website for notices and press release items.</li>
        <li>If two suppliers say the same thing, treat it as real and plan a refill.</li>
      </ol>

      <H2>How to protect your supply</H2>
      <UL
        items={[
          "Reorder when the cylinder is about a quarter full, not when it is empty.",
          "Keep one supplier you trust, and a second licensed contact as backup.",
          "If you use LPG for business, ask for a written supply arrangement and a spare cylinder bank.",
          "Know your usage. The cylinder duration calculator shows how long a size lasts.",
          "Do not store extra cylinders at home. See LPG safety.",
        ]}
      />
      <P>
        Work out how long a cylinder lasts with the{" "}
        <Link className="underline" href="/tools/lpg-cylinder-duration-calculator/">
          cylinder duration calculator
        </Link>
        . Read the <Link className="underline" href="/lpg-safety/">LPG safety guide</Link> before storing anything
        extra. How the chain works:{" "}
        <Link className="underline" href="/lpg-supply-in-pakistan/">LPG supply in Pakistan</Link>.
      </P>

      <H2>Warning signs of a risky seller during a shortage</H2>
      <UL
        items={[
          "No seller name, licence number or contact.",
          "A cylinder without clear certification markings, or with a dented body or missing seal.",
          "Gas poured from a large cylinder into a small one. This is dangerous. Refuse it.",
          "A price far above the notified rate with no explanation.",
          "No receipt.",
        ]}
      />
      <P>
        Learn{" "}
        <Link className="underline" href="/how-to-choose-a-licensed-lpg-supplier/">
          how to choose a licensed LPG supplier
        </Link>
        .
      </P>

      <H2>Our approach</H2>
      <P>
        {terms.stockPolicy} {terms.delivery247Note} We confirm availability and delivery timing before you agree. See{" "}
        <Link className="underline" href="/how-it-works/">how ordering works</Link>,{" "}
        <Link className="underline" href="/our-network/">our network</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/lpg-shortage-pakistan/")} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: "/lpg-shortage-pakistan/",
          headline: "LPG shortage in Pakistan: causes, signs and what to do",
          description:
            "Why LPG shortages happen in Pakistan, how to tell a real shortage from a rumour, dated updates when sourced, and how to protect your supply.",
        })}
      />
    </PageShell>
  );
}

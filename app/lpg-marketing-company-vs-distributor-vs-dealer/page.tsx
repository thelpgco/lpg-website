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

export const metadata = meta({ path: "/lpg-marketing-company-vs-distributor-vs-dealer/" });

const faqs = [
  { q: "What is an LPG marketing company?", a: "A licensed company that buys or produces bulk LPG, fills cylinders at bottling plants and sells them to the market, usually through distributors and dealers. It carries the licence and the responsibility for the cylinders it puts into the market." },
  { q: "What does an LPG distributor do?", a: "A distributor is appointed by a marketer to cover an area. It stocks filled cylinders, supplies dealers and often delivers to customers." },
  { q: "What is an LPG dealer?", a: "A dealer is a local retailer or delivery point that sells cylinders to households and businesses, usually buying filled cylinders from a distributor or marketer." },
  { q: "Which one should I buy from?", a: "Any of them, as long as the cylinder is certified and the seller can tell you which licensed marketer supplies the gas. Ask for a receipt and check the price against the OGRA notified rate." },
  { q: "Is a dealer licensed by OGRA?", a: "Licensing rules differ by role and change over time. A dealer normally sells cylinders supplied by a licensed marketer. Ask the dealer who their supplier is, and check with OGRA if you need confirmation." },
  { q: "How do I become an LPG distributor?", a: "You work with a licensed marketer and meet its standards and the rules that apply. Our become an LPG distributor page lists what we look for." },
  { q: "What role does THE LPG CO. play?", a: `${company.shortName} holds OGRA licence ${company.licenceNumber} and supplies as marketer, reseller, or by referring an order to a distributor in the network, depending on your area. We tell you which role applies before you agree.` },
  { q: "Who is responsible if a cylinder is unsafe?", a: "Know whose brand and filling mark is on the cylinder. The licensed marketer is accountable for gas quantity and the cylinders it puts into the market; the local seller is accountable for safe handling and delivery. Refuse damaged or unmarked cylinders." },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "Licences and compliance", href: "/licences-and-compliance/" },
        { name: "Marketer vs distributor vs dealer", href: "/lpg-marketing-company-vs-distributor-vs-dealer/" },
      ]}
      h1="LPG marketing company vs distributor vs dealer: who does what"
      intro={`A marketing company holds the licence, fills and brands the cylinders and sells into the market. A distributor is appointed to cover an area and supplies dealers and customers. A dealer is the local retailer who delivers or sells you the cylinder. ${company.shortName} is OGRA-licensed (licence ${company.licenceNumber}) and works nationwide across these roles depending on your area.`}
      aside={<SiteLeadForm heading="Ask who supplies your area" />}
    >
      <Note title="Short answer" tone="info">
        <p>
          Marketer: licensed and responsible for the cylinders and gas. Distributor: area wholesaler and delivery.
          Dealer: the local seller. You can buy from any of them if the cylinder is certified and the seller can name
          the supplier.
        </p>
      </Note>

      <ContentImage src={media.emptyFilled.src} alt={media.emptyFilled.alt} caption="Empty and filled cylinders" priority />

      <H2>The three roles side by side</H2>
      <SpecTable
        head={["Point", "Marketing company", "Distributor", "Dealer"]}
        rows={[
          ["What it does", "Buys or produces bulk LPG, fills and brands cylinders, sells into the market", "Stocks filled cylinders for an area and supplies dealers and customers", "Sells or delivers cylinders to homes and businesses"],
          ["Licensing", "Operates under an OGRA licence", "Appointed by a marketer; rules apply to the role", "Usually supplied by a licensed marketer or distributor"],
          ["Responsible for", "Gas quantity, cylinder quality, safety standards", "Storage, handling and delivery in its area", "Handling, storage and safe delivery at retail"],
          ["Who you deal with", "Rarely, unless buying in bulk", "Commercial customers and dealers", "Most households"],
          ["Pricing", "Sets prices within the OGRA notified framework", "Passes on gas price plus its margin", "Adds delivery and local handling"],
        ]}
        caption="General description. Terms and licence details can change; check with OGRA for specifics."
      />

      <H2>How a cylinder moves from marketer to you</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>The marketing company fills and seals cylinders at its bottling plant.</li>
        <li>Cylinders go to the distributor&apos;s depot.</li>
        <li>The distributor supplies dealers and also delivers to larger customers.</li>
        <li>A dealer or delivery person brings a filled cylinder to you and takes the empty back.</li>
      </ol>
      <P>
        Production and bottling detail:{" "}
        <Link className="underline" href="/how-lpg-is-produced-and-supplied/">how LPG is produced and supplied</Link>.
      </P>

      <H2>Why it matters to you</H2>
      <UL
        items={[
          "If something is wrong with the gas or the cylinder, the licensed marketer is ultimately accountable. Know whose cylinder you hold.",
          "Brands and cylinders should not be mixed: refill with the right marketer or the one who accepts your cylinder.",
          "A dealer who cannot name the supplier is a risk.",
          "For a business, a distributor can arrange regular supply, a cylinder bank or a pipeline.",
        ]}
      />

      <H2>Questions to ask any seller</H2>
      <UL
        items={[
          "Which licensed marketer supplied this cylinder?",
          "What is the gas price per kg today, and what do delivery and deposit add?",
          "Can I see the certification marking, the seal and the empty weight?",
          "What happens if there is a problem? Who do I call?",
        ]}
      />
      <P>
        Use the full list on{" "}
        <Link className="underline" href="/how-to-choose-a-licensed-lpg-supplier/">
          how to choose a licensed LPG supplier
        </Link>
        , and read{" "}
        <Link className="underline" href="/ogra-lpg-regulations-pakistan/">OGRA LPG regulations in Pakistan</Link>.
      </P>

      <H2>Starting a shop or distributorship</H2>
      <P>
        If you want to sell rather than buy, pick the role first, then check the licence or appointment path. See{" "}
        <Link className="underline" href="/lpg-business-in-pakistan/">LPG business in Pakistan</Link> and{" "}
        <Link className="underline" href="/become-an-lpg-distributor/">become an LPG distributor</Link>. Partners follow
        our <Link className="underline" href="/partner-standards/">distributor standards</Link>:{" "}
        {terms.partnersCertifiedRule}
      </P>

      <H2>Where we fit</H2>
      <P>
        {company.aboutBlurb} Distributors and dealers who work with us must supply only certified cylinders. See{" "}
        <Link className="underline" href="/our-network/">our network</Link>,{" "}
        <Link className="underline" href="/how-it-works/">how ordering works</Link>,{" "}
        <Link className="underline" href="/licences-and-compliance/">licences and compliance</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/lpg-marketing-company-vs-distributor-vs-dealer/")} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: "/lpg-marketing-company-vs-distributor-vs-dealer/",
          headline: "LPG marketing company vs distributor vs dealer: who does what",
          description:
            "What an LPG marketing company, distributor and dealer each do, who is responsible for the cylinder, and what to ask before you buy.",
        })}
      />
    </PageShell>
  );
}

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
import { latestPrice, pkr } from "@/lib/prices";
import { monthLong } from "@/lib/money";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/ogra-lpg-regulations-pakistan/" });

const faqs = [
  { q: "What does OGRA do for LPG?", a: "OGRA, the Oil and Gas Regulatory Authority, licenses LPG marketing and related activities and notifies the monthly consumer price. It also handles complaints about licensed LPG businesses." },
  { q: "Do LPG sellers need an OGRA licence?", a: "Companies that market LPG operate under OGRA licensing. Small dealers usually buy from a licensed marketer or distributor. If you are unsure about a seller, ask who supplies them and for the licence details." },
  { q: "Where can I check the official LPG price?", a: latestPrice ? `On the OGRA website under LPG notified prices. Our verified figure for ${monthLong(latestPrice.month)} is ${pkr(latestPrice.perKgPkr)} per kg — see LPG price in Pakistan.` : "On the OGRA website under LPG notified prices. We copy a month into our price file only after our team checks it." },
  { q: "Is gas poured from one cylinder into another allowed?", a: "It is dangerous and should never be done or accepted. Cylinders should be filled at proper filling plants by weight. Treat refilling at a shop from another cylinder as unsafe and refuse it." },
  { q: "Who sets the cylinder standards?", a: "Cylinder design, testing and storage safety are covered by national standards and explosives or pressure-vessel rules, not only by OGRA. Cylinders should carry certification markings and be inside their test period." },
  { q: "How do I complain about an LPG supplier?", a: "First ask the supplier in writing. If that fails, you can contact OGRA through its complaints process on the official website. Keep the receipt, the cylinder details and photos." },
  { q: "Is this legal advice?", a: "No. It is a plain-language summary based on public information. Rules change, so check the primary text on the OGRA website before you rely on any detail." },
  { q: "What is THE LPG CO.'s licence number?", a: `${company.legalName} holds OGRA licence ${company.licenceNumber}. See licences and compliance for details.` },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "Licences and compliance", href: "/licences-and-compliance/" },
        { name: "OGRA LPG regulations", href: "/ogra-lpg-regulations-pakistan/" },
      ]}
      h1="OGRA LPG regulations in Pakistan: licences, prices and your rights"
      intro={`OGRA, the Oil and Gas Regulatory Authority, licenses LPG marketing and notifies the monthly consumer price. ${company.shortName} operates under OGRA licence ${company.licenceNumber}. This is a plain-language buyer guide — not a substitute for the official rules.`}
      aside={<SiteLeadForm heading="Order from a licensed marketer" />}
    >
      <Note title="Read this first" tone="warn">
        <p>
          This is a plain-language summary, not legal advice. Rules change. For the exact text, use the official OGRA
          website at{" "}
          <a className="underline" href="https://www.ogra.org.pk/" target="_blank" rel="noopener noreferrer">
            ogra.org.pk
          </a>
          .
        </p>
      </Note>

      <ContentImage
        src={media.licenceOfficial.src}
        alt={media.licenceOfficial.alt}
        caption={media.licenceOfficial.caption}
        priority
      />

      <H2>What OGRA is</H2>
      <P>
        OGRA is the federal regulator for the downstream oil and gas sector in Pakistan. For LPG, it licenses marketing,
        notifies the monthly price, and takes complaints about licensed businesses. It does not deliver gas and it does
        not run the cylinder standards on its own.
      </P>

      <H2>Who regulates what in the LPG chain</H2>
      <SpecTable
        head={["Area", "Main body or rule type", "What it means for you"]}
        rows={[
          ["Licensing of LPG marketing", "OGRA", "A marketer should hold a valid OGRA licence"],
          ["Monthly consumer price", "OGRA notification", "The reference price per kg for gas"],
          ["Complaints about licensed LPG businesses", "OGRA", "A route if the supplier does not fix a problem"],
          ["Cylinder design and quality", "National standards bodies", "Cylinders should carry certification markings"],
          ["Pressure vessel and storage safety", "Explosives and pressure-vessel inspection rules", "Storage and testing have to follow safety rules"],
          ["Local fire and building safety", "Provincial and city authorities", "Commercial sites need to follow local safety rules"],
        ]}
        caption="Simplified overview. Check the current rules for your case."
      />

      <H2>Marketer vs distributor: the two roles at a high level</H2>
      <SpecTable
        head={["", "Marketer", "Distributor"]}
        rows={[
          ["In plain words", "The company that sources LPG and sells it under its own brand or name", "The business that stores and delivers cylinders or gas to dealers and customers in an area"],
          ["Relationship to OGRA", "Operates under an OGRA licence for LPG marketing", "Usually works under a licensed marketer; ask the distributor which one, and what authority it holds"],
          ["What you can ask", "Licence number and category", "Which marketer supplies you, and who is responsible if something goes wrong"],
          ["Where you meet them", "Brand, head office, sometimes direct supply", "Local delivery, refill and exchange"],
        ]}
        caption="Simplified. How roles and licence categories are defined is set by OGRA — confirm the current position on its website."
      />
      <P>
        {company.legalName} acts as both a licensed marketer and distributor (licence {company.licenceNumber}), and may
        supply directly or through a partner in its network. We say which before you agree. For the longer comparison,
        including dealers and shops, read{" "}
        <Link className="underline" href="/lpg-marketing-company-vs-distributor-vs-dealer/">
          marketing company vs distributor vs dealer
        </Link>
        .
      </P>

      <H2>What this means when you buy</H2>
      <UL
        items={[
          "Buy from a supplier who can tell you who licenses or supplies them.",
          "Use the OGRA monthly price as your reference for gas by weight.",
          "Check that the cylinder carries valid certification markings and is not damaged.",
          "Expect a receipt. Keep it, with the cylinder details, if you ever need to complain.",
        ]}
      />
      <P>{terms.partnersCertifiedRule}</P>

      <H2>Your checklist: ask a supplier these seven things</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>What is your OGRA licence number, or who is the licensed marketer you supply for?</li>
        <li>What is the gas price per kg today, and is it the OGRA notified price?</li>
        <li>What are the delivery, deposit and exchange terms, in writing?</li>
        <li>Is the cylinder certified and within its test period?</li>
        <li>Is the valve sealed and is the cylinder filled at a proper plant by weight?</li>
        <li>Will you check the connection with me at delivery?</li>
        <li>How do I reach you if something is wrong?</li>
      </ol>
      <P>
        Full buying guide:{" "}
        <Link className="underline" href="/how-to-choose-a-licensed-lpg-supplier/">
          how to choose a licensed LPG supplier
        </Link>
        .
      </P>

      <H2>Prices and OGRA</H2>
      <P>
        OGRA notifies a consumer price each month
        {latestPrice ? ` — currently ${pkr(latestPrice.perKgPkr)} per kg (${monthLong(latestPrice.month)})` : ""}.
        Delivery, deposit and handling can change your final total. See{" "}
        <Link className="underline" href="/ogra-lpg-notified-price/">the OGRA notified LPG price</Link>,{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">LPG rate in Pakistan today</Link>, and{" "}
        <Link className="underline" href="/why-lpg-prices-change-in-pakistan/">why prices change</Link>.
      </P>

      <H2>If something goes wrong</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>
          Stop using a leaking or damaged cylinder. Follow{" "}
          <Link className="underline" href="/what-to-do-if-you-smell-gas/">
            what to do if you smell gas
          </Link>
          .
        </li>
        <li>Photograph the cylinder markings, valve and receipt.</li>
        <li>Complain to the supplier in writing.</li>
        <li>If the supplier does not fix it, use the complaint route on the OGRA website.</li>
      </ol>
      <P>
        Our route: <Link className="underline" href="/complaints/">complaints</Link>. Safety hub:{" "}
        <Link className="underline" href="/lpg-safety/">LPG safety</Link>.
      </P>

      <H2>Our licence and how to order</H2>
      <P>
        See <Link className="underline" href="/licences-and-compliance/">licences and compliance</Link>,{" "}
        <Link className="underline" href="/how-it-works/">how ordering works</Link>,{" "}
        <Link className="underline" href="/our-network/">our network</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/ogra-lpg-regulations-pakistan/")} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: "/ogra-lpg-regulations-pakistan/",
          headline: "OGRA LPG regulations in Pakistan: licences, prices and your rights",
          description:
            "A plain-language guide to what OGRA does for LPG in Pakistan: licensing, monthly price, complaints and a checklist for buyers.",
        })}
      />
    </PageShell>
  );
}

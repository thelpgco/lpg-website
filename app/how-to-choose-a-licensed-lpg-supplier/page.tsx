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

export const metadata = meta({ path: "/how-to-choose-a-licensed-lpg-supplier/" });

const faqs = [
  { q: "How do I know if an LPG supplier is licensed?", a: "Ask for the OGRA licence number and the name on it. For a dealer, ask which licensed marketer supplies the cylinders. You can confirm licensing with OGRA directly." },
  { q: "What is the biggest red flag when buying LPG?", a: "Gas poured from a large cylinder into a small one, or a cylinder with no certification marking, a dented body or a missing seal. All three are unsafe. Refuse them." },
  { q: "Should I pick the cheapest LPG supplier?", a: "No. Compare the OGRA notified gas price first. A price well below it can mean short weight, a worn cylinder or an unlicensed source. A price well above should come with a clear reason." },
  { q: "How can I check the weight of a cylinder?", a: "The cylinder shoulder shows the empty (tare) weight. A full cylinder should weigh the tare plus the gas weight, for example tare plus 11.8 kg for a domestic cylinder. Ask the delivery person to weigh it." },
  { q: "What documents should I get?", a: "A receipt showing the date, supplier, cylinder size, gas price, delivery and any deposit. Keep it. If a deposit applies, the receipt should say so." },
  { q: "Can I trust a supplier from social media?", a: "Treat it like any other seller: ask for the licence number, check the cylinder on arrival, and get a receipt. A page with no licence details is a warning sign." },
  { q: "What does THE LPG CO. offer?", a: `${company.shortName} holds OGRA licence ${company.licenceNumber}. ${terms.partnersCertifiedRule} ${terms.delivery}` },
  { q: "What is today's OGRA gas rate?", a: latestPrice ? `${pkr(latestPrice.perKgPkr)} per kg (${monthLong(latestPrice.month)}). Multiply by your cylinder's gas weight, then ask for delivery and deposit separately.` : "See the LPG price in Pakistan page for the latest verified OGRA notification." },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "Licences and compliance", href: "/licences-and-compliance/" },
        { name: "Choose a licensed LPG supplier", href: "/how-to-choose-a-licensed-lpg-supplier/" },
      ]}
      h1="How to choose a licensed LPG supplier in Pakistan"
      intro={`A good LPG supplier can name its OGRA licence, supplies certified cylinders, fills by weight at a proper plant, quotes gas, delivery and deposit separately, and gives a receipt. ${company.shortName} is an OGRA-licensed marketer and distributor (licence ${company.licenceNumber}) with nationwide delivery through our network — use the checklists below before you order from anyone.`}
      aside={<SiteLeadForm heading="Order from a licensed supplier" />}
    >
      <Note title="Short answer" tone="info">
        <p>
          Ask for the licence number, check the cylinder marking and seal, compare the price with the OGRA notified
          rate, and get a receipt. If any of these is missing, look elsewhere.
        </p>
      </Note>

      <ContentImage
        src={media.licenceOfficial.src}
        alt={media.licenceOfficial.alt}
        caption={media.licenceOfficial.caption}
        priority
      />

      <H2>The 10-point supplier checklist</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>The supplier gives an OGRA licence number, or names the licensed marketer behind the cylinders.</li>
        <li>You can reach a real phone number and an address or office.</li>
        <li>The gas price matches the current OGRA notified rate. Delivery and deposit are quoted separately.</li>
        <li>Cylinders carry clear certification markings and are within their test period.</li>
        <li>The valve is sealed or has a safety cap.</li>
        <li>The cylinder body has no deep dents, heavy rust or damage.</li>
        <li>Weight is checked: tare plus gas weight.</li>
        <li>The delivery person checks the connection with soapy water in front of you.</li>
        <li>You receive a receipt with date, size and amount.</li>
        <li>There is a way to complain, and the supplier responds.</li>
      </ol>

      <H2>Red flags and green flags</H2>
      <SpecTable
        head={["Red flag", "Green flag"]}
        rows={[
          ["No licence number, or it cannot be checked", "Gives an OGRA licence number and the legal name"],
          ["Pours gas from one cylinder to another", "Cylinders filled at a plant by weight, valve sealed"],
          ["Unmarked, dented or rusty cylinder", "Clear certification marking, clean body"],
          ["Price far below the notified rate", "Price near the OGRA rate with extras explained"],
          ["Refuses to weigh or show the seal", "Weighs on request and shows the seal"],
          ["No receipt", "Receipt with details, deposit stated"],
          ["Only contact is a social media chat", "Phone, WhatsApp and office address"],
        ]}
      />

      <H2>Check the price against OGRA first</H2>
      <P>
        The OGRA price is for gas by weight
        {latestPrice ? ` — currently ${pkr(latestPrice.perKgPkr)} per kg (${monthLong(latestPrice.month)})` : ""}. Look
        it up on <Link className="underline" href="/lpg-price-in-pakistan/">LPG price in Pakistan</Link>, multiply by the
        cylinder&apos;s gas weight, then ask the supplier what delivery, deposit and exchange add. See how{" "}
        <Link className="underline" href="/why-lpg-prices-change-in-pakistan/">LPG prices change</Link> from month to
        month. {terms.deposit} {terms.exchange}
      </P>

      <H2>Check the cylinder on delivery</H2>
      <UL
        items={[
          "Look at the shoulder stamp for the marking, the empty weight and the test date.",
          "Check the valve seal or cap.",
          "Check the body for dents, heavy rust and leaks.",
          "Brush soapy water on the connection. Bubbles mean a leak.",
          "Refuse a damaged cylinder.",
        ]}
      />
      <ContentImage src={media.cylStamp.src} alt={media.cylStamp.alt} caption="Cylinder shoulder marking" />
      <P>
        More safety detail: <Link className="underline" href="/lpg-safety/">LPG safety</Link> and{" "}
        <Link className="underline" href="/what-to-do-if-you-smell-gas/">what to do if you smell gas</Link>.
      </P>

      <H2>Dealer, distributor or marketer: who are you buying from?</H2>
      <P>
        The seller at your door may be a dealer, a distributor or a marketer. Each has a different role and
        responsibility. See{" "}
        <Link className="underline" href="/lpg-marketing-company-vs-distributor-vs-dealer/">
          LPG marketing company vs distributor vs dealer
        </Link>{" "}
        and the plain-language summary of{" "}
        <Link className="underline" href="/ogra-lpg-regulations-pakistan/">OGRA LPG regulations</Link>.
      </P>

      <H2>Questions for commercial and industrial buyers</H2>
      <UL
        items={[
          "Can you supply on a standing route or only one-off deliveries?",
          "Will you put gas, delivery and deposit on separate lines on the invoice?",
          "Do you offer a cylinder bank, manifold or bulk option if volumes grow?",
          "Who inspects the installation, and how often?",
        ]}
      />
      <P>
        See <Link className="underline" href="/commercial-lpg-supply/">commercial LPG supply</Link> and{" "}
        <Link className="underline" href="/industrial-lpg-supply/">industrial LPG supply</Link>.
      </P>

      <H2>How we work</H2>
      <P>
        {company.aboutBlurb} Depending on your area we supply as marketer, reseller or by referring your order to a
        distributor in our network, and we tell you which before you agree. {terms.partnersCertifiedRule} Read{" "}
        <Link className="underline" href="/licences-and-compliance/">licences and compliance</Link>,{" "}
        <Link className="underline" href="/how-it-works/">how ordering works</Link>,{" "}
        <Link className="underline" href="/our-network/">our network</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/how-to-choose-a-licensed-lpg-supplier/")} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: "/how-to-choose-a-licensed-lpg-supplier/",
          headline: "How to choose a licensed LPG supplier in Pakistan",
          description:
            "A 10-point checklist for choosing a licensed LPG supplier in Pakistan: licence, price, cylinder checks, weight and red flags.",
        })}
      />
    </PageShell>
  );
}

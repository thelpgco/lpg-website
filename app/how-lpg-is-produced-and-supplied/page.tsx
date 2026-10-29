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

export const metadata = meta({ path: "/how-lpg-is-produced-and-supplied/" });

const faqs = [
  { q: "How is LPG produced?", a: "Two ways. Gas processing plants separate propane and butane from raw natural gas. Refineries produce it when crude oil is split into fuels. The gas is then compressed or cooled to a liquid and stored." },
  { q: "Where does LPG gas come from?", a: "From natural gas fields and crude oil. It is a by-product of both, which is why it is called a petroleum gas. Pakistan uses a mix of local production and imports." },
  { q: "Is LPG made from crude oil?", a: "Partly. Worldwide, a large share comes from natural gas processing and the rest from refining crude oil. The split differs by country and year." },
  { q: "How does LPG get into a cylinder?", a: "At a bottling plant. Liquid LPG is pumped from storage into cylinders by weight, the valve is checked, and the cylinder is sealed before it leaves. Never accept gas poured from one cylinder into another." },
  { q: "Why is LPG called a by-product?", a: "Because the main aim of a gas field or a refinery is another product — pipeline gas, petrol or diesel. LPG is separated out along the way." },
  { q: "How long does imported LPG take to reach homes?", a: "It depends on shipping, port handling and plant schedules. A cargo takes days to weeks to arrive, then moves by tanker to bottling plants. We confirm delivery timing for your order, not a fixed national transit time." },
  { q: "Who fills my cylinder in Pakistan?", a: "A licensed LPG marketing company fills cylinders at its plant. Distributors and dealers then deliver them. Ask who the licensed marketer is before you buy." },
  { q: "How does THE LPG CO. fit into the chain?", a: `${company.shortName} is an OGRA-licensed marketer and distributor (licence ${company.licenceNumber}). We may supply as marketer, reseller or through a network distributor, and we tell you which before you agree. ${terms.partnersCertifiedRule}` },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "What is LPG?", href: "/what-is-lpg/" },
        { name: "How LPG is produced and supplied", href: "/how-lpg-is-produced-and-supplied/" },
      ]}
      h1="How LPG is produced and supplied: from the well to your cylinder"
      intro={`${company.shortName} moves LPG from licensed filling and distribution into homes and businesses across Pakistan. Upstream, LPG is separated from natural gas and crude oil, stored as a liquid, bottled by weight, then delivered by tanker and truck.`}
      aside={<SiteLeadForm heading="Order filled cylinders" />}
    >
      <Note title="In one line" tone="info">
        <p>Natural gas or crude oil → separation → storage → bottling by weight → distributor → your door.</p>
      </Note>

      <ContentImage src={media.warehouseCylinders.src} alt={media.warehouseCylinders.alt} caption="Filled cylinders at a depot" priority />

      <H2>The seven steps from source to stove</H2>
      <ol className="mt-3 list-decimal space-y-2 pl-6 text-ink-700">
        <li>
          <strong>Extraction.</strong> Natural gas and crude oil are produced from wells.
        </li>
        <li>
          <strong>Separation.</strong> A gas processing plant separates propane and butane from lighter methane and
          heavier liquids. A refinery produces LPG as one product of crude oil processing.
        </li>
        <li>
          <strong>Treatment.</strong> Water, sulphur compounds and other impurities are removed. An odorant is added so
          a leak can be noticed.
        </li>
        <li>
          <strong>Storage.</strong> LPG is held as a liquid in pressure tanks, or in refrigerated tanks at large import
          terminals.
        </li>
        <li>
          <strong>Transport.</strong> Road tankers, rail tank cars and ships carry bulk LPG.
        </li>
        <li>
          <strong>Bottling.</strong> At a bottling plant, cylinders are checked, filled by weight, leak-tested and
          sealed.
        </li>
        <li>
          <strong>Distribution and delivery.</strong> Filled cylinders go to distributors and dealers, then to your
          door — see <Link className="underline" href="/how-it-works/">how ordering works</Link>.
        </li>
      </ol>

      <H2>Two sources compared</H2>
      <SpecTable
        head={["", "Gas processing", "Refinery"]}
        rows={[
          ["Starting material", "Raw natural gas", "Crude oil"],
          ["What LPG is", "Heavier part of the gas stream", "A light product of oil processing"],
          ["Usual mix", "More propane and butane, little propylene", "Can include propylene and butylene"],
          ["Main product of the plant", "Pipeline gas", "Petrol, diesel and other fuels"],
        ]}
        caption="General description. Details differ between plants."
      />

      <H2>How this works in Pakistan</H2>
      <P>
        Local gas fields and refineries supply part of demand. Imports by sea fill the gap when local output is short.
        Cargoes unload at port terminals, move by road tanker to bottling plants, and enter the same cylinder market as
        local product. Seasonal demand — especially winter heating when pipeline pressure falls — can stretch the chain
        for weeks. For the national picture see{" "}
        <Link className="underline" href="/lpg-supply-in-pakistan/">LPG supply in Pakistan</Link> and{" "}
        <Link className="underline" href="/lpg-shortage-pakistan/">LPG shortage in Pakistan</Link>.
      </P>

      <H2>What happens in a bottling plant</H2>
      <UL
        items={[
          "Empty cylinders are checked for damage, test date and valve condition.",
          "Cylinders are filled by weight, not by volume, to leave room for vapour and expansion.",
          "Each filled cylinder is weighed, checked for leaks and sealed.",
          "Cylinders then go to depots and distributors for delivery.",
        ]}
      />
      <P>
        You can check some of this yourself at delivery. Use the{" "}
        <Link className="underline" href="/how-to-choose-a-licensed-lpg-supplier/">supplier checklist</Link> and refuse a
        damaged or unmarked cylinder.
      </P>

      <H2>Marketer, distributor, dealer</H2>
      <P>
        The plant and brand sit with the licensed marketing company. A distributor covers an area with stock and
        vehicles. A dealer is often the local seller who brings the cylinder to you. Know whose cylinder you hold — see{" "}
        <Link className="underline" href="/lpg-marketing-company-vs-distributor-vs-dealer/">
          marketer vs distributor vs dealer
        </Link>
        .
      </P>

      <H2>What LPG is made of after all that</H2>
      <P>
        The result is a mix of propane and butane. For density, heat value and the flammable range, see{" "}
        <Link className="underline" href="/lpg-composition-and-properties/">LPG composition and properties</Link>. The
        basics are on <Link className="underline" href="/what-is-lpg/">what LPG is</Link>.
      </P>

      <H2>Order from our nationwide network</H2>
      <P>
        {company.aboutBlurb} {terms.delivery} Check{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">LPG price in Pakistan</Link>,{" "}
        <Link className="underline" href="/our-network/">our network</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/how-lpg-is-produced-and-supplied/")} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: "/how-lpg-is-produced-and-supplied/",
          headline: "How LPG is produced and supplied: from the well to your cylinder",
          description:
            "How LPG is produced from natural gas and crude oil, stored, bottled by weight and delivered in Pakistan — and how to order from a licensed supplier.",
        })}
      />
    </PageShell>
  );
}

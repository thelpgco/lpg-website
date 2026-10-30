import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import { itemsFor } from "@/lib/media";
import JsonLd from "@/components/JsonLd";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { cylinderPrice, latestPrice, pkr } from "@/lib/prices";
import { monthLong } from "@/lib/money";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/what-is-lpg/" });

const faqs = [
  { q: "What does LPG stand for?", a: "LPG stands for Liquefied Petroleum Gas — fuel gas, mainly propane and butane, stored as a liquid under moderate pressure so a lot of energy fits in a cylinder or tank." },
  { q: "What is the full form of LPG?", a: "The full form of LPG is Liquefied Petroleum Gas. In Pakistan it is the gas sold in 11.8 kg and 45.4 kg cylinders for cooking, heating and business use." },
  { q: "What is LPG gas? (LPG meaning)", a: "LPG gas means liquefied petroleum gas: a fuel made mostly of propane and butane that turns into a liquid under light pressure. It is stored in cylinders or tanks and burns as a clean flame for cooking, geysers, heaters, vehicles and industry." },
  { q: "What is LPG made of?", a: "Mostly propane and butane. The exact mix varies by supplier and season. Small amounts of related hydrocarbons can be present, especially in refinery LPG." },
  { q: "Does LPG have a smell?", a: "Pure LPG has almost no smell. A strong-smelling odorant is added so a leak can be noticed. Treat any gas smell as a real leak — see what to do if you smell gas." },
  { q: "Is LPG heavier than air?", a: "Yes. LPG vapour is about 1.5 to 2 times heavier than air, so a leak can collect near the floor, in drains and in low rooms. Ventilate low, not only at the ceiling." },
  { q: "What is the difference between LPG and CNG?", a: "LPG is propane and butane stored as a liquid under moderate pressure. CNG is compressed natural gas (mostly methane) stored as a gas at much higher pressure. They need different equipment and are not interchangeable." },
  { q: "Is LPG the same as Sui gas?", a: "No. Pipeline Sui gas is natural gas, mostly methane, and is lighter than air. LPG is propane and butane in cylinders or tanks and is heavier than air. Burners and regulators differ." },
  { q: "How much does a domestic LPG cylinder cost in Pakistan?", a: latestPrice ? `Gas for an 11.8 kg domestic refill is about ${pkr(cylinderPrice(11.8)!)} at the ${monthLong(latestPrice.month)} OGRA rate of ${pkr(latestPrice.perKgPkr)} per kg. Delivery, deposit and exchange are confirmed before you agree.` : "Gas follows the monthly OGRA notified price per kg. Delivery, deposit and exchange are confirmed before you agree. See the LPG price page for the live figure." },
  { q: "How do I order LPG from THE LPG CO.?", a: `Call or WhatsApp ${site.phoneDisplay}, or use the order form. ${terms.delivery247Note} We match you through our nationwide network and confirm price and timing before you agree.` },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Guides", href: "/guides/" }, { name: "What is LPG?", href: "/what-is-lpg/" }]}
      h1="What is LPG? Full form, meaning and uses in Pakistan"
      intro={`${company.shortName} supplies LPG nationwide under OGRA licence ${company.licenceNumber}. LPG stands for Liquefied Petroleum Gas — propane and butane turned into a liquid under moderate pressure so a cylinder or tank can hold a lot of cooking and heating fuel.`}
      aside={<SiteLeadForm heading="Order LPG nationwide" />}
    >
      <Note title="In one line" tone="info">
        <p>
          LPG is cylinder or tank gas for homes, kitchens and industry. It is not the same as Sui gas in the pipeline.
          Buy from a licensed supplier, check the cylinder marking, and store it upright and ventilated.
        </p>
      </Note>

      <H2>LPG full form and meaning</H2>
      <P>
        <strong>Liquefied</strong> means the gas has been turned into a liquid by pressure. <strong>Petroleum</strong>{" "}
        means it comes from crude oil and natural gas processing. <strong>Gas</strong> is what it becomes again when you
        open the valve and the pressure drops. So the full form describes how it is made and how it is kept.
      </P>

      <H2>What LPG is made of</H2>
      <P>
        LPG is a mixture of two main gases: propane and butane. The share of each differs by supplier and by season. The
        difference matters in cold places — propane turns to gas at about minus 42 °C and butane at about minus 0.5 °C —
        so a propane-rich mix keeps working in winter while a butane-rich mix can struggle. Compare them on{" "}
        <Link className="underline" href="/propane-vs-butane/">propane vs butane</Link> and see the numbers on{" "}
        <Link className="underline" href="/lpg-composition-and-properties/">LPG composition and properties</Link>.
      </P>

      <H2>How LPG is stored and how it becomes gas</H2>
      <P>
        Under moderate pressure LPG is a liquid, which lets a lot of fuel fit into a small cylinder. When you open the
        valve the pressure drops and the liquid boils into gas that flows to your stove, heater or geyser. One litre of
        liquid LPG becomes roughly 250 litres of gas — which is why a small leak can fill a room. Always keep cylinders
        upright so only vapour, not liquid, reaches the regulator.
      </P>

      <H2>Where LPG comes from in Pakistan</H2>
      <P>
        LPG is produced when natural gas is processed and when crude oil is refined. Some of what Pakistan uses is made
        locally; the rest is imported by sea and moved by tanker to bottling plants. Licensed marketing companies fill
        cylinders by weight, then distributors and dealers deliver them. Read{" "}
        <Link className="underline" href="/how-lpg-is-produced-and-supplied/">how LPG is produced and supplied</Link> and{" "}
        <Link className="underline" href="/lpg-supply-in-pakistan/">LPG supply in Pakistan</Link>.
      </P>

      <H2>What LPG is used for in Pakistan</H2>
      <UL
        items={[
          "Cooking in homes, restaurants, hotels and wedding kitchens",
          "Water heating and space heating, especially where there is no pipeline connection or winter pressure is low",
          "Industrial burners, boilers and furnaces",
          "Backup fuel when Sui gas is cut or weak",
          "Vehicle fuel (auto LPG) with a proper vehicle tank — never a home cylinder",
        ]}
      />
      <P>
        For homes the usual choice is the domestic cylinder with 11.8 kg of gas. See common{" "}
        <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">LPG cylinder sizes</Link>
        {latestPrice ? (
          <>
            {" "}
            and today&apos;s gas cost on the{" "}
            <Link className="underline" href="/lpg-price-in-pakistan/">
              LPG rate in Pakistan
            </Link>{" "}
            ({pkr(latestPrice.perKgPkr)} per kg, {monthLong(latestPrice.month)}).
          </>
        ) : (
          <>
            {" "}
            and the live rate on{" "}
            <Link className="underline" href="/lpg-price-in-pakistan/">
              LPG price in Pakistan
            </Link>
            .
          </>
        )}
      </P>

      <H2>LPG compared with other fuels Pakistanis ask about</H2>
      <SpecTable
        head={["Fuel", "What it is", "How you get it"]}
        rows={[
          ["LPG", "Propane and butane", "Cylinder or tank, delivered"],
          ["Sui gas", "Pipeline natural gas (methane)", "Underground pipe and meter"],
          ["CNG", "Compressed methane at very high pressure", "Vehicle stations"],
          ["LNG", "Natural gas cooled to a liquid for shipping", "Import terminals, then the pipeline"],
        ]}
        caption="Everyday comparison. Detailed pages below."
      />
      <P>
        Full comparisons: <Link className="underline" href="/lpg-vs-sui-gas/">LPG vs Sui gas</Link>,{" "}
        <Link className="underline" href="/lpg-vs-cng/">LPG vs CNG</Link>,{" "}
        <Link className="underline" href="/lpg-vs-lng/">LPG vs LNG</Link>.
      </P>

      <H2>Is LPG safe?</H2>
      <P>
        LPG is safe when it is stored, connected and used properly. The main risks are leaks and poor ventilation. Keep
        cylinders upright in a ventilated place, away from heat, and check hoses and regulators. Read the{" "}
        <Link className="underline" href="/lpg-safety/">LPG safety guide</Link> and{" "}
        <Link className="underline" href="/what-to-do-if-you-smell-gas/">what to do if you smell gas</Link>.
      </P>

      <H2>Words you will hear when you buy LPG in Pakistan</H2>
      <UL
        items={[
          "OGRA: the Oil and Gas Regulatory Authority — licenses LPG marketing and notifies the monthly price.",
          "Marketer: a licensed company that fills and sells LPG into the market.",
          "Distributor or dealer: stocks cylinders and delivers them to you.",
          "Domestic cylinder: household size, 11.8 kg of gas. Commercial cylinder: 45.4 kg.",
          "Empty-for-full exchange: return a compatible empty for a filled cylinder when eligible.",
        ]}
      />
      <P>
        Roles are explained on{" "}
        <Link className="underline" href="/lpg-marketing-company-vs-distributor-vs-dealer/">
          marketer vs distributor vs dealer
        </Link>
        .
      </P>

      <H2>Order LPG from a licensed nationwide network</H2>
      <P>
        {company.aboutBlurb} {terms.partnersCertifiedRule} See{" "}
        <Link className="underline" href="/how-it-works/">how ordering works</Link>, check{" "}
        <Link className="underline" href="/our-network/">our network</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/what-is-lpg/")} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: "/what-is-lpg/",
          headline: "What is LPG? Full form, meaning and uses in Pakistan",
          description:
            "LPG stands for Liquefied Petroleum Gas. What it is made of, how it is stored, how it is used in Pakistan, how it compares with Sui gas, and how to order from a licensed supplier.",
        })}
      />
    </PageShell>
  );
}

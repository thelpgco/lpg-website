import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { itemsFor, media } from "@/lib/media";
import { latestPrice, pkr } from "@/lib/prices";
import { monthLong } from "@/lib/money";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-vs-lng/" });

const faqs = [
  { q: "Are LPG and LNG the same?", a: "No. LPG is Liquefied Petroleum Gas, a mix of propane and butane. LNG is Liquefied Natural Gas, which is natural gas (mostly methane) cooled until it becomes a liquid. They differ in chemistry, temperature, handling and use." },
  { q: "What is the difference between LPG and LNG?", a: "LPG liquefies under moderate pressure at normal temperature and is delivered in cylinders. LNG stays liquid only when cooled to about minus 162 degrees Celsius, so it moves in insulated ships and tanks, and is turned back into gas before it enters the pipeline." },
  { q: "Can LNG be sold in cylinders for home use?", a: "Not in the way LPG is. LNG needs deep-cold insulated storage and is handled at terminals and by industrial users. Homes use LPG cylinders or pipeline natural gas." },
  { q: "Where does the LNG in Pakistan go?", a: "Imported LNG is turned back into gas at import terminals and fed into the national gas pipeline network, where it supplies power plants, industry, fertiliser units and homes through the pipeline utilities. It is the same gas as Sui gas once it is in the pipeline." },
  { q: "Which is cheaper, LPG or LNG?", a: "They are priced differently and cannot be bought by the same customer in the same way. LPG has a monthly OGRA notified price per kg. LNG enters the pipeline and is priced into the gas system. For a household, the practical comparison is LPG vs the Sui gas tariff." },
  { q: "Is LPG a gas or a liquid?", a: "Both. Inside the cylinder it is mostly liquid under pressure. When you open the valve, the liquid boils into gas that flows to your appliance." },
  { q: "Does news about LNG imports affect my LPG cylinder price?", a: "Indirectly at most. LNG stories are about pipeline gas supply. Cylinder LPG has its own monthly OGRA notification driven mainly by international LPG contract prices, the dollar rate, freight and taxes." },
  { q: "How do I buy LPG for cooking?", a: `Order a certified cylinder from a licensed supplier such as ${company.shortName} (licence ${company.licenceNumber}). See the live rate on the LPG price page and order LPG online or by WhatsApp ${site.phoneDisplay}.` },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "What is LPG?", href: "/what-is-lpg/" },
        { name: "LPG vs LNG", href: "/lpg-vs-lng/" },
      ]}
      h1="LPG vs LNG: what is the difference?"
      intro={`LPG (propane and butane) and LNG (natural gas cooled to a liquid) are different fuels. ${company.shortName} delivers LPG in cylinders nationwide. LPG is liquid at moderate pressure. LNG needs deep cold — about minus 162 °C — and travels by ship and insulated tank into the pipeline, not into your kitchen.`}
      aside={<SiteLeadForm heading="Order LPG cylinders" />}
    >
      <Note title="Short answer" tone="info">
        <p>
          LPG is a by-product of gas processing and refining, made of propane and butane. LNG is natural gas, mostly
          methane, cooled into a liquid for shipping. After LNG is turned back into gas, it is the same fuel as Sui gas.
          You cannot buy LNG for the kitchen.
        </p>
      </Note>

      <ContentImage src={media.bulkTanks.src} alt={media.bulkTanks.alt} caption="LPG bulk storage tanks" priority />

      <H2>LPG vs LNG side by side</H2>
      <SpecTable
        head={["Point", "LPG", "LNG"]}
        rows={[
          ["Full form", "Liquefied Petroleum Gas", "Liquefied Natural Gas"],
          ["Main gas", "Propane and butane", "Methane"],
          ["How it becomes liquid", "Moderate pressure at normal temperature", "Cooling to about minus 162 degrees Celsius"],
          ["Storage", "Steel or composite cylinders, pressure tanks", "Double-walled insulated cryogenic tanks"],
          ["Moves by", "Road tanker, rail, ship, delivery truck", "Specialised LNG ship, then terminal"],
          ["Volume vs gas", "About 250 times smaller as a liquid", "About 600 times smaller as a liquid"],
          ["Vs air as a gas", "Heavier", "Lighter once warmed"],
          ["End user", "Homes, restaurants, industry, some vehicles", "Mostly power, industry and the pipeline network"],
          [
            "Price you see",
            latestPrice
              ? `OGRA notified LPG price (${pkr(latestPrice.perKgPkr)}/kg, ${monthLong(latestPrice.month)})`
              : "OGRA monthly notified price per kg",
            "Priced into the pipeline gas system; billed as Sui gas to homes",
          ],
        ]}
        caption="Typical figures. Exact values depend on the exact mix and temperature."
      />

      <H2>How LNG is made and shipped</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Natural gas is cleaned to remove water and impurities.</li>
        <li>It is cooled to about minus 162 degrees Celsius and becomes a liquid.</li>
        <li>The liquid is loaded onto an insulated ship.</li>
        <li>At the import terminal it is warmed and turned back into gas.</li>
        <li>The gas enters the pipeline network and reaches users like any other natural gas.</li>
      </ol>

      <H2>How LPG is made and delivered</H2>
      <P>
        LPG is separated from natural gas at processing plants and from crude oil at refineries. It is stored as a
        liquid under moderate pressure, filled into cylinders at bottling plants, and delivered to customers. Read{" "}
        <Link className="underline" href="/how-lpg-is-produced-and-supplied/">how LPG is produced and supplied</Link> and{" "}
        <Link className="underline" href="/lpg-supply-in-pakistan/">LPG supply in Pakistan</Link>.
      </P>

      <H2>Why the two get confused</H2>
      <UL
        items={[
          "Both names start with L and end with G, and both are about gas turned into a liquid.",
          "Both are used as fuel and both reach Pakistan partly through imports.",
          "News stories on gas supply mention both. LNG stories are about the pipeline gas system. LPG stories are about cylinder supply.",
        ]}
      />

      <H2>What this means for a household</H2>
      <P>
        You cannot buy LNG for the kitchen. Your choices are Sui gas through a pipeline, if you have a connection, or
        LPG in a cylinder. Compare them on <Link className="underline" href="/lpg-vs-sui-gas/">LPG vs Sui gas</Link>. For
        a vehicle comparison see <Link className="underline" href="/lpg-vs-cng/">LPG vs CNG</Link>.
      </P>

      <H2>Safety habits differ</H2>
      <UL
        items={[
          "LPG vapour sinks — store cylinders upright, ventilated, never in a basement, and check joints with soapy water.",
          "Pipeline gas from LNG regasification behaves like other natural gas: lighter than air once warmed.",
          "If you smell LPG at home, follow the smell-gas safety steps before using any form or switch.",
        ]}
      />
      <P>
        Read{" "}
        <Link className="underline" href="/what-to-do-if-you-smell-gas/">
          what to do if you smell gas
        </Link>
        .
      </P>

      <H2>Order LPG nationwide</H2>
      <P>
        Check the <Link className="underline" href="/lpg-price-in-pakistan/">LPG rate in Pakistan today</Link>, see{" "}
        <Link className="underline" href="/how-it-works/">how ordering works</Link>,{" "}
        <Link className="underline" href="/our-network/">our network</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. {company.shortName} holds OGRA licence{" "}
        {company.licenceNumber}. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/lpg-vs-lng/")} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: "/lpg-vs-lng/",
          headline: "LPG vs LNG: what is the difference?",
          description:
            "LPG vs LNG explained: chemistry, temperature, storage, transport, pricing and what each means for a household or business in Pakistan.",
        })}
      />
    </PageShell>
  );
}

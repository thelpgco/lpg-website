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

export const metadata = meta({ path: "/lpg-vs-cng/" });

const faqs = [
  { q: "What is the difference between LPG and CNG?", a: "LPG is propane and butane, stored as a liquid at moderate pressure. CNG is compressed natural gas, mostly methane, stored as a gas at very high pressure. They have different chemistry, different storage and different equipment." },
  { q: "What is the full form of CNG?", a: "CNG stands for Compressed Natural Gas. LPG stands for Liquefied Petroleum Gas." },
  { q: "Is LPG heavier than CNG?", a: "LPG vapour is heavier than air and sinks when it leaks. CNG is mostly methane, which is lighter than air and rises. This changes where gas collects and where detectors and ventilation should be placed." },
  { q: "Can I use a CNG cylinder for LPG or the other way round?", a: "No. A cylinder is built and tested for one gas and one pressure. A CNG cylinder works at a much higher pressure than an LPG cylinder, and fittings and valves are different. Never swap them." },
  { q: "Which is better for a car, LPG or CNG?", a: "It depends on the vehicle, the fuel stations near you, boot space and local rules. CNG tanks are heavy and work at very high pressure. LPG tanks are lighter and lower pressure but are not available at as many stations. Conversion must be done by a qualified workshop with approved kits." },
  { q: "Which is better for home cooking?", a: "LPG. Home cooking uses LPG from a domestic cylinder, or pipeline natural gas where it exists. CNG is a vehicle fuel and is not supplied for household cylinders." },
  { q: "Do LPG and CNG smell?", a: "Both are odourless by themselves. An odorant is added so a leak can be noticed. If you smell gas, follow the steps in what to do if you smell gas." },
  { q: "How is LPG priced compared with CNG?", a: latestPrice ? `LPG for cylinders follows the OGRA notified consumer price — currently ${pkr(latestPrice.perKgPkr)} per kg (${monthLong(latestPrice.month)}). CNG is sold at stations under separate gas pricing rules. You cannot compare a kitchen cylinder bill with a vehicle fill on the same basis.` : "LPG for cylinders follows the monthly OGRA notified price per kg. CNG is sold at stations under separate gas pricing rules." },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "What is LPG?", href: "/what-is-lpg/" },
        { name: "LPG vs CNG", href: "/lpg-vs-cng/" },
      ]}
      h1="LPG vs CNG: differences, uses, safety and cost"
      intro={`${company.shortName} supplies LPG for homes, kitchens and industry nationwide. LPG is propane and butane stored as a liquid at moderate pressure. CNG is compressed natural gas, mostly methane, stored as a gas at very high pressure — mainly a vehicle fuel, not a household cooking gas.`}
      aside={<SiteLeadForm heading="Need LPG for home or business?" />}
    >
      <Note title="Short answer" tone="info">
        <p>
          They are different fuels. For a kitchen, geyser or burner, you want LPG in a cylinder. For a vehicle, either
          can be used, but each needs its own tank, kit and filling station. Never put a home LPG cylinder in a car.
        </p>
      </Note>

      <ContentImage src={media.cylLineup.src} alt={media.cylLineup.alt} caption="LPG cylinder sizes" priority />

      <H2>LPG and CNG compared</H2>
      <SpecTable
        head={["Point", "LPG", "CNG"]}
        rows={[
          ["Full form", "Liquefied Petroleum Gas", "Compressed Natural Gas"],
          ["Main gas", "Propane and butane", "Methane"],
          ["State in the cylinder", "Liquid under moderate pressure", "Gas under very high pressure (hundreds of bar)"],
          ["Vs air", "Heavier: sinks and collects low", "Lighter: rises and disperses"],
          ["Source", "By-product of gas processing and oil refining, plus imports", "Pipeline natural gas, compressed at a station"],
          ["Cylinder weight", "Light steel or composite, thin walls compared with CNG", "Thick, heavy tank built for very high pressure"],
          ["Main uses", "Homes, restaurants, industry, some vehicles", "Mostly vehicles"],
          ["Price basis", "OGRA monthly notified price per kg", "Station price set under the gas pricing rules"],
          ["Where you get it", "Delivered cylinder or filling point", "CNG station"],
        ]}
        caption="Typical properties. Exact figures depend on supplier, season and equipment."
      />

      <H2>Chemistry and storage</H2>
      <P>
        Propane and butane liquefy at modest pressure, so a lot of fuel fits in a cylinder that a person can carry.
        Methane does not liquefy at normal temperatures however hard you press it, so CNG is simply squeezed into a very
        strong tank. That is why CNG cylinders are heavy and why LPG cylinders are practical for home delivery. See the{" "}
        <Link className="underline" href="/lpg-composition-and-properties/">composition and properties of LPG</Link>.
      </P>

      <H2>Use at home and in business</H2>
      <UL
        items={[
          "Home cooking, geysers and heaters: LPG cylinders (or pipeline natural gas where available).",
          "Restaurants, hotels and wedding kitchens: LPG, usually the 45.4 kg commercial cylinder or a manifold.",
          "Industrial burners and boilers: LPG tanks or manifolds, or pipeline gas where it is available.",
          "Vehicles: CNG is common. Auto LPG is possible with an approved kit — see auto LPG in Pakistan.",
        ]}
      />
      <P>
        For household sizes see{" "}
        <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">LPG cylinder sizes in Pakistan</Link>. For
        pipeline comparison see <Link className="underline" href="/lpg-vs-sui-gas/">LPG vs Sui gas</Link>.
      </P>

      <H2>Cost: what you can and cannot compare</H2>
      <UL
        items={[
          latestPrice
            ? `Cylinder LPG gas follows the OGRA notified rate (${pkr(latestPrice.perKgPkr)} per kg, ${monthLong(latestPrice.month)}). Add delivery and any deposit.`
            : "Cylinder LPG gas follows the monthly OGRA notified rate. Add delivery and any deposit.",
          "CNG is priced at the station under separate rules — often in rupees per kg or per cubic metre of compressed gas.",
          "A fair vehicle comparison needs your own fill bills, range and kit cost — not a single national number.",
          "For kitchen fuel, compare LPG with Sui gas heat cost, not with CNG station prices.",
        ]}
      />
      <P>
        Live cylinder rates: <Link className="underline" href="/lpg-price-in-pakistan/">LPG price in Pakistan</Link>.
        Vehicle conversion angles:{" "}
        <Link className="underline" href="/auto-lpg-in-pakistan/">auto LPG in Pakistan</Link> and{" "}
        <Link className="underline" href="/lpg-kit-price-in-pakistan/">LPG kit price</Link>.
      </P>

      <H2>LPG vs CNG for cars</H2>
      <P>
        Many people reach this page while deciding on a vehicle conversion. These are the points worth weighing before
        you talk to a workshop:
      </P>
      <SpecTable
        head={["Question", "LPG", "CNG"]}
        rows={[
          ["Tank", "Lighter and lower pressure", "Heavy, very high pressure, takes more boot space for the same range"],
          ["Refuelling", "Fewer filling points", "More stations in many cities, often with queues"],
          ["Conversion", "Approved kit and a qualified workshop", "Approved kit and a qualified workshop"],
          ["Cylinder checks", "Periodic testing and valid certification", "Periodic testing and valid certification"],
          ["Cold start and power", "Works well, mild power loss", "Noticeable power loss in many engines"],
        ]}
        caption="General comparison. Check local rules for vehicle use before converting."
      />
      <Note title="Check the rules first" tone="warn">
        <p>
          Rules on gas in vehicles can change. Before converting a car, ask the workshop for the approval documents of
          the kit and tank, and check current local requirements. {company.shortName} supplies cylinders and engineering
          for homes and businesses and does not sell vehicle conversions as a packaged product here.
        </p>
      </Note>

      <H2>Safety differences</H2>
      <UL
        items={[
          "LPG leaks sink, so ventilate at floor level and never keep cylinders below ground or in basements.",
          "CNG leaks rise, but the very high storage pressure means the tank must be certified and tested on schedule.",
          "Both need correct hoses, regulators and fittings, and a leak check with soapy water, never a flame.",
          "Never refill a cylinder from another cylinder.",
          "Never use a domestic or commercial LPG cylinder as a vehicle fuel tank.",
        ]}
      />
      <P>
        Read the <Link className="underline" href="/lpg-safety/">LPG safety guide</Link> and{" "}
        <Link className="underline" href="/what-to-do-if-you-smell-gas/">what to do if you smell gas</Link>.
      </P>

      <H2>Which should you choose?</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Is it for cooking, heating or a burner? Choose LPG.</li>
        <li>Is it for a vehicle? Compare stations on your usual route, boot space, and the workshop&apos;s approved kit.</li>
        <li>
          Do you have pipeline gas at home? Compare with{" "}
          <Link className="underline" href="/lpg-vs-sui-gas/">
            LPG vs Sui gas
          </Link>
          .
        </li>
        <li>Is it for a plant or kitchen? Ask for a site visit and a written quote.</li>
      </ol>

      <H2>Order LPG for home or business</H2>
      <P>
        {company.shortName} is licensed by OGRA (licence {company.licenceNumber}). See{" "}
        <Link className="underline" href="/how-it-works/">how ordering works</Link>,{" "}
        <Link className="underline" href="/our-network/">our network</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/lpg-vs-cng/")} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: "/lpg-vs-cng/",
          headline: "LPG vs CNG: differences, uses, safety and cost",
          description:
            "LPG vs CNG compared: chemistry, storage pressure, home and vehicle use, how prices differ, safety differences and how to choose.",
        })}
      />
    </PageShell>
  );
}

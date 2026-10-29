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
import { cylinderPrice, latestPrice, pkr } from "@/lib/prices";
import { monthLong } from "@/lib/money";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-composition-and-properties/" });

const faqs = [
  { q: "What is the chemical formula of LPG?", a: "LPG has no single formula because it is a mixture. Its main parts are propane (C3H8) and butane (C4H10), with small amounts of propylene, butylene and other hydrocarbons depending on the source." },
  { q: "What is LPG made of?", a: "Mostly propane and butane. The ratio changes with supplier and season. Domestic cylinders in Pakistan are sold as LPG, not as pure propane or pure butane." },
  { q: "What is the density of LPG?", a: "As a liquid, LPG is lighter than water: roughly 0.5 to 0.58 kg per litre depending on the mix and temperature. As a gas, it is about 1.5 to 2 times heavier than air." },
  { q: "What is the calorific value of LPG?", a: "About 46 MJ per kg (net) for typical LPG, close to 12.8 kWh per kg. Values vary slightly with the propane and butane share." },
  { q: "Why is a smell added to LPG?", a: "Pure LPG has almost no smell. A strong-smelling chemical (a mercaptan) is added in tiny amounts so that a leak can be noticed. The smell can fade in some conditions, so do not rely on it alone." },
  { q: "Why is a cylinder not filled completely?", a: "Liquid LPG expands as it warms. Cylinders are filled to a safe fraction of their volume, usually below about 85 percent, so there is room for vapour and expansion. Overfilling is dangerous." },
  { q: "How much gas is 1 litre of LPG?", a: "One litre of liquid LPG becomes roughly 250 litres of gas at normal pressure. That is why a small leak can quickly fill a room." },
  { q: "How much heat is in an 11.8 kg domestic cylinder?", a: latestPrice ? `About 540 MJ of heat (at roughly 46 MJ per kg). At the ${monthLong(latestPrice.month)} OGRA rate that gas costs about ${pkr(cylinderPrice(11.8)!)} before delivery or deposit.` : "About 540 MJ of heat (at roughly 46 MJ per kg). Gas cost follows the monthly OGRA notified price." },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "What is LPG?", href: "/what-is-lpg/" },
        { name: "LPG composition and properties", href: "/lpg-composition-and-properties/" },
      ]}
      h1="LPG composition and properties: formula, density and heat value"
      intro={`LPG is a mixture, mostly propane (C3H8) and butane (C4H10). It carries about 46 MJ of heat per kg, is lighter than water as a liquid, and is heavier than air as a gas. ${company.shortName} supplies certified cylinders nationwide — these properties explain why storage and ventilation rules matter.`}
      aside={<SiteLeadForm heading="Order LPG cylinders" />}
    >
      <Note title="Quick facts" tone="info">
        <p>
          Mostly propane and butane. About 46 MJ per kg. One litre of liquid becomes roughly 250 litres of gas. Gas is
          1.5 to 2 times heavier than air. Burns in air at roughly 2% to 10% gas.
        </p>
      </Note>

      <ContentImage
        src={media.cylSpecLabel.src}
        alt={media.cylSpecLabel.alt}
        caption="Cylinder label with tare weight, capacity and pressure markings"
        priority
      />

      <H2>What LPG is made of</H2>
      <P>
        LPG stands for Liquefied Petroleum Gas. The base gases are propane and butane. Small amounts of propylene and
        butylene can be present, mostly from refinery LPG, along with traces of lighter and heavier hydrocarbons. The
        exact share of each depends on where it came from and the season. Compare the two on{" "}
        <Link className="underline" href="/propane-vs-butane/">propane vs butane</Link>.
      </P>

      <H2>Properties table: propane, butane and typical LPG</H2>
      <SpecTable
        head={["Property", "Propane", "Butane", "Typical LPG mix"]}
        rows={[
          ["Formula", "C3H8", "C4H10", "Mixture"],
          ["Boiling point", "About minus 42 °C", "About minus 0.5 °C", "Between the two, depends on the mix"],
          ["Liquid density", "About 0.50 kg/L", "About 0.58 kg/L", "About 0.52 to 0.55 kg/L"],
          ["Gas density vs air", "About 1.5", "About 2.0", "About 1.5 to 2.0"],
          ["Heat value (net)", "About 46 MJ/kg", "About 46 MJ/kg", "About 46 MJ/kg"],
          ["Flammable range in air", "About 2% to 9.5%", "About 1.8% to 8.4%", "Roughly 2% to 10%"],
          ["Vapour pressure at 20 °C", "About 8 bar", "About 2 bar", "Between, depends on the mix"],
          ["Colour and smell", "Colourless, almost odourless", "Colourless, almost odourless", "Odorant added"],
        ]}
        caption="Typical published figures. They vary with source, temperature and test method."
      />

      <H2>Why these properties matter in a Pakistani home or kitchen</H2>
      <UL
        items={[
          "Heavier than air: a leak flows downhill and collects in low spots, drains and floors. Ventilate low, not high.",
          "Large expansion: about 250 times from liquid to gas, so a small leak can fill a room.",
          "Narrow flammable window: it burns between roughly 2% and 10% gas in air, but a leaking room passes through that range.",
          "Heat sensitivity: pressure rises with temperature, so keep cylinders out of the sun and away from heat — important on rooftops and in closed vans.",
          "Cold weather: butane-rich vapour can weaken near freezing in northern areas; protect cylinders from ice and snow.",
          "Odorant: a smell is added for safety, so any smell of gas should be treated seriously.",
        ]}
      />

      <H2>How much does a cylinder hold?</H2>
      <SpecTable
        head={["Cylinder", "Gas by weight", "Approx. liquid volume at about 0.53 kg/L", "Approx. heat content"]}
        rows={[
          ["Domestic", "11.8 kg", "About 22 litres", "About 540 MJ"],
          ["Commercial", "45.4 kg", "About 86 litres", "About 2,090 MJ"],
          ["Small portable", "5 kg", "About 9.5 litres", "About 230 MJ"],
        ]}
        caption="Approximate. Cylinders are filled by weight and leave room for vapour and expansion."
      />
      <P>
        To estimate how long a cylinder lasts for your stove or burner, use the{" "}
        <Link className="underline" href="/tools/lpg-cylinder-duration-calculator/">cylinder duration calculator</Link>.
        Live gas prices:{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">LPG price in Pakistan</Link>
        {latestPrice ? ` (${pkr(latestPrice.perKgPkr)} per kg, ${monthLong(latestPrice.month)}).` : "."}
      </P>

      <H2>How LPG compares with other fuels</H2>
      <UL
        items={[
          <>
            Natural gas (Sui gas) is mostly methane, lighter than air, and has less heat per cubic metre. See{" "}
            <Link className="underline" href="/lpg-vs-sui-gas/">
              LPG vs Sui gas
            </Link>
            .
          </>,
          <>
            CNG is compressed methane stored at very high pressure. See{" "}
            <Link className="underline" href="/lpg-vs-cng/">
              LPG vs CNG
            </Link>
            .
          </>,
          <>
            LNG is methane cooled into a liquid. See{" "}
            <Link className="underline" href="/lpg-vs-lng/">
              LPG vs LNG
            </Link>
            .
          </>,
        ]}
      />

      <H2>Safe handling follows from the properties</H2>
      <P>
        Because LPG sinks, expands and ignites in a narrow range, the safety rules are about storage, ventilation and
        leak checks. See the <Link className="underline" href="/lpg-safety/">LPG safety guide</Link> and{" "}
        <Link className="underline" href="/what-to-do-if-you-smell-gas/">what to do if you smell gas</Link>.
      </P>

      <H2>Buy certified cylinders nationwide</H2>
      <P>
        {company.shortName} (licence {company.licenceNumber}) supplies domestic and commercial sizes through a
        nationwide network. See <Link className="underline" href="/lpg-cylinders/">LPG cylinders</Link>,{" "}
        <Link className="underline" href="/how-it-works/">how ordering works</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/lpg-composition-and-properties/")} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: "/lpg-composition-and-properties/",
          headline: "LPG composition and properties: formula, density and heat value",
          description:
            "What LPG is made of, with a properties table for propane, butane and typical LPG: density, boiling point, heat value, cylinder heat content and flammable range.",
        })}
      />
    </PageShell>
  );
}

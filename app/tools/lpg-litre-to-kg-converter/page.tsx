import { H2, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import ToolPage from "@/components/r4plus/ToolPage";
import { perKgFor } from "@/lib/prices";
import { meta } from "@/lib/seo";
import Calculator from "./Calculator";

const path = "/tools/lpg-litre-to-kg-converter/";
export const metadata = meta({ path });

const faqs = [
  {
    q: "How many kg is one litre of LPG?",
    a: "About 0.51 kg for liquid propane and 0.58 kg for liquid butane at around 15 C. A propane-butane mix sits in between. Use the density that matches your supplier's blend if you know it.",
  },
  {
    q: "Why is LPG sold in kg and not litres in Pakistan?",
    a: "Weight does not change with temperature, while volume does. Cylinders and the OGRA notified price are quoted per kg, so compare prices per kg.",
  },
  {
    q: "How many litres are in an 11.8 kg cylinder?",
    a: "At a density of 0.54 kg/L the gas is about 21.9 litres of liquid. The cylinder is bigger than that because it is not filled to the top; space is left for expansion.",
  },
  {
    q: "Is this accurate for my cylinder?",
    a: "No. It is a planning conversion. Your blend and the temperature change the density.",
  },
  {
    q: "Can I use litres to compare cylinder prices?",
    a: "Prefer kg. The OGRA consumer price and cylinder sizes in Pakistan are quoted by gas weight. Convert litres only when a seller states volume and the density used.",
  },
];

export default function Page() {
  const perKg = perKgFor();
  const d = 0.54;
  return (
    <ToolPage
      path={path}
      crumb="Litre to kg converter"
      h1="LPG litre to kg converter: convert liquid LPG volume to weight"
      intro="Enter litres or kilograms of LPG and pick a blend to see the other value. The density is an approximation and you can enter your own."
      calculator={<Calculator perKgPkr={perKg} />}
      faqs={faqs}
      related={[
        { href: "/lpg-composition-and-properties/", label: "LPG composition and properties" },
        { href: "/propane-vs-butane/", label: "Propane vs butane" },
        { href: "/lpg-price-per-kg-in-pakistan/", label: "LPG price per kg today" },
        { href: "/tools/lpg-tank-size-calculator/", label: "Tank size calculator" },
      ]}
    >
      <H2>The formula</H2>
      <P>Kilograms = litres x density (kg per litre). Litres = kilograms / density. The calculator uses the density you select.</P>
      <SpecTable
        head={["Cylinder (gas)", `Liquid volume at ${d} kg/L`]}
        rows={[5, 11.8, 15, 45.4].map((kg) => [`${kg} kg`, `about ${(kg / d).toFixed(1)} litres`])}
        caption="Worked example using the planning density of 0.54 kg/L. Examples only."
      />
      <H2>How temperature changes the answer</H2>
      <SpecTable
        head={["Liquid temperature", "Propane (kg per litre)", "Butane (kg per litre)"]}
        rows={[
          ["0 °C", "about 0.53", "about 0.60"],
          ["15 °C", "about 0.51", "about 0.58"],
          ["30 °C", "about 0.49", "about 0.56"],
        ]}
        caption="Approximate liquid densities. A propane–butane mix sits between the two columns."
      />
      <P>
        Liquid LPG expands noticeably as it warms, so the same 11.8 kg takes up more litres in a Karachi summer than in a
        Quetta winter. That is the reason cylinders are filled to only about 80–85% of their volume: the space above the
        liquid lets it expand on a hot day without the pressure climbing dangerously. It is also why a litre is a poor unit
        for buying LPG, while a kilogram stays a kilogram at any temperature.
      </P>

      <H2>What to keep in mind</H2>
      <UL
        items={[
          "Liquid volume is not the same as the cylinder size: cylinders are not filled to the brim",
          "Density changes with temperature and with the propane-butane ratio",
          "Compare prices per kg, not per litre, unless the seller states the density used",
          "Do not try to measure or refill a cylinder yourself",
        ]}
      />
    </ToolPage>
  );
}

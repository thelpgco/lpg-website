import { H2, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import ToolPage from "@/components/r4plus/ToolPage";
import { meta } from "@/lib/seo";
import Calculator from "./Calculator";

const path = "/tools/lpg-btu-kwh-converter/";
export const metadata = meta({ path });

const faqs = [
  {
    q: "How many kWh are in 1 kg of LPG?",
    a: "About 12.8 kWh of heat at a planning value of 46 MJ/kg (46 / 3.6). The exact figure depends on the propane-butane mix.",
  },
  {
    q: "How many kg of LPG are in 1 MMBTU?",
    a: "About 22.9 kg at 46 MJ/kg, because 1 MMBTU is about 1,055 MJ. Use this to compare LPG with natural gas billed in MMBTU.",
  },
  {
    q: "What is BTU?",
    a: "A British thermal unit is a small unit of heat energy, about 1,055 joules. Burner and heater ratings are often given in BTU per hour.",
  },
  {
    q: "Is appliance efficiency included?",
    a: "No. The converter changes units only. Real fuel use also depends on how efficiently your appliance turns gas into useful heat.",
  },
  {
    q: "How do I turn a burner rating into kg per hour?",
    a: "Use the burner's rated heat input (not an electrical label), convert to MJ per hour, then divide by the LPG heating value (default 46 MJ/kg). The calculator does this when you enter BTU/h or kW.",
  },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      crumb="BTU and kWh converter"
      h1="LPG BTU to kWh converter: kg of LPG, MJ, kWh and MMBTU"
      intro="Convert LPG weight to energy units and back, and estimate how much LPG a burner uses at its rated heat input. Heating value is editable."
      calculator={<Calculator />}
      faqs={faqs}
      related={[
        { href: "/lpg-vs-sui-gas/", label: "LPG vs Sui gas" },
        { href: "/tools/lpg-vs-sui-gas-cost-calculator/", label: "LPG vs Sui gas cost calculator" },
        { href: "/tools/lpg-vs-diesel-cost-calculator/", label: "LPG vs diesel cost calculator" },
        { href: "/lpg-composition-and-properties/", label: "LPG composition and properties" },
      ]}
    >
      <H2>Conversion factors used</H2>
      <SpecTable
        head={["From", "To", "Factor"]}
        rows={[
          ["1 kWh", "MJ", "3.6"],
          ["1 BTU", "joules", "1,055.06"],
          ["1 MMBTU", "MJ", "about 1,055"],
          ["1 kg LPG", "MJ", "46 (planning value, editable)"],
          ["1 kg LPG", "kWh", "about 12.8"],
          ["1 kg LPG", "MMBTU", "about 0.0436"],
        ]}
      />
      <P>The first three factors are fixed unit definitions. The last three depend on the heating value you enter.</P>
      <H2>When this is useful</H2>
      <UL
        items={[
          "Comparing LPG with natural gas or diesel on the same energy basis",
          "Turning a burner or heater rating into kg of gas per hour",
          "Reading a gas bill in MMBTU and seeing the kg of LPG that carries the same heat",
        ]}
      />
    </ToolPage>
  );
}

import { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import ToolPage from "@/components/r4plus/ToolPage";
import { perKgFor, pkr } from "@/lib/prices";
import { meta } from "@/lib/seo";
import Calculator from "./Calculator";

const path = "/tools/lpg-vs-diesel-cost-calculator/";
export const metadata = meta({ path });

const faqs = [
  {
    q: "Is LPG cheaper than diesel?",
    a: "It depends on the two prices on the day and on your equipment. The calculator compares cost per unit of useful heat using your diesel price and an LPG rate. We do not assume either.",
  },
  {
    q: "How much LPG replaces a litre of diesel?",
    a: "On the default values (36 MJ per litre of diesel, 46 MJ per kg of LPG, equal efficiency) about 0.78 kg of LPG carries the heat of one litre of diesel.",
  },
  {
    q: "Can any diesel burner run on LPG?",
    a: "No. Boilers, furnaces and ovens can often be converted or fitted with LPG burners after assessment. Diesel engines and generators cannot simply run on LPG. See boiler and furnace conversion.",
  },
  {
    q: "What does the result leave out?",
    a: "Conversion cost, storage and vaporizer equipment, deposits, delivery, maintenance and taxes. A quote and a site assessment add those.",
  },
];

export default function Page() {
  const perKg = perKgFor();
  return (
    <ToolPage
      path={path}
      crumb="LPG vs diesel cost calculator"
      h1="LPG vs diesel cost calculator for boilers, ovens and furnaces"
      intro="Enter the diesel you use and what you pay to see how much LPG gives the same heat and what each fuel would cost per month. The numbers are yours; the heating values are editable assumptions. Not a quote."
      calculator={<Calculator perKgPkr={perKg} />}
      request="bulk_industrial"
      formHeading="Request an LPG quotation"
      faqs={faqs}
      related={[
        { href: "/industrial-lpg-supply/", label: "Industrial LPG supply" },
        { href: "/services/boiler-and-furnace-conversion-to-lpg/", label: "Boiler and furnace conversion to LPG" },
        { href: "/tools/lpg-btu-kwh-converter/", label: "BTU and kWh converter" },
        { href: "/tools/lpg-tank-size-calculator/", label: "Tank size calculator" },
        { href: "/bulk-lpg-supply/", label: "Bulk LPG supply" },
      ]}
    >
      <H2>How the comparison works</H2>
      <UL
        items={[
          "Useful heat = diesel litres × MJ per litre × diesel efficiency",
          "LPG needed = useful heat / (MJ per kg × LPG efficiency)",
          "Cost = quantity × price for each fuel; saving = diesel cost minus LPG cost",
        ]}
      />
      <P>
        Default heating values are 36 MJ per litre for diesel and 46 MJ per kg for LPG. These are planning figures and the
        fields are editable. On those defaults, about 0.78 kg of LPG carries the heat of one litre of diesel at equal
        efficiency.
      </P>
      {perKg != null ? (
        <>
          <H2>Worked example (edit the tool with your diesel price)</H2>
          <SpecTable
            head={["Item", "Figure"]}
            rows={[
              ["LPG rate loaded", `${pkr(perKg)} per kg (OGRA month on file — confirm when you order)`],
              ["Heat parity (defaults)", "≈ 0.78 kg LPG per litre diesel"],
              ["LPG cost for that heat", `≈ ${pkr(Math.round(perKg * 0.78))} per litre-equivalent`],
            ]}
            caption="Enter your diesel Rs/litre in the calculator to see the break-even and monthly saving. Conversion and storage costs are separate."
          />
        </>
      ) : null}
      <Note title="About the LPG rate" tone="info">
        <p>
          The tool pre-fills the monthly OGRA consumer rate we have on file. Confirm the figure for your order date; bulk
          and industrial supply may be quoted differently from the household consumer line.
        </p>
      </Note>
      <H2>Heat content of common fuels</H2>
      <SpecTable
        head={["Fuel", "Typical heat content", "Unit it is sold in"]}
        rows={[
          ["LPG", "about 46 MJ per kg", "kg (cylinder or bulk)"],
          ["Diesel", "about 36 MJ per litre (about 43 MJ per kg)", "litre"],
          ["Furnace oil", "about 40 MJ per kg", "kg or tonne"],
          ["Kerosene", "about 35 MJ per litre", "litre"],
          ["Natural gas", "about 37 MJ per m³", "hm³ or MMBTU on the bill"],
          ["Dry firewood", "about 15–18 MJ per kg", "maund or kg"],
        ]}
        caption="Typical net values. Compare cost per MJ: price per unit ÷ MJ per unit."
      />
      <P>
        Heat content is only half the story. Diesel burners and generators need regular nozzle and filter service and
        produce soot, while LPG burns cleanly and keeps heat exchangers cleaner. A site that saves a little on fuel with
        diesel can lose it again in maintenance and downtime.
      </P>

      <H2>Before you decide</H2>
      <UL
        items={[
          "Check the burner or boiler can be converted or replaced, and what that costs",
          "Check the space, safety distances and approvals for LPG storage",
          "Compare a written quote, not the OGRA consumer rate alone",
          "Test with a month of your real diesel invoices",
        ]}
      />
    </ToolPage>
  );
}

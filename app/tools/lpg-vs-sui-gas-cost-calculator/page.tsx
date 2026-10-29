import { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import ToolPage from "@/components/r4plus/ToolPage";
import { perKgFor, pkr } from "@/lib/prices";
import { meta } from "@/lib/seo";
import Calculator from "./Calculator";

const path = "/tools/lpg-vs-sui-gas-cost-calculator/";
export const metadata = meta({ path });

const faqs = [
  {
    q: "Is LPG cheaper than Sui gas?",
    a: "Usually not per unit of heat when you have a regulated pipeline connection. LPG makes sense where there is no connection, pressure fails in winter or supply is cut. Enter your own bill figures to see your case.",
  },
  {
    q: "How do I find my Sui gas cost per MMBTU?",
    a: "Take the total amount on your bill and divide it by the MMBTU used in the same month. That includes the charges you actually pay.",
  },
  {
    q: "How many kg of LPG equal 1 MMBTU?",
    a: "About 22.9 kg at 46 MJ per kg, because 1 MMBTU is about 1,055 MJ.",
  },
  {
    q: "Can I run my Sui gas stove on LPG?",
    a: "Not without conversion. A natural gas stove needs the right jets and a regulator for LPG. Ask a qualified installer.",
  },
];

export default function Page() {
  const perKg = perKgFor();
  return (
    <ToolPage
      path={path}
      crumb="LPG vs Sui gas cost calculator"
      h1="LPG vs Sui gas cost calculator: compare cost per MMBTU"
      intro="Enter your monthly Sui gas use and what you pay per MMBTU to see how much LPG carries the same heat and what it would cost at the OGRA rate on file. Your bill, your numbers — not a quote."
      calculator={<Calculator perKgPkr={perKg} />}
      faqs={faqs}
      related={[
        { href: "/lpg-vs-sui-gas/", label: "LPG vs Sui gas: differences and when to switch" },
        { href: "/tools/lpg-btu-kwh-converter/", label: "BTU and kWh converter" },
        { href: "/lpg-price-per-kg-in-pakistan/", label: "LPG price per kg today" },
        { href: "/new-lpg-connection/", label: "New LPG connection" },
      ]}
    >
      <H2>How the comparison works</H2>
      <UL
        items={[
          "LPG kg = MMBTU × 1,055.06 MJ / LPG heating value (MJ per kg)",
          "LPG cost = LPG kg × rate per kg",
          "Sui gas cost = MMBTU × the price per MMBTU you enter",
        ]}
      />
      <P>
        Pipeline gas prices depend on the slab and charges on your bill. We do not publish a Sui gas tariff here,
        so enter the figure from your own bill. When your pipeline supply is reliable it will often be the lower-cost
        fuel; LPG is the choice when there is no line, no pressure or no supply.
      </P>
      {perKg != null ? (
        <>
          <H2>Worked heat parity</H2>
          <SpecTable
            head={["Item", "Figure"]}
            rows={[
              ["1 MMBTU", "≈ 1,055 MJ"],
              ["LPG at 46 MJ/kg", "≈ 22.9 kg per MMBTU"],
              ["LPG rate loaded", `${pkr(perKg)} per kg`],
              ["LPG cost for 1 MMBTU", `≈ ${pkr(Math.round(perKg * 22.9))}`],
            ]}
            caption="Enter your bill's Rs per MMBTU in the calculator to compare. Confirm the LPG rate when you order."
          />
        </>
      ) : null}
      <Note title="About the LPG rate" tone="info">
        <p>
          The tool uses the monthly OGRA consumer rate we have on file. Confirm it for your order date. Deposit and
          delivery for cylinders are separate from this energy comparison.
        </p>
      </Note>
    </ToolPage>
  );
}

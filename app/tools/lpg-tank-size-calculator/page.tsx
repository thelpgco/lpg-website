import Link from "next/link";
import { H2, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import ToolPage from "@/components/r4plus/ToolPage";
import { meta } from "@/lib/seo";
import Calculator from "./Calculator";

const path = "/tools/lpg-tank-size-calculator/";
export const metadata = meta({ path });

const faqs = [
  {
    q: "How do I choose an LPG storage tank size?",
    a: "Start from your gas use and how long you want the tank to last between deliveries, add a reserve, then allow for the maximum fill level. The calculator gives a rough figure. A site assessment confirms the real size.",
  },
  {
    q: "Why is the tank not filled 100%?",
    a: "Liquid LPG expands as it warms. Tanks and cylinders are filled below full to leave a vapour space, which is a safety requirement.",
  },
  {
    q: "Does the result include a vaporizer?",
    a: "No. A vaporizer is sized separately from how fast you draw gas at peak, not from how much you store. See the LPG vaporizers page.",
  },
  {
    q: "Do I need approval for a bulk tank?",
    a: "Bulk LPG storage is regulated, with safety distances and approvals. Check the rules with OGRA and local authorities, and ask us for an assessment of your site.",
  },
  {
    q: "Can I use cylinders instead of a tank?",
    a: "Many kitchens run on 45.4 kg cylinders or a manifold bank. A tank suits higher continuous use or fewer deliveries. We compare options at assessment.",
  },
];

export default function Page() {
  return (
    <ToolPage
      path={path}
      crumb="Tank size calculator"
      h1="LPG tank size calculator: rough storage from your gas use"
      intro="Enter your gas use and how often you want deliveries to get a rough storage volume in kg and litres. It is a starting point for a conversation, not a tank design."
      calculator={<Calculator />}
      request="bulk_industrial"
      formHeading="Request a site assessment"
      faqs={faqs}
      related={[
        { href: "/bulk-lpg-supply/", label: "Bulk LPG supply" },
        { href: "/services/lpg-storage-tank-installation/", label: "Storage tank installation" },
        { href: "/lpg-vaporizers/", label: "LPG vaporizers" },
        { href: "/lpg-bowser/", label: "LPG bowser" },
        { href: "/tools/lpg-litre-to-kg-converter/", label: "Litre to kg converter" },
      ]}
    >
      <H2>How the estimate works</H2>
      <UL
        items={[
          "Gas use per day = your use converted to kg per day",
          "Stock needed = kg per day x days between deliveries x (1 + reserve)",
          "Liquid volume = stock in kg / density",
          "Water capacity = liquid volume / maximum fill level",
        ]}
      />
      <P>
        For high-use sites, compare with{" "}
        <Link className="underline" href="/commercial-lpg-supply/">cylinder banks</Link> before choosing a tank. A tank
        installation also needs siting, foundations, piping and commissioning, which our engineering team assesses on
        request.
      </P>
      <H2>Worked planning example</H2>
      <SpecTable
        head={["Input", "Example"]}
        rows={[
          ["Use", "40 kg per day"],
          ["Days between deliveries", "7"],
          ["Reserve", "20%"],
          ["Max fill", "85%"],
          ["Stock needed", "40 × 7 × 1.2 = 336 kg"],
          ["Rough water capacity", "336 / 0.54 / 0.85 ≈ 730 litres (planning only)"],
        ]}
        caption="Example only. Density and fill limits depend on the tank and regulation. A site assessment sets the real size."
      />
      <H2>What the calculator does not know</H2>
      <UL
        items={[
          "Your site layout, boundary distances and the approvals that apply",
          "Peak gas draw and the vaporizer needed to meet it",
          "Winter or summer temperature effects on supply",
          "Delivery truck access and filling arrangements",
        ]}
      />
      <P>
        Request a site assessment with the form, or read{" "}
        <Link className="underline" href="/services/lpg-storage-tank-installation/">
          storage tank installation
        </Link>
        .
      </P>
    </ToolPage>
  );
}

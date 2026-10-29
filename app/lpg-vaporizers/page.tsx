import ApplianceInfoPage from "@/components/r4plus/ApplianceInfoPage";
import { meta } from "@/lib/seo";

const path = "/lpg-vaporizers/";
export const metadata = meta({ path });

export default function Page() {
  return (
    <ApplianceInfoPage
      path={path}
      crumbs={[
        { name: "Shop", href: "/shop/" },
        { name: "LPG vaporizers", href: path },
      ]}
      productionH1="LPG vaporizers: what they do, when you need one and how to ask"
      h1="LPG vaporizers: what they do, when you need one and how to ask"
      intro="An LPG vaporizer turns liquid LPG into gas fast enough for high-demand sites. It is sized from your peak gas draw and fitted by engineers. Request an assessment — we do not publish a standing price or DIY kits."
      shortAnswer="Sites that draw a lot of gas, run in cold weather or use a bulk tank may need a vaporizer. It is sized from peak draw and installed by engineers. We quote after a brief; no price or stock list is published here."
      tip="A vaporizer is sized by peak gas flow in kg per hour, not by how large the tank is. Bring your equipment list or load when you ask."
      sections={[
        {
          title: "What a vaporizer does",
          text: "LPG is stored as a liquid and boils into gas as pressure drops. A cylinder or tank normally vaporizes enough gas on its own, but under heavy draw or in cold weather it cannot keep up and the pressure falls. A vaporizer adds heat or surface area so liquid LPG becomes gas at the rate you need.",
        },
        {
          title: "When a site needs one",
          items: [
            "Bulk tank supply to boilers, furnaces or large kitchens",
            "Large cylinder banks with continuous high draw",
            "Cold climates where ambient vaporization is too slow",
            "LPG-air (SNG) systems that need a steady supply of vapour",
          ],
        },
        {
          title: "How it is sized",
          text: "A vaporizer is sized by peak gas flow in kg per hour, not by storage size. We need your equipment list or load, hours of operation, tank or bank arrangement and the lowest ambient temperature at the site. Ambient (air-heated) units suit moderate climates; heated units are considered when ambient vaporization cannot meet peak draw.",
        },
        {
          title: "Installation",
          text: "Vaporizers need correct siting, piping, regulation and safety devices, and in some cases approvals. They are installed and tested by our engineering team as part of a quoted job. We do not sell vaporizers for do-it-yourself fitting.",
        },
        {
          title: "What a brief should include",
          items: [
            "Peak kg/h if known, or a list of burners/boilers with ratings",
            "Hours of continuous operation and any seasonal peaks",
            "Tank capacity or cylinder-bank layout, or plans for one",
            "Lowest winter temperature and site photos or a sketch",
          ],
        },
      ]}
      compare={{
        head: ["Point", "What to ask or check"],
        rows: [
          ["Capacity", "Rated vaporization in kg per hour compared with your peak draw"],
          ["Type", "Ambient (air-heated) or heated (electric or other), and what your site supports"],
          ["Location", "Placement, safety distances and ventilation"],
          ["Controls", "Pressure regulation and safety shut-offs"],
          ["Service", "Inspection and maintenance arrangement"],
          ["Approvals", "What applies to your site and who handles it"],
        ],
      }}
      quoteNeeds={[
        "Equipment list or gas load, and peak draw if known",
        "Tank or cylinder bank arrangement, or plans for one",
        "Lowest winter temperature at the site",
        "Site plan or photos, and your city",
      ]}
      processSteps={[
        "Send a brief with load, site and city (form or WhatsApp)",
        "Our engineering team reviews peak draw and whether a vaporizer is needed at all",
        "You receive a written scope and price before any work starts",
        "Installation and testing follow the agreed scope — gas is not connected until checks pass",
      ]}
      safety={[
        "Vaporizers and bulk storage must be sited with the right safety distances and approvals",
        "LPG vapour is heavier than air and collects at low level; keep drains and pits in mind",
        "Fit gas detection at low level where the layout calls for it",
        "Inspect and maintain regulators, valves and the vaporizer on a schedule",
      ]}
      safetyLinks={[
        { href: "/lpg-safety/", label: "LPG safety guide" },
        { href: "/services/lpg-safety-audit-and-inspection/", label: "Safety audit and inspection" },
      ]}
      faqs={[
        {
          q: "What is an LPG vaporizer?",
          a: "Equipment that turns liquid LPG into gas at a controlled rate so high-demand equipment gets steady pressure.",
        },
        {
          q: "Do I need a vaporizer for a cylinder bank?",
          a: "Not always. It depends on how fast you draw gas and on the temperature. We assess this from your load.",
        },
        {
          q: "What does a vaporizer cost?",
          a: "It depends on capacity and type. We do not list a standing price here. Send a brief and we quote in writing after an assessment.",
        },
        {
          q: "Can I fit one myself?",
          a: "No. It must be designed and installed by qualified engineers and tested before gas is connected.",
        },
        {
          q: "Is a vaporizer the same as a bulk tank?",
          a: "No. The tank stores liquid LPG; the vaporizer creates vapour at the rate your plant needs. Tank size and vaporizer size are separate decisions.",
        },
      ]}
      related={[
        { href: "/services/lpg-storage-tank-installation/", label: "Storage tank installation" },
        { href: "/services/lpg-air-sng-systems/", label: "LPG-air (SNG) systems" },
        { href: "/bulk-lpg-supply/", label: "Bulk LPG supply" },
        { href: "/industrial-lpg-supply/", label: "Industrial LPG supply" },
        { href: "/tools/lpg-tank-size-calculator/", label: "Tank size calculator" },
      ]}
      request="engineering"
    />
  );
}

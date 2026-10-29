import ApplianceInfoPage from "@/components/r4plus/ApplianceInfoPage";
import { meta } from "@/lib/seo";

const path = "/shop/commercial-lpg-burners/";
export const metadata = meta({ path });

export default function Page() {
  return (
    <ApplianceInfoPage
      path={path}
      crumbs={[
        { name: "Shop", href: "/shop/" },
        { name: "Commercial LPG burners", href: path },
      ]}
      h1="Commercial LPG burners for restaurants and kitchens"
      intro="Commercial burners handle larger pots, longer hours and higher heat than home stoves. Tell us your kitchen and appliances and we confirm availability, price and the regulator and hose that go with them — nationwide through our OGRA-licensed network."
      shortAnswer="Match the burner's heat input to your cooking line, and pair it with a regulator and hose rated for the load. We confirm stock and price on request; no standing rupee price is listed here."
      tip="High heat input needs a regulator with enough capacity. For several burners on one line, plan a manifold — and ask whether continuous draw needs a vaporizer."
      sections={[
        {
          title: "Burner types we are asked for",
          items: [
            "Cast-iron or high-pressure burners for large pots and degs",
            "Burner ranges and karahi or wok stations",
            "Tandoor and grill burners",
            "Stock-pot and boiling burners, and burners for fryers and hot plates",
          ],
        },
        {
          title: "What decides the price",
          items: [
            "Heat input per burner (kW or BTU per hour)",
            "Number of burners and the frame or range they sit in",
            "Material and build: cast iron, steel, stainless",
            "Ignition and safety devices, if fitted",
            "Brand and warranty terms, if offered in writing",
          ],
        },
        {
          title: "Regulators, hoses and supply",
          text: "High heat input needs a regulator with enough capacity and a hose rated for the flow. For several burners on one line, use a manifold. If the draw is continuous, check whether a vaporizer is needed. Our engineering team can size and install this as a quoted job.",
        },
        {
          title: "Planning heat input (rough guide)",
          items: [
            "Ask for each burner's rated kW or BTU/h from the maker's plate",
            "Add the burners that can run at once — that total drives regulator size",
            "A single high-pressure wok or deg burner often needs a commercial regulator on its own",
            "Tell us cylinders used per week so we can discuss 45.4 kg supply or a bank",
          ],
        },
      ]}
      compare={{
        head: ["Point", "What to ask or check"],
        rows: [
          ["Heat input", "Rated kW or BTU per hour for each burner"],
          ["Gas type", "Set up for LPG, with the right jets or orifices"],
          ["Pressure", "Operating pressure and the regulator that matches it"],
          ["Capacity", "Regulator capacity against total burner load"],
          ["Build", "Cast iron or steel, and how easy parts are to replace"],
          ["Safety", "Flame-failure devices, valves and hose rating"],
        ],
      }}
      quoteNeeds={[
        "Type of kitchen and the dishes you cook",
        "Number of burners and their rating, or the make of your current ones",
        "Cylinders per week and where they are stored",
        "Your city and area",
      ]}
      processSteps={[
        "Send kitchen type, burner count or photos, and your city",
        "We confirm suitable burners, regulator capacity and whether a manifold or vaporizer is needed",
        "You receive a written price for equipment and, if asked, for gas supply and install",
        "After fitting, have the line pressure-tested before service opens",
      ]}
      safety={[
        "Keep cylinders outside the cooking area in a ventilated, shaded place",
        "Use regulators and hoses rated for commercial flow; replace damaged parts at once",
        "Train staff to close the cylinder valve first and to report any smell of gas",
        "Have the line pressure-tested by a qualified engineer after installation",
      ]}
      safetyLinks={[
        { href: "/lpg-safety/", label: "LPG safety guide" },
        { href: "/services/lpg-safety-audit-and-inspection/", label: "Safety audit and inspection" },
      ]}
      faqs={[
        {
          q: "What size burner does a restaurant need?",
          a: "It depends on the dishes, pot sizes and speed you need. Tell us your menu and appliances and we confirm what suits.",
        },
        {
          q: "Do burners come with a regulator?",
          a: "Not always. Ask what is included and what regulator capacity your total load needs.",
        },
        {
          q: "Can you also supply the gas?",
          a: "Yes. See commercial LPG supply for 45.4 kg cylinders, banks and bulk options. We confirm routes for your city when you order.",
        },
        {
          q: "What does a commercial burner cost?",
          a: "It depends on rating and build. We do not list a standing price here. Send a request and we confirm availability and price before you agree.",
        },
        {
          q: "When do I need a manifold or vaporizer?",
          a: "Several burners on one line usually need a manifold sized for total flow. Continuous high draw or cold sites may need a vaporizer — we assess from your load, not from a phone guess.",
        },
      ]}
      related={[
        { href: "/shop/", label: "Shop: LPG appliances and accessories" },
        { href: "/commercial-lpg-supply/", label: "Commercial LPG supply" },
        { href: "/industries/restaurants/", label: "LPG for restaurants" },
        { href: "/services/lpg-manifold-and-cylinder-bank-installation/", label: "Manifold and cylinder bank installation" },
        { href: "/lpg-regulators/", label: "LPG regulators" },
        { href: "/lpg-vaporizers/", label: "LPG vaporizers" },
      ]}
      request="commercial_supply"
    />
  );
}

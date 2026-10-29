import ApplianceInfoPage from "@/components/r4plus/ApplianceInfoPage";
import { meta } from "@/lib/seo";

const path = "/lpg-heaters-in-pakistan/";
export const metadata = meta({ path });

export default function Page() {
  return (
    <ApplianceInfoPage
      path={path}
      crumbs={[
        { name: "Shop", href: "/shop/" },
        { name: "LPG heaters in Pakistan", href: path },
      ]}
      category="heater"
      demoH1="LPG heaters in Pakistan: price, types and safe use"
      productionH1="LPG heaters in Pakistan: price on request, types and safe use"
      h1="LPG heaters in Pakistan: types, safe use and how to ask"
      intro="LPG room heaters are common in winter, especially where pipeline gas pressure drops. They must be used with fresh air. This page covers types, gas use and safety, and lets you ask for availability and a quote for your city."
      shortAnswer="Choose a heater with safety cut-offs and use it only in a ventilated room. We confirm stock, model and price on request. There is no standing rupee price list on this page."
      tip="Never run a gas heater in a closed bedroom or while you sleep. Heaters use oxygen and produce combustion gases — fresh air is not optional."
      sections={[
        {
          title: "Types of LPG heater",
          items: [
            "Radiant or ceramic-panel heaters, often with a cabinet that holds the cylinder",
            "Portable heaters that connect to a cylinder with a regulator and hose",
            "Larger commercial and workshop heaters, which we handle through a quote",
          ],
        },
        {
          title: "What decides the price",
          items: [
            "Heat output in kW or BTU per hour and the room size it can warm",
            "Safety features: tip-over cut-off, flame-failure device and an oxygen depletion sensor, where fitted",
            "Number of panels or burners, and the build of the cabinet",
            "Brand and warranty terms, if offered in writing",
          ],
        },
        {
          title: "Gas use in winter",
          text: "Heaters run for hours, so they use gas faster than a stove. Use the cylinder duration calculator with the heater's rating, and keep a filled spare cylinder stored safely upright and ventilated. A larger cylinder can reduce mid-winter refills.",
        },
        {
          title: "Cold weather and gas pressure",
          text: "In very cold weather, gas pressure inside a cylinder falls and the flame can weaken, especially under heavy draw. Propane vaporizes at lower temperatures than butane, so ask your supplier about the blend in cold areas. Do not warm a cylinder with a flame or hot water.",
        },
        {
          title: "Room size and output (planning guide)",
          items: [
            "Match the heater's rated heat input to the room — a small panel in a large hall will not warm it safely by 'running longer'",
            "Ask for the kW or BTU/h figure on the rating plate before you buy",
            "Estimate days per cylinder with the duration calculator once you know hours of use",
            "Hill stations and northern winters: plan spare cylinders and confirm delivery windows early",
          ],
        },
      ]}
      compare={{
        head: ["Point", "What to ask or check"],
        rows: [
          ["Heat output", "Rated input in kW or BTU per hour and the room size it suits"],
          ["Safety cut-offs", "Tip-over, flame-failure and oxygen depletion sensor"],
          ["Cylinder", "Which cylinder size it uses and how it connects"],
          ["Ventilation", "What the maker says about fresh air requirements"],
          ["Build", "Panels, burner and body materials"],
          ["After-sale", "Warranty terms, if any, stated in writing"],
        ],
      }}
      quoteNeeds={[
        "Room size and where the heater will stand",
        "Your city and area, and the usual winter temperatures",
        "Cylinder size you plan to use",
        "Home, office or workshop use",
      ]}
      safety={[
        "Use LPG heaters only in rooms with fresh air; they use oxygen and release combustion gases",
        "Never leave a heater on while you sleep or leave children or pets alone with it",
        "Keep curtains, bedding and furniture well away from the heater",
        "Keep the cylinder upright, outside living space where possible, with a regulator and hose in good condition",
        "If you smell gas, close the valve, open windows and avoid switches and flames",
      ]}
      faqs={[
        {
          q: "Are LPG heaters safe?",
          a: "They can be used safely with fresh air, safety cut-offs and a sound connection. Used in a closed room they can cause carbon monoxide poisoning.",
        },
        {
          q: "What is the price of an LPG heater in Pakistan?",
          a: "It depends on output, features and brand. We do not publish a standing price list here. Send a request and we confirm availability and price for your city.",
        },
        {
          q: "How long does a cylinder last with a heater?",
          a: "It depends on the heater's rating and how many hours it runs. Use the duration calculator to estimate, and keep a spare cylinder stored safely.",
        },
        {
          q: "Can I run a heater in a closed bedroom?",
          a: "No. Do not run a gas heater in a closed bedroom or while you sleep.",
        },
        {
          q: "Do heaters need a special regulator?",
          a: "Use a regulator matched to the heater's load and the cylinder valve. Cabinet heaters often include a connection; portable units need a separate regulator and hose. Ask us what fits.",
        },
      ]}
      related={[
        { href: "/shop/", label: "Shop: LPG appliances and accessories" },
        { href: "/tools/lpg-cylinder-duration-calculator/", label: "Cylinder duration calculator" },
        { href: "/propane-vs-butane/", label: "Propane vs butane" },
        { href: "/lpg-geyser-price-in-pakistan/", label: "LPG geyser price in Pakistan" },
        { href: "/lpg-cylinder-sizes-in-pakistan/", label: "LPG cylinder sizes" },
      ]}
      request="appliances"
    />
  );
}

import ApplianceInfoPage from "@/components/r4plus/ApplianceInfoPage";
import { meta } from "@/lib/seo";

const path = "/lpg-stove-price-in-pakistan/";
export const metadata = meta({ path });

export default function Page() {
  return (
    <ApplianceInfoPage
      path={path}
      crumbs={[
        { name: "Shop", href: "/shop/" },
        { name: "LPG stove price in Pakistan", href: path },
      ]}
      category="stove"
      demoH1="LPG stove price in Pakistan: price and what decides it"
      productionH1="LPG stove price in Pakistan: price on request, what decides it"
      h1="LPG stove price in Pakistan: what decides it and how to ask"
      intro="An LPG stove costs more or less depending on burner count, materials, ignition and brand. We quote the price for your city when you ask — this page explains what to compare, how a kit fits together and how to request availability."
      shortAnswer="Ask for a stove built for LPG, with the burner count and safety features you want. We confirm stock, model and price on request. There is no standing rupee price list on this page."
      tip="A stove alone is not a full connection: you also need a regulator and an LPG-rated hose that fit your cylinder valve. Ask for a kit if you are starting from scratch."
      sections={[
        {
          title: "What decides the price of an LPG stove",
          items: [
            "Number of burners: single, double, triple or four-burner stoves cost progressively more",
            "Body and burner material: stainless steel, enamelled steel, cast iron or brass burner heads",
            "Ignition: manual lighting or a built-in spark igniter",
            "Safety features such as a flame-failure device that cuts gas if the flame goes out",
            "Burner size and heat input (kW), which affects cooking speed and gas use",
            "Table-top stove or a built-in hob, and the brand and warranty offered in writing",
          ],
        },
        {
          title: "LPG stove vs natural gas stove",
          text: "A stove must be set up for the gas it burns. LPG needs smaller jets and a regulator, and a stove made for natural gas cannot simply be switched over. Ask for an LPG-rated stove or have a qualified person fit the correct jets. Do not drill or swap parts yourself.",
        },
        {
          title: "Cylinder, regulator and hose",
          text: "A stove needs a regulator and a hose that suit the cylinder and the stove. Keep the hose as short as practical, clamped at both ends, away from the flame. Ask us for a complete kit when you order a new connection, and check the hose condition regularly.",
        },
        {
          title: "Typical home setups",
          items: [
            "Two-burner table-top stove with an 11.8 kg domestic cylinder — the most common home kit",
            "Three- or four-burner stove for larger families; expect faster gas use",
            "Built-in hob where cabinetry and ventilation allow a proper install",
            "Small commercial counter stove — confirm regulator capacity before you buy",
          ],
        },
      ]}
      compare={{
        head: ["Point", "What to ask or check"],
        rows: [
          ["Gas type", "Is it set up for LPG, with LPG jets fitted"],
          ["Burners", "How many, and what heat input each has"],
          ["Ignition", "Manual or built-in igniter; replacement parts available"],
          ["Safety", "Flame-failure device or not"],
          ["Build", "Material of body, pan supports and burner heads"],
          ["Supply", "Regulator and hose included or sold separately"],
          ["After-sale", "Warranty terms, if any, stated in writing"],
        ],
        caption: "Use this checklist on the call before you agree a price.",
      }}
      quoteNeeds={[
        "Number of burners you want and whether it is table-top or built-in",
        "Your city and area",
        "Home or small business use",
        "Cylinder size you plan to use (11.8 kg is the usual home size)",
        "Whether you also need a regulator and hose",
      ]}
      safety={[
        "Place the cylinder upright, outside the cooking spot where possible, away from the flame",
        "Use a regulator and hose made for LPG; replace cracked or hardened hoses",
        "Check connections with soapy water, never with a flame",
        "Keep the kitchen ventilated; if you smell gas, close the valve, open windows and avoid switches",
      ]}
      faqs={[
        {
          q: "What is the price of an LPG stove in Pakistan?",
          a: "It depends on the model, burners and features. We do not publish a standing price list here. Send a request with your city and burner count and we confirm availability and price before you agree.",
        },
        {
          q: "Do you stock stoves?",
          a: "We supply LPG stoves through our network where stock allows. Exact models and stock are confirmed when you ask — we do not promise a stove we cannot deliver.",
        },
        {
          q: "Can I use my Sui gas stove on LPG?",
          a: "Only after conversion with the correct jets and a regulator by a qualified person. Do not improvise.",
        },
        {
          q: "How do I connect a stove to a cylinder?",
          a: "With a regulator and an LPG-rated hose, clamped at both ends. See the LPG kit page and the safety guide. Have the joints leak-tested with soapy water before cooking.",
        },
        {
          q: "Does stove price include the cylinder and gas?",
          a: "No. The stove is separate from cylinder gas. Gas follows the OGRA per-kg rate. Order a cylinder or new connection if you need gas as well.",
        },
        {
          q: "Which cylinder size goes with a home stove?",
          a: "Most homes use the 11.8 kg domestic cylinder. Light use can use 5 kg; commercial kitchens usually need 45.4 kg with the right regulator.",
        },
      ]}
      related={[
        { href: "/shop/", label: "Shop: LPG appliances and accessories" },
        { href: "/lpg-kit-price-in-pakistan/", label: "LPG kit price in Pakistan" },
        { href: "/lpg-regulators/", label: "LPG regulators" },
        { href: "/new-lpg-connection/", label: "New LPG connection" },
        { href: "/lpg-geyser-price-in-pakistan/", label: "LPG geyser price in Pakistan" },
        { href: "/lpg-heaters-in-pakistan/", label: "LPG heaters in Pakistan" },
      ]}
      request="appliances"
    />
  );
}

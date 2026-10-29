import ApplianceInfoPage from "@/components/r4plus/ApplianceInfoPage";
import { meta } from "@/lib/seo";

const path = "/lpg-geyser-price-in-pakistan/";
export const metadata = meta({ path });

export default function Page() {
  return (
    <ApplianceInfoPage
      path={path}
      crumbs={[
        { name: "Shop", href: "/shop/" },
        { name: "LPG geyser price in Pakistan", href: path },
      ]}
      category="geyser"
      demoH1="LPG geyser price in Pakistan: price, types and safety"
      productionH1="LPG geyser price in Pakistan: price on request, types and safety"
      h1="LPG geyser price in Pakistan: types, safety and how to ask"
      intro="LPG geysers heat water with gas, either instantly as it flows or in a tank. Price depends on type and capacity. We quote stock and price for your city when you ask — and we take ventilation and flue needs seriously on every request."
      shortAnswer="Choose an instant or storage LPG geyser by hot-water need, and fit it where fumes can escape safely. We confirm stock, model and price on request. There is no standing rupee price list on this page."
      tip="A geyser draws gas faster than a stove. Plan cylinder size (or a spare) before winter, and never fit a gas geyser in a closed bathroom without a proper flue."
      sections={[
        {
          title: "Types of LPG geyser",
          items: [
            "Instant (tankless) geyser: heats water as it flows, so it uses gas only while hot water runs",
            "Storage geyser: heats a tank and keeps water hot, which uses gas to hold the temperature",
            "Heat output and flow rate: larger outputs supply more hot water at once and use more gas",
          ],
        },
        {
          title: "What decides the price",
          items: [
            "Type and hot-water capacity or flow rate",
            "Safety features such as flame-failure cut-off and overheat protection",
            "Build quality, brand and warranty offered in writing",
            "Installation needs, including a flue or vent, pipes and a regulator with enough flow",
          ],
        },
        {
          title: "Where a gas geyser can be fitted",
          text: "A gas geyser needs fresh air and a way to take combustion fumes outside. A poorly ventilated or enclosed room such as a small bathroom without a proper flue can fill with carbon monoxide, which cannot be seen or smelled. Have the geyser placed and fitted by a qualified person.",
        },
        {
          title: "Gas use and cylinder size",
          text: "A geyser draws gas faster than a stove. The 11.8 kg cylinder may empty quicker than you expect if the geyser runs often, so consider a larger cylinder or a second cylinder in winter. Estimate with the cylinder duration calculator, using the geyser's heat input from the rating plate.",
        },
        {
          title: "Installation checklist",
          items: [
            "Confirm the room has fresh air and a flue or vent path to outside",
            "Match the regulator flow rating to the geyser's heat input",
            "Use LPG-rated hose and clamps, or fixed pipework sized by an installer",
            "Leak-test every joint with soapy water before regular use",
            "Ask who services the unit and what the warranty covers in writing",
          ],
        },
      ]}
      compare={{
        head: ["Point", "What to ask or check"],
        rows: [
          ["Type", "Instant or storage; which suits your hot water need"],
          ["Heat output", "Rated input in kW or BTU per hour, to size the cylinder"],
          ["Flue or vent", "What the geyser needs and where it will be placed"],
          ["Water pressure", "Minimum pressure needed for an instant geyser to light"],
          ["Safety", "Flame-failure cut-off and other protections"],
          ["Installation", "Who fits it and tests it, and what is included"],
          ["After-sale", "Warranty terms, if any, stated in writing"],
        ],
      }}
      quoteNeeds={[
        "Instant or storage type, and number of bathrooms or taps",
        "Where it will be installed and whether a flue or vent is possible",
        "Cylinder size or supply you will connect it to",
        "Your city and area",
      ]}
      processSteps={[
        "Send type (instant or storage), city and where it will be fitted",
        "We confirm whether we can supply a suitable model and what installation help is available locally",
        "You receive availability, price and delivery or install terms before you agree",
        "After fitting, insist on a leak test and a clear flue check before regular use",
      ]}
      safety={[
        "Never fit a gas geyser in a closed bathroom or small room without a proper flue and fresh air",
        "Have the installation and the connection tested by a qualified person",
        "Use a suitable regulator and hose, and replace damaged parts",
        "Service the geyser on a schedule, and stop using it if the flame is yellow, sooty or lazy",
      ]}
      safetyLinks={[
        { href: "/lpg-safety/", label: "LPG safety guide" },
        { href: "/what-to-do-if-you-smell-gas/", label: "What to do if you smell gas" },
        { href: "/lpg-leak-detector/", label: "LPG leak detectors" },
      ]}
      faqs={[
        {
          q: "What is the price of an LPG geyser in Pakistan?",
          a: "It depends on type, capacity and brand. We do not publish a standing price list here. Send a request and we confirm availability and price for your city before you agree.",
        },
        {
          q: "Is an LPG geyser safe indoors?",
          a: "Only when it is fitted with fresh air and a way to take fumes outside, by a qualified person. Never place it in a closed bathroom without a flue.",
        },
        {
          q: "How much gas does a geyser use?",
          a: "More than a stove, and it depends on the heat input and how long the hot water runs. Use the duration calculator with your geyser's rating plate figure.",
        },
        {
          q: "Do you install geysers?",
          a: "Ask us when you send a request. We confirm installation options for your city and the appliance. Fixed pipework and flues need a qualified person.",
        },
        {
          q: "Instant or storage — which should I choose?",
          a: "Instant suits short bursts of hot water and uses gas only while water runs. Storage keeps a tank hot and can serve several taps, but uses gas to hold temperature. Tell us how many bathrooms you have and we advise.",
        },
      ]}
      related={[
        { href: "/shop/", label: "Shop: LPG appliances and accessories" },
        { href: "/tools/lpg-cylinder-duration-calculator/", label: "Cylinder duration calculator" },
        { href: "/lpg-regulators/", label: "LPG regulators" },
        { href: "/lpg-heaters-in-pakistan/", label: "LPG heaters in Pakistan" },
        { href: "/lpg-stove-price-in-pakistan/", label: "LPG stove price in Pakistan" },
      ]}
      request="appliances"
    />
  );
}

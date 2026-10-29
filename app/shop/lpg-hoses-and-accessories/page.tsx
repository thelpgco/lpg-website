import ApplianceInfoPage from "@/components/r4plus/ApplianceInfoPage";
import { meta } from "@/lib/seo";

const path = "/shop/lpg-hoses-and-accessories/";
export const metadata = meta({ path });

export default function Page() {
  return (
    <ApplianceInfoPage
      path={path}
      crumbs={[
        { name: "Shop", href: "/shop/" },
        { name: "LPG hoses and accessories", href: path },
      ]}
      h1="LPG hoses, regulators and accessories: what to buy and check"
      intro="Hoses, regulators and clamps are the parts that connect a cylinder to your stove or heater — and the parts most likely to fail with age. Learn what to check, then ask us for availability and a quote for your city."
      shortAnswer="Buy hoses and regulators made for LPG, keep the hose short and in good condition, and replace worn parts. We confirm stock and price on request; no standing rupee price is listed here."
      tip="Never test a connection with a flame. Brush soapy water on every joint and look for bubbles. Close the cylinder valve when the appliance is not in use."
      sections={[
        {
          title: "What we can help with",
          items: [
            "LPG hose and regulator kits for home use",
            "Regulators for domestic and commercial cylinders",
            "Hose clamps and fittings",
            "Leak detectors and other safety accessories",
          ],
        },
        {
          title: "What decides the price",
          items: [
            "Hose type, length and rating",
            "Regulator type and flow capacity: domestic or commercial",
            "Material and build of fittings and clamps",
            "Brand and warranty terms, if offered in writing",
          ],
        },
        {
          title: "When to replace a hose or regulator",
          items: [
            "Cracks, stiffness, swelling or soft spots on the hose",
            "A hose that is old, kinked or has been near heat",
            "A regulator that leaks, hisses or has a damaged diaphragm or knob",
            "Any time you smell gas near the connection",
            "Past the maker's date mark, or the mark is unreadable",
          ],
        },
        {
          title: "Hose length and routing",
          text: "Keep the hose as short as practical. Route it away from the flame, sharp edges, foot traffic and hot pans. Do not join two hoses with makeshift fittings. A new connection kit often includes a short LPG-rated hose with clamps — ask what is included when you order.",
        },
        {
          title: "How to leak-test a new hose at home",
          text: "With the appliance off, open the cylinder valve and brush soapy water over both hose ends, the clamps and the regulator joint. Growing bubbles mean a leak: close the valve, tighten or replace the part and test again. Never use a match or lighter to look for a leak, because LPG ignites at the first spark.",
        },
      ]}
      compare={{
        head: ["Point", "What to ask or check"],
        rows: [
          ["Hose", "Rated for LPG, correct length (as short as practical) and condition"],
          ["Clamps", "Fitted at both ends and tight"],
          ["Regulator", "Matches the cylinder valve and the load of your appliance"],
          ["Capacity", "Domestic or commercial flow rating"],
          ["Fit", "Cylinder valve type and thread compatible with the regulator"],
          ["After-sale", "Warranty terms, if any, stated in writing"],
        ],
      }}
      quoteNeeds={[
        "What the hose and regulator will connect: stove, geyser, heater or burner",
        "Cylinder size and valve type",
        "Home or commercial use",
        "Your city and area",
      ]}
      safety={[
        "Never test a connection with a flame: use soapy water and look for bubbles",
        "Keep hoses away from heat, sharp edges and anywhere they can be pinched or stepped on",
        "Do not join hoses or use a hose that is not made for LPG",
        "Close the cylinder valve when the appliance is not in use, especially overnight",
      ]}
      safetyLinks={[
        { href: "/lpg-safety/", label: "LPG safety guide" },
        { href: "/lpg-regulator-problems-and-repair/", label: "Regulator problems and repair" },
        { href: "/what-to-do-if-you-smell-gas/", label: "What to do if you smell gas" },
      ]}
      faqs={[
        {
          q: "How often should I replace an LPG hose?",
          a: "Replace it when it shows cracks, hardening or damage, and check it regularly. Do not wait for a leak. Many makers also print a date mark — follow it.",
        },
        {
          q: "What does an LPG hose and regulator cost?",
          a: "It depends on the type and capacity. We do not list a standing price here. See the kit price page for what affects it, then send a request for your city.",
        },
        {
          q: "Is a commercial regulator different from a domestic one?",
          a: "Yes. A commercial regulator has a higher flow capacity for larger loads. Ask us what suits your appliances.",
        },
        {
          q: "Can I fit a regulator myself?",
          a: "Fitting is simple but must be done correctly, then checked for leaks with soapy water. If you are unsure, ask a qualified person or the delivery team.",
        },
        {
          q: "Does a new cylinder include a hose and regulator?",
          a: "Not always. Ask what is included when you order a new connection. We can quote a kit with the cylinder.",
        },
      ]}
      related={[
        { href: "/shop/", label: "Shop: LPG appliances and accessories" },
        { href: "/lpg-kit-price-in-pakistan/", label: "LPG kit price in Pakistan" },
        { href: "/lpg-regulators/", label: "LPG regulators" },
        { href: "/lpg-leak-detector/", label: "LPG leak detectors" },
        { href: "/new-lpg-connection/", label: "New LPG connection" },
      ]}
      request="appliances"
    />
  );
}

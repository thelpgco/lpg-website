import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { fitDescription, fitTitle, meta } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/lpg-in-hyderabad/";
export const metadata = meta({
  path,
  title: fitTitle([
    "LPG Gas in Hyderabad: Price, Delivery & Supply",
    "LPG Gas in Hyderabad Sindh: Delivery & Supply",
  ]),
  description: fitDescription([
    `Order LPG gas in Hyderabad from ${site.shortName}, an OGRA-licensed marketer. Sindh hub notes beyond Karachi, named dealers and how to order by call or WhatsApp.`,
    `LPG in Hyderabad (Sindh) from ${site.shortName}: Qasimabad and Latifabad supply notes, pricing and how to order by call, WhatsApp or form.`,
  ]),
  index: isCityIndexable("hyderabad"),
});

export default function Page() {
  return (
    <CityHubStatic
      slug="hyderabad"
      name="Hyderabad"
      provinceSlug="sindh"
      summary="Hyderabad is Sindh’s second major LPG demand centre after Karachi, covering Latifabad and Qasimabad colonies, old-city kitchens and commercial streets along the Indus belt."
      angles={[
        {
          title: "Qasimabad and Latifabad colonies",
          text: "Partner localities we check include Qasimabad and Bhittai Town belts alongside the wider city. Name your unit, phase or landmark — colony layouts are dense and truck access varies by street width.",
        },
        {
          title: "Indus-belt heat and humidity",
          text: "Hot summers and humid stretches call for shaded, upright cylinder storage and a hose check on every delivery. Refuse bottles with heavy base rust or damaged valves.",
        },
        {
          title: "Commercial kitchens and Shahi Bazar load",
          text: "Restaurants and busy market kitchens lean on 45.4 kg cylinders. Tell us weekly changeovers and whether unloading is from a narrow bazaar lane or an open plot.",
        },
        {
          title: "Link to Karachi stock corridors",
          text: "Hyderabad sits on the road corridor toward Karachi, which helps stock move when highways are clear. Local last-mile timing still depends on your area and the time of day — we confirm before dispatch.",
        },
        {
          title: "Named dealers in the directory",
          text: "Named Hyderabad suppliers appear on this page. Coverage is thinner than Karachi, so we confirm who can reach you on the call rather than promising every street at a fixed hour.",
        },
        {
          title: "Homes on 11.8 kg cycles",
          text: "Most households cook on the 11.8 kg domestic cylinder. If piped gas is weak or absent in your block, plan refills before the bottle is empty — especially ahead of long weekends.",
        },
      ]}
      sizeNotes={[
        "11.8 kg domestic cylinder for most homes",
        "15 kg where a household wants fewer refills",
        "45.4 kg commercial cylinder for restaurants and market kitchens",
      ]}
      extraFaqs={[
        {
          q: "Do you cover Qasimabad and Latifabad?",
          a: "These colony belts are among the areas we check against listed partners. Send your unit or phase with the order; we confirm reach and timing before you agree.",
        },
        {
          q: "Is Hyderabad priced like Karachi?",
          a: "The OGRA gas rate per kg is the same nationwide. Delivery, deposit and exchange terms are confirmed locally for your Hyderabad order.",
        },
      ]}
      nearby={[
        { slug: "karachi", label: "LPG in Karachi" },
        { slug: "quetta", label: "LPG in Quetta" },
        { slug: "lahore", label: "LPG in Lahore" },
        { slug: "multan", label: "LPG in Multan" },
      ]}
    />
  );
}

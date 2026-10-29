import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { fitDescription, fitTitle, meta } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/lpg-in-faisalabad/";
export const metadata = meta({
  path,
  title: fitTitle([
    "LPG Gas in Faisalabad: Price, Delivery & Supply",
    "LPG Gas in Faisalabad: Cylinder Delivery & Supply",
  ]),
  description: fitDescription([
    `Order LPG gas in Faisalabad from ${site.shortName}, an OGRA-licensed marketer. Textile and home supply notes, named dealers and how to order by call or WhatsApp.`,
    `LPG in Faisalabad from ${site.shortName}: how pricing works, mill and home delivery notes, and how to order by call, WhatsApp or form.`,
  ]),
  index: isCityIndexable("faisalabad"),
});

export default function Page() {
  return (
    <CityHubStatic
      slug="faisalabad"
      name="Faisalabad"
      provinceSlug="punjab"
      summary="Faisalabad mixes dense residential refill demand with textile mills, power-loom belts and workshop kitchens that need reliable commercial cylinder changeovers."
      angles={[
        {
          title: "Textile mills and power-loom load",
          text: "Mill canteens, dyeing units and small process heat jobs often run on 45.4 kg cylinders or banks. Send weekly changeover volume and gate timings so we can quote a practical schedule.",
        },
        {
          title: "Residential colonies and Millat Town belts",
          text: "Partner localities we check include belts such as Millat Town, Amin Town and Abdullah Garden. Name your colony and a landmark — Faisalabad spreads wide and last-mile distance matters.",
        },
        {
          title: "Hot summers, shaded storage",
          text: "Central Punjab summers are harsh. Keep cylinders upright in shade and a ventilated spot, away from direct sun on rooftops. Domestic cooking demand stays steady; commercial kitchens add peaks around shifts.",
        },
        {
          title: "Iron Market and workshop streets",
          text: "Workshop and light-engineering streets cook and heat on LPG alongside home use. Sites that share a delivery point should say how many bottles move per week and whether a truck can unload.",
        },
        {
          title: "Named dealers in the directory",
          text: "Named Faisalabad dealers and research distributors are listed on this page. Partner density is lower than Lahore, so we confirm reach and timing on every call instead of assuming every street is covered.",
        },
        {
          title: "Corridor links to Lahore and Multan",
          text: "Road links toward Lahore and Multan help stock movement, but local traffic around the clock-tower and canal roads still sets the last mile. We confirm your street before dispatch.",
        },
      ]}
      sizeNotes={[
        "11.8 kg domestic cylinder for most homes",
        "45.4 kg commercial cylinder for mill canteens, restaurants and workshops",
        "15 kg where a home or small shop wants fewer refills; confirm stock for your area",
      ]}
      extraFaqs={[
        {
          q: "Can textile units get scheduled 45.4 kg supply?",
          a: "Yes, when a local team can reach your mill or loom unit. Send weekly cylinder count, shift pattern and gate access; we confirm price, deposit or exchange terms and timing before you agree.",
        },
        {
          q: "Is Faisalabad on the same OGRA rate as Lahore?",
          a: "Yes. The gas rate is the nationwide OGRA per-kg notification. Delivery and cylinder terms are confirmed locally for each order.",
        },
      ]}
      nearby={[
        { slug: "lahore", label: "LPG in Lahore" },
        { slug: "multan", label: "LPG in Multan" },
        { slug: "gujranwala", label: "LPG in Gujranwala" },
        { slug: "burewala", label: "LPG in Burewala" },
      ]}
    />
  );
}

import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { meta } from "@/lib/seo";

const path = "/lpg-in-burewala/";
export const metadata = meta({ path, index: isCityIndexable("burewala") });

export default function Page() {
  return (
    <CityHubStatic
      slug="burewala"
      name="Burewala"
      provinceSlug="punjab"
      summary="Burewala is a cotton-belt town in Vehari district, where homes, ginning units and farms all draw on LPG cylinders."
      angles={[
        {
          title: "Cotton season and ginning units",
          text: "From late summer into winter, ginning and pressing units around Burewala run long shifts. Their canteens, boilers and workshops lean on 45.4 kg cylinders, so dealer stock tightens in the busiest weeks; regular buyers should agree a weekly drop.",
        },
        {
          title: "Farms on the canal roads",
          text: "Farmhouses and poultry sheds along the canal and Vehari roads are spread out. Send a location pin and say whether a pickup can reach the gate, because farm tracks can turn to mud after rain or canal overflow.",
        },
        {
          title: "Hot summers and cylinder storage",
          text: "South Punjab summers regularly pass 45 °C. Keep cylinders upright in shade with air around them, never on a sunny roof or in a closed store, because heat raises the pressure inside.",
        },
        {
          title: "Winter evenings",
          text: "Where Sui gas reaches, winter evening pressure falls as in the rest of Punjab, and fog on the roads from Multan and Vehari can slow trucks. Order before the cylinder is empty in December and January.",
        },
        {
          title: "Local dealers listed",
          text: "Burewala has its own listed network dealers and local distributors, so most deliveries come from inside the town rather than from Multan.",
        },
        {
          title: "Shops, workshops and food stalls",
          text: "Sweet shops, tandoors and small workshops in the main bazaar often use 15 kg or 45.4 kg cylinders. Tell us your weekly use so the dealer can plan an exchange.",
        },
      ]}
      sizeNotes={[
        "11.8 kg domestic cylinder for most homes",
        "15 kg for families with a winter geyser who want fewer refills",
        "45.4 kg commercial cylinder for ginning canteens, sweet shops and farms",
      ]}
      extraFaqs={[
        {
          q: "Do Burewala orders come from Multan?",
          a: "Usually not. Burewala has its own listed dealers, so most orders are delivered locally. If local stock runs short in the cotton season, we tell you on the call and confirm a realistic window.",
        },
        {
          q: "Can you deliver to farms outside Burewala?",
          a: "Often yes, where a dealer can reach the farm. Send a location pin and the cylinder size, and we confirm whether we can reach you before you agree.",
        },
      ]}
      nearby={[
        { slug: "multan", label: "LPG in Multan" },
        { slug: "faisalabad", label: "LPG in Faisalabad" },
        { slug: "lahore", label: "LPG in Lahore" },
      ]}
    />
  );
}

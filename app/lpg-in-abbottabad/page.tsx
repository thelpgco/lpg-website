import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { meta } from "@/lib/seo";

const path = "/lpg-in-abbottabad/";
export const metadata = meta({ path, index: isCityIndexable("abbottabad") });

export default function Page() {
  return (
    <CityHubStatic
      slug="abbottabad"
      name="Abbottabad"
      provinceSlug="khyber-pakhtunkhwa"
      summary="Abbottabad is a Hazara hill city with cold winters, schools and colleges, and steady tourist flow toward the Galiyat."
      angles={[
        {
          title: "Cool winters, higher gas use",
          text: "Abbottabad has cool to cold winters. Households use more LPG for heaters, geysers and cooking once nights drop. Order before a cylinder runs empty — foggy mornings are the worst time to discover you are out.",
        },
        {
          title: "Steep streets and Hazara road weather",
          text: "Some neighbourhoods sit on steep streets. Snow, fog or heavy rain on Hazara routes can slow a delivery truck. We confirm a realistic window on the call rather than quoting a fixed plains-city hour.",
        },
        {
          title: "Schools, colleges and mess kitchens",
          text: "The city has schools, colleges, a cantonment and hostels. Mess kitchens and hostels can ask about 45.4 kg cylinders or a cylinder bank, quoted after we know headcount and weekly changeovers.",
        },
        {
          title: "Gateway to the Galiyat",
          text: "Abbottabad is a stop toward Nathia Gali and the Galiyat. Hotels and restaurants see seasonal peaks; plan larger cylinders or a manifold setup before holiday weekends fill rooms.",
        },
        {
          title: "Named suppliers and Al Mansoor Town",
          text: "Named suppliers for Abbottabad appear in the directory on this page, with Al Mansoor Town among listed localities. We confirm your street on the call — partner lists are not a full coverage map.",
        },
        {
          title: "Corridor to Islamabad and Muzaffarabad",
          text: "Abbottabad sits on the route between Islamabad and Muzaffarabad. When the corridor is clear, stock moves more easily; when fog or landslides hit, last-mile timing stretches — tell us your exact colony.",
        },
      ]}
      seasonNote={{
        title: "Winter use",
        text: "If you run an LPG heater, keep the room ventilated and never leave it on while you sleep. Store a spare filled cylinder upright outdoors or in a ventilated place, not in a closed room.",
      }}
      sizeNotes={[
        "11.8 kg domestic cylinder for most homes",
        "15 kg cylinder for homes with a geyser or heater in winter",
        "45.4 kg commercial cylinder for hotels, hostels and restaurants",
      ]}
      extraFaqs={[
        {
          q: "Do hostels and colleges in Abbottabad use 45.4 kg cylinders?",
          a: "Many mess kitchens do. Send headcount and weekly changeovers; we confirm whether a local team can schedule empty-for-full exchange before you agree.",
        },
        {
          q: "Is delivery always about one hour in Abbottabad?",
          a: "No. Our target for covered areas is about 60–90 minutes when a local team is available. Fog, rain or steep streets can extend the window — we confirm honestly on the call.",
        },
      ]}
      nearby={[
        { slug: "islamabad", label: "LPG in Islamabad" },
        { slug: "murree", label: "LPG in Murree" },
        { slug: "muzaffarabad", label: "LPG in Muzaffarabad" },
        { slug: "peshawar", label: "LPG in Peshawar" },
      ]}
    />
  );
}

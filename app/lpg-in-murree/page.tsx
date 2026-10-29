import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { meta } from "@/lib/seo";

const path = "/lpg-in-murree/";
export const metadata = meta({ path, index: isCityIndexable("murree") });

export default function Page() {
  return (
    <CityHubStatic
      slug="murree"
      name="Murree"
      provinceSlug="punjab"
      summary="Murree is a hill town above the Islamabad–Rawalpindi twin cities where snow, steep roads and a busy tourist calendar shape when LPG can move."
      angles={[
        {
          title: "Snowfall and winter heating load",
          text: "Murree gets snow in winter. Homes, hotels and guesthouses burn more gas for heating, hot water and cooking once temperatures drop. Order before the cylinder is empty — waiting until a blizzard day makes delivery harder.",
        },
        {
          title: "Steep, narrow hill roads",
          text: "Ice, fog, landslide debris or weekend traffic on the Murree roads can delay or stop a delivery truck. We confirm a realistic window on the call and do not promise a fixed hour for hill localities.",
        },
        {
          title: "Tourist peaks on weekends and holidays",
          text: "Summer holidays, long weekends and first-snowfall days pack hotels and restaurants. Kitchens can plan with 45.4 kg cylinders or a cylinder bank, quoted after we know seats and changeover rate.",
        },
        {
          title: "Hill listings and twin-city backup",
          text: "A named research distributor appears for the Murree Hills belt, and supply can also be coordinated from the Islamabad–Rawalpindi side when needed. Every request is still checked against who can climb to your locality that day.",
        },
        {
          title: "Holiday homes and seasonal shutters",
          text: "Many houses are occupied only part of the year. Before the first cook of the season, shut the cylinder valve when leaving, and check hose and regulator for cracks after cold storage. See the safety guide.",
        },
        {
          title: "Heater safety in sealed rooms",
          text: "LPG room heaters need fresh air. Never sleep with an unvented gas heater on in a closed Murree room, and read the heaters and safety pages before first use in winter.",
        },
      ]}
      seasonNote={{
        title: "Snowfall days",
        text: "On heavy snowfall days delivery may be delayed or not possible. If you depend on LPG for heating, keep a filled spare cylinder stored upright in a ventilated place, never inside a closed room or near the heater.",
      }}
      sizeNotes={[
        "11.8 kg domestic cylinder for most homes and flats",
        "15 kg cylinder for homes that want fewer refills in winter",
        "45.4 kg commercial cylinder for hotels, guesthouses and restaurants",
      ]}
      extraFaqs={[
        {
          q: "Can hotels in Murree get 45.4 kg cylinders before a holiday weekend?",
          a: "When a team can reach your locality, yes. Plan ahead of peak weekends and first-snowfall days; send bed count or weekly changeovers and we confirm what is realistic for the hill roads that week.",
        },
        {
          q: "Do you promise one-hour delivery in Murree?",
          a: "No. Snow, ice and weekend traffic set the window. We confirm a realistic time on the call and do not promise a fixed plains-city hour on bad weather days.",
        },
      ]}
      nearby={[
        { slug: "islamabad", label: "LPG in Islamabad" },
        { slug: "rawalpindi", label: "LPG in Rawalpindi" },
        { slug: "abbottabad", label: "LPG in Abbottabad" },
      ]}
    />
  );
}

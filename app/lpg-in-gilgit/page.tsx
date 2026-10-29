import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { meta } from "@/lib/seo";

const path = "/lpg-in-gilgit/";
export const metadata = meta({ path, index: isCityIndexable("gilgit") });

export default function Page() {
  return (
    <CityHubStatic
      slug="gilgit"
      name="Gilgit"
      provinceSlug="gilgit-baltistan"
      summary="Gilgit is the main city of Gilgit-Baltistan, where cold winters and Karakoram Highway conditions shape how fast cylinders can move."
      angles={[
        {
          title: "Cold winters raise household demand",
          text: "Winters in Gilgit-Baltistan are cold, so households use more gas for heaters and hot water alongside cooking. Order before your cylinder is empty rather than on the coldest day when roads are busiest.",
        },
        {
          title: "Karakoram Highway and local road cuts",
          text: "Roads into and around Gilgit, including the Karakoram Highway, can be slowed or blocked by snow, landslides or washouts. We cannot promise a fixed hour, and we confirm what is realistic when you order.",
        },
        {
          title: "Remote valleys need exact pins",
          text: "Towns and villages outside the city sit farther from distributors. Send the exact location (and whether the jeepable road is open) and we tell you honestly whether we can reach it.",
        },
        {
          title: "Heaters need ventilation at altitude",
          text: "LPG room heaters use the oxygen in the room. In tightly sealed Gilgit rooms that is unsafe — see the LPG heaters page and the safety guide before using one overnight.",
        },
        {
          title: "Named suppliers and Jutial",
          text: "Named suppliers for Gilgit appear in the directory on this page, with Jutial among localities we check first. We still confirm your street on the call — listings are not a door-to-door map.",
        },
        {
          title: "Hotels through the short tourist window",
          text: "Tourist season brings extra kitchen and hot-water demand for guesthouses and hotels. Larger sites can ask about 45.4 kg cylinders or cylinder banks before peak weeks fill the calendar.",
        },
      ]}
      seasonNote={{
        title: "Winter and road closures",
        text: "In heavy snow or after a landslide, delivery in and around Gilgit can be delayed for days. If you rely on LPG for heating, keep a filled spare cylinder stored safely outdoors or in a ventilated place, never in a closed room.",
      }}
      sizeNotes={[
        "11.8 kg domestic cylinder for most homes",
        "15 kg cylinder for households that want fewer refills during winter",
        "45.4 kg commercial cylinder for hotels, guesthouses and restaurants",
      ]}
      extraFaqs={[
        {
          q: "What happens if the Karakoram Highway is closed?",
          a: "Snow, landslides or washouts can delay supply for days. We tell you what is realistic when you order. If you rely on LPG for heating, keep a filled spare stored safely before a forecast closure.",
        },
        {
          q: "Do you cover valleys outside Gilgit city?",
          a: "Sometimes, when a team can reach the road that week. Send the exact location and whether the jeepable road is open; we reply honestly if we cannot make the run.",
        },
      ]}
      nearby={[
        { slug: "skardu", label: "LPG in Skardu" },
        { slug: "islamabad", label: "LPG in Islamabad" },
        { slug: "muzaffarabad", label: "LPG in Muzaffarabad" },
      ]}
    />
  );
}

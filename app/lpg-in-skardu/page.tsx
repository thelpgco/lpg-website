import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { meta } from "@/lib/seo";

const path = "/lpg-in-skardu/";
export const metadata = meta({ path, index: isCityIndexable("skardu") });

export default function Page() {
  return (
    <CityHubStatic
      slug="skardu"
      name="Skardu"
      provinceSlug="gilgit-baltistan"
      summary="Skardu is a high-altitude Baltistan city with long winters, a short tourist season and mountain roads that can close for days."
      angles={[
        {
          title: "Long, cold winters at altitude",
          text: "Skardu winters are cold and snowy. Gas goes mainly to cooking, heaters and hot water, and use rises sharply once temperatures drop. Plan refills early — waiting until stock is gone is risky when roads are closed.",
        },
        {
          title: "Cold weather weakens cylinder pressure",
          text: "In very low temperatures, gas pressure in a cylinder falls and the flame can weaken, especially with high draw such as a geyser. Keep the cylinder upright, never warm it with a flame or hot water, and ask about larger cylinders or a manifold for heavy use.",
        },
        {
          title: "Road and flight dependence",
          text: "Supplies reach Skardu over mountain roads (and sometimes by air when roads fail). Snow, landslides or washouts can stop traffic for days. We cannot promise a fixed delivery hour here, and we say what is realistic on the call.",
        },
        {
          title: "Tourist-season kitchen peaks",
          text: "Hotels, guesthouses and trekking operators use more gas between spring and autumn. They can ask for 45.4 kg cylinders, cylinder banks or a quoted bulk setup once we know beds and kitchen hours.",
        },
        {
          title: "Named listing, mountain reach still limited",
          text: "A named research distributor is listed for Skardu. Every request is still checked against who can serve your street that week. If we cannot supply you, we say so quickly rather than leave you waiting.",
        },
        {
          title: "Valleys beyond the town centre",
          text: "Villages and side valleys around Skardu sit farther from any distributor run. Send the exact location, road status if you know it, and the cylinder size so we can say whether a delivery is possible.",
        },
      ]}
      seasonNote={{
        title: "Winter stock advice",
        text: "If you rely on LPG for heating and cooking, keep one filled spare cylinder stored upright outdoors or in a ventilated place, away from heaters and never in a closed living room. Do not buy a cylinder without a certification marking and an intact seal.",
      }}
      sizeNotes={[
        "11.8 kg domestic cylinder for most homes",
        "15 kg cylinder where fewer refills matter during winter",
        "45.4 kg commercial cylinder for hotels and restaurants",
      ]}
      extraFaqs={[
        {
          q: "Why can Skardu delivery take longer than plains cities?",
          a: "Mountain roads and weather set the window, and stock comes by road via Gilgit. We confirm a realistic time before you agree and do not promise a fixed plains-city hour.",
        },
        {
          q: "Should hotels stock up before tourist season?",
          a: "Yes. Plan 45.4 kg cylinders or a bank before peak weeks. Send bed count and kitchen hours; we say what we can supply that week.",
        },
      ]}
      nearby={[
        { slug: "gilgit", label: "LPG in Gilgit" },
        { slug: "islamabad", label: "LPG in Islamabad" },
      ]}
    />
  );
}

import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { meta } from "@/lib/seo";

const path = "/lpg-in-muzaffarabad/";
export const metadata = meta({ path, index: isCityIndexable("muzaffarabad") });

export default function Page() {
  return (
    <CityHubStatic
      slug="muzaffarabad"
      name="Muzaffarabad"
      provinceSlug="azad-kashmir"
      summary="Muzaffarabad is the capital of Azad Jammu and Kashmir, built on steep ground between the Jhelum and Neelum rivers where rain and road cuts shape supply."
      angles={[
        {
          title: "Hilly terrain and river-cut streets",
          text: "The city climbs steep slopes between rivers and ridges. Upper neighbourhoods can take longer to reach; give a clear landmark and say whether a truck can make your door or needs a lower drop point.",
        },
        {
          title: "Monsoon rain and landslide risk",
          text: "Monsoon rain and landslides can close roads in and around AJK with little notice. We confirm a realistic window on the call and do not promise a fixed hour when routes are unstable.",
        },
        {
          title: "Winter heating in higher wards",
          text: "Higher parts of Muzaffarabad and nearby hills get cold winters. Households use more gas for heaters and hot water; order before a cylinder is empty rather than on the coldest morning.",
        },
        {
          title: "Capital institutions and hospitality",
          text: "As the capital, the city has government offices, a hospital sector, hotels and restaurants. Larger sites can ask about 45.4 kg cylinders or a cylinder bank, quoted after we know kitchen load and access.",
        },
        {
          title: "Named dealers, street reach still confirmed",
          text: "Named network and research listings for Muzaffarabad appear in the directory on this page. Partner density is still thinner than plains hubs, so we confirm who can reach your ward before you agree.",
        },
        {
          title: "Corridor toward Islamabad and Abbottabad",
          text: "Road links toward Islamabad and Abbottabad help when passes are open, but fog, rain or rockfall on the AJK approaches still set the day. Send your exact locality so we can judge the run.",
        },
      ]}
      sizeNotes={[
        "11.8 kg domestic cylinder for most homes",
        "15 kg cylinder for households that want fewer refills in winter",
        "45.4 kg commercial cylinder for hotels, restaurants and institutions",
      ]}
      extraFaqs={[
        {
          q: "Can I get an auto LPG kit fitted in Muzaffarabad?",
          a: "Auto-LPG partners may appear alongside cylinder listings. Read the auto LPG page for what to check first, then send a request and we confirm what is available. Never fill a vehicle from a home cylinder.",
        },
        {
          q: "Do landslides stop delivery in Muzaffarabad?",
          a: "Monsoon rain and rockfall can close approaches with little notice. We confirm a realistic window on the call and do not promise a fixed plains-city hour when routes are unstable.",
        },
      ]}
      nearby={[
        { slug: "islamabad", label: "LPG in Islamabad" },
        { slug: "abbottabad", label: "LPG in Abbottabad" },
        { slug: "gilgit", label: "LPG in Gilgit" },
      ]}
    />
  );
}

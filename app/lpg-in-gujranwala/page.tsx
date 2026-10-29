import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { meta } from "@/lib/seo";

const path = "/lpg-in-gujranwala/";
export const metadata = meta({ path, index: isCityIndexable("gujranwala") });

export default function Page() {
  return (
    <CityHubStatic
      slug="gujranwala"
      name="Gujranwala"
      provinceSlug="punjab"
      summary="Gujranwala is a dense industrial and residential city on the Grand Trunk Road corridor, with strong domestic refill demand and busy commercial kitchen streets."
      angles={[
        {
          title: "Dense neighbourhoods, narrow access",
          text: "Gujranwala had about 2.5 million people in the 2023 census, with many compact residential colonies. Narrow streets can slow a delivery truck, so give a landmark and say whether a pickup can reach your door.",
        },
        {
          title: "Factories, metalware and workshops",
          text: "The city is known for small and medium manufacturing — metalware, ceramics, food units and workshops that cook, heat or fire on LPG. Sites that need banks or scheduled routes should tell us weekly changeover volume.",
        },
        {
          title: "Food streets and commercial kitchens",
          text: "Restaurants, tikka and sweet shops, and wedding halls lean on 45.4 kg cylinders. Busy food belts need reliable empty-for-full exchange; confirm whether the delivery point suits a truck or a pickup.",
        },
        {
          title: "Homes without a reliable piped line",
          text: "Households that depend on LPG for cooking and winter heating usually use the 11.8 kg domestic cylinder. Winter demand rises across northern Punjab, so order before the cylinder runs completely empty.",
        },
        {
          title: "Partner localities we check first",
          text: "Named suppliers for Gujranwala are listed on this page. Localities such as Gulshan Colony and Samnabad appear with partners, and some list 24-hour opening — hours are reconfirmed when you order. This is not a full coverage map.",
        },
        {
          title: "GT Road corridor timing",
          text: "Gujranwala sits between Lahore and Rawalpindi on the Grand Trunk Road. Corridor traffic helps stock movement, but peak hours on GT Road and ring roads still stretch the last mile — we confirm timing before you agree.",
        },
      ]}
      sizeNotes={[
        "11.8 kg domestic cylinder for most homes",
        "45.4 kg commercial cylinder for restaurants, sweet shops and workshops",
        "15 kg cylinder where a home or small shop wants fewer refills; confirm stock for your area",
      ]}
      extraFaqs={[
        {
          q: "Can workshops in Gujranwala get scheduled commercial cylinders?",
          a: "Yes, when a partner can reach your unit. Send weekly 45.4 kg changeover volume and whether a truck or pickup fits your lane; we confirm timing before you agree.",
        },
        {
          q: "Are any Gujranwala partners open 24 hours?",
          a: "Some listings show 24-hour opening. Hours are reconfirmed when you order because published hours can change.",
        },
      ]}
      nearby={[
        { slug: "lahore", label: "LPG in Lahore" },
        { slug: "rawalpindi", label: "LPG in Rawalpindi" },
        { slug: "islamabad", label: "LPG in Islamabad" },
        { slug: "multan", label: "LPG in Multan" },
      ]}
    />
  );
}

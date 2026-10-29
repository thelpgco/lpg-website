import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { meta } from "@/lib/seo";

const path = "/lpg-in-lahore/";
export const metadata = meta({ path, index: isCityIndexable("lahore") });

export default function Page() {
  return (
    <CityHubStatic
      slug="lahore"
      name="Lahore"
      provinceSlug="punjab"
      summary="Lahore is Punjab’s largest city hub for home cooking gas, restaurant kitchens and housing-society supply, served by multiple named distributors across the main residential belts."
      angles={[
        {
          title: "Model Town to DHA and Johar Town",
          text: "Partner localities we check often include Model Town, Muslim Town, Allama Iqbal Town and Ichhra-side belts, with DHA and Johar Town among the busiest housing schemes. Name your block or phase so the right team is matched.",
        },
        {
          title: "Food streets and wedding catering",
          text: "Lahore’s restaurant, bakery and wedding-hall load leans on 45.4 kg cylinders. Peak wedding months stack kitchen changeovers — tell us how many bottles you turn per week for a commercial quote.",
        },
        {
          title: "Winter fog and monsoon waterlogging",
          text: "Dense fog on winter mornings and monsoon waterlogging on ring roads both slow the last mile. We confirm timing on the call; about one hour is a target for covered areas with a local team free, not a guarantee for every street.",
        },
        {
          title: "Homes without a steady piped line",
          text: "Many flats and houses cook on 11.8 kg domestic cylinders year-round. Winter heaters and geysers raise use — order before the bottle is empty rather than on the coldest foggy morning.",
        },
        {
          title: "Named dealers in the directory",
          text: "Lahore has a wide set of named network dealers and research distributors listed on this page. We confirm who fulfils your order before you agree; the list is not a door-to-door coverage map.",
        },
        {
          title: "Canal and ring-road corridor timing",
          text: "Stock moves easily along the canal and ring-road corridors when traffic is light, but peak hours still stretch runs between distant colonies. Give a landmark and say whether a truck or pickup suits your lane.",
        },
      ]}
      sizeNotes={[
        "11.8 kg domestic cylinder for most homes",
        "15 kg for households that want fewer winter refills",
        "45.4 kg commercial cylinder for restaurants, bakeries and wedding catering",
      ]}
      extraFaqs={[
        {
          q: "Which Lahore areas do you check first?",
          a: "We commonly match orders against partners serving belts such as Model Town, Muslim Town, Allama Iqbal Town and Ichhra, plus major housing schemes. If your colony is not listed, send it anyway — we check reach and reply honestly.",
        },
        {
          q: "Can wedding halls get multiple 45.4 kg cylinders?",
          a: "Yes. Send the date, kitchen load and how many cylinders you change per event or per week. We confirm stock, deposit or exchange terms and delivery access before you agree.",
        },
      ]}
      nearby={[
        { slug: "gujranwala", label: "LPG in Gujranwala" },
        { slug: "faisalabad", label: "LPG in Faisalabad" },
        { slug: "rawalpindi", label: "LPG in Rawalpindi" },
        { slug: "multan", label: "LPG in Multan" },
      ]}
    />
  );
}

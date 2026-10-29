import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { meta } from "@/lib/seo";

const path = "/lpg-in-multan/";
export const metadata = meta({ path, index: isCityIndexable("multan") });

export default function Page() {
  return (
    <CityHubStatic
      slug="multan"
      name="Multan"
      provinceSlug="punjab"
      summary="Multan is a large southern Punjab city with heavy home cooking demand, sweet-shop and wedding catering loads, and farm and workshop use in the surrounding belt."
      angles={[
        {
          title: "Wide city, long runs between colonies",
          text: "Multan had about 2.2 million people in the 2023 census and spreads across the old city, the cantonment and newer housing schemes. Distance from your street to the nearest distributor is what changes delivery timing most — always give a clear area or landmark.",
        },
        {
          title: "Commercial kitchens and wedding season",
          text: "Restaurants, sweet and bakery shops, hotels and wedding halls use 45.4 kg cylinders in volume. Peak wedding months stack kitchen changeovers; tell us how many cylinders you change per week so we can match supply.",
        },
        {
          title: "Hot summers, shade and upright storage",
          text: "Summer temperatures in Multan are among the highest in Punjab. Keep cylinders upright in shade and a ventilated spot, away from direct sun and heat sources. Domestic use is mostly cooking and stays steady year-round.",
        },
        {
          title: "Industry, farms and the Multan belt",
          text: "The industrial estate and the farming and processing economy around Multan drive workshop and farm cylinder demand. Small food units and farms can ask about cylinder banks or bulk supply, quoted after we know the site.",
        },
        {
          title: "Listed coverage is growing",
          text: "We list named suppliers for Multan on this page (including Model Town among localities we check). Partner density is still thinner than Lahore or Karachi, so we confirm reach and timing on every call instead of promising a fixed hour for every street.",
        },
        {
          title: "Road links across southern Punjab",
          text: "Multan sits on the road and rail routes toward Lahore, Faisalabad and Bahawalpur. That corridor helps move stock, but monsoon rain and local traffic still affect the last mile — we confirm your street before dispatch.",
        },
      ]}
      sizeNotes={[
        "11.8 kg domestic cylinder for most homes",
        "45.4 kg commercial cylinder for restaurants, sweet shops and wedding catering",
        "15 kg and 5 kg cylinders for smaller households and shops; confirm stock for your area",
      ]}
      extraFaqs={[
        {
          q: "Do wedding halls in Multan get 45.4 kg banks?",
          a: "Yes, when a local team can reach the venue. Send the date, kitchen load and weekly or per-event cylinder count; we confirm stock, exchange terms and access before you agree.",
        },
        {
          q: "Does extreme heat change how I store a cylinder?",
          a: "Keep every cylinder upright in shade and a ventilated spot, never in direct Multan sun on a rooftop. Check the hose and regulator on delivery and see the safety guide.",
        },
      ]}
      nearby={[
        { slug: "lahore", label: "LPG in Lahore" },
        { slug: "faisalabad", label: "LPG in Faisalabad" },
        { slug: "burewala", label: "LPG in Burewala" },
        { slug: "gujranwala", label: "LPG in Gujranwala" },
      ]}
    />
  );
}

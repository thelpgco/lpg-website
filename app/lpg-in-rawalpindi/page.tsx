import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { meta } from "@/lib/seo";

const path = "/lpg-in-rawalpindi/";
export const metadata = meta({ path, index: isCityIndexable("rawalpindi") });

export default function Page() {
  return (
    <CityHubStatic
      slug="rawalpindi"
      name="Rawalpindi"
      provinceSlug="punjab"
      summary="THE LPG CO. delivers LPG cylinders in Rawalpindi through the same twin-city team that serves Islamabad, from Saddar and Satellite Town to Bahria Town and DHA. Orders are taken 24/7 by phone and WhatsApp."
      angles={[
        {
          title: "Twin-city fulfilment with Islamabad",
          text: "Orders are often matched to the same Islamabad–Rawalpindi network teams. Say whether you are on the Rawalpindi or ICT side of the edge so we route to the closer available distributor.",
        },
        {
          title: "Satellite Town, Bahria and Lalazar belts",
          text: "Partner localities we check include Satellite Town blocks, Lalazar, Nawaz Colony and Korang Town extension-style belts, with Bahria Town among the busiest society runs. Give phase or block when you order.",
        },
        {
          title: "Cantonment and old-city access",
          text: "Cantonment gates and narrow old-city lanes can block a large truck. Tell us whether a pickup can reach your door, and name a landmark near Saddar or your mohalla.",
        },
        {
          title: "Saddar kitchens and commercial streets",
          text: "Restaurants and sweet shops lean on 45.4 kg cylinders with frequent empty-for-full exchange. Commercial sites should state weekly changeover volume and unloading access.",
        },
        {
          title: "Winter demand across the twin cities",
          text: "Northern Punjab winters raise heater and geyser use on top of cooking. Order before the 11.8 kg cylinder runs empty, and store any spare upright in a ventilated place — never in a closed bedroom.",
        },
        {
          title: "Named dealers in the directory",
          text: "Named Rawalpindi suppliers appear below, including network and research listings. We confirm who delivers before you agree; listings are not a guarantee for every street on every day.",
        },
      ]}
      seasonNote={{
        title: "Cold mornings",
        text: "Fog and cold slow morning runs across the twin cities. If you rely on LPG for heating, keep a filled spare stored safely and order a day ahead when a cold wave is forecast.",
      }}
      sizeNotes={[
        "11.8 kg domestic cylinder for most homes",
        "15 kg for households that want fewer winter refills",
        "45.4 kg commercial cylinder for restaurants and busy kitchens",
      ]}
      extraFaqs={[
        {
          q: "Can the same team serve Rawalpindi and Islamabad?",
          a: "Often yes — twin-city distributors cover both sides. Send your exact area; we match the closer team and confirm timing before you agree.",
        },
        {
          q: "Do you deliver inside Bahria Town?",
          a: "When a local partner can reach your phase, yes. Send the phase, street and any gate rules for trucks so we can confirm access on the call.",
        },
      ]}
      nearby={[
        { slug: "islamabad", label: "LPG in Islamabad" },
        { slug: "murree", label: "LPG in Murree" },
        { slug: "lahore", label: "LPG in Lahore" },
        { slug: "gujranwala", label: "LPG in Gujranwala" },
      ]}
    />
  );
}

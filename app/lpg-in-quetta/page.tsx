import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { fitDescription, fitTitle, meta } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/lpg-in-quetta/";
export const metadata = meta({
  path,
  title: fitTitle([
    "LPG Gas in Quetta: Price, Delivery & Supply",
    "LPG Gas in Quetta: Winter Delivery & Supply",
  ]),
  description: fitDescription([
    `Order LPG gas in Quetta from ${site.shortName}, an OGRA-licensed marketer. Balochistan hub notes, winter demand and how to order by call or WhatsApp.`,
    `LPG in Quetta from ${site.shortName}: hill-weather delivery notes, named dealers and how to order by call, WhatsApp or form.`,
  ]),
  index: isCityIndexable("quetta"),
});

export default function Page() {
  return (
    <CityHubStatic
      slug="quetta"
      name="Quetta"
      provinceSlug="balochistan"
      summary="Quetta is our primary Balochistan hub for domestic cylinders, commercial kitchens and housing-society engineering, where winter cold and hill roads shape delivery windows."
      angles={[
        {
          title: "Cold winters, higher household use",
          text: "Quetta winters are cold. Cooking, heaters and geysers push domestic demand up — order before the cylinder is empty and keep a spare stored upright in a ventilated place, never in a sealed room.",
        },
        {
          title: "Hill weather and longer windows",
          text: "Snow, fog and steep approaches can stretch delivery beyond plains-city targets. We aim for about 60–90 minutes in covered areas when a local team is available, and we say so honestly when weather changes the plan.",
        },
        {
          title: "Satellite Town and Nawa Killi belts",
          text: "Partner localities we check include Satellite Town, Nawa Killi, Simongli and similar belts. Farther settlements need an exact pin and a note on whether the road is open for a truck or pickup.",
        },
        {
          title: "Housing societies and engineering",
          text: "Societies and larger sites can ask about cylinder banks or piped LPG engineering. Send plot access, estimated load and whether you need a reserve bank; we quote after we know the site.",
        },
        {
          title: "Named dealers in the directory",
          text: "Named Quetta network dealers and research distributors are listed on this page. We confirm who can reach your street before you agree — listings are a starting point, not a door-to-door map.",
        },
        {
          title: "Auto-LPG and commercial mix",
          text: "Some partners list auto-LPG work alongside cylinder supply. Vehicle conversion is separate from home delivery; never fill a vehicle from a domestic cylinder.",
        },
      ]}
      seasonNote={{
        title: "Winter in Quetta",
        text: "If you depend on LPG for heating, keep one filled spare cylinder outdoors or in a ventilated store, away from the heater. Do not warm a cold cylinder with flame or hot water.",
      }}
      sizeNotes={[
        "11.8 kg domestic cylinder for most homes",
        "15 kg for households that want fewer winter refills",
        "45.4 kg commercial cylinder for hotels, restaurants and societies",
      ]}
      extraFaqs={[
        {
          q: "Why is delivery sometimes longer than one hour in Quetta?",
          a: "Hill roads and winter weather can extend the window. Our target for covered Quetta areas is about 60–90 minutes when a local team is available; we confirm a realistic time on each order.",
        },
        {
          q: "Do you supply housing societies in Quetta?",
          a: "Yes, when a partner can reach the society. Send the society name, access rules and whether you need scheduled 45.4 kg changeovers or an engineering quote for a bank or piped setup.",
        },
      ]}
      nearby={[
        { slug: "karachi", label: "LPG in Karachi" },
        { slug: "lahore", label: "LPG in Lahore" },
        { slug: "hyderabad", label: "LPG in Hyderabad" },
        { slug: "islamabad", label: "LPG in Islamabad" },
      ]}
    />
  );
}

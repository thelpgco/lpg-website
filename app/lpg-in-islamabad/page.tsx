import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { meta } from "@/lib/seo";

const path = "/lpg-in-islamabad/";
export const metadata = meta({ path, index: isCityIndexable("islamabad") });

export default function Page() {
  return (
    <CityHubStatic
      slug="islamabad"
      name="Islamabad"
      provinceSlug="islamabad"
      summary="Islamabad and the ICT sectors are served through our twin-city distributor network, with the G-12 office catchment as a reference point for domestic and commercial orders."
      angles={[
        {
          title: "Sector layout and society gates",
          text: "Islamabad’s numbered sectors, diplomatic enclaves and gated societies need an exact sector, street and gate note. Security desks often limit truck hours — tell us access rules when you order.",
        },
        {
          title: "Twin-city network with Rawalpindi",
          text: "Many runs are fulfilled by the same Islamabad–Rawalpindi teams. If you live near the twin-city edge (I-series, G-series toward Rawalpindi), say so; we match the closer available distributor.",
        },
        {
          title: "Winter heaters and geysers",
          text: "ICT winters raise heater and geyser demand on top of cooking. Keep a spare exchange cylinder stored upright in a ventilated place, and never sleep with an unvented LPG heater on in a closed room.",
        },
        {
          title: "Blue Area and commercial kitchens",
          text: "Offices, hotels and restaurants around Blue Area and the main commercial belts commonly use 45.4 kg cylinders or banks. Scheduled changeovers work best when you send weekly volume up front.",
        },
        {
          title: "Named dealers and auto-LPG partners",
          text: "Named suppliers for Islamabad appear in the directory on this page, including network dealers and research listings. Auto-LPG fitting partners are listed separately from home cylinder delivery — never fill a vehicle from a domestic bottle.",
        },
        {
          title: "Murree road weekend traffic",
          text: "Weekend and holiday traffic toward Murree can slow northern exits. For hill-town orders see the Murree page; for ICT addresses we still confirm your street before dispatch.",
        },
      ]}
      seasonNote={{
        title: "Winter use in the ICT",
        text: "If you run an LPG heater, keep the room ventilated and never leave it on while you sleep. Order a refill before the cylinder is empty — foggy mornings are the worst time to discover you are out.",
      }}
      sizeNotes={[
        "11.8 kg domestic cylinder for most flats and houses",
        "15 kg for homes with a geyser or heater in winter",
        "45.4 kg commercial cylinder for hotels, offices and restaurants",
      ]}
      extraFaqs={[
        {
          q: "Do you deliver to gated Islamabad societies?",
          a: "Often yes, when a local team can reach your sector. Send the society name, sector and any truck or pickup restrictions at the gate so we can confirm access and timing before you agree.",
        },
        {
          q: "Is Islamabad pricing different from Rawalpindi?",
          a: "No. The gas rate follows the same OGRA per-kg notification nationwide. Delivery, deposit and exchange terms are confirmed for your order on either side of the twin cities.",
        },
      ]}
      nearby={[
        { slug: "rawalpindi", label: "LPG in Rawalpindi" },
        { slug: "murree", label: "LPG in Murree" },
        { slug: "lahore", label: "LPG in Lahore" },
        { slug: "abbottabad", label: "LPG in Abbottabad" },
      ]}
    />
  );
}

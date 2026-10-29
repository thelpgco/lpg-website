import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { meta } from "@/lib/seo";

const path = "/lpg-in-karachi/";
export const metadata = meta({ path, index: isCityIndexable("karachi") });

export default function Page() {
  return (
    <CityHubStatic
      slug="karachi"
      name="Karachi"
      provinceSlug="sindh"
      summary="Karachi is Pakistan’s largest coastal metropolis, with dense domestic refill demand, port and industrial loads, and one of the largest partner lists in our directory."
      angles={[
        {
          title: "Two sides of a sprawling city",
          text: "From Clifton and Defence to Gulshan, North Nazimabad, Malir and Korangi, distance and traffic corridors change timing more than the clock. Always give a clear area, society name or landmark when you order.",
        },
        {
          title: "Coastal humidity and cylinder checks",
          text: "Salt air and humidity accelerate rust on steel cylinders and fittings. On delivery, check the body, valve and hose; refuse damaged bottles and cracked regulators. Store upright in shade, never in a sealed cupboard.",
        },
        {
          title: "Port, factories and commercial kitchens",
          text: "Industrial estates, warehouses near the port and busy food streets lean on 45.4 kg cylinders or banks. Sites that need scheduled changeovers should send weekly volume and gate access so we can match the right team.",
        },
        {
          title: "Traffic on the main corridors",
          text: "Shahrah-e-Faisal, Lyari, Korangi and Super Highway peak hours stretch the last mile even when a local team is free. We confirm a realistic window before dispatch rather than promising a fixed minute for every street.",
        },
        {
          title: "Named dealers across the directory",
          text: "Karachi has the densest set of named network dealers and research distributors on this site. Listings below are starting points — we still confirm who can reach your street today before you agree.",
        },
        {
          title: "Monsoon waterlogging",
          text: "Heavy monsoon rain floods low-lying belts and slows trucks. If streets are under water, say so on the call; we reschedule rather than send a vehicle that cannot unload safely.",
        },
      ]}
      sizeNotes={[
        "11.8 kg domestic cylinder for most flats and houses",
        "15 kg where a household wants fewer refills",
        "45.4 kg commercial cylinder for restaurants, workshops and small factories",
      ]}
      extraFaqs={[
        {
          q: "Do you cover both Karachi and the industrial outskirts?",
          a: "We list partners across many Karachi localities. Port-side, Korangi and SITE-style industrial addresses need the exact plot or gate when you order so we can confirm truck access and timing.",
        },
        {
          q: "Is coastal rust a reason to reject a cylinder?",
          a: "Yes. Do not accept a cylinder with heavy rust at the base or valve, a damaged collar or a cracked hose. Ask for exchange and see the safety guide for what to check on every delivery.",
        },
      ]}
      nearby={[
        { slug: "hyderabad", label: "LPG in Hyderabad" },
        { slug: "lahore", label: "LPG in Lahore" },
        { slug: "islamabad", label: "LPG in Islamabad" },
        { slug: "quetta", label: "LPG in Quetta" },
      ]}
    />
  );
}

import CityHubStatic from "@/components/r4plus/CityHubStatic";
import { isCityIndexable } from "@/lib/network";
import { fitDescription, fitTitle, meta } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/lpg-in-peshawar/";
export const metadata = meta({
  path,
  title: fitTitle([
    "LPG Gas in Peshawar: Price, Delivery & Supply",
    "LPG Gas in Peshawar: Cylinder Delivery & Supply",
  ]),
  description: fitDescription([
    `Order LPG gas in Peshawar from ${site.shortName}, an OGRA-licensed marketer. KP hub supply notes, named dealers and how to order by call or WhatsApp.`,
    `LPG in Peshawar from ${site.shortName}: home and commercial delivery notes, listed partners and how to order by call, WhatsApp or form.`,
  ]),
  index: isCityIndexable("peshawar"),
});

export default function Page() {
  return (
    <CityHubStatic
      slug="peshawar"
      name="Peshawar"
      provinceSlug="khyber-pakhtunkhwa"
      summary="Peshawar is the main Khyber Pakhtunkhwa hub for domestic cylinder refill, hospitality kitchens and hospital catering supply through named local partners."
      angles={[
        {
          title: "Hayatabad, University Town and cantonment",
          text: "Residential and institutional belts such as Hayatabad, University Town and the cantonment are among localities we check first. Send your exact phase or street — the city stretches along several corridors.",
        },
        {
          title: "Hospitality and hospital catering",
          text: "Hotels, restaurants and hospital kitchens often need 45.4 kg banks with reliable empty-for-full changeover. Tell us weekly volume and whether night or early-morning delivery is allowed at the gate.",
        },
        {
          title: "Winter heating in the valley",
          text: "Peshawar winters are cooler than the southern plains. Heater and geyser use rises; order before the domestic cylinder is empty and keep rooms ventilated when using LPG heaters.",
        },
        {
          title: "Auto-LPG partners vs home cylinders",
          text: "The directory lists auto-LPG conversion partners as well as cylinder suppliers. Vehicle kits are a separate job from home delivery — never fill a car or rickshaw from a domestic bottle.",
        },
        {
          title: "Named dealers in the directory",
          text: "Named Peshawar network dealers and research distributors appear on this page. We confirm who can reach your mohalla before you agree; partner lists are not a full coverage map.",
        },
        {
          title: "GT Road and ring approaches",
          text: "Approaches along the Grand Trunk Road and ring routes help stock move in, but peak bazaar traffic still stretches the last mile. Give a landmark near Board, Khushal Town or your colony when you order.",
        },
      ]}
      seasonNote={{
        title: "Cooler months",
        text: "If you use an LPG room heater, keep a window or vent open and never sleep with the heater on in a sealed room. See the heaters and safety pages before first winter use.",
      }}
      sizeNotes={[
        "11.8 kg domestic cylinder for most homes",
        "15 kg for households that want fewer winter refills",
        "45.4 kg commercial cylinder for hotels, restaurants and hospital kitchens",
      ]}
      extraFaqs={[
        {
          q: "Do you cover Hayatabad and University Town?",
          a: "These are among the belts we check first against listed partners. Send your phase or street and cylinder size; we confirm reach and timing before you agree.",
        },
        {
          q: "Can hospitals get reserve cylinder banks?",
          a: "Larger kitchens can ask for 45.4 kg banks and a changeover plan. Send estimated weekly use and site access; we confirm what is available locally before any order is agreed.",
        },
      ]}
      nearby={[
        { slug: "islamabad", label: "LPG in Islamabad" },
        { slug: "abbottabad", label: "LPG in Abbottabad" },
        { slug: "rawalpindi", label: "LPG in Rawalpindi" },
        { slug: "muzaffarabad", label: "LPG in Muzaffarabad" },
      ]}
    />
  );
}

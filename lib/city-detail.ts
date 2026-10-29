// City-only depth for the 15 static /lpg-in-{city}/ pages: the local Sui gas situation, practical ordering tips and
// the sectors that use LPG most in the city. Kept separate from the per-page props so CityHubStatic can render it.

export type CityDetail = {
  /** One sentence used to open the page, before the shared licence line. */
  lead: string;
  /** How pipeline gas and LPG sit side by side in this city. */
  gas: string;
  /** Practical tips for getting a cylinder delivered here. */
  tips: string[];
  /** Industry pages that matter most in this city, with the local reason. */
  sectors: { slug: string; label: string; why: string }[];
};

export const cityDetail: Record<string, CityDetail> = {
  lahore: {
    lead: "Need a cylinder in Lahore today? Tell us your block or phase and we match you to the nearest of the dealers listed below.",
    gas: "Most of Lahore has Sui gas, but evening pressure in many neighbourhoods drops sharply from December to February, when heaters and geysers run at once. That is why Lahore homes keep an 11.8 kg cylinder as a backup and many restaurants run fully on LPG: the cylinder gives full pressure at the hours the pipeline is weakest.",
    tips: [
      "In DHA, Bahria and other gated schemes, tell us the gate or phase so the rider is cleared at the barrier.",
      "In the Walled City and older bazaars, lanes are too narrow for trucks; say so and we send a pickup or motorbike delivery.",
      "On foggy winter mornings, order the evening before if you can.",
    ],
    sectors: [
      { slug: "restaurants", label: "Restaurants", why: "food streets and tikka and karahi kitchens across the city" },
      { slug: "weddings-and-events", label: "Weddings and events", why: "marquees and halls along the main roads in the wedding season" },
      { slug: "food-processing", label: "Food processing", why: "bakeries and snack units around Sundar and Kot Lakhpat" },
    ],
  },
  karachi: {
    lead: "Ordering LPG in Karachi? Give us your area and nearest landmark, and we confirm which of the dealers listed below can reach your street.",
    gas: "Karachi is served by SSGC, and gas load-shedding and low pressure in winter push many homes to cylinders for cooking at least part of the day. Restaurants, bakeries and factories in SITE, Korangi and Landhi use LPG all year because a steady supply matters more to them than the unit rate.",
    tips: [
      "High-rise flats: tell us the floor and whether there is a lift, because a 45.4 kg cylinder needs two people on the stairs.",
      "In summer, keep cylinders in shade on the balcony, never in a closed kitchen cupboard.",
      "For industrial areas, give the plot number and gate, since many units share one entrance.",
    ],
    sectors: [
      { slug: "textile", label: "Textile", why: "processing units in SITE, Korangi and Landhi" },
      { slug: "restaurants", label: "Restaurants", why: "commercial kitchens running long hours all year" },
      { slug: "food-processing", label: "Food processing", why: "snack, spice and bakery plants across the industrial areas" },
    ],
  },
  islamabad: {
    lead: "Need LPG in Islamabad? Tell us your sector and street, and we confirm delivery from the G-12 office catchment or a dealer near you.",
    gas: "Older sectors of Islamabad have Sui gas, but many newer housing schemes along the expressway and in the zones beyond have no connection or are still waiting for one, so they cook on cylinders year-round. Winters are colder than in Lahore, which makes LPG geysers and heaters common even in homes with a pipeline connection.",
    tips: [
      "Give your sector and street number (for example G-11/2, Street 15), which is how riders find houses fastest.",
      "Societies with security gates: share the gate name and your contact so the rider is let in.",
      "Embassies and offices in the Diplomatic Enclave and Blue Area may need a security clearance time; tell us when you order.",
    ],
    sectors: [
      { slug: "hospitals", label: "Hospitals", why: "kitchens and hot water where supply cannot stop" },
      { slug: "hotels", label: "Hotels", why: "guesthouses and hotels with heavy winter hot-water use" },
      { slug: "housing-societies", label: "Housing societies", why: "new schemes without a Sui gas connection" },
    ],
  },
  rawalpindi: {
    lead: "Ordering an LPG cylinder in Rawalpindi? Name your mohalla or society and we match you to a dealer from the list below.",
    gas: "Rawalpindi shares Islamabad's network teams but not its layout: the old city around Raja Bazaar is dense, with narrow lanes and old gas lines where winter pressure is weak. Bahria Town, DHA and the newer schemes along the GT Road and Adiala Road rely heavily on cylinders where connections are not yet in place.",
    tips: [
      "Old-city lanes need a pickup or motorbike; tell us so we do not send a truck.",
      "Cantonment areas may have entry checks; share the gate you will use.",
      "Twin-city orders near the boundary can be served from either side, so give a landmark rather than only the city name.",
    ],
    sectors: [
      { slug: "poultry-farms", label: "Poultry farms", why: "brooding sheds on the Chakri, Adiala and GT Road belts" },
      { slug: "weddings-and-events", label: "Weddings and events", why: "marriage halls along Murree Road and the GT Road" },
      { slug: "restaurants", label: "Restaurants", why: "Saddar and Commercial Market kitchens" },
    ],
  },
  peshawar: {
    lead: "Need LPG in Peshawar? Tell us your area, from the old city to Hayatabad, and we confirm a dealer and delivery time.",
    gas: "Peshawar has Sui gas, but winter shortages are severe in many neighbourhoods, and cylinders fill the gap for cooking, geysers and heaters. Hayatabad's industrial estate and the city's tikka and kebab houses use LPG every day, which keeps Peshawar's dealer network busy and well stocked.",
    tips: [
      "In the old city around Qissa Khwani and Namak Mandi, lanes are narrow; ask for a pickup or hand-cart delivery.",
      "Hayatabad phases: give the phase, sector and street so the rider does not circle.",
      "In winter, order before the cylinder is empty; demand spikes on the coldest days.",
    ],
    sectors: [
      { slug: "restaurants", label: "Restaurants", why: "tikka, kebab and chapli kebab kitchens on high-output burners" },
      { slug: "hospitals", label: "Hospitals", why: "large teaching hospitals and private clinics that need continuity" },
      { slug: "manufacturing", label: "Manufacturing", why: "units in the Hayatabad industrial estate" },
    ],
  },
  multan: {
    lead: "Ordering LPG in Multan? Name your colony or chowk and we match you to a dealer from the list below.",
    gas: "Multan has Sui gas in most of the city, but its summers are among the hottest in Pakistan, with highs above 45 °C, and its winters bring fog and the same evening pressure drop as the rest of Punjab. Cylinders need shade in June and a reserve in January, and many restaurants and farms around the city run on LPG all year.",
    tips: [
      "In summer, never leave a cylinder in a parked car or on a sunny roof.",
      "Farms on the Bahawalpur, Vehari and Khanewal roads: send a location pin so the rider can find the gate.",
      "For wedding orders in the season, book cylinders a few days ahead.",
    ],
    sectors: [
      { slug: "poultry-farms", label: "Poultry farms", why: "the poultry belt around the city and along the main roads" },
      { slug: "textile", label: "Textile", why: "spinning and processing mills during gas curtailment" },
      { slug: "restaurants", label: "Restaurants", why: "city kitchens that run long hours" },
    ],
  },
  faisalabad: {
    lead: "Need LPG in Faisalabad? Tell us your town or industrial area and we confirm which listed dealer can deliver.",
    gas: "Faisalabad's textile mills and power looms depend on gas, and industrial supply is curtailed or priced higher during winter shortages, which is when mills turn to LPG and LPG-air. Homes see the same evening pressure drop as Lahore, so 11.8 kg cylinders are common as backup.",
    tips: [
      "Industrial units on Sargodha Road, Jhang Road and in the M-3 Industrial City: give the unit name and gate.",
      "Power-loom areas have narrow streets; ask for a pickup delivery.",
      "For mills, ask for a bulk or tanker quote rather than cylinders once use passes a few hundred kg a day.",
    ],
    sectors: [
      { slug: "textile", label: "Textile", why: "mills, processing units and power looms across the city" },
      { slug: "food-processing", label: "Food processing", why: "flour, sweets and bakery units" },
      { slug: "manufacturing", label: "Manufacturing", why: "engineering workshops and small furnaces" },
    ],
  },
  quetta: {
    lead: "Ordering LPG in Quetta? Give us your area and street, and we confirm a dealer and a realistic delivery time.",
    gas: "Quetta sits at about 1,680 m, and its winters fall well below freezing. Sui gas pressure collapses in many areas on the coldest nights, so LPG cylinders are a lifeline for heating and cooking. The cold also weakens butane-rich LPG, so heaters work best with sheltered cylinders or two cylinders together.",
    tips: [
      "In winter, order early in the day; evening demand is highest when it is coldest.",
      "Keep heater cylinders indoors only if the room is ventilated, and never warm a cylinder near the heater.",
      "Give a nearby landmark, as many streets lack clear numbering.",
    ],
    sectors: [
      { slug: "hotels", label: "Hotels", why: "heating and hot water through freezing winters" },
      { slug: "hospitals", label: "Hospitals", why: "kitchens and hot water that cannot stop when pipeline pressure falls" },
      { slug: "restaurants", label: "Restaurants", why: "kitchens that need full pressure at peak hours" },
    ],
  },
  gujranwala: {
    lead: "Need LPG in Gujranwala? Name your area or industrial zone and we match you to a dealer from the list below.",
    gas: "Gujranwala is one of Punjab's busiest industrial cities, with metal, sanitary-ware and engineering units that use gas for furnaces and kilns. When industrial gas is curtailed, LPG keeps those furnaces running. Homes share the Punjab pattern of weak evening pressure in winter.",
    tips: [
      "Industrial units along the GT Road: give the unit name and nearest chowk.",
      "For furnaces, ask for a manifold or bulk quote; single cylinders freeze and lose pressure at high draw.",
      "Wedding season is busy here too; book ahead for functions.",
    ],
    sectors: [
      { slug: "manufacturing", label: "Manufacturing", why: "metal, sanitary-ware and engineering furnaces" },
      { slug: "weddings-and-events", label: "Weddings and events", why: "large functions in the winter season" },
      { slug: "restaurants", label: "Restaurants", why: "busy city kitchens on high-output burners" },
    ],
  },
  hyderabad: {
    lead: "Ordering LPG in Hyderabad? Tell us your area, from Latifabad to Qasimabad, and we confirm a dealer and delivery time.",
    gas: "Hyderabad is supplied by SSGC and sits on the M-9 between Karachi and interior Sindh, so it gets stock quickly from Karachi plants. Summers are very hot, which makes shaded cylinder storage important. Glass bangle workshops, food units and the SITE industrial area use LPG for steady heat.",
    tips: [
      "In summer, keep cylinders in shade with air around them; never in a closed room.",
      "Latifabad and Qasimabad units: give the unit number and nearest landmark.",
      "For workshops with furnaces, ask for a manifold rather than one cylinder per furnace.",
    ],
    sectors: [
      { slug: "manufacturing", label: "Manufacturing", why: "bangle and glass workshops with small furnaces" },
      { slug: "food-processing", label: "Food processing", why: "sweets, bakery and snack units" },
      { slug: "restaurants", label: "Restaurants", why: "kitchens along the main roads and the bypass" },
    ],
  },
  gilgit: {
    lead: "Need LPG in Gilgit? Tell us your area and we confirm stock and a realistic delivery time, which depends on the Karakoram Highway.",
    gas: "Gilgit has no natural gas pipeline, so LPG is the main modern fuel for cooking and heating. Every cylinder comes up the Karakoram Highway, and landslides or snow can delay trucks, so local dealers stock up before winter. At about 1,500 m, winter nights are cold enough to weaken butane-rich LPG.",
    tips: [
      "Order your winter stock in October, before road closures.",
      "Hotels in Hunza and Nagar can be supplied from Gilgit; send the location early in tourist season.",
      "Keep cylinders sheltered from snow, but in a ventilated store, never a closed room.",
    ],
    sectors: [
      { slug: "hotels", label: "Hotels", why: "guesthouses and hotels in Gilgit, Hunza and Nagar" },
      { slug: "hospitals", label: "Hospitals", why: "heating and kitchens without pipeline gas" },
      { slug: "restaurants", label: "Restaurants", why: "tourist-season kitchens on the highway" },
    ],
  },
  murree: {
    lead: "Need LPG in Murree or the Galiyat? Tell us your hotel, house or road, and we confirm whether a delivery can reach you and when.",
    gas: "Murree sits at about 2,290 m. Where Sui gas reaches, winter pressure is often too low for heaters and geysers, and many hotels and homes rely on cylinders. Snow and tourist traffic on the Expressway and Mall Road can stop deliveries for hours, which is why stock planning matters more here than in the plains.",
    tips: [
      "Order before a snowfall is forecast; roads can close after heavy snow.",
      "On weekends and holidays, tourist traffic slows deliveries; order on a weekday if you can.",
      "Keep spare cylinders outdoors in a sheltered, ventilated spot, not in a guest room.",
    ],
    sectors: [
      { slug: "hotels", label: "Hotels", why: "hot water and heating for guests through the winter" },
      { slug: "restaurants", label: "Restaurants", why: "Mall Road and roadside kitchens in tourist season" },
      { slug: "weddings-and-events", label: "Weddings and events", why: "functions at hill resorts" },
    ],
  },
  skardu: {
    lead: "Need LPG in Skardu? Tell us your area and we confirm stock and a delivery window, which depends on the road from Gilgit.",
    gas: "Skardu sits at about 2,230 m with no pipeline gas, and deep-winter nights fall far below freezing. LPG is the main modern fuel for cooking and heating, and butane-rich gas struggles badly in that cold. Cylinders come by road via Gilgit, so a blocked road can delay supply for days.",
    tips: [
      "Buy winter stock early; do not wait for the first snow.",
      "For heaters, use two cylinders together or a sheltered store; never heat a cylinder.",
      "Hotels and camps: plan for the May–September tourist peak as well as winter.",
    ],
    sectors: [
      { slug: "hotels", label: "Hotels", why: "tourist hotels and camps from Shigar to Khaplu" },
      { slug: "hospitals", label: "Hospitals", why: "heating and kitchens through long winters" },
      { slug: "restaurants", label: "Restaurants", why: "kitchens that serve the summer tourist peak" },
    ],
  },
  muzaffarabad: {
    lead: "Need LPG in Muzaffarabad? Tell us your area and we confirm stock and a delivery window from the road links through Kohala.",
    gas: "Muzaffarabad sits where the Neelum and Jhelum rivers meet, with little pipeline gas, so cylinders carry most cooking and winter heating. Stock arrives by road from Punjab through Murree and Kohala, and landslides in the monsoon or snow in winter can slow trucks on those hill roads.",
    tips: [
      "Order ahead of monsoon storms and winter snow, when roads can close.",
      "Hillside homes: tell us how far the cylinder must be carried from the road.",
      "For Neelum valley hotels, plan stock before the tourist season and before winter.",
    ],
    sectors: [
      { slug: "hotels", label: "Hotels", why: "Neelum valley and city guesthouses" },
      { slug: "weddings-and-events", label: "Weddings and events", why: "winter functions in the city" },
      { slug: "restaurants", label: "Restaurants", why: "city kitchens without pipeline gas" },
    ],
  },
  abbottabad: {
    lead: "Need LPG in Abbottabad or the Galiyat? Tell us your area and we confirm a dealer and delivery time.",
    gas: "Abbottabad has Sui gas in much of the city, but winters are cold and evening pressure falls when every heater is on. Hotels in Nathia Gali and Thandiani, and poultry farms across Hazara, depend on cylinders through the winter.",
    tips: [
      "For Galiyat hotels, order before snowfall closes the upper roads.",
      "Farms along the Karakoram Highway towards Mansehra: send a location pin.",
      "Give a landmark such as a school or hospital, as many streets are unnamed.",
    ],
    sectors: [
      { slug: "hotels", label: "Hotels", why: "Galiyat and Thandiani hotels in winter and summer seasons" },
      { slug: "poultry-farms", label: "Poultry farms", why: "brooding sheds across Hazara" },
      { slug: "hospitals", label: "Hospitals", why: "teaching and private hospitals in the city" },
    ],
  },
};

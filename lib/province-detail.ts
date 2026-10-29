// Province-only copy for the /lpg-in-{province}/ hubs: how LPG reaches the province, its season and climate, where
// it is used most, and province FAQs. Counts, towns and marketer plants come from the directory at build time.

export type ProvinceDetail = {
  opener: string;
  route: string;
  peak: string;
  climate: string;
  supply: string[];
  season: string[];
  uses: { label: string; href: string; why: string }[];
  tip: string;
  /** Sub-regions: name, main towns, what to expect. */
  regions: [region: string, towns: string, note: string][];
  faqs: { q: string; a: string }[];
};

export const provinceDetail: Record<string, ProvinceDetail> = {
  punjab: {
    opener:
      "Punjab is home to more than half of Pakistan's people and most of its industry, so it also has the largest LPG market: city homes on cylinders, hotels and restaurants on 45.4 kg banks, and textile, food and steel units on bulk tanks.",
    route: "Plants inside Punjab, plus road deliveries from Karachi's import terminals",
    peak: "December to February, when Sui gas pressure drops and fog slows road transport",
    climate: "Hot summers; foggy, cold winters on the plains; snow in the Murree hills",
    supply: [
      "Gas reaches Punjab through the bottling plants of licensed marketers inside the province and by road tanker from the import terminals at Port Qasim and from refineries and gas fields. Dealers then move cylinders from those plants to towns and neighbourhoods, which is why the number of dealers in a town matters more for delivery speed than its distance from Lahore.",
      "Because so many plants sit along the GT Road and the motorways, central and northern Punjab is usually well stocked. South Punjab towns are further from most plants, so stock can tighten sooner when demand jumps.",
    ],
    season: [
      "Winter is the hard season. Domestic Sui gas pressure falls in the evenings, so more homes switch to cylinders for cooking and geysers at the same time. Dense fog from late November to January closes motorways for hours, which delays tankers and dealer trucks just when demand is highest.",
      "If you depend on LPG in winter, keep one full spare cylinder stored safely outdoors and order before you run low, not when the last cylinder empties.",
    ],
    uses: [
      { label: "Textile mills", href: "/industries/textile/", why: "Faisalabad, Lahore and Multan mills use LPG during gas curtailment" },
      { label: "Manufacturing", href: "/industries/manufacturing/", why: "Gujranwala, Sialkot and Gujrat furnaces, kilns and forging" },
      { label: "Poultry farms", href: "/industries/poultry-farms/", why: "Brooding sheds around Rawalpindi, Lahore and Sheikhupura" },
      { label: "Restaurants", href: "/industries/restaurants/", why: "Commercial kitchens in every large city" },
    ],
    tip: "In Punjab's foggy weeks, order a day earlier than usual and confirm your delivery window the evening before.",
    regions: [
      ["North (Potohar)", "Rawalpindi, Jhelum, Chakwal, Attock", "Close to several plants; Murree hills need winter stock planning"],
      ["Central", "Lahore, Gujranwala, Faisalabad, Sialkot, Sheikhupura", "The densest dealer network; heavy industrial demand"],
      ["West", "Sargodha, Mianwali, Bhakkar, Jhang", "Longer runs between towns; fewer dealers per town"],
      ["South", "Multan, Bahawalpur, Rahim Yar Khan, DG Khan", "Very hot summers; stock tightens first in winter shortages"],
    ],
    faqs: [
      { q: "Why does LPG get scarce in Punjab in winter?", a: "Sui gas pressure drops, so many homes switch to cylinders at once, and fog slows road transport from plants. Demand rises while deliveries slow." },
      { q: "Which Punjab cities have the most LPG dealers on this site?", a: "Lahore, Faisalabad, Multan, Gujranwala and Rawalpindi have the most listings. The towns table on this page shows the counts." },
    ],
  },

  sindh: {
    opener:
      "Sindh is where most of Pakistan's imported LPG arrives. The terminals at Port Qasim in Karachi receive ship cargoes, and gas fields in the province add local production, so Karachi is usually the first market to get stock and the last to run short.",
    route: "Import terminals at Port Qasim and local gas fields, then by road inland",
    peak: "Winter for homes; all year for Karachi's restaurants and industry",
    climate: "Very hot summers across the province; mild winters on the coast",
    supply: [
      "Cargoes landed in Karachi are stored at terminals and bottled at plants in and around the city, then trucked up the N-5 and the M-9 to Hyderabad, Sukkur, Larkana and beyond. That is why prices and stock in interior Sindh follow Karachi closely, with a delay for road transport.",
      "Karachi's own demand is huge and steady: restaurants, food factories and textile units use LPG all year, not only in winter. Interior towns depend more on fewer dealers, so it helps to know who serves your area before you need a refill.",
    ],
    season: [
      "Heat is the main seasonal risk in Sindh. Cylinder pressure rises in the sun, so cylinders should always stand upright in the shade, never in a closed room or a car boot. Summer power cuts also push some homes from electric to gas appliances.",
      "Winter demand rises less than in Punjab because winters are mild, but Sui gas pressure complaints in Karachi still move homes and kitchens to cylinders for parts of the season.",
    ],
    uses: [
      { label: "Restaurants", href: "/industries/restaurants/", why: "Karachi's commercial kitchens run on LPG all year" },
      { label: "Food processing", href: "/industries/food-processing/", why: "Snack, bakery and spice units in Karachi and Hyderabad" },
      { label: "Textile", href: "/industries/textile/", why: "Karachi and Hyderabad processing units" },
      { label: "Hotels", href: "/industries/hotels/", why: "Hot water and kitchens in Karachi's hotels" },
    ],
    tip: "In Sindh's heat, keep cylinders in shade with air around them, and never store a spare cylinder in a closed room.",
    regions: [
      ["Karachi", "All districts, Port Qasim, industrial areas", "Import terminals and plants; steady year-round demand"],
      ["Hyderabad and lower Sindh", "Hyderabad, Thatta, Badin", "Supplied from Karachi up the M-9 and N-5"],
      ["Central Sindh", "Nawabshah, Sanghar, Khairpur", "Fewer dealers; confirm stock before you travel"],
      ["Upper Sindh", "Sukkur, Larkana, Shikarpur, Jacobabad", "Long road runs; extreme summer heat for cylinder storage"],
    ],
    faqs: [
      { q: "Is LPG easier to get in Karachi than in interior Sindh?", a: "Usually, because import terminals and plants are in Karachi. Interior towns get stock by road, and fewer dealers serve each town." },
      { q: "Is it safe to keep a cylinder in the sun in summer?", a: "No. Heat raises the pressure inside. Keep cylinders upright, in shade and in a ventilated place." },
    ],
  },

  "khyber-pakhtunkhwa": {
    opener:
      "Khyber Pakhtunkhwa runs from the hot Peshawar valley to snowbound valleys in Swat, Dir and Chitral, so LPG needs change sharply across the province: cooking gas in the cities, and heating gas that has to work in sub-zero mornings in the north.",
    route: "Plants in the province and Punjab, LPG from gas fields in the Kohat–Karak area, and road imports",
    peak: "November to February, especially in Swat, Dir, Mansehra and Abbottabad",
    climate: "Hot summers in Peshawar; heavy winter snow in the northern valleys",
    supply: [
      "Gas fields in the Kohat–Karak area produce LPG inside the province, and more arrives by road from Punjab plants and from imports. Peshawar is the main distribution point, with dealers spreading out along the N-5 and the Swat and Hazara roads.",
      "Northern valleys are reached by long hill roads that can close after heavy snow or landslides. Dealers there stock up before winter, and customers who do the same avoid the weeks when trucks cannot get through.",
    ],
    season: [
      "Cold is the main problem in the north. Butane-rich LPG vaporises poorly near 0 °C, so a cylinder that works well in Peshawar can give a weak flame on a frosty morning in Mingora or Mansehra. Keeping the cylinder in a sheltered spot, or using two cylinders on a manifold for heaters, keeps the flame steady.",
      "Never warm a cylinder with a flame or a heater. If the flame is weak in the cold, add capacity instead.",
    ],
    uses: [
      { label: "Hotels", href: "/industries/hotels/", why: "Swat, Naran and Galiyat hotels for hot water and heating" },
      { label: "Poultry farms", href: "/industries/poultry-farms/", why: "Brooding sheds in the Hazara and Mardan areas" },
      { label: "Restaurants", href: "/industries/restaurants/", why: "Peshawar's kitchens and road-side hotels" },
      { label: "Hospitals", href: "/industries/hospitals/", why: "Continuity of supply in Peshawar's hospitals" },
    ],
    tip: "In the northern valleys, buy your winter stock before the first heavy snow closes the roads.",
    regions: [
      ["Peshawar valley", "Peshawar, Nowshera, Charsadda, Mardan", "Main distribution point with the most dealers"],
      ["Southern districts", "Kohat, Karak, Bannu, DI Khan", "Near the LPG-producing gas fields; long distances between towns"],
      ["Malakand", "Swat, Mingora, Dir, Batkhela, Chitral", "Snow and hill roads; stock up before winter"],
      ["Hazara", "Abbottabad, Mansehra, Haripur, Galiyat", "Cold winters and tourist hotels; brooding farms"],
    ],
    faqs: [
      { q: "Why is my LPG flame weak in winter in Swat or Mansehra?", a: "Cold cylinders vaporise less gas, especially butane-rich blends. Shelter the cylinder and use two in parallel for heaters. Never heat the cylinder." },
      { q: "Where are most LPG dealers in KP listed?", a: "Peshawar has the most listings, followed by towns such as Mardan, Kohat, Swabi, Mingora and Mansehra. See the towns table on this page." },
    ],
  },

  balochistan: {
    opener:
      "Balochistan is Pakistan's largest province by area, and its towns are far apart. Much of it has no pipeline gas, so LPG cylinders are the everyday cooking and heating fuel, and in Quetta winters LPG has to work in temperatures well below freezing.",
    route: "Road deliveries from Karachi and Punjab plants, and land imports across the western border",
    peak: "November to February in Quetta, Ziarat and the northern districts",
    climate: "Very cold winters in Quetta and the north; very hot summers on the coast and plains",
    supply: [
      "Most gas reaches Balochistan by road: from Karachi up the coastal and N-25 routes, from Punjab plants, and as land imports across the western border at crossings such as Taftan. Because distances are long, the number of local dealers in a town decides how quickly a cylinder can reach you.",
      "Quetta is the main distribution point for the north, while Hub and Gwadar on the coast draw on Karachi. Smaller towns may be served by one or two dealers, so a call to confirm stock before you travel to collect is worth it.",
    ],
    season: [
      "Quetta winters regularly fall below freezing, and butane-rich LPG barely vaporises at those temperatures. Homes and hotels that rely on gas heaters keep cylinders sheltered, use more than one cylinder for heaters, or ask for a propane-rich blend where a supplier can provide one.",
      "Ventilation matters more than ever in winter, because rooms are sealed against the cold. Gas heaters need fresh air to burn safely.",
    ],
    uses: [
      { label: "Hotels", href: "/industries/hotels/", why: "Quetta and Ziarat hotels for heating and hot water" },
      { label: "Restaurants", href: "/industries/restaurants/", why: "Road-side and city kitchens without pipeline gas" },
      { label: "Hospitals", href: "/industries/hospitals/", why: "Kitchen and hot-water continuity in Quetta" },
      { label: "Housing societies", href: "/industries/housing-societies/", why: "Central tanks where no pipeline gas reaches" },
    ],
    tip: "In Quetta's cold, keep heater cylinders sheltered and always leave a window or vent open when a gas heater is on.",
    regions: [
      ["Quetta and the north", "Quetta, Pishin, Ziarat, Loralai, Zhob", "Freezing winters; heater demand drives the peak"],
      ["Coast", "Gwadar, Ormara, Pasni", "Supplied mainly from Karachi along the coastal highway"],
      ["Lasbela", "Hub, Uthal", "Next to Karachi; industrial demand around Hub"],
      ["West and the border", "Nushki, Chagai, Turbat", "Very long runs; land imports at western crossings"],
    ],
    faqs: [
      { q: "Why does my gas heater burn weakly in Quetta winters?", a: "Butane-rich LPG vaporises poorly below freezing. Shelter the cylinder, use two cylinders on a manifold, or ask for a propane-rich blend. Never heat the cylinder." },
      { q: "Can you deliver to towns far from Quetta?", a: "Where a dealer or our network can reach you. Send your town and we tell you honestly whether and when we can supply." },
    ],
  },

  "gilgit-baltistan": {
    opener:
      "Gilgit-Baltistan has no natural gas pipeline network, so LPG and wood are the main fuels for cooking and heating. Every cylinder travels hundreds of kilometres up the Karakoram Highway, which makes stock planning more important here than anywhere else in Pakistan.",
    route: "Road deliveries up the Karakoram Highway from plants in Punjab and KP",
    peak: "October to March; demand peaks with heating in the coldest months",
    climate: "Long, cold winters; Gilgit at about 1,500 m and Skardu at about 2,200 m",
    supply: [
      "Gas reaches Gilgit-Baltistan by road over the Karakoram Highway, with Gilgit as the main distribution point and Skardu supplied onwards. Landslides can block the highway, and the Babusar route closes in winter, so delivery times can stretch from days to longer when roads close.",
      "Dealers stock up before winter for that reason. Hotels, guesthouses and homes that order their winter supply early are far less likely to be caught short when the road is blocked.",
      "Because each delivery is a long road trip, ordering several cylinders at once usually costs less per cylinder than single refills, and it leaves you a reserve if the highway closes for a few days.",
    ],
    season: [
      "At Gilgit's and Skardu's altitudes, winter nights fall well below freezing. Butane-rich LPG struggles to vaporise in that cold, so heaters lose power on the coldest nights. Sheltered storage, two cylinders in parallel, or a vaporizer for larger sites keep gas flowing.",
      "Tourist season brings the opposite problem: hotels fill from May to September and use more gas for kitchens and hot water, at the same time as roads are busy with visitors.",
      "Keep stored cylinders off snow and ice, and clear snow from the store so the valve and regulator stay dry and can be closed quickly.",
    ],
    uses: [
      { label: "Hotels", href: "/industries/hotels/", why: "Guesthouses and hotels in Gilgit, Hunza and Skardu" },
      { label: "Restaurants", href: "/industries/restaurants/", why: "Tourist-season kitchens" },
      { label: "Hospitals", href: "/industries/hospitals/", why: "Heating and kitchens where supply cannot stop" },
      { label: "Housing societies", href: "/industries/housing-societies/", why: "Central LPG where no pipeline gas exists" },
    ],
    tip: "Order winter stock in October, before the first road closures, and keep it stored safely outdoors.",
    regions: [
      ["Gilgit", "Gilgit city, Danyore, Jutial", "Main distribution point on the Karakoram Highway"],
      ["Hunza and Nagar", "Aliabad, Karimabad, Nagar", "Tourist hotels; landslides can cut the highway"],
      ["Skardu", "Skardu, Shigar, Khaplu", "Highest and coldest; supplied onwards from Gilgit"],
      ["Diamer and Astore", "Chilas, Astore", "Road links that can close in winter"],
    ],
    faqs: [
      { q: "Is there Sui gas in Gilgit-Baltistan?", a: "No pipeline network serves the region, which is why LPG is a main cooking and heating fuel there." },
      { q: "How long does LPG delivery take in Gilgit or Skardu?", a: "It depends on road conditions on the Karakoram Highway. We confirm a realistic window on each order and say so when roads are closed." },
    ],
  },

  "azad-kashmir": {
    opener:
      "Azad Jammu and Kashmir stretches from the plains around Mirpur and Bhimber to the snowy Neelum and Leepa valleys. Much of the region has little or no pipeline gas, so LPG cylinders carry most cooking and a large share of winter heating.",
    route: "Road deliveries from plants in Punjab via Rawalpindi, Murree and Jhelum",
    peak: "November to February, especially in Muzaffarabad and the upper valleys",
    climate: "Hot summers in Mirpur; heavy snow in Neelum, Leepa and Bagh",
    supply: [
      "Gas reaches AJK by road from Punjab plants: north through Murree and Kohala to Muzaffarabad and the valleys, and through Jhelum and Dina to Mirpur, Kotli and Bhimber. Each town is served by a small number of dealers, so knowing who supplies your area saves time in winter.",
      "Mirpur and Kotli are close to Punjab's supply routes and are usually easier to stock. Upper valleys depend on hill roads that snow and landslides can close.",
      "The per-kg gas rate in AJK is the same OGRA-notified price as in Punjab. What costs more in the upper valleys is the delivery, because each trip climbs hill roads with a small load, so ordering two or more cylinders together usually works out cheaper.",
    ],
    season: [
      "Winter in the upper valleys is cold enough to weaken butane-rich LPG, so heaters lose power on frosty mornings. Sheltered cylinders and two-cylinder setups for heaters help.",
      "Winter weddings and Eid gatherings raise gas use exactly when deliveries are slowest. Plan stock for those weeks.",
      "Monsoon rains from July to September bring landslides on the Muzaffarabad and Neelum roads too, so the valleys can face delivery delays in summer as well as winter.",
    ],
    uses: [
      { label: "Hotels", href: "/industries/hotels/", why: "Neelum and Banjosa guesthouses in tourist season" },
      { label: "Weddings and events", href: "/industries/weddings-and-events/", why: "Large winter functions in Mirpur and Kotli" },
      { label: "Restaurants", href: "/industries/restaurants/", why: "Kitchens in Muzaffarabad and Mirpur" },
      { label: "Poultry farms", href: "/industries/poultry-farms/", why: "Brooding sheds near the Punjab border" },
    ],
    tip: "In the upper valleys, stock up before snow closes the roads, and never take a gas heater into a closed bedroom overnight.",
    regions: [
      ["Muzaffarabad", "Muzaffarabad, Kohala approach", "Reached from Murree and Kohala; hill roads"],
      ["Mirpur", "Mirpur, Dina approach, Mangla area", "Close to Punjab routes; easier to stock"],
      ["Kotli and Bhimber", "Kotli, Bhimber, Samahni", "Supplied through Jhelum and Mirpur"],
      ["Upper valleys", "Neelum, Leepa, Bagh, Rawalakot", "Heavy snow; stock up before winter"],
    ],
    faqs: [
      { q: "Where do LPG cylinders in AJK come from?", a: "Mostly from plants in Punjab, by road through Murree and Kohala or through Jhelum and Dina." },
      { q: "Which AJK towns have LPG dealers on this site?", a: "Listings include Muzaffarabad, Mirpur, Kotli and Bhimber. The towns table on this page shows the counts." },
    ],
  },
};

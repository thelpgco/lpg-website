// Sector-only depth for /industries/*: load tables, a worked consumption example, sector problems, cost drivers and
// the cities whose dealer data is shown. Energy figures are typical rated inputs (check the appliance plate); gas
// use is derived in IndustryPage from kW at 12.8 kWh per kg of LPG. No customer names or invented case studies.

export type LoadRow = [appliance: string, kwMin: number, kwMax: number, note: string];

export type SectorDetail = {
  context: string[];
  loads: LoadRow[];
  example: { title: string; items: { label: string; basis: string; kwh: number }[]; note: string };
  problems: [problem: string, causeAndFix: string][];
  costDrivers: string[];
  capabilities: string[];
  cities: string[];
  networkNote: string;
  ctas: { mid: string; end: string };
  faqs: { q: string; a: string }[];
};

export const sectorDetail: Record<string, SectorDetail> = {
  restaurants: {
    context: [
      "A busy desi kitchen burns gas in bursts: karahi and wok burners run flat out at lunch and dinner, the tandoor stays hot for hours, and the fryer recovers between batches. That pattern matters because a single 45.4 kg cylinder cannot release gas fast enough for several high-pressure burners at once, which is why flames weaken at rush hour even when the cylinder still has gas in it.",
      "Many restaurants in Pakistan moved to LPG because Sui gas pressure drops in winter evenings, exactly when kitchens are busiest. If your area has low-pressure complaints from December to February, a cylinder bank on a manifold gives you a steady supply that does not depend on the local gas line.",
    ],
    loads: [
      ["Karahi / wok high-pressure burner", 10, 25, "The biggest single load in most desi kitchens"],
      ["Gas tandoor", 15, 30, "Runs for long hours, often from opening to close"],
      ["Commercial range burner (open top)", 5, 8, "Per burner; a six-burner range is 30–48 kW"],
      ["Deep fryer, twin basket", 12, 20, "Draws hardest when it recovers oil temperature"],
      ["Griddle or hot plate, 600 mm", 6, 10, "Paratha, tawa and breakfast lines"],
    ],
    example: {
      title: "A mid-size restaurant: three karahi burners, one tandoor and two range burners",
      items: [
        { label: "3 karahi burners", basis: "15 kW each, about 4 hours of full flame a day", kwh: 180 },
        { label: "1 tandoor", basis: "20 kW, about 5 hours a day", kwh: 100 },
        { label: "2 range burners", basis: "6 kW each, about 3 hours a day", kwh: 36 },
      ],
      note: "Full-flame hours are lower than opening hours because burners idle between orders. Your own cylinder changes per week are the best check on this estimate.",
    },
    problems: [
      ["Flames drop at rush hour", "Too many burners on too few cylinders: each cylinder can only vaporise gas at a limited rate, and the rate falls as it cools. A manifold that draws from two to four cylinders at once fixes this."],
      ["Frosting on the cylinder", "A sign the cylinder is being pushed beyond its vaporisation rate. Add cylinders in parallel rather than heating the cylinder, which is dangerous."],
      ["Running out mid-service", "Single-cylinder kitchens have no reserve. An automatic changeover regulator switches to the standby bank when the duty bank empties."],
      ["Hose damage near the tandoor", "Heat and oil harden rubber hoses quickly. Route hoses away from hot surfaces and replace them at the first crack."],
    ],
    costDrivers: [
      "Gas is charged at the OGRA-notified rate per kg, so your bill rises and falls with kilograms used and with the monthly notification.",
      "Burner efficiency: an old open burner can waste a large share of its heat compared with a modern high-efficiency burner, which is why a burner change can lower the bill more than any discount.",
      "Delivery frequency: two drops a week cost the distributor more than one larger drop, which affects the delivered total.",
      "Cylinder custody: deposits apply when cylinders stay at your site; an exchange arrangement avoids paying for extra empties.",
    ],
    capabilities: [
      "45.4 kg cylinder supply and exchange for single kitchens",
      "Two-bank manifolds with automatic changeover, sized from your burner list",
      "Piping from an outdoor cylinder store to the kitchen line",
      "Leak checks and hose and regulator replacement under a maintenance contract",
    ],
    cities: ["lahore", "karachi", "islamabad", "rawalpindi", "peshawar", "multan"],
    networkNote: "Restaurant supply runs on short, frequent drops, so a dealer close to your kitchen matters more than a large plant. These are the listings we hold in the cities with the most restaurant enquiries.",
    ctas: {
      mid: "Send your burner list and we size the cylinder bank for you",
      end: "Get your kitchen's weekly cylinder plan on WhatsApp",
    },
    faqs: [
      { q: "How many 45.4 kg cylinders does a restaurant use in a week?", a: "Small takeaways may use one or two; a busy restaurant with a tandoor and several karahi burners can use four or more. Count your cylinder changes for two weeks, or use the worked example on this page with your own burner ratings." },
      { q: "Is LPG cheaper than Sui gas for a restaurant?", a: "Per unit of heat, commercial Sui gas is usually cheaper where it has full pressure. Restaurants choose LPG because the supply is steady at peak hours and in winter. Compare your real monthly cost, not just the unit rate." },
    ],
  },

  hotels: {
    context: [
      "In a hotel the kitchen is rarely the largest gas load: hot water is. Every guest shower draws heated water, and heating 100 litres of water from 15 °C to 55 °C takes roughly 0.5 kg of LPG in a typical gas water heater. That is why a 40-room hotel can burn more gas in its geysers than in its kitchen, especially in winter.",
      "Hill-station hotels in Murree, Nathia Gali, Gilgit and Skardu face a second problem. Butane-rich LPG stops vaporising well near 0 °C, so cylinders kept outdoors in winter deliver weak pressure on the coldest mornings. Larger hotels there use a vaporizer or a bulk tank, which keeps gas flowing whatever the temperature.",
    ],
    loads: [
      ["Storage gas geyser, 35–55 gallon", 8, 15, "Per unit; the biggest load in most hotels"],
      ["Commercial kitchen range", 30, 50, "Six burners plus oven"],
      ["Tumble dryer (laundry)", 15, 30, "Hotels with in-house laundry"],
      ["Space heater (room or lobby)", 3, 7, "Winter use in cold regions"],
      ["Hot-water boiler", 60, 300, "Central systems in larger hotels"],
    ],
    example: {
      title: "A 40-room hotel with a restaurant",
      items: [
        { label: "Guest hot water", basis: "40 rooms × 80 litres a day, heated by 40 °C", kwh: 198 },
        { label: "Kitchen", basis: "Range at about 35 kW for 5 hours of full use", kwh: 175 },
        { label: "Laundry dryer", basis: "20 kW for 3 hours", kwh: 60 },
      ],
      note: "Hot water is estimated at 4.65 kWh of heat per 100 litres raised by 40 °C, divided by 75% heater efficiency. Occupancy changes everything, so plan for your peak weeks.",
    },
    problems: [
      ["Lukewarm showers on winter mornings", "Every guest showers at the same time, and outdoor cylinders lose pressure in the cold. A manifold with more cylinders, or a vaporizer on a bulk tank, holds pressure through the peak."],
      ["Running out in tourist season", "Occupancy doubles on long weekends and Eid holidays, but deliveries in hill areas slow down at the same time. Stock for peak occupancy, not average."],
      ["Gas smell in guest corridors", "Usually a leaking joint on a geyser connection inside the building. Gas lines should be tested on a schedule and geysers kept in ventilated spaces."],
      ["Geyser pilot keeps going out", "Often low supply pressure or a dirty thermocouple. Check the regulator setting before blaming the geyser."],
    ],
    costDrivers: [
      "Water heating is where savings are, because it is the largest load: insulated tanks and lower set temperatures cut kilograms directly.",
      "A bulk tank can lower the delivered cost per kg compared with many cylinders, because one tanker drop replaces dozens of cylinder handlings.",
      "Hill-area delivery costs more than city delivery because of distance, road conditions and winter closures.",
      "Occupancy swings change monthly use, so a fixed monthly volume is rarely right for a seasonal hotel.",
    ],
    capabilities: [
      "Cylinder banks for guesthouses and small hotels, with changeover",
      "Bulk tank siting, installation and refilling for larger hotels",
      "Vaporizers for hill-area sites where cylinders lose pressure in the cold",
      "Pipeline to kitchens, laundries and geyser rooms, with pressure testing",
    ],
    cities: ["islamabad", "murree", "lahore", "karachi", "gilgit", "abbottabad"],
    networkNote: "Hotel demand is split between the big cities and the hill stations, where fewer dealers are listed and stock should be planned ahead.",
    ctas: {
      mid: "Send your room count and geyser list for a hotel gas plan",
      end: "Plan your peak-season gas stock with us on WhatsApp",
    },
    faqs: [
      { q: "Do hotels in Murree or Gilgit need a vaporizer?", a: "Not always, but if cylinders stand outdoors and your winter mornings fall near or below 0 °C, a vaporizer or a larger cylinder bank keeps pressure steady. We look at your load and site before recommending one." },
      { q: "How much LPG does hotel hot water use?", a: "Roughly 0.5 kg of LPG for every 100 litres heated by 40 °C in a typical gas heater. Multiply by your rooms and litres per guest to estimate it." },
    ],
  },

  textile: {
    context: [
      "Textile mills use gas for heat, not cooking: singeing burners, direct-fired stenters, thermal-oil heaters and steam boilers. These run at hundreds of kilowatts for most of the day, so a mill's gas use is counted in tonnes a week. At that scale, a bulk tank or an LPG-air system is the practical choice, not cylinders.",
      "Mills in Faisalabad, Karachi, Lahore and Multan turn to LPG mainly because the gas supply to industry is curtailed or priced higher during winter shortages. LPG-air (synthetic natural gas) lets burners designed for natural gas run on LPG with limited changes, which is why it is often the first option a mill studies.",
    ],
    loads: [
      ["Steam boiler", 750, 800, "Per tonne of steam per hour"],
      ["Thermal-oil heater", 500, 2500, "Feeds stenters, dryers and calenders"],
      ["Direct-fired stenter", 400, 1200, "Depends on the number of chambers"],
      ["Singeing machine", 150, 400, "Gas burners across the fabric width"],
      ["Hot-air dryer / curing oven", 100, 400, "Per unit"],
    ],
    example: {
      title: "A processing unit: a 2 t/h boiler and one stenter",
      items: [
        { label: "Steam boiler", basis: "2 t/h at about 60% average load for 16 hours (≈ 780 kW per t/h)", kwh: 14976 },
        { label: "Stenter", basis: "Average 500 kW for 14 hours", kwh: 7000 },
      ],
      note: "At this scale even small efficiency changes matter. Use your boiler's steam log and the stenter's burner rating for a real figure.",
    },
    problems: [
      ["Burners built for natural gas", "LPG has a much higher heating value per cubic metre than natural gas, so burners need new orifices or an LPG-air mix. Running pure LPG through a natural-gas burner without changes is unsafe."],
      ["Vaporisation at high flow", "At tonnes a day, liquid LPG must be vaporised by a vaporizer; drawing vapour from the tank alone cannot keep up, especially in winter."],
      ["Switching back and forth with pipeline gas", "Mills that use LPG only as backup need a clean changeover so both fuels never mix at the burners. This is part of the system design."],
      ["Storage approvals", "Bulk storage near buildings needs proper siting and the relevant approvals. Plan these before ordering a tank."],
    ],
    costDrivers: [
      "At tonnes a week, the per-kg rate and the delivery terms decide the bill; ask for a written price basis linked to the OGRA notification.",
      "Boiler and burner efficiency matter more than anything else, because a few percent saved is many kilograms.",
      "An LPG-air plant costs more to build than direct LPG, but it saves burner conversion costs and keeps a natural-gas fallback.",
      "Tank size sets how often a tanker must come, and fewer drops usually means a lower delivered cost per kg.",
    ],
    capabilities: [
      "Bulk tank and vaporizer systems sized from your steam and heat loads",
      "LPG-air (SNG) systems for burners built for natural gas",
      "Boiler and furnace conversion to LPG with burner changes",
      "Changeover design for mills that keep pipeline gas as the main fuel",
    ],
    cities: ["faisalabad", "karachi", "lahore", "multan", "hyderabad", "sheikhupura"],
    networkNote: "Textile supply depends on reaching a filling plant by tanker, so the table also shows the licensed marketer plants listed near each textile city.",
    ctas: {
      mid: "Send your boiler and stenter ratings for a bulk LPG quote",
      end: "Ask for an LPG-air feasibility check for your mill",
    },
    faqs: [
      { q: "Can a textile mill run on LPG during the winter gas curtailment?", a: "Yes, with a bulk tank and vaporizer, and either converted burners or an LPG-air system. The setup takes planning, so start before the winter season." },
      { q: "What is LPG-air?", a: "A mix of vaporised LPG and air that burns like natural gas, so burners built for natural gas can run on it with limited changes. See the LPG-air (SNG) service page." },
    ],
  },

  "food-processing": {
    context: [
      "Food plants need heat that stays even. A biscuit oven, a namkeen frying line or a spice roaster spoils product when the flame wavers, so steady gas pressure is worth more to a food plant than to almost any other user. That is why food units are among the first to move from cylinders to a manifold or a bulk tank as they grow.",
      "Bakeries and snack makers in Lahore, Karachi, Faisalabad and Gujranwala often run ovens and fryers through the night. LPG burns clean, which matters because combustion gases touch the product in direct-fired ovens and fryers.",
    ],
    loads: [
      ["Rotary rack oven", 40, 80, "Bread, rusk and cake lines"],
      ["Deck oven, per deck", 8, 15, "Small and mid bakeries"],
      ["Continuous fryer (snacks)", 200, 600, "Usually through a thermal-oil heater"],
      ["Roaster (nuts, spices, coffee)", 30, 150, "Per drum"],
      ["Boiler for dairy and blanching", 300, 1500, "Steam or hot water"],
    ],
    example: {
      title: "A mid-size bakery: two rack ovens and a fryer",
      items: [
        { label: "2 rotary rack ovens", basis: "60 kW each at about 70% average for 12 hours", kwh: 1008 },
        { label: "Batch fryer", basis: "25 kW for 6 hours", kwh: 150 },
      ],
      note: "Ovens cycle on and off, so average input is below the rating. Your current cylinder use is the best check.",
    },
    problems: [
      ["Uneven baking or frying", "Pressure dips as cylinders cool. A manifold with enough cylinders, or a vaporizer, keeps the flame steady."],
      ["Night shifts run out of gas", "Deliveries happen in the day. Size the store so the night shift never depends on a delivery."],
      ["Food-safety audits ask about gas", "Auditors look at cylinder storage, ventilation and leak checks. A written maintenance record helps."],
      ["Fryer flame failure", "Often a dirty burner or low pressure. Burner maintenance cuts both downtime and gas use."],
    ],
    costDrivers: [
      "Continuous lines use gas around the clock, so tank storage usually lowers the delivered cost compared with many cylinders.",
      "Oven insulation and burner tuning affect kilograms per batch directly.",
      "Products that need a precise temperature may need a two-stage regulator setup, which is a one-time cost.",
      "Monthly volume and payment terms shape the delivered total under the notified rate.",
    ],
    capabilities: [
      "Manifolds and cylinder stores sized for ovens and fryers",
      "Bulk tanks and vaporizers for continuous lines",
      "Piping to production halls with isolation valves per machine",
      "Maintenance contracts with written records for food-safety audits",
    ],
    cities: ["lahore", "karachi", "faisalabad", "gujranwala", "multan", "hyderabad"],
    networkNote: "Food units in these cities can be supplied from nearby dealers for cylinders, or from a plant by tanker for bulk tanks.",
    ctas: {
      mid: "Send your oven and fryer list for a supply plan",
      end: "Get a steady-pressure setup quoted for your plant",
    },
    faqs: [
      { q: "Is LPG safe for direct-fired food ovens?", a: "LPG burns cleanly when burners are tuned and maintained, which is why it is widely used in bakeries. The oven maker's guidance and regular burner service matter." },
      { q: "When should a bakery move from cylinders to a tank?", a: "When cylinder changes become a daily task or the night shift risks running out. We compare both options from your real use." },
    ],
  },

  "poultry-farms": {
    context: [
      "Broiler chicks cannot hold their own body heat for the first two weeks, so brooding sheds must stay warm day and night. That makes poultry one of the most seasonal LPG loads in Pakistan: demand jumps from November to February in Punjab and the northern hills, exactly when cylinder demand peaks everywhere else.",
      "Farms in the Rawalpindi–Islamabad belt, around Lahore and Sheikhupura, and in Abbottabad and Mansehra use gas brooders because they heat evenly and are easy to control. The cold creates a second problem: cylinders standing in a cold shed lose pressure at night, which is when chicks need the most heat.",
    ],
    loads: [
      ["Gas brooder (radiant / pancake)", 1.5, 3, "One per 500–1,000 chicks"],
      ["Jet / space heater", 30, 100, "Whole-shed heating"],
      ["Infrared tube heater", 10, 40, "Long sheds"],
      ["Water heater for cleaning", 8, 15, "Shed wash-down between flocks"],
    ],
    example: {
      title: "A 20,000-bird broiler shed in its first two weeks",
      items: [
        { label: "25 brooders", basis: "2.5 kW each, about 12 hours of full output a day", kwh: 750 },
        { label: "Night space heating", basis: "40 kW heater for 4 hours on cold nights", kwh: 160 },
      ],
      note: "Use falls as the birds grow and the weather warms. Plan stock for the coldest week of the first flock.",
    },
    problems: [
      ["Chicks crowding under brooders", "A sign the shed is too cold, often because brooder pressure dropped at night. More cylinders on a manifold, kept out of the wind, hold pressure."],
      ["Fire risk near litter", "Brooders hang over dry litter. Keep the right height, clear litter from cylinder areas and keep hoses off the floor."],
      ["Running out on a winter night", "Deliveries slow down in cold, foggy weeks. Keep a reserve bank and order before the flock arrives."],
      ["Ammonia damage to fittings", "Shed air corrodes metal fittings and hardens hoses faster. Inspect them every flock."],
    ],
    costDrivers: [
      "Winter is the peak for everyone, so ordering stock before the season can avoid shortage-week delays.",
      "Brooder height and shed insulation change how much gas keeps chicks warm; curtains and sealing gaps save kilograms.",
      "Remote farms cost more to reach, so fewer, larger drops can lower the delivered cost.",
      "Cylinder custody over a season means deposits; exchange terms are worth agreeing up front.",
    ],
    capabilities: [
      "Cylinder supply planned around flock dates",
      "Manifolds and pipework to brooder lines, kept off the litter",
      "Small bulk tanks for large or multi-shed farms",
      "Pre-season safety checks of hoses, regulators and brooders",
    ],
    cities: ["rawalpindi", "lahore", "sheikhupura", "abbottabad", "mansehra", "multan"],
    networkNote: "Farms sit outside city centres, so the nearest listed dealer and the road in matter. These are the poultry-belt cities where we hold listings.",
    ctas: {
      mid: "Tell us your flock dates and shed size for a winter gas plan",
      end: "Book your brooding-season LPG before the cold sets in",
    },
    faqs: [
      { q: "How much LPG does a broiler shed use?", a: "It depends on bird numbers, weather and insulation. As a guide, the worked example on this page shows a 20,000-bird shed using more than one 45.4 kg cylinder a day in its first cold weeks." },
      { q: "Why do my brooders burn weakly at night?", a: "Cold cylinders vaporise less gas. Use more cylinders in parallel on a manifold and shelter them from the wind. Never heat a cylinder with a flame." },
    ],
  },

  hospitals: {
    context: [
      "A hospital cannot pause its kitchen or its hot water while it waits for a delivery, so the main requirement is continuity. Gas usually feeds the patient and staff kitchen, hot water for wards and laundry, and sometimes a boiler. Supply is designed with a duty bank, a standby bank and an automatic changeover, so an empty cylinder never stops a service.",
      "Hospitals in Islamabad, Lahore, Karachi and Peshawar that once relied on Sui gas often keep LPG as a backup, because low winter pressure affects kitchens and boilers at the worst time. Any gas system on a hospital site also needs safe storage away from patient areas and a clear emergency shut-off.",
    ],
    loads: [
      ["Kitchen range and bulk cookers", 30, 80, "Patient, staff and attendant meals"],
      ["Storage geysers or calorifiers", 10, 60, "Wards, theatres and staff areas"],
      ["Laundry dryers and presses", 20, 60, "In-house laundries"],
      ["Hot-water or steam boiler", 100, 600, "Central heating and sterile services"],
    ],
    example: {
      title: "A 100-bed hospital with an in-house kitchen",
      items: [
        { label: "Hot water", basis: "100 beds × 60 litres a day, heated by 40 °C", kwh: 372 },
        { label: "Kitchen", basis: "About 40 kW for 6 hours of full use", kwh: 240 },
        { label: "Laundry", basis: "30 kW for 4 hours", kwh: 120 },
      ],
      note: "Hospitals should plan for at least several days of stock on site, because a delivery delay cannot be allowed to stop the kitchen or hot water.",
    },
    problems: [
      ["Single point of failure", "One cylinder bank with manual changeover depends on someone noticing. Automatic changeover and a standby bank remove that risk."],
      ["Storage too close to wards", "Cylinder stores belong outside, ventilated, locked and away from patient areas and oxygen stores."],
      ["No written maintenance record", "Inspectors and accreditation reviews ask for one. A maintenance contract creates it."],
      ["Hot water fails during peak demand", "Undersized supply pressure. The manifold and pipe sizes must match all heaters running together."],
    ],
    costDrivers: [
      "Continuity costs something: a standby bank means more cylinders in custody, but it prevents service stoppages.",
      "Hot water is often the largest load, so insulation and set temperatures matter.",
      "A bulk tank can lower the delivered cost for larger hospitals compared with many cylinders.",
      "Public procurement may need fixed-term pricing linked to the OGRA notification, which we can state in writing.",
    ],
    capabilities: [
      "Duty/standby manifolds with automatic changeover",
      "Pipelines to kitchens, laundries and plant rooms with isolation valves",
      "Safety audits and written maintenance records",
      "Documentation for procurement files: licence, scope and price basis",
    ],
    cities: ["islamabad", "lahore", "karachi", "peshawar", "rawalpindi", "quetta"],
    networkNote: "Hospitals need a supplier that can respond the same day, so a dealer in the same city matters. These are the listings in the cities with the most hospital enquiries.",
    ctas: {
      mid: "Send your bed count and gas appliance list for a continuity plan",
      end: "Request a written hospital supply proposal",
    },
    faqs: [
      { q: "How much LPG stock should a hospital keep?", a: "Enough to cover delivery delays in your area, usually several days of normal use on site, split between a duty and a standby bank." },
      { q: "Can you provide documents for a procurement file?", a: "Yes. We share the OGRA licence number, the scope, the price basis linked to the notified rate and the terms in writing." },
    ],
  },

  "housing-societies": {
    context: [
      "Many new housing societies in Pakistan were built without Sui gas connections, or with connections delayed for years. A central LPG tank with a piped network gives every home gas at the stove and the geyser without each family storing cylinders indoors, which is safer and more convenient.",
      "Two systems are common: piped LPG at low pressure, or LPG-air, which behaves like natural gas and lets homes switch to Sui gas later with few changes. Each home gets a meter, so families pay only for what they use.",
    ],
    loads: [
      ["Household cooking", 3, 7, "Two to three burners per home"],
      ["Household storage geyser", 8, 12, "The main winter load"],
      ["Room heater", 3, 6, "Winter, in colder cities"],
      ["Community kitchen or mosque", 15, 40, "Where the society has one"],
    ],
    example: {
      title: "A 200-home block on a central tank",
      items: [
        { label: "Cooking", basis: "200 homes × about 6 kWh of gas a day", kwh: 1200 },
        { label: "Winter geysers", basis: "200 homes × 100 litres a day heated by 40 °C", kwh: 1240 },
      ],
      note: "Summer use is close to the cooking line alone; winter use can double because of geysers and heaters. Size the tank for winter.",
    },
    problems: [
      ["No Sui gas, residents on cylinders", "Cylinders inside flats and homes raise the leak risk. A central tank keeps storage outside, with a professional system and meters."],
      ["Low pressure at the far end", "Pipe sizes and regulators must match peak winter flow. This is a design question, not a gas question."],
      ["Billing disputes", "Individual meters, read on a schedule, give each home a clear bill."],
      ["Planning for Sui gas later", "LPG-air lets the network move to natural gas later with fewer changes."],
    ],
    costDrivers: [
      "The network and tank are a one-time cost; gas is then billed per kg or per metered unit.",
      "Winter peaks set the tank and pipe size, which sets the build cost.",
      "Delivered cost per kg falls with larger tanker drops.",
      "Metering and billing service is part of the running cost.",
    ],
    capabilities: [
      "Central tank or LPG-air plant design and installation",
      "Underground or surface reticulation with pressure testing",
      "Household meters and connection points",
      "Maintenance, refilling and safety inspection contracts",
    ],
    cities: ["lahore", "islamabad", "rawalpindi", "karachi", "gujranwala", "faisalabad"],
    networkNote: "Society projects are supplied by tanker from a plant, with local dealers covering cylinders during installation. Listings in the cities with the most new societies:",
    ctas: {
      mid: "Send your society plan and number of homes for a network quote",
      end: "Request a central gas feasibility study for your society",
    },
    faqs: [
      { q: "Can a housing society get piped LPG instead of Sui gas?", a: "Yes. A central tank or LPG-air plant feeds a pipe network to each home, with meters. It needs design, approvals and a site for the tank." },
      { q: "Can we switch to Sui gas later?", a: "An LPG-air network makes that easier, because it is designed around natural-gas burners. We explain the options during design." },
    ],
  },

  manufacturing: {
    context: [
      "Factories use LPG where they need high, controllable heat: furnaces, kilns, heat-treatment ovens, powder-coating ovens and forging. Gujranwala's steel and sanitary units, Sialkot's forging and surgical-instrument workshops, Gujrat's ceramics and Lahore's and Karachi's mixed industry all have loads like these.",
      "LPG suits these processes because it burns clean and its flame is easy to control, which matters for finish quality in coating and heat treatment. The supply choice depends on the load: small workshops run on cylinder banks, while a furnace running all day needs a bulk tank and vaporizer.",
    ],
    loads: [
      ["Heat-treatment or annealing furnace", 100, 600, "Batch or continuous"],
      ["Powder-coating cure oven", 100, 300, "Per oven"],
      ["Forging furnace", 50, 300, "Sialkot and Gujranwala workshops"],
      ["Ceramic kiln", 200, 1000, "Firing cycles of many hours"],
      ["Process boiler", 300, 1500, "Steam or hot water"],
    ],
    example: {
      title: "A workshop with a coating oven and a forging furnace",
      items: [
        { label: "Powder-coating oven", basis: "150 kW at about 60% for 10 hours", kwh: 900 },
        { label: "Forging furnace", basis: "120 kW at about 70% for 8 hours", kwh: 672 },
      ],
      note: "Batch processes vary a lot. Your current fuel bills or cylinder use are the best basis.",
    },
    problems: [
      ["Switching from diesel or furnace oil", "Burners need changing and the flue may change too. The gain is cleaner heat and less maintenance."],
      ["Temperature control problems", "Unstable gas pressure. A two-stage regulator setup or a vaporizer stabilises it."],
      ["Many cylinders, many changes", "Above a certain use, cylinder handling costs more labour than a tank. We compare both."],
      ["Leaks at flexible connections", "Vibration near machinery loosens fittings. Use rated flexible hoses and check them on a schedule."],
    ],
    costDrivers: [
      "Compare fuel cost per unit of heat, not per litre or kg; LPG has about 46 MJ per kg against about 36 MJ per litre of diesel.",
      "Burner conversion and controls are a one-time cost that cleaner running can repay.",
      "Tank storage lowers handling labour and can lower the delivered cost per kg.",
      "Batch schedules change monthly use, so volume terms should allow for it.",
    ],
    capabilities: [
      "Furnace, oven and boiler conversion to LPG",
      "Bulk tanks and vaporizers for continuous loads",
      "Cylinder banks for workshops",
      "Piping, pressure testing and maintenance contracts",
    ],
    cities: ["gujranwala", "sialkot", "lahore", "karachi", "faisalabad", "sheikhupura"],
    networkNote: "Industrial clusters are supplied both by local dealers for cylinders and by plants for bulk. These are the manufacturing cities where we hold listings.",
    ctas: {
      mid: "Send your furnace or oven ratings for a fuel comparison",
      end: "Get a written LPG conversion quote for your factory",
    },
    faqs: [
      { q: "Is LPG cheaper than diesel for a furnace?", a: "It depends on the month's prices and your burner efficiency. Compare cost per unit of heat: use the LPG vs diesel cost calculator with your own prices." },
      { q: "Can you convert an existing furnace?", a: "Usually yes, with burner and control changes. We look at the furnace, the flue and the load before quoting." },
    ],
  },

  "weddings-and-events": {
    context: [
      "Shaadi catering is cooked in large degs on high-output burners, often for hundreds of guests in a few hours. On top of that, winter functions run patio or marquee heaters. The whole load is temporary but intense, so the right number of cylinders, regulators and hoses must arrive before the cooks start.",
      "The wedding season in Pakistan peaks from October to February, which is also when home heating pushes LPG demand to its highest. Caterers and halls that book supply early avoid the shortage weeks, when cylinders can be hard to find at any price.",
    ],
    loads: [
      ["Deg burner (chulha)", 15, 30, "One per deg; biryani, qorma, rice"],
      ["Tandoor for naan", 15, 30, "Usually two or more at large events"],
      ["Patio / mushroom heater", 10, 14, "Winter marquees and lawns"],
      ["Tea and water boiler", 5, 15, "Runs throughout the event"],
    ],
    example: {
      title: "A 500-guest winter wedding",
      items: [
        { label: "8 deg burners", basis: "20 kW each for about 3 hours", kwh: 480 },
        { label: "2 tandoors", basis: "20 kW each for 3 hours", kwh: 120 },
        { label: "6 patio heaters", basis: "12 kW each for 4 hours", kwh: 288 },
      ],
      note: "Always keep at least one spare full cylinder per cooking station, because a run-out in the middle of cooking spoils the deg.",
    },
    problems: [
      ["Burners weaken in the middle of cooking", "Several burners on one cylinder exceed its vaporisation rate. Spread burners across cylinders or use a small manifold."],
      ["Cylinders not available in peak week", "Book early in the season and confirm the delivery time the day before."],
      ["Heaters near guests and fabric", "Keep patio heaters away from tent walls and stable on level ground, with cylinders upright."],
      ["Hoses across walkways", "Guests and staff trip on them and damage them. Route hoses away from paths and check them before lighting."],
    ],
    costDrivers: [
      "Gas is charged per kg at the notified rate; unused full cylinders can usually be returned under the agreed terms.",
      "Peak-season dates cost more to cover because demand is high and delivery slots are tight.",
      "Distance to the venue and setup time affect the delivered total.",
      "Renting regulators and burners versus bringing your own changes the quote.",
    ],
    capabilities: [
      "Event cylinder packages planned from your menu and guest count",
      "Regulators and hoses sized for deg burners",
      "Standing seasonal supply for marriage halls and caterers",
      "Pre-event safety check of the cooking area",
    ],
    cities: ["lahore", "rawalpindi", "islamabad", "karachi", "faisalabad", "multan"],
    networkNote: "Events need a dealer who can deliver on a fixed day and time. These are the cities with the most event enquiries and the listings we hold there.",
    ctas: {
      mid: "Send your guest count and menu for an event gas plan",
      end: "Book LPG for your function date on WhatsApp",
    },
    faqs: [
      { q: "How many cylinders do I need for a wedding?", a: "For a 500-guest winter function with degs, tandoors and heaters, the worked example on this page comes to about 70 kg of gas, so at least two 45.4 kg cylinders plus spares. Your menu and heaters change the number." },
      { q: "Can we return unused full cylinders?", a: "Return terms are agreed before the event. Ask us to state them when you book." },
    ],
  },
};

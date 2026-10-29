// Sector copy for /industries/*. Capabilities and sizing questions only: no customer names, no case studies and
// no consumption figures until real accounts exist (page-map gate IN-001..IN-010). Add a sector to a case study
// only through data/projects.json with written client consent.

export type Sector = {
  slug: string;
  name: string;
  /** Short label used on the hub cards. */
  card: string;
  h1: string;
  intro: string;
  short: string;
  uses: string[];
  supply: [string, string][];
  quoteNeeds: string[];
  safety: string[];
  services: { slug: string; label: string }[];
  links: { href: string; label: string }[];
  request: "commercial_supply" | "bulk_industrial";
  faqs: { q: string; a: string }[];
};

const commonQuote = "City, area and whether a truck can reach the delivery point";

export const sectors: Sector[] = [
  {
    slug: "restaurants",
    name: "Restaurants",
    card: "Restaurants and commercial kitchens",
    h1: "LPG supply for restaurants and commercial kitchens",
    intro:
      "Restaurants usually run on 45.4 kg cylinders, or on a cylinder bank when several burners work all day. THE LPG CO. supplies commercial kitchens nationwide across Pakistan — send your city, burners and cylinders per week, and we confirm price, street, timing and who delivers before you agree.",
    short: "Burner ranges, tandoors, grills and fryers on 45.4 kg cylinders or a manifold.",
    uses: [
      "Burner ranges and karahi stations",
      "Tandoors and grills",
      "Fryers, bain-maries and hot plates",
      "Water heating for the kitchen",
    ],
    supply: [
      ["45.4 kg cylinders, exchange", "Most single-kitchen restaurants. Delivery to site and swap of empties."],
      ["Cylinder bank on a manifold", "Kitchens with several burners running for long hours, so the supply does not stop at a cylinder change."],
      ["Piped line from an outdoor cylinder store", "Cleaner kitchen layout, with cylinders kept outside. Needs design and installation."],
    ],
    quoteNeeds: [
      "Number of burners and other gas appliances",
      "Opening hours and how many 45.4 kg cylinders you change per week",
      "Where cylinders are kept now and whether a manifold exists",
      commonQuote,
    ],
    safety: [
      "Keep cylinders upright, outside the cooking area, in a ventilated, shaded spot",
      "Replace cracked or hardened hoses; use a regulator suited to the load",
      "Know where the cylinder valve is and train staff to close it first in an emergency",
      "Never test for a leak with a flame",
    ],
    services: [
      { slug: "lpg-manifold-and-cylinder-bank-installation", label: "Manifold and cylinder bank installation" },
      { slug: "lpg-pipeline-installation", label: "LPG pipeline installation" },
      { slug: "lpg-safety-audit-and-inspection", label: "Safety audit and inspection" },
    ],
    links: [
      { href: "/commercial-lpg-supply/", label: "Commercial LPG supply" },
      { href: "/lpg-cylinders/45-kg-commercial-cylinder/", label: "45.4 kg commercial cylinder" },
      { href: "/tools/lpg-cylinder-duration-calculator/", label: "Cylinder duration calculator" },
      { href: "/projects/islamabad-restaurant-cylinder-bank-manifold/", label: "Islamabad restaurant manifold project" },
      { href: "/order-lpg/", label: "Order LPG" },
    ],
    request: "commercial_supply",
    faqs: [
      { q: "Which cylinder do restaurants use?", a: "Mostly the 45.4 kg commercial cylinder. Small food stalls may use 11.8 kg or 15 kg. The right size depends on burners and hours." },
      { q: "Can you deliver on a schedule?", a: "Tell us your weekly use and city. We confirm whether a distributor can supply on a regular schedule in your area before we agree terms." },
      { q: "Do you offer credit?", a: "Payment terms are agreed per customer and per order. We do not assume credit until we state it to you." },
    ],
  },
  {
    slug: "hotels",
    name: "Hotels",
    card: "Hotels and guesthouses",
    h1: "LPG supply for hotels and guesthouses",
    intro:
      "Hotels use gas in the kitchen, for hot water and sometimes laundry and heating. Smaller guesthouses run on cylinders; larger sites move to a cylinder bank or a bulk tank. THE LPG CO. quotes nationwide after we know the load, the site and your street.",
    short: "Kitchen, hot water and laundry loads on cylinder banks or bulk storage.",
    uses: [
      "Main kitchen and banquet kitchen ranges",
      "Hot water through geysers or a boiler",
      "Laundry dryers and presses",
      "Winter space heating in cold regions",
    ],
    supply: [
      ["45.4 kg cylinders, exchange", "Guesthouses and small hotels with one kitchen and modest hot water use."],
      ["Cylinder bank on a manifold", "Hotels where kitchen and hot water draw gas all day and a changeover should not stop service."],
      ["Bulk tank with a pipeline", "Larger hotels with steady, high demand. Needs siting, approvals and engineering."],
    ],
    quoteNeeds: [
      "Number of rooms and kitchens, plus banquet or event use",
      "Gas appliances: ranges, geysers, boilers, laundry",
      "Current cylinders used per week, or a recent supplier invoice",
      "Space for a cylinder store or tank and its distance from buildings",
    ],
    safety: [
      "Keep cylinder stores outside guest areas, ventilated and locked",
      "Check hoses, regulators and connections on a fixed schedule",
      "Train kitchen and maintenance staff on the shut-off point and what to do if gas is smelt",
      "Plan for peak occupancy and festival weeks, so stock does not run out",
    ],
    services: [
      { slug: "lpg-storage-tank-installation", label: "Storage tank installation" },
      { slug: "lpg-pipeline-installation", label: "LPG pipeline installation" },
      { slug: "lpg-maintenance-and-amc", label: "Maintenance and AMC" },
    ],
    links: [
      { href: "/commercial-lpg-supply/", label: "Commercial LPG supply" },
      { href: "/bulk-lpg-supply/", label: "Bulk LPG supply" },
      { href: "/tools/lpg-tank-size-calculator/", label: "Tank size calculator" },
      { href: "/projects/lahore-hotel-kitchen-lpg-pipeline/", label: "Lahore hotel pipeline project" },
      { href: "/order-lpg/", label: "Order LPG" },
    ],
    request: "commercial_supply",
    faqs: [
      { q: "When should a hotel move to a bulk tank?", a: "When cylinder changes become frequent and storage space or handling becomes a burden. Use the tank size calculator for a rough figure, then request a site assessment." },
      { q: "Can you supply in hill and tourist areas?", a: "It depends on whether a distributor can reach the site. Roads in winter or the monsoon can delay delivery. We tell you honestly before you agree." },
      { q: "Do you do the installation too?", a: "Yes, through our engineering team: pipeline, manifold and tank. Each job is quoted in writing after a brief and a site assessment." },
    ],
  },
  {
    slug: "textile",
    name: "Textile",
    card: "Textile and processing units",
    h1: "LPG supply for textile units: boilers, dryers and heat processes",
    intro:
      "Textile units that need steady heat for steam, thermal oil, drying and finishing can run LPG from cylinder banks or a bulk tank with a vaporizer. THE LPG CO. sizes industrial heat loads nationwide — starting with the equipment and the hours it runs.",
    short: "Steam and thermal-oil boilers, dryers and finishing lines on bulk LPG.",
    uses: [
      "Steam boilers for dyeing, washing and finishing",
      "Thermal oil heaters",
      "Dryers and stenter ranges",
      "Singeing and other burner-based finishing",
    ],
    supply: [
      ["Cylinder bank with a manifold", "Smaller units or a trial period before a larger setup."],
      ["Bulk tank, vaporizer and pipeline", "Sustained high demand. Needs engineering, siting distances and approvals."],
      ["LPG-air (SNG) system", "Plants with burners designed for natural gas that need a substitute fuel line. Assessed case by case."],
    ],
    quoteNeeds: [
      "Boiler and burner make and rating, or the load in kg of steam or kW",
      "Hours of operation and shifts",
      "Fuel used today and what you pay (an invoice helps)",
      "Site plan showing where a tank or bank could go",
    ],
    safety: [
      "A bulk installation needs the right safety distances and approvals before gas is delivered",
      "Burners converted to LPG must be re-tuned; LPG is heavier than air and settles in low spaces",
      "Install gas detection at low level near boiler rooms",
      "Keep maintenance and inspection records for tanks, regulators and hoses",
    ],
    services: [
      { slug: "boiler-and-furnace-conversion-to-lpg", label: "Boiler and furnace conversion to LPG" },
      { slug: "lpg-storage-tank-installation", label: "Storage tank installation" },
      { slug: "lpg-air-sng-systems", label: "LPG-air (SNG) systems" },
    ],
    links: [
      { href: "/industrial-lpg-supply/", label: "Industrial LPG supply" },
      { href: "/lpg-vaporizers/", label: "LPG vaporizers" },
      { href: "/tools/lpg-vs-diesel-cost-calculator/", label: "LPG vs diesel cost calculator" },
      { href: "/projects/faisalabad-textile-furnace-conversion/", label: "Faisalabad textile furnace project" },
      { href: "/bulk-lpg-supply/", label: "Bulk LPG supply" },
    ],
    request: "bulk_industrial",
    faqs: [
      { q: "Can my gas boiler run on LPG?", a: "Often it can with the right burner and tuning, but it must be assessed by a qualified engineer. We quote the conversion after a site review." },
      { q: "Do you publish a fixed industrial price?", a: "No. The gas component follows the OGRA-notified rate and the total depends on volume, delivery and terms. We quote in writing." },
      { q: "Do you have customer references?", a: "We publish projects only with written client consent. See the projects page for what is currently listed." },
    ],
  },
  {
    slug: "food-processing",
    name: "Food processing",
    card: "Food processing and bakeries",
    h1: "LPG supply for food processing, bakeries and catering units",
    intro:
      "Bakeries, sweet makers, snack and dairy units use gas for ovens, fryers, roasters and steam. LPG gives controllable heat without a pipeline — cylinder bank or bulk tank depending on volume — with THE LPG CO. quoting nationwide after we know your appliances and street.",
    short: "Ovens, fryers, roasters and steam for bakeries and food units.",
    uses: [
      "Baking ovens and tunnel ovens",
      "Deep fryers and frying lines",
      "Roasters and dryers",
      "Steam boilers for cooking and cleaning",
    ],
    supply: [
      ["45.4 kg cylinders, exchange", "Small bakeries and sweet shops."],
      ["Cylinder bank on a manifold", "Production units with several appliances running for long hours."],
      ["Bulk tank with a vaporizer", "Larger plants with steady high demand and storage space."],
    ],
    quoteNeeds: [
      "Appliances and their gas rating, or the make and model",
      "Production hours per day and days per week",
      "Cylinders or fuel used per week today",
      "Storage space and access for a delivery vehicle",
    ],
    safety: [
      "Keep cylinders outside production areas and away from ovens and flames",
      "Ventilate rooms where LPG appliances run and check flame colour; a yellow, lazy flame needs servicing",
      "Check connections regularly; never test with a flame",
      "Use regulators and hoses rated for the load",
    ],
    services: [
      { slug: "lpg-manifold-and-cylinder-bank-installation", label: "Manifold and cylinder bank installation" },
      { slug: "lpg-pipeline-installation", label: "LPG pipeline installation" },
      { slug: "lpg-safety-audit-and-inspection", label: "Safety audit and inspection" },
    ],
    links: [
      { href: "/commercial-lpg-supply/", label: "Commercial LPG supply" },
      { href: "/industrial-lpg-supply/", label: "Industrial LPG supply" },
      { href: "/tools/lpg-litre-to-kg-converter/", label: "Litre to kg converter" },
      { href: "/projects/islamabad-restaurant-cylinder-bank-manifold/", label: "Restaurant cylinder bank project" },
      { href: "/order-lpg/", label: "Order LPG" },
    ],
    request: "commercial_supply",
    faqs: [
      { q: "What size does a bakery need?", a: "It depends on the ovens and hours. Use the duration calculator for a rough figure and send your numbers for a quote." },
      { q: "Is LPG suitable for food production?", a: "LPG burns cleanly when burners are set up properly, which is why it is common in kitchens and bakeries. Burner condition and ventilation matter." },
      { q: "Can you supply a food unit outside a main city?", a: "It depends on whether a distributor can reach you. Send the location and we tell you honestly." },
    ],
  },
  {
    slug: "poultry-farms",
    name: "Poultry farms",
    card: "Poultry farms",
    h1: "LPG supply for poultry farms: brooders and shed heating",
    intro:
      "Poultry farms use LPG for brooder and space heaters, mostly in cold months when chicks need warmth. Supply is by 45.4 kg cylinders or, for large farms, a bulk tank. Rural access matters — THE LPG CO. confirms whether a distributor can reach your farm street before you agree.",
    short: "Brooders and shed heaters on 45.4 kg cylinders or bulk storage.",
    uses: [
      "Gas brooders for chicks",
      "Space heaters for sheds in winter",
      "Water heating on the farm",
      "Farm kitchen and staff quarters",
    ],
    supply: [
      ["45.4 kg cylinders, exchange", "Farms with a handful of brooders or one or two sheds."],
      ["Cylinder bank on a manifold", "Several sheds on the same site, to cut down on cylinder changes."],
      ["Bulk tank and pipeline to sheds", "Large farms with heavy winter demand. Needs siting and engineering."],
    ],
    quoteNeeds: [
      "Number of sheds and brooders, and the heater rating if known",
      "Cold-season months you need heating",
      "Farm location, with road access for a truck",
      "Where cylinders or a tank can be stored away from sheds",
    ],
    safety: [
      "Keep cylinders outside the shed in a ventilated, shaded place",
      "Keep sheds ventilated: gas heaters use oxygen and produce combustion gases that harm birds and people",
      "Check hoses and connections for rodent damage and wear",
      "Never leave heaters unattended near bedding, dust or feed",
    ],
    services: [
      { slug: "lpg-manifold-and-cylinder-bank-installation", label: "Manifold and cylinder bank installation" },
      { slug: "lpg-storage-tank-installation", label: "Storage tank installation" },
      { slug: "lpg-safety-audit-and-inspection", label: "Safety audit and inspection" },
    ],
    links: [
      { href: "/bulk-lpg-supply/", label: "Bulk LPG supply" },
      { href: "/commercial-lpg-supply/", label: "Commercial LPG supply" },
      { href: "/tools/lpg-tank-size-calculator/", label: "Tank size calculator" },
      { href: "/projects/multan-poultry-farm-brooder-supply/", label: "Multan poultry brooder project" },
      { href: "/order-lpg/", label: "Order LPG" },
    ],
    request: "commercial_supply",
    faqs: [
      { q: "Do you supply remote farms?", a: "It depends on whether a distributor can reach the location and on road conditions. Send the location and we say honestly whether we can." },
      { q: "How much gas will my farm use?", a: "It depends on shed size, heater rating, weather and hours. We do not publish a generic figure; we help you estimate from your heater ratings and past fuel use." },
      { q: "Can you supply before the cold season?", a: "Tell us the dates and the number of cylinders you expect to need and we check what can be arranged. Ask early, since cold-season demand rises." },
    ],
  },
  {
    slug: "hospitals",
    name: "Hospitals",
    card: "Hospitals and clinics",
    h1: "LPG supply for hospitals and clinics",
    intro:
      "Hospitals use gas for kitchens, laundry, hot water and steam, and need supply that does not stop. THE LPG CO. helps plan reserve stock, a cylinder bank or a bulk tank nationwide, with safety review and written terms before any work or supply.",
    short: "Kitchen, laundry, steam and hot water with a reserve plan.",
    uses: [
      "Patient and staff kitchens",
      "Laundry and linen processing",
      "Hot water and steam boilers",
      "Backup when pipeline gas is interrupted",
    ],
    supply: [
      ["Cylinder bank with a reserve bank", "Kitchens and small hospitals needing a safe, switchable supply."],
      ["Bulk tank with a pipeline", "Larger hospitals with continuous demand."],
      ["Scheduled cylinder delivery", "Clinics and small facilities with modest use."],
    ],
    quoteNeeds: [
      "Services that use gas: kitchen, laundry, boiler, hot water",
      "Current fuel source and how it is interrupted",
      "Required reserve: how many days you want on site",
      "Site plan and access for a delivery vehicle",
    ],
    safety: [
      "Gas stores must be away from wards, entrances and emergency routes",
      "Run a written emergency plan and train kitchen and maintenance staff",
      "Schedule inspection of regulators, hoses, valves and detectors",
      "Treat any smell of gas as an emergency; evacuate and call emergency services",
    ],
    services: [
      { slug: "lpg-safety-audit-and-inspection", label: "Safety audit and inspection" },
      { slug: "lpg-maintenance-and-amc", label: "Maintenance and AMC" },
      { slug: "lpg-pipeline-installation", label: "LPG pipeline installation" },
    ],
    links: [
      { href: "/bulk-lpg-supply/", label: "Bulk LPG supply" },
      { href: "/lpg-safety/", label: "LPG safety guide" },
      { href: "/what-to-do-if-you-smell-gas/", label: "What to do if you smell gas" },
      { href: "/projects/peshawar-hospital-kitchen-manifold/", label: "Peshawar hospital manifold project" },
    ],
    request: "bulk_industrial",
    faqs: [
      { q: "Can LPG be a backup for pipeline gas?", a: "Yes, a cylinder bank or tank can serve as backup. It must be designed so the two fuels are kept separate, and assessed by a qualified engineer." },
      { q: "Do you guarantee uninterrupted supply?", a: "We do not promise this. We help plan reserve stock and a delivery schedule, and we agree what we can and cannot commit to in writing." },
      { q: "Is a safety audit available?", a: "Yes. Our engineering team offers a safety audit and inspection, quoted after a brief." },
    ],
  },
  {
    slug: "housing-societies",
    name: "Housing societies",
    card: "Housing societies and apartments",
    h1: "LPG supply for housing societies, apartments and gated communities",
    intro:
      "Societies can arrange scheduled cylinder deliveries for many homes, or look at a shared cylinder bank or piped LPG for apartment blocks. THE LPG CO. starts with a brief nationwide — the right route depends on layout, approvals and who manages the system.",
    short: "Scheduled delivery, shared cylinder banks and piped LPG for communities.",
    uses: [
      "Cooking gas for homes in blocks and villas",
      "Hot water in homes with geysers",
      "Common kitchens, clubhouses and food courts",
      "Winter heating in cold regions",
    ],
    supply: [
      ["Scheduled domestic cylinder delivery", "Societies where residents order their own cylinders, with a coordinated route."],
      ["Shared cylinder bank with piped lines", "Apartment blocks, subject to design, approvals and a clear billing arrangement."],
      ["Commercial supply for clubhouses and food courts", "45.4 kg cylinders or a manifold."],
    ],
    quoteNeeds: [
      "Number of homes or blocks and building height",
      "Who will manage the system: society, builder or operator",
      "How billing would work between residents and the operator",
      "Space for a cylinder store or tank and its distance from buildings",
    ],
    safety: [
      "Cylinders inside apartments increase risk. Piped supply from an outdoor store is the safer design where it is allowed",
      "A shared system needs a competent operator, inspection routine and emergency plan",
      "Residents should know the emergency shut-off and the numbers to call",
      "Do not store spare cylinders in stairwells, corridors or basements",
    ],
    services: [
      { slug: "lpg-pipeline-installation", label: "LPG pipeline installation" },
      { slug: "lpg-storage-tank-installation", label: "Storage tank installation" },
      { slug: "lpg-maintenance-and-amc", label: "Maintenance and AMC" },
    ],
    links: [
      { href: "/lpg-home-delivery/", label: "LPG home delivery" },
      { href: "/new-lpg-connection/", label: "New LPG connection" },
      { href: "/delivery-areas/", label: "Delivery areas" },
      { href: "/projects/quetta-housing-society-pipeline-riser/", label: "Quetta housing society riser project" },
      { href: "/order-lpg/", label: "Order LPG" },
    ],
    request: "commercial_supply",
    faqs: [
      { q: "Can a society get piped LPG?", a: "It is possible with the right design, approvals and a competent operator. It needs an engineering assessment before we can say what is feasible." },
      { q: "Can you deliver cylinders to many homes in one trip?", a: "We can ask the distributor in your area about a coordinated route. We confirm what is available before you agree." },
      { q: "Who is responsible for safety in a shared system?", a: "The operator, with the society. This is agreed in writing at the start and checked in regular inspections." },
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    card: "Factories and manufacturing",
    h1: "LPG supply for factories and manufacturing plants",
    intro:
      "Factories use LPG for furnaces, ovens, dryers, boilers and heat treatment, either as the main fuel or as a backup. THE LPG CO. quotes nationwide from your equipment list, hours and site — bulk tank, cylinder bank or LPG-air options.",
    short: "Furnaces, ovens, dryers and boilers on bulk LPG or cylinder banks.",
    uses: [
      "Furnaces, kilns and heat-treatment ovens",
      "Dryers and curing ovens",
      "Steam and thermal-oil boilers",
      "Brazing, cutting and other burner processes",
    ],
    supply: [
      ["Cylinder bank on a manifold", "Smaller loads or a trial before a larger installation."],
      ["Bulk tank, vaporizer and pipeline", "High, steady demand. Needs engineering, siting distances and approvals."],
      ["LPG-air (SNG) system", "Burners built for natural gas that need a substitute fuel line, assessed case by case."],
    ],
    quoteNeeds: [
      "Equipment list with make, model and rating, or the load in kW",
      "Operating hours and shifts",
      "Fuel and monthly cost today, from an invoice",
      "Site plan and where a tank or bank could stand",
    ],
    safety: [
      "Bulk storage needs safety distances and approvals before first delivery",
      "Burners must be re-tuned for LPG; low-level gas detection is advisable",
      "Keep maintenance and inspection records for tanks, regulators and valves",
      "Train operators on shut-off and on what to do if gas is smelt",
    ],
    services: [
      { slug: "boiler-and-furnace-conversion-to-lpg", label: "Boiler and furnace conversion to LPG" },
      { slug: "lpg-storage-tank-installation", label: "Storage tank installation" },
      { slug: "lpg-air-sng-systems", label: "LPG-air (SNG) systems" },
    ],
    links: [
      { href: "/industrial-lpg-supply/", label: "Industrial LPG supply" },
      { href: "/lpg-vaporizers/", label: "LPG vaporizers" },
      { href: "/tools/lpg-btu-kwh-converter/", label: "BTU and kWh converter" },
      { href: "/projects/karachi-factory-bulk-tank-interface/", label: "Karachi factory bulk tank project" },
      { href: "/bulk-lpg-supply/", label: "Bulk LPG supply" },
    ],
    request: "bulk_industrial",
    faqs: [
      { q: "Can LPG replace diesel in my plant?", a: "In many heating applications, yes, after assessment. Compare running cost with the LPG vs diesel calculator using your own diesel price, then request a quote." },
      { q: "What approvals apply?", a: "Bulk LPG storage is regulated. We help you understand what applies in your case; you remain responsible for approvals on your site. Check with OGRA and local authorities." },
      { q: "How is the price set?", a: "The gas component follows the OGRA-notified rate. The total depends on volume, delivery, terms and equipment, and is quoted in writing." },
    ],
  },
  {
    slug: "weddings-and-events",
    name: "Weddings and events",
    card: "Weddings and events",
    h1: "LPG cylinders for weddings, catering and events",
    intro:
      "Event caterers need many burners for a few days. THE LPG CO. can arrange several 45.4 kg cylinders for an event date nationwide, subject to your city and the distributor's stock. Ask early and tell us the date, guest count, burners and venue street.",
    short: "45.4 kg cylinders for catering on wedding and event days.",
    uses: [
      "Large cooking pots (degs) and burner rows for catering",
      "Tandoors, grills and fryers at the venue",
      "Hot water and tea stations",
      "Permanent wedding-hall kitchens",
    ],
    supply: [
      ["Several 45.4 kg cylinders for the event", "One-off events. Ordered ahead with the date and number of burners."],
      ["Standby cylinder", "A spare full cylinder on site, so cooking does not stop if one runs out."],
      ["Manifold for a hall kitchen", "Wedding halls with permanent kitchens and regular use."],
    ],
    quoteNeeds: [
      "Event date, time and venue city and area",
      "Guest count and number of burners or appliances",
      "Number of 45.4 kg cylinders you expect to use",
      "How you will return empties: exchange terms are confirmed for your order",
    ],
    safety: [
      "Keep cylinders outdoors, upright and away from tents, crowds and open flames",
      "Keep a fire extinguisher at the cooking area and keep children away",
      "Check hoses and regulators before cooking; do not use damaged ones",
      "Shut all valves when cooking ends. Never leave burners unattended",
    ],
    services: [
      { slug: "lpg-manifold-and-cylinder-bank-installation", label: "Manifold and cylinder bank installation" },
      { slug: "lpg-safety-audit-and-inspection", label: "Safety audit and inspection" },
    ],
    links: [
      { href: "/commercial-lpg-supply/", label: "Commercial LPG supply" },
      { href: "/lpg-cylinders/45-kg-commercial-cylinder/", label: "45.4 kg commercial cylinder" },
      { href: "/tools/lpg-cylinder-price-calculator/", label: "Cylinder price calculator" },
      { href: "/projects/rawalpindi-wedding-hall-cylinder-bank/", label: "Rawalpindi wedding hall bank project" },
      { href: "/order-lpg/", label: "Order LPG" },
    ],
    request: "commercial_supply",
    faqs: [
      { q: "How early should I order for a wedding?", a: "As early as you can, since event dates cluster around seasons. We cannot promise stock for a given day until we confirm it with the distributor in your area." },
      { q: "How many cylinders will I need?", a: "It depends on burners, cooking hours and menu. Use the duration calculator with your burner count for a rough figure and order a spare." },
      { q: "What happens to unused gas?", a: "Exchange and return terms are confirmed for your order before you agree. Ask us about unused cylinders when you book." },
    ],
  },
];

export const sectorBySlug = (slug: string) => sectors.find((s) => s.slug === slug)!;

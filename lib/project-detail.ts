// Detail for the 8 owner-confirmed projects (completed 2011–2016). Built from each project's recorded scope,
// equipment and outcome in data/production/projects.json. Exact year, client name and site photos are not on file
// yet, so the page says "on request" / "photos to follow" instead of inventing them.

export type ProjectDetail = {
  metaTitle: string;
  metaDescription: string;
  system: string;
  challenge: string;
  steps: { title: string; text: string }[];
  checks: string[];
  forYou: string;
  faqs: { q: string; a: string }[];
};

export const projectDetail: Record<string, ProjectDetail> = {
  "islamabad-restaurant-cylinder-bank-manifold": {
    metaTitle: "Restaurant LPG Cylinder Bank Project, Islamabad",
    metaDescription:
      "How THE LPG CO. fitted a 4 × 45.4 kg cylinder bank with automatic changeover for an Islamabad restaurant so the kitchen kept its flame at peak hours.",
    system: "4 × 45.4 kg cylinder bank with automatic changeover manifold",
    challenge:
      "The restaurant ran its burners hard at lunch and dinner on loose cylinders. Flames weakened at the busiest moments, because a single cylinder cannot vaporise gas fast enough for several high-output burners, and staff had to change cylinders in the middle of service.",
    steps: [
      { title: "Load survey at peak hours", text: "We listed every burner on the line and noted which ones run together at lunch and dinner, so the bank was sized for the peak, not the daily average." },
      { title: "Cylinder bank and changeover", text: "Four 45.4 kg certified cylinders were split into a duty side and a standby side on an automatic changeover manifold, so the kitchen switches to full cylinders without anyone touching a valve." },
      { title: "Pigtails, regulators and valves", text: "Steel pigtails connected each cylinder to the manifold, with dual commercial regulators and isolation valves so one side can be serviced while the other runs." },
      { title: "Leak test and staff briefing", text: "Every joint was checked with soap solution before gas was opened to the kitchen, and staff were shown the changeover indicator, the valve order and the emergency shut-off." },
    ],
    checks: ["Soap-solution leak test on every joint", "Changeover tested by running the duty side empty", "Regulator outlet pressure checked at the burners", "Staff walked through the emergency shut-off"],
    forYou:
      "If your kitchen loses flame at rush hour or changes cylinders during service, the same setup applies: size the bank from the burners that run together, and split it into duty and standby sides on an automatic changeover.",
    faqs: [
      { q: "Why four cylinders and not two?", a: "Two cylinders could not release gas fast enough for the burners running together at peak. Splitting four into two sides gives enough draw and a full standby." },
      { q: "Can this be added to an existing kitchen?", a: "Usually yes. The bank sits in an outdoor cage and connects to the existing kitchen line, with a survey first to check pipe sizes." },
    ],
  },
  "lahore-hotel-kitchen-lpg-pipeline": {
    metaTitle: "Hotel Kitchen LPG Pipeline Project, Lahore",
    metaDescription:
      "A pipeline from an outdoor cylinder cage to a Lahore hotel's main kitchen and bakery, pressure-tested with recorded readings and isolation per appliance group.",
    system: "External cylinder cage, pipeline to kitchen and bakery, isolation valves",
    challenge:
      "The hotel wanted cylinders out of the kitchen and a fixed supply to both the main kitchen and the bakery line. Loose cylinders inside a busy hotel kitchen are a safety risk, because LPG that leaks indoors sinks and collects at floor level.",
    steps: [
      { title: "Route from cage to kitchen", text: "We planned a route from an external, ventilated cylinder cage to the main kitchen and bakery line, keeping the pipe where it can be inspected." },
      { title: "Isolation at every stage", text: "Isolation valves went in at the cage, at the riser and at each major appliance group, so one area can be shut without stopping the whole kitchen." },
      { title: "Pressure test with records", text: "The line was pressure-tested before commissioning and the readings recorded on a test sheet, handed to the hotel's engineering team." },
      { title: "Cage ventilation and briefing", text: "The cage ventilation was upgraded, and kitchen and engineering staff were briefed on shut-off points and what to do if they smell gas." },
    ],
    checks: ["Recorded pressure test before gas-in", "Staged commissioning, one appliance group at a time", "Cage ventilation checked", "Safety briefing for kitchen and engineering staff"],
    forYou:
      "For hotels and large kitchens, moving cylinders outside and piping gas in is the single biggest safety improvement. Ask for a recorded pressure test and isolation valves per appliance group.",
    faqs: [
      { q: "What material was the kitchen line?", a: "Carbon steel and copper, chosen for the run and the appliances. The right material depends on your route and load." },
      { q: "Does the hotel keep any records?", a: "Yes. The engineering team kept the pressure-test sheet, which is useful for inspections and later changes." },
    ],
  },
  "karachi-factory-bulk-tank-interface": {
    metaTitle: "Factory Bulk LPG Tank and Vaporizer Project, Karachi",
    metaDescription:
      "Bulk tank interface, vaporizer sizing inputs and emergency shut-down valve positions for a Karachi factory, with a yard safety checklist and AMC plan.",
    system: "Bulk tank interface, vaporizer and emergency shut-down (ESD) valves",
    challenge:
      "The factory needed process heat at a scale that cylinders could not supply reliably. A bulk tank with a vaporizer was the answer, but the yard layout, safety distances and the plant's peak hourly load had to be worked out first.",
    steps: [
      { title: "Process-heat demand", text: "We estimated the factory's process-heat demand and its peak hourly load, which sets both the vaporizer size and the tank's refill interval." },
      { title: "Tank interface and vaporizer inputs", text: "We defined the bulk tank interface, the inputs for sizing the vaporizer and the positions of emergency shut-down valves on the line." },
      { title: "Yard safety", text: "A checklist covered safety distances, fencing and firefighting provision for the tank yard." },
      { title: "Maintenance plan", text: "An AMC proposal set out quarterly inspection and leak surveys after handover." },
    ],
    checks: ["Safety distances and fencing against the checklist", "ESD valve positions agreed", "Bill of materials and quotation pack issued", "Bulk delivery route agreed"],
    forYou:
      "Factories moving to bulk LPG should start with the peak hourly load, not the monthly total, because the vaporizer and pipework must carry the peak.",
    faqs: [
      { q: "Why does a factory need a vaporizer?", a: "At high flow, a tank cannot vaporise gas fast enough on its own, especially in cooler weather. A vaporizer turns liquid into gas at the rate the burners need." },
      { q: "What are ESD valves?", a: "Emergency shut-down valves that stop the flow of gas quickly in an emergency, placed at key points on the line." },
    ],
  },
  "faisalabad-textile-furnace-conversion": {
    metaTitle: "Textile Furnace Conversion to LPG Project, Faisalabad",
    metaDescription:
      "Conversion of a Faisalabad textile unit's furnace to LPG: burner matching, a new regulator train, commissioning burns and operator training.",
    system: "Furnace burner train converted to LPG with flame supervision",
    challenge:
      "The textile unit's furnace ran on another fuel and needed to move to LPG without losing process temperature stability, which matters for fabric quality.",
    steps: [
      { title: "Fuel train survey", text: "We surveyed the existing fuel train and matched nozzles and burners to LPG." },
      { title: "Conversion hardware", text: "An LPG burner train went in with regulators, gauges, isolation valves and flame supervision." },
      { title: "Commissioning burns", text: "Test burns checked that the furnace held stable temperatures on LPG." },
      { title: "Operator training", text: "Operators were trained on start-up, shut-down and what to do in a leak, and the maintenance team kept a laminated start-up card at the furnace." },
    ],
    checks: ["Commissioning burns with temperature stability checks", "Flame supervision tested", "Leak checks on the new train", "Operator start-up and shut-down drill"],
    forYou:
      "Textile mills facing gas curtailment can convert furnaces and boilers to LPG. The key is matching the burner to LPG and tuning it, not just connecting a new fuel line.",
    faqs: [
      { q: "Did production stop for long?", a: "The line resumed on LPG after the commissioning burns. Downtime depends on the furnace and is planned with the mill in advance." },
      { q: "Can the furnace go back to natural gas?", a: "That depends on the burner chosen. Dual-fuel options or an LPG-air system make switching easier." },
    ],
  },
  "peshawar-hospital-kitchen-manifold": {
    metaTitle: "Hospital Kitchen LPG Manifold Project, Peshawar",
    metaDescription:
      "A cylinder bank and manifold for a Peshawar hospital kitchen and laundry, with a certified-cylinder rule in the site SOP and a quarterly maintenance plan.",
    system: "Cylinder bank and manifold, kitchen and laundry on separate isolation",
    challenge:
      "The hospital's kitchen and laundry could not afford a stop in gas supply, and the facilities team wanted proof that only certified cylinders came onto the site.",
    steps: [
      { title: "Load split", text: "Kitchen and laundry loads were separated, each with its own isolation, so one could be serviced without stopping the other." },
      { title: "Cylinder bank sizing", text: "The manifold and cylinder bank were sized for continuous catering through meal peaks." },
      { title: "Certified-cylinder rule", text: "A certified-cylinder-only rule was written into the site's standard operating procedure." },
      { title: "Maintenance", text: "A quarterly AMC visit was booked after handover, with a leak detector in the maintenance kit." },
    ],
    checks: ["Separate isolation for kitchen and laundry", "Changeover tested", "Cylinder serials logged on each exchange", "Quarterly AMC scheduled"],
    forYou:
      "Hospitals need continuity first. Separate isolation per department, an automatic changeover and a written certified-cylinder rule give that, with a record the facilities team can show inspectors.",
    faqs: [
      { q: "How did the hospital track cylinders?", a: "The facilities team logged cylinder serial numbers on each exchange, which shows that only certified cylinders were used." },
      { q: "Why separate the kitchen and the laundry?", a: "So a fault or service on one does not stop the other." },
    ],
  },
  "quetta-housing-society-pipeline-riser": {
    metaTitle: "Housing Society LPG Riser and Apartments Project, Quetta",
    metaDescription:
      "A central cylinder cage, vertical riser and apartment take-offs for a Quetta housing society, tested floor by floor and commissioned before winter.",
    system: "Central cylinder cage, vertical riser, apartment take-offs with isolation",
    challenge:
      "Apartments in Quetta face freezing winters and weak pipeline pressure. The society wanted one central, safe supply instead of cylinders inside each flat.",
    steps: [
      { title: "Central cage with winter allowance", text: "The cage layout allowed for winter demand, when heaters and geysers raise use and cold weakens cylinder vaporisation." },
      { title: "Riser and take-offs", text: "A vertical riser fed each apartment through its own take-off, regulator and isolation valve." },
      { title: "Floor-by-floor testing", text: "Each floor was pressure-tested and soap-checked before gas was opened to it." },
      { title: "Resident guidance", text: "A safety leaflet told residents what to do if they smell gas." },
    ],
    checks: ["Pressure test and soap checks on every floor", "Isolation valve at each apartment", "Commissioned before peak winter", "Test record kept in the building file"],
    forYou:
      "For apartment blocks without reliable pipeline gas, a central cage and riser removes cylinders from homes. In cold cities, size the cage for winter demand.",
    faqs: [
      { q: "Does each apartment have its own shut-off?", a: "Yes. Every take-off has an isolation valve and its own regulator." },
      { q: "Why commission before winter?", a: "Winter is when demand and cold-weather problems peak, so the system was tested and running before then." },
    ],
  },
  "multan-poultry-farm-brooder-supply": {
    metaTitle: "Poultry Farm Brooder LPG Supply Project, Multan",
    metaDescription:
      "LPG supply to brooder lines for a poultry farm in the Multan belt: heat-load planning, safe cylinder placement away from litter, and farm-hand training.",
    system: "Cylinders with regulator and hose runs to brooder lines",
    challenge:
      "Chick houses need steady heat on cold nights in the first weeks of a flock. The farm needed gas to the brooders with cylinders placed safely away from dry litter and electrics.",
    steps: [
      { title: "Brooder heat load", text: "We worked out the brooder heat load for the chick houses, allowing for cold nights." },
      { title: "Safe cylinder placement", text: "Cylinders were placed at safe distances from litter and electrical points." },
      { title: "Regulator and hose runs", text: "Regulators and clipped hose runs fed the brooder lines, routed off the floor." },
      { title: "Night-check briefing", text: "Farm hands were briefed on night checks and the order for opening and closing valves." },
    ],
    checks: ["Hose runs clipped and off the litter", "Leak checks at every joint", "Pressure checked with a simple gauge", "Refill calendar agreed with the distributor"],
    forYou:
      "For brooding sheds, plan gas for the coldest nights of the first weeks, keep cylinders and hoses clear of litter, and agree a refill calendar with your dealer before the flock arrives.",
    faqs: [
      { q: "How did the farm avoid running out at night?", a: "It kept a refill calendar with the distributor's contact, so cylinders were replaced before they ran low." },
      { q: "Why keep hoses off the floor?", a: "Litter, birds and boots damage hoses on the floor, and dry litter is a fire risk near gas fittings." },
    ],
  },
  "rawalpindi-wedding-hall-cylinder-bank": {
    metaTitle: "Wedding Hall LPG Cylinder Bank Project, Rawalpindi",
    metaDescription:
      "A 45.4 kg cylinder bank with fast changeover for a Rawalpindi wedding hall, sited away from guests and generators, with an event-night refill plan.",
    system: "45.4 kg cylinder bank with changeover manifold in a locked outdoor cage",
    challenge:
      "On wedding nights the hall runs buffet lines and tandoors flat out for hours. A flame loss during a changeover in the middle of service was not acceptable.",
    steps: [
      { title: "Peak burner count", text: "We counted the burners on the buffet and tandoor lines that run together on a wedding night." },
      { title: "High-capacity bank", text: "A bank of 45.4 kg cylinders on a changeover manifold with heavy-duty regulators carried that peak and switched sides without a flame drop." },
      { title: "Cage siting", text: "The cage was placed outdoors, locked and away from guest areas and generators." },
      { title: "Event-night refill plan", text: "A standby refill plan with the local distributor covered back-to-back events." },
    ],
    checks: ["Changeover tested under load", "Cage locked and away from guests and generators", "Leak checks on every joint", "Standby refill contact agreed"],
    forYou:
      "Halls and caterers should size gas for the peak hour of the busiest night and keep a standby refill arrangement for back-to-back bookings in the wedding season.",
    faqs: [
      { q: "Why keep the cage away from generators?", a: "Generators are an ignition source and run hot. Keeping LPG storage away from them, and from guests, reduces risk." },
      { q: "How did the hall handle back-to-back events?", a: "With a standby refill plan agreed with the local distributor, so full cylinders were ready between events." },
    ],
  },
};

// Engineering depth for /services/*: why the service is needed, warning signs, a technical table, a worked sizing
// example where one applies, faults we look for, what you get in writing, rules and cost drivers.
// Figures are typical engineering values and are labelled as such on the page; site design follows the applicable
// code and the equipment maker. No customer names.

export type ServiceDetail = {
  why: string[];
  signs: string[];
  tech: { title: string; head: string[]; rows: string[][]; note: string };
  example?: { title: string; lines: string[] };
  faults: [fault: string, causeAndFix: string][];
  deliverables: string[];
  rules: string;
  costDrivers: string[];
  ctas: { mid: string; end: string; message: string };
  faqs: { q: string; a: string }[];
};

export const serviceDetail: Record<string, ServiceDetail> = {
  "lpg-pipeline-installation": {
    why: [
      "A pipeline moves the cylinders out of the kitchen or the building, which is where most serious LPG accidents start. LPG is heavier than air, so a leak from a cylinder indoors sinks and collects at floor level, in drains and in basements instead of drifting away. With a piped system, storage sits outside in a ventilated store and only a small, tested pipe enters the building.",
      "Piping also fixes a pressure problem. Each appliance needs a steady supply at its own design pressure, and long or undersized pipes lose pressure on the way. That is why a pipeline is sized from the total load and the distance to the furthest appliance, not guessed from the pipe sizes a plumber has in stock.",
    ],
    signs: [
      "Cylinders stand inside the kitchen, next to burners or under counters",
      "Flames are weaker at the far end of the line than near the cylinders",
      "Long rubber hoses run across floors or through walls",
      "You are adding appliances or opening a second kitchen",
    ],
    tech: {
      title: "How a typical two-stage LPG line is arranged",
      head: ["Part", "Typical pressure", "What it does"],
      rows: [
        ["Cylinder or tank", "Several bar (changes with temperature)", "Stores liquid LPG; vapour pressure rises in summer and falls in winter"],
        ["First-stage regulator", "Reduces to roughly 0.5–1.5 bar", "Gives a stable intermediate pressure for the main line"],
        ["Main pipeline", "Intermediate pressure", "Carries gas to the building with low losses over longer runs"],
        ["Second-stage regulator", "Reduces to appliance pressure, about 28–37 mbar", "Set at or near each appliance group"],
        ["Isolation valves", "—", "One at the store, one at each appliance, one at the building entry"],
      ],
      note: "Pressures are typical values for domestic and commercial LPG appliances. Your appliance's data plate and the applicable code set the exact figures.",
    },
    example: {
      title: "Sizing a restaurant line",
      lines: [
        "Add up the appliance ratings: for example 4 burners × 15 kW + 1 tandoor × 20 kW = 80 kW.",
        "Convert to gas flow: 80 kW ÷ 12.8 kWh per kg ≈ 6.3 kg of LPG an hour at full load.",
        "Measure the longest run from the regulator to the furthest appliance, including bends.",
        "Choose the pipe size that keeps the pressure drop to that appliance within the design limit at 6.3 kg/h.",
        "Size the cylinder bank for the same 6.3 kg/h, so the store can actually deliver what the pipe can carry.",
      ],
    },
    faults: [
      ["Rubber hose used as fixed pipework", "Hoses age, crack and get cut. Fixed runs should be rigid pipe, with short rated flexible connectors only at appliances."],
      ["Pipe undersized for new appliances", "Each appliance added since the first install takes pressure from the rest. Re-check sizing whenever the load changes."],
      ["No isolation valve at the appliance", "Without one, a fault at one burner means shutting the whole kitchen. Fit a valve per appliance."],
      ["Pipe buried or hidden without protection", "Hidden joints cannot be inspected and corrode unseen. Route pipe where it can be checked, or protect it properly."],
    ],
    deliverables: [
      "Route drawing with pipe sizes, valves and regulator positions",
      "Bill of quantities and a written price before work starts",
      "Pressure-test record signed at commissioning",
      "Shut-off and emergency briefing for your staff",
    ],
    rules: "LPG work must follow the applicable OGRA rules and the equipment maker's instructions; larger installations can also need approvals for storage. We tell you in writing which apply to your site before you commit.",
    costDrivers: [
      "Length of the run and the number of wall and floor crossings",
      "Pipe material and size, which follow from the load",
      "Number of appliances, valves and regulators",
      "Whether the cylinder store must be built or upgraded",
    ],
    ctas: {
      mid: "Send your appliance list and a photo of the route for a pipeline quote",
      end: "Get your LPG pipeline sized and priced",
      message: "Assalam o Alaikum, I need an LPG pipeline installed. ",
    },
    faqs: [
      { q: "What pressure do LPG appliances run at?", a: "Most domestic and commercial LPG appliances run at roughly 28–37 mbar at the burner, after a regulator. Check the appliance data plate." },
      { q: "Can LPG pipe run underground?", a: "Yes, with the right material and protection, but buried joints should be avoided. We choose the route and material from your site." },
    ],
  },

  "lpg-storage-tank-installation": {
    why: [
      "Once a site changes many cylinders a day, handling becomes the real cost: people, trolleys, storage space and the risk of running out between deliveries. A bulk tank replaces that with one tanker refill every few days or weeks, and gas is drawn through a fixed, tested pipeline.",
      "Tank sizing matters because a tank is never filled to the brim. Liquid LPG expands as it warms, so tanks are filled to about 80–85% of their volume, leaving vapour space. A tank that is too small means frequent deliveries; one that is too large ties up money in stock and may need wider safety distances.",
    ],
    signs: [
      "You change 45.4 kg cylinders every day or keep a large cylinder store",
      "Gas runs out between deliveries or at night",
      "You plan a boiler, furnace or LPG-air system with steady high demand",
      "Cylinder pressure drops in winter at high flow",
    ],
    tech: {
      title: "How much gas a tank holds",
      head: ["Tank water capacity", "LPG at 85% fill", "Usable before a 20% refill point"],
      rows: [
        ["2 m³", "about 0.9 tonnes", "about 0.7 tonnes"],
        ["5 m³", "about 2.3 tonnes", "about 1.8 tonnes"],
        ["10 m³", "about 4.6 tonnes", "about 3.5 tonnes"],
        ["20 m³", "about 9.2 tonnes", "about 7.0 tonnes"],
      ],
      note: "Calculated at a liquid density of 0.54 kg per litre. Actual fill limits follow the tank maker and the filling plant.",
    },
    example: {
      title: "Choosing a refill interval",
      lines: [
        "Daily use: for example 400 kg of LPG a day.",
        "A 10 m³ tank gives about 3.5 tonnes between a 20% refill point and an 85% fill.",
        "3,500 kg ÷ 400 kg a day ≈ 8–9 days between tanker drops.",
        "If the tanker can only come weekly, that leaves a margin of one to two days for delays.",
      ],
    },
    faults: [
      ["Tank sited without tanker access", "A tank the tanker cannot reach safely cannot be refilled. Check the route, turning space and hose distance first."],
      ["Too little vaporisation in winter", "A tank only vaporises so much gas naturally, and less when it is cold. High loads need a vaporizer."],
      ["Drains or pits near the tank", "Leaked LPG sinks and collects in low places. Keep drains, pits and openings away from the tank area."],
      ["No gauge or level check routine", "Running a tank dry draws residue into the line. Read the gauge on a schedule and order at the refill point."],
    ],
    deliverables: [
      "Site plan showing the tank position, distances and tanker access",
      "Tank capacity recommendation with the refill interval worked out",
      "Written list of approvals and documents for your site",
      "Commissioning and test record, and a staff safety briefing",
    ],
    rules: "Bulk LPG storage is regulated: OGRA licensing rules apply to LPG supply, and storage above certain quantities can need further licensing and safety distances. We confirm the requirements for your site in writing before installation.",
    costDrivers: [
      "Tank capacity and whether it is above ground or mounded",
      "Civil works: foundation, fencing and access",
      "Pipeline length from the tank to the plant or kitchen",
      "Vaporizer, if your load or climate needs one",
    ],
    ctas: {
      mid: "Send your daily gas use for a tank size and refill plan",
      end: "Request a bulk tank site assessment",
      message: "Assalam o Alaikum, I need an LPG storage tank. ",
    },
    faqs: [
      { q: "Why is an LPG tank filled only to about 85%?", a: "Liquid LPG expands as it warms. The vapour space stops pressure rising dangerously on hot days." },
      { q: "How often will my tank need a refill?", a: "Divide the usable gas in the tank by your daily use. The table and example on this page show how." },
    ],
  },

  "lpg-manifold-and-cylinder-bank-installation": {
    why: [
      "A single cylinder can only turn so much liquid into gas. The liquid cools as it boils, and below a certain rate the cylinder simply cannot keep up, so pressure falls and burners weaken. A manifold connects several cylinders so they share the load, which keeps pressure steady at high demand.",
      "A two-bank manifold with an automatic changeover regulator also ends the mid-service run-out. When the duty bank empties, the regulator switches to the standby bank without anyone touching a valve, and the indicator shows which bank to replace.",
    ],
    signs: [
      "Frost or sweating appears on the cylinder during use",
      "Flames drop at peak hours, then recover when demand falls",
      "Staff change cylinders during service",
      "You connect several appliances to one or two cylinders",
    ],
    tech: {
      title: "How many cylinders a bank needs (45.4 kg cylinders)",
      head: ["Peak load", "Gas flow", "Cylinders per bank (mild weather)", "Cylinders per bank (cold weather)"],
      rows: [
        ["25 kW", "about 2 kg/h", "2", "3–4"],
        ["50 kW", "about 4 kg/h", "3–4", "6–8"],
        ["100 kW", "about 8 kg/h", "6–8", "a vaporizer is usually better"],
      ],
      note: "Rule of thumb only: sustained draw from a 45.4 kg cylinder is roughly 1–1.5 kg/h in mild weather and much less near 0 °C. Each bank is matched by an equal standby bank.",
    },
    faults: [
      ["Bank sized for average, not peak", "The cylinders cope off-peak and fail at rush hour. Size from the peak load."],
      ["Manual changeover", "Someone must notice the empty bank in time. An automatic changeover regulator removes that risk."],
      ["Damaged or old pigtails", "The flexible connectors between cylinder and manifold wear out. Replace them on a schedule."],
      ["Cylinders stored in the sun or in a closed room", "Heat raises pressure; a closed room traps leaks. Use a shaded, ventilated, locked store."],
    ],
    deliverables: [
      "Load calculation and number of cylinders per bank",
      "Store layout: position, ventilation, signage and access",
      "Leak and pressure test record at handover",
      "Changeover and cylinder-replacement briefing for staff",
    ],
    rules: "Cylinder stores must keep cylinders upright, ventilated and away from drains, ignition sources and building openings, following OGRA rules and the regulator maker's instructions.",
    costDrivers: [
      "Number of cylinders per bank, set by peak load",
      "Automatic versus manual changeover",
      "Building or upgrading the cylinder store",
      "Pipeline length from the store to the appliances",
    ],
    ctas: {
      mid: "Send your appliance ratings and we size the cylinder bank",
      end: "Get a two-bank manifold quoted for your site",
      message: "Assalam o Alaikum, I need an LPG manifold / cylinder bank. ",
    },
    faqs: [
      { q: "Why does my cylinder freeze on the outside?", a: "Liquid LPG cools as it boils off. Frost means the cylinder is being drawn faster than it can vaporise; a manifold with more cylinders fixes it." },
      { q: "What is an automatic changeover regulator?", a: "A regulator that switches from the empty duty bank to the full standby bank by itself and shows which bank needs replacing." },
    ],
  },

  "lpg-air-sng-systems": {
    why: [
      "Burners built for natural gas cannot simply be switched to pure LPG, because LPG vapour carries far more energy per cubic metre. LPG-air, also called synthetic natural gas (SNG), mixes vaporised LPG with air in a controlled ratio so the mix burns like natural gas in the same burners.",
      "This makes LPG-air useful for factories and housing networks that run on Sui gas but suffer curtailment or have no connection yet. The same burners and pipes can switch between pipeline gas and LPG-air, which avoids converting every appliance.",
    ],
    signs: [
      "Your plant has natural-gas burners and faces winter curtailment",
      "A housing network is built for natural gas but has no supply yet",
      "Converting each burner to LPG would be expensive or slow",
      "You need a backup fuel that runs through the existing pipework",
    ],
    tech: {
      title: "Why LPG-air works in natural-gas burners",
      head: ["Gas", "Typical heat per m³", "Behaviour in a natural-gas burner"],
      rows: [
        ["Natural gas", "about 37–39 MJ", "Designed for it"],
        ["Propane vapour", "about 93 MJ", "Far too much heat through the same orifice; unsafe without conversion"],
        ["LPG-air (roughly 55% LPG, 45% air)", "close to natural gas in burner behaviour", "Runs with limited adjustment"],
      ],
      note: "Burner behaviour depends on the Wobbe index, not heat value alone. The exact LPG-to-air ratio is set for your gas and burners during commissioning.",
    },
    example: {
      title: "Why the mix itself does not burn in the pipe",
      lines: [
        "Propane only burns when it makes up about 2–10% of a gas–air mixture.",
        "An LPG-air mix with more than half LPG is far above that range.",
        "So the mix in the pipe is too rich to ignite; it only burns at the burner, where more air joins it.",
      ],
    },
    faults: [
      ["Unstable mixing ratio", "A drifting ratio changes flame size and can cause flame lift or yellow tipping. The blender and its controls must hold the set ratio."],
      ["Vaporizer too small", "LPG-air plants need liquid vaporised at the full plant flow; an undersized vaporizer starves the mixer."],
      ["Poor changeover with pipeline gas", "The two supplies must never feed the line at the same time. The changeover is part of the design."],
      ["No mix analysis at commissioning", "The ratio should be checked against the burners in operation, not only set on paper."],
    ],
    deliverables: [
      "Feasibility note: load, ratio, tank and vaporizer size",
      "Process and layout drawings for the plant",
      "Commissioning record with mixing ratio and burner checks",
      "Operating and changeover procedure for your team",
    ],
    rules: "An LPG-air plant combines bulk storage, vaporisation and mixing, so storage and installation approvals apply. We confirm them for your site in writing before design is fixed.",
    costDrivers: [
      "Plant capacity in kg per hour of LPG",
      "Tank and vaporizer size",
      "Blender type and controls",
      "Integration with the existing natural-gas network",
    ],
    ctas: {
      mid: "Send your natural-gas load for an LPG-air feasibility note",
      end: "Ask for an LPG-air design for your plant or society",
      message: "Assalam o Alaikum, I want to discuss an LPG-air (SNG) system. ",
    },
    faqs: [
      { q: "Is LPG-air the same as natural gas?", a: "No, but it is mixed so that it burns in natural-gas burners in a similar way. It is made from LPG and air at your site." },
      { q: "Can we switch back to Sui gas later?", a: "Yes. LPG-air systems are designed so the burners and pipes can return to pipeline gas." },
    ],
  },

  "boiler-and-furnace-conversion-to-lpg": {
    why: [
      "Plants convert boilers and furnaces to LPG for three reasons: pipeline gas is curtailed or unavailable, diesel and furnace oil cost more in maintenance, or the process needs cleaner heat. LPG burns without soot, so heat exchangers and furnace linings stay cleaner and need less downtime.",
      "A conversion is more than a new fuel line. The burner must be matched to LPG, the flame safety system must suit gas, and combustion must be tuned with a flue gas analyser so the boiler runs at its rated efficiency. Skipping the tuning wastes fuel every hour the boiler runs.",
    ],
    signs: [
      "Your boiler stops during gas curtailment",
      "Oil firing brings soot, smoke complaints or frequent nozzle cleaning",
      "Fuel cost per tonne of steam keeps rising",
      "A food or textile process needs a cleaner flame",
    ],
    tech: {
      title: "Comparing fuels by heat, not by price per unit",
      head: ["Fuel", "Typical heat content", "Notes"],
      rows: [
        ["LPG", "about 46 MJ per kg", "Clean burning; needs storage and vaporisation at high loads"],
        ["Diesel", "about 36 MJ per litre", "Needs oil pumps, nozzles and regular cleaning"],
        ["Furnace oil", "about 40 MJ per kg", "Needs heating before it can be pumped and atomised"],
        ["Natural gas", "about 37–39 MJ per m³", "Lowest handling if supply is reliable"],
      ],
      note: "Compare cost per MJ using your own prices: price per unit ÷ heat per unit. Boiler efficiency changes the result.",
    },
    example: {
      title: "How much LPG a boiler needs",
      lines: [
        "Making 1 tonne of steam an hour takes roughly 750–800 kW of fuel input in a typical boiler.",
        "800 kW ÷ 12.8 kWh per kg ≈ 62 kg of LPG an hour.",
        "At 16 hours a day that is about 1 tonne of LPG a day, which is bulk-tank territory.",
      ],
    },
    faults: [
      ["Using the oil burner with a gas line added", "Dual-fuel burners exist, but an oil burner is not a gas burner. Use a burner rated for LPG."],
      ["No combustion tuning", "An untuned burner wastes fuel and can produce carbon monoxide. Tune it with a flue gas analyser at commissioning."],
      ["Gas train missing safety devices", "Gas burners need proper shut-off valves, pressure switches and flame supervision."],
      ["Supply not sized for the boiler", "A boiler at full fire draws a lot of gas. The tank, vaporizer and pipe must match its maximum, not its average."],
    ],
    deliverables: [
      "Survey of the boiler or furnace, flue and controls",
      "Burner and gas train specification",
      "Commissioning record with flue gas readings",
      "Fuel use estimate per tonne of steam or per batch",
    ],
    rules: "Conversions must follow the boiler and burner makers' instructions and the applicable boiler and LPG rules. We name the inspections and approvals your site needs in the written scope.",
    costDrivers: [
      "Burner and gas train, set by the boiler rating",
      "Supply: cylinders, bank or bulk tank with vaporizer",
      "Flue and control changes",
      "Downtime planning during the changeover",
    ],
    ctas: {
      mid: "Send your boiler rating and current fuel use for a conversion estimate",
      end: "Get a written boiler or furnace conversion quote",
      message: "Assalam o Alaikum, I want to convert a boiler/furnace to LPG. ",
    },
    faqs: [
      { q: "Is LPG cheaper than diesel for a boiler?", a: "Compare cost per MJ with this month's prices, then allow for maintenance savings. Use the LPG vs diesel cost calculator." },
      { q: "Can a boiler run on both natural gas and LPG?", a: "Yes, with the right burner or an LPG-air system. The changeover must be designed so both fuels never feed the burner together." },
    ],
  },

  "lpg-safety-audit-and-inspection": {
    why: [
      "Most LPG incidents start small: a hardened hose, a regulator past its life, a cylinder stored indoors, a leak nobody can smell over cooking. LPG is given a strong smell so leaks can be noticed, but busy kitchens and plant rooms mask it, and gas that sinks into drains or basements may not be smelt until it ignites.",
      "A safety audit looks at the whole system with fresh eyes: storage, pipework, appliances, ventilation and what staff would do in an emergency. You get a written list of what to fix, ranked by risk, so the urgent items are done first.",
    ],
    signs: [
      "No one has checked the system since it was installed",
      "You smell gas from time to time but cannot find the source",
      "An insurer, landlord or auditor has asked for a safety report",
      "Appliances, pipework or the cylinder store have changed",
    ],
    tech: {
      title: "What an LPG safety audit checks",
      head: ["Area", "What we look at", "Typical finding"],
      rows: [
        ["Storage", "Position, ventilation, drains, signage, upright cylinders", "Cylinders indoors or near drains"],
        ["Cylinders", "Test date, damage, valve and seal condition", "Dented or overdue cylinders in use"],
        ["Hoses and regulators", "Age, cracks, clamps, rating for the load", "Hardened hoses, wrong regulator"],
        ["Pipework", "Leak test, supports, isolation valves", "Missing appliance valves"],
        ["Appliances", "Flame picture, flame failure devices, flues", "Yellow flames from dirty burners"],
        ["People", "Shut-off knowledge, emergency steps, extinguishers", "Staff unsure where to shut off"],
      ],
      note: "Leak checks use soap solution or an electronic detector, never a flame.",
    },
    faults: [
      ["Gas smell with no visible leak", "Often a slow leak at a hose clamp or regulator joint. A soap or detector test finds it."],
      ["Yellow, lazy flames", "Dirty burners or the wrong pressure. Incomplete burning wastes gas and can produce carbon monoxide."],
      ["Cylinders below ground level", "LPG sinks and pools in basements and pits. Storage belongs at or above ground, outdoors."],
      ["No emergency plan", "Staff should know to close the valve, stop ignition sources, ventilate and leave."],
    ],
    deliverables: [
      "Written audit report with findings ranked by risk",
      "Photos of each finding",
      "Fix list with what to do first",
      "Optional re-check after the fixes",
    ],
    rules: "We check against OGRA safety requirements for LPG use, the equipment makers' instructions and common good practice. The report states what each finding is measured against.",
    costDrivers: [
      "Size of the site and number of gas points",
      "Number of cylinder stores and appliances",
      "Whether pipework must be pressure-tested",
      "Re-check visits after fixes",
    ],
    ctas: {
      mid: "Book an LPG safety audit for your site",
      end: "Get a written safety report before the next inspection",
      message: "Assalam o Alaikum, I need an LPG safety audit. ",
    },
    faqs: [
      { q: "How often should an LPG system be audited?", a: "At least once a year for commercial sites, and after any change to appliances, pipework or storage." },
      { q: "Do you fix what the audit finds?", a: "We can, under a separate quote. The report is yours to act on with any competent team." },
    ],
  },

  "lpg-maintenance-and-amc": {
    why: [
      "LPG systems wear quietly. Rubber hoses harden, regulator diaphragms age, clamps loosen with vibration and burners clog. None of this is visible from the kitchen, which is why problems are usually found when something fails at the worst moment.",
      "An annual maintenance contract (AMC) turns that into a schedule: visits on fixed dates, parts replaced before they fail, and a written record of every check. Many commercial sites need that record anyway for insurers, landlords or audits.",
    ],
    signs: [
      "Hoses and regulators have not been replaced in years",
      "Faults are fixed only after they stop service",
      "You need maintenance records for an audit or insurer",
      "Several sites or kitchens need the same standard",
    ],
    tech: {
      title: "A typical maintenance schedule",
      head: ["Item", "Check", "Typical interval"],
      rows: [
        ["Hoses", "Cracks, hardening, clamps", "Every visit; replace at the first sign of wear"],
        ["Regulators", "Outlet pressure, leaks, vent", "Every visit; replace at the maker's interval"],
        ["Pipework and valves", "Leak test, valve operation", "Quarterly or half-yearly"],
        ["Burners and appliances", "Flame picture, cleaning, flame failure devices", "Quarterly"],
        ["Cylinder store", "Ventilation, signage, damaged cylinders", "Every visit"],
      ],
      note: "Intervals are typical and are set in the contract from your load, hours and site conditions.",
    },
    faults: [
      ["Regulator outlet pressure drifts", "Ageing diaphragms change the setting, so burners run rich or weak. Measure it at each visit."],
      ["Burner efficiency falls", "Blocked ports waste gas. Cleaning can cut consumption noticeably."],
      ["Changeover regulator stuck", "The standby bank does not cut in. Test the changeover at each visit."],
      ["Visit records missing", "Without records, faults repeat and audits fail. Every visit gets a written report."],
    ],
    deliverables: [
      "Contract with visit frequency, response times and prices in writing",
      "Visit report after every visit",
      "List of parts replaced and what is due next",
      "Annual summary for audits and insurers",
    ],
    rules: "Maintenance follows the equipment makers' instructions and OGRA safety requirements for LPG use. Any work that needs a licensed installer is done by one.",
    costDrivers: [
      "Visit frequency and number of sites",
      "Size of the system and number of appliances",
      "Response time agreed for faults",
      "Parts included or charged separately",
    ],
    ctas: {
      mid: "Send your site details for an AMC proposal",
      end: "Put your LPG system on a maintenance schedule",
      message: "Assalam o Alaikum, I want an LPG maintenance contract (AMC). ",
    },
    faqs: [
      { q: "What does an AMC cost?", a: "It depends on the size of the system and visit frequency. We quote after a site review." },
      { q: "How fast do you respond to a fault?", a: "Priority response times are written into each AMC. Outside a contract we confirm a visit window for your street when you call." },
    ],
  },

  "lpg-cylinder-testing-and-inspection": {
    why: [
      "An LPG cylinder is a pressure vessel. Steel weakens with corrosion, dents and heat, and a cylinder that has been dropped, burnt or rusted can fail under pressure. That is why cylinders carry a test date and are periodically requalified, and why damaged ones are taken out of service.",
      "In Pakistan, cylinder testing and certification is carried out by authorised bodies such as the Hydrocarbon Development Institute of Pakistan (HDIP). For you as a user, the practical checks are the test date stamped on the cylinder, its condition and the seal on the valve.",
    ],
    signs: [
      "The test date on the cylinder collar has passed or is unreadable",
      "The cylinder has dents, deep scratches, rust patches or fire damage",
      "The valve is bent, leaking or has no seal",
      "You run a large fleet of cylinders and need a testing routine",
    ],
    tech: {
      title: "What to check on a cylinder",
      head: ["Check", "What it means", "Action"],
      rows: [
        ["Test date (on the collar or shroud)", "When the cylinder was last requalified", "Refuse a cylinder past its test date"],
        ["Tare weight (TW)", "The empty cylinder's weight", "Gross weight minus tare equals the gas you received"],
        ["Dents and gouges", "Weakened wall", "Refuse; it must be inspected"],
        ["Rust, pitting or fire damage", "Thinner or weakened steel", "Refuse"],
        ["Valve and seal", "Leak risk and tampering", "Refuse a cylinder without an intact seal"],
      ],
      note: "Ask your distributor for the current testing interval for your cylinder type. The stamped test date and the current rules, not appearance alone, decide whether a cylinder may be filled.",
    },
    example: {
      title: "Checking you received full gas",
      lines: [
        "Find the tare weight (TW) stamped on the cylinder, for example 15.0 kg.",
        "Weigh the full cylinder on a scale, for example 26.8 kg.",
        "26.8 − 15.0 = 11.8 kg of gas, which is a full domestic cylinder.",
      ],
    },
    faults: [
      ["Cylinders past their test date in use", "Common in large fleets. A register of cylinder numbers and test dates stops it."],
      ["Underweight fills", "Weighing against the tare weight shows it at once."],
      ["Leaking valves", "Worn valve seats or damaged threads. The cylinder goes back for repair, never a home fix."],
      ["Cylinders stored lying down", "Liquid can reach the valve. Always store and use cylinders upright."],
    ],
    deliverables: [
      "Inspection of your cylinder fleet with numbers and test dates",
      "List of cylinders to withdraw, requalify or replace",
      "Arrangement of testing through an authorised facility",
      "A simple register to track test dates",
    ],
    rules: "Cylinder testing and requalification follow the applicable standards and are done by authorised facilities. We arrange testing through them and do not certify cylinders ourselves unless authorised to do so.",
    costDrivers: [
      "Number and size of cylinders",
      "Cylinders needing repair or replacement",
      "Transport to and from the testing facility",
      "Whether you want a recurring inspection schedule",
    ],
    ctas: {
      mid: "Send your cylinder count for an inspection and testing plan",
      end: "Get your cylinder fleet checked and registered",
      message: "Assalam o Alaikum, I need LPG cylinder testing/inspection. ",
    },
    faqs: [
      { q: "Where is the test date on an LPG cylinder?", a: "It is stamped on the collar or shroud around the valve, often with the tare weight (TW)." },
      { q: "How do I know my cylinder is full?", a: "Weigh it and subtract the stamped tare weight. The difference should match the net gas, for example 11.8 kg for a domestic cylinder." },
    ],
  },
};

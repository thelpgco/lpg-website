import { hasPublicProjects } from "@/lib/projects";

export type Service = {
  slug: string;
  name: string;
  short: string;
  audience: string;
  intro: string;
  scope: string[];
  process: { title: string; text: string }[];
  needFromYou: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "lpg-pipeline-installation",
    name: "LPG Pipeline Installation",
    short: "Piped LPG for kitchens, buildings and plants, designed and installed by our engineers.",
    audience: "Restaurants, hotels, housing societies, factories, large homes",
    intro:
      "A piped LPG system replaces loose cylinders at each burner with a central supply, which is safer to manage and easier to refill. We design the route, size the pipe for the load, install it and pressure-test it before gas is connected — nationwide across Pakistan, with your street confirmed before work starts.",
    scope: [
      "Load calculation and pipe sizing for the appliances on the line",
      "Route planning, supports and protection against damage",
      "Installation of pipework, valves and regulators",
      "Pressure and leak testing before commissioning",
      "Handover with an operating and emergency shut-off briefing",
    ],
    process: [
      { title: "Load and route survey", text: "We list every appliance on the line, note its gas rating and walk the intended pipe route to find the supply point, wall crossings and areas that need protection." },
      { title: "Pipe sizing and drawing", text: "From the total load we size each pipe run and regulator, mark valve and isolation points, and give you a drawing and bill of quantities with a written price." },
      { title: "Pipework installation", text: "Our team fits supports, pipe, valves and regulators along the agreed route, with protection where the pipe crosses walls, floors or areas open to damage." },
      { title: "Pressure test and commissioning", text: "The line is pressure-tested and leak-checked before gas is connected, and each appliance is lit and checked. You get a shut-off and emergency briefing at handover." },
    ],
    needFromYou: ["Site address and type of building", "List of gas appliances and their rating", "Floor plan or photos of the kitchen or plant area"],
    faqs: [
      { q: "Do you design the system or only install it?", a: "Both. Our engineering team assesses the site, sizes the system and installs it, so one team is responsible from design to handover." },
      { q: "Can existing cylinders be connected to a pipeline?", a: "In most cases yes, through a cylinder bank or manifold. We confirm this at the site assessment." },
      { q: "Is a site visit always needed?", a: "For small jobs we can often quote from photos and measurements. For larger systems we visit before we quote." },
      { q: "Can you install outside major cities?", a: "Yes where a competent crew and certified supply can reach the site. We confirm coverage for your city and street before you agree." },
    ],
  },
  {
    slug: "lpg-storage-tank-installation",
    name: "LPG Storage Tank Installation",
    short: "Bulk LPG storage tank siting, installation and commissioning for sites with high gas use.",
    audience: "Factories, hotels, hospitals, farms, large commercial sites",
    intro:
      "Sites that use a lot of gas can store it in a bulk tank instead of many cylinders. A tank installation depends on the site layout, safety distances and approvals, so we start with an assessment before recommending a tank size — available nationwide where tanker access and approvals allow.",
    scope: [
      "Assessment of site layout, access and safety distances",
      "Recommendation of tank capacity from your gas demand",
      "Foundation and installation coordination",
      "Connection to the site pipeline with valves and safety fittings",
      "Commissioning, testing and a safety briefing for your staff",
    ],
    process: [
      { title: "Demand and site survey", text: "We review your daily gas use, delivery access for a bulk tanker and the space available, then mark where a tank could sit within the safety distances that apply." },
      { title: "Tank sizing and approvals check", text: "We recommend a tank capacity for your demand and refill interval, and tell you in writing which approvals and documents apply to your site before you commit." },
      { title: "Foundation and tank placement", text: "The tank base is prepared to specification and the tank is positioned and fixed, with earthing and protection from vehicle impact where needed." },
      { title: "Piping, safety fittings and commissioning", text: "We connect the tank to your line with valves, gauges and relief fittings, test the system, and brief your staff on normal operation and emergency shut-off." },
    ],
    needFromYou: ["Monthly or daily gas use if known", "Site plan showing the proposed tank area", "Details of buildings and boundaries nearby"],
    faqs: [
      { q: "What size tank do I need?", a: "It depends on your daily consumption and how often you want refills. We size it from your load at the assessment and do not guess from a phone call." },
      { q: "Are approvals required?", a: "Bulk storage is regulated. We tell you at assessment what applies to your site and help with the documentation." },
      { q: "Do you also supply the gas after installation?", a: "Yes. Bulk and cylinder supply can run through the same nationwide network; refill windows are confirmed for your street." },
    ],
  },
  {
    slug: "lpg-manifold-and-cylinder-bank-installation",
    name: "LPG Manifold and Cylinder Bank Installation",
    short: "Manifold systems that connect several cylinders to one supply line, with changeover.",
    audience: "Restaurants, hotels, catering sites, workshops",
    intro:
      "A cylinder bank connects several cylinders to a manifold so that gas keeps flowing while an empty cylinder is replaced. It is the usual next step for a kitchen that has outgrown one or two loose cylinders — installed nationwide for restaurants, hotels and catering sites.",
    scope: [
      "Manifold and regulator selection for your load",
      "Cylinder storage area layout and ventilation advice",
      "Pipe connection to the kitchen or process line",
      "Leak testing and commissioning",
      "Training staff to change cylinders safely",
    ],
    process: [
      { title: "Count burners and cylinders", text: "We note how many burners and appliances run at peak, how many cylinders you use per week and where the cylinders can be stored outdoors or in a ventilated space." },
      { title: "Choose manifold layout", text: "We select the manifold, number of cylinder positions, changeover regulator and pigtails for your load, and agree the layout and price in writing." },
      { title: "Build the bank and connect the line", text: "The manifold is mounted in the storage area, cylinders are connected, and the line runs to your kitchen or process area with isolation valves." },
      { title: "Leak test and staff training", text: "We leak-test every joint, check changeover works as cylinders empty, and train your staff to change cylinders and shut the bank down safely." },
    ],
    needFromYou: ["Number and type of burners or appliances", "Photos of the intended cylinder area", "How many cylinders you use per week"],
    faqs: [
      { q: "How many cylinders can a bank hold?", a: "It depends on your load and the space available. We design the bank for your site rather than selling a fixed size." },
      { q: "Can you supply the cylinders as well?", a: "Yes. We arrange cylinders with gas through our distributor network; they should carry OGRA certification markings — check on delivery. Installation and supply can come from one company." },
      { q: "How long does installation take?", a: "Small kitchen banks are often completed in a short site window once materials are on hand. We confirm the schedule for your street after the written quote." },
    ],
  },
  {
    slug: "lpg-air-sng-systems",
    name: "LPG Air Mixing (SNG) Systems",
    short: "LPG-air mixing systems that can stand in for natural gas on certain sites.",
    audience: "Industrial and large commercial sites",
    intro:
      "An LPG-air system mixes vaporised LPG with air to produce a gas that can run equipment designed for natural gas. Whether it suits your site depends on your equipment and gas demand, so we assess first — available for industrial sites nationwide where the load justifies it.",
    scope: [
      "Review of your equipment and gas demand",
      "System design including vaporisation and mixing",
      "Installation and integration with existing pipework",
      "Testing and commissioning",
    ],
    process: [
      { title: "Equipment and gas-demand review", text: "We list the equipment that must keep running, its rated gas flow and calorific needs, and your current gas source, so we can check an LPG-air mix would suit it." },
      { title: "Mixing system design", text: "We size the vaporiser, air blending unit and buffer storage for your peak demand, and set out a written scope and price with the limits of the system." },
      { title: "Plant installation and tie-in", text: "The vaporiser and mixing skid are installed and tied in to your existing pipework, with isolation and safety interlocks as specified in the design." },
      { title: "Mix tuning and commissioning", text: "We test the gas mix on your equipment, adjust it to the target values, and show your operators how to run and monitor the system." },
    ],
    needFromYou: ["Equipment list with gas ratings", "Current gas source and monthly use", "Site layout"],
    faqs: [
      { q: "Is this right for every site?", a: "No. It suits specific cases. We tell you honestly at assessment if another option fits better." },
      { q: "Do you supply bulk LPG after conversion?", a: "Yes where a tanker route serves your plant. See bulk LPG supply; we confirm the route for your site before you agree." },
    ],
  },
  {
    slug: "boiler-and-furnace-conversion-to-lpg",
    name: "Boiler and Furnace Conversion to LPG",
    short: "Converting boilers, furnaces and burners to run on LPG, with burner selection and tuning.",
    audience: "Factories, laundries, food processors, poultry farms",
    intro:
      "If your boiler or furnace runs on another fuel, or your gas supply is unreliable, converting to LPG can be an option. We check the equipment, select a suitable burner, convert and tune it, and test the result — for plants across Pakistan.",
    scope: [
      "Equipment inspection and suitability check",
      "Burner selection and installation",
      "Fuel train, regulators and safety controls",
      "Tuning and combustion check",
      "Testing and operator handover",
    ],
    process: [
      { title: "Equipment inspection", text: "We inspect the boiler or furnace, record its make, rating and condition, and check with you whether conversion is sensible for that equipment." },
      { title: "Burner and fuel train selection", text: "We select a burner to match the unit's output, then specify the regulators, valves and safety controls for the LPG fuel train." },
      { title: "Burner fitting and fuel connection", text: "The burner and fuel train are fitted and connected to your LPG supply, and the old fuel supply is isolated safely." },
      { title: "Combustion tuning and handover", text: "We light the unit, tune the air-to-fuel ratio, check combustion readings and safety trips, and brief your operators before handover." },
    ],
    needFromYou: ["Make, model and rating of the boiler or furnace", "Current fuel and monthly consumption", "Photos of the burner and plant room"],
    faqs: [
      { q: "Will conversion save me money?", a: "That depends on your current fuel cost and LPG price. We do not promise savings without your numbers; we can run the comparison with you." },
      { q: "Can every boiler be converted?", a: "Not always. We confirm at inspection whether conversion is sensible for your equipment." },
      { q: "Do you work in industrial estates outside the main cities?", a: "Yes where our engineering team and supply partners can reach the plant. Coverage is confirmed for your address before you agree." },
    ],
  },
  {
    slug: "lpg-safety-audit-and-inspection",
    name: "LPG Safety Audit and Inspection",
    short: "A documented safety check of your LPG installation, with findings and recommended fixes.",
    audience: "Restaurants, hotels, factories, housing societies, schools",
    intro:
      "If you already use LPG at scale, an inspection finds leaks, ageing hoses, poor storage and missing safety equipment before they cause an incident. You receive a written report of what we found and what we recommend — audits available nationwide on request.",
    scope: [
      "Visual and instrument inspection of cylinders, hoses, regulators and pipework",
      "Leak checks at joints and connections",
      "Review of cylinder storage and ventilation",
      "Written findings with priorities",
      "Re-check after you complete the fixes, if you want one",
    ],
    process: [
      { title: "Request an audit", text: "Tell us the site type and size." },
      { title: "On-site inspection", text: "An engineer inspects the installation against a checklist." },
      { title: "Written report", text: "You receive findings, photos and a priority list." },
      { title: "Fixes and re-check", text: "We can carry out repairs and re-inspect, or you can use your own contractor." },
    ],
    needFromYou: ["Site address", "Number of cylinders or size of the installation", "Preferred visit time"],
    faqs: [
      { q: "Will the audit shut down my kitchen?", a: "We plan the visit around your service times and keep disruption short." },
      { q: "What does an audit cost?", a: "It depends on site size and number of cylinders or appliances. We quote after a short brief; there is no fixed public price list." },
    ],
  },
  {
    slug: "lpg-maintenance-and-amc",
    name: "LPG Maintenance Services and AMC",
    short: "Scheduled maintenance and annual maintenance contracts for LPG systems.",
    audience: "Hotels, restaurants, factories, hospitals, housing societies",
    intro:
      "LPG systems need regular attention: hoses age, regulators wear and connections loosen. An annual maintenance contract (AMC) schedules inspections and covers repairs under agreed terms, so problems are caught early — available for commercial and industrial sites nationwide.",
    scope: [
      "Scheduled inspection visits",
      "Replacement of worn hoses, regulators and fittings",
      "Leak checks and pressure tests",
      "Priority response for faults, as agreed in the contract",
      "A service record for each visit",
    ],
    process: [
      { title: "Site review", text: "We review the installation and agree what to cover." },
      { title: "Contract terms", text: "Visit frequency, response times and prices are agreed in writing." },
      { title: "Scheduled visits", text: "We inspect and maintain on the agreed schedule and record each visit." },
    ],
    needFromYou: ["Site details and installation size", "Any existing service records", "Preferred visit frequency"],
    faqs: [
      { q: "What does an AMC cost?", a: "It depends on the size of the system and visit frequency. We quote after a site review." },
      { q: "How fast do you respond to a fault?", a: "Priority response times are written into each AMC. Outside a contract we aim to reply within a few minutes during active hours and confirm a visit window for your street." },
    ],
  },
  {
    slug: "lpg-cylinder-testing-and-inspection",
    name: "LPG Cylinder Testing and Inspection",
    short: "Inspection of cylinders for condition, valves and certification before refilling or use.",
    audience: "Distributors, commercial users, institutions",
    intro:
      "A cylinder in poor condition is a hazard. We inspect cylinders for visible damage, corrosion, valve condition and certification markings, and advise which are fit to stay in service — for commercial users and institutions across Pakistan.",
    scope: [
      "Visual inspection for dents, corrosion and damage",
      "Valve and seal condition check",
      "Check of markings and certification details",
      "Advice on when a cylinder is due for periodic hydrostatic re-test, and on cylinders that should be withdrawn",
    ],
    process: [
      { title: "Share your cylinder details", text: "Tell us the number, type and location of the cylinders, and any test dates stamped on them." },
      { title: "Checklist inspection", text: "Our team checks each cylinder for dents, corrosion, valve and seal condition and legible markings, and sorts them into keep, re-test and withdraw." },
      { title: "Re-test advice", text: "For cylinders past their test date we explain what a hydrostatic re-test involves and that it is carried out at a licensed test station, not on your site." },
      { title: "Written report", text: "You receive a list of cylinders fit for service, those due for re-test and those to withdraw." },
    ],
    needFromYou: ["Number and size of cylinders", "Location", "Any available certification details"],
    faqs: [
      { q: "Do you carry out hydrostatic testing yourselves?", a: "Our inspection is a visual and valve check. Hydrostatic re-testing is done at a licensed test station; we tell you which cylinders are due and what to ask for." },
      { q: "Do you replace cylinders that fail?", a: "Yes. We can arrange replacement cylinders through our network; check the OGRA marking and condition on delivery." },
      { q: "Can you inspect a commercial kitchen's bottles on site?", a: "Yes. We visit the site, check markings and condition, and leave a written list of keep, re-test and withdraw cylinders." },
    ],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/** Index services when the active mode has project profiles (production showcase or demo catalogue). */
export const servicesIndexable = hasPublicProjects();


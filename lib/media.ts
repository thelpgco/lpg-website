/** Site image catalog — every file under public/images. Alts include natural keywords. */

export type MediaItem = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

export const media = {
  // Cylinders
  cylPlain: {
    id: "cylPlain",
    src: "/images/cylinders/01-steel-cylinder-studio-plain.png",
    alt: "Red LPG cylinder in Pakistan — full body steel gas cylinder for home delivery",
    caption: "Steel LPG cylinder",
  },
  cylCloseupLogo: {
    id: "cylCloseupLogo",
    src: "/images/cylinders/04-steel-cylinder-closeup-lpg-logo.png",
    alt: "LPG gas cylinder close-up with LPG marking and valve for refill orders in Pakistan",
    caption: "LPG cylinder close-up",
  },
  cylDomestic: {
    id: "cylDomestic",
    src: "/images/cylinders/11-domestic-cylinder-branded-front.png",
    alt: "Domestic LPG cylinder Pakistan — 11.8 kg steel cylinder with gas for home use",
    caption: "Domestic LPG cylinder",
  },
  cylDomesticAlt: {
    id: "cylDomesticAlt",
    src: "/images/cylinders/12-domestic-cylinder-branded-alt.png",
    alt: "LPG cylinder with gas Pakistan — domestic steel bottle front view",
    caption: "Domestic LPG cylinder (alt)",
  },
  cylStamp: {
    id: "cylStamp",
    src: "/images/cylinders/13-cylinder-shoulder-stamp-tw.png",
    alt: "LPG cylinder certification marking close-up — stamped weight and pressure on steel cylinder",
    caption: "Cylinder shoulder marking",
  },
  cylSpecLabel: {
    id: "cylSpecLabel",
    src: "/images/cylinders/14-cylinder-printed-spec-label.png",
    alt: "LPG cylinder label showing tare weight capacity and pressure specs in Pakistan",
    caption: "Printed cylinder specs",
  },
  cyl454: {
    id: "cyl454",
    src: "/images/cylinders/15-commercial-45-4kg-full.png",
    alt: "45.4 kg commercial LPG cylinder Pakistan — large steel cylinder for restaurants",
    caption: "45.4 kg commercial cylinder",
  },
  cyl454Specs: {
    id: "cyl454Specs",
    src: "/images/cylinders/16-commercial-45-4kg-specs.png",
    alt: "Commercial LPG cylinder price size 45.4 kg — specification markings on the tank",
    caption: "45.4 kg specs",
  },
  cylLineup: {
    id: "cylLineup",
    src: "/images/cylinders/17-size-lineup-5-118-15-454.png",
    alt: "LPG cylinder sizes in Pakistan — 5 kg, 11.8 kg, 15 kg and 45.4 kg cylinders side by side",
    caption: "LPG cylinder sizes lineup",
  },
  cylLineupAlt: {
    id: "cylLineupAlt",
    src: "/images/cylinders/18-size-lineup-alt.png",
    alt: "LPG bottle sizes Pakistan — four steel LPG cylinders from small domestic to commercial",
    caption: "Cylinder sizes (alt)",
  },
  compositeFront: {
    id: "compositeFront",
    src: "/images/cylinders/20-composite-cylinder-front.png",
    alt: "Composite LPG cylinder Pakistan — fibre LPG cylinder with gas, lighter than steel",
    caption: "Composite fibre LPG cylinder",
  },
  compositeLevel: {
    id: "compositeLevel",
    src: "/images/cylinders/21-composite-liquid-level.png",
    alt: "LPG fiber cylinder showing gas level through translucent composite body",
    caption: "Composite cylinder gas level",
  },
  compositeLabel: {
    id: "compositeLabel",
    src: "/images/cylinders/22-composite-label-12-5kg.png",
    alt: "Composite LPG cylinder label 12.5 kg — fibre cylinder specs Made in Pakistan",
    caption: "Composite cylinder label",
  },
  compositeAngle: {
    id: "compositeAngle",
    src: "/images/cylinders/23-composite-three-quarter.png",
    alt: "LPG composite cylinder three-quarter view for home LPG supply in Pakistan",
    caption: "Composite cylinder angle",
  },

  // Accessories
  regHoseStudio: {
    id: "regHoseStudio",
    src: "/images/accessories/29-cylinder-regulator-hose-studio.png",
    alt: "LPG regulator and hose on cylinder — safe LPG connection kit for home delivery Pakistan",
    caption: "Regulator and hose on cylinder",
  },
  regHoseClose: {
    id: "regHoseClose",
    src: "/images/accessories/31-regulator-hose-closeup.png",
    alt: "LPG regulator close-up with orange hose clamp — LPG safety connection detail",
    caption: "Regulator hose close-up",
  },
  hoseKit: {
    id: "hoseKit",
    src: "/images/accessories/63-lpg-hose-regulator-kit.png",
    alt: "LPG hose pipe and regulator kit with clamps for LPG cylinder installation in Pakistan",
    caption: "LPG hose and regulator kit",
  },

  // Appliances
  stoveFront: {
    id: "stoveFront",
    src: "/images/appliances/53-lpg-stove-front.png",
    alt: "LPG stove price in Pakistan — two-burner stainless LPG gas stove front view",
    caption: "LPG gas stove",
  },
  stoveAngle: {
    id: "stoveAngle",
    src: "/images/appliances/54-lpg-stove-angle.png",
    alt: "LPG gas stove Pakistan — double burner LPG stove angled product photo",
    caption: "LPG stove angle",
  },
  stoveBadge: {
    id: "stoveBadge",
    src: "/images/appliances/55-lpg-stove-badge-closeup.png",
    alt: "LPG stove brand plate close-up on stainless gas stove for cylinder connection",
    caption: "Stove badge detail",
  },
  geyserFront: {
    id: "geyserFront",
    src: "/images/appliances/56-lpg-geyser-front.png",
    alt: "LPG geyser price in Pakistan — wall-mounted LPG instant geyser front view",
    caption: "LPG geyser",
  },
  geyserAngle: {
    id: "geyserAngle",
    src: "/images/appliances/57-lpg-geyser-angle.png",
    alt: "LPG instant geyser Pakistan — tankless LPG water heater side angle",
    caption: "LPG geyser angle",
  },
  geyserAlt: {
    id: "geyserAlt",
    src: "/images/appliances/58-lpg-geyser-front-alt.png",
    alt: "LPG gas geyser in Pakistan — white tankless geyser for home hot water",
    caption: "LPG geyser (alt)",
  },
  heaterFront: {
    id: "heaterFront",
    src: "/images/appliances/61-lpg-heater-front.png",
    alt: "LPG heater in Pakistan — cabinet LPG room heater with ceramic panels glowing",
    caption: "LPG room heater",
  },
  heaterAngle: {
    id: "heaterAngle",
    src: "/images/appliances/62-lpg-heater-angle.png",
    alt: "LPG heaters Pakistan — portable LPG gas heater angled view for winter use",
    caption: "LPG heater angle",
  },

  // Cities
  islamabad: {
    id: "islamabad",
    src: "/images/cities/45-islamabad-faisal-mosque.png",
    alt: "LPG gas Islamabad — Faisal Mosque and Margalla Hills view for Islamabad LPG supply",
    caption: "Islamabad",
  },
  bazaar: {
    id: "bazaar",
    src: "/images/cities/47-city-bazaar-generic.png",
    alt: "LPG delivery areas in Pakistan — busy city bazaar street where LPG supply is needed",
    caption: "City market street",
  },
  lahore: {
    id: "lahore",
    src: "/images/cities/49-lahore-badshahi-mosque.png",
    alt: "LPG in Lahore — Badshahi Mosque area for LPG price and home delivery in Lahore",
    caption: "Lahore",
  },
  karachi: {
    id: "karachi",
    src: "/images/cities/51-karachi-mazar-e-quaid.png",
    alt: "LPG in Karachi — Mazar-e-Quaid view for LPG price and cylinder delivery in Karachi",
    caption: "Karachi",
  },

  // Collages
  collageCatalog: {
    id: "collageCatalog",
    src: "/images/collages/26-catalog-collage.png",
    alt: "LPG cylinder product catalog collage — valves seals sizes and markings overview",
    caption: "Cylinder catalog collage",
  },
  collageOgra: {
    id: "collageOgra",
    src: "/images/collages/27-catalog-grid-ogra-art.png",
    alt: "LPG cylinder inspection grid — OGRA approved marking and size panels for Pakistan",
    caption: "Cylinder inspection grid",
  },
  collageEquip: {
    id: "collageEquip",
    src: "/images/collages/28-equipment-showcase.png",
    alt: "LPG equipment showcase — heaters hoses bulk tanks and manifold installation overview",
    caption: "LPG equipment showcase",
  },

  // Projects
  bulkTanks: {
    id: "bulkTanks",
    src: "/images/projects/64-bulk-tanks-yard.png",
    alt: "Bulk LPG supply Pakistan — LPG storage tanks and piping in an industrial yard",
    caption: "Bulk LPG tanks",
  },
  manifold: {
    id: "manifold",
    src: "/images/projects/65-manifold-gauges.png",
    alt: "LPG pipeline installation — manifold valves and pressure gauges for LPG engineering",
    caption: "LPG manifold detail",
  },

  // Office / brand
  officeExt1: {
    id: "officeExt1",
    src: "/images/hold-ai/05-office-exterior-ai-hq-1.png",
    alt: "THE LPG CO. PAKISTAN office exterior — LPG company building Islamabad",
    caption: "Office exterior",
  },
  officeExt2: {
    id: "officeExt2",
    src: "/images/hold-ai/06-office-exterior-ai-hq-2.png",
    alt: "LPG company office Pakistan — entrance of THE LPG CO. PAKISTAN headquarters",
    caption: "Office entrance",
  },
  officeExt3: {
    id: "officeExt3",
    src: "/images/hold-ai/07-office-exterior-ai-hq-3.png",
    alt: "OGRA-licensed LPG marketer office — THE LPG CO. PAKISTAN building front view",
    caption: "Office front",
  },
  officeReception: {
    id: "officeReception",
    src: "/images/hold-ai/08-office-reception-ai-1.png",
    alt: "LPG company reception Islamabad — THE LPG CO. PAKISTAN office interior desk",
    caption: "Office reception",
  },
  officeLobby: {
    id: "officeLobby",
    src: "/images/hold-ai/09-office-lobby-ai.png",
    alt: "LPG office lobby Pakistan — waiting area inside THE LPG CO. PAKISTAN",
    caption: "Office lobby",
  },
  officeStaff: {
    id: "officeStaff",
    src: "/images/hold-ai/10-office-staff-faces-ai.png",
    alt: "LPG customer service desk Pakistan — staff at THE LPG CO. PAKISTAN reception",
    caption: "Customer service desk",
  },

  // Warehouse / empty-filled
  warehouseCylinders: {
    id: "warehouseCylinders",
    src: "/images/hold-ai/02-warehouse-14-2kg-indane-style.png",
    alt: "LPG cylinders in warehouse Pakistan — rows of red steel LPG gas cylinders ready for supply",
    caption: "Cylinder warehouse stock",
  },
  emptyFilled: {
    id: "emptyFilled",
    src: "/images/hold-ai/19-empty-vs-filled-graphic-gauges.png",
    alt: "Empty vs filled LPG cylinder comparison — how much gas remains in a 45.4 kg cylinder",
    caption: "Empty vs filled cylinder",
  },

  // Delivery
  deliveryUnload: {
    id: "deliveryUnload",
    src: "/images/hold-ai/03-delivery-unload-face.png",
    alt: "LPG home delivery Pakistan — worker unloading LPG cylinders from a delivery truck",
    caption: "Unloading LPG cylinders",
  },
  deliveryTruck: {
    id: "deliveryTruck",
    src: "/images/hold-ai/34-delivery-truck-worker-face.png",
    alt: "LPG delivery truck Pakistan — branded vehicle loaded with LPG cylinders for home delivery",
    caption: "LPG delivery truck",
  },
  doorstepCustomer: {
    id: "doorstepCustomer",
    src: "/images/hold-ai/35-doorstep-customer-face.png",
    alt: "Order LPG online Pakistan — doorstep cylinder delivery to the customer",
    caption: "Doorstep LPG delivery",
  },
  deliveryTeam: {
    id: "deliveryTeam",
    src: "/images/hold-ai/36-delivery-team-faces.png",
    alt: "LPG cylinder delivery team handing over a refill cylinder from the truck",
    caption: "Delivery team handover",
  },
  doorstepHandover: {
    id: "doorstepHandover",
    src: "/images/hold-ai/37-doorstep-handover-face.png",
    alt: "LPG home delivery service — deliveryman placing LPG cylinder at the door",
    caption: "Doorstep handover",
  },
  commercialKitchen: {
    id: "commercialKitchen",
    src: "/images/hold-ai/38-commercial-kitchen-chef-face.png",
    alt: "Commercial LPG supply Pakistan — LPG cylinder in a restaurant kitchen",
    caption: "Commercial kitchen LPG",
  },
  doorstepAlt: {
    id: "doorstepAlt",
    src: "/images/hold-ai/48-doorstep-delivery-face.png",
    alt: "LPG near me delivery — cylinder handoff at a residential doorway in Pakistan",
    caption: "Residential delivery",
  },
  familyDoorstep: {
    id: "familyDoorstep",
    src: "/images/hold-ai/66-family-doorstep-faces.png",
    alt: "LPG home delivery to family — cylinder delivered at the house entrance",
    caption: "Family doorstep delivery",
  },
  restaurantDelivery: {
    id: "restaurantDelivery",
    src: "/images/hold-ai/67-restaurant-delivery-faces.png",
    alt: "Restaurant LPG supply Pakistan — 45.4 kg cylinder delivery to a commercial kitchen",
    caption: "Restaurant LPG delivery",
  },
  restaurantHandoff: {
    id: "restaurantHandoff",
    src: "/images/hold-ai/68-restaurant-handoff-alt.png",
    alt: "Commercial LPG cylinder delivery — chef receiving LPG gas cylinder at restaurant",
    caption: "Restaurant cylinder handoff",
  },
  islamabadDelivery: {
    id: "islamabadDelivery",
    src: "/images/hold-ai/46-islamabad-delivery-composite.png",
    alt: "LPG gas Islamabad delivery — home cylinder delivery with Islamabad landmark backdrop",
    caption: "Islamabad LPG delivery",
  },
  lahoreDelivery: {
    id: "lahoreDelivery",
    src: "/images/hold-ai/50-lahore-delivery-composite.png",
    alt: "LPG Lahore home delivery — cylinder delivery service in Lahore Pakistan",
    caption: "Lahore LPG delivery",
  },
  karachiDelivery: {
    id: "karachiDelivery",
    src: "/images/hold-ai/52-karachi-delivery-composite.png",
    alt: "LPG in Karachi delivery — doorstep LPG cylinder supply in Karachi",
    caption: "Karachi LPG delivery",
  },

  // Installs / lifestyle
  kitchen45: {
    id: "kitchen45",
    src: "/images/hold-ai/24-kitchen-45kg-unrealistic.png",
    alt: "LPG cylinder connected to kitchen stove — LPG gas for cooking in Pakistan",
    caption: "Kitchen LPG hookup",
  },
  kitchenFlame: {
    id: "kitchenFlame",
    src: "/images/hold-ai/30-kitchen-lifestyle-flame.png",
    alt: "LPG gas stove with blue flame — cooking on LPG cylinder in a Pakistan home kitchen",
    caption: "LPG cooking flame",
  },
  balcony: {
    id: "balcony",
    src: "/images/hold-ai/32-balcony-install-ai.png",
    alt: "LPG cylinder outdoor storage on balcony — safe LPG installation for home supply",
    caption: "Balcony cylinder install",
  },
  utilityNook: {
    id: "utilityNook",
    src: "/images/hold-ai/33-utility-nook-ai.png",
    alt: "LPG cylinder storage at home — domestic LPG bottle in a utility area",
    caption: "Home utility LPG storage",
  },
  familyKitchen: {
    id: "familyKitchen",
    src: "/images/hold-ai/59-family-kitchen-faces.png",
    alt: "What is LPG used for — family cooking with LPG cylinder and gas stove in Pakistan",
    caption: "Family kitchen with LPG",
  },
  motherSon: {
    id: "motherSon",
    src: "/images/hold-ai/60-mother-son-kitchen.png",
    alt: "LPG for home cooking Pakistan — kitchen stove running on LPG cylinder gas",
    caption: "Home LPG cooking",
  },
  familyDinner: {
    id: "familyDinner",
    src: "/images/hold-ai/61-family-dinner-faces.png",
    alt: "LPG gas in Pakistan homes — family meal prepared with LPG cylinder supply",
    caption: "Home cooked with LPG",
  },

  // Order / digital
  orderLaptop: {
    id: "orderLaptop",
    src: "/images/hold-ai/62-order-laptop-scene.png",
    alt: "Order LPG online in Pakistan — requesting LPG cylinder delivery from a laptop",
    caption: "Order LPG online",
  },
  orderMobile: {
    id: "orderMobile",
    src: "/images/hold-ai/63-mobile-app-fiction.png",
    alt: "Order LPG cylinder by phone — mobile request for 11.8 kg or 45.4 kg LPG delivery",
    caption: "Mobile LPG order",
  },

  // Licence / docs
  licenceOfficial: {
    id: "licenceOfficial",
    src: "/images/trust/ogra-licence-information-thelpgco.png",
    alt: "OGRA licensing information for THE LPG CO. PAKISTAN — licence number and company details",
    caption: "OGRA licensing information",
  },
  licenceDesk: {
    id: "licenceDesk",
    src: "/images/hold-ai/39-licence-sample-desk.png",
    alt: "OGRA licence and compliance Pakistan — LPG company licence document on desk",
    caption: "Licence documents",
  },
  ograLicence: {
    id: "ograLicence",
    src: "/images/hold-ai/40-ogra-licence-sample.png",
    alt: "OGRA LPG marketing licence Pakistan — Oil and Gas Regulatory Authority licence",
    caption: "OGRA licence",
  },
  inspectionCert: {
    id: "inspectionCert",
    src: "/images/hold-ai/41-inspection-cert-sample.png",
    alt: "LPG cylinder testing and inspection certificate — passed inspection",
    caption: "Cylinder inspection certificate",
  },
  ograPriceScreen: {
    id: "ograPriceScreen",
    src: "/images/hold-ai/42-ogra-price-monitor-sample.png",
    alt: "OGRA LPG notified price Pakistan — checking LPG rate per kg on office screen",
    caption: "OGRA price check",
  },

  // People / network
  executiveHead: {
    id: "executiveHead",
    src: "/images/hold-ai/43-executive-headshot-ai.png",
    alt: "THE LPG CO. PAKISTAN leadership portrait — LPG company team",
    caption: "Leadership portrait",
  },
  executiveDesk: {
    id: "executiveDesk",
    src: "/images/hold-ai/44-executive-desk-ai.png",
    alt: "LPG company director at desk — THE LPG CO. PAKISTAN office team",
    caption: "Office leadership",
  },
  warehouseStaff: {
    id: "warehouseStaff",
    src: "/images/hold-ai/64-warehouse-staff-face.png",
    alt: "LPG distributor network Pakistan — warehouse staff with commercial 45.4 kg cylinders",
    caption: "Warehouse stock",
  },
  shopfront: {
    id: "shopfront",
    src: "/images/hold-ai/65-retail-shopfront-ai.png",
    alt: "LPG shop and agency Pakistan — retail LPG cylinder storefront for dealers",
    caption: "LPG retail shopfront",
  },
} as const satisfies Record<string, MediaItem>;

export type MediaId = keyof typeof media;

export const allMedia: MediaItem[] = Object.values(media);

/** Galleries by page path (every image used at least once across these sets). */
export const galleries: Record<string, MediaId[]> = {
  "/": [
    "cylLineup",
    "officeExt1",
    "deliveryTruck",
    "stoveFront",
    "heaterFront",
    "geyserFront",
    "orderLaptop",
    "islamabad",
  ],
  "/about/": [
    "officeExt1",
    "officeExt2",
    "officeExt3",
    "officeReception",
    "officeLobby",
    "officeStaff",
    "executiveHead",
    "executiveDesk",
    "warehouseStaff",
    "bulkTanks",
  ],
  "/contact/": ["officeExt2", "officeReception", "officeLobby"],
  "/licences-and-compliance/": ["licenceOfficial", "cylStamp", "inspectionCert", "collageOgra"],
  "/lpg-cylinders/": [
    "cylDomestic",
    "cylDomesticAlt",
    "cylPlain",
    "cylCloseupLogo",
    "cylStamp",
    "cylSpecLabel",
    "cyl454",
    "compositeFront",
    "compositeLevel",
    "compositeLabel",
    "compositeAngle",
    "collageCatalog",
  ],
  "/lpg-cylinder-sizes-in-pakistan/": ["cylLineup", "cylLineupAlt", "cyl454", "cyl454Specs", "cylSpecLabel"],
  "/lpg-cylinder-price-in-pakistan/": ["cylLineup", "cyl454Specs", "emptyFilled", "ograPriceScreen"],
  "/lpg-price-in-pakistan/": ["ograPriceScreen", "cylLineup", "cylDomestic"],
  "/lpg-price-per-kg-in-pakistan/": ["ograPriceScreen", "cylSpecLabel"],
  "/ogra-lpg-notified-price/": ["ograPriceScreen", "ograLicence"],
  "/lpg-home-delivery/": [
    "regHoseStudio",
    "deliveryTruck",
    "deliveryUnload",
    "doorstepCustomer",
    "deliveryTeam",
    "doorstepHandover",
    "doorstepAlt",
    "familyDoorstep",
  ],
  "/order-lpg/": ["orderLaptop", "orderMobile", "doorstepCustomer", "cylDomestic", "deliveryTruck"],
  "/lpg-safety/": ["regHoseClose", "hoseKit", "regHoseStudio", "balcony", "utilityNook", "cylStamp"],
  "/what-to-do-if-you-smell-gas/": ["regHoseClose", "utilityNook"],
  "/what-is-lpg/": ["familyKitchen", "motherSon", "familyDinner", "kitchenFlame", "cylDomestic"],
  "/how-it-works/": ["orderLaptop", "deliveryTeam", "doorstepHandover", "regHoseStudio"],
  "/delivery-areas/": ["islamabad", "lahore", "karachi", "bazaar", "islamabadDelivery"],
  "/partner-standards/": ["inspectionCert", "cylStamp", "warehouseCylinders"],
  // Trust pages: no AI office/staff/shopfront as "network proof". Real photos can be added later.
  "/our-network/": [],
  "/become-an-lpg-distributor/": [],
  "/services/": ["bulkTanks", "manifold", "collageEquip", "commercialKitchen"],
  "/lpg-price-in-pakistan/karachi/": ["karachi", "karachiDelivery", "cylDomestic"],
  "/lpg-price-in-pakistan/lahore/": ["lahore", "lahoreDelivery", "cylDomestic"],
  "/pricing-policy/": [],
  "/lpg-bowser/": ["bulkTanks", "manifold", "collageEquip"],
  "/lpg-supply-in-pakistan/": ["bulkTanks", "cylLineup", "deliveryTruck"],
  "/shop/": [
    "stoveFront",
    "geyserFront",
    "heaterFront",
    "hoseKit",
    "cylLineup",
    "commercialKitchen",
  ],
  "/gallery/": allMedia.map((m) => m.id as MediaId),
};

export function itemsFor(path: string): MediaItem[] {
  const ids = galleries[path] || [];
  return ids.map((id) => media[id]);
}

/** Kept for callers that still import it; public UI never labels images as illustrative. */
export function isIllustrativeSrc(src: string): boolean {
  return /hold-ai|-ai-|-ai\.|sample/i.test(src);
}

export function illustrativeCaption(_src: string, caption?: string, _demo = false): string | undefined {
  if (!caption) return undefined;
  return caption.replace(/\s*\(illustrative\)\.?/gi, "").trim() || undefined;
}

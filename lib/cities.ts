export type City = {
  slug: string;
  name: string;
  emirate: string;
  areas: string[];
  blurb: string;
  note: string;
};

export const cities: City[] = [
  {
    slug: "dubai",
    name: "Dubai",
    emirate: "Dubai",
    areas: ["Deira", "Bur Dubai", "Jumeirah", "Al Quoz", "Business Bay", "Dubai Marina", "Al Barsha", "Jebel Ali"],
    blurb: "Dense apartment towers, villa communities and a large number of restaurants and industrial units.",
    note: "Many towers have their own rules on cylinder storage and delivery access. Tell the supplier your building name and floor so they can plan the drop.",
  },
  {
    slug: "abu-dhabi",
    name: "Abu Dhabi",
    emirate: "Abu Dhabi",
    areas: ["Khalidiyah", "Al Mushrif", "Al Reem Island", "Yas Island", "Mussafah", "Al Wahda"],
    blurb: "Island and mainland neighbourhoods, plus the Mussafah industrial zone with high commercial gas demand.",
    note: "For industrial sites in Mussafah, mention it in your request so the right commercial or bulk supplier handles it.",
  },
  {
    slug: "sharjah",
    name: "Sharjah",
    emirate: "Sharjah",
    areas: ["Al Nahda", "Al Majaz", "Al Khan", "Muweilah", "Industrial Area", "Al Taawun"],
    blurb: "Family neighbourhoods, many small restaurants and a busy industrial area.",
    note: "Include your nearest landmark. Many Sharjah addresses are easier to find by landmark than by street.",
  },
  {
    slug: "ajman",
    name: "Ajman",
    emirate: "Ajman",
    areas: ["Al Nuaimiya", "Al Rashidiya", "Al Jurf", "Industrial Area", "Al Rawda"],
    blurb: "Residential districts with growing demand from small shops, cafes and workshops.",
    note: "Share the building name and flat number for apartment deliveries.",
  },
  {
    slug: "ras-al-khaimah",
    name: "Ras Al Khaimah",
    emirate: "Ras Al Khaimah",
    areas: ["Al Nakheel", "Al Dhait", "Al Hamra", "Julfar", "Al Qusaidat"],
    blurb: "Residential neighbourhoods, hotels and a large industrial base.",
    note: "Mention whether you need household cylinders or commercial and industrial supply.",
  },
  {
    slug: "fujairah",
    name: "Fujairah",
    emirate: "Fujairah",
    areas: ["Fujairah City", "Mirbah", "Dibba Al-Fujairah", "Al Faseel"],
    blurb: "East-coast homes and businesses, including hotels and workshops.",
    note: "Delivery to outlying areas can take longer. The supplier confirms timing on the callback.",
  },
  {
    slug: "umm-al-quwain",
    name: "Umm Al Quwain",
    emirate: "Umm Al Quwain",
    areas: ["Old Town", "Al Salamah", "Al Raas", "Falaj Al Mualla"],
    blurb: "Quieter residential areas with small businesses and farms.",
    note: "For farms or remote sites, share a map pin when the supplier calls back.",
  },
  {
    slug: "al-ain",
    name: "Al Ain",
    emirate: "Abu Dhabi",
    areas: ["Al Jimi", "Al Mutawaa", "Al Hili", "Zakher", "Al Ain Industrial Area"],
    blurb: "Villa-heavy neighbourhoods and a steady commercial and industrial customer base inland.",
    note: "Villas often keep cylinders outdoors. Agree the placement with the supplier so it is ventilated and shaded.",
  },
];

export const cityBySlug = (slug: string) => cities.find((c) => c.slug === slug);

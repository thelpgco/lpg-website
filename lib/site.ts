// Central business settings for THE LPG CO. PAKISTAN (thelpgco.pk).
// Owner updates 26–27 Oct 2026. Env vars can override public contact values.

const digits = (s: string) => s.replace(/\D/g, "");

export const site = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "THE LPG CO. PAKISTAN",
  shortName: "THE LPG CO.",
  legalName: "THE LPG CO. PAKISTAN",
  domain: "thelpgco.pk",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://thelpgco.pk").replace(/\/$/, ""),
  foundedYear: 1999,

  phone: digits(process.env.NEXT_PUBLIC_PHONE || "923394022940"),
  whatsapp: digits(process.env.NEXT_PUBLIC_WHATSAPP || "923394022940"),
  phoneDisplay: "+92 339 4022940",
  email: process.env.NEXT_PUBLIC_EMAIL || "",

  licenceNumber: "09024041999",
  licenceBody: "Oil and Gas Regulatory Authority (OGRA)",

  office: {
    line1: "Office #99, Service Road, Sector G-12",
    city: "Islamabad",
    region: "Islamabad Capital Territory",
    country: "Pakistan",
    countryCode: "PK",
  },

  /** Public byline — do not publish personal reviewer names on the site (owner 27 Oct 2026). */
  safetyReviewer: {
    name: "THE LPG CO. safety team",
    role: "In-house safety review",
    experience: "UK-trained specialists with 12+ years in LPG operations; the team reviews safety pages before they go live",
  },

  socialHandle: "thelpgco",
  social: {
    facebook: "https://www.facebook.com/thelpgco",
    instagram: "https://www.instagram.com/thelpgco",
    linkedin: "https://www.linkedin.com/company/thelpgco",
    x: "https://x.com/thelpgco",
    youtube: "https://www.youtube.com/@thelpgco",
  },

  responseTime: "within a few minutes",
  deliveryTarget: "about one hour in covered network areas (confirmed on each order)",

  country: "Pakistan",
  countryCode: "PK",
  locale: "en-PK",
  currency: "PKR",
  timezone: "Asia/Karachi",

  tagline: "OGRA-licensed LPG manufacturer, marketer and nationwide supply network",
  description:
    "THE LPG CO. PAKISTAN is an OGRA-licensed LPG marketer and distributor, manufacturer of standard cylinders and appliances, and a referral partner. Cylinders, refills, composite cylinders, appliances and LPG engineering through our Pakistan network.",
} as const;

export function addressLine(): string {
  const o = site.office;
  return `${o.line1}, ${o.city}, ${o.country}`;
}

export function telHref(): string | null {
  return site.phone ? `tel:+${site.phone}` : null;
}

export function whatsappHref(message = "Assalam o Alaikum, I need LPG supply. "): string | null {
  const n = site.whatsapp || site.phone;
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(message)}` : null;
}

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function sameAsProfiles(): string[] {
  return Object.values(site.social);
}

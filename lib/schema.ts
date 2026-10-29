import safety from "@/data/safety-review.json";
import { lastmodOf } from "./pages";
import { cylinderPrice, latestPrice, pkr } from "./prices";
import { absoluteUrl, sameAsProfiles, site } from "./site";

// JSON-LD builders. Rule (Method Step 15.8): schema describes only what is visible on the page and what is true.
const ORG_ID = absoluteUrl("/#organization");

// Owner-confirmed 24/7 support (29 Oct 2026).
const ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const OPEN_24_7 = { "@type": "OpeningHoursSpecification", dayOfWeek: ALL_DAYS, opens: "00:00", closes: "23:59" };

export function organizationNode() {
  const o = site.office;
  const sameAs = sameAsProfiles();
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/logo.png"),
    image: absoluteUrl("/logo.png"),
    description: `OGRA-licensed LPG marketer and distributor (licence ${site.licenceNumber}) supplying LPG cylinders, bulk LPG and LPG engineering across Pakistan.`,
    telephone: `+${site.phone}`,
    foundingDate: String(site.foundedYear),
    ...(site.email ? { email: site.email } : {}),
    identifier: { "@type": "PropertyValue", name: "OGRA licence number", value: site.licenceNumber },
    address: {
      "@type": "PostalAddress",
      streetAddress: o.line1,
      addressLocality: o.city,
      addressRegion: o.region,
      addressCountry: o.countryCode,
    },
    areaServed: { "@type": "Country", name: site.country },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${site.phone}`,
      contactType: "customer support",
      areaServed: "PK",
      availableLanguage: ["en", "ur"],
      hoursAvailable: OPEN_24_7,
    },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function localBusinessNode() {
  // Same entity as organizationNode (shared @id), typed as a local business for the office pages. Map coordinates
  // are left out until the owner sends the Google Maps pin (docs/content-plan/OWNER_TODO.md).
  const org = organizationNode();
  const low = cylinderPrice(5);
  const high = cylinderPrice(45.4);
  return {
    ...org,
    "@type": "LocalBusiness",
    openingHoursSpecification: OPEN_24_7,
    ...(latestPrice && low && high ? { priceRange: `${pkr(low)} – ${pkr(high)}`, currenciesAccepted: "PKR" } : {}),
  };
}

/** Product + Offer for a cylinder refill: price is gas only (kg × OGRA rate); deposit and delivery are quoted. */
export function cylinderProductNode(opts: { path: string; name: string; description: string; kg: number; image: string }) {
  const price = cylinderPrice(opts.kg);
  const n = latestPrice;
  const validUntil = n
    ? new Date(Date.UTC(Number(n.month.slice(0, 4)), Number(n.month.slice(5, 7)), 0)).toISOString().slice(0, 10)
    : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: opts.name,
    description: opts.description,
    image: absoluteUrl(opts.image),
    url: absoluteUrl(opts.path),
    category: "LPG cylinder",
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            price: String(price),
            priceCurrency: "PKR",
            availability: "https://schema.org/InStock",
            url: absoluteUrl(opts.path),
            ...(validUntil ? { priceValidUntil: validUntil } : {}),
            seller: { "@id": ORG_ID },
          },
        }
      : {}),
  };
}

export function webSiteNode() {
  return { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: absoluteUrl("/"), inLanguage: site.locale };
}

export function articleNode(opts: { path: string; headline: string; description: string }) {
  const lm = lastmodOf(opts.path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: absoluteUrl(opts.path),
    inLanguage: site.locale,
    image: absoluteUrl("/opengraph-image/"),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(lm ? { datePublished: lm, dateModified: lm } : {}),
  };
}

// The review date for a page (data/safety-review.json). Per-page dates; null until the reviewer signs that page off.
export function reviewDateFor(path: string): string | null {
  const s = safety as { reviewedOn?: string | null; pages?: Record<string, string | null> };
  return s.pages?.[path] ?? s.reviewedOn ?? null;
}

// Reviewer markup is emitted only after the reviewer has signed off that page.
export function reviewedPageNode(opts: { path: string; name: string }) {
  const reviewedOn = reviewDateFor(opts.path);
  if (!reviewedOn) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    url: absoluteUrl(opts.path),
    lastReviewed: reviewedOn,
    reviewedBy: { "@id": ORG_ID },
  };
}

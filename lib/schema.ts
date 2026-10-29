import safety from "@/data/safety-review.json";
import { lastmodOf } from "./pages";
import { absoluteUrl, sameAsProfiles, site } from "./site";

// JSON-LD builders. Rule (Method Step 15.8): schema describes only what is visible on the page and what is true.
const ORG_ID = absoluteUrl("/#organization");

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
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function localBusinessNode() {
  return { "@context": "https://schema.org", "@type": "LocalBusiness", "@id": ORG_ID, name: site.name, url: absoluteUrl("/") };
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
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    ...(lm ? { dateModified: lm } : {}),
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
    reviewedBy: { "@type": "Organization", name: site.safetyReviewer.name, url: absoluteUrl("/") },
  };
}

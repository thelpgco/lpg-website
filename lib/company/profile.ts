/**
 * Single source of truth for company presentation copy.
 * Facts from owner answers / site.ts / commercial-terms — keep consistent across pages.
 */
import { site, addressLine } from "@/lib/site";
import { terms } from "@/lib/commercial";

export const company = {
  name: site.name,
  shortName: site.shortName,
  legalName: site.legalName,
  tradingName: site.shortName,
  domain: site.domain,
  foundedYear: site.foundedYear,
  /** ~21 years from 1999 through 2026 management review. */
  yearsOperating: Math.max(1, new Date().getFullYear() - site.foundedYear),
  tagline: site.tagline,
  summary: site.description,
  licenceNumber: site.licenceNumber,
  licenceBody: site.licenceBody,
  phoneDisplay: site.phoneDisplay,
  officeAddress: addressLine(),
  office: site.office,
  social: site.social,
  safetyTeam: site.safetyReviewer,
  deliveryTarget: site.deliveryTarget,
  responseTime: site.responseTime,

  activities: [
    "LPG marketing and distribution under OGRA licence",
    "Manufacture and supply of standard LPG cylinders and related appliances",
    "Domestic cylinder refill, exchange and new connections through the network",
    "Commercial and industrial LPG supply (cylinder banks, bulk and engineering)",
    "LPG engineering: pipelines, manifolds, tanks, conversions, audits and AMC",
  ] as const,

  residential: [
    "Home cylinder delivery and refill",
    "Empty-for-full exchange where eligible",
    "New domestic connections (cylinder, regulator, hose)",
    "Guidance on sizes, regulators and safe first use",
  ] as const,

  commercial: [
    "Restaurant and hotel kitchen supply (often 45.4 kg)",
    "Institutional and catering volumes",
    "Standing commercial refill routes where partners cover the area",
  ] as const,

  industrial: [
    "Bulk and bowser-fed supply discussions",
    "Cylinder banks and vaporizers for process heat",
    "Consumption estimates and quotation inputs for factories",
  ] as const,

  engineering: [
    "Pipeline and manifold installation",
    "Storage tank installation support",
    "Boiler and furnace conversion to LPG",
    "Safety audits, inspection and maintenance (AMC)",
  ] as const,

  products: [
    "Steel cylinders: 5, 11.8, 15 and 45.4 kg gas weight",
    "Composite (fibre) cylinders where stocked",
    "Regulators, hoses and accessories",
    "Domestic and commercial appliances (stove, geyser, heater, burners) — stock confirmed on order",
  ] as const,

  terms: {
    deposit: terms.deposit,
    exchange: terms.exchange,
    newEmpty: terms.newEmpty,
    delivery: terms.delivery,
    delivery247: terms.delivery247Note,
    stock: terms.stockPolicy,
    sameOgraRateAllCities: terms.sameOgraRateAllCities,
  },

  aboutBlurb: `${site.shortName} is an OGRA-licensed LPG marketer and distributor (licence ${site.licenceNumber}), operating since ${site.foundedYear} from ${addressLine()}. We are a full-service LPG company for Pakistan: residential and commercial cylinders, bulk and industrial supply, and engineering (pipelines, manifolds, tanks, conversions) through a nationwide distributor network — trusted, certified-cylinder supply with delivery confirmed to your street.`,
} as const;

export type CompanyProfile = typeof company;

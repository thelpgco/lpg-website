import raw from "@/data/commercial-terms.json";

export type CommercialTerms = {
  sameOgraRateAllCities: boolean;
  deposit: string;
  exchange: string;
  newEmpty: string;
  delivery: string;
  delivery247Note: string;
  partnersCertifiedCylindersOnly: boolean;
  partnersCertifiedRule: string;
  responseTime: string;
  manufacturer: boolean;
  stockPolicy: string;
};

export const terms = raw as CommercialTerms;

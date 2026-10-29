// Client-safe lead form options (no Node imports). Server-side validation lives in lib/leads.ts.
export const requestTypes = [
  { value: "cylinder_delivery", label: "LPG cylinder refill / home delivery", kind: "customer" },
  { value: "composite_cylinder", label: "Composite (fibre) cylinder with gas", kind: "customer" },
  { value: "new_connection", label: "New LPG connection / first cylinder", kind: "customer" },
  { value: "commercial_supply", label: "Restaurant / commercial supply", kind: "customer" },
  { value: "bulk_industrial", label: "Bulk or industrial supply", kind: "customer" },
  { value: "appliances", label: "Stove, heater, geyser or accessories", kind: "customer" },
  { value: "engineering", label: "LPG engineering service / quotation", kind: "engineering" },
  { value: "distributor", label: "I want to become a distributor or partner", kind: "distributor" },
  { value: "other", label: "Something else", kind: "customer" },
] as const;

export const cylinderSizes = [
  { value: "", label: "Not sure / not applicable" },
  { value: "5", label: "5 kg" },
  { value: "11.8", label: "11.8 kg (domestic)" },
  { value: "15", label: "15 kg" },
  { value: "45.4", label: "45.4 kg (commercial)" },
  { value: "composite", label: "Composite / fibre cylinder" },
] as const;

// Consent wording shown next to the checkbox. If you change the text, change the version: the version is stored with
// every lead so you can prove which wording the person agreed to (Method Step 14 / Step 20).
export const CONSENT_VERSION = "2026-10-26-v1";
export const CONSENT_TEXT =
  "I agree to be contacted by phone or WhatsApp about this request, and for my details to be shared with the distributor who will serve my area.";

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referrer?: string;
  landing_path?: string;
};

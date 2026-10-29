import { promises as fs } from "fs";
import path from "path";
import { allCities } from "./network";
import { CONSENT_VERSION, cylinderSizes, requestTypes, type Attribution } from "./lead-options";
import { pageId } from "./pages";

export { requestTypes, cylinderSizes };

export type LeadInput = {
  name: string;
  phone: string;       // normalised to +92XXXXXXXXXX
  city: string;        // city slug, or "other"
  cityOther: string;
  request: string;
  kind: "customer" | "engineering" | "distributor";
  size: string;
  details: string;
  sourcePage: string;
  pageId: string;                // page-map id (e.g. PR-001) of the page the form was on; "" if unknown
  consent: boolean;
  consentVersion: string;        // wording version shown at submit time (lib/lead-options.ts)
  attribution: Attribution;      // first-touch UTM tags, referrer host, landing path
};

export type ValidationResult =
  | { ok: true; lead: LeadInput }
  | { ok: false; errors: Record<string, string> };

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// "/lpg-safety" and "/lpg-safety/" are the same page; the registry uses trailing slashes.
const normPath = (p: string) => (p ? (p.endsWith("/") ? p : `${p}/`) : "");

function cleanAttribution(v: unknown): Attribution {
  const a = (v && typeof v === "object" ? v : {}) as Record<string, unknown>;
  const out: Attribution = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "referrer", "landing_path"] as const) {
    const s = str(a[k], 120);
    if (s) out[k] = s;
  }
  return out;
}

// Accepts Pakistani mobile (03XX XXXXXXX, +92 3XX XXXXXXX) and landline (0XX XXXXXXXX) numbers.
export function normalisePkPhone(input: string): string | null {
  if (!/^[+\d\s()-]+$/.test(input)) return null;
  let d = input.replace(/\D/g, "");
  if (d.startsWith("0092")) d = d.slice(4);
  else if (d.startsWith("92")) d = d.slice(2);
  else if (d.startsWith("0")) d = d.slice(1);
  if (/^3\d{9}$/.test(d)) return `+92${d}`;          // mobile
  if (/^[2-9]\d{8,9}$/.test(d)) return `+92${d}`;    // landline with area code
  return null;
}

export function validateLead(body: unknown): ValidationResult {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const rt = requestTypes.find((r) => r.value === str(b.request, 40));
  const phone = normalisePkPhone(str(b.phone, 30));
  const city = str(b.city, 60);
  const size = str(b.size, 10);

  const lead: LeadInput = {
    name: str(b.name, 100),
    phone: phone || str(b.phone, 30),
    city,
    cityOther: str(b.cityOther, 80),
    request: rt?.value || "",
    kind: rt?.kind || "customer",
    size,
    details: str(b.details, 1000),
    sourcePage: normPath(str(b.sourcePage, 200)),
    pageId: pageId(normPath(str(b.sourcePage, 200))),
    consent: b.consent === true,
    // The version of the wording the visitor actually saw (sent by the form). Falls back to the current version.
    consentVersion: str(b.consentVersion, 30) || CONSENT_VERSION,
    attribution: cleanAttribution(b.attribution),
  };

  const errors: Record<string, string> = {};
  if (lead.name.length < 2) errors.name = "Please enter your name.";
  if (!phone) errors.phone = "Please enter a valid Pakistani phone number, e.g. 0300 1234567.";
  if (city !== "other" && !allCities.some((c) => c.slug === city)) errors.city = "Please choose your city, or 'Other city'.";
  if (city === "other" && lead.cityOther.length < 2) errors.cityOther = "Please tell us your city or town.";
  if (!rt) errors.request = "Please choose what you need.";
  if (size && !cylinderSizes.some((s) => s.value === size)) errors.size = "Please choose a valid cylinder size.";
  if (!lead.consent) errors.consent = "Please agree to be contacted so we can handle your request.";

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, lead };
}

// Simple in-memory rate limit. Good enough for one instance; use Redis/Upstash if you scale out.
const hits = new Map<string, number[]>();
export function rateLimited(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

// Duplicate detection (Step 14): the same phone asking for the same thing within 15 minutes is one lead
// (people press submit twice on a slow connection). The visitor still sees success; we just do not store it twice.
const recent = new Map<string, number>();
export function isDuplicateLead(lead: LeadInput, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  for (const [k, t] of recent) if (now - t > windowMs) recent.delete(k);
  const key = `${lead.phone}|${lead.request}`;
  if (recent.has(key)) return true;
  recent.set(key, now);
  return false;
}
// If saving fails the visitor will retry; that retry must not be treated as a duplicate.
export function forgetLead(lead: LeadInput): void {
  recent.delete(`${lead.phone}|${lead.request}`);
}

export async function storeLead(lead: LeadInput): Promise<void> {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && key) {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/lpg_leads`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        name: lead.name,
        phone: lead.phone,
        city: lead.city === "other" ? `other: ${lead.cityOther}` : lead.city,
        request_type: lead.request,
        kind: lead.kind,
        cylinder_size: lead.size || null,
        details: lead.details || null,
        source_page: lead.sourcePage || null,
        page_id: lead.pageId || null,
        consent: lead.consent,
        consent_version: lead.consentVersion,
        consent_at: new Date().toISOString(),
        utm_source: lead.attribution.utm_source || null,
        utm_medium: lead.attribution.utm_medium || null,
        utm_campaign: lead.attribution.utm_campaign || null,
        referrer_host: lead.attribution.referrer || null,
        landing_path: lead.attribution.landing_path || null,
      }),
    });
    if (!res.ok) throw new Error(`Supabase insert failed: ${res.status}`);
    return;
  }

  if (process.env.NODE_ENV !== "production") {
    const dir = path.join(process.cwd(), ".data");
    await fs.mkdir(dir, { recursive: true });
    await fs.appendFile(
      path.join(dir, "leads.jsonl"),
      JSON.stringify({ ...lead, createdAt: new Date().toISOString() }) + "\n",
    );
    return;
  }

  throw new Error("Lead storage is not configured");
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function notifyLead(lead: LeadInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_NOTIFY_EMAIL;
  const from = process.env.LEADS_FROM_EMAIL;
  if (!apiKey || !to || !from) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject: `New ${lead.kind} lead: ${lead.request} in ${lead.city === "other" ? lead.cityOther : lead.city}`,
      html: `<p><b>Name:</b> ${esc(lead.name)}<br><b>Phone:</b> ${esc(lead.phone)}<br><b>City:</b> ${esc(
        lead.city === "other" ? lead.cityOther : lead.city,
      )}<br><b>Request:</b> ${esc(lead.request)}<br><b>Size:</b> ${esc(lead.size)}<br><b>Page:</b> ${esc(lead.sourcePage)} ${esc(lead.pageId)}<br><b>Source:</b> ${esc(lead.attribution.utm_source || lead.attribution.referrer || "direct")}</p><p>${esc(lead.details)}</p>`,
    }),
  });
}

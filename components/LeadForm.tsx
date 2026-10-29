"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_TEXT, CONSENT_VERSION, cylinderSizes, requestTypes, type Attribution } from "@/lib/lead-options";
import { track } from "./track";

// First-touch attribution kept for the browser session: UTM tags, the referrer and the first page seen.
function readAttribution(): Attribution {
  try {
    const saved = sessionStorage.getItem("lpg_attr");
    if (saved) return JSON.parse(saved) as Attribution;
    const q = new URLSearchParams(window.location.search);
    const a: Attribution = {
      utm_source: q.get("utm_source") || undefined,
      utm_medium: q.get("utm_medium") || undefined,
      utm_campaign: q.get("utm_campaign") || undefined,
      referrer: document.referrer ? new URL(document.referrer).hostname : undefined,
      landing_path: window.location.pathname,
    };
    sessionStorage.setItem("lpg_attr", JSON.stringify(a));
    return a;
  } catch {
    return {};
  }
}

type CityOpt = { slug: string; name: string };

type Props = {
  cities: CityOpt[];
  defaultCity?: string;
  defaultRequest?: string;
  heading?: string;
  subheading?: string;
  buttonLabel?: string;
};

export default function LeadForm({
  cities,
  defaultCity = "",
  defaultRequest = "",
  heading = "Request LPG supply",
  subheading = "Takes under a minute. We call you back to confirm price and delivery.",
  buttonLabel = "Send request",
}: Props) {
  const pathname = usePathname();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [city, setCity] = useState(defaultCity);

  // Capture attribution on the first page of the session, even if the form is not used there.
  useEffect(() => {
    readAttribution();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    setErrors({});
    setMessage("");

    try {
      const res = await fetch("/api/leads/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          city: form.get("city"),
          cityOther: form.get("cityOther"),
          request: form.get("request"),
          size: form.get("size"),
          details: form.get("details"),
          website: form.get("website"),
          consent: form.get("consent") === "on",
          consentVersion: CONSENT_VERSION,
          sourcePage: pathname,
          attribution: readAttribution(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("done");
        track("generate_lead", { page_path: pathname, request_type: String(form.get("request") || "") });
        return;
      }
      if (data.errors) setErrors(data.errors);
      setMessage(data.error || "Please check the highlighted fields.");
      setStatus("error");
    } catch {
      setMessage("Network problem. Please try again, or call or WhatsApp us.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6" role="status">
        <h3 className="text-lg font-semibold text-green-900">Request received</h3>
        <p className="mt-2 text-green-800">
          Thank you. We will call you to confirm the price and delivery time. If you smell gas, do not wait for a call:
          close the cylinder valve if it is safe, open windows, avoid flames and switches, leave the area and call your
          local emergency service.
        </p>
      </div>
    );
  }

  const field =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-ink focus:border-flame focus:outline-none focus:ring-2 focus:ring-flame/30";
  const err = (k: string) => (errors[k] ? <p className="mt-1 text-sm text-red-600">{errors[k]}</p> : null);

  return (
    <form onSubmit={onSubmit} className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm" noValidate>
      <h2 className="text-xl font-semibold text-ink">{heading}</h2>
      <p className="mt-1 text-sm text-ink-500">{subheading}</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink-700">Your name</label>
          <input id="name" name="name" autoComplete="name" required className={field} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-ink-700">Mobile / phone</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required placeholder="03XX XXXXXXX" className={field} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="city" className="text-sm font-medium text-ink-700">City</label>
          <select id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} required className={field}>
            <option value="" disabled>Choose city</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
            <option value="other">Other city / town</option>
          </select>
          {err("city")}
        </div>
        <div>
          <label htmlFor="request" className="text-sm font-medium text-ink-700">What do you need?</label>
          <select id="request" name="request" defaultValue={defaultRequest} required className={field}>
            <option value="" disabled>Choose</option>
            {requestTypes.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          {err("request")}
        </div>
        {city === "other" && (
          <div className="sm:col-span-2">
            <label htmlFor="cityOther" className="text-sm font-medium text-ink-700">Your city or town</label>
            <input id="cityOther" name="cityOther" className={field} />
            {err("cityOther")}
          </div>
        )}
        <div className="sm:col-span-2">
          <label htmlFor="size" className="text-sm font-medium text-ink-700">Cylinder size (if you know)</label>
          <select id="size" name="size" defaultValue="" className={field}>
            {cylinderSizes.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="details" className="text-sm font-medium text-ink-700">Details (optional)</label>
        <textarea id="details" name="details" rows={3} maxLength={1000} placeholder="Area / society, how many cylinders, preferred time..." className={field} />
      </div>

      {/* Honeypot field for bots. Hidden from people and assistive tech. */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-4">
        <label className="flex items-start gap-2 text-sm text-ink-700">
          <input type="checkbox" name="consent" className="mt-1" />
          <span>
            {CONSENT_TEXT} See our <a href="/privacy/" className="underline">privacy policy</a>.
          </span>
        </label>
        {err("consent")}
      </div>

      {message && status === "error" && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{message}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 w-full rounded-lg bg-flame px-5 py-3 font-semibold text-white hover:bg-flame-600 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : buttonLabel}
      </button>
    </form>
  );
}

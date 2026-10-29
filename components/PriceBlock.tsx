import Link from "next/link";
import { terms } from "@/lib/commercial";
import { CYLINDER_SIZES_KG, cylinderPrice, fmtDate, latestPrice, perKgFor, pkr } from "@/lib/prices";
import { site, whatsappHref } from "@/lib/site";

const sizeLabel: Record<number, string> = {
  5: "5 kg",
  11.8: "11.8 kg (domestic)",
  15: "15 kg",
  45.4: "45.4 kg (commercial)",
};

export default function PriceBlock({ citySlug, cityName }: { citySlug?: string; cityName?: string }) {
  const n = latestPrice;
  if (!n) {
    return (
      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900" role="status">
        <p className="font-semibold">Today&apos;s verified price is being updated</p>
        <p className="mt-1">
          OGRA notifies the LPG price every month (usually from the 1st). We publish a figure only after our team checks
          the official notification. Call {site.phoneDisplay} or{" "}
          {whatsappHref() ? (
            <a className="underline" href={whatsappHref()!} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          ) : (
            "WhatsApp"
          )}{" "}
          for today&apos;s confirmation{cityName ? ` in ${cityName}` : ""}.
        </p>
      </div>
    );
  }
  const perKg = perKgFor(citySlug)!;
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-ink-500">
        OGRA-notified LPG consumer price effective {fmtDate(n.effectiveFrom)}. Entered by {n.verifiedBy} on{" "}
        {fmtDate(n.verifiedOn)} from the monthly notification cycle
        {(n as { sourceNote?: string }).sourceNote ? " (press coverage of the OGRA notice; PDF re-check when posted)" : ""}.{" "}
        <a className="underline" href={n.sourceUrl} target="_blank" rel="noopener noreferrer">
          OGRA notified-prices page
        </a>
        .{terms.sameOgraRateAllCities ? " Same notified per-kg rate applies nationwide on this site." : ""}
      </p>
      <p className="mt-2 text-3xl font-bold text-ink">
        {pkr(perKg)}{" "}
        <span className="text-base font-medium text-ink-500">per kg{cityName ? ` · ${cityName}` : ""}</span>
      </p>
      <table className="mt-4 w-full text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-ink-500">
            <th className="py-2 font-medium">Cylinder</th>
            <th className="py-2 font-medium">Gas price (per kg × weight)</th>
          </tr>
        </thead>
        <tbody>
          {CYLINDER_SIZES_KG.map((kg) => (
            <tr key={kg} className="border-b border-slate-100">
              <td className="py-2">{sizeLabel[kg]}</td>
              <td className="py-2 font-semibold">{pkr(cylinderPrice(kg, citySlug)!)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-xs text-ink-500">
        Figures above are <strong>gas price only</strong> from the OGRA notification. {terms.deposit} {terms.exchange}{" "}
        {terms.delivery} Full total confirmed before you agree.{" "}
        <Link href="/pricing-policy/" className="underline">
          Pricing policy
        </Link>
        .
      </p>
    </div>
  );
}

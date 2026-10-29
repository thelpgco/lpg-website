import {
  bucketLabel,
  disclosure,
  displayBucket,
  formatPhoneDisplay,
  type DirectoryListing,
  type DisplayBucket,
} from "@/lib/directory";

const BUCKET_ORDER: DisplayBucket[] = ["network_dealers", "research"];

type Props = {
  cityName: string;
  listings: DirectoryListing[];
  perTier?: number;
  showPhone?: boolean;
  title?: string;
};

export default function SupplierDirectory({
  cityName,
  listings,
  perTier = 20,
  showPhone = true,
  title,
}: Props) {
  if (!listings.length) return null;

  const sections = BUCKET_ORDER.map((bucket) => ({
    bucket,
    rows: listings.filter((l) => displayBucket(l.tier) === bucket).slice(0, perTier),
    total: listings.filter((l) => displayBucket(l.tier) === bucket).length,
  })).filter((s) => s.rows.length > 0);

  if (!sections.length) return null;

  return (
    <section className="mt-8">
      <h2 className="font-display text-2xl text-ink">{title ?? `LPG dealers and distributors in ${cityName}`}</h2>
      <p className="mt-2 text-sm text-ink-700">
        Named partners and local distributors serving {cityName}. When you order we confirm who can reach your street,
        the price and the delivery window before you agree.
      </p>

      {sections.map(({ bucket, rows, total }) => (
        <div key={bucket} className="mt-5">
          <h3 className="text-lg font-semibold text-ink">
            {bucketLabel(bucket)} ({rows.length}
            {total > rows.length ? "+" : ""})
          </h3>
          <p className="mt-1 text-xs text-ink-500">{disclosure[bucket]}</p>
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-ink">
                <tr>
                  <th className="p-3 font-semibold">Name</th>
                  <th className="p-3 font-semibold">Area / address</th>
                  {showPhone && <th className="p-3 font-semibold">Phone</th>}
                  {bucket === "research" && <th className="p-3 font-semibold">Marketer</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-ink-700">
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="p-3 align-top font-medium text-ink">{r.name}</td>
                    <td className="p-3 align-top">
                      {[r.locality, r.address].filter(Boolean).join(" — ") || r.city}
                    </td>
                    {showPhone && (
                      <td className="p-3 align-top whitespace-nowrap">
                        {r.phone ? (
                          <a className="underline" href={`tel:${r.phone}`}>
                            {formatPhoneDisplay(r.phone)}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                    )}
                    {bucket === "research" && <td className="p-3 align-top">{r.marketer || "—"}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </section>
  );
}

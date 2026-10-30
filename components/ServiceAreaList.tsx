import { areaGroups } from "@/lib/local-delivery";

// The full confirmed area list for a city, one collapsible group per area type. Names are plain text inside <details>,
// so they are in the HTML for search engines while the page stays short for readers. Outlying groups say plainly that
// the one-hour target does not apply.
export default function ServiceAreaList({ slug, cityName }: { slug: string; cityName: string }) {
  const data = areaGroups(slug);
  if (!data) return null;
  return (
    <section aria-labelledby="all-areas" className="mt-6">
      <h3 id="all-areas" className="text-lg font-semibold text-ink">
        All {data.count.toLocaleString("en-PK")} areas of {cityName} we cover
      </h3>
      <p className="mt-1 text-sm text-ink-500">
        Grouped by area. Open a group to see every sector, block, society or village in it.
      </p>
      <div className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {data.groups.map((g) => (
          <details key={g.name} className="group p-4">
            <summary className="flex cursor-pointer items-center justify-between gap-3 font-medium text-ink">
              <span>
                {g.name}
                {g.outlying && <span className="ml-2 rounded bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">Outlying</span>}
              </span>
              <span className="text-sm font-normal text-ink-500">{g.areas.length}</span>
            </summary>
            {g.outlying && (
              <p className="mt-2 text-sm text-amber-900">
                Outlying area: the one-hour target does not apply here. We confirm the delivery day and time when you order.
              </p>
            )}
            <p className="mt-2 text-sm leading-relaxed text-ink-700">{g.areas.join(" · ")}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

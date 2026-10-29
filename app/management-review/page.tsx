import type { Metadata } from "next";
import Link from "next/link";
import PageShell, { H2, Note, P } from "@/components/PageShell";
import pagesRaw from "@/data/pages.json";
import { company } from "@/lib/company/profile";
import { demoBannerText, isDemo, siteMode } from "@/lib/mode";
import { requestTypes } from "@/lib/lead-options";
import { latestPrice, priceReady } from "@/lib/prices";
import { appliances, cylinders } from "@/lib/products";
import { projects } from "@/lib/projects";

// Internal inspection page for management. noindex, nofollow, not in the sitemap, no password for now.
export const metadata: Metadata = {
  title: { absolute: "Management review dashboard | THE LPG CO." },
  description: "Internal inspection dashboard: every site URL, its status and the state of prices, products, projects, leads and calculators.",
  robots: { index: false, follow: false },
};

type Entry = { id: string; type: string; phase: string; status: string; built: boolean; lastmod?: string };
const registry = pagesRaw as unknown as Record<string, Entry>;

const ORIGIN = process.env.NEXT_PUBLIC_LOCAL_ORIGIN || "http://localhost:3000";
const STATUS_ORDER = ["published", "approved", "review", "draft"];

const statusClass: Record<string, string> = {
  published: "bg-green-100 text-green-900",
  approved: "bg-sky-100 text-sky-900",
  review: "bg-amber-100 text-amber-900",
  draft: "bg-slate-200 text-slate-800",
};

function Check({ ok, label, detail }: { ok: boolean; label: string; detail: string }) {
  return (
    <li className="flex gap-3 rounded-xl border border-slate-200 p-4">
      <span
        className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          ok ? "bg-green-100 text-green-900" : "bg-amber-100 text-amber-900"
        }`}
        aria-label={ok ? "ready" : "needs attention"}
      >
        {ok ? "OK" : "!"}
      </span>
      <div>
        <p className="font-semibold text-ink">{label}</p>
        <p className="text-sm text-ink-700">{detail}</p>
      </div>
    </li>
  );
}

export default function Page() {
  const paths = Object.keys(registry).sort();
  const entries = paths.map((p) => ({ path: p, ...registry[p] }));
  const counts = STATUS_ORDER.map((s) => ({ s, n: entries.filter((e) => e.status === s).length }));
  const built = entries.filter((e) => e.built).length;

  const demo = isDemo();
  const cyl = cylinders();
  const app = appliances();
  const proj = projects();
  const calculators = entries.filter((e) => e.path.startsWith("/tools/"));
  const calcBuilt = calculators.filter((e) => e.built).length;
  const banner = demoBannerText();

  const dynamicPaths = proj.map((p) => `/projects/${p.slug}/`);

  return (
    <PageShell
      wide
      crumbs={[{ name: "Management review", href: "/management-review/" }]}
      h1="Management review dashboard"
      intro="Internal inspection page: every URL in the site registry with its publishing status, links to the local build, and the state of the main systems."
    >
      <Note title={`Mode: ${siteMode().toUpperCase()}`} tone={demo ? "warn" : "info"}>
        <p>
          {banner ??
            "Production mode. Only verified data is shown on public pages; no demonstration catalogue, case studies or prices are rendered."}
        </p>
        <p className="mt-2 text-sm">
          Switch with <code>NEXT_PUBLIC_SITE_MODE=demo</code> or <code>production</code> and restart the dev server. This page is
          noindex and excluded from the sitemap. Restrict access on the host (VPN or basic auth) before sharing outside the company.
        </p>
      </Note>

      <H2>Company profile</H2>
      <div className="mt-3 rounded-xl border border-slate-200 p-4 text-sm text-ink-700">
        <p className="text-base font-semibold text-ink">{company.name}</p>
        <p className="mt-1">{company.tagline}</p>
        <ul className="mt-3 grid gap-1 sm:grid-cols-2">
          <li>Operating since {company.foundedYear} (about {company.yearsOperating} years)</li>
          <li>{company.licenceBody} licence {company.licenceNumber}</li>
          <li>Office: {company.officeAddress}</li>
          <li>Phone / WhatsApp: {company.phoneDisplay}</li>
          <li>Delivery target: {company.deliveryTarget}</li>
          <li>Response: {company.responseTime}</li>
        </ul>
        <p className="mt-3">{company.aboutBlurb}</p>
      </div>

      <H2>Systems checklist</H2>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        <Check
          ok={priceReady}
          label="Prices (OGRA notification)"
          detail={
            latestPrice
              ? `Verified: ${latestPrice.month}, Rs ${latestPrice.perKgPkr}/kg effective ${latestPrice.effectiveFrom}, verified ${latestPrice.verifiedOn}. Price pages can be indexed.`
              : "No verified notification on file. Price pages stay noindex and show no numbers."
          }
        />
        <Check
          ok={cyl.length > 0}
          label="Products: cylinders"
          detail={`${cyl.length} cylinder SKUs (${demo ? "DEMO deposit / new-empty / delivery figures shown" : "shell and delivery quoted before agreement, commercial terms shown"}).`}
        />
        <Check
          ok={app.length > 0}
          label="Products: appliances"
          detail={
            demo
              ? `${app.length} DEMO appliances with DEMO prices.`
              : "No appliance SKUs in production: pages say price on request, no prices published."
          }
        />
        <Check
          ok={proj.length > 0}
          label="Projects"
          detail={
            proj.length > 0
              ? `${proj.length} ${demo ? "DEMO case studies (badged DEMO, noindex)" : "consented projects"} at /projects/.`
              : "No consented projects. /projects/ shows an honest empty state with a quote CTA and stays noindex."
          }
        />
        <Check
          ok={requestTypes.length > 0}
          label="Leads"
          detail={`Lead form posts to /api/leads with ${requestTypes.length} request types; leads are stored server-side with consent and attribution.`}
        />
        <Check
          ok={calcBuilt > 0}
          label="Calculators"
          detail={`${calcBuilt} of ${calculators.length} tools built: ${calculators.map((c) => c.path.replace("/tools/", "").replace(/\/$/, "")).join(", ")}.`}
        />
      </ul>

      <H2>Registry summary</H2>
      <P>
        {entries.length} URLs in <code>data/pages.json</code>, {built} built.{" "}
        {counts.map((c) => `${c.s}: ${c.n}`).join(" | ")}. Only <strong>published</strong> pages are indexable and in the
        sitemap, and only when their data gate is open.
      </P>

      <H2>All URLs</H2>
      <p className="mt-2 text-sm text-ink-500">
        Links open the local build at <code>{ORIGIN}</code>. Set <code>NEXT_PUBLIC_LOCAL_ORIGIN</code> to change the host.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-ink-500">
              <th className="px-3 py-2 font-medium">ID</th>
              <th className="px-3 py-2 font-medium">Path</th>
              <th className="px-3 py-2 font-medium">Type</th>
              <th className="px-3 py-2 font-medium">Phase</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Built</th>
              <th className="px-3 py-2 font-medium">Local link</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.path} className="border-b border-slate-100 align-top last:border-0">
                <td className="px-3 py-2 font-mono text-xs">{e.id}</td>
                <td className="px-3 py-2">
                  {e.built ? (
                    <Link className="underline" href={e.path}>
                      {e.path}
                    </Link>
                  ) : (
                    e.path
                  )}
                </td>
                <td className="px-3 py-2">{e.type}</td>
                <td className="px-3 py-2">{e.phase}</td>
                <td className="px-3 py-2">
                  <span className={`rounded px-2 py-0.5 text-xs font-semibold ${statusClass[e.status] ?? statusClass.draft}`}>
                    {e.status}
                  </span>
                </td>
                <td className="px-3 py-2">{e.built ? "yes" : "no"}</td>
                <td className="px-3 py-2">
                  {e.built ? (
                    <a className="underline" href={`${ORIGIN}${e.path}`} target="_blank" rel="noreferrer">
                      {ORIGIN}
                      {e.path}
                    </a>
                  ) : (
                    <span className="text-ink-500">not built</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>Dynamic pages (not in the registry)</H2>
      {dynamicPaths.length > 0 ? (
        <ul className="mt-3 list-disc space-y-1 pl-6 text-sm text-ink-700">
          {dynamicPaths.map((p) => (
            <li key={p}>
              <a className="underline" href={`${ORIGIN}${p}`} target="_blank" rel="noreferrer">
                {ORIGIN}
                {p}
              </a>{" "}
              {demo && <span className="font-semibold text-amber-900">(DEMO, noindex)</span>}
            </li>
          ))}
        </ul>
      ) : (
        <P>No project detail pages in the current mode.</P>
      )}
    </PageShell>
  );
}

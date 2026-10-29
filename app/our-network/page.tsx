import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import {
  directorySummary,
  formatPhoneDisplay,
  listingsForCity,
  namedSuppliersForCity,
  ownerNetworkSample,
  topCitiesByListings,
} from "@/lib/directory";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { itemsFor } from "@/lib/media";
import { hubCities, provinceList } from "@/lib/network";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/our-network/" });

const faqs = [
  {
    q: "How large is your LPG network in Pakistan?",
    a: `Our public directory currently indexes ${directorySummary.counts.merged_listings.toLocaleString("en-PK")} named local listings across ${directorySummary.counts.cities_indexed.toLocaleString("en-PK")} cities, including ${(directorySummary.counts.owner_network + directorySummary.counts.market_listing).toLocaleString("en-PK")} network dealers. Counts are listings on file — not a promise that every street is covered.`,
  },
  {
    q: "Will a named dealer on this page deliver to my street?",
    a: "Not automatically. City pages and this sample show dealers listed for an area. On every order we confirm who can reach your street, the price and the timing before you agree.",
  },
  {
    q: "How fast is delivery through the network?",
    a: "Timing depends on the distributor nearest your street. The coverage section above gives the target, and we confirm it before you agree.",
  },
  {
    q: "How do I join as a distributor or shop?",
    a: `Apply on the become a distributor page or call ${site.phoneDisplay}. We review your city, premises and licensing, then discuss terms on a call.`,
  },
];

export default function Page() {
  const dir = directorySummary.counts;
  const networkDealers = dir.owner_network + dir.market_listing;
  const topCities = topCitiesByListings(10);
  const sample = ownerNetworkSample(28);
  const sampleByCity = topCities.slice(0, 6).map((c) => ({
    ...c,
    dealers: namedSuppliersForCity(c.slug, 4).filter((x) => x.tier !== "national_register"),
  }));

  return (
    <PageShell
      crumbs={[{ name: "Our network", href: "/our-network/" }]}
      h1="Our LPG distributor network across Pakistan"
      intro={`${company.shortName} is an OGRA-licensed marketer and distributor (licence ${company.licenceNumber}). We supply homes and businesses nationwide through named dealers, shops and distributors. Below are honest directory counts, city samples and how to order — street coverage is confirmed on each order.`}
      aside={
        <SiteLeadForm
          heading="Find supply in your area"
          subheading="City and street — we confirm who can deliver."
          buttonLabel="Check my area"
        />
      }
    >
      <Note title="How to read these numbers" tone="info">
        <p>
          Figures below come from our named-dealer directory (updated {directorySummary.generatedAt}). They count
          listings on file — not every street in Pakistan, and not a guarantee of same-day reach. We confirm your street
          before you agree.
        </p>
      </Note>

      <div className="mt-2 grid gap-4 sm:grid-cols-3">
        {[
          [networkDealers.toLocaleString("en-PK"), "network dealers listed"],
          [dir.cities_indexed.toLocaleString("en-PK"), "cities with local listings"],
          [dir.merged_listings.toLocaleString("en-PK"), "named listings nationwide"],
        ].map(([n, l]) => (
          <div key={String(l)} className="rounded-xl border border-slate-200 p-4 text-center">
            <p className="text-3xl font-bold text-flame-700">{n}</p>
            <p className="text-sm text-ink-700">{l}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-ink-500">
        Network dealers = active supply partners in the directory ({dir.owner_network.toLocaleString("en-PK")}) plus
        allied market listings ({dir.market_listing.toLocaleString("en-PK")}). Additional research distributors (
        {dir.national_register.toLocaleString("en-PK")}) appear on city pages where useful. {terms.delivery}
      </p>

      <H2>How the network works for you</H2>
      <ol className="mt-3 space-y-3">
        {[
          [
            "You request supply",
            `Call, WhatsApp ${site.phoneDisplay}, or use order LPG / LPG near me. Tell us city, street and cylinder size.`,
          ],
          [
            "We match a local team",
            "We check dealers listed for your city and say who can deliver — our licensed role, a reseller path, or a named network dealer.",
          ],
          [
            "We confirm price and timing",
            "Full price (gas, delivery, deposit or exchange if they apply) and the delivery window are confirmed before you agree.",
          ],
          [
            "Certified cylinder handover",
            terms.partnersCertifiedRule,
          ],
        ].map(([t, d], i) => (
          <li key={t} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {t}
            </p>
            <p className="mt-1 text-ink-700">{d}</p>
          </li>
        ))}
      </ol>

      <H2>Named dealers by city (sample)</H2>
      <P>
        Examples from cities with the most local listings. Open a city hub for the fuller list for that area — phones
        shown are as listed for that dealer.
      </P>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {sampleByCity.map((c) => (
          <li key={c.slug} className="rounded-xl border border-slate-200 p-4">
            <Link className="font-semibold text-ink hover:underline" href={`/lpg-in-${c.slug}/`}>
              {c.name}
            </Link>
            <span className="ml-2 text-sm text-ink-500">{c.count} listings on file</span>
            {c.dealers.length > 0 ? (
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-700">
                {c.dealers.map((d) => (
                  <li key={d.id}>
                    {d.name}
                    {d.locality ? ` — ${d.locality}` : ""}
                    {d.phone ? (
                      <>
                        {" "}
                        ·{" "}
                        <a className="underline" href={`tel:${d.phone}`}>
                          {formatPhoneDisplay(d.phone)}
                        </a>
                      </>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-ink-700">Open the city page for named suppliers.</p>
            )}
            <p className="mt-2 text-sm">
              <Link className="underline" href={`/lpg-in-${c.slug}/`}>
                City hub
              </Link>
              {" · "}
              <Link className="underline" href="/order-lpg/">
                Order
              </Link>
            </p>
          </li>
        ))}
      </ul>

      <H2>Cities with the most local listings</H2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {topCities.map((c) => {
          const examples = listingsForCity(c.slug)
            .filter((x) => x.tier === "owner_network" || x.tier === "market_listing")
            .slice(0, 3)
            .map((x) => x.name);
          return (
            <li key={c.slug} className="rounded-lg border border-slate-200 p-3">
              <Link className="font-semibold text-ink hover:underline" href={`/lpg-in-${c.slug}/`}>
                {c.name}
              </Link>
              <span className="ml-2 text-sm text-ink-500">{c.count} listings</span>
              {examples.length > 0 && (
                <p className="mt-1 text-sm text-ink-700">e.g. {examples.join("; ")}</p>
              )}
            </li>
          );
        })}
      </ul>

      <H2>Main supply hubs</H2>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {hubCities.map((c) => (
          <li key={c.slug} className="rounded-lg border border-slate-200 p-3">
            <Link className="font-semibold text-ink hover:underline" href={`/lpg-in-${c.slug}/`}>
              {c.name}
            </Link>
            <span className="ml-2 text-sm text-ink-500">
              {cityDirectoryCount(c.slug)} local listings · city hub
            </span>
          </li>
        ))}
      </ul>

      <H2>Province and region pages</H2>
      <UL
        items={provinceList.map((p) => (
          <span key={p.slug}>
            <Link className="underline" href={`/lpg-in-${p.slug}/`}>
              LPG in {p.name}
            </Link>
          </span>
        ))}
      />
      <P>
        Also:{" "}
        <Link className="underline" href="/lpg-in-islamabad/">
          Islamabad (ICT)
        </Link>
        .
      </P>

      <H2>Network dealers (wider sample)</H2>
      <P>A cross-section of network dealers. City pages hold the complete local list for that city.</P>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-ink">
            <tr>
              <th className="p-3 font-semibold">Name</th>
              <th className="p-3 font-semibold">City</th>
              <th className="p-3 font-semibold">Area</th>
              <th className="p-3 font-semibold">Phone</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-ink-700">
            {sample.map((r) => (
              <tr key={r.id}>
                <td className="p-3 font-medium text-ink">{r.name}</td>
                <td className="p-3">
                  {r.citySlug ? (
                    <Link className="underline" href={`/lpg-in-${r.citySlug}/`}>
                      {r.city}
                    </Link>
                  ) : (
                    r.city || "—"
                  )}
                </td>
                <td className="p-3">{r.locality || "—"}</td>
                <td className="p-3 whitespace-nowrap">
                  {r.phone ? (
                    <a className="underline" href={`tel:${r.phone}`}>
                      {formatPhoneDisplay(r.phone)}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Note tone="warn" title="Where coverage is still thinner">
        <p>
          Azad Kashmir, Gilgit-Baltistan, parts of Balochistan and many smaller towns have fewer listings than the big
          metros. We still take inquiries and say clearly whether we can reach you.{" "}
          <Link className="underline" href="/become-an-lpg-distributor/">
            Join the network
          </Link>{" "}
          if you run a shop or depot there.
        </p>
      </Note>

      <H2>Order, near me and delivery</H2>
      <UL
        items={[
          <Link key="o" className="underline" href="/order-lpg/">
            Order LPG
          </Link>,
          <Link key="n" className="underline" href="/lpg-near-me/">
            LPG near me
          </Link>,
          <Link key="d" className="underline" href="/delivery-areas/">
            Delivery areas
          </Link>,
          <Link key="h" className="underline" href="/how-it-works/">
            How ordering works
          </Link>,
          <Link key="s" className="underline" href="/lpg-supply-in-pakistan/">
            LPG supply in Pakistan
          </Link>,
        ]}
      />
      <P>
        Call or WhatsApp {site.phoneDisplay}. We aim to reply {company.responseTime}.
      </P>

      <ImageGallery items={itemsFor("/our-network/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

function cityDirectoryCount(slug: string): string {
  const n = listingsForCity(slug).length;
  return n > 0 ? n.toLocaleString("en-PK") : "see hub";
}

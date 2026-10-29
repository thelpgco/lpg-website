import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { allCities, hubCities, overrideFor, provinceList, totals } from "@/lib/network";
import { fmtDate } from "@/lib/prices";
import { meta } from "@/lib/seo";

export const metadata = meta({ path: "/delivery-areas/" });

export default function Page() {
  const others = allCities.filter((c) => !c.hub);

  const hubRows = hubCities.map((c) => {
    const o = overrideFor(c.slug);
    const confirmed = o.indexable === true && o.verifiedOn;
    return [
      <Link key={c.slug} className="underline" href={`/lpg-in-${c.slug}/`}>
        {c.name}
      </Link>,
      c.province,
      `${c.suppliers} (${c.open24h} open 24h)`,
      confirmed ? `Active hub, confirmed ${fmtDate(o.verifiedOn!)}` : "Partners listed; coverage confirmed on your call",
      o.deliveryNote ?? "The distributor contacts you with the delivery window before you agree.",
    ];
  });

  const provinceRows = provinceList.map((p) => [
    <Link key={p.slug} className="underline" href={`/lpg-in-${p.slug}/`}>
      {p.name}
    </Link>,
    String(p.suppliers),
    String(p.autoLpg),
    p.cities.length ? `${p.cities.length} cities` : "Province-level listing",
  ]);

  const verified = hubCities.filter((c) => overrideFor(c.slug).indexable === true);

  return (
    <PageShell
      crumbs={[{ name: "Delivery areas", href: "/delivery-areas/" }]}
      h1="LPG delivery areas across Pakistan"
      intro={`${company.shortName} delivers LPG nationwide through ${totals.suppliers} listed supply partners in ${totals.citiesWithPartners} cities and ${totals.hubCities} main hubs — homes, shops, restaurants, hospitals and industry. Hub table below shows partner counts and delivery targets (~1 hour in covered areas when a local team is available). Your street is confirmed on each order.`}
      aside={<SiteLeadForm heading="Check your area" subheading="Tell us your city and we confirm whether we can supply you." />}
    >
      <Note title="Nationwide service, local confirmation" tone="info">
        <p>
          We take orders from every province and ICT. Named dealers and distributors sit on each city page.{" "}
          {company.terms.delivery} {company.terms.delivery247}
        </p>
      </Note>

      <H2>Main supply hubs</H2>
      <SpecTable
        head={["City", "Province", "Listed supply partners", "Status", "Delivery target"]}
        rows={hubRows}
        caption={`Partner counts from our network list (${totals.partners} partners in total). Network-wide target: ${company.deliveryTarget}.`}
      />

      {verified.length ? (
        <>
          <H2>What to expect in our active hubs</H2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {verified.map((c) => {
              const o = overrideFor(c.slug);
              return (
                <div key={c.slug} className="rounded-xl border border-slate-200 bg-white p-4">
                  <h3 className="font-semibold text-ink">
                    <Link className="hover:underline" href={`/lpg-in-${c.slug}/`}>
                      LPG in {c.name}
                    </Link>
                  </h3>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ink-700">
                    {(o.localNotes ?? []).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </>
      ) : null}

      <H2>By province or region</H2>
      <SpecTable head={["Province or region", "Listed supply partners", "Auto LPG stations", "Coverage"]} rows={provinceRows} />

      <H2>Other cities with listed partners</H2>
      <P>{others.map((c) => c.name).join(", ")}.</P>

      <H2>How coverage is confirmed</H2>
      <UL
        items={[
          "You send your city and area through the form, WhatsApp or phone.",
          "We match you to a listed distributor that serves your area.",
          "We confirm the price, delivery window and who delivers before you agree.",
          `${company.terms.delivery247}`,
        ]}
      />
      <Note title="Delivery time" tone="info">
        <p>
          {company.terms.delivery} Gas is priced at the same OGRA rate in every city; see{" "}
          <Link className="underline" href="/lpg-price-in-pakistan/">
            LPG price in Pakistan
          </Link>
          .
        </p>
      </Note>
      <P>
        Next: <Link className="underline" href="/lpg-home-delivery/">LPG home delivery</Link>,{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link> or{" "}
        <Link className="underline" href="/our-network/">our network</Link>.
      </P>

      <ImageGallery items={itemsFor("/delivery-areas/")} title="Photos" />
    </PageShell>
  );
}

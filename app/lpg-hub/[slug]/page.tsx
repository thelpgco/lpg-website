import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import PriceBlock from "@/components/PriceBlock";
import SpecTable from "@/components/SpecTable";
import SupplierDirectory from "@/components/SupplierDirectory";
import { terms } from "@/lib/commercial";
import { cityDirectoryStats, formatPhoneDisplay, listedCount, listingsForCity, namedSuppliersForCity, provinceDirectory } from "@/lib/directory";
import { provinceDetail } from "@/lib/province-detail";
import { cityBySlug, hubSlugs, isCityIndexable, overrideFor, provinceBySlug, hubCities } from "@/lib/network";
import { priceReady } from "@/lib/prices";
import { fitDescription, fitTitle, meta } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

// Served at /lpg-in-{slug}/ through the rewrite in next.config.mjs.
export const dynamicParams = false;

export function generateStaticParams() {
  return hubSlugs.map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

// Static city pages that sit under province hubs without hub cities of their own.
const provinceLocalPages: Record<string, { href: string; label: string }[]> = {
  "azad-kashmir": [
    { href: "/lpg-in-muzaffarabad/", label: "LPG in Muzaffarabad" },
    { href: "/lpg-in-murree/", label: "LPG in Murree (nearby hill town)" },
  ],
  "gilgit-baltistan": [
    { href: "/lpg-in-gilgit/", label: "LPG in Gilgit" },
    { href: "/lpg-in-skardu/", label: "LPG in Skardu" },
  ],
  "khyber-pakhtunkhwa": [
    { href: "/lpg-in-peshawar/", label: "LPG in Peshawar" },
    { href: "/lpg-in-abbottabad/", label: "LPG in Abbottabad" },
  ],
  punjab: [
    { href: "/lpg-in-lahore/", label: "LPG in Lahore" },
    { href: "/lpg-in-rawalpindi/", label: "LPG in Rawalpindi" },
    { href: "/lpg-in-faisalabad/", label: "LPG in Faisalabad" },
    { href: "/lpg-in-multan/", label: "LPG in Multan" },
    { href: "/lpg-in-gujranwala/", label: "LPG in Gujranwala" },
    { href: "/lpg-in-burewala/", label: "LPG in Burewala" },
    { href: "/lpg-in-murree/", label: "LPG in Murree" },
  ],
  sindh: [
    { href: "/lpg-in-karachi/", label: "LPG in Karachi" },
    { href: "/lpg-in-hyderabad/", label: "LPG in Hyderabad" },
  ],
  balochistan: [{ href: "/lpg-in-quetta/", label: "LPG in Quetta" }],
};

const usefulLinks = [
  { href: "/order-lpg/", label: "Order LPG" },
  { href: "/lpg-price-per-kg-in-pakistan/", label: "LPG price per kg" },
  { href: "/commercial-lpg-supply/", label: "Commercial LPG supply" },
  { href: "/projects/", label: "Engineering projects" },
  { href: "/lpg-near-me/", label: "LPG near me" },
];

function deliveryCopy(cityName: string, o: ReturnType<typeof overrideFor>): string {
  if (o.deliveryNote) return o.deliveryNote;
  if (o.testOrderMinutes) {
    return `Target about ${o.testOrderMinutes} minutes in covered ${cityName} areas when a local team is available. Timing depends on your area and the time of day; we confirm it when you order and confirm your street before dispatch.`;
  }
  return `Delivery time depends on your area, road conditions and the time of day. We confirm the window and your street with you before you agree.`;
}

/** ~1 hour intro/bullet language only when the override records a ≤60 minute target. */
function supportsHourTarget(o: ReturnType<typeof overrideFor>): boolean {
  return typeof o.testOrderMinutes === "number" && o.testOrderMinutes <= 60;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const city = cityBySlug(slug);
  const prov = provinceBySlug(slug);
  if (city) {
    return meta({
      path: `/lpg-in-${slug}/`,
      title: fitTitle([
        `LPG Gas in ${city.name}: Price Today, Delivery & Supply`,
        `LPG Gas in ${city.name}: Price Today, Home Delivery & Supply`,
      ]),
      description: fitDescription([
        `Order LPG gas in ${city.name} through ${site.shortName}, an OGRA-licensed marketer. See how the price is set, which areas we cover and how to order by call or WhatsApp.`,
        `Order LPG gas in ${city.name} through ${site.shortName}, an OGRA-licensed marketer. See how pricing works, the areas we cover and how to order by call or WhatsApp.`,
        `LPG gas in ${city.name} from ${site.shortName}, an OGRA-licensed marketer: how the price is set, areas covered, and how to order by call, WhatsApp or form.`,
      ]),
      index: isCityIndexable(slug),
    });
  }
  if (prov) {
    return meta({
      path: `/lpg-in-${slug}/`,
      title: fitTitle([
        `LPG in ${prov.name}: Cylinders, Gas Supply & Delivery`,
        `LPG in ${prov.name}: Cylinders, Gas Supply and Delivery Areas`,
        `LPG in ${prov.name}: Cylinder Supply, Delivery and Partners`,
      ]),
      description: fitDescription([
        `LPG in ${prov.name}: where ${site.shortName}, an OGRA-licensed marketer, has distributor partners today, how to order cylinders and gas, and what to expect.`,
        `LPG in ${prov.name}: where our distributor network is listed today, how to order cylinders and gas from ${site.shortName}, and what to expect on delivery.`,
      ]),
      index: true, // indexable once published in data/pages.json (meta() checks the status)
    });
  }
  return {};
}

export default async function HubPage({ params }: Props) {
  const { slug } = await params;
  const city = cityBySlug(slug);
  const prov = provinceBySlug(slug);
  if (!city && !prov) notFound();

  if (city) {
    const o = overrideFor(slug);
    const sameProvince = hubCities.filter((c) => c.province === city.province && c.slug !== city.slug);
    // Twin-city / corridor links when province string match is empty (e.g. ICT).
    const curatedNearby: Record<string, string[]> = {
      islamabad: ["rawalpindi", "lahore", "murree"],
      rawalpindi: ["islamabad", "lahore", "murree"],
      peshawar: ["islamabad", "abbottabad"],
      quetta: ["karachi", "lahore"],
      burewala: ["multan", "lahore", "faisalabad"],
    };
    const nearbySlugs = [
      ...sameProvince.map((c) => c.slug),
      ...(curatedNearby[slug] ?? []),
    ];
    const nearby = [...new Set(nearbySlugs)]
      .filter((s) => s !== slug)
      .map((s) => cityBySlug(s) ?? { slug: s, name: s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) })
      .slice(0, 8);
    const directoryListings = listingsForCity(slug);
    const dirStats = cityDirectoryStats(slug);
    const namedExamples = namedSuppliersForCity(slug, 5);
    const hourTarget = supportsHourTarget(o);
    const deliveryText = deliveryCopy(city.name, o);
    const exampleNames =
      namedExamples.length > 0
        ? ` Examples include ${namedExamples.map((n) => n.name).join(", ")}.`
        : "";
    // Drop scraped locality strings that are just the city name or one junk token.
    const localities = city.localities.filter((loc) => {
      const t = loc.trim();
      if (!t || t.length < 4) return false;
      if (t.toLowerCase() === city.name.toLowerCase()) return false;
      if (!/\s/.test(t) && t.length < 8) return false;
      return true;
    });
    const faqs = [
      {
        q: `How do I order an LPG cylinder in ${city.name}?`,
        a: `Call or WhatsApp ${site.phoneDisplay}, or send the form on this page with your area and cylinder size. We pass the order to a distributor who serves your area and confirm the price and delivery time with you before you agree. Requests are accepted around the clock; delivery follows local availability.`,
      },
      {
        q: `Who delivers the gas in ${city.name}?`,
        a: `${site.name} is an OGRA-licensed LPG marketer and distributor that also works as a reseller and referral partner. For ${city.name} we list ${dirStats.total || city.suppliers} named supplier${(dirStats.total || city.suppliers) === 1 ? "" : "s"}.${exampleNames} We confirm who will deliver before you agree.`,
      },
      {
        q: `How fast is delivery in ${city.name}?`,
        a: deliveryText,
      },
      {
        q: `Is the LPG price different in ${city.name}?`,
        a: "The gas rate follows the OGRA monthly notification and is the same per-kg rate nationwide on this site. Delivery, cylinder deposit or exchange terms are confirmed for your order before you agree. See the pricing policy for how we quote.",
      },
      ...(o.localNotes && o.localNotes[0]
        ? [
            {
              q: `What should I know about LPG supply in ${city.name}?`,
              a: `${o.localNotes[0]}${o.localNotes[1] ? ` ${o.localNotes[1]}` : ""} Named partners for your area are listed on this page when available.`,
            },
          ]
        : []),
      {
        q: "What if I smell gas?",
        a: "Do not use the form. Close the cylinder valve if it is safe, open windows, avoid flames and switches, leave the area and call your local emergency service (1122 where available).",
      },
    ];

    return (
      <PageShell
        crumbs={[
          { name: "Delivery areas", href: "/delivery-areas/" },
          { name: `LPG in ${city.name}`, href: `/lpg-in-${slug}/` },
        ]}
        h1={`LPG gas in ${city.name}: price today, cylinder delivery and supply`}
        intro={`${site.name} is an OGRA-licensed LPG marketer and distributor (licence ${site.licenceNumber}) with a nationwide supply network. We take LPG orders for ${city.name} by call, WhatsApp and form${
          dirStats.total || city.suppliers
            ? `, with ${dirStats.total || city.suppliers} named supplier${(dirStats.total || city.suppliers) === 1 ? "" : "s"} listed below`
            : ""
        }. ${
          hourTarget
            ? "In covered areas the delivery target is about one hour when a local team is available; we confirm your street and timing on each order."
            : "We confirm your street and delivery window on each order."
        }`}
        aside={<SiteLeadForm defaultCity={slug} heading={`Order LPG in ${city.name}`} />}
      >
        <Note title="Nationwide licensed supply" tone="info">
          <p>
            {site.shortName} supplies homes and businesses across Pakistan under OGRA licence {site.licenceNumber}.{" "}
            {deliveryText}
          </p>
          <p className="mt-2">{terms.delivery247Note}</p>
        </Note>

        <H2>How supply works in {city.name}</H2>
        <P>
          We are an OGRA-licensed marketer and distributor (licence no. {site.licenceNumber}). Orders in {city.name} are
          passed to a distributor or supplier who serves your area, or fulfilled through our own licensed role where that
          applies. We confirm the price, who delivers and the delivery window with you before anything is dispatched. Read{" "}
          <Link className="underline" href="/how-it-works/">
            how it works
          </Link>
          .
        </P>

        <H2>Delivery in {city.name}</H2>
        <P>{deliveryText}</P>
        <UL
          items={[
            terms.delivery,
            "We confirm your street and access before dispatch.",
            "Empty-for-full exchange is arranged when your empty cylinder is ready and eligible.",
            hourTarget
              ? "About one hour is a target for covered areas with a local team available — not a guaranteed clock time for every street."
              : "Distance and traffic can change the window; we say so before you agree.",
          ]}
        />

        {localities.length >= 3 && (
          <>
            <H2>Areas of {city.name} we commonly serve</H2>
            <UL items={localities} />
            <P>If your area is not on the list, send a request anyway. We will tell you whether we can reach you.</P>
          </>
        )}

        <H2>What we list for {city.name}</H2>
        <UL
          items={[
            ...(dirStats.dealers > 0
              ? [`${dirStats.dealers} network dealer${dirStats.dealers === 1 ? "" : "s"}`]
              : [`${city.suppliers} supplier${city.suppliers === 1 ? "" : "s"} in our network`]),
            ...(dirStats.research > 0
              ? [`${dirStats.research} additional local distributor${dirStats.research === 1 ? "" : "s"}`]
              : []),
            ...(city.autoLpg > 0 ? [`${city.autoLpg} auto-LPG conversion and fitting partners`] : []),
            ...(city.open24h > 0 ? [`${city.open24h} partners that list 24-hour opening`] : []),
          ]}
        />

        {directoryListings.length > 0 && (
          <SupplierDirectory cityName={city.name} listings={directoryListings} perTier={20} />
        )}

        {o.localNotes && o.localNotes.length > 0 && (
          <>
            <H2>Local notes for {city.name}</H2>
            <UL items={o.localNotes} />
            {o.verifiedOn && <p className="mt-2 text-xs text-ink-500">Verified by our team on {o.verifiedOn}.</p>}
          </>
        )}

        <H2>LPG 1kg price today in {city.name}</H2>
        <P>
          The LPG price is set from OGRA&apos;s monthly notification and is the same per-kg rate nationwide. See the{" "}
          <Link className="underline" href="/lpg-price-in-pakistan/">
            LPG rate in Pakistan
          </Link>{" "}
          for the method and the{" "}
          <Link className="underline" href="/lpg-price-per-kg-in-pakistan/">LPG 1kg price today</Link>
          {["karachi", "lahore"].includes(slug) && (
            <>
              , or the{" "}
              <Link className="underline" href={`/lpg-price-in-pakistan/${slug}/`}>
                LPG price in {city.name}
              </Link>
            </>
          )}
          . Deposit, exchange and delivery terms are confirmed before you agree (
          <Link className="underline" href="/pricing-policy/">
            pricing policy
          </Link>
          ).
        </P>
        <PriceBlock citySlug={priceReady ? slug : undefined} cityName={city.name} />

        <H2>Businesses and larger sites in {city.name}</H2>
        <P>
          Restaurants, hotels, workshops and societies can ask for 45.4 kg cylinders, cylinder banks or engineering. See{" "}
          <Link className="underline" href="/commercial-lpg-supply/">
            commercial LPG supply
          </Link>{" "}
          and{" "}
          <Link className="underline" href="/projects/">
            engineering projects
          </Link>
          .
        </P>

        <H2>Useful links</H2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {usefulLinks.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>

        <H2>Nearby</H2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {nearby.map((n) => (
            <li key={n.slug}>
              <Link
                href={`/lpg-in-${n.slug}/`}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
              >
                LPG in {n.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/delivery-areas/"
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
            >
              All delivery areas
            </Link>
          </li>
          <li>
            <Link
              href="/lpg-near-me/"
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
            >
              LPG near me
            </Link>
          </li>
        </ul>

        <Faq items={faqs} />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Service",
            name: `LPG cylinder supply in ${city.name}`,
            description: `LPG cylinder refill, exchange and delivery in ${city.name} at the OGRA-notified rate, through listed local dealers.`,
            url: absoluteUrl(`/lpg-in-${slug}/`),
            provider: { "@id": absoluteUrl("/#organization") },
            areaServed: { "@type": "City", name: city.name },
          }}
        />
      </PageShell>
    );
  }

  // Province hub
  const p = prov!;
  const pd = provinceDetail[slug];
  const dir = provinceDirectory(slug);
  const cityList = p.cities.map((s) => cityBySlug(s)).filter(Boolean) as NonNullable<ReturnType<typeof cityBySlug>>[];
  const provHubs = hubCities.filter((c) => c.province === p.name);
  // Only link pages that exist: hub cities + curated static city pages (never invent /lpg-in-* for thin towns).
  const childLinks: { href: string; label: string; hint?: string }[] = [];
  const seenHref = new Set<string>();
  const pushChild = (href: string, label: string, hint?: string) => {
    if (seenHref.has(href)) return;
    seenHref.add(href);
    childLinks.push({ href, label, hint });
  };
  for (const c of [...cityList.filter((c) => c.hub), ...provHubs]) {
    const n = listedCount(c.slug, c.suppliers);
    pushChild(`/lpg-in-${c.slug}/`, `LPG in ${c.name}`, n > 0 ? `${n} named listing${n === 1 ? "" : "s"}` : undefined);
  }
  for (const l of provinceLocalPages[slug] ?? []) {
    pushChild(l.href, l.label);
  }
  const pageFor = new Map(childLinks.map((l) => [l.href.replace(/^\/lpg-in-/, "").replace(/\/$/, ""), l.href]));
  const topTowns = dir.towns.slice(0, 12);
  const thin = dir.total < 20;
  const leadTown = topTowns[0];
  const leadDealers = leadTown ? namedSuppliersForCity(leadTown.slug, 4) : [];

  return (
    <PageShell
      crumbs={[
        { name: "Delivery areas", href: "/delivery-areas/" },
        { name: `LPG in ${p.name}`, href: `/lpg-in-${slug}/` },
      ]}
      h1={`LPG in ${p.name}: cylinders, gas supply and delivery`}
      intro={`${pd.opener} ${site.shortName} (OGRA licence ${site.licenceNumber}) takes orders from anywhere in ${p.name} by call, WhatsApp or form, and confirms your street, price and timing before you agree.`}
      aside={<SiteLeadForm heading={`Order LPG in ${p.name}`} />}
    >
      <H2>LPG in {p.name} at a glance</H2>
      <SpecTable
        head={["", p.name]}
        rows={[
          ["Named listings in our directory", dir.total.toLocaleString("en-PK")],
          ["Network dealers / local distributors", `${dir.dealers} / ${dir.research}`],
          ["Towns with listings", String(dir.towns.length)],
          ["LPG filling points listed", String(dir.fillingPoints)],
          ["Licensed marketer plants listed", String(dir.plants.length)],
          ["How gas arrives", pd.route],
          ["Peak demand", pd.peak],
          ["Climate", pd.climate],
        ]}
      />

      <H2>How LPG reaches {p.name}</H2>
      {pd.supply.map((t) => (
        <P key={t.slice(0, 24)}>{t}</P>
      ))}
      <Note title="Ordering and delivery" tone="info">
        <p>{terms.delivery}</p>
      </Note>

      <H2>Season and weather in {p.name}</H2>
      {pd.season.map((t) => (
        <P key={t.slice(0, 24)}>{t}</P>
      ))}
      <Note title={`Tip for ${p.name}`}>
        <p>{pd.tip}</p>
      </Note>

      <H2>Regions of {p.name} and what to expect</H2>
      <SpecTable head={["Region", "Main towns", "Supply notes"]} rows={pd.regions} />

      <H2>LPG dealers by town in {p.name}</H2>
      <P>
        Towns with the most listings in our directory. Open a city page for named dealers, phone numbers and delivery
        notes; if your town is missing, send a request anyway and we check who can reach you.
      </P>
      <SpecTable
        head={["Town", "Listings"]}
        rows={topTowns.map((t) => [
          pageFor.has(t.slug) ? (
            <Link key={t.slug} className="underline" href={pageFor.get(t.slug)!}>
              {t.name}
            </Link>
          ) : (
            t.name
          ),
          String(t.count),
        ])}
      />
      {leadTown && leadDealers.length > 0 && (
        <>
          <P>Some of the dealers we list in {leadTown.name}:</P>
          <UL
            items={leadDealers.map(
              (x) =>
                `${x.name.replace(/_+/g, " ")}${x.locality ? `, ${x.locality}` : ""}${x.phone ? ` (${formatPhoneDisplay(x.phone)})` : ""}`,
            )}
          />
        </>
      )}
      {dir.plantCompanies.length > 0 && (
        <P>
          Licensed LPG marketers with plants listed in {p.name}: {dir.plantCompanies.slice(0, 8).join(", ")}
          {dir.plantCompanies.length > 8 ? ` and ${dir.plantCompanies.length - 8} more` : ""}. Bulk and tanker supply is
          arranged from a plant; cylinders reach you through local dealers.
        </P>
      )}

      {childLinks.length > 0 && (
        <>
          <H2>City pages in {p.name}</H2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {childLinks.map((c) => (
              <li key={c.href} className="rounded-lg border border-slate-200 p-3">
                <Link href={c.href} className="font-semibold text-ink hover:underline">
                  {c.label}
                </Link>
                {c.hint ? <span className="ml-2 text-sm text-ink-500">{c.hint}</span> : null}
              </li>
            ))}
          </ul>
        </>
      )}

      <H2>Where LPG is used most in {p.name}</H2>
      <UL
        items={pd.uses.map((u) => (
          <span key={u.href}>
            <Link className="underline" href={u.href}>
              {u.label}
            </Link>
            : {u.why}
          </span>
        ))}
      />

      {thin && (
        <Note tone="warn" title="Coverage here is still growing">
          Fewer partners are listed in {p.name} than in the big cities, so delivery can take longer. Send a request and
          we tell you honestly whether and when we can supply you. Want to supply gas in your area?{" "}
          <Link className="underline" href="/become-an-lpg-distributor/">
            Become a distributor
          </Link>
          .
        </Note>
      )}

      <H2>Price in {p.name}</H2>
      <P>
        The gas rate is the OGRA-notified price per kg, the same in {p.name} as everywhere else; what changes is delivery,
        deposit and the distance from the nearest dealer. See{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>{" "}
        and our{" "}
        <Link className="underline" href="/pricing-policy/">
          pricing policy
        </Link>
        .
      </P>
      <ul className="mt-3 flex flex-wrap gap-2">
        {usefulLinks.map((n) => (
          <li key={n.href}>
            <Link
              href={n.href}
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
            >
              {n.label}
            </Link>
          </li>
        ))}
      </ul>

      <Faq
        items={[
          ...pd.faqs,
          {
            q: `How do I order LPG in ${p.name}?`,
            a: `Call or WhatsApp ${site.phoneDisplay}, or use the form with your town, street or landmark and cylinder size. We confirm price and delivery before you agree.`,
          },
          {
            q: "What if I smell gas?",
            a: "Do not use the form. Close the cylinder valve if it is safe, open windows, avoid flames and switches, leave the area and call your local emergency service (1122 where available).",
          },
        ]}
      />
    </PageShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import PriceBlock from "@/components/PriceBlock";
import SupplierDirectory from "@/components/SupplierDirectory";
import { terms } from "@/lib/commercial";
import { cityDirectoryStats, listingsForCity, namedSuppliersForCity } from "@/lib/directory";
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
      index: false, // province hubs go live with the P2 wave
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
  const cityList = p.cities.map((s) => cityBySlug(s)).filter(Boolean) as NonNullable<ReturnType<typeof cityBySlug>>[];
  const thin = p.suppliers < 5;
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
    const st = cityDirectoryStats(c.slug);
    const hintCount = st.total || c.suppliers;
    pushChild(
      `/lpg-in-${c.slug}/`,
      `LPG in ${c.name}`,
      hintCount > 0 ? `${hintCount} named listing${hintCount === 1 ? "" : "s"}` : undefined,
    );
  }
  for (const l of provinceLocalPages[slug] ?? []) {
    pushChild(l.href, l.label);
  }

  const majorHubs = [...hubCities].sort((a, b) => b.suppliers - a.suppliers).slice(0, 6);
  const provinceDealerSamples = childLinks
    .map((l) => l.href.replace(/^\/lpg-in-/, "").replace(/\/$/, ""))
    .flatMap((citySlug) => namedSuppliersForCity(citySlug, 1))
    .slice(0, 4);
  const provinceDealerLine =
    provinceDealerSamples.length > 0
      ? ` Named partners in ${p.name} include ${provinceDealerSamples.map((d) => d.name).join(", ")} among others listed on the city pages.`
      : "";

  return (
    <PageShell
      crumbs={[
        { name: "Delivery areas", href: "/delivery-areas/" },
        { name: `LPG in ${p.name}`, href: `/lpg-in-${slug}/` },
      ]}
      h1={`LPG in ${p.name}: cylinders, gas supply and delivery`}
      intro={`${site.name} is an OGRA-licensed LPG marketer and distributor (licence ${site.licenceNumber}) with a nationwide network across Pakistan. In ${p.name} we supply homes and businesses through local distributors — order by call, WhatsApp or form and we confirm your street, price and timing before you agree.${provinceDealerLine}`}
      aside={<SiteLeadForm heading={`Order LPG in ${p.name}`} />}
    >
      <Note title="Nationwide licensed supply" tone="info">
        <p>
          {terms.delivery} Orders from every province are accepted around the clock; fulfilment follows distributor
          availability in your area. Open a city hub below for delivery notes and the named directory for that town.
        </p>
      </Note>

      <H2>Cities and towns in {p.name}</H2>
      {childLinks.length > 0 ? (
        <>
          <P>
            Open a city page for local delivery notes, named suppliers and how to order. If your town is not listed, send
            a request anyway — we check who can reach you.
          </P>
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
      ) : (
        <P>
          We serve {p.name} through our nationwide distributor network. Send your town, area and cylinder size and we
          check which distributor can reach you, then tell you honestly whether and when we can supply you.
        </P>
      )}

      {cityList.some((c) => !c.hub) && (
        <>
          <H2>Other towns where partners are listed</H2>
          <P>
            These towns appear in our partner list but do not have a dedicated page yet. Order with your town name and we
            confirm coverage.
          </P>
          <UL
            items={cityList
              .filter((c) => !c.hub)
              .map(
                (c) =>
                  `${c.name} (${c.suppliers} supplier${c.suppliers === 1 ? "" : "s"} listed)`,
              )}
          />
        </>
      )}

      {thin && (
        <Note tone="warn" title="Coverage here is still limited">
          We have only a small number of partners listed in {p.name} today, so delivery times can be longer than in our
          main cities. Send a request and we will tell you honestly whether and when we can supply you. Want to supply
          gas in your area?{" "}
          <Link className="underline" href="/become-an-lpg-distributor/">
            Become a distributor
          </Link>
          .
        </Note>
      )}

      <H2>Order anywhere in Pakistan</H2>
      <P>
        {site.shortName} takes LPG orders nationwide. Use{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>{" "}
        or{" "}
        <Link className="underline" href="/lpg-near-me/">
          LPG near me
        </Link>{" "}
        if you are outside the cities above. The gas rate is the same OGRA-notified per-kg price in every city; deposit
        and delivery are confirmed before you agree (
        <Link className="underline" href="/pricing-policy/">
          pricing policy
        </Link>
        ).
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
        <li>
          <Link
            href="/delivery-areas/"
            className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
          >
            All delivery areas
          </Link>
        </li>
      </ul>

      <H2>Major city hubs</H2>
      <P>Larger cities where we list the most suppliers — useful if you are travelling or near one of them:</P>
      <ul className="mt-3 flex flex-wrap gap-2">
        {majorHubs.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/lpg-in-${c.slug}/`}
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
            >
              LPG in {c.name} ({c.suppliers} listed)
            </Link>
          </li>
        ))}
      </ul>

      <Faq
        items={[
          {
            q: `How do I order LPG in ${p.name}?`,
            a: `Call or WhatsApp ${site.phoneDisplay}, or use the form. Tell us your city or town, street or landmark, and cylinder size. We confirm price and delivery with you before you agree.`,
          },
          {
            q: `Who delivers in ${p.name}?`,
            a: `${site.name} is an OGRA-licensed marketer and distributor. Orders are fulfilled through local distributors in our nationwide network, or our own licensed role where that applies. We confirm who delivers before you agree.`,
          },
          {
            q: `How fast is delivery in ${p.name}?`,
            a: "In covered major-city areas the target is about one hour when a local team is available. Outside those belts, timing depends on roads and partner distance — we confirm your street and window on the call.",
          },
          {
            q: `Is the LPG price different in ${p.name}?`,
            a: "No. The gas rate follows the OGRA monthly notification and is the same per-kg rate nationwide. Delivery, deposit and exchange terms are confirmed for your order.",
          },
          {
            q: "Do you supply outside the main cities?",
            a: "We try. Availability depends on whether we have a distributor near you, and we will tell you straight away if we cannot reach your area.",
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

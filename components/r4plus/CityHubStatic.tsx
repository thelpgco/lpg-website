import Link from "next/link";
import DeliveryFacts from "@/components/DeliveryFacts";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import PriceBlock from "@/components/PriceBlock";
import SupplierDirectory from "@/components/SupplierDirectory";
import { terms } from "@/lib/commercial";
import { cityDetail } from "@/lib/city-detail";
import { cityDirectoryStats, listingsForCity, namedSuppliersForCity } from "@/lib/directory";
import { HOURS_TEXT, PAYMENT_TEXT, deliveryTimeText, localDelivery, priceLine, whoDeliversText } from "@/lib/local-delivery";
import { itemsFor } from "@/lib/media";
import { cityBySlug, formCities, overrideFor, provinceBySlug } from "@/lib/network";
import { CYLINDER_SIZES_KG, cylinderPrice, latestPrice, priceReady } from "@/lib/prices";
import { absoluteUrl, site } from "@/lib/site";

// Cities with their own /lpg-price-in-pakistan/{city}/ page (app/lpg-price-in-pakistan/[city] CITIES).
const CITY_PRICE_PAGES = ["karachi", "lahore"];

export type CityHubProps = {
  slug: string;
  /** Display name, e.g. "Multan". */
  name: string;
  /** Province hub slug in our network, e.g. "punjab". */
  provinceSlug: string;
  /** Short local demand paragraph shown under the intro (facts only, no partner names). */
  summary: string;
  /** Five or more local angles (climate, demand, geography). Keep to facts that are generally true. */
  angles: { title: string; text: string }[];
  /** Cylinder sizes most relevant here, with why. */
  sizeNotes: string[];
  /** Local pages worth linking (slug -> label). */
  nearby: { slug: string; label: string }[];
  /** Extra FAQ items specific to this city. */
  extraFaqs?: { q: string; a: string }[];
  /** Optional winter / logistics warning (cold or hill cities). */
  seasonNote?: { title: string; text: string };
};

function deliveryCopy(cityName: string, o: ReturnType<typeof overrideFor>): string {
  if (o.deliveryNote) return o.deliveryNote;
  if (o.testOrderMinutes) {
    return `Target about ${o.testOrderMinutes} minutes in covered ${cityName} areas when a local team is available. Timing depends on your area and the time of day; we confirm it when you order and confirm your street before dispatch.`;
  }
  return `Delivery time in ${cityName} depends on your area, road conditions and the time of day. We confirm the window and your street before you agree.`;
}

/** ~1 hour intro/bullet language only when the override records a ≤60 minute target. */
function supportsHourTarget(o: ReturnType<typeof overrideFor>): boolean {
  return typeof o.testOrderMinutes === "number" && o.testOrderMinutes <= 60;
}

export default function CityHubStatic(p: CityHubProps) {
  const path = `/lpg-in-${p.slug}/`;
  const city = cityBySlug(p.slug);
  const o = overrideFor(p.slug);
  const prov = provinceBySlug(p.provinceSlug);
  const inForm = formCities.some((c) => c.slug === p.slug);
  const suppliers = city?.suppliers ?? 0;
  const autoLpg = city?.autoLpg ?? 0;
  const localities = city?.localities ?? [];
  const directoryListings = listingsForCity(p.slug);
  const dirStats = cityDirectoryStats(p.slug);
  const namedExamples = namedSuppliersForCity(p.slug, 5);
  const hasPartners = suppliers > 0 || directoryListings.length > 0;
  const hourTarget = supportsHourTarget(o);
  const exampleNames =
    namedExamples.length > 0
      ? ` Examples listed for ${p.name} include ${namedExamples.map((n) => n.name).join(", ")}.`
      : "";
  const deliveryText = deliveryCopy(p.name, o);
  const cd = cityDetail[p.slug];
  const local = localDelivery[p.slug];
  const price = priceLine();
  const n = latestPrice;

  // Twin-city pages answer the questions people put to Google and AI assistants, in the words they use.
  const localFaqs = local
    ? [
        {
          q: `Does ${site.shortName} deliver LPG in ${p.name}?`,
          a: `Yes. LPG cylinders in ${p.name} are delivered by ${whoDeliversText()}`,
        },
        { q: `How long does LPG delivery take in ${p.name}?`, a: deliveryTimeText(p.slug) },
        {
          q: `Which areas of ${p.name} do you deliver to?`,
          a: `${local.areas.join("; ")}. Closest to us: ${local.nearest}. If your area is not listed, send it anyway and we confirm.`,
        },
        ...(price ? [{ q: `What is the LPG cylinder price in ${p.name} today?`, a: price }] : []),
        { q: "How do I pay?", a: PAYMENT_TEXT },
        { q: "Are you open at night and on Sundays?", a: `${HOURS_TEXT} The delivery window is confirmed when you order.` },
        {
          q: "Are the cylinders safe and certified?",
          a: `${terms.partnersCertifiedRule} We are licensed by OGRA (licence ${site.licenceNumber}).`,
        },
      ]
    : [];

  const faqs = [
    ...localFaqs,
    {
      q: `How do I order an LPG cylinder in ${p.name}?`,
      a: `Call or WhatsApp ${site.phoneDisplay}, or send the form with your area and cylinder size. ${cd?.tips[0] ?? ""}`,
    },
    ...(local ? [] : [{
      q: `Who delivers in ${p.name}?`,
      a: hasPartners
        ? `For ${p.name} we list ${dirStats.total || suppliers} named supplier${(dirStats.total || suppliers) === 1 ? "" : "s"}.${exampleNames} We confirm who fulfils your order before you agree.`
        : `${site.name} is an OGRA-licensed marketer and distributor that also works as a reseller and referral partner. We do not yet have a named supplier listed for ${p.name}, so we check each request and tell you honestly whether and when we can supply you.`,
    }]),
    ...(p.extraFaqs ?? []),
    {
      q: "What if I smell gas?",
      a: "Do not use the form. Close the cylinder valve if it is safe, open windows, avoid flames and switches, leave the area and call your local emergency service (1122 where available).",
    },
  ];

  const nearbyLinks = [
    ...(prov && p.provinceSlug !== p.slug
      ? [{ href: `/lpg-in-${p.provinceSlug}/`, label: `LPG in ${prov.name}` }]
      : []),
    ...p.nearby.map((n) => ({ href: `/lpg-in-${n.slug}/`, label: n.label })),
  ];

  const usefulLinks = [
    { href: "/order-lpg/", label: "Order LPG" },
    { href: "/lpg-price-per-kg-in-pakistan/", label: "LPG price per kg" },
    { href: "/commercial-lpg-supply/", label: "Commercial LPG supply" },
    { href: "/projects/", label: "Engineering projects" },
    { href: "/lpg-near-me/", label: "LPG near me" },
  ];

  return (
    <PageShell
      crumbs={[{ name: "Delivery areas", href: "/delivery-areas/" }, { name: `LPG in ${p.name}`, href: path }]}
      h1={
        local
          ? `LPG delivery in ${p.name}: gas cylinder price and supply`
          : hasPartners
          ? `LPG gas in ${p.name}: price, cylinder delivery and supply`
          : `LPG in ${p.name}: guidance, price and supply inquiry`
      }
      intro={
        hasPartners
          ? `${cd?.lead ?? ""} ${p.summary} Supplied by ${site.shortName}, OGRA licence ${site.licenceNumber}.`
          : `${site.name} is an OGRA-licensed LPG marketer and distributor (licence ${site.licenceNumber}) with a nationwide network. ${p.summary} We do not yet list a named supplier for ${p.name}, so we do not promise delivery here. Send an inquiry with your area and cylinder size and we tell you honestly whether we can reach you.`
      }
      aside={
        <SiteLeadForm
          defaultCity={inForm ? p.slug : "other"}
          defaultRequest="cylinder_delivery"
          heading={hasPartners ? `Order LPG in ${p.name}` : `Send an LPG inquiry for ${p.name}`}
        />
      }
    >
      {local && <DeliveryFacts slug={p.slug} />}

      <Note title="Nationwide licensed supply" tone={hasPartners ? "info" : "warn"}>
        <p>
          {hasPartners
            ? `${dirStats.total || suppliers} named listing${(dirStats.total || suppliers) === 1 ? "" : "s"} in ${p.name} below, with phone numbers.`
            : `We do not yet have a named supplier listed for ${p.name}. Send an inquiry anyway: we tell you straight away whether we can reach you, and if not, we say so rather than leave you waiting.`}
        </p>
        {!hasPartners && (
          <p className="mt-2">
            <Link className="underline" href="/order-lpg/">
              Send an inquiry
            </Link>{" "}
            or call or WhatsApp {site.phoneDisplay}. You can also see{" "}
            <Link className="underline" href="/delivery-areas/">
              where we deliver
            </Link>
            .
          </p>
        )}
      </Note>

      {cd && (
        <>
          <H2>Sui gas and LPG in {p.name}</H2>
          <P>{cd.gas}</P>
        </>
      )}

      <H2>Delivery in {p.name}</H2>
      <P>{deliveryText}</P>
      <P>{terms.delivery}</P>
      {cd && (
        <>
          <H2>Tips for ordering in {p.name}</H2>
          <UL items={cd.tips} />
        </>
      )}

      {local && (
        <>
          <H2>Areas of {p.name} we deliver to</H2>
          <UL items={local.areas} />
          <P>Not on the list? Send your area anyway and we tell you straight away whether we can reach you.</P>
        </>
      )}

      {!local && hasPartners && localities.length > 0 && (
        <>
          <H2>Areas of {p.name} we commonly serve</H2>
          <UL items={localities} />
          <P>Not on the list? Send your area anyway.</P>
        </>
      )}

      {(autoLpg > 0 || (city?.open24h ?? 0) > 0 || dirStats.total > 0) && (
        <>
          <H2>What we list for {p.name}</H2>
          <UL
            items={[
              ...(dirStats.dealers > 0
                ? [`${dirStats.dealers} network dealer${dirStats.dealers === 1 ? "" : "s"}`]
                : suppliers > 0
                  ? [
                      `${suppliers} distributor${suppliers === 1 ? "" : "s"} or supplier${suppliers === 1 ? "" : "s"} in our network`,
                    ]
                  : ["No network dealer listed yet"]),
              ...(dirStats.research > 0
                ? [`${dirStats.research} additional local distributor${dirStats.research === 1 ? "" : "s"}`]
                : []),
              ...(autoLpg > 0
                ? [`${autoLpg} auto-LPG conversion or fitting partner${autoLpg === 1 ? "" : "s"}`]
                : []),
              ...((city?.open24h ?? 0) > 0
                ? [`${city!.open24h} partner${city!.open24h === 1 ? "" : "s"} that list 24-hour opening`]
                : []),
            ]}
          />
        </>
      )}

      {directoryListings.length > 0 && (
        <SupplierDirectory cityName={p.name} listings={directoryListings} perTier={18} />
      )}

      <H2>Local angles for {p.name}</H2>
      <ul className="mt-3 space-y-3">
        {p.angles.map((a) => (
          <li key={a.title} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">{a.title}</p>
            <p className="mt-1 text-ink-700">{a.text}</p>
          </li>
        ))}
      </ul>

      {p.seasonNote && (
        <Note tone="warn" title={p.seasonNote.title}>
          <p>{p.seasonNote.text}</p>
        </Note>
      )}

      <H2>Cylinder sizes people ask for in {p.name}</H2>
      <UL items={p.sizeNotes} />
      <P>
        Compare all sizes on{" "}
        <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">
          LPG cylinder sizes
        </Link>{" "}
        and estimate refills with the{" "}
        <Link className="underline" href="/tools/lpg-cylinder-duration-calculator/">
          cylinder duration calculator
        </Link>
        .
      </P>

      {o.localNotes && o.localNotes.length > 0 && (
        <>
          <H2>Local notes for {p.name}</H2>
          <UL items={o.localNotes} />
          {o.verifiedOn && <p className="mt-2 text-xs text-ink-500">Verified by our team on {o.verifiedOn}.</p>}
        </>
      )}

      <H2>LPG price per kg in {p.name}</H2>
      <P>
        {p.name} pays the same OGRA-notified rate per kg as the rest of Pakistan. History and the per-kg breakdown:{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>
        {CITY_PRICE_PAGES.includes(p.slug) && (
          <>
            {" "}
            and{" "}
            <Link className="underline" href={`/lpg-price-in-pakistan/${p.slug}/`}>
              LPG price in {p.name} today
            </Link>
          </>
        )}
        .
      </P>
      <PriceBlock citySlug={priceReady ? p.slug : undefined} cityName={p.name} />

      {cd && (
        <>
          <H2>Businesses in {p.name} that run on LPG</H2>
          <UL
            items={cd.sectors.map((x) => (
              <span key={x.slug}>
                <Link className="underline" href={`/industries/${x.slug}/`}>
                  {x.label}
                </Link>
                : {x.why}
              </span>
            ))}
          />
        </>
      )}

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
        {nearbyLinks.map((n) => (
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
        <li>
          <Link
            href="/lpg-near-me/"
            className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
          >
            LPG near me
          </Link>
        </li>
      </ul>

      <ImageGallery items={itemsFor(path)} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `LPG cylinder supply in ${p.name}`,
          description: `LPG cylinder refill, exchange and delivery in ${p.name} at the OGRA-notified rate, through listed local dealers.`,
          url: absoluteUrl(path),
          provider: { "@id": absoluteUrl("/#organization") },
          serviceType: "LPG cylinder delivery",
          areaServed: local
            ? [
                { "@type": "City", name: p.name },
                ...local.areas.map((a) => ({ "@type": "Place", name: `${a}, ${p.name}` })),
              ]
            : { "@type": "City", name: p.name },
          ...(local
            ? {
                hoursAvailable: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "00:00",
                  closes: "23:59",
                },
                availableChannel: {
                  "@type": "ServiceChannel",
                  servicePhone: { "@type": "ContactPoint", telephone: `+${site.phone}`, contactType: "orders" },
                  serviceUrl: absoluteUrl(path),
                },
              }
            : {}),
          ...(local && n
            ? {
                hasOfferCatalog: {
                  "@type": "OfferCatalog",
                  name: `LPG cylinder refill prices in ${p.name} (gas only, OGRA ${n.month})`,
                  itemListElement: CYLINDER_SIZES_KG.map((kg) => ({
                    "@type": "Offer",
                    name: `${kg} kg LPG cylinder refill`,
                    price: String(cylinderPrice(kg)),
                    priceCurrency: "PKR",
                    validFrom: n.effectiveFrom,
                  })),
                },
              }
            : {}),
        }}
      />
    </PageShell>
  );
}

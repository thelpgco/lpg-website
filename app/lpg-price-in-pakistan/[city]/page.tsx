import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import PriceBlock from "@/components/PriceBlock";
import SpecTable from "@/components/SpecTable";
import {
  cityDirectoryStats,
  formatPhoneDisplay,
  namedSuppliersForCity,
} from "@/lib/directory";
import { itemsFor } from "@/lib/media";
import { cityBySlug, isCityIndexable, overrideFor } from "@/lib/network";
import { latestPrice, pkr } from "@/lib/prices";
import { monthLong } from "@/lib/money";
import { fitDescription, fitTitle, meta } from "@/lib/seo";
import { terms } from "@/lib/commercial";
import { company } from "@/lib/company/profile";
import { site } from "@/lib/site";

const CITY_IMAGE: Record<string, { src: string; alt: string }> = {
  karachi: {
    src: "/images/cities/51-karachi-mazar-e-quaid.png",
    alt: "Karachi city view near Mazar-e-Quaid",
  },
  lahore: {
    src: "/images/cities/49-lahore-badshahi-mosque.png",
    alt: "Lahore city view near Badshahi Mosque",
  },
};

/** City-only price context: what moves the delivered total here, plus local FAQs. */
const CITY_PRICE: Record<
  string,
  {
    intro: string;
    context: string[];
    factors: string[];
    /** Monthly gas use examples for this city: label, kg per month. */
    examples: [string, number][];
    faqs: { q: string; a: string }[];
  }
> = {
  karachi: {
    intro:
      "Karachi pays the same OGRA rate per kg as every other city, but it sits next to the import terminals at Port Qasim, so stock is rarely short for long and a quote far above the notified rate is hard to justify.",
    context: [
      "Because most imported LPG lands in Karachi, the city is usually the first to see a new month's stock at the new rate. When the rate rises, a few shops move early; when it falls, some keep the old rate for a few days. Asking which month's notification a quote uses settles most disagreements.",
      "Karachi's delivered total varies more with the building than with the area. Carrying a 45.4 kg commercial cylinder up several floors without a lift takes two people, and some dealers charge for it. Industrial customers in SITE, Korangi and Landhi pay by volume, with tanker or cylinder-bank terms agreed in writing.",
    ],
    factors: [
      "Floor and lift access in high-rise flats",
      "Exchange of an eligible empty versus a new cylinder deposit",
      "Commercial volume: weekly cylinder routes for restaurants and bakeries",
      "Industrial terms: bulk tanker or cylinder bank by monthly kg",
    ],
    examples: [
      ["Flat in Gulshan or North Nazimabad, cooking only (one 11.8 kg a month)", 11.8],
      ["Family home in Clifton or DHA with a gas geyser in winter", 35.4],
      ["Biryani or karahi restaurant, four 45.4 kg cylinders a week", 45.4 * 4 * 4.3],
      ["Bakery in SITE or Korangi, two 45.4 kg cylinders a day", 45.4 * 2 * 30],
    ],
    faqs: [
      { q: "Karachi mein LPG cylinder ka rate kya hai?", a: "Karachi mein bhi wahi OGRA notified rate lagta hai jo poore Pakistan mein hai. Gas ki qeemat = kg × rate; delivery, upar le jaane ka kharcha aur deposit alag se confirm hote hain." },
      { q: "Why do Karachi shops quote different prices on the same day?", a: "Some are still on last month's rate, some include delivery or carrying charges, and some quote decanted gas. Ask for gas, delivery and deposit as separate lines." },
    ],
  },
  lahore: {
    intro:
      "Lahore pays the same OGRA rate per kg as Karachi, but its stock comes by road from plants and terminals, and winter demand spikes when Sui gas pressure drops, so the gap between the notified rate and shop quotes is widest in December and January.",
    context: [
      "In Lahore's winter, demand for 11.8 kg cylinders jumps on the coldest evenings, and fog slows trucks on the motorways. That is when some sellers quote above the notified rate. Ordering before you run out, from a dealer who shows the gas price as kg × rate, avoids paying a shortage premium.",
      "Wedding season adds a second peak. Marriage halls and caterers order many 45.4 kg cylinders for the same dates, so booking ahead at an agreed rate protects you from last-minute prices. Gated schemes like DHA and Bahria are easy to reach, but entry at the gate can add time, not cost.",
    ],
    factors: [
      "Winter shortage weeks, when some sellers add a premium",
      "Wedding-season bookings of several 45.4 kg cylinders",
      "Narrow lanes in older areas that need a pickup or motorbike delivery",
      "Exchange of an eligible empty versus a new cylinder deposit",
    ],
    examples: [
      ["House in Johar Town or Model Town, cooking only (one 11.8 kg a month)", 11.8],
      ["Family home in winter with a gas geyser and a heater", 47.2],
      ["Tikka or karahi restaurant on a food street, five 45.4 kg cylinders a week", 45.4 * 5 * 4.3],
      ["Wedding with 500 guests, one event (about 70 kg of gas)", 70],
    ],
    faqs: [
      { q: "Lahore mein gas cylinder ka rate kya hai?", a: "Lahore mein bhi OGRA ka wahi fi kg rate hai jo Karachi aur Islamabad mein hai. Sardiyon mein kuch dukaanein zyada maangti hain; gas, delivery aur deposit alag alag poochhein." },
      { q: "Why are LPG prices higher in Lahore in winter?", a: "The notified rate is the same, but demand jumps when Sui gas pressure drops and fog slows deliveries. Some sellers add a premium; ordering early from a dealer who shows kg × rate avoids it." },
    ],
  },
};

export const dynamicParams = false;
const CITIES = ["karachi", "lahore"]; // only cities where the SERP-overlap test showed a separate page is justified

export function generateStaticParams() {
  return CITIES.map((city) => ({ city }));
}

// Indexable once a verified notification exists: each city page carries its own price context (CITY_PRICE), so it
// no longer duplicates the national page. meta() still requires "published" in data/pages.json.

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city } = await params;
  const c = cityBySlug(city);
  if (!c) return {};
  return meta({
    path: `/lpg-price-in-pakistan/${city}/`,
    title: fitTitle([
      `LPG Price in ${c.name} Today: Rate per kg and Cylinder`,
      `LPG Price in ${c.name} Today: Rate per kg and Cylinder Price`,
    ]),
    description: fitDescription([
      `LPG price in ${c.name} today: the per-kg rate and 5, 11.8, 15 and 45.4 kg cylinder prices, how it relates to the OGRA notification, and how to order in ${c.name}.`,
      `LPG price in ${c.name} today: per-kg rate and 5, 11.8, 15 and 45.4 kg cylinder prices, how it follows the OGRA notification and how to order here.`,
    ]),
    index: Boolean(latestPrice),
  });
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const c = cityBySlug(city);
  if (!c || !CITIES.includes(city)) notFound();
  const o = overrideFor(city);
  const verified = isCityIndexable(city);
  const dirStats = cityDirectoryStats(city);
  const named = namedSuppliersForCity(city, 6);
  const deliveryLine = o.deliveryNote ?? terms.delivery;
  const cp = CITY_PRICE[city];

  const faqs = [
    ...(cp?.faqs ?? []),
  ];

  return (
    <PageShell
      crumbs={[
        { name: "LPG price in Pakistan", href: "/lpg-price-in-pakistan/" },
        { name: c.name, href: `/lpg-price-in-pakistan/${city}/` },
      ]}
      h1={`LPG price in ${c.name} today`}
      intro={`${cp?.intro ?? ""} ${company.shortName} (licence ${company.licenceNumber}) confirms the full price before you agree.`}
      aside={<SiteLeadForm defaultCity={city} heading={`Order LPG in ${c.name}`} />}
    >
      <PriceBlock citySlug={city} cityName={c.name} />

      {CITY_IMAGE[city] ? (
        <ContentImage
          src={CITY_IMAGE[city].src}
          alt={CITY_IMAGE[city].alt}
          caption={`${c.name} — landmark context for this city price page (not a branch office).`}
        />
      ) : null}

      {cp && (
        <>
          <H2>What decides the LPG price you pay in {c.name}</H2>
          {cp.context.map((t) => (
            <P key={t.slice(0, 24)}>{t}</P>
          ))}
          <H2>What changes your delivered total in {c.name}</H2>
          <UL items={cp.factors} />
          {latestPrice && (
            <>
              <H2>Monthly gas cost examples in {c.name}</H2>
              <SpecTable
                head={["Who", "Gas per month", `Gas cost at ${pkr(latestPrice.perKgPkr)}/kg`]}
                rows={cp.examples.map(([who, kg]) => [
                  who,
                  `about ${Math.round(kg).toLocaleString("en-PK")} kg`,
                  pkr(Math.round(kg * latestPrice!.perKgPkr)),
                ])}
                caption="Gas only, at this month's notified rate. Delivery and deposit are confirmed per order."
              />
            </>
          )}
        </>
      )}
      <P>
        Method and national context:{" "}
        <Link className="underline" href="/lpg-price-per-kg-in-pakistan/">
          LPG 1kg price today
        </Link>{" "}
        and the{" "}
        <Link className="underline" href="/ogra-lpg-notified-price/">
          OGRA notified LPG price
        </Link>
        .
      </P>

      <H2>Delivery in {c.name}</H2>
      <P>{deliveryLine}</P>
      {verified && o.verifiedOn && (
        <p className="mt-3 text-sm text-ink-600">
          Local supply checks for {c.name} were recorded on {o.verifiedOn}.
        </p>
      )}
      {!verified && (
        <P>
          {c.name} is not yet marked fully verified in our records. We still accept requests and confirm honestly
          whether we can reach your area.
        </P>
      )}

      <H2>Named dealers in {c.name}</H2>
      <P>
        Directory on file for this city: {dirStats.dealers} network dealers · {dirStats.total} local listings. Open the
        city hub for the fuller list — phones below are as listed for that dealer. Street coverage is confirmed when you
        order.
      </P>
      {named.length > 0 ? (
        <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-ink">
              <tr>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Area</th>
                <th className="p-3 font-semibold">Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-ink-700">
              {named.map((r) => (
                <tr key={r.id}>
                  <td className="p-3 font-medium text-ink">{r.name}</td>
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
      ) : (
        <P>No named rows on file for this slug yet — send a request and we match supply if available.</P>
      )}
      <P>
        <Link className="underline" href={`/lpg-in-${city}/`}>
          LPG supply in {c.name}
        </Link>{" "}
        — full hub with directory sections ·{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>{" "}
        ·{" "}
        <Link className="underline" href="/lpg-near-me/">
          LPG near me
        </Link>
      </P>

      <H2>Ordering LPG in {c.name}</H2>
      <UL
        items={[
          <span key="o">
            <Link className="underline" href="/order-lpg/">
              Order LPG online
            </Link>
          </span>,
          <span key="d">
            <Link className="underline" href="/lpg-home-delivery/">
              LPG home delivery
            </Link>
          </span>,
          <span key="h">
            <Link className="underline" href="/how-it-works/">
              How ordering works
            </Link>
          </span>,
          <span key="w">Call or WhatsApp {site.phoneDisplay}</span>,
        ]}
      />
      {c.localities.length >= 3 && (
        <>
          <H2>Areas of {c.name} where partners are listed</H2>
          <UL items={c.localities.slice(0, 12)} />
          <P>If your area is not listed, send a request — we will tell you whether we can reach you.</P>
        </>
      )}

      <ImageGallery items={itemsFor(`/lpg-price-in-pakistan/${city}/`)} title={`LPG in ${c.name}`} />
      <Faq items={faqs} />
    </PageShell>
  );
}

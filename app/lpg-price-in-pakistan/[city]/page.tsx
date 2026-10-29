import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import PriceBlock from "@/components/PriceBlock";
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

export const dynamicParams = false;
const CITIES = ["karachi", "lahore"]; // only cities where the SERP-overlap test showed a separate page is justified

export function generateStaticParams() {
  return CITIES.map((city) => ({ city }));
}

// Indexable only when a verified city-specific price exists; otherwise it would duplicate the national page.
const hasCityPrice = (slug: string) => Boolean(latestPrice?.cities?.[slug]);

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
    index: hasCityPrice(city),
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
  const deliveryLine =
    o.deliveryNote ??
    `${site.deliveryTarget} ${terms.delivery}`;

  const faqs = [
    {
      q: `How is the LPG price in ${c.name} worked out?`,
      a: `Gas cost starts from the OGRA-notified price per kg we have on file, multiplied by the kg in your cylinder. Delivery, deposit or exchange can change the total. The price block shows figures when they are verified on file.`,
    },
    {
      q: `Who delivers LPG in ${c.name}?`,
      a: `${company.shortName} is an OGRA-licensed marketer and distributor. We may supply as marketer, reseller or through a named network dealer. City hub lists ${dirStats.dealers} network dealers and ${dirStats.total} local listings on file — we still confirm who reaches your street before you agree.`,
    },
    {
      q: `How fast is delivery in ${c.name}?`,
      a: deliveryLine,
    },
    {
      q: `Is the LPG rate in ${c.name} different from the national OGRA price?`,
      a: terms.sameOgraRateAllCities
        ? "The verified OGRA per-kg rate we quote is the same nationwide; your total can still differ once delivery, deposit or exchange terms are added for your order."
        : "The notified per-kg rate is the national reference unless OGRA or our checked sheet shows a separate city line. Shop quotes can still differ once delivery and cylinder terms are added.",
    },
    {
      q: `How do I order LPG in ${c.name} after I check the rate?`,
      a: `Use the form on this page, order LPG online, or WhatsApp ${site.phoneDisplay}. Give your area and cylinder size. We confirm the full price before you agree.`,
    },
  ];

  return (
    <PageShell
      crumbs={[
        { name: "LPG price in Pakistan", href: "/lpg-price-in-pakistan/" },
        { name: c.name, href: `/lpg-price-in-pakistan/${city}/` },
      ]}
      h1={`LPG price in ${c.name} today`}
      intro={`Live OGRA per-kg baseline for ${c.name}, cylinder gas totals when on file, named dealers on the ${c.name} hub, and delivery timing we confirm for your street. ${company.shortName} (licence ${company.licenceNumber}) confirms the full price before you agree.`}
      aside={<SiteLeadForm defaultCity={city} heading={`Order LPG in ${c.name}`} />}
    >
      <Note title={`${c.name} — price at a glance`} tone="info">
        <p>
          {latestPrice
            ? `${pkr(latestPrice.perKgPkr)} per kg (${monthLong(latestPrice.month)} OGRA consumer cycle on our price file). Same nationwide baseline${terms.sameOgraRateAllCities ? "" : " unless a city line is on file"}.`
            : `Verified per-kg figure is being updated — WhatsApp ${site.phoneDisplay} for today’s confirmation in ${c.name}.`}{" "}
          Delivery: {deliveryLine}
        </p>
      </Note>

      <PriceBlock citySlug={city} cityName={c.name} />

      {CITY_IMAGE[city] ? (
        <ContentImage
          src={CITY_IMAGE[city].src}
          alt={CITY_IMAGE[city].alt}
          caption={`${c.name} — landmark context for this city price page (not a branch office).`}
        />
      ) : null}

      <H2>LPG rate in {c.name}: per kg and cylinder sizes</H2>
      <P>
        The price block lists price per kg and common cylinder gas totals (5, 11.8, 15, 45.4 kg) when verified. Method
        and national context:{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG rate in Pakistan today
        </Link>
        ,{" "}
        <Link className="underline" href="/lpg-price-per-kg-in-pakistan/">
          LPG 1kg price today
        </Link>
        , and{" "}
        <Link className="underline" href="/ogra-lpg-notified-price/">
          OGRA notified LPG price
        </Link>
        . How we price:{" "}
        <Link className="underline" href="/pricing-policy/">
          pricing policy
        </Link>
        .
      </P>

      <H2>Delivery in {c.name}</H2>
      <P>{deliveryLine}</P>
      {o.localNotes && o.localNotes.length > 0 && (
        <UL items={o.localNotes} />
      )}
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

      <H2>How price works in {c.name}</H2>
      <P>
        Multiply the notified price per kg by your cylinder’s gas weight for the gas portion. Add deposit, exchange or
        delivery only after we confirm them. {terms.deposit} Breakdown:{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
          LPG cylinder price in Pakistan
        </Link>
        . Sizes:{" "}
        <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">
          LPG cylinder sizes
        </Link>
        .
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
      <P>
        On your order we may act as marketer/distributor, reseller, or referral partner to a local dealer. We say which
        applies before you agree.
      </P>

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

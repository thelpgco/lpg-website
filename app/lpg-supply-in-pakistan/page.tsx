import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { directorySummary, topCitiesByListings } from "@/lib/directory";
import { itemsFor } from "@/lib/media";
import { hubCities, provinceList } from "@/lib/network";
import { latestPrice, pkr } from "@/lib/prices";
import { monthLong } from "@/lib/money";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-supply-in-pakistan/" });

const faqs = [
  {
    q: "Where does Pakistan's LPG come from?",
    a: "From local gas processing and refineries, plus imports by sea through the ports. The share of each changes from year to year — check the latest OGRA or Ministry of Energy publications for tonnage splits. We do not invent a percentage on this page.",
  },
  {
    q: "Who regulates LPG supply in Pakistan?",
    a: "OGRA licenses LPG marketing and notifies the monthly consumer price. Other bodies have roles in cylinder standards, vehicle fuel and storage safety depending on the activity.",
  },
  {
    q: "Who supplies LPG to homes?",
    a: "Licensed marketing companies fill cylinders at bottling plants and sell through distributors and dealers. The distributor or dealer delivers to your door or shop. Ask for the licence number before you buy.",
  },
  {
    q: "How does THE LPG CO. deliver nationwide?",
    a: `${company.shortName} holds OGRA licence ${company.licenceNumber}. Directory on file: ${directorySummary.counts.merged_listings.toLocaleString("en-PK")} named listings across ${directorySummary.counts.cities_indexed.toLocaleString("en-PK")} cities. We confirm who delivers to your street before you agree.`,
  },
  {
    q: "Why does supply feel tighter in winter?",
    a: "Heating demand and low pipeline pressure push more households onto cylinders at once, while import cargoes take time to arrange. Order earlier in busy weeks and keep a spare where you can store it safely.",
  },
  {
    q: "How do I order from you?",
    a: `Call or WhatsApp ${site.phoneDisplay}, use order LPG, or open your city hub. We confirm price, street and who delivers before you agree.`,
  },
];

export default function Page() {
  const dir = directorySummary.counts;
  const top = topCitiesByListings(8);

  return (
    <PageShell
      crumbs={[
        { name: "What is LPG?", href: "/what-is-lpg/" },
        { name: "LPG supply in Pakistan", href: "/lpg-supply-in-pakistan/" },
      ]}
      h1="LPG supply in Pakistan: sources, nationwide delivery and how to order"
      intro={`Pakistan's LPG comes from local processing and refineries plus sea imports, then moves through licensed marketers, bottling plants, distributors and dealers. ${company.shortName} is an OGRA-licensed marketer and distributor (licence ${company.licenceNumber}) with nationwide coverage through named dealers — we confirm your street on every order.`}
      aside={<SiteLeadForm heading="Order LPG in your area" />}
    >
      <Note title="In short" tone="info">
        <p>
          Local production and imports feed bottling plants; dealers deliver filled cylinders to homes and businesses.
          {latestPrice
            ? ` The verified OGRA consumer rate on our price file for ${monthLong(latestPrice.month)} is ${pkr(latestPrice.perKgPkr)} per kg.`
            : " Check the LPG price page for the current OGRA per-kg figure."}{" "}
          We route orders through {(dir.owner_network + dir.market_listing).toLocaleString("en-PK")} network dealers
          listed across {dir.cities_indexed.toLocaleString("en-PK")} cities — listings are not a full street map.
        </p>
      </Note>

      <H2>The supply chain, step by step</H2>
      <SpecTable
        head={["Stage", "What happens", "Who is involved"]}
        rows={[
          ["1. Source", "LPG from gas processing and refineries, or imported by ship", "Producers, refineries, importers"],
          ["2. Terminal and storage", "Bulk LPG held in pressure tanks near ports and plants", "Terminal and storage operators"],
          ["3. Transport", "Road tankers move bulk LPG to bottling plants and bulk sites", "Transporters, marketers"],
          ["4. Bottling", "Cylinders inspected and filled by weight", "Licensed marketing companies"],
          ["5. Distribution", "Filled cylinders move to distributors and dealers", "Distributors, dealers"],
          ["6. Delivery", "Cylinders reach homes, shops and kitchens", "Dealers and delivery teams"],
        ]}
        caption="Simplified. Each stage has safety and licensing rules."
      />
      <P>
        More on production:{" "}
        <Link className="underline" href="/how-lpg-is-produced-and-supplied/">
          how LPG is produced and supplied
        </Link>
        . Roles:{" "}
        <Link className="underline" href="/lpg-marketing-company-vs-distributor-vs-dealer/">
          marketer vs distributor vs dealer
        </Link>
        . Bulk tanker fill:{" "}
        <Link className="underline" href="/lpg-bowser/">
          LPG bowser
        </Link>
        .
      </P>

      <H2>Local production and imports</H2>
      <P>
        Natural gas from Pakistani fields contains heavier fractions; processing plants separate propane and butane
        into LPG. Refineries also produce LPG when crude is processed. Because local output does not cover all demand,
        cargoes arrive by sea, unload at port terminals, and move inland by tanker. We do not publish unofficial tonnage
        splits here — use OGRA and official energy statistics when you need exact figures.
      </P>
      <P>
        Price follows the monthly OGRA consumer notification
        {latestPrice
          ? ` (currently ${pkr(latestPrice.perKgPkr)} per kg for ${monthLong(latestPrice.month)} on our checked file)`
          : ""}
        . See{" "}
        <Link className="underline" href="/why-lpg-prices-change-in-pakistan/">
          why LPG prices change
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>
        .
      </P>

      <H2>Who uses LPG</H2>
      <UL
        items={[
          "Homes without pipeline gas, and homes that use LPG as backup when pressure is low",
          "Restaurants, hotels and wedding kitchens",
          "Industry: boilers, furnaces and process heating",
          "Hospitals, schools and other institutions",
          "Vehicles — a smaller part of the market; see auto LPG (never use a domestic cylinder in a car)",
        ]}
      />

      <H2>Seasonal pattern</H2>
      <SpecTable
        head={["Season", "What happens to demand", "What it means for you"]}
        rows={[
          ["Winter", "Rises as homes heat water and rooms; pipeline pressure often falls", "Order earlier; delivery can take longer in busy weeks"],
          ["Summer", "Falls toward mainly cooking load", "Stock is usually easier"],
          ["Wedding and festival periods", "Spikes for commercial cylinders", "Book commercial cylinders in advance"],
        ]}
        caption="General pattern by city and weather — not a forecast for your street."
      />
      <P>
        If stock is tight locally:{" "}
        <Link className="underline" href="/lpg-shortage-pakistan/">
          LPG shortage in Pakistan
        </Link>
        .
      </P>

      <H2>Nationwide coverage with {company.shortName}</H2>
      <P>
        {company.aboutBlurb} {terms.partnersCertifiedRule}
      </P>
      <P>
        Directory snapshot ({directorySummary.generatedAt}): {dir.merged_listings.toLocaleString("en-PK")} named
        listings · {(dir.owner_network + dir.market_listing).toLocaleString("en-PK")} network dealers ·{" "}
        {dir.cities_indexed.toLocaleString("en-PK")} cities indexed. {terms.delivery}
      </P>

      <H2>City and province hubs</H2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {hubCities.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/lpg-in-${c.slug}/`}
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {top.map((c) => (
          <li key={c.slug} className="rounded-lg border border-slate-200 p-3 text-sm">
            <Link className="font-semibold underline" href={`/lpg-in-${c.slug}/`}>
              {c.name}
            </Link>
            <span className="text-ink-500"> — {c.count} listings on file</span>
          </li>
        ))}
      </ul>
      <UL
        items={[
          ...provinceList.map((p) => (
            <Link key={p.slug} className="underline" href={`/lpg-in-${p.slug}/`}>
              LPG in {p.name}
            </Link>
          )),
          <Link key="net" className="underline" href="/our-network/">
            Our network (named dealers)
          </Link>,
          <Link key="near" className="underline" href="/lpg-near-me/">
            LPG near me
          </Link>,
          <Link key="areas" className="underline" href="/delivery-areas/">
            Delivery areas
          </Link>,
        ]}
      />

      <H2>What regulates the chain</H2>
      <UL
        items={[
          "OGRA licenses LPG marketing and notifies the monthly consumer price.",
          "Cylinder and storage safety sit under separate standards and inspection rules.",
          "Marketers must supply cylinders that carry valid certification markings — check the marking on delivery.",
        ]}
      />
      <P>
        Read{" "}
        <Link className="underline" href="/ogra-lpg-regulations-pakistan/">
          OGRA LPG regulations
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/licences-and-compliance/">
          licences and compliance
        </Link>
        .
      </P>

      <H2>What this means for a buyer</H2>
      <UL
        items={[
          "Buy from a licensed supplier and ask for the licence number.",
          "Check the cylinder marking and seal on delivery; refuse damaged bottles.",
          "Plan refills before winter and before big events.",
          "Confirm the full price — gas, delivery, deposit or exchange — before you agree.",
        ]}
      />
      <P>
        <Link className="underline" href="/order-lpg/">
          Order LPG
        </Link>
        ,{" "}
        <Link className="underline" href="/how-it-works/">
          how ordering works
        </Link>
        , or call {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/lpg-supply-in-pakistan/")} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: "/lpg-supply-in-pakistan/",
          headline: "LPG supply in Pakistan: sources, nationwide delivery and how to order",
          description:
            "How LPG reaches Pakistani homes and businesses: local production, imports, bottling, distribution, seasonal demand, regulation and how to order from THE LPG CO.",
        })}
      />
    </PageShell>
  );
}

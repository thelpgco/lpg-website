import Link from "next/link";
import ContactButtons from "@/components/ContactButtons";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { sectorBySlug, sectors } from "@/components/r4plus/industries-data";
import { sectorDetail } from "@/components/r4plus/industries-detail";
import { terms } from "@/lib/commercial";
import { company } from "@/lib/company/profile";
import { cityDirectoryStats, formatPhoneDisplay, listingsForCity, marketersForCity, namedSuppliersForCity } from "@/lib/directory";
import { itemsFor } from "@/lib/media";
import { cityBySlug, hubSlugs, staticCityHubSlugs } from "@/lib/network";
import { fmtDate, latestPrice, pkr } from "@/lib/prices";
import { projectBySlug, projects, type ProjectRecord } from "@/lib/projects";

/** Fallback project slugs when a sector has no exact industry match. */
const FALLBACK_PROJECTS: Record<string, string[]> = {
  "food-processing": ["islamabad-restaurant-cylinder-bank-manifold", "karachi-factory-bulk-tank-interface"],
};

/** Net energy in 1 kg of LPG (about 46 MJ). Used to turn appliance kW into kg of gas. */
const KWH_PER_KG = 12.8;
const COMMERCIAL_KG = 45.4;

const cityPages = new Set<string>([...staticCityHubSlugs, ...hubSlugs]);

function projectsForSector(slug: string): ProjectRecord[] {
  const exact = projects().filter((p) => p.industry === slug).slice(0, 2);
  if (exact.length > 0) return exact;
  const fallback = (FALLBACK_PROJECTS[slug] || [])
    .map((s) => projectBySlug(s))
    .filter((p): p is ProjectRecord => Boolean(p));
  return fallback.slice(0, 2);
}

const kg = (kwh: number) => kwh / KWH_PER_KG;
const fmt = (n: number, digits = 1) => n.toLocaleString("en-PK", { maximumFractionDigits: digits });

const titleCase = (t: string) => t.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

function cityName(slug: string): string {
  return cityBySlug(slug)?.name ?? titleCase(listingsForCity(slug)[0]?.city ?? slug.replace(/-/g, " "));
}

function SectorCta({ text, message }: { text: string; message: string }) {
  return (
    <div className="mt-6 rounded-xl border border-flame/30 bg-orange-50 p-4">
      <p className="font-semibold text-ink">{text}</p>
      <ContactButtons className="mt-3" message={message} />
      <p className="mt-2 text-sm text-ink-500">
        Or use the{" "}
        <a className="underline" href="#lead-form">
          quote form
        </a>
        .
      </p>
    </div>
  );
}

export function IndustryCapabilities() {
  return (
    <>
      <H2>What we can do for your site</H2>
      <P>
        {company.shortName} is an OGRA-licensed marketer and distributor (licence {company.licenceNumber}) with
        nationwide coverage across Pakistan. On each order we tell you whether we supply directly, resell or refer you
        to a distributor — and we confirm your street before you agree.
      </P>
      <UL
        items={[
          `Supply: ${company.commercial.join("; ")}`,
          "Cylinders: 45.4 kg commercial cylinders, delivered and exchanged, where a distributor can reach your site",
          "Cylinder banks and manifolds: designed, installed and tested by our engineering team",
          "Bulk storage and piping: assessed from your demand and site layout, quoted in writing",
          `Engineering: ${company.engineering.join("; ")}`,
          "Safety: audit, inspection and maintenance contracts",
        ]}
      />
      <Note title="Projects and consent" tone="info">
        <p>
          Named customer projects appear on the{" "}
          <Link className="underline" href="/projects/">
            projects page
          </Link>{" "}
          only with written consent. This industry page describes capabilities and the quotation inputs we need.
        </p>
      </Note>
    </>
  );
}

export default function IndustryPage({ slug }: { slug: string }) {
  const s = sectorBySlug(slug);
  const d = sectorDetail[slug];
  const path = `/industries/${slug}/`;
  const lower = s.name.toLowerCase();
  const relatedProjects = projectsForSector(slug);
  const orderHref = s.request === "bulk_industrial" ? "/bulk-lpg-supply/" : "/order-lpg/";
  const orderLabel = s.request === "bulk_industrial" ? "Request bulk / industrial supply" : "Order LPG";
  const waMessage = `Assalam o Alaikum, I need LPG supply for ${lower}. `;

  const exampleKwh = d.example.items.reduce((sum, i) => sum + i.kwh, 0);
  const kgDay = kg(exampleKwh);
  const cylindersWeek = (kgDay * 7) / COMMERCIAL_KG;
  const perKg = latestPrice?.perKgPkr;

  const network = d.cities.map((c) => {
    const st = cityDirectoryStats(c);
    const fillingPoints = listingsForCity(c).filter((l) => l.role === "lpg_filling_point").length;
    return { slug: c, name: cityName(c), st, fillingPoints, plants: marketersForCity(c) };
  });
  const lead = network.find((n) => n.st.total > 0);
  const leadDealers = lead ? namedSuppliersForCity(lead.slug, 4) : [];
  const plants = network
    .flatMap((n) => n.plants.map((p) => ({ ...p, cityName: n.name })))
    .filter((p, i, all) => all.findIndex((q) => q.company === p.company) === i);

  return (
    <PageShell
      crumbs={[
        { name: "Industries", href: "/industries/" },
        { name: s.name, href: path },
      ]}
      h1={s.h1}
      intro={s.intro}
      aside={
        <SiteLeadForm
          defaultRequest={s.request}
          heading="Request a quote"
          buttonLabel="Request a quotation"
          subheading="Tell us your city and what runs on gas. We confirm price, timing and who delivers before you agree."
        />
      }
    >
      <Note title="Short answer">
        <p>
          {s.short} In the worked example below, {d.example.title.charAt(0).toLowerCase() + d.example.title.slice(1)}{" "}
          uses about {fmt(kgDay, 0)} kg of LPG a day, or roughly {fmt(cylindersWeek, 1)} commercial cylinders a week.
        </p>
      </Note>

      <H2>How {lower} use LPG in Pakistan</H2>
      {d.context.map((para) => (
        <P key={para.slice(0, 24)}>{para}</P>
      ))}
      <UL items={s.uses} />

      <H2>Typical gas loads in {lower}</H2>
      <P>
        Gas use follows the appliance rating: one kilogram of LPG holds about {KWH_PER_KG} kWh of heat, so a 12.8 kW
        burner on full flame uses roughly 1 kg an hour. Check the rating plate on your own equipment.
      </P>
      <SpecTable
        head={["Appliance", "Typical rated input", "LPG at full flame", "Note"]}
        rows={d.loads.map(([name, min, max, note]) => [
          name,
          `${fmt(min)}–${fmt(max)} kW`,
          `${fmt(kg(min))}–${fmt(kg(max))} kg/h`,
          note,
        ])}
      />

      <H2>Worked example: {d.example.title}</H2>
      <SpecTable
        head={["Load", "Basis", "Heat per day", "LPG per day"]}
        rows={[
          ...d.example.items.map((i) => [i.label, i.basis, `${fmt(i.kwh, 0)} kWh`, `${fmt(kg(i.kwh))} kg`]),
          [<strong key="t">Total</strong>, "", `${fmt(exampleKwh, 0)} kWh`, <strong key="k">{fmt(kgDay)} kg</strong>],
        ]}
      />
      <P>
        That is about {fmt(kgDay * 7, 0)} kg a week, or {fmt(cylindersWeek, 1)} × {COMMERCIAL_KG} kg cylinders
        {perKg && latestPrice
          ? `. At the OGRA rate of ${pkr(perKg)} per kg (${latestPrice.month}), the gas alone comes to about ${pkr(Math.round(kgDay * 30 * perKg))} a month, before delivery and cylinder terms.`
          : "."}{" "}
        {d.example.note}
      </P>
      <P>
        Try your own numbers in the{" "}
        <Link className="underline" href="/tools/lpg-cylinder-duration-calculator/">
          cylinder duration calculator
        </Link>
        .
      </P>

      <H2>Supply options for {lower}</H2>
      <SpecTable head={["Option", "When it fits"]} rows={s.supply} />
      <SectorCta text={d.ctas.mid} message={waMessage} />

      <H2>Common problems and their causes</H2>
      <SpecTable head={["Problem", "Cause and fix"]} rows={d.problems} />

      <H2>What changes your gas cost</H2>
      <UL items={d.costDrivers} />
      {latestPrice && (
        <P>
          Current notified rate: {pkr(latestPrice.perKgPkr)} per kg from {fmtDate(latestPrice.effectiveFrom)}. See{" "}
          <Link className="underline" href="/lpg-price-in-pakistan/">
            LPG price in Pakistan
          </Link>{" "}
          for the history.
        </P>
      )}

      <H2>LPG dealers and plants serving {lower}</H2>
      <P>{d.networkNote}</P>
      <SpecTable
        head={["City", "Network dealers", "Local distributors", "Filling points", "Marketer plants listed"]}
        rows={network.map((n) => [
          cityPages.has(n.slug) ? (
            <Link key={n.slug} className="underline" href={`/lpg-in-${n.slug}/`}>
              {n.name}
            </Link>
          ) : (
            n.name
          ),
          String(n.st.dealers),
          String(n.st.research),
          String(n.fillingPoints),
          String(n.plants.length),
        ])}
      />
      {lead && leadDealers.length > 0 && (
        <>
          <P>Some of the dealers we list in {lead.name}:</P>
          <UL
            items={leadDealers.map(
              (x) => `${x.name.replace(/_+/g, " ")}${x.locality ? `, ${x.locality}` : ""}${x.phone ? ` (${formatPhoneDisplay(x.phone)})` : ""}`,
            )}
          />
        </>
      )}
      {plants.length > 0 && (
        <P>
          Licensed marketer plants listed in these cities include{" "}
          {plants
            .slice(0, 5)
            .map((p) => `${p.company} (${p.cityName})`)
            .join(", ")}
          . Bulk and tanker supply is arranged from a plant; cylinders come through local dealers.
        </P>
      )}
      <P>
        Full lists are on each city page and on{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>
        .
      </P>

      <H2>Delivery for {lower}</H2>
      <P>{terms.delivery}</P>
      <P>
        Check{" "}
        <Link className="underline" href="/delivery-areas/">
          delivery areas
        </Link>{" "}
        or go straight to{" "}
        <Link className="underline" href={orderHref}>
          {orderLabel.toLowerCase()}
        </Link>
        .
      </P>

      <H2>What to send for an accurate quote</H2>
      <UL items={s.quoteNeeds} />

      <H2>Safety points for {lower}</H2>
      <UL items={s.safety} />
      <P>
        Read the{" "}
        <Link className="underline" href="/lpg-safety/">
          LPG safety guide
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/what-to-do-if-you-smell-gas/">
          what to do if you smell gas
        </Link>
        . {terms.partnersCertifiedRule}
      </P>

      <H2>What we do for {lower}</H2>
      <UL items={d.capabilities} />

      {relatedProjects.length > 0 && (
        <>
          <H2>Related project profiles</H2>
          <UL
            items={relatedProjects.map((p) => (
              <Link key={p.slug} className="underline" href={`/projects/${p.slug}/`}>
                {p.title}
              </Link>
            ))}
          />
        </>
      )}

      <H2>Related services and pages</H2>
      <UL
        items={[
          ...s.services.map((x) => (
            <Link key={x.slug} className="underline" href={`/services/${x.slug}/`}>
              {x.label}
            </Link>
          )),
          ...s.links.map((x) => (
            <Link key={x.href} className="underline" href={x.href}>
              {x.label}
            </Link>
          )),
        ]}
      />

      <H2>Other industries</H2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {sectors
          .filter((o) => o.slug !== slug)
          .map((o) => (
            <li key={o.slug}>
              <Link
                href={`/industries/${o.slug}/`}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
              >
                {o.name}
              </Link>
            </li>
          ))}
      </ul>

      <SectorCta text={d.ctas.end} message={waMessage} />

      <ImageGallery items={itemsFor(path)} title="Photos" />
      <Faq items={[...s.faqs, ...d.faqs]} />
    </PageShell>
  );
}

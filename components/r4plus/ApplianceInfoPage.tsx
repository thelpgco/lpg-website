import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { isDemo } from "@/lib/mode";
import { pkr } from "@/lib/prices";
import { appliances } from "@/lib/products";
import { site } from "@/lib/site";

export type ApplianceInfo = {
  path: string;
  crumbs: { name: string; href: string }[];
  h1: string;
  intro: string;
  /** One-line honest answer about price and stock. */
  shortAnswer: string;
  sections: { title: string; items?: string[]; text?: string }[];
  compare: { head: string[]; rows: string[][]; caption?: string };
  safety: string[];
  safetyLinks?: { href: string; label: string }[];
  faqs: { q: string; a: string }[];
  related: { href: string; label: string }[];
  request: "appliances" | "commercial_supply" | "engineering";
  quoteNeeds: string[];
  galleryTitle?: string;
  /** Matches ApplianceProduct.category in lib/products.ts; enables the product list when catalogue mode is on. */
  category?: string;
  /** H1 used when catalogue appliances exist for this category. */
  demoH1?: string;
  /** H1 used when no SKUs are listed: must say price on request, never promise a price. */
  productionH1?: string;
  /** Optional process steps after the quote checklist. */
  processSteps?: string[];
  /** Optional tip under the short answer. */
  tip?: string;
  /** Optional cost angle shown after Who we are. */
  costNote?: string;
  /** Optional where/who angle (cities, commercial vs home). */
  whereNote?: string;
};

/**
 * Shared layout for appliance and accessory pages.
 * No invented models or warranty claims. Photos use plain captions from the media map.
 */
export default function ApplianceInfoPage(a: ApplianceInfo) {
  const demo = isDemo();
  const items = a.category ? appliances().filter((x) => x.category === a.category) : [];
  const showCatalogue = demo && items.length > 0;
  const h1 = showCatalogue ? (a.demoH1 ?? a.h1) : (a.productionH1 ?? a.h1);
  const process =
    a.processSteps ??
    [
      "Send the form (or call / WhatsApp) with the item, your city and area",
      "We confirm whether we can supply it, the price and who delivers or installs",
      "You agree only after you have the full figure — there is no online checkout",
      "On delivery, check the item and the connection; refuse anything damaged and tell us at once",
    ];

  return (
    <PageShell
      crumbs={a.crumbs}
      h1={h1}
      intro={a.intro}
      aside={
        <SiteLeadForm
          defaultRequest={a.request}
          heading="Ask about availability and price"
          buttonLabel="Request availability and quote"
          subheading="Tell us what you need and your city. We confirm stock, price and delivery before you agree."
        />
      }
    >
      <Note title="Short answer" tone="info">
        <p>{a.shortAnswer}</p>
      </Note>
      {a.tip ? (
        <Note title="Tip" tone="info">
          <p>{a.tip}</p>
        </Note>
      ) : null}

      {showCatalogue ? (
        <>
          <Note title="Current catalogue" tone="info">
            <p>
              Models and guide prices below. We still confirm stock, the final price and delivery for your city before you
              agree.
            </p>
          </Note>
          <SpecTable
            head={["Model", "Price", "Features"]}
            rows={items.map((x) => [
              x.name,
              x.demoPricePkr != null ? pkr(x.demoPricePkr) : "Price on request",
              [x.demoPriceNote, ...(x.features ?? [])].filter(Boolean).join("; "),
            ])}
          />
        </>
      ) : (
        <Note title="Price on request" tone="info">
          <p>
            We quote this product for your model and city. Send a request with what you need and where you are; we reply
            with availability, price and delivery before you agree. There is no standing price list and no online
            checkout on this page.
          </p>
        </Note>
      )}

      <H2>Who we are</H2>
      <P>
        {company.shortName} is an OGRA-licensed LPG company (licence {company.licenceNumber}), operating since{" "}
        {company.foundedYear} from {company.officeAddress}. We supply cylinders, appliances and accessories through our
        nationwide network, and we confirm every order to your street — including stock and the full price — before you
        agree. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <H2>Cost: appliance vs gas</H2>
      <P>
        {a.costNote ??
          "The appliance or accessory price is separate from cylinder gas. Gas follows the monthly OGRA per-kg rate; deposit, exchange and delivery for cylinders are confirmed on top when you also need a refill or a new connection."}{" "}
        See{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
          cylinder price
        </Link>{" "}
        and our{" "}
        <Link className="underline" href="/pricing-policy/">
          pricing policy
        </Link>
        .
      </P>

      <H2>Where we supply</H2>
      <P>
        {a.whereNote ??
          `We take appliance and accessory requests nationwide. ${company.terms.delivery}`}{" "}
        Check your city on{" "}
        <Link className="underline" href="/delivery-areas/">
          delivery areas
        </Link>{" "}
        or{" "}
        <Link className="underline" href="/lpg-near-me/">
          LPG near me
        </Link>
        .
      </P>

      {a.sections.map((s) => (
        <section key={s.title}>
          <H2>{s.title}</H2>
          {s.text && <P>{s.text}</P>}
          {s.items && <UL items={s.items} />}
        </section>
      ))}

      <H2>What to compare before you buy</H2>
      <SpecTable head={a.compare.head} rows={a.compare.rows} caption={a.compare.caption} />

      <H2>What to send for a quote</H2>
      <UL items={a.quoteNeeds} />

      <H2>How ordering works</H2>
      <ol className="mt-3 space-y-3">
        {process.map((step, i) => (
          <li key={step} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {step}
            </p>
          </li>
        ))}
      </ol>
      <P>
        Related:{" "}
        <Link className="underline" href="/how-it-works/">
          how ordering works
        </Link>
        ,{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>
        ,{" "}
        <Link className="underline" href="/shop/">
          shop
        </Link>
        .
      </P>

      <H2>Safety and installation</H2>
      <UL items={a.safety} />
      <P>
        {(a.safetyLinks ?? [
          { href: "/lpg-safety/", label: "LPG safety guide" },
          { href: "/what-to-do-if-you-smell-gas/", label: "What to do if you smell gas" },
        ]).map((l, i, arr) => (
          <span key={l.href}>
            <Link className="underline" href={l.href}>
              {l.label}
            </Link>
            {i < arr.length - 1 ? ", " : "."}
          </span>
        ))}
      </P>

      <H2>Related pages</H2>
      <UL
        items={a.related.map((r) => (
          <Link key={r.href} className="underline" href={r.href}>
            {r.label}
          </Link>
        ))}
      />

      <Note title="Talk to us now" tone="info">
        <p>
          Call or WhatsApp {site.phoneDisplay} — we aim to reply {company.responseTime}. Or use the form on this page.
          We confirm availability, price and who delivers before you agree.
        </p>
      </Note>

      <ImageGallery items={itemsFor(a.path)} title={a.galleryTitle ?? "Photos"} />
      <Faq items={a.faqs} />
    </PageShell>
  );
}

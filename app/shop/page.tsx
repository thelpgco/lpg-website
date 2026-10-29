import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { topCitiesByListings } from "@/lib/directory";
import { itemsFor } from "@/lib/media";
import { isDemo } from "@/lib/mode";
import { hubCities } from "@/lib/network";
import { latestPrice, pkr } from "@/lib/prices";
import { monthLong } from "@/lib/money";
import { appliances } from "@/lib/products";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/shop/";
export const metadata = meta({ path });

const categories = [
  {
    href: "/lpg-stove-price-in-pakistan/",
    name: "LPG stoves",
    text: "Table-top and built-in stoves for LPG. What to compare before you request a quote.",
  },
  {
    href: "/lpg-geyser-price-in-pakistan/",
    name: "LPG geysers",
    text: "Instant and storage geysers — ventilation and installation points that change the quote.",
  },
  {
    href: "/lpg-heaters-in-pakistan/",
    name: "LPG heaters",
    text: "Room heaters for winter, with safe-use guidance.",
  },
  {
    href: "/shop/commercial-lpg-burners/",
    name: "Commercial burners",
    text: "Burners for restaurants, hotels and kitchens.",
  },
  {
    href: "/shop/lpg-hoses-and-accessories/",
    name: "Hoses and accessories",
    text: "Hoses, regulators, clamps and safety accessories.",
  },
  {
    href: "/lpg-vaporizers/",
    name: "LPG vaporizers",
    text: "For high-draw sites, quoted by our engineering team.",
  },
  {
    href: "/lpg-regulators/",
    name: "LPG regulators",
    text: "Domestic and commercial regulators.",
  },
  {
    href: "/lpg-cylinders/",
    name: "LPG cylinders",
    text: "Steel and composite cylinders in standard sizes.",
  },
];

const compareRows: React.ReactNode[][] = [
  ["Stove", "Burners, top type, ignition, LPG jets", "Kitchen size and whether you need a kit (regulator + hose)"],
  ["Geyser", "Instant vs storage, capacity, flue / ventilation", "Bathing load and safe exhaust path"],
  ["Heater", "Output, room size, oxygen-depletion cut-off where fitted", "Ventilation — never seal a room"],
  ["Commercial burner", "kW / burner count, stand, hose rating", "Peak lunch/dinner load"],
  ["Hose / regulator", "LPG rating, length, clamps, expiry", "Replace damaged hose; match regulator to appliance"],
  ["Vaporizer", "kg/h capacity, electric vs water bath", "High continuous draw — engineering brief required"],
];

const faqs = [
  {
    q: "Can I buy online from this page?",
    a: "Not yet. There is no checkout here. Send a request with the item and your city, or call / WhatsApp. We reply with availability, price and delivery before you agree.",
  },
  {
    q: "Why are appliance prices on request?",
    a: "Appliance and accessory prices depend on model, city stock and who delivers. We do not invent a standing SKU price list for production. Gas follows the OGRA notification and is priced separately.",
  },
  {
    q: "How do I compare options without a price list?",
    a: "Use the category pages to shortlist features, then send two or three preferences plus your city. We quote like-for-like so you can compare total delivered cost — not a random web figure.",
  },
  {
    q: "Do you stock stoves, geysers and heaters?",
    a: "We supply common LPG appliances and accessories through our network. Exact stock depends on your city and the model. We confirm what we can fulfil when you ask — we do not promise a model we cannot deliver.",
  },
  {
    q: "Do you install appliances?",
    a: "For pipelines, manifolds, tanks and larger systems, our engineering team quotes installation after a brief. For a stove, geyser or heater, ask when you request availability; many homes need only a correct regulator, hose and leak check.",
  },
  {
    q: "Do you deliver appliances nationwide?",
    a: `We serve customers across Pakistan through our distributor network. ${terms.delivery} Call or WhatsApp ${site.phoneDisplay} with your city.`,
  },
  {
    q: "What should I check when the appliance arrives?",
    a: "Check the packaging and the appliance for damage, confirm it is rated for LPG, and have the regulator and hose fitted and leak-tested with soapy water before use. Refuse a damaged item and tell us before you pay.",
  },
  {
    q: "Is the gas included with the appliance?",
    a: "No. Appliances and accessories are separate from cylinder gas. Order gas and a cylinder on the order LPG page if you need a refill or a new connection at the same time.",
  },
  {
    q: "Can I get a stove, regulator and hose as a kit?",
    a: "Yes — ask for a kit when you start a new connection. See the LPG kit price page for what a kit usually includes, then request a quote for your city.",
  },
  {
    q: "Who delivers — you or a local shop?",
    a: "On every order we tell you who supplies you (our licensed role, a reseller path, or a named network dealer). You agree only after that is clear.",
  },
];

export default function Page() {
  const items = appliances();
  const showCatalogue = isDemo() && items.length > 0;
  const cities = topCitiesByListings(6);

  return (
    <PageShell
      crumbs={[{ name: "Shop", href: path }]}
      h1={showCatalogue ? "LPG appliances and accessories" : "LPG appliances and accessories: compare and request a quote"}
      intro={
        showCatalogue
          ? "Browse LPG stoves, geysers, heaters, burners, hoses and accessories. Guide prices below — we confirm stock, final price and delivery for your city before you agree."
          : `${company.shortName} (OGRA licence ${company.licenceNumber}) supplies LPG stoves, geysers, heaters, burners, hoses, regulators and vaporizers across Pakistan. There is no online checkout and no invented production SKU price list — shortlist by category, then request a like-for-like quote for your city.`
      }
      aside={
        <SiteLeadForm
          defaultRequest="appliances"
          heading="Ask about availability and price"
          buttonLabel="Request availability and quote"
          subheading="Item, city and home or commercial use — we confirm stock and total first."
        />
      }
    >
      <Note title="How this shop works" tone="info">
        <p>
          1) Open a category and note what you need. 2) Send the form or WhatsApp with city and preferences. 3) We
          confirm stock (or an alternative), price and who delivers. 4) You agree only when the full figure is clear. Gas
          for cylinders is separate
          {latestPrice
            ? ` — OGRA baseline on file ${pkr(latestPrice.perKgPkr)}/kg (${monthLong(latestPrice.month)}).`
            : " — see the LPG price page."}
        </p>
      </Note>

      {showCatalogue ? (
        <>
          <Note title="Guide prices" tone="info">
            <p>Confirm stock and the final price for your city before you buy. There is no online checkout on this page.</p>
          </Note>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {items.map((a) => (
              <li key={a.id} className="rounded-xl border border-slate-200 p-5">
                <h2 className="font-semibold text-ink">{a.name}</h2>
                <p className="mt-1 text-sm text-ink-500 capitalize">{a.category}</p>
                <p className="mt-2 text-lg font-bold text-ink">
                  {a.demoPricePkr != null ? pkr(a.demoPricePkr) : "Price on request"}
                </p>
                {a.demoPriceNote && <p className="mt-1 text-xs text-ink-500">{a.demoPriceNote}</p>}
                {a.features && (
                  <ul className="mt-2 list-disc pl-5 text-sm text-ink-700">
                    {a.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Note title="Price on request — on purpose" tone="info">
          <p>
            Production pages do not show standing appliance SKU prices we have not verified for your city. Send the item,
            model preferences and your city; we reply with availability, price and delivery before you agree.
          </p>
        </Note>
      )}

      <H2>Browse by category</H2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {categories.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="block h-full rounded-xl border border-slate-200 p-5 hover:border-flame">
              <h2 className="font-semibold text-ink">{c.name}</h2>
              <p className="mt-2 text-ink-700">{c.text}</p>
            </Link>
          </li>
        ))}
      </ul>

      <H2>Compare before you quote</H2>
      <SpecTable
        head={["Category", "What to compare", "What to tell us"]}
        rows={compareRows}
        caption="A short shortlist beats a vague “cheapest stove” request — we can then quote like-for-like."
      />

      <H2>What you pay</H2>
      <SpecTable
        head={["Part", "How it is priced"]}
        rows={[
          ["Appliance or accessory", "Quoted for your model and city before you agree"],
          [
            "Cylinder gas",
            latestPrice
              ? `OGRA per-kg × kg of gas (on file ${pkr(latestPrice.perKgPkr)}/kg, ${monthLong(latestPrice.month)}) — see cylinder price pages`
              : "OGRA per-kg × kg of gas — see cylinder price pages",
          ],
          ["Deposit / exchange", company.terms.deposit],
          ["Delivery", company.terms.delivery],
        ]}
        caption="Appliances and gas are separate. We confirm the full figure for each part of your order."
      />
      <P>
        Compare gas figures on{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
          LPG cylinder price in Pakistan
        </Link>{" "}
        and how we price on{" "}
        <Link className="underline" href="/pricing-policy/">
          pricing policy
        </Link>
        . New connection kits:{" "}
        <Link className="underline" href="/lpg-kit-price-in-pakistan/">
          LPG kit price
        </Link>
        .
      </P>

      <H2>How to order an appliance or accessory</H2>
      <ol className="mt-3 space-y-3">
        {[
          "Choose a category above, or name the item in the form (stove, geyser, heater, burner, hose, regulator).",
          "Include your city, area and whether it is for home or a commercial kitchen — plus two or three preferences if you have them.",
          "We confirm stock (or an alternative), the price and who delivers or installs.",
          "Agree only after you have the full figure. Pay and receive as arranged with the local team.",
          "On arrival, check the item and have the LPG connection leak-tested before use.",
        ].map((step, i) => (
          <li key={step} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {step}
            </p>
          </li>
        ))}
      </ol>
      <P>
        Need gas as well?{" "}
        <Link className="underline" href="/order-lpg/">
          Order LPG
        </Link>{" "}
        or start a{" "}
        <Link className="underline" href="/new-lpg-connection/">
          new LPG connection
        </Link>
        . Cylinder sizes:{" "}
        <Link className="underline" href="/lpg-cylinders/">
          LPG cylinders
        </Link>
        . How supply roles work:{" "}
        <Link className="underline" href="/how-it-works/">
          how it works
        </Link>
        .
      </P>

      <H2>What we can help with</H2>
      <UL
        items={[
          "Domestic stoves, geysers and heaters rated for LPG",
          "Commercial kitchen burners and the regulators and hoses they need",
          "Regulator and hose kits for a new connection or a replacement",
          "Engineering quotes for vaporizers, manifolds and high-draw sites",
          ...company.products.slice(0, 2),
        ]}
      />

      <H2>Safety when you fit or first light</H2>
      <UL
        items={[
          "Use LPG-rated hose and regulator; never a worn garden hose",
          "Leak-check joints with soapy water — never a flame",
          "Keep cylinders upright and ventilated; read the LPG safety guide",
          "Commercial kitchens: plan isolation valves and clear escape routes",
        ]}
      />
      <P>
        <Link className="underline" href="/lpg-safety/">
          LPG safety guide
        </Link>
        .
      </P>

      <H2>Where we supply</H2>
      <P>
        {company.terms.delivery} We aim to reply {company.responseTime} on {site.phoneDisplay}. Main hubs:{" "}
        {hubCities.map((c, i) => (
          <span key={c.slug}>
            <Link className="underline" href={`/lpg-in-${c.slug}/`}>
              {c.name}
            </Link>
            {i < hubCities.length - 1 ? ", " : "."}
          </span>
        ))}
      </P>
      <ul className="mt-3 flex flex-wrap gap-2">
        {cities.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/lpg-in-${c.slug}/`}
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame"
            >
              {c.name} ({c.count} listings)
            </Link>
          </li>
        ))}
      </ul>
      <P>
        Find a local match on{" "}
        <Link className="underline" href="/lpg-near-me/">
          LPG near me
        </Link>{" "}
        or see{" "}
        <Link className="underline" href="/delivery-areas/">
          delivery areas
        </Link>
        .
      </P>

      <Note title="Talk to us now" tone="info">
        <p>
          Call or WhatsApp {site.phoneDisplay} with the item and your city, or use the form. We confirm availability,
          price and who delivers before you agree.
        </p>
      </Note>

      <ImageGallery items={itemsFor(path)} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

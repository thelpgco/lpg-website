import Link from "next/link";
import ContactButtons from "@/components/ContactButtons";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PriceBlock from "@/components/PriceBlock";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { itemsFor } from "@/lib/media";
import { absPct, momChange, monthLong, verb } from "@/lib/money";
import { cylinderPrice, fmtDate, latestPrice, pkr } from "@/lib/prices";
import { hubCities, totals } from "@/lib/network";
import { meta } from "@/lib/seo";

export const metadata = meta({ path: "/" });

const offers = [
  { href: "/lpg-home-delivery/", title: "LPG home delivery and refills", text: "Domestic and commercial cylinders delivered through the nearest distributor in our network." },
  { href: "/lpg-cylinders/", title: "Steel and composite cylinders", text: "5, 11.8, 15 and 45.4 kg steel cylinders and composite (fibre) cylinders, supplied with gas." },
  { href: "/services/", title: "LPG engineering services", text: "Pipelines, tanks, manifolds, boiler and furnace conversions, safety audits and maintenance." },
  { href: "/become-an-lpg-distributor/", title: "Become a distributor or partner", text: "Join our network and supply LPG in your area under certified-cylinder standards." },
];

export default function Home() {
  const n = latestPrice;
  const mom = momChange();
  const dom = cylinderPrice(11.8);

  const faqs = [
    {
      q: `Who is ${company.name}?`,
      a: `${company.aboutBlurb} We also act as a reseller and referral partner on some orders and tell you which role applies before you agree.`,
    },
    {
      q: "What is the LPG price today?",
      a: n
        ? `The OGRA-notified price for ${monthLong(n.month)} is ${pkr(n.perKgPkr)} per kg, so the gas in an 11.8 kg cylinder costs ${pkr(dom!)}. Delivery and any cylinder deposit are confirmed before you agree.`
        : `OGRA notifies the LPG price every month. Call or WhatsApp ${company.phoneDisplay} for today's rate in your city; we confirm the full price before you agree.`,
    },
    {
      q: "Are your cylinders OGRA-certified?",
      a: terms.partnersCertifiedRule,
    },
    {
      q: "How fast is delivery?",
      a: `${company.terms.delivery} ${company.terms.delivery247} We aim to reply ${company.responseTime} on WhatsApp or phone.`,
    },
    {
      q: "Do I pay a deposit or can I exchange my empty cylinder?",
      a: `${company.terms.deposit} ${company.terms.exchange}`,
    },
    {
      q: "What should I do if I smell gas?",
      a: "Do not use the form. Close the cylinder valve if it is safe, open windows, avoid flames and switches, leave the area and call your local emergency service. See our LPG safety page.",
    },
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-flame-50 to-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-flame-700">
              Operating since {company.foundedYear} · OGRA licence {company.licenceNumber}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Trusted LPG supply and engineering across Pakistan
            </h1>
            <p className="mt-4 text-lg text-ink-700">
              {n ? (
                <>
                  Today&apos;s OGRA rate is <strong>{pkr(n.perKgPkr)} per kg</strong> ({monthLong(n.month)}): {pkr(dom!)} of gas in an 11.8 kg
                  cylinder.{" "}
                </>
              ) : null}
              From home refills to commercial banks, bulk supply and full LPG engineering — {company.shortName} serves
              households, kitchens, hospitals, factories and societies nationwide. Delivery target {company.deliveryTarget};{" "}
              we confirm your street and timing before you agree.
            </p>
            <ul className="mt-6 space-y-2 text-ink-700">
              <li>&#10003; {company.legalName}, OGRA licence no. {company.licenceNumber} · since {company.foundedYear}</li>
              <li>&#10003; Certified cylinders only across our network partners</li>
              <li>&#10003; Nationwide coverage: Punjab, Sindh, KP, Balochistan, ICT, AJK and Gilgit-Baltistan</li>
              <li>&#10003; {totals.suppliers} supply partners in {totals.citiesWithPartners} cities · reply {company.responseTime}</li>
            </ul>
            <nav aria-label="Start here" className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-medium text-flame-700">
              <Link href="/lpg-price-in-pakistan/" className="hover:underline">LPG price</Link>
              <Link href="/order-lpg/" className="hover:underline">Order LPG</Link>
              <Link href="/lpg-cylinders/" className="hover:underline">Cylinders</Link>
              <Link href="/lpg-safety/" className="hover:underline">Safety</Link>
              <Link href="/about/" className="hover:underline">About us</Link>
              <Link href="/gallery/" className="hover:underline">Photo gallery</Link>
            </nav>
            <ContactButtons className="mt-6" />
          </div>
          <SiteLeadForm />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-10">
        <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            [`${company.yearsOperating}+ years`, `Operating since ${company.foundedYear}`],
            [`${totals.suppliers}`, "Listed supply partners"],
            [`${totals.citiesWithPartners}`, "Cities with partners"],
            ["Residential to industrial", "Cylinders, bulk and engineering"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-xl bg-slate-50 p-4">
              <dt className="text-sm text-ink-500">{l}</dt>
              <dd className="mt-1 text-xl font-bold text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <ImageGallery items={itemsFor("/")} title="LPG cylinders, delivery and appliances" />
        <h2 className="mt-10 text-2xl font-bold text-ink">What we do</h2>
        <ul className="mt-3 grid gap-x-8 gap-y-1 text-ink-700 sm:grid-cols-2">
          {company.activities.map((a) => (
            <li key={a} className="list-inside list-disc">{a}</li>
          ))}
        </ul>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {offers.map((o) => (
            <Link key={o.href} href={o.href} className="rounded-xl border border-slate-200 p-5 transition hover:border-flame hover:shadow-sm">
              <h3 className="font-semibold text-ink">{o.title}</h3>
              <p className="mt-2 text-ink-700">{o.text}</p>
              <span className="mt-3 inline-block text-sm font-medium text-flame-600">Learn more &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-4">
        <h2 className="text-2xl font-bold text-ink">
          {n ? `LPG price today: ${pkr(n.perKgPkr)} per kg` : "LPG price"}
        </h2>
        {n ? (
          <p className="mt-2 text-ink-700">
            OGRA rate effective {fmtDate(n.effectiveFrom)}.
            {mom ? ` ${monthLong(mom.from.month)} was ${pkr(mom.from.perKgPkr)} per kg, ${verb(mom)} ${absPct(mom.pct)}.` : ""}
          </p>
        ) : null}
        <PriceBlock />
        <p className="mt-3 text-sm text-ink-700">
          <Link href="/lpg-price-in-pakistan/" className="underline">LPG price in Pakistan with month-on-month change</Link> &middot;{" "}
          <Link href="/lpg-cylinder-price-in-pakistan/" className="underline">Cylinder price by size</Link> &middot;{" "}
          <Link href="/pricing-policy/" className="underline">Our pricing policy</Link>
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-bold text-ink">LPG delivery across Pakistan</h2>
        <p className="mt-2 text-ink-700">
          Main hubs below carry the densest partner coverage and ~1 hour delivery targets when a local team is available.
          Named dealers and distributors are on each city page. If your town is smaller, send a request — we
          confirm whether we can reach your street before you agree.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {hubCities.map((c) => (
            <Link key={c.slug} href={`/lpg-in-${c.slug}/`} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-ink-700 hover:border-flame hover:text-flame-600">
              LPG in {c.name}
            </Link>
          ))}
          <Link href="/delivery-areas/" className="rounded-full border border-flame px-4 py-2 text-sm font-medium text-flame-700">All delivery areas</Link>
          <Link href="/projects/" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-ink-700 hover:border-flame hover:text-flame-600">Engineering projects</Link>
          <Link href="/our-network/" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-ink-700 hover:border-flame hover:text-flame-600">Our network</Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8">
        <h2 className="text-2xl font-bold text-ink">How it works</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ["1", "Tell us what you need", "Call, WhatsApp or use the form. Give your city, area and cylinder size."],
            ["2", "We confirm price and timing", "We apply the OGRA rate, name the nearest distributor, confirm any deposit or exchange and give you the delivery window before you agree."],
            ["3", "Delivery and safety check", "The cylinder is delivered and connected. We tell you who delivered it and what role we played."],
          ].map(([num, t, d]) => (
            <li key={num} className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-flame-700">Step {num}</p>
              <p className="mt-1 font-semibold text-ink">{t}</p>
              <p className="mt-1 text-ink-700">{d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm"><Link href="/how-it-works/" className="underline">Read the full process, including our three roles</Link></p>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <Faq items={faqs} />
      </div>
    </>
  );
}

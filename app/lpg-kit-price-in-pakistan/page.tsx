import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { itemsFor } from "@/lib/media";
import { isDemo } from "@/lib/mode";
import { pkr } from "@/lib/prices";
import { appliances } from "@/lib/products";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-kit-price-in-pakistan/" });

function Table({ head, rows }: { head: string[]; rows: React.ReactNode[][] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-ink">
          <tr>
            {head.map((h) => (
              <th key={h} className="p-3 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 text-ink-700">
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className="p-3 align-top">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const faqs = [
  {
    q: "What is the price of an LPG kit in Pakistan?",
    a: "There is no single price. It changes with the vehicle, engine type, kit type, tank size, brand, installation and the month you buy. We do not publish kit prices because we have not verified supplier figures. Ask for a written quote that lists each part and the labour.",
  },
  {
    q: "Why do kit prices vary so much?",
    a: "Different engines need different systems (carburettor, multipoint injection, direct injection), tanks come in different sizes, and parts vary in quality and certification. Installation time and workshop rates also differ by city.",
  },
  {
    q: "Is a cheaper kit a good deal?",
    a: "Not if it lacks certification, uses poor hoses or skips testing. A kit is a safety system. Compare what is included and whether parts and the installation are documented, not only the headline price.",
  },
  {
    q: "Do you sell LPG kits?",
    a: "We do not list kits for sale or publish kit prices on this page. Send your city and vehicle and we say honestly whether a listed partner may help. You should still verify the workshop and its certification yourself.",
  },
  {
    q: "What should a kit quote include?",
    a: "Vehicle make, model and engine; kit type and brand; tank size and certification; list of parts; installation and tuning labour; leak test; written warranty terms; and the date of the quote.",
  },
  {
    q: "Is converting my car legal?",
    a: "Rules change and differ by activity. Confirm the current position with OGRA and your vehicle registration authority before you buy any kit. We do not give legal clearance on this page.",
  },
  {
    q: "Can I use a home cylinder with a kit?",
    a: "No. Never connect a home or commercial cylinder to a vehicle. Vehicle systems use their own approved tank and fill point.",
  },
];

export default function Page() {
  // Demo mode only: kit catalogue lines if present. Production never shows a kit price list.
  const demoKits = isDemo() ? appliances().filter((x) => x.category === "kit") : [];
  return (
    <PageShell
      crumbs={[
        { name: "Auto LPG", href: "/auto-lpg-in-pakistan/" },
        { name: "LPG kit price", href: "/lpg-kit-price-in-pakistan/" },
      ]}
      h1="LPG kit cost in Pakistan: what to compare and how to get a written quote"
      intro={`An LPG kit has no single price: it depends on your vehicle, kit type, tank and workshop. This page is a comparison guide, not a price list. It shows what drives the cost, what a proper quote must list and how to ask for one. ${site.name} (OGRA licence ${site.licenceNumber}).`}
      aside={<SiteLeadForm defaultRequest="other" heading="Request a kit quote route" subheading="Tell us your city and vehicle. We say honestly whether a listed partner may help." buttonLabel="Request kit quote route" />}
    >
      <Note title="Short answer" tone="warn">
        <p>
          Ask for a written, itemised quote and compare parts, certification, labour and testing, not just the total. A
          bare number without a parts list and a leak test is not a quote you can compare. Use the checklist below, then send
          your vehicle details through the form for guidance on where to ask.
        </p>
      </Note>

      {demoKits.length > 0 && (
        <>
          <Note title="Guide prices" tone="info">
            <p>Kit lines below are guide figures. Confirm the final quote for your vehicle and city before you agree.</p>
          </Note>
          <Table
            head={["Item", "Price band", "Notes"]}
            rows={demoKits.map((k) => [
              k.name,
              k.demoPricePkr != null ? `${pkr(k.demoPricePkr)}` : "Price on request",
              [k.demoPriceNote, ...(k.features ?? [])].filter(Boolean).join("; "),
            ])}
          />
        </>
      )}

      <H2>What changes the price</H2>
      <Table
        head={["Factor", "How it affects the cost", "What to ask"]}
        rows={[
          ["Engine type", "Carburettor, multipoint and direct-injection engines need different systems", "Which system suits my engine and why?"],
          ["Kit type and brand", "Parts quality, controller and sensors differ", "Is each part certified and listed on the quote?"],
          ["Tank size and type", "Larger or specialised tanks cost more and change boot space", "What tank, what certification, where is it mounted?"],
          ["Installation and tuning", "Labour depends on vehicle and workshop", "What is included, and is tuning done on a test run?"],
          ["Testing and records", "Leak test and documents add time", "Will I get a written installation and test record?"],
          ["After-sale support", "Warranty and service differ", "What is covered, for how long, and who services it?"],
          ["City and timing", "Workshop rates and parts supply vary", "Is the quote dated and for how many days is it valid?"],
        ]}
      />

      <H2>A quote should show</H2>
      <UL
        items={[
          "Your vehicle make, model, year and engine",
          "Each part with brand and model, including the tank and its certification",
          "Installation, tuning and testing as separate lines",
          "Warranty terms in writing",
          "The date of the quote and how long it is valid",
          "A promise of a written installation and leak-test record at handover",
        ]}
      />

      <H2>Red flags</H2>
      <UL
        items={[
          "A price given without asking about your vehicle",
          "No written parts list or certification",
          "Pressure to fit a used or unmarked tank",
          "No leak test, or one that is not recorded",
          "Advice to fill a vehicle from a home or commercial cylinder",
        ]}
      />
      <P>
        Read the overview of <Link className="underline" href="/auto-lpg-in-pakistan/">auto LPG in Pakistan</Link>, including what to
        verify with OGRA and your vehicle registration authority, and how to check a <Link className="underline" href="/lpg-filling-stations/">filling station</Link>.
      </P>

      <H2>Working out whether a kit pays for itself</H2>
      <P>
        The real question behind a kit price is how long it takes to earn back. Take your monthly kilometres, your fuel cost
        per kilometre on petrol and on LPG, and the kit price including fitting:
      </P>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Monthly saving = kilometres × (petrol cost per km − LPG cost per km).</li>
        <li>Payback in months = kit and fitting price ÷ monthly saving.</li>
        <li>Add servicing for the kit (filters, tuning) to the LPG side so the saving is not overstated.</li>
      </ol>
      <P>
        Cars that run many kilometres a month, such as taxis and ride-hailing cars, earn the kit back far sooner than a car
        used for short city trips. Use real figures from your own fuel receipts, not the advertised mileage.
      </P>

      <H2>How we can help</H2>
      <P>
        We do not sell kits on this page and do not give legal clearance. Send your city and vehicle through the form,
        call {site.phoneDisplay} or use <a className="underline" href={`https://wa.me/${site.whatsapp}`}>WhatsApp</a>. We tell you honestly
        whether a listed auto-LPG partner may be able to quote, and what you should verify before you pay anyone.
      </P>

      <H2>Related pages</H2>
      <UL
        items={[
          <Link key="1" className="underline" href="/auto-lpg-in-pakistan/">Auto LPG in Pakistan</Link>,
          <Link key="2" className="underline" href="/lpg-vs-cng/">LPG vs CNG</Link>,
          <Link key="3" className="underline" href="/lpg-price-per-kg-in-pakistan/">LPG price per kg in Pakistan</Link>,
          <Link key="4" className="underline" href="/lpg-safety/">LPG safety guide</Link>,
          <Link key="5" className="underline" href="/our-network/">Our network</Link>,
        ]}
      />

      <ImageGallery items={itemsFor("/lpg-kit-price-in-pakistan/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

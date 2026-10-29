import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import GasCostWorked from "@/components/GasCostWorked";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { terms } from "@/lib/commercial";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { projectBySlug } from "@/lib/projects";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/industrial-lpg-supply/" });

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

const showcase = [
  projectBySlug("faisalabad-textile-furnace-conversion"),
  projectBySlug("karachi-factory-bulk-tank-interface"),
].filter(Boolean);

const faqs = [
  {
    q: "What is industrial LPG supply?",
    a: "Industrial LPG supply is gas for process heat and production: boilers, furnaces, ovens, dryers, kilns and similar equipment. Volumes are larger and steadier than at a restaurant, so supply is usually by cylinder bank or bulk tank rather than single cylinders.",
  },
  {
    q: "Which industries do you serve?",
    a: "We take enquiries from food processing, textile, manufacturing, poultry farms, hotels and hospitals, among others — nationwide across Pakistan. We tell you honestly whether supply and installation are possible for your site and volume.",
  },
  {
    q: "Can you convert a boiler or furnace to LPG?",
    a: "Our engineering team assesses conversion of boilers and furnaces after a brief and site review. The scope and price are written before work starts. See boiler and furnace conversion and the Faisalabad textile furnace project profile.",
  },
  {
    q: "What do you need to give me a price?",
    a: "Equipment list and ratings, expected daily or monthly gas use, site location, access for delivery, and whether you want cylinders, a cylinder bank or a bulk tank. A rough figure is enough to start; we refine it at assessment.",
  },
  {
    q: "How is industrial LPG priced?",
    a: "Gas starts from the OGRA-notified rate per kg (same rate nationwide). Delivery, volume, cylinder or tank terms and payment arrangements are confirmed in writing before you agree. We do not publish fixed industrial prices. See the national price page for the current per-kg figure.",
  },
  {
    q: "How fast can you respond or deliver?",
    a: "Industrial volumes and tanker routes are confirmed per order, once we know your site, access and monthly demand.",
  },
  {
    q: "Is there a minimum quantity?",
    a: "We do not publish a minimum on this page. Minimums depend on the distributor and route for your area, and we state them when we quote.",
  },
  {
    q: "Are cylinders certified?",
    a: "Yes. The cylinder-condition rule is in the terms table above. Check the marking and seal on every cylinder that arrives at your gate.",
  },
  {
    q: "Is LPG cheaper than other fuels for my plant?",
    a: "That depends on your current fuel, your equipment efficiency and the gas rate in the month you buy. Use the LPG vs diesel and LPG vs sui gas cost calculators with your own figures rather than relying on a general claim.",
  },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Industrial LPG supply", href: "/industrial-lpg-supply/" }]}
      h1="Industrial LPG supply in Pakistan for factories and plants"
      intro={`${company.shortName} takes industrial LPG enquiries for boilers, furnaces, ovens and process heat nationwide. We are an OGRA-licensed marketer and distributor (licence ${company.licenceNumber}). Send your equipment and use; we reply with a written scope and price, or say plainly if we cannot serve your site.`}
      aside={
        <SiteLeadForm
          defaultRequest="bulk_industrial"
          heading="Request industrial supply"
          buttonLabel="Request quotation"
          subheading="Equipment list, city and hours — we confirm who supplies and when."
        />
      }
    >
      <Note title="Short answer">
        <p>
          Industrial sites normally use a cylinder bank or a bulk tank, not single cylinders. We help with supply and,
          through our engineering team, with design and installation. We do not publish fixed industrial prices on this
          page. Every quotation is made for your equipment, volume and location — and we confirm your street before you
          agree.
        </p>
      </Note>

      <H2>Full-service industrial LPG across Pakistan</H2>
      <P>
        {company.shortName} holds OGRA licence {company.licenceNumber}. Industrial capability covers: {company.industrial.join("; ")}. Engineering when you need
        it: {company.engineering.slice(0, 3).join("; ")}.
      </P>
      <P>
        Browse{" "}
        <Link className="underline" href="/industries/">
          industries
        </Link>
        ,{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>
        ,{" "}
        <Link className="underline" href="/delivery-areas/">
          delivery areas
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>
        .
      </P>

      <H2>Where LPG is used in industry</H2>
      <Table
        head={["Application", "Typical equipment", "Supply route to discuss"]}
        rows={[
          ["Steam and hot water", "Boilers", "Cylinder bank or bulk tank, with vaporiser where needed"],
          ["Baking and food processing", "Ovens, fryers, cookers", "Cylinder bank or pipeline from a central store"],
          ["Textile and drying", "Dryers, stenters, finishing lines", "Bulk tank or bank, depending on load"],
          ["Metal and ceramic heat", "Furnaces, kilns", "Bulk tank with pipeline, after engineering review"],
          ["Poultry and farms", "Brooders and space heating", "Cylinders or small bank for seasonal use"],
          ["Hotels and hospitals", "Kitchens, laundry, hot water", "Bank or tank; see commercial supply"],
        ]}
      />

      <GasCostWorked kg={45.4} usage="industrial" heading="Worked example: gas cost per 45.4 kg of LPG" />
      <P>
        An industrial site usually buys by the tonne or by tank volume, not by single cylinders, but the 45.4 kg figure
        is a handy yardstick. To turn your own boiler or oven rating into kg of gas per hour and then rupees per month,
        use the BTU and kWh converter below, then multiply by the per-kg price above.
      </P>

      <H2>Supply and engineering from one team</H2>
      <UL
        items={[
          <span key="a">
            <Link className="underline" href="/services/boiler-and-furnace-conversion-to-lpg/">
              Boiler and furnace conversion to LPG
            </Link>
          </span>,
          <span key="b">
            <Link className="underline" href="/services/lpg-storage-tank-installation/">
              Storage tank installation
            </Link>
          </span>,
          <span key="c">
            <Link className="underline" href="/services/lpg-pipeline-installation/">
              Pipeline installation
            </Link>
          </span>,
          <span key="d">
            <Link className="underline" href="/services/lpg-manifold-and-cylinder-bank-installation/">
              Manifold and cylinder bank installation
            </Link>
          </span>,
          <span key="e">
            <Link className="underline" href="/services/lpg-air-sng-systems/">
              LPG-air (SNG) systems
            </Link>
          </span>,
        ]}
      />

      <H2>What we ask for before quoting</H2>
      <UL
        items={[
          "Equipment list with make, model and gas rating (kW, BTU/hr or kg/hr)",
          "Hours of operation per day and days per week",
          "Current fuel and monthly use, if you want a comparison",
          "Site address, access road and any space plan for a tank or bank",
          "Any safety or compliance requirement your own company applies",
        ]}
      />
      <P>
        Use the{" "}
        <Link className="underline" href="/tools/lpg-btu-kwh-converter/">
          BTU and kWh converter
        </Link>{" "}
        to bring ratings to one unit, and the{" "}
        <Link className="underline" href="/tools/lpg-vs-diesel-cost-calculator/">
          LPG vs diesel
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/tools/lpg-vs-sui-gas-cost-calculator/">
          LPG vs sui gas
        </Link>{" "}
        calculators to test your own numbers.
      </P>

      <H2>Project examples</H2>
      <P>
        Process-heat and bulk interface work is listed on{" "}
        <Link className="underline" href="/projects/">
          projects
        </Link>
        :
      </P>
      <UL
        items={showcase.map((p) => (
          <Link key={p!.slug} className="underline" href={`/projects/${p!.slug}/`}>
            {p!.title}
          </Link>
        ))}
      />

      <H2>Capability and limits, stated plainly</H2>
      <Table
        head={["Topic", "What we say"]}
        rows={[
          ["Supply route", `${company.shortName} supplies under OGRA licence ${company.licenceNumber} and through a nationwide distributor network. Industrial supply is confirmed per site and per volume.`],
          ["Delivery time", terms.delivery],
          ["Prices", "Gas from the OGRA-notified rate. Delivery and terms confirmed in writing before you agree."],
          ["Past projects", "See the projects page for profiles we publish. Ask us for what we can share for your type of site."],
          ["Cylinder condition", terms.partnersCertifiedRule],
        ]}
      />

      <H2>Related pages</H2>
      <UL
        items={[
          <Link key="1" className="underline" href="/bulk-lpg-supply/">
            Bulk LPG supply
          </Link>,
          <Link key="2" className="underline" href="/commercial-lpg-supply/">
            Commercial LPG supply
          </Link>,
          <Link key="3" className="underline" href="/industries/manufacturing/">
            LPG for manufacturing
          </Link>,
          <Link key="4" className="underline" href="/industries/textile/">
            LPG for textile
          </Link>,
          <Link key="5" className="underline" href="/lpg-safety/">
            LPG safety guide
          </Link>,
          <Link key="6" className="underline" href="/order-lpg/">
            Order LPG
          </Link>,
        ]}
      />

      <Note title="Talk to us now" tone="info">
        <p>
          Call {company.phoneDisplay} or message us on{" "}
          <a className="underline" href={`https://wa.me/${site.whatsapp}`}>
            WhatsApp
          </a>
          . {terms.responseTime} Use the form on this page for a written industrial quotation.
        </p>
      </Note>

      <ImageGallery items={itemsFor("/industrial-lpg-supply/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import GasCostWorked from "@/components/GasCostWorked";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import { terms } from "@/lib/commercial";
import { company } from "@/lib/company/profile";
import { directorySummary } from "@/lib/directory";
import { itemsFor } from "@/lib/media";
import { projectBySlug } from "@/lib/projects";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/commercial-lpg-supply/" });

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
  projectBySlug("islamabad-restaurant-cylinder-bank-manifold"),
  projectBySlug("lahore-hotel-kitchen-lpg-pipeline"),
].filter(Boolean);

const faqs = [
  {
    q: "What is commercial LPG supply?",
    a: "Commercial LPG supply means gas for a business rather than a home: restaurants, hotels, bakeries, canteens, laundries, small workshops and similar sites. It is usually supplied in 45.4 kg cylinders, in cylinder banks on a manifold, or from a bulk tank when use is high.",
  },
  {
    q: "Which cylinder size do restaurants use?",
    a: "Most commercial kitchens use the 45.4 kg cylinder because it lasts longer between changes than a domestic cylinder. Smaller shops and tea stalls may use 11.8 kg or 15 kg cylinders. The right choice depends on how many burners you run and for how many hours.",
  },
  {
    q: "What is the price for commercial LPG?",
    a: "Gas starts from the OGRA-notified rate per kg (same rate nationwide). Your total can also include delivery and a cylinder deposit or exchange, depending on your order. We confirm the full figure in writing or on WhatsApp before you agree. See the current rate on the price page.",
  },
  {
    q: "How fast can you deliver?",
    a: "It depends on your area and how many cylinders you need; the delivery line in the terms above sets out the target. Regular weekly supply is agreed with you before it starts.",
  },
  {
    q: "Can you supply on a regular schedule?",
    a: "Tell us your expected monthly use and your city. We confirm whether a distributor in our nationwide network can deliver on a regular schedule in your area and agree the terms with you before supply starts.",
  },
  {
    q: "Are cylinders certified?",
    a: "Yes. Partners may supply only cylinders with valid certification markings. Check the marking and seal on each 45.4 kg cylinder when it arrives and refuse a damaged one.",
  },
  {
    q: "Do you cover my city outside the big metros?",
    a: `${company.shortName} works nationwide across Pakistan through its distributor network. Coverage and timing are confirmed for your street before you agree — see delivery areas and our network, or send the form with your city.`,
  },
  {
    q: "Do you offer credit or monthly billing?",
    a: "Payment terms are agreed per customer and per order. We do not assume credit or prepayment until we state it to you. Ask in the form or on the call and we confirm what applies.",
  },
  {
    q: "Who delivers the cylinders?",
    a: `${company.name} is an OGRA-licensed marketer and distributor (licence ${company.licenceNumber}). We may supply directly, resell, or pass your order to a distributor in the network. We tell you which role applies and who will deliver before you agree.`,
  },
  {
    q: "Can you also install the gas line in my kitchen?",
    a: "Yes, through our engineering team. Pipeline, manifold and cylinder-bank installation are quoted separately after a brief and, where needed, a site assessment. See engineering services and project profiles for similar kitchen work.",
  },
];

export default function Page() {
  const listings = directorySummary.counts.merged_listings.toLocaleString("en-PK");

  return (
    <PageShell
      crumbs={[{ name: "Commercial LPG supply", href: "/commercial-lpg-supply/" }]}
      h1="Commercial LPG supply in Pakistan for restaurants and businesses"
      intro={`${company.shortName} is an OGRA-licensed full-service LPG company (licence ${company.licenceNumber}) with nationwide coverage: 45.4 kg cylinders, cylinder banks and bulk for restaurants, hotels, bakeries and other businesses. Send your city and monthly use; we confirm price, street and who delivers before you agree.`}
      aside={
        <SiteLeadForm
          defaultRequest="commercial_supply"
          heading="Request commercial supply"
          buttonLabel="Request a quotation"
          subheading="City, burners and cylinders per week — we confirm timing and terms first."
        />
      }
    >
      <Note title="Short answer">
        <p>
          For most kitchens, commercial LPG means 45.4 kg cylinders delivered to your door. Higher-use sites move to a
          manifold with several cylinders, or to a bulk tank. We quote after you tell us your city, cylinder size and
          expected monthly use. We do not publish a fixed commercial price because the gas rate is notified by OGRA and
          your total depends on delivery and cylinder terms.
        </p>
      </Note>

      <H2>Nationwide commercial supply</H2>
      <P>
        {company.shortName} holds OGRA licence {company.licenceNumber}. Commercial orders run through the same network
        that serves homes and industry; roughly {listings} named local listings help us route your city.
      </P>
      <UL
        items={[
          ...company.commercial,
          "Cylinder banks, manifolds and kitchen pipelines through our engineering team",
          "Safety audits and maintenance contracts where you want ongoing checks",
        ]}
      />
      <P>
        Check{" "}
        <Link className="underline" href="/delivery-areas/">
          delivery areas
        </Link>
        ,{" "}
        <Link className="underline" href="/our-network/">
          our network
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>
        , or{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>{" "}
        for a one-off commercial cylinder.
      </P>

      <H2>What we supply to businesses</H2>
      <Table
        head={["Supply option", "Typical use", "How it is arranged"]}
        rows={[
          ["45.4 kg commercial cylinder", "Restaurants, hotels, bakeries, canteens, laundries", "Delivered to site. Exchange or new cylinder terms confirmed per order."],
          ["15 kg and 11.8 kg cylinders", "Small shops, food stalls, light commercial use", "Same ordering route as home delivery. Confirm size and stock for your area."],
          ["Cylinder bank on a manifold", "Kitchens with several burners and steady daily use", "Cylinders joined to one supply line. Installation quoted by our engineering team."],
          ["Bulk tank supply", "High-volume sites, hotels, hospitals, factories", "Sized from demand and site layout. See bulk LPG supply."],
          ["Burners and accessories", "Commercial cooking lines", "Regulators, hoses and burners for commercial use. Ask for what suits your appliances."],
        ]}
      />

      <H2>How commercial ordering works</H2>
      <ol className="mt-3 space-y-3">
        {[
          ["Send your details", "Business type, city and area, cylinder size you use, and rough cylinders per week or month. Form, call or WhatsApp all work."],
          ["We match supply", "We check which distributor in our nationwide network serves your street and whether they can meet your volume."],
          ["We confirm before you agree", "Gas price, delivery window, deposit or exchange, payment method and who delivers. Nothing is dispatched until you agree."],
          ["Delivery and handover", "Check the certification marking, valve seal and connection on arrival. Refuse a damaged cylinder."],
        ].map(([t, d], i) => (
          <li key={t} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {t}
            </p>
            <p className="mt-1 text-ink-700">{d}</p>
          </li>
        ))}
      </ol>

      <GasCostWorked kg={45.4} usage="commercial" heading="Worked example: gas cost of a 45.4 kg commercial cylinder" />

      <H2>Price and terms: what we confirm</H2>
      <P>
        The gas component is the OGRA-notified rate per kg times the weight of gas — the same notified rate in every city.
        Delivery, deposit or exchange and any handling are added for your site. Before you agree, we state:
      </P>
      <UL
        items={[
          company.terms.deposit,
          company.terms.exchange,
          company.terms.delivery,
          "Payment method and any credit terms, only if we have agreed them with you in advance.",
        ]}
      />

      <H2>What to tell us for an accurate quote</H2>
      <UL
        items={[
          "Business type and the appliances that run on gas (burners, tandoor, fryers, boilers, geysers)",
          "City, area and whether delivery access suits a truck or only a pickup",
          "Cylinder size you use now and how many you change per week",
          "Where cylinders are stored on site and whether a manifold exists",
          "Whether you want a one-time order or regular supply",
        ]}
      />
      <P>
        Not sure how much gas you use? Try the{" "}
        <Link className="underline" href="/tools/lpg-cylinder-duration-calculator/">
          cylinder duration calculator
        </Link>{" "}
        or send photos of your cylinder area and we will help estimate.
      </P>

      <H2>Project examples</H2>
      <P>
        Kitchen and hotel engineering we have completed is listed on the{" "}
        <Link className="underline" href="/projects/">
          projects
        </Link>{" "}
        page. Examples that match commercial kitchens:
      </P>
      <UL
        items={showcase.map((p) => (
          <Link key={p!.slug} className="underline" href={`/projects/${p!.slug}/`}>
            {p!.title}
          </Link>
        ))}
      />

      <H2>Safety at a commercial site</H2>
      <P>
        Cylinders should stand upright, outdoors or in a ventilated store, away from drains and heat. Use regulators and
        hoses rated for the load and replace damaged parts. Our team can review your setup under{" "}
        <Link className="underline" href="/services/lpg-safety-audit-and-inspection/">
          safety audit and inspection
        </Link>
        . Read the{" "}
        <Link className="underline" href="/lpg-safety/">
          LPG safety guide
        </Link>{" "}
        and know what to do if you smell gas (leave first, then call 1122 from a safe distance):{" "}
        <Link className="underline" href="/what-to-do-if-you-smell-gas/">
          gas leak steps
        </Link>
        .
      </P>
      <P>{terms.partnersCertifiedRule}</P>

      <H2>Related pages</H2>
      <UL
        items={[
          <Link key="1" className="underline" href="/order-lpg/">
            Order LPG
          </Link>,
          <Link key="2" className="underline" href="/lpg-cylinders/45-kg-commercial-cylinder/">
            45.4 kg commercial cylinder
          </Link>,
          <Link key="3" className="underline" href="/bulk-lpg-supply/">
            Bulk LPG supply
          </Link>,
          <Link key="4" className="underline" href="/industrial-lpg-supply/">
            Industrial LPG supply
          </Link>,
          <Link key="5" className="underline" href="/industries/restaurants/">
            LPG for restaurants
          </Link>,
          <Link key="6" className="underline" href="/services/lpg-manifold-and-cylinder-bank-installation/">
            Manifold and cylinder bank installation
          </Link>,
          <Link key="7" className="underline" href="/licences-and-compliance/">
            Licences and compliance
          </Link>,
        ]}
      />

      <Note title="Talk to us now" tone="info">
        <p>
          Call {company.phoneDisplay} or message us on{" "}
          <a className="underline" href={`https://wa.me/${site.whatsapp}`}>
            WhatsApp
          </a>
          . {terms.responseTime} {company.name} holds OGRA licence {company.licenceNumber}. Or use{" "}
          <Link className="underline" href="/order-lpg/">
            order LPG
          </Link>
          .
        </p>
      </Note>

      <ImageGallery items={itemsFor("/commercial-lpg-supply/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

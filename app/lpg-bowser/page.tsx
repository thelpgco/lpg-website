import Link from "next/link";
import Faq from "@/components/Faq";
import GasCostWorked from "@/components/GasCostWorked";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { itemsFor } from "@/lib/media";
import { projectBySlug } from "@/lib/projects";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-bowser/" });

const showcase = [
  projectBySlug("karachi-factory-bulk-tank-interface"),
  projectBySlug("faisalabad-textile-furnace-conversion"),
].filter(Boolean);

const faqs = [
  {
    q: "What is an LPG bowser?",
    a: "An LPG bowser is a road tanker that carries liquefied petroleum gas under pressure. It delivers gas into a fixed bulk storage tank at a factory, hotel, hospital, farm or similar site — or moves bulk gas between licensed storage points.",
  },
  {
    q: "When should I use a bowser instead of cylinders?",
    a: "When your use is high and steady, you have (or will install) a bulk tank with safe access, and you want fewer deliveries than a cylinder bank. Low or irregular use is usually better on cylinders. Send monthly kg and site photos and we advise honestly.",
  },
  {
    q: "What capacity does an LPG bowser have?",
    a: "Road-tanker capacity varies by vehicle design and the approvals it carries. Typical commercial bowsers on Pakistan routes are often in a multi-tonne range, but we do not publish a single “standard” size for your site. We confirm which tanker can reach your gate after the site check.",
  },
  {
    q: "What does bowser delivery cost?",
    a: "Gas starts from the OGRA-notified rate per kg (same nationwide baseline on this site). Distance, volume, access time and commercial terms change the delivered total. We quote after you share location and expected monthly use — we do not publish a fixed bowser price list.",
  },
  {
    q: "Do you operate bowsers yourselves?",
    a: `${company.shortName} arranges bulk supply through our licensed marketing/distribution role and the nationwide network. Tanker availability is confirmed case by case for your city and road access — we tell you who will deliver before you agree.`,
  },
  {
    q: "What must my site have for a bowser fill?",
    a: "Safe road access and turning for the tanker, a suitable offloading position, a tank with correct fittings, and clearances that meet applicable safety rules. Our team checks these at assessment before any refill schedule is agreed.",
  },
  {
    q: "Is bowser delivery available in my city?",
    a: `Nationwide coverage is our intent through the distributor network. Bulk tanker routes are not the same as domestic cylinder routes — send your pin and we say honestly whether bowser fill is possible. ${terms.delivery}`,
  },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "Bulk LPG supply", href: "/bulk-lpg-supply/" },
        { name: "LPG bowser", href: "/lpg-bowser/" },
      ]}
      h1="LPG bowser in Pakistan: bulk tanker supply for sites with a tank"
      intro={`An LPG bowser is a road tanker that fills a fixed bulk tank at your site. ${company.shortName} is an OGRA-licensed marketer and distributor (licence ${company.licenceNumber}). We explain when bowser supply makes sense, how cost is built, the safety checks we insist on, and quote commercial/bulk delivery for your location.`}
      aside={
        <SiteLeadForm
          defaultRequest="bulk_industrial"
          heading="Ask about bowser delivery"
          buttonLabel="Request bulk quotation"
          subheading="City, tank size or space, and monthly use — we confirm route and terms."
        />
      }
    >
      <Note title="Short answer">
        <p>
          A bowser only makes sense if you have — or will install — a bulk tank with tanker access. Gas follows the
          OGRA per-kg baseline; delivery and terms are quoted for your site. We confirm tanker availability case by case
          and do not invent a fixed capacity or doorstep time for every city on this page.
        </p>
      </Note>

      <H2>What bowser supply is</H2>
      <P>
        Bulk LPG leaves a terminal or plant by road tanker. At your site, trained staff connect to the tank, transfer
        gas under controlled procedures, record the quantity and leave the site with valves and emergency shut-off
        understood by your team. It is the same product family as cylinder gas — propane/butane mix used in Pakistan —
        but the logistics, storage rules and site duties are those of bulk storage, not a single domestic bottle.
      </P>
      <P>
        Full bulk overview:{" "}
        <Link className="underline" href="/bulk-lpg-supply/">
          bulk LPG supply
        </Link>
        . Production and chain context:{" "}
        <Link className="underline" href="/how-lpg-is-produced-and-supplied/">
          how LPG is produced and supplied
        </Link>
        .
      </P>

      <H2>When a bowser is the right tool</H2>
      <SpecTable
        head={["Situation", "Usually better", "Why"]}
        rows={[
          ["High weekly kg, space for a tank, good road access", "Bowser to bulk tank", "Fewer deliveries; continuous feed to process or kitchen lines"],
          ["Steady use but no tank approval or space yet", "Cylinder bank on a manifold", "Scales without a fixed tank; changeover without flame-out"],
          ["Restaurants, shops, low or irregular use", "45.4 kg or domestic cylinders", "Lower site cost; exchange and refill through the network"],
          ["Engineering not ready; demand still being measured", "Temporary cylinders, then reassess", "Avoids committing to tank CAPEX before the load is known"],
        ]}
        caption="We advise after you share monthly use and a site sketch or photos — not from a slogan."
      />

      <H2>How a bowser delivery works</H2>
      <ol className="mt-3 space-y-3">
        {[
          [
            "Site and tank check",
            "We (or the fulfilling partner) check tank condition, fittings, offloading position, road width, gates and safe distances before agreeing a refill schedule.",
          ],
          [
            "Order or standing schedule",
            "You order when level is low, or on a written schedule once volume and route are agreed. Price and window are confirmed before dispatch.",
          ],
          [
            "Offloading",
            "Gas is transferred by trained staff. No smoking or open flames nearby; site staff stay clear of the hose path unless instructed.",
          ],
          [
            "Record and handover",
            "Quantity and tank level are recorded. Your team must know the emergency shut-off. Refuse delivery if access or fittings look unsafe.",
          ],
        ].map(([t, d], i) => (
          <li key={t} className="rounded-xl bg-slate-50 p-4">
            <p className="font-semibold text-ink">
              {i + 1}. {t}
            </p>
            <p className="mt-1 text-ink-700">{d}</p>
          </li>
        ))}
      </ol>

      <H2>Cost angles (what changes the quote)</H2>
      <UL
        items={[
          "OGRA-notified gas price per kg × quantity transferred (national baseline on this site when we have entered the month’s figure)",
          "Distance and access time from the serving depot or plant",
          "Minimum drop size and how often you take delivery",
          "Whether tank installation, manifolds or vaporisers are part of the same project",
          "Payment and credit terms agreed in writing for commercial accounts",
        ]}
      />
      <P>
        {terms.sameOgraRateAllCities
          ? "The OGRA per-kg consumer rate we show is the same nationwide; your delivered bulk total still depends on logistics and contract terms."
          : "Confirm the per-kg baseline on the price page for the month you order."}{" "}
        Deposit language for cylinders does not apply the same way to a customer-owned bulk tank — tank ownership and
        liability are stated in the quotation. See{" "}
        <Link className="underline" href="/pricing-policy/">
          pricing policy
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>
        .
      </P>
      <GasCostWorked
        kg={45.4}
        usage="bulk"
        heading="Worked example: gas cost when you compare bulk drops with 45.4 kg cylinders"
      />

      <H2>Safety and regulation</H2>
      <UL
        items={[
          "Bulk carriage and storage are regulated; tanker vehicles and tanks need the approvals that apply to that activity and size.",
          "Keep ignition sources away during offloading; know the emergency shut-off before the first fill.",
          "Do not improvise hose connections or bypass safety valves.",
          "Cylinder decanting into tanks or other cylinders is not a substitute for licensed bulk fill.",
        ]}
      />
      <P>
        Guides:{" "}
        <Link className="underline" href="/lpg-safety/">
          LPG safety
        </Link>
        ,{" "}
        <Link className="underline" href="/ogra-lpg-regulations-pakistan/">
          OGRA LPG regulations
        </Link>
        ,{" "}
        <Link className="underline" href="/licences-and-compliance/">
          licences and compliance
        </Link>
        . Confirm current requirements with OGRA and relevant authorities before you buy a tanker or build storage —
        rules depend on activity, size and province.
      </P>

      <H2>What to send for a commercial / bulk quote</H2>
      <UL
        items={[
          "City, area and map pin or address",
          "Existing tank size and make — or clear photos of the space where you plan one",
          "Expected monthly gas use (kg or tonnes) and the equipment it feeds",
          "Road width, gate height and any turning limits",
          "Whether you need tank installation, vaporiser or pipeline work as well as gas",
        ]}
      />
      <P>
        First estimate:{" "}
        <Link className="underline" href="/tools/lpg-tank-size-calculator/">
          LPG tank size calculator
        </Link>
        . {terms.delivery} {terms.responseTime}
      </P>

      {showcase.length > 0 && (
        <>
          <H2>Related bulk and industrial work</H2>
          <UL
            items={showcase.map((p) => (
              <span key={p!.slug}>
                <Link className="underline" href={`/projects/${p!.slug}/`}>
                  {p!.title}
                </Link>
                {` — ${p!.city}`}
              </span>
            ))}
          />
          <P>
            More:{" "}
            <Link className="underline" href="/projects/">
              projects
            </Link>
            ,{" "}
            <Link className="underline" href="/industrial-lpg-supply/">
              industrial LPG supply
            </Link>
            ,{" "}
            <Link className="underline" href="/services/lpg-storage-tank-installation/">
              storage tank installation
            </Link>
            .
          </P>
        </>
      )}

      <Note title="Talk to us about bulk / bowser supply" tone="info">
        <p>
          Call or WhatsApp {site.phoneDisplay}, or use the form. We confirm whether a tanker route can serve your site,
          then quote gas and any engineering in writing before you agree.
        </p>
      </Note>

      <ImageGallery items={itemsFor("/lpg-bowser/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

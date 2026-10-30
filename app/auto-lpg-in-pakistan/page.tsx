import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { itemsFor } from "@/lib/media";
import { provinces, totals } from "@/lib/network";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/auto-lpg-in-pakistan/" });

const faqs = [
  {
    q: "What is auto LPG?",
    a: "Auto LPG is liquefied petroleum gas used as a vehicle fuel. It is stored in a tank made for vehicles, fitted by a competent workshop with a conversion kit, and filled at a dispensing station. It is a different system from the cylinders used in homes and kitchens.",
  },
  {
    q: "Can I put a home or commercial LPG cylinder in my car?",
    a: "No. Domestic and commercial cylinders are not designed or approved as vehicle fuel tanks. Carrying one in a vehicle or connecting one to an engine is dangerous. A vehicle needs a proper vehicle tank and conversion, fitted and checked by a competent workshop.",
  },
  {
    q: "Is auto LPG allowed in Pakistan?",
    a: "Vehicle LPG, dispensing stations and conversions sit under OGRA and related rules that have changed over time. We do not give legal clearance on this page. Before you convert, confirm the current position with OGRA and your provincial vehicle registration authority, and keep written proof from the workshop.",
  },
  {
    q: "Does THE LPG CO. convert vehicles?",
    a: `We do not sell packaged vehicle conversions here. Some partners in our nationwide network work with auto LPG. Send your city and vehicle on ${site.phoneDisplay} and we say honestly whether a listed partner may help, and what to verify yourself.`,
  },
  {
    q: "What does a conversion cost?",
    a: "Cost depends on the vehicle, kit type, tank and workshop. See the LPG kit price page for what affects the figure and how to get a written quote. We confirm any figure before you agree.",
  },
  {
    q: "Is auto LPG safe?",
    a: "A correctly installed, certified system maintained by a competent workshop can be used safely, but poor installation, damaged hoses and uncertified tanks are serious hazards. Always use approved parts, ask for a written installation record and have the system inspected regularly.",
  },
  {
    q: "Where do I fill a vehicle?",
    a: "Only at a station that is authorised to dispense LPG as a vehicle fuel. Do not fill vehicle tanks from home or commercial cylinders. See the filling stations page for how to check a station.",
  },
  {
    q: "How does auto LPG compare with CNG?",
    a: "Both need approved kits and tanks. CNG tanks are heavier and run at much higher pressure; LPG tanks are lighter but filling points can be fewer. See LPG vs CNG for the full comparison.",
  },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Guides", href: "/guides/" }, { name: "Auto LPG in Pakistan", href: "/auto-lpg-in-pakistan/" }]}
      h1="Auto LPG in Pakistan: conversion, safety and what to check first"
      intro={`Auto LPG means running a vehicle on LPG with an approved vehicle tank and conversion kit — never a home or commercial cylinder. ${company.name} (OGRA licence ${company.licenceNumber}) explains what to check before you convert, and can point you to partners in our nationwide network where auto LPG is offered.`}
      aside={
        <SiteLeadForm
          defaultRequest="other"
          heading="Ask about auto LPG"
          subheading="Tell us your city and vehicle. We say honestly whether a listed partner may help."
          buttonLabel="Send enquiry"
        />
      }
    >
      <Note title="Short answer" tone="info">
        <p>
          Never use a domestic or commercial LPG cylinder as a vehicle fuel tank. Auto LPG needs a vehicle-rated tank, a
          proper conversion kit, a competent workshop and an authorised filling station. Legal requirements depend on
          current regulation — verify them with OGRA and your vehicle registration authority first.
        </p>
      </Note>

      <H2>What an auto LPG system includes</H2>
      <SpecTable
        head={["Part", "What it does", "What to check"]}
        rows={[
          ["Vehicle LPG tank", "Stores fuel at pressure", "Certified for vehicle use, with valid markings and a safe mounting"],
          ["Multivalve and fill point", "Controls filling, level and safety cut-off", "Fitted to the tank and the fill point secured to the body"],
          ["Vaporiser or regulator", "Turns liquid into gas and sets pressure", "Matches the engine and is correctly connected to coolant where needed"],
          ["Injectors or mixer", "Delivers gas to the engine", "Suited to the engine type and tuned by the workshop"],
          ["Pipes, hoses and clamps", "Carry gas between components", "Rated for LPG, correctly routed and leak tested"],
          ["Switch and gauge", "Changes fuel and shows level", "Works as intended and wired safely"],
        ]}
        caption="Overview of a typical conversion. Follow the workshop and kit maker."
      />
      <P>
        Kit types and what changes the price are explained on{" "}
        <Link className="underline" href="/lpg-kit-price-in-pakistan/">
          LPG kit price in Pakistan
        </Link>
        . Compare fuels on <Link className="underline" href="/lpg-vs-cng/">LPG vs CNG</Link>.
      </P>

      <H2>Checks before you convert</H2>
      <UL
        items={[
          "Confirm with OGRA and your vehicle registration authority what is currently required for conversion and for the vehicle's papers.",
          "Ask the workshop for proof of competence and for the kit and tank certification in writing.",
          "Ask for a written installation record and a leak test after fitting.",
          "Confirm where you will fill, and that the station is authorised to dispense LPG as a vehicle fuel.",
          "Check your insurance position with your insurer before and after conversion.",
        ]}
      />

      <H2>What auto LPG is not</H2>
      <UL
        items={[
          "A home cylinder carried in a boot or connected to an engine",
          "A tank filled from a delivery cylinder",
          "A conversion fitted without a record, certification or a leak test",
        ]}
      />
      <P>
        Risks of misuse are covered in the <Link className="underline" href="/lpg-safety/">LPG safety guide</Link> and{" "}
        <Link className="underline" href="/lpg-cylinder-blast-causes-and-prevention/">
          cylinder blast causes and prevention
        </Link>
        . If you smell gas: <Link className="underline" href="/what-to-do-if-you-smell-gas/">what to do</Link>.
      </P>

      <H2>Cost angles (without inventing a kit price)</H2>
      <UL
        items={[
          "Kit type (sequential injection vs older mixer systems) and vehicle engine family",
          "Tank size, mounting and certification paperwork",
          "Workshop labour, tuning and post-fit leak test",
          "Insurance, inspection and any registration updates your province requires",
        ]}
      />
      <P>
        We do not publish an unverified national kit price band here. Ask for a written quote that lists kit, tank,
        labour and warranty — see{" "}
        <Link className="underline" href="/lpg-kit-price-in-pakistan/">
          LPG kit price in Pakistan
        </Link>
        .
      </P>

      <H2>Auto LPG, CNG and petrol compared</H2>
      <SpecTable
        head={["Point", "Auto LPG", "CNG", "Petrol"]}
        rows={[
          ["Stored as", "Liquid at moderate pressure", "Gas at very high pressure", "Liquid at normal pressure"],
          ["Tank", "Lighter tank, more range per fill than CNG", "Heavy cylinders, shorter range", "Factory tank"],
          ["Refuelling", "Licensed auto-LPG stations only", "CNG stations, fewer in some winters", "Everywhere"],
          ["Power", "Small loss compared with petrol", "Larger loss on most cars", "Full rated power"],
          ["Cold weather", "Needs a kit with a vaporiser warmed by engine coolant", "Unaffected by cold", "Unaffected"],
          ["Running cost", "Usually lower than petrol per km", "Lowest where stations have gas", "Highest per km"],
        ]}
        caption="General differences; actual costs depend on this month's fuel prices and your car."
      />
      <P>
        Whichever you choose, the gas must come from a licensed station into a tank made for vehicles. A home or shop
        cylinder in a car is never safe, because it is not built for crash loads or for fitting near the engine.
      </P>

      <H2>Auto LPG partners in our network</H2>
      <P>
        {totals.autoLpg} of our listed supply partners are flagged for auto LPG work across the country. This is a
        partner count, not an endorsement of any workshop or a promise of service in every city. By region today: Sindh{" "}
        {provinces["sindh"].autoLpg}, Khyber Pakhtunkhwa {provinces["khyber-pakhtunkhwa"].autoLpg}, Punjab{" "}
        {provinces["punjab"].autoLpg}, Islamabad {provinces["islamabad"].autoLpg}, Balochistan{" "}
        {provinces["balochistan"].autoLpg}, AJK {provinces["azad-kashmir"]?.autoLpg ?? 0}, GB{" "}
        {provinces["gilgit-baltistan"]?.autoLpg ?? 0}. Send your city and vehicle — we say honestly whether a listed
        partner may help. See <Link className="underline" href="/our-network/">our network</Link> and{" "}
        <Link className="underline" href="/lpg-filling-stations/">LPG filling stations</Link>.
      </P>

      <H2>Related pages</H2>
      <UL
        items={[
          <Link key="1" className="underline" href="/lpg-kit-price-in-pakistan/">
            LPG kit price in Pakistan
          </Link>,
          <Link key="2" className="underline" href="/lpg-vs-cng/">
            LPG vs CNG
          </Link>,
          <Link key="3" className="underline" href="/ogra-lpg-regulations-pakistan/">
            OGRA LPG regulations
          </Link>,
          <Link key="4" className="underline" href="/how-it-works/">
            How ordering works
          </Link>,
          <Link key="5" className="underline" href="/order-lpg/">
            Order LPG (cylinders for home and business)
          </Link>,
        ]}
      />

      <Note title="Talk to us now" tone="info">
        <p>
          Call {site.phoneDisplay} or message us on{" "}
          <a className="underline" href={`https://wa.me/${site.whatsapp}`}>
            WhatsApp
          </a>
          .
        </p>
      </Note>

      <ImageGallery items={itemsFor("/auto-lpg-in-pakistan/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

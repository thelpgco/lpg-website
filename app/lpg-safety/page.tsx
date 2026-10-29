import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SafetyReview from "@/components/SafetyReview";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { itemsFor } from "@/lib/media";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-safety/" });

const faqs = [
  { q: "Is LPG safe?", a: "LPG is safe when it is stored, connected and used properly. Accidents are usually linked to leaks, damaged equipment, poor storage, poor ventilation or exposure to heat." },
  { q: "Where should I store an LPG cylinder?", a: "Upright, in a well-ventilated place, away from heat, flames, direct sun and electrical equipment. Do not keep cylinders in a basement, bedroom or closed cupboard — LPG vapour collects low." },
  { q: "How do I check for an LPG leak?", a: "Brush soapy water on the connections. Bubbles mean a leak. Never use a flame. If you smell gas, leave and follow the smell-gas steps before doing anything else." },
  { q: "How often should I replace the hose?", a: "Inspect it regularly and replace it as soon as it shows cracks, hardening or wear. Do not wait for a fixed date if it looks damaged." },
  { q: "Can I keep spare cylinders at home?", a: "Keep spare cylinders to a minimum. Extra full cylinders raise fire risk. Store any spare upright, ventilated and away from heat — never stockpile during a price change or shortage rumour." },
  { q: "What should I check when a cylinder is delivered?", a: "Look for deep dents, heavy rust or damage; check the certification marking and seal; and test the connection with soapy water with the delivery person before they leave. Refuse a damaged cylinder." },
  { q: "How do I check an LPG cylinder myself?", a: "Look at the shoulder for the certification marking, empty (tare) weight and test date; check the valve seal; inspect the body for dents and heavy rust; and brush soapy water on joints after connection. Never use a flame. If anything looks wrong, refuse the cylinder." },
  { q: "How do I connect an LPG cylinder safely the first time?", a: "Fit an LPG regulator and hose made for LPG, keep the cylinder upright and ventilated, open the valve slowly, and leak-test every joint with soapy water. Do not force fittings. See the regulators guide if you are unsure which type you need." },
  { q: "Does THE LPG CO. inspect commercial kitchens?", a: `Yes — we offer LPG safety audits and maintenance contracts for restaurants, hotels and workshops. Call or WhatsApp ${site.phoneDisplay}, or see our safety audit and AMC services.` },
  { q: "Who reviews your safety guidance?", a: `${site.safetyReviewer.name}: ${site.safetyReviewer.experience}.` },
  { q: "How do I get a certified cylinder delivered nationwide?", a: `${terms.delivery} ${terms.partnersCertifiedRule} Order on the order page or call ${site.phoneDisplay}.` },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "LPG safety", href: "/lpg-safety/" }]}
      h1="LPG hazards and safety guide: cylinders, hoses, storage and leaks"
      intro={`The main LPG hazards are fire or explosion from a leak, and carbon monoxide or a lack of oxygen in a closed room. Correct storage, good equipment and ventilation control almost all of them. ${company.shortName} (OGRA licence ${company.licenceNumber}) supplies certified cylinders nationwide and expects every network partner to follow the same certified-cylinder rule.`}
      aside={<SiteLeadForm heading="Ask about safe supply" />}
    >
      <Note tone="danger" title="Smell gas right now?">
        <p>
          Leave the area first, then call <strong>1122</strong> from a safe distance. Steps:{" "}
          <Link className="underline" href="/what-to-do-if-you-smell-gas/">
            what to do if you smell gas
          </Link>
          .
        </p>
      </Note>

      <P>
        If you are new to LPG, <Link className="underline" href="/what-is-lpg/">what LPG is</Link> explains what it is
        made of and why it behaves the way it does.
      </P>

      <H2>Start here: which safety topic do you need?</H2>
      <SpecTable
        head={["Situation", "Go to"]}
        rows={[
          [
            "You smell gas now",
            <Link key="s" className="underline" href="/what-to-do-if-you-smell-gas/">
              What to do if you smell gas
            </Link>,
          ],
          [
            "Worried about cylinder accidents",
            <Link key="b" className="underline" href="/lpg-cylinder-blast-causes-and-prevention/">
              Cylinder blast causes and prevention
            </Link>,
          ],
          [
            "Weak flame, leak or frost on the regulator",
            <Link key="r" className="underline" href="/lpg-regulator-problems-and-repair/">
              Regulator problems and repair
            </Link>,
          ],
          [
            "Choosing or placing a detector",
            <Link key="d" className="underline" href="/lpg-leak-detector/">
              LPG leak detector
            </Link>,
          ],
          [
            "Picking a regulator",
            <Link key="reg" className="underline" href="/lpg-regulators/">
              LPG regulators
            </Link>,
          ],
        ]}
        caption="This page is the hub. The linked guides go deeper on each topic."
      />

      <H2>The main LPG hazards</H2>
      <UL
        items={[
          "LPG vapour is heavier than air. A leak sinks and collects near the floor, in drains and in low rooms.",
          "LPG burns in air at roughly 2% to 10% gas. Below that it is too lean and above that too rich, but a leaking room passes through the burning range.",
          "A little liquid makes a lot of gas, roughly 250 times its volume, so a small leak can fill a room.",
          "Burners and heaters with poor air supply make carbon monoxide, a poisonous gas with no smell.",
          "Liquid LPG on bare skin can cause cold burns.",
          "Heat raises the pressure in a cylinder. Never leave one in the sun, near a stove or near a heater.",
        ]}
      />

      <H2>Storing cylinders</H2>
      <UL
        items={[
          "Store cylinders upright, in a well-ventilated place.",
          "Keep them away from heat, flames, direct sun and electrical equipment.",
          "Do not keep them in a basement, bedroom or closed cupboard. LPG vapour collects low.",
          "Keep spare cylinders to a minimum.",
        ]}
      />

      <H2>Hoses and regulators</H2>
      <ContentImage
        src="/images/accessories/31-regulator-hose-closeup.png"
        alt="Close-up of an LPG regulator and hose clamped on a cylinder valve"
        caption="Check the regulator and hose for damage before use"
      />
      <UL
        items={[
          "Use a regulator and hose made for LPG, and fit them correctly.",
          "Look for cracks, hardening and wear on the hose, and replace it when it shows damage.",
          "Do not use a damaged or leaking regulator. Replace it — see regulator problems and repair.",
        ]}
      />

      <H2>Ventilation and appliances</H2>
      <P>
        Use gas stoves, heaters and geysers only where fresh air can enter and exhaust can leave. A yellow or orange,
        smoky flame on a burner that should burn blue is a sign of poor burning and possible carbon monoxide. Switch it
        off and have it checked. Never run a gas heater in a closed bedroom overnight.
      </P>

      <H2>Checking for leaks</H2>
      <P>
        Brush soapy water on the connections. Bubbles mean a leak. Never use a flame to look for a leak. If you find
        one, close the valve and have the part fixed or replaced before using gas again. A low-mounted{" "}
        <Link className="underline" href="/lpg-leak-detector/">LPG leak detector</Link> can warn of gas in the air but
        does not replace the soapy-water check.
      </P>

      <H2>How to check an LPG cylinder (delivery and first use)</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Read the shoulder stamp: certification marking, empty (tare) weight and test date. Refuse an expired or unmarked cylinder.</li>
        <li>Check the valve seal or safety cap is intact.</li>
        <li>Look at the body for deep dents, heavy rust, burns or welded patches — refuse if damaged.</li>
        <li>Confirm the size matches what you ordered (for example 11.8 kg domestic or 45.4 kg commercial).</li>
        <li>After the regulator and hose are fitted, brush soapy water on every joint with the valve open. Bubbles mean a leak. Never use a flame.</li>
        <li>Ask the delivery person to stay until the check is done. Keep the receipt.</li>
      </ol>
      <P>
        {terms.partnersCertifiedRule} Sizes and markings:{" "}
        <Link className="underline" href="/lpg-cylinders/">LPG cylinders</Link> and{" "}
        <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">cylinder sizes in Pakistan</Link>. Choosing a
        seller:{" "}
        <Link className="underline" href="/how-to-choose-a-licensed-lpg-supplier/">
          how to choose a licensed LPG supplier
        </Link>
        .
      </P>

      <H2>First connection: how to use an LPG cylinder safely</H2>
      <UL
        items={[
          "Place the cylinder upright outdoors or in a ventilated spot — never on its side, never in a basement or bedroom.",
          "Use only a regulator and hose made for LPG that match your cylinder valve and appliance. See LPG regulators.",
          "Open the valve slowly. Light the appliance with the maker's instructions — never leave a burner unattended.",
          "A healthy flame is mostly blue. Yellow, smoky flame means stop and have the appliance checked.",
          "When you finish, close the cylinder valve as well as the appliance control.",
        ]}
      />
      <P>
        Fitting detail: <Link className="underline" href="/lpg-regulators/">LPG regulators</Link>. If the flame is weak
        or you hear a hiss with a smell, see{" "}
        <Link className="underline" href="/lpg-regulator-problems-and-repair/">regulator problems and repair</Link>.
      </P>

      <H2>For businesses</H2>
      <P>
        Restaurants, hotels and workshops should have the installation inspected regularly. See our{" "}
        <Link className="underline" href="/services/lpg-safety-audit-and-inspection/">LPG safety audit</Link> and{" "}
        <Link className="underline" href="/services/lpg-maintenance-and-amc/">maintenance contracts</Link>.
      </P>

      <H2>Order certified cylinders nationwide</H2>
      <P>
        {company.aboutBlurb} {terms.delivery} See <Link className="underline" href="/how-it-works/">how ordering works</Link>,{" "}
        <Link className="underline" href="/lpg-home-delivery/">home delivery</Link>,{" "}
        <Link className="underline" href="/our-network/">our network</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/lpg-safety/")} title="Photos" />
      <Faq items={faqs} />
      <SafetyReview path="/lpg-safety/" name="LPG hazards and safety guide" />
      <JsonLd
        data={articleNode({
          path: "/lpg-safety/",
          headline: "LPG hazards and safety guide: cylinders, hoses, storage and leaks",
          description:
            "The main LPG hazards and how to manage them: storing cylinders, hoses and regulators, ventilation, leak checks and delivery checks — with links to deeper safety guides.",
        })}
      />
    </PageShell>
  );
}

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
import { itemsFor, media } from "@/lib/media";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-regulator-problems-and-repair/" });

const faqs = [
  { q: "Can an LPG regulator be repaired?", a: "Not safely at home. The diaphragm, spring and seals set the outlet pressure and cannot be checked without test equipment. Replace a faulty regulator with a new one that matches your appliance." },
  { q: "Why is my LPG regulator leaking?", a: "Common causes are a worn washer or seal at the valve connection, a loose connection, a damaged hose joint, or an old regulator with a failed diaphragm. Close the valve, ventilate, and do not use the gas until it is fixed." },
  { q: "Why is the flame weak or yellow?", a: "Causes include a nearly empty cylinder, a blocked or wrong-size regulator, a kinked hose, a cold cylinder, or dirty burners. A yellow smoky flame on a burner that should be blue can also mean poor burning and carbon monoxide, so switch off and have it checked." },
  { q: "Why does my regulator hiss?", a: "A faint hiss while gas is flowing can be normal. A loud hiss when no appliance is on, or hissing with a gas smell, means a leak. Close the valve and follow the leak steps." },
  { q: "Why is my regulator covered in frost?", a: "Heavy draw cools the cylinder and regulator. Frost means the load is too high for the cylinder size or the weather. Use a larger or second cylinder, and let it warm naturally." },
  { q: "How do I test a regulator for leaks?", a: "Brush soapy water on the connections and hose joints with the valve open. Bubbles mean a leak. Never use a flame or a lighter." },
  { q: "Who should replace my regulator?", a: `A qualified installer, or follow the maker's steps if you are experienced. ${company.shortName} can supply and fit a regulator. Call or WhatsApp ${site.phoneDisplay}.` },
  { q: "How do I choose the right replacement?", a: "Match the cylinder valve type, the appliance outlet pressure and the flow rate. See our LPG regulators guide before you buy." },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "LPG safety", href: "/lpg-safety/" },
        { name: "LPG regulators", href: "/lpg-regulators/" },
        { name: "Problems and repair", href: "/lpg-regulator-problems-and-repair/" },
      ]}
      h1="LPG regulator problems and repair: symptoms, causes and what to do"
      intro={`Most LPG regulator problems are leaks, weak or unstable flame, hissing and frost. A regulator is not a repairable part for home use: if it leaks or misbehaves, close the valve and replace it with a matching new one. ${company.shortName} can supply and fit regulators with nationwide cylinder delivery.`}
      aside={<SiteLeadForm heading="Need a regulator replaced?" />}
    >
      <Note tone="danger" title="Smell gas right now?">
        <p>
          Close the cylinder valve if it is safe, open windows and doors, and keep flames and switches away. If the
          smell is strong, leave and call <strong>1122</strong> from outside. Go to{" "}
          <Link className="underline" href="/what-to-do-if-you-smell-gas/">
            what to do if you smell gas
          </Link>
          .
        </p>
      </Note>

      <ContentImage src={media.regHoseClose.src} alt={media.regHoseClose.alt} caption="Check the regulator, clamp and hose" priority />

      <H2>Symptoms, causes and what to do</H2>
      <SpecTable
        head={["Symptom", "Likely cause", "What to do"]}
        rows={[
          ["Soap bubbles at the valve joint", "Worn washer or loose connection", "Close the valve. Replace the washer or the regulator. Retest with soapy water"],
          ["Smell of gas near the cylinder", "Leak at the valve, regulator or hose", "Close the valve, ventilate, and follow the smell-gas steps"],
          ["Loud hiss when no appliance is on", "Leak or failed diaphragm", "Close the valve and replace the regulator"],
          ["Weak flame", "Cylinder nearly empty, cold cylinder, kinked hose, undersized regulator", "Check the level, straighten the hose, warm slowly, or fit the right regulator"],
          ["Yellow or orange smoky flame", "Poor air mix or blocked burner", "Switch off and have the appliance cleaned or serviced"],
          ["Flame too high or surging", "Faulty regulator letting through too much pressure", "Close the valve and replace the regulator"],
          ["Frost on the regulator", "High draw on a small or cold cylinder", "Reduce load, use a larger cylinder or two cylinders"],
          ["Stiff or damaged knob", "Corrosion or wear", "Replace the regulator"],
          ["Cracked, hard or swollen hose", "Age, heat or wrong hose type", "Replace the hose with one made for LPG"],
        ]}
        caption="General guide. When in doubt, close the valve and call a qualified person."
      />

      <H2>Why a regulator is replaced, not repaired</H2>
      <UL
        items={[
          "The outlet pressure depends on a diaphragm and spring that cannot be tested at home.",
          "A repair that looks fine can still let high pressure through to the appliance.",
          "A new regulator is a small cost compared with the risk of a leak or a pressure failure.",
          "Only the maker or a qualified workshop with test equipment can service a regulator.",
        ]}
      />

      <H2>Step by step: a safe leak check</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Switch off all appliances and put out any flames.</li>
        <li>Mix a little dish soap with water.</li>
        <li>Open the cylinder valve slowly.</li>
        <li>Brush the soapy water on the valve joint, the regulator and each end of the hose.</li>
        <li>Look for bubbles. If you see any, close the valve right away.</li>
        <li>Do not use the gas until the part is replaced and the joint tests clean.</li>
      </ol>

      <H2>Step by step: replacing a regulator</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Appliances off. Cylinder valve closed. Work in a ventilated place with no flames.</li>
        <li>Remove the old regulator. Some connections use a left-hand thread, so check the way it turns before forcing it.</li>
        <li>Check the valve outlet and the seal. Fit a new seal if the regulator type needs one.</li>
        <li>Fit the new regulator that matches the cylinder valve, the appliance pressure and the flow rate.</li>
        <li>Fit the hose and clamps. Replace the hose if it is old or damaged.</li>
        <li>Open the valve slowly and test every joint with soapy water.</li>
      </ol>

      <H2>When to stop and call a professional</H2>
      <UL
        items={[
          "You cannot stop the leak by closing the valve.",
          "The cylinder valve itself leaks.",
          "The cylinder is damaged, dented or rusted.",
          "The regulator or hose was exposed to fire.",
          "You are not sure the replacement matches the appliance.",
        ]}
      />
      <P>
        Learn how to pick one on <Link className="underline" href="/lpg-regulators/">LPG regulators</Link>, read the{" "}
        <Link className="underline" href="/lpg-safety/">LPG safety guide</Link>, or ask us about{" "}
        <Link className="underline" href="/services/lpg-safety-audit-and-inspection/">an LPG safety inspection</Link>.
      </P>

      <H2>Order a cylinder and fittings</H2>
      <P>
        See <Link className="underline" href="/how-it-works/">how ordering works</Link>,{" "}
        <Link className="underline" href="/our-network/">our network</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/lpg-regulator-problems-and-repair/")} title="Photos" />
      <Faq items={faqs} />
      <SafetyReview path="/lpg-regulator-problems-and-repair/" name="LPG regulator problems and repair" />
      <JsonLd
        data={articleNode({
          path: "/lpg-regulator-problems-and-repair/",
          headline: "LPG regulator problems and repair: symptoms, causes and what to do",
          description:
            "LPG regulator leaks, weak flame, hissing and frost: causes, a symptom table, safe leak-check steps and why to replace rather than repair.",
        })}
      />
    </PageShell>
  );
}

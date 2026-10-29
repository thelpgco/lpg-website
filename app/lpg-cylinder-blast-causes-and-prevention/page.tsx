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
import { itemsFor, media } from "@/lib/media";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-cylinder-blast-causes-and-prevention/" });

const faqs = [
  { q: "Why do LPG cylinders blast?", a: "Most incidents are not a sound cylinder bursting by itself. They are usually a gas leak that fills a room and finds a spark or flame, or a cylinder weakened by damage or corrosion, or one heated by a nearby fire." },
  { q: "Can an LPG cylinder explode on its own?", a: "A cylinder in good condition, within its test date, stored upright in a ventilated place away from heat, is very unlikely to fail on its own. Problems follow leaks, damage, overheating or misuse." },
  { q: "Can the sun make a cylinder explode?", a: "A cylinder is designed for normal outdoor temperatures, but heat raises pressure. Do not leave one in direct sun in a closed vehicle or next to a heat source. Keep it in a shaded, ventilated place." },
  { q: "What is the most common cause of LPG accidents at home?", a: "A leak from a worn hose, loose connection or faulty regulator, combined with poor ventilation and a spark or flame. This is why leak checks and ventilation matter most." },
  { q: "Is it dangerous to refill a cylinder from another cylinder?", a: "Yes. Decanting gas by hand risks overfilling, static sparks and leaks. Never do it and never accept it. Cylinders should be filled by weight at a proper plant." },
  { q: "What should I do if a cylinder is on fire?", a: "Do not try to fight a fire that is reaching a cylinder. Leave, get everyone away, call 1122 and tell them there is an LPG cylinder involved. If the fire is only at a small joint and you can safely close the valve, do so, otherwise leave." },
  { q: "How often should cylinders be tested?", a: "Cylinders are inspected and retested at set intervals under the safety rules that apply to pressure vessels. Check the test date marking on the shoulder and refuse an expired or damaged cylinder. Ask your supplier to confirm the marking on delivery." },
  { q: "Does THE LPG CO. supply only certified cylinders?", a: `${terms.partnersCertifiedRule} ${company.shortName} holds OGRA licence ${company.licenceNumber}.` },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "LPG safety", href: "/lpg-safety/" },
        { name: "Cylinder blast causes and prevention", href: "/lpg-cylinder-blast-causes-and-prevention/" },
      ]}
      h1="Why LPG cylinders blast: causes and how to prevent them"
      intro={`LPG cylinder accidents mostly come from a gas leak that fills a room and meets a spark, from a damaged or out-of-date cylinder, or from a cylinder heated by fire. Good storage, sound hoses and regulators, ventilation and certified cylinders prevent almost all of them. ${company.shortName} supplies certified cylinders through a nationwide network.`}
      aside={<SiteLeadForm heading="Order a certified cylinder" />}
    >
      <Note tone="danger" title="Smell gas right now?">
        <p>
          Leave first, then call <strong>1122</strong> from a safe distance. Steps:{" "}
          <Link className="underline" href="/what-to-do-if-you-smell-gas/">
            what to do if you smell gas
          </Link>
          .
        </p>
      </Note>

      <ContentImage
        src={media.cylStamp.src}
        alt={media.cylStamp.alt}
        caption="Check the marking and test date on every cylinder"
        priority
      />

      <H2>The main causes</H2>
      <SpecTable
        head={["Cause", "What happens", "How to prevent it"]}
        rows={[
          ["Leaking hose, regulator or joint", "Gas escapes, sinks and collects at floor level", "Soapy-water check, replace worn hoses and regulators"],
          ["Poor ventilation", "Leaked gas reaches the burning range in a closed space", "Keep air flowing, no closed cupboards or basements"],
          ["Ignition source", "A spark, flame or switch ignites the gas-air mix", "Close the valve and ventilate before touching switches or lighting anything"],
          ["Heat or fire near the cylinder", "Pressure rises; a cylinder exposed to fire can rupture", "Keep away from stoves, heaters, sun and fires"],
          ["Damaged or corroded cylinder", "Weak wall or leaking valve", "Refuse dented, rusty or leaking cylinders"],
          ["Expired test date", "Unknown condition of the wall", "Check the marking, use only certified cylinders"],
          ["Overfilling or decanting", "No room for expansion, leaks, static sparks", "Fill only at proper plants, by weight"],
          ["Wrong or homemade fittings", "Leaks and wrong pressure", "Use LPG-rated parts that match the appliance"],
          ["Cylinder on its side or upside down", "Liquid reaches the regulator and burner", "Keep cylinders upright"],
        ]}
        caption="General causes of LPG incidents. Not a report on any one event."
      />

      <H2>Myths and facts</H2>
      <SpecTable
        head={["Myth", "Fact"]}
        rows={[
          ["A cylinder in the kitchen will explode by itself", "A sound, upright, cool cylinder is very unlikely to fail. Leaks and heat are the real risks"],
          ["If I can't smell gas, there is none", "The smell can fade and some people cannot detect it. Check joints with soapy water"],
          ["Gas rises, so open the top of a window", "LPG sinks. Ventilate at floor level and keep low areas clear"],
          ["A lighter is a quick way to find a leak", "Never. Use soapy water"],
          ["A cylinder near a fire can be handled like any other", "A cylinder heated by fire can rupture. Move people away and leave it to emergency services"],
        ]}
      />

      <H2>The prevention checklist</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Store cylinders upright in a ventilated place, away from heat, sun and electrical equipment.</li>
        <li>Never keep cylinders in a basement, bedroom or closed cupboard.</li>
        <li>Check the shoulder marking and test date, the seal, and the body for dents and rust at delivery.</li>
        <li>
          Use a hose and regulator made for LPG. See{" "}
          <Link className="underline" href="/lpg-regulators/">
            LPG regulators
          </Link>
          .
        </li>
        <li>Check joints with soapy water every time a cylinder is changed.</li>
        <li>Replace a cracked, hard or worn hose without waiting.</li>
        <li>Close the cylinder valve when the appliance is not in use, especially at night.</li>
        <li>Never refill a cylinder from another cylinder.</li>
        <li>Keep spare cylinders to a minimum.</li>
        <li>
          Consider a low-mounted{" "}
          <Link className="underline" href="/lpg-leak-detector/">
            LPG leak detector
          </Link>
          .
        </li>
      </ol>

      <H2>What to do if there is a fire</H2>
      <UL
        items={[
          "Get everyone out and away. Do not go back for belongings.",
          "Call 1122 (or your local emergency number) and say there is an LPG cylinder involved.",
          "Do not try to move a cylinder that is heated or damaged.",
          "Do not fight a fire that is reaching the cylinder. If you can safely close the valve on a small leak, do so, otherwise leave.",
        ]}
      />

      <H2>For businesses</H2>
      <P>
        Restaurants, hotels and workshops should have the installation inspected and cylinders tested regularly. See{" "}
        <Link className="underline" href="/services/lpg-cylinder-testing-and-inspection/">
          cylinder testing and inspection
        </Link>{" "}
        and <Link className="underline" href="/services/lpg-safety-audit-and-inspection/">LPG safety audit</Link>.
      </P>

      <H2>Related safety guides</H2>
      <P>
        Read the main <Link className="underline" href="/lpg-safety/">LPG safety guide</Link>,{" "}
        <Link className="underline" href="/lpg-regulator-problems-and-repair/">regulator problems and repair</Link>, and{" "}
        <Link className="underline" href="/how-to-choose-a-licensed-lpg-supplier/">how to choose a licensed supplier</Link>.
      </P>

      <H2>Order certified cylinders</H2>
      <P>
        {terms.partnersCertifiedRule} See <Link className="underline" href="/how-it-works/">how ordering works</Link>,{" "}
        <Link className="underline" href="/our-network/">our network</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/lpg-cylinder-blast-causes-and-prevention/")} title="Photos" />
      <Faq items={faqs} />
      <SafetyReview path="/lpg-cylinder-blast-causes-and-prevention/" name="LPG cylinder blast causes and prevention" />
      <JsonLd
        data={articleNode({
          path: "/lpg-cylinder-blast-causes-and-prevention/",
          headline: "Why LPG cylinders blast: causes and how to prevent them",
          description:
            "Why LPG cylinder accidents happen: leaks, poor ventilation, heat, damage and misuse, with a cause table, myths and facts and a prevention checklist.",
        })}
      />
    </PageShell>
  );
}

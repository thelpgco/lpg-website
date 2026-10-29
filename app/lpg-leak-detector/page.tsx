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

export const metadata = meta({ path: "/lpg-leak-detector/" });

const faqs = [
  { q: "Where should an LPG leak detector be installed?", a: "Low. LPG is heavier than air and collects near the floor, so mount the detector roughly 30 cm (about one foot) above the floor, within a few metres of the cylinder and appliances, away from open doors, windows, vents and fans." },
  { q: "Is an LPG detector the same as a carbon monoxide alarm?", a: "No. An LPG detector senses unburnt gas. A carbon monoxide alarm senses the poisonous gas made by poor burning. They protect against different risks. A home with gas appliances can use both." },
  { q: "Do natural gas detectors work for LPG?", a: "Not reliably. Natural gas is lighter than air and its detectors are mounted high. LPG detectors are mounted low and are tuned for propane and butane. Buy one that states LPG." },
  { q: "How long does an LPG detector last?", a: "Gas sensors age. Many detectors have a stated life of a few years. Follow the maker's replacement date, test it regularly and replace it when it fails the test or reaches its end of life." },
  { q: "Can a detector replace soapy-water checks?", a: "No. A detector warns you of gas in the air. Soapy water finds the exact leaking joint. Use both, and check joints whenever you change a cylinder, hose or regulator." },
  { q: "What should I do if my LPG detector alarms?", a: "Close the cylinder valve if it is safe, open doors and windows, switch off flames, do not use switches or phones in the room, and leave. Then follow what to do if you smell gas." },
  { q: "Does THE LPG CO. sell or fit detectors?", a: `We can advise on detector placement during a site visit or safety inspection. Ask us about your property on ${site.phoneDisplay}, and we will confirm what we can supply before you agree. Detector prices vary by brand and type — we quote before you buy.` },
  { q: "Should restaurants use automatic shut-off?", a: "For commercial kitchens and manifold rooms, an alarm with a relay or automatic shut-off valve is worth considering. It must be fitted by a qualified person and tested on a schedule." },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "LPG safety", href: "/lpg-safety/" },
        { name: "LPG leak detector", href: "/lpg-leak-detector/" },
      ]}
      h1="LPG leak detector: types, placement and how to choose one"
      intro={`An LPG leak detector warns you of unburnt gas in the air. Because LPG is heavier than air, it must be mounted low — about 30 cm above the floor — near the cylinder and appliances. It adds to, not replaces, a soapy-water check and good ventilation. ${company.shortName} can advise on placement during a safety visit.`}
      aside={<SiteLeadForm heading="Ask about a safety visit" />}
    >
      <Note tone="danger" title="Smell gas or hear an alarm now?">
        <p>
          Close the cylinder valve if safe, ventilate, avoid flames and switches, and leave. Call{" "}
          <strong>1122</strong> from outside. See{" "}
          <Link className="underline" href="/what-to-do-if-you-smell-gas/">
            what to do if you smell gas
          </Link>
          .
        </p>
      </Note>

      <ContentImage src={media.kitchenFlame.src} alt={media.kitchenFlame.alt} caption="LPG stove in use" priority />

      <H2>Types of LPG leak detection</H2>
      <SpecTable
        head={["Method", "How it works", "Good for", "Limits"]}
        rows={[
          ["Soapy water", "Bubbles show a leaking joint", "Finding the exact leak after a change", "Only when you check. Does not watch continuously"],
          ["Plug-in or battery LPG alarm", "A sensor sounds an alarm at a gas level", "Homes and small kitchens", "Needs power or battery, regular testing and replacement"],
          ["Hard-wired alarm with relay", "Alarm plus a signal to other equipment", "Restaurants, hotels, plant rooms", "Needs proper installation"],
          ["Alarm with automatic shut-off valve", "Alarm closes a valve on the gas line", "Commercial kitchens, manifold rooms", "Must be fitted by a qualified person and tested"],
          ["Portable sniffer", "Handheld device finds gas at a point", "Engineers during inspection", "Needs training and calibration"],
        ]}
        caption="General overview. Follow the maker's instructions for any device."
      />

      <H2>Where to put an LPG detector</H2>
      <UL
        items={[
          "Low, about 30 cm above the floor, because LPG sinks.",
          "Within a few metres of the cylinder and the gas appliances, in the same room.",
          "Away from open doors, windows, vents, fans and cooker hoods that move the air.",
          "Not behind furniture or curtains, and not where steam, water or cooking fumes will reach it.",
          "Never in a spot where a leak would have to pass a flame or switch to reach it.",
        ]}
      />
      <Note tone="warn" title="LPG is mounted low, natural gas high">
        <p>
          A detector made for natural gas goes high on the wall, because that gas rises. Do not use one for LPG. Buy a
          detector that says LPG and mount it low.
        </p>
      </Note>

      <H2>Buying checklist</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>It states that it detects LPG (propane and butane).</li>
        <li>It has a clear alarm, a test button and a status light.</li>
        <li>The power fits your home: mains, plug-in or battery, with a backup if possible.</li>
        <li>The maker states a sensor life and a replacement date.</li>
        <li>It has the markings and documents that show the standard it was made to.</li>
        <li>For a commercial kitchen, an alarm with a relay or shut-off valve is worth considering.</li>
      </ol>
      <P>
        Brands and retail prices change often. Ask us for a written quote for your property before you buy, or choose a
        unit yourself using the checklist above.
      </P>

      <H2>Care and testing</H2>
      <UL
        items={[
          "Test it on the schedule in the manual, often monthly, using the test button.",
          "Keep the sensor clean and free of dust, cooking grease and spray.",
          "Replace it at the end of its stated life, or if it fails a test.",
          "Do not paint over it, cover it or remove the battery to stop false alarms.",
        ]}
      />

      <H2>What a detector does not do</H2>
      <UL
        items={[
          "It does not detect carbon monoxide. Use a carbon monoxide alarm for that.",
          "It does not fix a leak. You still have to close the valve and have the part repaired.",
          "It does not replace correct storage, ventilation and hose and regulator checks.",
        ]}
      />
      <P>
        Start with the <Link className="underline" href="/lpg-safety/">LPG safety guide</Link> and check your{" "}
        <Link className="underline" href="/lpg-regulators/">regulator</Link> and hose. For a business, ask about an{" "}
        <Link className="underline" href="/services/lpg-safety-audit-and-inspection/">LPG safety audit and inspection</Link>.
      </P>

      <H2>Order LPG and ask about a visit</H2>
      <P>
        See <Link className="underline" href="/how-it-works/">how ordering works</Link>,{" "}
        <Link className="underline" href="/our-network/">our network</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/lpg-leak-detector/")} title="Photos" />
      <Faq items={faqs} />
      <SafetyReview path="/lpg-leak-detector/" name="LPG leak detector" />
      <JsonLd
        data={articleNode({
          path: "/lpg-leak-detector/",
          headline: "LPG leak detector: types, placement and how to choose one",
          description:
            "LPG leak detector types, where to mount one (low, about 30 cm above the floor), a buying checklist and what a detector cannot do.",
        })}
      />
    </PageShell>
  );
}

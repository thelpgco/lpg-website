import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SafetyReview from "@/components/SafetyReview";
import SpecTable from "@/components/SpecTable";
import { itemsFor, media } from "@/lib/media";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-regulators/" });

const faqs = [
  { q: "What does an LPG regulator do?", a: "It lowers the high and changing pressure inside the cylinder to a steady low pressure that your stove, geyser or burner can use safely." },
  { q: "What is the difference between a low-pressure and a high-pressure regulator?", a: "A low-pressure regulator has a fixed outlet pressure and is used for household stoves and geysers. A high-pressure regulator gives a higher, often adjustable outlet pressure for commercial burners, tandoors and industrial equipment." },
  { q: "How do I know which regulator I need?", a: "Match three things: the cylinder valve connection, the outlet pressure your appliance is built for, and the flow rate it needs. The appliance label or manual states the pressure. If it does not, ask a qualified installer." },
  { q: "How often should an LPG regulator be replaced?", a: "Follow the maker's date marking and guidance. Many makers recommend replacing a regulator every 5 to 10 years, and sooner if it is damaged, leaking or the flame is unstable." },
  { q: "Can I repair a regulator?", a: "No. The diaphragm and spring cannot be safely repaired at home. Replace the regulator with a new one that matches the appliance." },
  { q: "Where can I see an LPG regulator price?", a: "We do not publish a standing regulator price list because prices depend on type, flow rating and make. Send us the details and we will confirm a quote before you agree." },
  { q: "Does a regulator come with the cylinder?", a: "Not always. The regulator and hose are often a separate item. Ask what is included when you order a new connection." },
  { q: "Do you deliver regulators nationwide?", a: `Yes, through our network where stock allows. Tell us your city and appliance; we confirm availability and price before you agree. Call or WhatsApp ${site.phoneDisplay}.` },
  { q: "What if the flame is yellow or unstable after fitting?", a: "Close the cylinder valve, check the hose and clamps, and do not keep using a regulator that hisses or will not hold a steady flame. See regulator problems and repair, or ask us for a replacement matched to your load." },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "LPG safety", href: "/lpg-safety/" },
        { name: "LPG regulators", href: "/lpg-regulators/" },
      ]}
      h1="LPG regulators: types, how to choose and how to fit one safely"
      intro={`${site.shortName} supplies domestic and commercial LPG regulators nationwide. An LPG regulator reduces the pressure from the cylinder to the steady low pressure your appliance needs. Household stoves use a low-pressure regulator; commercial burners usually need a high-pressure or two-stage unit.`}
      aside={<SiteLeadForm heading="Ask for a regulator and hose" />}
    >
      <Note title="Short answer" tone="info">
        <p>
          Match the connection, the outlet pressure and the flow rate. Use an LPG hose with it. Replace a regulator that
          is old, damaged or leaking. Do not try to repair one. We quote type and price for your city before you agree.
        </p>
      </Note>

      <ContentImage src={media.regHoseStudio.src} alt={media.regHoseStudio.alt} caption="Regulator and hose on a cylinder" priority />

      <H2>Types of LPG regulator</H2>
      <SpecTable
        head={["Type", "Typical use", "Outlet pressure", "Notes"]}
        rows={[
          ["Low-pressure (fixed)", "Home stoves, geysers, small heaters", "Fixed low pressure, rated on the label", "Most common in homes. No adjustment"],
          ["High-pressure (adjustable)", "Commercial burners, tandoors, boilers", "Higher and adjustable, rated on the label", "Often fitted at commercial kitchens and workshops"],
          ["Two-stage", "Manifolds, cylinder banks, larger loads", "Pressure reduced in two steps for stable output", "Better for steady flow on larger systems"],
          ["Automatic changeover", "Two cylinders on one line", "Switches to the reserve cylinder when the first is empty", "Avoids running out during use"],
        ]}
        caption="Check the rating plate on the regulator and the appliance. Pressures differ by design."
      />

      <H2>How to choose: a five-point checklist</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li><strong>Connection.</strong> It must fit your cylinder valve. Clamp-on and screw-on types are not interchangeable.</li>
        <li><strong>Outlet pressure.</strong> It must match what the stove, geyser or burner is built for.</li>
        <li><strong>Flow rate.</strong> Pick a regulator rated for at least the total consumption of the appliances on it. Geysers and commercial burners draw much more than a two-burner stove.</li>
        <li><strong>Markings.</strong> Look for the maker&apos;s name, the pressure rating, the flow rating and a date mark.</li>
        <li><strong>Hose and clamps.</strong> Use a hose made for LPG, with proper clamps, not a general rubber tube.</li>
      </ol>

      <H2>How much flow do I need?</H2>
      <SpecTable
        head={["Appliance", "What it needs from the regulator"]}
        rows={[
          ["Two-burner household stove", "Low flow, a standard domestic low-pressure regulator"],
          ["Instant LPG geyser", "Higher flow. Check the geyser label and regulator rating"],
          ["Room heater", "Moderate flow. Never in a closed bedroom overnight"],
          ["Commercial kitchen burner or tandoor", "High flow, usually a high-pressure regulator"],
          ["Several appliances on one cylinder bank", "Two-stage regulator sized for the total flow"],
        ]}
        caption="Use the appliance label and a qualified installer to set the exact rating."
      />

      <H2>Fitting a regulator safely</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Switch off all appliances and close the cylinder valve.</li>
        <li>Work outdoors or in a ventilated space, with no flames, sparks or phones in use nearby.</li>
        <li>Check the seal or washer, and the hose, before fitting.</li>
        <li>Fit the regulator to the valve by hand first. Some fittings use a left-hand thread, so follow the maker&apos;s instructions and do not force it.</li>
        <li>Tighten only as far as the maker says. Fit the hose and clamps.</li>
        <li>Open the valve slowly and brush soapy water on every joint. Bubbles mean a leak. Never use a flame.</li>
      </ol>
      <ContentImage src={media.regHoseClose.src} alt={media.regHoseClose.alt} caption="Check clamps and hose condition" />

      <H2>When to replace a regulator</H2>
      <UL
        items={[
          "It is past the maker's recommended age, or the date mark is unreadable.",
          "The hose or body shows cracks, rust or damage.",
          "The flame is unstable, or you smell gas near the valve.",
          "It was exposed to a fire or heavy heat.",
        ]}
      />
      <P>
        For faults, read <Link className="underline" href="/lpg-regulator-problems-and-repair/">LPG regulator problems and repair</Link>.
        For general rules, see the <Link className="underline" href="/lpg-safety/">LPG safety guide</Link>. To add a
        detector, see <Link className="underline" href="/lpg-leak-detector/">LPG leak detector</Link>.
      </P>

      <H2>How to order a regulator from us</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Tell us your cylinder size, appliance (stove, geyser, heater or commercial burner) and city.</li>
        <li>We confirm the right regulator and hose, stock and price before you agree.</li>
        <li>On delivery, fit carefully and leak-test every joint with soapy water — never a flame.</li>
      </ol>
      <P>
        Call or WhatsApp {site.phoneDisplay}, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. For a new set-up, see{" "}
        <Link className="underline" href="/new-lpg-connection/">a new LPG connection</Link>. Accessories overview:{" "}
        <Link className="underline" href="/shop/lpg-hoses-and-accessories/">hoses and accessories</Link>.
      </P>

      <ImageGallery items={itemsFor("/lpg-regulators/")} title="Photos" />
      <Faq items={faqs} />
      <SafetyReview path="/lpg-regulators/" name="LPG regulators" />
      <JsonLd
        data={articleNode({
          path: "/lpg-regulators/",
          headline: "LPG regulators: types, how to choose and how to fit one safely",
          description: "LPG regulator types (low pressure, high pressure, two-stage), a five-point buying checklist, flow rating and safe fitting steps.",
        })}
      />
    </PageShell>
  );
}

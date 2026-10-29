import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { itemsFor, media } from "@/lib/media";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/propane-vs-butane/" });

const faqs = [
  { q: "What is the difference between propane and butane?", a: "Both are the gases in LPG. Propane has three carbon atoms and butane has four. Propane turns to gas at a much lower temperature (about minus 42 °C) than butane (about minus 0.5 °C), so propane works better in the cold. Butane gives slightly more heat per litre of liquid." },
  { q: "Is LPG propane or butane?", a: "LPG is a mixture of both, and sometimes small amounts of other gases. The share of each depends on the supplier, the season and the market. Domestic cylinders in Pakistan are sold as LPG, not as a pure grade you can pick at the counter." },
  { q: "Which is better for cold weather?", a: "Propane. At low temperatures butane can stop boiling to gas, so pressure and flow drop. A mix with more propane keeps working in the cold." },
  { q: "Which gives more heat, propane or butane?", a: "Per kilogram they are almost equal, about 46 MJ. Per litre of liquid, butane carries a little more because it is denser. In practice the difference is small for household use." },
  { q: "Can I use butane appliances on propane?", a: "Not without checking. The two run at different pressures, so regulators and jets are chosen for a gas. Use the regulator and jets listed for your appliance and your supply, and ask a qualified installer if in doubt." },
  { q: "Does the cylinder show if it is propane or butane?", a: "Domestic cylinders are filled with LPG and are not normally labelled by propane or butane share. The marking shows the product as LPG, the empty weight and the test and pressure details." },
  { q: "What should I do if the flame weakens in winter?", a: "Keep the cylinder upright, out of snow and ice, in a sheltered but ventilated place. Never warm it with a flame or heater. For heavy heating loads, use a larger size or two cylinders with a changeover." },
  { q: "Can THE LPG CO. supply a propane-only mix?", a: `For standard domestic and commercial cylinders we supply LPG as filled by the licensed plant — the seasonal mix, not a customer-chosen ratio. For industrial heating in cold areas, ask us about cylinder banks, vaporizers or bulk arrangements on ${site.phoneDisplay}.` },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "What is LPG?", href: "/what-is-lpg/" },
        { name: "Propane vs butane", href: "/propane-vs-butane/" },
      ]}
      h1="Propane vs butane: differences, uses and which is better"
      intro={`Propane and butane are the two gases that make up LPG. Propane stays a gas in the cold and runs at higher pressure. Butane is denser but struggles near freezing. In Pakistan, ${company.shortName} and other licensed suppliers fill domestic cylinders with a propane–butane mix — you normally cannot choose the ratio.`}
      aside={<SiteLeadForm heading="Order LPG for your area" />}
    >
      <Note title="Short answer" tone="info">
        <p>
          Propane works in the cold; butane struggles near freezing. The LPG cylinder you buy in Pakistan holds a
          propane and butane mix, and you normally cannot choose the ratio. What you can control is how you use the
          cylinder in winter: keep it upright, out of snow and ice, and size the cylinder to the load.
        </p>
      </Note>

      <ContentImage
        src={media.cylCloseupLogo.src}
        alt={media.cylCloseupLogo.alt}
        caption="LPG cylinder: the gas inside is a propane and butane mix."
        priority
      />

      <H2>Propane vs butane at a glance</H2>
      <SpecTable
        head={["Property", "Propane", "Butane"]}
        rows={[
          ["Carbon atoms", "3 (C3H8)", "4 (C4H10)"],
          ["Boils to gas at", "About minus 42 degrees Celsius", "About minus 0.5 degrees Celsius"],
          ["Vapour pressure at 20 degrees Celsius", "About 8 bar", "About 2 bar"],
          ["Liquid density (approx.)", "About 0.50 kg per litre", "About 0.58 kg per litre"],
          ["Heat per kg (net, approx.)", "About 46 MJ", "About 46 MJ"],
          ["Heat per litre of liquid", "Lower", "Higher"],
          ["Vapour vs air", "About 1.5 times heavier", "About 2 times heavier"],
          ["Cold-weather performance", "Good", "Poor below about freezing"],
          ["Typical use", "Cold climates, outdoor heating, industrial burners", "Warm climates, portable stoves, lighters"],
        ]}
        caption="Typical values from standard fuel data. They vary slightly by source and temperature."
      />

      <H2>Cold weather and why it matters in Pakistan</H2>
      <P>
        A cylinder works because the liquid inside boils into gas as you draw fuel. Boiling needs heat. Propane keeps
        boiling at very low temperatures, but butane slows down near freezing and the flame can weaken. In Pakistan this
        mainly matters in northern and high-altitude areas in winter — Murree, Gilgit-Baltistan, parts of Khyber
        Pakhtunkhwa and Balochistan. In the plains the mix is rarely a problem for cooking. For heating loads in the
        cold, plan cylinder size and shelter carefully.
      </P>

      <H2>Why pressure and regulators differ</H2>
      <P>
        Propane vapour pressure is much higher than butane. That is why equipment is rated for a gas or for a mix.
        Regulators reduce the cylinder pressure to a steady low pressure for the burner. Read{" "}
        <Link className="underline" href="/lpg-regulators/">how to choose an LPG regulator</Link> and use the part that
        matches your appliance. If the regulator misbehaves, see{" "}
        <Link className="underline" href="/lpg-regulator-problems-and-repair/">regulator problems and repair</Link>.
      </P>

      <H2>Which should you use?</H2>
      <UL
        items={[
          "Home kitchen in a plain city: the standard domestic LPG cylinder is fine; the mix is rarely a problem in warm weather.",
          "Heater, geyser or burner in a cold area: you cannot order a ratio from a domestic cylinder, so protect the cylinder from snow and ice, avoid running it flat out and use a larger size or two cylinders for heavy loads.",
          "Outdoor or rooftop storage in winter: a cylinder in freezing air gives less gas, so keep it sheltered and ventilated.",
          "Portable camping or catering stove: fine in mild weather; expect weaker flow when it is very cold.",
          "Industrial or commercial heating in cold areas: ask your supplier in writing what product and delivery arrangement they supply (cylinder bank, vaporizer or bulk) before you buy.",
        ]}
      />

      <H2>Cold-weather checklist for cylinders</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Keep the cylinder upright and out of snow and ice.</li>
        <li>
          Never warm a cylinder with a flame or heater. Do not pour hot water over it. If it is cold to the touch, move
          it to a slightly warmer, ventilated place.
        </li>
        <li>Check that the regulator outlet is not frosting during heavy use. Frost means the draw is too high for the cylinder or temperature.</li>
        <li>For heavy heating loads, use two cylinders joined by a changeover or a larger size.</li>
        <li>Check the hose and clamps, because cold hardens rubber.</li>
      </ol>

      <H2>How this relates to the rest of LPG</H2>
      <P>
        See <Link className="underline" href="/lpg-composition-and-properties/">LPG composition and properties</Link>,{" "}
        <Link className="underline" href="/what-is-lpg/">what LPG is</Link>,{" "}
        <Link className="underline" href="/lpg-safety/">LPG safety</Link> and{" "}
        <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">LPG cylinder sizes in Pakistan</Link>.
      </P>

      <H2>Order LPG nationwide</H2>
      <P>
        {company.shortName} (OGRA licence {company.licenceNumber}) delivers through a nationwide distributor network.
        See <Link className="underline" href="/how-it-works/">how ordering works</Link>,{" "}
        <Link className="underline" href="/our-network/">our network</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/propane-vs-butane/")} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: "/propane-vs-butane/",
          headline: "Propane vs butane: differences, uses and which is better",
          description:
            "Propane vs butane explained: boiling point, pressure, heat value, cold-weather use in Pakistan and what it means for an LPG cylinder.",
        })}
      />
    </PageShell>
  );
}

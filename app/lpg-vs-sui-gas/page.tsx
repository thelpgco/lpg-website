import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import JsonLd from "@/components/JsonLd";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { itemsFor, media } from "@/lib/media";
import { fmtDate, latestPrice, perKgFor, pkr } from "@/lib/prices";
import { articleNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({ path: "/lpg-vs-sui-gas/" });

const MJ_PER_KG_LPG = 46;
const MJ_PER_MMBTU = 1055;
const KG_PER_MMBTU = MJ_PER_MMBTU / MJ_PER_KG_LPG;

const faqs = [
  { q: "Is LPG the same as Sui gas?", a: "No. Sui gas is pipeline natural gas, mostly methane, and it is lighter than air. LPG is propane and butane, supplied in cylinders or tanks, and it is heavier than air. They need different burner settings and different safety habits." },
  { q: "Can I run my Sui gas stove on LPG?", a: "Not without conversion. LPG needs a smaller burner jet and a regulator, because it carries more energy per cubic metre than natural gas and runs at a different pressure. Have a qualified person fit the right jets. Do not drill or swap parts yourself." },
  { q: "Is LPG cheaper than Sui gas?", a: "Usually not per unit of heat when you hold a normal domestic pipeline connection, because pipeline tariffs are regulated and lower than cylinder gas. LPG makes sense where there is no connection, where pressure is too low in winter, or where supply is cut. Use the worked method on this page with your own bill." },
  { q: "Why do people switch to LPG in winter?", a: "Pipeline pressure often falls in cold months when demand rises, and some areas get little or no gas for cooking or heating. LPG from a cylinder does not depend on line pressure, so it works as a backup or main fuel." },
  { q: "Can I keep both Sui gas and LPG at home?", a: "Yes, but keep the two systems separate: separate hoses, separate regulators, and never connect a cylinder into a natural gas line. Ask a qualified installer to set up dual fuel appliances or a changeover." },
  { q: "Which is safer, LPG or Sui gas?", a: "Both are safe when installed and used correctly, and both can cause fire or explosion when they leak. The difference is behaviour: natural gas rises and disperses, while LPG sinks and collects low, so ventilation at floor level matters more with LPG." },
  { q: "How fast can I get an LPG cylinder as backup?", a: `${terms.delivery} ${company.shortName} confirms price and timing before you agree. Call or WhatsApp ${site.phoneDisplay}.` },
  { q: "Where can I compare cost with a calculator?", a: "Use our LPG vs Sui gas cost calculator for a rough heat-cost comparison, then check the live OGRA rate on the LPG price page." },
];

export default function Page() {
  const perKg = perKgFor();
  const mmbtuCost = perKg ? Math.round(perKg * KG_PER_MMBTU) : undefined;
  return (
    <PageShell
      crumbs={[
        { name: "What is LPG?", href: "/what-is-lpg/" },
        { name: "LPG vs Sui gas", href: "/lpg-vs-sui-gas/" },
      ]}
      h1="LPG vs Sui gas: differences, cost and when to switch"
      intro={`${company.shortName} supplies LPG nationwide when the pipeline is missing, weak or cut. Sui gas is pipeline natural gas (mostly methane). LPG is propane and butane delivered in cylinders — usually dearer per unit of heat than a regulated pipeline tariff, but reliable where the line cannot serve you.`}
      aside={<SiteLeadForm heading="Need LPG as main or backup fuel?" />}
    >
      <Note title="Short answer" tone="info">
        <p>
          Keep Sui gas if you have a reliable connection. Add or switch to LPG when you have no line, when winter
          pressure fails, or when you need gas for a shop, kitchen or workshop that the line cannot serve.
        </p>
      </Note>

      <ContentImage
        src={media.cylDomestic.src}
        alt={media.cylDomestic.alt}
        caption="Domestic LPG cylinder, 11.8 kg of gas"
        priority
      />

      <H2>What each fuel actually is</H2>
      <P>
        &ldquo;Sui gas&rdquo; is the everyday name for natural gas from the pipeline networks run by SNGPL in the north
        and SSGC in the south. The gas is mostly methane. LPG is a different product: a mix of propane and butane that
        is liquid under moderate pressure. For the full definition see{" "}
        <Link className="underline" href="/what-is-lpg/">what LPG is</Link>.
      </P>

      <H2>LPG vs Sui gas at a glance</H2>
      <SpecTable
        head={["Point", "LPG", "Sui gas (natural gas)"]}
        rows={[
          ["Main gas", "Propane and butane", "Methane"],
          ["How it reaches you", "Cylinder or tank, delivered", "Underground pipeline and meter"],
          ["Vs air", "Heavier: leaks sink and collect low", "Lighter: leaks rise and disperse"],
          ["Heat per cubic metre", "Much higher (roughly 2.5 to 3 times natural gas for the same volume of gas)", "Lower"],
          ["Price basis", "OGRA monthly notified price per kg", "Regulated utility tariff, slab based on use"],
          ["Needs a connection", "No", "Yes, plus a meter and utility approval"],
          ["Pressure", "Set by the regulator, steady until the cylinder is nearly empty", "Varies with line pressure and demand"],
          ["Burner jets", "Smaller jets", "Larger jets"],
        ]}
        caption="Typical properties. Exact figures depend on supplier and season."
      />

      <H2>Cost: how to compare LPG and Sui gas fairly</H2>
      <P>
        The fair comparison is cost per unit of heat, not cost per cylinder or per cubic metre. Natural gas is billed in
        units of energy (MMBTU) on most utility bills. LPG is sold by weight. One kg of LPG carries about {MJ_PER_KG_LPG}{" "}
        MJ of heat and one MMBTU is about {MJ_PER_MMBTU} MJ, so roughly {KG_PER_MMBTU.toFixed(1)} kg of LPG equals one
        MMBTU.
      </P>
      {latestPrice && mmbtuCost ? (
        <Note title="Worked example with the latest verified OGRA price" tone="info">
          <p>
            At {pkr(perKg!)} per kg (OGRA notification effective {fmtDate(latestPrice.effectiveFrom)}), one MMBTU of LPG
            heat costs about <strong>{pkr(mmbtuCost)}</strong> in gas alone. Look at your Sui gas bill, find the rate per
            MMBTU for your slab, and compare. Add delivery and cylinder terms for LPG, and add fixed charges and
            minimum bill for the line.
          </p>
        </Note>
      ) : (
        <Note title="Worked example" tone="warn">
          <p>
            Our verified OGRA price is being updated. Multiply the current notified price per kg by{" "}
            {KG_PER_MMBTU.toFixed(1)} to get the cost of one MMBTU of LPG heat, then compare with the rate per MMBTU on
            your Sui gas bill.
          </p>
        </Note>
      )}
      <UL
        items={[
          "Use the rate for your own slab on the bill, because pipeline tariffs rise with usage.",
          "Burner efficiency matters. A good LPG burner and a good natural gas burner both waste some heat, but the gap between them is small compared with the price gap.",
          "Count fixed monthly charges and any minimum bill on the pipeline side.",
          "Count delivery, cylinder deposit or exchange on the LPG side. See the current rate on the LPG price page.",
        ]}
      />
      <P>
        Check today&apos;s rate on <Link className="underline" href="/lpg-price-in-pakistan/">LPG price in Pakistan</Link>{" "}
        and the cylinder gas cost on{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">the price of an LPG cylinder</Link>. Try the{" "}
        <Link className="underline" href="/tools/lpg-vs-sui-gas-cost-calculator/">LPG vs Sui gas cost calculator</Link>.
      </P>

      <H2>When LPG makes more sense than Sui gas</H2>
      <UL
        items={[
          "You have no pipeline connection, or the waiting time for one is long.",
          "Pressure is too low in winter to cook or heat properly.",
          "You rent and cannot get a line approved.",
          "You run a shop, tea stall, kitchen or workshop that needs a steady burner.",
          "You want a backup for load-shedding of gas.",
          "You need a geyser or heater in a location the line does not reach.",
        ]}
      />

      <H2>When to stay on Sui gas</H2>
      <UL
        items={[
          "You already have a reliable connection and enough pressure all year.",
          "Your use is high and your slab tariff is still lower than the LPG heat cost above.",
          "You do not have a safe, ventilated place to keep a cylinder.",
        ]}
      />

      <H2>Switching checklist: moving a kitchen from Sui gas to LPG</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Confirm your stove, heater or geyser can be converted. The maker&apos;s label or manual says which gas it was built for.</li>
        <li>Have the burner jets changed to the LPG size by a qualified person. Do not enlarge or drill jets.</li>
        <li>
          Fit an LPG regulator and a hose made for LPG. See{" "}
          <Link className="underline" href="/lpg-regulators/">
            LPG regulators
          </Link>
          .
        </li>
        <li>
          Choose a ventilated spot for the cylinder, upright, outside the kitchen if you can. See{" "}
          <Link className="underline" href="/lpg-safety/">
            LPG safety
          </Link>
          .
        </li>
        <li>Check every connection with soapy water. Never use a flame.</li>
        <li>Disconnect the old natural gas hose and cap the old line. Never join the two systems.</li>
        <li>
          Work out cylinder size and how long it will last with the{" "}
          <Link className="underline" href="/tools/lpg-cylinder-duration-calculator/">
            cylinder duration calculator
          </Link>
          .
        </li>
      </ol>

      <H2>Do not mix the two systems</H2>
      <Note title="Safety" tone="danger">
        <p>
          Never connect an LPG cylinder to a natural gas line, and never run an unconverted natural gas appliance on
          LPG. The pressure and burner design are different. A wrong connection can cause leaks, yellow flames and
          carbon monoxide.
        </p>
      </Note>

      <H2>Getting LPG from a licensed nationwide supplier</H2>
      <P>
        {company.aboutBlurb} {terms.deposit} To start, see{" "}
        <Link className="underline" href="/new-lpg-connection/">a new LPG connection</Link>, choose a size on{" "}
        <Link className="underline" href="/lpg-cylinders/">LPG cylinders</Link>, read{" "}
        <Link className="underline" href="/how-it-works/">how ordering works</Link>, or{" "}
        <Link className="underline" href="/order-lpg/">order LPG</Link>. Call or WhatsApp {site.phoneDisplay}.
      </P>

      <ImageGallery items={itemsFor("/lpg-vs-sui-gas/")} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={articleNode({
          path: "/lpg-vs-sui-gas/",
          headline: "LPG vs Sui gas: differences, cost and when to switch",
          description:
            "LPG vs Sui gas compared: what each fuel is, how to compare cost per unit of heat, when to switch, and a safe conversion checklist.",
        })}
      />
    </PageShell>
  );
}

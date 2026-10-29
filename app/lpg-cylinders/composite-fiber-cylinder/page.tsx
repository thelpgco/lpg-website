import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import CylinderCostBlock, { cylinderSpecRows } from "@/components/CylinderCostBlock";
import SpecTable from "@/components/SpecTable";
import { itemsFor } from "@/lib/media";
import { cylinderByGasKg, shellCostLabel } from "@/lib/products";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/lpg-cylinders/composite-fiber-cylinder/";
export const metadata = meta({ path });

const faqs = [
  {
    q: "What is a composite (fibre) LPG cylinder?",
    a: "A composite cylinder has a body made of wound fibre and a polymer liner instead of all steel. It holds LPG like a steel cylinder, is lighter, does not rust and has a translucent body that shows the gas level.",
  },
  {
    q: "Are composite LPG cylinders safe?",
    a: "Cylinders made and certified for LPG are designed for the job. As with steel, use a suitable regulator, keep the cylinder upright in a ventilated place away from heat, and check the certification marking and condition on delivery.",
  },
  {
    q: "Can I see how much gas is left in a composite cylinder?",
    a: "Yes. The translucent body lets you see the liquid level, so you can plan a refill before you run out. The level is a guide; do not use it to judge safety.",
  },
  {
    q: "Is a composite cylinder available in my city?",
    a: `Availability and sizes vary by city and distributor and we confirm them when you order. Send your city and area or call or WhatsApp ${site.phoneDisplay}.`,
  },
  {
    q: "Can I exchange a steel cylinder for a composite one?",
    a: "Exchange terms depend on the cylinder you hold and the distributor. Tell us what you have and we confirm whether a swap, a deposit or a new composite cylinder applies.",
  },
  {
    q: "How is composite cylinder gas priced?",
    a: "The gas portion uses the same OGRA per-kg rate times the kg of gas. The empty composite shell is priced separately and its deposit or purchase price is quoted before you agree.",
  },
  {
    q: "Do I need a special regulator for composite?",
    a: "Use a regulator compatible with the composite cylinder valve. Ask us to match the regulator when you order — do not force a mismatched fitting.",
  },
  {
    q: "How do I order a composite cylinder?",
    a: `Send your city, area and preferred size on the form, or call / WhatsApp ${site.phoneDisplay}. We confirm stock, gas price, shell terms and who delivers before you agree.`,
  },
];

export default function Page() {
  const comp = cylinderByGasKg(12.5);
  const steel = cylinderByGasKg(11.8);
  return (
    <PageShell
      crumbs={[
        { name: "LPG cylinders", href: "/lpg-cylinders/" },
        { name: "Composite fibre cylinder", href: path },
      ]}
      h1="Composite (fibre) LPG cylinder in Pakistan"
      intro={`${site.shortName} supplies composite fibre LPG cylinders where stock allows — lighter than steel, rust-free, with a translucent body that shows the gas level. Availability depends on your city, so we confirm size and price when you order.`}
      aside={<SiteLeadForm defaultRequest="composite_cylinder" heading="Ask for a composite cylinder" />}
    >
      <Note title="Quick answer" tone="info">
        <p>
          Composite LPG cylinders are <strong>lighter</strong>, <strong>rust-free</strong> and show the{" "}
          <strong>gas level</strong>. Gas is priced on the same OGRA per-kg rate as steel. Sizes and city availability
          are confirmed when you order.
        </p>
      </Note>

      <ContentImage
        src="/images/cylinders/20-composite-cylinder-front.png"
        alt="Composite LPG cylinder Pakistan — fibre LPG cylinder with gas, lighter than steel"
        caption="Composite fibre LPG cylinder"
        priority
      />

      <H2>Composite vs steel LPG cylinder</H2>
      <SpecTable
        head={["", "Composite (fibre)", "Steel"]}
        rows={[
          ["Weight", "Lighter, easier to carry", "Heavier"],
          ["Rust", "Does not rust", "Can rust if kept damp or damaged"],
          ["Gas level", "Visible through the translucent body", "Not visible; judged by weight or feel"],
          ["Sizes", "Offered in some sizes; city stock confirmed on order", "5, 11.8, 15 and 45.4 kg are the usual sizes"],
          ["Availability", "Varies by city and distributor", "Widely used for refills and exchange"],
          ["Gas price", "Same OGRA per-kg rate × gas weight", "Same OGRA per-kg rate × gas weight"],
          [
            "Shell deposit or price",
            comp ? shellCostLabel(comp, "deposit") : "Quoted before you agree",
            steel ? shellCostLabel(steel, "deposit") : "Quoted before you agree",
          ],
        ]}
      />

      <H2>Why people choose composite</H2>
      <UL
        items={[
          "Easier for one person to lift and move than a steel bottle of the same gas weight",
          "No rust marks on kitchen floors or balconies",
          "You can see the level and plan a refill before the gas runs out",
        ]}
      />

      <ContentImage
        src="/images/cylinders/21-composite-liquid-level.png"
        alt="LPG fiber cylinder showing gas level through translucent composite body"
        caption="The translucent body shows the liquid level."
      />

      <H2>What to check on delivery</H2>
      <UL
        items={[
          "Certification marking and label are present and readable",
          "Valve seal is intact and the valve turns smoothly",
          "No cracks, deep cuts or damage to the outer fibre body",
          "The cylinder stands stable on its base",
        ]}
      />
      <P>
        If anything looks wrong, do not accept the cylinder and tell us before you pay. General safety rules are in the{" "}
        <Link className="underline" href="/lpg-safety/">
          LPG safety guide
        </Link>
        .
      </P>

      <H2>Composite sizes and availability by city</H2>
      <P>
        Composite cylinders are not stocked in every city or size. We confirm the size, the gas price and who will
        deliver when you place an order. If composite is not available in your area, steel cylinders are:{" "}
        <Link className="underline" href="/lpg-cylinders/12-kg-domestic-cylinder/">
          11.8 kg domestic
        </Link>{" "}
        and the{" "}
        <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">
          other sizes
        </Link>
        .
      </P>

      <H2>Composite cylinder specifications</H2>
      <SpecTable head={["Item", "Detail"]} rows={cylinderSpecRows(comp)} />

      <H2>Price and ordering</H2>
      <CylinderCostBlock kg={12.5} />
      <P>
        Gas = kg of gas × the OGRA notified price per kg, shown on{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>
        . The shell deposit or purchase price for composite and the delivery fee are quoted before you agree. Order on{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>{" "}
        or browse{" "}
        <Link className="underline" href="/lpg-cylinders/">
          all LPG cylinders
        </Link>
        .
      </P>

      <ImageGallery items={itemsFor(path)} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

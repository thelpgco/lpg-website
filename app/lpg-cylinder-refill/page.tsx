import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import PriceBlock from "@/components/PriceBlock";
import SpecTable from "@/components/SpecTable";
import { AllCylindersCostTable } from "@/components/CylinderCostBlock";
import { terms } from "@/lib/commercial";
import { itemsFor } from "@/lib/media";
import { priceReady } from "@/lib/prices";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/lpg-cylinder-refill/";
export const metadata = meta({ path, index: priceReady });

const faqs = [
  {
    q: "What is the difference between LPG refill and exchange?",
    a: "A refill puts gas into a cylinder you already hold. An exchange swaps your empty for a filled one. Both depend on the cylinder you have and the distributor covering your area; we confirm which applies before you agree.",
  },
  {
    q: "How much does an LPG cylinder refill cost?",
    a: "The gas is the notified OGRA price per kg times the kg in your cylinder. Delivery, and any deposit or shell terms, are separate and confirmed before you agree. See the price block on this page.",
  },
  {
    q: "Can I refill any cylinder?",
    a: "Only a cylinder that is certified, within test date and in safe condition should be filled. A damaged, rusted or unmarked cylinder can be refused. Ask us if you are not sure about yours.",
  },
  {
    q: "How do I order an LPG refill?",
    a: `Use the form on this page, go to order LPG, or call or WhatsApp ${site.phoneDisplay}. Give your city, area, cylinder size and whether you want a refill or an exchange.`,
  },
  {
    q: "How fast is refill delivery?",
    a: `Our target is ${site.deliveryTarget}. Fulfilment follows distributor availability, and we confirm stock when you order.`,
  },
  {
    q: "Should I pay before the cylinder arrives?",
    a: "Agree the total first. Check the cylinder marking, seal and condition on delivery, and pay only once you are satisfied. If it looks wrong, refuse it and tell us.",
  },
];

export default function Page() {
  return (
    <PageShell
      crumbs={[
        { name: "LPG cylinders", href: "/lpg-cylinders/" },
        { name: "LPG cylinder refill", href: path },
      ]}
      h1="LPG cylinder refill in Pakistan: refill vs exchange"
      intro={`${site.shortName} refills and exchanges LPG cylinders nationwide through licensed partners. Choose refill (gas into your bottle) or exchange (empty for full). Gas follows the OGRA per-kg rate; we confirm delivery for your street before you agree.`}
      aside={<SiteLeadForm defaultRequest="cylinder_delivery" heading="Order a refill" />}
    >
      <Note title="Quick answer" tone="info">
        <p>
          <strong>Refill</strong> = gas into your cylinder. <strong>Exchange</strong> = your empty for a filled one.
          The gas price is <strong>kg × OGRA price per kg</strong>; deposit and delivery are separate and confirmed
          before you agree. Target timing: {site.deliveryTarget}.
        </p>
      </Note>

      <ContentImage
        src="/images/hold-ai/36-delivery-team-faces.png"
        alt="LPG cylinder delivery team handing over a refill cylinder from the truck"
        caption="Refill handover at the door"
        priority
      />

      <H2>Refill vs exchange</H2>
      <SpecTable
        head={["", "Refill", "Exchange"]}
        rows={[
          ["What happens", "Gas is filled into the cylinder you hold", "You return an empty and receive a filled cylinder"],
          ["You need", "A certified cylinder in safe condition", "A compatible empty in acceptable condition"],
          ["Shell cost", "Usually none if the cylinder is yours", "May involve deposit or shell terms, quoted before you agree"],
          ["Best when", "You own a cylinder and can wait for it to be filled", "You want a filled bottle at the door right away"],
        ]}
      />
      <P>
        Which one applies depends on the cylinder you hold and the distributor in your area. Tell us what you have and
        we confirm before you agree.
      </P>

      <H2>How to order a refill</H2>
      <UL
        items={[
          "Send your city, area and cylinder size (5, 11.8, 15, 45.4 kg or composite)",
          "Say whether you want a refill or an exchange, or ask for a new cylinder",
          "We confirm the gas price, any deposit or exchange terms, and who delivers",
          "Check the cylinder on arrival, then pay",
        ]}
      />
      <P>
        Start on{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>{" "}
        or read how{" "}
        <Link className="underline" href="/lpg-home-delivery/">
          LPG home delivery
        </Link>{" "}
        works.
      </P>

      <H2>What to check on every refill</H2>
      <UL
        items={[
          "Certification marking is present and readable on the shoulder or label",
          "Valve seal is intact; the valve turns smoothly",
          "No deep dents, heavy rust or cracks",
          "The cylinder feels full — if it feels light, ask us before you accept",
        ]}
      />
      <P>
        Do not accept a damaged cylinder. See the{" "}
        <Link className="underline" href="/lpg-safety/">
          LPG safety guide
        </Link>{" "}
        for storage and connection tips.
      </P>

      <H2>Price of gas vs the cylinder shell</H2>
      <P>
        Gas price = <strong>kg of gas × OGRA notified price per kg</strong>. The shell is a separate cost: your own
        cylinder, a deposit on one we supply, or the purchase of a new empty. Delivery is a third part.
      </P>
      <PriceBlock />
      <AllCylindersCostTable />
      <P>
        Exchange: {terms.exchange}
      </P>
      <P>
        Per-size breakdown:{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
          price of LPG cylinder in Pakistan
        </Link>
        . Cylinder types:{" "}
        <Link className="underline" href="/lpg-cylinders/">
          LPG cylinders
        </Link>
        .
      </P>

      <ImageGallery items={itemsFor(path)} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

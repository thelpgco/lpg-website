import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import PriceBlock from "@/components/PriceBlock";
import CylinderCostBlock, { cylinderSpecRows } from "@/components/CylinderCostBlock";
import SpecTable from "@/components/SpecTable";
import { itemsFor } from "@/lib/media";
import { isDemo } from "@/lib/mode";
import { cylinderPrice, latestPrice, pkr, priceReady } from "@/lib/prices";
import { cylinderByGasKg } from "@/lib/products";
import { cylinderProductNode } from "@/lib/schema";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/lpg-cylinders/12-kg-domestic-cylinder/";
export const metadata = meta({ path, index: priceReady });

const faqs = [
  {
    q: "Is a 12 kg LPG cylinder the same as an 11.8 kg cylinder?",
    a: "In everyday talk, yes. The domestic cylinder holds 11.8 kg of gas and most people round it to 12 kg. The gas price is worked out on 11.8 kg, not 12.",
  },
  {
    q: "How much does an 11.8 kg LPG cylinder cost?",
    a: "The gas portion is 11.8 times the OGRA-notified price per kg. Deposit or exchange terms and delivery are separate and are confirmed before you agree. The price block on this page shows the worked figure when a verified notification is on file.",
  },
  {
    q: "How long does a 12 kg cylinder last at home?",
    a: "It depends on how many burners you use and for how long. A small family cooking two meals a day may take a few weeks per cylinder; heavy cooking, a geyser or a heater shortens that a lot. Try the cylinder duration calculator for a rough estimate.",
  },
  {
    q: "Do I pay a deposit for a domestic cylinder?",
    a: "A deposit applies when a cylinder is taken into your custody for the first time. The amount for your size and city is quoted before you agree. If you hand back a compatible empty in acceptable condition, an exchange may apply instead.",
  },
  {
    q: "Can I get an 11.8 kg cylinder delivered today?",
    a: `Order requests are accepted around the clock. Same-day delivery depends on distributor stock and team availability in your area, which we confirm when you order. Call or WhatsApp ${site.phoneDisplay}.`,
  },
  {
    q: "What should I check when the cylinder arrives?",
    a: "Check the certification marking, an intact valve seal, no deep dents or heavy rust, and a valve that turns smoothly. Refuse a damaged cylinder and tell us before you pay.",
  },
  {
    q: "Do I need a special regulator for 11.8 kg?",
    a: "Use a domestic low-pressure regulator that fits the cylinder valve, plus an LPG-rated hose with clamps. Ask for a kit if you are starting a new connection.",
  },
  {
    q: "Is delivery the same in every city?",
    a: `You can order at any hour. ${site.deliveryTarget} We confirm your street and window on each order.`,
  },
];

export default function Page() {
  const gas = cylinderPrice(11.8);
  const cyl = cylinderByGasKg(11.8);
  const demo = isDemo();
  return (
    <PageShell
      crumbs={[
        { name: "LPG cylinders", href: "/lpg-cylinders/" },
        { name: "12 kg domestic cylinder", href: path },
      ]}
      h1="LPG 11.8 kg (12 kg) domestic cylinder in Pakistan"
      intro={`${site.shortName} supplies the 11.8 kg domestic cylinder (usually called 12 kg) nationwide — the standard home LPG size in Pakistan. Gas price is 11.8 × the OGRA per-kg rate. Here is who it suits, the specs, the price and how to order.`}
      aside={<SiteLeadForm defaultRequest="cylinder_delivery" heading="Order an 11.8 kg cylinder" />}
    >
      <Note title="Quick answer" tone="info">
        <p>
          A 12 kg domestic cylinder holds <strong>11.8 kg of LPG</strong>. Gas cost ={" "}
          <strong>11.8 × notified price per kg</strong>
          {gas && latestPrice ? (
            <>
              {" "}
              — currently about <strong>{pkr(gas)}</strong> for the gas alone ({pkr(latestPrice.perKgPkr)}/kg).
            </>
          ) : (
            "."
          )}{" "}
          {demo
            ? "Deposit, new-empty and delivery figures on this page are guide figures confirmed when you order."
            : "Deposit, exchange and delivery are quoted on top and confirmed before you agree."}
        </p>
      </Note>

      <ContentImage
        src="/images/cylinders/11-domestic-cylinder-branded-front.png"
        alt="Domestic LPG cylinder Pakistan — 11.8 kg steel cylinder with gas for home use"
        caption="Domestic 11.8 kg steel LPG cylinder Check markings on delivery."
        priority
      />

      <H2>Who the 12 kg domestic cylinder suits</H2>
      <UL
        items={[
          "Family homes cooking on a gas stove daily",
          "Households that want fewer refills than a 5 kg bottle",
          "Flats and houses with a kitchen, balcony or utility area where a cylinder can stand upright and ventilated",
          "Small households that add one appliance such as a geyser or heater (expect faster use)",
        ]}
      />
      <P>
        Not sure it is the right size? Compare all sizes on{" "}
        <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">
          LPG cylinder sizes in Pakistan
        </Link>
        . Very light use fits a{" "}
        <Link className="underline" href="/lpg-cylinders/5-kg-cylinder/">
          5 kg cylinder
        </Link>
        ; a restaurant needs the{" "}
        <Link className="underline" href="/lpg-cylinders/45-kg-commercial-cylinder/">
          45.4 kg commercial cylinder
        </Link>
        .
      </P>

      <H2>11.8 kg cylinder specifications</H2>
      <SpecTable
        head={["Item", "Detail"]}
        rows={[
          ...cylinderSpecRows(cyl),
          ["Gas price basis", "11.8 × OGRA notified price per kg (often called 12 kg)"],
        ]}
      />
      <Note title="Empty weight is not the gas weight" tone="warn">
        <p>
          The size on the label is the gas it holds. The steel shell weighs extra, so the full cylinder is much heavier
          than 11.8 kg. Plan how you will lift and move it.
        </p>
      </Note>

      <H2>Price of an 11.8 kg LPG cylinder</H2>
      <P>
        Gas price = <strong>11.8 × OGRA price per kg</strong>. The table below always uses the verified rate on file.
      </P>
      <PriceBlock />
      <CylinderCostBlock kg={11.8} />
      <P>
        Full breakdown across sizes:{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
          price of LPG cylinder in Pakistan
        </Link>
        .
      </P>

      <H2>How to order and delivery</H2>
      <UL
        items={[
          "Send your city, area and say whether you need a refill, an exchange or a new cylinder",
          "We confirm the gas price, the deposit or exchange terms and who delivers",
          "The distributor delivers to your door; check the marking and seal before you accept",
        ]}
      />
      <P>
        Our delivery target is {site.deliveryTarget}. We confirm stock for your size and city when you order. Start on{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>{" "}
        or see{" "}
        <Link className="underline" href="/lpg-home-delivery/">
          LPG home delivery
        </Link>
        .
      </P>

      <H2>Safety with a domestic cylinder</H2>
      <UL
        items={[
          "Keep the cylinder upright, in a ventilated place, away from heat and flames",
          "Never store it in a basement or sleeping room",
          "Use a regulator and hose in good condition; replace cracked or old hose",
          "If you smell gas, shut the valve if safe, open windows and leave — see what to do if you smell gas",
        ]}
      />
      <P>
        Read the full{" "}
        <Link className="underline" href="/lpg-safety/">
          LPG safety guide
        </Link>{" "}
        before your first delivery. All cylinders in our network must carry valid certification markings.
      </P>

      <P>
        More on the range: <Link className="underline" href="/lpg-cylinders/">LPG cylinders</Link> · estimate how long a
        cylinder lasts with the{" "}
        <Link className="underline" href="/tools/lpg-cylinder-duration-calculator/">
          cylinder duration calculator
        </Link>
        .
      </P>

      <ImageGallery items={itemsFor(path)} title="Photos" />
      <Faq items={faqs} />
      <JsonLd
        data={cylinderProductNode({
          path,
          kg: 11.8,
          name: "11.8 kg domestic LPG cylinder refill",
          description: "Gas for an 11.8 kg domestic LPG cylinder at the OGRA-notified rate; deposit and delivery quoted separately.",
          image: "/images/cylinders/11-domestic-cylinder-branded-front.png",
        })}
      />
    </PageShell>
  );
}


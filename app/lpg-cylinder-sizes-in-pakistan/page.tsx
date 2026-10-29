import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { itemsFor } from "@/lib/media";
import { monthLong } from "@/lib/money";
import { isDemo } from "@/lib/mode";
import { cylinderPrice, latestPrice, pkr } from "@/lib/prices";
import { cylinders } from "@/lib/products";
import { meta } from "@/lib/seo";

export const metadata = meta({ path: "/lpg-cylinder-sizes-in-pakistan/" });

const faqs = [
  {
    q: "Why is a domestic cylinder called 11.8 kg?",
    a: "The number is the weight of the gas it holds when filled, not the weight of the empty cylinder. In everyday speech it is rounded to 12 kg.",
  },
  {
    q: "Which LPG cylinder size is best for a home?",
    a: "The 11.8 kg domestic cylinder suits most households. Choose 5 kg for light use or portability, and 15 kg for a large family or a small food business that cooks on gas daily.",
  },
  {
    q: "Can I use a commercial 45.4 kg cylinder at home?",
    a: "It is heavy and large, and meant for commercial use with proper storage and trained handling. A domestic size is safer and easier to manage in a home.",
  },
  {
    q: "How do I work out what a cylinder size costs?",
    a: latestPrice
      ? `Multiply the kg of gas by the OGRA per-kg rate: at ${pkr(latestPrice.perKgPkr)} per kg (${monthLong(latestPrice.month)}) that is ${pkr(cylinderPrice(5)!)} for 5 kg, ${pkr(cylinderPrice(11.8)!)} for 11.8 kg, ${pkr(cylinderPrice(15)!)} for 15 kg and ${pkr(cylinderPrice(45.4)!)} for 45.4 kg. Deposit and delivery are confirmed on top.`
      : "Multiply the kg of gas by the OGRA per-kg rate, then add the deposit and delivery we confirm for your order.",
  },
  {
    q: "Does the empty cylinder weight matter when choosing a size?",
    a: "The label size is gas weight; the empty cylinder adds to the weight you carry. Pick a size you can move and store safely, not simply the largest.",
  },
  {
    q: "Are composite cylinders available in all sizes?",
    a: "Composite (fibre) cylinders are offered in selected sizes. Tell us your city and use and we confirm what we can supply.",
  },
  {
    q: "How long does each size last?",
    a: "It depends on burners, hours of cooking and whether you also run a geyser or heater. Use the cylinder duration calculator for a rough estimate; there is no single answer for every home.",
  },
  {
    q: "Can I switch sizes later?",
    a: "Yes, subject to deposit or exchange terms for the size you hold and the size you want. Tell us what you have and we confirm what applies before you agree.",
  },
];

export default function Page() {
  const demo = isDemo();
  const list = cylinders();

  const head = [
    "Size (gas)",
    "Typical use",
    latestPrice ? `Gas price (${monthLong(latestPrice.month)})` : "Gas price",
    ...(demo ? ["Empty weight", "Height x diameter"] : []),
  ];
  const rows = list.map((c) => [
    c.type === "composite" ? `${c.gasKg} kg composite` : `${c.gasKg} kg`,
    c.typicalUse,
    cylinderPrice(c.gasKg) != null ? pkr(cylinderPrice(c.gasKg)!) : "Confirmed on order",
    ...(demo
      ? [
          c.tareKgApprox != null ? `about ${c.tareKgApprox} kg` : "-",
          c.heightMmApprox != null && c.diameterMmApprox != null ? `about ${c.heightMmApprox} x ${c.diameterMmApprox} mm` : "-",
        ]
      : []),
  ]);

  return (
    <PageShell
      crumbs={[{ name: "LPG cylinder sizes", href: "/lpg-cylinder-sizes-in-pakistan/" }]}
      h1="LPG cylinder sizes in Pakistan: 5, 11.8, 15 and 45.4 kg"
      intro={
        latestPrice
          ? `LPG cylinders are named by the weight of gas they hold, not the empty shell. At the OGRA rate of ${pkr(latestPrice.perKgPkr)} per kg: ${pkr(cylinderPrice(5)!)} for 5 kg, ${pkr(cylinderPrice(11.8)!)} for 11.8 kg, ${pkr(cylinderPrice(15)!)} for 15 kg and ${pkr(cylinderPrice(45.4)!)} for 45.4 kg. We supply these sizes nationwide and confirm deposit and delivery for your city.`
          : "LPG cylinders are named by the weight of gas they hold, not the weight of the empty cylinder. Here are the common sizes in Pakistan, who each suits, and how to order through our nationwide network."
      }
      aside={<SiteLeadForm heading="Not sure which size?" subheading="Tell us how you use gas and we will suggest a size." />}
    >
      <ContentImage
        src="/images/cylinders/17-size-lineup-5-118-15-454.png"
        alt="Four LPG cylinders labeled 5 kg, 11.8 kg, 15 kg and 45.4 kg"
        caption="Size lineup: 5, 11.8, 15 and 45.4 kg gas weight."
      />

      <H2>Common LPG cylinder sizes compared</H2>
      <SpecTable
        head={head}
        rows={rows}
        caption={
          demo
            ? "Gas price from the live OGRA rate. Empty weight and dimensions are approximate guide figures confirmed when you order."
            : "Gas price from the live OGRA rate, excluding deposit and delivery."
        }
      />
      {!demo ? (
        <Note title="Empty weight and height" tone="info">
          <p>
            Empty weight and height vary slightly by manufacturer and cylinder type. We confirm the dimensions of the cylinder
            being delivered when you order, which matters most if you are fitting a cabinet or a cage.
          </p>
        </Note>
      ) : null}

      <H2>5 kg: light use and portability</H2>
      <P>
        A 5 kg cylinder suits a single person, a small kitchen, a portable stove or occasional cooking. You refill more often than
        with 11.8 kg, but the bottle is easy to move. The gas cost per kg is the same as any size; see{" "}
        <Link className="underline" href="/lpg-price-per-kg-in-pakistan/">
          LPG 1 kg price in Pakistan
        </Link>
        .
      </P>

      <H2>11.8 kg: the usual home cylinder</H2>
      <P>
        Most Pakistani households use 11.8 kg (often called 12 kg). It balances refill frequency and weight. More on this size:{" "}
        <Link className="underline" href="/lpg-cylinders/12-kg-domestic-cylinder/">
          12 kg domestic cylinder
        </Link>
        .
      </P>

      <H2>15 kg: larger homes and small shops</H2>
      <P>
        15 kg suits bigger families or a small food business that cooks on gas daily. It is heavier than 11.8 kg, so plan where it
        will stand: upright, ventilated and away from heat.
      </P>

      <H2>45.4 kg: commercial kitchens</H2>
      <P>
        Restaurants, hotels and canteens use 45.4 kg. It is not a practical size for most homes, and storage and handling rules are
        stricter. See <Link className="underline" href="/lpg-safety/">LPG safety</Link> and{" "}
        <Link className="underline" href="/commercial-lpg-supply/">commercial LPG supply</Link> if you run a kitchen.
      </P>

      <H2>Choosing from the LPG cylinder sizes</H2>
      <UL
        items={[
          "Match size to cooking load; not every home needs 15 kg.",
          "Store upright, with ventilation, away from stoves and direct sun.",
          "Use a regulator matched to the cylinder valve type.",
          "Keep only the cylinders you need indoors.",
          "Estimate days between refills with the duration calculator before upsizing.",
        ]}
      />

      <H2>How to order the right size</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Pick a size from the table, or tell us how many people cook and which appliances you run.</li>
        <li>Send your city and area; we confirm stock, gas price, deposit or exchange and delivery.</li>
        <li>Check the certification marking and seal on arrival before you accept.</li>
      </ol>
      <P>
        Steel and composite compared:{" "}
        <Link className="underline" href="/lpg-cylinders/">
          LPG cylinders
        </Link>
        . Gas, deposit and delivery by size:{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
          price of LPG cylinder in Pakistan
        </Link>
        . Rate and monthly change:{" "}
        <Link className="underline" href="/lpg-price-in-pakistan/">
          LPG price in Pakistan
        </Link>
        . Duration estimate:{" "}
        <Link className="underline" href="/tools/lpg-cylinder-duration-calculator/">
          cylinder duration calculator
        </Link>
        . Ready to buy?{" "}
        <Link className="underline" href="/order-lpg/">
          Order LPG
        </Link>
        .
      </P>

      <ImageGallery items={itemsFor("/lpg-cylinder-sizes-in-pakistan/")} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

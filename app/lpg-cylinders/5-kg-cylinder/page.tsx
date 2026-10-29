import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
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
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/lpg-cylinders/5-kg-cylinder/";
export const metadata = meta({ path, index: priceReady });

const faqs = [
  {
    q: "How much gas does a 5 kg LPG cylinder hold?",
    a: "It holds 5 kg of LPG when filled. The size is the gas weight; the empty shell weighs extra.",
  },
  {
    q: "What is the price of a 5 kg LPG cylinder?",
    a: "The gas portion is 5 times the OGRA-notified price per kg. Any deposit or exchange and delivery are separate and confirmed before you agree. The price block shows the worked figure when a verified notification is on file.",
  },
  {
    q: "Is a 5 kg cylinder cheaper per kg than 11.8 kg?",
    a: "The gas rate per kg is the same notified price. A smaller cylinder costs less per refill but means more refills, and delivery or exchange terms may add to the cost per kg. We confirm all parts before you agree.",
  },
  {
    q: "Can I use a 5 kg cylinder for a home kitchen?",
    a: "For one or two people cooking lightly, yes. For a family cooking daily, it runs out quickly and the 11.8 kg domestic cylinder is more practical.",
  },
  {
    q: "Is a 5 kg cylinder available everywhere?",
    a: `Availability varies by city and distributor and we confirm it when you order. Call or WhatsApp ${site.phoneDisplay} with your city.`,
  },
];

export default function Page() {
  const gas = cylinderPrice(5);
  const cyl = cylinderByGasKg(5);
  const dom = cylinderByGasKg(11.8);
  const demo = isDemo();
  return (
    <PageShell
      crumbs={[
        { name: "LPG cylinders", href: "/lpg-cylinders/" },
        { name: "5 kg cylinder", href: path },
      ]}
      h1="5 kg LPG cylinder in Pakistan: portable, light use"
      intro={`${site.shortName} supplies the 5 kg LPG cylinder nationwide — the small, portable size for one or two people, a single stove or occasional cooking. Gas price is 5 × the OGRA per-kg rate; deposit and delivery are confirmed for your city.`}
      aside={<SiteLeadForm defaultRequest="cylinder_delivery" heading="Ask about a 5 kg cylinder" />}
    >
      <Note title="Quick answer" tone="info">
        <p>
          A 5 kg cylinder holds <strong>5 kg of LPG</strong>. Gas cost = <strong>5 × notified price per kg</strong>
          {gas && latestPrice ? (
            <>
              {" "}
              — currently about <strong>{pkr(gas)}</strong> for the gas alone ({pkr(latestPrice.perKgPkr)}/kg).
            </>
          ) : (
            "."
          )}
        </p>
      </Note>

      <ContentImage
        src="/images/cylinders/17-size-lineup-5-118-15-454.png"
        alt="LPG cylinder sizes in Pakistan — 5 kg, 11.8 kg, 15 kg and 45.4 kg cylinders side by side"
        caption="Size lineup: the 5 kg cylinder is the smallest of the four common sizes"
        priority
      />

      <H2>Who a 5 kg cylinder suits</H2>
      <UL
        items={[
          "Single people and couples with light cooking",
          "Portable stoves, outings and occasional use",
          "Rooms or small kitchens with limited storage space",
          "A spare for when the main cylinder runs out",
        ]}
      />
      <P>
        For a family kitchen, choose the{" "}
        <Link className="underline" href="/lpg-cylinders/12-kg-domestic-cylinder/">
          11.8 kg domestic cylinder
        </Link>
        . All sizes are compared on{" "}
        <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">
          LPG cylinder sizes in Pakistan
        </Link>
        .
      </P>

      <H2>5 kg cylinder specifications</H2>
      <SpecTable head={["Item", "Detail"]} rows={cylinderSpecRows(cyl)} />

      <H2>5 kg vs 11.8 kg at a glance</H2>
      <SpecTable
        head={["", "5 kg", "11.8 kg domestic"]}
        rows={[
          ["Gas weight", "5 kg", "11.8 kg"],
          ["Gas price", "5 × price per kg", "11.8 × price per kg"],
          ["Refill frequency", "Often", "Less often"],
          ["Carrying", "Easier to move", "Heavier"],
          ["Best for", "Light, portable use", "Everyday home cooking"],
          [
            "Empty weight (approx.)",
            demo && cyl?.tareKgApprox != null ? `About ${cyl.tareKgApprox} kg` : "See the printed label",
            demo && dom?.tareKgApprox != null ? `About ${dom.tareKgApprox} kg` : "See the printed label",
          ],
        ]}
      />

      <H2>Price of a 5 kg LPG cylinder</H2>
      <P>
        Gas price = <strong>5 × OGRA price per kg</strong>. The shell (deposit, exchange or new empty) and delivery are
        separate parts of the bill.
      </P>
      <PriceBlock />
      <CylinderCostBlock kg={5} />
      <P>
        See the full breakdown on{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
          price of LPG cylinder in Pakistan
        </Link>
        .
      </P>

      <H2>Safety with a portable cylinder</H2>
      <UL
        items={[
          "Use it upright and outdoors or in a ventilated space, never in a bedroom or closed car",
          "Keep it away from heat, flames and direct sun",
          "Check the regulator, hose and clamps before each use",
          "Do not let a small size tempt you into storing several indoors",
        ]}
      />
      <P>
        Read the{" "}
        <Link className="underline" href="/lpg-safety/">
          LPG safety guide
        </Link>{" "}
        for the full checklist.
      </P>

      <H2>How to order</H2>
      <P>
        Tell us your city and area and that you want a 5 kg cylinder, as a refill, an exchange or a new cylinder. We
        confirm the price, deposit or exchange terms and who delivers before you agree. Start on{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>
        .
      </P>

      <ImageGallery items={itemsFor(path)} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}


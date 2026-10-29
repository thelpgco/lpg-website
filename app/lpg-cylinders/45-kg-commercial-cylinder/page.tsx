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

const path = "/lpg-cylinders/45-kg-commercial-cylinder/";
export const metadata = meta({ path, index: priceReady });

const faqs = [
  {
    q: "How much gas is in a 45 kg commercial LPG cylinder?",
    a: "The commercial cylinder holds 45.4 kg of LPG when filled. The size is the gas weight, not the weight of the steel shell.",
  },
  {
    q: "What is the price of a 45.4 kg LPG cylinder?",
    a: "The gas portion is 45.4 times the OGRA-notified price per kg. Deposit or exchange and delivery are separate and confirmed before you agree. The price block shows the worked figure when a verified notification is on file.",
  },
  {
    q: "Can I use a 45.4 kg cylinder at home?",
    a: "It is possible only with proper storage, but it is heavy and large. For a home, a domestic 11.8 kg cylinder is usually safer and easier to handle.",
  },
  {
    q: "How many 45.4 kg cylinders can I keep on site?",
    a: "Storage limits depend on your premises and local rules. Keep only what you need, outdoors or in a ventilated, protected place. For a larger setup, ask about a manifold cylinder bank or bulk supply.",
  },
  {
    q: "Do you deliver 45.4 kg cylinders to restaurants?",
    a: `Yes, through our distributor network where a local team covers your area. We confirm availability and the delivery window when you order. Call or WhatsApp ${site.phoneDisplay}.`,
  },
  {
    q: "What deposit applies to a commercial cylinder?",
    a: "A deposit applies when a cylinder is taken into your custody. The amount for the 45.4 kg size is quoted before you agree. A compatible empty returned in acceptable condition may be exchanged instead.",
  },
  {
    q: "How many 45.4 kg cylinders does a restaurant use?",
    a: "It varies with burners and hours. Tell us cylinders per week and menu type; we can discuss standing refill routes, a manifold bank or bulk options for your city.",
  },
  {
    q: "Do commercial cylinders need a different regulator?",
    a: "Usually yes — a higher-flow or high-pressure regulator matched to the burner load. See the regulators page or ask when you order.",
  },
];

export default function Page() {
  const gas = cylinderPrice(45.4);
  const cyl = cylinderByGasKg(45.4);
  const dom = cylinderByGasKg(11.8);
  const demo = isDemo();
  return (
    <PageShell
      crumbs={[
        { name: "LPG cylinders", href: "/lpg-cylinders/" },
        { name: "45.4 kg commercial cylinder", href: path },
      ]}
      h1="45.4 kg commercial LPG cylinder in Pakistan"
      intro={`${site.shortName} supplies the 45.4 kg commercial LPG cylinder nationwide for restaurants, hotels and canteens. Gas price is 45.4 × the OGRA per-kg rate. Here is who needs it, how to handle it safely, the price and how to order.`}
      aside={<SiteLeadForm defaultRequest="commercial_supply" heading="Order a 45.4 kg cylinder" />}
    >
      <Note title="Quick answer" tone="info">
        <p>
          A commercial cylinder holds <strong>45.4 kg of LPG</strong>. Gas cost ={" "}
          <strong>45.4 × notified price per kg</strong>
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
            : "Deposit, exchange and delivery are quoted on top."}
        </p>
      </Note>

      <ContentImage
        src="/images/cylinders/15-commercial-45-4kg-full.png"
        alt="45.4 kg commercial LPG cylinder Pakistan — large steel cylinder for restaurants"
        caption="45.4 kg commercial steel cylinder"
        priority
      />

      <H2>Who needs a 45.4 kg cylinder</H2>
      <UL
        items={[
          "Restaurants, hotels and catering kitchens cooking for long hours",
          "Canteens, bakeries and food stalls with several burners",
          "Small workshops that use LPG daily and have safe outdoor storage",
        ]}
      />
      <P>
        A household cooking for a family will usually do better with the{" "}
        <Link className="underline" href="/lpg-cylinders/12-kg-domestic-cylinder/">
          11.8 kg domestic cylinder
        </Link>
        . Compare all options on{" "}
        <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">
          LPG cylinder sizes in Pakistan
        </Link>
        .
      </P>

      <H2>Domestic vs commercial: at a glance</H2>
      <SpecTable
        head={["", "11.8 kg domestic", "45.4 kg commercial"]}
        rows={[
          ["Gas weight", "11.8 kg", "45.4 kg"],
          ["Gas = ", "11.8 × price per kg", "45.4 × price per kg"],
          ["Best for", "Home kitchens", "Restaurants and commercial kitchens"],
          ["Handling", "One adult can usually move it", "Heavy — needs a trolley or two people"],
          ["Refill frequency", "More often", "Less often for the same cooking load"],
          [
            "Empty weight (approx.)",
            demo && dom?.tareKgApprox != null ? `About ${dom.tareKgApprox} kg` : "See the printed label",
            demo && cyl?.tareKgApprox != null ? `About ${cyl.tareKgApprox} kg` : "See the printed label",
          ],
        ]}
      />

      <H2>45.4 kg cylinder specifications</H2>
      <SpecTable head={["Item", "Detail"]} rows={cylinderSpecRows(cyl)} />

      <H2>Handling and storage</H2>
      <UL
        items={[
          "Move it with a proper trolley; do not drag, roll hard or drop it",
          "Keep it upright, secured against falling, outdoors or in a well-ventilated store",
          "Keep it away from open flames, electrical panels, drains and direct heat",
          "Use a regulator and hose rated for the load, and check them often",
          "Keep a clear path and an exit; keep full and empty cylinders apart",
        ]}
      />
      <Note title="Higher load, higher risk" tone="warn">
        <p>
          More gas on site means a bigger hazard if there is a leak. Read the{" "}
          <Link className="underline" href="/lpg-safety/">
            LPG safety guide
          </Link>{" "}
          and train every kitchen staff member on the shut-off valve.
        </p>
      </Note>
      <P>
        If you run several cylinders together, ask about a manifold cylinder bank under our{" "}
        <Link className="underline" href="/services/lpg-manifold-and-cylinder-bank-installation/">
          manifold installation
        </Link>{" "}
        service.
      </P>

      <H2>Price of a 45.4 kg LPG cylinder</H2>
      <P>
        Gas price = <strong>45.4 × OGRA price per kg</strong>.
      </P>
      <PriceBlock />
      <CylinderCostBlock kg={45.4} />
      <P>
        All sizes side by side:{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
          price of LPG cylinder in Pakistan
        </Link>
        .
      </P>

      <H2>How to order for a commercial kitchen</H2>
      <UL
        items={[
          "Tell us your city, area, business type and how many cylinders you use a week",
          "We confirm the gas price, deposit or exchange terms, and who delivers",
          "Check the certification marking and seal on every cylinder before accepting",
        ]}
      />
      <P>
        We confirm stock of 45.4 kg cylinders in your city when you order. Go to{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>{" "}
        or see{" "}
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


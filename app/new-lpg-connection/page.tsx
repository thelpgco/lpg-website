import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { AllCylindersCostTable } from "@/components/CylinderCostBlock";
import { company } from "@/lib/company/profile";
import { terms } from "@/lib/commercial";
import { itemsFor } from "@/lib/media";
import { isDemo } from "@/lib/mode";
import { cylinderByGasKg, deliveryFeeLabel, shellCostLabel } from "@/lib/products";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

const path = "/new-lpg-connection/";
export const metadata = meta({ path });

const faqs = [
  {
    q: "What do I need for a new LPG connection?",
    a: "A cylinder with gas, a regulator that fits the valve, a hose with clamps in good condition, and a stove or appliance. We help you with the cylinder and gas and confirm what accessories are available when you order.",
  },
  {
    q: "Do I have to pay a deposit for a new LPG cylinder?",
    a: "A deposit applies when a cylinder is taken into your custody. The amount for your size and city is quoted before you agree. Alternatively you may buy a new empty cylinder; that price is also quoted before delivery.",
  },
  {
    q: "Can I buy a new empty cylinder instead of paying a deposit?",
    a: "New empty cylinders, steel and composite, can be supplied with or without a first fill in the sizes the local team holds. We confirm size availability and price when you order.",
  },
  {
    q: "Which cylinder size should I choose for a new connection?",
    a: "Most homes start with an 11.8 kg domestic cylinder. Choose 5 kg for very light use. Commercial kitchens use 45.4 kg. See the sizes guide for help.",
  },
  {
    q: "Who installs the regulator and hose?",
    a: "Do not improvise. Ask the delivery person or a qualified technician to fit and leak-test the connection for you. For fixed pipework or several cylinders, ask about our installation services.",
  },
  {
    q: "How long does a new connection take?",
    a: `You can send a request at any hour. In covered areas our target is ${site.deliveryTarget}; otherwise the distributor calls you to confirm. We confirm stock when you order.`,
  },
  {
    q: "Is a new connection available nationwide?",
    a: `We take requests from every province. Availability of accessories is confirmed for your city when you order.`,
  },
  {
    q: "What does a new connection cost in total?",
    a: "Gas (kg × OGRA rate) plus deposit or new-empty shell, plus any regulator/hose kit and delivery. We confirm each part before you agree — there is no single fixed national package price on this page.",
  },
];

export default function Page() {
  const std = cylinderByGasKg(11.8);
  const demo = isDemo();
  return (
    <PageShell
      crumbs={[{ name: "New LPG connection", href: path }]}
      h1="New LPG connection in Pakistan: what you need and how to order"
      intro={`${company.shortName} sets up new LPG connections nationwide under OGRA licence ${company.licenceNumber}. You need a cylinder with gas, a regulator, a hose with clamps and an appliance. Checklist below, how deposit or purchase works, order steps and safe first use. Delivery target: ${site.deliveryTarget}.`}
      aside={<SiteLeadForm defaultRequest="new_connection" heading="Start a new connection" />}
    >
      <Note title="Quick answer" tone="info">
        <p>
          You need <strong>a cylinder with gas</strong>, a <strong>regulator</strong>, a <strong>hose with clamps</strong>{" "}
          and a <strong>stove or appliance</strong>. The cylinder shell is a deposit or a purchase; the amount is
          confirmed before you agree.
        </p>
      </Note>

      <ContentImage
        src="/images/accessories/29-cylinder-regulator-hose-studio.png"
        alt="LPG regulator and hose on cylinder — safe LPG connection kit for home delivery Pakistan"
        caption="Cylinder with regulator and hose"
        priority
      />

      <H2>What you need for a new connection</H2>
      <SpecTable
        head={["Item", "Why you need it", "Notes"]}
        rows={[
          ["LPG cylinder with gas", "Stores the gas", "11.8 kg is the usual home size; 5 kg for light use"],
          ["Regulator", "Controls pressure to the stove", "Must fit the cylinder valve type"],
          ["Hose and clamps", "Carries gas from regulator to stove", "Use LPG-rated hose; replace if cracked or old"],
          ["Stove or appliance", "Where the gas is burned", "Check it is made for LPG"],
          ["Ventilated place", "Where the cylinder stands upright", "Away from heat, never in a basement or bedroom"],
        ]}
      />
      <P>
        Pick a size on{" "}
        <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">
          LPG cylinder sizes in Pakistan
        </Link>
        ; most homes choose the{" "}
        <Link className="underline" href="/lpg-cylinders/12-kg-domestic-cylinder/">
          11.8 kg domestic cylinder
        </Link>
        .
      </P>

      <H2>Deposit or buying a new cylinder</H2>
      <P>
        There are two usual ways to get the cylinder shell for a first connection.{" "}
        {demo
          ? "The figures below are guide figures that show how a full quote is structured."
          : "We quote the amount for your size and city before you agree and do not publish a fixed list."}
      </P>
      <SpecTable
        head={["Option", "How it works", "11.8 kg domestic cylinder"]}
        rows={[
          [
            "Deposit",
            terms.deposit,
            std ? shellCostLabel(std, "deposit") : "Quoted before you agree",
          ],
          [
            "Buy a new empty",
            terms.newEmpty,
            std ? shellCostLabel(std, "newEmpty") : "Quoted before you agree",
          ],
          ["Delivery", terms.delivery, std ? deliveryFeeLabel(std) : "Confirmed before you agree"],
        ]}
      />
      <AllCylindersCostTable columns="shell" showTerms={false} />
      <P>
        Gas is separate: kg × OGRA price per kg. See{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
          price of LPG cylinder in Pakistan
        </Link>
        .
      </P>

      <H2>How to order a new connection</H2>
      <ol className="mt-3 list-decimal space-y-1 pl-6 text-ink-700">
        <li>Send your city, area and the cylinder size you want (11.8 kg is the usual home size).</li>
        <li>Say whether you want a deposit cylinder or a new empty, and whether you need a regulator and hose.</li>
        <li>We confirm the gas price, deposit or purchase amount, accessories, delivery and who supplies you.</li>
        <li>Check the cylinder on arrival, and have the connection fitted and leak-tested before use.</li>
      </ol>
      <P>
        {terms.delivery247Note} Order on{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>
        , or read how{" "}
        <Link className="underline" href="/lpg-home-delivery/">
          LPG home delivery
        </Link>{" "}
        works. Shop accessories:{" "}
        <Link className="underline" href="/shop/lpg-hoses-and-accessories/">
          hoses and accessories
        </Link>
        .
      </P>

      <H2>Safe first use</H2>
      <UL
        items={[
          "Stand the cylinder upright on a firm, level surface in a ventilated place",
          "Fit the regulator by hand or with the correct tool; do not over-tighten or use force",
          "Clamp the hose at both ends, keep it short, straight and away from the flame",
          "Check for leaks with soapy water on the joints — never a flame",
          "Open the valve slowly, light the burner, and keep the area ventilated while cooking",
          "Close the valve after use, especially overnight and when you are away",
        ]}
      />
      <Note title="If you smell gas" tone="danger">
        <p>
          Close the valve if it is safe, open doors and windows, do not use switches or flames and leave the area. See{" "}
          <Link className="underline" href="/what-to-do-if-you-smell-gas/">
            what to do if you smell gas
          </Link>{" "}
          and the{" "}
          <Link className="underline" href="/lpg-safety/">
            LPG safety guide
          </Link>
          .
        </p>
      </Note>

      <ImageGallery items={itemsFor(path)} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

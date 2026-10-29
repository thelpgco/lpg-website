import Link from "next/link";
import Faq from "@/components/Faq";
import ImageGallery from "@/components/ImageGallery";
import SiteLeadForm from "@/components/LeadFormLoader";
import PageShell, { H2, Note, P, UL } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { itemsFor } from "@/lib/media";
import { perKgFor } from "@/lib/prices";
import { meta } from "@/lib/seo";
import Calculator from "./Calculator";

const path = "/tools/lpg-cylinder-duration-calculator/";
export const metadata = meta({ path });

const faqs = [
  {
    q: "How long does an 11.8 kg LPG cylinder last?",
    a: "There is no single answer. It depends on how many burners you use, for how long and on what flame. A light cook may stretch it over several weeks; heavy cooking with a geyser or heater can finish it much sooner. Use the calculator for a rough estimate.",
  },
  {
    q: "How many kg of gas does a burner use per hour?",
    a: "It varies with the burner and the flame. The calculator uses 0.25 kg per burner per hour as a planning assumption and lets you change it. Larger burners, geysers and heaters use more.",
  },
  {
    q: "Why does the calculator keep a reserve?",
    a: "The flame weakens as the cylinder nears empty, so you cannot always use every kilogram. A reserve of around 10% gives a more realistic figure.",
  },
  {
    q: "Is the result accurate?",
    a: "No. It is a rough estimate based on the numbers you enter. For a better figure, note the date you start a cylinder and the date it runs out, then enter the kg per day.",
  },
  {
    q: "Which cylinder size should I buy to last longer?",
    a: "A larger cylinder lasts longer between refills but is heavier to move and store. Most homes use 11.8 kg. Compare sizes in our sizes guide.",
  },
];

export default function Page() {
  const perKg = perKgFor();
  return (
    <PageShell
      crumbs={[{ name: "Cylinder duration calculator", href: path }]}
      h1="LPG cylinder duration calculator: how long will it last?"
      intro="Pick your cylinder size and how much you cook to get a rough number of days before you need a refill. It is an estimate, not a measurement — then order a refill when you are ready."
      aside={<SiteLeadForm defaultRequest="cylinder_delivery" heading="Need a refill?" />}
    >
      <Calculator perKgPkr={perKg} />

      <H2>How the estimate works</H2>
      <P>
        Days remaining = usable gas (kg) ÷ gas used per day (kg). By hours, gas used per day = cooking hours × burners ×
        kg per burner-hour.
      </P>
      <SpecTable
        head={["Size (gas)", "Usable gas at 10% reserve", "At 0.8 kg per day"]}
        rows={[
          ["5 kg", "4.5 kg", "about 6 days"],
          ["11.8 kg", "10.6 kg", "about 13 days"],
          ["15 kg", "13.5 kg", "about 17 days"],
          ["45.4 kg", "40.9 kg", "about 51 days"],
        ]}
      />
      <P>These worked examples assume 0.8 kg per day, which is only an example, not a typical household figure.</P>

      <H2>What changes how long a cylinder lasts</H2>
      <UL
        items={[
          "Number of burners and how long each runs",
          "Flame setting and pot size — a high flame under a small pot wastes gas",
          "Geysers and heaters, which use gas faster than a stove",
          "Cooking time per meal, including boiling and frying",
          "Leaks or loose connections — check regularly and never test with a flame",
        ]}
      />
      <Note title="A fast drop may mean a leak" tone="warn">
        <p>
          If a cylinder empties much faster than usual, shut the valve and have the connection checked. See{" "}
          <Link className="underline" href="/lpg-safety/">
            LPG safety
          </Link>
          .
        </p>
      </Note>

      <H2>Choose a size and order</H2>
      <P>
        Compare{" "}
        <Link className="underline" href="/lpg-cylinder-sizes-in-pakistan/">
          LPG cylinder sizes
        </Link>
        , read about the{" "}
        <Link className="underline" href="/lpg-cylinders/12-kg-domestic-cylinder/">
          11.8 kg domestic cylinder
        </Link>{" "}
        or the{" "}
        <Link className="underline" href="/lpg-cylinders/45-kg-commercial-cylinder/">
          45.4 kg commercial cylinder
        </Link>
        , then{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>
        . For the cost of a refill see{" "}
        <Link className="underline" href="/lpg-cylinder-price-in-pakistan/">
          price of LPG cylinder in Pakistan
        </Link>
        .
      </P>

      <ImageGallery items={itemsFor(path)} title="Photos" />
      <Faq items={faqs} />
    </PageShell>
  );
}

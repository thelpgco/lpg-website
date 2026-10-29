import Link from "next/link";
import { H2, P } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import ToolPage from "@/components/r4plus/ToolPage";
import { CYLINDER_SIZES_KG, cylinderPrice, fmtDate, latestPrice, notifications, perKgFor, pkr } from "@/lib/prices";
import { meta } from "@/lib/seo";
import Calculator from "./Calculator";

const path = "/tools/lpg-cylinder-price-calculator/";
export const metadata = meta({ path });

const faqs = [
  {
    q: "How is the price of an LPG cylinder worked out?",
    a: "The gas part is the gas weight in kg multiplied by the OGRA-notified rate per kg. A delivery charge and a cylinder deposit or exchange terms can be added, depending on your order. We confirm the full total before you agree.",
  },
  {
    q: "Is the 11.8 kg price the weight of the whole cylinder?",
    a: "No. 11.8 kg is the weight of the gas. The empty steel cylinder weighs extra, and you pay the gas price for the gas, not for the steel.",
  },
  {
    q: "Does the calculator include delivery and deposit?",
    a: "Only if you type them in. We do not assume a delivery charge or deposit because they depend on the order and are confirmed with you.",
  },
  {
    q: "Why does the rate change each month?",
    a: "OGRA notifies a new consumer price every month. See why LPG prices change in Pakistan for the reasons.",
  },
  {
    q: "Is this calculator a quote?",
    a: "No. It is a planning figure for the gas portion. We confirm the full total — gas, deposit or exchange and delivery — before you agree.",
  },
  {
    q: "Where does the per-kg rate come from?",
    a: "We load the monthly OGRA consumer rate with the month shown in the tool. Confirm the figure against OGRA when you order if you need absolute certainty for that day.",
  },
];

export default function Page() {
  const perKg = perKgFor();
  return (
    <ToolPage
      path={path}
      crumb="Cylinder price calculator"
      h1="LPG cylinder price calculator: gas cost by size and quantity"
      intro="Pick a cylinder size and quantity to see the gas cost at the OGRA-notified rate per kg. Add any delivery or deposit you have been quoted to see a rough total. This is a planning tool — not a binding quote."
      calculator={<Calculator perKgPkr={perKg} effectiveFrom={latestPrice ? fmtDate(latestPrice.effectiveFrom) : undefined} />}
      faqs={faqs}
      related={[
        { href: "/lpg-cylinder-price-in-pakistan/", label: "LPG cylinder price in Pakistan" },
        { href: "/lpg-price-per-kg-in-pakistan/", label: "LPG price per kg today" },
        { href: "/pricing-policy/", label: "Pricing policy" },
        { href: "/tools/lpg-cylinder-duration-calculator/", label: "Cylinder duration calculator" },
        { href: "/order-lpg/", label: "Order LPG" },
      ]}
    >
      <H2>How the estimate works</H2>
      <P>Gas cost = gas weight (kg) × gas rate (Rs per kg) × number of cylinders. Delivery is added once per order and deposit per cylinder, only if you enter them.</P>
      {latestPrice ? (
        <>
          <SpecTable
            head={["Cylinder (gas)", `Gas only at ${pkr(latestPrice.perKgPkr)}/kg`]}
            rows={CYLINDER_SIZES_KG.map((kg) => [`${kg} kg`, pkr(cylinderPrice(kg)!)])}
            caption={`OGRA rate for ${latestPrice.month}, effective ${fmtDate(latestPrice.effectiveFrom)}. Loaded by ${latestPrice.verifiedBy} on ${fmtDate(latestPrice.verifiedOn)}. Confirm against OGRA when you order.`}
          />
          <P>
            These are gas-only figures. Deposit, exchange and delivery are confirmed on top. See the{" "}
            <Link className="underline" href="/ogra-lpg-notified-price/">
              OGRA notified price
            </Link>{" "}
            page for the source and month.
          </P>
        </>
      ) : (
        <P>We have no OGRA rate loaded right now, so the calculator starts blank. Enter the current notified rate per kg, or call for confirmation.</P>
      )}
      {notifications.length > 1 && (
        <>
          <H2>Cylinder gas price, month by month</H2>
          <SpecTable
            head={["Month", "11.8 kg domestic", "45.4 kg commercial"]}
            rows={notifications.map((x) => [
              new Date(x.effectiveFrom + "T00:00:00").toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
              pkr(Math.round(x.perKgPkr * 11.8)),
              pkr(Math.round(x.perKgPkr * 45.4)),
            ])}
            caption="Gas only, at each month's OGRA-notified rate."
          />
        </>
      )}

      <H2>Is a bigger cylinder cheaper?</H2>
      <P>
        Not per kilogram of gas: the notified rate is the same whether you buy 5 kg or 45.4 kg. A bigger cylinder saves on
        everything around the gas, because one delivery and one deposit cover more kilograms. A home that changes an 11.8 kg
        cylinder twice a month makes about 24 delivery trips a year; a 15 kg cylinder cuts that to about 19 for the same
        gas. For restaurants, a 45.4 kg cylinder or a cylinder bank cuts handling far more.
      </P>

      <H2>Next step</H2>
      <P>
        When you are ready,{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>{" "}
        with your city and size. We confirm the full total before you agree.
      </P>
    </ToolPage>
  );
}

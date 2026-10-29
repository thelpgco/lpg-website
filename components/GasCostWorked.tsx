import Link from "next/link";
import { H2, P } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { monthLong } from "@/lib/money";
import { fmtDate, latestPrice, notifications, pkr } from "@/lib/prices";

/**
 * Worked gas cost for one cylinder size, from the live OGRA per-kg figure in lib/prices.ts.
 * Gas only: deposit, exchange and delivery are quoted separately and are never guessed here.
 */
export default function GasCostWorked({
  kg = 45.4,
  heading,
  usage = "commercial",
}: {
  kg?: number;
  heading?: string;
  usage?: "commercial" | "bulk" | "industrial";
}) {
  const title = heading ?? `Worked example: gas cost of one ${kg} kg cylinder`;
  if (!latestPrice) {
    return (
      <>
        <H2>{title}</H2>
        <P>
          Gas cost is simple: {kg} kg x the OGRA-notified price per kg. We show the rupee figure on this page once a
          verified monthly notification is on file. See <Link className="underline" href="/lpg-price-in-pakistan/">LPG price in Pakistan</Link>.
        </P>
      </>
    );
  }

  const perKg = latestPrice.perKgPkr;
  const one = Math.round(perKg * kg);
  const prev = notifications[1];
  const counts = usage === "commercial" ? [4, 8, 16] : usage === "bulk" ? [20, 40, 80] : [30, 60, 120];
  const rows: React.ReactNode[][] = [
    ["OGRA notified price", `${pkr(perKg)} per kg (${monthLong(latestPrice.month)}, effective ${fmtDate(latestPrice.effectiveFrom)})`],
    [`Gas in one ${kg} kg cylinder`, `${kg} x ${pkr(perKg)} = ${pkr(one)}`],
    ...counts.map((n) => [`${n} cylinders a month (gas only)`, `${n} x ${pkr(one)} = ${pkr(n * one)}`]),
  ];
  if (prev) {
    const prevOne = Math.round(prev.perKgPkr * kg);
    const diff = one - prevOne;
    rows.push([
      `Change since ${monthLong(prev.month)}`,
      `${pkr(prev.perKgPkr)} per kg then, so ${pkr(prevOne)} for ${kg} kg: ${diff >= 0 ? "up" : "down"} ${pkr(Math.abs(diff))} per cylinder`,
    ]);
  }

  return (
    <>
      <H2>{title}</H2>
      <SpecTable
        head={["Step", "Working"]}
        rows={rows}
        caption="Gas only, at the notified per-kg price. Rounded to the nearest rupee."
      />
      <P>
        Deposit or exchange terms, delivery and any handling are quoted on top and confirmed before you agree. Prices change
        each month; see <Link className="underline" href="/lpg-price-in-pakistan/history/">the price history</Link> for earlier months.
      </P>
    </>
  );
}

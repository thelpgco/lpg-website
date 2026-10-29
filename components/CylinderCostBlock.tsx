import { Note, P } from "@/components/PageShell";
import SpecTable from "@/components/SpecTable";
import { terms } from "@/lib/commercial";
import { isDemo } from "@/lib/mode";
import { cylinderByGasKg, cylinders, deliveryFeeLabel, gasCostLabel, shellCostLabel, type CylinderProduct } from "@/lib/products";
import { latestPrice, pkr } from "@/lib/prices";

/** Spec rows for a cylinder. Demo shows approximate DEMO dimensions; production never invents them. */
export function cylinderSpecRows(c: CylinderProduct | undefined): React.ReactNode[][] {
  if (!c) return [];
  const rows: React.ReactNode[][] = [
    ["Product", c.name],
    ["Gas weight", `${c.gasKg} kg of LPG when filled`],
    ["Type", c.type === "composite" ? "Composite (fibre) body with polymer liner" : "Steel"],
    ["Typical use", c.typicalUse],
  ];
  if (c.valve) rows.push(["Valve and regulator", c.valve]);
  if (isDemo() && c.tareKgApprox != null) {
    rows.push(["Empty weight (approx.)", `About ${c.tareKgApprox} kg`]);
    if (c.heightMmApprox != null && c.diameterMmApprox != null) {
      rows.push(["Height x diameter (approx.)", `About ${c.heightMmApprox} mm x ${c.diameterMmApprox} mm`]);
    }
  } else {
    rows.push(["Empty weight and size", "Printed on the cylinder label; we state the exact figure for your cylinder when you order"]);
  }
  rows.push(["Certification", "Look for the stamped or printed certification markings on the shoulder or label"]);
  return rows;
}

/**
 * All sizes in one table. Demo: DEMO deposit / new-empty / delivery figures. Production: "quoted before you agree"
 * plus the owner-confirmed commercial terms.
 */
export function AllCylindersCostTable({
  columns = "full",
  showTerms = true,
}: {
  columns?: "full" | "shell";
  showTerms?: boolean;
}) {
  const demo = isDemo();
  const list = cylinders();
  const head = columns === "shell" ? ["Cylinder", "Deposit", "New empty"] : ["Cylinder", "Gas (notified)", "Deposit", "New empty", "Delivery"];
  const rows = list.map((c) => {
    const base: React.ReactNode[] = [c.name];
    if (columns === "full") base.push(gasCostLabel(c.gasKg) ?? "Kg x OGRA price per kg");
    base.push(shellCostLabel(c, "deposit"), shellCostLabel(c, "newEmpty"));
    if (columns === "full") base.push(deliveryFeeLabel(c));
    return base;
  });
  return (
    <>
      <Note title="Quoted before you agree" tone="info">
        <p>
          {demo
            ? "Figures below show a typical quote layout for your size. Final deposit, new-empty and delivery amounts are confirmed for your city before you agree."
            : "Deposit, new-empty and delivery amounts are quoted for your size, city and address before you agree."}
        </p>
      </Note>
      <SpecTable head={head} rows={rows} />
      {!demo && showTerms && (
        <>
          <P>
            <strong>Deposit:</strong> {terms.deposit}
          </P>
          <P>
            <strong>New empty cylinders:</strong> {terms.newEmpty}
          </P>
          <P>
            <strong>Delivery:</strong> {terms.delivery}
          </P>
        </>
      )}
    </>
  );
}

/** Gas + shell + delivery breakdown for one cylinder size, with the demo/production wording rules. */
export default function CylinderCostBlock({ kg }: { kg: number }) {
  const c = cylinderByGasKg(kg);
  const gas = gasCostLabel(kg);
  const demo = isDemo();

  const gasCell = gas
    ? `${gas} (${kg} kg x ${pkr(latestPrice?.perKgPkr ?? 0)}/kg notified)`
    : `${kg} kg x OGRA notified price per kg (worked figure appears once a verified notification is on file)`;

  const rows: React.ReactNode[][] = [["Gas", gasCell]];
  if (c) {
    rows.push(["Cylinder deposit", shellCostLabel(c, "deposit")]);
    rows.push(["New empty cylinder", shellCostLabel(c, "newEmpty")]);
    rows.push(["Delivery", deliveryFeeLabel(c)]);
  } else {
    rows.push(["Cylinder shell", "Quoted for your size and city before you agree"]);
    rows.push(["Delivery", "Confirmed with the distributor for your area before you agree"]);
  }

  return (
    <>
      <Note title="Quoted before you agree" tone="info">
        <p>
          {demo
            ? "The breakdown below shows how a full quote is structured. Final amounts for your size and city are confirmed before you agree."
            : "Each part is quoted for your size, city and address before you agree, and the commercial terms below apply."}
        </p>
      </Note>
      <SpecTable head={["Part of the bill", "Amount or basis"]} rows={rows} />
      {!demo && (
        <>
          <P>
            <strong>Deposit:</strong> {terms.deposit}
          </P>
          <P>
            <strong>Exchange:</strong> {terms.exchange}
          </P>
          <P>
            <strong>New empty cylinders:</strong> {terms.newEmpty}
          </P>
          <P>
            <strong>Delivery:</strong> {terms.delivery}
          </P>
        </>
      )}
    </>
  );
}

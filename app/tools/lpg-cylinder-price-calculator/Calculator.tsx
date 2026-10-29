"use client";

import { useMemo, useState } from "react";
import { CalcBox, Disclaimer, field, fmt, Hint, num, Result, rs } from "@/components/r4plus/calc-ui";

const SIZES = [
  { kg: 5, label: "5 kg" },
  { kg: 11.8, label: "11.8 kg (domestic)" },
  { kg: 15, label: "15 kg" },
  { kg: 45.4, label: "45.4 kg (commercial)" },
  { kg: 0, label: "Other size (enter kg)" },
];

export default function Calculator({ perKgPkr, effectiveFrom }: { perKgPkr?: number; effectiveFrom?: string }) {
  const [size, setSize] = useState(11.8);
  const [custom, setCustom] = useState(20);
  const [qty, setQty] = useState(1);
  const [rate, setRate] = useState<number>(perKgPkr ?? 0);
  const [delivery, setDelivery] = useState(0);
  const [deposit, setDeposit] = useState(0);

  const r = useMemo(() => {
    const kg = size === 0 ? custom : size;
    if (!(kg > 0) || !(qty > 0) || !(rate > 0)) return null;
    const perCyl = kg * rate;
    const gas = perCyl * qty;
    const total = gas + Math.max(delivery, 0) + Math.max(deposit, 0) * qty;
    return { kg, perCyl, gas, total };
  }, [size, custom, qty, rate, delivery, deposit]);

  return (
    <CalcBox title="Estimate the gas cost of a cylinder refill">
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Cylinder size (gas weight)
          <select className={field} value={size} onChange={(e) => setSize(Number(e.target.value))}>
            {SIZES.map((s) => (
              <option key={s.kg} value={s.kg}>{s.label}</option>
            ))}
          </select>
        </label>
        {size === 0 ? (
          <label className="block text-sm font-medium text-ink">
            Gas weight (kg)
            <input className={field} type="number" min={1} step={0.1} value={custom} onChange={(e) => setCustom(num(e.target.value))} />
          </label>
        ) : (
          <label className="block text-sm font-medium text-ink">
            Number of cylinders
            <input className={field} type="number" min={1} step={1} value={qty} onChange={(e) => setQty(num(e.target.value))} />
          </label>
        )}
        {size === 0 && (
          <label className="block text-sm font-medium text-ink">
            Number of cylinders
            <input className={field} type="number" min={1} step={1} value={qty} onChange={(e) => setQty(num(e.target.value))} />
          </label>
        )}
        <label className="block text-sm font-medium text-ink sm:col-span-2">
          Gas rate (Rs per kg)
          <input className={field} type="number" min={0} step={0.01} value={rate || ""} onChange={(e) => setRate(num(e.target.value))} />
          <Hint>
            {perKgPkr
              ? `Pre-filled with the OGRA-notified rate we have verified${effectiveFrom ? ` (effective ${effectiveFrom})` : ""}. Change it if OGRA notifies a new rate.`
              : "We have no verified OGRA rate loaded, so enter the current notified rate per kg."}
          </Hint>
        </label>
        <label className="block text-sm font-medium text-ink">
          Delivery charge for the order (Rs, optional)
          <input className={field} type="number" min={0} step={10} value={delivery} onChange={(e) => setDelivery(num(e.target.value))} />
          <Hint>Enter the figure we confirm for your order. We do not assume one.</Hint>
        </label>
        <label className="block text-sm font-medium text-ink">
          Cylinder deposit per cylinder (Rs, optional)
          <input className={field} type="number" min={0} step={100} value={deposit} onChange={(e) => setDeposit(num(e.target.value))} />
          <Hint>Only if you take a new cylinder. Not charged on an empty-for-full exchange where eligible. Confirmed per order.</Hint>
        </label>
      </div>

      <Result>
        {r ? (
          <>
            <p className="text-sm">Gas cost for {qty} x {fmt(r.kg, 1)} kg</p>
            <p className="mt-1 text-3xl font-bold">about {rs(r.gas)}</p>
            <p className="mt-2 text-sm">
              {rs(r.perCyl)} of gas per cylinder at Rs {fmt(rate, 2)}/kg.
              {delivery > 0 || deposit > 0 ? <> With the delivery and deposit you entered, the estimated total is about {rs(r.total)}.</> : null}
            </p>
          </>
        ) : (
          <p className="text-sm">Enter the size, quantity and gas rate to see an estimate.</p>
        )}
      </Result>
      <Disclaimer>
        Estimate only: gas weight x rate per kg, plus any delivery or deposit you type in. The final total, delivery and
        deposit terms are confirmed by us before you agree.
      </Disclaimer>
    </CalcBox>
  );
}

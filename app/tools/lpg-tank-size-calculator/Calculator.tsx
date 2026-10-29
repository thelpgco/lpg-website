"use client";

import { useMemo, useState } from "react";
import { CalcBox, Disclaimer, field, fmt, Hint, num, Result } from "@/components/r4plus/calc-ui";

type UseUnit = "kgday" | "kgmonth" | "cylweek";

export default function Calculator() {
  const [useUnit, setUseUnit] = useState<UseUnit>("kgmonth");
  const [amount, setAmount] = useState(1000);
  const [interval, setIntervalDays] = useState(14);
  const [reserve, setReserve] = useState(20);
  const [fill, setFill] = useState(85);
  const [density, setDensity] = useState(0.54);

  const r = useMemo(() => {
    if (!(amount > 0) || !(interval > 0) || !(density > 0) || !(fill > 0)) return null;
    const kgPerDay =
      useUnit === "kgday" ? amount
      : useUnit === "kgmonth" ? amount / 30
      : (amount * 45.4) / 7;
    const cycleKg = kgPerDay * interval;
    const withReserve = cycleKg * (1 + Math.max(reserve, 0) / 100);
    const liquidL = withReserve / density;
    const usableFrac = Math.min(Math.max(fill, 10), 95) / 100;
    const waterL = liquidL / usableFrac;
    return { kgPerDay, cycleKg, withReserve, liquidL, waterL, cylinders: withReserve / 45.4 };
  }, [useUnit, amount, interval, reserve, fill, density]);

  return (
    <CalcBox title="Rough LPG storage tank size from your gas use">
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          How do you know your use?
          <select className={field} value={useUnit} onChange={(e) => setUseUnit(e.target.value as UseUnit)}>
            <option value="kgmonth">kg of LPG per month</option>
            <option value="kgday">kg of LPG per day</option>
            <option value="cylweek">45.4 kg cylinders per week</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Amount
          <input className={field} type="number" min={0} step="any" value={amount} onChange={(e) => setAmount(num(e.target.value))} />
        </label>
        <label className="block text-sm font-medium text-ink">
          Days between deliveries
          <input className={field} type="number" min={1} step={1} value={interval} onChange={(e) => setIntervalDays(num(e.target.value))} />
          <Hint>How long the tank should last between fills.</Hint>
        </label>
        <label className="block text-sm font-medium text-ink">
          Reserve (%)
          <input className={field} type="number" min={0} max={100} step={5} value={reserve} onChange={(e) => setReserve(num(e.target.value))} />
          <Hint>Extra stock for peak months, late delivery and not running the tank empty.</Hint>
        </label>
        <label className="block text-sm font-medium text-ink">
          Maximum fill level (%)
          <input className={field} type="number" min={50} max={95} step={1} value={fill} onChange={(e) => setFill(num(e.target.value))} />
          <Hint>Tanks are not filled to the top, to leave room for expansion. Planning value 85%; the rule that applies to your tank is set by the tank and the regulations.</Hint>
        </label>
        <label className="block text-sm font-medium text-ink">
          Liquid density (kg per litre)
          <input className={field} type="number" min={0.4} max={0.7} step={0.01} value={density} onChange={(e) => setDensity(num(e.target.value))} />
          <Hint>Planning value 0.54. See the litre to kg converter.</Hint>
        </label>
      </div>

      <Result>
        {r ? (
          <>
            <p className="text-sm">Rough storage needed between deliveries</p>
            <p className="mt-1 text-3xl font-bold">about {fmt(r.withReserve, 0)} kg of LPG</p>
            <p className="mt-2 text-sm">
              That is about {fmt(r.liquidL, 0)} litres of liquid LPG, so a tank with a water capacity of roughly{" "}
              <strong>{fmt(r.waterL, 0)} litres</strong> at {fmt(fill, 0)}% maximum fill. Use is about {fmt(r.kgPerDay, 1)} kg per day,
              and the same stock is about {fmt(r.cylinders, 1)} cylinders of 45.4 kg.
            </p>
          </>
        ) : (
          <p className="text-sm">Fill in your use, delivery interval, fill level and density.</p>
        )}
      </Result>
      <Disclaimer>
        This is not a tank design. Actual tank size, number of tanks, vaporizer capacity, safety distances, approvals and
        siting are decided by a site assessment. The figure ignores peak draw rate, ambient temperature and local rules.
        Request an engineering assessment before you buy or install a tank.
      </Disclaimer>
    </CalcBox>
  );
}

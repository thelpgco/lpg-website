"use client";

import { useMemo, useState } from "react";
import { CalcBox, Disclaimer, field, fmt, Hint, num, Result, rs } from "@/components/r4plus/calc-ui";

// Planning heating values (net). Real values vary by fuel batch and blend, so they stay editable.
const DIESEL_MJ_PER_L = 36;
const LPG_MJ_PER_KG = 46;

export default function Calculator({ perKgPkr }: { perKgPkr?: number }) {
  const [litres, setLitres] = useState(1000);
  const [dieselPrice, setDieselPrice] = useState(0);
  const [lpgRate, setLpgRate] = useState<number>(perKgPkr ?? 0);
  const [effDiesel, setEffDiesel] = useState(85);
  const [effLpg, setEffLpg] = useState(85);
  const [dMj, setDMj] = useState(DIESEL_MJ_PER_L);
  const [lMj, setLMj] = useState(LPG_MJ_PER_KG);

  const r = useMemo(() => {
    if (!(litres > 0) || !(effDiesel > 0) || !(effLpg > 0) || !(dMj > 0) || !(lMj > 0)) return null;
    const useful = litres * dMj * (effDiesel / 100); // MJ of useful heat per month
    const kg = useful / (lMj * (effLpg / 100));
    const kgPerLitre = kg / litres;
    const dieselCost = dieselPrice > 0 ? litres * dieselPrice : undefined;
    const lpgCost = lpgRate > 0 ? kg * lpgRate : undefined;
    const saving = dieselCost !== undefined && lpgCost !== undefined ? dieselCost - lpgCost : undefined;
    const breakEvenDiesel = lpgRate > 0 ? kgPerLitre * lpgRate : undefined; // diesel price at which both cost the same
    return { useful, kg, kgPerLitre, dieselCost, lpgCost, saving, breakEvenDiesel };
  }, [litres, dieselPrice, lpgRate, effDiesel, effLpg, dMj, lMj]);

  return (
    <CalcBox title="Compare monthly fuel cost: diesel and LPG">
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Diesel you use per month (litres)
          <input className={field} type="number" min={0} step={10} value={litres} onChange={(e) => setLitres(num(e.target.value))} />
        </label>
        <label className="block text-sm font-medium text-ink">
          Diesel price you pay (Rs per litre)
          <input className={field} type="number" min={0} step={0.5} value={dieselPrice || ""} onChange={(e) => setDieselPrice(num(e.target.value))} />
          <Hint>Enter your own price from your invoice. We do not assume a diesel price.</Hint>
        </label>
        <label className="block text-sm font-medium text-ink">
          LPG rate (Rs per kg)
          <input className={field} type="number" min={0} step={0.01} value={lpgRate || ""} onChange={(e) => setLpgRate(num(e.target.value))} />
          <Hint>
            {perKgPkr
              ? "Pre-filled with the OGRA-notified rate we have verified. Your quoted rate for bulk or commercial supply may differ; use the figure you are quoted."
              : "Enter the rate you are quoted. We have no verified OGRA rate loaded."}
          </Hint>
        </label>
        <div />
        <label className="block text-sm font-medium text-ink">
          Diesel appliance efficiency (%)
          <input className={field} type="number" min={30} max={100} step={1} value={effDiesel} onChange={(e) => setEffDiesel(num(e.target.value))} />
        </label>
        <label className="block text-sm font-medium text-ink">
          LPG appliance efficiency (%)
          <input className={field} type="number" min={30} max={100} step={1} value={effLpg} onChange={(e) => setEffLpg(num(e.target.value))} />
          <Hint>Planning value 85% for both. Use your equipment data if you have it.</Hint>
        </label>
        <label className="block text-sm font-medium text-ink">
          Diesel heating value (MJ per litre)
          <input className={field} type="number" min={20} max={50} step={0.5} value={dMj} onChange={(e) => setDMj(num(e.target.value))} />
        </label>
        <label className="block text-sm font-medium text-ink">
          LPG heating value (MJ per kg)
          <input className={field} type="number" min={30} max={60} step={0.5} value={lMj} onChange={(e) => setLMj(num(e.target.value))} />
        </label>
      </div>

      <Result>
        {r ? (
          <>
            <p className="text-sm">To deliver the same useful heat as {fmt(litres, 0)} litres of diesel you need about</p>
            <p className="mt-1 text-3xl font-bold">{fmt(r.kg, 0)} kg of LPG per month</p>
            <p className="mt-2 text-sm">That is about {fmt(r.kgPerLitre, 2)} kg of LPG for each litre of diesel replaced.</p>
            {r.dieselCost !== undefined && r.lpgCost !== undefined ? (
              <p className="mt-2 text-sm">
                Fuel cost: diesel about {rs(r.dieselCost)}, LPG about {rs(r.lpgCost)}.{" "}
                {r.saving! >= 0
                  ? <>On these inputs LPG would cost about <strong>{rs(r.saving!)}</strong> less per month.</>
                  : <>On these inputs LPG would cost about <strong>{rs(-r.saving!)}</strong> more per month.</>}
              </p>
            ) : (
              <p className="mt-2 text-sm">Enter your diesel price and an LPG rate to compare costs.</p>
            )}
            {r.breakEvenDiesel !== undefined ? (
              <p className="mt-2 text-sm">Both fuels cost the same at a diesel price of about {rs(r.breakEvenDiesel)} per litre on these inputs.</p>
            ) : null}
          </>
        ) : (
          <p className="text-sm">Enter litres, efficiencies and heating values greater than zero.</p>
        )}
      </Result>
      <Disclaimer>
        Fuel cost only. It excludes equipment conversion, tank or cylinder rental, deposits, delivery, maintenance and
        taxes, and it assumes the appliances give the same useful heat. Diesel used for vehicles or generators cannot
        simply be swapped for LPG. Request a written quote and an engineering assessment before you decide.
      </Disclaimer>
    </CalcBox>
  );
}

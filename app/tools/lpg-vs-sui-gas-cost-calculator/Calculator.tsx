"use client";

import { useMemo, useState } from "react";
import { CalcBox, Disclaimer, field, fmt, Hint, num, Result, rs } from "@/components/r4plus/calc-ui";

const MJ_PER_MMBTU = 1055.06;
const DEFAULT_LPG_MJ_PER_KG = 46;

export default function Calculator({ perKgPkr }: { perKgPkr?: number }) {
  const [mmbtu, setMmbtu] = useState(2);
  const [sui, setSui] = useState(0);
  const [lpgRate, setLpgRate] = useState<number>(perKgPkr ?? 0);
  const [cv, setCv] = useState(DEFAULT_LPG_MJ_PER_KG);

  const r = useMemo(() => {
    if (!(mmbtu > 0) || !(cv > 0)) return null;
    const kgPerMmbtu = MJ_PER_MMBTU / cv;
    const kg = mmbtu * kgPerMmbtu;
    const lpgCost = lpgRate > 0 ? kg * lpgRate : undefined;
    const suiCost = sui > 0 ? mmbtu * sui : undefined;
    const lpgPerMmbtu = lpgRate > 0 ? kgPerMmbtu * lpgRate : undefined;
    return { kgPerMmbtu, kg, lpgCost, suiCost, lpgPerMmbtu };
  }, [mmbtu, sui, lpgRate, cv]);

  return (
    <CalcBox title="Compare LPG with your Sui gas cost">
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Gas you use per month (MMBTU)
          <input className={field} type="number" min={0} step={0.1} value={mmbtu} onChange={(e) => setMmbtu(num(e.target.value))} />
          <Hint>Find this on your pipeline gas bill. If your bill shows only a different unit, use the MMBTU or energy line, or ask your gas company.</Hint>
        </label>
        <label className="block text-sm font-medium text-ink">
          What you pay for Sui gas (Rs per MMBTU)
          <input className={field} type="number" min={0} step={10} value={sui || ""} onChange={(e) => setSui(num(e.target.value))} />
          <Hint>Divide the total amount on your bill by the MMBTU used. We do not assume a tariff because slabs, charges and taxes differ by bill.</Hint>
        </label>
        <label className="block text-sm font-medium text-ink">
          LPG rate (Rs per kg)
          <input className={field} type="number" min={0} step={0.01} value={lpgRate || ""} onChange={(e) => setLpgRate(num(e.target.value))} />
          <Hint>
            {perKgPkr
              ? "Pre-filled with the OGRA-notified rate we have verified. Delivery and cylinder terms are not included."
              : "Enter the current rate. We have no verified OGRA rate loaded."}
          </Hint>
        </label>
        <label className="block text-sm font-medium text-ink">
          LPG heating value (MJ per kg)
          <input className={field} type="number" min={30} max={60} step={0.5} value={cv} onChange={(e) => setCv(num(e.target.value))} />
        </label>
      </div>

      <Result>
        {r ? (
          <>
            <p className="text-sm">The heat in {fmt(mmbtu, 2)} MMBTU needs about</p>
            <p className="mt-1 text-3xl font-bold">{fmt(r.kg, 1)} kg of LPG</p>
            <p className="mt-2 text-sm">
              About {fmt(r.kgPerMmbtu, 1)} kg of LPG per MMBTU. That is roughly {fmt(r.kg / 11.8, 1)} domestic 11.8 kg cylinders of gas.
            </p>
            {r.lpgCost !== undefined && r.suiCost !== undefined ? (
              <p className="mt-2 text-sm">
                Gas cost: LPG about {rs(r.lpgCost)} ({rs(r.lpgPerMmbtu!)} per MMBTU), Sui gas about {rs(r.suiCost)}.{" "}
                {r.lpgCost > r.suiCost
                  ? <>On these inputs LPG costs about <strong>{rs(r.lpgCost - r.suiCost)}</strong> more per month.</>
                  : <>On these inputs LPG costs about <strong>{rs(r.suiCost - r.lpgCost)}</strong> less per month.</>}
              </p>
            ) : r.lpgPerMmbtu !== undefined ? (
              <p className="mt-2 text-sm">LPG costs about {rs(r.lpgPerMmbtu)} per MMBTU at this rate. Enter your Sui gas price per MMBTU to compare.</p>
            ) : (
              <p className="mt-2 text-sm">Enter an LPG rate and your Sui gas price per MMBTU to compare costs.</p>
            )}
          </>
        ) : (
          <p className="text-sm">Enter your monthly MMBTU and a heating value.</p>
        )}
      </Result>
      <Disclaimer>
        Estimate only. It compares the cost of gas per unit of heat and assumes the same appliance efficiency on both
        fuels. It leaves out connection and meter charges, minimum bill, deposit, delivery and appliance conversion.
        Natural gas appliances need different jets and regulators to run on LPG; do not alter them yourself.
      </Disclaimer>
    </CalcBox>
  );
}

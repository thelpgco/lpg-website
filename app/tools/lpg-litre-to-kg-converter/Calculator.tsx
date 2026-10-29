"use client";

import { useMemo, useState } from "react";
import { CalcBox, Disclaimer, field, fmt, Hint, num, Result, rs } from "@/components/r4plus/calc-ui";

// Approximate density of liquid LPG near 15 C. The real value depends on the propane/butane ratio and temperature,
// so the density stays editable.
const BLENDS = [
  { id: "propane", label: "Mostly propane", density: 0.51 },
  { id: "mix", label: "Propane-butane mix (planning value)", density: 0.54 },
  { id: "butane", label: "Mostly butane", density: 0.58 },
  { id: "custom", label: "I know my density", density: 0.54 },
] as const;

type Dir = "l2kg" | "kg2l";

export default function Calculator({ perKgPkr }: { perKgPkr?: number }) {
  const [dir, setDir] = useState<Dir>("l2kg");
  const [value, setValue] = useState(10);
  const [blend, setBlend] = useState<(typeof BLENDS)[number]["id"]>("mix");
  const [customDensity, setCustomDensity] = useState(0.54);

  const density = blend === "custom" ? customDensity : BLENDS.find((b) => b.id === blend)!.density;

  const r = useMemo(() => {
    if (!(value > 0) || !(density > 0)) return null;
    const kg = dir === "l2kg" ? value * density : value;
    const litres = dir === "l2kg" ? value : value / density;
    const perLitre = perKgPkr ? perKgPkr * density : undefined;
    return { kg, litres, perLitre, gasCost: perKgPkr ? kg * perKgPkr : undefined };
  }, [dir, value, density, perKgPkr]);

  return (
    <CalcBox title="Convert LPG litres to kg and back">
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Direction
          <select className={field} value={dir} onChange={(e) => setDir(e.target.value as Dir)}>
            <option value="l2kg">Litres to kg</option>
            <option value="kg2l">Kg to litres</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          {dir === "l2kg" ? "Litres of liquid LPG" : "Kilograms of LPG"}
          <input className={field} type="number" min={0} step={0.1} value={value} onChange={(e) => setValue(num(e.target.value))} />
        </label>
        <label className="block text-sm font-medium text-ink">
          LPG blend
          <select className={field} value={blend} onChange={(e) => setBlend(e.target.value as typeof blend)}>
            {BLENDS.map((b) => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Density used (kg per litre)
          <input
            className={field}
            type="number"
            min={0.4}
            max={0.7}
            step={0.01}
            value={density}
            disabled={blend !== "custom"}
            onChange={(e) => setCustomDensity(num(e.target.value))}
          />
          <Hint>
            Liquid LPG is lighter than water. Typical values are about 0.51 for propane and 0.58 for butane at around
            15 C. These are approximations, not a lab measurement.
          </Hint>
        </label>
      </div>

      <Result>
        {r ? (
          <>
            <p className="text-sm">{dir === "l2kg" ? `${fmt(value, 2)} litres of LPG is about` : `${fmt(value, 2)} kg of LPG is about`}</p>
            <p className="mt-1 text-3xl font-bold">
              {dir === "l2kg" ? `${fmt(r.kg, 2)} kg` : `${fmt(r.litres, 2)} litres`}
            </p>
            <p className="mt-2 text-sm">
              At a density of {fmt(density, 2)} kg/L.
              {r.perLitre ? (
                <> At the OGRA rate of Rs {fmt(perKgPkr!, 2)}/kg that is about {rs(r.perLitre)} per litre of gas, and {fmt(r.kg, 2)} kg of gas costs about {rs(r.gasCost!)} (gas only).</>
              ) : null}
            </p>
          </>
        ) : (
          <p className="text-sm">Enter an amount greater than zero.</p>
        )}
      </Result>
      <Disclaimer>
        Estimate only. LPG is sold by weight in Pakistan, so use kg when you compare prices. Litre figures change with
        the propane-butane ratio and temperature. Never fill a cylinder yourself; cylinders are filled below full to leave
        room for the gas to expand.
      </Disclaimer>
    </CalcBox>
  );
}

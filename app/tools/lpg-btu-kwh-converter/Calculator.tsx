"use client";

import { useMemo, useState } from "react";
import { CalcBox, Disclaimer, field, fmt, Hint, num, Result } from "@/components/r4plus/calc-ui";

const J_PER_BTU = 1055.06;
const J_PER_KWH = 3.6e6;
const J_PER_MJ = 1e6;

// Net (lower) heating value of LPG used as a planning figure; real value depends on the propane/butane mix.
const DEFAULT_MJ_PER_KG = 46;

type UnitId = "kg" | "mj" | "kwh" | "btu" | "mmbtu";

const UNITS: { id: UnitId; label: string }[] = [
  { id: "kg", label: "kg of LPG" },
  { id: "mj", label: "MJ (megajoule)" },
  { id: "kwh", label: "kWh" },
  { id: "btu", label: "BTU" },
  { id: "mmbtu", label: "MMBTU (million BTU)" },
];

export default function Calculator() {
  const [value, setValue] = useState(1);
  const [unit, setUnit] = useState<UnitId>("kg");
  const [cv, setCv] = useState(DEFAULT_MJ_PER_KG);

  // burner section
  const [ratingUnit, setRatingUnit] = useState<"kw" | "btuh">("kw");
  const [rating, setRating] = useState(3);
  const [hours, setHours] = useState(2);

  const r = useMemo(() => {
    if (!(value > 0) || !(cv > 0)) return null;
    const jPerKg = cv * J_PER_MJ;
    const joules =
      unit === "kg" ? value * jPerKg
      : unit === "mj" ? value * J_PER_MJ
      : unit === "kwh" ? value * J_PER_KWH
      : unit === "btu" ? value * J_PER_BTU
      : value * J_PER_BTU * 1e6;
    return {
      kg: joules / jPerKg,
      mj: joules / J_PER_MJ,
      kwh: joules / J_PER_KWH,
      btu: joules / J_PER_BTU,
      mmbtu: joules / J_PER_BTU / 1e6,
    };
  }, [value, unit, cv]);

  const burner = useMemo(() => {
    if (!(rating > 0) || !(hours > 0) || !(cv > 0)) return null;
    const kw = ratingUnit === "kw" ? rating : (rating * J_PER_BTU) / 3600 / 1000;
    const kwh = kw * hours;
    const kg = (kwh * J_PER_KWH) / (cv * J_PER_MJ);
    return { kw, kwh, kg, perHour: kg / hours };
  }, [rating, ratingUnit, hours, cv]);

  return (
    <CalcBox title="Convert LPG energy: kg, MJ, kWh, BTU and MMBTU">
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Amount
          <input className={field} type="number" min={0} step="any" value={value} onChange={(e) => setValue(num(e.target.value))} />
        </label>
        <label className="block text-sm font-medium text-ink">
          Unit
          <select className={field} value={unit} onChange={(e) => setUnit(e.target.value as UnitId)}>
            {UNITS.map((u) => (
              <option key={u.id} value={u.id}>{u.label}</option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-ink sm:col-span-2">
          Heating value of LPG (MJ per kg)
          <input className={field} type="number" min={30} max={60} step={0.5} value={cv} onChange={(e) => setCv(num(e.target.value))} />
          <Hint>
            Planning value of {DEFAULT_MJ_PER_KG} MJ/kg (net). The real figure depends on the propane-butane ratio. The
            same value is used on our LPG vs Sui gas page.
          </Hint>
        </label>
      </div>

      <Result>
        {r ? (
          <>
            <p className="text-sm">
              {fmt(value, 4)} {UNITS.find((u) => u.id === unit)!.label} equals about
            </p>
            <dl className="mt-2 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
              <div><dt className="inline">LPG: </dt><dd className="inline font-bold">{fmt(r.kg, 3)} kg</dd></div>
              <div><dt className="inline">Energy: </dt><dd className="inline font-bold">{fmt(r.mj, 2)} MJ</dd></div>
              <div><dt className="inline">Electric units: </dt><dd className="inline font-bold">{fmt(r.kwh, 2)} kWh</dd></div>
              <div><dt className="inline">British units: </dt><dd className="inline font-bold">{fmt(r.btu, 0)} BTU</dd></div>
              <div className="sm:col-span-2"><dt className="inline">Gas-bill units: </dt><dd className="inline font-bold">{fmt(r.mmbtu, 5)} MMBTU</dd></div>
            </dl>
          </>
        ) : (
          <p className="text-sm">Enter an amount and a heating value greater than zero.</p>
        )}
      </Result>

      <h3 className="mt-8 text-lg font-bold text-ink">How much LPG does a burner use?</h3>
      <div className="mt-3 grid gap-4 sm:grid-cols-3">
        <label className="block text-sm font-medium text-ink">
          Burner rating
          <input className={field} type="number" min={0} step="any" value={rating} onChange={(e) => setRating(num(e.target.value))} />
        </label>
        <label className="block text-sm font-medium text-ink">
          Rating unit
          <select className={field} value={ratingUnit} onChange={(e) => setRatingUnit(e.target.value as "kw" | "btuh")}>
            <option value="kw">kW (heat input)</option>
            <option value="btuh">BTU per hour</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-ink">
          Hours at full flame
          <input className={field} type="number" min={0} step={0.5} value={hours} onChange={(e) => setHours(num(e.target.value))} />
        </label>
      </div>
      <Result>
        {burner ? (
          <p className="text-sm">
            A {fmt(burner.kw, 2)} kW burner for {fmt(hours, 1)} h at full flame uses about{" "}
            <strong>{fmt(burner.kg, 2)} kg</strong> of LPG ({fmt(burner.perHour, 2)} kg per hour; {fmt(burner.kwh, 1)} kWh of heat).
            Real use is lower if the flame is turned down.
          </p>
        ) : (
          <p className="text-sm">Enter a rating and hours greater than zero.</p>
        )}
      </Result>
      <Disclaimer>
        Estimate only. This converts energy units using the heating value above. It does not include appliance efficiency,
        flame setting or heat losses, and it is not a safety or sizing check. Use the burner&apos;s rated heat input, not
        its electrical or other rating.
      </Disclaimer>
    </CalcBox>
  );
}

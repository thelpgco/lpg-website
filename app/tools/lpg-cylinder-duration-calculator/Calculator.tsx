"use client";

import { useMemo, useState } from "react";

const SIZES = [
  { kg: 5, label: "5 kg" },
  { kg: 11.8, label: "11.8 kg (domestic)" },
  { kg: 15, label: "15 kg" },
  { kg: 45.4, label: "45.4 kg (commercial)" },
];

// Rough planning burn rate for one standard burner on a medium-high flame. Real use varies with the burner,
// flame setting, pot size and appliance, so the field stays editable.
const DEFAULT_KG_PER_BURNER_HOUR = 0.25;

type Mode = "hours" | "rate";

const field =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-ink focus:border-sky-500 focus:outline-none";

export default function Calculator({ perKgPkr }: { perKgPkr?: number }) {
  const [kg, setKg] = useState(11.8);
  const [mode, setMode] = useState<Mode>("hours");
  const [hours, setHours] = useState(3);
  const [burners, setBurners] = useState(1);
  const [burnRate, setBurnRate] = useState(DEFAULT_KG_PER_BURNER_HOUR);
  const [kgPerDay, setKgPerDay] = useState(0.8);
  const [reserve, setReserve] = useState(10);

  const result = useMemo(() => {
    const perDay = mode === "hours" ? hours * burners * burnRate : kgPerDay;
    if (!isFinite(perDay) || perDay <= 0) return null;
    const usable = kg * (1 - Math.min(Math.max(reserve, 0), 50) / 100);
    const days = usable / perDay;
    const dailyCost = perKgPkr ? perDay * perKgPkr : undefined;
    return { perDay, usable, days, dailyCost };
  }, [kg, mode, hours, burners, burnRate, kgPerDay, reserve, perKgPkr]);

  const num = (v: string) => (v === "" ? 0 : Number(v));

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-xl font-bold text-ink">Estimate your cylinder duration</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Cylinder size (gas weight)
          <select className={field} value={kg} onChange={(e) => setKg(Number(e.target.value))}>
            {SIZES.map((s) => (
              <option key={s.kg} value={s.kg}>
                {s.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-medium text-ink">
          How do you want to estimate use?
          <select className={field} value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
            <option value="hours">By burner hours per day</option>
            <option value="rate">I know my kg per day</option>
          </select>
        </label>

        {mode === "hours" ? (
          <>
            <label className="block text-sm font-medium text-ink">
              Total cooking hours per day
              <input
                className={field}
                type="number"
                min={0}
                step={0.5}
                value={hours}
                onChange={(e) => setHours(num(e.target.value))}
              />
            </label>
            <label className="block text-sm font-medium text-ink">
              Burners usually on at once
              <input
                className={field}
                type="number"
                min={1}
                max={12}
                step={1}
                value={burners}
                onChange={(e) => setBurners(num(e.target.value))}
              />
            </label>
            <label className="block text-sm font-medium text-ink sm:col-span-2">
              Gas used per burner per hour (kg) — rough planning value
              <input
                className={field}
                type="number"
                min={0.05}
                step={0.05}
                value={burnRate}
                onChange={(e) => setBurnRate(num(e.target.value))}
              />
              <span className="mt-1 block text-xs font-normal text-ink-500">
                Default {DEFAULT_KG_PER_BURNER_HOUR} kg per hour is an assumption for one burner. Geysers, heaters and
                large commercial burners use more; enter your own figure if you know it.
              </span>
            </label>
          </>
        ) : (
          <label className="block text-sm font-medium text-ink sm:col-span-2">
            Gas used per day (kg)
            <input
              className={field}
              type="number"
              min={0.05}
              step={0.05}
              value={kgPerDay}
              onChange={(e) => setKgPerDay(num(e.target.value))}
            />
            <span className="mt-1 block text-xs font-normal text-ink-500">
              If your last cylinder lasted N days, divide its gas weight by N to get kg per day.
            </span>
          </label>
        )}

        <label className="block text-sm font-medium text-ink sm:col-span-2">
          Reserve you keep unused (%)
          <input
            className={field}
            type="number"
            min={0}
            max={50}
            step={5}
            value={reserve}
            onChange={(e) => setReserve(num(e.target.value))}
          />
          <span className="mt-1 block text-xs font-normal text-ink-500">
            Flames weaken before the cylinder is perfectly empty, so a small reserve makes the estimate more realistic.
          </span>
        </label>
      </div>

      <div className="mt-6 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sky-900" role="status" aria-live="polite">
        {result ? (
          <>
            <p className="text-sm">Rough estimate for a {kg} kg cylinder</p>
            <p className="mt-1 text-3xl font-bold">
              about {result.days >= 10 ? Math.round(result.days) : result.days.toFixed(1)} days
            </p>
            <p className="mt-2 text-sm">
              Using about {result.perDay.toFixed(2)} kg of gas per day and roughly {result.usable.toFixed(1)} kg usable
              gas.
              {result.dailyCost !== undefined && perKgPkr ? (
                <>
                  {" "}
                  At the OGRA rate of Rs {perKgPkr.toLocaleString("en-PK")}/kg that is about Rs{" "}
                  {Math.round(result.dailyCost).toLocaleString("en-PK")} of gas per day (gas only; excludes deposit
                  and delivery).
                </>
              ) : null}
            </p>
          </>
        ) : (
          <p className="text-sm">Enter your daily use above to see an estimate.</p>
        )}
      </div>

      <p className="mt-3 text-xs text-ink-500">
        This is an estimate for planning only. Actual duration depends on your burners, flame setting, appliances, pot
        size and the cylinder fill. It is not a measurement and is not a safety check.
      </p>
    </div>
  );
}

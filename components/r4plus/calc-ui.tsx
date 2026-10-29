// Small presentational helpers shared by the R6 calculators (no state; safe to import from client components).

export const field =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-ink focus:border-sky-500 focus:outline-none";

export const num = (v: string) => (v === "" ? 0 : Number(v));

export const fmt = (n: number, digits = 0) =>
  n.toLocaleString("en-PK", { minimumFractionDigits: digits, maximumFractionDigits: digits });

export const rs = (n: number) => `Rs ${fmt(Math.round(n))}`;

export function CalcBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      {children}
    </div>
  );
}

export function Result({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-lg border border-sky-200 bg-sky-50 p-4 text-sky-900" role="status" aria-live="polite">
      {children}
    </div>
  );
}

export function Disclaimer({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-xs text-ink-500">{children}</p>;
}

export function Hint({ children }: { children: React.ReactNode }) {
  return <span className="mt-1 block text-xs font-normal text-ink-500">{children}</span>;
}

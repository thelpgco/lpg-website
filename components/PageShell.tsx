import Breadcrumbs from "./Breadcrumbs";

type Crumb = { name: string; href: string };

// Standard page layout: breadcrumbs, H1, intro, body column and an optional sticky aside (usually the lead form).
export default function PageShell({
  crumbs,
  h1,
  intro,
  children,
  aside,
  wide = false,
}: {
  crumbs: Crumb[];
  h1: string;
  intro?: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Breadcrumbs items={crumbs} />
      <div className={`mt-6 ${aside ? "grid gap-10 lg:grid-cols-[1fr_380px]" : wide ? "" : "max-w-3xl"}`}>
        <article>
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{h1}</h1>
          {intro && <p className="mt-4 text-lg text-ink-700">{intro}</p>}
          <div className="mt-6">{children}</div>
        </article>
        {aside && <aside className="lg:sticky lg:top-24 lg:self-start">{aside}</aside>}
      </div>
    </div>
  );
}

export function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 text-2xl font-bold text-ink">{children}</h2>;
}

export function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-ink-700">{children}</p>;
}

export function UL({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-3 list-disc space-y-1 pl-6 text-ink-700">
      {items.map((i, n) => (
        <li key={n}>{i}</li>
      ))}
    </ul>
  );
}

export function Note({ title, children, tone = "info" }: { title?: string; children: React.ReactNode; tone?: "info" | "warn" | "danger" }) {
  const tones = {
    info: "border-sky-200 bg-sky-50 text-sky-900",
    warn: "border-amber-200 bg-amber-50 text-amber-900",
    danger: "border-red-200 bg-red-50 text-red-900",
  } as const;
  return (
    <div className={`mt-6 rounded-xl border p-4 ${tones[tone]}`}>
      {title && <p className="font-semibold">{title}</p>}
      <div className={title ? "mt-1" : ""}>{children}</div>
    </div>
  );
}

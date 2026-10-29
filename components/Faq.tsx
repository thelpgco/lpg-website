import JsonLd from "./JsonLd";

export default function Faq({ items, title = "Frequently asked questions" }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section aria-labelledby="faq-title" className="mt-12">
      <h2 id="faq-title" className="text-2xl font-bold text-ink">{title}</h2>
      <div className="mt-4 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
        {items.map((f) => (
          <details key={f.q} className="group p-4">
            <summary className="cursor-pointer font-medium text-ink">{f.q}</summary>
            <p className="mt-2 text-ink-700">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </section>
  );
}

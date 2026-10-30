import Link from "next/link";
import JsonLd from "./JsonLd";
import type { HubItem } from "@/lib/hubs";
import { absoluteUrl } from "@/lib/site";

// A list of hub links with one-line blurbs, plus ItemList markup naming the same pages in the same order.
export default function HubList({ items, name }: { items: HubItem[]; name: string }) {
  return (
    <>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.href} className="rounded-xl border border-slate-200 bg-white p-4">
            <Link href={it.href} className="font-semibold text-ink hover:text-flame-700 hover:underline">
              {it.label}
            </Link>
            <p className="mt-1 text-sm text-ink-700">{it.blurb}</p>
          </li>
        ))}
      </ul>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name,
          itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.label, url: absoluteUrl(it.href) })),
        }}
      />
    </>
  );
}

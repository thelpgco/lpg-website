import type { Metadata } from "next";
import metaRaw from "@/data/meta.json";
import { isPublished } from "./pages";
import { site, absoluteUrl } from "./site";

type MetaEntry = { title: string; description: string };
const table = metaRaw as Record<string, MetaEntry>;

type Opts = {
  path: string;          // with leading and trailing slash, e.g. "/lpg-price-in-pakistan/"
  title?: string;        // if omitted, read from data/meta.json (titles 50-60 chars, descriptions 140-160)
  description?: string;
  /** Data gate (verified price, verified city, real project). A page is indexable only if this is true AND
   *  the page is "published" in data/pages.json. */
  index?: boolean;
};

export function meta({ path, title, description, index = true }: Opts): Metadata {
  const entry = table[path];
  const t = title ?? entry?.title;
  const d = description ?? entry?.description;
  if (!t || !d) throw new Error(`No title/description for ${path}: add it to data/meta.json`);
  const indexable = index && isPublished(path);
  return {
    title: { absolute: t },
    description: d,
    alternates: { canonical: path },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_PK",
      title: t,
      description: d,
      url: absoluteUrl(path),
      // A page-level openGraph replaces the layout's, so the default card is named here (app/opengraph-image.tsx).
      images: [{ url: absoluteUrl("/opengraph-image/"), width: 1200, height: 630, alt: `${site.name}: LPG cylinders, gas supply and engineering` }],
    },
    twitter: { card: "summary_large_image", title: t, description: d, images: [absoluteUrl("/opengraph-image/")] },
  };
}

/** Picks the first candidate whose length is within [min, max]; falls back to the closest one. */
export function fit(candidates: string[], min: number, max: number): string {
  const ok = candidates.find((c) => c.length >= min && c.length <= max);
  if (ok) return ok;
  return [...candidates].sort((a, b) => Math.abs(a.length - (min + max) / 2) - Math.abs(b.length - (min + max) / 2))[0];
}

export const fitTitle = (c: string[]) => fit(c, 50, 60);
export const fitDescription = (c: string[]) => fit(c, 140, 160);

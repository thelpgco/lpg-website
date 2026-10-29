import pagesRaw from "@/data/pages.json";

// Page registry (data/pages.json, built by docs/seo-plan/scripts/20_build_page_registry.py).
// Method Step 22.3: a page is published only after the checks pass AND a person approves it.
//   draft -> review -> approved -> published
// Only "published" pages are indexable and listed in the sitemap. Everything else is noindex.
export type PageStatus = "draft" | "review" | "approved" | "published";

type Entry = { id: string; type: string; phase: string; status: PageStatus; built: boolean; lastmod?: string };
const registry = pagesRaw as unknown as Record<string, Entry>;

export function pageEntry(path: string): Entry | undefined {
  return registry[path];
}

export function pageId(path: string): string {
  return registry[path]?.id ?? "";
}

export function statusOf(path: string): PageStatus {
  return registry[path]?.status ?? "draft";
}

export function isPublished(path: string): boolean {
  return statusOf(path) === "published";
}

export function lastmodOf(path: string): string | undefined {
  return registry[path]?.lastmod;
}

export function builtPaths(): string[] {
  return Object.keys(registry).filter((p) => registry[p].built);
}

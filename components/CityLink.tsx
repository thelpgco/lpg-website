import Link from "next/link";
import { hubSlugs, provinceList, staticCityHubSlugs } from "@/lib/network";

const pages = new Set<string>([...staticCityHubSlugs, ...hubSlugs, ...provinceList.map((p) => p.slug)]);

/** True when /lpg-in-{slug}/ is a real page (static city hub, dynamic hub or province hub). */
export const hasCityPage = (slug?: string) => Boolean(slug && pages.has(slug));

/** Links to the town's page only when it exists; otherwise renders the name as plain text (no 404 links). */
export default function CityLink({ slug, className, children }: { slug?: string; className?: string; children: React.ReactNode }) {
  if (!hasCityPage(slug)) return <span className={className?.replace(/\bunderline\b/, "").trim() || undefined}>{children}</span>;
  return (
    <Link className={className} href={`/lpg-in-${slug}/`}>
      {children}
    </Link>
  );
}

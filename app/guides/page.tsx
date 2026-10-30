import Link from "next/link";
import HubList from "@/components/HubList";
import JsonLd from "@/components/JsonLd";
import PageShell, { H2, P } from "@/components/PageShell";
import { guideGroups } from "@/lib/hubs";
import { meta } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

const path = "/guides/";
export const metadata = meta({ path });

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Guides", href: path }]}
      h1="LPG guides for Pakistan: prices, safety, cylinders and supply"
      intro={`Every guide ${site.shortName} publishes, grouped by topic. They are written for Pakistani homes and businesses, checked against OGRA notices, and safety pages are reviewed by our in-house safety team before they go live.`}
      wide
    >
      <nav aria-label="Topics" className="flex flex-wrap gap-2">
        {guideGroups.map((g) => (
          <a key={g.title} href={`#${g.title.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="rounded-full border border-slate-300 px-3 py-1 text-sm text-ink-700 hover:border-flame">
            {g.title}
          </a>
        ))}
      </nav>
      {guideGroups.map((g) => (
        <section key={g.title} id={g.title.toLowerCase().replace(/[^a-z]+/g, "-")}>
          <H2>{g.title}</H2>
          <HubList items={g.items} name={`${g.title}: LPG guides`} />
        </section>
      ))}
      <H2>Calculators</H2>
      <P>
        Work out cylinder cost, how long a cylinder lasts and LPG against Sui gas or diesel with our{" "}
        <Link className="underline" href="/tools/">LPG calculators</Link>. Ready to order?{" "}
        <Link className="underline" href="/order-lpg/">Order LPG</Link> or see{" "}
        <Link className="underline" href="/lpg-in-islamabad/">LPG delivery in Islamabad</Link>.
      </P>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "LPG guides for Pakistan",
          url: absoluteUrl(path),
          inLanguage: site.locale,
          publisher: { "@id": absoluteUrl("/#organization") },
        }}
      />
    </PageShell>
  );
}

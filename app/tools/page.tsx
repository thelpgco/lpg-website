import Link from "next/link";
import HubList from "@/components/HubList";
import JsonLd from "@/components/JsonLd";
import PageShell, { H2, P } from "@/components/PageShell";
import { toolItems } from "@/lib/hubs";
import { meta } from "@/lib/seo";
import { absoluteUrl, site } from "@/lib/site";

const path = "/tools/";
export const metadata = meta({ path });

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Tools", href: path }]}
      h1="LPG calculators: cylinder price, duration, cost and conversions"
      intro="Free LPG calculators for Pakistan. Prices use the current OGRA-notified rate per kg; the results are estimates to plan with, and the final price for your order is always confirmed before you agree."
      wide
    >
      <H2>All calculators</H2>
      <HubList items={toolItems} name="LPG calculators" />
      <H2>Next steps</H2>
      <P>
        Background on prices and sizes: <Link className="underline" href="/guides/">LPG guides</Link>. To order a cylinder, call or
        WhatsApp {site.phoneDisplay} or use <Link className="underline" href="/order-lpg/">Order LPG</Link>.
      </P>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "LPG calculators",
          url: absoluteUrl(path),
          inLanguage: site.locale,
          publisher: { "@id": absoluteUrl("/#organization") },
        }}
      />
    </PageShell>
  );
}

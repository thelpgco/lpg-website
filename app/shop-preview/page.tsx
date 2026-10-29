import Link from "next/link";
import ImageGallery from "@/components/ImageGallery";
import PageShell, { H2, P } from "@/components/PageShell";
import { itemsFor } from "@/lib/media";
import { meta } from "@/lib/seo";

export const metadata = meta({
  path: "/shop-preview/",
  title: "LPG Appliance Gallery | Stove, Geyser, Heater",
  description:
    "Photos of LPG stoves, geysers, heaters and hose kits from THE LPG CO. PAKISTAN. Stock and prices are confirmed when you order.",
  index: false,
});

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Appliance gallery", href: "/shop-preview/" }]}
      h1="LPG stove, geyser and heater gallery"
      intro="Product photos for LPG appliances and accessories. Confirm model, stock and price when you order."
    >
      <P>
        See also{" "}
        <Link className="underline" href="/shop/">
          shop
        </Link>
        ,{" "}
        <Link className="underline" href="/lpg-cylinders/">
          LPG cylinders
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/order-lpg/">
          order LPG
        </Link>
        .
      </P>
      <H2>LPG appliances and accessories</H2>
      <ImageGallery items={itemsFor("/shop-preview/")} columns={2} />
    </PageShell>
  );
}

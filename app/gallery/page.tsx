import ImageGallery from "@/components/ImageGallery";
import PageShell, { P } from "@/components/PageShell";
import { allMedia } from "@/lib/media";
import { meta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = meta({
  path: "/gallery/",
  title: `LPG Photo Gallery | ${site.shortName}`,
  description: `Photos from ${site.name}: LPG cylinders, home delivery, office, appliances and engineering across Pakistan.`,
  index: false,
});

export default function Page() {
  return (
    <PageShell
      crumbs={[{ name: "Gallery", href: "/gallery/" }]}
      h1="LPG photo gallery"
      intro={`${site.shortName} gallery: cylinders, home delivery, office, appliances and engineering — ${allMedia.length} images from the site library.`}
      wide
    >
      <P>
        Browse by topic on the main pages too — price, cylinders, delivery, about and services each use matching photos.
      </P>
      <ImageGallery items={allMedia} columns={3} />
    </PageShell>
  );
}

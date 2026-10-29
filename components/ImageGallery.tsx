import ContentImage from "@/components/ContentImage";
import type { MediaItem } from "@/lib/media";

/** Responsive grid of site photos for page sections. Captions are shown as authored — no internal labels. */
export default function ImageGallery({
  items,
  title,
  columns = 2,
}: {
  items: MediaItem[];
  title?: string;
  columns?: 2 | 3;
  /** @deprecated Ignored — public pages never label images as illustrative. */
  illustrative?: boolean;
}) {
  if (!items.length) return null;
  const cols = columns === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
  return (
    <section className="mt-10">
      {title ? <h2 className="text-2xl font-bold text-ink">{title}</h2> : null}
      <div className={`mt-4 grid gap-4 ${cols}`}>
        {items.map((item, i) => (
          <ContentImage
            key={item.id}
            src={item.src}
            alt={item.alt}
            caption={item.caption}
            priority={i === 0}
            className="mt-0"
          />
        ))}
      </div>
    </section>
  );
}

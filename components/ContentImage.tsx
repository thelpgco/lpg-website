import Image from "next/image";

/** Page body image with caption. Prefer status=use assets from /public/images. */
export default function ContentImage({
  src,
  alt,
  caption,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  priority?: boolean;
  className?: string;
}) {
  const finalCaption = caption?.replace(/\s*\(illustrative\)\.?/gi, "").trim() || undefined;
  return (
    <figure className={`mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={800}
        className="h-auto w-full object-cover"
        priority={priority}
        sizes="(max-width: 768px) 100vw, 720px"
      />
      {finalCaption ? <figcaption className="px-3 py-2 text-sm text-ink-500">{finalCaption}</figcaption> : null}
    </figure>
  );
}

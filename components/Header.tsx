import Image from "next/image";
import Link from "next/link";
import TrackedLink from "./TrackedLink";
import { site, telHref, whatsappHref } from "@/lib/site";

const nav = [
  { href: "/lpg-price-in-pakistan/", label: "LPG price" },
  { href: "/lpg-cylinders/", label: "Cylinders" },
  { href: "/lpg-home-delivery/", label: "Delivery" },
  { href: "/services/", label: "Engineering" },
  { href: "/lpg-safety/", label: "Safety" },
  { href: "/contact/", label: "Contact" },
];

export default function Header() {
  const tel = telHref();
  const wa = whatsappHref();
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex shrink-0 items-center" aria-label={`${site.name} home`}>
          <Image src="/brand/logo.webp" alt={site.name} width={136} height={60} priority className="h-10 w-auto sm:h-12" />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium text-ink-700 lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-flame-600">{n.label}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {tel && (
            <TrackedLink href={tel} event="phone_click" location="header" className="hidden rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-ink sm:inline-block">
              {site.phoneDisplay}
            </TrackedLink>
          )}
          {wa && (
            <TrackedLink href={wa} event="whatsapp_click" location="header" newTab className="hidden rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 sm:inline-block">
              WhatsApp
            </TrackedLink>
          )}
          <Link href="/order-lpg/" className="rounded-lg bg-flame px-4 py-2 text-sm font-semibold text-white hover:bg-flame-600">
            Order LPG
          </Link>
        </div>
      </div>
      <nav aria-label="Mobile" className="flex gap-4 overflow-x-auto border-t border-slate-100 px-4 py-2 text-sm text-ink-700 lg:hidden">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className="whitespace-nowrap">{n.label}</Link>
        ))}
      </nav>
    </header>
  );
}

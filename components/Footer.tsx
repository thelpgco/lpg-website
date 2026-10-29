import Link from "next/link";
import { addressLine, site } from "@/lib/site";
import { hubCities } from "@/lib/network";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-bold text-ink">{site.name}</p>
          <p className="mt-2 text-sm text-ink-500">{site.tagline}.</p>
          <p className="mt-3 text-sm text-ink-700">OGRA licence no. {site.licenceNumber}</p>
          <address className="mt-2 text-sm not-italic text-ink-700">
            {addressLine()}
            <br />
            <a href={`tel:+${site.phone}`} className="hover:underline">{site.phoneDisplay}</a>
          </address>
        </div>
        <div>
          <p className="font-semibold text-ink">LPG</p>
          <ul className="mt-2 space-y-1 text-sm text-ink-700">
            <li><Link href="/lpg-price-in-pakistan/" className="hover:underline">LPG price in Pakistan</Link></li>
            <li><Link href="/lpg-cylinder-price-in-pakistan/" className="hover:underline">LPG cylinder price</Link></li>
            <li><Link href="/lpg-cylinders/" className="hover:underline">LPG cylinders</Link></li>
            <li><Link href="/lpg-home-delivery/" className="hover:underline">LPG home delivery</Link></li>
            <li><Link href="/services/" className="hover:underline">LPG engineering services</Link></li>
            <li><Link href="/become-an-lpg-distributor/" className="hover:underline">Become a distributor</Link></li>
            <li><Link href="/what-is-lpg/" className="hover:underline">What is LPG?</Link></li>
            <li><Link href="/lpg-safety/" className="hover:underline">LPG safety</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-ink">Where we supply</p>
          <ul className="mt-2 space-y-1 text-sm text-ink-700">
            {/* Method Step 17.1: no giant footer link lists. Four wave-1 cities and one index page only. */}
            {["islamabad", "rawalpindi", "lahore", "karachi"].map((slug) => {
              const c = hubCities.find((h) => h.slug === slug);
              return c ? <li key={c.slug}><Link href={`/lpg-in-${c.slug}/`} className="hover:underline">LPG in {c.name}</Link></li> : null;
            })}
            <li><Link href="/delivery-areas/" className="hover:underline">All delivery areas</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-ink">Company</p>
          <ul className="mt-2 space-y-1 text-sm text-ink-700">
            <li><Link href="/about/" className="hover:underline">About us</Link></li>
            <li><Link href="/gallery/" className="hover:underline">Photo gallery</Link></li>
            <li><Link href="/shop-preview/" className="hover:underline">Appliances preview</Link></li>
            <li><Link href="/licences-and-compliance/" className="hover:underline">Licences and compliance</Link></li>
            <li><Link href="/how-it-works/" className="hover:underline">How it works</Link></li>
            <li><Link href="/our-network/" className="hover:underline">Our network</Link></li>
            <li><Link href="/partner-standards/" className="hover:underline">Distributor standards</Link></li>
            <li><Link href="/pricing-policy/" className="hover:underline">Pricing policy</Link></li>
            <li><Link href="/editorial-policy/" className="hover:underline">Editorial policy</Link></li>
            <li><Link href="/complaints/" className="hover:underline">Complaints</Link></li>
            <li><Link href="/contact/" className="hover:underline">Contact</Link></li>
            <li><Link href="/privacy/" className="hover:underline">Privacy</Link></li>
            <li><Link href="/terms/" className="hover:underline">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-4 text-center text-xs text-ink-500">
        &copy; {new Date().getFullYear()} {site.name}. All rights reserved. Prices change monthly; always confirm the
        current price when you order.
      </div>
    </footer>
  );
}

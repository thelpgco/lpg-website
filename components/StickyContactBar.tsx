import TrackedLink from "./TrackedLink";
import { telHref, whatsappHref } from "@/lib/site";

// Mobile-only bottom bar: one-tap call and WhatsApp (most Pakistani LPG orders happen by phone/WhatsApp).
export default function StickyContactBar() {
  const tel = telHref();
  const wa = whatsappHref();
  if (!tel && !wa) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-slate-200 bg-slate-200 sm:hidden">
      {tel && (
        <TrackedLink href={tel} event="phone_click" location="sticky_bar" className="bg-white py-3 text-center text-sm font-semibold text-ink">Call now</TrackedLink>
      )}
      {wa && (
        <TrackedLink href={wa} event="whatsapp_click" location="sticky_bar" newTab className="bg-green-600 py-3 text-center text-sm font-semibold text-white">WhatsApp</TrackedLink>
      )}
    </div>
  );
}

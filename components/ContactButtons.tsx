import TrackedLink from "./TrackedLink";
import { telHref, whatsappHref } from "@/lib/site";

export default function ContactButtons({ className = "" }: { className?: string }) {
  const tel = telHref();
  const wa = whatsappHref();
  if (!tel && !wa) return null;
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {tel && (
        <TrackedLink href={tel} event="phone_click" location="page" className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-ink hover:bg-slate-50">
          Call us
        </TrackedLink>
      )}
      {wa && (
        <TrackedLink href={wa} event="whatsapp_click" location="page" newTab className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700">
          WhatsApp
        </TrackedLink>
      )}
    </div>
  );
}

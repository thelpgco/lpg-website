"use client";

import { usePathname } from "next/navigation";
import { track } from "./track";

// A plain <a> that reports a click event (phone_click or whatsapp_click) with the page it happened on.
// These two events are the main conversion signals for a business where most orders arrive by phone and WhatsApp.
export default function TrackedLink({
  href,
  event,
  location,
  className,
  children,
  newTab = false,
}: {
  href: string;
  event: "phone_click" | "whatsapp_click";
  location: "header" | "page" | "sticky_bar" | "footer";
  className?: string;
  children: React.ReactNode;
  newTab?: boolean;
}) {
  const pathname = usePathname();
  return (
    <a
      href={href}
      className={className}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        // The first WhatsApp message names the page it came from, so the sales team can attribute it.
        // Always rebuilt from the original `href` prop (the header persists across pages).
        if (event === "whatsapp_click") {
          try {
            const u = new URL(href);
            u.searchParams.set("text", `${(u.searchParams.get("text") ?? "").trim()} (from thelpgco.pk${pathname})`);
            e.currentTarget.href = u.toString();
          } catch {
            /* leave the original link */
          }
        }
        track(event, { page_path: pathname, link_location: location });
      }}
    >
      {children}
    </a>
  );
}

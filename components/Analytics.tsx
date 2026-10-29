import Script from "next/script";

// GA4 loader. Renders nothing unless NEXT_PUBLIC_GA_ID (e.g. G-XXXXXXXXXX) is set, so local and staging builds send no data.
// Events fired elsewhere: phone_click, whatsapp_click (TrackedLink) and generate_lead (LeadForm).
// Mark generate_lead, phone_click and whatsapp_click as key events in GA4. The privacy page says analytics may be in use.
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id || !/^G-[A-Z0-9]+$/.test(id)) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}

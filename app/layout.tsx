import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import StickyContactBar from "@/components/StickyContactBar";
import Analytics from "@/components/Analytics";
import DemoBanner from "@/components/DemoBanner";
import { organizationNode, webSiteNode } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: LPG cylinders, gas supply and engineering`,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_PK",
    title: `${site.name}: LPG cylinders, gas supply and engineering`,
    description: site.description,
    url: site.url,
  },
  // No site-wide canonical or robots default here: every page sets its own through lib/seo.ts `meta()`,
  // so a page can never inherit "/" as its canonical or be indexable by accident.
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F97316",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-PK">
      <body className="pb-12 sm:pb-0">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-white focus:p-2">
          Skip to content
        </a>
        <DemoBanner />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyContactBar />
        <Analytics />
        <JsonLd data={[organizationNode(), webSiteNode()]} />
      </body>
    </html>
  );
}

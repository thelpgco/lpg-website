import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/lpg-hub/", "/management-review/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

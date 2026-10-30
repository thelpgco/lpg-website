import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const disallow = ["/api/", "/lpg-hub/", "/management-review/"];

// Search and AI-answer crawlers are named explicitly so it is unambiguous that they may read the site (and be cited).
// A named group replaces "*" for that bot, so each one repeats the same disallow list.
const namedBots = [
  "Googlebot",
  "Google-Extended",
  "Bingbot",
  "Applebot",
  "Applebot-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "DuckAssistBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: namedBots, allow: "/", disallow },
      { userAgent: "*", allow: "/", disallow },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}

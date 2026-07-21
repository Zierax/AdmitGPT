import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/siteConfig";

export const dynamic = "force-static";

// AI search crawlers we explicitly welcome for GEO visibility (ChatGPT,
// Claude, Perplexity, Google Gemini). These power AI Overviews, AI Mode,
// and chat citations — the fastest-growing referral surface in 2026.
const AI_SEARCH_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin", "/api/", "/verify"];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      // Grant AI search crawlers the same access as everyone else, but keep
      // the admin/API/verify surfaces private. Explicit entries make our
      // intent unambiguous to each vendor's fetcher.
      ...AI_SEARCH_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}

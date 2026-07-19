import type { MetadataRoute } from "next";
import { SITE_ORIGIN } from "@/lib/siteConfig";

const GUIDE_SLUGS = [
  "ivy-league-chances",
  "how-to-get-into-ivy-league",
  "early-decision-vs-early-action",
  "what-gpa-do-you-need-for-college",
  "good-sat-score-for-ivy-league",
  "college-application-essay-tips",
  "college-acceptance-rates-2026",
  "financial-aid-explained",
  "how-to-choose-a-college",
  "college-rankings-explained",
  "test-optional-admissions",
  "evaluate-extracurriculars",
  "international-student-admissions",
  "college-application-deadlines-2026",
  "college-application-checklist",
  "college-interview-tips",
  "community-college-vs-university",
  "harvard-vs-stanford-vs-mit",
];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_ORIGIN, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_ORIGIN}/guide`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_ORIGIN}/faq`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_ORIGIN}/transparency`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];

  const guideRoutes: MetadataRoute.Sitemap = GUIDE_SLUGS.map((slug) => ({
    url: `${SITE_ORIGIN}/guide/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...guideRoutes];
}


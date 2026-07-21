import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { GuideByline } from "@/app/guide/GuideByline";
import { GuideFAQ } from "@/app/guide/GuideFAQ";
import { QuickAnswer } from "@/app/guide/QuickAnswer";
import { RelatedGuides } from "@/app/components/RelatedGuides";

export const metadata: Metadata = {
  title: "College Rankings Explained — How US News, Forbes & Others Actually Work",
  description:
    "A critical guide to college rankings: how US News calculates its scores, what the methodology actually measures, the limitations of ranking systems, and how to use admission probability data instead of rankings to build your college list.",
  keywords: [
    "US News college rankings",
    "college rankings explained",
    "how are colleges ranked",
    "US News methodology",
    "best colleges in US 2026",
    "Forbes college rankings",
    "college ranking flaws",
    "should I trust college rankings",
    "top ranked universities US",
    "college ranking vs fit",
  ],
  openGraph: {
    title: "College Rankings Explained — US News, Forbes, and Beyond",
    description: "How US News and Forbes actually calculate their rankings, what the metrics measure, why rankings are not a college list strategy, and how to use data instead.",
    url: "/guide/college-rankings-explained",
    type: "article",
  },
  alternates: { canonical: "/guide/college-rankings-explained" },
};

export default function RankingsGuide() {
  return (
    <div className="app-bg" style={{ minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
              { "@type": "ListItem", position: 2, name: "Guides", item: SITE_ORIGIN + "/guide" },
              { "@type": "ListItem", position: 3, name: "College Rankings Explained", item: SITE_ORIGIN + "/guide/college-rankings-explained" },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "College Rankings Explained — How US News, Forbes & Others Actually Work",
            description: "A critical guide to college rankings: how US News calculates its scores, what the methodology actually measures, the limitations of ranking systems, and how to use admission probability data instead of rankings to build your college list.",
            inLanguage: "en-US",
            datePublished: "2025-08-01",
            dateModified: "2026-02-14",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": SITE_ORIGIN + "/guide/college-rankings-explained" },
            isPartOf: { "@type": "WebSite", "@id": SITE_ORIGIN + "/#website" },
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Rankings</div>
        <h1 className="tp-h1">College Rankings Explained</h1>
        <GuideByline updated="2026-02-14" />
        <QuickAnswer>
          College rankings measure institutional prestige and wealth more than student outcomes, so
          use them for initial research only &mdash; not for building your list. US News weights 17
          factors, led by graduation and retention (22%), peer assessment (20%), faculty resources
          (20%), student selectivity (7%), and alumni giving (5%); it ignores teaching quality, ROI,
          and fit for specific majors. A #15 school is rarely meaningfully better than a #25 one,
          and rankings incentivize manipulation (inflating selectivity, favoring ED). Critically, a
          rank tells you nothing about your odds: a #20 school may admit 7% while a #40 peer admits
          40%. AdmitGPT ignores rankings entirely, instead using each school&rsquo;s own
          admitted-student GPA and test-score distributions for a personalized probability. For
          real research, the Common Data Set publishes the same underlying numbers straight from the
          source.
        </QuickAnswer>
        <p className="tp-lead">
          US News rankings are the most cited — and most misunderstood — metric in college
          admissions. Understanding what rankings actually measure helps you use them appropriately
          (for initial research) and ignore them appropriately (for building your actual college
          list).
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">How US News calculates its rankings</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            US News uses 17 weighted factors. The largest are peer assessment (20% — what other
            college presidents and provosts think), graduation and retention rates (22%), faculty
            resources (20%), student selectivity (7% — entering test scores and class rank),
            financial resources (10%), and alumni giving (5%). Notice what is absent: student
            outcomes beyond graduation, return on investment, quality of teaching, and fit for
            specific majors. The methodology rewards institutional prestige and wealth, not
            educational quality for individual students.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">The limitations of ranking systems</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Rankings have three fundamental problems. First, they measure institutional inputs
            (how much money a school has) more than student outputs (what students learn and earn).
            Second, a #15 school is not meaningfully "better" than a #25 school — the ranking
            difference is often within the statistical margin of error. Third, rankings incentivize
            schools to manipulate metrics (inflating selectivity by encouraging more applications,
            admitting more early-decision students, rejecting qualified applicants who would likely
            enroll elsewhere).
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Rankings vs your personal odds</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            A school's rank tells you nothing about your probability of admission. A #20 school
            might have a 7% acceptance rate (highly selective), per the{" "}
            <Link href="/guide/college-acceptance-rates-2026" style={{ color: "var(--color-primary)" }}>
              acceptance rates 2026
            </Link>
            , while a #40 school in the same
            ranking tier might admit 40% of applicants. The AdmitGPT engine ignores rankings
            entirely —             it uses each school's own data on admitted-student GPA (see our{" "}
            <Link href="/guide/what-gpa-do-you-need-for-college" style={{ color: "var(--color-primary)" }}>
              GPA guide
            </Link>
            ) and test score
            distributions to calculate your personalized probability. This is far more useful than
            a rank number when deciding where to apply.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Better sources of school information</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Instead of rankings, use the Common Data Set (CDS) for each school — it publishes the
            same data US News uses, directly from the source. For verified institutional metrics, the
            federal{" "}
            <a
              href="https://nces.ed.gov/ipeds"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-primary)" }}
            >
              IPEDS
            </a>{" "}
            database is the primary source behind most published rankings. Visit campus forums and talk to
            current students. Use the Net Price Calculator to estimate real costs. And use the
            AdmitGPT calculator to understand your actual admission probability. Data beats
            rankings every time when the question is "Can I get in?"
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Calculate Your Chances (No Rankings Needed)
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <GuideFAQ
            items={[
              { q: "Do college rankings predict my chances of admission?", a: "No — a rank tells you nothing about your odds. A #20 school may admit 7% while a #40 peer admits 40%, because rankings measure institutional prestige and wealth, not your probability. AdmitGPT ignores rankings and uses each school's own admitted-student distributions instead." },
              { q: "What should I use instead of US News rankings?", a: "Use each school's Common Data Set, which publishes the same underlying numbers directly from the source, plus the federal IPEDS database. Visit campus forums, talk to current students, and run the Net Price Calculator for real costs." },
            ]}
          />

<RelatedGuides current="/guide/college-rankings-explained" />
        </section>
      </main>
    </div>
  );
}

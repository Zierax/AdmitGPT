import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";
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
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Rankings</div>
        <h1 className="tp-h1">College Rankings Explained</h1>
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
            might have a 7% acceptance rate (highly selective) while a #40 school in the same
            ranking tier might admit 40% of applicants. The AdmitGPT engine ignores rankings
            entirely — it uses each school's own data on admitted-student GPA and test score
            distributions to calculate your personalized probability. This is far more useful than
            a rank number when deciding where to apply.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Better sources of school information</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Instead of rankings, use the Common Data Set (CDS) for each school — it publishes the
            same data US News uses, directly from the source. Visit campus forums and talk to
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
          <RelatedGuides current="/guide/college-rankings-explained" />
        </section>
      </main>
    </div>
  );
}

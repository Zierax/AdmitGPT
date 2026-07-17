import type { Metadata } from "next";
import Link from "next/link";
import { RelatedGuides } from "@/app/components/RelatedGuides";
import { SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Good SAT Score for Ivy League — Ranges, Percentiles & Strategy",
  description:
    "What SAT score do you need for Ivy League admission? Complete guide to Harvard, Yale, Princeton, and Columbia SAT ranges, how AdmitGPT z-scores your test results, and when to go test-optional.",
  keywords: [
    "good SAT score for Ivy League",
    "SAT score for Harvard",
    "SAT score for Yale",
    "Ivy League SAT requirements",
    "average SAT Ivy League",
    "SAT 1600 Ivy League",
    "what SAT do I need for Ivy League",
    "SAT middle 50% Ivy League",
    "SAT score range Ivy League",
    "test optional Ivy League SAT",
  ],
  openGraph: {
    title: "Good SAT Score for Ivy League — Complete Guide",
    description: "Ivy League SAT ranges, middle 50% data, and how AdmitGPT uses z-scores to compare your test results against each school's admitted student profile.",
    url: "/guide/good-sat-score-for-ivy-league",
    type: "article",
  },
  alternates: { canonical: "/guide/good-sat-score-for-ivy-league" },
};

export default function SatIvyGuide() {
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
              { "@type": "ListItem", position: 3, name: "Good SAT Score for Ivy League", item: SITE_ORIGIN + "/guide/good-sat-score-for-ivy-league" },
            ],
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / SAT & Testing</div>
        <h1 className="tp-h1">Good SAT Score for Ivy League Admission</h1>
        <p className="tp-lead">
          "What SAT score do I need for Harvard?" is one of the most searched college admissions
          questions. The honest answer depends on the school, your GPA, and the rest of your
          profile. Here is the data on SAT ranges for each Ivy League school and how AdmitGPT
          uses them to calculate your odds.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">Ivy League SAT middle 50% ranges</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The middle 50% SAT range varies across Ivy League schools, but all cluster in the top
            percentiles nationally:
          </p>
          <ul className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75, paddingLeft: 20 }}>
            <li><strong>Harvard:</strong> 1490–1580</li>
            <li><strong>Yale:</strong> 1500–1580</li>
            <li><strong>Princeton:</strong> 1490–1570</li>
            <li><strong>Columbia:</strong> 1470–1570</li>
            <li><strong>Penn:</strong> 1480–1570</li>
            <li><strong>Brown:</strong> 1480–1560</li>
            <li><strong>Dartmouth:</strong> 1440–1560</li>
            <li><strong>Cornell:</strong> 1450–1550</li>
          </ul>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            A score above 1550 is at or above the 75th percentile at every Ivy. Below 1450, you are
            below the 25th percentile at most Ivies, which makes test-optional a serious consideration
            at schools that still offer it.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">How AdmitGPT uses SAT scores</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The engine z-scores your SAT (and ACT, via concordance) against each college's own
            admitted-student distribution. A 1500 at Harvard (median ~1540) produces a negative
            z-score in the academic component. The same 1500 at Cornell (median ~1500) produces a
            near-neutral z-score. This school-specific normalization is why the same profile gets
            different probabilities at different schools — consistent with how admissions offices
            actually evaluate scores.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The academic Z (combined from GPA and test scores) is multiplied by 1.5 in the logit,
            giving it roughly <strong>1.5x the weight of extracurriculars</strong> in the final
            probability. This reflects the admissions reality: at selective schools, academics are
            the primary filter.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Should you submit or go test-optional?</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            If your SAT is at or above the school's 25th percentile, submitting helps. If it is
            below the 25th percentile, going test-optional may be the better move — but only at
            schools where the policy exists. As of 2026, all Ivy League schools have returned to
            requiring test scores, so the test-optional option is effectively off the table for
            this tier.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            For non-Ivy schools that remain test-optional, a strong SAT is still a positive signal
            for both admission and merit scholarships. A score above a school's 75th percentile is
            always worth submitting regardless of policy.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Calculate your odds with your SAT score</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Enter your SAT, GPA, and extracurricular profile into the free AdmitGPT calculator.
            See how your chances change across different schools in real time.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Calculate Your Chances
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <RelatedGuides current="/guide/good-sat-score-for-ivy-league" />
        </section>
      </main>
    </div>
  );
}

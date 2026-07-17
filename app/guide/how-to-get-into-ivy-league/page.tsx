import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "How to Get Into an Ivy League School — Honest Data-Backed Advice",
  description:
    "Your complete guide to getting into Harvard, Yale, Princeton, Columbia, and other Ivy League schools. Learn what GPA, SAT, extracurriculars, and early decision strategy actually matter — no consultants, no fluff.",
  keywords: [
    "how to get into Harvard",
    "how to get into Yale",
    "how to get into Princeton",
    "how to get into Columbia",
    "how to get into Cornell",
    "Ivy League admission tips",
    "Ivy League requirements",
    "what GPA do you need for Ivy League",
    "Ivy League application strategy",
    "how to stand out for Ivy League",
  ],
  openGraph: {
    title: "How to Get Into an Ivy League School — Data-Backed Guide",
    description: "What actually moves the needle for Ivy League admissions: GPA thresholds, SAT ranges, extracurricular depth, and early decision timing.",
    url: "/guide/how-to-get-into-ivy-league",
    type: "article",
  },
  alternates: { canonical: "/guide/how-to-get-into-ivy-league" },
};

export default function HowToGetIntoIvyLeague() {
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
              { "@type": "ListItem", position: 3, name: "How to Get Into an Ivy League", item: SITE_ORIGIN + "/guide/how-to-get-into-ivy-league" },
            ],
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Ivy League Strategy</div>
        <h1 className="tp-h1">How to Get Into an Ivy League School</h1>
        <p className="tp-lead">
          "How do I get into Harvard?" is the most common question in college admissions. There are no
          shortcuts, but data reveals a clear pattern. Here is what the AdmitGPT engine shows about the
          profiles that actually get admitted — organized by the things you can control.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">1. GPA: the highest bar in admissions</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            At Ivy League schools, academic strength carries the most weight in AdmitGPT's model
            (logit coefficient 1.5). The median admitted GPA at Harvard is approximately 3.95
            unweighted. A GPA below 3.7 unweighted puts you below the 25th percentile at most Ivies.
            Weighted GPAs above 4.0 are common among admitted students because they take the most
            rigorous courses available — AP, IB, or dual enrollment.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The engine uses a <strong>clean US-4.0 reference</strong> computed from your school's
            own grade distribution, so it adjusts for grading variation across high schools. If your
            school offers few advanced courses, the model accounts for that context.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">2. SAT/ACT: still matters at most Ivies</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Every Ivy League school has returned to requiring test scores. The middle 50% SAT range
            at most Ivies falls between 1480 and 1580. Scoring below 1450 places you at a significant
            disadvantage. The AdmitGPT engine z-scores your SAT against each college's own distribution,
            so a 1500 at a school with a 1550 median has a different impact than a 1500 at a school
            with a 1400 median.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            If your SAT is below a school's 25th percentile, applying test-optional may help — but
            only at schools where that option exists. Refer to <Link href="/guide/test-optional-admissions" style={{ color: "var(--color-primary)" }}>our test-optional guide</Link> for a deeper analysis.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">3. Extracurriculars: depth over breadth</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            AdmitGPT scores extracurriculars across six dimensions: tier, level, rarity, institutional
            strength, cognitive load, and validation. The spike contribution is capped at ±2.0 in the
            logit — a strong spike can significantly improve your odds, but it cannot rescue weak
            academics. A single national-level achievement (tier 1–2) matters far more than ten
            school-club memberships.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">4. Early decision: your largest leverage point</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Binding Early Decision acceptance rates are typically 2–4x higher than Regular Decision
            rates at Ivy League schools. The trade-off is that ED is binding — you must enroll if
            admitted. If you have a clear first choice and your financial aid estimates are reasonable,
            ED is statistically the strongest move you can make. See <Link href="/guide/early-decision-vs-early-action" style={{ color: "var(--color-primary)" }}>our ED vs EA guide</Link> for details.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Get your personalized Ivy League probability</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Instead of wondering, run your actual profile through the transparent, open-source
            AdmitGPT calculator. Every formula is published. Your data never leaves your browser.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Calculate Your Ivy League Chances
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

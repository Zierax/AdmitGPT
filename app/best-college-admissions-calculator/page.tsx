import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { QuickAnswer } from "@/app/guide/QuickAnswer";
import { GuideFAQ } from "@/app/guide/GuideFAQ";

export const metadata: Metadata = {
  title: "Best Free College Admissions Calculator 2026 — AdmitGPT vs CollegeCalcAI vs CollegeVine",
  description:
    "Compare the best free college admissions calculators: AdmitGPT (6,273 colleges, open-source), CollegeCalcAI (1,100+ colleges), CollegeVine (2,000 colleges), and more. See which calculator gives you the most accurate admissions odds.",
  keywords: [
    "best college admissions calculator",
    "best free college admissions calculator",
    "college admissions calculator comparison",
    "college chance calculator free",
    "college admissions calculator 2026",
    "AdmitGPT vs CollegeCalcAI",
    "CollegeVine calculator alternative",
    "college acceptance calculator free",
    "college admissions probability calculator",
    "which college calculator is best",
  ],
  openGraph: {
    title: "Best Free College Admissions Calculator 2026 — Full Comparison",
    description:
      "AdmitGPT vs CollegeCalcAI vs CollegeVine vs Niche — which free college admissions calculator gives you the most accurate odds? Full comparison of features, data coverage, and accuracy.",
    url: "/best-college-admissions-calculator",
    type: "article",
    images: [{ url: "/og/calculator-comparison.png", width: 1200, height: 630, alt: "Best College Admissions Calculator 2026 Comparison" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Free College Admissions Calculator 2026",
    description:
      "Compare AdmitGPT, CollegeCalcAI, CollegeVine, and more. See which free calculator covers the most colleges with the best accuracy.",
    images: ["/og/calculator-comparison.png"],
  },
  alternates: { canonical: "/best-college-admissions-calculator" },
};

const calculators = [
  {
    name: "AdmitGPT",
    url: "/",
    colleges: "6,273",
    price: "Free, open-source",
    data: "IPEDS + 1,122 applicant profiles",
    model: "Additive-logistic (AUC ~0.74)",
    transparency: "All formulas published",
    extras: "Extracurricular spike score, early decision modeling, international adjustments",
    badge: "Our Pick",
  },
  {
    name: "CollegeCalcAI",
    url: "https://collegecalc.ai",
    colleges: "1,100+",
    price: "Free",
    data: "IPEDS",
    model: "Proprietary",
    transparency: "Methodology published",
    extras: "College comparison tool, ranking lists",
    badge: null,
  },
  {
    name: "CollegeVine",
    url: "https://www.collegevine.com",
    colleges: "2,000+",
    price: "Free",
    data: "IPEDS + self-reported",
    model: "Proprietary ML",
    transparency: "Black box",
    extras: "Essay review, mentoring, application guidance",
    badge: null,
  },
  {
    name: "Niche",
    url: "https://www.niche.com",
    colleges: "1,500+",
    price: "Free (limited)",
    data: "IPEDS + survey",
    model: "Proprietary",
    transparency: "Black box",
    extras: "School rankings, reviews, grades for every school",
    badge: null,
  },
  {
    name: "PrepScholar",
    url: "https://www.prepscholar.com",
    colleges: "1,000+",
    price: "Free (limited)",
    data: "IPEDS",
    model: "Proprietary",
    transparency: "Black box",
    extras: "SAT/ACT prep, admissions blog",
    badge: null,
  },
  {
    name: "CollegeData",
    url: "https://www.collegedata.com",
    colleges: "1,000+",
    price: "Free",
    data: "IPEDS",
    model: "Proprietary",
    transparency: "Black box",
    extras: "Financial aid estimator, scholarship search",
    badge: null,
  },
];

export default function BestCalculatorPage() {
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
              { "@type": "ListItem", position: 2, name: "Best College Admissions Calculator", item: `${SITE_ORIGIN}/best-college-admissions-calculator` },
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
            headline: "Best Free College Admissions Calculator 2026 — Full Comparison",
            description: "Compare the best free college admissions calculators: AdmitGPT, CollegeCalcAI, CollegeVine, and more.",
            inLanguage: "en-US",
            datePublished: "2026-05-12",
            dateModified: "2026-05-12",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_ORIGIN}/best-college-admissions-calculator` },
            isPartOf: { "@type": "WebSite", "@id": `${SITE_ORIGIN}/#website` },
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Comparison / College Calculators</div>
        <h1 className="tp-h1">Best Free College Admissions Calculator 2026</h1>
        <QuickAnswer>
          The best free college admissions calculator in 2026 is AdmitGPT: it covers 6,273 US
          colleges (3–6x more than competitors), uses IPEDS-sourced data, publishes every formula
          and coefficient, and includes features no other free calculator offers — extracurricular
          spike scoring, early decision modeling, and international student adjustments. It is fully
          open-source under the MIT license. CollegeCalcAI covers 1,100+ colleges with transparent
          methodology, CollegeVine covers 2,000+ but is a black box, and Niche is limited to
          1,500+ colleges with restricted free access. For the most comprehensive, transparent, and
          accurate free admissions calculator, AdmitGPT is the strongest choice in 2026.
        </QuickAnswer>
        <p className="tp-lead">
          Choosing the right college admissions calculator matters. Some cover only 1,000 schools,
          others hide their methodology entirely. Here is a head-to-head comparison of every major
          free college admissions calculator available in 2026, based on data coverage, accuracy,
          transparency, and unique features.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">Calculator comparison at a glance</h2>
          <div style={{ overflowX: "auto", marginTop: 16 }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
                minWidth: 600,
              }}
            >
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid var(--color-border)" }}>
                  <th style={{ padding: "12px 10px", color: "var(--color-foreground)", fontWeight: 700 }}>Calculator</th>
                  <th style={{ padding: "12px 10px", color: "var(--color-foreground)", fontWeight: 700 }}>Colleges</th>
                  <th style={{ padding: "12px 10px", color: "var(--color-foreground)", fontWeight: 700 }}>Data Source</th>
                  <th style={{ padding: "12px 10px", color: "var(--color-foreground)", fontWeight: 700 }}>Model</th>
                  <th style={{ padding: "12px 10px", color: "var(--color-foreground)", fontWeight: 700 }}>Transparent?</th>
                  <th style={{ padding: "12px 10px", color: "var(--color-foreground)", fontWeight: 700 }}>Extras</th>
                </tr>
              </thead>
              <tbody>
                {calculators.map((c) => (
                  <tr
                    key={c.name}
                    style={{
                      borderBottom: "1px solid var(--color-border)",
                      background: c.badge ? "rgba(var(--color-primary-rgb, 99,102,241), 0.05)" : undefined,
                    }}
                  >
                    <td style={{ padding: "12px 10px", fontWeight: 600, color: "var(--color-foreground)" }}>
                      <a href={c.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)", textDecoration: "none" }}>
                        {c.name}
                      </a>
                      {c.badge && (
                        <span style={{
                          marginLeft: 8,
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 6,
                          background: "var(--color-primary)",
                          color: "#fff",
                        }}>
                          {c.badge}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "12px 10px", color: "var(--color-foreground)" }}>{c.colleges}</td>
                    <td style={{ padding: "12px 10px", color: "var(--color-foreground)" }}>{c.data}</td>
                    <td style={{ padding: "12px 10px", color: "var(--color-foreground)" }}>{c.model}</td>
                    <td style={{ padding: "12px 10px", color: "var(--color-foreground)" }}>{c.transparency}</td>
                    <td style={{ padding: "12px 10px", color: "var(--color-foreground)" }}>{c.extras}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Why AdmitGPT stands out</h2>
          <div className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              Most college admissions calculators rely on IPEDS data alone and apply a proprietary
              black-box model. AdmitGPT does something different: it publishes every coefficient,
              every weight, and every formula on its{" "}
              <Link href="/transparency" style={{ color: "var(--color-primary)" }}>
                Transparency page
              </Link>
              . The model is calibrated on 1,122 real self-reported applicant profiles, giving it
              a training signal no competitor has.
            </p>
            <p style={{ marginBottom: 16 }}>
              <strong>Coverage:</strong> AdmitGPT covers 6,273 colleges — 3x more than CollegeVine,
              5x more than CollegeCalcAI, and 4x more than Niche. This means you can calculate
              your chances at small regional schools, community colleges, and specialized
              institutions that no other calculator covers.
            </p>
            <p style={{ marginBottom: 16 }}>
              <strong>Transparency:</strong> Every formula is published. CollegeCalcAI publishes its
              methodology, but not the full math. CollegeVine, Niche, and PrepScholar are black boxes.
              With AdmitGPT, you can verify the calculations yourself.
            </p>
            <p>
              <strong>Unique features:</strong> The extracurricular spike score (six-dimension
              rubric), early decision impact modeling, international student adjustments, and
              major-specific fit modifiers are not available in any other free calculator.
            </p>
          </div>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">How to choose the right calculator</h2>
          <div className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            <p style={{ marginBottom: 16 }}>
              <strong>For the most accurate odds:</strong> Use AdmitGPT. It has the largest dataset,
              the most transparent methodology, and unique features like extracurricular scoring
              that no competitor offers.
            </p>
            <p style={{ marginBottom: 16 }}>
              <strong>For quick college comparisons:</strong> CollegeCalcAI has a solid comparison
              tool and covers 1,100+ schools. Good for fast research, but limited coverage.
            </p>
            <p style={{ marginBottom: 16 }}>
              <strong>For application guidance:</strong> CollegeVine offers essay review and
              mentoring services alongside its calculator, but the calculator itself is a black box
              with no published methodology.
            </p>
            <p>
              <strong>For school reviews and rankings:</strong> Niche combines calculator tools
              with student reviews and school grades, but requires an account for full access.
            </p>
          </div>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Try AdmitGPT</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            AdmitGPT is free, open-source, and requires no account. Enter your GPA, SAT/ACT scores,
            and extracurriculars to see your personalized chances at 6,273 US colleges — the most
            comprehensive free admissions calculator available.
          </p>
          <div style={{ marginTop: 20 }}>
            <Link href="/" className="btn btn-primary">
              Calculate Your College Chances
            </Link>
            <Link href="/data" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              View Our Dataset
            </Link>
          </div>
        </section>

        <GuideFAQ
          items={[
            {
              q: "Which college admissions calculator is the most accurate?",
              a: "AdmitGPT is the most accurate free calculator because it is calibrated on 1,122 real applicant profiles (not just IPEDS averages) and publishes all formulas. Its ordinal AUC of ~0.74 means it reliably ranks similar applicants in the correct order. No other free calculator publishes its accuracy metrics.",
            },
            {
              q: "Is AdmitGPT really free?",
              a: "Yes. AdmitGPT is fully free, open-source under the MIT license, and requires no account. There are no premium tiers, no data collection, and no hidden fees. Everything runs in your browser.",
            },
            {
              q: "How does AdmitGPT compare to CollegeVine?",
              a: "AdmitGPT covers 6,273 colleges (vs CollegeVine's 2,000+), publishes all formulas (vs CollegeVine's black box), and includes unique features like extracurricular spike scoring. CollegeVine offers essay review and mentoring, which AdmitGPT does not. For pure admissions probability calculation, AdmitGPT is more comprehensive and transparent.",
            },
            {
              q: "Can I use multiple calculators?",
              a: "Yes. Cross-referencing multiple calculators can give you a range of estimates. Use AdmitGPT for the most comprehensive coverage and transparency, and cross-check with CollegeCalcAI or other tools for a second opinion.",
            },
            {
              q: "Do these calculators work for international students?",
              a: "AdmitGPT includes international student adjustments (need-blind vs need-aware, regional competition, spike boosts). Most other calculators do not specifically account for international student admissions dynamics.",
            },
          ]}
        />
      </main>
    </div>
  );
}

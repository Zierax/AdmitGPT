import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { QuickAnswer } from "@/app/guide/QuickAnswer";
import { GuideFAQ } from "@/app/guide/GuideFAQ";

export const metadata: Metadata = {
  title: "College GPA Requirements — What GPA You Need for Every Selectivity Tier",
  description:
    "What GPA do you need for top colleges? Data-driven breakdown of GPA requirements by selectivity tier: Ivy League (3.9+), top 20 (3.8+), selective (3.5+), moderate (3.0+), and open admission. See real admitted-student GPA distributions.",
  keywords: [
    "college GPA requirements",
    "GPA needed for Ivy League",
    "what GPA do you need for college",
    "GPA requirements by university",
    "minimum GPA for college admission",
    "GPA for Harvard",
    "GPA for top universities",
    "college admission GPA range",
    "weighted vs unweighted GPA college",
    "what GPA do colleges look at",
  ],
  openGraph: {
    title: "College GPA Requirements — Every Selectivity Tier",
    description:
      "What GPA do you need for Ivy League, top 20, and every selectivity tier? Data from 1,910 US colleges with real admitted-student GPA distributions.",
    url: "/college-gpa-requirements",
    type: "article",
    images: [{ url: "/og/college-gpa.png", width: 1200, height: 630, alt: "College GPA Requirements by Selectivity Tier" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "College GPA Requirements by Selectivity Tier",
    description: "What GPA do you need for Ivy League, top 20, and every selectivity tier? Data from 1,910 US colleges.",
    images: ["/og/college-gpa.png"],
  },
  alternates: { canonical: "/college-gpa-requirements" },
};

const gpaTiers = [
  {
    tier: "Ivy League & Top 10",
    gpa: "3.9 – 4.0 unweighted",
    schools: "Harvard, Yale, Princeton, Stanford, MIT, Columbia, Caltech",
    context: "Most admitted students have near-perfect unweighted GPAs (3.95–4.0). Weighted GPAs often exceed 4.5. GPA alone does not determine admission — course rigor matters more than the number itself. An A in AP Calculus carries more weight than an A in a standard course.",
    color: "#ef4444",
  },
  {
    tier: "Top 20 National Universities",
    gpa: "3.8 – 3.95 unweighted",
    schools: "Duke, Northwestern, Penn, Brown, Dartmouth, Vanderbilt, Rice, Notre Dame",
    context: "The middle 50% unweighted GPA at these schools is typically 3.85–3.95. A 3.8 is competitive but not dominant — you need strong test scores and extracurriculars to compensate. Course rigor (AP/IB/honors) is heavily weighted.",
    color: "#f97316",
  },
  {
    tier: "Top 30–50 Universities",
    gpa: "3.6 – 3.85 unweighted",
    schools: "Emory, NYU, USC, Tufts, Boston College, UNC, UVA, Michigan, Georgetown",
    context: "A 3.7 unweighted GPA is solid for this tier. The middle 50% ranges from 3.65–3.85. State flagships like Michigan and UVA may admit in-state students with slightly lower GPAs, while out-of-state applicants need higher credentials.",
    color: "#eab308",
  },
  {
    tier: "Selective Universities (Top 50–100)",
    gpa: "3.4 – 3.7 unweighted",
    schools: "Boston University, Case Western, Tulane, RIT, Stevens, Penn State, Ohio State",
    context: "A 3.5 unweighted GPA is competitive here. Many of these schools weight demonstrated interest, essays, and extracurriculars heavily. GPA requirements vary significantly by major — engineering and business programs often require higher GPAs than the school average.",
    color: "#22c55e",
  },
  {
    tier: "Moderately Selective",
    gpa: "3.0 – 3.5 unweighted",
    schools: "University of Florida, Purdue, UConn, Rutgers, Iowa State, Clemson",
    context: "A 3.2–3.5 unweighted GPA is typically sufficient. These schools admit 40–70% of applicants, so GPA is important but not the sole factor. Test scores and extracurriculars still matter. Some use test-optional policies, making GPA and essays more important.",
    color: "#3b82f6",
  },
  {
    tier: "Open Admission & Community Colleges",
    gpa: "No minimum / 2.0+",
    schools: "Community colleges, open-admission universities, many state colleges",
    context: "Open-admission schools accept all or nearly all applicants regardless of GPA. Community colleges have no GPA requirement and serve as a pathway to four-year universities through transfer programs. A 2.0 GPA is the minimum for most four-year open-admission schools.",
    color: "#8b5cf6",
  },
];

export default function GPAPage() {
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
              { "@type": "ListItem", position: 2, name: "GPA Requirements", item: `${SITE_ORIGIN}/college-gpa-requirements` },
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
            headline: "College GPA Requirements — What GPA You Need for Every Selectivity Tier",
            description: "Data-driven breakdown of GPA requirements by selectivity tier for US college admissions.",
            inLanguage: "en-US",
            datePublished: "2026-05-12",
            dateModified: "2026-05-12",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_ORIGIN}/college-gpa-requirements` },
            isPartOf: { "@type": "WebSite", "@id": `${SITE_ORIGIN}/#website` },
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Guides / GPA Requirements</div>
        <h1 className="tp-h1">What GPA Do You Need for College?</h1>
        <QuickAnswer>
          GPA requirements vary dramatically by school selectivity. Ivy League and top-10 schools
          (Harvard, Stanford, MIT) typically admit students with 3.9–4.0 unweighted GPAs. Top-20
          universities (Duke, Northwestern, Penn) range from 3.8–3.95. Top 30–50 schools (Emory,
          NYU, USC, Michigan) typically require 3.6–3.85. Selective universities (BU, Tulane, Penn
          State) admit students with 3.4–3.7, while moderately selective schools (UF, Purdue, Iowa
          State) accept 3.0–3.5. Open-admission schools and community colleges have no minimum GPA.
          Course rigor matters as much as GPA itself — an A in AP courses carries more weight than
          an A in standard classes. Use the AdmitGPT calculator to see how your GPA z-scores
          against each school's admitted-student distribution.
        </QuickAnswer>

        {gpaTiers.map((tier) => (
          <section className="tp-section" key={tier.tier}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 32,
                  borderRadius: 2,
                  background: tier.color,
                }}
              />
              <h2 className="tp-h2" style={{ margin: 0 }}>{tier.tier}</h2>
            </div>
            <div
              style={{
                padding: "14px 18px",
                borderRadius: 12,
                border: `1px solid ${tier.color}33`,
                background: `${tier.color}08`,
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700, color: tier.color, marginBottom: 4 }}>
                {tier.gpa}
              </div>
              <div className="ag-muted" style={{ fontSize: 13 }}>{tier.schools}</div>
            </div>
            <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
              {tier.context}
            </p>
          </section>
        ))}

        <section className="tp-section">
          <h2 className="tp-h2">How colleges actually evaluate GPA</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
            Colleges do not just look at the number — they evaluate your GPA in context:
          </p>
          <ul className="ag-muted" style={{ fontSize: 15, lineHeight: 2, paddingLeft: 20 }}>
            <li><strong>Course rigor:</strong> An A in AP/IB courses signals more than an A in standard classes</li>
            <li><strong>Trend:</strong> An upward GPA trend (improving over 4 years) can offset a lower starting point</li>
            <li><strong>School context:</strong> Colleges compare you to your high school&apos;s offerings — a 3.5 at a school with limited APs may be viewed differently than a 3.5 at a school with 20+ APs</li>
            <li><strong>Weighted vs unweighted:</strong> Most colleges recalculate GPA using their own scale; the weighted number on your transcript is a starting point, not the final word</li>
            <li><strong>Class rank:</strong> At some schools, being in the top 10% of your class matters more than raw GPA</li>
          </ul>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8, marginTop: 16 }}>
            AdmitGPT z-scores your GPA against each school&apos;s own admitted-student distribution,
            so you see how you compare to students who actually got in — not national averages.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">GPA vs test scores: which matters more?</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            With test-optional policies in effect at many schools, GPA has become the primary
            academic metric. However, at schools that still consider test scores, the two work
            together. A high GPA with low test scores (or vice versa) creates a mixed signal.
            AdmitGPT combines both into a composite academic z-score, which is a stronger predictor
            than either metric alone. See our{" "}
            <Link href="/guide/test-optional-admissions" style={{ color: "var(--color-primary)" }}>
              test-optional guide
            </Link>{" "}
            for how to strategize when scores are optional.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Calculate your odds with your GPA</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            Enter your GPA, test scores, and profile to see personalized acceptance probabilities
            at 6,273 US colleges — the most comprehensive free admissions calculator available.
          </p>
          <div style={{ marginTop: 20 }}>
            <Link href="/" className="btn btn-primary">Calculate Your Chances</Link>
            <Link href="/guide/good-sat-score-for-ivy-league" className="btn btn-secondary" style={{ marginLeft: 12 }}>SAT Score Guide</Link>
          </div>
        </section>

        <GuideFAQ
          items={[
            { q: "What GPA do you need for Harvard?", a: "Harvard admits students with a median unweighted GPA of ~3.95. The middle 50% ranges from 3.88–4.0. GPA alone does not determine admission — course rigor, test scores, and extracurriculars are all evaluated together." },
            { q: "Is a 3.5 GPA good enough for college?", a: "A 3.5 unweighted GPA is competitive for many solid universities (Top 30–50 tier), including Boston University, Case Western, Tulane, and most state flagships. It is below the typical range for Ivy League and top-20 schools." },
            { q: "Do colleges look at weighted or unweighted GPA?", a: "Most colleges recalculate GPA using their own standardized scale. They see both your weighted and unweighted GPA, but evaluate course rigor separately. A 3.8 unweighted with 10 AP courses may be viewed more favorably than a 4.0 weighted with standard courses only." },
            { q: "Can I get into a good college with a 3.0 GPA?", a: "Yes. A 3.0 GPA is competitive at moderately selective schools (40–70% acceptance rate) like University of Florida, Purdue, Clemson, and many state universities. Some of these schools are excellent institutions with strong outcomes." },
          ]}
        />
      </main>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { RelatedGuides } from "@/app/components/RelatedGuides";
import { SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Does Going Test-Optional Hurt Your College Chances?",
  description:
    "Should you submit SAT/ACT scores or skip them? Data-backed analysis of test-optional admissions from the open-source AdmitGPT engine. See how missing scores affect your profile.",
  keywords: [
    "test-optional admissions impact",
    "SAT optional college chances",
    "ACT scores optional",
    "should I submit SAT scores",
    "test-optional 2026",
    "college admissions without SAT",
  ],
  openGraph: {
    title: "Does Going Test-Optional Hurt Your Chances?",
    description: "Data-backed analysis of test-optional policy impact from the open-source AdmitGPT engine.",
    url: "/guide/test-optional-admissions",
    type: "article",
  },
  alternates: { canonical: "/guide/test-optional-admissions" },
};

export default function TestOptionalGuide() {
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
              { "@type": "ListItem", position: 3, name: "Test-Optional", item: SITE_ORIGIN + "/guide/test-optional-admissions" },
            ],
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Test-Optional</div>
        <h1 className="tp-h1">Does Going Test-Optional Hurt Your Chances?</h1>
        <p className="tp-lead">
          Many colleges remain test-optional, giving you the choice to submit SAT/ACT scores or
          leave them out. But which option actually improves your odds? Here is what the data says.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">How AdmitGPT handles missing test scores</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The engine treats a missing SAT differently than a low one. When you provide no score,
            your academic strength is determined entirely by your GPA — with a small uncertainty
            penalty: <code style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>Academic_Z = GPA_Z &minus; 0.20</code>.
            This means a strong GPA can still carry your profile, but you start slightly behind
            someone with a comparable GPA and a confirmed test score at or above the college average.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            When you do submit a score, it is z-scored against the college&rsquo;s own SAT distribution
            (using the 25th/75th percentile IQR to estimate spread). A score above the college mean
            boosts your academic Z (weighted 55% SAT, 45% GPA). A score below drags it down. This
            mirrors the real decision framework: submit if your score strengthens your application.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Should you submit or not?</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            A useful rule of thumb: if your SAT is at or above the college&rsquo;s reported average,
            submitting it will likely help. If it is significantly below, the penalty for omitting it
            (GPA-only with &minus;0.2) is usually smaller than the drag from a weak score. You can
            test both scenarios in the calculator — it shows the score both ways so you can decide.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Run your profile both ways</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            AdmitGPT lets you toggle between test-optional and test-included modes. The engine runs
            your numbers transparently — no hidden formulas, no data collection.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Check Your Test-Optional Profile
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <RelatedGuides current="/guide/test-optional-admissions" />
        </section>
      </main>
    </div>
  );
}

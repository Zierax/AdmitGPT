import type { Metadata } from "next";
import Link from "next/link";
import { RelatedGuides } from "@/app/components/RelatedGuides";
import { SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "How Colleges Evaluate Your Extracurriculars — The Spike Score",
  description:
    "The six dimensions colleges use to score extracurriculars: tier, level, rarity, institutional strength, cognitive load, and validation. See how AdmitGPT's open-source spike scoring works.",
  keywords: [
    "college extracurricular evaluation",
    "spike score college admissions",
    "how to evaluate extracurriculars",
    "college activities ranking",
    "EC scoring rubric",
    "best extracurriculars for Ivy League",
    "awards and activities admissions",
  ],
  openGraph: {
    title: "How Colleges Evaluate Your Extracurriculars — The Spike Score",
    description: "The six-dimension rubric used by AdmitGPT's open-source spike scoring engine.",
    url: "/guide/evaluate-extracurriculars",
    type: "article",
  },
  alternates: { canonical: "/guide/evaluate-extracurriculars" },
};

export default function ExtracurricularsGuide() {
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
              { "@type": "ListItem", position: 3, name: "Extracurriculars", item: SITE_ORIGIN + "/guide/evaluate-extracurriculars" },
            ],
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Extracurriculars</div>
        <h1 className="tp-h1">How Colleges Evaluate Your Extracurriculars &amp; Spike</h1>
        <p className="tp-lead">
          Not all activities are created equal. AdmitGPT&rsquo;s spike engine scores each EC and
          award across six dimensions — the same kind of holistic evaluation elite colleges use to
          distinguish applicants beyond grades.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">The six-dimension rubric</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Each activity is scored on: <strong>tier</strong> (Game Maker at the top down to T3),
            <strong>scope/level</strong> (Global Elite to Local), <strong>rarity</strong> (Unique to
            Common), <strong>institutional strength</strong> (World Class to Standard),
            <strong>cognitive load</strong> (Intense to Light), and <strong>validation</strong>
            (Professional Audit to Self-Reported). These six factors multiply together to produce a base score.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The engine then applies diminishing returns above 10 points (logarithmic saturation),
            divides by 5.5 for a readable curve, adds diversity and depth bonuses, and enforces
            per-tier activity caps so no single bucket dominates. The result is your
            <strong> spike score</strong> — a number the model combines with academics in a
            capped additive logit (&plusmn;2.0 contribution limit).
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Anti-gaming: why self-reporting has limits</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            You cannot invent a spike. Self-reported (unverified) claims are automatically downgraded
            one notch in scope, rarity, and institutional strength — so claiming &ldquo;Global
            Elite&rdquo; without proof caps you at &ldquo;International.&rdquo; Externally verified
            items (peer, institutional, or professional audit) keep their full value. The model also
            discounts the entire spike when most claims are unverified, retaining only a 60% floor.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Score your own spike</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Enter your extracurriculars and awards in the calculator. The engine returns a spike
            score and a classification — from Standard to Singularity — based on where you fall
            in the distribution.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Score Your Extracurriculars
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <RelatedGuides current="/guide/evaluate-extracurriculars" />
        </section>
      </main>
    </div>
  );
}

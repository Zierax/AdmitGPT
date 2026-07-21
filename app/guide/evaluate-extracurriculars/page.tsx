import type { Metadata } from "next";
import Link from "next/link";
import { RelatedGuides } from "@/app/components/RelatedGuides";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { GuideByline } from "@/app/guide/GuideByline";
import { GuideFAQ } from "@/app/guide/GuideFAQ";
import { QuickAnswer } from "@/app/guide/QuickAnswer";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "How Colleges Evaluate Your Extracurriculars — The Spike Score",
            description: "The six dimensions colleges use to score extracurriculars: tier, level, rarity, institutional strength, cognitive load, and validation. See how AdmitGPT's open-source spike scoring works.",
            inLanguage: "en-US",
            datePublished: "2025-08-01",
            dateModified: "2026-03-30",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": SITE_ORIGIN + "/guide/evaluate-extracurriculars" },
            isPartOf: { "@type": "WebSite", "@id": SITE_ORIGIN + "/#website" },
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Extracurriculars</div>
        <h1 className="tp-h1">How Colleges Evaluate Your Extracurriculars &amp; Spike</h1>
        <GuideByline updated="2026-03-30" />
        <QuickAnswer>
          Colleges evaluate extracurriculars through a holistic, multi-dimensional lens rather than
          a raw hours count. AdmitGPT&rsquo;s spike engine scores each activity across six
          dimensions &mdash; tier (Game Maker down to T3), scope/level (Global Elite to Local),
          rarity, institutional strength, cognitive load, and validation &mdash; which multiply into
          a base score. The engine then applies logarithmic saturation above 10 points, adds
          diversity and depth bonuses, and enforces per-tier caps, producing a spike score combined
          with academics in a capped additive logit (&plusmn;2.0 contribution limit). Anti-gaming
          rules matter: self-reported claims are auto-downgraded one notch in scope, rarity, and
          strength, and the whole spike is discounted to a 60% floor when most claims are unverified.
          Externally audited achievements keep full value &mdash; depth and proof beat a long list
          of shallow activities.
        </QuickAnswer>
        <p className="tp-lead">
          Not all activities are created equal. AdmitGPT&rsquo;s spike engine scores each EC and
          award across six dimensions — the same kind of holistic evaluation elite colleges use to
          distinguish applicants beyond grades.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">The six-dimension rubric</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Each activity is scored on: <strong>tier</strong> (Game Maker at the top down to T3), one of
            the factors we cover in our{" "}
            <Link href="/guide/how-to-get-into-ivy-league" style={{ color: "var(--color-primary)" }}>
              Ivy League strategy guide
            </Link>
            .
            <strong>scope/level</strong> (Global Elite to Local), <strong>rarity</strong> (Unique to
            Common), <strong>institutional strength</strong> (World Class to Standard),
            <strong>cognitive load</strong> (Intense to Light), and <strong>validation</strong>
            (Professional Audit to Self-Reported).             These six factors multiply together to produce a base score. The relative weight colleges
            assign to activities versus academics is documented in institutional{" "}
            <a
              href="https://commondataset.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-primary)" }}
            >
              Common Data Set
            </a>{" "}
            admissions profiles.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The engine then applies diminishing returns above 10 points (logarithmic saturation),
            divides by 5.5 for a readable curve, adds diversity and depth bonuses, and enforces
            per-tier activity caps so no single bucket dominates. The result is your
            <strong> spike score</strong> — a number the model combines with academics (see our{" "}
            <Link href="/guide/what-gpa-do-you-need-for-college" style={{ color: "var(--color-primary)" }}>
              GPA guide
            </Link>
            ) in a
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
          <GuideFAQ
            items={[
              { q: "How do colleges actually score extracurriculars?", a: "AdmitGPT scores each activity across six dimensions — tier, scope/level, rarity, institutional strength, cognitive load, and validation — which multiply into a base score with logarithmic saturation above 10 points. A single national-level achievement matters far more than ten shallow club memberships." },
              { q: "Do self-reported extracurriculars count the same as verified ones?", a: "No — self-reported claims are auto-downgraded one notch in scope, rarity, and strength, and the whole spike is discounted to a 60% floor when most claims are unverified. Externally audited achievements keep their full value, so proof beats a long list." },
            ]}
          />

<RelatedGuides current="/guide/evaluate-extracurriculars" />
        </section>
      </main>
    </div>
  );
}

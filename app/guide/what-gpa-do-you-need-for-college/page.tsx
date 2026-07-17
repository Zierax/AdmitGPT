import type { Metadata } from "next";
import Link from "next/link";
import { RelatedGuides } from "@/app/components/RelatedGuides";
import { SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "What GPA Do You Need for College? — Admission Requirements by School Type",
  description:
    "A complete guide to GPA requirements for US college admissions: Ivy League GPA thresholds, state school minimums, weighted vs unweighted GPA, and how AdmitGPT converts your grades into an accurate probability.",
  keywords: [
    "what GPA do you need for college",
    "GPA for Ivy League",
    "GPA requirements for Harvard",
    "weighted vs unweighted GPA",
    "GPA converter college admissions",
    "3.5 GPA college options",
    "3.0 GPA college admissions",
    "good GPA for top universities",
    "GPA scale 4.0",
    "high school GPA calculator",
  ],
  openGraph: {
    title: "What GPA Do You Need for College? — Complete Admission Guide",
    description: "Ivy League GPA thresholds, state school minimums, weighted vs unweighted GPA, and how AdmitGPT computes your academic strength from your transcript.",
    url: "/guide/what-gpa-do-you-need-for-college",
    type: "article",
  },
  alternates: { canonical: "/guide/what-gpa-do-you-need-for-college" },
};

export default function GpaCollegeGuide() {
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
              { "@type": "ListItem", position: 3, name: "What GPA Do You Need for College", item: SITE_ORIGIN + "/guide/what-gpa-do-you-need-for-college" },
            ],
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / GPA & Academics</div>
        <h1 className="tp-h1">What GPA Do You Need for College?</h1>
        <p className="tp-lead">
          GPA is the single most important number in your college application. But what counts as
          "good" depends entirely on where you are applying. Here is a school-by-school breakdown
          of GPA thresholds, the difference between weighted and unweighted scales, and how
          AdmitGPT evaluates your transcript.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">GPA thresholds by school selectivity</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>Ivy League &amp; Ivy+ (Harvard, Yale, Princeton, Stanford, MIT):</strong> Median
            unweighted GPA of admitted students is approximately 3.95. Anything below 3.7 unweighted
            places you below the 25th percentile. Weighted GPAs above 4.3 are common among admitted
            students taking 8+ AP/IB courses.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>Top 20–50 national universities (NYU, USC, UNC, Michigan):</strong> Median
            admitted GPA ranges from 3.6–3.9 unweighted. Strong course rigor matters here as well,
            but the curve is gentler. A 3.5 with a rigorous course load is competitive at many in
            this tier.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>Selective liberal arts colleges (Williams, Amherst, Swarthmore):</strong> Similar
            to Ivy+ thresholds, with median unweighted GPAs often above 3.9. These schools weigh
            intellectual curiosity and essay quality heavily alongside GPA.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>State flagships &amp; broad-access schools:</strong> A 3.0–3.5 unweighted GPA
            makes you competitive at most state flagships. Schools like Arizona State, University
            of Arizona, and Iowa admit a majority of applicants with GPAs above 3.0.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Weighted vs unweighted GPA</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Unweighted GPA is on a 4.0 scale (A = 4.0, B = 3.0). Weighted GPA adds bonus points
            for advanced courses (AP = 5.0, Honors = 4.5). Colleges typically recalculate your GPA
            using their own method. AdmitGPT uses a <strong>clean US-4.0 reference</strong> computed
            from the subset of schools that report standard 4.0 scales, then adjusts for context
            via your school's profile.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Can a low GPA be offset?</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            A below-median GPA is hard to overcome at the most selective schools, but not impossible.
            The AdmitGPT model allows extracurricular spike (capped at ±2.0 logit), demonstrated
            passion in a niche field, or exceptional personal circumstances to move the needle. For
            schools in the top 20–50 range, a strong SAT score and compelling spike can often
            compensate for a GPA around the 25th percentile.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The engine's calibration data shows that for schools with admission rates above 25%,
            the model's probability estimates are well-calibrated — meaning the number it gives you
            is close to the observed outcome for similar profiles.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Get your personalized GPA-based probability</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Enter your GPA, course load, and test scores into the AdmitGPT calculator for a
            transparent, data-driven probability estimate for any US college.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Calculate Your College Chances
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <RelatedGuides current="/guide/what-gpa-do-you-need-for-college" />
        </section>
      </main>
    </div>
  );
}

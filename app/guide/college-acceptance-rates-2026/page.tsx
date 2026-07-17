import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { RelatedGuides } from "@/app/components/RelatedGuides";

export const metadata: Metadata = {
  title: "College Acceptance Rates 2026 — Latest Admissions Data by University",
  description:
    "Updated college acceptance rates for the 2025–26 admissions cycle: Ivy League, top 50 national universities, liberal arts colleges, and state flagships. See how acceptance rates have changed and what it means for your chances.",
  keywords: [
    "college acceptance rates 2026",
    "Harvard acceptance rate 2026",
    "Ivy League acceptance rates",
    "Stanford acceptance rate",
    "MIT acceptance rate",
    "college admission rates by school",
    "most selective colleges 2026",
    "college acceptance rate trends",
    "how hard is it to get into Harvard",
    "university admission statistics",
  ],
  openGraph: {
    title: "College Acceptance Rates 2026 — Complete Data by University",
    description: "Ivy League, top 50, and state flagship acceptance rates for the 2025–26 cycle. See how selectivity has changed and how the AdmitGPT engine uses these rates to calculate your odds.",
    url: "/guide/college-acceptance-rates-2026",
    type: "article",
  },
  alternates: { canonical: "/guide/college-acceptance-rates-2026" },
};

export default function AcceptanceRatesGuide() {
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
              { "@type": "ListItem", position: 3, name: "College Acceptance Rates 2026", item: SITE_ORIGIN + "/guide/college-acceptance-rates-2026" },
            ],
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Acceptance Rates</div>
        <h1 className="tp-h1">College Acceptance Rates 2026</h1>
        <p className="tp-lead">
          Acceptance rates are the most visible — and most misunderstood — number in college
          admissions. A school's published rate blends preferred applicants (athletes, legacies,
          development cases) with the general pool. Here is the data for the most-selective US
          universities and what it means for your actual chances.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">Ivy League acceptance rates (Class of 2029)</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Ivy League acceptance rates remain at historic lows. Estimated rates for the most recent
            cycle: Harvard ~3.6%, Columbia ~4.3%, Princeton ~4.4%, Yale ~4.6%, Brown ~5.2%, Penn
            ~5.5%, Dartmouth ~5.8%, Cornell ~7.3%. These rates reflect the total applicant pool,
            but the effective rate for unhooked applicants (no legacy, no athlete status) is
            substantially lower — estimated at 2–3% at Harvard and Yale.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            What these numbers do not tell you: Early Decision acceptance rates are typically 2–4x
            higher than Regular Decision rates. A recruited athlete at an Ivy has an approximately
            86% admission rate. Legacy applicants see 2–4x the base rate. The published number
            averages across all of these groups.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Top 20 national universities</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Stanford admits approximately 3.9% of applicants. MIT admits about 4.5%. Northwestern,
            Duke, and UChicago cluster in the 5–8% range. Johns Hopkins and Vanderbilt admit
            approximately 7–8%. The trend across this tier is downward — application volume has
            increased 35–40% since 2020 while class sizes remain flat, driving acceptance rates
            steadily lower.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Selective liberal arts colleges</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Top liberal arts colleges are as selective as many Ivies. Williams College admits
            approximately 9–10%, Amherst ~7–8%, Swarthmore ~7%, Pomona ~7%, Bowdoin ~8–9%. These
            schools weigh intellectual curiosity, essays, and demonstrated interest heavily — factors
            that AdmitGPT captures through fit adjustments in the model.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">State flagships</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Public university acceptance rates vary dramatically by residency. UCLA admits ~9% of
            applicants overall (more competitive than many Ivies), UC Berkeley ~11%, University of
            Michigan ~18%, UNC Chapel Hill ~17%, UVA ~16%, University of Texas ~29%. Out-of-state
            acceptance rates at these schools are often significantly lower than in-state rates.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">How AdmitGPT uses acceptance rates</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The engine uses each college's published acceptance rate as a baseline, then adjusts
            based on your profile relative to that school's admitted-student distribution. A 10%
            acceptance rate tells you the base odds for a generic applicant. Your actual odds are
            higher or lower depending on your academics, extracurriculars, timing, and hooks. The
            AdmitGPT model applies each of these adjustments transparently — you can see exactly
            how your profile changes the probability for every school.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              See Your Personalized Acceptance Rates
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <RelatedGuides current="/guide/college-acceptance-rates-2026" />
        </section>
      </main>
    </div>
  );
}

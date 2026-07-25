import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { GuideByline } from "@/app/guide/GuideByline";
import { GuideFAQ } from "@/app/guide/GuideFAQ";
import { QuickAnswer } from "@/app/guide/QuickAnswer";
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "College Acceptance Rates 2026 — Latest Admissions Data by University",
            description: "Updated college acceptance rates for the 2025–26 admissions cycle: Ivy League, top 50 national universities, liberal arts colleges, and state flagships. See how acceptance rates have changed and what it means for your chances.",
            inLanguage: "en-US",
            datePublished: "2025-08-01",
            dateModified: "2026-05-12",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": SITE_ORIGIN + "/guide/college-acceptance-rates-2026" },
            isPartOf: { "@type": "WebSite", "@id": SITE_ORIGIN + "/#website" },
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Acceptance Rates</div>
        <h1 className="tp-h1">College Acceptance Rates 2026</h1>
        <GuideByline updated="2026-05-12" />
        <QuickAnswer>
          College acceptance rates for 2026 remain at historic lows at the most selective schools.
          Estimated Ivy League rates for the most recent cycle are Harvard ~3.6%, Columbia ~4.3%,
          Princeton ~4.4%, Yale ~4.6%, Brown ~5.2%, Penn ~5.5%, Dartmouth ~5.8%, and Cornell ~7.3%;
          the effective rate for unhooked applicants is 2&ndash;3% at Harvard and Yale. Among top-20
          universities, Stanford admits ~3.9% and MIT ~4.5%, while selective liberal arts colleges
          such as Williams (~9&ndash;10%) and Amherst (~7&ndash;8%) are comparably tough. Public
          flagships vary by residency &mdash; UCLA ~9%, Berkeley ~11%, Michigan ~18%, UT ~29% &mdash;
          with out-of-state rates often far lower. These published rates blend athletes, legacies,
          and development cases, so Early Decision (2&ndash;4x higher) and hooks dramatically
          reshape your real odds versus the headline number.
        </QuickAnswer>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Acceptance rates are the most visible — and most misunderstood — number in college
            admissions. A school&apos;s published rate blends preferred applicants (athletes, legacies,
            development cases) with the general pool. See our{" "}
            <Link href="/college-search" style={{ color: "var(--color-primary)" }}>
              full college search tool
            </Link>{" "}
            for 1,910 schools ranked by selectivity, or use the{" "}
            <Link href="/best-college-admissions-calculator" style={{ color: "var(--color-primary)" }}>
              best college admissions calculator
            </Link>{" "}
            to see your personalized odds at any school.
          </p>

        <section className="tp-section">
          <h2 className="tp-h2">Ivy League acceptance rates (Class of 2029)</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Ivy League acceptance rates remain at historic lows. Estimated rates for the most recent
            cycle: Harvard ~3.6%, Columbia ~4.3%, Princeton ~4.4%, Yale ~4.6%, Brown ~5.2%, Penn
            ~5.5%, Dartmouth ~5.8%, Cornell ~7.3% — see our full{" "}
            <Link href="/guide/ivy-league-chances" style={{ color: "var(--color-primary)" }}>
              Ivy League chances guide
            </Link>
            . These estimates draw on each school&rsquo;s{" "}
            <a
              href="https://commondataset.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-primary)" }}
            >
              Common Data Set
            </a>{" "}
            admissions reporting. These rates reflect the total applicant pool,
            but the effective rate for unhooked applicants (no legacy, no athlete status) is
            substantially lower — estimated at 2–3% at Harvard and Yale.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            What these numbers do not tell you: Early Decision acceptance rates are typically 2–4x
            higher than Regular Decision rates, as explained in our{" "}
            <Link href="/guide/early-decision-vs-early-action" style={{ color: "var(--color-primary)" }}>
              Early Decision vs Early Action guide
            </Link>
            . A recruited athlete at an Ivy has an approximately
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
          <h2 className="tp-h2">College GPA requirements</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            GPA requirements vary by selectivity tier. See our complete{" "}
            <Link href="/college-gpa-requirements" style={{ color: "var(--color-primary)" }}>
              college GPA requirements guide
            </Link>{" "}
            for data-backed GPA ranges from Ivy League (3.9+) to open admission schools.
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
          <GuideFAQ
            items={[
              { q: "What is Harvard's acceptance rate for 2026?", a: "Estimated Harvard acceptance for the Class of 2029 is about 3.6%, with Columbia ~4.3%, Princeton ~4.4%, and Cornell the highest Ivy at ~7.3%. The effective rate for unhooked applicants (no legacy, no athlete) is 2–3% at Harvard and Yale." },
              { q: "Why is the published acceptance rate misleading?", a: "Published rates blend preferred applicants — athletes, legacies, and development cases — with the general pool. A recruited Ivy athlete has an approximately 86% admission rate and legacies see 2–4x the base rate, so your real odds differ sharply from the headline number." },
            ]}
          />

<RelatedGuides current="/guide/college-acceptance-rates-2026" />
        </section>
      </main>
    </div>
  );
}

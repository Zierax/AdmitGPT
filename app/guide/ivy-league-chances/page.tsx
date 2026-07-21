import type { Metadata } from "next";
import Link from "next/link";
import { RelatedGuides } from "@/app/components/RelatedGuides";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { GuideByline } from "@/app/guide/GuideByline";
import { GuideFAQ } from "@/app/guide/GuideFAQ";
import { QuickAnswer } from "@/app/guide/QuickAnswer";

export const metadata: Metadata = {
  title: "Your Ivy League Admission Chances — Data-Backed Calculator",
  description:
    "See what the numbers say about your Harvard, Yale, Princeton, and other Ivy League admission chances. Honest, data-driven analysis from the open-source AdmitGPT engine — no black boxes, no paid consultants.",
  keywords: [
    "Ivy League admission chances",
    "Harvard acceptance rate 2026",
    "Yale admission probability",
    "Princeton chances calculator",
    "how to get into an Ivy League",
    "Ivy League SAT GPA requirements",
    "Cornell admission odds",
    "Columbia acceptance rate calculator",
  ],
  openGraph: {
    title: "Your Ivy League Admission Chances — Data-Backed Analysis",
    description: "Honest numbers on Harvard, Yale, Princeton, and more from the open-source AdmitGPT engine.",
    url: "/guide/ivy-league-chances",
    type: "article",
  },
  alternates: { canonical: "/guide/ivy-league-chances" },
};

export default function IvyLeagueGuide() {
  return (
    <div className="app-bg" style={{ minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
                { "@type": "ListItem", position: 2, name: "Guides", item: SITE_ORIGIN + "/guide" },
                { "@type": "ListItem", position: 3, name: "Ivy League Chances", item: SITE_ORIGIN + "/guide/ivy-league-chances" },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "ScholarlyArticle",
              headline: "Your Ivy League Admission Chances",
              description:
                "Data-backed analysis of Harvard, Yale, Princeton and Ivy League admission odds from the open-source AdmitGPT additive-logistic engine.",
              inLanguage: "en-US",
              datePublished: "2025-08-01",
              dateModified: "2026-04-18",
              author: { "@id": SITE_ORIGIN + "/#author" },
              publisher: {
                "@type": "Organization",
                name: "AdmitGPT",
                logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/assets/AdmitGPT.png` },
              },
              mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_ORIGIN}/guide/ivy-league-chances` },
              isPartOf: { "@type": "WebSite", "@id": `${SITE_ORIGIN}/#website` },
              about: { "@type": "Thing", name: "Ivy League Admissions" },
              citation: [
                { "@type": "ScholarlyArticle", name: "Giani & Walling (2020), admissions modeling", url: "https://doi.org/10.1080/00221546.2020.1725180" },
                { "@type": "ScholarlyArticle", name: "Lee, Kizilcec & Joachims (2023), admissions research", url: "https://arxiv.org/abs/2306.04224" },
              ],
            },
          ]),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Your Ivy League Admission Chances — Data-Backed Calculator",
            description: "See what the numbers say about your Harvard, Yale, Princeton, and other Ivy League admission chances. Honest, data-driven analysis from the open-source AdmitGPT engine — no black boxes, no paid consultants.",
            inLanguage: "en-US",
            datePublished: "2025-08-01",
            dateModified: "2026-04-18",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": SITE_ORIGIN + "/guide/ivy-league-chances" },
            isPartOf: { "@type": "WebSite", "@id": SITE_ORIGIN + "/#website" },
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Ivy League</div>
        <h1 className="tp-h1">Your Ivy League Admission Chances</h1>
        <GuideByline updated="2026-04-18" />
        <QuickAnswer>
          Your Ivy League admission chances are extremely low for most applicants but vary sharply
          by school, profile, and round. Estimated acceptance rates for the Class of 2029 range
          from Harvard at roughly 3.6% to Cornell near 7.3%; the effective rate for unhooked
          applicants (no legacy, no athlete status) falls further, to about 2&ndash;3% at Harvard
          and Yale. Binding Early Decision offers a real advantage &mdash; ED rates run 2&ndash;4x
          higher than Regular Decision, such as Dartmouth&rsquo;s ~19% ED versus ~4.5% RD. The
          AdmitGPT additive-logistic model shows three factors dominate: academic strength (GPA
          and SAT, weighted 1.5x in the logit), extracurricular spike (capped at &plusmn;2.0),
          and fit. At sub-10% schools the engine systematically under-predicts, so treat any
          single-digit figure as &ldquo;very hard, but the true odds are higher.&rdquo;
        </QuickAnswer>
        <p className="tp-lead">
          Every fall, thousands of students ask the same question: &ldquo;What are my chances of
          getting into an Ivy League school?&rdquo; The answer is complex, but data helps cut through
          the noise. Here is what the AdmitGPT engine actually reveals — and what it does not know.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">What determines your Ivy League odds?</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            AdmitGPT uses an additive-logistic model — the same class of model used in modern
            admissions research (Giani &amp; Walling 2020; Lee, Kizilcec &amp; Joachims 2023).
            For Ivy League schools, three factors dominate: <strong>
              <Link href="/guide/what-gpa-do-you-need-for-college" style={{ color: "var(--color-primary)" }}>
                academic strength
              </Link>
            </strong>,
            <strong>extracurricular spike</strong>, and <strong>fit</strong>.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Academically, your SAT and GPA are z-scored against each college&rsquo;s own distribution
            and a clean US-4.0 reference. The combined academic Z (capped at [&minus;4, 4]) is
            multiplied by 1.5 in the logit — so a strong GPA and test score carry the most weight.
            This reflects the real admissions landscape: at elite schools, grades and test scores are
            the first filter.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Your extracurricular spike is scored across six dimensions — tier, level, rarity,
            institutional strength, cognitive load, and validation — and capped at a logit contribution
            of &plusmn;2.0 so no single achievement can overpower weak academics. The model then adds
            modifiers for intended major and international status.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">The honest part: calibration limits</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            At the most selective schools (admission rate below 10%), AdmitGPT <em>under-predicts</em>
            systematically. In decile 10 (the hardest schools), the model predicts around 1.3% but the
            actual observed rate is 24.6%, a gap visible in the institutional{" "}
            <a
              href="https://commondataset.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-primary)" }}
            >
              Common Data Set
            </a>{" "}
            filings that publish admitted-student rates. The ordinal ranking is reliable — the engine correctly
            orders applicants about three-quarters of the time (AUC ~0.74) — but the exact percentage
            at the top end is too conservative. Take any single-digit number as &ldquo;very hard, but
            the true odds are higher than this says.&rdquo; For the published headline numbers, see our{" "}
            <Link href="/guide/college-acceptance-rates-2026" style={{ color: "var(--color-primary)" }}>
              college acceptance rates 2026
            </Link>{" "}
            breakdown.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Get your Ivy League probability</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Instead of paying consultants for &ldquo;insider magic,&rdquo; run your own profile
            through the transparent AdmitGPT calculator. Every formula is open source, every weight
            is published, and your data never leaves your browser.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Calculate Your Ivy League Chances
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <GuideFAQ
            items={[
              { q: "What are my real chances of getting into an Ivy League school?", a: "Estimated acceptance rates for the Class of 2029 range from Harvard at roughly 3.6% to Cornell near 7.3%, but the effective rate for unhooked applicants (no legacy, no athlete status) falls further, to about 2–3% at Harvard and Yale. Treat any single-digit figure as very hard, but the true odds are higher than the model predicts." },
              { q: "Does applying Early Decision actually improve my Ivy League odds?", a: "Yes — binding Early Decision offers a real advantage because ED rates run 2–4x higher than Regular Decision, such as Dartmouth's ~19% ED versus ~4.5% RD. The trade-off is that ED is binding, so you cannot compare financial aid offers across schools." },
            ]}
          />

<RelatedGuides current="/guide/ivy-league-chances" />
        </section>
      </main>
    </div>
  );
}

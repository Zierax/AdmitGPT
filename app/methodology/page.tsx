import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN, GITHUB_URL } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "AdmitGPT Methodology — The Additive-Logistic Admissions Model, Explained",
  description:
    "A detailed explanation of the additive-logistic model behind AdmitGPT's college admissions probability calculator. How z-scores, extracurricular spike scoring, and logistic regression combine to estimate your admission odds. Based on published admissions research.",
  keywords: [
    "admissions probability model",
    "additive-logistic admissions",
    "college admissions algorithm",
    "how college admissions calculator works",
    "admissions research methodology",
    "logistic regression college admissions",
    "extracurricular spike scoring",
    "z-score admissions model",
  ],
  openGraph: {
    title: "AdmitGPT Methodology — The Additive-Logistic Admissions Model",
    description:
      "A detailed explanation of the additive-logistic model behind AdmitGPT's college admissions probability calculator. Based on published admissions research.",
    url: "/methodology",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdmitGPT Methodology — The Additive-Logistic Admissions Model",
    description:
      "How AdmitGPT's transparent admissions model works, based on published research.",
  },
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
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
              { "@type": "ListItem", position: 2, name: "Methodology", item: `${SITE_ORIGIN}/methodology` },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ScholarlyArticle",
            headline: "AdmitGPT Methodology — The Additive-Logistic Admissions Model",
            description:
              "A detailed explanation of the additive-logistic model behind AdmitGPT's college admissions probability calculator.",
            inLanguage: "en-US",
            datePublished: "2025-08-01",
            dateModified: "2026-05-12",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_ORIGIN}/methodology` },
            isPartOf: { "@type": "WebSite", "@id": `${SITE_ORIGIN}/#website" },
            about: { "@type": "Thing", name: "College admissions probability modeling" },
            citation: [
              { "@type": "ScholarlyArticle", name: "Giani & Walling (2020), admissions modeling", url: "https://doi.org/10.1080/00221546.2020.1725180" },
              { "@type": "ScholarlyArticle", name: "Lee, Kizilcec & Joachims (2023), admissions research", url: "https://arxiv.org/abs/2306.04224" },
            ],
          }),
        }}
      />
      <main className="tp-wrap">
        <span className="tp-eyebrow">Methodology</span>
        <h1 className="tp-h1">The Additive-Logistic Admissions Model</h1>
        <p className="tp-lead">
          AdmitGPT uses an additive-logistic model — the same class of model used in published
          admissions research (Giani &amp; Walling 2020; Lee, Kizilcec &amp; Joachims 2023).
          Every formula, weight, and coefficient is published openly. No black boxes.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">The model in one sentence</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            AdmitGPT converts your academic metrics into z-scores against each school&apos;s own
            admitted-student distribution, adds an extracurricular spike score and contextual
            modifiers, then passes the sum through a logistic function to produce a probability
            between 0% and 100%.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Step 1: Academic z-scores</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            Your SAT and GPA are converted to z-scores — standard deviations from the mean —
            using each college&apos;s own admitted-student distribution. This means a 1500 SAT at
            a school where the average is 1300 is weighted differently than a 1500 at a school
            where the average is 1480. The combined academic z-score (capped at [-4, 4]) is
            multiplied by 1.5 in the logit, reflecting that academic strength is the single
            strongest predictor of admission.
          </p>
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 12,
              border: "1px solid var(--color-border)",
              background: "var(--color-surface, rgba(255,255,255,0.03))",
              fontFamily: "monospace",
              fontSize: 14,
              marginTop: 16,
              lineHeight: 1.8,
            }}
          >
            academic_z = (gpa_z + sat_z) / 2<br />
            academic_z = clamp(academic_z, -4, 4)<br />
            logit += 1.5 * academic_z
          </div>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Step 2: Extracurricular spike score</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            The extracurricular spike is scored across six dimensions:
          </p>
          <ol
            className="ag-muted"
            style={{ fontSize: 15, lineHeight: 2, paddingLeft: 24 }}
          >
            <li><strong>Tier</strong> — from local (tier 5) to international (tier 1)</li>
            <li><strong>Level</strong> — from participation to leadership</li>
            <li><strong>Rarity</strong> — how common the activity is among applicants</li>
            <li><strong>Institutional strength</strong> — how well-regarded the activity is by admissions offices</li>
            <li><strong>Cognitive load</strong> — intellectual depth required</li>
            <li><strong>Validation</strong> — external recognition (awards, publications, etc.)</li>
          </ol>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            The spike contribution is capped at ±2.0 in the logit so no single activity can
            overpower weak academics. This cap reflects the reality that even the most
            impressive extracurricular cannot compensate for a GPA that is significantly below
            a school&apos;s median.
          </p>
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 12,
              border: "1px solid var(--color-border)",
              background: "var(--color-surface, rgba(255,255,255,0.03))",
              fontFamily: "monospace",
              fontSize: 14,
              marginTop: 16,
              lineHeight: 1.8,
            }}
          >
            spike_raw = Σ(dimension_score[i] * weight[i])<br />
            spike = clamp(spike_raw, -2.0, 2.0)<br />
            logit += spike
          </div>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Step 3: Contextual modifiers</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            Three additional modifiers adjust the logit:
          </p>
          <ul
            className="ag-muted"
            style={{ fontSize: 15, lineHeight: 2, paddingLeft: 24 }}
          >
            <li><strong>Intended major fit</strong> — competitive majors (CS, engineering, pre-med) receive a negative adjustment; less competitive majors receive a positive adjustment</li>
            <li><strong>International status</strong> — international applicants at need-aware schools receive a negative adjustment reflecting the additional competition for limited international spots</li>
            <li><strong>Early Decision timing</strong> — ED applicants receive a positive adjustment reflecting the historically higher ED acceptance rates (2–4x Regular Decision)</li>
          </ul>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Step 4: Logistic conversion</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            The final logit value is converted to a probability using the logistic function:
          </p>
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 12,
              border: "1px solid var(--color-border)",
              background: "var(--color-surface, rgba(255,255,255,0.03))",
              fontFamily: "monospace",
              fontSize: 14,
              marginTop: 16,
              lineHeight: 1.8,
            }}
          >
            probability = 1 / (1 + e^(-logit))
          </div>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            The result is a probability between 0% and 100% for each school. The model does
            not use machine learning or neural networks — it is a transparent, interpretable
            statistical model with published coefficients.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Calibration and accuracy</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            The model is calibrated on 1,122 self-reported applicant profiles (2020–2023) and
            validated against the IPEDS college database. Key metrics:
          </p>
          <ul
            className="ag-muted"
            style={{ fontSize: 15, lineHeight: 2, paddingLeft: 24 }}
          >
            <li><strong>Ordinal AUC: ~0.74</strong> — the model correctly ranks similar applicants in the right order about three-quarters of the time</li>
            <li><strong>Well-calibrated for 25–75% admit rates</strong> — predictions closely match observed outcomes in the middle range</li>
            <li><strong>Systematically under-predicts at sub-10% schools</strong> — predicted ~1.3% vs observed ~24.6% in the hardest decile</li>
          </ul>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            The under-prediction at highly selective schools is a known limitation of additive
            logistic models. We report this openly rather than hiding it. For detailed
            calibration analysis, see the{" "}
            <Link href="/transparency" style={{ color: "var(--color-primary)" }}>
              Transparency page
            </Link>
            .
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">What the model does NOT capture</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            No model can capture everything. AdmitGPT does not model:
          </p>
          <ul
            className="ag-muted"
            style={{ fontSize: 15, lineHeight: 2, paddingLeft: 24 }}
          >
            <li>Essay quality and personal statements</li>
            <li>Letters of recommendation</li>
            <li>Interview performance</li>
            <li>Demonstrated interest</li>
            <li>Holistic reader judgment</li>
            <li>Institutional priorities (development cases, athlete recruiting)</li>
          </ul>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            These factors are significant, especially at the most selective schools. That is why
            the model under-predicts at sub-10% schools — the published admission rate blends
            all of these factors, while the model only captures the measurable ones.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Academic basis</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            The additive-logistic approach is grounded in published admissions research:
          </p>
          <ul
            className="ag-muted"
            style={{ fontSize: 15, lineHeight: 2, paddingLeft: 24 }}
          >
            <li>
              Giani &amp; Walling (2020) — &quot;Access and Outcomes of US Transfer Students&quot; — used logistic regression to model admissions outcomes
            </li>
            <li>
              Lee, Kizilcec &amp; Joachims (2023) — &quot;Modeling College Admissions&quot; — applied additive logistic models to admissions data
            </li>
          </ul>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            AdmitGPT adapts this approach for a web-based calculator, adding extracurricular
            scoring and contextual modifiers that go beyond what academic papers typically model.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Open source</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            Every formula, weight, and coefficient is published in the open-source repository.
            You can verify the math yourself, fork the project, or contribute improvements.
          </p>
          <div style={{ marginTop: 20 }}>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              View Source Code on GitHub
            </a>
            <Link href="/transparency" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Full Transparency Report
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

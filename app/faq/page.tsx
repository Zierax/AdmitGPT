import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "College Admissions FAQ — Free Guide | AdmitGPT",
  description:
    "Answers to the most common college admissions questions: how chances calculators work, what GPA and SAT scores you need, test-optional policies, early decision strategy, and more — from the creators of the open-source AdmitGPT engine.",
};

const faqs = [
  {
    q: "How does a college admissions chances calculator work?",
    a: "College chances calculators use statistical models to estimate your probability of admission based on your GPA, test scores, extracurriculars, and other factors. The best calculators (like AdmitGPT) use transparent, published models rather than black-box algorithms. They provide directional estimates, not guarantees — admissions decisions depend on many factors no model can capture, including essay quality and institutional priorities.",
  },
  {
    q: "What GPA do you need to get into Harvard?",
    a: "Harvard's median admitted GPA is approximately 3.95 unweighted on a 4.0 scale. Most admitted students have taken the most rigorous curriculum available at their high school, including AP, IB, or dual-enrollment courses. A GPA below 3.7 unweighted places you below the 25th percentile. However, Harvard practices holistic review — exceptional extracurriculars, essays, or personal circumstances can offset a below-median GPA.",
  },
  {
    q: "Does applying Early Decision increase your chances?",
    a: "Yes, significantly at most schools. Early Decision acceptance rates are typically 2–4x higher than Regular Decision rates at selective universities. For example, Dartmouth's ED admit rate is approximately 19% vs 4.5% for RD. However, ED is binding — if admitted, you must enroll. Use a net price calculator first to ensure the cost is manageable. Non-binding Early Action offers a smaller boost but preserves your ability to compare financial aid offers.",
  },
  {
    q: "Is it better to apply test-optional or submit a low SAT score?",
    a: "If your SAT score is below a school's 25th percentile and the school offers test-optional admission, it is generally better to apply without scores. At schools that are test-required (all Ivy League schools as of 2026), you must submit regardless. At test-optional schools, submitting a strong score (above the school's median) still helps both admission and merit scholarship consideration.",
  },
  {
    q: "What is a good SAT score for the Ivy League?",
    a: "The middle 50% SAT range across Ivy League schools is approximately 1460–1570. Harvard and Yale's middle 50% are 1490–1580. Scoring above 1550 places you at or above the 75th percentile at most Ivies. Below 1450, you are below the 25th percentile at most Ivy League schools. Every Ivy League school has returned to requiring test scores as of the 2025–26 cycle.",
  },
  {
    q: "How do admission chances calculators actually compute probability?",
    a: "AdmitGPT uses an additive-logistic model — a transparent statistical approach used in modern admissions research. It converts your GPA and SAT scores into z-scores (standard deviations from the school's admitted-student mean), combines them with an extracurricular spike score (scored across six dimensions), applies modifiers for major, international status, and early decision timing, then converts the sum through a logistic function into a probability between 0% and 100%. Every formula and weight is published in the open-source repository.",
  },
  {
    q: "Can international students get financial aid at US colleges?",
    a: "Yes, but options are limited. Only a small number of US colleges are need-blind for international students: Harvard, Yale, Princeton, MIT, Dartmouth, Brown, Amherst, Bowdoin, and a few others. At these schools, financial need does not affect admission decisions. At all other US universities, international students are evaluated on a need-aware basis — requesting financial aid can reduce your chances of admission.",
  },
  {
    q: "What extracurriculars impress college admissions officers?",
    a: "Admissions officers value depth over breadth. A single national-level achievement (tier 1–2) carries more weight than ten school-club memberships. The AdmitGPT engine scores extracurriculars across six dimensions: tier (local to international), level (participation to leadership), rarity (how common the activity is), institutional strength, cognitive load, and validation (external recognition). The spike contribution is capped at ±2.0 in the logit so no single activity can overpower academics.",
  },
  {
    q: "How many colleges should I apply to?",
    a: "A balanced college list typically includes 8–12 schools: 2–4 safety schools (admission rate over 50% for your profile), 3–5 target schools (20–50% chance), and 2–3 reach schools (under 20% chance). Applying to more than 15 schools rarely improves outcomes and significantly increases essay workload. The Common App allows up to 20 schools.",
  },
  {
    q: "Is AdmitGPT really free and open-source?",
    a: "Yes. AdmitGPT is 100% free and open-source under the MIT license. There are no paywalls, no account requirements, and no hidden fees. The entire model runs client-side in your browser — your profile data is never uploaded to any server. The source code is publicly available on GitHub for anyone to audit, fork, or improve.",
  },
  {
    q: "What is the difference between Early Decision and Early Action?",
    a: "Early Decision (ED) is a binding commitment — if admitted, you must enroll and withdraw all other applications. Early Action (EA) is non-binding — you receive an early decision but have until May 1 to choose. ED typically offers a larger admissions boost (2–4x vs RD) but removes your ability to compare financial aid offers. EA offers a smaller boost (1.2–1.8x) with full flexibility. Some schools offer Restrictive Early Action (REA) or Single-Choice Early Action (SCEA), which are non-binding but limit where else you can apply early.",
  },
  {
    q: "Do I need to take the SAT or ACT in 2026?",
    a: "It depends on your target schools. All Ivy League schools and many selective universities (MIT, Georgetown, UT Austin, University of Florida) now require test scores. However, more than 90% of four-year US colleges remain test-optional. The best strategy: take the SAT or ACT, see your score, then decide school-by-school whether submitting helps. A strong score (above the school's median) always helps. A weak score can be withheld at test-optional schools.",
  },
  {
    q: "How accurate are college admission chance calculators?",
    a: "No calculator can predict individual admission outcomes with certainty — admissions decisions depend on factors no model can capture (essay quality, interview performance, institutional priorities, subjective reader judgment). The best calculators provide directional estimates based on historical data. AdmitGPT is transparent about its calibration limits: at schools with admission rates below 10%, the model under-predicts systematically (predicted ~1.3% vs observed ~24.6% in the hardest decile). The ordinal ranking (which schools are better or worse for your profile) is reliable, with AUC ~0.74.",
  },
  {
    q: "What is the Common App and when does it open?",
    a: "The Common Application (Common App) is a platform used by over 1,000 colleges for undergraduate admissions. It includes a personal essay (650 words), an activities list (10 slots), and school-specific supplemental essays. The Common App opens on August 1 each year for the upcoming admissions cycle. You can create an account earlier, but the application forms and essay prompts go live on August 1.",
  },
  {
    q: "How does AdmitGPT handle GPA from schools outside the US?",
    a: "The engine accepts GPA entries on a 4.0 scale. For international grading systems, you should convert your grades to a 4.0 scale before entering them. The academic score component normalizes your entered GPA against each college's own distribution, so the exact conversion method matters less than the relative position. Students with international curricula (IB, A-Levels) should convert using widely accepted concordance tables.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <div className="app-bg" style={{ minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Help Center</div>
        <h1 className="tp-h1">College Admissions FAQ</h1>
        <p className="tp-lead">
          Quick answers to the most common questions about college admissions, the AdmitGPT
          calculator, and how to improve your odds — no fluff, just the data.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 48 }}>
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="ag-card"
              style={{ padding: "16px 20px", cursor: "pointer" }}
            >
              <summary
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: "var(--color-foreground)",
                  outline: "none",
                }}
              >
                {faq.q}
              </summary>
              <p
                className="ag-muted"
                style={{
                  fontSize: 14,
                  lineHeight: 1.7,
                  marginTop: 12,
                  marginBottom: 0,
                  cursor: "default",
                }}
              >
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        <div style={{ marginTop: 56, textAlign: "center" }}>
          <p className="ag-muted" style={{ marginBottom: 20, fontSize: 14 }}>
            Still have questions? Try the AdmitGPT calculator for a personalized probability estimate.
          </p>
          <Link href="/" className="btn btn-primary">
            Calculate Your Chances
          </Link>
          <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
            View All Guides
          </Link>
        </div>
      </main>
    </div>
  );
}

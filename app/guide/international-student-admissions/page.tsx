import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "International Student US College Admissions — Complete Guide 2026",
  description:
    "Everything international students need to know about US college admissions: financial aid for non-US citizens, need-blind vs need-aware schools, TOEFL requirements, and how AdmitGPT adjusts its model for international applicants.",
  keywords: [
    "international student US college admission",
    "financial aid for international students US",
    "need-blind colleges international students",
    "international student Ivy League",
    "TOEFL requirements for US universities",
    "SAT for international students",
    "US university admission for international students",
    "international student scholarship US",
    "need-aware vs need-blind",
    "international applicant tips",
  ],
  openGraph: {
    title: "International Student US College Admissions Guide — 2026",
    description: "Financial aid, need-blind schools, testing requirements, and how AdmitGPT accounts for international applicant context in its probability model.",
    url: "/guide/international-student-admissions",
    type: "article",
  },
  alternates: { canonical: "/guide/international-student-admissions" },
};

export default function InternationalGuide() {
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
              { "@type": "ListItem", position: 3, name: "International Student Admissions", item: SITE_ORIGIN + "/guide/international-student-admissions" },
            ],
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / International Students</div>
        <h1 className="tp-h1">International Student US College Admissions</h1>
        <p className="tp-lead">
          Applying to US colleges as an international student comes with unique challenges: visa
          requirements, financial aid limitations, and a different evaluation context. Here is what
          the data shows about admission rates, need-blind policies, and how the AdmitGPT engine
          adjusts for international applicants.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">How the US admission landscape differs for internationals</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            International applicants face a fundamentally different admissions landscape. At most
            US universities, international students are admitted at lower rates than domestic
            applicants because colleges limit international enrollment. At top private universities,
            international students typically make up 10–15% of the class. At public flagships,
            the cap is often lower — sometimes 5–10% — because public schools prioritize in-state
            residents.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The AdmitGPT engine accounts for this through a non-resident modifier. When you enter
            an international high school location, the model applies a probability adjustment that
            reflects the lower base rate for international applicants at that school. For public
            universities, the adjustment is larger because out-of-country applicants compete in the
            non-resident pool.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Financial aid: need-blind vs need-aware</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Only a handful of US schools are <strong>need-blind for international students</strong>:
            Harvard, Yale, Princeton, MIT, Dartmouth, Brown, Amherst, Bowdoin, and a few others.
            Need-blind means your ability to pay is not considered in the admission decision. All
            other US universities are <strong>need-aware</strong> for internationals, meaning
            financial need can negatively affect your admission chances.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The AdmitGPT engine allows you to toggle financial aid requirements in your profile.
            For need-aware schools, requesting aid reduces your estimated probability. For need-blind
            schools, the aid toggle has no effect on the probability. This is one of the most
            important factors for international applicants to understand before applying.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Testing: SAT, ACT, TOEFL, IELTS</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            International applicants need to navigate two sets of tests. The SAT or ACT serves the
            same role as for domestic applicants — it is compared against the school's admitted-
            student distribution. The AdmitGPT engine accepts SAT scores directly and converts ACT
            scores via concordance tables.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            For non-native English speakers, TOEFL or IELTS scores are typically required. Most
            selective US schools expect TOEFL iBT scores of 100+ or IELTS scores of 7.0+. The
            AdmitGPT engine does not directly model English proficiency scores, but they are a
            binary requirement — meeting the published minimum is necessary but not sufficient for
            admission.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Regional context and spike scoring</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The engine normalizes your application against peers from your region. International
            applicants from highly competitive regions (e.g., China, India, South Korea) face
            stiffer relative competition. The spike score model also applies an international
            adjustment: when academic Z is negative, a 1.25x boost is applied to the spike
            contribution, reflecting that a strong spike is more differentiating for applicants
            whose academic profile is below the domestic median.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Get your international admission probability</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Run your international profile through the free AdmitGPT calculator. Toggle aid
            requirements, compare need-blind vs need-aware schools, and see your probability
            across dozens of US universities.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Calculate Your US College Chances
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

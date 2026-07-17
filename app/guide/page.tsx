import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE_ORIGIN } from "@/lib/siteConfig";

const guides = [
  {
    slug: "ivy-league-chances",
    title: "Your Ivy League Admission Chances",
    desc: "How the numbers actually stack up for Harvard, Yale, Princeton, and the rest — and what the model honestly tells you about your odds.",
    tags: "Ivy League chances, Harvard acceptance rate, Ivy admissions",
  },
  {
    slug: "how-to-get-into-ivy-league",
    title: "How to Get Into an Ivy League School",
    desc: "What actually moves the needle: GPA thresholds, SAT ranges, extracurricular depth, and early decision timing — organized by what you can control.",
    tags: "how to get into Harvard, Ivy League tips, college application strategy",
  },
  {
    slug: "early-decision-vs-early-action",
    title: "Early Decision vs Early Action — Which Boosts Your Chances?",
    desc: "The data on binding vs non-binding early applications, how large the ED advantage really is, and which strategy fits your profile.",
    tags: "early decision, early action, ED vs EA, college application timing",
  },
  {
    slug: "what-gpa-do-you-need-for-college",
    title: "What GPA Do You Need for College?",
    desc: "GPA thresholds by school selectivity: Ivy League, top 20–50 universities, state flagships — plus weighted vs unweighted, and how AdmitGPT evaluates your transcript.",
    tags: "GPA for college, weighted unweighted GPA, Ivy League GPA requirements",
  },
  {
    slug: "good-sat-score-for-ivy-league",
    title: "Good SAT Score for Ivy League Admission",
    desc: "School-by-school SAT middle 50% ranges for every Ivy, how z-scoring works, and when to go test-optional with confidence.",
    tags: "SAT Ivy League, Harvard SAT score, test optional strategy",
  },
  {
    slug: "international-student-admissions",
    title: "International Student US College Admissions",
    desc: "Need-blind vs need-aware financial aid, testing requirements, regional context adjustments, and how the AdmitGPT engine adapts for international applicants.",
    tags: "international student, US college admission, need-blind, financial aid",
  },
  {
    slug: "test-optional-admissions",
    title: "Does Going Test-Optional Hurt Your Chances?",
    desc: "What happens when you submit SAT/ACT scores vs. when you don't — a data-backed look at test-optional policy impact from the AdmitGPT engine.",
    tags: "test-optional, SAT optional, ACT scores, college admission",
  },
  {
    slug: "evaluate-extracurriculars",
    title: "How Colleges Score Your Extracurriculars & Spike",
    desc: "The six-dimension rubric behind AdmitGPT's spike score — tier, level, rarity, validation, and more — and how you can strengthen your profile.",
    tags: "extracurriculars, spike score, college activities, EC evaluation",
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_ORIGIN}/guide` },
  ],
};

const articleListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: guides.map((g, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `${SITE_ORIGIN}/guide/${g.slug}`,
    item: {
      "@type": "Article",
      headline: g.title,
      url: `${SITE_ORIGIN}/guide/${g.slug}`,
    },
  })),
};

export default function GuideHub() {
  return (
    <div className="app-bg" style={{ minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleListJsonLd) }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Admissions Knowledge Base</div>
        <h1 className="tp-h1">College Admissions Guides</h1>
        <p className="tp-lead">
          Honest, data-driven guides to help you understand your admission odds — written by the
          team behind AdmitGPT&rsquo;s transparent, open-source engine.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            marginTop: 48,
          }}
        >
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guide/${g.slug}`}
              className="ag-card"
              style={{ textDecoration: "none", display: "block" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <div>
                  <h2
                    className="tp-h3"
                    style={{ color: "var(--color-foreground)", marginBottom: 6 }}
                  >
                    {g.title}
                  </h2>
                  <p
                    className="ag-muted"
                    style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}
                  >
                    {g.desc}
                  </p>
                  <p
                    className="ag-dim"
                    style={{ fontSize: 11, marginTop: 10, letterSpacing: "0.02em" }}
                  >
                    {g.tags}
                  </p>
                </div>
                <ArrowRight
                  size={22}
                  style={{ color: "var(--color-primary)", flexShrink: 0 }}
                />
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 56, textAlign: "center" }}>
          <Link href="/" className="btn btn-primary">
            Try the AdmitGPT Calculator
          </Link>
        </div>
      </main>
    </div>
  );
}

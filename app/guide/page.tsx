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

export default function GuideHub() {
  return (
    <div className="app-bg" style={{ minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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

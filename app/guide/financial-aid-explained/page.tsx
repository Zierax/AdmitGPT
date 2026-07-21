import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { GuideByline } from "@/app/guide/GuideByline";
import { GuideFAQ } from "@/app/guide/GuideFAQ";
import { QuickAnswer } from "@/app/guide/QuickAnswer";
import { RelatedGuides } from "@/app/components/RelatedGuides";

export const metadata: Metadata = {
  title: "College Financial Aid Explained — FAFSA, CSS Profile, Scholarships & Net Price",
  description:
    "Complete guide to college financial aid: FAFSA and CSS Profile explained, need-blind vs need-aware admissions, merit scholarships, Parent PLUS loan changes, and how to estimate your true cost.",
  keywords: [
    "financial aid for college",
    "FAFSA explained",
    "CSS Profile",
    "college scholarships",
    "need-blind vs need-aware",
    "financial aid for international students",
    "net price calculator",
    "merit scholarships college",
    "Parent PLUS loan limit",
    "college financial aid guide",
  ],
  openGraph: {
    title: "College Financial Aid Explained — FAFSA to Scholarships",
    description: "How the FAFSA and CSS Profile work, need-blind vs need-aware policies, merit scholarship strategies, and how to estimate your true college cost.",
    url: "/guide/financial-aid-explained",
    type: "article",
  },
  alternates: { canonical: "/guide/financial-aid-explained" },
};

export default function FinancialAidGuide() {
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
              { "@type": "ListItem", position: 3, name: "College Financial Aid Explained", item: SITE_ORIGIN + "/guide/financial-aid-explained" },
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
            headline: "College Financial Aid Explained — FAFSA, CSS Profile, Scholarships & Net Price",
            description: "Complete guide to college financial aid: FAFSA and CSS Profile explained, need-blind vs need-aware admissions, merit scholarships, Parent PLUS loan changes, and how to estimate your true cost.",
            inLanguage: "en-US",
            datePublished: "2025-08-01",
            dateModified: "2026-04-25",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": SITE_ORIGIN + "/guide/financial-aid-explained" },
            isPartOf: { "@type": "WebSite", "@id": SITE_ORIGIN + "/#website" },
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Financial Aid</div>
        <h1 className="tp-h1">College Financial Aid Explained</h1>
        <GuideByline updated="2026-04-25" />
        <QuickAnswer>
          College financial aid works through two main applications and two admission postures. The
          FAFSA, required for all federal, most state, and institutional aid, opens as early as
          September and computes your Student Aid Index; filing within the first three months
          typically yields more grant aid, though state and school deadlines often fall between
          November and February. About 250 mostly private colleges also require the CSS Profile,
          which digs into home equity and business assets. Schools are either need-blind (admit
          without considering ability to pay &mdash; for international students, only Harvard, Yale,
          Princeton, MIT, Dartmouth, Brown, Amherst, Bowdoin, and a few others) or need-aware, where
          requesting aid can lower your odds. Merit aid often follows a strong SAT above a
          school&rsquo;s 75th percentile. The 2025 One Big Beautiful Bill Act caps Parent PLUS
          loans at $20,000 per year from July 2026, limiting that funding route.
        </QuickAnswer>
        <p className="tp-lead">
          College costs can feel opaque, but the financial aid process is actually a set of rules
          you can understand. Here is how the FAFSA, CSS Profile, need-blind policies, and merit
          scholarships actually work — and how they affect your admissions odds.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">FAFSA: the foundation of aid</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The Free Application for Federal Student Aid (FAFSA) is required for all federal aid,
            most state aid, and institutional aid at every US college. The 2026–27 FAFSA calculates
            your Student Aid Index (SAI) — the amount your family is expected to contribute. Full
            details and the official form are at{" "}
            <a
              href="https://studentaid.gov"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-primary)" }}
            >
              StudentAid.gov
            </a>
            , the federal aid authority. The
            FAFSA opens as early as September for the following academic year. File it as soon as
            possible: students who file within the first three months typically receive more grant
            aid. The federal deadline is June 30, but state and institutional deadlines are much
            earlier — many fall between November and February.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">CSS Profile: for selective private schools</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Approximately 250 mostly private colleges require the CSS Profile in addition to the
            FAFSA. The CSS Profile asks for more detailed financial information — home equity,
            business assets, and non-custodial parent income — and can result in a significantly
            different need calculation. Check each school's financial aid page for their specific
            requirements and deadlines. Missing the CSS Profile deadline can cost you thousands in
            institutional aid.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Need-blind vs need-aware admissions</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>Need-blind:</strong> The school admits students without considering their ability
            to pay. Most US schools are need-blind for domestic applicants.             Only a handful — Harvard,
            Yale, Princeton, MIT, Dartmouth, Brown, Amherst, Bowdoin, and a few others — are
            need-blind for international students as well. International applicants should read our{" "}
            <Link href="/guide/international-student-admissions" style={{ color: "var(--color-primary)" }}>
              international admissions guide
            </Link>
            .
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>Need-aware:</strong> The school considers financial need in the admission
            decision. For international students requesting aid at a need-aware school, the admission
            bar is substantially higher. The AdmitGPT engine lets you toggle financial aid
            requirements to see how it affects your probability at each school type.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Merit scholarships and Parent PLUS changes</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Merit scholarships are awarded based on academic or extracurricular achievement,
            regardless of financial need. Strong SAT scores (above a school's 75th percentile) often
            unlock significant merit aid, even at need-aware schools. The One Big Beautiful Bill Act,
            passed in 2025, capped Parent PLUS borrowing at $20,000 per year starting July 2026, so
            relying on Parent PLUS to cover unmet need is no longer an option.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">How financial aid affects your admissions strategy</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            If you need financial aid, your college list strategy changes. Prioritize need-blind
            schools as reaches, using the framework in our{" "}
            <Link href="/guide/how-to-choose-a-college" style={{ color: "var(--color-primary)" }}>
              how to choose a college guide
            </Link>
            . Include schools where your academic profile is above the 75th
            percentile — these are where merit scholarships become realistic. Use the AdmitGPT
            calculator to see which schools offer the best probability-aid combination for your
            specific situation.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Calculate Your Chances & Aid Impact
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <GuideFAQ
            items={[
              { q: "Which schools are need-blind for international students?", a: "Only a handful are need-blind for internationals — Harvard, Yale, Princeton, MIT, Dartmouth, Brown, Amherst, Bowdoin, and a few others. At all other US universities, requesting aid can lower your admission odds because they are need-aware." },
              { q: "Do I need the CSS Profile in addition to the FAFSA?", a: "About 250 mostly private colleges also require the CSS Profile, which digs into home equity and business assets and can yield a very different need calculation. Missing its deadline can cost you thousands in institutional aid." },
            ]}
          />

<RelatedGuides current="/guide/financial-aid-explained" />
        </section>
      </main>
    </div>
  );
}

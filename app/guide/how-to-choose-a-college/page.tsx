import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { RelatedGuides } from "@/app/components/RelatedGuides";

export const metadata: Metadata = {
  title: "How to Choose a College — Build Your College List With Data",
  description:
    "A data-driven guide to building your college list: reach, target, and safety schools explained, how to evaluate fit, cost calculations, and how the AdmitGPT calculator can help you find where you have the best odds.",
  keywords: [
    "how to choose a college",
    "build a college list",
    "reach target safety schools",
    "college selection guide",
    "what college is right for me",
    "college decision factors",
    "how many colleges to apply to",
    "college list builder",
    "safety school vs reach school",
    "how to pick a college major",
  ],
  openGraph: {
    title: "How to Choose a College — Data-Driven College List Guide",
    description: "Reach, target, and safety schools explained. How many colleges to apply to, what fit really means, and how to use admission probability data to build your list.",
    url: "/guide/how-to-choose-a-college",
    type: "article",
  },
  alternates: { canonical: "/guide/how-to-choose-a-college" },
};

export default function ChooseCollegeGuide() {
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
              { "@type": "ListItem", position: 3, name: "How to Choose a College", item: SITE_ORIGIN + "/guide/how-to-choose-a-college" },
            ],
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / College Selection</div>
        <h1 className="tp-h1">How to Choose a College</h1>
        <p className="tp-lead">
          Building your college list is the most consequential decision in the admissions process.
          A well-structured list balances ambition with pragmatism. Here is a framework for choosing
          where to apply — backed by data on admission rates, fit, and cost.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">The reach-target-safety framework</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Every college list should have three tiers. <strong>Reach schools</strong> (2–4): your
            profile is below the school's middle 50% or the acceptance rate is under 10%. These are
            the dream schools where you have a real but low probability. <strong>Target schools</strong>
            (3–5): your stats match or exceed the school's middle 50%. You have a genuine chance
            of admission. <strong>Safety schools</strong> (2–3): your stats exceed the school's 75th
            percentile or the acceptance rate is over 50%. These are schools you would be happy to
            attend.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Most students should apply to 8–12 schools total. Applying to more than 15 does not
            meaningfully improve outcomes and adds significant essay workload. The AdmitGPT
            calculator can help you categorize schools by showing your estimated probability for
            each one.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Beyond numbers: fit factors</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            AdmitGPT calculates probability based on quantifiable factors, but fit matters beyond
            the numbers. Consider: <strong>size</strong> (large university vs small liberal arts
            college), <strong>location</strong> (urban, suburban, rural), <strong>academic
            culture</strong> (collaborative vs competitive), <strong>available majors</strong>
            (does the school offer what you want to study?), and <strong>campus vibe</strong>
            (Greek life, arts scene, research opportunities). These factors affect your happiness
            and success — which also affect graduation rates and outcomes.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Cost as a selection criterion</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Net price (sticker price minus grants and scholarships) varies dramatically between
            schools for the same family. Every college is federally required to post a Net Price
            Calculator on its website. Run it for every school on your list before applying. For
            international students, remember that need-blind schools do not consider aid in
            admissions, while need-aware schools do. See the <Link href="/guide/financial-aid-explained" style={{ color: "var(--color-primary)" }}>financial aid guide</Link> for details.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Using AdmitGPT to build your list</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The AdmitGPT calculator shows your estimated probability for every school in our
            database. Use it to: identify which schools are reach, target, or safety for your
            specific profile; compare probabilities across schools in real time; see how Early
            Decision changes your odds; and understand how financial aid requirements affect your
            chances at need-aware schools. No other free tool gives you this level of transparency.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Build Your College List With Data
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <RelatedGuides current="/guide/how-to-choose-a-college" />
        </section>
      </main>
    </div>
  );
}

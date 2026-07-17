import type { Metadata } from "next";
import Link from "next/link";
import { RelatedGuides } from "@/app/components/RelatedGuides";
import { SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Early Decision vs Early Action — Which Boosts Your Chances More?",
  description:
    "Should you apply Early Decision or Early Action? See the data on how binding and non-binding early applications affect your admission odds at selective US colleges — and which strategy fits your profile.",
  keywords: [
    "early decision vs early action",
    "ED vs EA",
    "early decision acceptance rate",
    "does early decision help",
    "binding vs non-binding college application",
    "early action colleges",
    "early decision strategy",
    "restrictive early action explained",
    "early application advantage",
  ],
  openGraph: {
    title: "Early Decision vs Early Action — Data-Backed Strategy Guide",
    description: "How large is the ED boost? When should you apply EA? How does AdmitGPT factor early timing into its probability model?",
    url: "/guide/early-decision-vs-early-action",
    type: "article",
  },
  alternates: { canonical: "/guide/early-decision-vs-early-action" },
};

export default function EarlyDecisionGuide() {
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
              { "@type": "ListItem", position: 3, name: "Early Decision vs Early Action", item: SITE_ORIGIN + "/guide/early-decision-vs-early-action" },
            ],
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Application Strategy</div>
        <h1 className="tp-h1">Early Decision vs Early Action</h1>
        <p className="tp-lead">
          Early application rounds have become one of the most powerful tools in selective admissions.
          But the choice between binding Early Decision and non-binding Early Action can significantly
          change your odds — and your options. Here is what the data says.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">Early Decision (ED): the binding boost</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            ED is a binding commitment: if admitted, you must enroll and withdraw all other
            applications. In exchange, many schools offer a substantial admissions advantage. Across
            selective universities, ED acceptance rates are often 2–4x higher than Regular Decision
            rates. For example, Dartmouth admitted approximately 19% of ED applicants vs. 4.5% of
            RD applicants in the most recent cycle. At Penn, the ED admit rate was approximately 16%
            vs. 4% for RD.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The trade-off is financial: because ED is binding, you cannot compare aid offers from
            multiple schools. Run the Net Price Calculator for your ED school before applying. If
            the estimated net price fits your family's budget, ED is likely your strongest strategic
            move.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Early Action (EA): the non-binding advantage</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            EA is non-binding. You receive an early decision but have until May 1 to choose. The EA
            admissions boost is generally smaller than ED's — typically 1.2–1.8x the RD rate — but
            you retain the flexibility to compare aid offers. Some schools offer Restrictive Early
            Action (REA) or Single-Choice Early Action (SCEA), which limit where else you can apply
            early but remain non-binding.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">How AdmitGPT models early timing</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The AdmitGPT engine applies a modifier to your probability when you select Early Decision
            or Early Action. The modifier scales with the published gap between a school's ED and RD
            acceptance rates. Schools with larger ED advantages — like Tulane (59% ED vs 14% RD) or
            Northwestern — see a bigger adjustment in the model.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The engine does <em>not</em> assume ED automatically doubles your odds. It uses a
            logistic modifier calibrated from institutional Common Data Set filings. The result: a
            measurable boost that varies by school, reflecting real admissions practice.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Which early strategy fits your profile?</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>Choose ED if:</strong> you have a clear first choice, your stats are at or above
            the school's middle 50%, and you have reasonable clarity on financial aid. ED maximizes
            your probability for a single school.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>Choose EA/REA if:</strong> you want a timing advantage without a binding
            commitment, or your financial situation requires comparing offers. EA is particularly
            useful at publics like Michigan and Georgia Tech.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>Skip early entirely if:</strong> your application would meaningfully improve
            with an extra semester of grades, test scores, or extracurricular results.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">See your ED vs EA odds</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Run your profile through AdmitGPT with different timing scenarios to see how your
            probability changes. The calculator is free, open-source, and entirely client-side.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Calculate Your Early Decision Chances
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <RelatedGuides current="/guide/early-decision-vs-early-action" />
        </section>
      </main>
    </div>
  );
}

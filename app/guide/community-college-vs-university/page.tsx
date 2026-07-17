import type { Metadata } from "next";
import Link from "next/link";
import { RelatedGuides } from "@/app/components/RelatedGuides";
import { SITE_ORIGIN } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Community College vs University — Which Path Is Right for You?",
  description:
    "Community college vs four-year university: cost comparison, transfer pathways, graduation rates, ROI, and how each option affects your ultimate bachelor's degree and career prospects. Data-backed decision guide.",
  keywords: [
    "community college vs university",
    "community college vs four year",
    "should I go to community college",
    "community college transfer to university",
    "community college pros and cons",
    "community college vs university cost",
    "community college vs university ROI",
    "community college then transfer",
    "community college vs university acceptance rate",
    "community college bachelor degree",
  ],
  openGraph: {
    title: "Community College vs University — Data-Backed Comparison",
    description: "Cost, transfer pathways, graduation rates, acceptance odds, and long-term ROI of starting at a community college vs a four-year university. Honest data for your decision.",
    url: "/guide/community-college-vs-university",
    type: "article",
  },
  alternates: { canonical: "/guide/community-college-vs-university" },
};

export default function CommunityVsUniversity() {
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
              { "@type": "ListItem", position: 3, name: "Community College vs University", item: SITE_ORIGIN + "/guide/community-college-vs-university" },
            ],
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / College Options</div>
        <h1 className="tp-h1">Community College vs University</h1>
        <p className="tp-lead">
          Deciding between community college and a four-year university is one of the most
          consequential — and most stigmatized — choices in American education. The data shows
          that either path can lead to a bachelor's degree and a strong career. Here is an honest
          comparison of cost, outcomes, and fit.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">Cost comparison</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Community college tuition averages approximately $3,500–$5,000 per year versus $10,000–
            $40,000+ per year for four-year universities. Room and board can double the cost at
            residential universities. Over two years, starting at a community college can save
            $20,000–$70,000. However, lower tuition does not always mean lower total cost —
            community college students who do not complete a degree earn less, and time-to-degree
            can be longer due to transfer credit issues.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Transfer pathways and graduation</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Approximately 80% of community college students intend to transfer to a four-year
            program, but only about 14% complete a bachelor's degree within six years (National
            Student Clearinghouse). The transfer process can be complex: not all credits transfer,
            and articulation agreements vary by state and school. The most successful transfer
            students choose a community college with a strong articulation agreement with their
            target university, follow the prescribed curriculum exactly, and transfer before
            accumulating excess credits.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            For competitive universities, transfer admission rates are often lower than freshman
            admission rates. At selective schools, transfer acceptance rates are typically 5–15%
            compared to 5–20% for freshmen. The AdmitGPT engine does not currently model transfer
            admissions, but the general academic competitiveness thresholds are similar.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Academic and social experience</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Community colleges offer smaller class sizes and more flexible scheduling, which can
            benefit students who work, have family obligations, or need academic support. Four-year
            universities offer research opportunities, networking, on-campus housing, extracurricular
            organizations, and the traditional college experience. Neither is superior — the right
            choice depends on your academic readiness, financial situation, and personal goals.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">ROI and career outcomes</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Studies show that students who start at a community college and successfully transfer
            to a four-year university earn similar lifetime incomes to those who start at a four-year
            school — as long as they complete the bachelor's degree. The risk is non-completion.
            Students who attend community college without transferring or completing a credential
            earn significantly less. The key is having a clear transfer plan from day one.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">How this affects your admissions strategy</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            If you have strong academics but financial constraints, a community college with a
            guaranteed transfer agreement to a four-year university can be a smart path. If your
            goal is a highly selective university, direct admission as a freshman — or a targeted
            transfer with a near-perfect community college GPA — are both viable. Use the AdmitGPT
            calculator to see your freshman admission odds and plan accordingly.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Check Your University Admission Chances
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <RelatedGuides current="/guide/community-college-vs-university" />
        </section>
      </main>
    </div>
  );
}

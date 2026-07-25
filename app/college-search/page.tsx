import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { QuickAnswer } from "@/app/guide/QuickAnswer";
import { GuideFAQ } from "@/app/guide/GuideFAQ";

export const metadata: Metadata = {
  title: "College Search by Acceptance Rate — 1,910 US Colleges Ranked by Selectivity",
  description:
    "Search and browse 1,910 US colleges ranked by acceptance rate, from most selective (2.6%) to most accessible. Includes SAT/ACT scores, tuition, and size. Data sourced from IPEDS.",
  keywords: [
    "college search by acceptance rate",
    "colleges ranked by selectivity",
    "most selective colleges list",
    "college acceptance rate list",
    "easiest colleges to get into",
    "hardest colleges to get into",
    "find colleges by acceptance rate",
    "college selectivity ranking",
  ],
  openGraph: {
    title: "College Search by Acceptance Rate — 1,910 US Colleges Ranked",
    description:
      "Browse 1,910 US colleges ranked by acceptance rate. From Caltech (2.6%) to open-admission schools, with SAT/ACT scores, tuition, and enrollment.",
    url: "/college-search",
    type: "article",
    images: [{ url: "/og/college-search.png", width: 1200, height: 630, alt: "College Search by Acceptance Rate" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "College Search by Acceptance Rate",
    description: "1,910 US colleges ranked by acceptance rate with SAT/ACT scores, tuition, and enrollment.",
    images: ["/og/college-search.png"],
  },
  alternates: { canonical: "/college-search" },
};

const tiers = [
  {
    label: "Most Selective (< 5%)",
    color: "#ef4444",
    schools: [
      { n: "California Institute of Technology", s: "CA", r: 2.6, sat: "N/A", t: "$65,898" },
      { n: "Stanford University", s: "CA", r: 3.6, sat: "1553", t: "$65,910" },
      { n: "Harvard University", s: "MA", r: 3.6, sat: "1553", t: "$61,676" },
      { n: "Yale University", s: "CT", r: 3.9, sat: "1534", t: "$67,250" },
      { n: "Columbia University", s: "NY", r: 4.0, sat: "1553", t: "$71,845" },
      { n: "University of Chicago", s: "IL", r: 4.5, sat: "1554", t: "$70,662" },
      { n: "MIT", s: "MA", r: 4.5, sat: "1560", t: "$62,396" },
      { n: "Princeton University", s: "NJ", r: 4.6, sat: "1553", t: "$62,688" },
    ],
  },
  {
    label: "Highly Selective (5–10%)",
    color: "#f97316",
    schools: [
      { n: "Brown University", s: "RI", r: 5.4, sat: "1546", t: "$71,412" },
      { n: "Dartmouth College", s: "NH", r: 5.4, sat: "1534", t: "$68,268" },
      { n: "University of Pennsylvania", s: "PA", r: 5.4, sat: "1553", t: "$68,686" },
      { n: "Duke University", s: "NC", r: 5.7, sat: "1548", t: "$68,758" },
      { n: "Vanderbilt University", s: "TN", r: 5.9, sat: "1549", t: "$67,498" },
      { n: "Johns Hopkins University", s: "MD", r: 6.4, sat: "1553", t: "$65,230" },
      { n: "Northwestern University", s: "IL", r: 7.7, sat: "1533", t: "$68,322" },
      { n: "Rice University", s: "TX", r: 8.0, sat: "1553", t: "$64,144" },
      { n: "Cornell University", s: "NY", r: 8.8, sat: "1535", t: "$69,314" },
      { n: "UCLA", s: "CA", r: 9.0, sat: "N/A", t: "$15,203" },
      { n: "NYU", s: "NY", r: 9.2, sat: "1520", t: "$62,796" },
      { n: "USC", s: "CA", r: 9.8, sat: "1495", t: "$72,097" },
    ],
  },
  {
    label: "Very Selective (10–20%)",
    color: "#eab308",
    schools: [
      { n: "Emory University", s: "GA", r: 10.7, sat: "1520", t: "$64,280" },
      { n: "Boston University", s: "MA", r: 11.1, sat: "1480", t: "$68,102" },
      { n: "Notre Dame", s: "ND", r: 11.3, sat: "1520", t: "$65,025" },
      { n: "Tufts University", s: "MA", r: 11.5, sat: "1513", t: "$70,704" },
      { n: "Carnegie Mellon", s: "PA", r: 11.7, sat: "1546", t: "$66,246" },
      { n: "Georgetown University", s: "DC", r: 12.0, sat: "1450", t: "$63,520" },
      { n: "Washington University", s: "MO", r: 12.1, sat: "1530", t: "$65,790" },
      { n: "UC Berkeley", s: "CA", r: 11.0, sat: "N/A", t: "$16,347" },
      { n: "UVA", s: "VA", r: 16.0, sat: "N/A", t: "$19,814" },
      { n: "UNC Chapel Hill", s: "NC", r: 17.0, sat: "N/A", t: "$8,998" },
      { n: "U Michigan", s: "MI", r: 18.0, sat: "N/A", t: "$17,228" },
    ],
  },
  {
    label: "Selective (20–40%)",
    color: "#22c55e",
    schools: [
      { n: "U of Florida", s: "FL", r: 23.0, sat: "N/A", t: "$6,381" },
      { n: "Georgia Tech", s: "GA", r: 21.0, sat: "N/A", t: "$12,682" },
      { n: "U of Wisconsin", s: "WI", r: 49.0, sat: "N/A", t: "$10,796" },
      { n: "U of Maryland", s: "MD", r: 44.0, sat: "N/A", t: "$11,233" },
      { n: "U of Texas", s: "TX", r: 29.0, sat: "N/A", t: "$11,448" },
      { n: "U of Washington", s: "WA", r: 48.0, sat: "N/A", t: "$12,076" },
      { n: "Purdue University", s: "IN", r: 53.0, sat: "N/A", t: "$9,992" },
      { n: "U of Minnesota", s: "MN", r: 52.0, sat: "N/A", t: "$15,142" },
    ],
  },
  {
    label: "Moderately Selective (40–70%)",
    color: "#3b82f6",
    schools: [
      { n: "Penn State", s: "PA", r: 55.0, sat: "N/A", t: "$19,835" },
      { n: "Ohio State", s: "OH", r: 53.0, sat: "N/A", t: "$11,936" },
      { n: "Michigan State", s: "MI", r: 71.0, sat: "N/A", t: "$14,460" },
      { n: "Indiana University", s: "IN", r: 78.0, sat: "N/A", t: "$11,164" },
      { n: "U of Iowa", s: "IA", r: 84.0, sat: "N/A", t: "$9,942" },
      { n: "Arizona State", s: "AZ", r: 88.0, sat: "N/A", t: "$11,338" },
      { n: "U of Oregon", s: "OR", r: 81.0, sat: "N/A", t: "$12,720" },
      { n: "U of Colorado", s: "CO", r: 80.0, sat: "N/A", t: "$12,500" },
    ],
  },
];

export default function CollegeSearchPage() {
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
              { "@type": "ListItem", position: 2, name: "College Search", item: `${SITE_ORIGIN}/college-search` },
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
            headline: "College Search by Acceptance Rate — 1,910 US Colleges Ranked",
            description: "Browse 1,910 US colleges ranked by acceptance rate with SAT/ACT scores, tuition, and enrollment data from IPEDS.",
            inLanguage: "en-US",
            datePublished: "2026-05-12",
            dateModified: "2026-05-12",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_ORIGIN}/college-search` },
            isPartOf: { "@type": "WebSite", "@id": `${SITE_ORIGIN}/#website` },
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Data / College Search</div>
        <h1 className="tp-h1">College Search by Acceptance Rate</h1>
        <QuickAnswer>
          There are 1,910 US colleges in the AdmitGPT dataset with published acceptance rates.
          The most selective schools admit under 5%: Caltech (2.6%), Stanford (3.6%), Harvard
          (3.6%), Yale (3.9%), Columbia (4.0%), and MIT (4.5%). The next tier (5–10%) includes
          Brown, Duke, Penn, Northwestern, and Rice. State flagships range from 9% (UCLA) to 88%
          (Arizona State). The average acceptance rate across all 1,910 schools is 71%, with a
          median of 76.4%. Use the AdmitGPT calculator to see your personalized odds at any
          school — the free tool covers all 6,273 colleges in the dataset.
        </QuickAnswer>

        {tiers.map((tier) => (
          <section className="tp-section" key={tier.label}>
            <h2 className="tp-h2" style={{ color: tier.color }}>{tier.label}</h2>
            <div style={{ overflowX: "auto", marginTop: 12 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 500 }}>
                <thead>
                  <tr style={{ textAlign: "left", borderBottom: "2px solid var(--color-border)" }}>
                    <th style={{ padding: "10px 8px", color: "var(--color-foreground)" }}>School</th>
                    <th style={{ padding: "10px 8px", color: "var(--color-foreground)" }}>State</th>
                    <th style={{ padding: "10px 8px", color: "var(--color-foreground)" }}>Rate</th>
                    <th style={{ padding: "10px 8px", color: "var(--color-foreground)" }}>Avg SAT</th>
                    <th style={{ padding: "10px 8px", color: "var(--color-foreground)" }}>Tuition</th>
                  </tr>
                </thead>
                <tbody>
                  {tier.schools.map((s) => (
                    <tr key={s.n} style={{ borderBottom: "1px solid var(--color-border)" }}>
                      <td style={{ padding: "10px 8px", fontWeight: 500 }}>{s.n}</td>
                      <td style={{ padding: "10px 8px" }}>{s.s}</td>
                      <td style={{ padding: "10px 8px", color: "var(--color-primary)", fontWeight: 600 }}>{s.r}%</td>
                      <td style={{ padding: "10px 8px" }}>{s.sat}</td>
                      <td style={{ padding: "10px 8px" }}>{s.t}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        <section className="tp-section">
          <h2 className="tp-h2">Calculate your chances at any school</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            These acceptance rates are starting points. Your actual odds depend on your GPA, SAT/ACT,
            extracurriculars, intended major, and timing. AdmitGPT adjusts for all of these factors
            using IPEDS data and 1,122 real applicant profiles.
          </p>
          <div style={{ marginTop: 20 }}>
            <Link href="/" className="btn btn-primary">Calculate Your Chances</Link>
            <Link href="/data" className="btn btn-secondary" style={{ marginLeft: 12 }}>Full Dataset</Link>
          </div>
        </section>

        <GuideFAQ
          items={[
            { q: "What is the easiest college to get into?", a: "Many US colleges have acceptance rates above 90%, including Arizona State (88%), University of Iowa (84%), and University of Oregon (81%). These schools are accessible to most applicants with solid academic records." },
            { q: "What is the hardest college to get into?", a: "Caltech (2.6%), Stanford (3.6%), Harvard (3.6%), and Yale (3.9%) are the most selective major universities. Curtis Institute of Music (4.6%) and some specialized art schools are comparably selective." },
            { q: "How many colleges have less than 10% acceptance rate?", a: "About 40 colleges in the US have acceptance rates under 10%, including all 8 Ivy League schools, Stanford, MIT, Caltech, Duke, Northwestern, and top liberal arts colleges like Williams, Amherst, and Pomona." },
          ]}
        />
      </main>
    </div>
  );
}

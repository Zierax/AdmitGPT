import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import datasetStats from "@/lib/datasetStats.json";

export const metadata: Metadata = {
  title: "The AdmitGPT Admissions Dataset — 6,273 Colleges & 1,122 Profiles",
  description:
    "Original admissions data behind AdmitGPT: 6,273 US colleges with admission rates and test scores, plus 1,122 self-reported applicant profiles (2020–2023). Free, open, downloadable — the basis of our transparent probability engine.",
  keywords: [
    "college admissions dataset",
    "college acceptance rate data",
    "US college admission statistics",
    "open admissions data",
    "college predictor dataset",
    "admissions research data",
  ],
  openGraph: {
    title: "The AdmitGPT Admissions Dataset — Original Research",
    description:
      "6,273 US colleges and 1,122 applicant profiles, free and open. The transparent data behind AdmitGPT's probability engine.",
    url: "/data",
    type: "article",
  },
  alternates: { canonical: "/data" },
};

const sel = datasetStats.mostSelective.filter((s) => s.rate > 0).slice(0, 8);

export default function DataPage() {
  return (
    <div className="app-bg" style={{ minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "The AdmitGPT Admissions Dataset",
            description:
              "A free, open dataset of 6,273 US colleges and 1,122 self-reported applicant profiles used to calibrate the AdmitGPT admissions probability engine.",
            inLanguage: "en-US",
            datePublished: "2025-08-01",
            dateModified: "2026-05-12",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_ORIGIN}/data` },
            isPartOf: { "@type": "WebSite", "@id": `${SITE_ORIGIN}/#website` },
            about: { "@type": "Thing", name: "College admissions data" },
            citation: [
              { "@type": "CreativeWork", name: "IPEDS, National Center for Education Statistics", url: "https://nces.ed.gov/ipeds" },
              { "@type": "CreativeWork", name: "Common Data Set Initiative", url: "https://commondataset.org" },
            ],
          }),
        }}
      />
      <main className="tp-wrap">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
                { "@type": "ListItem", position: 2, name: "Admissions Dataset", item: `${SITE_ORIGIN}/data` },
              ],
            }),
          }}
        />
        <span className="tp-eyebrow">Original Research / Dataset</span>
        <h1 className="tp-h1">The AdmitGPT Admissions Dataset</h1>
        <p className="tp-lead">
          AdmitGPT is built on real data, not vibes. Below is the open dataset that calibrates our
          probability engine — published so anyone can verify, reuse, or build on it. Most
          &ldquo;chance calculators&rdquo; hide their data. We show ours.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">What&rsquo;s in the dataset</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              margin: "20px 0",
            }}
          >
            {[
              { n: datasetStats.collegeCount.toLocaleString(), l: "US colleges covered" },
              { n: datasetStats.withRate.toLocaleString(), l: "with admission rates" },
              { n: datasetStats.states.toString(), l: "states & regions" },
              { n: datasetStats.profileCount.toLocaleString(), l: "applicant profiles" },
              { n: `${datasetStats.avgRate}%`, l: "average admission rate" },
              { n: `${datasetStats.medianRate}%`, l: "median admission rate" },
            ].map((c) => (
              <div
                key={c.l}
                style={{
                  padding: "18px 20px",
                  borderRadius: 12,
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface, rgba(255,255,255,0.03))",
                }}
              >
                <div style={{ fontSize: 30, fontWeight: 800, color: "var(--color-primary)" }}>{c.n}</div>
                <div className="ag-muted" style={{ fontSize: 13, marginTop: 6 }}>{c.l}</div>
              </div>
            ))}
          </div>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            College records are sourced from the federal{" "}
            <a href="https://nces.ed.gov/ipeds" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-primary)" }}>
              IPEDS
            </a>{" "}
            database (admission rates, test scores, cost, graduation rates). The {datasetStats.profileCount.toLocaleString()} applicant
            profiles are self-reported by real students between {Object.keys(datasetStats.profileYears)[0]} and{" "}
            {Object.keys(datasetStats.profileYears).slice(-1)[0]}, and are used to calibrate and validate the
            engine&rsquo;s ordinal accuracy (AUC ~0.74).
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Most selective schools in the data</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            Admission rate by school, lowest first (verifiable against each college&rsquo;s Common Data Set):
          </p>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: 14,
              fontSize: 14.5,
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "10px 8px", color: "var(--color-foreground)" }}>School</th>
                <th style={{ padding: "10px 8px", color: "var(--color-foreground)" }}>Admission rate</th>
              </tr>
            </thead>
            <tbody>
              {sel.map((s) => (
                <tr key={s.name} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "10px 8px" }}>{s.name}</td>
                  <td style={{ padding: "10px 8px", color: "var(--color-primary)", fontWeight: 600 }}>{s.rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="ag-muted" style={{ fontSize: 13, marginTop: 10, fontStyle: "italic" }}>
            Figures reflect the admission_rate.overall field in the underlying IPEDS extract; always
            confirm current rates with each school.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Download the data</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            Both files are published under the MIT license. Use them for research, journalism, or your
            own tools — attribution appreciated.
          </p>
          <ul style={{ fontSize: 15, lineHeight: 2, paddingLeft: 20 }} className="ag-muted">
            <li>
              <a href="/data/collegesdata.json" style={{ color: "var(--color-primary)" }}>
                collegesdata.json
              </a>{" "}
              — {datasetStats.collegeCount.toLocaleString()} colleges (admission rates, test scores, cost, outcomes)
            </li>
            <li>
              <a href="/data/studentsdata.json" style={{ color: "var(--color-primary)" }}>
                studentsdata.json
              </a>{" "}
              — {datasetStats.profileCount.toLocaleString()} anonymized applicant profiles
            </li>
          </ul>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">How we use it</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8 }}>
            The college data populates every school profile in the calculator; the applicant profiles
            calibrate the additive-logistic engine and validate its ranking accuracy. The full math
            is on the{" "}
            <Link href="/transparency" style={{ color: "var(--color-primary)" }}>
              Transparency page
            </Link>
            , and the methodology is summarized on{" "}
            <Link href="/about" style={{ color: "var(--color-primary)" }}>
              About AdmitGPT
            </Link>
            .
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Related guides</h2>
          <ul style={{ fontSize: 15, lineHeight: 2, paddingLeft: 20 }} className="ag-muted">
            <li>
              <Link href="/guide/ivy-league-chances" style={{ color: "var(--color-primary)" }}>
                Your Ivy League Admission Chances
              </Link>
            </li>
            <li>
              <Link href="/guide/college-acceptance-rates-2026" style={{ color: "var(--color-primary)" }}>
                College Acceptance Rates 2026
              </Link>
            </li>
            <li>
              <Link href="/guide/good-sat-score-for-ivy-league" style={{ color: "var(--color-primary)" }}>
                Good SAT Score for Ivy League Admission
              </Link>
            </li>
            <li>
              <Link href="/guide/what-gpa-do-you-need-for-college" style={{ color: "var(--color-primary)" }}>
                What GPA Do You Need for College?
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

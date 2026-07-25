import type { Metadata } from "next";
import Link from "next/link";
import { RelatedGuides } from "@/app/components/RelatedGuides";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { GuideByline } from "@/app/guide/GuideByline";
import { GuideFAQ } from "@/app/guide/GuideFAQ";
import { QuickAnswer } from "@/app/guide/QuickAnswer";

export const metadata: Metadata = {
  title: "Transfer Admissions Guide — Community College to 4-Year University",
  description:
    "Complete guide to transfer admissions: how transfer applications differ from freshman, what GPA you need, which credits transfer, how to write a transfer essay, and strategies for top transfer programs.",
  keywords: [
    "transfer admissions guide",
    "community college to university",
    "transfer acceptance rate",
    "how to transfer colleges",
    "transfer essay tips",
    "transfer GPA requirements",
    "transfer admissions 2026",
    "UC transfer admissions",
  ],
  openGraph: {
    title: "Transfer Admissions Guide — Community College to 4-Year University",
    description: "How transfer admissions work, what GPA you need, which credits transfer, and strategies for top transfer programs.",
    url: "/guide/transfer-admissions-guide",
    type: "article",
  },
  alternates: { canonical: "/guide/transfer-admissions-guide" },
};

export default function TransferGuide() {
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
              { "@type": "ListItem", position: 3, name: "Transfer Admissions", item: SITE_ORIGIN + "/guide/transfer-admissions-guide" },
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
            headline: "Transfer Admissions Guide — Community College to 4-Year University",
            description: "Complete guide to transfer admissions: how transfer applications differ from freshman, what GPA you need, which credits transfer, and strategies for top transfer programs.",
            inLanguage: "en-US",
            datePublished: "2026-07-24",
            dateModified: "2026-07-24",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": SITE_ORIGIN + "/guide/transfer-admissions-guide" },
            isPartOf: { "@type": "WebSite", "@id": SITE_ORIGIN + "/#website" },
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Transfers</div>
        <h1 className="tp-h1">Transfer Admissions Guide</h1>
        <GuideByline updated="2026-07-24" />
        <QuickAnswer>
          Transfer admissions are a distinct process from freshman admissions:
          colleges evaluate your college-level work (GPA, rigor, and trajectory)
          far more heavily than your high school record. A strong college GPA
          (3.5+ for selective schools, 3.8+ for top programs) matters most.
          Apply as a transfer after completing 30–60 semester credits (typically
          after sophomore year). Check articulation agreements between your
          community college and target schools — these guarantee credit transfer
          for specific courses. Transfer acceptance rates vary widely: some
          schools (like Cornell and UC Berkeley) accept 20–30% of transfer
          applicants, while others accept fewer than 5%. Start planning early —
          course selection at your current school determines your eligibility.
        </QuickAnswer>
        <p className="tp-lead">
          Transferring from a community college (or another 4-year school) to a
          selective university is a well-established path — and often easier than
          freshman admission. Here is how to navigate the process successfully.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">How transfer admissions differ from freshman</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Transfer admissions focus on <strong>college performance</strong>,
            not high school grades. Your college GPA, course rigor, and
            academic trajectory matter most. High school grades and test
            scores become secondary (some schools waive SAT/ACT for
            transfers with 30+ credits). The application also asks why
            you want to transfer and what you hope to achieve at the
            new school — this essay is critical.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Transfer deadlines are typically March 1 for fall admission
            (earlier than freshman cycles). Some schools have spring
            transfer deadlines (November 1). Decision notifications
            come in April–May. You&rsquo;ll enroll as a junior with
            60+ credits, so you&rsquo;re applying to enter a specific
            major or school within the university.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">What GPA do you need?</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Minimum requirements vary, but here are realistic ranges:
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>Selective schools (top 30):</strong> 3.7–3.9+ college GPA.
            UC Berkeley and UCLA expect 3.5+ (unweighted) with completion of
            prerequisite courses. Cornell and other Ivies expect near-perfect
            college records.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>Good schools (top 50–100):</strong> 3.3–3.7. These schools
            have higher transfer acceptance rates and more flexible requirements.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>Flagship state schools:</strong> 2.5–3.5, depending on the
            school and whether you&rsquo;re transferring from in-state community
            colleges. Many have guaranteed transfer pathways.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Which credits transfer</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Credit transfer depends on <strong>articulation agreements</strong>
            between your current school and target school. Most community
            colleges have published agreements with state universities that
            guarantee credit transfer for specific courses. For selective
            private schools, transfer credit is evaluated case-by-case.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            General education credits (English, math, science, humanities)
            transfer most easily. Major-specific courses may not transfer
            if the curriculum differs. AP scores (4+), IB credits, and
            military training may also count. Check each school&rsquo;s
            transfer credit policy before enrolling in courses.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">The transfer essay</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The transfer essay is your chance to explain: (1) why you want
            to transfer, (2) what you&rsquo;ve accomplished at your current
            school, and (3) why the target school is the right fit. Be
            specific — reference programs, professors, research opportunities,
            or campus resources unique to the school. Do not badmouth your
            current school. Frame the transfer as a positive step toward
            specific goals.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Top transfer-friendly schools</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Some selective schools actively recruit transfers: Cornell, Vanderbilt,
            Emory, UVA, and the UC system all have robust transfer pipelines.
            Check each school&rsquo;s transfer page for acceptance rates, prerequisite
            courses, and application requirements. The UC system&rsquo;s TAG
            (Transfer Admission Guarantee) program guarantees admission to 6
            of 9 UC campuses for qualified community college students.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Plan your path now</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Use AdmitGPT to understand your chances at transfer target schools.
            The calculator evaluates your college GPA alongside your profile to
            give you a realistic probability estimate.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Calculate Your Transfer Chances
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <GuideFAQ
            items={[
              { q: "Is it easier to get into a selective school as a transfer?", a: "It depends on the school. Some schools (Cornell, UC Berkeley) have higher transfer acceptance rates than freshman rates. Others (Harvard, Princeton) accept very few transfers. Check each school's specific transfer data before assuming it's easier." },
              { q: "Should I mention low freshman grades in my transfer essay?", a: "If your grades improved significantly after freshman year, briefly explain the context (illness, personal circumstances, adjustment) and emphasize the upward trajectory. Don't dwell on it — focus on your recent academic record." },
              { q: "Can I transfer after just one year?", a: "Most schools prefer 2 years (60 credits) of college work before transferring. Some accept after 1 year (30 credits), but you'll need stronger grades and fewer completed prerequisites. Two years gives you the best chance." },
            ]}
          />

<RelatedGuides current="/guide/transfer-admissions-guide" />
        </section>
      </main>
    </div>
  );
}

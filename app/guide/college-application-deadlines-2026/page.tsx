import type { Metadata } from "next";
import Link from "next/link";
import { RelatedGuides } from "@/app/components/RelatedGuides";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { GuideByline } from "@/app/guide/GuideByline";
import { GuideFAQ } from "@/app/guide/GuideFAQ";
import { QuickAnswer } from "@/app/guide/QuickAnswer";

export const metadata: Metadata = {
  title: "College Application Deadlines 2026–2027 — Complete Calendar",
  description:
    "Every college application deadline you need to know for the 2026–27 admissions cycle: Early Decision, Early Action, Regular Decision, FAFSA, CSS Profile, and scholarship deadlines. Month-by-month timeline included.",
  keywords: [
    "college application deadlines 2026",
    "college application deadlines 2027",
    "when are college applications due",
    "early decision deadline 2026",
    "regular decision deadline 2026",
    "college application timeline senior year",
    "FAFSA deadline 2026",
    "CSS Profile deadline",
    "Common App due date",
    "college application due dates",
    "November 1 deadline college",
    "January 1 college deadline",
  ],
  openGraph: {
    title: "College Application Deadlines 2026–2027 — Complete Calendar",
    description: "Every key deadline for the 2026–27 admissions cycle: ED, EA, RD, FAFSA, CSS Profile, and scholarships. Month-by-month timeline included.",
    url: "/guide/college-application-deadlines-2026",
    type: "article",
  },
  alternates: { canonical: "/guide/college-application-deadlines-2026" },
};

export default function DeadlinesGuide() {
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
              { "@type": "ListItem", position: 3, name: "College Application Deadlines 2026", item: SITE_ORIGIN + "/guide/college-application-deadlines-2026" },
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
            headline: "College Application Deadlines 2026–2027 — Complete Calendar",
            description: "Every college application deadline you need to know for the 2026–27 admissions cycle: Early Decision, Early Action, Regular Decision, FAFSA, CSS Profile, and scholarship deadlines. Month-by-month timeline included.",
            inLanguage: "en-US",
            datePublished: "2025-08-01",
            dateModified: "2026-05-15",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": SITE_ORIGIN + "/guide/college-application-deadlines-2026" },
            isPartOf: { "@type": "WebSite", "@id": SITE_ORIGIN + "/#website" },
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Deadlines</div>
        <h1 className="tp-h1">College Application Deadlines 2026–2027</h1>
        <GuideByline updated="2026-05-15" />
        <QuickAnswer>
          The key 2026&ndash;27 college deadlines center on two clusters. Early applications are due
          November 1 for nearly all Ivies plus Stanford, MIT, Duke, Northwestern, and UChicago, with a
          smaller November 15 group and a single November 30 University of California deadline.
          Regular Decision falls on January 1 or 15 (all Ivies use January 1&ndash;2; USC and UNC use
          January 15), and Early Decision II matches the RD window. Financial aid: the 2027&ndash;28
          FAFSA opens in September 2026 with a federal June 30, 2028 deadline that you should ignore
          in favor of much-earlier state and school priority dates (often November&ndash;February),
          while the CSS Profile &mdash; required by ~250 private colleges &mdash; usually tracks the
          admissions deadline. Merit scholarship cutoffs often land November 1 or December 1. Plan
          backward: finalize essays by August, submit early apps 48&ndash;72 hours before the due
          date.
        </QuickAnswer>
        <p className="tp-lead">
          Missing a deadline is the single most avoidable mistake in college admissions. Here is
          every key date for the 2026–27 cycle — Early Decision, Early Action, Regular Decision,
          financial aid forms, and scholarship deadlines — organized month by month.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">Early application deadlines (November 2026)</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>November 1</strong> is the single biggest deadline day. Most Early Decision I and
            Early Action applications are due — understand the trade-offs in our{" "}
            <Link href="/guide/early-decision-vs-early-action" style={{ color: "var(--color-primary)" }}>
              ED vs EA guide
            </Link>
            . This includes all Ivy League schools (Harvard, Yale,
            Princeton, Columbia, Penn, Brown, Dartmouth, Cornell), plus Stanford, MIT, Duke,
            Northwestern, UChicago, and most other selective private universities. A smaller cluster
            of schools has a <strong>November 15</strong> deadline.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>University of California</strong> schools (UCLA, UC Berkeley, UC San Diego, etc.)
            have a single <strong>November 30</strong> deadline — no ED/EA distinction, one deadline
            for all applicants.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Regular decision deadlines (January 2027)</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>January 1</strong> and <strong>January 15</strong> are the most common Regular
            Decision deadlines. All Ivy League schools use January 1 or 2 for RD. Many selective
            privates — MIT, Stanford, Duke, Northwestern, Vanderbilt, Rice, Emory — use January 1
            or 2 as well. A significant number of schools use <strong>January 15</strong> (USC,
            UNC Chapel Hill, University of Michigan, among others).
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Early Decision II deadlines typically fall on the same date as RD deadlines (January 1–15).
            ED II gives you a second chance at a binding early application if you were deferred or
            rejected from ED I.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Financial aid deadlines</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>FAFSA:</strong> The 2027–28 FAFSA opens in September 2026. The federal deadline
            is June 30, 2028, but ignore that — state and institutional deadlines are much earlier. See
            our{" "}
            <Link href="/guide/financial-aid-explained" style={{ color: "var(--color-primary)" }}>
              financial aid guide
            </Link>{" "}
            for how aid fits your plan.
            File through the official portal at{" "}
            <a
              href="https://studentaid.gov"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-primary)" }}
            >
              StudentAid.gov
            </a>
            , which also lists state priority dates.
            Many schools set priority deadlines between November 2026 and February 2027. File within
            the first three months to maximize grant aid.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>CSS Profile:</strong> Required by approximately 250 private colleges. Deadlines
            vary by school but often match the admissions deadline (November 1 or January 1). Missing
            the CSS Profile deadline can cost you thousands in institutional aid.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>Merit scholarship deadlines:</strong> Many schools have separate priority
            deadlines for merit scholarship consideration, often November 1 or December 1 —
            earlier than the RD deadline. Check each school's financial aid page.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Month-by-month timeline</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>June–August 2026:</strong> Draft Common App essay. Build activities list.
            Research colleges. Begin supplemental essays for early-round schools.<br />
            <strong>September 2026:</strong> FAFSA opens. Finalize college list. Request teacher
            recommendations. Finalize early application essays.<br />
            <strong>October 2026:</strong> Submit early applications (aim for 48–72 hours before
            deadline). File CSS Profile if required.<br />
            <strong>November 2026:</strong> ED/EA deadlines (Nov 1–15). UC deadline (Nov 30).
            Continue RD supplemental essays.<br />
            <strong>December 2026:</strong> Receive ED/EA decisions. If deferred, write Letter of
            Continued Interest. Submit remaining RD applications.<br />
            <strong>January 2027:</strong> RD deadlines (Jan 1–15). ED II deadlines. Submit all
            remaining applications.<br />
            <strong>March–April 2027:</strong> Receive RD decisions. Compare financial aid offers.
            Visit admitted-student days.<br />
            <strong>May 1, 2027:</strong> National Decision Day. Commit, submit deposit, withdraw
            other acceptances.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Plan your deadlines with AdmitGPT</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Timing matters beyond deadlines — applying Early Decision can dramatically change your
            probability. Use the AdmitGPT calculator to see how ED vs RD timing affects your odds
            at each school before you commit to a deadline strategy.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Calculate Your ED vs RD Odds
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <GuideFAQ
            items={[
              { q: "When are most Early Decision and Early Action deadlines?", a: "November 1 is the single biggest deadline day, covering most ED I and EA applications including all eight Ivy League schools. A smaller cluster uses November 15, and University of California schools have one November 30 deadline with no ED/EA distinction." },
              { q: "When is the FAFSA due and should I file early?", a: "The 2027–28 FAFSA opens in September 2026; the federal deadline is June 30, 2028, but state and institutional deadlines are much earlier, often between November and February. Students who file within the first three months typically receive more grant aid." },
            ]}
          />

<RelatedGuides current="/guide/college-application-deadlines-2026" />
        </section>
      </main>
    </div>
  );
}

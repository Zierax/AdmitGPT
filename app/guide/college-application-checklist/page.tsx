import type { Metadata } from "next";
import Link from "next/link";
import { RelatedGuides } from "@/app/components/RelatedGuides";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { GuideByline } from "@/app/guide/GuideByline";
import { GuideFAQ } from "@/app/guide/GuideFAQ";
import { QuickAnswer } from "@/app/guide/QuickAnswer";

export const metadata: Metadata = {
  title: "College Application Checklist — Complete Step-by-Step Guide 2026",
  description:
    "Your complete college application checklist: Common App setup, essays, recommendations, test scores, activities list, financial aid forms, and final submission checklist. Everything you need organized by priority.",
  keywords: [
    "college application checklist",
    "college application requirements",
    "college application checklist 2026",
    "what do I need to apply to college",
    "college application steps",
    "college application to-do list",
    "college application documents needed",
    "college application senior year checklist",
    "how to complete a college application",
    "college admission requirements checklist",
  ],
  openGraph: {
    title: "College Application Checklist — Step-by-Step Guide 2026",
    description: "Every step of the college application process: Common App, essays, test scores, recommendations, activities, financial aid, and final submission — with priority order.",
    url: "/guide/college-application-checklist",
    type: "article",
  },
  alternates: { canonical: "/guide/college-application-checklist" },
};

export default function ChecklistGuide() {
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
              { "@type": "ListItem", position: 3, name: "College Application Checklist", item: SITE_ORIGIN + "/guide/college-application-checklist" },
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
            headline: "College Application Checklist — Complete Step-by-Step Guide 2026",
            description: "Your complete college application checklist: Common App setup, essays, recommendations, test scores, activities list, financial aid forms, and final submission checklist. Everything you need organized by priority.",
            inLanguage: "en-US",
            datePublished: "2025-08-01",
            dateModified: "2026-01-30",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": SITE_ORIGIN + "/guide/college-application-checklist" },
            isPartOf: { "@type": "WebSite", "@id": SITE_ORIGIN + "/#website" },
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Checklist</div>
        <h1 className="tp-h1">College Application Checklist</h1>
        <GuideByline updated="2026-01-30" />
        <QuickAnswer>
          A complete college application checklist runs from account setup through final submission.
          Start by creating your Common App (the 2026&ndash;27 version opens August 1) and entering
          personal, education, GPA, and test data early. Request two teacher and one counselor
          recommendations in the first week of senior year. Draft the 650-word Common App personal
          statement by June and finalize before October. Build a 10-slot activities list led by your
          most meaningful work. Confirm test scores and transcripts 2&ndash;3 weeks ahead, and
          complete each school&rsquo;s supplemental &ldquo;Why Us&rdquo; essays by August&ndash;
          September. File the FAFSA at opening and the CSS Profile if required, watching earlier
          institutional aid dates. Finally, submit 48&ndash;72 hours before the deadline and verify
          recommendations, transcripts, and scores arrived. Prioritize with AdmitGPT to flag which
          schools are reach, target, or safety.
        </QuickAnswer>
        <p className="tp-lead">
          Applying to college involves dozens of components — and missing one can delay or derail
          your application. Here is everything you need, organized in priority order so you know
          what to do when.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">1. Common App account and profile</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Create your Common App account at commonapp.org. The 2026–27 application opens August 1.
            Fill in your personal information, family background, education history (courses, GPA,
            class rank), and test scores. Pair this with our{" "}
            <Link href="/guide/college-application-deadlines-2026" style={{ color: "var(--color-primary)" }}>
              deadlines calendar
            </Link>
            . This section is straightforward but time-consuming — do it
            early to avoid errors under deadline pressure.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">2. Teacher recommendations</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Most selective schools require two teacher recommendations and a counselor recommendation.
            Ask teachers who know you well in core academic subjects from junior year. Ask early —
            the first week of senior year — and give them a packet with your resume, a list of
            colleges and deadlines, and anything you want them to mention. Great letters include
            specific anecdotes; generic praise helps nobody.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">3. Personal essay (Common App)</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The Common App personal statement is 650 words, submitted to every school. The prompt
            matters less than the story. Write about a specific moment or experience that reveals
            who you are. Avoid cliché openers, thesaurus vocabulary, and resume rehashing. Draft
            in June, revise in July, finalize in August — do not still be writing this in October.
            See <Link href="/guide/college-application-essay-tips" style={{ color: "var(--color-primary)" }}>our essay tips guide</Link> for a deeper breakdown.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">4. Extracurricular activities list</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The Common App has 10 activity slots with 150 characters each. List your most meaningful
            activities first. Write like a micro-resume: strong verb, quantifiable impact, what you
            actually did. Include leadership roles, awards, and time commitment. For help prioritizing
            your activities, see <Link href="/guide/evaluate-extracurriculars" style={{ color: "var(--color-primary)" }}>our extracurricular scoring guide</Link>.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">5. Test scores and transcripts</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Request official SAT or ACT scores from the testing agency 2–3 weeks before each
            deadline. Request your high school transcript from your guidance counselor at least two
            weeks in advance. If you are applying test-optional at some schools, confirm each
            school's policy on the Common App (you choose per school).
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">6. Supplemental essays</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Supplemental essays — especially "Why This School?" — are where decisions are made at
            selective schools. Each supplement should reference specific programs, professors, or
            opportunities at that school. Generic answers are immediately obvious. Start these in
            August or September, not October.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">7. Financial aid forms</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            File the FAFSA as soon as it opens. File the CSS Profile if any of your schools require
            it, following the steps in our{" "}
            <Link href="/guide/financial-aid-explained" style={{ color: "var(--color-primary)" }}>
              financial aid guide
            </Link>
            . Check each school for institutional aid deadlines — many are earlier than you think.
            Missing a financial aid deadline is the most expensive mistake in the entire process. The
            official FAFSA form and federal dates are at{" "}
            <a
              href="https://studentaid.gov"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-primary)" }}
            >
              StudentAid.gov
            </a>
            .
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">8. Final submission</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Review every application for typos, incomplete sections, and incorrect school names (one
            of the most common errors). Submit 48–72 hours before the deadline — Common App servers
            are notoriously unreliable on deadline day. After submitting, confirm that your
            recommendations, transcripts, and test scores have been received.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Check your admission odds early</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Before you submit everything, use the AdmitGPT calculator to see your estimated
            probability at each school. Knowing which schools are reach, target, or safety helps
            you prioritize your essay writing and application energy.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Check Your Admission Chances
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <GuideFAQ
            items={[
              { q: "When should I start my college application?", a: "The 2026–27 Common App opens August 1, and you should draft the 650-word personal statement by June and finalize before October. Request two teacher and one counselor recommendations in the first week of senior year to avoid deadline-pressure errors." },
              { q: "How early should I submit my applications?", a: "Submit 48–72 hours before the deadline — Common App servers are unreliable on deadline day. After submitting, confirm that your recommendations, transcripts, and test scores have all been received by each school." },
            ]}
          />

<RelatedGuides current="/guide/college-application-checklist" />
        </section>
      </main>
    </div>
  );
}

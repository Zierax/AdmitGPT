import type { Metadata } from "next";
import Link from "next/link";
import { RelatedGuides } from "@/app/components/RelatedGuides";
import { SITE_ORIGIN } from "@/lib/siteConfig";

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
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
                  { "@type": "ListItem", position: 2, name: "Guides", item: SITE_ORIGIN + "/guide" },
                  { "@type": "ListItem", position: 3, name: "College Application Checklist", item: SITE_ORIGIN + "/guide/college-application-checklist" },
                ],
              },
              {
                "@type": "HowTo",
                name: "Complete Your College Application",
                description: "A step-by-step guide to completing every part of your college application.",
                step: [
                  { "@type": "HowToStep", position: 1, name: "Create Common App account", text: "Go to commonapp.org and create your account. Fill in personal, family, and education sections." },
                  { "@type": "HowToStep", position: 2, name: "Request recommendations", text: "Ask two teachers and your counselor for letters. Give them a packet with your resume and deadlines." },
                  { "@type": "HowToStep", position: 3, name: "Write Common App essay", text: "Brainstorm, draft, revise, and finalize your 650-word personal statement. Have at least two people read it." },
                  { "@type": "HowToStep", position: 4, name: "Build activities list", text: "List your top 10 activities with 150-character descriptions. Lead with your strongest involvements." },
                  { "@type": "HowToStep", position: 5, name: "Send test scores", text: "Request official SAT/ACT score reports from College Board or ACT. Allow 2–3 weeks for delivery." },
                  { "@type": "HowToStep", position: 6, name: "Write supplemental essays", text: "Research each school's supplements. Focus especially on 'Why This School?' essays with specific details." },
                  { "@type": "HowToStep", position: 7, name: "File financial aid forms", text: "Submit FAFSA and CSS Profile (if required) by each school's priority deadline." },
                  { "@type": "HowToStep", position: 8, name: "Submit applications", text: "Review every application for errors. Submit 48–72 hours before the deadline to avoid server issues." },
                ],
              },
            ],
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Checklist</div>
        <h1 className="tp-h1">College Application Checklist</h1>
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
            class rank), and test scores. This section is straightforward but time-consuming — do it
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
            it. Check each school for institutional aid deadlines — many are earlier than you think.
            Missing a financial aid deadline is the most expensive mistake in the entire process.
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
          <RelatedGuides current="/guide/college-application-checklist" />
        </section>
      </main>
    </div>
  );
}

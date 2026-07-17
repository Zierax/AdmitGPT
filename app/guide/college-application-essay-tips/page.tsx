import type { Metadata } from "next";
import Link from "next/link";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { RelatedGuides } from "@/app/components/RelatedGuides";

export const metadata: Metadata = {
  title: "College Application Essay Tips — How to Write a Standout Common App Essay",
  description:
    "Complete guide to writing college application essays that admissions officers actually remember. Common App prompts, supplemental essay strategy, structure tips, and what to avoid — from the creators of AdmitGPT.",
  keywords: [
    "college application essay tips",
    "how to write a college essay",
    "Common App essay prompts",
    "college essay examples",
    "supplemental essay tips",
    "college essay structure",
    "Common App personal statement",
    "essay tips for college admissions",
    "college essay mistakes to avoid",
    "how to start a college essay",
  ],
  openGraph: {
    title: "College Application Essay Tips — Complete Guide 2026",
    description: "Common App essay prompts, supplemental strategy, storytelling structure, and the mistakes that sink otherwise strong applications.",
    url: "/guide/college-application-essay-tips",
    type: "article",
  },
  alternates: { canonical: "/guide/college-application-essay-tips" },
};

export default function EssayTipsGuide() {
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
              { "@type": "ListItem", position: 3, name: "College Application Essay Tips", item: SITE_ORIGIN + "/guide/college-application-essay-tips" },
            ],
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Essays</div>
        <h1 className="tp-h1">College Application Essay Tips</h1>
        <p className="tp-lead">
          Your essays are where admissions officers get to know you as a person, not a set of numbers.
          A great essay can elevate an application; a generic one can sink it. Here is how to write
          essays that actually help your case — without gimmicks or consultants.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">The Common App personal statement</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The Common App personal statement is a 650-word essay submitted to every school on your
            list. The 2026–27 prompts remain largely unchanged: background story, lesson from
            failure, challenging a belief, gratitude, accomplishment, and a topic of your choice. The
            prompt matters far less than the story you tell. Admissions officers read thousands of
            essays — the ones they remember are specific, honest, and reveal something the rest of
            the application does not.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Supplemental essays: where decisions are made</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            At selective schools, supplemental essays often carry more weight than the personal
            statement because they show genuine interest and fit. The "Why This School?" essay is
            the most common — and most commonly botched. Generic answers that could apply to any
            university are immediately obvious. Research specific programs, professors, courses, and
            campus resources. A strong "Why Us" essay references concrete details about the school
            and connects them to your goals.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Other common supplement types include the community essay ("What community do you belong
            to?"), the intellectual curiosity essay, and short-answer elaborations on an extracurricular
            activity. Each is an opportunity to add depth to a different dimension of your profile.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Structure and storytelling</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            The most effective college essays follow a simple narrative arc: a specific moment or
            observation, the tension or conflict it created, what you did about it, and how you
            changed. Show, don't tell — instead of "I learned the value of hard work," describe the
            moment you realized it. Use concrete details. Let the reader draw the conclusion.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Common mistakes to avoid</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>The resume rehash:</strong> Your activities list already covers what you did. The
            essay should reveal who you are, not what you accomplished.<br />
            <strong>The thesaurus essay:</strong> Write in your natural voice. Admissions officers
            spot inflated language immediately.<br />
            <strong>The cliché opener:</strong> "Since I was a child, I have always been passionate
            about..." — delete this. Start in the middle of the action.<br />
            <strong>The AI-generated essay:</strong> Schools like Princeton and Amherst now ask for
            graded papers to verify authentic writing. Writing with AI assistance can be detected
            and often disqualifies the application.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Essays in context of your full application</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Strong essays complement strong academics and extracurriculars — they do not replace them.
            Use the AdmitGPT calculator to understand your baseline probability, then invest your
            essay energy where it can have the most impact: the schools where your numbers are
            competitive but the essay could tip the balance.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Calculate Your Baseline Chances
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <RelatedGuides current="/guide/college-application-essay-tips" />
        </section>
      </main>
    </div>
  );
}

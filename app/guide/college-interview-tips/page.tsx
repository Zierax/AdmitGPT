import type { Metadata } from "next";
import Link from "next/link";
import { RelatedGuides } from "@/app/components/RelatedGuides";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { GuideByline } from "@/app/guide/GuideByline";
import { GuideFAQ } from "@/app/guide/GuideFAQ";
import { QuickAnswer } from "@/app/guide/QuickAnswer";

export const metadata: Metadata = {
  title: "College Interview Tips — How to Ace Your Admissions Interview",
  description:
    "Complete guide to college admissions interviews: common questions, how to prepare, what to wear, questions to ask the interviewer, and how interviews actually affect your admission decision.",
  keywords: [
    "college interview tips",
    "college interview questions",
    "how to prepare for a college interview",
    "college interview questions to ask",
    "college interview what to wear",
    "college admissions interview",
    "Ivy League interview tips",
    "college interview do's and don'ts",
    "college interview follow up",
    "college interview thank you email",
  ],
  openGraph: {
    title: "College Interview Tips — Ace Your Admissions Interview",
    description: "How to prepare, what to wear, common questions, what to ask the interviewer, and how much interviews actually matter in selective college admissions.",
    url: "/guide/college-interview-tips",
    type: "article",
  },
  alternates: { canonical: "/guide/college-interview-tips" },
};

export default function InterviewTips() {
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
              { "@type": "ListItem", position: 3, name: "College Interview Tips", item: SITE_ORIGIN + "/guide/college-interview-tips" },
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
            headline: "College Interview Tips — How to Ace Your Admissions Interview",
            description: "Complete guide to college admissions interviews: common questions, how to prepare, what to wear, questions to ask the interviewer, and how interviews actually affect your admission decision.",
            inLanguage: "en-US",
            datePublished: "2025-08-01",
            dateModified: "2026-02-20",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": SITE_ORIGIN + "/guide/college-interview-tips" },
            isPartOf: { "@type": "WebSite", "@id": SITE_ORIGIN + "/#website" },
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Interviews</div>
        <h1 className="tp-h1">College Interview Tips</h1>
        <GuideByline updated="2026-02-20" />
        <QuickAnswer>
          College interviews are a minor but controllable factor: they rarely make or break an
          application, but a strong one can confirm a borderline file while a weak one raises doubts.
          At most selective schools interviews are evaluative &mdash; the alumni interviewer submits
          a report assessing intellectual curiosity, interpersonal skills, and fit &mdash; though
          not receiving one (often just no alumnus nearby) does not hurt you. Prepare for predictable
          questions (&ldquo;Tell me about yourself,&rdquo; &ldquo;Why this school?&rdquo;) with
          specific, non-memorized answers, and bring 3&ndash;5 thoughtful questions (not Google-able
          ones). Dress business casual, test your video setup if virtual, be on time, and send a
          thank-you email within 24 hours. Remember the interview is also your chance to evaluate
          the school. Your odds still hinge on GPA, tests, extracurriculars, and essays.
        </QuickAnswer>
        <p className="tp-lead">
          College interviews are one of the most misunderstood parts of the admissions process.
          They rarely make or break an application, but a strong interview can confirm what the
          rest of your file suggests — and a bad one can raise doubts. Here is how to prepare
          effectively.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">How much do interviews actually matter?</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            At most selective schools, interviews are <strong>evaluative</strong> — the interviewer
            submits a report that becomes part of your file. At other schools, interviews are
            <strong>informational</strong> — they exist to answer your questions and are not
            factored into admissions decisions. The relative weight of interviews versus academics is
            visible in each school&rsquo;s{" "}
            <a
              href="https://commondataset.org"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--color-primary)" }}
            >
              Common Data Set
            </a>{" "}
            profile. The evaluative interview report typically assesses
            intellectual curiosity, interpersonal skills, and fit. It rarely outweighs a weak GPA
            or test score, but it can tip a borderline candidate into the admit pile.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            At Ivy League schools and other highly selective universities, alumni conduct most
            interviews, where the odds are covered in our{" "}
            <Link href="/guide/ivy-league-chances" style={{ color: "var(--color-primary)" }}>
              Ivy League chances guide
            </Link>
            . The interview is typically offered to as many applicants as possible, but
            not receiving an interview does not hurt your chances — it often just means no alumnus
            was available in your area.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Common interview questions</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Most college interviews follow a predictable pattern: "Tell me about yourself," "Why
            are you interested in this school?" "What do you want to study?" "What do you do for
            fun?" "Tell me about a challenge you have overcome." Prepare for these, but do not
            memorize answers — the best interviews feel like natural conversations.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            For each school on your list, prepare a specific answer to "Why this school?" that
            references a program, professor, course, or campus resource unique to that institution.
            Generic answers that could apply to any school are the most common interview mistake.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Questions to ask the interviewer</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            You should always prepare 3–5 questions for the interviewer. Good options: "What did
            you get out of your experience at [school]?" "What do current students complain about?"
            "How would you describe the intellectual culture?" Avoid questions you could answer
            with a Google search (class size, application deadline, available majors).
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Practical preparation tips</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Dress business casual (no suit required, but no sweatpants either). Test your video
            and audio setup if the interview is virtual — which most are. Be on time. Send a brief
            thank-you email within 24 hours. Do not bring your resume (the interviewer already has
            your application). And remember: the interview is also your chance to evaluate the
            school — treat it as a two-way conversation.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Interviews in context of your full application</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Your admission odds are determined primarily by your GPA, test scores, extracurriculars
            (see our{" "}
            <Link href="/guide/evaluate-extracurriculars" style={{ color: "var(--color-primary)" }}>
              spike scoring guide
            </Link>
            ), and essays. The interview is a minor factor — but it is one you can control with
            preparation. Use the AdmitGPT calculator to understand your baseline probability, then
            use the interview to reinforce the narrative your application tells.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Calculate Your Admission Chances
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <GuideFAQ
            items={[
              { q: "Do college interviews actually affect admission?", a: "At most selective schools interviews are evaluative and become part of your file, but they rarely outweigh a weak GPA or test score — though they can tip a borderline candidate into the admit pile. Not receiving an alumni interview does not hurt your chances." },
              { q: "What should I ask in a college interview?", a: "Prepare 3–5 questions like what the interviewer got out of their experience or how they'd describe the intellectual culture. Avoid questions answerable with a Google search, such as class size, application deadline, or available majors." },
            ]}
          />

<RelatedGuides current="/guide/college-interview-tips" />
        </section>
      </main>
    </div>
  );
}

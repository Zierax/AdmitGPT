import type { Metadata } from "next";
import Link from "next/link";
import { RelatedGuides } from "@/app/components/RelatedGuides";
import { SITE_ORIGIN } from "@/lib/siteConfig";
import { GuideByline } from "@/app/guide/GuideByline";
import { GuideFAQ } from "@/app/guide/GuideFAQ";
import { QuickAnswer } from "@/app/guide/QuickAnswer";

export const metadata: Metadata = {
  title: "College Waitlist Strategy — How to Get Off the Waitlist",
  description:
    "Data-backed guide to college waitlist strategy: how waitlists work, what increases your chances of getting off, when to send a letter of continued interest, and which schools have the highest waitlist acceptance rates.",
  keywords: [
    "college waitlist strategy",
    "how to get off college waitlist",
    "waitlist acceptance rate",
    "letter of continued interest",
    "college waitlist tips",
    "what to do if waitlisted",
    "waitlist chances 2026",
    "college waitlist move",
  ],
  openGraph: {
    title: "College Waitlist Strategy — How to Get Off the Waitlist",
    description: "Data-backed guide to getting off the college waitlist: what works, what doesn't, and how to maximize your chances.",
    url: "/guide/college-waitlist-strategy",
    type: "article",
  },
  alternates: { canonical: "/guide/college-waitlist-strategy" },
};

export default function WaitlistStrategy() {
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
              { "@type": "ListItem", position: 3, name: "Waitlist Strategy", item: SITE_ORIGIN + "/guide/college-waitlist-strategy" },
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
            headline: "College Waitlist Strategy — How to Get Off the Waitlist",
            description: "Data-backed guide to college waitlist strategy: how waitlists work, what increases your chances of getting off, when to send a letter of continued interest.",
            inLanguage: "en-US",
            datePublished: "2026-07-24",
            dateModified: "2026-07-24",
            author: { "@id": SITE_ORIGIN + "/#author" },
            publisher: { "@id": SITE_ORIGIN + "/#organization" },
            mainEntityOfPage: { "@type": "WebPage", "@id": SITE_ORIGIN + "/guide/college-waitlist-strategy" },
            isPartOf: { "@type": "WebSite", "@id": SITE_ORIGIN + "/#website" },
          }),
        }}
      />
      <main className="tp-wrap">
        <div className="tp-eyebrow">Knowledge Base / Waitlists</div>
        <h1 className="tp-h1">College Waitlist Strategy</h1>
        <GuideByline updated="2026-07-24" />
        <QuickAnswer>
          Waitlists are a holding pattern, not a rejection: the school wants you but
          cannot offer a spot yet. Your chances depend entirely on how many admitted
          students decline their offers — typically 10–20% at selective schools. To
          maximize your odds: send a brief Letter of Continued Interest (LOCI) within
          two weeks, update the school with any new achievements (new grades, awards,
          or test scores), and demonstrate genuine interest. Do NOT send additional
          recommendation letters or repeated emails. If the school is your top choice,
          say so clearly. Most waitlist movement happens in May and June after
          deposit deadlines pass.
        </QuickAnswer>
        <p className="tp-lead">
          Getting waitlisted feels like purgatory — not admitted, not rejected. But
          understanding how waitlists actually work gives you a real strategy instead
          of just waiting and hoping.
        </p>

        <section className="tp-section">
          <h2 className="tp-h2">How college waitlists actually work</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Colleges use waitlists to manage enrollment yield. They admit more students
            than they have seats, expecting some to decline. The waitlist is their
            backup pool. Schools typically waitlist 5–15% of applicants and admit
            10–30% of waitlisted students, depending on how many admitted students
            enroll. The key insight: waitlist movement is unpredictable and depends
            entirely on yield — how many admitted students say yes.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Selective schools with low yield rates (students who apply to many top
            schools) tend to have more waitlist movement. Schools with high yield
            (like Harvard at ~84%) rarely touch their waitlist. Check the school&rsquo;s
            Common Data Set section C2 for historical waitlist data.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">What to do immediately after being waitlisted</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>1. Accept your spot on the waitlist</strong> — this is usually required
            and has a deadline. Miss it and you&rsquo;re out.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>2. Send a Letter of Continued Interest (LOCI)</strong> — within two weeks,
            send a brief email to your regional admissions officer. Reaffirm your interest,
            mention any new achievements, and explain why this school is your top choice.
            Keep it under 300 words. Do not repeat your original application.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>3. Update your application</strong> — if you receive new grades, awards,
            test scores, or significant accomplishments after submitting your application,
            send a brief update. One email, not multiple.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>4. Accept an offer at another school</strong> — do not hold out. Accept
            an offer from a school you&rsquo;re happy with and pay the deposit. If you get
            off the waitlist later, you can switch (you&rsquo;ll lose the deposit, but
            that&rsquo;s a small cost for a better outcome).
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">What actually works (and what doesn&rsquo;t)</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>Works:</strong> Demonstrating genuine, updated interest. Sending a concise
            LOCI. Providing new information (grades, awards, test scores). Having a
            relationship with your regional officer.
          </p>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            <strong>Doesn&rsquo;t work:</strong> Sending multiple emails. Calling the
            admissions office repeatedly. Sending additional recommendation letters
            (unless specifically requested). Offering donations. Having parents call.
            Showing up unannounced.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">When waitlist decisions come</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            Most waitlist movement happens after May 1 (National Decision Day), when
            admitted students must commit. Schools then know how many seats they have
            left and turn to the waitlist. Some movement happens in May, most in June,
            and a trickle into July. If you haven&rsquo;t heard by mid-July, it&rsquo;s
            unlikely. You can remain on the waitlist indefinitely at most schools —
            they won&rsquo;t force you off.
          </p>
        </section>

        <section className="tp-section">
          <h2 className="tp-h2">Use the calculator to plan your next move</h2>
          <p className="ag-muted" style={{ fontSize: 15, lineHeight: 1.75 }}>
            While you wait, use AdmitGPT to evaluate your chances at other schools
            on your list. Understanding your probabilities at your safety and target
            schools helps you make a confident decision about where to enroll while
            keeping your waitlist options open.
          </p>
          <div style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-primary">
              Calculate Your Chances at Other Schools
            </Link>
            <Link href="/guide" className="btn btn-secondary" style={{ marginLeft: 12 }}>
              Back to Guides
            </Link>
          </div>
          <GuideFAQ
            items={[
              { q: "What are my chances of getting off a waitlist?", a: "At selective schools, typically 10–30% of waitlisted students are eventually admitted, depending on yield. Schools with lower yield rates tend to pull more from the waitlist. There's no way to know your individual odds — it depends entirely on how many admitted students decline their offers." },
              { q: "Should I send a letter of continued interest?", a: "Yes — send a brief LOCI within two weeks of being waitlisted. Reaffirm your interest, mention any new achievements, and explain why this school is your top choice. Keep it under 300 words and send it once." },
              { q: "Does being waitlisted mean they like me?", a: "Yes — being waitlisted means you met the admissions threshold but there wasn't room. It's a genuine maybe, not a soft rejection. The school wants to admit you if space opens up." },
            ]}
          />

<RelatedGuides current="/guide/college-waitlist-strategy" />
        </section>
      </main>
    </div>
  );
}

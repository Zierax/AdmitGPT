import Link from "next/link";

const allGuides: Record<string, { slug: string; title: string }> = {
  "ivy-league-chances": { slug: "ivy-league-chances", title: "Your Ivy League Admission Chances" },
  "how-to-get-into-ivy-league": { slug: "how-to-get-into-ivy-league", title: "How to Get Into an Ivy League School" },
  "early-decision-vs-early-action": { slug: "early-decision-vs-early-action", title: "Early Decision vs Early Action" },
  "what-gpa-do-you-need-for-college": { slug: "what-gpa-do-you-need-for-college", title: "What GPA Do You Need for College?" },
  "good-sat-score-for-ivy-league": { slug: "good-sat-score-for-ivy-league", title: "Good SAT Score for Ivy League Admission" },
  "college-application-essay-tips": { slug: "college-application-essay-tips", title: "College Application Essay Tips" },
  "college-acceptance-rates-2026": { slug: "college-acceptance-rates-2026", title: "College Acceptance Rates 2026" },
  "financial-aid-explained": { slug: "financial-aid-explained", title: "College Financial Aid Explained" },
  "how-to-choose-a-college": { slug: "how-to-choose-a-college", title: "How to Choose a College" },
  "college-rankings-explained": { slug: "college-rankings-explained", title: "College Rankings Explained" },
  "test-optional-admissions": { slug: "test-optional-admissions", title: "Does Going Test-Optional Hurt Your Chances?" },
  "evaluate-extracurriculars": { slug: "evaluate-extracurriculars", title: "How Colleges Score Your Extracurriculars & Spike" },
  "international-student-admissions": { slug: "international-student-admissions", title: "International Student US College Admissions" },
  "college-application-deadlines-2026": { slug: "college-application-deadlines-2026", title: "College Application Deadlines 2026–2027" },
  "college-application-checklist": { slug: "college-application-checklist", title: "College Application Checklist" },
  "college-interview-tips": { slug: "college-interview-tips", title: "College Interview Tips" },
  "community-college-vs-university": { slug: "community-college-vs-university", title: "Community College vs University" },
  "harvard-vs-stanford-vs-mit": { slug: "harvard-vs-stanford-vs-mit", title: "Harvard vs Stanford vs MIT" },
};

// Topically adjacent guides shown as "Further Reading" for each page.
const relatedBySlug: Record<string, string[]> = {
  "ivy-league-chances": ["how-to-get-into-ivy-league", "good-sat-score-for-ivy-league", "what-gpa-do-you-need-for-college", "harvard-vs-stanford-vs-mit", "early-decision-vs-early-action"],
  "how-to-get-into-ivy-league": ["ivy-league-chances", "good-sat-score-for-ivy-league", "what-gpa-do-you-need-for-college", "early-decision-vs-early-action", "evaluate-extracurriculars"],
  "early-decision-vs-early-action": ["ivy-league-chances", "how-to-get-into-ivy-league", "college-application-deadlines-2026", "test-optional-admissions", "college-acceptance-rates-2026"],
  "what-gpa-do-you-need-for-college": ["good-sat-score-for-ivy-league", "evaluate-extracurriculars", "ivy-league-chances", "college-rankings-explained", "how-to-get-into-ivy-league"],
  "good-sat-score-for-ivy-league": ["what-gpa-do-you-need-for-college", "ivy-league-chances", "test-optional-admissions", "how-to-get-into-ivy-league", "harvard-vs-stanford-vs-mit"],
  "college-application-essay-tips": ["college-application-checklist", "how-to-get-into-ivy-league", "college-interview-tips", "evaluate-extracurriculars", "early-decision-vs-early-action"],
  "college-acceptance-rates-2026": ["ivy-league-chances", "harvard-vs-stanford-vs-mit", "college-rankings-explained", "early-decision-vs-early-action", "what-gpa-do-you-need-for-college"],
  "financial-aid-explained": ["international-student-admissions", "college-application-checklist", "how-to-choose-a-college", "early-decision-vs-early-action", "community-college-vs-university"],
  "how-to-choose-a-college": ["college-rankings-explained", "community-college-vs-university", "financial-aid-explained", "harvard-vs-stanford-vs-mit", "what-gpa-do-you-need-for-college"],
  "college-rankings-explained": ["how-to-choose-a-college", "college-acceptance-rates-2026", "harvard-vs-stanford-vs-mit", "community-college-vs-university", "ivy-league-chances"],
  "test-optional-admissions": ["good-sat-score-for-ivy-league", "what-gpa-do-you-need-for-college", "early-decision-vs-early-action", "ivy-league-chances", "how-to-get-into-ivy-league"],
  "evaluate-extracurriculars": ["how-to-get-into-ivy-league", "what-gpa-do-you-need-for-college", "college-application-essay-tips", "ivy-league-chances", "good-sat-score-for-ivy-league"],
  "international-student-admissions": ["financial-aid-explained", "test-optional-admissions", "how-to-choose-a-college", "college-acceptance-rates-2026", "ivy-league-chances"],
  "college-application-deadlines-2026": ["college-application-checklist", "early-decision-vs-early-action", "financial-aid-explained", "college-interview-tips", "test-optional-admissions"],
  "college-application-checklist": ["college-application-deadlines-2026", "college-application-essay-tips", "college-interview-tips", "financial-aid-explained", "evaluate-extracurriculars"],
  "college-interview-tips": ["college-application-essay-tips", "college-application-checklist", "how-to-get-into-ivy-league", "evaluate-extracurriculars", "college-application-deadlines-2026"],
  "community-college-vs-university": ["how-to-choose-a-college", "college-rankings-explained", "financial-aid-explained", "college-acceptance-rates-2026", "international-student-admissions"],
  "harvard-vs-stanford-vs-mit": ["ivy-league-chances", "college-acceptance-rates-2026", "good-sat-score-for-ivy-league", "how-to-get-into-ivy-league", "college-rankings-explained"],
};

export function RelatedGuides({ current }: { current: string }) {
  const slug = current.replace("/guide/", "");
  const relatedSlugs = (relatedBySlug[slug] ?? Object.keys(allGuides).filter((s) => s !== slug)).slice(0, 5);
  const related = relatedSlugs.map((s) => allGuides[s]);

  return (
    <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid var(--color-border)" }}>
      <h3 className="tp-h3" style={{ marginBottom: 14 }}>Further Reading</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
        {related.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guide/${g.slug}`}
              style={{
                color: "var(--color-primary)",
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              → {g.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

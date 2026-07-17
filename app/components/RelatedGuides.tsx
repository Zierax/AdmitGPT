import Link from "next/link";

const allGuides = [
  { slug: "ivy-league-chances", title: "Your Ivy League Admission Chances" },
  { slug: "how-to-get-into-ivy-league", title: "How to Get Into an Ivy League School" },
  { slug: "early-decision-vs-early-action", title: "Early Decision vs Early Action" },
  { slug: "what-gpa-do-you-need-for-college", title: "What GPA Do You Need for College?" },
  { slug: "good-sat-score-for-ivy-league", title: "Good SAT Score for Ivy League Admission" },
  { slug: "college-application-essay-tips", title: "College Application Essay Tips" },
  { slug: "college-acceptance-rates-2026", title: "College Acceptance Rates 2026" },
  { slug: "financial-aid-explained", title: "College Financial Aid Explained" },
  { slug: "how-to-choose-a-college", title: "How to Choose a College" },
  { slug: "college-rankings-explained", title: "College Rankings Explained" },
  { slug: "test-optional-admissions", title: "Does Going Test-Optional Hurt Your Chances?" },
  { slug: "evaluate-extracurriculars", title: "How Colleges Score Your Extracurriculars & Spike" },
  { slug: "international-student-admissions", title: "International Student US College Admissions" },
];

export function RelatedGuides({ current }: { current: string }) {
  const related = allGuides
    .filter((g) => `/guide/${g.slug}` !== current)
    .slice(0, 5);

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

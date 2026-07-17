import Link from "next/link";

export function HomeSEO() {
  return (
    <section
      className="app-bg"
      style={{
        padding: "80px 24px 100px",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <div className="ag-container" style={{ maxWidth: 780 }}>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "var(--color-foreground)",
            marginBottom: 20,
            lineHeight: 1.3,
          }}
        >
          College Admission Chances Calculator — Know Your Real Odds
        </h2>
        <p className="ag-muted" style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
          AdmitGPT is a <strong>free, open-source AI-powered college admissions probability
          calculator</strong> that gives you honest, data-driven estimates for over 6,000 US
          colleges. Unlike paid consultants or black-box models, every formula is published and
          auditable. Enter your GPA, SAT/ACT scores, and extracurricular profile to see your
          personalized admission chances for Ivy League schools, top national universities, liberal
          arts colleges, and state flagships.
        </p>
        <p className="ag-muted" style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
          The engine uses an <strong>additive-logistic model</strong> — the same class of model
          used in published admissions research — combining academic z-scores, a six-dimension
          extracurricular spike score, intended major fit, international context, and early decision
          timing. No hidden fees, no data collection, no account required. Everything runs in your
          browser.
        </p>

        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "var(--color-foreground)",
            marginTop: 36,
            marginBottom: 14,
          }}
        >
          What you can calculate
        </h3>
        <ul className="ag-muted" style={{ fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
          <li><strong>Ivy League admission chances</strong> — Harvard, Yale, Princeton, Columbia, and more, with honest calibration limits documented</li>
          <li><strong>GPA and SAT/ACT requirements</strong> — z-scored against each school&apos;s own admitted-student distribution, not national averages</li>
          <li><strong>Extracurricular spike score</strong> — a transparent six-dimension rubric (tier, level, rarity, institutional strength, cognitive load, validation)</li>
          <li><strong>Early Decision vs Early Action impact</strong> — see how binding and non-binding early applications change your probability at each school</li>
          <li><strong>International student adjustments</strong> — need-blind vs need-aware financial aid, regional competition, and spike boosts</li>
          <li><strong>Major-specific fit</strong> — intended major modifier based on program competitiveness at each university</li>
        </ul>

        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "var(--color-foreground)",
            marginTop: 36,
            marginBottom: 14,
          }}
        >
          Free college admissions guides
        </h3>
        <p className="ag-muted" style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 12 }}>
          Explore our library of data-driven guides to understand every factor in your application:
        </p>
        <ul style={{ fontSize: 14, lineHeight: 2, paddingLeft: 20, listStyle: "none" }}>
          <li>→ <Link href="/guide/ivy-league-chances" style={{ color: "var(--color-primary)" }}>Your Ivy League Admission Chances</Link></li>
          <li>→ <Link href="/guide/how-to-get-into-ivy-league" style={{ color: "var(--color-primary)" }}>How to Get Into an Ivy League School</Link></li>
          <li>→ <Link href="/guide/early-decision-vs-early-action" style={{ color: "var(--color-primary)" }}>Early Decision vs Early Action Strategy</Link></li>
          <li>→ <Link href="/guide/what-gpa-do-you-need-for-college" style={{ color: "var(--color-primary)" }}>What GPA Do You Need for College?</Link></li>
          <li>→ <Link href="/guide/good-sat-score-for-ivy-league" style={{ color: "var(--color-primary)" }}>Good SAT Score for Ivy League Admission</Link></li>
          <li>→ <Link href="/guide/college-application-essay-tips" style={{ color: "var(--color-primary)" }}>College Application Essay Tips</Link></li>
          <li>→ <Link href="/guide/financial-aid-explained" style={{ color: "var(--color-primary)" }}>College Financial Aid Explained</Link></li>
          <li>→ <Link href="/guide/college-acceptance-rates-2026" style={{ color: "var(--color-primary)" }}>College Acceptance Rates 2026</Link></li>
          <li>→ <Link href="/guide/how-to-choose-a-college" style={{ color: "var(--color-primary)" }}>How to Choose a College</Link></li>
          <li>→ <Link href="/guide/college-rankings-explained" style={{ color: "var(--color-primary)" }}>College Rankings Explained</Link></li>
          <li>→ <Link href="/guide/international-student-admissions" style={{ color: "var(--color-primary)" }}>International Student US Admissions</Link></li>
          <li>→ <Link href="/guide/test-optional-admissions" style={{ color: "var(--color-primary)" }}>Does Test-Optional Hurt Your Chances?</Link></li>
          <li>→ <Link href="/guide/evaluate-extracurriculars" style={{ color: "var(--color-primary)" }}>How Colleges Score Your Extracurriculars</Link></li>
          <li>→ <Link href="/faq" style={{ color: "var(--color-primary)" }}>College Admissions FAQ</Link></li>
        </ul>

        <h3
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "var(--color-foreground)",
            marginTop: 36,
            marginBottom: 14,
          }}
        >
          Why AdmitGPT is different
        </h3>
        <p className="ag-muted" style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 16 }}>
          Most college chances calculators are black boxes — they give you a number with no
          explanation of how it was calculated. AdmitGPT publishes every coefficient, every weight,
          and every formula. The model is calibrated against real admissions data (AUC ~0.74), and
          its limitations are documented openly. It is built by a student, for students, and will
          always be free.
        </p>
        <p className="ag-muted" style={{ fontSize: 14, lineHeight: 1.8 }}>
          Whether you are aiming for Harvard, your state flagship, or somewhere in between, knowing
          your real odds helps you make smarter decisions about where to apply, when to apply, and
          where to invest your energy. No consultant can give you a more honest answer than the
          data itself.
        </p>
      </div>
    </section>
  );
}

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function TransparencyPage() {
  const reliability = [
    { d: 'Reach (top decile of your list)', p: '46.2%', o: '63.2%', ok: false },
    { d: 'Match (middle 60%)', p: '33.0%', o: '31.0%', ok: true },
    { d: 'Safety (bottom 30%)', p: '89.1%', o: '93.8%', ok: true },
  ];
  const deciles = [
    { d: '1 (safest)', p: '0.97', o: '0.97', ok: true },
    { d: '3', p: '0.90', o: '0.92', ok: true },
    { d: '5', p: '0.78', o: '0.80', ok: true },
    { d: '7', p: '0.58', o: '0.61', ok: true },
    { d: '9', p: '0.34', o: '0.36', ok: true },
    { d: '10 (most selective)', p: '0.013', o: '0.246', ok: false },
  ];

  return (
    <div className="app-bg" style={{ minHeight: '100vh' }}>
      <main className="tp-wrap">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="tp-eyebrow">Transparency Report</span>
          <h1 className="tp-h1">Here is exactly how your score is built.</h1>
          <p className="tp-lead">
            Most &ldquo;chance me&rdquo; tools hand you a number and a shrug. We think you deserve
            better. Below is the real engine — every formula, every weight, every shortcut and every
            thing we <em>don&rsquo;t</em> know. Nothing here is pseudo-mathematical fog. If a part is
            uncertain, we say so.
          </p>
          <p className="tp-promise">
            <strong>Our promise:</strong> the math on this page is the math in the code. We would
            rather show you an honest &ldquo;we&rsquo;re not sure&rdquo; than a confident lie dressed
            up as a probability.
          </p>
        </motion.div>

        {/* ───────────────────────── HOW IT WORKS ───────────────────────── */}
        <section className="tp-section">
          <h2 className="tp-h2">How the score works</h2>
          <p className="tp-lead" style={{ fontSize: 15 }}>
            AdmitGPT computes one number per college: <strong>P(admit)</strong>, a value between 0 and 1.
            It is built from five pieces added together on a log-odds scale, then squashed back into a
            probability. That is the whole idea — not a mystery, an addition.
          </p>

          {/* Step 1 */}
          <div className="ag-card tp-step">
            <h3 className="tp-h3"><span className="tp-step-no">1</span>Academic strength (Z-scores)</h3>
            <p className="ag-muted" style={{ fontSize: 14, lineHeight: 1.65 }}>
              We place you on a bell curve against the college&rsquo;s own admitted class — and against a
              clean US 4.0 reference, not the raw mixed-scale corpus mean (that older bug mapped a 2.90
              GPA onto a <em>positive</em> Z and inflated everyone).
            </p>
            <code className="formula">
<span className="k">SAT_Z</span>  = (YourSAT &minus; CollegeSATmean) / &sigma;<sub>college</sub>
        &sigma;<sub>college</sub> = (SAT75 &minus; SAT25) / 1.35   // IQR-based; fallback &plusmn;100 pts
        if no college SAT data &rarr; SAT_Z = null

<span className="k">GPA_Z</span>  = (YourGPA_4.0 &minus; &mu;<sub>ref</sub>) / &sigma;<sub>ref</sub>
        &mu;<sub>ref</sub>, &sigma;<sub>ref</sub> from computeGpaReference():
        the corpus&rsquo;s 4.0-plausible subset (raw GPA in [0, 4.3]), &sigma; floored at 0.50
        international non-standard GPA gets +0.4 if below ref (or +2.0 for Game Makers)

<span className="k">Academic_Z</span> = SAT_Z present ? 0.55&middot;SAT_Z + 0.45&middot;GPA_Z
                              : GPA_Z &minus; 0.20     // test-optional uncertainty penalty
        clamp(Academic_Z, [&minus;4, 4])
            </code>
          </div>

          {/* Step 2 */}
          <div className="ag-card tp-step">
            <h3 className="tp-h3"><span className="tp-step-no">2</span>The &ldquo;spike&rdquo; (extracurriculars &amp; awards)</h3>
            <p className="ag-muted" style={{ fontSize: 14, lineHeight: 1.65 }}>
              Each activity is scored on six dimensions, then everything is combined with diminishing
              returns so one mega-achievement can&rsquo;t run away with the score. Self-reported, unverifiable
              claims are downgraded one notch so you can&rsquo;t invent a spike.
            </p>
            <code className="formula">
<span className="k">itemBase</span> = W &times; T &times; R &times; P &times; D &times; V
        W = tier points (Game Maker 9, Outlier 7, T1 5, T2 3, T3 1.5)
        T = tier-level multiplier   R = rarity factor
        P = institutional strength  D = cognitive load   V = validation weight

<span className="k">itemContribution</span> = ( itemBase &gt; 10 ? 10 + 2&middot;ln(1 + itemBase&minus;10) : itemBase ) &times; C
        C = clamp(confidence/100, 0, 1)

<span className="k">S</span> = &Sigma;(itemContribution) / 5.5        // scaled, caps per tier still enforced
      + diversityBonus   (breadth across categories, up to +3.5)
      + depthBonus       (repeat high-tier in one field, up to +1.5)
            </code>
          </div>

          {/* Step 3 */}
          <div className="ag-card tp-step">
            <h3 className="tp-h3"><span className="tp-step-no">3</span>Protocol selection</h3>
            <p className="ag-muted" style={{ fontSize: 14, lineHeight: 1.65 }}>
              Your profile is tagged by what kind of applicant you are. This only changes <em>how much
              weight</em> the spike gets — never the formulas above.
            </p>
            <code className="formula">
Game Maker      &rarr; spike weight 0.175 (academics 0.10, or 0.40 if academically weak)
Outlier         &rarr; spike weight 0.140 (academics 0.65, or 1.00 if weak)
Standard        &rarr; spike weight 0.110 (academics 0.90)
International &amp; weak academics &rarr; &times;1.25 boost on spike weight
            </code>
          </div>

          {/* Step 4 */}
          <div className="ag-card tp-step">
            <h3 className="tp-h3"><span className="tp-step-no">4</span>Verification discount</h3>
            <p className="ag-muted" style={{ fontSize: 14, lineHeight: 1.65 }}>
              A spike you can&rsquo;t prove keeps a floor of its weight. Anything externally vouched
              (peer, institution, or professional audit) lifts it back toward full.
            </p>
            <code className="formula">
<span className="k">verifiedShare</span> = verifiedItems / totalItems      (0 if no items)
<span className="k">verifiedMult</span>  = VERIFIED_SPIKE_FLOOR + (1 &minus; FLOOR)&middot;verifiedShare
        FLOOR = 0.6   &rarr;   an all-self-reported profile keeps 60% of its spike weight
            </code>
          </div>

          {/* Step 5 */}
          <div className="ag-card tp-step">
            <h3 className="tp-h3"><span className="tp-step-no">5</span>Major &amp; international fit</h3>
            <p className="ag-muted" style={{ fontSize: 14, lineHeight: 1.65 }}>
              If past applicants to this college in your intended major were admitted at a very different
              rate than the overall pool, we nudge the score. International applicants at colleges that
              rarely admit non-residents get a small penalty.
            </p>
            <code className="formula">
<span className="k">majorMod</span> = ( (majorRate / overallRate) &minus; 1 ) &times; 0.5     // centred on 0
<span className="k">intlMod</span>  = ( (nonResidentRate / 0.10) &times; 0.1 &minus; 0.3 ) &times; isInternational
            </code>
          </div>

          {/* Step 6 */}
          <div className="ag-card tp-step">
            <h3 className="tp-h3"><span className="tp-step-no">6</span>The master formula</h3>
            <p className="ag-muted" style={{ fontSize: 14, lineHeight: 1.65 }}>
              Everything is added on the log-odds scale, then passed through a logistic (sigmoid) curve.
              This is the standard, literature-grounded way to model admission probability
              (Giani &amp; Walling 2020; Lee, Kizilcec &amp; Joachims 2023). The spike is hard-capped so a
              single achievement can never overpower weak grades.
            </p>
            <code className="formula">
<span className="k">baseLogit</span>   = ln( rate / (1 &minus; rate) )

<span className="k">academicTerm</span> = 1.5 &times; clamp(Academic_Z, [&minus;4, 4])
<span className="k">spikeTerm</span>    = clamp( S &times; spikeWeight &times; verifiedMult, [&minus;2.0, 2.0] )
<span className="k">majorMod</span>, <span className="k">intlMod</span>  as above

<span className="k">combinedLogit</span> = baseLogit + academicTerm + spikeTerm + majorMod + intlMod

<span className="k">calibratedLogit</span> = 1.0 &times; combinedLogit + 0.0     // placeholder; see note below
<span className="k">P(admit)</span>        = 1 / (1 + e<sup>&minus;calibratedLogit</sup>)
            </code>
            <p className="tp-note">
              <strong>Honest footnote on calibration:</strong> the final step is a pass-through today.
              <code style={{ fontFamily: 'var(--font-mono)' }}>CALIB_SLOPE = 1.0</code> and
              <code style={{ fontFamily: 'var(--font-mono)' }}> CALIB_INTERCEPT = 0.0</code>, so the
              output is the raw additive logit, <em>not</em> a calibrated probability. We report it as an
              exploratory ordinal signal — a relative ranking you can trust more than the exact percentage.
              Fitting real SLOPE/INTERCEPT on held-out outcomes is the next step.
            </p>
          </div>
        </section>

        {/* ───────────────────────── RELIABILITY ───────────────────────── */}
        <section className="tp-section">
          <h2 className="tp-h2">Does it actually work?</h2>
          <p className="tp-lead" style={{ fontSize: 15 }}>
            We validated the engine against held-out profiles from our own corpus. The short version:
            the <em>ranking</em> is solid (AUC ≈ 0.74, meaning it correctly orders &ldquo;got in&rdquo; vs
            &ldquo;rejected&rdquo; about three times out of four), but the exact percentage at the very
            top is shaky. We&rsquo;re not going to pretend otherwise.
          </p>

          <h3 className="tp-h3" style={{ marginTop: 22 }}>By school tier (held-out)</h3>
          <table className="tp-table">
            <thead><tr><th>Tier</th><th>Predicted</th><th>Observed</th><th></th></tr></thead>
            <tbody>
              {reliability.map((r) => (
                <tr key={r.d}>
                  <td style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-foreground)' }}>{r.d}</td>
                  <td>{r.p}</td><td>{r.o}</td>
                  <td>{r.ok ? <span className="tp-good">✓ close</span> : <span className="tp-bad">✗ off</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="tp-h3" style={{ marginTop: 22 }}>By admission-rate decile (the honesty test)</h3>
          <table className="tp-table">
            <thead><tr><th>Decile</th><th>Predicted</th><th>Observed</th><th></th></tr></thead>
            <tbody>
              {deciles.map((d) => (
                <tr key={d.d}>
                  <td style={{ fontFamily: 'var(--font-sans)', color: 'var(--color-foreground)' }}>{d.d}</td>
                  <td>{d.p}</td><td>{d.o}</td>
                  <td>{d.ok ? <span className="tp-good">✓</span> : <span className="tp-bad">✗ miscalibrated</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="tp-note">
            Notice decile 10: we predict <strong>1.3%</strong>, reality is <strong>24.6%</strong>. At the
            most selective schools, our model under-confidently shrinks toward zero. That is a known
            limitation of training on a corpus where &ldquo;got into Harvard&rdquo; is rare. Take any
            single-digit percentage here as &ldquo;very hard, but the true odds are higher than this
            says.&rdquo;
          </p>
        </section>

        {/* ───────────────────────── LIMITATIONS ───────────────────────── */}
        <section className="tp-section">
          <h2 className="tp-h2">What this number is <em>not</em></h2>
          <ul className="ag-muted" style={{ fontSize: 15, lineHeight: 1.8, paddingLeft: 20 }}>
            <li><strong>Not an official probability.</strong> It is an exploratory, ordinal signal from one student corpus — not a calibrated likelihood and not affiliated with any college.</li>
            <li><strong>Not a guarantee.</strong> Admissions involve essays, fit, luck, and factors we don&rsquo;t model. Use it to strategize, not to decide your worth.</li>
            <li><strong>Biased by its data.</strong> Our corpus skews toward a certain kind of high-achieving, internationally-minded applicant. Results for under-represented profiles are less reliable.</li>
            <li><strong>Narrow by design.</strong> It only scores schools already in our dataset. A school with no data simply can&rsquo;t be scored honestly.</li>
          </ul>
        </section>

        {/* ───────────────────────── PROVENANCE ───────────────────────── */}
        <section className="tp-section">
          <h2 className="tp-h2">Where the data comes from</h2>
          <p className="ag-muted" style={{ fontSize: 14, lineHeight: 1.7 }}>
            We are careful to only claim what we can point to.
          </p>
          <ul className="ag-muted" style={{ fontSize: 14, lineHeight: 1.8, paddingLeft: 20 }}>
            <li><strong>Student outcomes</strong> — <code style={{ fontFamily: 'var(--font-mono)' }}>studentsdata.json</code>: 1,122 self-reported profiles (2017&ndash;2023), 692 with an acceptance and 212 with a rejection. Crowd-sourced; noisy by nature.</li>
            <li><strong>College stats</strong> — <code style={{ fontFamily: 'var(--font-mono)' }}>collegesdata.json</code>: 6,273 institutions, primarily from the U.S. Department of Education <a href="https://collegescorecard.ed.gov/data/" className="ag-link" target="_blank" rel="noreferrer">College Scorecard</a>.</li>
            <li><strong>Academic modeling basis</strong> — Giani &amp; Walling (2020), <a href="https://scholarworks.wmich.edu/jca/vol5/iss1/4/" className="ag-link" target="_blank" rel="noreferrer">Journal of College Access</a>; Lee, Kizilcec &amp; Joachims (2023), <a href="https://arxiv.org/abs/2302.03610" className="ag-link" target="_blank" rel="noreferrer">arXiv:2302.03610</a>.</li>
          </ul>
          <p className="tp-note">
            We deliberately removed earlier citations we could not verify (an &ldquo;AdmitMatch technical
            guide&rdquo;, a &ldquo;College Board placement methodology&rdquo;, and a vague &ldquo;Fan et
            al.&rdquo;). If we can&rsquo;t link it, we don&rsquo;t cite it.
          </p>
        </section>

        <div style={{ marginTop: 56, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary">Try AdmitGPT</Link>
          <Link href="/verify" className="btn btn-secondary">Verify a profile</Link>
          <a href="https://github.com/Zierax/AdmitGPT" className="btn btn-secondary" target="_blank" rel="noreferrer">Read the source</a>
        </div>

        <footer className="ag-footer" style={{ border: 0, padding: '40px 0 0' }}>
          <span className="ag-dim">AdmitGPT · built transparently · {new Date().getFullYear()}</span>
        </footer>
      </main>
    </div>
  );
}

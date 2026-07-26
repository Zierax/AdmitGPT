# Data Sources

AdmitGPT relies on two external datasets for its probability engine and institutional metadata.

## Datasets

| Dataset | Source | URL | Size | Records | Fields |
|---------|--------|-----|------|---------|--------|
| Applicant Profiles | CollegeBase (open dataset; redistributed in-repo) | `https://collegebase.org` — local copy at `public/data/studentsdata.json` | ~5.2 MB | 1,122 | Demographics, SAT/ACT, GPA, extracurriculars, awards, decisions (acceptances/rejections/waitlists) |
| College Metadata | U.S. Dept. of Education College Scorecard (Most-Recent cohort; redistributed in-repo) | `https://collegescorecard.ed.gov/data/` — local copy at `public/data/collegesdata.json` | ~17 MB | 6,273 | Admission rates, SAT quartiles, tuition, demographics, institutional rankings |

## Additional Reference Data

| Source | Purpose | Used In |
|--------|---------|---------|
| [College Scorecard](https://collegescorecard.ed.gov/data/) | Institutional aggregates (admission rates, SAT percentiles) for Z-score calibration | `lib/engine.ts` — Academic Z-score computation |
| [CollegeBase](https://collegebase.org) | Open applicant profiles (historical decisions) used for corpus statistics and peer context | `lib/dataLoader.ts` — dataset loading; `lib/engine.ts` — `computeGpaReference` |

## Data Schema

### Applicant Profile (`applicantProfiles.json`)

| Field Path | Type | Description |
|------------|------|-------------|
| `id` | `number` | Sequential identifier (1–1122) |
| `year` | `number` | Application year (2017–2023) |
| `demographics.gender` | `string` | Gender |
| `demographics.race_ethnicity` | `string` | Race/ethnicity |
| `demographics.intended_major` | `string` | Intended major (free-text) |
| `demographics.residence` | `string` | Geographic region ("USA", "US", or region name) |
| `academics.sat` | `string \| null` | SAT score (string, nullable) |
| `academics.act` | `string \| null` | ACT score (string, nullable) |
| `academics.unweighted_gpa` | `number` | Unweighted GPA as recorded by the source (note: in this corpus the values are not on a standard 4.0 scale; the engine clamps GPA to $[0,4.0]$ before use) |
| `extracurricular_activities` | `array` | `{ title, description }` objects |
| `awards` | `string[]` | Award names |
| `decisions.acceptances` | `string[]` | Schools that accepted the student |
| `decisions.rejections` | `string[]` | Schools that rejected the student |
| `decisions.waitlists` | `string[] \| null` | Schools that waitlisted the student |

### College Metadata (`collegesData.json`)

| Field Path | Type | Description |
|------------|------|-------------|
| `school.name` | `string` | Institution name |
| `admissions.admission_rate.overall` | `number` | Overall admission rate (0.0–1.0) |
| `admissions.sat_scores.average.overall` | `number` | Average SAT score |
| `admissions.sat_scores.25th_percentile.math` | `number` | 25th percentile math SAT |
| `admissions.sat_scores.75th_percentile.math` | `number` | 75th percentile math SAT |
| `admissions.sat_scores.25th_percentile.critical_reading` | `number` | 25th percentile reading SAT |
| `admissions.sat_scores.75th_percentile.critical_reading` | `number` | 75th percentile reading SAT |
| `student.demographics.race_ethnicity.non_resident_alien` | `number` | International student share |

## Data Quality Notes

- **Third-party source**: All applicant data is sourced from CollegeBase's open dataset and was not independently verified by the AdmitGPT authors. It should be treated as a proof-of-concept corpus rather than ground-truth.
- **US-centric**: Primarily US applicants; international profiles are underrepresented.
- **No PII**: All profiles are pseudonymized at source; no names, emails, or identifiers are retained.
- **Tier field absent**: The raw dataset does not include structured tier/scope/rarity fields for extracurriculars — these are added at user-input time, not from the historical dataset.
- **GPA scale**: The raw `unweighted_gpa` values in this corpus are not on a 4.0 scale (observed mean ≈ 11 across 1,043 records with a large spread, mixing 4.0-scale entries with percentage / 10-point / 100-point systems). The engine therefore does NOT z-score against the raw corpus mean/std; instead it bridges each GPA to a clean US-4.0 reference (`computeGpaReference`) built from the corpus's 4.0-plausible records (raw GPA in $[0,4.3]$), with the std floored at $0.5$, and non-4.0 native GPAs are reconciled via `convertToUS4` before z-scoring. This keeps a 2.9 GPA from being silently mapped onto a positive Z.
- **Future work**: A purpose-built, cryptographically-verified dataset with institution-attested outcomes is planned to supersede this corpus.

## License

The datasets are sourced from CollegeBase's open data initiative and are used under their open-access terms. The College Scorecard data is public domain (U.S. government work).

## Sources & Provenance (verified)

Every external source referenced by AdmitGPT is listed below with its verified
public URL. The applicant corpus and the college metadata are redistributed
verbatim in `public/data/` so the engine is fully reproducible offline.

| Source | Type | Verified URL | Notes |
|--------|------|--------------|-------|
| CollegeBase | Open applicant-profile corpus | `https://collegebase.org` | Source of `public/data/studentsdata.json` (1,122 profiles, 2017–2023). Third-party, not independently verified by the authors. |
| College Scorecard | U.S. Dept. of Education institutional aggregates | `https://collegescorecard.ed.gov/data/` | Source of `public/data/collegesdata.json` (6,273 institutions, Most-Recent cohort). Public-domain U.S. government work. |
| AdmitGPT (code & data) | Open-source repository | `https://github.com/Zierax/AdmitGPT` | Engine, calibration scripts, and datasets released here. |
| Giani & Walling (2020) | Peer-reviewed paper | `https://scholarworks.wmich.edu/jca/vol5/iss1/4/` | "Will I Get In? Using Predictive Analytics to Develop Student-Facing Tools to Estimate University Admissions Decisions," *Journal of College Access*, 5(1), Art. 4. |
| Lee, Kizilcec & Joachims (2023) | Preprint | `https://arxiv.org/abs/2302.03610` | "Evaluating a Learned Admission-Prediction Model as a Replacement for Standardized Tests in College Admissions." |

**Provenance of reported metrics.** All AUC / Brier figures and decile-reliability
tables in the documentation are computed by `scripts/evaluate_full.ts` (full
engine, n = 11,685 pairs), `scripts/calibration.ts` (academic-only, n =
11,658 pairs), and `scripts/evaluate_heldout.ts` (5-fold stratified CV with baseline
comparisons) directly against `public/data/studentsdata.json`. The AI Bridge
benchmark (`scripts/ai_bridge_benchmark.ts`) uses synthetic data to demonstrate
the anti-hallucination property. No external or simulated data is used for
the core engine evaluation numbers.


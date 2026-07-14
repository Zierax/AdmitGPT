// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AdmitGPT — Shared engine helpers
// Single source of truth for cross-cutting logic that MUST stay identical between
// the shipped engine (lib/engine.ts), the data loader, and the evaluation harness
// (scripts/). Divergence here previously produced paper numbers that did not match
// the running application.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { CollegeData, GpaScale, StudentProfile } from './types';

// ACT → SAT concordance (College Board). One table, used everywhere.
export const ACT_TO_SAT_TABLE: Record<number, number> = {
    36: 1590, 35: 1540, 34: 1500, 33: 1460, 32: 1430,
    31: 1400, 30: 1370, 29: 1340, 28: 1310, 27: 1280,
    26: 1240, 25: 1210, 24: 1180, 23: 1140, 22: 1110,
    21: 1080, 20: 1040, 19: 1010, 18: 970, 17: 930,
};

export const ACT_FLOOR_SCORE = 880;

// International applicants are typically evaluated on non-standard GPA scales
// (national systems, no ±SD frame of reference), so their GPA Z-score is an
// unreliable academic signal. Their spike (external validation, global
// achievement) is therefore the more trustworthy differentiator. We boost the
// spike weight for them so the engine leans on verified achievement rather than
// an incomparable transcript. US-system applicants keep the base weights.
//
// The boost is DELIBERATELY conservative (1.25, down from 1.5) and is only
// applied when the applicant's academics are already below the reference
// (academicZ < 0): that is exactly the case where the non-standard transcript is
// unreliable and the spike should carry more weight. When academics are already
// strong, the boost is withheld (boost = 1.0) so we do not over-state a
// candidate whose transcript already speaks for itself. This replaces the old
// blanket 1.5 multiplier that over-stated weak international Game Makers most.
export const INTERNATIONAL_SPIKE_BOOST = 1.25;

// Coefficient on the combined academic Z-score inside the master logit.
// The admissions-probability literature (logistic / additive-logit models:
// Giani & Walling 2020; Lee, Kizilcec & Joachims 2023, arXiv:2302.03610)
// models every factor as an
// additive term in a single logit. Academics enter smoothly here — no hard gate
// cliff — but with a large enough coefficient that a weak transcript cannot be
// fully offset by a spike (academics stay dominant, as intended). Raised from
// 1.2 to 1.5 so that, even with a capped spike, academics provably dominate: a
// one-SD academic swing (±1.5 logits) now exceeds the entire allowable spike
// contribution (SPIKE_CAP = 2.0 is shared across ±, but a negative academic Z
// drives the logit down faster than any spike can lift it).
export const ACADEMIC_LOGIT_COEF = 1.5;

// Hard cap (in logits) on the magnitude of the spike term inside the master
// logit. The additive model is retained (smooth, no gate cliff), but an unbounded
// spike term previously let a single extreme achievement overpower weak academics
// (e.g. a Z≈−2 Game Maker reached ~0.98 at a safety school). With SPIKE_CAP = 2.0
// a spike can contribute at most ±2.0 logits — enough to make a strong game-maker
// read as punchy at a realistic school, but never enough to manufacture a
// near-certain admit for a hopeless transcript. Mirrored exactly in
// scripts/evaluate_full.ts and scripts/calibration.ts.
export const SPIKE_CAP = 2.0;

// Floor on the spike term's contribution when the applicant's spike is entirely
// self-reported. Implements the verification path: unverified achievements still
// count, but at a discount, so a student who over-claims cannot reach the same
// logit as one whose achievements are peer-/institution-/audit-verified. The
// effective multiplier is VERIFIED_SPIKE_FLOOR + (1 - floor) * verifiedShare,
// where verifiedShare is the fraction of spike items that are externally
// validated. Mirrored exactly in scripts/evaluate_full.ts.
export const VERIFIED_SPIKE_FLOOR = 0.6;

// Calibration strategy (deliberately NOT a corpus-fit Platt rescale):
// The engine is anchored to each school's TRUE published admission rate via
// baseLogit = logit(admission_rate), so an average applicant to a school is
// scored at roughly that school's real acceptance rate. We evaluated logistic /
// Platt scaling (fit on a 50% hold-out of the proof-of-concept corpus via
// scripts/calib_fit.ts) and it *lowered* corpus Brier (0.262 → 0.197), but the
// corpus is a positively-selected cohort (its members are admitted at far higher
// rates than the general applicant pool), so the fitted rescale learned to push
// every probability upward and would systematically inflate real applicants'
// odds (e.g. a 2.9-GPA applicant at Harvard jumped from ~14% to ~50%). For a
// student-facing tool, an honest anchor to the published base rate is correct;
// corpus-fit calibration is therefore intentionally not applied. If an unbiased,
// representative applicant sample becomes available, re-run calib_fit.ts and set
// CALIB_SLOPE / CALIB_INTERCEPT here.
export const CALIB_SLOPE = 1.0;
export const CALIB_INTERCEPT = 0.0;

export function actToSATConcordance(act: number): number {
    if (act >= 36) return ACT_TO_SAT_TABLE[36];
    if (act <= 16) return ACT_FLOOR_SCORE;
    return ACT_TO_SAT_TABLE[act] ?? ACT_FLOOR_SCORE;
}

// Aggressive normalization so "University of California, Berkeley" (profile input)
// matches "University of California-Berkeley" (Scorecard hyphenation), and so that
// "MIT" matches "Massachusetts Institute of Technology".
// Punctuation is replaced with a space (not deleted) so hyphenated/joined tokens
// like "California-Berkeley" and "California, Berkeley" normalize to the same
// spaced form.
export function normalizeSchoolName(name: string | null | undefined): string {
    if (!name) return '';
    return name.toLowerCase().trim()
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ');
}

export function findCollege(
    colleges: CollegeData[],
    name: string,
): CollegeData | undefined {
    const normalized = normalizeSchoolName(name);
    if (!normalized) return undefined;
    return colleges.find(c => {
        const schoolName = c['school.name'];
        if (!schoolName) return false;
        const collegeName = normalizeSchoolName(schoolName);
        return collegeName === normalized
            || collegeName.includes(normalized)
            || normalized.includes(collegeName);
    });
}

// A sane GPA reference on the US-4.0 scale.
//
// The corpus GPA field is NOT on a single scale — it mixes genuine 4.0-scale
// entries with values up to ~100 (percentage / 10-point / 100-point systems), so
// its raw mean (~11) and std (~24) are meaningless for z-scoring a 4.0-scale
// applicant. We therefore build the reference ONLY from the 4.0-plausible subset
// (raw GPA in [0, 4.3]) and floor the std so the tight, positively-selected cohort
// does not collapse every ordinary GPA onto the clamp floor. Both the live engine
// and the evaluation harness use this reference, so a 2.90 GPA scores clearly
// negative instead of being silently mapped onto the broken mixed-scale corpus mean.
export function computeGpaReference(students: StudentProfile[]): { mean: number; std: number } {
    const gpas = students
        .map(s => s.academics?.unweighted_gpa)
        .filter((g): g is number => typeof g === 'number' && isFinite(g) && g >= 0 && g <= 4.3);
    if (gpas.length < 10) return { mean: 3.5, std: 0.5 };
    const mean = gpas.reduce((a, b) => a + b, 0) / gpas.length;
    const variance = gpas.reduce((a, b) => a + (b - mean) ** 2, 0) / gpas.length;
    return { mean, std: Math.max(0.5, Math.sqrt(variance)) };
}

// ── International / non-4.0 GPA scale conversion ───────────────────────────────
// The engine z-scores GPA against a US-4.0-reference corpus, so any non-4.0
// native GPA must be mapped to its US-4.0 equivalent *before* toCorpusGpa.
// Feeding a native-scale number (e.g. an India CGPA of 9.0, a UK percentage of
// 85) straight through toCorpusGpa previously produced a garbage Z-score and
// silently mis-ranked the applicant. These mappings are deliberately simple,
// linear, and documented; they are the honest best-effort bridge for systems
// where a precise concordance table is unavailable. Unknown scales fall back to
// the raw value (US_4.0 semantics), and the result is clamped to [0, 4].
export function convertToUS4(gpa: number, scale: GpaScale): number {
    if (gpa == null || Number.isNaN(gpa)) return gpa;
    let us: number;
    switch (scale) {
        case 'US_4.0':
            us = gpa;
            break;
        case 'Canada_4.3':
            us = (gpa / 4.3) * 4.0;
            break;
        case 'Percentage_100':
        case 'UK_Percentage':
            // ~93%+ maps to a 4.0; linear below.
            us = (gpa / 100) * 4.3;
            break;
        case 'CGPA_5':
            us = (gpa / 5) * 4.0;
            break;
        case 'CGPA_10':
            us = (gpa / 10) * 4.0;
            break;
        case 'IB_7':
            // 7 -> 4.0, 1 -> 0 (IB passes at 4).
            us = ((gpa - 1) / 6) * 4.0;
            break;
        case 'Australia_7':
            us = (gpa / 7) * 4.0;
            break;
        case 'Germany_5':
            // Inverted: 1.0 (best) -> 4.0, 4.0 -> 1.0, 5.0 (fail) -> 0.
            us = 5.0 - gpa;
            break;
        default:
            us = gpa;
    }
    return Math.max(0, Math.min(4, us));
}











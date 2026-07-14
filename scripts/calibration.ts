// AdmitGPT — Calibration Metrics Computation
// Loads student/college data and computes AUC + Brier score for the engine.

import * as fs from 'fs';
import * as path from 'path';
import { actToSATConcordance as actToSAT, findCollege, computeGpaReference, ACADEMIC_LOGIT_COEF, SPIKE_CAP, CALIB_SLOPE, CALIB_INTERCEPT } from '../lib/shared';

// ── Load data ──
const studentsRaw = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../public/data/studentsdata.json'), 'utf-8')
);
const collegesRaw = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../public/data/collegesdata.json'), 'utf-8')
);

// ── Sigmoid ──
function sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
}

// ── Compute dataset stats ──
const gpas: number[] = [];
const sats: number[] = [];

for (const s of studentsRaw) {
    if (s.academics?.unweighted_gpa) gpas.push(s.academics.unweighted_gpa);
    const satNum = parseInt(s.academics?.sat, 10);
    if (!isNaN(satNum)) sats.push(satNum);
    else if (s.academics?.act) {
        const actNum = parseInt(s.academics.act, 10);
        const satEquiv = actToSAT(actNum);
        if (satEquiv) sats.push(satEquiv);
    }
}

const gpaMean = gpas.reduce((a, b) => a + b, 0) / gpas.length;
const gpaStd = Math.sqrt(gpas.reduce((a, b) => a + (b - gpaMean) ** 2, 0) / gpas.length);
const gpaMax = gpas.length ? Math.max(...gpas) : 20;
const gpaRef = computeGpaReference(studentsRaw);
const satMean = sats.reduce((a, b) => a + b, 0) / sats.length;
const satStd = Math.sqrt(sats.reduce((a, b) => a + (b - satMean) ** 2, 0) / gpas.length);

console.log(`Dataset: ${studentsRaw.length} profiles, ${gpas.length} GPA, ${sats.length} SAT`);
console.log(`GPA (raw corpus): μ=${gpaMean.toFixed(3)}, σ=${gpaStd.toFixed(3)}  | 4.0 reference: μ=${gpaRef.mean.toFixed(3)}, σ=${gpaRef.std.toFixed(3)}`);
console.log(`SAT: μ=${satMean.toFixed(1)}, σ=${satStd.toFixed(1)}`);

// ── Compute Z-scores and probability for a student-school pair ──
function computePrediction(student: any, collegeName: string): number | null {
    const college = findCollege(collegesRaw, collegeName);
    if (!college) return null;

    const admissionRate = college['admissions.admission_rate.overall'];
    if (!admissionRate || admissionRate <= 0 || admissionRate >= 1) return null;

    // SAT Z-score
    let userSAT: number | null = null;
    const satStr = student.academics?.sat;
    if (satStr) {
        userSAT = parseInt(satStr, 10);
        if (isNaN(userSAT)) userSAT = null;
    }
    if (userSAT === null && student.academics?.act) {
        const actNum = parseInt(student.academics.act, 10);
        userSAT = actToSAT(actNum) ?? null;
    }

    const userGPA = student.academics?.unweighted_gpa;

    // SAT Z
    let satZ = 0;
    if (userSAT) {
        const collegeSATAvg = college['admissions.sat_scores.average.overall'] ?? (
            (college['admissions.sat_scores.25th_percentile.math'] ?? 0) +
            (college['admissions.sat_scores.75th_percentile.math'] ?? 0)
        );
        if (collegeSATAvg) {
            const sat25 = (college['admissions.sat_scores.25th_percentile.math'] ?? 0) +
                (college['admissions.sat_scores.25th_percentile.critical_reading'] ?? 0);
            const sat75 = (college['admissions.sat_scores.75th_percentile.math'] ?? 0) +
                (college['admissions.sat_scores.75th_percentile.critical_reading'] ?? 0);
            const iqr = sat75 - sat25;
            const stdEst = iqr > 0 ? iqr / 1.35 : 100;
            satZ = (userSAT - collegeSATAvg) / stdEst;
        }
    }

    // GPA Z — must use the SAME clean US-4.0 reference as the engine/eval
    // (computeGpaReference) and the same 4.0 conversion of the corpus GPA, so the
    // academic-only baseline is a fair comparator against the full engine.
    let gpaZ = 0;
    if (userGPA != null) {
        const gpaCeil = gpaMax != null ? Math.max(5, Math.min(gpaMax, 20)) : 20;
        const gpa4 = (userGPA <= 4.3) ? userGPA : (gpaCeil > 5 ? (userGPA / gpaCeil) * 4.0 : userGPA);
        gpaZ = (gpa4 - gpaRef.mean) / gpaRef.std;
    }

    // Combined academic Z
    let academicZ: number;
    if (!userSAT && userGPA) {
        academicZ = gpaZ - 0.2;
    } else if (userSAT) {
        academicZ = satZ * 0.55 + gpaZ * 0.45;
    } else {
        return null;
    }

    academicZ = Math.max(-4, Math.min(4, academicZ));

    // ── Academic-only comparator, mirroring the shipped additive-logit engine ──
    // (lib/engine.ts master formula) but with the spike term OMITTED: this script
    // measures how much discrimination the academics alone contribute, against the
    // same baseLogit anchor and (capped, here zero) spike convention as the live
    // engine. It no longer encodes the superseded multiplicative gate×impact, so
    // the reported AUC/Brier are comparable to scripts/evaluate_full.ts.
    const baseLogit = Math.log(admissionRate / (1 - admissionRate));
    const academicTerm = ACADEMIC_LOGIT_COEF * academicZ;
    // No spike data in this dataset; spike term is 0 (within the ±SPIKE_CAP bound).
    const spikeTerm = 0;
    const combinedLogit = baseLogit + academicTerm + spikeTerm;
    const calibratedLogit = CALIB_SLOPE * combinedLogit + CALIB_INTERCEPT;
    const p = Math.max(0.01, Math.min(0.99, sigmoid(calibratedLogit)));
    return p;
}

// ── Evaluate all student-school pairs ──
let totalPairs = 0;
let validPairs = 0;
const predictions: { predicted: number; actual: number }[] = [];

for (const student of studentsRaw) {
    const accepted = (student.decisions?.acceptances ?? []).filter(Boolean);
    const rejected = (student.decisions?.rejections ?? []).filter(Boolean);

    // Positive examples: accepted schools
    for (const school of accepted) {
        totalPairs++;
        const pred = computePrediction(student, school);
        if (pred !== null) {
            predictions.push({ predicted: pred, actual: 1 });
            validPairs++;
        }
    }

    // Negative examples: rejected schools
    for (const school of rejected) {
        totalPairs++;
        const pred = computePrediction(student, school);
        if (pred !== null) {
            predictions.push({ predicted: pred, actual: 0 });
            validPairs++;
        }
    }
}

console.log(`\nTotal student-school pairs: ${totalPairs}`);
console.log(`Valid (college found in dataset): ${validPairs}`);
console.log(`Positive (accepted): ${predictions.filter(p => p.actual === 1).length}`);
console.log(`Negative (rejected): ${predictions.filter(p => p.actual === 0).length}`);

// ── Brier Score ──
const brier = predictions.reduce((sum, p) => sum + (p.predicted - p.actual) ** 2, 0) / predictions.length;
console.log(`\nBrier Score: ${brier.toFixed(4)}`);

// ── AUC (trapezoidal) ──
function computeAUC(preds: { predicted: number; actual: number }[]): number {
    const sorted = [...preds].sort((a, b) => a.predicted - b.predicted);
    const nPos = sorted.filter(p => p.actual === 1).length;
    const nNeg = sorted.filter(p => p.actual === 0).length;

    if (nPos === 0 || nNeg === 0) return 0.5;

    let sumRanksPos = 0;
    let i = 0;
    while (i < sorted.length) {
        let j = i;
        const pred = sorted[i].predicted;
        while (j < sorted.length && sorted[j].predicted === pred) j++;
        const avgRank = (i + j - 1) / 2 + 1;
        for (let k = i; k < j; k++) if (sorted[k].actual === 1) sumRanksPos += avgRank;
        i = j;
    }
    const u = sumRanksPos - (nPos * (nPos + 1)) / 2;
    return u / (nPos * nNeg);
}

const auc = computeAUC(predictions);
console.log(`AUC-ROC: ${auc.toFixed(4)}`);

// ── Calibration by decile ──
const sorted = [...predictions].sort((a, b) => a.predicted - b.predicted);
const decileSize = Math.floor(sorted.length / 10);
console.log('\nCalibration by decile:');
console.log('Decile | Avg Predicted | Observed Rate | Count');
for (let i = 0; i < 10; i++) {
    const start = i * decileSize;
    const end = i === 9 ? sorted.length : start + decileSize;
    const decile = sorted.slice(start, end);
    const avgPred = decile.reduce((s, p) => s + p.predicted, 0) / decile.length;
    const obsRate = decile.filter(p => p.actual === 1).length / decile.length;
    console.log(`  ${String(i + 1).padStart(2)}     | ${avgPred.toFixed(4)}      | ${obsRate.toFixed(4)}        | ${decile.length}`);
}

// ── Summary statistics ──
const acceptedSchools = new Set<string>();
const rejectedSchools = new Set<string>();
for (const s of studentsRaw) {
    for (const a of (s.decisions?.acceptances ?? [])) acceptedSchools.add(a);
    for (const r of (s.decisions?.rejections ?? [])) rejectedSchools.add(r);
}
console.log(`\nUnique schools in acceptances: ${acceptedSchools.size}`);
console.log(`Unique schools in rejections: ${rejectedSchools.size}`);

// Year distribution
const years: Record<number, number> = {};
for (const s of studentsRaw) {
    years[s.year] = (years[s.year] || 0) + 1;
}
console.log('Year distribution:', years);

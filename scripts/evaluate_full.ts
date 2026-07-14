// AdmitGPT — Full-Engine Evaluation (fast, faithful)
// Derives spike features from the corpus's free-text extracurricular/award
// descriptions using keyword heuristics (the same class of rules the engine
// applies when a user fills in the rubric at input time), then evaluates the
// engine END-TO-END and measures AUC / Brier against observed outcomes.
//
// Fidelity note: this reuses the EXPORTED computeSpikeScore and replicates the
// gate/impact/master-formula from lib/engine.ts exactly (academic Z = 0.55*satZ
// + 0.45*gpaZ, test-optional -0.2, regional normalisation, protocol weights,
// major/intl modifiers, [0,0.8] impact clamp, gate*impact, GAME_MAKER bands).
// The only engine path NOT exercised is computeConfidence (it only sets the
// uncertainty range, never the point estimate) which is pre-empted here for
// speed by precomputing the major modifier per (school, major).

import * as fs from 'fs';
import * as path from 'path';
import { computeSpikeScore } from '../lib/engine';
import { classifyMajor } from '../lib/dataLoader';
import { actToSATConcordance as actToSAT, normalizeSchoolName, findCollege, computeGpaReference, INTERNATIONAL_SPIKE_BOOST, ACADEMIC_LOGIT_COEF, SPIKE_CAP, VERIFIED_SPIKE_FLOOR, CALIB_SLOPE, CALIB_INTERCEPT } from '../lib/shared';
import {
    StudentProfile, CollegeData, UserProfile, UserEC, UserAward, DatasetStats,
    ActivityCategory, ECTier, TierLevel, RarityLevel, InstitutionalStrength,
    CognitiveLoad, ExternalValidation, MajorCategory,
} from '../lib/types';

// ── Load data ──
const studentsRaw = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../public/data/studentsdata.json'), 'utf-8'),
) as StudentProfile[];
const collegesRaw = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../public/data/collegesdata.json'), 'utf-8'),
) as CollegeData[];

// ── Dataset stats (GPA mean/std for Z-score) ──
const gpas: number[] = [];
for (const s of studentsRaw) {
    if (s.academics?.unweighted_gpa != null) gpas.push(s.academics.unweighted_gpa);
}
const gpaMean = gpas.reduce((a, b) => a + b, 0) / gpas.length;
const gpaStd = Math.sqrt(gpas.reduce((a, b) => a + (b - gpaMean) ** 2, 0) / gpas.length);
const stats: DatasetStats = {
    gpa: { mean: gpaMean, std: gpaStd, min: Math.min(...gpas), max: Math.max(...gpas) },
    sat: { mean: 0, std: 0, min: 0, max: 0 },
    totalProfiles: studentsRaw.length, profilesWithDecisions: 0, yearRange: { min: 0, max: 0 }, schoolCounts: {},
};

// ── Free-text → 6-factor rubric classifier ──
const lc = (s: string | null | undefined) => (s ?? '').toLowerCase();

function classifyCategory(text: string): ActivityCategory {
    const t = lc(text);
    if (/research|science|scientist|physics|chemistry|biology|lab|experiment/.test(t)) return 'STEM_Research';
    if (/math|mathematic|olympiad|amc|putnam/.test(t)) return 'Mathematics';
    if (/engineer|robot|cod|program|hack|tech/.test(t)) return 'Engineering';
    if (/computer|software|app|algorithm|ai|ml|data/.test(t)) return 'Computer_Science';
    if (/business|entrepreneur|startup|finance|economics|invest|market/.test(t)) return 'Business_Entrepreneurship';
    if (/art|paint|draw|design|film|photograph|creative|theatre|theater|drama/.test(t)) return 'Arts_Creative';
    if (/music|piano|violin|sing|band|orchestra|choir|guitar/.test(t)) return 'Music_Performing';
    if (/sport|athlet|soccer|football|basketball|swim|track|tennis|run|cross country|wrestl/.test(t)) return 'Athletics';
    if (/volunteer|community|service|charity|nonprofit|ngo|help/.test(t)) return 'Community_Service';
    if (/leader|president|govern|mayor|policy|model un|mun|debate/.test(t)) return 'Leadership_Government';
    if (/write|journal|news|press|publish|author|essay|blog/.test(t)) return 'Writing_Journalism';
    if (/debate|mun|model united/.test(t)) return 'Debate_MUN';
    if (/medic|health|nurs|clinic|hospital|pre-med|premed|doctor/.test(t)) return 'Medicine_Health';
    if (/environment|climate|sustain|green|conserv/.test(t)) return 'Environmental';
    if (/culture|heritage|language|dance|tradition|ethnic/.test(t)) return 'Cultural';
    return 'Other';
}
function classifyTier(text: string): ECTier {
    const t = lc(text);
    if (/time\s*100|olympic medal|nobel|fields medal|forbes|white house|isef grand/.test(t)) return -1;
    if (/ieee|nature paper|nature|defcon|black hat|cve|patent|startup acquisition|grand prize/.test(t)) return 0;
    if (/publish|ieee|acm|conference paper|research.*journal|founded.*org|501c|olympiad|international.*competition|national.*award|national.*winner|open source.*star|patent/.test(t)) return 1;
    if (/president|captain|regional|state.*winner|state.*award|intern|editor.*chief|founder|head|director/.test(t)) return 2;
    return 3;
}
function classifyTierLevel(text: string): TierLevel {
    const t = lc(text);
    if (/world|global|olympiad|once in a lifetime/.test(t)) return 'Global_Elite';
    if (/international/.test(t)) return 'International';
    if (/national|country|federal/.test(t)) return 'National';
    return 'Local';
}
function classifyRarity(text: string): RarityLevel {
    const t = lc(text);
    if (/unique|one of a kind|only|0\.01|0\.1%|first ever/.test(t)) return 'Unique';
    if (/ultra|world|global|international|olympiad|national|rare/.test(t)) return 'Rare';
    return 'Common';
}
function classifyStrength(text: string): InstitutionalStrength {
    const t = lc(text);
    if (/nobel|nature|published|patent|ieee|olympiad|national academy|mit|harvard|stanford|google|microsoft|nasa/.test(t)) return 'World_Class';
    if (/university|college|school|state|national|institute|academy|company|corp|lab/.test(t)) return 'Recognized';
    return 'Standard';
}
function classifyLoad(text: string): CognitiveLoad {
    const t = lc(text);
    if (/research|published|thesis|paper|olympiad|dissertation/.test(t)) return 'Research_Level';
    if (/advanced|competition|founder|lead|complex|analy|engineer/.test(t)) return 'High';
    return 'Medium';
}
function classifyValidation(text: string): ExternalValidation {
    const t = lc(text);
    if (/verified|audit|official|institutional|school|university|college|national|state|certified/.test(t)) return 'Institutional';
    if (/peer|vouched|recommend|review/.test(t)) return 'Peer_Vouched';
    return 'Self_Reported';
}
function deriveEC(ec: { title: string | null; description: string | null }): UserEC {
    const title = ec.title ?? '';
    const text = `${title} ${ec.description ?? ''}`;
    return {
        title, description: ec.description ?? '', tier: classifyTier(text),
        category: classifyCategory(text), tierLevel: classifyTierLevel(text),
        rarity: classifyRarity(text), institutionalStrength: classifyStrength(text),
        cognitiveLoad: classifyLoad(text), externalValidation: classifyValidation(text), confidence: 85,
    };
}
function deriveAward(award: string | null): UserAward {
    const a = award ?? '';
    return {
        title: a, description: '', tier: classifyTier(a),
        category: classifyCategory(a), tierLevel: classifyTierLevel(a),
        rarity: classifyRarity(a), institutionalStrength: classifyStrength(a),
        cognitiveLoad: classifyLoad(a), externalValidation: classifyValidation(a), confidence: 85,
    };
}

// ── Build UserProfile per student (memoised) ──
const profileCache = new Map<number, { profile: UserProfile; spike: number; gm: number; out: number; gpaZbase: number }>();
function buildProfile(s: StudentProfile) {
    const cached = profileCache.get(s.id);
    if (cached) return cached;
    const rawGpa = s.academics?.unweighted_gpa;
    // Scale-aware conversion to the engine's native US-4.0 space: genuine 4.0-scale
    // records (raw ≤ 4.3) are passed through unchanged, while higher raw values are
    // treated as sitting on a 0–gpaCeil scale and linearly mapped to 4.0. This keeps
    // the eval in lockstep with lib/engine.ts, whose GPA z is taken against a clean
    // 4.0 reference (computeGpaReference) built from those same 4.0-plausible records.
    const gpaCeil = stats.gpa.max != null ? Math.max(5, Math.min(stats.gpa.max, 20)) : 20;
    const gpa4 = (rawGpa != null)
        ? (rawGpa <= 4.3 ? rawGpa : (gpaCeil > 5 ? (rawGpa / gpaCeil) * 4.0 : rawGpa))
        : null;
    const profile: UserProfile = {
        name: '', isInternational: !!s.demographics?.isInternational,
        schoolSystem: s.demographics?.schoolSystem ?? 'US_Standard',
        intendedMajor: s.demographics?.intended_major ?? '',
        majorCategory: classifyMajor(s.demographics?.intended_major ?? ''),
        state: '', gender: s.demographics?.gender ?? '',
        sat: s.academics?.sat ? parseInt(s.academics.sat, 10) : null,
        act: s.academics?.act ? parseInt(s.academics.act, 10) : null,
        preferredTestType: s.academics?.sat ? 'SAT' : (s.academics?.act ? 'ACT' : 'None'),
        unweightedGPA: gpa4 ?? null,
        weightedGPA: s.academics?.weighted_gpa ?? null,
        numberOfAPCourses: s.academics?.number_of_ap_courses ?? 0,
        numberOfIBCourses: s.academics?.number_of_ib_courses ?? 0,
        numberOfHonorsCourses: s.academics?.number_of_honors_courses ?? 0,
        extracurriculars: (s.extracurricular_activities ?? []).filter(e => e && e.title).map(deriveEC),
        awards: (s.awards ?? []).filter(Boolean).map(deriveAward),
        targetSchools: [], targetColleges: [],
    };
    const spike = computeSpikeScore(profile.extracurriculars, profile.awards);
    let gm = 0, out = 0;
    for (const it of [...profile.extracurriculars, ...profile.awards]) {
        if (it.tier === -1) gm++; else if (it.tier === 0) out++;
    }
    // gpaZbase mirrors the engine's path: z against a clean US-4.0 reference
    // (computeGpaReference) built from the corpus's 4.0-plausible records — not the
    // raw mixed-scale corpus mean, which previously mapped low GPAs onto positive Z.
    const gpaRef = computeGpaReference(studentsRaw);
    const gpaZbase = (gpa4 != null) ? (gpa4 - gpaRef.mean) / gpaRef.std : 0;
    const rec = { profile, spike, gm, out, gpaZbase };
    profileCache.set(s.id, rec);
    return rec;
}

// ── Precompute major modifier per (school, major) ──
const majorModCache = new Map<string, number>();
function precomputeMajorMod() {
    const bySchool = new Map<string, StudentProfile[]>();
    for (const s of studentsRaw) {
        const schools = new Set<string>(
            [...(s.decisions?.acceptances ?? []), ...(s.decisions?.rejections ?? [])].filter(Boolean) as string[],
        );
        for (const sc of schools) {
            const n = normalizeSchoolName(sc);
            if (!bySchool.has(n)) bySchool.set(n, []);
            bySchool.get(n)!.push(s);
        }
    }
    for (const [schoolNorm, applicants] of bySchool) {
        if (applicants.length < 3) continue;
        const overallAcc = applicants.filter(s =>
            (s.decisions?.acceptances ?? []).some(a => normalizeSchoolName(a) === schoolNorm)).length;
        const overallRate = overallAcc / applicants.length;
        if (overallRate === 0) continue;
        const majorMap = new Map<MajorCategory, { n: number; acc: number }>();
        for (const s of applicants) {
            const mc = classifyMajor(s.demographics?.intended_major ?? '');
            if (!majorMap.has(mc)) majorMap.set(mc, { n: 0, acc: 0 });
            const e = majorMap.get(mc)!;
            e.n++;
            if ((s.decisions?.acceptances ?? []).some(a => normalizeSchoolName(a) === schoolNorm)) e.acc++;
        }
        for (const [mc, v] of majorMap) {
            if (v.n < 2) { majorModCache.set(`${schoolNorm}|${mc}`, 1.0); continue; }
            const majorRate = v.acc / v.n;
            const mod = Math.max(0.5, Math.min(1.5, majorRate / overallRate));
            majorModCache.set(`${schoolNorm}|${mc}`, (mod - 1) * 0.5);
        }
    }
}
function getMajorMod(schoolNorm: string, mc: MajorCategory): number {
    const v = majorModCache.get(`${schoolNorm}|${mc}`);
    return v ?? 0.0;
}

// ── Faithful replica of engine gate/impact/master formula ──
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
function computeSATZ(userSAT: number, college: CollegeData): number | null {
    const sat25Math = college['admissions.sat_scores.25th_percentile.math'];
    const sat75Math = college['admissions.sat_scores.75th_percentile.math'];
    const sat25Read = college['admissions.sat_scores.25th_percentile.critical_reading'];
    const sat75Read = college['admissions.sat_scores.75th_percentile.critical_reading'];
    const satAvg = college['admissions.sat_scores.average.overall'];
    const collegeSATAvg: number | null =
        satAvg != null ? satAvg : (sat25Math != null && sat75Math != null ? sat25Math + sat75Math : null);
    // No college SAT data → cannot place the applicant; return null so the caller
    // falls back to a GPA-only academic Z (with a small penalty) rather than
    // silently treating a missing score as exactly average.
    if (!collegeSATAvg) return null;
    const sat25Total = (sat25Math != null && sat25Read != null) ? sat25Math + sat25Read : collegeSATAvg - 100;
    const sat75Total = (sat75Math != null && sat75Read != null) ? sat75Math + sat75Read : collegeSATAvg + 100;
    const iqr = sat75Total - sat25Total;
    const stdEst = iqr > 0 ? iqr / 1.35 : 100;
    return (userSAT - collegeSATAvg) / stdEst;
}
function pointEstimate(rec: { profile: UserProfile; spike: number; gm: number; out: number; gpaZbase: number }, college: CollegeData): number | null {
    const rate = college['admissions.admission_rate.overall'];
    if (!rate || rate <= 0 || rate >= 1) return null;
    const p = rec.profile;
    let userSAT: number | null = null;
    if (p.sat != null) userSAT = p.sat;
    else if (p.act != null) userSAT = actToSAT(p.act);
    const gpaZ = rec.gpaZbase;
    const gpaZnorm = (p.isInternational && p.schoolSystem === 'National_Non_Standard')
        ? (rec.gm >= 1 ? 2.0 : (gpaZ < 0 ? gpaZ + 0.4 : gpaZ)) : gpaZ;
    const satZ = userSAT != null ? computeSATZ(userSAT, college) : null;
    let az: number;
    if (satZ === null) az = gpaZnorm - 0.2;
    else az = satZ * 0.55 + gpaZnorm * 0.45;
    az = Math.max(-4, Math.min(4, az));
    let spikeWeight: number;
    // International boost is conservative (1.25) and applied ONLY when academics
    // are weak (az < 0) — mirroring lib/engine.ts determineProtocol. Withheld
    // otherwise so strong international transcripts aren't over-stated.
    const intlBoost = (p.isInternational && az < 0) ? INTERNATIONAL_SPIKE_BOOST : 1;
    if (rec.gm >= 1) { spikeWeight = 0.175 * intlBoost; }
    else if (rec.out >= 1) { spikeWeight = 0.14 * intlBoost; }
    else { spikeWeight = 0.11 * intlBoost; }
    const schoolNorm = normalizeSchoolName(college['school.name']);
    const majorMod = getMajorMod(schoolNorm, p.majorCategory);
    const alienRate = college['student.demographics.race_ethnicity.non_resident_alien'];
    const intlMod = !p.isInternational ? 0 : (alienRate ? (alienRate / 0.10) * 0.1 - 0.3 : -0.2);
    const baseLogit = Math.log(rate / (1 - rate));
    // Additive logit (single logistic model), matching lib/engine.ts exactly. The
    // academic Z enters as a smooth logit term (no hard gate cliff), so the point
    // estimate is calibrated across the full [0,1] range with a real gradient at
    // the low end. The spike term is capped at ±SPIKE_CAP (shared.ts) so a single
    // extreme achievement cannot overpower weak academics.
    const academicTerm = ACADEMIC_LOGIT_COEF * az;
    // Verification path (mirrors lib/engine.ts): discount an all-self-reported
    // spike to VERIFIED_SPIKE_FLOOR of its weight; externally verified items lift
    // it back toward 1.0. Free-text-derived eval items are self-reported by
    // default, so this is the honest discount for unverified heuristic spikes.
    const verifiedItems =
        p.extracurriculars.filter(e => e.externalValidation !== 'Self_Reported').length +
        p.awards.filter(a => a.externalValidation !== 'Self_Reported').length;
    const totalItems = p.extracurriculars.length + p.awards.length;
    const verifiedShare = totalItems === 0 ? 1 : verifiedItems / totalItems;
    const verifiedMult = VERIFIED_SPIKE_FLOOR + (1 - VERIFIED_SPIKE_FLOOR) * verifiedShare;
    let spikeTerm = rec.spike * spikeWeight * verifiedMult;
    spikeTerm = Math.max(-SPIKE_CAP, Math.min(SPIKE_CAP, spikeTerm));
    const combinedLogit = baseLogit + academicTerm + spikeTerm + majorMod + intlMod;
    const calibratedLogit = CALIB_SLOPE * combinedLogit + CALIB_INTERCEPT;
    let pe = sigmoid(calibratedLogit);
    pe = Math.max(0.01, Math.min(0.99, pe));
    return pe;
}

// ── Evaluate pairs ──
precomputeMajorMod();
let totalPairs = 0, validPairs = 0;
const fullPreds: { predicted: number; actual: number }[] = [];

for (const s of studentsRaw) {
    const rec = buildProfile(s);
    const accepted = ((s.decisions?.acceptances ?? []).filter(Boolean) as string[]);
    const rejected = ((s.decisions?.rejections ?? []).filter(Boolean) as string[]);
    for (const school of [...accepted, ...rejected]) {
        totalPairs++;
        const college = findCollege(collegesRaw, school);
        if (!college) continue;
        const pe = pointEstimate(rec, college);
        if (pe == null) continue;
        fullPreds.push({ predicted: pe, actual: accepted.includes(school) ? 1 : 0 });
        validPairs++;
    }
}

function brier(preds: { predicted: number; actual: number }[]) {
    return preds.reduce((sum, p) => sum + (p.predicted - p.actual) ** 2, 0) / preds.length;
}
function auc(preds: { predicted: number; actual: number }[]) {
    const nPos = preds.filter(p => p.actual === 1).length;
    const nNeg = preds.length - nPos;
    if (nPos === 0 || nNeg === 0) return 0.5;
    const sorted = [...preds].sort((a, b) => a.predicted - b.predicted);
    let sumRanksPos = 0;
    let i = 0;
    while (i < sorted.length) {
        let j = i;
        const pred = sorted[i].predicted;
        while (j < sorted.length && sorted[j].predicted === pred) j++;
        const avgRank = (i + j - 1) / 2 + 1; // 1-based average rank over the tie group
        for (let k = i; k < j; k++) if (sorted[k].actual === 1) sumRanksPos += avgRank;
        i = j;
    }
    const u = sumRanksPos - (nPos * (nPos + 1)) / 2;
    return u / (nPos * nNeg);
}
function deciles(preds: { predicted: number; actual: number }[]) {
    const sorted = [...preds].sort((a, b) => a.predicted - b.predicted);
    const size = Math.floor(sorted.length / 10);
    const rows: string[] = [];
    for (let i = 0; i < 10; i++) {
        const start = i * size, end = i === 9 ? sorted.length : start + size;
        const d = sorted.slice(start, end);
        const avg = d.reduce((s, p) => s + p.predicted, 0) / d.length;
        const obs = d.filter(p => p.actual === 1).length / d.length;
        rows.push(`  ${String(i + 1).padStart(2)} | ${avg.toFixed(3)} | ${obs.toFixed(3)} | ${d.length}`);
    }
    return rows.join('\n');
}

console.log(`Dataset: ${studentsRaw.length} profiles, GPA mu=${gpaMean.toFixed(2)} sigma=${gpaStd.toFixed(2)}`);
console.log(`Total pairs: ${totalPairs}, valid (college found): ${validPairs}`);
console.log(`\n=== FULL ENGINE (spike derived from free text) ===`);
console.log(`Brier: ${brier(fullPreds).toFixed(4)}  AUC-ROC: ${auc(fullPreds).toFixed(4)}`);
console.log('Decile | AvgPred | Observed | Count');
console.log(deciles(fullPreds));

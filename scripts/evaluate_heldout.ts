// AdmitGPT — Held-Out Evaluation with Baseline Comparisons
// 5-fold stratified cross-validation comparing AdmitGPT engine vs academic-only,
// logistic regression, random forest, and majority class baselines.

import * as fs from 'fs';
import * as path from 'path';
import { computeSpikeScore } from '../lib/engine';
import { classifyMajor } from '../lib/dataLoader';
import { actToSATConcordance as actToSAT, normalizeSchoolName, findCollege, computeGpaReference, INTERNATIONAL_SPIKE_BOOST, ACADEMIC_LOGIT_COEF, SPIKE_CAP, VERIFIED_SPIKE_FLOOR, CALIB_SLOPE, CALIB_INTERCEPT } from '../lib/shared';
import { StudentProfile, CollegeData, UserProfile, UserEC, UserAward, DatasetStats, ActivityCategory, ECTier, TierLevel, RarityLevel, InstitutionalStrength, CognitiveLoad, ExternalValidation, MajorCategory } from '../lib/types';

// ── Seeded RNG ──
let _seed = 42;
function rng() { _seed = (_seed * 1103515245 + 12345) & 0x7fffffff; return _seed / 0x7fffffff; }

// ── Load data ──
const studentsRaw = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/studentsdata.json'), 'utf-8')) as StudentProfile[];
const collegesRaw = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/collegesdata.json'), 'utf-8')) as CollegeData[];

const gpas: number[] = [];
for (const s of studentsRaw) if (s.academics?.unweighted_gpa != null) gpas.push(s.academics.unweighted_gpa);
const gpaMean = gpas.reduce((a, b) => a + b, 0) / gpas.length;
const gpaStd = Math.sqrt(gpas.reduce((a, b) => a + (b - gpaMean) ** 2, 0) / gpas.length);
const gpaRef = computeGpaReference(studentsRaw);
const gpaMax = gpas.length ? Math.max(...gpas) : 20;

// ── Free-text classifiers (same as evaluate_full.ts) ──
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
  if (/sport|athlet|soccer|football|basketball|swim|track|tennis|run|wrestl/.test(t)) return 'Athletics';
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
function classifyTierLevel(text: string): TierLevel { const t = lc(text); if (/world|global|olympiad|once in a lifetime/.test(t)) return 'Global_Elite'; if (/international/.test(t)) return 'International'; if (/national|country|federal/.test(t)) return 'National'; return 'Local'; }
function classifyRarity(text: string): RarityLevel { const t = lc(text); if (/unique|one of a kind|only|0\.01|0\.1%|first ever/.test(t)) return 'Unique'; if (/ultra|world|global|international|olympiad|national|rare/.test(t)) return 'Rare'; return 'Common'; }
function classifyStrength(text: string): InstitutionalStrength { const t = lc(text); if (/nobel|nature|published|patent|ieee|olympiad|national academy|mit|harvard|stanford|google|microsoft|nasa/.test(t)) return 'World_Class'; if (/university|college|school|state|national|institute|academy|company|corp|lab/.test(t)) return 'Recognized'; return 'Standard'; }
function classifyLoad(text: string): CognitiveLoad { const t = lc(text); if (/research|published|thesis|paper|olympiad|dissertation/.test(t)) return 'Research_Level'; if (/advanced|competition|founder|lead|complex|analy|engineer/.test(t)) return 'High'; return 'Medium'; }
function classifyValidation(text: string): ExternalValidation { const t = lc(text); if (/verified|audit|official|institutional|school|university|college|national|state|certified/.test(t)) return 'Institutional'; if (/peer|vouched|recommend|review/.test(t)) return 'Peer_Vouched'; return 'Self_Reported'; }
function deriveEC(ec: { title: string | null; description: string | null }): UserEC { const title = ec.title ?? ''; const text = `${title} ${ec.description ?? ''}`; return { title, description: ec.description ?? '', tier: classifyTier(text), category: classifyCategory(text), tierLevel: classifyTierLevel(text), rarity: classifyRarity(text), institutionalStrength: classifyStrength(text), cognitiveLoad: classifyLoad(text), externalValidation: classifyValidation(text), confidence: 85 }; }
function deriveAward(award: string | null): UserAward { const a = award ?? ''; return { title: a, description: '', tier: classifyTier(a), category: classifyCategory(a), tierLevel: classifyTierLevel(a), rarity: classifyRarity(a), institutionalStrength: classifyStrength(a), cognitiveLoad: classifyLoad(a), externalValidation: classifyValidation(a), confidence: 85 }; }

// ── Build UserProfile per student (memoised) ──
const profileCache = new Map<number, { profile: UserProfile; spike: number; gm: number; out: number; gpaZbase: number }>();
function buildProfile(s: StudentProfile) {
  const cached = profileCache.get(s.id);
  if (cached) return cached;
  const rawGpa = s.academics?.unweighted_gpa;
  const gpaCeil = gpaMax != null ? Math.max(5, Math.min(gpaMax, 20)) : 20;
  const gpa4 = (rawGpa != null) ? (rawGpa <= 4.3 ? rawGpa : (gpaCeil > 5 ? (rawGpa / gpaCeil) * 4.0 : rawGpa)) : null;
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
  for (const it of [...profile.extracurriculars, ...profile.awards]) { if (it.tier === -1) gm++; else if (it.tier === 0) out++; }
  const gpaZbase = (gpa4 != null) ? (gpa4 - gpaRef.mean) / gpaRef.std : 0;
  const rec = { profile, spike, gm, out, gpaZbase };
  profileCache.set(s.id, rec);
  return rec;
}

// ── SAT Z-score ──
function computeSATZ(userSAT: number, college: CollegeData): number | null {
  const sat25Math = college['admissions.sat_scores.25th_percentile.math'];
  const sat75Math = college['admissions.sat_scores.75th_percentile.math'];
  const sat25Read = college['admissions.sat_scores.25th_percentile.critical_reading'];
  const sat75Read = college['admissions.sat_scores.75th_percentile.critical_reading'];
  const satAvg = college['admissions.sat_scores.average.overall'];
  const collegeSATAvg: number | null = satAvg != null ? satAvg : (sat25Math != null && sat75Math != null ? sat25Math + sat75Math : null);
  if (!collegeSATAvg) return null;
  const sat25Total = (sat25Math != null && sat25Read != null) ? sat25Math + sat25Read : collegeSATAvg - 100;
  const sat75Total = (sat75Math != null && sat75Read != null) ? sat75Math + sat75Read : collegeSATAvg + 100;
  const iqr = sat75Total - sat25Total;
  const stdEst = iqr > 0 ? iqr / 1.35 : 100;
  return (userSAT - collegeSATAvg) / stdEst;
}

// ── Compute features for a pair ──
function computeFeatures(rec: { profile: UserProfile; spike: number; gm: number; out: number; gpaZbase: number }, college: CollegeData): { baseLogit: number; academicZ: number; spike: number } | null {
  const rate = college['admissions.admission_rate.overall'];
  if (!rate || rate <= 0 || rate >= 1) return null;
  const p = rec.profile;
  let userSAT: number | null = null;
  if (p.sat != null) userSAT = p.sat; else if (p.act != null) userSAT = actToSAT(p.act);
  const gpaZ = rec.gpaZbase;
  const gpaZnorm = (p.isInternational && p.schoolSystem === 'National_Non_Standard') ? (rec.gm >= 1 ? 2.0 : (gpaZ < 0 ? gpaZ + 0.4 : gpaZ)) : gpaZ;
  const satZ = userSAT != null ? computeSATZ(userSAT, college) : null;
  let az: number;
  if (satZ === null) az = gpaZnorm - 0.2; else az = satZ * 0.55 + gpaZnorm * 0.45;
  az = Math.max(-4, Math.min(4, az));
  const baseLogit = Math.log(rate / (1 - rate));
  return { baseLogit, academicZ: az, spike: rec.spike };
}

// ── Precompute major modifier per (school, major) from training data only ──
function computeMajorModFromPairs(pairs: { studentIdx: number; schoolNorm: string; actual: number }[]): Map<string, number> {
  const cache = new Map<string, number>();
  const bySchool = new Map<string, { total: number; accepted: number; byMajor: Map<MajorCategory, { n: number; acc: number }> }>();
  for (const pair of pairs) {
    const s = studentsRaw[pair.studentIdx];
    const mc = classifyMajor(s.demographics?.intended_major ?? '');
    if (!bySchool.has(pair.schoolNorm)) bySchool.set(pair.schoolNorm, { total: 0, accepted: 0, byMajor: new Map() });
    const entry = bySchool.get(pair.schoolNorm)!;
    entry.total++;
    if (pair.actual === 1) entry.accepted++;
    if (!entry.byMajor.has(mc)) entry.byMajor.set(mc, { n: 0, acc: 0 });
    const me = entry.byMajor.get(mc)!;
    me.n++;
    if (pair.actual === 1) me.acc++;
  }
  for (const [schoolNorm, entry] of bySchool) {
    if (entry.total < 3) continue;
    const overallRate = entry.accepted / entry.total;
    if (overallRate === 0) continue;
    for (const [mc, me] of entry.byMajor) {
      if (me.n < 2) { cache.set(`${schoolNorm}|${mc}`, 0); continue; }
      const majorRate = me.acc / me.n;
      const mod = Math.max(0.5, Math.min(1.5, majorRate / overallRate));
      cache.set(`${schoolNorm}|${mc}`, (mod - 1) * 0.5);
    }
  }
  return cache;
}

// ── AdmitGPT engine point estimate (faithful replica) ──
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
function admitgptPredict(rec: { profile: UserProfile; spike: number; gm: number; out: number; gpaZbase: number }, college: CollegeData, majorModCache: Map<string, number>): number | null {
  const rate = college['admissions.admission_rate.overall'];
  if (!rate || rate <= 0 || rate >= 1) return null;
  const p = rec.profile;
  let userSAT: number | null = null;
  if (p.sat != null) userSAT = p.sat; else if (p.act != null) userSAT = actToSAT(p.act);
  const gpaZ = rec.gpaZbase;
  const gpaZnorm = (p.isInternational && p.schoolSystem === 'National_Non_Standard') ? (rec.gm >= 1 ? 2.0 : (gpaZ < 0 ? gpaZ + 0.4 : gpaZ)) : gpaZ;
  const satZ = userSAT != null ? computeSATZ(userSAT, college) : null;
  let az: number;
  if (satZ === null) az = gpaZnorm - 0.2; else az = satZ * 0.55 + gpaZnorm * 0.45;
  az = Math.max(-4, Math.min(4, az));
  const intlBoost = (p.isInternational && az < 0) ? INTERNATIONAL_SPIKE_BOOST : 1;
  let spikeWeight: number;
  if (rec.gm >= 1) spikeWeight = 0.175 * intlBoost;
  else if (rec.out >= 1) spikeWeight = 0.14 * intlBoost;
  else spikeWeight = 0.11 * intlBoost;
  const schoolNorm = normalizeSchoolName(college['school.name']);
  const majorMod = majorModCache.get(`${schoolNorm}|${p.majorCategory}`) ?? 0;
  const alienRate = college['student.demographics.race_ethnicity.non_resident_alien'];
  const intlMod = !p.isInternational ? 0 : (alienRate ? (alienRate / 0.10) * 0.1 - 0.3 : -0.2);
  const baseLogit = Math.log(rate / (1 - rate));
  const academicTerm = ACADEMIC_LOGIT_COEF * az;
  const verifiedItems = p.extracurriculars.filter(e => e.externalValidation !== 'Self_Reported').length + p.awards.filter(a => a.externalValidation !== 'Self_Reported').length;
  const totalItems = p.extracurriculars.length + p.awards.length;
  const verifiedShare = totalItems === 0 ? 1 : verifiedItems / totalItems;
  const verifiedMult = VERIFIED_SPIKE_FLOOR + (1 - VERIFIED_SPIKE_FLOOR) * verifiedShare;
  let spikeTerm = rec.spike * spikeWeight * verifiedMult;
  spikeTerm = Math.max(-SPIKE_CAP, Math.min(SPIKE_CAP, spikeTerm));
  const combinedLogit = baseLogit + academicTerm + spikeTerm + majorMod + intlMod;
  const calibratedLogit = CALIB_SLOPE * combinedLogit + CALIB_INTERCEPT;
  let pe = sigmoid(calibratedLogit);
  return Math.max(0.01, Math.min(0.99, pe));
}

// ── Logistic Regression (Newton-Raphson with L2) ──
function solveLinearSystem(A: number[][], b: number[]): number[] | null {
  const n = A.length;
  const aug = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col++) {
    let maxRow = col;
    for (let row = col + 1; row < n; row++) { if (Math.abs(aug[row][col]) > Math.abs(aug[maxRow][col])) maxRow = row; }
    [aug[col], aug[maxRow]] = [aug[maxRow], aug[col]];
    if (Math.abs(aug[col][col]) < 1e-12) return null;
    for (let row = col + 1; row < n; row++) {
      const factor = aug[row][col] / aug[col][col];
      for (let j = col; j <= n; j++) aug[row][j] -= factor * aug[col][j];
    }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = aug[i][n];
    for (let j = i + 1; j < n; j++) x[i] -= aug[i][j] * x[j];
    x[i] /= aug[i][i];
  }
  return x;
}

function fitLR(X: number[][], y: number[], lambda = 0.01, maxIter = 25): number[] {
  const n = X.length, d = X[0].length;
  let w = new Array(d).fill(0);
  for (let iter = 0; iter < maxIter; iter++) {
    const p = X.map(x => sigmoid(x.reduce((s, xi, j) => s + xi * w[j], 0)));
    const g = new Array(d).fill(0);
    const H = Array.from({ length: d }, () => new Array(d).fill(0));
    for (let i = 0; i < n; i++) {
      const err = p[i] - y[i];
      for (let j = 0; j < d; j++) {
        g[j] += X[i][j] * err;
        for (let k = 0; k < d; k++) H[j][k] += X[i][j] * X[i][k] * p[i] * (1 - p[i]);
      }
    }
    for (let j = 0; j < d; j++) {
      g[j] = g[j] / n + lambda * w[j];
      H[j][j] = H[j][j] / n + lambda;
      for (let k = 0; k < d; k++) { if (j !== k) H[j][k] /= n; }
    }
    const delta = solveLinearSystem(H, g);
    if (!delta) break;
    for (let j = 0; j < d; j++) w[j] -= delta[j];
  }
  return w;
}

function predictLR(w: number[], x: number[]): number {
  return Math.max(0.01, Math.min(0.99, sigmoid(x.reduce((s, xi, j) => s + xi * w[j], 0))));
}

// ── Random Forest ──
interface TreeNode { feature?: number; threshold?: number; left?: TreeNode; right?: TreeNode; prediction: number; }

function buildTree(X: number[][], y: number[], depth: number, maxDepth: number, minLeaf: number): TreeNode {
  const n = X.length, d = X[0].length;
  const posCount = y.filter(v => v === 1).length;
  const prediction = posCount / n;
  if (depth >= maxDepth || n <= minLeaf * 2) return { prediction };
  let bestGini = Infinity, bestF = 0, bestT = 0, bestL: number[] = [], bestR: number[] = [];
  for (let f = 0; f < d; f++) {
    const vals = X.map(x => x[f]).sort((a, b) => a - b);
    // Subsample thresholds for speed
    const step = Math.max(1, Math.floor(vals.length / 50));
    for (let i = 0; i < vals.length - 1; i += step) {
      if (vals[i] === vals[i + 1]) continue;
      const t = (vals[i] + vals[i + 1]) / 2;
      const l: number[] = [], r: number[] = [];
      for (let j = 0; j < n; j++) { if (X[j][f] <= t) l.push(j); else r.push(j); }
      if (l.length < minLeaf || r.length < minLeaf) continue;
      const lPos = l.filter(j => y[j] === 1).length;
      const rPos = r.filter(j => y[j] === 1).length;
      const lGini = 1 - (lPos / l.length) ** 2 - ((l.length - lPos) / l.length) ** 2;
      const rGini = 1 - (rPos / r.length) ** 2 - ((r.length - rPos) / r.length) ** 2;
      const wGini = (l.length / n) * lGini + (r.length / n) * rGini;
      if (wGini < bestGini) { bestGini = wGini; bestF = f; bestT = t; bestL = l; bestR = r; }
    }
  }
  if (bestL.length === 0 || bestR.length === 0) return { prediction };
  return { feature: bestF, threshold: bestT, left: buildTree(bestL.map(i => X[i]), bestL.map(i => y[i]), depth + 1, maxDepth, minLeaf), right: buildTree(bestR.map(i => X[i]), bestR.map(i => y[i]), depth + 1, maxDepth, minLeaf), prediction };
}

function predictTree(tree: TreeNode, x: number[]): number {
  if (tree.feature === undefined) return tree.prediction;
  return x[tree.feature] <= tree.threshold! ? predictTree(tree.left!, x) : predictTree(tree.right!, x);
}

function fitRF(X: number[][], y: number[], nTrees: number, maxDepth: number): TreeNode[] {
  const n = X.length, d = X[0].length, nFeat = Math.max(1, Math.round(Math.sqrt(d)));
  const trees: TreeNode[] = [];
  for (let t = 0; t < nTrees; t++) {
    const idx: number[] = [];
    for (let i = 0; i < n; i++) idx.push(Math.floor(rng() * n));
    const feats = Array.from({ length: d }, (_, i) => i).sort(() => rng() - 0.5).slice(0, nFeat);
    trees.push(buildTree(idx.map(i => feats.map(f => X[i][f])), idx.map(i => y[i]), 0, maxDepth, 50));
  }
  return trees;
}

function predictRF(trees: TreeNode[], X: number[][]): number[] {
  return X.map(x => { const p = trees.map(t => predictTree(t, x)); return p.reduce((a, b) => a + b, 0) / p.length; });
}

// ── Academic-only prediction (no spike) ──
function academicOnlyPredict(rec: { profile: UserProfile; spike: number; gm: number; out: number; gpaZbase: number }, college: CollegeData, majorModCache: Map<string, number>): number | null {
  const rate = college['admissions.admission_rate.overall'];
  if (!rate || rate <= 0 || rate >= 1) return null;
  const p = rec.profile;
  let userSAT: number | null = null;
  if (p.sat != null) userSAT = p.sat; else if (p.act != null) userSAT = actToSAT(p.act);
  const gpaZ = rec.gpaZbase;
  const gpaZnorm = (p.isInternational && p.schoolSystem === 'National_Non_Standard') ? (rec.gm >= 1 ? 2.0 : (gpaZ < 0 ? gpaZ + 0.4 : gpaZ)) : gpaZ;
  const satZ = userSAT != null ? computeSATZ(userSAT, college) : null;
  let az: number;
  if (satZ === null) az = gpaZnorm - 0.2; else az = satZ * 0.55 + gpaZnorm * 0.45;
  az = Math.max(-4, Math.min(4, az));
  const schoolNorm = normalizeSchoolName(college['school.name']);
  const majorMod = majorModCache.get(`${schoolNorm}|${p.majorCategory}`) ?? 0;
  const alienRate = college['student.demographics.race_ethnicity.non_resident_alien'];
  const intlMod = !p.isInternational ? 0 : (alienRate ? (alienRate / 0.10) * 0.1 - 0.3 : -0.2);
  const baseLogit = Math.log(rate / (1 - rate));
  const academicTerm = ACADEMIC_LOGIT_COEF * az;
  const combinedLogit = baseLogit + academicTerm + majorMod + intlMod;
  let pe = sigmoid(CALIB_SLOPE * combinedLogit + CALIB_INTERCEPT);
  return Math.max(0.01, Math.min(0.99, pe));
}

// ── Metrics ──
function computeAUC(preds: { predicted: number; actual: number }[]): number {
  const nPos = preds.filter(p => p.actual === 1).length;
  const nNeg = preds.length - nPos;
  if (nPos === 0 || nNeg === 0) return 0.5;
  const sorted = [...preds].sort((a, b) => a.predicted - b.predicted);
  let sumR = 0, i = 0;
  while (i < sorted.length) { let j = i; const pp = sorted[i].predicted; while (j < sorted.length && sorted[j].predicted === pp) j++; const avg = (i + j - 1) / 2 + 1; for (let k = i; k < j; k++) if (sorted[k].actual === 1) sumR += avg; i = j; }
  return (sumR - nPos * (nPos + 1) / 2) / (nPos * nNeg);
}

function computeBrier(preds: { predicted: number; actual: number }[]): number {
  return preds.reduce((s, p) => s + (p.predicted - p.actual) ** 2, 0) / preds.length;
}

function computeLogLoss(preds: { predicted: number; actual: number }[]): number {
  return -preds.reduce((s, p) => { const pc = Math.max(1e-15, Math.min(1 - 1e-15, p.predicted)); return s + p.actual * Math.log(pc) + (1 - p.actual) * Math.log(1 - pc); }, 0) / preds.length;
}

// ── Stratified 5-fold by school selectivity decile ──
function stratifiedFolds(nPairs: number, pairSchoolNorms: string[], k: number): number[][] {
  const schoolRate = new Map<string, number>();
  for (const sn of pairSchoolNorms) {
    if (schoolRate.has(sn)) continue;
    const col = collegesRaw.find(c => normalizeSchoolName(c['school.name']) === sn);
    schoolRate.set(sn, col?.['admissions.admission_rate.overall'] ?? 0.5);
  }
  const rates = Array.from(schoolRate.values()).sort((a, b) => a - b);
  const thresholds = Array.from({ length: 9 }, (_, i) => rates[Math.floor((i + 1) * rates.length / 10)]);
  const getDecile = (r: number) => { for (let i = 0; i < thresholds.length; i++) { if (r <= thresholds[i]) return i; } return 9; };
  const groups = new Map<number, number[]>();
  for (let i = 0; i < nPairs; i++) {
    const d = getDecile(schoolRate.get(pairSchoolNorms[i]) ?? 0.5);
    if (!groups.has(d)) groups.set(d, []);
    groups.get(d)!.push(i);
  }
  const folds: number[][] = Array.from({ length: k }, () => []);
  for (const indices of groups.values()) {
    for (let i = indices.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [indices[i], indices[j]] = [indices[j], indices[i]]; }
    for (let i = 0; i < indices.length; i++) folds[i % k].push(indices[i]);
  }
  return folds;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════════

console.log(`Dataset: ${studentsRaw.length} profiles, GPA ref: mu=${gpaRef.mean.toFixed(3)} sigma=${gpaRef.std.toFixed(3)}`);

// Build all pairs
const allSchoolNorms: string[] = [];
const allActuals: number[] = [];
const allRecs: { profile: UserProfile; spike: number; gm: number; out: number; gpaZbase: number }[] = [];
const allCollegeIdx: number[] = [];
const allStudentIdx: number[] = [];

for (let si = 0; si < studentsRaw.length; si++) {
  const s = studentsRaw[si];
  const rec = buildProfile(s);
  const accepted = ((s.decisions?.acceptances ?? []).filter(Boolean) as string[]);
  const rejected = ((s.decisions?.rejections ?? []).filter(Boolean) as string[]);
  for (const school of [...accepted, ...rejected]) {
    const college = findCollege(collegesRaw, school);
    if (!college) continue;
    const rate = college['admissions.admission_rate.overall'];
    if (!rate || rate <= 0 || rate >= 1) continue;
    const ci = collegesRaw.indexOf(college);
    allSchoolNorms.push(normalizeSchoolName(college['school.name']));
    allActuals.push(accepted.includes(school) ? 1 : 0);
    allRecs.push(rec);
    allCollegeIdx.push(ci);
    allStudentIdx.push(si);
  }
}

const nPairs = allActuals.length;
const nPos = allActuals.filter(a => a === 1).length;
console.log(`Pairs: ${nPairs} (${(100 * nPos / nPairs).toFixed(1)}% positive)\n`);

// Stratified 5-fold
const folds = stratifiedFolds(nPairs, allSchoolNorms, 5);

type Metrics = { auc: number; brier: number; logloss: number };
const results: Record<string, Metrics[]> = {
  'AdmitGPT Engine': [],
  'Academic-only': [],
  'LR (with spike)': [],
  'LR (without spike)': [],
  'Random Forest': [],
  'Majority Class': [],
};

for (let fold = 0; fold < 5; fold++) {
  const testSet = new Set(folds[fold]);
  const trainIdx: number[] = [];
  for (let i = 0; i < nPairs; i++) { if (!testSet.has(i)) trainIdx.push(i); }

  // Build major modifier from training data only
  const trainMajorMod = computeMajorModFromPairs(trainIdx.map(i => ({ studentIdx: allStudentIdx[i], schoolNorm: allSchoolNorms[i], actual: allActuals[i] })));

  // Compute features
  const trainFeatures = trainIdx.map(i => {
    const rec = allRecs[i];
    const college = collegesRaw[allCollegeIdx[i]];
    return computeFeatures(rec, college);
  });
  const testFeatures = folds[fold].map(i => {
    const rec = allRecs[i];
    const college = collegesRaw[allCollegeIdx[i]];
    return computeFeatures(rec, college);
  });

  // AdmitGPT predictions (use train major mod)
  const trainAdmitgpt = trainIdx.map((pi, ti) => {
    const rec = allRecs[pi];
    const college = collegesRaw[allCollegeIdx[pi]];
    return admitgptPredict(rec, college, trainMajorMod);
  });
  const testAdmitgpt = folds[fold].map((pi, ti) => {
    const rec = allRecs[pi];
    const college = collegesRaw[allCollegeIdx[pi]];
    return admitgptPredict(rec, college, trainMajorMod);
  });

  // Academic-only: same as AdmitGPT but spike=0 in the feature
  // We recompute: use the same engine path but override spike weight to 0
  const trainAcademic = trainIdx.map(pi => {
    const rec = allRecs[pi];
    const college = collegesRaw[allCollegeIdx[pi]];
    return academicOnlyPredict(rec, college, trainMajorMod);
  });
  const testAcademic = folds[fold].map(pi => {
    const rec = allRecs[pi];
    const college = collegesRaw[allCollegeIdx[pi]];
    return academicOnlyPredict(rec, college, trainMajorMod);
  });

  // Build X matrices for LR
  const trainXFull = trainFeatures.map((f, ti) => f ? [1, f.baseLogit, f.academicZ, f.spike] : null).filter(Boolean) as number[][];
  const trainYFull = trainFeatures.map((f, ti) => f ? allActuals[trainIdx[ti]] : -1).filter((_, i) => trainFeatures[i] !== null);
  const trainXNoSpike = trainXFull.map(x => [x[0], x[1], x[2]]);
  const testXFull = testFeatures.map((f, ti) => f ? [1, f.baseLogit, f.academicZ, f.spike] : null).filter(Boolean) as number[][];
  const testYFull = testFeatures.map((f, ti) => f ? allActuals[folds[fold][ti]] : -1).filter((_, i) => testFeatures[i] !== null);

  // Fit LR models
  const lrSpikeW = fitLR(trainXFull, trainYFull);
  const lrNoSpikeW = fitLR(trainXNoSpike, trainYFull);

  // Fit Random Forest (reduced for speed)
  const rfTrees = fitRF(trainXFull, trainYFull, 20, 3);
  const rfPredsTest = predictRF(rfTrees, testXFull);

  // Collect test predictions per model
  const testPairs: { predicted: number; actual: number }[][] = [[], [], [], [], [], []];
  // Also filter valid test indices
  const validTestIndices: number[] = [];
  for (let ti = 0; ti < folds[fold].length; ti++) {
    if (testFeatures[ti] !== null) validTestIndices.push(ti);
  }

  for (const ti of validTestIndices) {
    const pi = folds[fold][ti];
    const actual = allActuals[pi];
    const f = testFeatures[ti]!;
    // 0: AdmitGPT
    if (testAdmitgpt[ti] != null) testPairs[0].push({ predicted: testAdmitgpt[ti]!, actual });
    // 1: Academic-only
    if (testAcademic[ti] != null) testPairs[1].push({ predicted: testAcademic[ti]!, actual });
    // 2: LR with spike
    testPairs[2].push({ predicted: predictLR(lrSpikeW, [1, f.baseLogit, f.academicZ, f.spike]), actual });
    // 3: LR without spike
    testPairs[3].push({ predicted: predictLR(lrNoSpikeW, [1, f.baseLogit, f.academicZ]), actual });
    // 4: Random Forest
    const rfi = validTestIndices.indexOf(ti);
    testPairs[4].push({ predicted: rfPredsTest[rfi], actual });
    // 5: Majority class
    testPairs[5].push({ predicted: nPos / nPairs, actual });
  }

  const modelNames = Object.keys(results);
  for (let m = 0; m < modelNames.length; m++) {
    if (testPairs[m].length === 0) continue;
    results[modelNames[m]].push({
      auc: computeAUC(testPairs[m]),
      brier: computeBrier(testPairs[m]),
      logloss: computeLogLoss(testPairs[m]),
    });
  }

  console.log(`Fold ${fold + 1}: train=${trainIdx.length} test=${folds[fold].length} valid=${validTestIndices.length}`);
}

// ── Print results ──
console.log(`\n${'═'.repeat(80)}`);
console.log('5-FOLD STRATIFIED CROSS-VALIDATION RESULTS');
console.log(`${'═'.repeat(80)}\n`);

function mean(arr: number[]) { return arr.reduce((a, b) => a + b, 0) / arr.length; }
function std(arr: number[]) { const m = mean(arr); return Math.sqrt(arr.reduce((s, v) => s + (v - m) ** 2, 0) / arr.length); }

const header = `${'Model'.padEnd(22)} ${'AUC-ROC'.padEnd(18)} ${'Brier'.padEnd(18)} ${'LogLoss'.padEnd(18)}`;
console.log(header);
console.log('-'.repeat(80));

for (const [name, folds_] of Object.entries(results)) {
  if (folds_.length === 0) continue;
  const aucs = folds_.map(f => f.auc);
  const briers = folds_.map(f => f.brier);
  const loglosses = folds_.map(f => f.logloss);
  const line = `${name.padEnd(22)} ${`${mean(aucs).toFixed(4)} ± ${std(aucs).toFixed(4)}`.padEnd(18)} ${`${mean(briers).toFixed(4)} ± ${std(briers).toFixed(4)}`.padEnd(18)} ${`${mean(loglosses).toFixed(4)} ± ${std(loglosses).toFixed(4)}`.padEnd(18)}`;
  console.log(line);
}

// ── Bootstrap CI for key comparisons ──
console.log(`\n${'═'.repeat(80)}`);
console.log('BOOTSTRAP 95% CONFIDENCE INTERVALS (1000 resamples)');
console.log(`${'═'.repeat(80)}\n`);

// Re-run with full data + major mod to get full predictions, then bootstrap
const fullMajorMod = computeMajorModFromPairs(Array.from({ length: nPairs }, (_, i) => ({ studentIdx: allStudentIdx[i], schoolNorm: allSchoolNorms[i], actual: allActuals[i] })));

const fullPreds = { admitgpt: [] as {p:number;a:number}[], academic: [] as {p:number;a:number}[], lrSpike: [] as {p:number;a:number}[], lrNoSpike: [] as {p:number;a:number}[] };
const fullX: number[][] = [];
const fullY: number[] = [];

for (let i = 0; i < nPairs; i++) {
  const rec = allRecs[i];
  const college = collegesRaw[allCollegeIdx[i]];
  const f = computeFeatures(rec, college);
  if (!f) continue;
  const ag = admitgptPredict(rec, college, fullMajorMod);
  const ac = academicOnlyPredict(rec, college, fullMajorMod);
  if (ag != null) fullPreds.admitgpt.push({ p: ag, a: allActuals[i] });
  if (ac != null) fullPreds.academic.push({ p: ac, a: allActuals[i] });
  fullX.push([1, f.baseLogit, f.academicZ, f.spike]);
  fullY.push(allActuals[i]);
}

// Fit LR on full data for bootstrap
const fullLrSpikeW = fitLR(fullX, fullY);
const fullLrNoSpikeW = fitLR(fullX.map(x => [x[0], x[1], x[2]]), fullY);
for (let i = 0; i < fullX.length; i++) {
  fullPreds.lrSpike.push({ p: predictLR(fullLrSpikeW, fullX[i]), a: fullY[i] });
  fullPreds.lrNoSpike.push({ p: predictLR(fullLrNoSpikeW, fullX[i].slice(0, 3)), a: fullY[i] });
}

function bootstrapAUCDiff(pairs1: {predicted:number;actual:number}[], pairs2: {predicted:number;actual:number}[], nBoot = 500): [number, number, number] {
  const n = Math.min(pairs1.length, pairs2.length);
  const diffs: number[] = [];
  for (let b = 0; b < nBoot; b++) {
    const s1: {predicted:number;actual:number}[] = [], s2: {predicted:number;actual:number}[] = [];
    for (let i = 0; i < n; i++) { const idx = Math.floor(rng() * n); s1.push(pairs1[idx]); s2.push(pairs2[idx]); }
    diffs.push(computeAUC(s1) - computeAUC(s2));
  }
  diffs.sort((a, b) => a - b);
  return [mean(diffs), diffs[Math.floor(0.025 * nBoot)], diffs[Math.floor(0.975 * nBoot)]];
}

const comparisons: [string, Array<{predicted: number; actual: number}>, Array<{predicted: number; actual: number}>][] = [
  ['AdmitGPT vs Academic-only', fullPreds.admitgpt.map(x => ({predicted:x.p,actual:x.a})), fullPreds.academic.map(x => ({predicted:x.p,actual:x.a}))],
  ['AdmitGPT vs LR (no spike)', fullPreds.admitgpt.map(x => ({predicted:x.p,actual:x.a})), fullPreds.lrNoSpike.map(x => ({predicted:x.p,actual:x.a}))],
  ['LR (spike) vs LR (no spike)', fullPreds.lrSpike.map(x => ({predicted:x.p,actual:x.a})), fullPreds.lrNoSpike.map(x => ({predicted:x.p,actual:x.a}))],
  ['AdmitGPT vs LR (spike)', fullPreds.admitgpt.map(x => ({predicted:x.p,actual:x.a})), fullPreds.lrSpike.map(x => ({predicted:x.p,actual:x.a}))],
];

for (const [label, p1, p2] of comparisons) {
  const [diff, lo, hi] = bootstrapAUCDiff(p1, p2);
  const sig = (lo > 0 || hi < 0) ? '*' : ' ';
  console.log(`${label.padEnd(35)} ΔAUC = ${diff >= 0 ? '+' : ''}${diff.toFixed(4)}  95% CI [${lo >= 0 ? '+' : ''}${lo.toFixed(4)}, ${hi >= 0 ? '+' : ''}${hi.toFixed(4)}]  ${sig}`);
}
console.log('* = CI excludes zero (statistically significant at p < 0.05)');



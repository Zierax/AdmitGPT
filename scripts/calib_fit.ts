// TEMP: Fit logistic / Platt calibration on the engine's raw logit.
// We split corpus pairs 50/50 (seeded), fit p = sigmoid(A*logit + B) on train,
// and report Brier/AUC on the held-out test set. Output A, B to bake into the
// engine as a calibration layer.
import * as fs from 'fs';
import * as path from 'path';
import { computeSpikeScore } from '../lib/engine';
import { classifyMajor } from '../lib/dataLoader';
import { actToSATConcordance as actToSAT, normalizeSchoolName, findCollege, INTERNATIONAL_SPIKE_BOOST, ACADEMIC_LOGIT_COEF } from '../lib/shared';
import { StudentProfile, CollegeData, UserProfile, UserEC, UserAward, DatasetStats, ActivityCategory, ECTier, TierLevel, RarityLevel, InstitutionalStrength, CognitiveLoad, ExternalValidation, MajorCategory } from '../lib/types';

const studentsRaw = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/studentsdata.json'), 'utf-8')) as StudentProfile[];
const collegesRaw = JSON.parse(fs.readFileSync(path.join(__dirname, '../public/data/collegesdata.json'), 'utf-8')) as CollegeData[];

const gpas: number[] = [];
for (const s of studentsRaw) if (s.academics?.unweighted_gpa != null) gpas.push(s.academics.unweighted_gpa);
const gpaMean = gpas.reduce((a, b) => a + b, 0) / gpas.length;
const gpaStd = Math.sqrt(gpas.reduce((a, b) => a + (b - gpaMean) ** 2, 0) / gpas.length);
const stats: DatasetStats = { gpa: { mean: gpaMean, std: gpaStd, min: Math.min(...gpas), max: Math.max(...gpas) }, sat: { mean: 0, std: 0, min: 0, max: 0 }, totalProfiles: studentsRaw.length, profilesWithDecisions: 0, yearRange: { min: 0, max: 0 }, schoolCounts: {} };

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
function classifyTierLevel(text: string): TierLevel { const t = lc(text); if (/world|global|olympiad|once in a lifetime/.test(t)) return 'Global_Elite'; if (/international/.test(t)) return 'International'; if (/national|country|federal/.test(t)) return 'National'; return 'Local'; }
function classifyRarity(text: string): RarityLevel { const t = lc(text); if (/unique|one of a kind|only|0\.01|0\.1%|first ever/.test(t)) return 'Unique'; if (/ultra|world|global|international|olympiad|national|rare/.test(t)) return 'Rare'; return 'Common'; }
function classifyStrength(text: string): InstitutionalStrength { const t = lc(text); if (/nobel|nature|published|patent|ieee|olympiad|national academy|mit|harvard|stanford|google|microsoft|nasa/.test(t)) return 'World_Class'; if (/university|college|school|state|national|institute|academy|company|corp|lab/.test(t)) return 'Recognized'; return 'Standard'; }
function classifyLoad(text: string): CognitiveLoad { const t = lc(text); if (/research|published|thesis|paper|olympiad|dissertation/.test(t)) return 'Research_Level'; if (/advanced|competition|founder|lead|complex|analy|engineer/.test(t)) return 'High'; return 'Medium'; }
function classifyValidation(text: string): ExternalValidation { const t = lc(text); if (/verified|audit|official|institutional|school|university|college|national|state|certified/.test(t)) return 'Institutional'; if (/peer|vouched|recommend|review/.test(t)) return 'Peer_Vouched'; return 'Self_Reported'; }
function deriveEC(ec: { title: string | null; description: string | null }): UserEC { const title = ec.title ?? ''; const text = `${title} ${ec.description ?? ''}`; return { title, description: ec.description ?? '', tier: classifyTier(text), category: classifyCategory(text), tierLevel: classifyTierLevel(text), rarity: classifyRarity(text), institutionalStrength: classifyStrength(text), cognitiveLoad: classifyLoad(text), externalValidation: classifyValidation(text), confidence: 85 }; }
function deriveAward(award: string | null): UserAward { const a = award ?? ''; return { title: a, description: '', tier: classifyTier(a), category: classifyCategory(a), tierLevel: classifyTierLevel(a), rarity: classifyRarity(a), institutionalStrength: classifyStrength(a), cognitiveLoad: classifyLoad(a), externalValidation: classifyValidation(a), confidence: 85 }; }

const profileCache = new Map<number, any>();
function buildProfile(s: StudentProfile) {
  if (profileCache.has(s.id)) return profileCache.get(s.id);
  const profile: UserProfile = {
    name: '', isInternational: !!s.demographics?.isInternational, schoolSystem: s.demographics?.schoolSystem ?? 'US_Standard', intendedMajor: s.demographics?.intended_major ?? '', majorCategory: classifyMajor(s.demographics?.intended_major ?? ''), state: '', gender: s.demographics?.gender ?? '', sat: s.academics?.sat ? parseInt(s.academics.sat, 10) : null, act: s.academics?.act ? parseInt(s.academics.act, 10) : null, preferredTestType: s.academics?.sat ? 'SAT' : (s.academics?.act ? 'ACT' : 'None'), unweightedGPA: s.academics?.unweighted_gpa ?? null, weightedGPA: s.academics?.weighted_gpa ?? null, numberOfAPCourses: s.academics?.number_of_ap_courses ?? 0, numberOfIBCourses: s.academics?.number_of_ib_courses ?? 0, numberOfHonorsCourses: s.academics?.number_of_honors_courses ?? 0, extracurriculars: (s.extracurricular_activities ?? []).filter(e => e && e.title).map(deriveEC), awards: (s.awards ?? []).filter(Boolean).map(deriveAward), targetSchools: [], targetColleges: [],
  };
  const spike = computeSpikeScore(profile.extracurriculars, profile.awards);
  let gm = 0, out = 0;
  for (const it of [...profile.extracurriculars, ...profile.awards]) { if (it.tier === -1) gm++; else if (it.tier === 0) out++; }
  const gpa = profile.unweightedGPA;
  const gpaZbase = (gpa != null && gpaStd > 0) ? (gpa - gpaMean) / gpaStd : 0;
  const rec = { profile, spike, gm, out, gpaZbase };
  profileCache.set(s.id, rec);
  return rec;
}
const majorModCache = new Map<string, number>();
function precomputeMajorMod() {
  const bySchool = new Map<string, StudentProfile[]>();
  for (const s of studentsRaw) {
    const schools = new Set<string>([...(s.decisions?.acceptances ?? []), ...(s.decisions?.rejections ?? [])].filter(Boolean) as string[]);
    for (const sc of schools) { const n = normalizeSchoolName(sc); if (!bySchool.has(n)) bySchool.set(n, []); bySchool.get(n)!.push(s); }
  }
  for (const [schoolNorm, applicants] of bySchool) {
    if (applicants.length < 3) continue;
    const overallAcc = applicants.filter(s => (s.decisions?.acceptances ?? []).some(a => normalizeSchoolName(a) === schoolNorm)).length;
    const overallRate = overallAcc / applicants.length;
    if (overallRate === 0) continue;
    const majorMap = new Map<MajorCategory, { n: number; acc: number }>();
    for (const s of applicants) { const mc = classifyMajor(s.demographics?.intended_major ?? ''); if (!majorMap.has(mc)) majorMap.set(mc, { n: 0, acc: 0 }); const e = majorMap.get(mc)!; e.n++; if ((s.decisions?.acceptances ?? []).some(a => normalizeSchoolName(a) === schoolNorm)) e.acc++; }
    for (const [mc, v] of majorMap) { if (v.n < 2) { majorModCache.set(`${schoolNorm}|${mc}`, 1.0); continue; } const majorRate = v.acc / v.n; const mod = Math.max(0.5, Math.min(1.5, majorRate / overallRate)); majorModCache.set(`${schoolNorm}|${mc}`, (mod - 1) * 0.5); }
  }
}
function getMajorMod(schoolNorm: string, mc: MajorCategory): number { const v = majorModCache.get(`${schoolNorm}|${mc}`); return v ?? 0.0; }
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));
function computeSATZ(userSAT: number, college: CollegeData): number {
  const sat25Math = college['admissions.sat_scores.25th_percentile.math'];
  const sat75Math = college['admissions.sat_scores.75th_percentile.math'];
  const sat25Read = college['admissions.sat_scores.25th_percentile.critical_reading'];
  const sat75Read = college['admissions.sat_scores.75th_percentile.critical_reading'];
  const satAvg = college['admissions.sat_scores.average.overall'];
  const collegeSATAvg: number | null = satAvg != null ? satAvg : (sat25Math != null && sat75Math != null ? sat25Math + sat75Math : null);
  if (!collegeSATAvg) return 0;
  const sat25Total = (sat25Math != null && sat25Read != null) ? sat25Math + sat25Read : collegeSATAvg - 100;
  const sat75Total = (sat75Math != null && sat75Read != null) ? sat75Math + sat75Read : collegeSATAvg + 100;
  const iqr = sat75Total - sat25Total;
  const stdEst = iqr > 0 ? iqr / 1.35 : 100;
  return (userSAT - collegeSATAvg) / stdEst;
}
// Returns the RAW combined logit (before sigmoid) so we can calibrate it.
function rawLogit(rec: any, college: CollegeData): number | null {
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
  const intlBoost = p.isInternational ? INTERNATIONAL_SPIKE_BOOST : 1;
  let spikeWeight: number;
  if (rec.gm >= 1) spikeWeight = 0.175 * intlBoost; else if (rec.out >= 1) spikeWeight = 0.14 * intlBoost; else spikeWeight = 0.11 * intlBoost;
  const schoolNorm = normalizeSchoolName(college['school.name']);
  const majorMod = getMajorMod(schoolNorm, p.majorCategory);
  const alienRate = college['student.demographics.race_ethnicity.non_resident_alien'];
  const intlMod = !p.isInternational ? 0 : (alienRate ? (alienRate / 0.10) * 0.1 - 0.3 : -0.2);
  const baseLogit = Math.log(rate / (1 - rate));
  const academicTerm = ACADEMIC_LOGIT_COEF * az;
  return baseLogit + academicTerm + rec.spike * spikeWeight + majorMod + intlMod;
}

precomputeMajorMod();
type Pair = { logit: number; actual: number };
const pairs: Pair[] = [];
for (const s of studentsRaw) {
  const rec = buildProfile(s);
  const accepted = (s.decisions?.acceptances ?? []).filter(Boolean) as string[];
  const rejected = (s.decisions?.rejections ?? []).filter(Boolean) as string[];
  for (const school of [...accepted, ...rejected]) {
    const college = findCollege(collegesRaw, school);
    if (!college) continue;
    const logit = rawLogit(rec, college);
    if (logit == null) continue;
    pairs.push({ logit, actual: accepted.includes(school) ? 1 : 0 });
  }
}

// Seeded 50/50 split
let seed = 123456789;
const rng = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const idx = pairs.map((_, i) => i).sort(() => rng() - 0.5);
const train = idx.slice(0, Math.floor(idx.length / 2)).map(i => pairs[i]);
const test = idx.slice(Math.floor(idx.length / 2)).map(i => pairs[i]);

// Robust grid search for logistic (Platt) calibration on a held-out split:
// p = sigmoid(A * logit + B). Minimise train Brier.
function fit(data: Pair[]) {
  let best = { A: 1, B: 0, brier: Infinity };
  for (let A = 0.1; A <= 1.0; A += 0.01) {
    for (let B = -1.0; B <= 5.0; B += 0.05) {
      const b = brierOf(data, A, B);
      if (b < best.brier) best = { A, B, brier: b };
    }
  }
  return best;
}
function brierOf(data: Pair[], A: number, B: number) {
  let s = 0;
  for (const d of data) { const p = Math.max(0.01, Math.min(0.99, sigmoid(A * d.logit + B))); s += (p - d.actual) ** 2; }
  return s / data.length;
}
function aucOf(data: Pair[], A: number, B: number) {
  const scored = data.map(d => ({ p: sigmoid(A * d.logit + B), a: d.actual }));
  const nPos = scored.filter(x => x.a === 1).length, nNeg = scored.length - nPos;
  if (!nPos || !nNeg) return 0.5;
  const sorted = [...scored].sort((x, y) => x.p - y.p);
  let srp = 0, i = 0;
  while (i < sorted.length) { let j = i; const pp = sorted[i].p; while (j < sorted.length && sorted[j].p === pp) j++; const avg = (i + j - 1) / 2 + 1; for (let k = i; k < j; k++) if (sorted[k].a === 1) srp += avg; i = j; }
  return (srp - nPos * (nPos + 1) / 2) / (nPos * nNeg);
}

const best = fit(train);
const { A, B } = best;
console.log(`Pairs: ${pairs.length}  train=${train.length} test=${test.length}`);
console.log(`Fitted: A (slope) = ${A.toFixed(4)}   B (intercept) = ${B.toFixed(4)}`);
console.log(`TRAIN  Brier=${brierOf(train, A, B).toFixed(4)}  AUC=${aucOf(train, A, B).toFixed(4)}`);
console.log(`TEST   Brier=${brierOf(test, A, B).toFixed(4)}  AUC=${aucOf(test, A, B).toFixed(4)}`);
console.log(`RAW    Brier=${brierOf(test, 1, 0).toFixed(4)}  AUC=${aucOf(test, 1, 0).toFixed(4)}`);

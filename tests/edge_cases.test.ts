import { describe, it, expect } from 'vitest';
import { convertToUS4 } from '../lib/shared';
import { computeSpikeScore, calculateAdmissionProbability } from '../lib/engine';
import { CollegeData, DatasetStats, UserProfile, UserEC, ECTier, TierLevel, ActivityCategory, RarityLevel, InstitutionalStrength, CognitiveLoad, ExternalValidation } from '../lib/types';

function ec(
  tier: ECTier, tl: TierLevel, rarity: RarityLevel, strength: InstitutionalStrength,
  load: CognitiveLoad, val: ExternalValidation, cat: ActivityCategory,
): UserEC {
  return {
    title: 'Activity', description: 'Activity',
    tier, tierLevel: tl, rarity, institutionalStrength: strength, cognitiveLoad: load,
    externalValidation: val, category: cat, confidence: 100,
  };
}

const stats: DatasetStats = {
  gpa: { mean: 3.5, std: 0.5, min: 0, max: 4.0 },
  sat: { mean: 1200, std: 200, min: 400, max: 1600 },
  totalProfiles: 1000, profilesWithDecisions: 1000, yearRange: { min: 2020, max: 2023 }, schoolCounts: {},
};

const college: CollegeData = {
  id: 1, 'school.name': 'Test University', 'school.city': 'T', 'school.state': 'TS', 'school.zip': '0',
  'school.school_url': '', 'school.ownership': 1, 'school.degrees_awarded.predominant': 3,
  'admissions.admission_rate.overall': 0.1,
  'admissions.sat_scores.average.overall': 1400,
  'admissions.sat_scores.25th_percentile.math': 680, 'admissions.sat_scores.25th_percentile.critical_reading': 680,
  'admissions.sat_scores.50th_percentile.math': 700, 'admissions.sat_scores.50th_percentile.critical_reading': 700,
  'admissions.sat_scores.75th_percentile.math': 720, 'admissions.sat_scores.75th_percentile.critical_reading': 720,
  'admissions.act_scores.25th_percentile.cumulative': 30, 'admissions.act_scores.50th_percentile.cumulative': 32,
  'admissions.act_scores.75th_percentile.cumulative': 34,
  'cost.tuition.in_state': 10000, 'cost.tuition.out_of_state': 20000, 'cost.avg_net_price.overall': 15000,
  'student.size': 5000, 'student.demographics.race_ethnicity.non_resident_alien': 0.05,
  'earnings.10_yrs_after_entry.median': 60000, rank: 10,
  early_deadline: null, early_deadline_type: null, regular_deadline: null,
  tuition: null, room_and_board: null, average_cost_after_aid: null,
  majorCompetitiveness: { CS: 0, STEM: 0, HumSoc: 0, Arts: 0, Business: 0, PreMed: 0, Other: 0 },
};

function prof(extra: Partial<UserProfile>): UserProfile {
  return {
    name: '', isInternational: false, schoolSystem: 'US_Standard',
    intendedMajor: 'CS', majorCategory: 'CS' as any, state: '', gender: '',
    sat: 1450, act: null, preferredTestType: 'SAT', unweightedGPA: 3.7,
    weightedGPA: null, numberOfAPCourses: 0, numberOfIBCourses: 0, numberOfHonorsCourses: 0,
    extracurriculars: [], awards: [], targetSchools: [], targetColleges: [],
    ...extra,
  };
}

describe('Edge case (a): international non-4.0 GPA scale conversion', () => {
  it('maps known native scales to a US-4.0 equivalent', () => {
    expect(convertToUS4(9.0, 'CGPA_10')).toBeCloseTo(3.6, 5);
    expect(convertToUS4(5.0, 'CGPA_5')).toBeCloseTo(4.0, 5);
    expect(convertToUS4(7, 'IB_7')).toBeCloseTo(4.0, 5);
    expect(convertToUS4(1.0, 'Germany_5')).toBeCloseTo(4.0, 5);
    expect(convertToUS4(4.0, 'Germany_5')).toBeCloseTo(1.0, 5);
    expect(convertToUS4(100, 'Percentage_100')).toBeCloseTo(4.0, 5);
  });

  it('preserves US_4.0 input and clamps out-of-range', () => {
    expect(convertToUS4(3.5, 'US_4.0')).toBe(3.5);
    expect(convertToUS4(10, 'CGPA_10')).toBe(4.0); // clamp
    expect(convertToUS4(-1, 'CGPA_10')).toBe(0.0); // clamp
  });

  it('a declared scale produces a sane Z, not the old mis-scaled Z', () => {
    const declared = calculateAdmissionProbability(
      prof({ unweightedGPA: 9.0, gpaScale: 'CGPA_10', isInternational: true, schoolSystem: 'Intl_Standard' }),
      'Test University', college, [], stats);
    const omitted = calculateAdmissionProbability(
      prof({ unweightedGPA: 9.0, isInternational: true, schoolSystem: 'Intl_Standard' }),
      'Test University', college, [], stats);
    // With a declared scale the GPA is bridged to ~3.6 US; without it the raw 9.0
    // is fed through as if 4.0-scale and explodes. The fixed path must be far lower.
    expect(declared.gpaZ).toBeLessThan(2.0);
    expect(omitted.gpaZ).toBeGreaterThan(declared.gpaZ + 3);
  });
});

describe('Edge case (b): anti-gaming + verification path', () => {
  const overSelf = [ec(1, 'Global_Elite', 'Unique', 'World_Class', 'Research_Level', 'Self_Reported', 'Leadership_Government')];
  const overVerified = [ec(1, 'Global_Elite', 'Unique', 'World_Class', 'Research_Level', 'Peer_Vouched', 'Leadership_Government')];
  const honest = [ec(1, 'Local', 'Common', 'Standard', 'Medium', 'Self_Reported', 'Leadership_Government')];

  it('a verified top-tier claim keeps full value; a self-reported one is capped/discounted', () => {
    expect(computeSpikeScore(overVerified, [])).toBeGreaterThan(computeSpikeScore(overSelf, []));
    // Self-reported top scope/rarity/strength is downgraded one notch, so it must
    // equal the already-capped claim rather than exceed it.
    const capped = computeSpikeScore([ec(1, 'International', 'Ultra_Rare', 'Prestigious', 'Research_Level', 'Self_Reported', 'Leadership_Government')], []);
    expect(computeSpikeScore(overSelf, [])).toBeCloseTo(capped, 5);
  });

  it('end-to-end: verified > self-reported > honest, and the liar barely beats the honest student', () => {
    const pVerified = calculateAdmissionProbability(prof({ extracurriculars: overVerified }), 'Test University', college, [], stats).pointEstimate;
    const pSelf = calculateAdmissionProbability(prof({ extracurriculars: overSelf }), 'Test University', college, [], stats).pointEstimate;
    const pHonest = calculateAdmissionProbability(prof({ extracurriculars: honest }), 'Test University', college, [], stats).pointEstimate;
    expect(pVerified).toBeGreaterThanOrEqual(pSelf);
    expect(pSelf).toBeGreaterThanOrEqual(pHonest);
    // Over-claiming while unverified must not leapfrog the honest student by much.
    expect(pSelf - pHonest).toBeLessThan(0.05);
  });
});

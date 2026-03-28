import { describe, it, expect } from 'vitest';
import { calculateAdmissionProbability } from '../lib/engine';
import { CollegeData, DatasetStats, UserProfile } from '../lib/types';

describe('Reproduction: Spike 13 Issue', () => {
  const dummyStats: DatasetStats = {
    gpa: { mean: 3.5, std: 0.5, min: 2.0, max: 4.0 },
    sat: { mean: 1200, std: 200, min: 400, max: 1600 },
    totalProfiles: 1000,
    profilesWithDecisions: 1000,
    yearRange: { min: 2020, max: 2023 },
    schoolCounts: {}
  };

  const dummyCollege: CollegeData = {
    id: 1,
    'school.name': 'Test University',
    'school.city': 'Test',
    'school.state': 'TS',
    'school.zip': '00000',
    'school.school_url': '',
    'school.ownership': 1,
    'school.degrees_awarded.predominant': 3,
    'admissions.admission_rate.overall': 0.1,
    'admissions.sat_scores.average.overall': 1400,
    'admissions.sat_scores.25th_percentile.math': 680,
    'admissions.sat_scores.25th_percentile.critical_reading': 680,
    'admissions.sat_scores.50th_percentile.math': 700,
    'admissions.sat_scores.50th_percentile.critical_reading': 700,
    'admissions.sat_scores.75th_percentile.math': 720,
    'admissions.sat_scores.75th_percentile.critical_reading': 720,
    'admissions.act_scores.25th_percentile.cumulative': 30,
    'admissions.act_scores.50th_percentile.cumulative': 32,
    'admissions.act_scores.75th_percentile.cumulative': 34,
    'cost.tuition.in_state': 10000,
    'cost.tuition.out_of_state': 20000,
    'cost.avg_net_price.overall': 15000,
    'student.size': 5000,
    'student.demographics.race_ethnicity.non_resident_alien': 0.05,
    'earnings.10_yrs_after_entry.median': 60000,
    rank: 10,
    early_deadline: null,
    early_deadline_type: null,
    regular_deadline: null,
    tuition: null,
    room_and_board: null,
    average_cost_after_aid: null,
    majorCompetitiveness: {
      CS: 0, STEM: 0, HumSoc: 0, Arts: 0, Business: 0, PreMed: 0, Other: 0
    }
  };

  const baseProfile: UserProfile = {
    name: 'Top Tier Student',
    isInternational: false,
    schoolSystem: 'US_Standard',
    intendedMajor: 'CS',
    majorCategory: 'CS',
    state: 'CA',
    gender: 'Male',
    sat: 1600,
    act: null,
    preferredTestType: 'SAT',
    unweightedGPA: 4.0,
    weightedGPA: 4.5,
    numberOfAPCourses: 10,
    numberOfHonorsCourses: 10,
    numberOfIBCourses: 0,
    extracurriculars: [],
    awards: [],
    targetSchools: ['Test University'],
    targetColleges: ['Test University']
  };

  it('verifies that spike score is capped/flattened for multiple high-tier outliers', () => {
    const profileWith2Outliers: UserProfile = {
      ...baseProfile,
      extracurriculars: [
        { 
          title: 'Outlier 1', description: '', tier: 0, tierLevel: 'National', 
          rarity: 'Rare', externalValidation: 'Institutional',
          institutionalStrength: 'Prestigious', cognitiveLoad: 'High',
          category: 'Computer_Science', confidence: 100
        },
        { 
          title: 'Outlier 2', description: '', tier: 0, tierLevel: 'National', 
          rarity: 'Rare', externalValidation: 'Institutional',
          institutionalStrength: 'Prestigious', cognitiveLoad: 'High',
          category: 'Computer_Science', confidence: 100
        }
      ]
    };

    const profileWith4Outliers: UserProfile = {
      ...profileWith2Outliers,
      extracurriculars: [
        ...profileWith2Outliers.extracurriculars,
        { 
          title: 'Outlier 3', description: '', tier: 0, tierLevel: 'National', 
          rarity: 'Rare', externalValidation: 'Institutional',
          institutionalStrength: 'Prestigious', cognitiveLoad: 'High',
          category: 'STEM_Research', confidence: 100
        },
        { 
          title: 'Outlier 4', description: '', tier: 0, tierLevel: 'National', 
          rarity: 'Rare', externalValidation: 'Institutional',
          institutionalStrength: 'Prestigious', cognitiveLoad: 'High',
          category: 'STEM_Research', confidence: 100
        }
      ]
    };

    const result2 = calculateAdmissionProbability(profileWith2Outliers, 'Test University', dummyCollege, [], dummyStats);
    const result4 = calculateAdmissionProbability(profileWith4Outliers, 'Test University', dummyCollege, [], dummyStats);

    console.log(`Spike Score (2 Outliers): ${result2.spikeScore.toFixed(2)}`);
    console.log(`Spike Score (4 Outliers): ${result4.spikeScore.toFixed(2)}`);

    // Expect they are HIGHER than before and DIFFERENT
    expect(result4.spikeScore).toBeGreaterThan(result2.spikeScore);
    expect(result4.spikeScore).toBeLessThanOrEqual(15.0);
  });
});

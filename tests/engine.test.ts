import { describe, it, expect } from 'vitest';
import { calculateAdmissionProbability } from '../lib/engine';
import { CollegeData, DatasetStats, UserProfile } from '../lib/types';

describe('Engine: calculateAdmissionProbability', () => {
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
    name: 'Test Student',
    isInternational: false,
    schoolSystem: 'US_Standard',
    intendedMajor: 'CS',
    majorCategory: 'CS',
    state: 'CA',
    gender: 'Male',
    sat: 1500,
    act: null,
    preferredTestType: 'SAT',
    unweightedGPA: 3.9,
    weightedGPA: 4.2,
    numberOfAPCourses: 5,
    numberOfIBCourses: 0,
    numberOfHonorsCourses: 5,
    extracurriculars: [],
    awards: [],
    targetSchools: ['Test University'],
    targetColleges: ['Test University']
  };

  it('computes valid probability bounds and outputs EngineResult', () => {
    const result = calculateAdmissionProbability(baseProfile, 'Test University', dummyCollege, [], dummyStats);
    expect(result.pointEstimate).toBeGreaterThan(0);
    expect(result.pointEstimate).toBeLessThan(1);
    expect(result.low).toBeGreaterThanOrEqual(0);
    expect(result.high).toBeLessThanOrEqual(1);
    expect(result.low).toBeLessThanOrEqual(result.high);
    expect(result.schoolName).toBe('Test University');
    expect(typeof result.rawScore).toBe('number');
  });

  it('triggers OUTLIER protocol correctly and sets disclaimer', () => {
    const outlierProfile: UserProfile = {
      ...baseProfile,
      extracurriculars: [
        { 
          title: 'Global Math Competition Winner', 
          description: 'Placed 1st globally', 
          tier: 0, 
          tierLevel: 'International', 
          rarity: 'Unique', 
          externalValidation: 'Professional_Audit',
          institutionalStrength: 'World_Class',
          cognitiveLoad: 'Research_Level',
          category: 'Mathematics',
          confidence: 100
        },
        { 
          title: 'Science Fair Grand Prize', 
          description: 'Top prize', 
          tier: 0, 
          tierLevel: 'National', 
          rarity: 'Ultra_Rare',
          externalValidation: 'Institutional',
          institutionalStrength: 'Prestigious',
          cognitiveLoad: 'High',
          category: 'STEM_Research',
          confidence: 100
        }
      ],
      awards: [
        { 
          title: 'USAMO Gold', 
          description: '', 
          tier: 1, 
          tierLevel: 'National', 
          rarity: 'Ultra_Rare',
          externalValidation: 'Institutional',
          institutionalStrength: 'Prestigious',
          cognitiveLoad: 'High',
          category: 'Mathematics',
          confidence: 100
        }
      ]
    };

    const result = calculateAdmissionProbability(outlierProfile, 'Test University', dummyCollege, [], dummyStats);
    expect(result.protocolTriggered === 'OUTLIER' || result.protocolTriggered === 'GAME_MAKER').toBe(true);
    expect(result.spikeScore).toBeGreaterThanOrEqual(8);
  });

  it('handles edge case: minimal data graceful fallback (missing SAT, low GPA)', () => {
    const noAcademicProfile: UserProfile = {
      ...baseProfile,
      sat: null,
      act: null,
      unweightedGPA: 0.0
    };

    const result = calculateAdmissionProbability(noAcademicProfile, 'Test University', dummyCollege, [], dummyStats);
    expect(result.pointEstimate).toBeGreaterThanOrEqual(0);
    expect(result.pointEstimate).toBeLessThan(1);
    expect(result.confidenceLevel).toBeDefined();
  });

  it('handles division by zero robustly for dataset stats', () => {
    const badStats = {
      ...dummyStats,
      gpa: { mean: 0, std: 0, min: 0, max: 4.0 }
    };

    const result = calculateAdmissionProbability(baseProfile, 'Test University', dummyCollege, [], badStats);
    expect(Number.isNaN(result.pointEstimate)).toBe(false);
  });

  it('strictly gates weak academics regardless of high impact (Gated Multiplicative Model)', () => {
    const weakAcademicProfile: UserProfile = {
      ...baseProfile,
      sat: 400, // Z-score ≈ -4
      unweightedGPA: 1.5, // Z-score ≈ -4
      extracurriculars: [
        { 
          title: 'Nobel Prize Winner', 
          description: 'Solved world peace', 
          tier: -1,
          category: 'Other',
          tierLevel: 'Global_Elite',
          rarity: 'Unique',
          externalValidation: 'Professional_Audit',
          institutionalStrength: 'World_Class',
          cognitiveLoad: 'Research_Level',
          confidence: 100
        },
        { 
          title: 'Olympic Gold', 
          description: '', 
          tier: -1,
          category: 'Athletics',
          tierLevel: 'Global_Elite',
          rarity: 'Unique',
          externalValidation: 'Professional_Audit',
          institutionalStrength: 'World_Class',
          cognitiveLoad: 'High',
          confidence: 100
        }
      ],
      awards: [
        { 
          title: 'Fields Medal', 
          description: '', 
          tier: -1,
          category: 'Mathematics',
          tierLevel: 'Global_Elite',
          rarity: 'Unique',
          externalValidation: 'Professional_Audit',
          institutionalStrength: 'World_Class',
          cognitiveLoad: 'Research_Level',
          confidence: 100
        }
      ]
    };

    const result = calculateAdmissionProbability(weakAcademicProfile, 'Test University', dummyCollege, [], dummyStats);
    
    // Even with ridiculously high spike features, the hard Gate(Academic Z < -2) = 0.01.
    // Impact is clamped to max 0.8.
    // Final P = Gate * Impact ≈ 0.008.
    expect(result.pointEstimate).toBeLessThanOrEqual(0.05);
  });
});

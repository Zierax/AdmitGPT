import { describe, it, expect } from 'vitest';
import { calculateAdmissionProbability } from '../lib/engine';
import { CollegeData, DatasetStats, UserProfile, StudentProfile } from '../lib/types';

describe('Engine v1.0: Comprehensive Logic Tests', () => {
  const dummyStats: DatasetStats = {
    gpa: { mean: 3.7, std: 0.3, min: 2.0, max: 4.0 },
    sat: { mean: 1350, std: 150, min: 400, max: 1600 },
    totalProfiles: 5000,
    profilesWithDecisions: 4500,
    yearRange: { min: 2021, max: 2024 },
    schoolCounts: {}
  };

  const ivyCollege: CollegeData = {
    id: 1,
    'school.name': 'Elite University',
    'school.city': 'Cambridge',
    'school.state': 'MA',
    'school.zip': '02138',
    'school.school_url': '',
    'school.ownership': 1,
    'school.degrees_awarded.predominant': 3,
    'admissions.admission_rate.overall': 0.04,
    'admissions.sat_scores.average.overall': 1520,
    'admissions.sat_scores.25th_percentile.math': 740,
    'admissions.sat_scores.25th_percentile.critical_reading': 740,
    'admissions.sat_scores.50th_percentile.math': 770,
    'admissions.sat_scores.50th_percentile.critical_reading': 770,
    'admissions.sat_scores.75th_percentile.math': 800,
    'admissions.sat_scores.75th_percentile.critical_reading': 800,
    'admissions.act_scores.25th_percentile.cumulative': 33,
    'admissions.act_scores.50th_percentile.cumulative': 34,
    'admissions.act_scores.75th_percentile.cumulative': 36,
    'cost.tuition.in_state': 55000,
    'cost.tuition.out_of_state': 55000,
    'cost.avg_net_price.overall': 18000,
    'student.size': 7000,
    'student.demographics.race_ethnicity.non_resident_alien': 0.12,
    'earnings.10_yrs_after_entry.median': 95000,
    rank: 2,
    early_deadline: null,
    early_deadline_type: null,
    regular_deadline: null,
    tuition: null,
    room_and_board: null,
    average_cost_after_aid: null,
    majorCompetitiveness: {
      CS: 0.7, STEM: 0.85, HumSoc: 1.1, Arts: 1.0, Business: 0.75, PreMed: 0.65, Other: 1.0
    }
  };

  const baseProfile: UserProfile = {
    name: 'Test Student',
    isInternational: false,
    schoolSystem: 'US_Standard',
    intendedMajor: 'CS',
    majorCategory: 'CS',
    state: 'NY',
    gender: 'Female',
    sat: 1580,
    act: null,
    preferredTestType: 'SAT',
    unweightedGPA: 3.95,
    weightedGPA: 4.5,
    numberOfAPCourses: 10,
    numberOfIBCourses: 0,
    numberOfHonorsCourses: 8,
    extracurriculars: [],
    awards: [],
    targetSchools: ['Elite University'],
    targetColleges: ['Elite University']
  };

  const mockStudents: StudentProfile[] = [
    {
      id: 1, createdat: '', year: 2023, flair: [],
      demographics: { gender: 'M', race_ethnicity: 'W', intended_major: 'Computer Science', residence: 'CA', income_bracket: 'H', type_of_school: 'P', hooks: null, isInternational: false, schoolSystem: 'US_Standard' },
      academics: { sat: '1580', act: null, unweighted_gpa: 4.0, weighted_gpa: 4.5, rank: null, number_of_ap_courses: 10, number_of_ib_courses: 0, number_of_honors_courses: 5, ib: null, ap_testing: [] },
      extracurricular_activities: [], awards: [], letters_of_recommendation: [], interviews: [], essays: { common_app_essay: { topic_overview: null }, supplemental_essays: { topic_overview: null } },
      decisions: { acceptances: ['Elite University'], waitlists: [], rejections: [] },
      tags: [], assigned_category: 'test', rating: { academic_score: 9, extracurricular_score: 8, awards_score: 8, overall_score: 85 }
    },
    {
      id: 2, createdat: '', year: 2023, flair: [],
      demographics: { gender: 'F', race_ethnicity: 'A', intended_major: 'Computer Science', residence: 'NY', income_bracket: 'M', type_of_school: 'S', hooks: null, isInternational: false, schoolSystem: 'US_Standard' },
      academics: { sat: '1550', act: null, unweighted_gpa: 3.9, weighted_gpa: 4.4, rank: null, number_of_ap_courses: 8, number_of_ib_courses: 0, number_of_honors_courses: 4, ib: null, ap_testing: [] },
      extracurricular_activities: [], awards: [], letters_of_recommendation: [], interviews: [], essays: { common_app_essay: { topic_overview: null }, supplemental_essays: { topic_overview: null } },
      decisions: { acceptances: [], waitlists: [], rejections: ['Elite University'] },
      tags: [], assigned_category: 'test', rating: { academic_score: 8, extracurricular_score: 7, awards_score: 7, overall_score: 75 }
    },
    {
      id: 3, createdat: '', year: 2023, flair: [],
      demographics: { gender: 'M', race_ethnicity: 'H', intended_major: 'History', residence: 'TX', income_bracket: 'L', type_of_school: 'S', hooks: null, isInternational: false, schoolSystem: 'US_Standard' },
      academics: { sat: '1450', act: null, unweighted_gpa: 3.8, weighted_gpa: 4.2, rank: null, number_of_ap_courses: 5, number_of_ib_courses: 0, number_of_honors_courses: 3, ib: null, ap_testing: [] },
      extracurricular_activities: [], awards: [], letters_of_recommendation: [], interviews: [], essays: { common_app_essay: { topic_overview: null }, supplemental_essays: { topic_overview: null } },
      decisions: { acceptances: ['Elite University'], waitlists: [], rejections: [] },
      tags: [], assigned_category: 'test', rating: { academic_score: 7, extracurricular_score: 6, awards_score: 6, overall_score: 65 }
    }
  ];

  it('verifies Major-Specific Competitiveness scaling', () => {
    // With 1 acceptance and 1 rejection for CS, and 1 acceptance for History, History should have a higher modifier
    const csResult = calculateAdmissionProbability(baseProfile, 'Elite University', ivyCollege, mockStudents, dummyStats);

    const humSocProfile: UserProfile = { ...baseProfile, intendedMajor: 'History', majorCategory: 'HumSoc' };
    const humSocResult = calculateAdmissionProbability(humSocProfile, 'Elite University', ivyCollege, mockStudents, dummyStats);

    expect(humSocResult.pointEstimate).toBeGreaterThan(csResult.pointEstimate);
  });

  it('detects International Anomalies and provides disclaimer', () => {
    const intlProfile: UserProfile = {
      ...baseProfile,
      isInternational: true,
      schoolSystem: 'National_Non_Standard'
    };

    const result = calculateAdmissionProbability(intlProfile, 'Elite University', ivyCollege, [], dummyStats);
    expect(result.outlierClassification).toBe('DATA_ANOMALY');
    expect(result.disclaimer).toBeDefined();
  });

  it('enforces Gated Multiplicative Model (Hard Academic Gates)', () => {
    const weakAcademics: UserProfile = {
      ...baseProfile,
      sat: 800, // Very low
      unweightedGPA: 2.0, // Low
      extracurriculars: [
        {
          title: 'Global Impact Founder',
          description: 'Impact: Millions',
          tier: -1,
          category: 'Business_Entrepreneurship',
          tierLevel: 'Global_Elite',
          rarity: 'Unique',
          externalValidation: 'Professional_Audit',
          institutionalStrength: 'World_Class',
          cognitiveLoad: 'Research_Level',
          confidence: 100
        }
      ]
    };

    const gatedResult = calculateAdmissionProbability(weakAcademics, 'Elite University', ivyCollege, [], dummyStats);

    // High spike but low academics should be gated hard (< 5%)
    expect(gatedResult.pointEstimate).toBeLessThan(0.05);
  });

  it('verifies Diversity "Renaissance" Bonus logic', () => {
    const specialist: UserProfile = {
      ...baseProfile,
      extracurriculars: [
        {
          title: 'STEM Award',
          description: '',
          tier: 1,
          category: 'Computer_Science',
          tierLevel: 'National',
          rarity: 'Rare',
          externalValidation: 'Institutional',
          institutionalStrength: 'Recognized',
          cognitiveLoad: 'Medium',
          confidence: 100
        }
      ]
    };

    const polymath: UserProfile = {
      ...baseProfile,
      extracurriculars: [
        {
          title: 'STEM Award',
          description: '',
          tier: 1,
          category: 'Computer_Science',
          tierLevel: 'National',
          rarity: 'Rare',
          externalValidation: 'Institutional',
          institutionalStrength: 'Recognized',
          cognitiveLoad: 'Medium',
          confidence: 100
        },
        {
          title: 'Art Award',
          description: '',
          tier: 1,
          category: 'Arts_Creative',
          tierLevel: 'National',
          rarity: 'Rare',
          externalValidation: 'Institutional',
          institutionalStrength: 'Recognized',
          cognitiveLoad: 'Medium',
          confidence: 100
        },
        {
          title: 'Sports MVP',
          description: '',
          tier: 1,
          category: 'Athletics',
          tierLevel: 'National',
          rarity: 'Rare',
          externalValidation: 'Institutional',
          institutionalStrength: 'Recognized',
          cognitiveLoad: 'Medium',
          confidence: 100
        }
      ]
    };

    const res1 = calculateAdmissionProbability(specialist, 'Elite University', ivyCollege, [], dummyStats);
    const res2 = calculateAdmissionProbability(polymath, 'Elite University', ivyCollege, [], dummyStats);

    // Polymath should have higher spike score due to category depth
    expect(res2.spikeScore).toBeGreaterThan(res1.spikeScore);
  });
});

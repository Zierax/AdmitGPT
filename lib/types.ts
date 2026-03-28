// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AdmitGPT — Core Type Definitions v1.0
// Every type here mirrors the actual data files
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── Student Data (from studentsdata.json) ──

export interface StudentProfile {
    id: number;
    createdat: string;
    year: number;
    flair: string[];
    demographics: {
        gender: string | null;
        race_ethnicity: string | null;
        intended_major: string | null;
        residence: string | null;
        income_bracket: string | null;
        type_of_school: string | null;
        hooks: string | null;
        /** Whether the student is international */
        isInternational: boolean;
        /** The school system the student comes from */
        schoolSystem: 'US_Standard' | 'Intl_Standard' | 'National_Non_Standard';
    };
    academics: {
        sat: string | null;
        act: string | null;
        unweighted_gpa: number | null;
        weighted_gpa: number | null;
        rank: string | null;
        number_of_ap_courses: number | null;
        number_of_ib_courses: number | null;
        number_of_honors_courses: number | null;
        ib: string | null;
        ap_testing: string[];
    };
    extracurricular_activities: {
        title: string;
        description: string | null;
        /** The classified tier of the activity. null if unclassified in dataset. */
        tier: ECTier | null;
    }[];
    awards: string[];
    letters_of_recommendation: {
        recommender: string;
        relationship_and_quality: string;
    }[];
    interviews: (string | null)[];
    essays: {
        common_app_essay: { topic_overview: string | null };
        supplemental_essays: { topic_overview: string | null;[key: string]: string | null };
    };
    decisions: {
        acceptances: string[] | null;
        waitlists: string[] | null;
        rejections: string[] | null;
    };
    tags: string[];
    assigned_category: string;
    rating: {
        academic_score: number;
        extracurricular_score: number;
        awards_score: number;
        overall_score: number;
    };
}

// ── College Data (from collegesdata.json) ──

export interface CollegeData {
    id: number;
    "school.name": string;
    "school.city": string;
    "school.state": string;
    "school.zip": string;
    "school.school_url": string;
    "school.ownership": number;
    "school.degrees_awarded.predominant": number;
    "admissions.admission_rate.overall": number | null;
    "admissions.sat_scores.average.overall": number | null;
    "admissions.sat_scores.25th_percentile.math": number | null;
    "admissions.sat_scores.25th_percentile.critical_reading": number | null;
    "admissions.sat_scores.50th_percentile.math": number | null;
    "admissions.sat_scores.50th_percentile.critical_reading": number | null;
    "admissions.sat_scores.75th_percentile.math": number | null;
    "admissions.sat_scores.75th_percentile.critical_reading": number | null;
    "admissions.act_scores.25th_percentile.cumulative": number | null;
    "admissions.act_scores.50th_percentile.cumulative": number | null;
    "admissions.act_scores.75th_percentile.cumulative": number | null;
    "cost.tuition.in_state": number | null;
    "cost.tuition.out_of_state": number | null;
    "cost.avg_net_price.overall": number | null;
    "student.size": number | null;
    "student.demographics.race_ethnicity.non_resident_alien": number | null;
    "earnings.10_yrs_after_entry.median": number | null;
    rank: number | null;
    early_deadline: string | null;
    early_deadline_type: string | null;
    regular_deadline: string | null;
    tuition: string | null;
    room_and_board: string | null;
    average_cost_after_aid: string | null;
    /** Modifiers for major competitiveness (e.g. STEM at CMU = -0.5) */
    majorCompetitiveness: Record<MajorCategory, number>;
    [key: string]: unknown;
}

// ── Utility Types ──

export interface NormalizedScores {
    /** Always in SAT scale (400-1600). ACT converted via concordance table. */
    normalizedSAT: number;
    source: 'SAT' | 'ACT_CONVERTED' | 'NONE';
}

// ── Granular Rubric Parameters (v1.0) ──

export type TierLevel = 'Local' | 'National' | 'International' | 'Global_Elite';
export type ExternalValidation = 'Self_Reported' | 'Peer_Vouched' | 'Institutional' | 'Professional_Audit';
export type RarityLevel = 'Common' | 'Rare' | 'Ultra_Rare' | 'Unique';
export type InstitutionalStrength = 'Standard' | 'Recognized' | 'Prestigious' | 'World_Class';
export type CognitiveLoad = 'Low' | 'Medium' | 'High' | 'Research_Level';

export type ActivityCategory =
    | 'STEM_Research'
    | 'Engineering'
    | 'Computer_Science'
    | 'Mathematics'
    | 'Business_Entrepreneurship'
    | 'Arts_Creative'
    | 'Music_Performing'
    | 'Athletics'
    | 'Community_Service'
    | 'Leadership_Government'
    | 'Writing_Journalism'
    | 'Debate_MUN'
    | 'Medicine_Health'
    | 'Environmental'
    | 'Cultural'
    | 'Other';

// ── User Input ──

export type ECTier = -1 | 0 | 1 | 2 | 3; // -1 = Game Maker, 0 = Outlier

export interface UserEC {
    title: string;
    description: string;
    tier: ECTier;
    /** Category of the activity for cross-field diversity */
    category: ActivityCategory;
    /** Tier level: Local/National/International/Global Elite */
    tierLevel: TierLevel;
    /** External validation type */
    externalValidation: ExternalValidation;
    /** Rarity */
    rarity: RarityLevel;
    /** Institutional Strength of the hosting organization */
    institutionalStrength: InstitutionalStrength;
    /** Cognitive Load / Depth of engagement */
    cognitiveLoad: CognitiveLoad;
    /** Confidence slider 0-100 */
    confidence: number;
}

export interface UserAward {
    title: string;
    description: string;
    tier: ECTier;
    /** Category of the award for cross-field diversity */
    category: ActivityCategory;
    /** Tier level: Local/National/International/Global Elite */
    tierLevel: TierLevel;
    /** External validation type */
    externalValidation: ExternalValidation;
    /** Rarity */
    rarity: RarityLevel;
    /** Institutional Strength of the awarding organization */
    institutionalStrength: InstitutionalStrength;
    /** Cognitive Load / Depth of engagement */
    cognitiveLoad: CognitiveLoad;
    /** Confidence slider 0-100 */
    confidence: number;
}

export type MajorCategory = 'CS' | 'STEM' | 'HumSoc' | 'Arts' | 'Business' | 'PreMed' | 'Other';

// ── Outlier Classification (v1.0) ──

export type OutlierClassification =
    | 'NON_CONFORMIST_VISIONARY'     // Spike > 8 | Low GPA/SAT
    | 'STRATEGIC_ELITE_SCHOLAR'       // Spike > 6.5 | High GPA/SAT
    | 'RADICAL_IMPACT_ARCHITECT'      // Spike > 12 | Any Academic Baseline
    | 'ABSOLUTE_INTELLIGENCE_PHENOMENON' // Spike > 14 | The Black Swan
    | 'DATA_ANOMALY'                   // International Non-Standard or Insufficient Data
    | 'STANDARD';                     // Normal profile

export interface OutlierProfile {
    classification: OutlierClassification;
    designTheme: string;
    message: string;
    spikeScore: number;
    gpaScore: number | null;
    satScore: number | null;
}

export interface UserProfile {
    name: string;
    github?: string;
    instagram?: string;
    linkedin?: string;
    // Step 1: Demographics
    isInternational: boolean;
    schoolSystem: 'US_Standard' | 'Intl_Standard' | 'National_Non_Standard';
    intendedMajor: string;
    majorCategory: MajorCategory;
    state: string;
    gender: string;

    // Step 2: Academics
    sat: number | null;
    act: number | null;
    /** User preferred test type to use for calculations */
    preferredTestType: 'SAT' | 'ACT' | 'None';
    unweightedGPA: number | null;
    weightedGPA: number | null;
    numberOfAPCourses: number;
    numberOfIBCourses: number;
    numberOfHonorsCourses: number;

    // Step 3: Extracurriculars
    extracurriculars: UserEC[];

    // Step 4: Awards & Essay
    awards: UserAward[];
    essay?: string;

    // Step 5: School list
    targetSchools: string[];
    /** List of college names the user is applying to */
    targetColleges: string[];
}

// ── Engine Output ──

export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'insufficient';

export interface ConfidenceResult {
    n: number;
    level: ConfidenceLevel;
    rangeWidth: number;
    label: string;
}

export interface EngineResult {
    schoolName: string;
    low: number;
    high: number;
    pointEstimate: number;
    confidenceLevel: ConfidenceLevel;
    confidenceLabel: string;
    sampleN: number;
    competitionNote: string | null;
    academicZScore: number;
    satZ: number;
    gpaZ: number;
    spikeScore: number;
    majorModifier: number;
    /** The exact Intl_Mod value applied. 0 if domestic. */
    intlModifier: number;
    /** The protocol that was triggered for this result */
    protocolTriggered: 'GAME_MAKER' | 'OUTLIER' | 'STANDARD';
    rawScore: number;
    disclaimer?: string;
    /** Outlier classification for this result */
    outlierClassification?: OutlierClassification;
    /** Number of unique activity/award categories (for cross-field diversity) */
    diversityFieldCount?: number;
}

export interface PortfolioResult {
    atLeastOne: { low: number; high: number; point: number };
    expectedAcceptances: number;
}

// ── Gap Analyzer Output ──

export interface GapDelta {
    field: string;
    yours: string;
    theirs: string;
    gap: string;
    closeable: boolean;
}

export interface NearestNeighbor {
    profile: StudentProfile;
    distance: number;
    outcome: 'accepted' | 'rejected';
    deltas: GapDelta[];
}

export interface GapAnalysis {
    schoolName: string;
    clusterSize: number;
    majorCategory: MajorCategory;
    nearestAccepted: NearestNeighbor | null;
    nearestRejected: NearestNeighbor | null;
    improvementImpact: {
        field: string;
        currentRange: { low: number; high: number };
        improvedRange: { low: number; high: number };
        description: string;
    }[];
    encouragementMessage: string;
}

// ── AI Mode ──

export type AIProvider = 'gemini' | 'openai' | 'groq';

export interface AIConfig {
    provider: AIProvider;
    apiKey: string;
    model: string;
}

export interface AIAnalysis {
    schoolName: string;
    sharperEstimate: string;
    decisionDecider: string;
    actionPlan: string;
    reasoning: string;
}

// ── Dataset Stats (computed at load time) ──

export interface DatasetStats {
    gpa: { mean: number; std: number; min: number; max: number };
    sat: { mean: number; std: number; min: number; max: number };
    totalProfiles: number;
    profilesWithDecisions: number;
    yearRange: { min: number; max: number };
    schoolCounts: Record<string, { total: number; accepted: number; rejected: number }>;
}

export interface SuggestionResults {
    reach: EngineResult[];
    target: EngineResult[];
    safety: EngineResult[];
}

// ── Cryptographic Signature ──

export interface CertificateSignature {
    s: number; // Spike Score
    c: number; // Classification Code
    d: string; // Date (YYYY-MM-DD)
    u: string; // UUID (truncated)
    f: number; // Diversity Field Count
    p?: number; // Public Details (1: show, 0: hide)
    n?: string; // Student Name (truncated)
}

// ── Invitation Types ──

export interface OutlierInvitation {
    name: string;
    email: string;
    profileLinks: string;
    spikeScore: number;
}

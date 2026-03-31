// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AdmitGPT — Mathematical Probability Engine v1
// No black boxes. Every formula is public.
// Note:- you came to check my logic, if you found something broken or not working as The app said please send me an email, dont expose it on public, That's for the students not for me.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import {
    UserProfile, StudentProfile, CollegeData, DatasetStats,
    EngineResult, ConfidenceResult, ConfidenceLevel, ECTier, MajorCategory,
    UserEC, UserAward, OutlierClassification, ActivityCategory,
    TierLevel, ExternalValidation,
    RarityLevel,
    InstitutionalStrength,
    CognitiveLoad,
} from './types';
import { classifyMajor, findCollege } from './dataLoader';

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 8 — PERFORMANCE: Memoized Sigmoid
// ═══════════════════════════════════════════════════════════════════════════════

const sigmoidCache = new Map<number, number>();

/**
 * Compute sigmoid function with memoization for performance.
 * Cached keyed on Math.round(x * 1000) for ~3 decimal precision.
 */
function sigmoid(x: number): number {
    const key = Math.round(x * 1000);
    const cached = sigmoidCache.get(key);
    if (cached !== undefined) return cached;
    const result = 1 / (1 + Math.exp(-x));
    sigmoidCache.set(key, result);
    return result;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — SPIKE SCORE CALCULATION (v1.0 — Granular Rubric)
// Formula: S = Σ(Wi × Ti × Ri) × Ci + DiversityBonus
// Where:
//   Wi = Base weight of activity
//   Ti = Tier multiplier (1x Local → 8x Global Elite)
//   Ri = Rarity index (percentage-based exponential)
//   Ci = User-reported confidence (0.0 to 1.0)
//   DiversityBonus = bonus for cross-field outlier achievements
// ═══════════════════════════════════════════════════════════════════════════════

const TIER_POINTS: Record<ECTier, number> = {
    [-1]: 8.0,  // GAME_MAKER — max 1 counted
    [0]: 4.0,  // OUTLIER    — max 4 counted (Increased from 2)
    [1]: 2.0,  // TIER_1     — max 5 counted (Increased from 1.5)
    [2]: 0.6,  // TIER_2     — max 4 counted
    [3]: 0.1,  // TIER_3     — max 5 counted
};

const TIER_CAPS: Record<ECTier, number> = {
    [-1]: 1,
    [0]: 4, // Increased from 2 to allow more elite achievements to count
    [1]: 5, // Increased from 3
    [2]: 4,
    [3]: 5,
};

const TIER_LABELS: Record<ECTier, string> = {
    [-1]: 'GAME_MAKER (Tier -1)',
    [0]: 'OUTLIER (Tier 0)',
    [1]: 'TIER_1',
    [2]: 'TIER_2',
    [3]: 'TIER_3',
};

/** Tier Level multiplier: scope of achievement */
const TIER_LEVEL_MULTIPLIER: Record<TierLevel, number> = {
    'Local': 1.0,
    'National': 3.0,
    'International': 5.0,
    'Global_Elite': 8.0,
};

/** External Validation confidence weight */
const VALIDATION_WEIGHT: Record<ExternalValidation, number> = {
    'Self_Reported': 0.6,
    'Peer_Vouched': 0.75,
    'Institutional': 0.9,
    'Professional_Audit': 1.0,
};

/** Rarity exponential spike factor */
const RARITY_FACTOR: Record<RarityLevel, number> = {
    'Common': 1.0,       // 100%
    'Rare': 1.8,         // <10%
    'Ultra_Rare': 3.5,   // <1%
    'Unique': 6.0,       // 0.01%
};

/** Institutional Strength prestige factor */
const INSTITUTIONAL_STRENGTH_FACTOR: Record<InstitutionalStrength, number> = {
    'Standard': 1.0,
    'Recognized': 1.25,
    'Prestigious': 1.6,
    'World_Class': 2.2,
};

/** Cognitive Load depth metric */
const COGNITIVE_LOAD_FACTOR: Record<CognitiveLoad, number> = {
    'Low': 0.8,
    'Medium': 1.0,
    'High': 1.4,
    'Research_Level': 1.8,
};

function groupBy<T, K extends string | number>(
    arr: T[],
    keyFn: (item: T) => K,
): Record<K, T[]> {
    return arr.reduce((acc, item) => {
        const key = keyFn(item);
        if (!acc[key]) acc[key] = [];
        acc[key].push(item);
        return acc;
    }, {} as Record<K, T[]>);
}

/**
 * Count unique activity/award categories for cross-field diversity bonus.
 */
function countUniqueCategories(extracurriculars: UserEC[], awards: UserAward[]): number {
    const categories = new Set<ActivityCategory>();
    for (const ec of extracurriculars) {
        if (ec.category) categories.add(ec.category);
    }
    for (const aw of awards) {
        if (aw.category) categories.add(aw.category);
    }
    return categories.size;
}

/**
 * Compute cross-field diversity bonus.
 * Students with outlier achievements across multiple fields get a bonus.
 * 3 fields: +0.5, 4 fields: +1.0, 5+ fields: +1.5 (capped)
 */
function computeDiversityBonus(extracurriculars: UserEC[], awards: UserAward[]): number {
    // Group items by category and find the highest tier weight in each
    const categoryWeights = new Map<ActivityCategory, number>();

    const processItem = (item: { category: ActivityCategory; tier: ECTier }) => {
        if (!item.category) return;
        const currentWeight = categoryWeights.get(item.category) || 0;
        // Tier 3: 0.2, Tier 2: 0.5, Tier 1: 1.0, Tier 0: 1.5, Tier -1: 2.5
        const weightMap: Record<ECTier, number> = { '-1': 2.5, '0': 1.5, '1': 1.0, '2': 0.5, '3': 0.2 };
        const itemWeight = weightMap[item.tier] || 0;
        if (itemWeight > currentWeight) {
            categoryWeights.set(item.category, itemWeight);
        }
    };

    extracurriculars.forEach(processItem);
    awards.forEach(processItem);

    // Sum the weights of the top 4 categories
    const sortedWeights = Array.from(categoryWeights.values()).sort((a, b) => b - a);
    const topWeights = sortedWeights.slice(0, 4);
    const totalDiversityWeight = topWeights.reduce((sum, w) => sum + w, 0);

    // Scaled diversity bonus: Reward breadth across fields
    if (totalDiversityWeight >= 8.0) return 3.5; // Increased from 3.0
    if (totalDiversityWeight >= 5.0) return 2.5; // Increased from 2.0
    if (totalDiversityWeight >= 3.0) return 1.5; // Increased from 1.0
    if (totalDiversityWeight >= 1.5) return 0.8; // Increased from 0.5
    return 0;
}

/** 
 * Depth bonus for multiple items in the same category 
 */
function computeDepthBonus(items: { category: ActivityCategory; tier: ECTier }[]): number {
    const counts = new Map<ActivityCategory, number>();
    items.forEach(i => {
        if (!i.category || i.tier > 1) return; // Only count high tiers (Outlier, Tier 1)
        counts.set(i.category, (counts.get(i.category) || 0) + 1);
    });

    let depthBonus = 0;
    counts.forEach(count => {
        if (count > 1) depthBonus += (count - 1) * 0.2; // +0.2 per additional high-tier item in same field
    });
    return Math.min(depthBonus, 1.5);
}

/**
 * Enhanced Spike Score v1.0:
 * S = Σ(Wi × Ti × Ri) × Ci + DiversityBonus
 * With tier caps still enforced to prevent inflation.
 */
export function computeSpikeScore(extracurriculars: UserEC[], awards: UserAward[]): number {
    const allItems = [
        ...extracurriculars.map(e => ({
            tier: e.tier,
            tierLevel: e.tierLevel,
            rarity: e.rarity,
            validation: e.externalValidation,
            strength: e.institutionalStrength,
            load: e.cognitiveLoad,
            confidence: e.confidence
        })),
        ...awards.map(a => ({
            tier: a.tier,
            tierLevel: a.tierLevel,
            rarity: a.rarity,
            validation: a.externalValidation,
            strength: a.institutionalStrength,
            load: a.cognitiveLoad,
            confidence: a.confidence
        })),
    ];

    // Group by tier for cap enforcement
    const grouped = groupBy(allItems, t => t.tier);
    let total = 0;

    for (const [tierStr, items] of Object.entries(grouped)) {
        const tier = Number(tierStr) as ECTier;
        const cap = TIER_CAPS[tier];
        // Sort by impact descending so we keep the best ones within cap
        const sorted = items.sort((a, b) => {
            const scoreA = TIER_POINTS[tier] * TIER_LEVEL_MULTIPLIER[a.tierLevel || 'Local'] * RARITY_FACTOR[a.rarity || 'Common'];
            const scoreB = TIER_POINTS[tier] * TIER_LEVEL_MULTIPLIER[b.tierLevel || 'Local'] * RARITY_FACTOR[b.rarity || 'Common'];
            return scoreB - scoreA;
        });

        const counted = sorted.slice(0, cap);
        for (const item of counted) {
            const W = TIER_POINTS[tier];
            const T = TIER_LEVEL_MULTIPLIER[item.tierLevel || 'Local'];
            const R = RARITY_FACTOR[item.rarity || 'Common'];
            const P = INSTITUTIONAL_STRENGTH_FACTOR[item.strength || 'Standard'];
            const D = COGNITIVE_LOAD_FACTOR[item.load || 'Medium'];
            const V = VALIDATION_WEIGHT[item.validation || 'Self_Reported'];
            const C = Math.max(0, Math.min(1, (item.confidence ?? 100) / 100));

            // CORE FORMULA: S = Σ(W × T × R × P × D × V) × C
            const itemBase = W * T * R * P * D * V;

            // SATURATION LOGIC: Prevent "infinite" scores while rewarding extreme outliers.
            // Items start to hit diminishing returns after 10.0 base points.
            const itemContribution = (itemBase > 10.0 ? 10.0 + Math.sqrt(itemBase - 10.0) : itemBase) * C;

            // SCALING FACTOR: 3.5 -> 5.5
            // Increased to create more "room" for differentiation at the top end.
            total += itemContribution / 5.5;
        }
    }

    // Add diversity & depth bonus
    const diversityBonus = computeDiversityBonus(extracurriculars, awards);
    const combinedItems = [
        ...extracurriculars.map(e => ({ category: e.category, tier: e.tier })),
        ...awards.map(a => ({ category: a.category, tier: a.tier }))
    ];
    const depthBonus = computeDepthBonus(combinedItems);

    total += diversityBonus + depthBonus;

    return total;
}

/**
 * Classify the outlier profile based on spike score and academic baseline.
 */
export function classifyOutlier(
    spikeScore: number,
    gpa: number | null,
    sat: number | null,
    isInternational: boolean = false,
    schoolSystem: string = 'US_Standard',
    sampleN: number = 10,
): OutlierClassification {
    // Priority 1: Data Anomalies
    if (isInternational && schoolSystem === 'National_Non_Standard') return 'DATA_ANOMALY';
    if (sampleN === 0) return 'DATA_ANOMALY';

    const isLowAcademic = (gpa !== null && gpa < 3.0) || (sat !== null && sat < 1200);
    const isHighAcademic = (gpa !== null && gpa >= 3.7) && (sat === null || sat >= 1400);

    // The Black Swan — Absolute Intelligence Phenomenon
    if (spikeScore > 13.5) return 'ABSOLUTE_INTELLIGENCE_PHENOMENON';
    // Radical Impact Architect — any academic baseline
    if (spikeScore > 12) return 'RADICAL_IMPACT_ARCHITECT';
    // Non-Conformist Visionary — high spike, low academics
    if (spikeScore > 8 && isLowAcademic) return 'NON_CONFORMIST_VISIONARY';
    // Strategic Elite Scholar — good spike, high academics
    if (spikeScore > 6.5 && isHighAcademic) return 'STRATEGIC_ELITE_SCHOLAR';
    // Non-Conformist for spike > 8 even with mid academics
    if (spikeScore > 8) return 'NON_CONFORMIST_VISIONARY';

    return 'STANDARD';
}

/** Get the theme design info for an outlier classification */
export function getOutlierTheme(classification: OutlierClassification): { theme: string; message: string; color: string; description: string } {
    switch (classification) {
        case 'NON_CONFORMIST_VISIONARY':
            return {
                theme: 'Cyberpunk / Glitch Art',
                color: 'text-[var(--color-accent)]',
                description: 'The "Broken Rule" anomaly. Your profile defies standard academic correlation. You represent high-impact execution outside of institutional constraints.',
                message: 'The traditional education system is designed to measure compliance, not brilliance. Your AdmitGPT results reveal a "Genius Gap" — your academic numbers fail to capture your true capacity.'
            };
        case 'STRATEGIC_ELITE_SCHOLAR':
            return {
                theme: 'Modern Minimalist / Swiss Style',
                color: 'text-[var(--color-primary)]',
                description: 'The "Perfect Trajectory" archetype. You have optimized both the institutional baseline and the high-impact outlier metrics simultaneously.',
                message: 'You represent "Normative Perfection" blended with extraordinary passion. You have successfully tamed the traditional system while maintaining your creative soul.'
            };
        case 'RADICAL_IMPACT_ARCHITECT':
            return {
                theme: 'Brutalist / Industrial',
                color: 'text-[var(--color-danger)]',
                description: 'The "System Disruptor" anomaly. You do not just participate in fields; you reshape their architecture. Your spike reflects world-class depth.',
                message: 'You are a rare statistical anomaly. Your Spike indicates a restless mental energy and the capacity for structural impact in your field.'
            };
        case 'ABSOLUTE_INTELLIGENCE_PHENOMENON':
            return {
                theme: 'Dark Classical / Ethereal',
                color: 'text-[var(--color-danger)]',
                description: 'The "Black Swan" event. A statistical outlier so extreme it transcends standard predictive models. You possess 0.01% execution power.',
                message: 'To the mind that transcends boundaries: Your results place you in the 0.01%. You are not just a high-achiever; you are a Phenomenon.'
            };
        case 'DATA_ANOMALY':
            return {
                theme: 'Error / Glitch',
                color: 'text-[var(--color-warning)]',
                description: 'Insufficient data or non-standard academic system. Cannot classify outlier profile accurately.',
                message: 'We need more data or a standard academic context to classify your outlier profile.'
            };
        case 'STANDARD':
            return {
                theme: 'Standard',
                color: 'text-[var(--color-muted)]',
                description: 'Standard competitive profile.',
                message: ''
            };
    }
}

function countByTier(
    extracurriculars: UserEC[],
    awards: UserAward[],
): {
    gameMakerCount: number;
    outlierCount: number;
    tier1Count: number;
    tier2Count: number;
    tier3Count: number;
    gameChangerCount: number;
    extremeOutlierCount: number;
} {
    const allTiers = [
        ...extracurriculars.map(e => e.tier),
        ...awards.map(a => a.tier),
    ];

    const basicCounts = {
        gameMakerCount: allTiers.filter(t => t === -1).length,
        outlierCount: allTiers.filter(t => t === 0).length,
        tier1Count: allTiers.filter(t => t === 1).length,
        tier2Count: allTiers.filter(t => t === 2).length,
        tier3Count: allTiers.filter(t => t === 3).length,
    };

    // Quality-based counting for extreme outliers
    let gameChangerCount = 0;
    let extremeOutlierCount = 0;

    // Count game changers (exceptional Tier 1 achievements)
    const allAchievements = [
        ...extracurriculars.map(e => ({ ...e, type: 'ec' as const })),
        ...awards.map(a => ({ ...a, type: 'award' as const })),
    ];

    for (const achievement of allAchievements) {
        if (achievement.tier === 1) {
            // Check if this Tier 1 achievement is exceptional (game changer)
            const description = achievement.type === 'ec' ? achievement.description : '';
            const isGameChanger = isGameChangerAchievement(achievement.title, description);
            if (isGameChanger) {
                gameChangerCount++;
            }
        }
    }

    // Extreme outlier detection: Multiple high-tier achievements
    const totalHighTier = basicCounts.gameMakerCount + basicCounts.outlierCount + gameChangerCount;
    if (totalHighTier >= 3) {
        extremeOutlierCount = totalHighTier;
    } else if (totalHighTier >= 2 && (basicCounts.tier1Count >= 4)) {
        extremeOutlierCount = totalHighTier;
    }

    return {
        ...basicCounts,
        gameChangerCount,
        extremeOutlierCount,
    };
}

/**
 * Determines if a Tier 1 achievement qualifies as a "game changer"
 * Game changers are significantly more impressive than typical Tier 1 achievements
 */
function isGameChangerAchievement(title: string, description: string): boolean {
    const titleUpper = title.toUpperCase();
    const descUpper = description.toUpperCase();

    // Game changer keywords that indicate exceptional achievement
    const gameChangerKeywords = [
        'INTERNATIONAL OLYMPIAD', 'INTERNATIONAL SCIENCE FAIR', 'ISEF GRAND',
        'NATIONAL AWARD', 'PRESIDENTIAL SCHOLAR', 'FULL RIDE',
        'NATIONAL MERIT', 'USAMO', 'USACO', 'PUTNAM',
        'RESEARCH PUBLISHED', 'PATENT', 'TED TALK',
        'FORBES 30 UNDER 30', 'TIME 100', 'WHITE HOUSE',
        'CONGRESSIONAL AWARD', 'NATIONAL DEBATE CHAMPION',
        'INTERNATIONAL COMPETITION', 'WORLD CHAMPIONSHIP',
        'GRAND PRIZE', 'GOLD MEDAL', 'FIRST PLACE NATIONAL'
    ];

    // Check title and description for game changer indicators
    for (const keyword of gameChangerKeywords) {
        if (titleUpper.includes(keyword) || descUpper.includes(keyword)) {
            return true;
        }
    }

    // Additional heuristics for game changers
    if (titleUpper.includes('NATIONAL') &&
        (titleUpper.includes('CHAMPION') || titleUpper.includes('WINNER') || titleUpper.includes('FINALIST'))) {
        return true;
    }

    if (titleUpper.includes('INTERNATIONAL') &&
        (titleUpper.includes('MEDAL') || titleUpper.includes('FINALIST') || titleUpper.includes('TOP'))) {
        return true;
    }

    // Research achievements with significant impact
    if ((titleUpper.includes('RESEARCH') || titleUpper.includes('PUBLISHED')) &&
        (descUpper.includes('JOURNAL') || descUpper.includes('CONFERENCE') || descUpper.includes('PEER REVIEWED'))) {
        return true;
    }

    return false;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — ACT → SAT CONCORDANCE
// ═══════════════════════════════════════════════════════════════════════════════

const ACT_TO_SAT_TABLE: Record<number, number> = {
    36: 1590, 35: 1540, 34: 1500, 33: 1460, 32: 1430,
    31: 1400, 30: 1370, 29: 1340, 28: 1310, 27: 1280,
    26: 1240, 25: 1210, 24: 1180, 23: 1140, 22: 1110,
    21: 1080, 20: 1040, 19: 1010, 18: 970, 17: 930,
};

const ACT_FLOOR_SCORE = 880;

function actToSATConcordance(act: number): number {
    if (act >= 36) return ACT_TO_SAT_TABLE[36];
    if (act <= 16) return ACT_FLOOR_SCORE;
    return ACT_TO_SAT_TABLE[act] ?? ACT_FLOOR_SCORE;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 9 — TIER CLASSIFICATION GUARD
// ═══════════════════════════════════════════════════════════════════════════════

const GAME_MAKER_KEYWORDS = [
    'TIME_100', 'OLYMPIC_MEDAL', 'FORBES_30U30',
    'ISEF_GRAND', 'NOBEL', 'FIELDS_MEDAL', 'WHITE_HOUSE_APPOINTMENT',
];

const OUTLIER_KEYWORDS = [
    'IEEE', 'NATURE_PAPER', 'DEFCON', 'BLACK_HAT',
    'CVE_CRITICAL', 'PATENT', 'STARTUP_ACQUISITION',
];

function sanitizeTier(label: string, tier: ECTier): ECTier {
    const upperLabel = label.toUpperCase();

    if (tier === -1) {
        for (const keyword of OUTLIER_KEYWORDS) {
            if (upperLabel.includes(keyword)) {
                console.warn(`[sanitizeTier] Correcting ${label} from GAME_MAKER (-1) to OUTLIER (0)`);
                return 0;
            }
        }
    }

    if (tier === 0) {
        for (const keyword of GAME_MAKER_KEYWORDS) {
            if (upperLabel.includes(keyword)) {
                console.warn(`[sanitizeTier] ${label} matches GAME_MAKER keyword ${keyword} but is tier 0 — manual review needed`);
            }
        }
    }

    return tier;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ACADEMIC Z-SCORE CALCULATIONS
// ═══════════════════════════════════════════════════════════════════════════════

function computeSATZScore(userSAT: number, college: CollegeData): number {
    const sat25Math = college['admissions.sat_scores.25th_percentile.math'];
    const sat75Math = college['admissions.sat_scores.75th_percentile.math'];
    const sat25Read = college['admissions.sat_scores.25th_percentile.critical_reading'];
    const sat75Read = college['admissions.sat_scores.75th_percentile.critical_reading'];
    const satAvg = college['admissions.sat_scores.average.overall'];

    // satAvg is already a 1600-scale combined score.
    // Fallback: sum of math section midpoints approximates combined average.
    const collegeSATAvg: number | null =
        satAvg ??
        (sat25Math != null && sat75Math != null
            ? sat25Math + sat75Math   // sum of two section midpoints ≈ combined mean
            : null);

    if (!collegeSATAvg) return 0;

    // Combined 25th/75th for IQR-based std estimate.
    // FIX: fallback was ±40 → std ≈ 29 (impossibly narrow). ±100 → std ≈ 148,
    // consistent with real SAT combined score distributions.
    const sat25Total: number =
        (sat25Math != null && sat25Read != null)
            ? sat25Math + sat25Read
            : collegeSATAvg - 100;

    const sat75Total: number =
        (sat75Math != null && sat75Read != null)
            ? sat75Math + sat75Read
            : collegeSATAvg + 100;

    const iqr = sat75Total - sat25Total;
    const stdEstimate = iqr > 0 ? iqr / 1.35 : 100;

    return (userSAT - collegeSATAvg) / stdEstimate;
}

function computeGPAZScore(userGPA: number, stats: DatasetStats): number {
    if (stats.gpa.std === 0) return 0;
    return (userGPA - stats.gpa.mean) / stats.gpa.std;
}

/** 
 * Academic_Z = (SAT_Z × 0.55) + (GPA_Z × 0.45) 
 * If SAT is missing (test-optional), GPA carries 100% of the weight with a small structural penalty.
 */
function computeAcademicZScore(satZ: number | null, gpaZ: number): number {
    if (satZ === null) {
        // Without standardized testing to verify, unweighted GPA carries total risk
        return gpaZ - 0.2; // Slight uncertainty penalty for missing test score
    }
    return (satZ * 0.55) + (gpaZ * 0.45);
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7 — REGIONAL NORMALIZATION
// ═══════════════════════════════════════════════════════════════════════════════

function applyRegionalNormalization(
    gpaZ: number,
    profile: UserProfile,
    gameMakerCount: number,
): number {
    if (profile.isInternational && profile.schoolSystem === 'National_Non_Standard') {
        if (gameMakerCount >= 1) {
            // Zero-Knowledge Override: top percentile assumed for Game Makers
            return 2.0;
        }
        // Rigor Compensation Bonus for national curriculum deflation
        return gpaZ + 0.4;
    }
    return gpaZ;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODIFIER CALCULATIONS
// ═══════════════════════════════════════════════════════════════════════════════

function normalizeSchoolName(name: string | null | undefined): string {
    if (!name) return '';
    return name.toLowerCase().trim()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ');
}

function computeMajorModifier(
    majorCategory: MajorCategory,
    collegeName: string,
    students: StudentProfile[],
): number {
    const normalizedCollege = normalizeSchoolName(collegeName);
    if (!normalizedCollege) return 1.0;

    const allApplied = students.filter(s => {
        const accepted = (s.decisions.acceptances ?? []).filter(Boolean);
        const rejected = (s.decisions.rejections ?? []).filter(Boolean);
        return (
            accepted.some(a => normalizeSchoolName(a) === normalizedCollege) ||
            rejected.some(r => normalizeSchoolName(r) === normalizedCollege)
        );
    });

    if (allApplied.length < 3) return 1.0;

    const sameMajorApplied = allApplied.filter(s => {
        const sMajorCat = classifyMajor(s.demographics.intended_major ?? '');
        return sMajorCat === majorCategory;
    });

    if (sameMajorApplied.length < 2) return 1.0;

    const overallAccepted = allApplied.filter(s =>
        (s.decisions.acceptances ?? [])
            .filter(Boolean)
            .some(a => normalizeSchoolName(a) === normalizedCollege),
    ).length;
    const overallRate = overallAccepted / allApplied.length;

    const majorAccepted = sameMajorApplied.filter(s =>
        (s.decisions.acceptances ?? [])
            .filter(Boolean)
            .some(a => normalizeSchoolName(a) === normalizedCollege),
    ).length;
    const majorRate = majorAccepted / sameMajorApplied.length;

    if (overallRate === 0) return 1.0;

    const modifier = majorRate / overallRate;
    return Math.max(0.5, Math.min(1.5, modifier));
}

function computeIntlModifier(isInternational: boolean, college: CollegeData): number {
    if (!isInternational) return 0;
    const alienRate = college['student.demographics.race_ethnicity.non_resident_alien'];
    if (!alienRate) return -0.2;
    return (alienRate / 0.10) * 0.1 - 0.3;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIDENCE SCORING
// ═══════════════════════════════════════════════════════════════════════════════

function isLikelyInternational(student: StudentProfile): boolean {
    const residence = (student.demographics.residence ?? '').toLowerCase();
    return /international|abroad|foreign|india|china|korea|uk|canada|nigeria|pakistan|bangladesh|nepal|ghana|kenya|brazil|mexico|turkey|vietnam|philippines|iran|egypt|japan|germany|france|taiwan|hong kong|singapore|malaysia|indonesia|thailand|saudi|uae|qatar|emirates|africa|europe|asia|south america|middle east/i
        .test(residence);
}

function computeConfidence(
    profile: UserProfile,
    collegeName: string,
    students: StudentProfile[],
): ConfidenceResult {
    const userSAT = profile.sat ?? (profile.act ? actToSATConcordance(profile.act) : null);
    const normalizedCollege = normalizeSchoolName(collegeName);

    // EDGE CASE: Empty or invalid dataset
    if (!students || students.length === 0) {
        return {
            n: 0,
            level: 'insufficient',
            rangeWidth: 0.30,
            label: 'DATASET_EMPTY — No student data available. Requires AI analysis.'
        };
    }

    // EDGE CASE: Profile with no academic data
    if (!userSAT && !profile.unweightedGPA) {
        return {
            n: 0,
            level: 'insufficient',
            rangeWidth: 0.28,
            label: 'ACADEMIC_DATA_MISSING — No SAT/ACT or GPA provided. Requires AI analysis.'
        };
    }

    // EDGE CASE: Extreme academic outliers (SAT > 1600 or GPA > 4.0)
    if (userSAT && (userSAT > 1600 || userSAT < 400)) {
        return {
            n: 0,
            level: 'insufficient',
            rangeWidth: 0.27,
            label: 'EXTREME_SAT_OUTLIER — SAT score outside valid range. Requires AI analysis.'
        };
    }

    if (profile.unweightedGPA && (profile.unweightedGPA > 4.0 || profile.unweightedGPA < 0)) {
        return {
            n: 0,
            level: 'insufficient',
            rangeWidth: 0.27,
            label: 'EXTREME_GPA_OUTLIER — GPA outside valid range. Requires AI analysis.'
        };
    }

    // First attempt: Find strictly similar profiles
    const similar = students.filter(s => {
        const applied = [
            ...(s.decisions.acceptances ?? []).filter(Boolean),
            ...(s.decisions.rejections ?? []).filter(Boolean),
        ];
        if (!applied.some(a => normalizeSchoolName(a) === normalizedCollege)) return false;

        if (userSAT) {
            let studentSAT: number | null = null;
            if (s.academics.sat) studentSAT = parseInt(s.academics.sat, 10);
            else if (s.academics.act) studentSAT = actToSATConcordance(parseInt(s.academics.act, 10));
            if (studentSAT && Math.abs(studentSAT - userSAT) > 120) return false;
        }

        const sMajor = classifyMajor(s.demographics.intended_major ?? '');
        if (sMajor !== profile.majorCategory) return false;

        if (isLikelyInternational(s) !== profile.isInternational) return false;

        return true;
    });

    const n = similar.length;

    if (n >= 25) return { n, level: 'high', rangeWidth: 0.08, label: `Based on ${n} similar profiles — high confidence` };
    if (n >= 12) return { n, level: 'medium', rangeWidth: 0.12, label: `Based on ${n} similar profiles — moderate confidence` };
    if (n >= 5) return { n, level: 'low', rangeWidth: 0.18, label: `Only ${n} similar profiles found — treat as estimate` };

    // EDGE CASE: Extremely competitive major (e.g., Computer Science at elite schools)
    const eliteMajors: MajorCategory[] = ['CS', 'STEM', 'Business'];
    const eliteSchools = ['mit', 'stanford', 'harvard', 'princeton', 'yale', 'caltech'];
    const isEliteSchool = eliteSchools.some(name => normalizedCollege.includes(name));
    const isEliteMajor = eliteMajors.includes(profile.majorCategory);

    if (isEliteSchool && isEliteMajor && n < 3) {
        return {
            n: n,
            level: 'insufficient',
            rangeWidth: 0.25,
            label: `ELITE_COMBO_OUTLIER — Only ${n} similar profiles for elite school + major combo. Requires AI analysis.`
        };
    }

    // INSUFFICIENT SIMILAR PROFILES: Use awards and activities ratings as fallback
    // BUG FIX: Previously compared student.rating to itself instead of user profile.
    // Now uses a proxy user rating derived from spike score and academic data.
    const userProxyRating = computeSpikeScore(profile.extracurriculars, profile.awards) * 6
        + (profile.unweightedGPA ?? 3.0) * 10
        + ((profile.sat ?? 1000) / 1600) * 30;

    const fallbackSimilar = students.filter(s => {
        const applied = [
            ...(s.decisions.acceptances ?? []).filter(Boolean),
            ...(s.decisions.rejections ?? []).filter(Boolean),
        ];
        if (!applied.some(a => normalizeSchoolName(a) === normalizedCollege)) return false;

        // Use rating-based similarity
        const studentRating = (s.rating?.overall_score ?? 0);

        // Match within 20 points of overall rating
        if (Math.abs(userProxyRating - studentRating) > 20) return false;

        // Still match major category
        const sMajor = classifyMajor(s.demographics.intended_major ?? '');
        if (sMajor !== profile.majorCategory) return false;

        return true;
    });

    const fallbackN = fallbackSimilar.length;

    if (fallbackN >= 8) {
        return {
            n: fallbackN,
            level: 'low',
            rangeWidth: 0.20,
            label: `Using ${fallbackN} profiles with similar achievement ratings — low confidence`
        };
    }

    // EDGE CASE: Profile with extreme achievement count - updated logic
    const tierCounts = countByTier(profile.extracurriculars, profile.awards);
    const totalOutlierAchievements = tierCounts.gameMakerCount + tierCounts.outlierCount + tierCounts.gameChangerCount;
    const spikeScore = computeSpikeScore(profile.extracurriculars, profile.awards);

    // Only mark as outlier if has at least 2 outlier achievements AND spike score >= 12
    if (totalOutlierAchievements >= 2 && spikeScore >= 12) {
        return {
            n: 0,
            level: 'insufficient',
            rangeWidth: 0.26,
            label: 'ACHIEVEMENT_COUNT_OUTLIER — Exceptional achievement profile with spike score. Requires AI analysis.'
        };
    }

    // EDGE CASE: International student with non-standard system AND no similar profiles
    if (profile.isInternational && profile.schoolSystem === 'National_Non_Standard' && fallbackN < 3) {
        return {
            n: 0,
            level: 'insufficient',
            rangeWidth: 0.28,
            label: 'INTERNATIONAL_NONSTANDARD_OUTLIER — No similar international profiles with non-standard system. Requires AI analysis.'
        };
    }

    // NO SIMILAR PROFILES: Return special indicator
    return {
        n: 0,
        level: 'insufficient',
        rangeWidth: 0.25,
        label: 'No comparable profiles found. Requires AI analysis.'
    };
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — OUTLIER PROTOCOL & SECTION 4 — GAME MAKER SHORT-CIRCUIT
// ═══════════════════════════════════════════════════════════════════════════════

type ProtocolType = 'GAME_MAKER' | 'OUTLIER' | 'STANDARD';

interface WeightConfig {
    academicWeight: number;
    spikeWeight: number;
}

function determineProtocol(
    gameMakerCount: number,
    outlierCount: number,
    spikeScore: number,
    academicZ: number
): {
    protocol: ProtocolType;
    weights: WeightConfig;
    adjustedSpikeScore: number;
    confidenceLabel: string;
} {
    // BUG FIX: Hard Academic Gate
    // Academic baseline cannot be circumvented trivially. 
    // If Z < -1.5, you are academically excluded from elite tiers.
    const isAcademicallyWeak = academicZ < -1.5;

    // SECTION 4 — GAME MAKER SHORT-CIRCUIT
    if (gameMakerCount >= 1) {
        // Even for a Game Maker, if academics are severely deficient, 
        // weight is larger to pull down the score securely.
        const acWeight = isAcademicallyWeak ? 0.40 : 0.10;

        return {
            protocol: 'GAME_MAKER',
            // BUG FIX: Spike Weight scaled to 0.35 Logit modifier (so 15.0 * 0.35 = 5.25 logit max)
            weights: { academicWeight: acWeight, spikeWeight: 0.35 },
            adjustedSpikeScore: 15.0,
            confidenceLabel: 'GLOBAL_ASSET_DETECTED',
        };
    }

    // SECTION 3 — OUTLIER PROTOCOL
    if (outlierCount >= 1) {
        // BUG FIX: Outlier Protocol invalidated as a "Cheat Code"
        // If academically weak, Outlier protocol doesn't reduce academic penalty. 
        // It maintains full 1.0 weight on academics so it acts as a hard gate.
        const acWeight = isAcademicallyWeak ? 1.0 : 0.65;

        // Spike multiplier removed. Flat weight scaled to realistic logit space.
        const spWeight = 0.28;

        return {
            protocol: 'OUTLIER',
            weights: { academicWeight: acWeight, spikeWeight: spWeight },
            adjustedSpikeScore: spikeScore,
            confidenceLabel: 'OUTLIER_PROTOCOL_ACTIVE',
        };
    }

    return {
        protocol: 'STANDARD',
        // Spike scaled to logit parameter ~0.22 => max +3.3 logit
        weights: { academicWeight: 0.90, spikeWeight: 0.22 },
        adjustedSpikeScore: spikeScore,
        confidenceLabel: '',
    };
}

/**
 * Apply Outlier Protocol probability floor and range adjustments.
 * SECTION 3B: floor applied BEFORE range width calculation.
 */
function applyOutlierAdjustments(
    pointEstimate: number,
    baseRangeWidth: number,
    admissionRate: number,
): { pointEstimate: number; rangeWidth: number; low: number; high: number } {
    // SECTION 3B: floor first
    const flooredPoint = Math.max(pointEstimate, 0.18);

    // SECTION 3C: school-aware range width
    const rangeWidth = admissionRate > 0.30
        ? baseRangeWidth * 1.1
        : baseRangeWidth * 1.4;

    const low = Math.max(flooredPoint - rangeWidth, 0.15);
    const high = Math.min(flooredPoint + rangeWidth, 0.95);

    return { pointEstimate: flooredPoint, rangeWidth, low, high };
}

/**
 * Apply GAME_MAKER protocol final probability adjustments.
 *
 * FIX (root cause of "99% at MIT" bug): the original implementation used a flat
 * 85–98% clamp for EVERY school regardless of selectivity. A student with SAT 1200
 * and GPA 2.30 was returned 98% at MIT because the school's admission rate was
 * never consulted. This function now derives floor and ceiling from the school's
 * admission rate so that elite schools (< 10%) have meaningfully lower bounds than
 * open schools (> 50%), while still reflecting the substantial uplift a
 * GAME_MAKER achievement provides.
 *
 * School tier → [floor, ceiling]:
 *   Elite     (< 10%):  [0.45, 0.75]
 *   Selective (10–25%): [0.60, 0.85]
 *   Moderate  (25–50%): [0.72, 0.92]
 *   Open      (> 50%):  [0.82, 0.98]
 */
function applyGameMakerAdjustments(
    rawPoint: number,
    admissionRate: number,
): { pointEstimate: number; low: number; high: number } {
    let floor: number;
    let ceiling: number;

    if (admissionRate < 0.10) {
        floor = 0.45; ceiling = 0.75;
    } else if (admissionRate < 0.25) {
        floor = 0.60; ceiling = 0.85;
    } else if (admissionRate < 0.50) {
        floor = 0.72; ceiling = 0.92;
    } else {
        floor = 0.82; ceiling = 0.98;
    }

    const pointEstimate = Math.max(floor, Math.min(ceiling, rawPoint));
    return { pointEstimate, low: floor, high: ceiling };
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — MASTER FORMULA
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Calculate admission probability for a single college.
 *
 * Raw_Score = Base_Logit
 *           + (Academic_Z × Academic_Weight)
 *           + (Spike_Score × Spike_Weight)
 *           + Major_Mod
 *           + Intl_Mod
 *
 * P(x) = sigmoid(Raw_Score)
 */
export function calculateAdmissionProbability(
    profile: UserProfile,
    collegeName: string,
    college: CollegeData,
    students: StudentProfile[],
    stats: DatasetStats,
): EngineResult {
    // EDGE CASE: Invalid college data
    if (!college || !college['school.name']) {
        throw new Error(`Invalid college data for ${collegeName}`);
    }

    // EDGE CASE: Missing admission rate
    const admissionRate = college['admissions.admission_rate.overall'];
    if (!admissionRate || admissionRate <= 0 || admissionRate > 1) {
        // Use conservative default rate
        college['admissions.admission_rate.overall'] = 0.5;
    }

    // ── Test scores ──
    let userSAT = profile.sat ?? undefined;
    if (userSAT === undefined && profile.act != null) {
        userSAT = actToSATConcordance(profile.act);
    }

    // EDGE CASE: Clamp SAT to valid range
    if (userSAT) {
        userSAT = Math.max(400, Math.min(1600, userSAT));
    }

    const userGPA = profile.unweightedGPA;

    // EDGE CASE: Clamp GPA to valid range
    const clampedGPA = userGPA ? Math.max(0, Math.min(4.0, userGPA)) : null;

    // ── Sanitize and count tiers ──
    const sanitizedECs = profile.extracurriculars.map(ec => ({
        ...ec,
        tier: sanitizeTier(ec.title, ec.tier),
    }));
    const sanitizedAwards = profile.awards.map(award => ({
        ...award,
        tier: sanitizeTier(award.title, award.tier),
    }));

    const tierCounts = countByTier(sanitizedECs, sanitizedAwards);

    // ── Spike score ──
    const spikeScore = computeSpikeScore(sanitizedECs, sanitizedAwards);

    // ── Academic Z-scores ──
    let gpaZ = clampedGPA != null ? computeGPAZScore(clampedGPA, stats) : 0;

    // EDGE CASE: Handle invalid stats
    if (!stats || !stats.gpa || stats.gpa.std === 0) {
        gpaZ = 0;
    }

    gpaZ = applyRegionalNormalization(gpaZ, profile, tierCounts.gameMakerCount);

    const satZ = userSAT != null ? computeSATZScore(userSAT, college) : null;
    const academicZ = computeAcademicZScore(satZ, gpaZ);

    // EDGE CASE: Clamp extreme Z-scores
    const clampedAcademicZ = Math.max(-4, Math.min(4, academicZ));

    // ── Protocol ──
    const protocolConfig = determineProtocol(
        tierCounts.gameMakerCount,
        tierCounts.outlierCount,
        spikeScore,
        clampedAcademicZ // Ensure hard gate parameter is passed
    );

    // ── Modifiers ──
    const majorModRaw = computeMajorModifier(profile.majorCategory, collegeName, students);
    const majorMod = (majorModRaw - 1) * 0.5; // centre around 0
    const intlMod = computeIntlModifier(profile.isInternational, college);

    // ── Master Formula (GATED MULTIPLICATIVE ARCHITECTURE) ──
    const baseRate = college['admissions.admission_rate.overall'] ?? 0.5;
    const baseLogit = Math.log(baseRate / (1 - baseRate));

    // 1. Gate Function (Hard Filter)
    let gateScore: number;
    if (clampedAcademicZ < -2) {
        gateScore = 0.01;
    } else if (clampedAcademicZ < -1) {
        gateScore = 0.05;
    } else if (clampedAcademicZ < 0) {
        gateScore = 0.15;
    } else {
        gateScore = sigmoid(clampedAcademicZ);
    }

    // 2. Impact Function (Independent Amplifier)
    // College selectivity (baseLogit) acts as friction against the impact
    const impactWeightedSum = baseLogit
        + (protocolConfig.adjustedSpikeScore * protocolConfig.weights.spikeWeight)
        + majorMod
        + intlMod;

    // Clamp Impact strictly to [0, 0.8] to prevent it exceeding gate dominance
    const rawImpactScore = sigmoid(impactWeightedSum);
    const impactScore = Math.max(0, Math.min(0.8, rawImpactScore));

    // 3. Final Multiplicative Probability
    const rawPointEstimate = gateScore * impactScore;

    // Compute deterministic proxy rawScore to satisfy JSON export contract constraints
    const proxyRawScore = Math.max(-10, Math.log(rawPointEstimate / (1 - rawPointEstimate + 0.000001)));
    const rawScore = proxyRawScore;

    // ── Confidence ──
    const confidence = computeConfidence(profile, collegeName, students);

    // ── Protocol-specific final adjustments ──
    let pointEstimate = Math.min(0.99, Math.max(0.01, rawPointEstimate));
    let low: number;
    let high: number;
    let confidenceLabel: string;

    // Use pure Gate * Impact model. Static floors from older architectures are removed 
    // to strictly enforce the Academic Gate dominance limits.
    if (protocolConfig.protocol === 'GAME_MAKER') {
        const rangeWidth = confidence.rangeWidth * 1.5; // Wider confidence range handles volatility
        low = Math.max(0.01, pointEstimate - rangeWidth);
        high = Math.min(0.99, pointEstimate + rangeWidth);
        confidenceLabel = protocolConfig.confidenceLabel;

    } else if (protocolConfig.protocol === 'OUTLIER') {
        const rangeWidth = confidence.rangeWidth * 1.25;
        low = Math.max(0.01, pointEstimate - rangeWidth);
        high = Math.min(0.99, pointEstimate + rangeWidth);
        confidenceLabel = protocolConfig.confidenceLabel;

    } else {
        low = Math.max(0.01, pointEstimate - confidence.rangeWidth);
        high = Math.min(0.99, pointEstimate + confidence.rangeWidth);
        confidenceLabel = confidence.label;
    }

    // EDGE CASE: Ensure probability bounds are logical
    const finalLow = Math.max(0.001, Math.min(pointEstimate, low));
    const finalHigh = Math.max(pointEstimate, Math.min(0.999, high));
    const finalPoint = Math.max(finalLow, Math.min(finalHigh, pointEstimate));

    // Classify outlier profile
    const outlierClass = classifyOutlier(
        protocolConfig.adjustedSpikeScore,
        profile.unweightedGPA,
        userSAT ?? null,
        profile.isInternational,
        profile.schoolSystem,
        confidence.n
    );

    let disclaimer: string | undefined;
    if (protocolConfig.adjustedSpikeScore >= 12.0 || protocolConfig.protocol === 'OUTLIER' || protocolConfig.protocol === 'GAME_MAKER' || outlierClass === 'DATA_ANOMALY') {
        disclaimer = outlierClass === 'DATA_ANOMALY'
            ? "Insufficient comparable data points for this specific profile type (International Non-Standard). Results are based on structural rigor bonuses and should be treated with extreme caution."
            : "This profile exhibits extreme outlier characteristics. The computed scores may not accurately reflect real-world outcomes due to limitations in modeling unusually high variance or spike performance. Such profiles often fall outside standard statistical bounds — this is a signal of exceptional deviation, not error.";
    }

    // Count unique categories for diversity tracking
    const diversityFieldCount = countUniqueCategories(sanitizedECs, sanitizedAwards);

    // SECTION 10: OUTPUT CONTRACT — fields must exactly match EngineResult
    return {
        schoolName: collegeName,
        pointEstimate: finalPoint,
        low: finalLow,
        high: finalHigh,
        confidenceLevel: confidence.level,
        confidenceLabel,
        competitionNote: null,
        protocolTriggered: protocolConfig.protocol,
        sampleN: confidence.n,
        rawScore: rawScore,
        academicZScore: clampedAcademicZ,
        satZ: satZ ?? 0,
        gpaZ: gpaZ,
        spikeScore: protocolConfig.adjustedSpikeScore,
        majorModifier: majorModRaw,
        intlModifier: intlMod,
        disclaimer,
        outlierClassification: outlierClass,
        diversityFieldCount,
    };
}
// SECTION 5 — ACHIEVEMENT IMPACT EVALUATOR
// ═══════════════════════════════════════════════════════════════════════════════

export function evaluateAchievementImpact(
    achievement: { tier: ECTier; label: string },
    currentProfile: UserProfile,
    college: CollegeData,
    students: StudentProfile[],
    stats: DatasetStats,
) {
    const collegeName = college['school.name'];

    // Step 1: base case (without achievement)
    const baseResult = calculateAdmissionProbability(
        currentProfile, collegeName, college, students, stats,
    );

    // Step 2: clone profile with achievement added
    const isAwardLike = /award|prize|medal|honor|scholarship/i.test(achievement.label);
    const sanitizedTier = sanitizeTier(achievement.label, achievement.tier);

    const clonedProfile: UserProfile = {
        ...currentProfile,
        extracurriculars: isAwardLike
            ? currentProfile.extracurriculars
            : [...currentProfile.extracurriculars, {
                title: achievement.label,
                description: '',
                tier: sanitizedTier,
                category: 'Other' as const,
                tierLevel: 'Local' as const,
                externalValidation: 'Self_Reported' as const,
                rarity: 'Common' as const,
                institutionalStrength: 'Standard' as const,
                cognitiveLoad: 'Medium' as const,
                confidence: 100,
            }],
        awards: isAwardLike
            ? [...currentProfile.awards, {
                title: achievement.label,
                description: '',
                tier: sanitizedTier,
                category: 'Other' as const,
                tierLevel: 'Local' as const,
                externalValidation: 'Self_Reported' as const,
                rarity: 'Common' as const,
                institutionalStrength: 'Standard' as const,
                cognitiveLoad: 'Medium' as const,
                confidence: 100,
            }]
            : currentProfile.awards,
    };

    // Step 3: re-run engine
    const newResult = calculateAdmissionProbability(
        clonedProfile, collegeName, college, students, stats,
    );

    // Step 4: deltas
    const deltaLow = newResult.low - baseResult.low;
    const deltaHigh = newResult.high - baseResult.high;
    const spikeDelta = newResult.spikeScore - baseResult.spikeScore;

    // Step 5: protocol unlock
    //
    // FIX: original code had two bugs:
    //   (a) OUTLIER → GAME_MAKER upgrade was never matched (old first branch only
    //       checked STANDARD → GAME_MAKER).
    //   (b) OUTLIER → OUTLIER (protocol already active) was returning 'OUTLIER',
    //       implying a new unlock when nothing actually changed.
    //
    // Correct logic: report 'GAME_MAKER' if the protocol moved to GAME_MAKER from
    // anything else; report 'OUTLIER' only if newly transitioning from STANDARD;
    // everything else is 'NONE'.
    const protocolUnlocked: 'GAME_MAKER' | 'OUTLIER' | 'NONE' =
        newResult.protocolTriggered === 'GAME_MAKER' && baseResult.protocolTriggered !== 'GAME_MAKER'
            ? 'GAME_MAKER'
            : newResult.protocolTriggered === 'OUTLIER' && baseResult.protocolTriggered === 'STANDARD'
                ? 'OUTLIER'
                : 'NONE';

    // Step 5 continued: impact rating
    const maxDelta = Math.max(Math.abs(deltaLow), Math.abs(deltaHigh));
    let impactRating: 'TRANSFORMATIVE' | 'HIGH' | 'MODERATE' | 'LOW';
    if (protocolUnlocked !== 'NONE' || maxDelta > 0.20) {
        impactRating = 'TRANSFORMATIVE';
    } else if (maxDelta > 0.10) {
        impactRating = 'HIGH';
    } else if (maxDelta > 0.03) {
        impactRating = 'MODERATE';
    } else {
        impactRating = 'LOW';
    }

    // Step 6: narrative
    let narrative: string;
    if (impactRating === 'TRANSFORMATIVE' && protocolUnlocked === 'OUTLIER') {
        narrative = `Adding this ${TIER_LABELS[achievement.tier]} achievement activates the Outlier Protocol, reducing academic weight by 40% and setting a 15% probability floor.`;
    } else if (impactRating === 'TRANSFORMATIVE' && protocolUnlocked === 'GAME_MAKER') {
        narrative = `Adding this ${TIER_LABELS[achievement.tier]} achievement triggers the Game Maker protocol — school-selective floors (45–82%) applied across all targets.`;
    } else if (impactRating === 'HIGH') {
        narrative = `This achievement adds ${spikeDelta.toFixed(1)} spike points, lifting your ${collegeName} estimate from ${(baseResult.pointEstimate * 100).toFixed(0)}% to ${(newResult.pointEstimate * 100).toFixed(0)}%.`;
    } else if (impactRating === 'MODERATE') {
        narrative = `This ${TIER_LABELS[achievement.tier]} achievement provides a meaningful boost to your admission chances.`;
    } else {
        narrative = `This ${TIER_LABELS[achievement.tier]} achievement adds ${spikeDelta.toFixed(1)} spike points — minimal impact at this stage of your profile.`;
    }

    return {
        label: achievement.label,
        tier: achievement.tier,
        tierLabel: TIER_LABELS[achievement.tier],
        spikeContribution: spikeDelta,
        probabilityDeltaLow: deltaLow,
        probabilityDeltaHigh: deltaHigh,
        protocolUnlocked,
        impactRating,
        narrative,
    };
}

// ═══════════════════════════════════════════════════════════════════════════════
// PORTFOLIO CALCULATIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * P(at least one acceptance) = 1 - Π(1 - P_i)
 *
 * FIX: original names prodLow/prodHigh were semantically inverted relative to
 * their construction. Renamed for clarity:
 *   rejProdWorstCase = Π(1 - r.low)  → largest rejection product → lowest "at least one"
 *   rejProdBestCase  = Π(1 - r.high) → smallest rejection product → highest "at least one"
 */
export function calculatePortfolioChance(results: EngineResult[]): {
    atLeastOne: { low: number; high: number; point: number };
    expectedAcceptances: number;
} {
    if (results.length === 0) {
        return { atLeastOne: { low: 0, high: 0, point: 0 }, expectedAcceptances: 0 };
    }

    let rejProdWorstCase = 1;
    let rejProdBestCase = 1;
    let rejProdPoint = 1;
    let expectedAcceptances = 0;

    for (const r of results) {
        rejProdWorstCase *= (1 - Math.max(0, Math.min(1, r.low)));
        rejProdBestCase *= (1 - Math.max(0, Math.min(1, r.high)));
        rejProdPoint *= (1 - Math.max(0, Math.min(1, r.pointEstimate)));
        expectedAcceptances += r.pointEstimate;
    }

    return {
        atLeastOne: {
            low: Math.max(0.01, 1 - rejProdWorstCase),
            high: Math.min(0.99, 1 - rejProdBestCase),
            point: Math.max(0.01, Math.min(0.99, 1 - rejProdPoint)),
        },
        expectedAcceptances,
    };
}

// ═══════════════════════════════════════════════════════════════════════════════
// UNIVERSITY SUGGESTION ENGINE
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Suggest universities categorized as reach, target, and safety.
 *
 * FIX: When GAME_MAKER is active, pointEstimate for every school is within
 * the school-aware GAME_MAKER band (e.g. 45–75% for elite schools). That
 * means all schools previously fell into the "safety" bucket (> 60%), causing
 * Princeton to be listed as a safety alongside community colleges.
 *
 * Correction: under GAME_MAKER protocol, categorize by school admission rate
 * (selectivity) rather than predicted probability, since the probability
 * distribution no longer discriminates meaningfully across schools.
 */
export function suggestUniversities(
    profile: UserProfile,
    colleges: CollegeData[],
    students: StudentProfile[],
    stats: DatasetStats,
): { reach: EngineResult[]; target: EngineResult[]; safety: EngineResult[] } {

    // Check if profile will trigger GAME_MAKER (need to know before categorising)
    const sanitizedECs = profile.extracurriculars.map(ec => ({ ...ec, tier: sanitizeTier(ec.title, ec.tier) }));
    const sanitizedAwards = profile.awards.map(a => ({ ...a, tier: sanitizeTier(a.title, a.tier) }));
    const { gameMakerCount } = countByTier(sanitizedECs, sanitizedAwards);
    const isGameMaker = gameMakerCount >= 1;

    const allResults: EngineResult[] = [];

    for (const college of colleges) {
        const name = college['school.name'];
        if (!name || !college['admissions.admission_rate.overall']) continue;
        if (profile.targetSchools.includes(name)) continue;

        try {
            const result = calculateAdmissionProbability(profile, name, college, students, stats);
            allResults.push(result);
        } catch {
            // Skip colleges that fail computation
        }
    }

    if (isGameMaker) {
        // Under GAME_MAKER, categorise by school admission rate (selectivity) because
        // pointEstimate no longer discriminates — it is floored by protocol.
        const getRate = (r: EngineResult): number => {
            const col = colleges.find(c => c['school.name'] === r.schoolName);
            return col?.['admissions.admission_rate.overall'] ?? 0.5;
        };
        allResults.sort((a, b) => getRate(a) - getRate(b)); // most selective first

        const reach = allResults.filter(r => getRate(r) < 0.10).slice(0, 5);
        const target = allResults.filter(r => getRate(r) >= 0.10 && getRate(r) < 0.35).slice(0, 5);
        const safety = allResults.filter(r => getRate(r) >= 0.35).slice(0, 5);
        return { reach, target, safety };
    }

    // STANDARD / OUTLIER: categorise by pointEstimate as before
    allResults.sort((a, b) => b.pointEstimate - a.pointEstimate);

    const safety = allResults.filter(r => r.pointEstimate > 0.60).slice(0, 5);
    const target = allResults.filter(r => r.pointEstimate > 0.25 && r.pointEstimate <= 0.60).slice(0, 5);
    const reach = allResults.filter(r => r.pointEstimate > 0.05 && r.pointEstimate <= 0.25).slice(0, 5);

    return { reach, target, safety };
}

// ═══════════════════════════════════════════════════════════════════════════════
// PUBLIC API — MAIN ENTRY POINT
// ═══════════════════════════════════════════════════════════════════════════════

export function runEngine(
    profile: UserProfile,
    students: StudentProfile[],
    colleges: CollegeData[],
    stats: DatasetStats,
): EngineResult[] {
    const results: EngineResult[] = [];

    for (const schoolName of profile.targetSchools) {
        const college = findCollege(colleges, schoolName);
        if (!college) continue;

        results.push(
            calculateAdmissionProbability(profile, college['school.name'], college, students, stats),
        );
    }

    results.sort((a, b) => b.pointEstimate - a.pointEstimate);
    return results;
}

// ═══════════════════════════════════════════════════════════════════════════════
// LEGACY COMPATIBILITY EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

/** @deprecated Use runEngine instead. */
export async function runEngineAsync(
    profile: UserProfile,
    students: StudentProfile[],
    colleges: CollegeData[],
    stats: DatasetStats,
): Promise<EngineResult[]> {
    return runEngine(profile, students, colleges, stats);
}

/** @deprecated Use evaluateAchievementImpact for detailed analysis. */
export interface SpikeAnalysis {
    score: number;
    domainBonus: boolean;
    dominantDomain: string | null;
    gameMakerCount: number;
    outlierCount: number;
    tier1Count: number;
    tier2Count: number;
    tier3Count: number;
    depthSignal: boolean;
    breadthSignal: boolean;
    leadershipSignal: boolean;
    researchSignal: boolean;
    ecQualityScore: number;
}
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AdmitGPT — Gap Analyzer
// Shows you exactly what separates you from
// accepted students — and what you can change.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import {
    UserProfile, StudentProfile, CollegeData, DatasetStats,
    GapAnalysis, GapDelta, NearestNeighbor, MajorCategory, EngineResult
} from './types';
import { classifyMajor, getUserSAT, actToSAT } from './dataLoader';
import { calculateAdmissionProbability } from './engine';

function normalizeSchoolName(name: string | null | undefined): string {
    if (!name) return '';
    return name.toLowerCase().trim()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ');
}

// ── Step 1: Micro-Clustering by major category ──

function getCluster(
    students: StudentProfile[],
    majorCategory: MajorCategory,
    collegeName: string
): StudentProfile[] {
    return students.filter(s => {
        const sMajor = classifyMajor(s.demographics.intended_major ?? '');
        if (sMajor !== majorCategory) return false;

        const applied = [
            ...(s.decisions.acceptances ?? []),
            ...(s.decisions.rejections ?? []),
        ];
        return applied.some(a => normalizeSchoolName(a) === normalizeSchoolName(collegeName));
    });
}

// ── Step 2: Weighted Euclidean Distance with 70% similarity threshold ──

function computeTotalScore(student: StudentProfile): number {
    let score = 0;
    
    // Academic score (40% weight)
    const satScore = student.academics.sat ? parseInt(student.academics.sat, 10) : 
                    student.academics.act ? actToSAT(parseInt(student.academics.act, 10)) : 0;
    const gpaScore = (student.academics.unweighted_gpa || 0) * 400; // Scale GPA to SAT range
    const academicScore = ((satScore ?? 0) + gpaScore) / 2;
    score += academicScore * 0.4;
    
    // Extracurricular score (35% weight)
    let ecScore = 0;
    for (const ec of student.extracurricular_activities) {
        const tier = classifyECTier(ec.title + ' ' + (ec.description ?? ''));
        ecScore += getTierPoints(tier);
    }
    score += ecScore * 0.35;
    
    // Awards score (25% weight)
    let awardScore = 0;
    for (const award of (student.awards ?? [])) {
        const tier = classifyECTier(award ?? ''); // award is a string but can be null in dataset
        awardScore += getTierPoints(tier) * 1.2; // Awards get 20% bonus
    }
    score += awardScore * 0.25;
    
    return score;
}

function getTierPoints(tier: number): number {
    switch (tier) {
        case -1: return 8; // GAME_MAKER
        case 0: return 4;  // OUTLIER
        case 1: return 2;  // TIER_1
        case 2: return 1;  // TIER_2
        case 3: return 0.5; // TIER_3
        default: return 0;
    }
}

function computeECTierScore(student: StudentProfile): number {
    let score = 0;
    for (const ec of student.extracurricular_activities) {
        const tier = classifyECTier(ec.title + ' ' + (ec.description ?? ''));
        score += getTierPoints(tier);
    }
    return score;
}

function classifyECTier(text: string | null | undefined): 1 | 2 | 3 {
    if (!text) return 3; // Default tier for null/undefined text
    const lower = text.toLowerCase();
    // Tier 1 indicators
    if (/publish|ieee|acm|conference paper|research.*journal|founded.*org|501c|olympiad|international.*competition|national.*award|national.*winner|open source.*star|patent/i.test(lower)) return 1;
    // Tier 2 indicators
    if (/president|captain|regional|state.*winner|state.*award|intern|editor.*chief|founder|head|director/i.test(lower)) return 2;
    // Tier 3 (default)
    return 3;
}

function countTier1ECs(student: StudentProfile): number {
    return student.extracurricular_activities.filter(
        ec => classifyECTier(ec.title + ' ' + (ec.description ?? '')) === 1
    ).length;
}

function countTier2ECs(student: StudentProfile): number {
    return student.extracurricular_activities.filter(
        ec => classifyECTier(ec.title + ' ' + (ec.description ?? '')) === 2
    ).length;
}

function getStudentSAT(student: StudentProfile): number | null {
    if (student.academics.sat) return parseInt(student.academics.sat, 10);
    if (student.academics.act) return actToSAT(parseInt(student.academics.act, 10));
    return null;
}

function computeDistance(
    profile: UserProfile,
    student: StudentProfile,
    satRange: number,
    gpaRange: number
): number {
    const userTotalScore = computeUserTotalScore(profile);
    const studentTotalScore = computeTotalScore(student);
    
    const maxScore = Math.max(userTotalScore, studentTotalScore, 1);
    const similarity = 1 - (Math.abs(userTotalScore - studentTotalScore) / maxScore);
    
    return 1 - similarity;
}

function computeUserTotalScore(profile: UserProfile): number {
    let score = 0;
    
    const satScore = profile.sat ?? (profile.act ? actToSAT(profile.act) : 0);
    const gpaScore = (profile.unweightedGPA || 0) * 400; 
    const academicScore = ((satScore ?? 0) + gpaScore) / 2;
    score += academicScore * 0.4;
    
    let ecScore = 0;
    for (const ec of profile.extracurriculars) {
        ecScore += getTierPoints(ec.tier);
    }
    score += ecScore * 0.35;
    
    let awardScore = 0;
    for (const award of profile.awards) {
        awardScore += getTierPoints(award.tier) * 1.2;
    }
    score += awardScore * 0.25;
    
    return score;
}

// ── Step 3-5: Find nearest accepted/rejected + identify deltas ──

function computeDeltas(profile: UserProfile, student: StudentProfile): GapDelta[] {
    const deltas: GapDelta[] = [];

    const userSAT = getUserSAT(profile);
    const studentSAT = getStudentSAT(student);
    if (userSAT && studentSAT) {
        const diff = studentSAT - userSAT;
        if (diff !== 0) {
            deltas.push({
                field: 'SAT Score',
                yours: userSAT.toString(),
                theirs: studentSAT.toString(),
                gap: diff > 0 ? `+${diff} points gap` : `You're ${Math.abs(diff)} points higher`,
                closeable: diff > 0 && diff <= 100,
            });
        }
    }

    const userGPA = profile.unweightedGPA;
    const studentGPA = student.academics.unweighted_gpa;
    if (userGPA && studentGPA) {
        const diff = studentGPA - userGPA;
        if (Math.abs(diff) > 0.05) {
            deltas.push({
                field: 'GPA',
                yours: userGPA.toFixed(2),
                theirs: studentGPA.toFixed(2),
                gap: diff > 0 ? `+${diff.toFixed(2)} GPA gap` : `You're ${Math.abs(diff).toFixed(2)} higher`,
                closeable: false,
            });
        }
    }

    const userT1 = profile.extracurriculars.filter(ec => ec?.tier === 1).length;
    const studentT1 = countTier1ECs(student);
    if (studentT1 > userT1) {
        deltas.push({
            field: 'Tier 1 Activities',
            yours: `${userT1} Tier-1`,
            theirs: `${studentT1} Tier-1`,
            gap: `+${studentT1 - userT1} activities`,
            closeable: true,
        });
    }

    const userT2 = profile.extracurriculars.filter(ec => ec?.tier === 2).length;
    const studentT2 = countTier2ECs(student);
    if (studentT2 > userT2) {
        deltas.push({
            field: 'Tier 2 Activities',
            yours: `${userT2} Tier-2`,
            theirs: `${studentT2} Tier-2`,
            gap: `+${studentT2 - userT2} activities`,
            closeable: true,
        });
    }

    if (profile.schoolSystem !== 'National_Non_Standard') {
        const userAP = profile.numberOfAPCourses;
        const studentAP = student.academics.number_of_ap_courses ?? 0;
        if (studentAP > userAP && studentAP - userAP >= 2) {
            deltas.push({
                field: 'AP Courses',
                yours: `${userAP} AP courses`,
                theirs: `${studentAP} AP courses`,
                gap: `+${studentAP - userAP} courses`,
                closeable: false,
            });
        }
    }

    const userAwardCount = profile.awards?.length ?? 0;
    const studentAwardCount = (student.awards ?? []).length;
    if (studentAwardCount > userAwardCount) {
        deltas.push({
            field: 'Awards',
            yours: `${userAwardCount} awards`,
            theirs: `${studentAwardCount} awards`,
            gap: `+${studentAwardCount - userAwardCount} awards`,
            closeable: true,
        });
    }

    return deltas;
}

// ── Encouragement Logic ──

function getEncouragementMessage(deltas: GapDelta[]): string {
    const closeableGaps = deltas.filter(d => d.closeable);
    const nonCloseableGaps = deltas.filter(d => !d.closeable);

    if (closeableGaps.length > 0 && nonCloseableGaps.length === 0) {
        return "This gap is real, and it's closeable. Here's how: Focus on " +
            closeableGaps.map(g => g.field.toLowerCase()).join(' and ') +
            ". These are the areas where your effort will directly shift your probability range.";
    }

    if (nonCloseableGaps.length > 0 && closeableGaps.length > 0) {
        return "Your academic numbers are largely set. But roughly 40% of what these schools weigh isn't academic. Here's where your energy actually matters now: " +
            closeableGaps.map(g => g.field.toLowerCase()).join(', ') + ". Focus there — it's where the real leverage is.";
    }

    if (nonCloseableGaps.length > 0 && closeableGaps.length === 0) {
        return "Your academic profile is set, and the gaps here are structural. That doesn't mean you can't get in — it means your essays, recommendations, and demonstrated interest carry even more weight.";
    }

    return "Your profile is close to the accepted benchmark. Small improvements in any area could shift your range. Focus on making your application distinctive — not just strong.";
}

// ── Main Gap Analysis Function ──

export function analyzeGaps(
    profile: UserProfile,
    collegeName: string,
    college: CollegeData,
    students: StudentProfile[],
    stats: DatasetStats,
    engineResult: EngineResult
): GapAnalysis {
    const cluster = getCluster(students, profile.majorCategory, collegeName);

    const clusterSATs = cluster.map(s => getStudentSAT(s)).filter((s): s is number => s !== null);
    const clusterGPAs = cluster.map(s => s.academics.unweighted_gpa).filter((g): g is number => g !== null);
    const satRange = clusterSATs.length >= 2 ? Math.max(...clusterSATs) - Math.min(...clusterSATs) : 200;
    const gpaRange = clusterGPAs.length >= 2 ? Math.max(...clusterGPAs) - Math.min(...clusterGPAs) : 0.5;

    const accepted = cluster.filter(s =>
        (s.decisions.acceptances ?? []).some(a => normalizeSchoolName(a) === normalizeSchoolName(collegeName))
    );
    const rejected = cluster.filter(s =>
        (s.decisions.rejections ?? []).some(r => normalizeSchoolName(r) === normalizeSchoolName(collegeName))
    );

    let nearestAccepted: NearestNeighbor | null = null;
    if (accepted.length > 0) {
        const sorted = accepted
            .map(s => ({ profile: s, distance: computeDistance(profile, s, satRange, gpaRange) }))
            .sort((a, b) => a.distance - b.distance);
        
        const closest = sorted.find(s => s.distance <= 0.3);
        if (closest) {
            nearestAccepted = {
                profile: closest.profile,
                distance: closest.distance,
                outcome: 'accepted',
                deltas: computeDeltas(profile, closest.profile),
            };
        }
    }

    let nearestRejected: NearestNeighbor | null = null;
    if (rejected.length > 0) {
        const sorted = rejected
            .map(s => ({ profile: s, distance: computeDistance(profile, s, satRange, gpaRange) }))
            .sort((a, b) => a.distance - b.distance);
        
        const closest = sorted.find(s => s.distance <= 0.3);
        if (closest) {
            nearestRejected = {
                profile: closest.profile,
                distance: closest.distance,
                outcome: 'rejected',
                deltas: computeDeltas(profile, closest.profile),
            };
        }
    }

    const improvementImpact = computeImprovementImpact(
        profile, collegeName, college, students, stats, engineResult
    );

    const primaryDeltas = nearestAccepted?.deltas ?? [];
    const encouragementMessage = getEncouragementMessage(primaryDeltas);

    return {
        schoolName: collegeName,
        clusterSize: cluster.length,
        majorCategory: profile.majorCategory,
        nearestAccepted,
        nearestRejected,
        improvementImpact,
        encouragementMessage,
    };
}

// ── Improvement Impact Estimation ──

function computeImprovementImpact(
    profile: UserProfile,
    collegeName: string,
    college: CollegeData,
    students: StudentProfile[],
    stats: DatasetStats,
    currentResult: EngineResult
): GapAnalysis['improvementImpact'] {
    const improvements: GapAnalysis['improvementImpact'] = [];

    // Simulate: +1 Tier-1 EC
    // Using 'as any' to bypass complex type requirements for a dummy simulation object
    const modifiedProfile1: UserProfile = {
        ...profile,
        extracurriculars: [
            ...profile.extracurriculars,
            { title: 'Simulated Tier-1 Activity', description: '', tier: 1 } as any,
        ],
    };
    const simResult1 = calculateAdmissionProbability(modifiedProfile1, collegeName, college, students, stats);
    if (simResult1.pointEstimate > currentResult.pointEstimate) {
        improvements.push({
            field: 'Add 1 Tier-1 Extracurricular',
            currentRange: { low: currentResult.low, high: currentResult.high },
            improvedRange: { low: simResult1.low, high: simResult1.high },
            description: 'A national-level achievement, published research, or founding an impactful organization',
        });
    }

    // Simulate: +50 SAT points
    if (profile.sat) {
        const modifiedProfile2: UserProfile = {
            ...profile,
            sat: Math.min(1600, profile.sat + 50),
        };
        const simResult2 = calculateAdmissionProbability(modifiedProfile2, collegeName, college, students, stats);
        if (simResult2.pointEstimate > currentResult.pointEstimate) {
            improvements.push({
                field: 'Increase SAT by 50 points',
                currentRange: { low: currentResult.low, high: currentResult.high },
                improvedRange: { low: simResult2.low, high: simResult2.high },
                description: `From ${profile.sat} to ${Math.min(1600, profile.sat + 50)}`,
            });
        }
    }

    // Simulate: +1 Tier-1 Award
    // Using 'as any' to bypass complex type requirements for dummy simulation object
    const modifiedProfile3: UserProfile = {
        ...profile,
        awards: [
            ...profile.awards,
            { title: 'Simulated National Award', description: '', tier: 1 } as any,
        ],
    };
    const simResult3 = calculateAdmissionProbability(modifiedProfile3, collegeName, college, students, stats);
    if (simResult3.pointEstimate > currentResult.pointEstimate) {
        improvements.push({
            field: 'Add 1 National-Level Award',
            currentRange: { low: currentResult.low, high: currentResult.high },
            improvedRange: { low: simResult3.low, high: simResult3.high },
            description: 'Science Olympiad, USAMO, national writing competition, etc.',
        });
    }

    improvements.sort((a, b) => {
        const impactA = a.improvedRange.low - a.currentRange.low;
        const impactB = b.improvedRange.low - b.currentRange.low;
        return impactB - impactA;
    });

    return improvements;
}
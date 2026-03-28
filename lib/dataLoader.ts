// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AdmitGPT — Client-side Data Loader
// All data stays in the browser. Nothing leaves.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { StudentProfile, CollegeData, DatasetStats, MajorCategory } from './types';

let studentsCache: StudentProfile[] | null = null;
let collegesCache: CollegeData[] | null = null;
let statsCache: DatasetStats | null = null;

export async function loadStudentsData(): Promise<StudentProfile[]> {
    if (studentsCache) return studentsCache;
    const res = await fetch('/data/studentsdata.json');
    const rawData: any[] = await res.json();
    
    // Map raw JSON to StudentProfile type with new fields
    const data: StudentProfile[] = rawData.map(s => ({
        ...s,
        demographics: {
            ...s.demographics,
            isInternational: s.demographics.residence?.toLowerCase() !== 'usa' && s.demographics.residence?.toLowerCase() !== 'us',
            schoolSystem: 'US_Standard', // Default assumption for dataset
        },
        extracurricular_activities: s.extracurricular_activities.map((ec: any) => ({
            ...ec,
            tier: null // Dataset doesn't have tiers yet
        }))
    }));

    studentsCache = data;
    return data;
}

export async function loadCollegesData(): Promise<CollegeData[]> {
    if (collegesCache) return collegesCache;
    const res = await fetch('/data/collegesdata.json');
    const rawData: any[] = await res.json();
    
    // Map raw JSON to CollegeData with majorCompetitiveness
    const data: CollegeData[] = rawData.map(c => ({
        ...c,
        majorCompetitiveness: {
            CS: 0, STEM: 0, HumSoc: 0, Arts: 0, Business: 0, PreMed: 0, Other: 0
        }
    }));

    collegesCache = data;
    return data;
}

export function computeDatasetStats(students: StudentProfile[]): DatasetStats {
    if (statsCache) return statsCache;

    const gpas: number[] = [];
    const sats: number[] = [];
    const years: number[] = [];
    const schoolCounts: Record<string, { total: number; accepted: number; rejected: number }> = {};

    let profilesWithDecisions = 0;

    for (const s of students) {
        if (s.academics.unweighted_gpa) gpas.push(s.academics.unweighted_gpa);
        if (s.academics.sat) {
            const satNum = parseInt(s.academics.sat, 10);
            if (!isNaN(satNum)) sats.push(satNum);
        }
        if (s.academics.act) {
            const actNum = parseInt(s.academics.act, 10);
            if (!isNaN(actNum)) {
                // Convert ACT to SAT equivalent for stats
                const satEquiv = actToSAT(actNum);
                if (satEquiv) sats.push(satEquiv);
            }
        }
        years.push(s.year);

        const hasDecision = (s.decisions.acceptances?.length ?? 0) > 0 ||
            (s.decisions.rejections?.length ?? 0) > 0;
        if (hasDecision) profilesWithDecisions++;

        // Count school-specific data
        for (const school of (s.decisions.acceptances ?? [])) {
            if (!schoolCounts[school]) schoolCounts[school] = { total: 0, accepted: 0, rejected: 0 };
            schoolCounts[school].total++;
            schoolCounts[school].accepted++;
        }
        for (const school of (s.decisions.rejections ?? [])) {
            if (!schoolCounts[school]) schoolCounts[school] = { total: 0, accepted: 0, rejected: 0 };
            schoolCounts[school].total++;
            schoolCounts[school].rejected++;
        }
    }

    const gpaMean = gpas.reduce((a, b) => a + b, 0) / gpas.length;
    const gpaStd = Math.sqrt(gpas.reduce((a, b) => a + Math.pow(b - gpaMean, 2), 0) / gpas.length);
    const satMean = sats.reduce((a, b) => a + b, 0) / sats.length;
    const satStd = Math.sqrt(sats.reduce((a, b) => a + Math.pow(b - satMean, 2), 0) / sats.length);

    statsCache = {
        gpa: { mean: gpaMean, std: gpaStd, min: Math.min(...gpas), max: Math.max(...gpas) },
        sat: { mean: satMean, std: satStd, min: Math.min(...sats), max: Math.max(...sats) },
        totalProfiles: students.length,
        profilesWithDecisions,
        yearRange: { min: Math.min(...years), max: Math.max(...years) },
        schoolCounts,
    };
    return statsCache;
}

// ACT to SAT concordance table (College Board)
export function actToSAT(act: number): number | null {
    const table: Record<number, number> = {
        36: 1590, 35: 1560, 34: 1530, 33: 1500, 32: 1470, 31: 1440,
        30: 1410, 29: 1380, 28: 1350, 27: 1320, 26: 1290, 25: 1260,
        24: 1230, 23: 1200, 22: 1170, 21: 1140, 20: 1110, 19: 1080,
        18: 1050, 17: 1010, 16: 970, 15: 930, 14: 890, 13: 850, 12: 810,
    };
    return table[act] ?? null;
}

// Map intended major to category
export function classifyMajor(major: string): MajorCategory {
    const lower = major.toLowerCase();

    if (/computer|cs|software|data science|information|cyber|ai |machine learning|programming|robotics|hci|human-computer/.test(lower)) return 'CS';
    if (/bio|chem|physics|math|engineer|neuro|astro|environ|geo|stat|mech|electr|aero|material|quantum|genetics|nanotech|archit/.test(lower)) return 'STEM';
    if (/pre.?med|medicine|health|nurs|pharm|public health|dental|veterinary/.test(lower)) return 'PreMed';
    if (/business|financ|econ|account|market|manage|entrepre|consult|logistics|mba/.test(lower)) return 'Business';
    if (/art|music|theater|theatre|film|design|dance|creative|studio|illustr|photograph|animat|fine art/.test(lower)) return 'Arts';
    if (/politic|histor|english|psych|socio|anthro|philo|commun|journal|law|inter.*relation|human|writ|linguis|relig|philosophy|literature/.test(lower)) return 'HumSoc';

    return 'Other';
}

export function getMajorCategoryLabel(cat: MajorCategory): string {
    const labels: Record<MajorCategory, string> = {
        CS: 'Computer Science',
        STEM: 'STEM (Science/Engineering)',
        PreMed: 'Pre-Med / Health',
        Business: 'Business / Economics',
        Arts: 'Arts / Design',
        HumSoc: 'Humanities / Social Science',
        Other: 'Other / Undecided',
    };
    return labels[cat];
}

export function findCollege(colleges: CollegeData[], name: string): CollegeData | undefined {
    const normalizedName = name.toLowerCase().trim();
    return colleges.find(c => {
        const schoolName = c['school.name'];
        if (!schoolName) return false;
        const collegeName = schoolName.toLowerCase().trim();
        return collegeName === normalizedName || collegeName.includes(normalizedName) || normalizedName.includes(collegeName);
    });
}

export function getCollegeNames(colleges: CollegeData[]): string[] {
    return colleges.map(c => c['school.name']).sort();
}

export function getUserSAT(profile: { sat: number | null; act: number | null }): number | null {
    if (profile.sat) return profile.sat;
    if (profile.act) return actToSAT(profile.act);
    return null;
}

import { UserProfile, MajorCategory } from './types';
import { classifyMajor } from './dataLoader';

/**
 * Robust heuristic parser for CommonApp PDF summaries.
 * Targets SAT, ACT, GPA, and basic activity/award titles.
 */
export async function parseCommonAppPDF(file: File): Promise<Partial<UserProfile>> {
    // Fix for Next.js/Turbopack: Import the specific build of pdfjs
    // and use the CDN worker for reliability.
    // @ts-ignore
    const pdfjs = await import('pdfjs-dist/build/pdf.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        // Use a more structured joining to preserve table-like relationships
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
    }

    const data: Partial<UserProfile> = {
        extracurriculars: [],
        awards: [],
        targetSchools: []
    };

    // Heuristic 1: Academics (SAT/ACT/GPA)
    // CommonApp: SAT Total: 1550, Critical Reading: 780, math: 770
    const satRegex = /(?:SAT\s+Total|Total\s+Score|Highest\s+SAT\s+Total):?\s*(\d{4})/i;
    const satMatch = fullText.match(satRegex);
    if (satMatch) data.sat = parseInt(satMatch[1], 10);

    const actRegex = /(?:ACT\s+Composite|Composite\s+Score|Highest\s+ACT\s+Composite):?\s*(\d{1,2})/i;
    const actMatch = fullText.match(actRegex);
    if (actMatch) data.act = parseInt(actMatch[1], 10);

    const gpaRegex = /(?:Unweighted\s+GPA|GPA|Weighted\s+GPA):?\s*(\d\.\d{2})/i;
    const gpaMatch = fullText.match(gpaRegex);
    if (gpaMatch) data.unweightedGPA = parseFloat(gpaMatch[1]);

    // Heuristic 2: Intended Major
    const majorRegex = /(?:Intended\s+Major|Major|Area\s+of\s+Study):?\s*([^,\n\(\)]+)/i;
    const majorMatch = fullText.match(majorRegex);
    if (majorMatch && majorMatch[1].trim().length < 50) {
        data.intendedMajor = majorMatch[1].trim();
        data.majorCategory = classifyMajor(data.intendedMajor);
    }

    // Heuristic 3: Extracurriculars (Activities)
    // CommonApp uses blocks starting with "Activity 1", "Activity 2", etc.
    const activityBlocks = fullText.split(/Activity\s+\d{1,2}/i).slice(1);
    data.extracurriculars = activityBlocks.slice(0, 5).map((block, idx) => {
        // Try to find the title - often after "Activity Type:" or just the first line
        const lines = block.split(/\s+/).filter(l => l.length > 2);
        const title = lines.slice(0, 4).join(' ').trim();
        return {
            id: `ec-pdf-${idx}`,
            title: title.length > 5 ? title : `Activity ${idx+1}`,
            tier: 'LOCAL', // Default to local for safety, user can bump it
            category: 'Other',
            description: 'Extracted from PDF summary.',
            isSpike: false,
            scope: 'Local',
            multiplier: 1.0,
            rarity: 'Common',
            prestige: 'Standard',
            depth: 'Medium',
            validation: 'Self-Reported'
        } as any;
    });

    // Heuristic 4: Awards (Honors)
    const honorsBlockMatch = fullText.match(/Honors\s+([\s\S]+?)\s+Testing/i) || fullText.match(/Honors\s+([\s\S]+?)\s+Activities/i);
    if (honorsBlockMatch) {
       const honorsText = honorsBlockMatch[1];
       const honorTitles = honorsText.split(/\d{4}|9, 10, 11, 12/).map(t => t.trim()).filter(t => t.length > 4);
       data.awards = honorTitles.slice(0, 3).map((title, idx) => ({
           id: `award-pdf-${idx}`,
           title: title,
           tier: 'School',
           description: 'Extracted honor.',
           isSpike: false,
           scope: 'Local',
           rarity: 'Common',
           prestige: 'Standard',
           validation: 'Self-Reported'
       } as any));
    }

    return data;
}

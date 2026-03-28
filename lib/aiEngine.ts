// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AdmitGPT — AI-Enhanced Mode
// Your API key stays in localStorage. Never transmitted to us.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

import { AIConfig, AIProvider, AIAnalysis, UserProfile, EngineResult, GapAnalysis, StudentProfile } from './types';

const SYSTEM_PROMPT = `You are an honest college admissions analyst helping a high school student understand their real situation.

Rules:
- Never inflate probabilities to make the student feel better
- Always lead with what the data shows, then what they can do
- Be specific — "your EC profile is weak" is useless; "you have 0 Tier-1 activities and your nearest accepted peer had 2" is useful
- Be warm but never dishonest — these are teenagers making real decisions with real consequences
- End every school analysis with one specific, actionable improvement — not a list of five vague suggestions
- If the data is insufficient, say so clearly

You have access to:
- The student's full profile
- Math engine output (probability range + confidence)
- Nearest-neighbor profiles (accepted and rejected)
- College benchmark data

For each school, provide:
1. A sharper probability estimate with your reasoning
2. The single "Decision Decider" — what specifically made the difference in similar profiles
3. One concrete action ranked by impact

Format your response as JSON with this structure for each school:
{
  "schools": [
    {
      "schoolName": "...",
      "sharperEstimate": "XX% - YY%",
      "reasoning": "...",
      "decisionDecider": "...",
      "actionPlan": "..."
    }
  ]
}`;

function buildUserPrompt(
    profile: UserProfile,
    results: EngineResult[],
    gaps: GapAnalysis[],
    nearestNeighbors: StudentProfile[]
): string {
    return `## Student Profile
- SAT: ${profile.sat ?? 'N/A'} | ACT: ${profile.act ?? 'N/A'}
- GPA (UW): ${profile.unweightedGPA ?? 'N/A'} | GPA (W): ${profile.weightedGPA ?? 'N/A'}
- Intended Major: ${profile.intendedMajor} (Category: ${profile.majorCategory})
- International: ${profile.isInternational ? 'Yes' : 'No'}
- AP Courses: ${profile.numberOfAPCourses} | IB: ${profile.numberOfIBCourses} | Honors: ${profile.numberOfHonorsCourses}

### Extracurriculars (${profile.extracurriculars.length} total)
${profile.extracurriculars.map(ec => `- [Tier ${ec.tier}] ${ec.title}: ${ec.description}`).join('\n')}

### Awards (${profile.awards.length} total)
${profile.awards.map(a => `- [Tier ${a.tier}] ${a.title}${a.description ? ` — ${a.description}` : ''}`).join('\n')}

## Math Engine Results
${results.map(r => `### ${r.schoolName}
- Range: ${(r.low * 100).toFixed(0)}% – ${(r.high * 100).toFixed(0)}%
- Point Estimate: ${(r.pointEstimate * 100).toFixed(1)}%
- Confidence: ${r.confidenceLevel} (${r.sampleN} similar profiles)
- Academic Z-Score: ${r.academicZScore.toFixed(2)} (SAT Z: ${r.satZ.toFixed(2)}, GPA Z: ${r.gpaZ.toFixed(2)})
- Spike Score: ${r.spikeScore.toFixed(2)}
- Major Modifier: ${r.majorModifier.toFixed(2)}x
- Intl Modifier: ${r.intlModifier.toFixed(2)}
${r.competitionNote ? `- Competition Note: ${r.competitionNote}` : ''}`).join('\n\n')}

## Gap Analysis
${gaps.map(g => `### ${g.schoolName} (cluster: ${g.clusterSize} similar ${g.majorCategory} applicants)
${g.nearestAccepted ? `Nearest Accepted Peer Deltas:
${g.nearestAccepted.deltas.map(d => `  - ${d.field}: You ${d.yours} vs Their ${d.theirs} (${d.gap})`).join('\n')}` : 'No accepted peer found in cluster'}
${g.nearestRejected ? `Nearest Rejected Peer Deltas:
${g.nearestRejected.deltas.map(d => `  - ${d.field}: You ${d.yours} vs Their ${d.theirs} (${d.gap})`).join('\n')}` : ''}
Encouragement: ${g.encouragementMessage}`).join('\n\n')}

## Nearest Neighbor Profiles (${nearestNeighbors.length} total)
${nearestNeighbors.slice(0, 5).map(n => `- Profile #${n.id}: Major=${n.demographics.intended_major}, SAT=${n.academics.sat}, GPA=${n.academics.unweighted_gpa}, ECs=${n.extracurricular_activities.length}, Awards=${n.awards.length}, Category=${n.assigned_category}
  Accepted: ${(n.decisions.acceptances ?? []).join(', ')}
  Rejected: ${(n.decisions.rejections ?? []).join(', ')}`).join('\n')}

Please analyze each school and provide your assessment.`;
}

async function callGemini(apiKey: string, model: string, systemPrompt: string, userPrompt: string): Promise<string> {
    // Use current stable model as default
    const modelId = model || 'gemini-2.5-flash';
    
    // Validate model name format
    if (!modelId.startsWith('gemini-')) {
        throw new Error(`Invalid Gemini model name: ${modelId}. Model names should start with 'gemini-'`);
    }
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [
                { 
                    role: 'user', 
                    parts: [{ text: userPrompt }] 
                }
            ],
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            },
            generationConfig: {
                temperature: 0.3,
                maxOutputTokens: 4096,
            }
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.error?.message || `HTTP ${response.status} ${response.statusText}`;
        
        // Provide helpful error messages for common issues
        if (response.status === 404) {
            throw new Error(`Gemini model '${modelId}' not found. Available models include: gemini-2.5-flash, gemini-2.5-pro, gemini-1.5-flash, gemini-1.5-pro. Please check your model selection.`);
        } else if (response.status === 403) {
            throw new Error(`Gemini API access forbidden. Please check your API key and ensure the Gemini API is enabled for your project.`);
        } else if (response.status === 429) {
            throw new Error(`Gemini API rate limit exceeded. Please try again in a moment.`);
        }
        
        throw new Error(`Gemini API error: ${errorMessage}`);
    }
    
    const data = await response.json();
    
    // Handle potential errors in response
    if (data.error) {
        throw new Error(`Gemini API error: ${data.error.message || 'Unknown error'}`);
    }
    
    // Handle blocked content
    if (data.candidates?.[0]?.finishReason === 'SAFETY') {
        throw new Error(`Gemini API: Content was blocked by safety filters. Please try rephrasing your request.`);
    }
    
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

async function callOpenAI(apiKey: string, model: string, systemPrompt: string, userPrompt: string): Promise<string> {
    const modelId = model || 'gpt-4o';
    const url = 'https://api.openai.com/v1/chat/completions';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: modelId,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            temperature: 0.3,
            max_tokens: 4096,
        }),
    });

    if (!response.ok) throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? '';
}

async function callGroq(apiKey: string, model: string, systemPrompt: string, userPrompt: string): Promise<string> {
    const modelId = model || 'llama-3.1-70b-versatile';
    const url = 'https://api.groq.com/openai/v1/chat/completions';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: modelId,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt },
            ],
            temperature: 0.3,
            max_tokens: 4096,
        }),
    });

    if (!response.ok) throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
    const data = await response.json();
    return data.choices?.[0]?.message?.content ?? '';
}

function parseAIResponse(raw: string): AIAnalysis[] {
    try {
        // Try to extract JSON from the response
        const jsonMatch = raw.match(/\{[\s\S]*"schools"[\s\S]*\}/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            return (parsed.schools || []).map((s: Record<string, string>) => ({
                schoolName: s.schoolName || '',
                sharperEstimate: s.sharperEstimate || '',
                decisionDecider: s.decisionDecider || '',
                actionPlan: s.actionPlan || '',
                reasoning: s.reasoning || '',
            }));
        }
    } catch {
        // Fallback: return raw as a single analysis
    }

    return [{
        schoolName: 'All Schools',
        sharperEstimate: '',
        decisionDecider: '',
        actionPlan: '',
        reasoning: raw,
    }];
}

export async function runAIAnalysis(
    config: AIConfig,
    profile: UserProfile,
    results: EngineResult[],
    gaps: GapAnalysis[],
    nearestNeighbors: StudentProfile[]
): Promise<AIAnalysis[]> {
    const userPrompt = buildUserPrompt(profile, results, gaps, nearestNeighbors);

    let raw: string;
    switch (config.provider) {
        case 'gemini':
            raw = await callGemini(config.apiKey, config.model, SYSTEM_PROMPT, userPrompt);
            break;
        case 'openai':
            raw = await callOpenAI(config.apiKey, config.model, SYSTEM_PROMPT, userPrompt);
            break;
        case 'groq':
            raw = await callGroq(config.apiKey, config.model, SYSTEM_PROMPT, userPrompt);
            break;
        default:
            throw new Error(`Unknown AI provider: ${config.provider}`);
    }

    return parseAIResponse(raw);
}

// ── API Key Management ──

export function saveAPIKey(provider: AIProvider, key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`admitgpt_${provider}_key`, key);
}

export function getAPIKey(provider: AIProvider): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(`admitgpt_${provider}_key`);
}

export function removeAPIKey(provider: AIProvider): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`admitgpt_${provider}_key`);
}

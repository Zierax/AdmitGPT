"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Eye, BookOpen, Download, Github, Calculator, AlertTriangle, ChevronDown, ExternalLink, Sparkles } from "lucide-react";
import { loadStudentsData, loadCollegesData, computeDatasetStats } from "@/lib/dataLoader";
import type { DatasetStats } from "@/lib/types";

export default function TransparencyPage() {
    const [stats, setStats] = useState<DatasetStats | null>(null);
    const [openSection, setOpenSection] = useState<string | null>("formulas");

    useEffect(() => {
        async function load() {
            const students = await loadStudentsData();
            const st = computeDatasetStats(students);
            setStats(st);
        }
        load();
    }, []);

    const toggle = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="min-h-screen">
            {/* Nav */}
            <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
                <a href="/" className="flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
                    <ArrowLeft size={16} /> Back to AdmitGPT
                </a>
                <span className="font-bold flex items-center gap-2">
                    <Eye size={16} className="text-[var(--color-primary)]" />
                    Transparency Engine
                </span>
                <div />
            </nav>

            <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold glow-text mb-3">Every Formula. Every Limitation.</h1>
                    <p className="text-[var(--color-muted)]">
                        If we can&apos;t show you how the number was calculated,<br />
                        we have no right to show you the number.
                    </p>
                </div>

                {/* Section 1: Formulas */}
                <AccordionSection
                    title="1. Every Formula"
                    icon={<Calculator size={18} className="text-[var(--color-primary)]" />}
                    isOpen={openSection === "formulas"}
                    onToggle={() => toggle("formulas")}
                >
                    <div className="space-y-6 text-sm">
                        <FormulaBlock
                            title="Step 1: Academic Z-Scores"
                            formula={`SAT Z-Score = (YourSAT - CollegeSATAverage) / ((SAT_75th - SAT_25th) / 1.35)
GPA Z-Score = (YourGPA - DatasetGPAMean) / DatasetGPAStd
Academic Composite = (SAT_Z × 0.55) + (GPA_Z × 0.45)`}
                            explanation="We compute how far your SAT and GPA are from the college's benchmarks, measured in standard deviations. SAT is weighted 55% because the data in studentsdata.json shows SAT has higher predictive power for acceptance outcomes."
                        />

                        <FormulaBlock
                            title="Step 2: Granular Spike Model (v1.0)"
                            formula={`S = Σ(W × T × R × P × D × V) × C / 2.5 + DiversityBonus

W: Base (GM: 8.0, Outlier: 4.0, T1: 1.5, T2: 0.6, T3: 0.1)
T: Scope (Local: 1.0, Nat: 3.0, Intl: 5.0, Global Elite: 8.0)
R: Rarity (Common: 1.0, Rare: 1.8, Ultra: 3.5, Unique: 6.0)
P: Institutional (Standard: 1.0, Rec: 1.25, Prest: 1.6, World: 2.2)
D: Cog Load (Low: 0.8, Med: 1.0, High: 1.4, Research: 1.8)
V: Validation (Self: 0.6, Peer: 0.75, Inst: 0.9, Audit: 1.0)
C: Confidence % (0.0 to 1.0)`}
                            explanation="Criteria-based, never keyword-matching. v1.0 introduces a 6-dimensional rubric for every activity. We apply a saturation limit (sqrt) above 10 points per individual item contribution to prevent 'infinite spikes' from skewed data. The total is scaled by 2.5 to maintain a [0, 15] range."
                        />

                        <FormulaBlock
                            title="Diversity Bonus: The 'Renaissance' Modifier"
                            formula={`Bonus = Top4_Weighted_Categories(Σ CategoryWeights)
CategoryWeight: T3 (0.2), T2 (0.5), T1 (1.0), Outlier (1.5), GM (2.5)
Scaling: Total Weight 1.5+ (+0.5), 3.0+ (+1.0), 5.0+ (+2.0), 8.0+ (+3.0)`}
                            explanation="Selective schools reward polymaths. If you have significant achievements across multiple distinct categories (STEM, Arts, Leadership, etc.), your spike score receives a non-linear boost up to +3.0."
                        />

                        <FormulaBlock
                            title="Step 3: Major Difficulty Modifier"
                            formula={`MajorRate = AcceptedInMajor / AppliedInMajor (from dataset)
OverallRate = AcceptedOverall / AppliedOverall
Modifier = MajorRate / OverallRate  (clamped to [0.5, 1.5])
Additive adjustment = (Modifier - 1) × 0.5`}
                            explanation="Computed dynamically from the dataset — never hardcoded. CS at top schools typically shows a modifier of 0.70–0.78× based on our data, meaning CS applicants face lower acceptance rates than the school average."
                        />

                        <FormulaBlock
                            title="Step 4: International Modifier"
                            formula={`If domestic: modifier = 0 (no adjustment)
If international:
  modifier = (college_nonresident_alien_rate / 0.10) × 0.1 - 0.3
Source: College Demographic Data`}
                            explanation="International applicants compete in a smaller pool. Schools with higher international enrollment rates penalize less. This modifier is always shown to you — it's never hidden in the score."
                        />

                        <FormulaBlock
                            title="Step 5: Confidence Scoring"
                            formula={`Find profiles where: same school + SAT ±80 + same major category + same intl status
n ≥ 15 → High confidence (range width: ±12%)
n ≥ 8  → Medium confidence (range width: ±20%)
n ≥ 3  → Low confidence (range width: ±30%)
n < 3  → Insufficient data (range width: ±35%)`}
                            explanation="More similar profiles = narrower range = higher confidence. We always tell you the exact number of profiles this estimate is based on."
                        />

                        <FormulaBlock
                            title="Step 6: Final Result (Gated Multiplicative Model)"
                            formula={`Academic_Gate = 1 / (1 + e^-(5.0 * (Academic_Z + 1.2)))
Impact = Impact(SpikeRating, MajorMod, IntlMod, Region)

Final_Prob = Academic_Gate * Impact`}
                            explanation="AdmitGPT v1.0 uses a Gated Multiplicative Model. The 'Academic Gate' is a steep curve—if your academics are more than 2.0σ below the mean, the gate closes and your extracurricular 'Impact' is heavily reduced. This prevents unrealistic 'outlier' results for low-academic applicants at elite schools. You cannot 'buy' your way into a school with ECs if you don't meet the academic floor."
                        />

                        <FormulaBlock
                            title="Gap Analyzer: Distance"
                            formula={`Distance = √(
  (0.40 × (SAT_diff / SAT_range))² +
  (0.30 × (GPA_diff / GPA_range))² +
  (0.20 × EC_tier_diff)² +
  (0.10 × Awards_diff)²
)`}
                            explanation="Weighted Euclidean distance within your major category micro-cluster. This finds the most similar accepted and rejected profiles, so you can see exactly what distinguishes them from you."
                        />
                    </div>
                </AccordionSection>

                {/* Section 2: Dataset Statistics */}
                <AccordionSection
                    title="2. Dataset Statistics"
                    icon={<BookOpen size={18} className="text-[var(--color-info)]" />}
                    isOpen={openSection === "stats"}
                    onToggle={() => toggle("stats")}
                >
                    {stats ? (
                        <div className="space-y-4 text-sm">
                            <div className="grid grid-cols-2 gap-4">
                                <StatCard label="Total Profiles" value={stats.totalProfiles.toLocaleString()} />
                                <StatCard label="With Decisions" value={stats.profilesWithDecisions.toLocaleString()} />
                                <StatCard label="Year Range" value={`${stats.yearRange.min} – ${stats.yearRange.max}`} />
                                <StatCard label="Avg SAT" value={stats.sat.mean.toFixed(0)} sub={`σ = ${stats.sat.std.toFixed(0)}`} />
                                <StatCard label="Avg GPA (UW)" value={stats.gpa.mean.toFixed(2)} sub={`σ = ${stats.gpa.std.toFixed(2)}`} />
                                <StatCard label="SAT Range" value={`${stats.sat.min} – ${stats.sat.max}`} />
                            </div>

                            <h4 className="font-semibold mt-4 mb-2">Schools with Most Data Points</h4>
                            <div className="space-y-1">
                                {Object.entries(stats.schoolCounts)
                                    .sort(([, a], [, b]) => b.total - a.total)
                                    .slice(0, 15)
                                    .map(([school, counts]) => (
                                        <div key={school} className="flex items-center justify-between text-xs p-2 rounded border border-[var(--color-border)] bg-[var(--color-card)]">
                                            <span>{school}</span>
                                            <span className="text-[var(--color-muted)]">
                                                <span className="text-[var(--color-success)]">{counts.accepted} accepted</span> / {" "}
                                                <span className="text-[var(--color-danger)]">{counts.rejected} rejected</span> / {" "}
                                                {counts.total} total
                                            </span>
                                        </div>
                                    ))}
                            </div>

                            <div className="p-4 rounded-lg border border-[var(--color-warning)] bg-[rgba(245,158,11,0.05)]">
                                <h4 className="font-semibold text-[var(--color-warning)] flex items-center gap-2 mb-2">
                                    <AlertTriangle size={16} /> Survivorship Bias — In Plain Language
                                </h4>
                                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                                    The students who share their college results online are not a random sample.
                                    They tend to be students who applied to selective schools and had strong enough profiles to be worth sharing.
                                    This means our dataset likely <strong>overrepresents</strong> high-achieving students and
                                    <strong> underrepresents</strong> students with average profiles.
                                    The practical effect: our model may be slightly optimistic for above-average students
                                    and slightly pessimistic for average students. We account for this by always showing ranges, never single numbers.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center py-8">
                            <div className="loading-spinner" />
                        </div>
                    )}
                </AccordionSection>

                {/* Section 3: What We Cannot Model */}
                <AccordionSection
                    title="3. What We Cannot Model"
                    icon={<AlertTriangle size={18} className="text-[var(--color-warning)]" />}
                    isOpen={openSection === "limitations"}
                    onToggle={() => toggle("limitations")}
                >
                    <div className="space-y-3 text-sm">
                        {[
                            { title: "Essay Quality", desc: "The single most important factor we cannot measure. A transformative essay can overcome statistical odds." },
                            { title: "Legacy / Donor Status", desc: "At some schools, legacy admits have acceptance rates 2-5x higher than the general pool." },
                            { title: "Athletic Recruitment", desc: "Recruited athletes may have acceptance rates above 80%, regardless of academic profile." },
                            { title: "Demonstrated Interest", desc: "Campus visits, interviews, email engagement — many schools track these, and we can't." },
                            { title: "Year-to-Year Variation", desc: "Applicant pools change every year. A school's 2023 data may not predict 2025." },
                            { title: "Recommendation Strength", desc: "A powerful letter from a teacher who truly knows you can move the needle." },
                            { title: "Institutional Priorities", desc: "Schools have internal goals for geographic, musical, athletic diversity that shift annually." },
                            { title: "Interview Performance", desc: "At schools that evaluate interviews, a strong or weak interview can materially affect your outcome." },
                        ].map((item, i) => (
                            <div key={i} className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]">
                                <span className="font-semibold text-[var(--color-foreground)]">{item.title}</span>
                                <p className="text-xs text-[var(--color-muted)] mt-1">{item.desc}</p>
                            </div>
                        ))}

                        <div className="p-4 mt-4 rounded-lg border border-[var(--color-primary)] bg-[rgba(99,102,241,0.05)]">
                            <h4 className="font-semibold text-[var(--color-primary-light)] flex items-center gap-2 mb-2">
                                <Sparkles size={16} /> The Human Factor
                            </h4>
                            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                                Statistics describe the average, but you aren&apos;t an average.
                                Admissions officers are humans who are looking for a reason to say <strong>yes</strong>.
                                Our model can&apos;t see the passion in your personal statement, the grit in your common app story, or the unique perspective you bring.
                                This is your &quot;margin of victory&quot; — the space where you can defy the math.
                                Use this data to be strategic, not to be discouraged.
                            </p>
                        </div>

                        <p className="text-xs text-[var(--color-primary)] italic text-center pt-2">
                            If any of these apply to you, adjust your expectations accordingly.
                        </p>
                    </div>
                </AccordionSection>

                {/* Section 4: Manual Calculation Guide */}
                <AccordionSection
                    title="4. Replicate Our Math By Hand"
                    icon={<Calculator size={18} className="text-[var(--color-success)]" />}
                    isOpen={openSection === "manual"}
                    onToggle={() => toggle("manual")}
                >
                    <div className="space-y-4 text-sm">
                        <p className="text-[var(--color-muted)]">
                            Here&apos;s how you can verify every number in your report with a calculator:
                        </p>

                        <ol className="space-y-3 list-decimal list-inside text-[var(--color-muted)]">
                            <li><strong className="text-[var(--color-foreground)]">Get college SAT data</strong> from the College Scorecard (data.ed.gov)</li>
                            <li><strong className="text-[var(--color-foreground)]">Compute SAT Z-score:</strong> (Your SAT - College Average) / ((75th - 25th) / 1.35)</li>
                            <li><strong className="text-[var(--color-foreground)]">Compute GPA Z-score:</strong> Use dataset mean = {stats?.gpa.mean.toFixed(2) ?? "..."}, std = {stats?.gpa.std.toFixed(2) ?? "..."}</li>
                            <li><strong className="text-[var(--color-foreground)]">Calculate Analysis Rating:</strong> Sum your activities using the 6-factor rubric (W×T×R×P×D×V) / 2.5</li>
                            <li><strong className="text-[var(--color-foreground)]">Add Renaissance Bonus:</strong> Up to +3.0 based on category depth</li>
                            <li><strong className="text-[var(--color-foreground)]">Compute Final Probability:</strong> Multiply your Academic Gate by your calculated Impact</li>
                        </ol>

                        <p className="text-xs text-[var(--color-primary)] italic">
                            If your hand calculation differs from ours by more than 2%, it&apos;s a bug. Please report it.
                        </p>
                    </div>
                </AccordionSection>

                {/* Section 5: Download Data */}
                <AccordionSection
                    title="5. Download Raw Data & Source Code"
                    icon={<Download size={18} className="text-[var(--color-accent)]" />}
                    isOpen={openSection === "download"}
                    onToggle={() => toggle("download")}
                >
                    <div className="space-y-4">
                        <a
                            href="/data/studentsdata.json"
                            download
                            className="flex items-center justify-between p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)] transition-colors"
                        >
                            <div>
                                <span className="font-semibold text-sm">studentsdata.json</span>
                                <p className="text-xs text-[var(--color-muted)]">~5MB — All {stats?.totalProfiles.toLocaleString()} anonymized profiles</p>
                            </div>
                            <Download size={16} className="text-[var(--color-primary)]" />
                        </a>

                        <a
                            href="/data/collegesdata.json"
                            download
                            className="flex items-center justify-between p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)] transition-colors"
                        >
                            <div>
                                <span className="font-semibold text-sm">collegesdata.json</span>
                                <p className="text-xs text-[var(--color-muted)]">College Scorecard data — admissions, SAT, demographics</p>
                            </div>
                            <Download size={16} className="text-[var(--color-primary)]" />
                        </a>

                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)] transition-colors"
                        >
                            <div>
                                <span className="font-semibold text-sm">Source Code</span>
                                <p className="text-xs text-[var(--color-muted)]">Full source on GitHub — MIT License</p>
                            </div>
                            <Github size={16} className="text-[var(--color-primary)]" />
                        </a>
                    </div>
                </AccordionSection>

                {/* Footer */}
                <footer className="text-center text-xs text-[var(--color-muted)] py-8 border-t border-[var(--color-border)]">
                    <p>Built by a student, for students. Every formula is public. Every limitation is disclosed.</p>
                    <p className="mt-1">Your data never leaves your browser.</p>
                </footer>
            </div>
        </div>
    );
}

// ── Subcomponents ──

function AccordionSection({
    title,
    icon,
    isOpen,
    onToggle,
    children,
}: {
    title: string;
    icon: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
}) {
    return (
        <div className="glass-card overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full p-5 flex items-center justify-between hover:bg-[var(--color-card-hover)] transition-colors"
            >
                <div className="flex items-center gap-2.5">
                    {icon}
                    <span className="font-semibold">{title}</span>
                </div>
                <ChevronDown size={18} className={`text-[var(--color-muted)] transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && <div className="px-5 pb-5">{children}</div>}
        </div>
    );
}

function FormulaBlock({ title, formula, explanation }: { title: string; formula: string; explanation: string }) {
    return (
        <div>
            <h4 className="font-semibold text-[var(--color-foreground)] mb-2">{title}</h4>
            <pre className="p-3 rounded-lg bg-[rgba(99,102,241,0.05)] border border-[rgba(99,102,241,0.15)] text-xs font-mono overflow-x-auto whitespace-pre-wrap text-[var(--color-primary-light)]">
                {formula}
            </pre>
            <p className="text-xs text-[var(--color-muted)] mt-2 leading-relaxed">{explanation}</p>
        </div>
    );
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
    return (
        <div className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-center">
            <div className="text-xs text-[var(--color-muted)] uppercase tracking-wider">{label}</div>
            <div className="text-lg font-bold mt-1">{value}</div>
            {sub && <div className="text-[10px] text-[var(--color-muted)]">{sub}</div>}
        </div>
    );
}

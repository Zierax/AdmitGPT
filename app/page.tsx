"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Header from "@/app/components/Header";
import {
  UserProfile,
  StudentProfile,
  CollegeData,
  DatasetStats,
  EngineResult,
  GapAnalysis,
  MajorCategory,
  UserEC,
  UserAward,
  ECTier,
  AIConfig,
  AIAnalysis,
  AIProvider,
  PortfolioResult,
  SuggestionResults,
  OutlierClassification,
  ActivityCategory,
  TierLevel,
  ExternalValidation,
  RarityLevel,
  InstitutionalStrength,
  CognitiveLoad,
} from "@/lib/types";
import {
  loadStudentsData,
  loadCollegesData,
  computeDatasetStats,
  getCollegeNames,
  classifyMajor,
  getMajorCategoryLabel,
} from "@/lib/dataLoader";
import { runEngine, calculatePortfolioChance, suggestUniversities, classifyOutlier, getOutlierTheme } from "@/lib/engine";
import { generateSignature, getVerificationURL, buildInvitationMailto, buildVulnerabilityReportMailto, isLocalMode } from "@/lib/crypto";
import { analyzeGaps } from "@/lib/gapAnalyzer";
import { findCollege } from "@/lib/dataLoader";
import { generatePDFReport } from "@/lib/pdfReport";
import { runAIAnalysis, saveAPIKey, getAPIKey, removeAPIKey } from "@/lib/aiEngine";
import { parseCommonAppPDF } from "@/lib/pdfParser";
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  Download,
  Brain,
  BarChart3,
  Target,
  Sparkles,
  Eye,
  ChevronDown,
  Plus,
  X,
  Check,
  AlertTriangle,
  TrendingUp,
  Users,
  Zap,
  Lock,
  ExternalLink,
  Search,
  Github,
  Mail,
  Bug,
  Heart,
  Award,
  Globe,
  Clock,
  Layers,
  GraduationCap,
  Calendar,
  FileText,
  Book,
  Code2,
  Wand2,
  FlaskConical,
  Terminal,
  Instagram,
} from "lucide-react";
import { TEST_PROFILES } from "@/lib/testProfiles";
// ── Types for internal state ──

// ── Types for internal state ──
type AppView = "landing" | "form" | "loading" | "results";

// ── Main Component ──
export default function Home() {
  const [view, setView] = useState<AppView>("landing");
  const [formStep, setFormStep] = useState(1);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [colleges, setColleges] = useState<CollegeData[]>([]);
  const [stats, setStats] = useState<DatasetStats | null>(null);
  const [collegeNames, setCollegeNames] = useState<string[]>([]);

  // Profile state
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    isInternational: false,
    schoolSystem: 'US_Standard',
    intendedMajor: "Undecided",
    majorCategory: "Other",
    numberOfAPCourses: 0,
    numberOfIBCourses: 0,
    numberOfHonorsCourses: 0,
    extracurriculars: [],
    awards: [],
    sat: null,
    act: null,
    preferredTestType: 'None',
    unweightedGPA: 3.5,
    weightedGPA: null,
    state: "",
    gender: "",
    targetColleges: [],
    targetSchools: [],
    github: "",
    instagram: "",
    linkedin: "",
  });

  // Results state
  const [engineResults, setEngineResults] = useState<EngineResult[]>([]);
  const [gapAnalyses, setGapAnalyses] = useState<GapAnalysis[]>([]);
  const [portfolioResult, setPortfolioResult] = useState<PortfolioResult | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestionResults | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanningStatus, setScanningStatus] = useState("");
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");

  // AI state
  const [aiEnabled, setAiEnabled] = useState(false);
  const [aiConfig, setAiConfig] = useState<AIConfig>({
    provider: "gemini",
    apiKey: "",
    model: "gemini-2.5-flash" // Use current stable model as default
  });
  const [aiResults, setAiResults] = useState<AIAnalysis[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [showCalculations, setShowCalculations] = useState<EngineResult | null>(null);

  // School search
  const [schoolSearch, setSchoolSearch] = useState("");
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [showAIPromptModal, setShowAIPromptModal] = useState(false);
  const [showPublicDetails, setShowPublicDetails] = useState(true);

  // Load data
  useEffect(() => {
    async function load() {
      try {
        setLoadingMessage("Loading student profiles (5MB)...");
        const s = await loadStudentsData();
        setStudents(s);

        setLoadingMessage("Loading college data...");
        const c = await loadCollegesData();
        setColleges(c);

        setLoadingMessage("Computing dataset statistics...");
        const st = computeDatasetStats(s);
        setStats(st);
        setCollegeNames(getCollegeNames(c));

        setIsDataLoaded(true);
        setLoadingMessage("");
      } catch (err) {
        console.error("Failed to load data:", err);
        setLoadingMessage("Failed to load data. Please refresh.");
      }
    }
    load();
  }, []);

  // Load saved API key
  useEffect(() => {
    const savedKey = getAPIKey(aiConfig.provider);
    if (savedKey) {
      setAiConfig((prev) => ({ ...prev, apiKey: savedKey }));
    }
  }, [aiConfig.provider]);

  const runAnalysis = useCallback(async () => {
    if (!stats) return;

    setView("loading");
    setLoadingMessage("Running mathematical engine...");

    // Small delay for UX
    await new Promise((r) => setTimeout(r, 500));

    const results = await runEngine(profile, students, colleges, stats);
    setEngineResults(results);

    setLoadingMessage("Calculating portfolio probability...");
    const portfolio = calculatePortfolioChance(results);
    setPortfolioResult(portfolio);

    setLoadingMessage("Finding university suggestions...");
    const sugs = suggestUniversities(profile, colleges, students, stats);
    setSuggestions(sugs);

    setLoadingMessage("Analyzing gaps...");
    await new Promise((r) => setTimeout(r, 300));

    const gaps: GapAnalysis[] = [];
    for (const result of results.slice(0, 5)) {
      const college = findCollege(colleges, result.schoolName);
      if (college) {
        const gap = analyzeGaps(profile, result.schoolName, college, students, stats, result);
        gaps.push(gap);
      }
    }
    setGapAnalyses(gaps);

    setView("results");
  }, [profile, students, colleges, stats]);

  const runAI = useCallback(async () => {
    if (!aiConfig.apiKey) return;
    setAiLoading(true);
    try {
      saveAPIKey(aiConfig.provider, aiConfig.apiKey);
      const results = await runAIAnalysis(aiConfig, profile, engineResults, gapAnalyses, []);
      setAiResults(results);
    } catch (err) {
      console.error("AI analysis failed:", err);
      alert("AI analysis failed. Please check your API key and try again.");
    }
    setAiLoading(false);
  }, [aiConfig, profile, engineResults, gapAnalyses]);

  const downloadPDF = useCallback(() => {
    if (!stats) return;
    setShowAIPromptModal(true);
  }, [stats]);

  const executeDownload = useCallback(() => {
    if (!stats) return;
    generatePDFReport(profile, engineResults, gapAnalyses, stats, showPublicDetails);
    setShowAIPromptModal(false); // Optionally close after download, or keep it open for them to copy
  }, [profile, engineResults, gapAnalyses, stats, showPublicDetails]);

  // ── Render ──

  if (view === "loading") return <LoadingScreen message={loadingMessage} />;

  let content;
  if (view === "results") {
    content = (
      <ResultsPage
        profile={profile}
        results={engineResults}
        gaps={gapAnalyses}
        stats={stats!}
        portfolioResult={portfolioResult}
        suggestions={suggestions}
        onBack={() => setView("form")}
        onDownloadPDF={downloadPDF}
        aiEnabled={aiEnabled}
        setAiEnabled={setAiEnabled}
        aiConfig={aiConfig}
        setAiConfig={setAiConfig}
        aiResults={aiResults}
        aiLoading={aiLoading}
        onRunAI={runAI}
        onShowCalculations={(res) => setShowCalculations(res)}
        showPublicDetails={showPublicDetails}
        setShowPublicDetails={setShowPublicDetails}
      />
    );
  } else if (view === "form") {
    content = (
      <FormPage
        step={formStep}
        setStep={setFormStep}
        profile={profile}
        setProfile={setProfile}
        collegeNames={collegeNames}
        schoolSearch={schoolSearch}
        setSchoolSearch={setSchoolSearch}
        showSchoolDropdown={showSchoolDropdown}
        setShowSchoolDropdown={setShowSchoolDropdown}
        onSubmit={runAnalysis}
        onBack={() => setView("landing")}
        isScanning={isScanning}
        setIsScanning={setIsScanning}
        scanningStatus={scanningStatus}
        setScanningStatus={setScanningStatus}
      />
    );
  } else {
    content = (
      <LandingPage
        onStart={() => setView("form")}
        isLoading={!isDataLoaded}
        loadingMessage={loadingMessage}
        onShowWhy={() => setShowWhyModal(true)}
      />
    );
  }

  return (
    <>
      {content}
      {showWhyModal && <WhyModal onClose={() => setShowWhyModal(false)} />}
      {showCalculations && (
        <CalculationsModal
          result={showCalculations}
          onClose={() => setShowCalculations(null)}
        />
      )}
      {showAIPromptModal && (
        <AIPromptModal
          onDownload={() => executeDownload()}
          onClose={() => setShowAIPromptModal(false)}
        />
      )}

      {/* DEVELOPMENT ONLY: TEST PROFILE TOOLBAR */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-2 scale-90 origin-bottom-left group">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-black/90 p-2 border border-[var(--color-warning)] rounded flex items-center gap-2">
              <FlaskConical size={14} className="text-[var(--color-warning)] animate-pulse" />
              <span className="text-[10px] font-black text-[var(--color-warning)] font-sans uppercase tracking-widest">Developer Tools</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 bg-black/80 backdrop-blur-xl border border-white/10 p-2 rounded-lg shadow-2xl translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <p className="text-[9px] text-white/40 uppercase font-bold mb-1 px-1 tracking-tighter">Quick_Load_Profiles</p>
            {Object.keys(TEST_PROFILES).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setProfile(TEST_PROFILES[key]);
                  setFormStep(1); // Reset to first step to see the change
                  alert(`Loaded: ${key}`);
                }}
                className="text-left text-[11px] font-sans py-1.5 px-3 rounded hover:bg-[var(--color-primary)] hover:text-black transition-all border border-white/5 bg-white/5"
              >
                LOAD: {key.toUpperCase()}
              </button>
            ))}
            <div className="border-t border-white/10 mt-1 pt-1 flex flex-col gap-1">
              <button
                onClick={() => console.table(profile)}
                className="w-full text-left text-[9px] text-[var(--color-muted)] font-mono py-1 px-2 hover:text-white flex items-center gap-2"
              >
                <Terminal size={10} /> DUMP_STATE_TO_CONSOLE
              </button>
              <button
                onClick={() => {
                  setProfile({
                    isInternational: false,
                    schoolSystem: 'US_Standard',
                    name: "",
                    gender: "",
                    state: "",
                    intendedMajor: "Undecided",
                    majorCategory: "Other",
                    sat: null,
                    act: null,
                    preferredTestType: 'None',
                    unweightedGPA: 3.5,
                    weightedGPA: null,
                    numberOfAPCourses: 0,
                    numberOfIBCourses: 0,
                    numberOfHonorsCourses: 0,
                    extracurriculars: [],
                    awards: [],
                    targetColleges: [],
                    targetSchools: [],
                  });
                  setView("landing");
                  alert("System Reset Successfully.");
                }}
                className="w-full text-left text-[9px] text-[var(--color-danger)] font-sans py-1 px-2 hover:bg-[var(--color-danger)] hover:text-black flex items-center gap-2 transition-all"
              >
                <X size={10} /> RESET_SYSTEM_CACHE
              </button>
            </div>
          </div>
          <div className="bg-[var(--color-warning)] p-1.5 rounded-full flex items-center justify-center cursor-help">
            <AlertTriangle size={16} className="text-black" />
          </div>
        </div>
      )}
    </>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// AI PROMPT & DOWNLOAD MODAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function AIPromptModal({ onClose, onDownload }: { onClose: () => void; onDownload: () => void }) {
  const promptText = `I have attached my AdmitGPT deterministic mathematical audit. The PDF contains my raw Z-scores, spike modifiers, and the JSON payload mapping the structural engine data. 

   act as a Chief Admissions Strategist And college professional consultant with 30 years of experience and do the following:
1. Parse the JSON Matrix at the absolute end of the document to establish my factual profile.
2. Read the calculation traces and Z-scores to identify where my raw math differs from historical acceptances.
3. Ignore standard advice. Focus ONLY on actionable metrics based on my specific "gap" analysis computed by the system.
4. Tell me directly if my Spike Score needs raising or if my structural academic bounds are insufficient. Give me a 3-step brutal reality-check roadmap.
5. Give me the percenitages of acceptance for each university and overrall acceptance rate. (main thing to do)
6. Suggest more and better colleges to apply to based on my own profile`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in">
      <div className="glass-card w-full max-w-2xl p-8 relative border-[var(--color-primary)] overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <button onClick={onClose} className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
            <X size={24} />
          </button>
        </div>

        <h3 className="text-2xl font-bold mb-4 font-sans text-[var(--color-primary)] tracking-tight">
          AI Strategic Diagnostic
        </h3>

        <p className="text-sm text-[var(--color-muted)] mb-6 tracking-wide">
          The PDF you are about to download contains an exhaustive, machine-readable JSON data matrix and literal mathematical traces representing your exact location in our model. <strong className="text-white">To get the best possible strategic advice, feed the downloaded PDF directly into Claude or DeepSeek-R1 (with Thinking Mode).</strong>
        </p>

        <div className="bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.1)] p-4 rounded-lg mb-6 relative group">
          <p className="text-xs text-[var(--color-primary)] uppercase font-bold tracking-widest font-sans mb-2">Recommended Analysis Prompt:</p>
          <p className="text-sm font-sans text-[var(--color-foreground)] whitespace-pre-wrap">{promptText}</p>

          <button
            onClick={() => {
              navigator.clipboard.writeText(promptText);
              alert("Prompt copied to clipboard!");
            }}
            className="absolute top-4 right-4 text-xs bg-[var(--color-dark)] border border-[var(--color-border)] px-3 py-1 rounded text-[var(--color-muted)] hover:text-white hover:border-white transition-all opacity-50 group-hover:opacity-100"
          >
            Copy Prompt
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onDownload}
            className="flex-1 btn-primary text-md py-4 bg-[var(--color-primary)] text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(191,255,0,0.3)] flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Generate & Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CALCULATIONS MODAL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function CalculationsModal({ result, onClose }: { result: EngineResult; onClose: () => void }) {
  // Generate a plain-language explanation
  let simpleExplanation = "The engine used your SAT and GPA directly to estimate probability against historical acceptances.";

  if (result.protocolTriggered === 'OUTLIER') {
    simpleExplanation = "Your academic GPA weight was significantly reduced (by ~40%) because your achievements classify you as an exceptional Outlier.";
  } else if (result.protocolTriggered === 'GAME_MAKER') {
    simpleExplanation = "Your academic GPA is treated as largely irrelevant due to a world-class Game Maker achievement. Standard statistics no longer apply.";
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in">
      <div className="glass-card w-full max-w-lg p-8 relative border-[var(--color-primary)] overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <button onClick={onClose} className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
            <X size={24} />
          </button>
        </div>

        <h3 className="text-2xl font-bold mb-6 font-sans text-[var(--color-primary)] tracking-tight">
          Factual Analysis: {result.schoolName}
        </h3>

        <div className="space-y-6 font-sans text-sm">
          <div className="p-4 rounded-lg bg-[rgba(0,0,0,0.3)] border border-[var(--color-border)]">
            <p className="text-[var(--color-muted)] mb-2 uppercase text-[10px] tracking-widest font-bold">Base Equation</p>
            <p className="text-[var(--color-foreground)] break-all font-mono">
              P(x) = Sigmoid({result.rawScore.toFixed(3)})
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 rounded-lg border border-[var(--color-border)]">
              <p className="text-[var(--color-muted)] text-[10px] uppercase mb-1">Academic Z</p>
              <p className="text-lg font-bold text-[var(--color-foreground)]">{result.academicZScore.toFixed(3)}</p>
            </div>
            <div className="p-3 rounded-lg border border-[var(--color-border)]">
              <p className="text-[var(--color-muted)] text-[10px] uppercase mb-1">Spike Score</p>
              <p className="text-lg font-bold text-[var(--color-foreground)]">{result.spikeScore.toFixed(3)}</p>
            </div>
            <div className="p-3 rounded-lg border border-[var(--color-border)]">
              <p className="text-[var(--color-muted)] text-[10px] uppercase mb-1">Major Mod</p>
              <p className="text-lg font-bold text-[var(--color-foreground)]">{result.majorModifier.toFixed(3)}x</p>
            </div>
            <div className="p-3 rounded-lg border border-[var(--color-border)]">
              <p className="text-[var(--color-muted)] text-[10px] uppercase mb-1">Intl Mod</p>
              <p className="text-lg font-bold text-[var(--color-foreground)]">{result.intlModifier.toFixed(3)}</p>
            </div>
          </div>

          <div className="p-4 bg-[var(--color-card-hover)] border-l-2 border-[var(--color-primary)]">
            <p className="text-[12px] text-[var(--color-foreground)] font-sans mb-1 font-bold">Simple Logic Translation:</p>
            <p className="text-[11px] text-[var(--color-muted)] font-sans">{simpleExplanation}</p>
          </div>

          <div className="pt-4 border-t border-[var(--color-border)]">
            <p className="text-[var(--color-muted)] text-xs leading-relaxed italic">
              "Mathematics should never be a secret. These values represent your statistical distance from the mean in each category. A Z-score of +1.0 means you are in the top 16% of the dataset."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LANDING PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function LandingPage({
  onStart,
  isLoading,
  loadingMessage,
  onShowWhy
}: {
  onStart: () => void;
  isLoading: boolean;
  loadingMessage: string;
  onShowWhy: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[#05050a]">
      <Header />

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full">
          <section className="relative py-20 px-8 rounded-[2rem] overflow-hidden glass-card border-none shadow-[0_0_100px_rgba(191,255,0,0.03)] bg-black/40 backdrop-blur-3xl">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(191,255,0,0.05)] via-transparent to-transparent pointer-events-none" />
            
            <div className="max-w-3xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(191,255,0,0.05)] border border-[rgba(191,255,0,0.1)] text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
                <Sparkles size={14} /> Intelligence for Education
              </div>
              
              {/* Logo container - Soft frame */}
              <div className="mx-auto mb-8 w-32 h-32 relative p-1 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-primary)] to-transparent opacity-20 rounded-3xl group-hover:opacity-40 transition-opacity" />
                <div className="relative w-full h-full bg-black overflow-hidden border border-white/10 rounded-2xl shadow-2xl">
                  <Image
                    src="/assets/AdmitGPT.png"
                    alt="AdmitGPT Logo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8 animate-fade-in-up uppercase">
                ADMIT<span className="text-[var(--color-primary)]">GPT</span>
              </h1>
              
              <p className="text-lg md:text-xl text-[var(--color-muted)] leading-relaxed mb-12 max-w-2xl mx-auto animate-fade-in-up [animation-delay:100ms] font-medium">
                The world&apos;s first transparent, multiplicative admissions engine. 
                Designed by students who believe mathematical truth should be free.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up [animation-delay:200ms]">
                <button 
                  onClick={onStart}
                  disabled={isLoading}
                  className="btn-primary !px-12 !py-5 !text-lg !rounded-2xl w-full sm:w-auto shadow-2xl shadow-[var(--color-primary-glow)] group/btn"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner !w-5 !h-5 !border-2 !border-black" />
                      <span>{loadingMessage}</span>
                    </>
                  ) : (
                    <>
                      <span>Start Free Analysis</span>
                      <ArrowRight size={20} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                
                <button 
                  onClick={onShowWhy}
                  className="btn-secondary !px-12 !py-5 !text-lg !rounded-2xl w-full sm:w-auto hover:border-[var(--color-primary)]/30"
                >
                  Our Philosophy
                </button>
              </div>

              <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                 <div className="flex flex-col items-center">
                    <span className="text-2xl font-black text-white">1,164+</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold">Verified Profiles</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-2xl font-black text-white">100%</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold">Client-Side Logic</span>
                 </div>
                 <div className="flex flex-col items-center">
                    <span className="text-2xl font-black text-white">0</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold">Data Tracking</span>
                 </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-muted)] bg-[#030307]">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 AdmitGPT. Built for the Transparency Movement.</p>
          <div className="flex gap-4">
            <a href="/transparency" className="hover:text-[var(--color-foreground)] transition-colors">Transparency Report</a>
            <a href="mailto:dariangosztafio@gmail.com" className="hover:text-[var(--color-foreground)] transition-colors flex items-center gap-1">
              <Mail size={12} /> Contact Us
            </a>
            <a href="https://github.com/Zierax/AdmitGPT" className="hover:text-[var(--color-foreground)] transition-colors">Source Code</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LOADING SCREEN
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05050a]">
      <div className="text-center animate-fade-in-up max-w-md px-6">
        <div className="loading-spinner mx-auto mb-8 !w-12 !h-12 !border-4" />
        <h2 className="text-xl font-bold mb-2 font-sans tracking-tight">Analyzing Admission Patterns</h2>
        <p className="text-[var(--color-muted)] text-sm mb-6">{message}</p>
        <div className="p-4 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] text-left">
          <p className="text-xs text-[var(--color-muted)] flex items-center gap-2">
            <Zap size={14} className="text-[var(--color-primary)]" />
            Analysis typically takes <span className="text-[var(--color-foreground)] font-medium">1-2 minutes</span> depending on profile complexity and cluster size.
          </p>
        </div>
        <p className="text-[10px] text-[var(--color-muted)] mt-6 opacity-40 uppercase tracking-widest font-sans">
          All computation runs client-side in your browser
        </p>
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FORM PAGE (5-step)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface FormPageProps {
  step: number;
  setStep: (s: number) => void;
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  collegeNames: string[];
  schoolSearch: string;
  setSchoolSearch: (s: string) => void;
  showSchoolDropdown: boolean;
  setShowSchoolDropdown: (s: boolean) => void;
  onSubmit: () => void;
  onBack: () => void;
  isScanning: boolean;
  setIsScanning: (b: boolean) => void;
  scanningStatus: string;
  setScanningStatus: (s: string) => void;
}

function FormPage({
  step,
  setStep,
  profile,
  setProfile,
  collegeNames,
  schoolSearch,
  setSchoolSearch,
  showSchoolDropdown,
  setShowSchoolDropdown,
  onSubmit,
  onBack,
  isScanning,
  setIsScanning,
  scanningStatus,
  setScanningStatus,
}: FormPageProps) {
  const totalSteps = 5;
  const stepNames = ["Demographics", "Academics", "Activities", "Awards", "Schools"];

  return (
    <div className="min-h-screen flex flex-col bg-[#05050a]">
      <Header showBack onBack={onBack} />

      <div className="flex-1 max-w-2xl mx-auto w-full px-6 py-8">
        {/* Step indicator */}
        <div className="step-indicator mb-8">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div key={i} className="flex items-center flex-1">
              <button
                onClick={() => setStep(i + 1)}
                className={`step-dot ${step === i + 1 ? "active" : ""} ${step > i + 1 ? "completed" : ""}`}
                title={stepNames[i]}
              >
                {step > i + 1 ? <Check size={14} /> : i + 1}
              </button>
              {i < totalSteps - 1 && <div className={`step-line ${step > i + 1 ? "completed" : ""}`} />}
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-1 flex items-center justify-between">
          <span>{stepNames[step - 1]}</span>
        </h2>

        <p className="text-sm text-[var(--color-muted)] mb-6">
          {step === 1 && "Tell us about yourself — this helps us compare you to similar applicants."}
          {step === 2 && "Your academic profile is the foundation of the analysis."}
          {step === 3 && "List up to 10 extracurriculars with their impact tier."}
          {step === 4 && "List up to 5 awards or honors."}
          {step === 5 && "Select the schools you want to analyze."}
        </p>

        <div className="glass-card !p-8 mb-10 shadow-xl border-white/5 bg-black/40 backdrop-blur-3xl rounded-2xl">
          {step === 1 && <Step1Demographics profile={profile} setProfile={setProfile} />}
          {step === 2 && <Step2Academics profile={profile} setProfile={setProfile} />}
          {step === 3 && <Step3Extracurriculars profile={profile} setProfile={setProfile} />}
          {step === 4 && <Step4Awards profile={profile} setProfile={setProfile} />}
          {step === 5 && (
            <Step5Schools
              profile={profile}
              setProfile={setProfile}
              collegeNames={collegeNames}
              schoolSearch={schoolSearch}
              setSchoolSearch={setSchoolSearch}
              showSchoolDropdown={showSchoolDropdown}
              setShowSchoolDropdown={setShowSchoolDropdown}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center gap-6">
          <button
            onClick={() => step > 1 && setStep(step - 1)}
            className="btn-secondary !rounded-xl flex-1 md:flex-none justify-center"
            disabled={step === 1}
            style={{ opacity: step === 1 ? 0 ? 1 : 0.3 : 1 }}
          >
            <ArrowLeft size={16} /> Previous
          </button>
          {step < totalSteps ? (
            <button onClick={() => {
              // Validate current step before proceeding
              if (step === 3) {
                // Check for missing EC titles
                const missingTitles = profile.extracurriculars.filter(ec => !ec.title.trim());
                if (missingTitles.length > 0) {
                  alert(`Please add titles for ${missingTitles.length} extracurricular activity(ies) before proceeding.`);
                  return;
                }
              }
              if (step === 4) {
                // Check for missing award titles
                const missingTitles = profile.awards.filter(award => !award.title.trim());
                if (missingTitles.length > 0) {
                  alert(`Please add titles for ${missingTitles.length} award(s) before proceeding.`);
                  return;
                }
              }
              setStep(step + 1);
            }} className="btn-primary !rounded-xl flex-1 md:flex-none justify-center shadow-lg shadow-[var(--color-primary-glow)]">
              Next Step <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => {
                // Final validation before analysis
                const missingECTitles = profile.extracurriculars.filter(ec => !ec.title.trim());
                const missingAwardTitles = profile.awards.filter(award => !award.title.trim());

                if (missingECTitles.length > 0 || missingAwardTitles.length > 0) {
                  alert(`Please complete all titles:\n• ${missingECTitles.length} missing extracurricular title(s)\n• ${missingAwardTitles.length} missing award title(s)`);
                  return;
                }

                if (profile.targetSchools.length === 0) {
                  alert('Please add at least one school to analyze.');
                  return;
                }

                onSubmit();
              }}
              className="btn-primary !rounded-xl flex-1 md:flex-none justify-center shadow-xl shadow-[var(--color-primary-glow)]"
              disabled={profile.targetSchools.length === 0}
            >
              <Sparkles size={16} /> Run Final Audit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Step Components ──

function Step1Demographics({ profile, setProfile }: { profile: UserProfile; setProfile: React.Dispatch<React.SetStateAction<UserProfile>> }) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-2">Student Name (For Certificate)</label>
        <input
          type="text"
          className="input-field"
          placeholder="Enter your full name"
          value={profile.name || ""}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Are you an international applicant?</label>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setProfile({ ...profile, isInternational: false })}
            className={`flex-1 py-3.5 rounded-xl border text-sm font-bold transition-all ${!profile.isInternational
              ? "border-[var(--color-primary)] bg-[rgba(191,255,0,0.05)] text-[var(--color-primary)] shadow-lg shadow-[rgba(191,255,0,0.05)]"
              : "border-white/5 bg-white/5 text-[var(--color-muted)] hover:border-white/20"
              }`}
          >
            US / Permanent Resident
          </button>
          <button
            onClick={() => setProfile({ ...profile, isInternational: true })}
            className={`flex-1 py-3.5 rounded-xl border text-sm font-bold transition-all ${profile.isInternational
              ? "border-[var(--color-primary)] bg-[rgba(191,255,0,0.05)] text-[var(--color-primary)] shadow-lg shadow-[rgba(191,255,0,0.05)]"
              : "border-white/5 bg-white/5 text-[var(--color-muted)] hover:border-white/20"
              }`}
          >
            International Applicant
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">School System</label>
          <select
            className="input-field"
            value={profile.schoolSystem}
            onChange={(e) => setProfile({ ...profile, schoolSystem: e.target.value as any })}
          >
            <option value="US_Standard">US Standard (GPA/AP/IB)</option>
            <option value="Intl_Standard">International (A-Levels/IB/Etc)</option>
            <option value="National_Non_Standard">National/Non-Standard (e.g., Egypt STEM)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Intended Major</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g., Computer Science"
            value={profile.intendedMajor}
            onChange={(e) => {
              const major = e.target.value;
              setProfile({ ...profile, intendedMajor: major, majorCategory: classifyMajor(major) });
            }}
          />
        </div>
      </div>

      {profile.intendedMajor && (
        <p className="text-xs text-[var(--color-muted)] mt-1.5">
          Category: <span className="text-[var(--color-primary)] font-medium">{getMajorCategoryLabel(profile.majorCategory)}</span>
        </p>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Gender</label>
        <select
          className="input-field"
          value={profile.gender}
          onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
        >
          <option value="">Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>

      {!profile.isInternational && (
        <div>
          <label className="block text-sm font-medium mb-2">State of Residence</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g., California, New York"
            value={profile.state}
            onChange={(e) => setProfile({ ...profile, state: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}

function Step2Academics({ profile, setProfile }: { profile: UserProfile; setProfile: React.Dispatch<React.SetStateAction<UserProfile>> }) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">SAT Score</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g., 1450"
            min={400}
            max={1600}
            value={profile.sat ?? ""}
            onChange={(e) => setProfile({ ...profile, sat: e.target.value ? parseInt(e.target.value) : null })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ACT Score</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g., 32"
            min={1}
            max={36}
            value={profile.act ?? ""}
            onChange={(e) => setProfile({ ...profile, act: e.target.value ? parseInt(e.target.value) : null })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Unweighted GPA</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g., 3.85"
            min={0}
            max={4}
            step={0.01}
            value={profile.unweightedGPA ?? ""}
            onChange={(e) => setProfile({ ...profile, unweightedGPA: e.target.value ? parseFloat(e.target.value) : null })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Weighted GPA (optional)</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g., 4.6"
            min={0}
            max={5.5}
            step={0.01}
            value={profile.weightedGPA ?? ""}
            onChange={(e) => setProfile({ ...profile, weightedGPA: e.target.value ? parseFloat(e.target.value) : null })}
          />
        </div>
      </div>

      {profile.schoolSystem !== 'National_Non_Standard' ? (
        <div className="grid grid-cols-3 gap-4 border border-white/5 p-5 rounded-2xl bg-white/5">
          <div>
            <label className="block text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-widest mb-2">AP Courses</label>
            <input
              type="number"
              className="input-field !py-3"
              placeholder="0"
              min={0}
              max={20}
              value={profile.numberOfAPCourses || ""}
              onChange={(e) => setProfile({ ...profile, numberOfAPCourses: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-widest mb-2">IB Courses</label>
            <input
              type="number"
              className="input-field !py-3"
              placeholder="0"
              min={0}
              max={20}
              value={profile.numberOfIBCourses || ""}
              onChange={(e) => setProfile({ ...profile, numberOfIBCourses: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-widest mb-2">Honors</label>
            <input
              type="number"
              className="input-field !py-3"
              placeholder="0"
              min={0}
              max={30}
              value={profile.numberOfHonorsCourses || ""}
              onChange={(e) => setProfile({ ...profile, numberOfHonorsCourses: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 border border-[var(--color-primary)] border-opacity-30 p-4 rounded bg-[rgba(191,255,0,0.05)]">
          <div className="text-[11px] text-[var(--color-primary)] font-sans uppercase tracking-wider mb-2 font-bold">
            Non-Standard International Curriculum (Egypt STEM / Similar)
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Advanced Curriculum / Honors subjects</label>
            <input
              type="number"
              className="input-field"
              placeholder="Total advanced subjects taken"
              min={0}
              max={30}
              value={profile.numberOfHonorsCourses || ""}
              onChange={(e) => setProfile({ ...profile, numberOfAPCourses: 0, numberOfIBCourses: 0, numberOfHonorsCourses: parseInt(e.target.value) || 0 })}
            />
          </div>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            AP & IB metrics are statically disabled for your designated school system. Your academic weight relies solely on standardized testing and your unweighted cumulative average.
          </p>
        </div>
      )}

      <div className="p-3 rounded-lg bg-[var(--color-primary-glow)] border border-[var(--color-primary)] border-opacity-20">
        <p className="text-xs text-[var(--color-muted)]">
          <strong className="text-[var(--color-primary)]">Note:</strong> If you have both SAT and ACT, we&apos;ll use the higher equivalent score.
          ACT is converted to SAT using the College Board concordance table.
        </p>
      </div>
    </div>
  );
}

function Step3Extracurriculars({ profile, setProfile }: { profile: UserProfile; setProfile: React.Dispatch<React.SetStateAction<UserProfile>> }) {
  const addEC = () => {
    if (profile.extracurriculars.length >= 10) return;
    setProfile({
      ...profile,
      extracurriculars: [...profile.extracurriculars, {
        title: "",
        description: "",
        tier: 3,
        category: 'Other' as ActivityCategory,
        tierLevel: 'Local' as const,
        externalValidation: 'Self_Reported' as const,
        rarity: 'Common' as const,
        institutionalStrength: 'Standard' as const,
        cognitiveLoad: 'Medium' as const,
        confidence: 100
      }],
    });
  };

  const removeEC = (index: number) => {
    setProfile({
      ...profile,
      extracurriculars: profile.extracurriculars.filter((_, i) => i !== index),
    });
  };

  const updateEC = (index: number, updates: Partial<UserEC>) => {
    setProfile({
      ...profile,
      extracurriculars: profile.extracurriculars.map((ec, i) => (i === index ? { ...ec, ...updates } : ec)),
    });
  };

  return (
    <div className="space-y-4">
      {/* Tier Guide */}
      <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] font-sans">
        <p className="text-xs font-bold mb-3 text-[var(--color-primary)] uppercase tracking-wider">Activity Tier Classifications:</p>
        <p className="text-[10px] text-[var(--color-muted)] mb-4 leading-relaxed">
          Tiers reflect the <span className="text-[var(--color-foreground)]">scope, selectivity, and impact</span> of each activity. Self-classification is verified against our dataset&apos;s tier distribution. Overrating will skew your results and hurt accuracy.
        </p>
        <div className="space-y-3 text-xs text-[var(--color-muted)]">
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-gm border-[var(--color-accent)] !text-[var(--color-accent)]">GAME MAKER</span> <span className="text-[var(--color-accent)] font-bold">Global icon-level</span> — Reshapes an industry or culture.</p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-accent)] ml-1">Examples: TIME 100 Most Influential, Forbes 30 Under 30, Olympic Medal, Fields Medal, Nobel Prize, founded a company valued $10M+, ISEF Grand Award Winner.</p>
          </div>
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-0">OUTLIER</span> <span className="text-[var(--color-primary)] font-bold">World-class</span> — Top 0.1% of peers globally in a domain.</p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-primary)] ml-1">Examples: Published in Nature/IEEE/Science, Defcon/Black Hat speaker, CVE-assigned vulnerability discoverer, International Math/Science Olympiad Gold, ISEF Finalist, patent holder, YC-backed startup founder.</p>
          </div>
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-1">TIER 1</span> <span className="text-[var(--color-info)] font-bold">National recognition</span> — Top 1-5% nationally in a domain.</p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-info)] ml-1">Examples: USAMO/USACO Platinum qualifier, national debate champion, RSI/MITES/SSP attendee, founded nonprofit with $10k+ revenue or 1000+ beneficiaries, Congressional Award Gold Medal, published in a peer-reviewed journal.</p>
          </div>
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-2">TIER 2</span> <span className="text-[var(--color-warning)] font-bold">State/Regional impact</span> — Significant leadership or recognition beyond school.</p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-warning)] ml-1">Examples: State science fair winner, All-State athlete, Student Body President, Varsity Team Captain (competitive league), summer internship at recognized company, regional orchestra first chair, Model UN Best Delegate at major conference.</p>
          </div>
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-3">TIER 3</span> <span className="text-[var(--color-muted)] font-bold">School-level / Participation</span> — Active involvement without external recognition.</p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-border)] ml-1">Examples: School club member/officer, local community volunteer (under 100 hours), JV athlete, personal coding projects (no users/traction), church youth group, part-time job, school newspaper contributor.</p>
          </div>
        </div>
      </div>

      {/* Activity Cards */}
      {profile.extracurriculars.map((ec, i) => (
        <div key={i} className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] animate-slide-in relative group" style={{ animationDelay: `${i * 50}ms` }}>
          <div className="flex items-start gap-3">
            <div className="flex-1 space-y-3">
              <input
                type="text"
                className="input-field"
                placeholder="Activity title (e.g., Speaker at Black Hat 2025)"
                value={ec.title}
                onChange={(e) => updateEC(i, { title: e.target.value })}
              />
              <input
                type="text"
                className="input-field"
                placeholder="Brief description (metrics, impact, stack)"
                value={ec.description}
                onChange={(e) => updateEC(i, { description: e.target.value })}
              />
              <div className="flex flex-wrap gap-2">
                {([-1, 0, 1, 2, 3] as ECTier[]).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => updateEC(i, { tier })}
                    className={`tier-badge cursor-pointer transition-all ${ec.tier === tier ? `tier-${tier}` : "opacity-40 hover:opacity-100 grayscale hover:grayscale-0"
                      }`}
                  >
                    {tier === -1 ? "GM" : tier === 0 ? "Outlier" : `Tier ${tier}`}
                  </button>
                ))}
              </div>

              {/* Rubric Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Category</label>
                  <select
                    className="input-field !py-1 !text-xs"
                    value={ec.category}
                    onChange={(e) => updateEC(i, { category: e.target.value as ActivityCategory })}
                  >
                    <option value="STEM">STEM</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Arts">Arts</option>
                    <option value="Sports">Sports</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Service">Service</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Scope (Tier Level)</label>
                  <select
                    className="input-field !py-1 !text-xs"
                    value={ec.tierLevel}
                    onChange={(e) => updateEC(i, { tierLevel: e.target.value as any })}
                  >
                    <option value="Local">Local (1x)</option>
                    <option value="National">National (3x)</option>
                    <option value="International">International (5x)</option>
                    <option value="Global_Elite">Global Elite (8x)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Validation</label>
                  <select
                    className="input-field !py-1 !text-xs"
                    value={ec.externalValidation}
                    onChange={(e) => updateEC(i, { externalValidation: e.target.value as any })}
                  >
                    <option value="Self_Reported">Self-Reported (0.6x)</option>
                    <option value="Peer_Vouched">Peer-Vouched (0.75x)</option>
                    <option value="Institutional">Institutional (0.9x)</option>
                    <option value="Professional_Audit">Professional Audit (1x)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Rarity</label>
                  <select
                    className="input-field !py-1 !text-xs"
                    value={ec.rarity}
                    onChange={(e) => updateEC(i, { rarity: e.target.value as any })}
                  >
                    <option value="Common">Common</option>
                    <option value="Rare">Rare (&lt;10%)</option>
                    <option value="Ultra_Rare">Ultra-Rare (&lt;1%)</option>
                    <option value="Unique">Unique (0.01%)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                <div className="col-span-1">
                  <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Inst. Strength</label>
                  <select
                    className="input-field !py-1 !text-xs"
                    value={ec.institutionalStrength}
                    onChange={(e) => updateEC(i, { institutionalStrength: e.target.value as any })}
                  >
                    <option value="Standard">Standard</option>
                    <option value="Recognized">Recognized</option>
                    <option value="Prestigious">Prestigious</option>
                    <option value="World_Class">World-Class</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Cognitive Load</label>
                  <select
                    className="input-field !py-1 !text-xs"
                    value={ec.cognitiveLoad}
                    onChange={(e) => updateEC(i, { cognitiveLoad: e.target.value as any })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Research_Level">Research-Level</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block">Confidence</label>
                    <span className="text-[10px] font-sans text-[var(--color-primary)] font-bold">{ec.confidence}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    className="w-full h-1 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                    value={ec.confidence}
                    onChange={(e) => updateEC(i, { confidence: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              {/* Verification Tooltips */}
              {ec.tier === -1 && (
                <div className="p-3 mt-2 border-l-2 border-[var(--color-accent)] bg-[rgba(255,255,255,0.05)] text-[10px] text-[var(--color-accent)] font-sans animate-slide-in">
                  <div className="flex items-center gap-1 font-bold mb-1 uppercase">
                    <Zap size={12} /> HIGH_IMPACT_REPORT
                  </div>
                  "Game Maker" status forces a logic short-circuit. Academic metrics will be treated as secondary sanity checks. Ensure this is a globally recognized achievement (e.g., TIME 100, Olympic Medal).
                </div>
              )}
              {ec.tier === 0 && (
                <div className="p-3 mt-2 border-l-2 border-[var(--color-primary)] bg-[rgba(191,255,0,0.05)] text-[10px] text-[var(--color-primary)] font-sans animate-slide-in">
                  <div className="flex items-center gap-1 font-bold mb-1 uppercase">
                    <Zap size={12} /> Elite Differentiation Active
                  </div>
                  "Game Changer" status detected. This entry will override low academic stats (up to 40% weight reduction) if substantiated. Ensure this is a world-class achievement.
                </div>
              )}
              {ec.tier === 1 && (
                <div className="p-2 mt-2 border-l-2 border-[var(--color-info)] bg-[rgba(59,130,246,0.05)] text-[10px] text-[var(--color-info)] font-sans animate-slide-in">
                  National/International recognition required. (e.g., USACO Platinum, ISEF Finalist).
                </div>
              )}
            </div>
            <button onClick={() => removeEC(i)} className="text-[var(--color-muted)] hover:text-[var(--color-danger)] transition-colors p-1">
              <X size={16} />
            </button>
          </div>
        </div>
      ))}

      {profile.extracurriculars.length < 10 && (
        <button onClick={addEC} className="btn-secondary w-full border-dashed">
          <Plus size={16} /> Add Activity ({profile.extracurriculars.length}/10)
        </button>
      )}
    </div>
  );
}

function Step4Awards({ profile, setProfile }: { profile: UserProfile; setProfile: React.Dispatch<React.SetStateAction<UserProfile>> }) {
  const addAward = () => {
    setProfile({
      ...profile,
      awards: [...profile.awards, {
        title: "",
        description: "",
        tier: 3,
        category: 'Other' as ActivityCategory,
        tierLevel: 'Local' as const,
        externalValidation: 'Self_Reported' as const,
        rarity: 'Common' as const,
        institutionalStrength: 'Standard' as const,
        cognitiveLoad: 'Medium' as const,
        confidence: 100
      }],
    });
  };

  const removeAward = (index: number) => {
    setProfile({
      ...profile,
      awards: profile.awards.filter((_, i) => i !== index),
    });
  };

  const updateAward = (index: number, updates: Partial<UserAward>) => {
    setProfile({
      ...profile,
      awards: profile.awards.map((a, i) => (i === index ? { ...a, ...updates } : a)),
    });
  };

  return (
    <div className="space-y-6">
      {/* Award Tier Guide */}
      <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] font-sans">
        <p className="text-xs font-bold mb-3 text-[var(--color-primary)] uppercase tracking-wider">Award Tier Classifications:</p>
        <p className="text-[10px] text-[var(--color-muted)] mb-4 leading-relaxed">
          Awards measure <span className="text-[var(--color-foreground)]">external recognition and validation</span> of your achievements. Unlike activities (which measure what you <em>do</em>), awards measure how the <em>world</em> responded. Be honest — inflated tiers reduce model accuracy.
        </p>
        <div className="space-y-3 text-xs text-[var(--color-muted)]">
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-gm border-[var(--color-accent)] !text-[var(--color-accent)]">GAME MAKER</span> <span className="text-[var(--color-accent)] font-bold">Once-in-a-generation</span></p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-accent)] ml-1">Examples: Nobel Prize, Fields Medal, Pulitzer Prize, Olympic Gold, MacArthur Fellowship, ISEF Gordon E. Moore Award ($75k grand prize).</p>
          </div>
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-0">OUTLIER</span> <span className="text-[var(--color-primary)] font-bold">International elite</span></p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-primary)] ml-1">Examples: International Olympiad Gold/Silver (IMO, IPhO, IOI), ISEF Top 3 Category, Regeneron STS Top 10, Intel ISEF Best of Category, Davidson Fellow, Presidential Scholar.</p>
          </div>
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-1">TIER 1</span> <span className="text-[var(--color-info)] font-bold">National recognition</span></p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-info)] ml-1">Examples: USAMO Qualifier, National Merit Finalist, Regeneron STS Semifinalist, US Presidential Scholars nominee, National AP Scholar, Scholastic Art & Writing Gold Key (National), USABO/USACO Gold.</p>
          </div>
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-2">TIER 2</span> <span className="text-[var(--color-warning)] font-bold">State/Regional recognition</span></p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-warning)] ml-1">Examples: AMC 10/12 Honor Roll, State Science Fair Top 3, AP Scholar with Distinction, Regional Scholastic Art Award, All-State Band/Orchestra, State Math League champion, Eagle Scout/Gold Award.</p>
          </div>
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-3">TIER 3</span> <span className="text-[var(--color-muted)] font-bold">School/Local recognition</span></p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-border)] ml-1">Examples: Honor Roll, AP Scholar (base level), School subject award, Local essay contest winner, Principal's Award, School MVP, Certificate of Achievement.</p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg border border-[var(--color-primary)] bg-[var(--color-primary-glow)]">
        <p className="text-sm font-bold text-[var(--color-primary)] mb-1">Quality over Quantity</p>
        <p className="text-xs text-[var(--color-muted)]">
          While you can add unlimited awards, the algorithm values impact. We recommend focusing on your <span className="text-[var(--color-foreground)] font-medium">top 5 to 10</span> most significant achievements. Adding many Tier 3 awards does not significantly improve your profile score.
        </p>
      </div>

      <div className="space-y-4">
        {profile.awards.map((award, i) => (
          <div key={i} className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] animate-slide-in relative group">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Award name (e.g., USAMO Qualifier, Regeneron STS Semifinalist)"
                  value={award.title}
                  onChange={(e) => updateAward(i, { title: e.target.value })}
                />
                <input
                  type="text"
                  className="input-field"
                  placeholder="Brief description (metrics, impact, context)"
                  value={award.description}
                  onChange={(e) => updateAward(i, { description: e.target.value })}
                />
                <div className="flex flex-wrap gap-2">
                  {([-1, 0, 1, 2, 3] as ECTier[]).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => updateAward(i, { tier })}
                      className={`tier-badge cursor-pointer transition-all ${award.tier === tier ? `tier-${tier}` : "opacity-40 hover:opacity-100 grayscale hover:grayscale-0"
                        }`}
                    >
                      {tier === -1 ? "GM" : tier === 0 ? "Outlier" : `Tier ${tier}`}
                    </button>
                  ))}
                </div>

                {/* Rubric Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                  <div>
                    <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Category</label>
                    <select
                      className="input-field !py-1 !text-xs"
                      value={award.category}
                      onChange={(e) => updateAward(i, { category: e.target.value as ActivityCategory })}
                    >
                      <option value="STEM">STEM</option>
                      <option value="Humanities">Humanities</option>
                      <option value="Arts">Arts</option>
                      <option value="Sports">Sports</option>
                      <option value="Leadership">Leadership</option>
                      <option value="Service">Service</option>
                      <option value="Business">Business</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Scope</label>
                    <select
                      className="input-field !py-1 !text-xs"
                      value={award.tierLevel}
                      onChange={(e) => updateAward(i, { tierLevel: e.target.value as any })}
                    >
                      <option value="Local">Local (1x)</option>
                      <option value="National">National (3x)</option>
                      <option value="International">International (5x)</option>
                      <option value="Global_Elite">Global Elite (8x)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Validation</label>
                    <select
                      className="input-field !py-1 !text-xs"
                      value={award.externalValidation}
                      onChange={(e) => updateAward(i, { externalValidation: e.target.value as any })}
                    >
                      <option value="Self_Reported">Self-Reported (0.6x)</option>
                      <option value="Peer_Vouched">Peer-Vouched (0.75x)</option>
                      <option value="Institutional">Institutional (0.9x)</option>
                      <option value="Professional_Audit">Professional Audit (1x)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Rarity</label>
                    <select
                      className="input-field !py-1 !text-xs"
                      value={award.rarity}
                      onChange={(e) => updateAward(i, { rarity: e.target.value as any })}
                    >
                      <option value="Common">Common</option>
                      <option value="Rare">Rare (&lt;10%)</option>
                      <option value="Ultra_Rare">Ultra-Rare (&lt;1%)</option>
                      <option value="Unique">Unique (0.01%)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  <div className="col-span-1">
                    <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Inst. Strength</label>
                    <select
                      className="input-field !py-1 !text-xs"
                      value={award.institutionalStrength}
                      onChange={(e) => updateAward(i, { institutionalStrength: e.target.value as any })}
                    >
                      <option value="Standard">Standard</option>
                      <option value="Recognized">Recognized</option>
                      <option value="Prestigious">Prestigious</option>
                      <option value="World_Class">World-Class</option>
                    </select>
                  </div>
                  <div className="col-span-1">
                    <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Cognitive Load</label>
                    <select
                      className="input-field !py-1 !text-xs"
                      value={award.cognitiveLoad}
                      onChange={(e) => updateAward(i, { cognitiveLoad: e.target.value as any })}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Research_Level">Research-Level</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block">Confidence</label>
                      <span className="text-[10px] font-sans font-bold text-[var(--color-primary)]">{award.confidence}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      className="w-full h-1 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                      value={award.confidence}
                      onChange={(e) => updateAward(i, { confidence: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                {award.tier === -1 && (
                  <div className="p-3 mt-2 border-l-2 border-[var(--color-accent)] bg-[rgba(255,255,255,0.05)] text-[10px] text-[var(--color-accent)] font-sans animate-slide-in">
                    <div className="flex items-center gap-1 font-bold mb-1 uppercase">
                      <Zap size={12} /> HIGH_IMPACT_REPORT — GAME MAKER AWARD
                    </div>
                    This award classification forces a heavy spike modifier. Only select this for once-in-a-generation honors (Nobel, Olympic Gold).
                  </div>
                )}
              </div>
              <button onClick={() => removeAward(i)} className="text-[var(--color-muted)] hover:text-[var(--color-danger)] transition-colors p-1">
                <X size={16} />
              </button>
            </div>
          </div>
        ))}

        <button onClick={addAward} className="btn-secondary w-full border-dashed border-2 hover:border-[var(--color-primary)]">
          <Plus size={16} /> Add Award ({profile.awards.length})
        </button>
      </div>

      <div className="pt-6 border-t border-[var(--color-border)]">
        <label className="block text-sm font-bold mb-2 flex items-center gap-2">
          Personal Essay <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-[var(--color-border)] text-[var(--color-muted)] uppercase tracking-wider">Holistic Context</span>
        </label>
        <p className="text-xs text-[var(--color-muted)] mb-3">
          The mathematical engine does not analyze text. This content is for the <span className="text-[var(--color-foreground)] font-medium">holistic report</span> used by the AI/PDF generation to provide qualitative feedback.
        </p>
        <textarea
          className="input-field min-h-[150px] resize-none font-sans text-sm leading-relaxed"
          placeholder="Paste your Common App essay or a summary here..."
          value={profile.essay || ""}
          onChange={(e) => setProfile({ ...profile, essay: e.target.value })}
        />
      </div>
    </div>
  );
}

function Step5Schools({
  profile,
  setProfile,
  collegeNames,
  schoolSearch,
  setSchoolSearch,
  showSchoolDropdown,
  setShowSchoolDropdown,
}: {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  collegeNames: string[];
  schoolSearch: string;
  setSchoolSearch: (s: string) => void;
  showSchoolDropdown: boolean;
  setShowSchoolDropdown: (s: boolean) => void;
}) {
  // Important cities that shouldn't be removed
  const importantSchools = [
    "Harvard University",
    "Stanford University",
    "Massachusetts Institute of Technology",
    "Yale University",
    "Princeton University",
    "University of Pennsylvania",
    "Columbia University",
    "Brown University",
    "Dartmouth College",
    "Cornell University"
  ];

  const filtered = schoolSearch.length >= 2
    ? collegeNames.filter(
      (name) =>
        name.toLowerCase().includes(schoolSearch.toLowerCase()) &&
        !profile.targetSchools.includes(name)
    ).slice(0, 8)
    : [];

  const addSchool = (name: string) => {
    if (!profile.targetSchools.includes(name)) {
      setProfile({ ...profile, targetSchools: [...profile.targetSchools, name] });
    }
    setSchoolSearch("");
    setShowSchoolDropdown(false);
  };

  const removeSchool = (name: string) => {
    // Prevent removing important schools
    if (importantSchools.includes(name)) {
      alert(`${name} is an important reference school and cannot be removed. This helps ensure accurate analysis.`);
      return;
    }
    setProfile({ ...profile, targetSchools: profile.targetSchools.filter((s) => s !== name) });
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
          <input
            type="text"
            className="input-field pl-9"
            placeholder="Search for a college..."
            value={schoolSearch}
            onChange={(e) => {
              setSchoolSearch(e.target.value);
              setShowSchoolDropdown(true);
            }}
            onFocus={() => setShowSchoolDropdown(true)}
          />
        </div>
        {showSchoolDropdown && filtered.length > 0 && (
          <div className="absolute z-50 w-full mt-1 py-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-xl max-h-48 overflow-y-auto">
            {filtered.map((name) => (
              <button
                key={name}
                onClick={() => addSchool(name)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-card-hover)] transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected schools */}
      {profile.targetSchools.length > 0 && (
        <div className="space-y-2">
          {profile.targetSchools.map((school) => {
            const isImportant = importantSchools.includes(school);
            return (
              <div
                key={school}
                className={`flex items-center justify-between p-3 rounded-lg border bg-[var(--color-card)] animate-slide-in ${isImportant
                  ? 'border-[var(--color-primary)] bg-opacity-10'
                  : 'border-[var(--color-border)]'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{school}</span>
                  {isImportant && (
                    <span className="text-xs px-2 py-1 bg-[var(--color-primary)] text-black font-bold rounded">
                      REFERENCE
                    </span>
                  )}
                </div>
                <button
                  onClick={() => removeSchool(school)}
                  className={`transition-colors ${isImportant
                    ? 'text-[var(--color-muted)] cursor-not-allowed opacity-50'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-danger)]'
                    }`}
                  disabled={isImportant}
                  title={isImportant ? "Important reference school - cannot be removed" : "Remove school"}
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {profile.targetSchools.length === 0 && (
        <p className="text-sm text-[var(--color-muted)] text-center py-4">
          Search and select at least one school to analyze.
        </p>
      )}
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RESULTS PAGE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
interface ResultsPageProps {
  profile: UserProfile;
  results: EngineResult[];
  gaps: GapAnalysis[];
  stats: DatasetStats;
  portfolioResult: PortfolioResult | null;
  suggestions: SuggestionResults | null;
  onBack: () => void;
  onDownloadPDF: () => void;
  aiEnabled: boolean;
  setAiEnabled: (v: boolean) => void;
  aiConfig: AIConfig;
  setAiConfig: (c: AIConfig) => void;
  aiResults: AIAnalysis[];
  aiLoading: boolean;
  onRunAI: () => void;
  onShowCalculations: (result: EngineResult) => void;
  showPublicDetails: boolean;
  setShowPublicDetails: (v: boolean) => void;
}

function ResultsPage({
  profile,
  results,
  gaps,
  stats,
  portfolioResult,
  suggestions,
  onBack,
  onDownloadPDF,
  aiEnabled,
  setAiEnabled,
  aiConfig,
  setAiConfig,
  aiResults,
  aiLoading,
  onRunAI,
  onShowCalculations,
  showPublicDetails,
  setShowPublicDetails,
}: ResultsPageProps) {
  return (
    <div className="min-h-screen bg-[#05050a]">
      <Header showBack onBack={onBack} showDownloadPDF onDownloadPDF={onDownloadPDF} />

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Bias disclosure */}
        <div className="p-4 rounded-lg border border-[var(--color-warning)] bg-[rgba(245,158,11,0.05)] flex items-start gap-3">
          <AlertTriangle size={18} className="text-[var(--color-warning)] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[var(--color-warning)]">Survivorship Bias Notice</p>
            <p className="text-xs text-[var(--color-muted)] mt-1 font-sans">
              [ DATASET: {stats.totalProfiles.toLocaleString()} PROFILES ] &bull; [ RANGE: {stats.yearRange.min}–{stats.yearRange.max} ]
              <br />
              This is a deterministic mathematical model based on self-reported data. Treat as informational assessment, not prophecy.
            </p>
          </div>
        </div>

        {/* Outlier Identity Section */}
        {(() => {
          const spikeScore = results[0]?.spikeScore || 0;
          const classification = classifyOutlier(spikeScore, profile.unweightedGPA, profile.sat);
          const theme = getOutlierTheme(classification);
          const diversityFieldCount = results[0]?.diversityFieldCount || 0;
          const signature = generateSignature(spikeScore, classification, diversityFieldCount, showPublicDetails, profile.name);
          const verificationURL = getVerificationURL(signature);

          // Universal check: Is this a data outlier or a spike outlier?
          const isDataOutlier = results.some(r => r.confidenceLabel.includes('No comparable profiles'));
          const isSpikeOutlier = classification !== 'STANDARD';
          const isSpecialOutlier = isSpikeOutlier || isDataOutlier;

          const isLocal = isLocalMode();
          const localDateLabel = !isLocal
            ? new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
            : new Date().toLocaleDateString('en-CA');

          if (!isSpecialOutlier) {
            // RENDER STANDARD VERIFICATION (Minimalist)
            return (
              <div className="p-4 border border-white/5 bg-[rgba(255,255,255,0.02)] rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 rounded">
                    <Shield size={20} className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--color-muted)] font-sans uppercase tracking-widest font-bold">Analysis Signature</p>
                    <p className="text-sm font-bold text-white uppercase tracking-tight">Standard Outcome Identity</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-3 px-3 py-2 bg-black/60 border border-white/5 rounded-sm text-[10px] font-mono group">
                    <span className="text-[var(--color-muted)] uppercase tracking-tighter">Masking</span>
                    <button
                      onClick={() => setShowPublicDetails(!showPublicDetails)}
                      className={`px-2 py-0.5 rounded transition-all ${showPublicDetails ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-white/5 text-[var(--color-muted)]'}`}
                    >
                      {showPublicDetails ? "Visible" : "Redacted"}
                    </button>
                  </div>
                  <button
                    onClick={async () => {
                      const success = await (async () => {
                        try {
                          if (navigator.clipboard) {
                            await navigator.clipboard.writeText(verificationURL);
                            return true;
                          }
                        } catch (err) { }
                        try {
                          const textArea = document.createElement("textarea");
                          textArea.value = verificationURL;
                          document.body.appendChild(textArea);
                          textArea.select();
                          const ok = document.execCommand('copy');
                          document.body.removeChild(textArea);
                          return ok;
                        } catch (err) { return false; }
                      })();
                      if (success) alert("Verification Link Copied.");
                      else alert("Could not copy automatically. Link: " + verificationURL);
                    }}
                    className="btn-secondary !py-2 !px-4 !text-[10px] uppercase font-bold tracking-widest border-white/10 hover:border-[var(--color-primary)]/40 transition-all bg-black"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={onDownloadPDF}
                    className="btn-primary !py-2 !px-4 !text-[10px] uppercase font-black tracking-widest bg-[var(--color-primary)] text-black"
                  >
                    Verify Full Audit
                  </button>
                </div>
              </div>
            );
          }

          // RENDER ELITE OUTLIER CERTIFICATE (The "Special Thing")
          return (
            <div className={`relative group p-1 border border-white/10 rounded-xl overflow-hidden glass-card animate-fade-in-up shadow-[0_20px_50px_rgba(0,0,0,0.5)]`}>
              {/* Technical scan-line animation overlay */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-20 animate-scan z-10" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

              <div className={`relative z-20 p-8 border-l-4 ${theme.color === 'text-[var(--color-danger)]' ? 'border-[var(--color-danger)]' : 'border-[var(--color-primary)]'} bg-[rgba(255,255,255,0.01)]`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Shield size={16} className={`${theme.color === 'text-[var(--color-danger)]' ? 'text-[var(--color-danger)]' : 'text-[var(--color-primary)]'}`} />
                      <span className="text-[10px] text-[var(--color-muted)] font-sans uppercase tracking-wider font-bold">AdmitGPT Analysis Certificate</span>
                    </div>
                    <h2 className={`text-4xl font-black font-sans tracking-tighter uppercase ${theme.color} leading-none`}>
                      {isDataOutlier && classification === 'STANDARD' ? "UNIQUE_DATA" : classification.replace(/_/g, ' ')}
                    </h2>
                    <p className="text-[11px] text-[var(--color-muted)] font-sans uppercase tracking-widest mt-2 opacity-60 font-bold">Engine v1.0 // Authentication & Verified Status</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-black/40 px-3 py-2 border border-white/5 rounded">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-[var(--color-muted)] font-sans uppercase font-bold">Privacy Protection</span>
                        <span className="text-[10px] text-white font-sans font-medium">{showPublicDetails ? "ID Visible" : "ID Hidden"}</span>
                      </div>
                      <button
                        onClick={() => setShowPublicDetails(!showPublicDetails)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${showPublicDetails ? 'bg-[var(--color-primary)]' : 'bg-gray-700'}`}
                      >
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${showPublicDetails ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>

                    <div className="text-left md:text-right border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                      <p className="text-[9px] text-[var(--color-muted)] uppercase tracking-widest mb-1 italic">Certificate ID</p>
                      <span className={`text-xs font-sans px-3 py-1.5 border ${theme.color === 'text-[var(--color-danger)]' ? 'border-[var(--color-danger)]/30 text-[var(--color-danger)]' : 'border-[var(--color-primary)]/30 text-[var(--color-primary)]'} bg-black/40 rounded-sm font-bold`}>
                        {isLocal ? "PREVIEW-TOKEN" : `${signature.slice(0, 8).toUpperCase()}-${signature.slice(8, 12).toUpperCase()}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="relative">
                      <p className="text-sm text-[var(--color-muted)] leading-relaxed italic border-l-2 border-white/10 pl-6 py-2">
                        {isDataOutlier && !isSpikeOutlier
                          ? "No comparable profiles found in current dataset. This result represents a unique mathematical anomaly requiring direct expert/AI evaluation."
                          : `"${theme.description}"`}
                      </p>
                      <span className="absolute -left-2 top-0 text-3xl text-white/5 font-serif">&quot;</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1 px-4 py-5 rounded-lg border border-white/5 bg-black/60 font-sans text-[10px] shadow-inner">
                      <div className="flex flex-col gap-1 border-r border-white/5 pr-4">
                        <span className="text-[var(--color-muted)] uppercase tracking-wider font-bold">Analysis Rating</span>
                        <span className="text-lg font-bold text-white tracking-tight font-sans">{spikeScore.toFixed(2)}</span>
                      </div>
                      <div className="flex flex-col gap-1 border-r border-white/5 px-4">
                        <span className="text-[var(--color-muted)] uppercase tracking-wider font-bold">Profile Tier</span>
                        <span className={`text-xs font-bold leading-none ${theme.color} mt-1 uppercase font-sans`}>
                          {isDataOutlier && !isSpikeOutlier ? "UNIQUE" : classification.split('_')[0]}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 pl-4">
                        <span className="text-[var(--color-muted)] uppercase tracking-wider font-bold">Validation</span>
                        <span className={`text-lg font-bold font-sans ${isDataOutlier && !isSpikeOutlier ? "text-[var(--color-warning)]" : "text-[var(--color-success)]"}`}>
                          {isDataOutlier && !isSpikeOutlier ? "ANALYSIS" : "POSITIVE"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={async () => {
                          const success = await (async () => {
                            try {
                              if (navigator.clipboard) {
                                await navigator.clipboard.writeText(verificationURL);
                                return true;
                              }
                            } catch (err) { }
                            try {
                              const textArea = document.createElement("textarea");
                              textArea.value = verificationURL;
                              document.body.appendChild(textArea);
                              textArea.select();
                              const ok = document.execCommand('copy');
                              document.body.removeChild(textArea);
                              return ok;
                            } catch (err) { return false; }
                          })();
                          if (success) alert("Verification Link Copied.");
                          else alert("Could not copy automatically. Link: " + verificationURL);
                        }}
                        className="btn-secondary !py-2.5 !px-6 !text-[11px] font-bold uppercase tracking-widest border-white/10 hover:border-[var(--color-primary)]/50 group/btn"
                      >
                        <Lock size={12} className="mr-2 group-hover/btn:text-[var(--color-primary)] transition-colors" /> Share Verification Link
                      </button>

                      {isSpikeOutlier && (
                        <button
                          onClick={() => document.getElementById('personal-invitation')?.scrollIntoView({ behavior: 'smooth' })}
                          className="btn-primary !py-2.5 !px-6 !text-[11px] font-black uppercase tracking-[0.15em] !bg-[var(--color-primary)] !text-black !border-[var(--color-primary)] hover:brightness-110 shadow-[0_10px_20px_rgba(191,255,0,0.15)] flex items-center justify-center gap-2 no-underline"
                        >
                          <Mail size={12} /> Claim Invitation
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    <div className="w-full p-6 border border-white/5 rounded-xl bg-[rgba(255,255,255,0.01)] relative group/card hover:bg-[rgba(255,255,255,0.03)] transition-all duration-500">
                      <div className="absolute -top-3 -right-3 px-3 py-1 bg-black border border-white/10 rounded-full font-sans text-[9px] text-[var(--color-muted)] tracking-wider uppercase whitespace-nowrap font-bold">
                        Global Audit Signature
                      </div>
                      <div className={`mb-6 p-4 rounded-full inline-block bg-black/40 border border-white/5 shadow-lg ${theme.color === 'text-[var(--color-danger)]' ? 'text-[var(--color-danger)] shadow-[var(--color-danger)]/10' : 'text-[var(--color-primary)] shadow-[var(--color-primary)]/10'}`}>
                        <Shield size={48} className="animate-pulse-slow" />
                      </div>
                      <div className="text-center w-full">
                        <p className="text-[9px] text-[var(--color-muted)] uppercase tracking-widest mb-2 font-black font-sans">Official Certificate</p>
                        <p className="text-2xl font-sans font-black text-white mb-6 tracking-tight shadow-sm uppercase">Identity Verified</p>

                        <div className="p-4 bg-black/40 rounded-lg text-[10px] font-sans text-[var(--color-muted)] text-left space-y-3 border border-white/5">
                          <div className="flex justify-between border-b border-white/5 pb-2">
                            <span>Engine Source:</span>
                            <span className="text-white font-bold">AdmitGPT Engine v1.0</span>
                          </div>
                          <div className="flex justify-between border-b border-white/5 pb-2">
                            <span>Issued On:</span>
                            <span className="text-white tracking-widest font-bold">{localDateLabel.toUpperCase()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>STATUS:</span>
                            <span className={`${isLocal ? "text-[var(--color-warning)]" : "text-[var(--color-success)]"} uppercase font-bold`}>
                              {isLocal ? "OFFLINE_PREVIEW" : "Verified_Profile"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Portfolio Chance Summary */}
        {portfolioResult && (
          <div className="glass-card p-8 animate-fade-in-up border-l-4 border-l-[var(--color-primary)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold flex items-center gap-2 font-sans tracking-tight">
                <Target size={24} className="text-[var(--color-primary)]" />
                Portfolio Assessment
              </h3>
              <div className="text-right">
                <div className="text-4xl font-black font-sans text-[var(--color-primary)] tracking-tighter">
                  {(portfolioResult.atLeastOne.point * 100).toFixed(0)}%
                </div>
                <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider font-sans font-bold">
                  Overall Projection
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="p-4 rounded-lg bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.1)]">
                <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider mb-1 font-sans font-bold">Expected Acceptances</div>
                <div className="text-2xl font-bold text-[var(--color-success)] font-sans">{(portfolioResult.expectedAcceptances || 0).toFixed(1)}</div>
                <div className="text-[10px] text-[var(--color-muted)] font-sans mt-1 uppercase">Expected Result</div>
              </div>
              <div className="p-4 rounded-lg bg-[rgba(99,102,241,0.05)] border border-[rgba(99,102,241,0.1)]">
                <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider mb-1 font-sans font-bold">Audit Range</div>
                <div className="text-2xl font-bold text-[var(--color-primary)] font-sans">
                  {(portfolioResult.atLeastOne.low * 100).toFixed(0)}%–{(portfolioResult.atLeastOne.high * 100).toFixed(0)}%
                </div>
                <div className="text-[10px] text-[var(--color-muted)] font-sans mt-1 uppercase">Confidence Range</div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.05)] flex flex-col items-center">
              <p className="text-sm text-[var(--color-muted)] mb-3 font-sans text-center">
                Mathematical probability model based on deterministic admission traces.
              </p>
              <button
                onClick={onDownloadPDF}
                className="btn-primary text-md px-8 py-3 bg-[var(--color-primary)] text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(191,255,0,0.3)]"
              >
                <Download size={18} className="mr-2 inline-block" />
                Download Full Machine-Readable AI Report
              </button>
            </div>
          </div>
        )}

        {/* School Results */}
        {results.map((result, i) => (
          <SchoolResultCard
            key={result.schoolName}
            result={result}
            gap={gaps.find((g) => g.schoolName === result.schoolName)}
            index={i}
            aiResult={aiResults.find((a) => a.schoolName === result.schoolName)}
            onShowCalculations={() => onShowCalculations(result)}
          />
        ))}

        {/* What you can improve (aggregate) */}
        <div className="glass-card p-6 animate-fade-in-up" style={{ animationDelay: `${results.length * 100 + 200}ms` }}>
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-[var(--color-success)]" />
            What You Can Improve — Ranked by Impact
          </h3>
          {gaps.length > 0 && gaps[0].improvementImpact.length > 0 ? (
            <div className="space-y-3">
              {gaps[0].improvementImpact.map((imp, i) => (
                <div key={i} className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold">{imp.field}</span>
                    <span className="text-xs text-[var(--color-success)] font-mono">
                      {(imp.currentRange.low * 100).toFixed(0)}%–{(imp.currentRange.high * 100).toFixed(0)}% →{" "}
                      {(imp.improvedRange.low * 100).toFixed(0)}%–{(imp.improvedRange.high * 100).toFixed(0)}%
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-muted)]">{imp.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {results.some(r => r.confidenceLabel.includes('PROFILE_OUTLIER')) ? (
                <>
                  <p className="text-sm text-[var(--color-muted)]">
                    <span className="font-mono text-[var(--color-danger)]">PROFILE_OUTLIER:</span> Your profile falls outside our dataset range.
                  </p>
                  <p className="text-sm text-[var(--color-foreground)]">
                    Download the comprehensive 15-page mathematical audit report and use AI analysis for personalized improvement recommendations based on your unique profile.
                  </p>
                  <button
                    onClick={onDownloadPDF}
                    className="btn-secondary text-sm px-4 py-2 mt-2"
                  >
                    <Download size={16} className="mr-2" />
                    Get AI Analysis Report
                  </button>
                </>
              ) : (
                <p className="text-sm text-[var(--color-muted)]">
                  Not enough data to compute improvement impact for your profile.
                </p>
              )}
            </div>
          )}
        </div>

        {/* University Suggestions */}
        {suggestions && (
          <div className="glass-card p-6 animate-fade-in-up">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Sparkles size={18} className="text-[var(--color-primary)]" />
              Suggested Universities For You
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SuggestionColumn title="Reaches (±10%)" results={suggestions.reach} color="text-[var(--color-accent)]" />
              <SuggestionColumn title="Targets (±40%)" results={suggestions.target} color="text-[var(--color-primary-light)]" />
              <SuggestionColumn title="Safeties (±70%)" results={suggestions.safety} color="text-[var(--color-success)]" />
            </div>

            <p className="text-[10px] text-[var(--color-muted)] mt-6 text-center italic">
              Suggestions are based solely on academic and spike data from similar profiles in our dataset.
            </p>
          </div>
        )}

          {/* AI Mode Toggle Removed */}

        {/* Personal Invitation — Personal Connection */}
        {results.length > 0 && results[0].spikeScore > 6.5 && results[0].outlierClassification !== 'STANDARD' && (
          <OutlierInvitation spikeScore={results[0].spikeScore} classification={results[0].outlierClassification || 'STANDARD'} />
        )}

        {/* Footer */}
        <footer className="text-center text-xs text-[var(--color-muted)] py-8 border-t border-[var(--color-border)]">
          <p>Built for students, by students. Every formula is public. Every limitation is disclosed. Your data never leaves your browser.</p>
          <p className="mt-1">Mathematics should be free. You are a student with a dream, not a revenue stream.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-4">
              <a href="/transparency" className="inline-flex items-center gap-1 text-[var(--color-primary)] hover:underline">
                <Eye size={12} /> Transparency
              </a>
            </div>

            <div className="hidden sm:block h-3 w-px bg-white/10 mx-2" />

            <div className="flex items-center gap-4">
              <a href="https://github.com/Zierax/AdmitGPT" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Github size={16} />
              </a>
              <a href="https://instagram.com/z14d.d" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

// ── Individual School Result Card ──
function SchoolResultCard({
  result,
  gap,
  index,
  aiResult,
  onShowCalculations,
}: {
  result: EngineResult;
  gap?: GapAnalysis;
  index: number;
  aiResult?: AIAnalysis;
  onShowCalculations: () => void;
}) {
  const [expanded, setExpanded] = useState(index < 3); // Auto-expand top 3

  const lowPct = (result.low * 100).toFixed(0);
  const highPct = (result.high * 100).toFixed(0);

  return (
    <div className="glass-card overflow-hidden animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
      {/* Header */}
      <div
        className="p-6 cursor-pointer hover:bg-[var(--color-card-hover)] transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-sans tracking-tight">{result.schoolName}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className={`confidence-badge confidence-${result.confidenceLevel}`}>
                {result.confidenceLevel.toUpperCase()}
              </span>
              <span className="text-[10px] text-[var(--color-muted)] font-sans uppercase tracking-widest font-bold">{result.confidenceLabel}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black font-sans text-[var(--color-primary)] tracking-tight">{lowPct}% – {highPct}%</div>
            <div className="flex items-center gap-2 justify-end mt-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShowCalculations();
                }}
                className="text-[10px] text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors uppercase tracking-widest font-sans flex items-center gap-1 border border-white/5 px-2 py-0.5 rounded font-bold"
              >
                <Zap size={10} /> Audit Details
              </button>
              <ChevronDown
                size={16}
                className={`text-[var(--color-muted)] transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </div>
          </div>
        </div>

        {/* Range bar */}
        <div className="mt-6 relative">
          <div className="range-bar h-1.5 bg-[var(--color-border)]">
            <div
              className="absolute top-0 h-full rounded-full bg-[var(--color-primary)] opacity-60"
              style={{
                left: `${result.low * 100}%`,
                width: `${(result.high - result.low) * 100}%`,
              }}
            />
            <div className="range-marker !w-4 !h-4 !bg-white !border-2 !border-[var(--color-primary)]" style={{ left: `${result.pointEstimate * 100}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-[var(--color-muted)] font-sans uppercase tracking-widest font-bold">
            <span>Probability Range</span>
            <span>{lowPct}% – {highPct}%</span>
          </div>
        </div>
      </div>

      {/* Expandable details */}
      {expanded && (
        <div className="px-6 pb-6 space-y-4 border-t border-[var(--color-border)] pt-4">
          {/* Competition Note */}
          {result.competitionNote && (
            <div className="p-3 rounded-lg bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.2)]">
              <p className="text-xs text-[var(--color-warning)]">{result.competitionNote}</p>
            </div>
          )}

          {/* Analysis Note */}
          {result.disclaimer && (
            <div className="p-3 rounded-lg bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] mt-2 shadow-sm">
              <div className="flex items-center gap-1.5 mb-1 text-[var(--color-danger)]">
                <AlertTriangle size={14} />
                <span className="text-xs font-bold font-sans tracking-widest uppercase">Strategic Note</span>
              </div>
              <p className="text-xs text-[var(--color-danger)] leading-relaxed font-sans opacity-80">{result.disclaimer}</p>
            </div>
          )}

          {/* Score breakdown */}
          <div>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
              <BarChart3 size={14} className="text-[var(--color-primary)]" /> Score Breakdown
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <ScoreItem label="SAT Z-Score" value={result.satZ.toFixed(2)} />
              <ScoreItem label="GPA Z-Score" value={result.gpaZ.toFixed(2)} />
              <ScoreItem label="Analysis Rating" value={result.spikeScore.toFixed(2)} />
              <ScoreItem label="Major Modifier" value={`${result.majorModifier.toFixed(2)}x`} />
            </div>
          </div>

          {/* Gap Analysis */}
          {gap && (
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                <Target size={14} className="text-[var(--color-success)]" /> Gap Analysis
                <span className="text-xs font-normal text-[var(--color-muted)]">
                  ({gap.clusterSize} {getMajorCategoryLabel(gap.majorCategory)} applicants in cluster)
                </span>
              </h4>

              {gap.nearestAccepted && gap.nearestAccepted.deltas.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-[var(--color-success)] mb-1.5">
                    ▶ Your nearest accepted peer:
                  </p>
                  <div className="space-y-1">
                    {gap.nearestAccepted.deltas.map((delta, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className={delta.closeable ? "text-[var(--color-success)]" : "text-[var(--color-danger)]"}>
                          {delta.closeable ? "✓" : "✗"}
                        </span>
                        <span className="text-[var(--color-muted)]">{delta.field}:</span>
                        <span>You {delta.yours} → They {delta.theirs}</span>
                        <span className="text-[var(--color-muted)]">({delta.gap})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {gap.nearestRejected && gap.nearestRejected.deltas.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs font-semibold text-[var(--color-danger)] mb-1.5">
                    ▶ Your nearest rejected peer:
                  </p>
                  <div className="space-y-1">
                    {gap.nearestRejected.deltas.slice(0, 3).map((delta, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="text-[var(--color-muted)]">{delta.field}:</span>
                        <span>You {delta.yours} → They {delta.theirs}</span>
                        <span className="text-[var(--color-muted)]">({delta.gap})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Encouragement */}
              <div className="p-3 rounded-lg bg-[var(--color-primary-glow)] border border-[rgba(99,102,241,0.2)] mt-3">
                <p className="text-xs text-[var(--color-primary-light)] leading-relaxed italic">{gap.encouragementMessage}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ScoreItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2.5 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] text-center">
      <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider font-bold">{label}</div>
      <div className="text-sm font-bold font-sans mt-0.5 tracking-tight">{value}</div>
    </div>
  );
}

function SuggestionColumn({ title, results, color }: { title: string; results: EngineResult[]; color: string }) {
  if (!results || results.length === 0) return null;
  return (
    <div className="space-y-4">
      <h4 className={`text-xs font-black uppercase tracking-widest ${color}`}>{title}</h4>
      <div className="space-y-2">
        {results.map((r, i) => (
          <div key={i} className="p-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-primary)] transition-all group">
            <div className="text-sm font-bold truncate group-hover:text-[var(--color-primary)] transition-colors">{r.schoolName}</div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] text-[var(--color-muted)] uppercase font-bold">Est. Probability</span>
              <span className="text-[10px] font-sans font-bold text-[var(--color-foreground)]">{(r.pointEstimate * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full h-1 bg-[var(--color-border)] rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full bg-[var(--color-primary)] opacity-60"
                style={{ width: `${r.pointEstimate * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OUTLIER PERSONAL INVITATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function OutlierInvitation({ spikeScore, classification }: { spikeScore: number; classification: OutlierClassification }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileLinks, setProfileLinks] = useState('');
  const [message, setMessage] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const themeInfo = getOutlierTheme(classification);

  const handleAccept = async () => {
    if (!name.trim() || !message.trim()) {
      setError('Name and message are required.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email: email || 'N/A',
          message,
          links: profileLinks,
          score: spikeScore,
          classification: classification,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to submit message.');
      }

      setAccepted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="personal-invitation" className="glass-card p-8 animate-fade-in-up border-l-4 border-l-[var(--color-accent)] scroll-mt-8 shadow-2xl relative">
      <div className="flex items-center gap-3 mb-4">
        <Heart size={24} className="text-[var(--color-accent)]" />
        <h3 className="text-xl font-black font-sans text-white tracking-tight">Private Invitation</h3>
      </div>

      {themeInfo.message && (
        <div className="p-4 mb-6 border-l-2 border-[var(--color-primary)] bg-[rgba(191,255,0,0.05)]">
          <p className="text-xs text-[var(--color-muted)] font-sans uppercase tracking-widest mb-2 font-bold">
            Classification: {classification.replace(/_/g, ' ')}
          </p>
          <p className="text-sm text-[var(--color-foreground)] leading-relaxed italic">
            &quot;{themeInfo.message}&quot;
          </p>
        </div>
      )}

      <div className="p-5 bg-[rgba(255,255,255,0.03)] border border-[var(--color-border)] mb-6">
        <p className="text-sm text-[var(--color-foreground)] leading-relaxed mb-4">
          So you seem to have great achievements and skills. I want to know you personally and hear your story by my own ears — with no systems and calculations.
          If you agree, you can accept by writing your message and links below. 
        </p>
        <p className="text-[10px] text-[var(--color-muted)] font-sans uppercase tracking-widest font-bold">
          — Ziad Salah, Creator of AdmitGPT
        </p>
      </div>

      {accepted ? (
        <div className="space-y-4">
          <div className="text-center p-6 border border-[var(--color-success)] bg-[rgba(16,185,129,0.05)] rounded-lg">
            <Check size={32} className="text-[var(--color-success)] mx-auto mb-2" />
            <p className="text-sm font-bold text-[var(--color-success)] uppercase tracking-widest">Message Securely Sent</p>
            <p className="text-xs text-[var(--color-muted)] mt-2">Your data was saved locally on the private server. It has not been sent via external email providers.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            type="text"
            className="input-field"
            placeholder="Your Full Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="input-field"
            placeholder="Your Email Address (Optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="input-field"
            placeholder="Profile Links (LinkedIn, GitHub, Portfolio, etc.)"
            value={profileLinks}
            onChange={(e) => setProfileLinks(e.target.value)}
          />
          <textarea
            className="input-field min-h-[120px] resize-none"
            placeholder="Introduce yourself, your story, your vision... *"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          
          {error && <p className="text-[11px] text-[var(--color-danger)] font-bold">{error}</p>}
          
          <button
            onClick={handleAccept}
            disabled={!name.trim() || !message.trim() || isSubmitting}
            className="btn-primary w-full !bg-white !text-black !border-white hover:!bg-[var(--color-primary)] disabled:opacity-30 transition-all font-bold"
          >
            {isSubmitting ? 'Transmitting Data...' : <><Shield size={16} /> Submit Securely</>}
          </button>
          
          <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--color-muted)] font-sans uppercase tracking-wider font-bold mt-2">
            <Lock size={10} /> 100% Private Database — No Third Parties
          </div>
        </div>
      )}
    </div>
  );
}

function WhyModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--color-background)] bg-opacity-90 backdrop-blur-md animate-fade-in shadow-[inset_0_0_100px_rgba(191,255,0,0.1)]">
      <div className="glass-card max-w-4xl w-full p-0 relative animate-scale-in border border-[var(--color-primary)] overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 z-50 text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
          <X size={24} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Photo Section */}
          <div className="relative aspect-[4/5] md:aspect-auto h-full bg-black border-r border-[var(--color-primary)] border-opacity-30 min-h-[400px]">
            <Image
              src="/assets/Ziad_Salah_Photo.jpg"
              alt="Ziad Salah"
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="font-sans text-[var(--color-primary)] font-black text-3xl tracking-tighter uppercase">Ziad Salah</p>
              <div className="h-0.5 w-12 bg-[var(--color-primary)] mt-2 mb-4" />
              <p className="text-sm font-sans text-white tracking-widest uppercase opacity-80 font-bold">Student / Creator</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-10 space-y-8 bg-[var(--color-card)] relative">
            {/* Scanned paper effect header */}
            <div className="space-y-2">
              <span className="font-sans text-[var(--color-primary)] text-[10px] tracking-widest uppercase font-bold">Our Philosophy</span>
              <h2 className="text-4xl font-black text-white tracking-tighter leading-none italic uppercase underline decoration-[var(--color-primary)] decoration-4 underline-offset-4">
                Transparency over Guesswork.
              </h2>
            </div>

            <div className="space-y-6 text-sm text-[var(--color-foreground)] leading-relaxed">
              <p className="font-bold text-lg text-[var(--color-primary-light)]">
                &quot;I am like you students. I built this because I hate black boxes.&quot;
              </p>
              <p className="opacity-80">
                Growing up in an environment with zero institutional support, I realized early on that information is the ultimate gatekeeper. I saw students with immense potential being priced out of their dreams by consultants charging $500/hour for data that should be public.
              </p>
              <p className="opacity-80">
                When I developed the math engine for my own applications, I chose to make it public. Because keeping it secret would mean becoming the very gatekeeper I&apos;m trying to disrupt.
              </p>
              <div className="p-4 border-l-2 border-[var(--color-primary)] bg-[rgba(191,255,0,0.05)] font-sans text-[11px] leading-tight font-medium">
                AdmitGPT is a tool for student empowerment. It’s analysis against uncertainty. You aren&apos;t a metric; you&apos;re a student with a future. And you deserve to see the numbers.
              </div>
            </div>

            <div className="pt-4 flex justify-between items-end">
              <div className="font-sans text-[10px] text-[var(--color-muted)] uppercase tracking-widest font-bold">
                [ Verification Complete ]
              </div>
              <button
                onClick={onClose}
                className="btn-primary !px-10 !py-3 tracking-widest"
              >
                Continue.
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

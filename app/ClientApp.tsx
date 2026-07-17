"use client";

import { useState, useCallback } from "react";
import { TEST_PROFILES } from "@/lib/testProfiles";
import { generatePDFReport } from "@/lib/pdfReport";
import { useAdmitEngine } from "@/app/hooks/useAdmitEngine";
import { EngineResult } from "@/lib/types";
import { LandingPage } from "@/app/components/screens/LandingPage";
import { LoadingScreen } from "@/app/components/screens/LoadingScreen";
import { FormPage } from "@/app/components/FormPage";
import { ResultsPage } from "@/app/components/ResultsPage";
import { AIPromptModal } from "@/app/components/modals/AIPromptModal";
import { CalculationsModal } from "@/app/components/modals/CalculationsModal";
import { WhyModal } from "@/app/components/modals/WhyModal";
import {
  FlaskConical,
  AlertTriangle,
  Terminal,
  X,
} from "lucide-react";

type AppView = "landing" | "form" | "loading" | "results";

export default function ClientApp() {
  const [view, setView] = useState<AppView>("landing");
  const [formStep, setFormStep] = useState(1);
  const [showWhyModal, setShowWhyModal] = useState(false);
  const [showAIPromptModal, setShowAIPromptModal] = useState(false);
  const [showCalculations, setShowCalculations] = useState<EngineResult | null>(null);
  const [showPublicDetails, setShowPublicDetails] = useState(true);
  const [schoolSearch, setSchoolSearch] = useState("");
  const [showSchoolDropdown, setShowSchoolDropdown] = useState(false);

  const engine = useAdmitEngine();

  const downloadPDF = useCallback(() => {
    if (!engine.stats) return;
    setShowAIPromptModal(true);
  }, [engine.stats]);

  const executeDownload = useCallback(() => {
    if (!engine.stats) return;
    generatePDFReport(
      engine.profile,
      engine.engineResults,
      engine.gapAnalyses,
      engine.stats,
      showPublicDetails
    );
    setShowAIPromptModal(false);
  }, [engine.profile, engine.engineResults, engine.gapAnalyses, engine.stats, showPublicDetails]);

  const handleAnalyze = useCallback(async () => {
    setView("loading");
    await engine.runAnalysis();
    setView("results");
  }, [engine]);

  const content = (() => {
    if (view === "loading") return <LoadingScreen message={engine.loadingMessage} />;

    if (view === "results") {
      return (
        <ResultsPage
          profile={engine.profile}
          results={engine.engineResults}
          gaps={engine.gapAnalyses}
          stats={engine.stats!}
          portfolioResult={engine.portfolioResult}
          suggestions={engine.suggestions}
          onBack={() => setView("form")}
          onDownloadPDF={downloadPDF}
          aiEnabled={engine.aiEnabled}
          setAiEnabled={engine.setAiEnabled}
          aiConfig={engine.aiConfig}
          setAiConfig={engine.setAiConfig}
          aiResults={engine.aiResults}
          aiLoading={engine.aiLoading}
          onRunAI={engine.runAI}
          onShowCalculations={(res) => setShowCalculations(res)}
          showPublicDetails={showPublicDetails}
          setShowPublicDetails={setShowPublicDetails}
        />
      );
    }

    if (view === "form") {
      return (
        <FormPage
          step={formStep}
          setStep={setFormStep}
          profile={engine.profile}
          setProfile={engine.setProfile}
          collegeNames={engine.collegeNames}
          schoolSearch={schoolSearch}
          setSchoolSearch={setSchoolSearch}
          showSchoolDropdown={showSchoolDropdown}
          setShowSchoolDropdown={setShowSchoolDropdown}
          onSubmit={handleAnalyze}
          onBack={() => setView("landing")}
          isScanning={false}
          setIsScanning={() => { }}
          scanningStatus=""
          setScanningStatus={() => { }}
        />
      );
    }

    return (
      <LandingPage
        onStart={() => setView("form")}
        isLoading={!engine.isDataLoaded}
        loadingMessage={engine.loadingMessage}
        onShowWhy={() => setShowWhyModal(true)}
      />
    );
  })();

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
                  engine.setProfile(TEST_PROFILES[key]);
                  setFormStep(1);
                  alert(`Loaded: ${key}`);
                }}
                className="text-left text-[11px] font-sans py-1.5 px-3 rounded hover:bg-[var(--color-primary)] hover:text-black transition-all border border-white/5 bg-white/5"
              >
                LOAD: {key.toUpperCase()}
              </button>
            ))}
            <div className="border-t border-white/10 mt-1 pt-1 flex flex-col gap-1">
              <button
                onClick={() => console.table(engine.profile)}
                className="w-full text-left text-[9px] text-[var(--color-muted)] font-mono py-1 px-2 hover:text-white flex items-center gap-2"
              >
                <Terminal size={10} /> DUMP_STATE_TO_CONSOLE
              </button>
              <button
                onClick={() => {
                  engine.setProfile({
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

"use client";

import Header from "@/app/components/Header";
import { Step1Demographics } from "./steps/Step1Demographics";
import { Step2Academics } from "./steps/Step2Academics";
import { Step3Extracurriculars } from "./steps/Step3Extracurriculars";
import { Step4Awards } from "./steps/Step4Awards";
import { Step5Schools } from "./steps/Step5Schools";
import { UserProfile } from "@/lib/types";
import { Check, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

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

export function FormPage({
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

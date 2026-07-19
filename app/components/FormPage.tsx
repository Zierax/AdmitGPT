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
}: FormPageProps) {
  const totalSteps = 5;
  const stepNames = ["Demographics", "Academics", "Activities", "Awards", "Schools"];
  const descriptions = [
    "Tell us about yourself — this helps us compare you to similar applicants.",
    "Your academic profile is the foundation of the analysis.",
    "List up to 10 extracurriculars with their impact tier.",
    "List up to 5 awards or honors.",
    "Select the schools you want to analyze.",
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header showBack onBack={onBack} />

      <div className="mx-auto w-full max-w-2xl flex-1 px-6 py-10">
        {/* Step indicator */}
        <div className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <span className="ag-data">
              Step {step} / {totalSteps}
            </span>
            <span className="ag-data" style={{ color: "var(--color-primary)" }}>
              {Math.round((step / totalSteps) * 100)}% done
            </span>
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex flex-1 items-center">
                <button
                  onClick={() => setStep(i + 1)}
                  className={`step-dot ${step === i + 1 ? "active" : ""} ${step > i + 1 ? "completed" : ""}`}
                  title={stepNames[i]}
                  aria-label={stepNames[i]}
                  aria-current={step === i + 1 ? "step" : undefined}
                >
                  {step > i + 1 ? <Check size={14} /> : i + 1}
                </button>
                {i < totalSteps - 1 && (
                  <div className={`step-line ${step > i + 1 ? "completed" : ""}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <div className="ag-section-label" style={{ marginBottom: 14 }}>
            <span className="num">0{step}</span>
            <span className="txt">{stepNames[step - 1]}</span>
          </div>
          <p className="text-[var(--text-body)] text-[var(--color-foreground-dim)] leading-relaxed max-w-xl">{descriptions[step - 1]}</p>
        </div>

        <div className="ag-sticker-card mb-10">
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
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => step > 1 && setStep(step - 1)}
            className="btn-zine secondary flex-1 justify-center md:flex-none"
            disabled={step === 1}
          >
            <ArrowLeft size={16} /> Previous
          </button>

          {step < totalSteps ? (
            <button
              onClick={() => {
                if (step === 3) {
                  const missing = profile.extracurriculars.filter((ec) => !ec.title.trim());
                  if (missing.length > 0) {
                    alert(`Please add titles for ${missing.length} extracurricular activit(ies) before proceeding.`);
                    return;
                  }
                }
                if (step === 4) {
                  const missing = profile.awards.filter((a) => !a.title.trim());
                  if (missing.length > 0) {
                    alert(`Please add titles for ${missing.length} award(s) before proceeding.`);
                    return;
                  }
                }
                setStep(step + 1);
              }}
              className="btn-zine flex-1 justify-center md:flex-none"
            >
              Next Step <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={() => {
                const missingEC = profile.extracurriculars.filter((ec) => !ec.title.trim());
                const missingAwards = profile.awards.filter((a) => !a.title.trim());
                if (missingEC.length > 0 || missingAwards.length > 0) {
                  alert(
                    `Please complete all titles:\n• ${missingEC.length} missing extracurricular title(s)\n• ${missingAwards.length} missing award title(s)`
                  );
                  return;
                }
                if (profile.targetSchools.length === 0) {
                  alert("Please add at least one school to analyze.");
                  return;
                }
                onSubmit();
              }}
              className="btn-zine flex-1 justify-center md:flex-none"
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

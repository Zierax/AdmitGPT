"use client";

import Header from "@/app/components/Header";
import { SchoolResultCard } from "./results/SchoolResultCard";
import { SuggestionColumn } from "./results/SuggestionColumn";
import { OutlierInvitation } from "./results/OutlierInvitation";
import {
  UserProfile,
  EngineResult,
  GapAnalysis,
  DatasetStats,
  PortfolioResult,
  SuggestionResults,
  AIConfig,
  AIAnalysis,
  OutlierClassification,
} from "@/lib/types";
import {
  generateSignature,
  getVerificationURL,
  isLocalMode,
} from "@/lib/crypto";
import { classifyOutlier, getOutlierTheme } from "@/lib/engine";
import { CONTACT_EMAIL, GITHUB_URL, INSTAGRAM_URL } from "@/lib/siteConfig";
import {
  AlertTriangle,
  Shield,
  Target,
  TrendingUp,
  Download,
  Lock,
  Mail,
  Sparkles,
  Eye,
  Github,
  Instagram,
} from "lucide-react";

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

function copyVerificationLink(verificationURL: string) {
  return new Promise<boolean>((resolve) => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(verificationURL).then(() => resolve(true)).catch(() => resolve(false));
        return;
      }
    } catch (err) { }
    try {
      const textArea = document.createElement("textarea");
      textArea.value = verificationURL;
      document.body.appendChild(textArea);
      textArea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textArea);
      resolve(ok);
    } catch (err) {
      resolve(false);
    }
  });
}

export function ResultsPage({
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
    <div className="min-h-screen" style={{ background: "var(--color-background)" }}>
      <Header showBack onBack={onBack} showDownloadPDF onDownloadPDF={onDownloadPDF} />

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Bias disclosure */}
        <div className="p-4 rounded-lg border-2 border-[var(--color-warning)] bg-[var(--color-warning-tint)] flex items-start gap-3">
          <AlertTriangle size={18} className="text-[var(--color-warning)] mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[var(--color-warning)]">Survivorship Bias Notice</p>
            <p className="text-xs text-[var(--color-foreground-dim)] mt-1 font-sans">
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
              <div className="p-4 border-2 border-[var(--color-border)] bg-[var(--color-card)] rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[var(--color-primary-faint)] border border-[var(--color-primary-line)] rounded">
                    <Shield size={20} className="text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[var(--color-muted)] font-sans uppercase tracking-widest font-bold">Your result</p>
                    <p className="text-sm font-bold text-[var(--color-foreground)] uppercase tracking-tight">Verified &amp; shareable</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-3 px-3 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-sm text-[10px] font-mono">
                    <span className="text-[var(--color-muted)] uppercase tracking-tighter">Masking</span>
                    <button
                      onClick={() => setShowPublicDetails(!showPublicDetails)}
                      className={`px-2 py-0.5 rounded transition-all ${showPublicDetails ? 'bg-[var(--color-primary-faint)] text-[var(--color-primary)]' : 'bg-[var(--color-surface)] text-[var(--color-muted)]'}`}
                    >
                      {showPublicDetails ? "Visible" : "Redacted"}
                    </button>
                  </div>
                  <button
                    onClick={async () => {
                      const success = await copyVerificationLink(verificationURL);
                      if (success) alert("Verification Link Copied.");
                      else alert("Could not copy automatically. Link: " + verificationURL);
                    }}
                    className="btn-zine secondary !py-2 !px-4 !text-[10px] uppercase font-bold tracking-widest"
                  >
                    Copy Link
                  </button>
                  <button
                    onClick={onDownloadPDF}
                    className="btn-zine !py-2 !px-4 !text-[10px] uppercase font-black tracking-widest"
                  >
                    Get certificate
                  </button>
                </div>
              </div>
            );
          }

          // RENDER ELITE OUTLIER CERTIFICATE (The "Special Thing")
          return (
            <div className={`relative group p-1 border-2 rounded-xl overflow-hidden ag-sticker-card animate-fade-in-up`}>
              <div className={`relative z-20 p-8 border-l-4 ${theme.color === 'text-[var(--color-danger)]' ? 'border-[var(--color-danger)]' : 'border-[var(--color-primary)]'} bg-[var(--color-surface)]`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Shield size={16} className={`${theme.color === 'text-[var(--color-danger)]' ? 'text-[var(--color-danger)]' : 'text-[var(--color-primary)]'}`} />
                      <span className="text-[10px] text-[var(--color-muted)] font-sans uppercase tracking-wider font-bold">AdmitGPT Certificate</span>
                    </div>
                    <h2 className={`text-4xl font-black font-sans tracking-tighter uppercase ${theme.color} leading-none`}>
                      {isDataOutlier && classification === 'STANDARD' ? "UNIQUE_DATA" : classification.replace(/_/g, ' ')}
                    </h2>
                    <p className="text-[11px] text-[var(--color-muted)] font-sans uppercase tracking-widest mt-2 opacity-60 font-bold">Real, and made on your device</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-[var(--color-surface-2)] px-3 py-2 border border-[var(--color-border)] rounded">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-[var(--color-muted)] font-sans uppercase font-bold">Privacy Protection</span>
                        <span className="text-[10px] text-[var(--color-foreground)] font-sans font-medium">{showPublicDetails ? "ID Visible" : "ID Hidden"}</span>
                      </div>
                      <button
                        onClick={() => setShowPublicDetails(!showPublicDetails)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${showPublicDetails ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-border-strong)]'}`}
                      >
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${showPublicDetails ? 'left-6' : 'left-1'}`} />
                      </button>
                    </div>

                    <div className="text-left md:text-right border-t md:border-t-0 md:border-l border-[var(--color-border)] pt-4 md:pt-0 md:pl-6">
                      <p className="text-[9px] text-[var(--color-muted)] uppercase tracking-widest mb-1 italic">Your reference</p>
                      <span className={`text-xs font-sans px-3 py-1.5 border ${theme.color === 'text-[var(--color-danger)]' ? 'border-[var(--color-danger)]/40 text-[var(--color-danger)]' : 'border-[var(--color-primary)]/40 text-[var(--color-primary)]'} bg-[var(--color-surface-2)] rounded-sm font-bold`}>
                        {isLocal ? "PREVIEW-TOKEN" : `${signature.slice(0, 8).toUpperCase()}-${signature.slice(8, 12).toUpperCase()}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  <div className="lg:col-span-7 space-y-6">
                    <div className="relative">
                      <p className="text-sm text-[var(--color-foreground-dim)] leading-relaxed italic border-l-2 border-[var(--color-border-strong)] pl-6 py-2">
                        {isDataOutlier && !isSpikeOutlier
                          ? "No comparable profiles found in current dataset. This result represents a unique mathematical anomaly requiring direct expert/AI evaluation."
                          : `"${theme.description}"`}
                      </p>
                      <span className="absolute -left-2 top-0 text-3xl text-[var(--color-border-strong)] font-serif">&quot;</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1 px-4 py-5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] font-sans text-[10px]">
                      <div className="flex flex-col gap-1 border-r border-[var(--color-border)] pr-4">
                        <span className="text-[var(--color-muted)] uppercase tracking-wider font-bold">Analysis Rating</span>
                        <span className="text-lg font-bold text-[var(--color-foreground)] tracking-tight font-sans">{spikeScore.toFixed(2)}</span>
                      </div>
                      <div className="flex flex-col gap-1 border-r border-[var(--color-border)] px-4">
                        <span className="text-[var(--color-muted)] uppercase tracking-wider font-bold">Profile Tier</span>
                        <span className={`text-xs font-bold leading-none ${theme.color} mt-1 uppercase font-sans`}>
                          {isDataOutlier && !isSpikeOutlier ? "UNIQUE" : classification.split('_')[0]}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 pl-4">
                        <span className="text-[var(--color-muted)] uppercase tracking-widest mb-1 italic">Validation</span>
                        <span className={`text-lg font-bold font-sans ${isDataOutlier && !isSpikeOutlier ? "text-[var(--color-warning)]" : "text-[var(--color-success)]"}`}>
                          {isDataOutlier && !isSpikeOutlier ? "ANALYSIS" : "POSITIVE"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={async () => {
                          const success = await copyVerificationLink(verificationURL);
                          if (success) alert("Verification Link Copied.");
                          else alert("Could not copy automatically. Link: " + verificationURL);
                        }}
                        className="btn-zine secondary !py-2.5 !px-6 !text-[11px] font-bold uppercase tracking-widest group/btn"
                      >
                        <Lock size={12} className="mr-2 group-hover/btn:text-[var(--color-primary)] transition-colors" /> Share Verification Link
                      </button>

                      {isSpikeOutlier && (
                        <button
                          onClick={() => document.getElementById('personal-invitation')?.scrollIntoView({ behavior: 'smooth' })}
                          className="btn-zine !py-2.5 !px-6 !text-[11px] font-black uppercase tracking-[0.15em] flex items-center justify-center gap-2 no-underline"
                        >
                          <Mail size={12} /> Claim Invitation
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    <div className="w-full p-6 border-2 border-[var(--color-border)] rounded-xl bg-[var(--color-card)] relative group/card hover:bg-[var(--color-surface)] transition-all duration-500">
                      <div className="absolute -top-3 -right-3 px-3 py-1 bg-[var(--color-foreground)] border border-[var(--color-border-strong)] rounded-full font-sans text-[9px] text-[var(--color-background)] tracking-wider uppercase whitespace-nowrap font-bold">
                        Verified by AdmitGPT
                      </div>
                      <div className={`mb-6 p-4 rounded-full inline-block bg-[var(--color-surface-2)] border border-[var(--color-border)] ${theme.color === 'text-[var(--color-danger)]' ? 'text-[var(--color-danger)]' : 'text-[var(--color-primary)]'}`}>
                        <Shield size={48} />
                      </div>
                      <div className="text-center w-full">
                        <p className="text-[9px] text-[var(--color-muted)] uppercase tracking-widest mb-2 font-black font-sans">Certificate</p>
                        <p className="text-2xl font-sans font-black text-[var(--color-foreground)] mb-6 tracking-tight shadow-sm uppercase">You’re verified</p>

                        <div className="p-4 bg-[var(--color-surface-2)] rounded-lg text-[10px] font-sans text-[var(--color-foreground-dim)] text-left space-y-3 border border-[var(--color-border)]">
                          <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                            <span>Made with:</span>
                            <span className="text-[var(--color-foreground)] font-bold">AdmitGPT</span>
                          </div>
                          <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                            <span>Issued:</span>
                            <span className="text-[var(--color-foreground)] tracking-widest font-bold">{localDateLabel.toUpperCase()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>STATUS:</span>
                            <span className={`${isLocal ? "text-[var(--color-warning)]" : "text-[var(--color-success)]"} uppercase font-bold`}>
                              {isLocal ? "Preview only" : "Verified"}
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
          <div className="ag-card p-8 animate-fade-in-up border-l-4 border-l-[var(--color-primary)]">
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
              <div className="p-4 rounded-lg bg-[var(--color-success-tint)] border border-[var(--color-success)]/30">
                <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider mb-1 font-sans font-bold">Expected Acceptances</div>
                <div className="text-2xl font-bold text-[var(--color-success)] font-sans">{(portfolioResult.expectedAcceptances || 0).toFixed(1)}</div>
                <div className="text-[10px] text-[var(--color-muted)] font-sans mt-1 uppercase">Expected Result</div>
              </div>
              <div className="p-4 rounded-lg bg-[var(--color-primary-faint)] border border-[var(--color-primary-line)]">
                <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider mb-1 font-sans font-bold">Audit Range</div>
                <div className="text-2xl font-bold text-[var(--color-primary)] font-sans">
                  {(portfolioResult.atLeastOne.low * 100).toFixed(0)}%–{(portfolioResult.atLeastOne.high * 100).toFixed(0)}%
                </div>
                <div className="text-[10px] text-[var(--color-muted)] font-sans mt-1 uppercase">Confidence Range</div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex flex-col items-center">
              <p className="text-sm text-[var(--color-muted)] mb-3 font-sans text-center">
                Mathematical probability model based on deterministic admission traces.
              </p>
              <button
                onClick={onDownloadPDF}
                className="btn-zine text-md px-8 py-3"
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
        <div className="ag-card p-6 animate-fade-in-up" style={{ animationDelay: `${results.length * 100 + 200}ms` }}>
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
            <TrendingUp size={18} className="text-[var(--color-success)]" />
            What You Can Improve — Ranked by Impact
          </h3>
          {gaps.length > 0 && gaps[0].improvementImpact.length > 0 ? (
            <div className="space-y-3">
              {gaps[0].improvementImpact.map((imp, i) => (
                <div key={i} className="p-3 rounded-lg border-2 border-[var(--color-border)] bg-[var(--color-card)]">
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
                    className="btn-zine secondary text-sm px-4 py-2 mt-2"
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
          <div className="ag-card p-6 animate-fade-in-up">
            <h3 className="text-lg font-bold flex items-center gap-2 mb-6">
              <Sparkles size={18} className="text-[var(--color-primary)]" />
              Suggested Universities For You
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SuggestionColumn title="Reaches (±10%)" results={suggestions.reach} color="text-[var(--color-accent)]" />
              <SuggestionColumn title="Targets (±40%)" results={suggestions.target} color="text-[var(--color-primary)]" />
              <SuggestionColumn title="Safeties (±70%)" results={suggestions.safety} color="text-[var(--color-success)]" />
            </div>

            <p className="text-[10px] text-[var(--color-muted)] mt-6 text-center italic">
              Suggestions are based solely on academic and spike data from similar profiles in our dataset.
            </p>
          </div>
        )}

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

            <div className="hidden sm:block h-3 w-px bg-[var(--color-border)] mx-2" />

              <div className="flex items-center gap-4">
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
                <Github size={16} />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

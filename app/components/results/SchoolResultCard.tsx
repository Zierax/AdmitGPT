"use client";

import { useState } from "react";
import { EngineResult, GapAnalysis, AIAnalysis } from "@/lib/types";
import { getMajorCategoryLabel } from "@/lib/dataLoader";
import { BarChart3, Target, AlertTriangle, ChevronDown, Zap } from "lucide-react";
import { ScoreItem } from "./ScoreItem";

export function SchoolResultCard({
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
    <div className="ag-card overflow-hidden animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
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
                className="text-[10px] text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors uppercase tracking-widest font-sans flex items-center gap-1 border border-[var(--color-border)] px-2 py-0.5 rounded font-bold"
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
          <div className="range-bar h-2 bg-[var(--color-surface-2)] border border-[var(--color-border)]">
            <div
              className="absolute top-0 h-full rounded-full bg-[var(--color-primary)]"
              style={{
                left: `${result.low * 100}%`,
                width: `${(result.high - result.low) * 100}%`,
              }}
            />
            <div className="range-marker !w-4 !h-4 !bg-[var(--color-foreground)] !border-2 !border-[var(--color-primary)]" style={{ left: `${result.pointEstimate * 100}%` }} />
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
            <div className="p-3 rounded-lg bg-[var(--color-warning-tint)] border border-[var(--color-warning)]/40">
              <p className="text-xs text-[var(--color-warning)]">{result.competitionNote}</p>
            </div>
          )}

          {/* Analysis Note */}
          {result.disclaimer && (
            <div className="p-3 rounded-lg bg-[var(--color-danger-tint)] border border-[var(--color-danger)]/40 mt-2">
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
              <div className="p-3 rounded-lg bg-[var(--color-primary-faint)] border border-[var(--color-primary-line)] mt-3">
                <p className="text-xs text-[var(--color-foreground-dim)] leading-relaxed italic">{gap.encouragementMessage}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

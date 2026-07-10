"use client";

import { EngineResult } from "@/lib/types";
import { X } from "lucide-react";

export function CalculationsModal({ result, onClose }: { result: EngineResult; onClose: () => void }) {
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

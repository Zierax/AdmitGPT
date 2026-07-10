"use client";

import { EngineResult } from "@/lib/types";

export function SuggestionColumn({ title, results, color }: { title: string; results: EngineResult[]; color: string }) {
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

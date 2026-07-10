"use client";

import { Zap } from "lucide-react";

export function LoadingScreen({ message }: { message: string }) {
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

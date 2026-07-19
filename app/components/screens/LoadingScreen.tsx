"use client";

import { Zap } from "lucide-react";

export function LoadingScreen({ message }: { message: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="ag-container-narrow animate-fade-in-up px-6 text-center">
        <div className="loading-spinner mx-auto mb-8" />
        <h2 className="mb-3 text-xl font-bold tracking-tight">Analyzing Admission Patterns</h2>
        <p className="mb-8 text-sm text-[var(--color-muted)]">{message}</p>
        <div className="ag-sticker-card p-4 text-left">
          <p className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
            <Zap size={14} className="text-[var(--color-primary)]" />
            Analysis runs <span className="font-medium text-[var(--color-foreground)]">entirely in your browser</span> &mdash; nothing leaves this device.
          </p>
        </div>
      </div>
    </div>
  );
}

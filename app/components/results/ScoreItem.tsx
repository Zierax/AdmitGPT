"use client";

export function ScoreItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-2.5 rounded-lg bg-[var(--color-card)] border border-[var(--color-border)] text-center">
      <div className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider font-bold">{label}</div>
      <div className="text-sm font-bold font-sans mt-0.5 tracking-tight">{value}</div>
    </div>
  );
}

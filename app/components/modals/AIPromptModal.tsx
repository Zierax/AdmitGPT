"use client";

import { Download, X } from "lucide-react";

export function AIPromptModal({ onClose, onDownload }: { onClose: () => void; onDownload: () => void }) {
  const promptText = `I have attached my AdmitGPT deterministic mathematical audit. The PDF contains my raw Z-scores, spike modifiers, and the JSON payload mapping the structural engine data. 

   act as a Chief Admissions Strategist And college professional consultant with 30 years of experience and do the following:
1. Parse the JSON Matrix at the absolute end of the document to establish my factual profile.
2. Read the calculation traces and Z-scores to identify where my raw math differs from historical acceptances.
3. Ignore standard advice. Focus ONLY on actionable metrics based on my specific "gap" analysis computed by the system.
4. Tell me directly if my Spike Score needs raising or if my structural academic bounds are insufficient. Give me a 3-step brutal reality-check roadmap.
5. Give me the percenitages of acceptance for each university and overrall acceptance rate. (main thing to do)
6. Suggest more and better colleges to apply to based on my own profile`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm animate-fade-in">
      <div className="ag-card w-full max-w-2xl p-8 relative border-[var(--color-primary)] overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <button onClick={onClose} className="text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors">
            <X size={24} />
          </button>
        </div>

        <h3 className="text-2xl font-bold mb-4 font-sans text-[var(--color-primary)] tracking-tight">
          AI Strategic Diagnostic
        </h3>

        <p className="text-sm text-[var(--color-muted)] mb-6 tracking-wide">
          The PDF you are about to download contains an exhaustive, machine-readable JSON data matrix and literal mathematical traces representing your exact location in our model. <strong className="text-[var(--color-foreground)]">To get the best possible strategic advice, feed the downloaded PDF directly into Claude or DeepSeek-R1 (with Thinking Mode).</strong>
        </p>

        <div className="bg-[var(--color-surface-2)] border border-[var(--color-border)] p-4 rounded-lg mb-6 relative group">
          <p className="text-xs text-[var(--color-primary)] uppercase font-bold tracking-widest font-sans mb-2">Recommended Analysis Prompt:</p>
          <p className="text-sm font-sans text-[var(--color-foreground)] whitespace-pre-wrap">{promptText}</p>

          <button
            onClick={() => {
              navigator.clipboard.writeText(promptText);
              alert("Prompt copied to clipboard!");
            }}
            className="absolute top-4 right-4 text-xs bg-[var(--color-surface-2)] border border-[var(--color-border)] px-3 py-1 rounded text-[var(--color-muted)] hover:text-[var(--color-foreground)] hover:border-[var(--color-border-strong)] transition-all opacity-50 group-hover:opacity-100"
          >
            Copy Prompt
          </button>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onDownload}
            className="flex-1 btn-zine text-md py-4 flex items-center justify-center gap-2"
          >
            <Download size={20} />
            Generate & Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

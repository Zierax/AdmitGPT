# AdmitGPT Project Overview

AdmitGPT is a deterministic, client-side college admissions analysis engine designed to democratize access to high-quality admissions guidance. It replaces expensive consulting "magic" with transparent mathematical logic and rigorous data analysis.

## 1. The Transparency Manifesto

**"Transparency over Guesswork."**

While consultants sell insider magic, AdmitGPT provides calculated reality. My logic is open-source and runs entirely in your browser. No data collection, no hidden formulas. A systematic strike against information inequality. The admissions industry thrives on fear and ambiguity. By making the math transparent, we return the power to the students. This is about leveling the playing field for everyone. Built for transparency, designed by students.

## 2. Key Features

### 2.1 Deterministic Probability Engine
Unlike AI-based "hallucinations," AdmitGPT uses a rigorous additive-logistic model (`lib/engine.ts`) — a single logistic regression over academic Z-score, the Spike, and modifiers — mathematically bound to calculate predictable admission probabilities based on historical data.
- **Client-Side Execution:** All calculations happen exclusively in the browser. Zero tracking.
- **Full Traceability:** Users have immediate UI access explicitly breaking down their Z-scores, multipliers, and underlying equation coefficients.
- **International GPA reconciliation:** non-4.0 native GPAs are bridged to a US-4.0 equivalent before z-scoring.
- **Verification-aware anti-gaming:** unverified top-tier claims are capped and the spike is verification-discounted.

### 2.2 The "Outlier Protocol" & Automated Disclaimers
Standard statistical models fail for exceptional candidates. AdmitGPT implements a specific logic path for statistical outliers that handles variances properly:
- **Game Maker Protocol (Tier -1):** Maximum spike weight ($w_s = 0.175$); the spike term is hard-capped at $\pm C = \pm 2.0$ logits so no single achievement can overpower weak academics.
- **Outlier Protocol (Tier 0):** Spike weight $0.14$.
- **Standard Protocol:** Spike weight $0.11$.
- **International boost:** for international applicants with $z_a < 0$, the active spike weight is multiplied by $1.25$ so the engine leans on verified achievement rather than an incomparable transcript.
- **Systematic Disclaimer Output:** The system actively detects profiles with extreme feature variances. When identified, semantic error-handling injects a structural disclaimer indicating the output acts outside standard bounds, treating "anomalies" as model boundaries rather than applicant faults.

### 2.3 Comprehensive Verification Layer (Testing)
AdmitGPT utilizes a native underlying `vitest` unit-testing layer checking mathematical coherence globally.
- Guards against floating-point boundary issues.
- Ensures zero-dataset failures or runtime integrity crashes. 
- Verifies edge cases (missing data, pure outlier profiles).

### 2.4 The Verification Artifact
The generated PDF report abandons conventional "summaries" in favor of treating the output as a **detailed mathematical report**. 
- **Human-Readable Traces:** Visual bell-curves, explicit formula descriptions, and nearest-peer cluster analyses.
- **Audit Cryptography:** AES-256 signatures are integrated straight into the PDF to preserve structural integrity when shared without central databases.

### 2.5 Server-Side Privacy Isolation
All admissions evaluations are 100% processed without leaving the client device browser. The only server-side operation operates a Cloudflare D1 (SQLite at the edge) mechanism strictly dedicated to private outlier-founder communication pathways, protecting personal identities completely from third-party vendor logging.

### 2.6 CommonApp Auto-Extraction (utility, UI pending)
A `parseCommonAppPDF` utility in `lib/pdfParser.ts` can extract GPAs, test scores, and intended majors from uploaded PDFs via heuristics. It is not yet wired into the UI form flow; surfacing it is pending.

## 3. Technology Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Mathematical Testing:** Vitest (Engine v1.0 Comprehensive Suite)
- **Security:** AES-256 CTR (CryptoJS) for Audit Signatures
- **PDF Core:** `jspdf` and `jspdf-autotable`
- **Data Persistence:** Cloudflare D1 (SQLite at the edge) for private in-app outlier messaging.
- **Testing:** `vitest` logic suite ensuring formula validation globally.

## 4. Getting Started

### Installation
```bash
git clone https://github.com/Zierax/AdmitGPT.git
cd AdmitGPT
npm install
```

### Automatic Validation (Unit Tests)
```bash
npm run test
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to experience the deterministic pipeline.

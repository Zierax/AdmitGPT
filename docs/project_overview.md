# AdmitGPT Project Overview

AdmitGPT is a deterministic, client-side college admissions analysis engine designed to democratize access to high-quality admissions guidance. It replaces expensive consulting "magic" with transparent mathematical logic and rigorous data analysis.

## 1. The Transparency Manifesto

**"Mathematics over Magic."**

AdmitGPT is built on a core principle: **Information is the ultimate gatekeeper, and mathematics should never be a secret.**
While consulting firms sell "insider knowledge" for thousands of dollars per hour, AdmitGPT provides a calculated reality for free. Every algorithm is verifiable. Every limitation is rigorously disclosed. This isn't just an app; it’s a systematic strike against information inequality, engineered by a student for students.

## 2. Key Features

### 2.1 Deterministic Probability Engine
Unlike AI-based "hallucinations," AdmitGPT uses a rigorous logistic regression model (`lib/engine.ts`) mathematically bound to calculate predictable admission probabilities based on historical data.
- **Client-Side Execution:** All calculations happen exclusively in the browser. Zero tracking.
- **Full Traceability:** Users have immediate UI access explicitly breaking down their Z-scores, multipliers, and underlying equation coefficients.

### 2.2 The "Outlier Protocol" & Automated Disclaimers
Standard statistical models fail for exceptional candidates. AdmitGPT implements a specific logic path for statistical outliers that handles variances properly:
- **Game Maker Protocol (Tier -1):** Bypasses standard academic filters entirely for global achievers (TIME 100, Olympic Medals).
- **Outlier Protocol (Tier 0):** Reduces academic weighting and emphasizes deep specialized impact.
- **Systematic Disclaimer Output:** The system actively detects profiles with extreme feature variances. When identified, semantic error-handling injects a structural disclaimer indicating the output acts outside standard bounds, treating "anomalies" as model boundaries rather than applicant faults.

### 2.3 Comprehensive Verification Layer (Testing)
AdmitGPT utilizes a native underlying `vitest` unit-testing layer checking mathematical coherence globally.
- Guards against floating-point boundary issues.
- Ensures zero-dataset failures or runtime integrity crashes. 
- Verifies edge cases (missing data, pure outlier profiles).

### 2.4 The "AI Bridge" PDF with Machine-Readable Context
The generated PDF report abandons conventional "summaries" in favor of treating the output as a **high-density data artifact**.
- **Human-Readable Traces:** Visual bell-curves, explicit formula descriptions, cluster analyses, and calculated Euclidean profiles matching.
- **Machine-Readable Schema Dump:** Includes a rigorous structured JSON block internally embedding the matrix weights, vectors, raw deltas, and intermediate scoring steps explicitly designed for future consumption by external optimization AI, fundamentally prioritizing LLM readability.

### 2.5 Optional Local LLM Interpreters
Instead of acting as a wrapper app, AdmitGPT allows users to locally store their own OpenAI/Gemini/Groq keys, directly leveraging the compiled math tables and vector metrics without their raw data leaving the client framework context.

### 2.6 CommonApp Auto-Extraction
Permits uploading `.pdf` files to auto-extract GPAs, tests, and intended majors via heuristics, preventing manual workflow bloat.

## 3. Technology Stack

- **Frontend:** Next.js (app structure), TypeScript, Tailwind CSS (brutalist design).
- **In-Browser Processing:** Advanced CSV handling and `pdfjs-dist` file evaluations.
- **Reporting:** `jspdf` vector plotting intertwined with JSON injection.
- **Testing:** `vitest` logic suite ensuring formula validation globally.
- **Privacy Core:** 100% Zero-Data architecture.

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

# AdmitGPT Project Overview

AdmitGPT is a deterministic, client-side college admissions analysis engine designed to democratize access to high-quality admissions guidance. It replaces expensive consulting "magic" with transparent mathematical logic and rigorous data analysis.

## 1. The Transparency Manifesto

**"Transparency over Guesswork."**

While consultants sell insider magic, AdmitGPT provides calculated reality. My logic is open-source and runs entirely in your browser. No data collection, no hidden formulas. A systematic strike against information inequality. The admissions industry thrives on fear and ambiguity. By making the math transparent, we return the power to the students. This is about leveling the playing field for everyone. Built for transparency, designed by students.

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

### 2.4 The Verification Artifact
The generated PDF report abandons conventional "summaries" in favor of treating the output as a **high-density mathematical artifact**. 
- **Human-Readable Traces:** Visual bell-curves, explicit formula descriptions, cluster analyses, and calculated Euclidean profiles matching.
- **Audit Cryptography:** AES-256 signatures are integrated straight into the PDF to preserve structural integrity when shared without central databases.

### 2.5 Server-Side Privacy Isolation
All admissions evaluations are 100% processed without leaving the client device browser. The only server-side operation operates a self-contained SQLite `messages.db` mechanism strictly dedicated to private outlier-founder communication pathways, protecting personal identities completely from third-party vendor logging.

### 2.6 CommonApp Auto-Extraction
Permits uploading `.pdf` files to auto-extract GPAs, tests, and intended majors via heuristics, preventing manual workflow bloat.

## 3. Technology Stack

- **Frontend:** Next.js (app structure), TypeScript, Tailwind CSS (brutalist design).
- **In-Browser Processing:** Advanced CSV handling and `pdfjs-dist` file evaluations.
- **Reporting:** `jspdf` vector plotting for offline PDF generation.
- **Data Persistence:** Local `better-sqlite3` environment for Zero-Tracking secure communication.
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

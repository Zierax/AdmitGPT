# AdmitGPT Architecture v1.0
### The High-Stakes Admissions Authority

AdmitGPT is a Next.js-based client-side application designed for high-performance, deterministic college admissions analysis, fortified with robust mathematical testing and AI-ready output pipelines.

---

## 1. High-Level Overview

AdmitGPT is a **Single Page Application (SPA)** built with Next.js 14+ (App Router). It is fully client-side for maximum privacy and transparency. All logic execution, data processing, anomaly detection, and cryptographically-signed PDF generation happen exclusively in the user's browser.

### Key Technologies
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Modern Admissions Authority Aesthetic)
- **Mathematical Testing:** Vitest (Engine v1.0 Comprehensive Suite)
- **Security:** AES-256 CTR (CryptoJS) for Audit Signatures
- **PDF Core:** `jspdf` and `jspdf-autotable`

## 2. Directory Structure

```
AdmitGPT/
├── app/                  # Next.js App Router
│   ├── components/       # UI (Header, ResultsCard, etc.)
│   ├── transparency/     # The Formula & Logic Disclosure View
│   ├── globals.css       # Design System & Tokens
│   └── page.tsx          # Orchestrator & Controller
├── docs/                 # Documentation (Architecture, Logic, Data)
├── lib/                  # Core Models & Utilities
│   ├── crypto.ts         # Verification & Identity Signature Logic (AES-256)
│   ├── dataLoader.ts     # Dataset parsing (5.5MB profiles)
│   ├── engine.ts         # Gated Multiplicative Model (Core)
│   ├── gapAnalyzer.ts    # k-NN Euclidean distance (Neighbor clustering)
│   ├── pdfReport.ts      # Verifiable PDF Generator (signed)
│   └── types.ts          # Central Interfaces & Enums
├── tests/                # Testing Suite
│   ├── engine.test.ts    # Boundary & Overflow verification
│   └── comprehensive.test.ts # v1.0 Logic & Major Competitiveness
└── public/               # Static assets
    ├── assets/           # Logos & Visual Identity
    └── data/             # CSV/JSON datasets (profiles & colleges)
```

## 3. Core Modules

### 3.1 `lib/engine.ts` (The Brain)
Implements the **Gated Multiplicative Model**.
- **Gate Function**: Enforces strict academic floors (SAT/GPA).
- **Spike Modeling**: Evaluates qualitative achievements through a 6-factor rubric.
- **Modifiers**: Calculates major-specific competitiveness and international rigor bonuses.

### 3.2 `lib/crypto.ts` (The Verifier)
Handles the **Admissions Identity System**.
- **Audit Signature**: Encodes profile data using AES-256 CTR to generate a verifyable string.
- **Privacy Masking**: Allows users to redact Name/PII while keeping the signature cryptographically intact.

### 3.3 `lib/pdfReport.ts` (The Audit Authority)
Generates high-fidelity, cryptographically-signed PDF reports.
- **Universal Audit**: Every report starts with a verification certificate.
- **AI Bridge**: Appends a JSON metadata block for secondary LLM scraping and analysis.

### 3.4 `app/transparency/page.tsx` (The Disclosure)
A dedicated portal that exposes every formula used in the engine to the end user. This ensures "No Black Box" accountability.

## 4. Data Pipeline

1. **Initialization**: Fetches and parses `students.json` and `colleges.json` locally.
2. **Analysis Trigger**: `engine.ts` executes the Gated Multiplicative Model.
3. **Clustering**: `gapAnalyzer.ts` finds nearest accepted/rejected neighbors via k-NN.
4. **Identity Generation**: `crypto.ts` generates a unique Audit Signature.
5. **Output**: Renders the ResultsPage with dynamic "Analysis Ratings" and disclaimers.

---

Built for precision. **Powered by Math.**

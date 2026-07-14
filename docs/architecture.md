# AdmitGPT Architecture v1.0
### The High-Stakes Admissions Authority

AdmitGPT is a Next.js-based client-side application designed for high-performance, deterministic college admissions analysis, fortified with robust mathematical testing and AI-ready output pipelines.

---

## 1. High-Level Overview

AdmitGPT is a **Single Page Application (SPA)** built with Next.js 16 (App Router). It is fully client-side for maximum privacy and transparency. All logic execution, data processing, anomaly detection, and cryptographically-signed PDF generation happen exclusively in the user's browser.

### Key Technologies
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Mathematical Testing:** Vitest (Engine v1.0 Comprehensive Suite)
- **Security:** AES-256 CTR (CryptoJS) for Audit Signatures
- **PDF Core:** `jspdf` and `jspdf-autotable`
- **Data Persistence:** Cloudflare D1 (SQLite at the edge)

## 2. Directory Structure

```
AdmitGPT/
├── app/                  # Next.js App Router
│   ├── components/       # UI (Header, ResultsCard, etc.)
│   │   ├── screens/      # LandingPage, LoadingScreen
│   │   ├── steps/        # Step1–Step5 form components
│   │   ├── modals/       # AIPromptModal, CalculationsModal, WhyModal
│   │   ├── results/      # ScoreItem, SuggestionColumn, SchoolResultCard
│   │   ├── FormPage.tsx  # Multi-step form orchestrator
│   │   └── ResultsPage.tsx # Results view
│   ├── transparency/     # The Formula & Logic Disclosure View
│   ├── globals.css       # Design System & Tokens
│   └── page.tsx          # Orchestrator for the multi-step flow
├── app/hooks/            # React hooks
│   └── useAdmitEngine.ts # Data loading, analysis, AI config state
├── docs/                 # Documentation (Architecture, Logic, Data)
├── lib/                  # Core Models & Utilities
│   ├── crypto.ts         # Verification & Identity Signature Logic (AES-256)
│   ├── dataLoader.ts     # Dataset parsing (5.2 MB, 1,122 profiles)
│   ├── db.ts             # Typed Cloudflare D1 wrappers
│   ├── engine.ts         # Additive-Logistic Model (Core)
│   ├── gapAnalyzer.ts     # k-NN composite-score distance (Neighbor clustering)
│   ├── pdfReport.ts      # Verifiable PDF Generator (signed)
│   ├── siteConfig.ts     # Centralized env-driven site config
│   └── types.ts          # Central Interfaces & Enums
├── tests/                # Testing Suite
│   ├── engine.test.ts    # Boundary & Overflow verification
│   ├── comprehensive.test.ts # v1.0 Logic & Major Competitiveness
│   └── repro_spike_13.test.ts # Spike saturation regression check
└── public/               # Static assets
    ├── assets/           # Logos & Visual Identity
    └── data/             # JSON datasets
        ├── studentsdata.json  # 5.2 MB, 1,122 applicant profiles
        └── collegesdata.json  # 761 KB, 200 college metadata records
```

## 3. Core Modules

### 3.1 `lib/engine.ts` (The Brain)
Implements the **Additive-Logistic Model** — a single logistic regression over academic Z-score, the Spike, and modifiers.
- **Academic Channel**: $\beta\, z_a$ with $\beta = 1.5$ (academics dominate); non-4.0 GPAs are bridged via `convertToUS4` before z-scoring.
- **Spike Modeling**: Evaluates qualitative achievements through a 6-factor rubric with logarithmic saturation and a hard logit cap ($\pm C = \pm 2.0$).
- **Modifiers**: Calculates major-specific competitiveness and international rigor bonuses.
- **Protocols**: Standard / Outlier / Game Maker select spike weights $0.11 / 0.14 / 0.175$; the spike term is verification-discounted and hard-capped so weak academics can never be rescued by a spike.

### 3.2 `lib/crypto.ts` (The Verifier)
Handles the **Admissions Identity System**.
- **Audit Signature**: Encodes profile data using AES-256 CTR to generate a verifiable string.
- **Privacy Masking**: Allows users to redact Name/PII while keeping the signature cryptographically intact.
- **Env-driven**: Contact email and site origin sourced from `siteConfig.ts`.

### 3.3 `lib/pdfReport.ts` (The Audit Authority)
Generates high-fidelity, cryptographically-signed PDF reports.
- **Universal Audit**: Every report starts with a verification certificate.
- **AI Bridge**: Appends a JSON metadata block for secondary LLM scraping and analysis.
- **Secure ID**: Report IDs generated via `crypto.getRandomValues()` (not `Math.random()`).

### 3.4 `lib/db.ts` (The Data Layer)
Typed Cloudflare D1 wrappers for the outlier messaging system.
- **Type-safe**: `D1Database`, `D1PreparedStatement`, `MessageRecord` types.
- **Server-only**: Admin auth reads `PASSCODE_OF_OUTLINERS` (not the `NEXT_PUBLIC_` key).

### 3.5 `app/transparency/page.tsx` (The Disclosure)
A dedicated portal that exposes every formula used in the engine to the end user. This ensures "No Black Box" accountability.

## 4. Data Pipeline

1. **Initialization**: Fetches and parses `studentsdata.json` (5.2 MB) and `collegesdata.json` (761 KB) locally.
2. **Analysis Trigger**: `engine.ts` executes the Additive-Logistic Model.
3. **Clustering**: `gapAnalyzer.ts` finds nearest accepted/rejected neighbors via k-NN.
4. **Identity Generation**: `crypto.ts` generates a unique Audit Signature.
5. **Output**: Renders the ResultsPage with dynamic "Analysis Ratings" and disclaimers.

## 5. Data Sources

| Dataset | Source | Records | Size |
|---------|--------|---------|------|
| Applicant Profiles | CollegeBase | 1,122 | 5.2 MB |
| College Metadata | CollegeBase | 200 | 761 KB |

See [datasources.md](./datasources.md) for full schema documentation.

---

Built for precision. **Powered by Math.**

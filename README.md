# AdmitGPT v1.0
### Transparency over Guesswork

While consultants sell insider magic, AdmitGPT provides calculated reality. My logic is open-source and runs entirely in your browser. No data collection, no hidden formulas. A systematic strike against information inequality. The admissions industry thrives on fear and ambiguity. By making the math transparent, we return the power to the students. This is about leveling the playing field for everyone. Built for transparency, designed by students.

---

##  Key Features

- **Additive-Logistic Architecture**: A single logistic model in which academics, the "Spike", and modifiers each contribute additively to the admission log-odds — with a hard cap so one achievement can never overpower weak grades, plus native-scale GPA reconciliation for international applicants.
- **Verification-Aware Anti-Gaming**: Unverified top-tier claims are capped and the spike is verification-discounted, so over-claiming cannot inflate a result.
- **Identity & Verification Engine**: Every result is cryptographically signed with an Audit Signature (displayed as a "Global Audit Signature" for high-achievement outliers).
- **Full Privacy Protection**: All calculations run locally in your browser. Zero tracking. Only opt-in outlier messages are persisted, in a Cloudflare D1 database.
- **Transparency First**: Every formula, weight, and limitation is disclosed. Access the [Transparency Engine](/transparency) to see the math behind the numbers.
- **Private Gateway**: High-achievement outliers gain a direct "Private Invitation" channel to the creator, backed by a Cloudflare D1 (SQLite) datastore designed with privacy in mind.

##  Technology Stack

- **Core**: Next.js (React), TypeScript, TailwindCSS
- **Security**: AES-256 CTR (CryptoJS) for Audit Signatures
- **PDF Core**: jsPDF for secure, cryptographically-signed report generation
- **Math Engine**: Multi-dimensional probability modeling with k-NN clustering across a 5.2MB dataset (1,122 profiles from CollegeBase)
- **Data Persistence**: Cloudflare D1 (SQLite at the edge) for private in-app outlier messaging.

##  Getting Started Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Production Build**:
   ```bash
   npm run build
   ```

##  Testing

We ensure mathematical integrity through a rigorous testing suite:
```bash
npm run test
```
See `tests/comprehensive.test.ts`, `tests/engine.test.ts`, and `tests/edge_cases.test.ts` for logic verification of Major Competitiveness, International GPA reconciliation, and verification-aware anti-gaming.

---

Built by student, for students. **Zero Secrets. No Black Boxes.**

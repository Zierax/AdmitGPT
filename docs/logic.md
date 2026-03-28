# AdmitGPT Engine v1.0: The Gated Multiplicative Foundation

This document outlines the core mathematical and logical processes behind the AdmitGPT engine. It details how the system calculates admission probabilities using a **Gated Multiplicative Model**, handles exceptional candidates ("Outliers" and "Anomalies"), and produces robust machine-readable outputs.

---

## 1. Core Philosophy: Deterministic Transparency

AdmitGPT rejects "black box" algorithms. The engine is entirely **client-side**, **testing-validated**, and **deterministic**. Every calculation is auditable via the [Transparency Engine](/transparency).

### 1.1 Structural Unit Testing Layer
Every calculation is verified by the `tests/comprehensive.test.ts` Vitest suite:
- **Major Competitiveness**: Validates that field-specific rates are applied correctly.
- **Academic Gating**: Ensures low-academic profiles cannot bypass rigorous standards regardless of extracurricular impact.
- **International Anomalies**: Checks that non-standard school systems trigger appropriate disclaimers and rigor bonuses.

---

## 2. The Probability Formula (Engine v1.0)

Unlike version 1.0 (purely additive), version 2.0 implements a **Gated Multiplicative Model** to ensure that academic rigor acts as a hard requirement for selective institutions.

### 2.1 The Master Equation
$$
P(x) = \text{Gate}(\text{Academic\_Z}) \times \text{Impact}(\text{Spike, Major, Region})
$$

### 2.2 Component Breakdown

#### A. Academic Gate (The Requirement)
The `Gate` function evaluates the student's academic standing (SAT/GPA) relative to the institutional mean.
- If $Z_{academic} > 0$: The gate is fully open (1.0 multiplier).
- If $Z_{academic} < -2.0$: The gate closes rapidly ($0.01 - 0.15$ multiplier), effectively hard-capping the final probability regardless of extracurriculars.

#### B. Spike Impact (The "Why You")
Captured through a 6-factor qualitative rubric (Weight, Scope, Rarity, Prestige, Cognitive Load, Validation).
- Scale: 0.0 to 15.0 points.
- **Renaissance Bonus**: A non-linear boost up to +3.0 awarded to polymaths with achievements across multiple distinct categories (Arts + STEM + Athletics).

#### C. Major & Regional Modifiers
- **Major Modifier**: A scalar derived from dataset-specific acceptance rates for that field (e.g., CS at 0.7x difficulty).
- **International/Regional Modifier**: Adjusts for geographic quotas and rigor deflation in non-domestic school systems.

---

## 3. Outlier and Anomaly Classification

AdmitGPT implements a **Tier-Based Identity System** to handle profiles that deviate from the statistical mean.

### 3.1 Classification Criteria
| Category | Logic Trigger | UI Identity |
| :--- | :--- | :--- |
| **Outlier (Spike)** | Spike Score > 8.5 or Tier 0/-1 Activity | Candidate Excellence Certificate |
| **Data Anomaly** | International + Non-Standard System | Verification (with Anomaly Note) |
| **Standard** | Academic-driven / Normative Profile | Standard Audit Signature |

### 3.2 Outlier Protocol Injection
When a profile achieves "Outlier" status:
- The system generates a **Candidate Excellence Certificate** with a unique "Global Audit Signature."
- The `Academic_Z` dependency is softened (multiplicative logic), but the **Hard Gate** still prevents "pay-to-play" outlier scenarios where weak academics are ignored.

---

## 4. Confidence Intervals & Neighbor Clustering

1. **k-NN Clustering**: The engine identifies the $k$ most similar accepted and rejected profiles in the 5.5MB dataset using weighted Euclidean distance.
2. **Dynamic Error Width**:
   - $N \ge 15$: High Confidence (±12% range).
   - $N < 3$: Insufficient Data (±35% range), triggers a "Data Anomaly" alert.

---

## 5. The "AI Bridge" Technical Trace

The PDF Generator extracts a full **Analytical Trace**:
- Precise pipeline matrices and weights.
- Transformation stages and delta-distances.
- A raw embedded `.json` representation for secondary AI analysis (Local LLM ingestion).

Built for precision. **Verified by Math.**

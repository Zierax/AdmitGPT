# Data Models

This document defines the core data structures used throughout AdmitGPT. All types are defined explicitly in `lib/types.ts`.

## 1. UserProfile

The `UserProfile` interface encapsulates the entire raw state of an applicant's attributes.

| Field | Type | Description |
| :--- | :--- | :--- |
| `isInternational` | `boolean` | Flags status for native vs international quota logic tracking. |
| `schoolSystem` | `enum` | `'US_Standard'`, `'Intl_Standard'`, or `'National_Non_Standard'`. |
| `intendedMajor` | `string` | The selected major applied directly by the user. |
| `majorCategory` | `MajorCategory` | Categorization class mapping directly against major modifications. |
| `sat` / `act` | `number \| null` | Corresponding verified scores. ACT auto-converts structurally using concordances. |
| `unweightedGPA` | `number \| null` | Base raw unweighted GPA scale. |
| `numberOfAPCourses` | `number` | Total number of AP classes validating local rigor. |
| `extracurriculars` | `UserEC[]` | A structural array comprising `{ title, description, tier }`. |
| `awards` | `UserAward[]` | A structural array tracking achievements logically. |

## 2. ECTier (Extracurricular Tier)

Defines qualitative modifiers injecting variances into calculations safely.

| Value | Label | Description |
| :--- | :--- | :--- |
| `-1` | **GAME MAKER** | Automatically forces short-circuit mechanisms (e.g., Outlying exceptions). |
| `0` | **OUTLIER** | Extreme impact overriding low academics logically. |
| `1` | **TIER 1** | National-level representation. |
| `2` | **TIER 2** | State or regional leadership. |
| `3` | **TIER 3** | Baseline local/school recognition markers. |

## 3. EngineResult

The absolute computed boundary state describing an applicant's evaluation against a specific academic institution.

| Field | Type | Description |
| :--- | :--- | :--- |
| `schoolName` | `string` | The parsed evaluation target college name. |
| `pointEstimate` | `number` | Sigmoid-bounded primary probability estimation. |
| `low` / `high` | `number` | Confidence Interval thresholds ensuring standard deviation safety. |
| `confidenceLevel` | `enum` | Ranges from `'high'` corresponding to dataset volume to `'insufficient'`. |
| `confidenceLabel` | `string` | Granular trace descriptions explaining probability deviations. |
| `sampleN` | `number` | Total historical students falling inside the cluster threshold. |
| `rawScore` | `number` | Unfiltered aggregated linear combination Logit result. |
| `satZ` / `gpaZ` | `number` | Native feature Z-scores explicit evaluations against isolated bounds. |
| `spikeScore` | `number` | Aggregated non-academic multiplier. |
| `protocolTriggered`| `enum` | States if specific anomaly overrides (e.g. `OUTLIER`) acted structurally. |
| `disclaimer` | `string \| undefined` | Explicit edge-case evaluation string actively attached when profiles generate unrealistic statistical assumptions (e.g. extremely high spike variance triggering structural ceiling warnings). |

## 4. GapAnalysis & Nearest Neighbors

Provides context regarding the spatial clustering mechanism locating equivalent applicant templates.

| Field | Type | Description |
| :--- | :--- | :--- |
| `clusterSize` | `number` | Total applicant cluster matched logically via Euclidean spatial mapping. |
| `nearestAccepted`| `object` | Exposes the lowest delta distance peer structurally validated as admitted. |
| `nearestRejected`| `object` | Comparative rejection peer matching vector structures closely. |
| `improvementImpact`| `object[]` | Simulated improvement boundaries modeling attribute shifts. |

## 5. CollegeData & AI Analysis Output Models

- **`CollegeData`**: Unchanged mapping containing raw admissions percentiles mapping dynamically loaded datasets containing thresholds, acceptance percentages, tuition matrices, degrees scaling, and SAT standard deviations directly dictating output bounds.
- **`AIAnalysis` / `AIConfig`**: External machine-interpretable outputs explicitly enabling local APIs (Gemini, ChatGPT) to structurally override and interpret logical evaluations through API keys stored entirely client-side. Allows processing the JSON structured outputs dumped via the PDF machine-readable generator matrix.


Source:- 
https://app.collegebase.org/data/collegesData.json
https://app.collegebase.org/data/applicantProfiles.json
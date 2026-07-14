// build_colleges.mjs — Stage 1 of the data upgrade.
// Reads the full College Scorecard "Most-Recent-Cohorts-Institution.csv"
// (3,308 columns, ~95 MB) and emits a compact, de-noised JSON containing
// only the fields the AdmitGPT engine/UI actually consume, mapped to the
// dotted-key schema the code already expects. Institution-level only;
// per-applicant outcome data does not exist publicly (admissions are
// confidential), so this is the most granular legitimate public source.
//
// This keeps the app client-only and privacy-first: the 95 MB source is the
// auditable record; only the minimal derived slice ships to the browser.

import * as fs from 'fs';
import * as path from 'path';

const SRC = path.join(process.cwd(), 'Most-Recent-Cohorts-Institution.csv');
const OUT = path.join(process.cwd(), 'public', 'data', 'collegesdata.json');

// dotted key -> CSV column (auto number/string detection)
const DIRECT = {
  'id': 'UNITID',
  'school.name': 'INSTNM',
  'school.city': 'CITY',
  'school.state': 'STABBR',
  'school.zip': 'ZIP',
  'school.school_url': 'INSTURL',
  'school.ownership': 'CONTROL',
  'school.degrees_awarded.predominant': 'PREDDEG',
  'admissions.admission_rate.overall': 'ADM_RATE',
  'admissions.admission_rate.by_ope_id': 'ADM_RATE_ALL',
  'admissions.sat_scores.average.overall': 'SAT_AVG',
  'admissions.sat_scores.average.by_ope_id': 'SAT_AVG_ALL',
  'admissions.sat_scores.midpoint.math': 'SATMTMID',
  'admissions.sat_scores.midpoint.writing': 'SATWRMID',
  'admissions.sat_scores.midpoint.critical_reading': 'SATVRMID',
  'admissions.sat_scores.25th_percentile.math': 'SATMT25',
  'admissions.sat_scores.25th_percentile.writing': 'SATWR25',
  'admissions.sat_scores.25th_percentile.critical_reading': 'SATVR25',
  'admissions.sat_scores.50th_percentile.math': 'SATMT50',
  'admissions.sat_scores.50th_percentile.critical_reading': 'SATVR50',
  'admissions.sat_scores.75th_percentile.math': 'SATMT75',
  'admissions.sat_scores.75th_percentile.writing': 'SATWR75',
  'admissions.sat_scores.75th_percentile.critical_reading': 'SATVR75',
  'admissions.act_scores.midpoint.math': 'ACTMTMID',
  'admissions.act_scores.midpoint.english': 'ACTENMID',
  'admissions.act_scores.midpoint.writing': 'ACTWRMID',
  'admissions.act_scores.midpoint.cumulative': 'ACTCMMID',
  'admissions.act_scores.25th_percentile.math': 'ACTMT25',
  'admissions.act_scores.25th_percentile.english': 'ACTEN25',
  'admissions.act_scores.25th_percentile.writing': 'ACTWR25',
  'admissions.act_scores.25th_percentile.cumulative': 'ACTCM25',
  'admissions.act_scores.50th_percentile.math': 'ACTMT50',
  'admissions.act_scores.50th_percentile.english': 'ACTEN50',
  'admissions.act_scores.50th_percentile.cumulative': 'ACTCM50',
  'admissions.act_scores.75th_percentile.math': 'ACTMT75',
  'admissions.act_scores.75th_percentile.english': 'ACTEN75',
  'admissions.act_scores.75th_percentile.writing': 'ACTWR75',
  'admissions.act_scores.75th_percentile.cumulative': 'ACTCM75',
  'cost.tuition.in_state': 'TUITIONFEE_IN',
  'cost.tuition.out_of_state': 'TUITIONFEE_OUT',
  'cost.avg_net_price.public': 'NPT4_PUB',
  'cost.avg_net_price.private': 'NPT4_PRIV',
  'student.size': 'UGDS',
  'student.demographics.men': 'UGDS_MEN',
  'student.demographics.women': 'UGDS_WOMEN',
  'student.demographics.age_entry': 'AGE_ENTRY',
  'student.demographics.first_generation': 'FIRST_GEN',
  'earnings.10_yrs_after_entry.median': 'MD_EARN_WNE_P10',
  'median_earnings_after_grad': 'MD_EARN_WNE_P10',
  'median_earnings_10yrs_after_grad': 'MD_EARN_WNE_P10',
  'graduation_rate': 'C150_4',
  'student_to_faculty_ratio': 'STUFACR',
  'climate_region': 'REGION',
};

// race/ethnicity: the College Scorecard already reports UGDS_* as a SHARE
// (fraction) of undergraduates, so the value is taken as-is. The engine
// expects a fraction (it divides non_resident_alien by 0.10).
const FRACTION = {
  'student.demographics.race_ethnicity.aian': 'UGDS_AIAN',
  'student.demographics.race_ethnicity.nhpi': 'UGDS_NHPI',
  'student.demographics.race_ethnicity.asian': 'UGDS_ASIAN',
  'student.demographics.race_ethnicity.black': 'UGDS_BLACK',
  'student.demographics.race_ethnicity.white': 'UGDS_WHITE',
  'student.demographics.race_ethnicity.unknown': 'UGDS_UNKN',
  'student.demographics.race_ethnicity.hispanic': 'UGDS_HISP',
  'student.demographics.race_ethnicity.two_or_more': 'UGDS_2MOR',
  'student.demographics.race_ethnicity.non_resident_alien': 'UGDS_NRA',
};

function parseCSVLine(line) {
  const out = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') { cur += '"'; i++; }
        else inQuotes = false;
      } else cur += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ',') { out.push(cur); cur = ''; }
      else cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function toVal(s) {
  // College Scorecard marks missing values as "NA" (and occasionally "NULL").
  if (s === 'NULL' || s === 'NA' || s === '' || s === undefined || s === null) return null;
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  return s;
}

console.log('Reading', SRC, '...');
const raw = fs.readFileSync(SRC, 'utf-8');
const lines = raw.split('\n');
const header = parseCSVLine(lines[0]);
console.log('Columns:', header.length, 'Rows:', lines.length - 1);

const directIdx = {};
for (const [k, col] of Object.entries(DIRECT)) {
  const i = header.indexOf(col);
  if (i === -1) console.warn('  WARN missing column', col, 'for', k);
  directIdx[k] = i;
}
const fracIdx = {};
for (const [k, col] of Object.entries(FRACTION)) {
  const i = header.indexOf(col);
  if (i === -1) console.warn('  WARN missing column', col, 'for', k);
  fracIdx[k] = i;
}
const ugdsIdx = header.indexOf('UGDS');

const out = [];
for (let r = 1; r < lines.length; r++) {
  const line = lines[r];
  if (!line.trim()) continue;
  const cells = parseCSVLine(line);
  const rec = {};
  for (const [k, i] of Object.entries(directIdx)) {
    if (i === -1) continue;
    rec[k] = toVal(cells[i]);
  }
  for (const [k, i] of Object.entries(fracIdx)) {
    if (i === -1) continue;
    rec[k] = toVal(cells[i]);
  }
  out.push(rec);
}

fs.writeFileSync(OUT, JSON.stringify(out));
const bytes = fs.statSync(OUT).size;
console.log(`Wrote ${out.length} institutions -> ${OUT}`);
console.log(`Output size: ${(bytes / 1e6).toFixed(2)} MB`);

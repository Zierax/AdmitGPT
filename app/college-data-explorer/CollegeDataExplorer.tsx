'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

interface College {
  id: number;
  name: string;
  city: string;
  state: string;
  rate: number | null;
  sat: number | null;
  act: number | null;
  tuitionIn: number | null;
  tuitionOut: number | null;
  size: number | null;
  ownership: number;
}

const STATES = ['All','AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

const TIERS = [
  { label: 'All', min: 0, max: 100 },
  { label: 'Under 5%', min: 0, max: 5 },
  { label: '5–10%', min: 5, max: 10 },
  { label: '10–20%', min: 10, max: 20 },
  { label: '20–40%', min: 20, max: 40 },
  { label: '40–60%', min: 40, max: 60 },
  { label: '60–80%', min: 60, max: 80 },
  { label: '80%+', min: 80, max: 100 },
];

function parseData(raw: Record<string, unknown>[]): College[] {
  return raw.map((c) => ({
    id: c.id as number,
    name: c['school.name'] as string,
    city: c['school.city'] as string,
    state: c['school.state'] as string,
    rate: c['admissions.admission_rate.overall'] as number | null,
    sat: c['admissions.sat_scores.average.overall'] as number | null,
    act: c['admissions.act_scores.midpoint.cumulative'] as number | null,
    tuitionIn: c['cost.tuition.in_state'] as number | null,
    tuitionOut: c['cost.tuition.out_of_state'] as number | null,
    size: c['student.size'] as number | null,
    ownership: c['school.ownership'] as number,
  }));
}

function ScatterPlot({ data, compareIds }: { data: College[]; compareIds: Set<number> }) {
  const plotted = data.filter(c => c.rate != null && c.sat != null && c.sat > 0);
  if (plotted.length === 0) return <p className="ag-muted" style={{ fontSize: 14 }}>No data points for this filter.</p>;

  const minSat = Math.min(...plotted.map(c => c.sat!));
  const maxSat = Math.max(...plotted.map(c => c.sat!));
  const W = 700, H = 400, PAD = 50;

  const x = (sat: number) => PAD + ((sat - minSat) / (maxSat - minSat)) * (W - PAD * 2);
  const y = (rate: number) => PAD + ((1 - rate) / 1) * (H - PAD * 2);

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: W, height: 'auto' }}>
        {/* axes */}
        <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="var(--color-border)" />
        <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="var(--color-border)" />
        {/* x labels */}
        {[400, 600, 800, 1000, 1200, 1400, 1600].filter(s => s >= minSat && s <= maxSat).map(s => (
          <text key={s} x={x(s)} y={H - PAD + 18} textAnchor="middle" fill="var(--color-foreground)" fontSize={11}>{s}</text>
        ))}
        {/* y labels */}
        {[0, 20, 40, 60, 80, 100].map(r => (
          <text key={r} x={PAD - 8} y={y(r / 100) + 4} textAnchor="end" fill="var(--color-foreground)" fontSize={11}>{r}%</text>
        ))}
        {/* axis titles */}
        <text x={W / 2} y={H - 4} textAnchor="middle" fill="var(--color-foreground)" fontSize={12}>Average SAT Score</text>
        <text x={12} y={H / 2} textAnchor="middle" fill="var(--color-foreground)" fontSize={12} transform={`rotate(-90, 12, ${H / 2})`}>Acceptance Rate</text>
        {/* points */}
        {plotted.map(c => {
          const isComp = compareIds.has(c.id);
          return (
            <g key={c.id}>
              <circle
                cx={x(c.sat!)}
                cy={y(c.rate!)}
                r={isComp ? 7 : 4}
                fill={isComp ? '#ef4444' : c.ownership === 1 ? '#6366f1' : '#22c55e'}
                opacity={isComp ? 1 : 0.6}
                stroke={isComp ? '#fff' : 'none'}
                strokeWidth={isComp ? 2 : 0}
              />
              {isComp && (
                <text x={x(c.sat!) + 10} y={y(c.rate!) + 4} fill="#ef4444" fontSize={11} fontWeight={600}>
                  {c.name.length > 25 ? c.name.slice(0, 22) + '...' : c.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function CollegeDataExplorer() {
  const [raw, setRaw] = useState<Record<string, unknown>[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [stateFilter, setStateFilter] = useState('All');
  const [tierIdx, setTierIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [compareIds, setCompareIds] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState<'name' | 'rate' | 'sat' | 'tuition'>('rate');
  const [sortAsc, setSortAsc] = useState(true);

  const loadData = async () => {
    if (raw) return;
    setLoading(true);
    const res = await fetch('/data/collegesdata.json');
    const json = await res.json();
    setRaw(json);
    setLoading(false);
  };

  const colleges = useMemo(() => {
    if (!raw) return [];
    return parseData(raw);
  }, [raw]);

  const filtered = useMemo(() => {
    const tier = TIERS[tierIdx];
    return colleges.filter(c => {
      if (stateFilter !== 'All' && c.state !== stateFilter) return false;
      if (c.rate == null) return false;
      if (c.rate * 100 < tier.min || c.rate * 100 >= tier.max) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [colleges, stateFilter, tierIdx, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortBy === 'rate') cmp = (a.rate ?? 1) - (b.rate ?? 1);
      else if (sortBy === 'sat') cmp = (a.sat ?? 0) - (b.sat ?? 0);
      else if (sortBy === 'tuition') cmp = (a.tuitionIn ?? 0) - (b.tuitionIn ?? 0);
      return sortAsc ? cmp : -cmp;
    });
  }, [filtered, sortBy, sortAsc]);

  const toggleCompare = (id: number) => {
    setCompareIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else if (next.size < 6) next.add(id);
      return next;
    });
  };

  const stats = useMemo(() => {
    if (filtered.length === 0) return null;
    const rates = filtered.map(c => c.rate! * 100);
    const sats = filtered.filter(c => c.sat != null).map(c => c.sat!);
    const tuitions = filtered.filter(c => c.tuitionIn != null).map(c => c.tuitionIn!);
    return {
      count: filtered.length,
      avgRate: (rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(1),
      avgSat: sats.length > 0 ? Math.round(sats.reduce((a, b) => a + b, 0) / sats.length) : 'N/A',
      avgTuition: tuitions.length > 0 ? '$' + Math.round(tuitions.reduce((a, b) => a + b, 0) / tuitions.length).toLocaleString() : 'N/A',
    };
  }, [filtered]);

  return (
    <div>
      {!raw && (
        <div style={{ textAlign: 'center', margin: '40px 0' }}>
          <button
            onClick={loadData}
            className="btn btn-primary"
            disabled={loading}
            style={{ fontSize: 16, padding: '14px 32px' }}
          >
            {loading ? 'Loading 6,273 colleges...' : 'Explore the Full Dataset'}
          </button>
          <p className="ag-muted" style={{ fontSize: 13, marginTop: 12 }}>
            Loads instantly in your browser — no data uploaded.
          </p>
        </div>
      )}

      {raw && (
        <>
          {/* Filters */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20,
            padding: '16px 18px', borderRadius: 12, border: '1px solid var(--color-border)',
          }}>
            <input
              type="text"
              placeholder="Search schools..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: '1 1 200px', padding: '8px 12px', borderRadius: 8,
                border: '1px solid var(--color-border)', background: 'transparent',
                color: 'var(--color-foreground)', fontSize: 14,
              }}
            />
            <select
              value={stateFilter}
              onChange={e => setStateFilter(e.target.value)}
              style={{
                padding: '8px 12px', borderRadius: 8, border: '1px solid var(--color-border)',
                background: 'var(--color-surface, #1a1a2e)', color: 'var(--color-foreground)', fontSize: 14,
              }}
            >
              {STATES.map(s => <option key={s} value={s}>{s === 'All' ? 'All States' : s}</option>)}
            </select>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              {TIERS.map((t, i) => (
                <button
                  key={t.label}
                  onClick={() => setTierIdx(i)}
                  style={{
                    padding: '6px 12px', borderRadius: 6, border: '1px solid var(--color-border)',
                    background: i === tierIdx ? 'var(--color-primary)' : 'transparent',
                    color: i === tierIdx ? '#fff' : 'var(--color-foreground)',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          {stats && (
            <div style={{
              display: 'flex', gap: 24, marginBottom: 20, fontSize: 14, flexWrap: 'wrap',
            }}>
              <span><strong>{stats.count.toLocaleString()}</strong> schools</span>
              <span>Avg rate: <strong>{stats.avgRate}%</strong></span>
              <span>Avg SAT: <strong>{stats.avgSat}</strong></span>
              <span>Avg tuition: <strong>{stats.avgTuition}</strong></span>
              <span>Comparing: <strong>{compareIds.size}</strong>/6</span>
            </div>
          )}

          {/* Scatter plot */}
          <div style={{ marginBottom: 32 }}>
            <h3 className="tp-h3" style={{ marginBottom: 12 }}>Acceptance Rate vs SAT Score</h3>
            <ScatterPlot data={filtered} compareIds={compareIds} />
            <p className="ag-muted" style={{ fontSize: 12, marginTop: 8 }}>
              Purple = public, Green = private. Click schools below to highlight (max 6).
            </p>
          </div>

          {/* Data table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-border)' }}>
                  <th style={{ padding: '10px 6px', width: 36 }}></th>
                  {[
                    { key: 'name', label: 'School' },
                    { key: 'rate', label: 'Rate' },
                    { key: 'sat', label: 'SAT' },
                    { key: 'tuition', label: 'Tuition (In-State)' },
                  ].map(col => (
                    <th
                      key={col.key}
                      onClick={() => { setSortBy(col.key as typeof sortBy); setSortAsc(sortBy === col.key ? !sortAsc : true); }}
                      style={{ padding: '10px 6px', cursor: 'pointer', color: 'var(--color-foreground)' }}
                    >
                      {col.label} {sortBy === col.key ? (sortAsc ? '↑' : '↓') : ''}
                    </th>
                  ))}
                  <th style={{ padding: '10px 6px' }}>State</th>
                  <th style={{ padding: '10px 6px' }}>Type</th>
                </tr>
              </thead>
              <tbody>
                {sorted.slice(0, 200).map(c => (
                  <tr
                    key={c.id}
                    style={{
                      borderBottom: '1px solid var(--color-border)',
                      background: compareIds.has(c.id) ? 'rgba(239,68,68,0.08)' : undefined,
                    }}
                  >
                    <td style={{ padding: '8px 6px' }}>
                      <button
                        onClick={() => toggleCompare(c.id)}
                        style={{
                          width: 22, height: 22, borderRadius: 4, border: '1px solid var(--color-border)',
                          background: compareIds.has(c.id) ? '#ef4444' : 'transparent',
                          color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 700,
                        }}
                      >
                        {compareIds.has(c.id) ? '✓' : '+'}
                      </button>
                    </td>
                    <td style={{ padding: '8px 6px', fontWeight: 500 }}>{c.name}</td>
                    <td style={{ padding: '8px 6px', color: 'var(--color-primary)', fontWeight: 600 }}>
                      {(c.rate! * 100).toFixed(1)}%
                    </td>
                    <td style={{ padding: '8px 6px' }}>{c.sat ?? 'N/A'}</td>
                    <td style={{ padding: '8px 6px' }}>
                      {c.tuitionIn != null ? '$' + c.tuitionIn.toLocaleString() : 'N/A'}
                    </td>
                    <td style={{ padding: '8px 6px' }}>{c.state}</td>
                    <td style={{ padding: '8px 6px' }}>{c.ownership === 1 ? 'Public' : 'Private'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {sorted.length > 200 && (
              <p className="ag-muted" style={{ fontSize: 13, marginTop: 12, textAlign: 'center' }}>
                Showing 200 of {sorted.length.toLocaleString()} schools. Narrow your filters to see more.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

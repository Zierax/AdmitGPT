"use client";

import { UserProfile, UserEC, ActivityCategory, ECTier } from "@/lib/types";
import { Zap, X, Plus } from "lucide-react";

export function Step3Extracurriculars({
  profile,
  setProfile,
}: {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}) {
  const addEC = () => {
    if (profile.extracurriculars.length >= 10) return;
    setProfile({
      ...profile,
      extracurriculars: [...profile.extracurriculars, {
        title: "",
        description: "",
        tier: 3,
        category: 'Other' as ActivityCategory,
        tierLevel: 'Local' as const,
        externalValidation: 'Self_Reported' as const,
        rarity: 'Common' as const,
        institutionalStrength: 'Standard' as const,
        cognitiveLoad: 'Medium' as const,
        confidence: 100
      }],
    });
  };

  const removeEC = (index: number) => {
    setProfile({
      ...profile,
      extracurriculars: profile.extracurriculars.filter((_, i) => i !== index),
    });
  };

  const updateEC = (index: number, updates: Partial<UserEC>) => {
    setProfile({
      ...profile,
      extracurriculars: profile.extracurriculars.map((ec, i) => (i === index ? { ...ec, ...updates } : ec)),
    });
  };

  return (
    <div className="space-y-4">
      {/* Tier Guide */}
      <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] font-sans">
        <p className="text-xs font-bold mb-3 text-[var(--color-primary)] uppercase tracking-wider">Activity Tier Classifications:</p>
        <p className="text-[10px] text-[var(--color-muted)] mb-4 leading-relaxed">
          Tiers reflect the <span className="text-[var(--color-foreground)]">scope, selectivity, and impact</span> of each activity. Self-classification is verified against our dataset&apos;s tier distribution. Overrating will skew your results and hurt accuracy.
        </p>
        <div className="space-y-3 text-xs text-[var(--color-muted)]">
          <div className="p-2 rounded border-2 border-[var(--color-border)] bg-[var(--color-surface)]">
            <p className="mb-1"><span className="tier-badge tier-gm border-[var(--color-accent)] !text-[var(--color-accent)]">GAME MAKER</span> <span className="text-[var(--color-accent)] font-bold">Global icon-level</span> — Reshapes an industry or culture.</p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-accent)] ml-1">Examples: TIME 100 Most Influential, Forbes 30 Under 30, Olympic Medal, Fields Medal, Nobel Prize, founded a company valued $10M+, ISEF Grand Award Winner.</p>
          </div>
          <div className="p-2 rounded border-2 border-[var(--color-border)] bg-[var(--color-surface)]">
            <p className="mb-1"><span className="tier-badge tier-0">OUTLIER</span> <span className="text-[var(--color-primary)] font-bold">World-class</span> — Top 0.1% of peers globally in a domain.</p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-primary)] ml-1">Examples: Published in Nature/IEEE/Science, Defcon/Black Hat speaker, CVE-assigned vulnerability discoverer, International Math/Science Olympiad Gold, ISEF Finalist, patent holder, YC-backed startup founder.</p>
          </div>
          <div className="p-2 rounded border-2 border-[var(--color-border)] bg-[var(--color-surface)]">
            <p className="mb-1"><span className="tier-badge tier-1">TIER 1</span> <span className="text-[var(--color-info)] font-bold">National recognition</span> — Top 1-5% nationally in a domain.</p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-info)] ml-1">Examples: USAMO/USACO Platinum qualifier, national debate champion, RSI/MITES/SSP attendee, founded nonprofit with $10k+ revenue or 1000+ beneficiaries, Congressional Award Gold Medal, published in a peer-reviewed journal.</p>
          </div>
          <div className="p-2 rounded border-2 border-[var(--color-border)] bg-[var(--color-surface)]">
            <p className="mb-1"><span className="tier-badge tier-2">TIER 2</span> <span className="text-[var(--color-warning)] font-bold">State/Regional impact</span> — Significant leadership or recognition beyond school.</p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-warning)] ml-1">Examples: State science fair winner, All-State athlete, Student Body President, Varsity Team Captain (competitive league), summer internship at recognized company, regional orchestra first chair, Model UN Best Delegate at major conference.</p>
          </div>
          <div className="p-2 rounded border-2 border-[var(--color-border)] bg-[var(--color-surface)]">
            <p className="mb-1"><span className="tier-badge tier-3">TIER 3</span> <span className="text-[var(--color-muted)] font-bold">School-level / Participation</span> — Active involvement without external recognition.</p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-border)] ml-1">Examples: School club member/officer, local community volunteer (under 100 hours), JV athlete, personal coding projects (no users/traction), church youth group, part-time job, school newspaper contributor.</p>
          </div>
        </div>
      </div>

      {/* Activity Cards */}
      {profile.extracurriculars.map((ec, i) => (
        <div key={i} className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] animate-slide-in relative group" style={{ animationDelay: `${i * 50}ms` }}>
          <div className="flex items-start gap-3">
            <div className="flex-1 space-y-3">
              <input
                type="text"
                className="ag-input"
                placeholder="Activity title (e.g., Speaker at Black Hat 2025)"
                value={ec.title}
                onChange={(e) => updateEC(i, { title: e.target.value })}
              />
              <input
                type="text"
                className="ag-input"
                placeholder="Brief description (metrics, impact, stack)"
                value={ec.description}
                onChange={(e) => updateEC(i, { description: e.target.value })}
              />
              <div className="flex flex-wrap gap-2">
                {([-1, 0, 1, 2, 3] as ECTier[]).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => updateEC(i, { tier })}
                    className={`tier-badge cursor-pointer transition-all ${ec.tier === tier ? `tier-${tier}` : "opacity-40 hover:opacity-100 grayscale hover:grayscale-0"
                      }`}
                  >
                    {tier === -1 ? "GM" : tier === 0 ? "Outlier" : `Tier ${tier}`}
                  </button>
                ))}
              </div>

              {/* Rubric Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                <div>
                  <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Category</label>
                  <select
                    className="ag-input !py-1 !text-xs"
                    value={ec.category}
                    onChange={(e) => updateEC(i, { category: e.target.value as ActivityCategory })}
                  >
                    <option value="STEM">STEM</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Arts">Arts</option>
                    <option value="Sports">Sports</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Service">Service</option>
                    <option value="Business">Business</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Scope (Tier Level)</label>
                  <select
                    className="ag-input !py-1 !text-xs"
                    value={ec.tierLevel}
                    onChange={(e) => updateEC(i, { tierLevel: e.target.value as any })}
                  >
                    <option value="Local">Local (1x)</option>
                    <option value="National">National (3x)</option>
                    <option value="International">International (5x)</option>
                    <option value="Global_Elite">Global Elite (8x)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Validation</label>
                  <select
                    className="ag-input !py-1 !text-xs"
                    value={ec.externalValidation}
                    onChange={(e) => updateEC(i, { externalValidation: e.target.value as any })}
                  >
                    <option value="Self_Reported">Self-Reported (0.6x)</option>
                    <option value="Peer_Vouched">Peer-Vouched (0.75x)</option>
                    <option value="Institutional">Institutional (0.9x)</option>
                    <option value="Professional_Audit">Professional Audit (1x)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Rarity</label>
                  <select
                    className="ag-input !py-1 !text-xs"
                    value={ec.rarity}
                    onChange={(e) => updateEC(i, { rarity: e.target.value as any })}
                  >
                    <option value="Common">Common</option>
                    <option value="Rare">Rare (&lt;10%)</option>
                    <option value="Ultra_Rare">Ultra-Rare (&lt;1%)</option>
                    <option value="Unique">Unique (0.01%)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                <div className="col-span-1">
                  <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Inst. Strength</label>
                  <select
                    className="ag-input !py-1 !text-xs"
                    value={ec.institutionalStrength}
                    onChange={(e) => updateEC(i, { institutionalStrength: e.target.value as any })}
                  >
                    <option value="Standard">Standard</option>
                    <option value="Recognized">Recognized</option>
                    <option value="Prestigious">Prestigious</option>
                    <option value="World_Class">World-Class</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Cognitive Load</label>
                  <select
                    className="ag-input !py-1 !text-xs"
                    value={ec.cognitiveLoad}
                    onChange={(e) => updateEC(i, { cognitiveLoad: e.target.value as any })}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Research_Level">Research-Level</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block">Confidence</label>
                    <span className="text-[10px] font-sans text-[var(--color-primary)] font-bold">{ec.confidence}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    className="w-full h-1 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                    value={ec.confidence}
                    onChange={(e) => updateEC(i, { confidence: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              {/* Verification Tooltips */}
              {ec.tier === -1 && (
                <div className="p-3 mt-2 border-l-2 border-[var(--color-accent)] bg-[var(--color-accent-tint)] text-[10px] text-[var(--color-accent)] font-sans animate-slide-in">
                  <div className="flex items-center gap-1 font-bold mb-1 uppercase">
                    <Zap size={12} /> HIGH_IMPACT_REPORT
                  </div>
                  "Game Maker" status forces a logic short-circuit. Academic metrics will be treated as secondary sanity checks. Ensure this is a globally recognized achievement (e.g., TIME 100, Olympic Medal).
                </div>
              )}
              {ec.tier === 0 && (
                <div className="p-3 mt-2 border-l-2 border-[var(--color-primary)] bg-[var(--color-primary-tint)] text-[10px] text-[var(--color-primary)] font-sans animate-slide-in">
                  <div className="flex items-center gap-1 font-bold mb-1 uppercase">
                    <Zap size={12} /> Elite Differentiation Active
                  </div>
                  "Game Changer" status detected. This entry will override low academic stats (up to 40% weight reduction) if substantiated. Ensure this is a world-class achievement.
                </div>
              )}
              {ec.tier === 1 && (
                <div className="p-2 mt-2 border-l-2 border-[var(--color-info)] bg-[rgba(59,130,246,0.05)] text-[10px] text-[var(--color-info)] font-sans animate-slide-in">
                  National/International recognition required. (e.g., USACO Platinum, ISEF Finalist).
                </div>
              )}
            </div>
            <button onClick={() => removeEC(i)} className="text-[var(--color-muted)] hover:text-[var(--color-danger)] transition-colors p-1">
              <X size={16} />
            </button>
          </div>
        </div>
      ))}

      {profile.extracurriculars.length < 10 && (
        <button onClick={addEC} className="btn-zine secondary w-full border-dashed border-2">
          <Plus size={16} /> Add Activity ({profile.extracurriculars.length}/10)
        </button>
      )}
    </div>
  );
}

"use client";

import { UserProfile, UserAward, ActivityCategory, ECTier } from "@/lib/types";
import { X, Plus, Zap } from "lucide-react";

export function Step4Awards({
  profile,
  setProfile,
}: {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}) {
  const addAward = () => {
    setProfile({
      ...profile,
      awards: [...profile.awards, {
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

  const removeAward = (index: number) => {
    setProfile({
      ...profile,
      awards: profile.awards.filter((_, i) => i !== index),
    });
  };

  const updateAward = (index: number, updates: Partial<UserAward>) => {
    setProfile({
      ...profile,
      awards: profile.awards.map((a, i) => (i === index ? { ...a, ...updates } : a)),
    });
  };

  return (
    <div className="space-y-6">
      {/* Award Tier Guide */}
      <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] font-sans">
        <p className="text-xs font-bold mb-3 text-[var(--color-primary)] uppercase tracking-wider">Award Tier Classifications:</p>
        <p className="text-[10px] text-[var(--color-muted)] mb-4 leading-relaxed">
          Awards measure <span className="text-[var(--color-foreground)]">external recognition and validation</span> of your achievements. Unlike activities (which measure what you <em>do</em>), awards measure how the <em>world</em> responded. Be honest — inflated tiers reduce model accuracy.
        </p>
        <div className="space-y-3 text-xs text-[var(--color-muted)]">
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-gm border-[var(--color-accent)] !text-[var(--color-accent)]">GAME MAKER</span> <span className="text-[var(--color-accent)] font-bold">Once-in-a-generation</span></p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-accent)] ml-1">Examples: Nobel Prize, Fields Medal, Pulitzer Prize, Olympic Gold, MacArthur Fellowship, ISEF Gordon E. Moore Award ($75k grand prize).</p>
          </div>
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-0">OUTLIER</span> <span className="text-[var(--color-primary)] font-bold">International elite</span></p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-primary)] ml-1">Examples: International Olympiad Gold/Silver (IMO, IPhO, IOI), ISEF Top 3 Category, Regeneron STS Top 10, Intel ISEF Best of Category, Davidson Fellow, Presidential Scholar.</p>
          </div>
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-1">TIER 1</span> <span className="text-[var(--color-info)] font-bold">National recognition</span></p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-info)] ml-1">Examples: USAMO Qualifier, National Merit Finalist, Regeneron STS Semifinalist, US Presidential Scholars nominee, National AP Scholar, Scholastic Art & Writing Gold Key (National), USABO/USACO Gold.</p>
          </div>
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-2">TIER 2</span> <span className="text-[var(--color-warning)] font-bold">State/Regional recognition</span></p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-warning)] ml-1">Examples: AMC 10/12 Honor Roll, State Science Fair Top 3, AP Scholar with Distinction, Regional Scholastic Art Award, All-State Band/Orchestra, State Math League champion, Eagle Scout/Gold Award.</p>
          </div>
          <div className="p-2 rounded border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]">
            <p className="mb-1"><span className="tier-badge tier-3">TIER 3</span> <span className="text-[var(--color-muted)] font-bold">School/Local recognition</span></p>
            <p className="text-[10px] pl-2 border-l border-[var(--color-border)] ml-1">Examples: Honor Roll, AP Scholar (base level), School subject award, Local essay contest winner, Principal's Award, School MVP, Certificate of Achievement.</p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg border border-[var(--color-primary)] bg-[var(--color-primary-glow)]">
        <p className="text-sm font-bold text-[var(--color-primary)] mb-1">Quality over Quantity</p>
        <p className="text-xs text-[var(--color-muted)]">
          While you can add unlimited awards, the algorithm values impact. We recommend focusing on your <span className="text-[var(--color-foreground)] font-medium">top 5 to 10</span> most significant achievements. Adding many Tier 3 awards does not significantly improve your profile score.
        </p>
      </div>

      <div className="space-y-4">
        {profile.awards.map((award, i) => (
          <div key={i} className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] animate-slide-in relative group">
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-3">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Award name (e.g., USAMO Qualifier, Regeneron STS Semifinalist)"
                  value={award.title}
                  onChange={(e) => updateAward(i, { title: e.target.value })}
                />
                <input
                  type="text"
                  className="input-field"
                  placeholder="Brief description (metrics, impact, context)"
                  value={award.description}
                  onChange={(e) => updateAward(i, { description: e.target.value })}
                />
                <div className="flex flex-wrap gap-2">
                  {([-1, 0, 1, 2, 3] as ECTier[]).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => updateAward(i, { tier })}
                      className={`tier-badge cursor-pointer transition-all ${award.tier === tier ? `tier-${tier}` : "opacity-40 hover:opacity-100 grayscale hover:grayscale-0"
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
                      className="input-field !py-1 !text-xs"
                      value={award.category}
                      onChange={(e) => updateAward(i, { category: e.target.value as ActivityCategory })}
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
                    <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-widest block mb-1">Scope</label>
                    <select
                      className="input-field !py-1 !text-xs"
                      value={award.tierLevel}
                      onChange={(e) => updateAward(i, { tierLevel: e.target.value as any })}
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
                      className="input-field !py-1 !text-xs"
                      value={award.externalValidation}
                      onChange={(e) => updateAward(i, { externalValidation: e.target.value as any })}
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
                      className="input-field !py-1 !text-xs"
                      value={award.rarity}
                      onChange={(e) => updateAward(i, { rarity: e.target.value as any })}
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
                      className="input-field !py-1 !text-xs"
                      value={award.institutionalStrength}
                      onChange={(e) => updateAward(i, { institutionalStrength: e.target.value as any })}
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
                      className="input-field !py-1 !text-xs"
                      value={award.cognitiveLoad}
                      onChange={(e) => updateAward(i, { cognitiveLoad: e.target.value as any })}
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
                      <span className="text-[10px] font-sans font-bold text-[var(--color-primary)]">{award.confidence}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      className="w-full h-1 bg-[var(--color-border)] rounded-lg appearance-none cursor-pointer accent-[var(--color-primary)]"
                      value={award.confidence}
                      onChange={(e) => updateAward(i, { confidence: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                {award.tier === -1 && (
                  <div className="p-3 mt-2 border-l-2 border-[var(--color-accent)] bg-[rgba(255,255,255,0.05)] text-[10px] text-[var(--color-accent)] font-sans animate-slide-in">
                    <div className="flex items-center gap-1 font-bold mb-1 uppercase">
                      <Zap size={12} /> HIGH_IMPACT_REPORT — GAME MAKER AWARD
                    </div>
                    This award classification forces a heavy spike modifier. Only select this for once-in-a-generation honors (Nobel, Olympic Gold).
                  </div>
                )}
              </div>
              <button onClick={() => removeAward(i)} className="text-[var(--color-muted)] hover:text-[var(--color-danger)] transition-colors p-1">
                <X size={16} />
              </button>
            </div>
          </div>
        ))}

        <button onClick={addAward} className="btn-secondary w-full border-dashed border-2 hover:border-[var(--color-primary)]">
          <Plus size={16} /> Add Award ({profile.awards.length})
        </button>
      </div>

      <div className="pt-6 border-t border-[var(--color-border)]">
        <label className="block text-sm font-bold mb-2 flex items-center gap-2">
          Personal Essay <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-[var(--color-border)] text-[var(--color-muted)] uppercase tracking-wider">Holistic Context</span>
        </label>
        <p className="text-xs text-[var(--color-muted)] mb-3">
          The mathematical engine does not analyze text. This content is for the <span className="text-[var(--color-foreground)] font-medium">holistic report</span> used by the AI/PDF generation to provide qualitative feedback.
        </p>
        <textarea
          className="input-field min-h-[150px] resize-none font-sans text-sm leading-relaxed"
          placeholder="Paste your Common App essay or a summary here..."
          value={profile.essay || ""}
          onChange={(e) => setProfile({ ...profile, essay: e.target.value })}
        />
      </div>
    </div>
  );
}

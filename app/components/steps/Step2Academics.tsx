"use client";

import { UserProfile } from "@/lib/types";

export function Step2Academics({
  profile,
  setProfile,
}: {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">SAT Score</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g., 1450"
            min={400}
            max={1600}
            value={profile.sat ?? ""}
            onChange={(e) => setProfile({ ...profile, sat: e.target.value ? parseInt(e.target.value) : null })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">ACT Score</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g., 32"
            min={1}
            max={36}
            value={profile.act ?? ""}
            onChange={(e) => setProfile({ ...profile, act: e.target.value ? parseInt(e.target.value) : null })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Unweighted GPA</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g., 3.85"
            min={0}
            max={4}
            step={0.01}
            value={profile.unweightedGPA ?? ""}
            onChange={(e) => setProfile({ ...profile, unweightedGPA: e.target.value ? parseFloat(e.target.value) : null })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Weighted GPA (optional)</label>
          <input
            type="number"
            className="input-field"
            placeholder="e.g., 4.6"
            min={0}
            max={5.5}
            step={0.01}
            value={profile.weightedGPA ?? ""}
            onChange={(e) => setProfile({ ...profile, weightedGPA: e.target.value ? parseFloat(e.target.value) : null })}
          />
        </div>
      </div>

      {profile.schoolSystem !== 'National_Non_Standard' ? (
        <div className="grid grid-cols-3 gap-4 border border-white/5 p-5 rounded-2xl bg-white/5">
          <div>
            <label className="block text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-widest mb-2">AP Courses</label>
            <input
              type="number"
              className="input-field !py-3"
              placeholder="0"
              min={0}
              max={20}
              value={profile.numberOfAPCourses || ""}
              onChange={(e) => setProfile({ ...profile, numberOfAPCourses: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-widest mb-2">IB Courses</label>
            <input
              type="number"
              className="input-field !py-3"
              placeholder="0"
              min={0}
              max={20}
              value={profile.numberOfIBCourses || ""}
              onChange={(e) => setProfile({ ...profile, numberOfIBCourses: parseInt(e.target.value) || 0 })}
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-widest mb-2">Honors</label>
            <input
              type="number"
              className="input-field !py-3"
              placeholder="0"
              min={0}
              max={30}
              value={profile.numberOfHonorsCourses || ""}
              onChange={(e) => setProfile({ ...profile, numberOfHonorsCourses: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 border border-[var(--color-primary)] border-opacity-30 p-4 rounded bg-[rgba(191,255,0,0.05)]">
          <div className="text-[11px] text-[var(--color-primary)] font-sans uppercase tracking-wider mb-2 font-bold">
            Non-Standard International Curriculum (Egypt STEM / Similar)
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Advanced Curriculum / Honors subjects</label>
            <input
              type="number"
              className="input-field"
              placeholder="Total advanced subjects taken"
              min={0}
              max={30}
              value={profile.numberOfHonorsCourses || ""}
              onChange={(e) => setProfile({ ...profile, numberOfAPCourses: 0, numberOfIBCourses: 0, numberOfHonorsCourses: parseInt(e.target.value) || 0 })}
            />
          </div>
          <p className="text-xs text-[var(--color-muted)] mt-1">
            AP & IB metrics are statically disabled for your designated school system. Your academic weight relies solely on standardized testing and your unweighted cumulative average.
          </p>
        </div>
      )}

      <div className="p-3 rounded-lg bg-[var(--color-primary-glow)] border border-[var(--color-primary)] border-opacity-20">
        <p className="text-xs text-[var(--color-muted)]">
          <strong className="text-[var(--color-primary)]">Note:</strong> If you have both SAT and ACT, we&apos;ll use the higher equivalent score.
          ACT is converted to SAT using the College Board concordance table.
        </p>
      </div>
    </div>
  );
}

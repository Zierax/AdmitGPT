"use client";

import { UserProfile } from "@/lib/types";
import { classifyMajor, getMajorCategoryLabel } from "@/lib/dataLoader";

export function Step1Demographics({
  profile,
  setProfile,
}: {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}) {
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-2">Student Name (For Certificate)</label>
        <input
          type="text"
          className="ag-input"
          placeholder="Enter your full name"
          value={profile.name || ""}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Are you an international applicant?</label>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setProfile({ ...profile, isInternational: false })}
            className={`flex-1 py-3.5 rounded-xl border text-sm font-bold transition-all ${!profile.isInternational
              ? "border-[var(--color-primary)] bg-[var(--color-primary-faint)] text-[var(--color-primary)]"
                : "border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:border-[var(--color-primary)]"
                }`}
            >
              US / Permanent Resident
          </button>
          <button
            onClick={() => setProfile({ ...profile, isInternational: true })}
            className={`flex-1 py-3.5 rounded-xl border text-sm font-bold transition-all ${profile.isInternational
              ? "border-[var(--color-primary)] bg-[var(--color-primary-faint)] text-[var(--color-primary)]"
                : "border-2 border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] hover:border-[var(--color-primary)]"
                }`}
            >
              International Applicant
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">School System</label>
          <select
            className="ag-input"
            value={profile.schoolSystem}
            onChange={(e) => setProfile({ ...profile, schoolSystem: e.target.value as any })}
          >
            <option value="US_Standard">US Standard (GPA/AP/IB)</option>
            <option value="Intl_Standard">International (A-Levels/IB/Etc)</option>
            <option value="National_Non_Standard">National/Non-Standard (e.g., Egypt STEM)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Intended Major</label>
          <input
            type="text"
            className="ag-input"
            placeholder="e.g., Computer Science"
            value={profile.intendedMajor}
            onChange={(e) => {
              const major = e.target.value;
              setProfile({ ...profile, intendedMajor: major, majorCategory: classifyMajor(major) });
            }}
          />
        </div>
      </div>

      {profile.intendedMajor && (
        <p className="text-xs text-[var(--color-muted)] mt-1.5">
          Category: <span className="text-[var(--color-primary)] font-medium">{getMajorCategoryLabel(profile.majorCategory)}</span>
        </p>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">Gender</label>
        <select
          className="ag-input"
          value={profile.gender}
          onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
        >
          <option value="">Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Non-binary">Non-binary</option>
          <option value="Prefer not to say">Prefer not to say</option>
        </select>
      </div>

      {!profile.isInternational && (
        <div>
          <label className="block text-sm font-medium mb-2">State of Residence</label>
          <input
            type="text"
            className="ag-input"
            placeholder="e.g., California, New York"
            value={profile.state}
            onChange={(e) => setProfile({ ...profile, state: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}

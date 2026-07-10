"use client";

import { UserProfile } from "@/lib/types";
import { Search, X } from "lucide-react";

const importantSchools = [
  "Harvard University",
  "Stanford University",
  "Massachusetts Institute of Technology",
  "Yale University",
  "Princeton University",
  "University of Pennsylvania",
  "Columbia University",
  "Brown University",
  "Dartmouth College",
  "Cornell University"
];

export function Step5Schools({
  profile,
  setProfile,
  collegeNames,
  schoolSearch,
  setSchoolSearch,
  showSchoolDropdown,
  setShowSchoolDropdown,
}: {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  collegeNames: string[];
  schoolSearch: string;
  setSchoolSearch: (s: string) => void;
  showSchoolDropdown: boolean;
  setShowSchoolDropdown: (s: boolean) => void;
}) {
  const filtered = schoolSearch.length >= 2
    ? collegeNames.filter(
      (name) =>
        name.toLowerCase().includes(schoolSearch.toLowerCase()) &&
        !profile.targetSchools.includes(name)
    ).slice(0, 8)
    : [];

  const addSchool = (name: string) => {
    if (!profile.targetSchools.includes(name)) {
      setProfile({ ...profile, targetSchools: [...profile.targetSchools, name] });
    }
    setSchoolSearch("");
    setShowSchoolDropdown(false);
  };

  const removeSchool = (name: string) => {
    // Prevent removing important schools
    if (importantSchools.includes(name)) {
      alert(`${name} is an important reference school and cannot be removed. This helps ensure accurate analysis.`);
      return;
    }
    setProfile({ ...profile, targetSchools: profile.targetSchools.filter((s) => s !== name) });
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]" />
          <input
            type="text"
            className="input-field pl-9"
            placeholder="Search for a college..."
            value={schoolSearch}
            onChange={(e) => {
              setSchoolSearch(e.target.value);
              setShowSchoolDropdown(true);
            }}
            onFocus={() => setShowSchoolDropdown(true)}
          />
        </div>
        {showSchoolDropdown && filtered.length > 0 && (
          <div className="absolute z-50 w-full mt-1 py-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-xl max-h-48 overflow-y-auto">
            {filtered.map((name) => (
              <button
                key={name}
                onClick={() => addSchool(name)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-card-hover)] transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Selected schools */}
      {profile.targetSchools.length > 0 && (
        <div className="space-y-2">
          {profile.targetSchools.map((school) => {
            const isImportant = importantSchools.includes(school);
            return (
              <div
                key={school}
                className={`flex items-center justify-between p-3 rounded-lg border bg-[var(--color-card)] animate-slide-in ${isImportant
                  ? 'border-[var(--color-primary)] bg-opacity-10'
                  : 'border-[var(--color-border)]'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{school}</span>
                  {isImportant && (
                    <span className="text-xs px-2 py-1 bg-[var(--color-primary)] text-black font-bold rounded">
                      REFERENCE
                    </span>
                  )}
                </div>
                <button
                  onClick={() => removeSchool(school)}
                  className={`transition-colors ${isImportant
                    ? 'text-[var(--color-muted)] cursor-not-allowed opacity-50'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-danger)]'
                    }`}
                  disabled={isImportant}
                  title={isImportant ? "Important reference school - cannot be removed" : "Remove school"}
                >
                  <X size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {profile.targetSchools.length === 0 && (
        <p className="text-sm text-[var(--color-muted)] text-center py-4">
          Search and select at least one school to analyze.
        </p>
      )}
    </div>
  );
}

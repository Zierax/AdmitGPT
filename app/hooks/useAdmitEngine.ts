"use client";

import { useState, useEffect, useCallback } from "react";
import {
  UserProfile,
  StudentProfile,
  CollegeData,
  DatasetStats,
  EngineResult,
  GapAnalysis,
  PortfolioResult,
  SuggestionResults,
  AIConfig,
  AIAnalysis,
} from "@/lib/types";
import {
  loadStudentsData,
  loadCollegesData,
  computeDatasetStats,
  getCollegeNames,
  findCollege,
} from "@/lib/dataLoader";
import {
  runEngine,
  calculatePortfolioChance,
  suggestUniversities,
} from "@/lib/engine";
import { analyzeGaps } from "@/lib/gapAnalyzer";
import {
  runAIAnalysis,
  saveAPIKey,
  getAPIKey,
} from "@/lib/aiEngine";

export const initialState: UserProfile = {
  name: "",
  isInternational: false,
  schoolSystem: 'US_Standard',
  intendedMajor: "Undecided",
  majorCategory: "Other",
  numberOfAPCourses: 0,
  numberOfIBCourses: 0,
  numberOfHonorsCourses: 0,
  extracurriculars: [],
  awards: [],
  sat: null,
  act: null,
  preferredTestType: 'None',
  unweightedGPA: 3.5,
  weightedGPA: null,
  state: "",
  gender: "",
  targetColleges: [],
  targetSchools: [],
  github: "",
  instagram: "",
  linkedin: "",
};

export function useAdmitEngine() {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [colleges, setColleges] = useState<CollegeData[]>([]);
  const [stats, setStats] = useState<DatasetStats | null>(null);
  const [collegeNames, setCollegeNames] = useState<string[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");

  const [profile, setProfile] = useState<UserProfile>(initialState);
  const [engineResults, setEngineResults] = useState<EngineResult[]>([]);
  const [gapAnalyses, setGapAnalyses] = useState<GapAnalysis[]>([]);
  const [portfolioResult, setPortfolioResult] = useState<PortfolioResult | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestionResults | null>(null);

  const [aiEnabled, setAiEnabled] = useState(false);
  const [aiConfig, setAiConfig] = useState<AIConfig>({
    provider: "gemini",
    apiKey: "",
    model: "gemini-2.5-flash",
  });
  const [aiResults, setAiResults] = useState<AIAnalysis[]>([]);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoadingMessage("Loading student profiles (5MB)...");
        const s = await loadStudentsData();
        setStudents(s);

        setLoadingMessage("Loading college data...");
        const c = await loadCollegesData();
        setColleges(c);

        setLoadingMessage("Computing dataset statistics...");
        const st = computeDatasetStats(s);
        setStats(st);
        setCollegeNames(getCollegeNames(c));

        setIsDataLoaded(true);
        setLoadingMessage("");
      } catch (err) {
        console.error("Failed to load data:", err);
        setLoadingMessage("Failed to load data. Please refresh.");
      }
    }
    load();
  }, []);

  useEffect(() => {
    const savedKey = getAPIKey(aiConfig.provider);
    if (savedKey) {
      setAiConfig((prev) => ({ ...prev, apiKey: savedKey }));
    }
  }, [aiConfig.provider]);

  const runAnalysis = useCallback(async () => {
    if (!stats) return;

    setLoadingMessage("Running mathematical engine...");

    // Small delay for UX
    await new Promise((r) => setTimeout(r, 500));

    const results = await runEngine(profile, students, colleges, stats);
    setEngineResults(results);

    setLoadingMessage("Calculating portfolio probability...");
    const portfolio = calculatePortfolioChance(results);
    setPortfolioResult(portfolio);

    setLoadingMessage("Finding university suggestions...");
    const sugs = suggestUniversities(profile, colleges, students, stats);
    setSuggestions(sugs);

    setLoadingMessage("Analyzing gaps...");
    await new Promise((r) => setTimeout(r, 300));

    const gaps: GapAnalysis[] = [];
    for (const result of results.slice(0, 5)) {
      const college = findCollege(colleges, result.schoolName);
      if (college) {
        const gap = analyzeGaps(profile, result.schoolName, college, students, stats, result);
        gaps.push(gap);
      }
    }
    setGapAnalyses(gaps);

    return { results, portfolio, sugs, gaps };
  }, [profile, students, colleges, stats]);

  const runAI = useCallback(async () => {
    if (!aiConfig.apiKey) return;
    setAiLoading(true);
    try {
      saveAPIKey(aiConfig.provider, aiConfig.apiKey);
      const results = await runAIAnalysis(aiConfig, profile, engineResults, gapAnalyses, []);
      setAiResults(results);
    } catch (err) {
      console.error("AI analysis failed:", err);
      alert("AI analysis failed. Please check your API key and try again.");
    }
    setAiLoading(false);
  }, [aiConfig, profile, engineResults, gapAnalyses]);

  return {
    // data
    students,
    colleges,
    stats,
    collegeNames,
    isDataLoaded,
    loadingMessage,
    setLoadingMessage,
    // profile + results
    profile,
    setProfile,
    engineResults,
    gapAnalyses,
    portfolioResult,
    suggestions,
    // AI
    aiEnabled,
    setAiEnabled,
    aiConfig,
    setAiConfig,
    aiResults,
    aiLoading,
    // actions
    runAnalysis,
    runAI,
  };
}

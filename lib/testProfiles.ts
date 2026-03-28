import { UserProfile } from './types';

export const TEST_PROFILES: Record<string, UserProfile> = {
  "Radical Outlier (Ziad v1)": {
    name: "Ziad Salah",
    isInternational: false,
    schoolSystem: 'US_Standard',
    gender: 'Male',
    state: 'CA',
    intendedMajor: "Computer Engineering",
    majorCategory: "CS",
    sat: 1580,
    act: 35,
    preferredTestType: 'SAT',
    unweightedGPA: 3.95,
    weightedGPA: 4.5,
    numberOfAPCourses: 12,
    numberOfHonorsCourses: 5,
    numberOfIBCourses: 0,
    extracurriculars: [
      {
        title: "Founder of AdmitGPT",
        description: "Built a deterministic admission engine used by 0k students.",
        tier: 0,
        category: "Computer_Science",
        tierLevel: "Global_Elite",
        externalValidation: "Professional_Audit",
        rarity: "Unique",
        institutionalStrength: "World_Class",
        cognitiveLoad: "Research_Level",
        confidence: 100
      },
      {
        title: "AI Research at MIT",
        description: "Published paper on transformer-based admission models.",
        tier: 0,
        category: "STEM_Research",
        tierLevel: "International",
        externalValidation: "Institutional",
        rarity: "Ultra_Rare",
        institutionalStrength: "World_Class",
        cognitiveLoad: "High",
        confidence: 90
      }
    ],
    awards: [
      {
        title: "ISEF 1st Place Global",
        description: "Grand prize in Systems Software category.",
        tier: 0,
        category: "Computer_Science",
        tierLevel: "Global_Elite",
        externalValidation: "Professional_Audit",
        rarity: "Unique",
        institutionalStrength: "World_Class",
        cognitiveLoad: "Research_Level",
        confidence: 100
      }
    ],
    targetSchools: ["Harvard University", "Stanford University", "Massachusetts Institute of Technology"],
    targetColleges: ["Harvard University", "Stanford University", "Massachusetts Institute of Technology"]
  },
  "Standard Strong": {
    name: "Emily Chen",
    isInternational: false,
    schoolSystem: 'US_Standard',
    gender: 'Female',
    state: 'NY',
    intendedMajor: "Biology",
    majorCategory: "STEM",
    sat: 1450,
    act: null,
    preferredTestType: 'SAT',
    unweightedGPA: 3.8,
    weightedGPA: 4.2,
    numberOfAPCourses: 6,
    numberOfHonorsCourses: 8,
    numberOfIBCourses: 0,
    extracurriculars: [
      {
        title: "Varsity Swimming Captain",
        description: "Led team to divisional finals.",
        tier: 2,
        category: "Athletics",
        tierLevel: "National",
        externalValidation: "Institutional",
        rarity: "Rare",
        institutionalStrength: "Standard",
        cognitiveLoad: "Medium",
        confidence: 80
      },
      {
        title: "Hospital Volunteer",
        description: "Assisted nursing staff for 200+ hours.",
        tier: 3,
        category: "Medicine_Health",
        tierLevel: "Local",
        externalValidation: "Peer_Vouched",
        rarity: "Common",
        institutionalStrength: "Standard",
        cognitiveLoad: "Medium",
        confidence: 90
      }
    ],
    awards: [
      {
        title: "National Honor Society",
        description: "Academic excellence and community service.",
        tier: 3,
        category: "Other",
        tierLevel: "Local",
        externalValidation: "Institutional",
        rarity: "Common",
        institutionalStrength: "Standard",
        cognitiveLoad: "Low",
        confidence: 100
      }
    ],
    targetSchools: ["University of Florida", "University of North Carolina at Chapel Hill"],
    targetColleges: ["University of Florida", "University of North Carolina at Chapel Hill"]
  },
  "The Gamble (Low GPA/High SAT)": {
    name: "Alex Rivera",
    isInternational: true,
    schoolSystem: 'Intl_Standard',
    gender: 'Other',
    state: 'External',
    intendedMajor: "Mathematics",
    majorCategory: "STEM",
    sat: 1590,
    act: null,
    preferredTestType: 'SAT',
    unweightedGPA: 3.2,
    weightedGPA: 3.4,
    numberOfAPCourses: 2,
    numberOfHonorsCourses: 0,
    numberOfIBCourses: 8,
    extracurriculars: [
      {
        title: "AIME Qualifier",
        description: "Top 5% of AMC 12 scorers.",
        tier: 1,
        category: "Mathematics",
        tierLevel: "National",
        externalValidation: "Institutional",
        rarity: "Rare",
        institutionalStrength: "Recognized",
        cognitiveLoad: "High",
        confidence: 100
      }
    ],
    awards: [],
    targetSchools: ["University of Chicago", "Georgia Institute of Technology"],
    targetColleges: ["University of Chicago", "Georgia Institute of Technology"]
  },
  "Ziad Salah (Identity v1.0)": {
    name: "Ziad Salah",
    isInternational: true,
    schoolSystem: 'National_Non_Standard', // Egyptian Public School (Thanaweya Amma)
    gender: 'Male',
    state: 'Giza, Egypt',
    intendedMajor: "Computer Science",
    majorCategory: "CS",
    sat: 1300,
    act: null,
    preferredTestType: 'SAT',
    unweightedGPA: 2.9,
    weightedGPA: 2.9,
    numberOfAPCourses: 0,
    numberOfHonorsCourses: 0,
    numberOfIBCourses: 0,
    extracurriculars: [
      {
        title: "Independent Security Researcher",
        description: "HackerOne @0xzyo, Top 9 Egypt, Top 90 Global (VDP). Managed 12+ critical vulnerabilities in fortune 500.",
        tier: 0,
        category: "Computer_Science",
        tierLevel: "Global_Elite",
        externalValidation: "Professional_Audit",
        rarity: "Unique",
        institutionalStrength: "World_Class",
        cognitiveLoad: "Research_Level",
        confidence: 100
      },
      {
        title: "Accepted IEEE Researcher (AIITA 2026)",
        description: "Published PTRR Metacognitive Framework. Active correspondence with Prof. Gajos (Harvard SEAS).",
        tier: 0,
        category: "STEM_Research",
        tierLevel: "International",
        externalValidation: "Professional_Audit",
        rarity: "Ultra_Rare",
        institutionalStrength: "World_Class",
        cognitiveLoad: "Research_Level",
        confidence: 100
      },
      {
        title: "Developer of Planck-99",
        description: "Developed C-kernel malware detector with sub-100ns latency. 98.9% F1 on 8,532 samples.",
        tier: 0,
        category: "Engineering",
        tierLevel: "International",
        externalValidation: "Institutional",
        rarity: "Ultra_Rare",
        institutionalStrength: "Prestigious",
        cognitiveLoad: "Research_Level",
        confidence: 100
      },
      {
        title: "Security Engineering (Taskware Manager)",
        description: "Developed fully offline Linux threat-hunting platform. YARA memory/disk signature matching.",
        tier: 0,
        category: "Computer_Science",
        tierLevel: "National",
        externalValidation: "Institutional",
        rarity: "Rare",
        institutionalStrength: "Recognized",
        cognitiveLoad: "High",
        confidence: 100
      },
      {
        title: "Powerlifting (Independent 12mo Unbroken)",
        description: "200kg Deadlift, 136kg Squat. Progressive overload independently designed & tracked.",
        tier: 2,
        category: "Athletics",
        tierLevel: "National",
        externalValidation: "Self_Reported",
        rarity: "Rare",
        institutionalStrength: "Standard",
        cognitiveLoad: "Medium",
        confidence: 100
      },
      {
        title: "Literary Work - Completed Novels",
        description: "Finished 2 Arabic novels ('Zeus'). paired with original music discography (Zy0x).",
        tier: 1,
        category: "Writing_Journalism",
        tierLevel: "National",
        externalValidation: "Self_Reported",
        rarity: "Rare",
        institutionalStrength: "Standard",
        cognitiveLoad: "High",
        confidence: 100
      }
    ],
    awards: [
      {
        title: "CRTP (Certified Red Team Professional)",
        description: "Industry-standard certification for Active Directory security testing.",
        tier: 0,
        category: "Computer_Science",
        tierLevel: "International",
        externalValidation: "Professional_Audit",
        rarity: "Rare",
        institutionalStrength: "World_Class",
        cognitiveLoad: "High",
        confidence: 100
      },
      {
        title: "EYCC CTF 1st Place (National Winner)",
        description: "Winner of the first high-school-only CTF in Egypt (HackClub).",
        tier: 1,
        category: "Computer_Science",
        tierLevel: "National",
        externalValidation: "Institutional",
        rarity: "Rare",
        institutionalStrength: "Standard",
        cognitiveLoad: "High",
        confidence: 100
      },
      {
        title: "Google Certified Marketing (Age 12)",
        description: "Scored 90% on professional certification at primary school age.",
        tier: 3,
        category: "Business_Entrepreneurship",
        tierLevel: "Local",
        externalValidation: "Professional_Audit",
        rarity: "Common",
        institutionalStrength: "Recognized",
        cognitiveLoad: "Medium",
        confidence: 100
      }
    ],
    targetSchools: ["Harvard University", "Stanford University", "Massachusetts Institute of Technology", "Georgia Institute of Technology", "Princeton University", "California Institute of Technology", "University of California, Berkeley", "Carnegie Mellon University", "Oxford University", "Cornell University"],
    targetColleges: ["Harvard University", "Stanford University", "Massachusetts Institute of Technology", "Georgia Institute of Technology", "Princeton University", "California Institute of Technology", "University of California, Berkeley", "Carnegie Mellon University", "Oxford University", "Cornell University"]
  },
  "The Hustler (Low Income/High Resilience)": {
    name: "Marcus Jordan",
    isInternational: false,
    schoolSystem: 'US_Standard',
    gender: 'Male',
    state: 'PA',
    intendedMajor: "Economics",
    majorCategory: "Business",
    sat: 1390,
    act: null,
    preferredTestType: 'SAT',
    unweightedGPA: 3.5,
    weightedGPA: 3.8,
    numberOfAPCourses: 2,
    numberOfHonorsCourses: 4,
    numberOfIBCourses: 0,
    extracurriculars: [
      {
        title: "Full-Time Warehouse Associate",
        description: "Worked 30+ hrs/week to support family while maintaining Honor Roll.",
        tier: 2,
        category: "Other",
        tierLevel: "Local",
        externalValidation: "Institutional",
        rarity: "Rare",
        institutionalStrength: "Standard",
        cognitiveLoad: "High",
        confidence: 100
      }
    ],
    awards: [],
    targetSchools: ["University of Pennsylvania", "Temple University", "Drexel University", "Villanova University"],
    targetColleges: ["University of Pennsylvania", "Temple University", "Drexel University", "Villanova University"]
  },
  "Artistic Visionary (Creative Spike)": {
    name: "Sofia Rossi",
    isInternational: false,
    schoolSystem: 'US_Standard',
    gender: 'Female',
    state: 'OR',
    intendedMajor: "Animation",
    majorCategory: "Arts",
    sat: 1250,
    act: null,
    preferredTestType: 'SAT',
    unweightedGPA: 3.1,
    weightedGPA: 3.3,
    numberOfAPCourses: 0,
    numberOfHonorsCourses: 3,
    numberOfIBCourses: 0,
    extracurriculars: [
      {
        title: "Global Feature Film Animator",
        description: "Lead animator for independent short film. 5M views on YouTube.",
        tier: 0,
        category: "Arts_Creative",
        tierLevel: "International",
        externalValidation: "Professional_Audit",
        rarity: "Unique",
        institutionalStrength: "Prestigious",
        cognitiveLoad: "Research_Level",
        confidence: 100
      }
    ],
    awards: [
      {
        title: "Scholastic Art Gold Key",
        description: "National recognition for top creative talent.",
        tier: 1,
        category: "Arts_Creative",
        tierLevel: "National",
        externalValidation: "Institutional",
        rarity: "Rare",
        institutionalStrength: "World_Class",
        cognitiveLoad: "High",
        confidence: 100
      }
    ],
    targetSchools: ["Rhode Island School of Design", "California Institute of the Arts", "New York University", "University of Southern California"],
    targetColleges: ["Rhode Island School of Design", "California Institute of the Arts", "New York University", "University of Southern California"]
  },
  "Regular: Mid-Tier Strong": {
    name: "Hannah White",
    isInternational: false,
    schoolSystem: 'US_Standard',
    gender: 'Female',
    state: 'TX',
    intendedMajor: "Psychology",
    majorCategory: "HumSoc",
    sat: 1320,
    act: null,
    preferredTestType: 'SAT',
    unweightedGPA: 3.7,
    weightedGPA: 3.9,
    numberOfAPCourses: 4,
    numberOfHonorsCourses: 6,
    numberOfIBCourses: 0,
    extracurriculars: [
      {
        title: "Yearbook Editor",
        description: "Managed layout and photography for 300-page book.",
        tier: 3,
        category: "Writing_Journalism",
        tierLevel: "Local",
        externalValidation: "Institutional",
        rarity: "Common",
        institutionalStrength: "Standard",
        cognitiveLoad: "Medium",
        confidence: 100
      },
      {
        title: "Key Club Secretary",
        description: "Organized weekly volunteer events.",
        tier: 3,
        category: "Community_Service",
        tierLevel: "Local",
        externalValidation: "Institutional",
        rarity: "Common",
        institutionalStrength: "Standard",
        cognitiveLoad: "Low",
        confidence: 100
      }
    ],
    awards: [],
    targetSchools: ["University of Texas at Austin", "Texas A&M University", "University of Houston"],
    targetColleges: ["University of Texas at Austin", "Texas A&M University", "University of Houston"]
  },
  "Regular: Athlete-Scholar": {
    name: "Tyler Vance",
    isInternational: false,
    schoolSystem: 'US_Standard',
    gender: 'Male',
    state: 'OH',
    intendedMajor: "Finance",
    majorCategory: "Business",
    sat: 1410,
    act: null,
    preferredTestType: 'SAT',
    unweightedGPA: 3.85,
    weightedGPA: 4.1,
    numberOfAPCourses: 7,
    numberOfHonorsCourses: 5,
    numberOfIBCourses: 0,
    extracurriculars: [
      {
        title: "Varsity Lacrosse Captain",
        description: "Three-year starter, led team to state quarters.",
        tier: 2,
        category: "Athletics",
        tierLevel: "National",
        externalValidation: "Institutional",
        rarity: "Rare",
        institutionalStrength: "Standard",
        cognitiveLoad: "Medium",
        confidence: 100
      },
      {
        title: "Investment Club Founder",
        description: "Managed virtual $100k portfolio with 15 members.",
        tier: 3,
        category: "Business_Entrepreneurship",
        tierLevel: "Local",
        externalValidation: "Institutional",
        rarity: "Common",
        institutionalStrength: "Standard",
        cognitiveLoad: "High",
        confidence: 90
      }
    ],
    awards: [
      {
        title: "All-State Academic First Team",
        description: "High academic achievement for student athletes.",
        tier: 2,
        category: "Athletics",
        tierLevel: "National",
        externalValidation: "Institutional",
        rarity: "Rare",
        institutionalStrength: "Standard",
        cognitiveLoad: "Low",
        confidence: 100
      }
    ],
    targetSchools: ["Ohio State University", "Miami University", "University of Michigan"],
    targetColleges: ["Ohio State University", "Miami University", "University of Michigan"]
  },
  "Absolute Phenomenon (The Black Swan)": {
    name: "Leo Sterling",
    isInternational: false,
    schoolSystem: 'US_Standard',
    gender: 'Male',
    state: 'WA',
    intendedMajor: "Theoretical Physics",
    majorCategory: "STEM",
    sat: 1600,
    act: 36,
    preferredTestType: 'SAT',
    unweightedGPA: 4.0,
    weightedGPA: 4.8,
    numberOfAPCourses: 15,
    numberOfHonorsCourses: 10,
    numberOfIBCourses: 0,
    extracurriculars: [
      {
        title: "Discovered New Exoplanet",
        description: "Verified by NASA's TESS mission team.",
        tier: 0,
        category: "STEM_Research",
        tierLevel: "Global_Elite",
        externalValidation: "Professional_Audit",
        rarity: "Unique",
        institutionalStrength: "World_Class",
        cognitiveLoad: "Research_Level",
        confidence: 100
      }
    ],
    awards: [
      {
        title: "Nobel Youth Prize Winner",
        description: "Exceptional contribution to planetary science.",
        tier: 0,
        category: "STEM_Research",
        tierLevel: "Global_Elite",
        externalValidation: "Professional_Audit",
        rarity: "Unique",
        institutionalStrength: "World_Class",
        cognitiveLoad: "Research_Level",
        confidence: 100
      }
    ],
    targetSchools: ["Cornell University", "Princeton University"],
    targetColleges: ["Cornell University", "Princeton University"]
  },
  "Hidden Gem (Low Resource/High Depth)": {
    name: "Sarah Miller",
    isInternational: false,
    schoolSystem: 'US_Standard',
    gender: 'Female',
    state: 'WV', // Rural area implies lower resource
    intendedMajor: "History",
    majorCategory: "HumSoc",
    sat: 1380,
    act: null,
    preferredTestType: 'SAT',
    unweightedGPA: 3.9,
    weightedGPA: 4.0,
    numberOfAPCourses: 1, // Only one offered
    numberOfHonorsCourses: 2,
    numberOfIBCourses: 0,
    extracurriculars: [
      {
        title: "Founder of Local Heritage Archive",
        description: "Digitized 100 years of county history by hand.",
        tier: 1,
        category: "Writing_Journalism",
        tierLevel: "National",
        externalValidation: "Institutional",
        rarity: "Ultra_Rare",
        institutionalStrength: "Standard",
        cognitiveLoad: "High",
        confidence: 100
      }
    ],
    awards: [],
    targetSchools: ["Dartmouth College", "Brown University"],
    targetColleges: ["Dartmouth College", "Brown University"]
  },
  "Intl IB Prospect (Conversion Stress)": {
    name: "Amara Okonkwo",
    isInternational: true,
    schoolSystem: 'Intl_Standard',
    gender: 'Female',
    state: 'External',
    intendedMajor: "Economics",
    majorCategory: "Business",
    sat: null,
    act: null,
    preferredTestType: 'None',
    unweightedGPA: 3.8,
    weightedGPA: 3.8,
    numberOfAPCourses: 0,
    numberOfHonorsCourses: 0,
    numberOfIBCourses: 6,
    extracurriculars: [
      {
        title: "International Debate Winner",
        description: "World Individual Debating Championships.",
        tier: 0,
        category: "Debate_MUN",
        tierLevel: "International",
        externalValidation: "Professional_Audit",
        rarity: "Rare",
        institutionalStrength: "Prestigious",
        cognitiveLoad: "High",
        confidence: 90
      }
    ],
    awards: [],
    targetSchools: ["Yale University", "Columbia University"],
    targetColleges: ["Yale University", "Columbia University"]
  }
};

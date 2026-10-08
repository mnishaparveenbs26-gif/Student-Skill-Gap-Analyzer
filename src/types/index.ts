export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface StudentProfile {
  userId: string;
  department: string;
  degree: string;
  year: string;
  cgpa: number;
  targetCareerId?: string;
}

export type SkillCategory = 'Programming' | 'Data' | 'Web' | 'AI/ML' | 'Professional';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
}

export interface StudentSkill {
  skillId: string;
  score: number; // 0 to 100
  proficiencyLevel: 1 | 2 | 3; // 1: Beginner (0-40), 2: Intermediate (41-75), 3: Advanced (76-100)
}

export interface CareerSkillRequirement {
  skillId: string;
  requiredScore: number; // 0 to 100
  importance: number; // 1 to 5 weight multiplier
}

export interface Career {
  id: string;
  name: string;
  description: string;
  industry: string;
  demandLevel: 'High' | 'Very High' | 'Moderate';
  averageSalary: string;
  requirements: CareerSkillRequirement[];
}

export type GapPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type GapStatus = 'Almost Ready' | 'Needs Improvement' | 'Critical Gap';

export interface SkillGapItem {
  skillId: string;
  skillName: string;
  category: SkillCategory;
  currentScore: number;
  requiredScore: number;
  gapScore: number; // required - current
  gapPercentage: number; // ((required - current) / required) * 100
  priority: GapPriority;
  status: GapStatus;
  importance: number;
}

export type ReadinessTier = 'Highly Ready' | 'Career Ready' | 'Needs Improvement' | 'Beginner Stage';

export interface ReadinessAnalysis {
  careerId: string;
  careerName: string;
  overallReadiness: number; // 0 - 100
  tier: ReadinessTier;
  tierColor: string;
  strongSkills: SkillGapItem[];
  moderateSkills: SkillGapItem[];
  weakSkills: SkillGapItem[];
  criticalGaps: SkillGapItem[];
  categoryBreakdown: {
    category: SkillCategory;
    averageScore: number;
    requiredAverage: number;
  }[];
}

export interface CareerRecommendation {
  career: Career;
  matchPercentage: number;
  predictedProbability: number;
  matchingSkillsCount: number;
  totalSkillsCount: number;
  topPositiveSkills: string[];
  keyGapSkills: string[];
}

export interface RoadmapTask {
  id: string;
  week: number;
  skillId: string;
  skillName: string;
  title: string;
  description: string;
  priority: GapPriority;
  estimatedHours: number;
  keyTopics: string[];
  suggestedProject: string;
  isCompleted: boolean;
  scoreBoost: number;
}

export interface ProgressHistoryEntry {
  id: string;
  skillId: string;
  skillName: string;
  oldScore: number;
  newScore: number;
  improvement: number;
  readinessBefore: number;
  readinessAfter: number;
  date: string;
  notes?: string;
}

export interface SystemStats {
  totalStudents: number;
  totalCareers: number;
  totalSkills: number;
  averageReadiness: number;
  mostCommonGap: string;
  mostPopularCareer: string;
  readinessDistribution: {
    highlyReady: number;
    careerReady: number;
    needsImprovement: number;
    beginner: number;
  };
}

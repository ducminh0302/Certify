// ============================================
// USER PROFILE TYPES
// ============================================

export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export type UserBackground =
  | "student"
  | "working-professional"
  | "career-changer";

export type ExplanationStyle = "detailed" | "concise" | "visual";

export type PreferredLanguage = "en" | "vi";

export interface UserProfile {
  id: string;
  name?: string;

  // Learning preferences
  experienceLevel: ExperienceLevel;
  background: UserBackground;
  explanationStyle: ExplanationStyle;
  preferredLanguage: PreferredLanguage;

  // Study goals
  targetExamDate?: Date;
  studyHoursPerWeek?: number;

  // Interests/Focus areas
  focusTopics: string[]; // Topics user wants to focus on

  // Onboarding
  hasCompletedOnboarding: boolean;
  onboardingCompletedAt?: Date;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// LEARNING ANALYTICS TYPES
// ============================================

export interface TopicPerformance {
  topic: string;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number; // percentage
  averageTimeSpent: number; // seconds
  lastPracticed?: Date;
  trend: "improving" | "stable" | "declining";
}

export interface LearningAnalytics {
  userId: string;

  // Overall stats
  totalQuestionsAnswered: number;
  totalCorrect: number;
  totalIncorrect: number;
  overallAccuracy: number;
  totalStudyTime: number; // seconds

  // Topic breakdown
  topicPerformance: TopicPerformance[];

  // Weak areas (topics below 60% accuracy)
  weakTopics: string[];

  // Strong areas (topics above 80% accuracy)
  strongTopics: string[];

  // Recent activity
  lastSessionDate?: Date;
  currentStreak: number; // days
  longestStreak: number;

  // Timestamps
  updatedAt: Date;

  // Mistake patterns (Phase 3)
  mistakePatterns: MistakePattern[];

  // Questions due for review (spaced repetition)
  reviewQueue: ReviewItem[];

  // Daily goals
  dailyGoal: number; // questions per day
  dailyProgress: number; // questions answered today
  lastDailyReset?: Date;
}

// ============================================
// ADAPTIVE LEARNING TYPES (PHASE 3)
// ============================================

export type QuestionDifficulty = "easy" | "medium" | "hard";

export interface MistakePattern {
  id: string;
  pattern: string; // e.g., "Confuses NPV with IRR", "Time value calculations"
  occurrences: number;
  topics: string[];
  lastOccurred: Date;
  exampleQuestionIds: string[];
}

export interface ReviewItem {
  questionId: string;
  topic: string;
  difficulty: QuestionDifficulty;
  nextReviewDate: Date;
  easeFactor: number; // SM-2 algorithm
  interval: number; // days until next review
  repetitions: number;
  lastReviewDate?: Date;
  lastResult?: "correct" | "incorrect";
}

export interface StudyRecommendation {
  id: string;
  type: "weak-topic" | "review-due" | "mistake-pattern" | "new-topic";
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  topic?: string;
  questionCount?: number;
  estimatedTime?: number; // minutes
}

export interface FocusModeConfig {
  enabled: boolean;
  targetTopics: string[];
  difficulty?: QuestionDifficulty;
  questionCount: number;
  includeReviewItems: boolean;
}

// ============================================
// ONBOARDING TYPES
// ============================================

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export interface OnboardingState {
  currentStep: number;
  totalSteps: number;
  steps: OnboardingStep[];
  answers: OnboardingAnswers;
}

export interface OnboardingAnswers {
  experienceLevel?: ExperienceLevel;
  background?: UserBackground;
  explanationStyle?: ExplanationStyle;
  preferredLanguage?: PreferredLanguage;
  targetExamDate?: string; // ISO date string
  focusTopics?: string[];
}

// ============================================
// AI PERSONALIZATION CONTEXT
// ============================================

export interface PersonalizationContext {
  experienceLevel: ExperienceLevel;
  background: UserBackground;
  explanationStyle: ExplanationStyle;
  preferredLanguage: PreferredLanguage;
  weakTopics: string[];
  strongTopics: string[];
  currentTopic?: string;
}

// ============================================
// CONSTANTS
// ============================================

export const EXPERIENCE_LEVEL_LABELS: Record<ExperienceLevel, string> = {
  beginner: "Beginner - New to this subject",
  intermediate: "Intermediate - Some prior knowledge",
  advanced: "Advanced - Experienced practitioner",
};

export const BACKGROUND_LABELS: Record<UserBackground, string> = {
  student: "Student - Currently studying",
  "working-professional": "Working Professional - In the field",
  "career-changer": "Career Changer - Transitioning to this field",
};

export const EXPLANATION_STYLE_LABELS: Record<ExplanationStyle, string> = {
  detailed: "Detailed - Step-by-step explanations with examples",
  concise: "Concise - Brief and to the point",
  visual: "Visual - Diagrams and visual aids preferred",
};

export const CFA_TOPICS = [
  "Ethics & Professional Standards",
  "Quantitative Methods",
  "Economics",
  "Financial Statement Analysis",
  "Corporate Issuers",
  "Equity Investments",
  "Fixed Income",
  "Derivatives",
  "Alternative Investments",
  "Portfolio Management",
] as const;

export type CFATopic = (typeof CFA_TOPICS)[number];

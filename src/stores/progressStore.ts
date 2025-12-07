import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ExamResult } from "@/types/exam";

// Achievement definitions
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: "milestone" | "streak" | "performance" | "dedication";
  requirement: {
    type: "exams_completed" | "perfect_score" | "streak" | "xp" | "topic_mastery";
    value: number;
  };
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_exam",
    name: "First Steps",
    description: "Complete your first exam",
    icon: "🎯",
    category: "milestone",
    requirement: { type: "exams_completed", value: 1 },
  },
  {
    id: "exam_5",
    name: "Getting Started",
    description: "Complete 5 exams",
    icon: "📚",
    category: "milestone",
    requirement: { type: "exams_completed", value: 5 },
  },
  {
    id: "exam_25",
    name: "Dedicated Learner",
    description: "Complete 25 exams",
    icon: "🌟",
    category: "milestone",
    requirement: { type: "exams_completed", value: 25 },
  },
  {
    id: "exam_100",
    name: "Master Scholar",
    description: "Complete 100 exams",
    icon: "🏆",
    category: "milestone",
    requirement: { type: "exams_completed", value: 100 },
  },
  {
    id: "perfect_score",
    name: "Perfectionist",
    description: "Score 100% on an exam",
    icon: "💯",
    category: "performance",
    requirement: { type: "perfect_score", value: 1 },
  },
  {
    id: "streak_3",
    name: "On Fire",
    description: "Maintain a 3-day streak",
    icon: "🔥",
    category: "streak",
    requirement: { type: "streak", value: 3 },
  },
  {
    id: "streak_7",
    name: "Week Warrior",
    description: "Maintain a 7-day streak",
    icon: "⚡",
    category: "streak",
    requirement: { type: "streak", value: 7 },
  },
  {
    id: "streak_30",
    name: "Monthly Master",
    description: "Maintain a 30-day streak",
    icon: "👑",
    category: "streak",
    requirement: { type: "streak", value: 30 },
  },
  {
    id: "xp_1000",
    name: "XP Hunter",
    description: "Earn 1,000 XP",
    icon: "⚡",
    category: "dedication",
    requirement: { type: "xp", value: 1000 },
  },
  {
    id: "xp_10000",
    name: "XP Master",
    description: "Earn 10,000 XP",
    icon: "🚀",
    category: "dedication",
    requirement: { type: "xp", value: 10000 },
  },
];

interface ExamHistoryItem {
  examId: string;
  examName: string;
  completedAt: string;
  score: number;
  passed: boolean;
  timeTaken: number;
  xpEarned: number;
}

interface ProgressState {
  // XP and Level
  totalXP: number;
  level: number;

  // Streaks
  currentStreak: number;
  longestStreak: number;
  lastPracticeDate: string | null;

  // Achievements
  unlockedAchievements: string[];
  newlyUnlockedAchievement: Achievement | null;

  // Stats
  totalExamsCompleted: number;
  totalExamsPassed: number;
  perfectScores: number;
  averageScore: number;
  totalTimeSpent: number; // in seconds

  // History
  examHistory: ExamHistoryItem[];

  // Topic mastery
  topicScores: Record<string, { totalAttempts: number; totalCorrect: number; avgScore: number }>;

  // Actions
  recordExamResult: (result: ExamResult) => {
    xpEarned: number;
    newAchievements: Achievement[];
    streakUpdated: boolean;
    newStreak: number;
  };
  clearNewAchievement: () => void;
  getLevel: () => { level: number; currentXP: number; xpForNextLevel: number; progress: number };
  getLevelInfo: (xp: number) => { level: number; title: string };
}

// XP calculation
function calculateXP(result: ExamResult): number {
  let xp = 0;

  // Base XP for completing an exam
  xp += 50;

  // XP based on score
  xp += Math.floor(result.score * 1.5);

  // Bonus for passing
  if (result.passed) {
    xp += 50;
  }

  // Bonus for high scores
  if (result.score >= 90) {
    xp += 30;
  } else if (result.score >= 80) {
    xp += 20;
  }

  // Perfect score bonus
  if (result.score === 100) {
    xp += 50;
  }

  return xp;
}

// Level calculation (exponential growth)
function calculateLevel(totalXP: number): number {
  // Level formula: level = floor(sqrt(xp / 100))
  // Level 1: 0-99 XP
  // Level 2: 100-399 XP
  // Level 3: 400-899 XP
  // etc.
  return Math.floor(Math.sqrt(totalXP / 100)) + 1;
}

function getXPForLevel(level: number): number {
  // Inverse of level formula
  return Math.pow(level - 1, 2) * 100;
}

function getLevelTitle(level: number): string {
  if (level >= 50) return "Grand Master";
  if (level >= 40) return "Expert";
  if (level >= 30) return "Advanced";
  if (level >= 20) return "Proficient";
  if (level >= 15) return "Intermediate";
  if (level >= 10) return "Apprentice";
  if (level >= 5) return "Beginner";
  return "Novice";
}

// Check if same calendar day
function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

// Check if consecutive days
function isConsecutiveDay(previousDate: Date, currentDate: Date): boolean {
  const prev = new Date(previousDate);
  prev.setDate(prev.getDate() + 1);
  return isSameDay(prev, currentDate);
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      // Initial state
      totalXP: 0,
      level: 1,
      currentStreak: 0,
      longestStreak: 0,
      lastPracticeDate: null,
      unlockedAchievements: [],
      newlyUnlockedAchievement: null,
      totalExamsCompleted: 0,
      totalExamsPassed: 0,
      perfectScores: 0,
      averageScore: 0,
      totalTimeSpent: 0,
      examHistory: [],
      topicScores: {},

      recordExamResult: (result) => {
        const state = get();
        const now = new Date();
        const today = now.toISOString().split("T")[0];

        // Calculate XP
        const xpEarned = calculateXP(result);
        const newTotalXP = state.totalXP + xpEarned;
        const newLevel = calculateLevel(newTotalXP);

        // Update streak
        let newStreak = state.currentStreak;
        let streakUpdated = false;

        if (state.lastPracticeDate) {
          const lastDate = new Date(state.lastPracticeDate);
          if (!isSameDay(lastDate, now)) {
            if (isConsecutiveDay(lastDate, now)) {
              newStreak = state.currentStreak + 1;
              streakUpdated = true;
            } else {
              newStreak = 1; // Reset streak
              streakUpdated = true;
            }
          }
        } else {
          newStreak = 1;
          streakUpdated = true;
        }

        const newLongestStreak = Math.max(state.longestStreak, newStreak);

        // Update stats
        const newExamsCompleted = state.totalExamsCompleted + 1;
        const newExamsPassed = state.totalExamsPassed + (result.passed ? 1 : 0);
        const newPerfectScores = state.perfectScores + (result.score === 100 ? 1 : 0);
        const newTotalTimeSpent = state.totalTimeSpent + result.timeTaken;
        const newAverageScore = Math.round(
          (state.averageScore * state.totalExamsCompleted + result.score) / newExamsCompleted
        );

        // Update topic scores
        const newTopicScores = { ...state.topicScores };
        result.topicBreakdown.forEach((topic) => {
          const existing = newTopicScores[topic.topic] || {
            totalAttempts: 0,
            totalCorrect: 0,
            avgScore: 0,
          };
          const newAttempts = existing.totalAttempts + topic.totalQuestions;
          const newCorrect = existing.totalCorrect + topic.correctAnswers;
          newTopicScores[topic.topic] = {
            totalAttempts: newAttempts,
            totalCorrect: newCorrect,
            avgScore: Math.round((newCorrect / newAttempts) * 100),
          };
        });

        // Add to history
        const historyItem: ExamHistoryItem = {
          examId: result.examId,
          examName: result.examName,
          completedAt: result.completedAt.toISOString(),
          score: result.score,
          passed: result.passed,
          timeTaken: result.timeTaken,
          xpEarned,
        };

        const newHistory = [historyItem, ...state.examHistory].slice(0, 50); // Keep last 50

        // Check achievements
        const newAchievements: Achievement[] = [];
        ACHIEVEMENTS.forEach((achievement) => {
          if (state.unlockedAchievements.includes(achievement.id)) return;

          let unlocked = false;
          switch (achievement.requirement.type) {
            case "exams_completed":
              unlocked = newExamsCompleted >= achievement.requirement.value;
              break;
            case "perfect_score":
              unlocked = newPerfectScores >= achievement.requirement.value;
              break;
            case "streak":
              unlocked = newStreak >= achievement.requirement.value;
              break;
            case "xp":
              unlocked = newTotalXP >= achievement.requirement.value;
              break;
          }

          if (unlocked) {
            newAchievements.push(achievement);
          }
        });

        const newUnlockedAchievements = [
          ...state.unlockedAchievements,
          ...newAchievements.map((a) => a.id),
        ];

        // Update state
        set({
          totalXP: newTotalXP,
          level: newLevel,
          currentStreak: newStreak,
          longestStreak: newLongestStreak,
          lastPracticeDate: today,
          unlockedAchievements: newUnlockedAchievements,
          newlyUnlockedAchievement: newAchievements[0] || null,
          totalExamsCompleted: newExamsCompleted,
          totalExamsPassed: newExamsPassed,
          perfectScores: newPerfectScores,
          averageScore: newAverageScore,
          totalTimeSpent: newTotalTimeSpent,
          examHistory: newHistory,
          topicScores: newTopicScores,
        });

        return {
          xpEarned,
          newAchievements,
          streakUpdated,
          newStreak,
        };
      },

      clearNewAchievement: () => {
        set({ newlyUnlockedAchievement: null });
      },

      getLevel: () => {
        const { totalXP, level } = get();
        const currentLevelXP = getXPForLevel(level);
        const nextLevelXP = getXPForLevel(level + 1);
        const xpInCurrentLevel = totalXP - currentLevelXP;
        const xpNeededForNextLevel = nextLevelXP - currentLevelXP;

        return {
          level,
          currentXP: xpInCurrentLevel,
          xpForNextLevel: xpNeededForNextLevel,
          progress: Math.round((xpInCurrentLevel / xpNeededForNextLevel) * 100),
        };
      },

      getLevelInfo: (xp) => {
        const level = calculateLevel(xp);
        return {
          level,
          title: getLevelTitle(level),
        };
      },
    }),
    {
      name: "certify-progress-storage",
    }
  )
);

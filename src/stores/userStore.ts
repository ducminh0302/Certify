import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  UserProfile,
  LearningAnalytics,
  TopicPerformance,
  OnboardingAnswers,
  ExperienceLevel,
  UserBackground,
  PersonalizationContext,
  ReviewItem,
  MistakePattern,
  StudyRecommendation,
  QuestionDifficulty,
} from "@/types/user";

interface UserState {
  // User profile
  profile: UserProfile | null;

  // Learning analytics
  analytics: LearningAnalytics | null;

  // Actions - Profile
  createProfile: (answers: OnboardingAnswers) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetProfile: () => void;

  // Actions - Analytics
  updateTopicPerformance: (
    topic: string,
    isCorrect: boolean,
    timeSpent: number,
    questionId?: string,
    difficulty?: QuestionDifficulty
  ) => void;
  recordSession: () => void;
  calculateWeakTopics: () => string[];

  // Actions - Spaced Repetition (Phase 3)
  addToReviewQueue: (
    questionId: string,
    topic: string,
    difficulty: QuestionDifficulty
  ) => void;
  updateReviewItem: (questionId: string, isCorrect: boolean) => void;
  getReviewsDue: () => ReviewItem[];

  // Actions - Recommendations (Phase 3)
  getStudyRecommendations: () => StudyRecommendation[];

  // Actions - Daily Goals (Phase 3)
  setDailyGoal: (goal: number) => void;
  incrementDailyProgress: () => void;
  resetDailyProgressIfNeeded: () => void;

  // Helpers
  hasCompletedOnboarding: () => boolean;
  getPersonalizationContext: (currentTopic?: string) => PersonalizationContext;
  getExperienceLevelPrompt: () => string;
  getBackgroundPrompt: () => string;
}

function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

const DEFAULT_ANALYTICS: LearningAnalytics = {
  userId: "",
  totalQuestionsAnswered: 0,
  totalCorrect: 0,
  totalIncorrect: 0,
  overallAccuracy: 0,
  totalStudyTime: 0,
  topicPerformance: [],
  weakTopics: [],
  strongTopics: [],
  currentStreak: 0,
  longestStreak: 0,
  updatedAt: new Date(),
  // Phase 3 additions
  mistakePatterns: [],
  reviewQueue: [],
  dailyGoal: 20,
  dailyProgress: 0,
};

// SM-2 Spaced Repetition Algorithm helpers
function calculateNextReview(
  easeFactor: number,
  interval: number,
  repetitions: number,
  isCorrect: boolean
): { easeFactor: number; interval: number; repetitions: number } {
  if (!isCorrect) {
    // Reset on incorrect answer
    return {
      easeFactor: Math.max(1.3, easeFactor - 0.2),
      interval: 1,
      repetitions: 0,
    };
  }

  // Correct answer - increase interval
  let newInterval: number;
  if (repetitions === 0) {
    newInterval = 1;
  } else if (repetitions === 1) {
    newInterval = 3;
  } else {
    newInterval = Math.round(interval * easeFactor);
  }

  return {
    easeFactor: Math.max(1.3, easeFactor + 0.1),
    interval: newInterval,
    repetitions: repetitions + 1,
  };
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: null,
      analytics: null,

      // Create new profile from onboarding
      createProfile: (answers: OnboardingAnswers) => {
        const now = new Date();
        const userId = generateId();

        const profile: UserProfile = {
          id: userId,
          experienceLevel: answers.experienceLevel || "beginner",
          background: answers.background || "student",
          explanationStyle: answers.explanationStyle || "detailed",
          preferredLanguage: answers.preferredLanguage || "en",
          targetExamDate: answers.targetExamDate
            ? new Date(answers.targetExamDate)
            : undefined,
          focusTopics: answers.focusTopics || [],
          hasCompletedOnboarding: true,
          onboardingCompletedAt: now,
          createdAt: now,
          updatedAt: now,
        };

        const analytics: LearningAnalytics = {
          ...DEFAULT_ANALYTICS,
          userId,
          updatedAt: now,
        };

        set({ profile, analytics });
      },

      // Update existing profile
      updateProfile: (updates: Partial<UserProfile>) => {
        const { profile } = get();
        if (!profile) return;

        set({
          profile: {
            ...profile,
            ...updates,
            updatedAt: new Date(),
          },
        });
      },

      // Reset profile (for testing or user request)
      resetProfile: () => {
        set({ profile: null, analytics: null });
      },

      // Update topic performance after answering a question
      updateTopicPerformance: (
        topic: string,
        isCorrect: boolean,
        timeSpent: number
      ) => {
        const { analytics } = get();
        if (!analytics) return;

        const existingIndex = analytics.topicPerformance.findIndex(
          (tp) => tp.topic === topic
        );

        let updatedPerformance: TopicPerformance[];

        if (existingIndex >= 0) {
          // Update existing topic
          updatedPerformance = analytics.topicPerformance.map((tp, index) => {
            if (index !== existingIndex) return tp;

            const newTotal = tp.totalQuestions + 1;
            const newCorrect = tp.correctAnswers + (isCorrect ? 1 : 0);
            const newIncorrect = tp.incorrectAnswers + (isCorrect ? 0 : 1);
            const newAccuracy = Math.round((newCorrect / newTotal) * 100);

            // Calculate trend based on last 5 questions (simplified)
            const previousAccuracy = tp.accuracy;
            let trend: "improving" | "stable" | "declining" = "stable";
            if (newAccuracy > previousAccuracy + 5) trend = "improving";
            else if (newAccuracy < previousAccuracy - 5) trend = "declining";

            return {
              ...tp,
              totalQuestions: newTotal,
              correctAnswers: newCorrect,
              incorrectAnswers: newIncorrect,
              accuracy: newAccuracy,
              averageTimeSpent: Math.round(
                (tp.averageTimeSpent * tp.totalQuestions + timeSpent) / newTotal
              ),
              lastPracticed: new Date(),
              trend,
            };
          });
        } else {
          // Add new topic
          const newTopicPerformance: TopicPerformance = {
            topic,
            totalQuestions: 1,
            correctAnswers: isCorrect ? 1 : 0,
            incorrectAnswers: isCorrect ? 0 : 1,
            accuracy: isCorrect ? 100 : 0,
            averageTimeSpent: timeSpent,
            lastPracticed: new Date(),
            trend: "stable",
          };
          updatedPerformance = [
            ...analytics.topicPerformance,
            newTopicPerformance,
          ];
        }

        // Recalculate overall stats
        const totalQuestions = analytics.totalQuestionsAnswered + 1;
        const totalCorrect = analytics.totalCorrect + (isCorrect ? 1 : 0);
        const totalIncorrect = analytics.totalIncorrect + (isCorrect ? 0 : 1);

        // Calculate weak and strong topics
        const weakTopics = updatedPerformance
          .filter((tp) => tp.accuracy < 60 && tp.totalQuestions >= 3)
          .map((tp) => tp.topic);

        const strongTopics = updatedPerformance
          .filter((tp) => tp.accuracy >= 80 && tp.totalQuestions >= 3)
          .map((tp) => tp.topic);

        set({
          analytics: {
            ...analytics,
            totalQuestionsAnswered: totalQuestions,
            totalCorrect,
            totalIncorrect,
            overallAccuracy: Math.round((totalCorrect / totalQuestions) * 100),
            totalStudyTime: analytics.totalStudyTime + timeSpent,
            topicPerformance: updatedPerformance,
            weakTopics,
            strongTopics,
            updatedAt: new Date(),
          },
        });
      },

      // Record a study session (for streak tracking)
      recordSession: () => {
        const { analytics } = get();
        if (!analytics) return;

        const now = new Date();
        const lastSession = analytics.lastSessionDate
          ? new Date(analytics.lastSessionDate)
          : null;

        let newStreak = 1;
        if (lastSession) {
          const daysSinceLastSession = Math.floor(
            (now.getTime() - lastSession.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (daysSinceLastSession === 0) {
            // Same day, keep current streak
            newStreak = analytics.currentStreak;
          } else if (daysSinceLastSession === 1) {
            // Consecutive day, increment streak
            newStreak = analytics.currentStreak + 1;
          }
          // If more than 1 day, streak resets to 1
        }

        set({
          analytics: {
            ...analytics,
            lastSessionDate: now,
            currentStreak: newStreak,
            longestStreak: Math.max(newStreak, analytics.longestStreak),
            updatedAt: now,
          },
        });
      },

      // Calculate weak topics (topics with accuracy < 60%)
      calculateWeakTopics: () => {
        const { analytics } = get();
        if (!analytics) return [];

        return analytics.topicPerformance
          .filter((tp) => tp.accuracy < 60 && tp.totalQuestions >= 3)
          .sort((a, b) => a.accuracy - b.accuracy)
          .map((tp) => tp.topic);
      },

      // ====== PHASE 3: Spaced Repetition ======

      // Add a question to the review queue
      addToReviewQueue: (
        questionId: string,
        topic: string,
        difficulty: QuestionDifficulty
      ) => {
        const { analytics } = get();
        if (!analytics) return;

        // Ensure reviewQueue exists (defensive check for old persisted data)
        const reviewQueue = analytics.reviewQueue || [];

        // Check if already in queue
        const existing = reviewQueue.find(
          (r) => r.questionId === questionId
        );
        if (existing) return;

        const now = new Date();
        const newItem: ReviewItem = {
          questionId,
          topic,
          difficulty,
          nextReviewDate: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
          easeFactor: 2.5,
          interval: 1,
          repetitions: 0,
        };

        set({
          analytics: {
            ...analytics,
            reviewQueue: [...reviewQueue, newItem],
            updatedAt: now,
          },
        });
      },

      // Update a review item after answering
      updateReviewItem: (questionId: string, isCorrect: boolean) => {
        const { analytics } = get();
        if (!analytics) return;

        // Ensure reviewQueue exists
        const reviewQueue = analytics.reviewQueue || [];

        const now = new Date();
        const updatedQueue = reviewQueue.map((item) => {
          if (item.questionId !== questionId) return item;

          const { easeFactor, interval, repetitions } = calculateNextReview(
            item.easeFactor,
            item.interval,
            item.repetitions,
            isCorrect
          );

          return {
            ...item,
            easeFactor,
            interval,
            repetitions,
            nextReviewDate: new Date(
              now.getTime() + interval * 24 * 60 * 60 * 1000
            ),
            lastReviewDate: now,
            lastResult: isCorrect ? "correct" : "incorrect",
          } as ReviewItem;
        });

        set({
          analytics: {
            ...analytics,
            reviewQueue: updatedQueue,
            updatedAt: now,
          },
        });
      },

      // Get questions due for review
      getReviewsDue: () => {
        const { analytics } = get();
        if (!analytics) return [];

        // Ensure reviewQueue exists
        const reviewQueue = analytics.reviewQueue || [];

        const now = new Date();
        return reviewQueue.filter(
          (item) => new Date(item.nextReviewDate) <= now
        );
      },

      // ====== PHASE 3: Study Recommendations ======

      getStudyRecommendations: () => {
        const { analytics } = get();
        if (!analytics) return [];

        const recommendations: StudyRecommendation[] = [];
        const now = new Date();

        // 1. Reviews due (highest priority)
        const reviewQueue = analytics.reviewQueue || [];
        const reviewsDue = reviewQueue.filter(
          (item) => new Date(item.nextReviewDate) <= now
        );
        if (reviewsDue.length > 0) {
          recommendations.push({
            id: "reviews-due",
            type: "review-due",
            title: "Review Due",
            description: `You have ${reviewsDue.length} question(s) due for review. Reviewing helps long-term retention.`,
            priority: "high",
            questionCount: reviewsDue.length,
            estimatedTime: Math.ceil(reviewsDue.length * 1.5),
          });
        }

        // 2. Weak topics (high priority)
        const weakTopicsWithData = analytics.topicPerformance
          .filter((tp) => tp.accuracy < 60 && tp.totalQuestions >= 3)
          .sort((a, b) => a.accuracy - b.accuracy)
          .slice(0, 3);

        weakTopicsWithData.forEach((topic, index) => {
          recommendations.push({
            id: `weak-topic-${index}`,
            type: "weak-topic",
            title: `Focus on ${topic.topic}`,
            description: `Your accuracy is ${topic.accuracy}% (${topic.correctAnswers}/${topic.totalQuestions}). Practice more to improve.`,
            priority: topic.accuracy < 40 ? "high" : "medium",
            topic: topic.topic,
            questionCount: 10,
            estimatedTime: 15,
          });
        });

        // 3. Topics not practiced recently
        const staleTopics = analytics.topicPerformance
          .filter((tp) => {
            if (!tp.lastPracticed) return false;
            const daysSince = Math.floor(
              (now.getTime() - new Date(tp.lastPracticed).getTime()) /
              (1000 * 60 * 60 * 24)
            );
            return daysSince > 7;
          })
          .slice(0, 2);

        staleTopics.forEach((topic, index) => {
          const daysSince = Math.floor(
            (now.getTime() - new Date(topic.lastPracticed!).getTime()) /
            (1000 * 60 * 60 * 24)
          );
          recommendations.push({
            id: `stale-topic-${index}`,
            type: "new-topic",
            title: `Refresh ${topic.topic}`,
            description: `You haven't practiced this in ${daysSince} days. Keep your knowledge fresh!`,
            priority: "low",
            topic: topic.topic,
            questionCount: 5,
            estimatedTime: 8,
          });
        });

        // Sort by priority
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return recommendations.sort(
          (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
      },

      // ====== PHASE 3: Daily Goals ======

      setDailyGoal: (goal: number) => {
        const { analytics } = get();
        if (!analytics) return;

        set({
          analytics: {
            ...analytics,
            dailyGoal: goal,
            updatedAt: new Date(),
          },
        });
      },

      incrementDailyProgress: () => {
        const { analytics } = get();
        if (!analytics) return;

        // Reset if it's a new day
        const now = new Date();
        const lastReset = analytics.lastDailyReset
          ? new Date(analytics.lastDailyReset)
          : null;
        const isNewDay =
          !lastReset ||
          now.toDateString() !== lastReset.toDateString();

        set({
          analytics: {
            ...analytics,
            dailyProgress: isNewDay ? 1 : analytics.dailyProgress + 1,
            lastDailyReset: isNewDay ? now : analytics.lastDailyReset,
            updatedAt: now,
          },
        });
      },

      resetDailyProgressIfNeeded: () => {
        const { analytics } = get();
        if (!analytics) return;

        const now = new Date();
        const lastReset = analytics.lastDailyReset
          ? new Date(analytics.lastDailyReset)
          : null;

        if (!lastReset || now.toDateString() !== lastReset.toDateString()) {
          set({
            analytics: {
              ...analytics,
              dailyProgress: 0,
              lastDailyReset: now,
              updatedAt: now,
            },
          });
        }
      },

      // Check if onboarding is completed
      hasCompletedOnboarding: () => {
        const { profile } = get();
        return profile?.hasCompletedOnboarding ?? false;
      },

      // Get personalization context for AI
      getPersonalizationContext: (currentTopic?: string) => {
        const { profile, analytics } = get();

        return {
          experienceLevel: profile?.experienceLevel || "beginner",
          background: profile?.background || "student",
          explanationStyle: profile?.explanationStyle || "detailed",
          preferredLanguage: profile?.preferredLanguage || "en",
          weakTopics: analytics?.weakTopics || [],
          strongTopics: analytics?.strongTopics || [],
          currentTopic,
        };
      },

      // Get experience level prompt segment
      getExperienceLevelPrompt: () => {
        const { profile } = get();
        const level = profile?.experienceLevel || "beginner";

        const prompts: Record<ExperienceLevel, string> = {
          beginner:
            "The user is a BEGINNER. Use simple language, avoid jargon, provide step-by-step explanations with real-world examples. Define technical terms when first used.",
          intermediate:
            "The user has INTERMEDIATE knowledge. You can use technical terms but still explain complex concepts. Reference CFA curriculum LOS when helpful.",
          advanced:
            "The user is ADVANCED. Be concise and direct. Reference specific LOS codes, assume familiarity with foundational concepts. Focus on nuances and exam tricks.",
        };

        return prompts[level];
      },

      // Get background prompt segment
      getBackgroundPrompt: () => {
        const { profile } = get();
        const background = profile?.background || "student";

        const prompts: Record<UserBackground, string> = {
          student:
            "The user is a STUDENT. They may benefit from academic-style explanations and textbook references.",
          "working-professional":
            "The user is a WORKING PROFESSIONAL. Relate concepts to real-world finance/investment scenarios they might encounter at work.",
          "career-changer":
            "The user is a CAREER CHANGER. They need context on why concepts matter in practice and how they connect to the broader finance industry.",
        };

        return prompts[background];
      },
    }),
    {
      name: "certify-user-storage",
      partialize: (state) => ({
        profile: state.profile,
        analytics: state.analytics,
      }),
    }
  )
);

// Selector hooks
export const useUserProfile = () => useUserStore((state) => state.profile);
export const useUserAnalytics = () => useUserStore((state) => state.analytics);
export const useHasCompletedOnboarding = () =>
  useUserStore((state) => state.hasCompletedOnboarding());

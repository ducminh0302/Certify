"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Trophy,
  Target,
  Clock,
  Flame,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Calendar,
  Award,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ThemeToggleCompact } from "@/components/layout/ThemeToggle";
import {
  fadeInUp,
  staggerContainer,
  cardHover,
  buttonTap,
} from "@/lib/animations";
import { useExamStore } from "@/stores/examStore";
import { useProgressStore, ACHIEVEMENTS } from "@/stores/progressStore";
import { useUserStore } from "@/stores/userStore";
import { examMetadata } from "@/data/exams";
import { cn } from "@/lib/utils";
import { LevelProgress } from "@/components/dashboard/LevelProgress";
import { TopicHeatmap } from "@/components/analytics/TopicHeatmap";
import { StudyRecommendations, DailyProgress } from "@/components/analytics/StudyRecommendations";
import { FocusModeModal, FocusModeButton } from "@/components/analytics/FocusMode";
import { LeaderboardCompact } from "@/components/gamification";
import type { FocusModeConfig } from "@/types/user";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatStudyTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}.${Math.floor(minutes / 6)}h`;
  }
  return `${minutes}m`;
}

export default function DashboardPage() {
  // const { lastResult } = useExamStore(); // Removed unused variable
  const {
    totalXP,
    currentStreak,
    totalExamsCompleted,
    totalExamsPassed,
    averageScore,
    totalTimeSpent,
    unlockedAchievements,
    examHistory,
    getLevel,
  } = useProgressStore();

  // Phase 3: Adaptive Learning
  const {
    analytics,
    getStudyRecommendations,
    getReviewsDue,
  } = useUserStore();

  const [animatedXP, setAnimatedXP] = useState(0);
  const [showFocusMode, setShowFocusMode] = useState(false);

  // Get level info
  const levelInfo = useMemo(() => getLevel(), [getLevel, totalXP]);

  // Phase 3: Get recommendations and reviews
  const recommendations = useMemo(() => getStudyRecommendations(), [getStudyRecommendations, analytics]);
  const reviewsDue = useMemo(() => getReviewsDue(), [getReviewsDue, analytics]);
  const topicPerformance = analytics?.topicPerformance || [];
  const weakTopics = analytics?.weakTopics || [];

  // Focus mode handler
  const handleStartFocusMode = (config: FocusModeConfig) => {
    // Navigate to exam page with focus mode config
    // For now, just navigate to exam select with topics pre-filtered
    const params = new URLSearchParams();
    params.set("focusTopics", config.targetTopics.join(","));
    if (config.difficulty) params.set("difficulty", config.difficulty);
    params.set("count", config.questionCount.toString());
    window.location.href = `/exam/select?${params.toString()}`;
  };

  // Animate XP counter
  useEffect(() => {
    if (totalXP === 0) {
      setAnimatedXP(0);
      return;
    }

    const duration = 1000;
    const steps = 30;
    const increment = totalXP / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= totalXP) {
        setAnimatedXP(totalXP);
        clearInterval(timer);
      } else {
        setAnimatedXP(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [totalXP]);

  // Map achievements with unlocked status
  const achievementsList = useMemo(() => {
    return ACHIEVEMENTS.slice(0, 6).map((achievement) => ({
      ...achievement,
      unlocked: unlockedAchievements.includes(achievement.id),
    }));
  }, [unlockedAchievements]);

  // Get last exam from history
  const lastExamFromHistory = examHistory[0];

  // Calculate daily progress (mock for now - could be enhanced)
  const todayExams = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    return examHistory.filter((exam) => exam.completedAt.startsWith(today)).length;
  }, [examHistory]);

  const dailyGoal = 3;
  const dailyProgress = Math.min((todayExams / dailyGoal) * 100, 100);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted animate-pulse">
              </div>
              <div className="h-6 w-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="h-20 bg-muted/20 rounded-xl animate-pulse" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-muted/20 rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Certify.AI</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggleCompact />
            <Link href="/achievements">
              <Button variant="ghost" size="sm" className="gap-2">
                <Trophy className="h-4 w-4" />
                Achievements
              </Button>
            </Link>
            <Link href="/exam/select">
              <Button className="gap-2 bg-gradient-primary">
                <Zap className="h-4 w-4" />
                Practice Now
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          {/* Welcome Section */}
          <motion.div variants={fadeInUp}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">
                  {getGreeting()}! 👋
                </h1>
                <p className="mt-1 text-muted-foreground">
                  {totalExamsCompleted > 0
                    ? `You've completed ${totalExamsCompleted} exam${totalExamsCompleted > 1 ? "s" : ""}. Keep going!`
                    : "Ready to start your learning journey?"}
                </p>
              </div>

              {/* Streak Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-5 py-3 text-white shadow-lg",
                  currentStreak > 0
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 shadow-orange-500/25"
                    : "bg-gradient-to-r from-gray-400 to-gray-500 shadow-gray-500/25"
                )}
              >
                <motion.div
                  animate={
                    currentStreak > 0
                      ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0],
                      }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Flame className="h-8 w-8" />
                </motion.div>
                <div>
                  <p className="text-2xl font-bold">{currentStreak}</p>
                  <p className="text-xs opacity-90">Day Streak</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Level Progress Card */}
          {totalXP > 0 && (
            <motion.div variants={fadeInUp}>
              <LevelProgress
                level={levelInfo.level}
                currentXP={levelInfo.currentXP}
                xpForNextLevel={levelInfo.xpForNextLevel}
                progress={levelInfo.progress}
                totalXP={totalXP}
              />
            </motion.div>
          )}

          {/* Stats Grid */}
          <motion.div
            variants={fadeInUp}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {/* XP Card */}
            <motion.div {...cardHover}>
              <div className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
                      <Sparkles className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total XP</p>
                      <p className="text-2xl font-bold">{animatedXP.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Level {levelInfo.level}</span>
                      <span>Level {levelInfo.level + 1}</span>
                    </div>
                    <Progress value={levelInfo.progress} className="h-2" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Accuracy Card */}
            <motion.div {...cardHover}>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
                    <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Score</p>
                    <p className="text-2xl font-bold">
                      {totalExamsCompleted > 0 ? `${averageScore}%` : "-"}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                  <TrendingUp className="h-3 w-3" />
                  <span>
                    {totalExamsPassed}/{totalExamsCompleted} passed
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Study Time Card */}
            <motion.div {...cardHover}>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
                    <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Study Time</p>
                    <p className="text-2xl font-bold">
                      {totalTimeSpent > 0 ? formatStudyTime(totalTimeSpent) : "-"}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Total time</span>
                </div>
              </div>
            </motion.div>

            {/* Exams Card */}
            <motion.div {...cardHover}>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900/30">
                    <Trophy className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Exams Done</p>
                    <p className="text-2xl font-bold">{totalExamsCompleted}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <Award className="h-3 w-3" />
                  <span>{examMetadata.length} available</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Continue Learning & Recent */}
            <div className="lg:col-span-2 space-y-6">
              {/* Continue Learning */}
              <motion.div variants={fadeInUp}>
                <h2 className="text-lg font-semibold mb-4">
                  {lastExamFromHistory ? "Continue Learning" : "Start Learning"}
                </h2>
                <Link href="/exam/select">
                  <motion.div
                    {...cardHover}
                    className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-3xl shadow-lg shadow-indigo-500/25">
                        📊
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {lastExamFromHistory
                            ? lastExamFromHistory.examName
                            : "CFA Level I - Practice Exam"}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {lastExamFromHistory
                            ? `Last score: ${lastExamFromHistory.score}%`
                            : "Start your first practice exam"}
                        </p>
                        <div className="mt-3 flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <BookOpen className="h-4 w-4" />
                            20 questions
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            45 min
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
                    </div>

                    {/* Progress indicator */}
                    {lastExamFromHistory && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                        <motion.div
                          className={cn(
                            "h-full",
                            lastExamFromHistory.passed
                              ? "bg-emerald-500"
                              : "bg-gradient-primary"
                          )}
                          initial={{ width: 0 }}
                          animate={{ width: `${lastExamFromHistory.score}%` }}
                          transition={{ delay: 0.5, duration: 1 }}
                        />
                      </div>
                    )}
                  </motion.div>
                </Link>
              </motion.div>

              {/* Recent History */}
              {examHistory.length > 0 && (
                <motion.div variants={fadeInUp}>
                  <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {examHistory.slice(0, 3).map((exam, index) => (
                      <motion.div
                        key={`${exam.completedAt}-${index}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-full",
                            exam.passed
                              ? "bg-emerald-100 dark:bg-emerald-900/30"
                              : "bg-amber-100 dark:bg-amber-900/30"
                          )}
                        >
                          {exam.passed ? (
                            <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Target className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{exam.examName}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(exam.completedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={cn(
                              "font-bold",
                              exam.passed
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-amber-600 dark:text-amber-400"
                            )}
                          >
                            {exam.score}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            +{exam.xpEarned} XP
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Available Exams */}
              <motion.div variants={fadeInUp}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Available Exams</h2>
                  <Link href="/exam/select">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {examMetadata.slice(0, 2).map((exam) => (
                    <Link key={exam.id} href={`/exam/${exam.id}`}>
                      <motion.div
                        {...cardHover}
                        className="group rounded-xl border border-border bg-card p-4 hover:border-primary/50"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{exam.icon}</span>
                          <div>
                            <h3 className="font-medium group-hover:text-primary transition-colors">
                              {exam.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {exam.totalQuestions} questions • {exam.timeLimit} min
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* AI Feature Card */}
              <motion.div variants={fadeInUp}>
                <div className="rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6">
                  <div className="flex items-start gap-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg"
                    >
                      <Sparkles className="h-6 w-6 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold">AI Study Assistant</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Get instant explanations, hints, and personalized guidance while you practice.
                        Your AI tutor is always ready to help!
                      </p>
                      <motion.div {...buttonTap} className="mt-4">
                        <Link href="/exam/select">
                          <Button size="sm" className="gap-2 bg-gradient-primary">
                            Start Learning
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Phase 3: Topic Performance Heatmap */}
              {topicPerformance.length > 0 && (
                <motion.div variants={fadeInUp}>
                  <h2 className="text-lg font-semibold mb-4">Topic Performance</h2>
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <TopicHeatmap
                      topicPerformance={topicPerformance}
                      onTopicClick={(topic) => {
                        setShowFocusMode(true);
                      }}
                    />
                  </div>
                </motion.div>
              )}

              {/* Phase 3: Study Recommendations */}
              {recommendations.length > 0 && (
                <motion.div variants={fadeInUp}>
                  <h2 className="text-lg font-semibold mb-4">Study Recommendations</h2>
                  <StudyRecommendations
                    recommendations={recommendations}
                    onStartPractice={(rec) => {
                      if (rec.topic) {
                        handleStartFocusMode({
                          enabled: true,
                          targetTopics: [rec.topic],
                          questionCount: rec.questionCount || 10,
                          includeReviewItems: rec.type === "review-due",
                        });
                      } else {
                        setShowFocusMode(true);
                      }
                    }}
                  />
                </motion.div>
              )}
            </div>

            {/* Right Column - Achievements */}
            <motion.div variants={fadeInUp}>
              <h2 className="text-lg font-semibold mb-4">Achievements</h2>
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="space-y-3">
                  {achievementsList.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "flex items-center gap-3 rounded-xl p-3 transition-all",
                        achievement.unlocked
                          ? "bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800"
                          : "bg-muted/50 opacity-50"
                      )}
                    >
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "font-medium text-sm",
                          !achievement.unlocked && "text-muted-foreground"
                        )}>
                          {achievement.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.unlocked && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white">
                            <span className="text-xs">✓</span>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border text-center">
                  <Link href="/achievements">
                    <Button variant="ghost" size="sm" className="gap-2">
                      View All Achievements
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Leaderboard Preview */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Leaderboard</h2>
                  <Link href="/achievements">
                    <Button variant="ghost" size="sm" className="gap-1 text-xs">
                      View All
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
                <LeaderboardCompact />
              </div>

              {/* Phase 3: Daily Progress */}
              {analytics && (
                <div className="mt-6">
                  <DailyProgress
                    dailyGoal={analytics.dailyGoal}
                    dailyProgress={analytics.dailyProgress}
                    streak={currentStreak}
                  />
                </div>
              )}

              {/* Phase 3: Focus Mode Button */}
              <div className="mt-6">
                <FocusModeButton
                  onClick={() => setShowFocusMode(true)}
                  weakTopicsCount={weakTopics.length}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Focus Mode Modal */}
      <FocusModeModal
        isOpen={showFocusMode}
        onClose={() => setShowFocusMode(false)}
        onStart={handleStartFocusMode}
        weakTopics={weakTopics}
        reviewCount={reviewsDue.length}
      />
    </div>
  );
}

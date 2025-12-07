"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Trophy,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Home,
  Sparkles,
  BarChart3,
  FileQuestion,
  Lightbulb,
  Zap,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggleCompact } from "@/components/layout/ThemeToggle";
import {
  fadeInUp,
  staggerContainer,
  buttonTap,
} from "@/lib/animations";
import { useExamStore } from "@/stores/examStore";
import { useProgressStore } from "@/stores/progressStore";
import { useChatStore } from "@/stores/chatStore";
import { useAIChat } from "@/hooks/useAIChat";
import { cn } from "@/lib/utils";
import {
  ScoreCircle,
  TopicBreakdown,
  PerformanceRadar,
  QuickStat,
  StudyRecommendations,
  QuestionReviewCard,
  FilterTabs,
  CelebrationOverlay,
  XPGain,
  StreakCelebration,
  AchievementUnlock,
} from "@/components/results";
import { AIPanel } from "@/components/ai-assistant";

type TabId = "overview" | "topics" | "questions" | "ai-tips";

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;

  const { lastResult, resetExam } = useExamStore();
  const { recordExamResult, clearNewAchievement, newlyUnlockedAchievement, currentStreak, getLevel } = useProgressStore();
  const { openPanel } = useChatStore();
  const { sendMessage, isPanelOpen } = useAIChat();

  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [filter, setFilter] = useState<"all" | "correct" | "incorrect">("all");
  const [showCelebration, setShowCelebration] = useState(false);
  const [showXP, setShowXP] = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [hasRecordedResult, setHasRecordedResult] = useState(false);

  // Redirect if no results
  useEffect(() => {
    if (!lastResult) {
      router.push("/exam/select");
    }
  }, [lastResult, router]);

  // Record result and trigger celebrations
  useEffect(() => {
    if (lastResult && !hasRecordedResult) {
      setHasRecordedResult(true);

      // Record result in progress store
      const { xpEarned: earnedXP, streakUpdated, newStreak } = recordExamResult(lastResult);
      setXpEarned(earnedXP);

      // Show celebration for passing
      if (lastResult.passed) {
        setShowCelebration(true);
      }

      // Show XP animation after celebration
      setTimeout(() => {
        setShowXP(true);
      }, lastResult.passed ? 2000 : 500);

      // Show streak if updated
      if (streakUpdated && newStreak > 1) {
        setStreakCount(newStreak);
        setTimeout(() => {
          setShowStreak(true);
        }, 3500);
      }
    }
  }, [lastResult, hasRecordedResult, recordExamResult]);

  const handleRetry = () => {
    resetExam();
    router.push(`/exam/${examId}`);
  };

  // Handle AI chat from question review
  const handleAskAI = useCallback((question: string) => {
    openPanel();
    // Small delay to ensure panel is open before sending
    setTimeout(() => {
      sendMessage(question);
    }, 100);
  }, [openPanel, sendMessage]);

  // Handle quick action from AI panel
  const handleQuickAction = useCallback((action: string) => {
    sendMessage(action);
  }, [sendMessage]);

  // Prepare topic data for radar chart
  const radarData = useMemo(() => {
    if (!lastResult) return [];
    return lastResult.topicBreakdown.map((t) => ({
      label: t.topic.length > 12 ? t.topic.slice(0, 10) + "..." : t.topic,
      value: t.score,
    }));
  }, [lastResult]);

  // Filter counts for tabs
  const filterCounts = useMemo(() => {
    if (!lastResult) return { all: 0, correct: 0, incorrect: 0 };
    return {
      all: lastResult.questionResults.length,
      correct: lastResult.questionResults.filter((q) => q.isCorrect).length,
      incorrect: lastResult.questionResults.filter((q) => !q.isCorrect).length,
    };
  }, [lastResult]);

  const filteredResults = useMemo(() => {
    if (!lastResult) return [];
    return lastResult.questionResults.filter((q) => {
      if (filter === "correct") return q.isCorrect;
      if (filter === "incorrect") return !q.isCorrect;
      return true;
    });
  }, [lastResult, filter]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? mins + "m " + secs + "s" : secs + "s";
  };

  if (!lastResult) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview" as const, label: "Overview", icon: BarChart3 },
    { id: "topics" as const, label: "Topics", icon: Target },
    { id: "questions" as const, label: "Questions", icon: FileQuestion },
    { id: "ai-tips" as const, label: "AI Tips", icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Celebration Overlay */}
      <CelebrationOverlay
        show={showCelebration}
        score={lastResult.score}
        onComplete={() => setShowCelebration(false)}
      />

      {/* XP Gain Animation */}
      <XPGain amount={xpEarned} show={showXP} />

      {/* Streak Celebration */}
      <StreakCelebration
        streak={streakCount}
        show={showStreak}
        onComplete={() => setShowStreak(false)}
      />

      {/* Achievement Unlock */}
      {newlyUnlockedAchievement && (
        <AchievementUnlock
          achievement={newlyUnlockedAchievement}
          show={!!newlyUnlockedAchievement}
          onComplete={clearNewAchievement}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/exam/select">
              <Button variant="ghost" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                Back to Exams
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            {lastResult.passed && (
              <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-3 py-1">
                <Zap className="h-4 w-4 text-indigo-500" />
                <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  +{xpEarned} XP
                </span>
              </div>
            )}
            <ThemeToggleCompact />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="max-w-5xl mx-auto"
        >
          {/* Result Header */}
          <motion.div variants={fadeInUp} className="text-center mb-8">
            {/* Pass/Fail Badge */}
            <div
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-6 py-2 text-lg font-semibold",
                lastResult.passed
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
              )}
            >
              {lastResult.passed ? (
                <>
                  <Trophy className="h-5 w-5" />
                  Congratulations! You Passed!
                </>
              ) : (
                <>
                  <Target className="h-5 w-5" />
                  Keep Practicing!
                </>
              )}
            </div>

            <h1 className="mt-4 text-2xl font-bold">{lastResult.examName}</h1>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={fadeInUp} className="mb-8">
            <div className="flex justify-center">
              <div className="inline-flex rounded-xl bg-muted/50 p-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                      activeTab === tab.id
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div variants={fadeInUp}>
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Score Card */}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex flex-col items-center">
                    <ScoreCircle
                      score={lastResult.score}
                      passed={lastResult.passed}
                      size="lg"
                    />
                    <p className="mt-4 text-sm text-muted-foreground">
                      Passing score: 70%
                    </p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <QuickStat
                      label="Correct"
                      value={lastResult.correctAnswers}
                      icon={<CheckCircle className="h-5 w-5 text-emerald-500" />}
                      trend="up"
                    />
                    <QuickStat
                      label="Incorrect"
                      value={lastResult.incorrectAnswers}
                      icon={<XCircle className="h-5 w-5 text-rose-500" />}
                    />
                    <QuickStat
                      label="Time Taken"
                      value={formatTime(lastResult.timeTaken)}
                      icon={<Clock className="h-5 w-5 text-indigo-500" />}
                    />
                    <QuickStat
                      label="Total Questions"
                      value={lastResult.totalQuestions}
                      icon={<FileQuestion className="h-5 w-5 text-amber-500" />}
                    />
                  </div>

                  {/* Radar Chart (if enough topics) */}
                  {radarData.length >= 3 && (
                    <div className="rounded-2xl border border-border bg-card p-6">
                      <h3 className="text-sm font-medium text-muted-foreground mb-4">
                        Performance Overview
                      </h3>
                      <div className="flex justify-center">
                        <PerformanceRadar
                          data={radarData}
                          size={200}
                          colorScheme={lastResult.passed ? "success" : "primary"}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="lg:col-span-2 flex flex-wrap items-center justify-center gap-4">
                  <motion.div {...buttonTap}>
                    <Button onClick={handleRetry} className="gap-2">
                      <RotateCcw className="h-4 w-4" />
                      Try Again
                    </Button>
                  </motion.div>
                  <motion.div {...buttonTap}>
                    <Link href="/exam/select">
                      <Button variant="outline" className="gap-2">
                        Choose Another Exam
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Topics Tab */}
            {activeTab === "topics" && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <TopicBreakdown
                  topics={lastResult.topicBreakdown.map((t) => ({
                    topic: t.topic,
                    score: t.score,
                    correctAnswers: t.correctAnswers,
                    totalQuestions: t.totalQuestions,
                  }))}
                />
              </div>
            )}

            {/* Questions Tab */}
            {activeTab === "questions" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Question Review</h2>
                  <FilterTabs
                    filter={filter}
                    onFilterChange={setFilter}
                    counts={filterCounts}
                  />
                </div>

                <div className="space-y-3">
                  {filteredResults.map((result, index) => (
                    <QuestionReviewCard
                      key={result.questionId}
                      result={result}
                      index={index}
                      onAskAI={handleAskAI}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* AI Tips Tab */}
            {activeTab === "ai-tips" && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <StudyRecommendations
                  topics={lastResult.topicBreakdown.map((t) => ({
                    topic: t.topic,
                    score: t.score,
                  }))}
                  overallScore={lastResult.score}
                  onStartPractice={handleRetry}
                  onOpenAI={() => {
                    openPanel();
                    setTimeout(() => {
                      sendMessage("Based on my exam results, what should I focus on to improve? Give me a personalized study plan.");
                    }, 100);
                  }}
                />
              </div>
            )}
          </motion.div>

          {/* Bottom CTA for non-passed */}
          {!lastResult.passed && activeTab === "overview" && (
            <motion.div
              variants={fadeInUp}
              className="mt-8 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Need Help Improving?</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Check out the AI Tips tab for personalized study recommendations,
                    or use the AI Study Assistant during your next practice session.
                  </p>
                  <div className="flex gap-3 mt-4">
                    <motion.div {...buttonTap}>
                      <Button
                        onClick={() => setActiveTab("ai-tips")}
                        variant="outline"
                        className="gap-2"
                      >
                        <Lightbulb className="h-4 w-4" />
                        View AI Tips
                      </Button>
                    </motion.div>
                    <motion.div {...buttonTap}>
                      <Button
                        onClick={handleRetry}
                        className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600"
                      >
                        <Sparkles className="h-4 w-4" />
                        Practice with AI Help
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

      {/* AI Panel */}
      <AIPanel
        questionContext={undefined}
        onSendMessage={sendMessage}
        onQuickAction={handleQuickAction}
      />

      {/* Floating AI Button (when panel is closed) */}
      {!isPanelOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={openPanel}
          className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-shadow"
        >
          <MessageSquare className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  );
}

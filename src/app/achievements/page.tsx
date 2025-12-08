"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Trophy,
  Flame,
  Target,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggleCompact } from "@/components/layout/ThemeToggle";
import { AchievementsShowcase } from "@/components/gamification/AchievementsShowcase";
import { Leaderboard } from "@/components/gamification/Leaderboard";
import { useProgressStore, ACHIEVEMENTS } from "@/stores/progressStore";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Tab = "achievements" | "leaderboard" | "stats";

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("achievements");

  const {
    totalXP,
    level,
    currentStreak,
    longestStreak,
    totalExamsCompleted,
    totalExamsPassed,
    perfectScores,
    averageScore,
    totalTimeSpent,
    unlockedAchievements,
    getLevel,
  } = useProgressStore();

  const levelInfo = getLevel();

  const tabs = [
    { id: "achievements" as Tab, label: "Achievements", icon: Trophy },
    { id: "leaderboard" as Tab, label: "Leaderboard", icon: TrendingUp },
    { id: "stats" as Tab, label: "Statistics", icon: Target },
  ];

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

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
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
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
          {/* Hero Section */}
          <motion.div
            variants={fadeInUp}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            </div>

            <div className="relative flex flex-col md:flex-row items-center gap-8">
              {/* Level Badge */}
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 blur-lg opacity-50"
                />
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 shadow-2xl">
                  <div className="text-center">
                    <p className="text-5xl font-black">{level}</p>
                    <p className="text-xs font-medium opacity-80">LEVEL</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">Your Progress</h1>
                <p className="text-white/80 mb-4">
                  {unlockedAchievements.length} of {ACHIEVEMENTS.length} achievements unlocked
                </p>

                {/* XP Progress Bar */}
                <div className="max-w-md">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Level {level}</span>
                    <span>Level {level + 1}</span>
                  </div>
                  <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${levelInfo.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                  <p className="text-sm text-white/70 mt-2">
                    {levelInfo.currentXP} / {levelInfo.xpForNextLevel} XP to next level
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur">
                  <Sparkles className="h-6 w-6 mx-auto mb-1" />
                  <p className="text-2xl font-bold">{totalXP.toLocaleString()}</p>
                  <p className="text-xs text-white/70">Total XP</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur">
                  <Flame className="h-6 w-6 mx-auto mb-1 text-orange-300" />
                  <p className="text-2xl font-bold">{currentStreak}</p>
                  <p className="text-xs text-white/70">Day Streak</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={fadeInUp}>
            <div className="flex border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 border-b-2 transition-colors",
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div variants={fadeInUp}>
            {activeTab === "achievements" && (
              <AchievementsShowcase showLocked={true} />
            )}

            {activeTab === "leaderboard" && <Leaderboard />}

            {activeTab === "stats" && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Exams Stats */}
                <div className="p-6 rounded-2xl border bg-card">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Exam Performance
                  </h3>
                  <div className="space-y-4">
                    <StatRow label="Exams Completed" value={totalExamsCompleted} />
                    <StatRow label="Exams Passed" value={totalExamsPassed} />
                    <StatRow
                      label="Pass Rate"
                      value={`${totalExamsCompleted > 0 ? Math.round((totalExamsPassed / totalExamsCompleted) * 100) : 0}%`}
                    />
                    <StatRow label="Perfect Scores" value={perfectScores} />
                    <StatRow label="Average Score" value={`${averageScore}%`} />
                  </div>
                </div>

                {/* Time Stats */}
                <div className="p-6 rounded-2xl border bg-card">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    Study Time
                  </h3>
                  <div className="space-y-4">
                    <StatRow label="Total Study Time" value={formatTime(totalTimeSpent)} />
                    <StatRow
                      label="Avg per Exam"
                      value={totalExamsCompleted > 0 ? formatTime(Math.round(totalTimeSpent / totalExamsCompleted)) : "0m"}
                    />
                    <StatRow label="Total XP Earned" value={totalXP.toLocaleString()} />
                    <StatRow label="Current Level" value={level} />
                  </div>
                </div>

                {/* Streak Stats */}
                <div className="p-6 rounded-2xl border bg-card">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Flame className="h-5 w-5 text-orange-500" />
                    Streaks
                  </h3>
                  <div className="space-y-4">
                    <StatRow label="Current Streak" value={`${currentStreak} days`} />
                    <StatRow label="Longest Streak" value={`${longestStreak} days`} />
                    <StatRow
                      label="Achievements"
                      value={`${unlockedAchievements.length}/${ACHIEVEMENTS.length}`}
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

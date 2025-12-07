"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Target,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggleCompact } from "@/components/layout/ThemeToggle";
import {
  fadeInUp,
  staggerContainer,
  cardHover,
  buttonTap,
} from "@/lib/animations";
import { allExams } from "@/data/exams";

export default function ExamSelectPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold">Select Exam</h1>
            </div>
          </div>
          <ThemeToggleCompact />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Page Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-12 text-center"
        >
          <motion.div variants={fadeInUp}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Target className="h-4 w-4" />
              Practice Mode
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mt-4 text-3xl font-bold md:text-4xl"
          >
            Choose Your Exam
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mt-3 text-muted-foreground max-w-lg mx-auto"
          >
            Select a certification exam to start practicing. Your progress will
            be saved automatically.
          </motion.p>
        </motion.div>

        {/* Exam Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {allExams.map((exam, index) => (
            <motion.div
              key={exam.id}
              variants={fadeInUp}
              custom={index}
              {...cardHover}
            >
              <Link href={`/exam/${exam.id}`}>
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-xl">
                  {/* Gradient Background */}
                  <div
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity"
                    style={{
                      background: `linear-gradient(135deg, ${exam.color || "#4F46E5"} 0%, transparent 100%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative">
                    {/* Icon & Title */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                          style={{
                            backgroundColor: `${exam.color || "#4F46E5"}15`,
                          }}
                        >
                          {exam.icon || "📝"}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {exam.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {exam.category.charAt(0).toUpperCase() +
                              exam.category.slice(1)}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                      {exam.description}
                    </p>

                    {/* Stats */}
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{exam.totalQuestions} questions</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{exam.timeLimit} min</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Target className="h-4 w-4" />
                        <span>{exam.passingScore}% to pass</span>
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {exam.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                        >
                          {topic}
                        </span>
                      ))}
                      {exam.topics.length > 3 && (
                        <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                          +{exam.topics.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Difficulty Badge */}
                    <div className="mt-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          exam.difficulty === "beginner"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : exam.difficulty === "intermediate"
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                        }`}
                      >
                        {exam.difficulty.charAt(0).toUpperCase() +
                          exam.difficulty.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Coming Soon Card */}
          <motion.div variants={fadeInUp}>
            <div className="relative overflow-hidden rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center">
              <div className="flex flex-col items-center justify-center py-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-2xl">
                  ✨
                </div>
                <h3 className="mt-4 font-semibold">More Coming Soon</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-[200px]">
                  We're adding more certification exams. Stay tuned!
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* AI Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className="relative overflow-hidden rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-lg font-semibold">
                  AI Study Assistant Available
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Get instant explanations, hints, and guidance while you
                  practice. Just click the "Ask AI" button during your exam.
                </p>
              </div>
              <motion.div {...buttonTap}>
                <Button
                  variant="outline"
                  className="border-indigo-200 dark:border-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                >
                  Learn More
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

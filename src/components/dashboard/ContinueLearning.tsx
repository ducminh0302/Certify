"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, Play, Trophy } from "lucide-react";
import { cardHover } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface ExamHistoryItem {
  examId: string;
  examName: string;
  score: number;
  passed: boolean;
  completedAt: string;
}

interface ContinueLearningProps {
  lastExam?: ExamHistoryItem | null;
  defaultExam?: {
    id: string;
    name: string;
    totalQuestions: number;
    timeLimit: number;
    icon?: string;
  };
}

export function ContinueLearning({ lastExam, defaultExam }: ContinueLearningProps) {
  const hasHistory = !!lastExam;
  const targetUrl = hasHistory
    ? `/exam/${lastExam.examId}`
    : defaultExam
    ? `/exam/${defaultExam.id}`
    : "/exam/select";

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        {hasHistory ? "Continue Learning" : "Start Learning"}
      </h2>

      <Link href={targetUrl}>
        <motion.div
          {...cardHover}
          className="group relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-6"
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-3xl shadow-lg shadow-indigo-500/25">
              {hasHistory ? (
                lastExam.passed ? (
                  <Trophy className="h-8 w-8 text-white" />
                ) : (
                  <Play className="h-8 w-8 text-white" />
                )
              ) : (
                defaultExam?.icon || "📊"
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {hasHistory
                  ? lastExam.examName
                  : defaultExam?.name || "CFA Level I - Practice Exam"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {hasHistory ? (
                  <span
                    className={cn(
                      "font-medium",
                      lastExam.passed
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-amber-600 dark:text-amber-400"
                    )}
                  >
                    Last score: {lastExam.score}%{" "}
                    {lastExam.passed ? "(Passed)" : "(Try again!)"}
                  </span>
                ) : (
                  "Start your first practice exam"
                )}
              </p>

              {/* Meta info */}
              <div className="mt-3 flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  {defaultExam?.totalQuestions || 20} questions
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {defaultExam?.timeLimit || 45} min
                </span>
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-2 transition-all" />
          </div>

          {/* Progress bar */}
          {hasHistory && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
              <motion.div
                className={cn(
                  "h-full",
                  lastExam.passed ? "bg-emerald-500" : "bg-gradient-to-r from-indigo-500 to-purple-600"
                )}
                initial={{ width: 0 }}
                animate={{ width: `${lastExam.score}%` }}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </div>
          )}

          {/* Pulse effect for new users */}
          {!hasHistory && (
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-primary"
              animate={{
                opacity: [0.5, 0, 0.5],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </motion.div>
      </Link>
    </div>
  );
}

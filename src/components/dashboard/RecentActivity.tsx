"use client";

import { motion } from "framer-motion";
import { CheckCircle, Target, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExamHistoryItem {
  examId: string;
  examName: string;
  completedAt: string;
  score: number;
  passed: boolean;
  timeTaken: number;
  xpEarned: number;
}

interface RecentActivityProps {
  examHistory: ExamHistoryItem[];
  maxItems?: number;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  if (mins > 0) return `${mins}m`;
  return `${seconds}s`;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

export function RecentActivity({
  examHistory,
  maxItems = 5,
}: RecentActivityProps) {
  if (examHistory.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {examHistory.slice(0, maxItems).map((exam, index) => (
          <motion.div
            key={exam.completedAt}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:bg-muted/50 transition-colors"
          >
            {/* Status Icon */}
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full shrink-0",
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

            {/* Exam Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{exam.examName}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                <span>{formatDate(exam.completedAt)}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(exam.timeTaken)}
                </span>
              </div>
            </div>

            {/* Score & XP */}
            <div className="text-right shrink-0">
              <p
                className={cn(
                  "font-bold text-lg",
                  exam.passed
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-amber-600 dark:text-amber-400"
                )}
              >
                {exam.score}%
              </p>
              <p className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                <Zap className="h-3 w-3 text-indigo-500" />
                +{exam.xpEarned} XP
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

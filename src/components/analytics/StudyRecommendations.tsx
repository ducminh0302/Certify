"use client";

import { motion } from "framer-motion";
import {
  Target,
  RefreshCw,
  AlertTriangle,
  Sparkles,
  Clock,
  ChevronRight,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { StudyRecommendation } from "@/types/user";
import { staggerContainerFast, fadeInUp } from "@/lib/animations";

interface StudyRecommendationsProps {
  recommendations: StudyRecommendation[];
  onStartPractice?: (recommendation: StudyRecommendation) => void;
  className?: string;
}

const typeIcons = {
  "weak-topic": AlertTriangle,
  "review-due": RefreshCw,
  "mistake-pattern": Target,
  "new-topic": Sparkles,
};

const priorityColors = {
  high: "border-rose-300 dark:border-rose-700 bg-rose-50/50 dark:bg-rose-900/20",
  medium: "border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-900/20",
  low: "border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-900/20",
};

const priorityIconColors = {
  high: "text-rose-500",
  medium: "text-amber-500",
  low: "text-blue-500",
};

export function StudyRecommendations({
  recommendations,
  onStartPractice,
  className,
}: StudyRecommendationsProps) {
  if (recommendations.length === 0) {
    return (
      <div className={cn("text-center py-8", className)}>
        <Sparkles className="h-12 w-12 mx-auto mb-3 text-emerald-500" />
        <p className="font-medium text-foreground">You're all caught up!</p>
        <p className="text-sm text-muted-foreground mt-1">
          No recommendations right now. Keep practicing!
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainerFast}
      initial="initial"
      animate="animate"
      className={cn("space-y-3", className)}
    >
      {recommendations.map((rec) => {
        const Icon = typeIcons[rec.type];
        return (
          <motion.div
            key={rec.id}
            variants={fadeInUp}
            className={cn(
              "p-4 rounded-xl border-2 transition-all hover:shadow-md",
              priorityColors[rec.priority]
            )}
          >
            <div className="flex items-start gap-3">
              {/* Icon */}
              <div
                className={cn(
                  "flex-shrink-0 p-2 rounded-lg bg-white dark:bg-card shadow-sm",
                  priorityIconColors[rec.priority]
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-foreground">{rec.title}</h4>
                  {rec.priority === "high" && (
                    <span className="px-2 py-0.5 text-xs font-medium bg-rose-500 text-white rounded-full">
                      Priority
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {rec.description}
                </p>

                {/* Meta info */}
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  {rec.questionCount && (
                    <span>{rec.questionCount} questions</span>
                  )}
                  {rec.estimatedTime && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      ~{rec.estimatedTime} min
                    </span>
                  )}
                </div>
              </div>

              {/* Action */}
              {onStartPractice && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onStartPractice(rec)}
                  className="flex-shrink-0"
                >
                  Start
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// Daily progress component
interface DailyProgressProps {
  dailyGoal: number;
  dailyProgress: number;
  streak: number;
  className?: string;
}

export function DailyProgress({
  dailyGoal,
  dailyProgress,
  streak,
  className,
}: DailyProgressProps) {
  const progress = Math.min((dailyProgress / dailyGoal) * 100, 100);
  const isComplete = dailyProgress >= dailyGoal;

  return (
    <div
      className={cn(
        "p-4 rounded-xl border-2 transition-all",
        isComplete
          ? "border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-900/20"
          : "border-border bg-card",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className={cn("h-5 w-5", isComplete ? "text-emerald-500" : "text-primary")} />
          <span className="font-medium">Daily Goal</span>
        </div>
        {streak > 0 && (
          <div className="flex items-center gap-1 text-amber-500">
            <Flame className="h-4 w-4" />
            <span className="text-sm font-medium">{streak} day streak</span>
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full transition-colors",
            isComplete ? "bg-emerald-500" : "bg-primary"
          )}
        />
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mt-2 text-sm">
        <span className="text-muted-foreground">
          {dailyProgress} / {dailyGoal} questions
        </span>
        {isComplete ? (
          <span className="text-emerald-500 font-medium">Goal reached!</span>
        ) : (
          <span className="text-muted-foreground">
            {dailyGoal - dailyProgress} to go
          </span>
        )}
      </div>
    </div>
  );
}

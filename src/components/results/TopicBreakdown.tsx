"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, BookOpen, Target, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface TopicData {
  topic: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
}

interface TopicBreakdownProps {
  topics: TopicData[];
  showRecommendations?: boolean;
}

export function TopicBreakdown({ topics, showRecommendations = true }: TopicBreakdownProps) {
  // Sort by score ascending to show weakest first
  const sortedTopics = [...topics].sort((a, b) => a.score - b.score);
  const weakestTopics = sortedTopics.filter((t) => t.score < 70);
  const strongestTopics = sortedTopics.filter((t) => t.score >= 80);

  const getScoreColor = (score: number) => {
    if (score >= 80) return {
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      text: "text-emerald-700 dark:text-emerald-400",
      progress: "[&>div]:bg-emerald-500",
      border: "border-emerald-200 dark:border-emerald-800",
    };
    if (score >= 60) return {
      bg: "bg-amber-100 dark:bg-amber-900/30",
      text: "text-amber-700 dark:text-amber-400",
      progress: "[&>div]:bg-amber-500",
      border: "border-amber-200 dark:border-amber-800",
    };
    return {
      bg: "bg-rose-100 dark:bg-rose-900/30",
      text: "text-rose-700 dark:text-rose-400",
      progress: "[&>div]:bg-rose-500",
      border: "border-rose-200 dark:border-rose-800",
    };
  };

  const getTrendIcon = (score: number) => {
    if (score >= 80) return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    if (score >= 60) return <Minus className="h-4 w-4 text-amber-500" />;
    return <TrendingDown className="h-4 w-4 text-rose-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Topic Cards */}
      <div className="space-y-3">
        {topics.map((topic, index) => {
          const colors = getScoreColor(topic.score);
          return (
            <motion.div
              key={topic.topic}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "rounded-xl border p-4 transition-all hover:shadow-md",
                colors.border,
                colors.bg
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className={cn("h-4 w-4", colors.text)} />
                  <span className="font-medium">{topic.topic}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getTrendIcon(topic.score)}
                  <span className={cn("font-bold", colors.text)}>
                    {topic.score}%
                  </span>
                </div>
              </div>

              {/* Progress bar with segments */}
              <div className="relative h-3 rounded-full bg-muted/50 overflow-hidden">
                <motion.div
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-full",
                    topic.score >= 80
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                      : topic.score >= 60
                      ? "bg-gradient-to-r from-amber-500 to-orange-500"
                      : "bg-gradient-to-r from-rose-500 to-pink-500"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: `${topic.score}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                />
                {/* Segment markers */}
                <div className="absolute inset-0 flex">
                  {[25, 50, 75].map((mark) => (
                    <div
                      key={mark}
                      className="h-full w-px bg-white/30"
                      style={{ marginLeft: `${mark}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {topic.correctAnswers} / {topic.totalQuestions} correct
                </span>
                <span>
                  {topic.totalQuestions - topic.correctAnswers} to improve
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recommendations */}
      {showRecommendations && weakestTopics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: topics.length * 0.1 }}
          className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-white">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-700 dark:text-amber-400">
                Focus Areas
              </h4>
              <p className="text-sm text-amber-600 dark:text-amber-500 mt-1">
                These topics need more practice:
              </p>
              <ul className="mt-2 space-y-1">
                {weakestTopics.map((topic) => (
                  <li
                    key={topic.topic}
                    className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400"
                  >
                    <Target className="h-3 w-3" />
                    {topic.topic} ({topic.score}%)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Strengths */}
      {showRecommendations && strongestTopics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (topics.length + 1) * 0.1 }}
          className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-4"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-semibold text-emerald-700 dark:text-emerald-400">
                Strong Areas
              </h4>
              <p className="text-sm text-emerald-600 dark:text-emerald-500 mt-1">
                Great performance in:
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {strongestTopics.map((topic) => (
                  <span
                    key={topic.topic}
                    className="inline-flex items-center gap-1 rounded-full bg-emerald-200 dark:bg-emerald-800 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300"
                  >
                    {topic.topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TopicPerformance } from "@/types/user";

interface TopicHeatmapProps {
  topicPerformance: TopicPerformance[];
  onTopicClick?: (topic: string) => void;
  className?: string;
}

// Get color based on accuracy
function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 80) return "bg-emerald-500";
  if (accuracy >= 70) return "bg-emerald-400";
  if (accuracy >= 60) return "bg-yellow-400";
  if (accuracy >= 50) return "bg-orange-400";
  if (accuracy >= 40) return "bg-orange-500";
  return "bg-rose-500";
}

function getAccuracyBgColor(accuracy: number): string {
  if (accuracy >= 80) return "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800";
  if (accuracy >= 70) return "bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900";
  if (accuracy >= 60) return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800";
  if (accuracy >= 50) return "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800";
  if (accuracy >= 40) return "bg-orange-50/50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900";
  return "bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800";
}

function TrendIcon({ trend }: { trend: TopicPerformance["trend"] }) {
  if (trend === "improving") {
    return <TrendingUp className="h-4 w-4 text-emerald-500" />;
  }
  if (trend === "declining") {
    return <TrendingDown className="h-4 w-4 text-rose-500" />;
  }
  return <Minus className="h-4 w-4 text-muted-foreground" />;
}

export function TopicHeatmap({
  topicPerformance,
  onTopicClick,
  className,
}: TopicHeatmapProps) {
  // Sort by accuracy (lowest first to highlight weak areas)
  const sortedTopics = [...topicPerformance].sort(
    (a, b) => a.accuracy - b.accuracy
  );

  if (sortedTopics.length === 0) {
    return (
      <div className={cn("text-center py-8 text-muted-foreground", className)}>
        <Target className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>No performance data yet.</p>
        <p className="text-sm">Start practicing to see your progress!</p>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {sortedTopics.map((topic, index) => (
        <motion.div
          key={topic.topic}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onTopicClick?.(topic.topic)}
          className={cn(
            "group relative p-4 rounded-xl border-2 transition-all cursor-pointer",
            getAccuracyBgColor(topic.accuracy),
            "hover:shadow-md hover:scale-[1.01]"
          )}
        >
          {/* Accuracy bar background */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div
              className={cn(
                "h-full opacity-20 transition-all",
                getAccuracyColor(topic.accuracy)
              )}
              style={{ width: `${topic.accuracy}%` }}
            />
          </div>

          {/* Content */}
          <div className="relative flex items-center justify-between gap-4">
            {/* Topic info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-foreground truncate">
                  {topic.topic}
                </h4>
                <TrendIcon trend={topic.trend} />
              </div>
              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                <span>
                  {topic.correctAnswers}/{topic.totalQuestions} correct
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {Math.round(topic.averageTimeSpent)}s avg
                </span>
              </div>
            </div>

            {/* Accuracy badge */}
            <div
              className={cn(
                "flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center text-white font-bold shadow-lg",
                getAccuracyColor(topic.accuracy)
              )}
            >
              <span className="text-xl">{topic.accuracy}%</span>
              <span className="text-[10px] opacity-80">accuracy</span>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span>80%+</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-yellow-400" />
          <span>60-79%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-orange-500" />
          <span>40-59%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-rose-500" />
          <span>&lt;40%</span>
        </div>
      </div>
    </div>
  );
}

// Compact grid view for dashboard
export function TopicHeatmapGrid({
  topicPerformance,
  onTopicClick,
  className,
}: TopicHeatmapProps) {
  if (topicPerformance.length === 0) {
    return null;
  }

  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2", className)}>
      {topicPerformance.map((topic) => (
        <motion.button
          key={topic.topic}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTopicClick?.(topic.topic)}
          className={cn(
            "p-3 rounded-lg text-center transition-shadow hover:shadow-md",
            getAccuracyBgColor(topic.accuracy),
            "border"
          )}
        >
          <div
            className={cn(
              "text-2xl font-bold",
              topic.accuracy >= 60 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            )}
          >
            {topic.accuracy}%
          </div>
          <div className="text-xs text-muted-foreground truncate mt-1">
            {topic.topic}
          </div>
          <div className="flex justify-center mt-1">
            <TrendIcon trend={topic.trend} />
          </div>
        </motion.button>
      ))}
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Target,
  Lightbulb,
  ChevronRight,
  Clock,
  Brain,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TopicData {
  topic: string;
  score: number;
}

interface StudyRecommendationsProps {
  topics: TopicData[];
  overallScore: number;
  onStartPractice?: () => void;
  onOpenAI?: () => void;
}

interface Recommendation {
  id: string;
  type: "focus" | "reinforce" | "master";
  topic: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  estimatedTime: string;
  tips: string[];
}

export function StudyRecommendations({
  topics,
  overallScore,
  onStartPractice,
  onOpenAI,
}: StudyRecommendationsProps) {
  const [expandedRec, setExpandedRec] = useState<string | null>(null);

  // Generate personalized recommendations based on performance
  const generateRecommendations = (): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    const sortedTopics = [...topics].sort((a, b) => a.score - b.score);

    // Weak topics - need focus
    sortedTopics.filter((t) => t.score < 60).forEach((topic) => {
      recommendations.push({
        id: `focus-${topic.topic}`,
        type: "focus",
        topic: topic.topic,
        title: `Master ${topic.topic}`,
        description: `Your score of ${topic.score}% indicates this topic needs significant attention. Focus on understanding the core concepts.`,
        priority: "high",
        estimatedTime: "30-45 min",
        tips: [
          "Review the fundamental concepts first",
          "Practice with easier questions before moving to harder ones",
          "Use the AI assistant to explain confusing parts",
          "Take notes on key formulas or definitions",
        ],
      });
    });

    // Medium topics - need reinforcement
    sortedTopics.filter((t) => t.score >= 60 && t.score < 80).forEach((topic) => {
      recommendations.push({
        id: `reinforce-${topic.topic}`,
        type: "reinforce",
        topic: topic.topic,
        title: `Strengthen ${topic.topic}`,
        description: `You're on the right track with ${topic.score}%. A bit more practice will solidify your understanding.`,
        priority: "medium",
        estimatedTime: "15-20 min",
        tips: [
          "Focus on the questions you got wrong",
          "Look for patterns in your mistakes",
          "Try explaining concepts in your own words",
        ],
      });
    });

    // Strong topics - maintenance
    const strongTopics = sortedTopics.filter((t) => t.score >= 80);
    if (strongTopics.length > 0) {
      recommendations.push({
        id: "master-strong",
        type: "master",
        topic: strongTopics.map((t) => t.topic).join(", "),
        title: "Maintain Your Strengths",
        description: `Great job on ${strongTopics.map((t) => t.topic).join(", ")}! Keep these skills sharp with occasional review.`,
        priority: "low",
        estimatedTime: "10 min",
        tips: [
          "Do a quick review once a week",
          "Try harder questions to challenge yourself",
          "Help others understand - teaching reinforces learning",
        ],
      });
    }

    return recommendations;
  };

  const recommendations = generateRecommendations();

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "high":
        return {
          bg: "bg-rose-50 dark:bg-rose-900/20",
          border: "border-rose-200 dark:border-rose-800",
          badge: "bg-rose-500",
          icon: "text-rose-500",
        };
      case "medium":
        return {
          bg: "bg-amber-50 dark:bg-amber-900/20",
          border: "border-amber-200 dark:border-amber-800",
          badge: "bg-amber-500",
          icon: "text-amber-500",
        };
      default:
        return {
          bg: "bg-emerald-50 dark:bg-emerald-900/20",
          border: "border-emerald-200 dark:border-emerald-800",
          badge: "bg-emerald-500",
          icon: "text-emerald-500",
        };
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "focus":
        return <Target className="h-5 w-5" />;
      case "reinforce":
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <CheckCircle2 className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <motion.div
          className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-6 w-6 text-white" />
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold">AI Study Recommendations</h3>
          <p className="text-sm text-muted-foreground">
            Personalized tips based on your performance
          </p>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-rose-100 dark:bg-rose-900/30 p-3 text-center"
        >
          <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
            {recommendations.filter((r) => r.priority === "high").length}
          </p>
          <p className="text-xs text-rose-600/80 dark:text-rose-400/80">Focus Areas</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl bg-amber-100 dark:bg-amber-900/30 p-3 text-center"
        >
          <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {recommendations.filter((r) => r.priority === "medium").length}
          </p>
          <p className="text-xs text-amber-600/80 dark:text-amber-400/80">To Reinforce</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl bg-emerald-100 dark:bg-emerald-900/30 p-3 text-center"
        >
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {recommendations.filter((r) => r.priority === "low").length}
          </p>
          <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80">Mastered</p>
        </motion.div>
      </div>

      {/* Recommendations List */}
      <div className="space-y-3">
        {recommendations.map((rec, index) => {
          const styles = getPriorityStyles(rec.priority);
          const isExpanded = expandedRec === rec.id;

          return (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "rounded-xl border transition-all",
                styles.border,
                styles.bg,
                isExpanded && "ring-2 ring-primary/20"
              )}
            >
              <button
                onClick={() => setExpandedRec(isExpanded ? null : rec.id)}
                className="w-full p-4 text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={cn("mt-0.5", styles.icon)}>
                      {getTypeIcon(rec.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{rec.title}</h4>
                        <span
                          className={cn(
                            "text-[10px] font-bold text-white px-1.5 py-0.5 rounded uppercase",
                            styles.badge
                          )}
                        >
                          {rec.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {rec.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{rec.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className={cn(
                      "h-5 w-5 text-muted-foreground transition-transform",
                      isExpanded && "rotate-90"
                    )}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2 border-t border-border/50">
                      <h5 className="text-sm font-medium flex items-center gap-2 mb-2">
                        <Lightbulb className="h-4 w-4 text-amber-500" />
                        Study Tips
                      </h5>
                      <ul className="space-y-2">
                        {rec.tips.map((tip, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-primary mt-1">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {onStartPractice && (
          <Button onClick={onStartPractice} className="gap-2">
            <BookOpen className="h-4 w-4" />
            Start Focused Practice
          </Button>
        )}
        {onOpenAI && (
          <Button onClick={onOpenAI} variant="outline" className="gap-2">
            <Brain className="h-4 w-4" />
            Ask AI for Help
          </Button>
        )}
      </div>
    </div>
  );
}

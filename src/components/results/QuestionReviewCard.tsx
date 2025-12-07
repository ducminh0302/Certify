"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MessageSquare,
  Clock,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface QuestionResult {
  questionId: string;
  questionText: string;
  topic: string;
  isCorrect: boolean;
  userAnswer: {
    questionId: string;
    selectedOption?: string;
    selectedOptions?: string[];
    textResponse?: string;
    answeredAt: Date;
    timeSpent: number;
  } | null;
  correctAnswer: string | string[];
  explanation?: string;
  wasMarked?: boolean;
  options?: Array<{ id: string; label: string; text: string }>;
}

interface QuestionReviewCardProps {
  result: QuestionResult;
  index: number;
  onAskAI?: (question: string) => void;
}

export function QuestionReviewCard({
  result,
  index,
  onAskAI,
}: QuestionReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatTime = (seconds?: number) => {
    if (!seconds) return null;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "rounded-xl border overflow-hidden transition-all",
        result.isCorrect
          ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-900/10"
          : "border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-900/10"
      )}
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 text-left"
      >
        <div className="flex items-start gap-4">
          {/* Status indicator */}
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              result.isCorrect
                ? "bg-emerald-500 text-white"
                : "bg-rose-500 text-white"
            )}
          >
            {result.isCorrect ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
          </div>

          {/* Question info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-muted-foreground">
                  Q{index + 1}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {result.topic}
                </Badge>
                {result.wasMarked && (
                  <Badge variant="outline" className="text-xs gap-1">
                    <Flag className="h-3 w-3" />
                    Marked
                  </Badge>
                )}
              </div>
              {result.userAnswer?.timeSpent && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(result.userAnswer.timeSpent)}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm font-medium line-clamp-2">
              {result.questionText}
            </p>
          </div>

          {/* Expand indicator */}
          <div className="shrink-0">
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-border/50 pt-4">
              {/* Options display (if available) */}
              {result.options && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Answer Options:
                  </p>
                  <div className="grid gap-2">
                    {result.options.map((option) => {
                      const isUserAnswer =
                        result.userAnswer?.selectedOption === option.id ||
                        result.userAnswer?.selectedOptions?.includes(option.id);
                      const correctAnswerArr = Array.isArray(result.correctAnswer)
                        ? result.correctAnswer
                        : [result.correctAnswer];
                      const isCorrectAnswer = correctAnswerArr.includes(option.id);

                      return (
                        <div
                          key={option.id}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm border",
                            isCorrectAnswer &&
                              "bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700",
                            isUserAnswer &&
                              !isCorrectAnswer &&
                              "bg-rose-100 dark:bg-rose-900/30 border-rose-300 dark:border-rose-700",
                            !isCorrectAnswer &&
                              !isUserAnswer &&
                              "bg-muted/30 border-transparent"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium",
                              isCorrectAnswer &&
                                "bg-emerald-500 text-white",
                              isUserAnswer &&
                                !isCorrectAnswer &&
                                "bg-rose-500 text-white",
                              !isCorrectAnswer &&
                                !isUserAnswer &&
                                "bg-muted"
                            )}
                          >
                            {option.label}
                          </span>
                          <span className="flex-1">{option.text}</span>
                          {isCorrectAnswer && (
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                          )}
                          {isUserAnswer && !isCorrectAnswer && (
                            <XCircle className="h-4 w-4 text-rose-500" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Simple answer display (if no options) */}
              {!result.options && (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1">
                      Your Answer:
                    </p>
                    <p
                      className={cn(
                        "text-sm font-medium",
                        result.isCorrect
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-rose-700 dark:text-rose-400"
                      )}
                    >
                      {result.userAnswer?.selectedOption || "Not answered"}
                    </p>
                  </div>

                  {!result.isCorrect && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        Correct Answer:
                      </p>
                      <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                        {Array.isArray(result.correctAnswer)
                          ? result.correctAnswer.join(", ")
                          : result.correctAnswer}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Explanation */}
              {result.explanation && (
                <div className="rounded-lg bg-muted/50 p-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">
                    Explanation:
                  </p>
                  <p className="text-sm text-foreground/80">
                    {result.explanation}
                  </p>
                </div>
              )}

              {/* AI Help button */}
              {onAskAI && (
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2"
                    onClick={() => {
                      const correctAns = Array.isArray(result.correctAnswer)
                        ? result.correctAnswer.join(", ")
                        : result.correctAnswer;
                      onAskAI(
                        `Please explain this question in detail: "${result.questionText}". The correct answer is ${correctAns}.`
                      );
                    }}
                  >
                    <Sparkles className="h-3 w-3" />
                    Explain with AI
                  </Button>
                  {!result.isCorrect && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2"
                      onClick={() => {
                        const correctAns = Array.isArray(result.correctAnswer)
                          ? result.correctAnswer.join(", ")
                          : result.correctAnswer;
                        const userAns = result.userAnswer?.selectedOption ||
                          result.userAnswer?.selectedOptions?.join(", ") ||
                          "nothing";
                        onAskAI(
                          `I answered "${userAns}" but the correct answer was "${correctAns}". Can you explain why my answer was wrong for this question: "${result.questionText}"?`
                        );
                      }}
                    >
                      <MessageSquare className="h-3 w-3" />
                      Why was I wrong?
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// Filter tabs component
interface FilterTabsProps {
  filter: "all" | "correct" | "incorrect";
  onFilterChange: (filter: "all" | "correct" | "incorrect") => void;
  counts: { all: number; correct: number; incorrect: number };
}

export function FilterTabs({ filter, onFilterChange, counts }: FilterTabsProps) {
  const tabs = [
    { id: "all" as const, label: "All", count: counts.all },
    { id: "correct" as const, label: "Correct", count: counts.correct },
    { id: "incorrect" as const, label: "Incorrect", count: counts.incorrect },
  ];

  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onFilterChange(tab.id)}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
            filter === tab.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted hover:bg-muted/80"
          )}
        >
          {tab.label}
          <span
            className={cn(
              "rounded-full px-1.5 text-xs",
              filter === tab.id
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-muted-foreground/20 text-muted-foreground"
            )}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}

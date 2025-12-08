"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Zap,
  X,
  ChevronRight,
  RefreshCw,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { QuestionDifficulty, FocusModeConfig } from "@/types/user";
import { CFA_TOPICS } from "@/types/user";

interface FocusModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (config: FocusModeConfig) => void;
  weakTopics: string[];
  reviewCount: number;
}

const difficultyOptions: { value: QuestionDifficulty | "all"; label: string; description: string }[] = [
  { value: "all", label: "Mixed", description: "All difficulty levels" },
  { value: "easy", label: "Easy", description: "Build confidence" },
  { value: "medium", label: "Medium", description: "Standard exam level" },
  { value: "hard", label: "Hard", description: "Challenge yourself" },
];

const questionCountOptions = [5, 10, 15, 20, 30];

export function FocusModeModal({
  isOpen,
  onClose,
  onStart,
  weakTopics,
  reviewCount,
}: FocusModeModalProps) {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(weakTopics.slice(0, 3));
  const [difficulty, setDifficulty] = useState<QuestionDifficulty | "all">("all");
  const [questionCount, setQuestionCount] = useState(10);
  const [includeReview, setIncludeReview] = useState(true);

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const handleStart = () => {
    const config: FocusModeConfig = {
      enabled: true,
      targetTopics: selectedTopics,
      difficulty: difficulty === "all" ? undefined : difficulty,
      questionCount,
      includeReviewItems: includeReview,
    };
    onStart(config);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-card rounded-2xl shadow-xl border overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Focus Mode</h2>
                  <p className="text-sm text-white/80">
                    Practice your weak areas
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-white hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-6 max-h-[60vh] overflow-y-auto">
              {/* Topic Selection */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  Select Topics to Focus On
                </h3>
                <div className="flex flex-wrap gap-2">
                  {CFA_TOPICS.map((topic) => {
                    const isSelected = selectedTopics.includes(topic);
                    const isWeak = weakTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-sm transition-all border",
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted hover:bg-muted/80 border-transparent",
                          isWeak && !isSelected && "border-rose-300 dark:border-rose-700"
                        )}
                      >
                        {topic}
                        {isWeak && !isSelected && (
                          <span className="ml-1 text-rose-500">•</span>
                        )}
                      </button>
                    );
                  })}
                </div>
                {weakTopics.length > 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    <span className="text-rose-500">•</span> indicates weak areas
                  </p>
                )}
              </div>

              {/* Difficulty Selection */}
              <div>
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-muted-foreground" />
                  Difficulty Level
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {difficultyOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setDifficulty(option.value)}
                      className={cn(
                        "p-3 rounded-lg text-center transition-all border",
                        difficulty === option.value
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted hover:bg-muted/80 border-transparent"
                      )}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs opacity-70">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question Count */}
              <div>
                <h3 className="text-sm font-medium mb-3">Number of Questions</h3>
                <div className="flex flex-wrap gap-2">
                  {questionCountOptions.map((count) => (
                    <button
                      key={count}
                      onClick={() => setQuestionCount(count)}
                      className={cn(
                        "w-14 py-2 rounded-lg text-center transition-all border",
                        questionCount === count
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted hover:bg-muted/80 border-transparent"
                      )}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              {/* Include Review Items */}
              {reviewCount > 0 && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Include Review Items</div>
                      <div className="text-sm text-muted-foreground">
                        {reviewCount} questions due for review
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIncludeReview(!includeReview)}
                    className={cn(
                      "w-12 h-6 rounded-full transition-colors relative",
                      includeReview ? "bg-primary" : "bg-muted-foreground/30"
                    )}
                  >
                    <motion.div
                      animate={{ x: includeReview ? 24 : 2 }}
                      className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {selectedTopics.length === 0 ? (
                    "Select at least one topic"
                  ) : (
                    `${selectedTopics.length} topic(s), ${questionCount} questions`
                  )}
                </div>
                <Button
                  onClick={handleStart}
                  disabled={selectedTopics.length === 0}
                  className="gap-2"
                >
                  Start Focus Session
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Quick Focus Mode button
interface FocusModeButtonProps {
  onClick: () => void;
  weakTopicsCount: number;
  className?: string;
}

export function FocusModeButton({
  onClick,
  weakTopicsCount,
  className,
}: FocusModeButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "w-full p-4 rounded-xl border-2 border-dashed transition-all",
        "border-indigo-300 dark:border-indigo-700",
        "bg-indigo-50/50 dark:bg-indigo-900/20",
        "hover:border-indigo-400 dark:hover:border-indigo-600",
        "hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-center gap-3">
        <div className="p-2 bg-indigo-500 rounded-lg text-white">
          <Target className="h-5 w-5" />
        </div>
        <div className="text-left">
          <div className="font-semibold text-indigo-700 dark:text-indigo-300">
            Start Focus Mode
          </div>
          <div className="text-sm text-muted-foreground">
            {weakTopicsCount > 0
              ? `Practice ${weakTopicsCount} weak topic(s)`
              : "Customize your practice session"}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-indigo-500 ml-auto" />
      </div>
    </motion.button>
  );
}

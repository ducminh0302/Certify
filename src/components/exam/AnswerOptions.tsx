"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, answerOptionVariants } from "@/lib/animations";
import type { Option } from "@/types/exam";

interface AnswerOptionsProps {
  options: Option[];
  selectedAnswer?: string;
  correctAnswer?: string;
  showFeedback?: boolean;
  disabled?: boolean;
  onSelect: (optionId: string) => void;
}

export function AnswerOptions({
  options,
  selectedAnswer,
  correctAnswer,
  showFeedback = false,
  disabled = false,
  onSelect,
}: AnswerOptionsProps) {
  const getOptionState = (optionId: string) => {
    if (!showFeedback) {
      return selectedAnswer === optionId ? "selected" : "default";
    }

    if (optionId === correctAnswer) {
      return "correct";
    }

    if (selectedAnswer === optionId && optionId !== correctAnswer) {
      return "incorrect";
    }

    return "default";
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-3"
    >
      {options.map((option, index) => {
        const state = getOptionState(option.id);
        const isSelected = selectedAnswer === option.id;
        const isCorrect = state === "correct";
        const isIncorrect = state === "incorrect";

        return (
          <motion.button
            key={option.id}
            variants={answerOptionVariants}
            custom={index}
            whileHover={!disabled && !showFeedback ? "hover" : undefined}
            whileTap={!disabled && !showFeedback ? "tap" : undefined}
            animate={
              showFeedback && isSelected
                ? isCorrect
                  ? "correct"
                  : "incorrect"
                : undefined
            }
            onClick={() => !disabled && onSelect(option.id)}
            disabled={disabled}
            className={cn(
              "group relative w-full rounded-xl border-2 p-4 text-left transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",

              // Default state
              !isSelected &&
                !showFeedback &&
                "border-border bg-card hover:border-primary/50 hover:bg-primary/5 hover:shadow-md",

              // Selected state (before feedback)
              isSelected &&
                !showFeedback &&
                "border-primary bg-primary/10 shadow-md shadow-primary/10",

              // Correct state
              isCorrect &&
                "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20",

              // Incorrect state
              isIncorrect && "border-rose-500 bg-rose-50 dark:bg-rose-900/20",

              // Disabled
              disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {/* Option content */}
            <div className="flex items-start gap-4">
              {/* Option label circle */}
              <motion.div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-200",

                  // Default
                  !isSelected &&
                    !showFeedback &&
                    "bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-white",

                  // Selected
                  isSelected &&
                    !showFeedback &&
                    "bg-primary text-white shadow-lg shadow-primary/30",

                  // Correct
                  isCorrect && "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30",

                  // Incorrect
                  isIncorrect && "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                )}
                animate={
                  showFeedback && isSelected
                    ? {
                        scale: [1, 1.2, 1],
                        transition: { duration: 0.3 },
                      }
                    : undefined
                }
              >
                {showFeedback && isCorrect ? (
                  <Check className="h-5 w-5" />
                ) : showFeedback && isIncorrect ? (
                  <X className="h-5 w-5" />
                ) : (
                  option.label
                )}
              </motion.div>

              {/* Option text */}
              <div className="flex-1 pt-2">
                <p
                  className={cn(
                    "text-base leading-relaxed transition-colors duration-200",
                    !isSelected && !showFeedback && "text-foreground",
                    isSelected && !showFeedback && "text-primary font-medium",
                    isCorrect && "text-emerald-700 dark:text-emerald-300 font-medium",
                    isIncorrect && "text-rose-700 dark:text-rose-300"
                  )}
                >
                  {option.text}
                </p>
              </div>

              {/* Selection indicator */}
              <AnimatePresence>
                {isSelected && !showFeedback && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <div className="h-3 w-3 rounded-full bg-primary shadow-lg shadow-primary/50" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hover glow effect (Brilliant-style) */}
            {!disabled && !showFeedback && (
              <motion.div
                className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-pink-500/0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-30"
                style={{ transform: "scale(1.1)" }}
              />
            )}

            {/* Success glow */}
            {isCorrect && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 -z-10 rounded-xl bg-emerald-500/20 blur-xl"
                style={{ transform: "scale(1.1)" }}
              />
            )}
          </motion.button>
        );
      })}
    </motion.div>
  );
}

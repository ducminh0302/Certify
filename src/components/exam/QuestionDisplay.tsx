"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Question } from "@/types/exam";

interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  isMarked?: boolean;
}

export function QuestionDisplay({
  question,
  questionNumber,
  totalQuestions,
  isMarked,
}: QuestionDisplayProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      case "intermediate":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "advanced":
        return "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.id}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        exit="exit"
        className="space-y-6"
      >
        {/* Question Header */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap items-center gap-3"
        >
          {/* Question Number Badge */}
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-md">
              {questionNumber}
            </span>
            <span className="text-sm text-muted-foreground">
              of {totalQuestions}
            </span>
          </div>

          {/* Topic Badge */}
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary hover:bg-primary/20"
          >
            {question.topic}
          </Badge>

          {/* Difficulty Badge */}
          <Badge
            variant="secondary"
            className={cn(getDifficultyColor(question.difficulty))}
          >
            {question.difficulty.charAt(0).toUpperCase() +
              question.difficulty.slice(1)}
          </Badge>

          {/* Marked for Review */}
          {isMarked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
            >
              <svg
                className="h-3 w-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Marked
            </motion.div>
          )}
        </motion.div>

        {/* Question Text */}
        <motion.div
          variants={fadeInUp}
          className="relative"
        >
          {/* Decorative gradient line */}
          <div className="absolute -left-4 top-0 h-full w-1 rounded-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 opacity-50" />

          <div className="rounded-2xl bg-card p-6 shadow-sm border border-border/50">
            <p className="text-lg leading-relaxed text-foreground">
              {question.text}
            </p>

            {/* Item Set Stem (if applicable) */}
            {question.type === "item-set" && question.stem && (
              <motion.div
                variants={fadeInUp}
                className="mt-6 rounded-xl bg-muted/50 p-4 border border-border/30"
              >
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Case Study:
                </p>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {question.stem}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Visual Interest - Floating Elements (Brilliant-style) */}
        <motion.div
          className="pointer-events-none absolute -right-20 top-20 h-40 w-40 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

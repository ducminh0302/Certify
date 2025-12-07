"use client";

import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  RotateCcw,
  Send,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { buttonTap, buttonTapSubtle } from "@/lib/animations";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ExamControlsProps {
  currentQuestion: number;
  totalQuestions: number;
  isMarked: boolean;
  hasAnswer: boolean;
  showFeedback: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onToggleMark: () => void;
  onClearAnswer: () => void;
  onSubmitExam: () => void;
  onOpenAI: () => void;
}

export function ExamControls({
  currentQuestion,
  totalQuestions,
  isMarked,
  hasAnswer,
  showFeedback,
  onPrevious,
  onNext,
  onToggleMark,
  onClearAnswer,
  onSubmitExam,
  onOpenAI,
}: ExamControlsProps) {
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Left Actions */}
      <div className="flex items-center gap-2">
        <TooltipProvider delayDuration={300}>
          {/* Mark for Review */}
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div {...buttonTapSubtle}>
                <Button
                  variant={isMarked ? "default" : "outline"}
                  size="sm"
                  onClick={onToggleMark}
                  className={cn(
                    "gap-2 transition-all duration-200",
                    isMarked &&
                      "bg-amber-500 hover:bg-amber-600 text-white border-amber-500"
                  )}
                >
                  <Flag
                    className={cn(
                      "h-4 w-4 transition-transform",
                      isMarked && "fill-current"
                    )}
                  />
                  <span className="hidden sm:inline">
                    {isMarked ? "Marked" : "Mark for Review"}
                  </span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isMarked ? "Remove mark" : "Mark to review later"}</p>
            </TooltipContent>
          </Tooltip>

          {/* Clear Answer */}
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div {...buttonTapSubtle}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onClearAnswer}
                  disabled={!hasAnswer || showFeedback}
                  className="gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span className="hidden sm:inline">Clear</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear your answer</p>
            </TooltipContent>
          </Tooltip>

          {/* AI Assistant Button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div {...buttonTap}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onOpenAI}
                  className="gap-2 border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:border-indigo-300 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-900"
                >
                  <Sparkles className="h-4 w-4" />
                  <span className="hidden sm:inline">Ask AI</span>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open AI Study Assistant</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-2">
        {/* Previous */}
        <motion.div {...buttonTapSubtle}>
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirstQuestion}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </Button>
        </motion.div>

        {/* Question indicator */}
        <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-muted">
          <span className="font-semibold text-primary">
            {currentQuestion + 1}
          </span>
          <span className="text-muted-foreground">/</span>
          <span className="text-muted-foreground">{totalQuestions}</span>
        </div>

        {/* Next / Submit */}
        {isLastQuestion ? (
          <motion.div {...buttonTap}>
            <Button
              onClick={onSubmitExam}
              className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg shadow-emerald-500/25"
            >
              <Send className="h-4 w-4" />
              Submit Exam
            </Button>
          </motion.div>
        ) : (
          <motion.div {...buttonTapSubtle}>
            <Button onClick={onNext} className="gap-2">
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Keyboard shortcut hints component
export function KeyboardHints() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="hidden lg:flex items-center justify-center gap-6 text-xs text-muted-foreground border-t border-border pt-4 mt-4"
    >
      <div className="flex items-center gap-2">
        <kbd className="px-2 py-1 rounded bg-muted font-mono">←</kbd>
        <span>Previous</span>
      </div>
      <div className="flex items-center gap-2">
        <kbd className="px-2 py-1 rounded bg-muted font-mono">→</kbd>
        <span>Next</span>
      </div>
      <div className="flex items-center gap-2">
        <kbd className="px-2 py-1 rounded bg-muted font-mono">1-4</kbd>
        <span>Select answer</span>
      </div>
      <div className="flex items-center gap-2">
        <kbd className="px-2 py-1 rounded bg-muted font-mono">M</kbd>
        <span>Mark for review</span>
      </div>
      <div className="flex items-center gap-2">
        <kbd className="px-2 py-1 rounded bg-muted font-mono">A</kbd>
        <span>AI Assistant</span>
      </div>
    </motion.div>
  );
}

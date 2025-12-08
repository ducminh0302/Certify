"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Flag, Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { staggerContainerFast, fadeInUp, buttonTapSubtle } from "@/lib/animations";
import type { QuestionStatus } from "@/types/exam";

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentQuestion: number;
  questionStatuses: Map<number, QuestionStatus>;
  isCollapsed?: boolean;
  onToggle: () => void;
  onNavigate: (questionIndex: number) => void;
  structure?: "standalone" | "case-study";
  cases?: { id: string; title?: string; questionCount: number }[];
}

export function QuestionNavigator({
  totalQuestions,
  currentQuestion,
  questionStatuses,
  isCollapsed = false,
  onToggle,
  onNavigate,
  cases,
}: QuestionNavigatorProps) {
  const getStatusStyles = (index: number) => {
    const status = questionStatuses.get(index) || "unanswered";
    const isCurrent = index === currentQuestion;

    if (isCurrent) {
      return {
        bg: "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30",
        text: "text-white font-bold",
        ring: "ring-2 ring-indigo-300 dark:ring-indigo-400",
        icon: null,
      };
    }

    switch (status) {
      case "answered":
        return {
          bg: "bg-emerald-100 dark:bg-emerald-900/30 hover:bg-emerald-200 dark:hover:bg-emerald-900/50",
          text: "text-emerald-700 dark:text-emerald-400",
          ring: "",
          icon: <Check className="h-3 w-3" />,
        };
      case "correct":
        return {
          bg: "bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50",
          text: "text-green-700 dark:text-green-400",
          ring: "ring-1 ring-green-500",
          icon: <Check className="h-3 w-3" />,
        };
      case "incorrect":
        return {
          bg: "bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50",
          text: "text-red-700 dark:text-red-400",
          ring: "ring-1 ring-red-500",
          icon: <span className="text-xs font-bold">✕</span>,
        };
      case "marked":
        return {
          bg: "bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50",
          text: "text-amber-700 dark:text-amber-400",
          ring: "",
          icon: <Flag className="h-3 w-3" />,
        };
      case "answered-marked":
        return {
          bg: "bg-gradient-to-br from-emerald-100 to-amber-100 dark:from-emerald-900/30 dark:to-amber-900/30",
          text: "text-emerald-700 dark:text-emerald-400",
          ring: "ring-2 ring-amber-400",
          icon: <Check className="h-3 w-3" />,
        };
      case "correct-marked":
        return {
          bg: "bg-gradient-to-br from-green-100 to-amber-100 dark:from-green-900/30 dark:to-amber-900/30",
          text: "text-green-700 dark:text-green-400",
          ring: "ring-2 ring-amber-400",
          icon: <Check className="h-3 w-3" />,
        };
      case "incorrect-marked":
        return {
          bg: "bg-gradient-to-br from-red-100 to-amber-100 dark:from-red-900/30 dark:to-amber-900/30",
          text: "text-red-700 dark:text-red-400",
          ring: "ring-2 ring-amber-400",
          icon: <span className="text-xs font-bold">✕</span>,
        };
      default:
        return {
          bg: "bg-muted hover:bg-muted/80",
          text: "text-muted-foreground",
          ring: "",
          icon: null,
        };
    }
  };

  // Calculate stats
  const answered = Array.from(questionStatuses.values()).filter(
    (s) =>
      s === "answered" ||
      s === "answered-marked" ||
      s === "correct" ||
      s === "incorrect" ||
      s === "correct-marked" ||
      s === "incorrect-marked"
  ).length;
  const marked = Array.from(questionStatuses.values()).filter(
    (s) =>
      s === "marked" ||
      s === "answered-marked" ||
      s === "correct-marked" ||
      s === "incorrect-marked"
  ).length;

  return (
    <AnimatePresence mode="wait">
      {isCollapsed ? (
        // Collapsed State - Just a button
        <motion.div
          key="collapsed"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={onToggle}
            className="h-10 w-10 rounded-full shadow-md"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </motion.div>
      ) : (
        // Expanded State
        <motion.div
          key="expanded"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-72 rounded-2xl border border-border bg-card shadow-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border p-4">
            <h3 className="font-semibold text-sm">Question Navigator</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 border-b border-border p-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center rounded-lg bg-muted/50 p-2"
            >
              <span className="text-lg font-bold text-foreground">
                {answered}
              </span>
              <span className="text-xs text-muted-foreground">Answered</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center rounded-lg bg-muted/50 p-2"
            >
              <span className="text-lg font-bold text-amber-600 dark:text-amber-400">
                {marked}
              </span>
              <span className="text-xs text-muted-foreground">Marked</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center rounded-lg bg-muted/50 p-2"
            >
              <span className="text-lg font-bold text-foreground">
                {totalQuestions - answered}
              </span>
              <span className="text-xs text-muted-foreground">Left</span>
            </motion.div>
          </div>

          {cases ? (
            <ScrollArea className="h-80">
              <div className="flex flex-col gap-2 p-3">
                {(() => {
                  let runningIndex = 0;
                  return cases.map((caseItem, caseIdx) => {
                    const startIndex = runningIndex;
                    const endIndex = startIndex + caseItem.questionCount;
                    const isCurrentCase =
                      currentQuestion >= startIndex && currentQuestion < endIndex;
                    runningIndex += caseItem.questionCount;

                    return (
                      <motion.div
                        key={caseItem.id || caseIdx}
                        variants={fadeInUp}
                        className={cn(
                          "flex items-center gap-2 rounded-lg border p-1.5 transition-all duration-300",
                          isCurrentCase
                            ? "border-indigo-200 bg-indigo-50/50 dark:border-indigo-800 dark:bg-indigo-900/10 shadow-sm"
                            : "border-transparent hover:bg-muted/30"
                        )}
                      >
                        {/* Question Grid (Fixed 4 columns) */}
                        <div className="grid grid-cols-4 gap-1.5">
                          {Array.from(
                            { length: caseItem.questionCount },
                            (_, i) => {
                              const globalIndex = startIndex + i;
                              const styles = getStatusStyles(globalIndex);
                              const isCurrent = globalIndex === currentQuestion;

                              return (
                                <motion.button
                                  key={globalIndex}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => onNavigate(globalIndex)}
                                  className={cn(
                                    "relative flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium transition-all duration-200",
                                    styles.bg,
                                    styles.text,
                                    styles.ring,
                                    "focus:outline-none"
                                  )}
                                >
                                  <span className={cn(isCurrent && "font-bold")}>
                                    {globalIndex + 1}
                                  </span>

                                  {/* Status indicators */}
                                  {styles.icon && !isCurrent && (
                                    <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-background">
                                      {styles.icon}
                                    </span>
                                  )}
                                </motion.button>
                              );
                            }
                          )}
                        </div>

                        {/* Case Info Side Panel - Compact & Vertical */}
                        <div className="flex min-w-[60px] flex-1 flex-col items-center justify-center border-l border-border/50 pl-2">
                          <span
                            className={cn(
                              "text-[10px] font-black uppercase tracking-wider",
                              isCurrentCase
                                ? "text-indigo-600 dark:text-indigo-400"
                                : "text-muted-foreground/70"
                            )}
                          >
                            Case
                          </span>
                          <span
                            className={cn(
                              "text-lg font-bold leading-none",
                              isCurrentCase
                                ? "text-indigo-600 dark:text-indigo-400"
                                : "text-muted-foreground/70"
                            )}
                          >
                            {caseIdx + 1}
                          </span>
                        </div>
                      </motion.div>
                    );
                  });
                })()}
              </div>
            </ScrollArea>
          ) : (
            /* Standard Grid */
            <ScrollArea className="h-80">
              <motion.div
                variants={staggerContainerFast}
                initial="initial"
                animate="animate"
                className="grid grid-cols-5 gap-2 p-4"
              >
                {Array.from({ length: totalQuestions }, (_, i) => {
                  const styles = getStatusStyles(i);
                  const isCurrent = i === currentQuestion;

                  return (
                    <motion.button
                      key={i}
                      variants={fadeInUp}
                      {...buttonTapSubtle}
                      onClick={() => onNavigate(i)}
                      className={cn(
                        "relative flex h-10 w-10 items-center justify-center rounded-lg text-sm transition-all duration-200",
                        styles.bg,
                        styles.text,
                        styles.ring,
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      )}
                    >
                      {/* Question number */}
                      <span className={cn(isCurrent && "font-bold")}>
                        {i + 1}
                      </span>

                      {/* Status icon */}
                      {styles.icon && !isCurrent && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-sm"
                        >
                          {styles.icon}
                        </motion.span>
                      )}

                      {/* Current indicator pulse */}
                      {isCurrent && (
                        <motion.div
                          className="absolute inset-0 rounded-lg bg-indigo-500"
                          animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.3, 0, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </ScrollArea>
          )}

          {/* Legend */}
          <div className="border-t border-border p-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-gradient-to-br from-indigo-500 to-purple-600" />
                <span className="text-muted-foreground">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-green-100 dark:bg-green-900/30 ring-1 ring-green-500" />
                <span className="text-muted-foreground">Correct</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-red-100 dark:bg-red-900/30 ring-1 ring-red-500" />
                <span className="text-muted-foreground">Incorrect</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-amber-100 dark:bg-amber-900/30" />
                <span className="text-muted-foreground">Marked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-muted" />
                <span className="text-muted-foreground">Unanswered</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

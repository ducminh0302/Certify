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
}

export function QuestionNavigator({
  totalQuestions,
  currentQuestion,
  questionStatuses,
  isCollapsed = false,
  onToggle,
  onNavigate,
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
    (s) => s === "answered" || s === "answered-marked"
  ).length;
  const marked = Array.from(questionStatuses.values()).filter(
    (s) => s === "marked" || s === "answered-marked"
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
          className="w-64 rounded-2xl border border-border bg-card shadow-lg"
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

          {/* Question Grid */}
          <ScrollArea className="h-80 p-3">
            <motion.div
              variants={staggerContainerFast}
              initial="initial"
              animate="animate"
              className="grid grid-cols-5 gap-2"
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

          {/* Legend */}
          <div className="border-t border-border p-3">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-gradient-to-br from-indigo-500 to-purple-600" />
                <span className="text-muted-foreground">Current</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded bg-emerald-100 dark:bg-emerald-900/30" />
                <span className="text-muted-foreground">Answered</span>
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

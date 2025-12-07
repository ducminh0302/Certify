"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Lightbulb, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { scaleInBouncy, fadeInUp } from "@/lib/animations";
import confetti from "canvas-confetti";

interface AnswerFeedbackProps {
  isCorrect: boolean;
  isVisible: boolean;
  explanation?: string;
  correctAnswer?: string;
  onContinue: () => void;
  onAskAI?: () => void;
}

export function AnswerFeedback({
  isCorrect,
  isVisible,
  explanation,
  correctAnswer,
  onContinue,
  onAskAI,
}: AnswerFeedbackProps) {
  // Trigger confetti on correct answer
  useEffect(() => {
    if (isVisible && isCorrect) {
      const duration = 800;
      const end = Date.now() + duration;

      const colors = ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0"];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: colors,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  }, [isVisible, isCorrect]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="mt-6"
        >
          {/* Feedback Card */}
          <motion.div
            variants={scaleInBouncy}
            initial="initial"
            animate="animate"
            className={cn(
              "relative overflow-hidden rounded-2xl border-2 p-6",
              isCorrect
                ? "border-emerald-500/50 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20"
                : "border-rose-500/50 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20"
            )}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className={cn(
                  "absolute inset-0",
                  isCorrect
                    ? "bg-[radial-gradient(circle_at_30%_30%,#10B981_0%,transparent_50%)]"
                    : "bg-[radial-gradient(circle_at_30%_30%,#F43F5E_0%,transparent_50%)]"
                )}
              />
            </div>

            {/* Content */}
            <div className="relative space-y-4">
              {/* Header */}
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-3"
              >
                {/* Icon */}
                <motion.div
                  animate={
                    isCorrect
                      ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, 10, -10, 0],
                        }
                      : {
                          x: [0, -5, 5, -5, 5, 0],
                        }
                  }
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full",
                    isCorrect
                      ? "bg-emerald-500 shadow-lg shadow-emerald-500/30"
                      : "bg-rose-500 shadow-lg shadow-rose-500/30"
                  )}
                >
                  {isCorrect ? (
                    <Check className="h-6 w-6 text-white" />
                  ) : (
                    <X className="h-6 w-6 text-white" />
                  )}
                </motion.div>

                {/* Title */}
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className={cn(
                      "text-xl font-bold",
                      isCorrect
                        ? "text-emerald-700 dark:text-emerald-300"
                        : "text-rose-700 dark:text-rose-300"
                    )}
                  >
                    {isCorrect ? "Excellent!" : "Not quite right"}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm text-muted-foreground"
                  >
                    {isCorrect
                      ? "You got it! Keep up the great work."
                      : "Don't worry, learning from mistakes is part of the process."}
                  </motion.p>
                </div>
              </motion.div>

              {/* Explanation */}
              {explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl bg-white/50 dark:bg-black/20 p-4"
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">
                        Explanation
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {explanation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Correct Answer (if wrong) */}
              {!isCorrect && correctAnswer && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="rounded-xl bg-emerald-100/50 dark:bg-emerald-900/20 p-3 border border-emerald-200 dark:border-emerald-800"
                >
                  <p className="text-sm">
                    <span className="font-medium text-emerald-700 dark:text-emerald-400">
                      Correct Answer:{" "}
                    </span>
                    <span className="text-foreground">{correctAnswer}</span>
                  </p>
                </motion.div>
              )}

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <Button
                  onClick={onContinue}
                  className={cn(
                    "gap-2",
                    isCorrect
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "bg-primary hover:bg-primary/90"
                  )}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>

                {onAskAI && !isCorrect && (
                  <Button
                    variant="outline"
                    onClick={onAskAI}
                    className="gap-2 border-primary/50 hover:bg-primary/10"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                      <path d="M12 6a3.5 3.5 0 0 0-3.5 3.5 1 1 0 0 0 2 0A1.5 1.5 0 1 1 12 11a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.16A3.49 3.49 0 0 0 12 6z" />
                      <circle cx="12" cy="17" r="1" />
                    </svg>
                    Ask AI to explain
                  </Button>
                )}
              </motion.div>
            </div>

            {/* Decorative Elements */}
            {isCorrect && (
              <>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500"
                />
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.05 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-teal-500"
                />
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

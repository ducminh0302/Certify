"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ThemeToggleCompact } from "@/components/layout/ThemeToggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface ExamHeaderProps {
  examName: string;
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining: number; // in seconds
  onExit: () => void;
  onTick: () => void;
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

export function ExamHeader({
  examName,
  currentQuestion,
  totalQuestions,
  timeRemaining,
  onExit,
  onTick,
}: ExamHeaderProps) {
  const [showExitDialog, setShowExitDialog] = useState(false);
  const progress = ((currentQuestion) / totalQuestions) * 100;
  const isLowTime = timeRemaining <= 300; // 5 minutes
  const isCriticalTime = timeRemaining <= 60; // 1 minute

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      onTick();
    }, 1000);

    return () => clearInterval(interval);
  }, [onTick]);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          {/* Left section - Exit & Exam Name */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowExitDialog(true)}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Exit Exam</span>
            </Button>
            <div className="hidden md:block">
              <h1 className="text-sm font-semibold">{examName}</h1>
            </div>
          </div>

          {/* Center section - Timer & Progress */}
          <div className="flex items-center gap-6">
            {/* Timer */}
            <motion.div
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-1.5",
                isCriticalTime && "bg-error/10 text-error",
                isLowTime && !isCriticalTime && "bg-warning/10 text-warning",
                !isLowTime && "bg-muted"
              )}
              animate={
                isCriticalTime
                  ? {
                      scale: [1, 1.02, 1],
                    }
                  : {}
              }
              transition={{
                duration: 1,
                repeat: isCriticalTime ? Infinity : 0,
              }}
            >
              <Clock
                className={cn(
                  "h-4 w-4",
                  isCriticalTime && "animate-pulse"
                )}
              />
              <span className="font-mono text-sm font-medium">
                {formatTime(timeRemaining)}
              </span>
            </motion.div>

            {/* Progress */}
            <div className="hidden items-center gap-3 sm:flex">
              <span className="text-sm text-muted-foreground">Progress</span>
              <div className="w-32">
                <Progress value={progress} className="h-2" />
              </div>
              <span className="text-sm font-medium">
                {currentQuestion} / {totalQuestions}
              </span>
            </div>
          </div>

          {/* Right section - Theme Toggle */}
          <div className="flex items-center gap-2">
            <ThemeToggleCompact />
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="block border-t border-border px-4 py-2 sm:hidden">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">
              Question {currentQuestion} of {totalQuestions}
            </span>
            <Progress value={progress} className="h-1.5 flex-1" />
          </div>
        </div>
      </header>

      {/* Exit Confirmation Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Exit Exam?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to exit? Your progress will be saved, but
              the timer will continue running if you return.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowExitDialog(false)}
            >
              Continue Exam
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowExitDialog(false);
                onExit();
              }}
            >
              Exit Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

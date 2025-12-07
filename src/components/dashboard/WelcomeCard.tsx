"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buttonTap } from "@/lib/animations";

interface WelcomeCardProps {
  userName?: string;
  totalExams: number;
  streak: number;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function getMotivationalMessage(totalExams: number, streak: number): string {
  if (totalExams === 0) {
    return "Ready to start your learning journey?";
  }
  if (streak >= 7) {
    return `Amazing ${streak}-day streak! You're unstoppable!`;
  }
  if (streak >= 3) {
    return `${streak} days in a row! Keep the momentum going!`;
  }
  if (totalExams >= 10) {
    return "Great progress! Keep pushing forward!";
  }
  return "Continue your learning journey today!";
}

export function WelcomeCard({ userName, totalExams, streak }: WelcomeCardProps) {
  const greeting = getGreeting();
  const message = getMotivationalMessage(totalExams, streak);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          {greeting}
          {userName ? `, ${userName}` : ""}! 👋
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-1 text-muted-foreground"
        >
          {message}
        </motion.p>

        {/* Quick stats for new users */}
        {totalExams === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4"
          >
            <motion.div {...buttonTap}>
              <Link href="/exam/select">
                <Button className="gap-2 bg-gradient-to-r from-indigo-500 to-purple-600">
                  <Zap className="h-4 w-4" />
                  Start Your First Exam
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Decorative element for returning users */}
      {totalExams > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="hidden md:flex items-center gap-2 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-4 py-3"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-5 w-5 text-indigo-500" />
          </motion.div>
          <div className="text-sm">
            <p className="font-medium">
              {totalExams} exam{totalExams > 1 ? "s" : ""} completed
            </p>
            <p className="text-xs text-muted-foreground">Keep learning!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

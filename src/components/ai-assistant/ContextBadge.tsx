"use client";

import { motion } from "framer-motion";
import { FileQuestion } from "lucide-react";

interface ContextBadgeProps {
  questionNumber: number;
  topic: string;
}

export function ContextBadge({ questionNumber, topic }: ContextBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-3 py-2 border border-indigo-100 dark:border-indigo-800"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-white">
        <FileQuestion className="h-3.5 w-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-indigo-700 dark:text-indigo-400">
          Context: Question {questionNumber}
        </p>
        <p className="text-[10px] text-muted-foreground truncate">{topic}</p>
      </div>

      {/* Pulsing indicator */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="h-2 w-2 rounded-full bg-indigo-500"
      />
    </motion.div>
  );
}

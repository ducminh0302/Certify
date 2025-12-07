"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { typingDotsVariants, typingDot } from "@/lib/animations";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3"
    >
      {/* AI Avatar */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20">
        <Sparkles className="h-4 w-4 text-white" />
      </div>

      {/* Typing bubble */}
      <div className="rounded-2xl rounded-bl-md bg-muted/50 border border-border px-4 py-3">
        <motion.div
          variants={typingDotsVariants}
          initial="initial"
          animate="animate"
          className="flex items-center gap-1"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              variants={typingDot}
              custom={i}
              className="h-2 w-2 rounded-full bg-indigo-500"
              style={{
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

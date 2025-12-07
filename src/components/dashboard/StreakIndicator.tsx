"use client";

import { motion } from "framer-motion";
import { Flame, Snowflake } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakIndicatorProps {
  streak: number;
  longestStreak?: number;
  size?: "sm" | "md" | "lg";
}

export function StreakIndicator({
  streak,
  longestStreak,
  size = "md",
}: StreakIndicatorProps) {
  const isActive = streak > 0;

  const sizeClasses = {
    sm: {
      container: "px-3 py-2 gap-2",
      icon: "h-5 w-5",
      text: "text-lg",
      label: "text-[10px]",
    },
    md: {
      container: "px-5 py-3 gap-3",
      icon: "h-8 w-8",
      text: "text-2xl",
      label: "text-xs",
    },
    lg: {
      container: "px-6 py-4 gap-4",
      icon: "h-10 w-10",
      text: "text-3xl",
      label: "text-sm",
    },
  };

  const classes = sizeClasses[size];

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={cn(
        "flex items-center rounded-2xl text-white shadow-lg",
        classes.container,
        isActive
          ? "bg-gradient-to-r from-orange-500 to-amber-500 shadow-orange-500/25"
          : "bg-gradient-to-r from-gray-400 to-gray-500 shadow-gray-500/25"
      )}
    >
      <motion.div
        animate={
          isActive
            ? {
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {isActive ? (
          <Flame className={classes.icon} />
        ) : (
          <Snowflake className={classes.icon} />
        )}
      </motion.div>
      <div>
        <p className={cn("font-bold", classes.text)}>{streak}</p>
        <p className={cn("opacity-90", classes.label)}>
          {isActive ? "Day Streak" : "No Streak"}
        </p>
      </div>

      {/* Longest streak indicator */}
      {longestStreak && longestStreak > 0 && isActive && streak < longestStreak && (
        <div className="ml-2 pl-2 border-l border-white/30">
          <p className={cn("font-medium", classes.label)}>Best: {longestStreak}</p>
        </div>
      )}

      {/* Streak milestone badges */}
      {isActive && streak >= 7 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1"
        >
          <span className="text-lg">
            {streak >= 30 ? "👑" : streak >= 14 ? "⚡" : "🔥"}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

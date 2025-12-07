"use client";

import { motion } from "framer-motion";
import { Zap, Star, Trophy, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface LevelProgressProps {
  level: number;
  currentXP: number;
  xpForNextLevel: number;
  progress: number;
  totalXP: number;
}

const levelTitles: Record<number, { title: string; color: string; icon: typeof Star }> = {
  1: { title: "Novice", color: "from-gray-400 to-gray-500", icon: Star },
  5: { title: "Beginner", color: "from-green-400 to-emerald-500", icon: Star },
  10: { title: "Apprentice", color: "from-blue-400 to-cyan-500", icon: Zap },
  15: { title: "Intermediate", color: "from-indigo-400 to-purple-500", icon: Zap },
  20: { title: "Proficient", color: "from-purple-400 to-pink-500", icon: Trophy },
  30: { title: "Advanced", color: "from-amber-400 to-orange-500", icon: Trophy },
  40: { title: "Expert", color: "from-rose-400 to-red-500", icon: Crown },
  50: { title: "Grand Master", color: "from-yellow-400 to-amber-500", icon: Crown },
};

function getLevelInfo(level: number) {
  const levels = Object.keys(levelTitles).map(Number).sort((a, b) => b - a);
  for (const lvl of levels) {
    if (level >= lvl) {
      return levelTitles[lvl];
    }
  }
  return levelTitles[1];
}

export function LevelProgress({
  level,
  currentXP,
  xpForNextLevel,
  progress,
  totalXP,
}: LevelProgressProps) {
  const levelInfo = getLevelInfo(level);
  const Icon = levelInfo.icon;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 opacity-10 bg-gradient-to-br",
        levelInfo.color
      )} />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              className={cn(
                "flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg",
                levelInfo.color
              )}
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Icon className="h-7 w-7 text-white" />
            </motion.div>
            <div>
              <p className="text-sm text-muted-foreground">Current Level</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{level}</span>
                <span className={cn(
                  "text-sm font-medium bg-gradient-to-r bg-clip-text text-transparent",
                  levelInfo.color
                )}>
                  {levelInfo.title}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total XP</p>
            <motion.p
              className="text-2xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {totalXP.toLocaleString()}
            </motion.p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Progress to Level {level + 1}
            </span>
            <span className="font-medium">
              {currentXP.toLocaleString()} / {xpForNextLevel.toLocaleString()} XP
            </span>
          </div>

          <div className="relative h-4 rounded-full bg-muted/50 overflow-hidden">
            {/* Glow effect */}
            <motion.div
              className={cn(
                "absolute inset-y-0 left-0 rounded-full blur-sm bg-gradient-to-r",
                levelInfo.color
              )}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* Progress fill */}
            <motion.div
              className={cn(
                "absolute inset-y-0 left-0 rounded-full bg-gradient-to-r",
                levelInfo.color
              )}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* Shine animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "easeInOut",
              }}
            />
          </div>

          <p className="text-xs text-muted-foreground text-center">
            {xpForNextLevel - currentXP} XP until next level
          </p>
        </div>

        {/* Level milestones */}
        <div className="mt-6 flex justify-between">
          {[10, 20, 30, 40, 50].map((milestone) => {
            const achieved = level >= milestone;
            return (
              <div
                key={milestone}
                className={cn(
                  "flex flex-col items-center",
                  achieved ? "text-amber-500" : "text-muted-foreground/40"
                )}
              >
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                  achieved
                    ? "border-amber-500 bg-amber-100 dark:bg-amber-900/30"
                    : "border-muted"
                )}>
                  {achieved ? (
                    <Star className="h-4 w-4" fill="currentColor" />
                  ) : (
                    <span className="text-xs font-medium">{milestone}</span>
                  )}
                </div>
                <span className="text-[10px] mt-1">Lv.{milestone}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

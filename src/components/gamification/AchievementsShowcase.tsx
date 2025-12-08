"use client";

import { motion } from "framer-motion";
import { Trophy, Lock, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACHIEVEMENTS, type Achievement, useProgressStore } from "@/stores/progressStore";
import { staggerContainer, fadeInUp } from "@/lib/animations";

interface AchievementsShowcaseProps {
  className?: string;
  showLocked?: boolean;
  maxItems?: number;
}

export function AchievementsShowcase({
  className,
  showLocked = true,
  maxItems,
}: AchievementsShowcaseProps) {
  const { unlockedAchievements, totalXP, currentStreak, totalExamsCompleted, perfectScores } =
    useProgressStore();

  // Get progress for each achievement
  const getProgress = (achievement: Achievement): number => {
    const { requirement } = achievement;
    let current = 0;

    switch (requirement.type) {
      case "exams_completed":
        current = totalExamsCompleted;
        break;
      case "perfect_score":
        current = perfectScores;
        break;
      case "streak":
        current = currentStreak;
        break;
      case "xp":
        current = totalXP;
        break;
    }

    return Math.min((current / requirement.value) * 100, 100);
  };

  // Separate unlocked and locked
  const unlocked = ACHIEVEMENTS.filter((a) => unlockedAchievements.includes(a.id));
  const locked = ACHIEVEMENTS.filter((a) => !unlockedAchievements.includes(a.id));

  // Sort locked by progress (closest to unlocking first)
  const sortedLocked = [...locked].sort(
    (a, b) => getProgress(b) - getProgress(a)
  );

  // Combine and limit if needed
  let displayAchievements = showLocked
    ? [...unlocked, ...sortedLocked]
    : unlocked;

  if (maxItems) {
    displayAchievements = displayAchievements.slice(0, maxItems);
  }

  // Group by category
  const groupedByCategory = displayAchievements.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, Achievement[]>);

  const categoryLabels: Record<string, string> = {
    milestone: "Milestones",
    streak: "Streaks",
    performance: "Performance",
    dedication: "Dedication",
  };

  const categoryIcons: Record<string, string> = {
    milestone: "🎯",
    streak: "🔥",
    performance: "⭐",
    dedication: "💪",
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={cn("space-y-6", className)}
    >
      {/* Stats Summary */}
      <motion.div variants={fadeInUp} className="flex items-center justify-center gap-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary">{unlocked.length}</div>
          <div className="text-sm text-muted-foreground">Unlocked</div>
        </div>
        <div className="h-12 w-px bg-border" />
        <div className="text-center">
          <div className="text-3xl font-bold text-muted-foreground">{locked.length}</div>
          <div className="text-sm text-muted-foreground">Locked</div>
        </div>
        <div className="h-12 w-px bg-border" />
        <div className="text-center">
          <div className="text-3xl font-bold text-amber-500">
            {Math.round((unlocked.length / ACHIEVEMENTS.length) * 100)}%
          </div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </motion.div>

      {/* Achievements by Category */}
      {Object.entries(groupedByCategory).map(([category, achievements]) => (
        <motion.div key={category} variants={fadeInUp}>
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-3">
            <span>{categoryIcons[category]}</span>
            {categoryLabels[category]}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {achievements.map((achievement) => {
              const isUnlocked = unlockedAchievements.includes(achievement.id);
              const progress = getProgress(achievement);

              return (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  isUnlocked={isUnlocked}
                  progress={progress}
                />
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Individual Achievement Card
function AchievementCard({
  achievement,
  isUnlocked,
  progress,
}: {
  achievement: Achievement;
  isUnlocked: boolean;
  progress: number;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={cn(
        "relative p-4 rounded-xl border-2 transition-all overflow-hidden",
        isUnlocked
          ? "border-amber-300 dark:border-amber-600 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20"
          : "border-border bg-muted/30 opacity-70"
      )}
    >
      {/* Progress bar for locked achievements */}
      {!isUnlocked && progress > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-primary"
          />
        </div>
      )}

      <div className="flex items-center gap-3">
        {/* Icon */}
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl text-2xl",
            isUnlocked
              ? "bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg"
              : "bg-muted"
          )}
        >
          {isUnlocked ? (
            achievement.icon
          ) : (
            <Lock className="h-5 w-5 text-muted-foreground" />
          )}
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4
              className={cn(
                "font-semibold truncate",
                isUnlocked ? "text-amber-900 dark:text-amber-100" : "text-muted-foreground"
              )}
            >
              {achievement.name}
            </h4>
            {isUnlocked && (
              <Sparkles className="h-4 w-4 text-amber-500 flex-shrink-0" />
            )}
          </div>
          <p
            className={cn(
              "text-sm truncate",
              isUnlocked ? "text-amber-700 dark:text-amber-300" : "text-muted-foreground"
            )}
          >
            {achievement.description}
          </p>
          {!isUnlocked && progress > 0 && (
            <p className="text-xs text-primary mt-1">
              {Math.round(progress)}% complete
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Mini Achievement Badge (for profile/header)
export function AchievementBadge({ achievement }: { achievement: Achievement }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-lg shadow-md cursor-pointer"
      title={`${achievement.name}: ${achievement.description}`}
    >
      {achievement.icon}
    </motion.div>
  );
}

// Recent Achievements List
export function RecentAchievements({ limit = 3 }: { limit?: number }) {
  const { unlockedAchievements } = useProgressStore();

  const recentUnlocked = ACHIEVEMENTS.filter((a) =>
    unlockedAchievements.includes(a.id)
  ).slice(0, limit);

  if (recentUnlocked.length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        <Trophy className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No achievements yet</p>
        <p className="text-xs">Complete exams to unlock achievements!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {recentUnlocked.map((achievement) => (
        <div
          key={achievement.id}
          className="flex items-center gap-3 p-2 rounded-lg bg-amber-50 dark:bg-amber-900/20"
        >
          <span className="text-xl">{achievement.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{achievement.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {achievement.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

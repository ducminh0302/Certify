"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  TrendingDown,
  Minus,
  User,
  Flame,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/stores/progressStore";

type TimeRange = "weekly" | "monthly" | "allTime";
type LeaderboardType = "xp" | "streak" | "accuracy";

interface LeaderboardEntry {
  id: string;
  rank: number;
  name: string;
  avatar?: string;
  xp: number;
  streak: number;
  accuracy: number;
  change: "up" | "down" | "same";
  isCurrentUser?: boolean;
}

// Generate mock leaderboard data
function generateMockLeaderboard(userXP: number, userStreak: number, userAccuracy: number): LeaderboardEntry[] {
  const names = [
    "Alex Chen", "Jordan Lee", "Sam Wilson", "Taylor Brown", "Casey Miller",
    "Morgan Davis", "Riley Johnson", "Quinn Smith", "Avery Thomas", "Parker White",
    "Jamie Garcia", "Drew Martinez", "Sage Anderson", "River Jackson", "Skyler Moore"
  ];

  const entries: LeaderboardEntry[] = names.map((name, i) => ({
    id: `user-${i}`,
    rank: i + 1,
    name,
    xp: Math.floor(15000 - (i * 800) + Math.random() * 500),
    streak: Math.floor(30 - i * 2 + Math.random() * 5),
    accuracy: Math.floor(95 - i * 2 + Math.random() * 5),
    change: Math.random() > 0.6 ? "up" : Math.random() > 0.3 ? "down" : "same",
  }));

  // Insert current user
  const userEntry: LeaderboardEntry = {
    id: "current-user",
    rank: 0, // Will be calculated
    name: "You",
    xp: userXP,
    streak: userStreak,
    accuracy: userAccuracy,
    change: "same",
    isCurrentUser: true,
  };

  entries.push(userEntry);

  return entries;
}

interface LeaderboardProps {
  className?: string;
}

export function Leaderboard({ className }: LeaderboardProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>("weekly");
  const [leaderboardType, setLeaderboardType] = useState<LeaderboardType>("xp");

  const { totalXP, currentStreak, averageScore } = useProgressStore();

  // Generate and sort leaderboard
  const leaderboard = useMemo(() => {
    const entries = generateMockLeaderboard(totalXP, currentStreak, averageScore || 75);

    // Sort based on type
    const sortKey = leaderboardType === "xp" ? "xp" : leaderboardType === "streak" ? "streak" : "accuracy";
    entries.sort((a, b) => b[sortKey] - a[sortKey]);

    // Assign ranks
    entries.forEach((entry, index) => {
      entry.rank = index + 1;
    });

    return entries;
  }, [totalXP, currentStreak, averageScore, leaderboardType]);

  // Find current user position
  const currentUserEntry = leaderboard.find((e) => e.isCurrentUser);
  const currentUserRank = currentUserEntry?.rank || 0;

  const timeRangeOptions: { value: TimeRange; label: string }[] = [
    { value: "weekly", label: "This Week" },
    { value: "monthly", label: "This Month" },
    { value: "allTime", label: "All Time" },
  ];

  const typeOptions: { value: LeaderboardType; label: string; icon: React.ElementType }[] = [
    { value: "xp", label: "XP", icon: Trophy },
    { value: "streak", label: "Streak", icon: Flame },
    { value: "accuracy", label: "Accuracy", icon: Target },
  ];

  return (
    <div className={cn("rounded-2xl border bg-card overflow-hidden", className)}>
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            <h2 className="font-semibold">Leaderboard</h2>
          </div>
          <div className="flex gap-1 bg-muted rounded-lg p-1">
            {timeRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeRange(option.value)}
                className={cn(
                  "px-3 py-1 rounded-md text-sm transition-colors",
                  timeRange === option.value
                    ? "bg-background shadow text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Type selector */}
        <div className="flex gap-2">
          {typeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setLeaderboardType(option.value)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all",
                leaderboardType === option.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              <option.icon className="h-4 w-4" />
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Current User Position */}
      {currentUserRank > 3 && (
        <div className="p-3 bg-primary/5 border-b">
          <p className="text-sm text-center">
            Your position: <span className="font-bold">#{currentUserRank}</span>
            {currentUserRank <= 10 && " - Great job! Keep going! 🎉"}
          </p>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="divide-y">
        {leaderboard.slice(0, 10).map((entry, index) => (
          <LeaderboardRow
            key={entry.id}
            entry={entry}
            type={leaderboardType}
            index={index}
          />
        ))}
      </div>

      {/* Show current user if not in top 10 */}
      {currentUserRank > 10 && currentUserEntry && (
        <>
          <div className="px-4 py-2 text-center text-muted-foreground text-sm">
            • • •
          </div>
          <LeaderboardRow
            entry={currentUserEntry}
            type={leaderboardType}
            index={currentUserRank - 1}
          />
        </>
      )}
    </div>
  );
}

// Individual row component
function LeaderboardRow({
  entry,
  type,
  index,
}: {
  entry: LeaderboardEntry;
  type: LeaderboardType;
  index: number;
}) {
  const getRankDisplay = () => {
    switch (entry.rank) {
      case 1:
        return <Crown className="h-5 w-5 text-amber-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-700" />;
      default:
        return <span className="text-sm font-medium text-muted-foreground">#{entry.rank}</span>;
    }
  };

  const getChangeIcon = () => {
    switch (entry.change) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-emerald-500" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-rose-500" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getValue = () => {
    switch (type) {
      case "xp":
        return `${entry.xp.toLocaleString()} XP`;
      case "streak":
        return `${entry.streak} days`;
      case "accuracy":
        return `${entry.accuracy}%`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={cn(
        "flex items-center gap-4 p-4 transition-colors",
        entry.isCurrentUser && "bg-primary/5",
        entry.rank <= 3 && "bg-gradient-to-r from-amber-500/5 to-transparent"
      )}
    >
      {/* Rank */}
      <div className="w-8 flex justify-center">{getRankDisplay()}</div>

      {/* Avatar */}
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full",
          entry.isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted"
        )}
      >
        {entry.avatar ? (
          <img src={entry.avatar} alt={entry.name} className="rounded-full" />
        ) : (
          <User className="h-5 w-5" />
        )}
      </div>

      {/* Name */}
      <div className="flex-1 min-w-0">
        <p className={cn("font-medium truncate", entry.isCurrentUser && "text-primary")}>
          {entry.name}
        </p>
        {entry.isCurrentUser && (
          <p className="text-xs text-muted-foreground">That's you!</p>
        )}
      </div>

      {/* Change indicator */}
      <div className="hidden sm:block">{getChangeIcon()}</div>

      {/* Value */}
      <div className="text-right">
        <p className={cn("font-bold", entry.rank === 1 && "text-amber-500")}>
          {getValue()}
        </p>
      </div>
    </motion.div>
  );
}

// Compact version for dashboard
export function LeaderboardCompact({ className }: { className?: string }) {
  const { totalXP } = useProgressStore();

  const leaderboard = useMemo(() => {
    const entries = generateMockLeaderboard(totalXP, 0, 75);
    entries.sort((a, b) => b.xp - a.xp);
    entries.forEach((entry, index) => {
      entry.rank = index + 1;
    });
    return entries.slice(0, 5);
  }, [totalXP]);

  return (
    <div className={cn("space-y-2", className)}>
      {leaderboard.map((entry, index) => (
        <div
          key={entry.id}
          className={cn(
            "flex items-center gap-3 p-2 rounded-lg",
            entry.isCurrentUser && "bg-primary/10"
          )}
        >
          <span
            className={cn(
              "w-6 text-center font-bold",
              index === 0 && "text-amber-500",
              index === 1 && "text-gray-400",
              index === 2 && "text-amber-700"
            )}
          >
            {index + 1}
          </span>
          <span className={cn("flex-1 truncate", entry.isCurrentUser && "font-medium")}>
            {entry.name}
          </span>
          <span className="text-sm text-muted-foreground">
            {entry.xp.toLocaleString()} XP
          </span>
        </div>
      ))}
    </div>
  );
}

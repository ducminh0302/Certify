"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Target, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScoreCircleProps {
  score: number;
  passed: boolean;
  passingScore?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  animated?: boolean;
}

const sizeConfig = {
  sm: { dimension: 120, strokeWidth: 8, fontSize: "text-2xl", iconSize: "h-4 w-4" },
  md: { dimension: 180, strokeWidth: 10, fontSize: "text-4xl", iconSize: "h-5 w-5" },
  lg: { dimension: 240, strokeWidth: 12, fontSize: "text-6xl", iconSize: "h-6 w-6" },
};

export function ScoreCircle({
  score,
  passed,
  passingScore = 70,
  size = "lg",
  showLabel = true,
  animated = true,
}: ScoreCircleProps) {
  const [animatedScore, setAnimatedScore] = useState(animated ? 0 : score);
  const config = sizeConfig[size];
  const radius = (config.dimension - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!animated) {
      setAnimatedScore(score);
      return;
    }

    const duration = 1500;
    const steps = 60;
    const increment = score / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.round(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score, animated]);

  // Determine grade and color
  const getGradeInfo = (score: number) => {
    if (score >= 90) return { grade: "A+", color: "emerald", message: "Excellent!" };
    if (score >= 80) return { grade: "A", color: "emerald", message: "Great job!" };
    if (score >= 70) return { grade: "B", color: "sky", message: "Good work!" };
    if (score >= 60) return { grade: "C", color: "amber", message: "Keep trying!" };
    return { grade: "D", color: "rose", message: "Needs practice" };
  };

  const gradeInfo = getGradeInfo(score);

  const colorMap: Record<string, { gradient: string; light: string; dark: string }> = {
    emerald: {
      gradient: "url(#scoreGradientEmerald)",
      light: "text-emerald-600",
      dark: "dark:text-emerald-400",
    },
    sky: {
      gradient: "url(#scoreGradientSky)",
      light: "text-sky-600",
      dark: "dark:text-sky-400",
    },
    amber: {
      gradient: "url(#scoreGradientAmber)",
      light: "text-amber-600",
      dark: "dark:text-amber-400",
    },
    rose: {
      gradient: "url(#scoreGradientRose)",
      light: "text-rose-600",
      dark: "dark:text-rose-400",
    },
  };

  const colors = colorMap[gradeInfo.color];

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Glow effect */}
        <motion.div
          className={cn(
            "absolute inset-0 rounded-full blur-2xl opacity-30",
            passed ? "bg-emerald-500" : "bg-indigo-500"
          )}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* SVG Circle */}
        <svg
          className="-rotate-90"
          width={config.dimension}
          height={config.dimension}
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="scoreGradientEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
            <linearGradient id="scoreGradientSky" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="scoreGradientAmber" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
            <linearGradient id="scoreGradientRose" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
          </defs>

          {/* Background circle */}
          <circle
            cx={config.dimension / 2}
            cy={config.dimension / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.strokeWidth}
            className="text-muted/20"
          />

          {/* Passing threshold marker */}
          <circle
            cx={config.dimension / 2}
            cy={config.dimension / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeDasharray={`${(passingScore / 100) * circumference} ${circumference}`}
            className="text-muted/40"
          />

          {/* Progress circle */}
          <motion.circle
            cx={config.dimension / 2}
            cy={config.dimension / 2}
            r={radius}
            fill="none"
            stroke={colors.gradient}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{
              strokeDasharray: `${(animatedScore / 100) * circumference} ${circumference}`,
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Grade badge */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className={cn(
              "absolute -top-2 -right-2 flex items-center justify-center rounded-full shadow-lg",
              size === "lg" ? "h-12 w-12" : size === "md" ? "h-10 w-10" : "h-8 w-8",
              passed ? "bg-gradient-to-br from-amber-400 to-orange-500" : "bg-gradient-to-br from-indigo-500 to-purple-600"
            )}
          >
            {passed ? (
              <Star className={cn("text-white", config.iconSize)} fill="white" />
            ) : (
              <Zap className={cn("text-white", config.iconSize)} />
            )}
          </motion.div>

          {/* Score */}
          <motion.span
            className={cn("font-bold", config.fontSize, colors.light, colors.dark)}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            {animatedScore}%
          </motion.span>

          {/* Grade letter */}
          <motion.span
            className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full mt-1",
              passed
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Grade: {gradeInfo.grade}
          </motion.span>
        </div>
      </div>

      {/* Label */}
      {showLabel && (
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <p className={cn("font-semibold", colors.light, colors.dark)}>
            {gradeInfo.message}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Passing score: {passingScore}%
          </p>
        </motion.div>
      )}
    </div>
  );
}

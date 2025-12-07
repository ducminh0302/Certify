"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Star, Sparkles, Flame, Zap, Crown, Medal, Award } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

// Main celebration component for pass/high score
interface CelebrationOverlayProps {
  show: boolean;
  score: number;
  onComplete?: () => void;
}

export function CelebrationOverlay({ show, score, onComplete }: CelebrationOverlayProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!show) return;

    // Phase 1: Show overlay
    setPhase(1);

    // Phase 2: Trigger confetti after a short delay
    const confettiTimer = setTimeout(() => {
      setPhase(2);
      triggerConfetti(score);
    }, 300);

    // Phase 3: Auto-hide after celebration
    const hideTimer = setTimeout(() => {
      setPhase(0);
      onComplete?.();
    }, 4000);

    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(hideTimer);
    };
  }, [show, score, onComplete]);

  const getMessage = () => {
    if (score >= 90) return { title: "Outstanding!", subtitle: "You're a master!", icon: Crown };
    if (score >= 80) return { title: "Excellent!", subtitle: "Amazing performance!", icon: Trophy };
    if (score >= 70) return { title: "Well Done!", subtitle: "You passed!", icon: Medal };
    return { title: "Good Try!", subtitle: "Keep practicing!", icon: Award };
  };

  const { title, subtitle, icon: Icon } = getMessage();

  return (
    <AnimatePresence>
      {phase > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", damping: 15 }}
            className="flex flex-col items-center"
          >
            {/* Glowing icon */}
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-amber-400 blur-3xl opacity-50" />

              {/* Icon container */}
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 shadow-2xl">
                <Icon className="h-16 w-16 text-white" />
              </div>

              {/* Rotating stars */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                {[...Array(6)].map((_, i) => (
                  <Star
                    key={i}
                    className="absolute h-6 w-6 text-amber-300"
                    style={{
                      left: "50%",
                      top: "50%",
                      transform: `rotate(${i * 60}deg) translateY(-80px) translateX(-50%)`,
                    }}
                    fill="currentColor"
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 text-center"
            >
              <h2 className="text-4xl font-bold text-white drop-shadow-lg">{title}</h2>
              <p className="mt-2 text-xl text-white/80">{subtitle}</p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-2 text-white"
              >
                <span className="text-3xl font-bold">{score}%</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Trigger confetti based on score
function triggerConfetti(score: number) {
  const duration = score >= 80 ? 3000 : 2000;
  const particleCount = score >= 90 ? 8 : score >= 80 ? 5 : 3;
  const colors = score >= 80
    ? ["#FFD700", "#FFA500", "#FF6347", "#10B981", "#06B6D4"]
    : ["#10B981", "#34D399", "#6EE7B7"];

  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors,
    });
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Streak celebration for consecutive days
interface StreakCelebrationProps {
  streak: number;
  show: boolean;
  onComplete?: () => void;
}

export function StreakCelebration({ streak, show, onComplete }: StreakCelebrationProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="relative">
            {/* Fire glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />

            {/* Card */}
            <div className="relative flex items-center gap-4 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 p-4 pr-6 text-white shadow-2xl">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
              >
                <Flame className="h-12 w-12" />
              </motion.div>
              <div>
                <p className="text-3xl font-bold">{streak} Day Streak!</p>
                <p className="text-sm opacity-80">Keep up the great work!</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// XP gain animation
interface XPGainProps {
  amount: number;
  show: boolean;
  position?: { x: number; y: number };
}

export function XPGain({ amount, show, position }: XPGainProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 1, 0], y: -100, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="fixed z-50 pointer-events-none"
          style={{
            left: position?.x ?? "50%",
            top: position?.y ?? "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-2 text-white shadow-lg">
            <Zap className="h-5 w-5" />
            <span className="text-xl font-bold">+{amount} XP</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Achievement unlock animation
interface AchievementUnlockProps {
  achievement: {
    name: string;
    icon: string;
    description: string;
  };
  show: boolean;
  onComplete?: () => void;
}

export function AchievementUnlock({ achievement, show, onComplete }: AchievementUnlockProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-20 right-4 z-50"
        >
          <div className="relative overflow-hidden rounded-2xl border border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-4 shadow-xl">
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            />

            <div className="relative flex items-center gap-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-2xl shadow-lg"
              >
                {achievement.icon}
              </motion.div>
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                    Achievement Unlocked!
                  </span>
                </div>
                <h4 className="font-bold text-foreground">{achievement.name}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Floating particles background
export function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={cn(
            "absolute rounded-full",
            i % 3 === 0
              ? "h-2 w-2 bg-indigo-400/30"
              : i % 3 === 1
              ? "h-3 w-3 bg-purple-400/20"
              : "h-1.5 w-1.5 bg-pink-400/25"
          )}
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            y: -50,
            x: Math.random() * window.innerWidth,
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Achievement } from "@/stores/progressStore";

interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementToast({ achievement, onClose }: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for exit animation
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  return (
    <AnimatePresence>
      {isVisible && achievement && (
        <motion.div
          initial={{ opacity: 0, y: -100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm"
        >
          <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300 dark:border-amber-600 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/40 dark:to-orange-900/40 shadow-2xl shadow-amber-500/20">
            {/* Sparkle effects */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity },
                }}
                className="absolute -top-10 -right-10 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"
              />
              <motion.div
                animate={{
                  rotate: -360,
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity },
                }}
                className="absolute -bottom-10 -left-10 w-24 h-24 bg-orange-400/20 rounded-full blur-2xl"
              />
            </div>

            {/* Content */}
            <div className="relative p-4">
              <button
                onClick={() => {
                  setIsVisible(false);
                  setTimeout(onClose, 300);
                }}
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10 transition-colors"
              >
                <X className="h-4 w-4 text-amber-700 dark:text-amber-300" />
              </button>

              <div className="flex items-center gap-4">
                {/* Trophy Icon with Animation */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="relative"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
                    <span className="text-3xl">{achievement.icon}</span>
                  </div>
                  <motion.div
                    animate={{ scale: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles className="h-5 w-5 text-amber-500" />
                  </motion.div>
                </motion.div>

                {/* Text */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                      Achievement Unlocked!
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-amber-900 dark:text-amber-100">
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {achievement.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Animated border glow */}
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-2xl border-2 border-amber-400/50 pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// XP Gained Toast
interface XPToastProps {
  xp: number;
  isVisible: boolean;
  onClose: () => void;
}

export function XPToast({ xp, isVisible, onClose }: XPToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30">
            <Sparkles className="h-5 w-5" />
            <span className="font-bold">+{xp} XP</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Level Up Modal
interface LevelUpModalProps {
  level: number;
  title: string;
  isVisible: boolean;
  onClose: () => void;
}

export function LevelUpModal({ level, title, isVisible, onClose }: LevelUpModalProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-50 scale-150" />

            {/* Content */}
            <div className="relative bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-center text-white shadow-2xl">
              {/* Confetti-like decorations */}
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: Math.cos((i * Math.PI * 2) / 12) * 100,
                    y: Math.sin((i * Math.PI * 2) / 12) * 100,
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1"][i % 4],
                  }}
                />
              ))}

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <span className="text-6xl">🎉</span>
              </motion.div>

              <h2 className="text-2xl font-bold mt-4 mb-2">Level Up!</h2>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="flex items-center justify-center gap-3 my-4"
              >
                <span className="text-6xl font-black">{level}</span>
              </motion.div>

              <p className="text-lg text-white/80 mb-4">{title}</p>

              <button
                onClick={onClose}
                className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full font-medium transition-colors"
              >
                Awesome!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

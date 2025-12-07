"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  gradient?: boolean;
}

export function StatsCard({
  label,
  value,
  icon: Icon,
  iconColor = "text-primary",
  trend,
  gradient = false,
}: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className={cn(
          "rounded-2xl border border-border bg-card p-5 relative overflow-hidden",
          gradient && "bg-gradient-to-br from-indigo-500/5 to-purple-500/5"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              iconColor.includes("indigo") && "bg-indigo-100 dark:bg-indigo-900/30",
              iconColor.includes("emerald") && "bg-emerald-100 dark:bg-emerald-900/30",
              iconColor.includes("amber") && "bg-amber-100 dark:bg-amber-900/30",
              iconColor.includes("rose") && "bg-rose-100 dark:bg-rose-900/30",
              !iconColor.includes("indigo") &&
                !iconColor.includes("emerald") &&
                !iconColor.includes("amber") &&
                !iconColor.includes("rose") &&
                "bg-primary/10"
            )}
          >
            <Icon className={cn("h-5 w-5", iconColor)} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>

        {trend && (
          <div className="mt-3 flex items-center gap-1 text-xs">
            <span
              className={cn(
                trend.isPositive
                  ? "text-emerald-600 dark:text-emerald-400"
                  : "text-rose-600 dark:text-rose-400"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

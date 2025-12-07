"use client";

import { motion } from "framer-motion";
import { Sun, Moon, Monitor } from "lucide-react";
import { useUIStore } from "@/stores/uiStore";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Theme = "light" | "dark" | "system";

const themes: { value: Theme; icon: typeof Sun; label: string }[] = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
];

interface ThemeToggleProps {
  variant?: "default" | "minimal";
  className?: string;
}

export function ThemeToggle({
  variant = "default",
  className,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useUIStore();

  if (variant === "minimal") {
    // Simple toggle between light and dark
    const Icon = resolvedTheme === "dark" ? Sun : Moon;
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(nextTheme)}
              className={cn("relative", className)}
            >
              <motion.div
                initial={false}
                animate={{ rotate: resolvedTheme === "dark" ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>
              <span className="sr-only">Toggle theme</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Switch to {nextTheme} mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  // Segmented control style
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-lg bg-muted p-1",
        className
      )}
    >
      {themes.map(({ value, icon: Icon, label }) => (
        <TooltipProvider key={value}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setTheme(value)}
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-md",
                  "text-muted-foreground transition-colors",
                  "hover:text-foreground",
                  theme === value && "text-foreground"
                )}
              >
                {theme === value && (
                  <motion.div
                    layoutId="theme-indicator"
                    className="absolute inset-0 rounded-md bg-background shadow-sm"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <Icon className="relative z-10 h-4 w-4" />
                <span className="sr-only">{label}</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{label} mode</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}

// Compact version for header
export function ThemeToggleCompact({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useUIStore();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn("gap-2", className)}
    >
      <motion.div
        initial={false}
        animate={{ rotate: resolvedTheme === "dark" ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {resolvedTheme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </motion.div>
      <span>{resolvedTheme === "dark" ? "Dark" : "Light"} Mode</span>
    </Button>
  );
}

"use client";

import { useEffect, useState, useCallback, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageSquare, Lightbulb, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectableTextWrapperProps {
  children: ReactNode;
  onAskAI: (prompt: string) => void;
  disabled?: boolean;
  className?: string;
}

interface PopupPosition {
  x: number;
  y: number;
}

const quickActions = [
  {
    id: "explain",
    icon: Lightbulb,
    label: "Explain",
    prompt: (text: string) => `Please explain what "${text}" means in this context.`,
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "clarify",
    icon: HelpCircle,
    label: "Clarify",
    prompt: (text: string) => `Can you clarify this part: "${text}"? I don't fully understand it.`,
    color: "from-sky-500 to-blue-500",
  },
  {
    id: "ask",
    icon: MessageSquare,
    label: "Ask AI",
    prompt: (text: string) => `I have a question about "${text}". Can you help me understand it better?`,
    color: "from-indigo-500 to-purple-500",
  },
];

export function SelectableTextWrapper({
  children,
  onAskAI,
  disabled = false,
  className,
}: SelectableTextWrapperProps) {
  const [selectedText, setSelectedText] = useState("");
  const [position, setPosition] = useState<PopupPosition | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleMouseUp = useCallback(() => {
    if (disabled) return;

    // Small delay to ensure selection is complete
    setTimeout(() => {
      const selection = window.getSelection();
      const text = selection?.toString().trim();

      if (text && text.length > 2 && text.length < 500) {
        // Check if selection is within our container
        const range = selection?.getRangeAt(0);
        if (range && containerRef.current) {
          const container = containerRef.current;
          if (container.contains(range.commonAncestorContainer)) {
            const rect = range.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Position popup above the selection
            setPosition({
              x: rect.left + rect.width / 2 - containerRect.left,
              y: rect.top - containerRect.top - 10,
            });
            setSelectedText(text);
            setIsVisible(true);
          }
        }
      }
    }, 10);
  }, [disabled]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    // Hide popup when clicking outside
    if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
      setIsVisible(false);
      setSelectedText("");
    }
  }, []);

  const handleAction = useCallback(
    (action: typeof quickActions[0]) => {
      if (selectedText) {
        onAskAI(action.prompt(selectedText));
        setIsVisible(false);
        setSelectedText("");
        // Clear selection
        window.getSelection()?.removeAllRanges();
      }
    },
    [selectedText, onAskAI]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      container.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleMouseUp, handleMouseDown]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isVisible && e.key === "Escape") {
        setIsVisible(false);
        setSelectedText("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Custom selection styling hint */}
      <style jsx global>{`
        .selectable-text-wrapper ::selection {
          background-color: rgba(99, 102, 241, 0.3);
        }
        .selectable-text-wrapper::-moz-selection {
          background-color: rgba(99, 102, 241, 0.3);
        }
      `}</style>

      <div className="selectable-text-wrapper">
        {children}
      </div>

      {/* Selection Popup */}
      <AnimatePresence>
        {isVisible && position && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{
              left: position.x,
              top: position.y,
              transform: "translate(-50%, -100%)",
            }}
            className="absolute z-50"
          >
            {/* Popup Container */}
            <div className="flex items-center gap-1 rounded-full bg-card border border-border shadow-xl shadow-black/10 p-1">
              {/* AI Icon */}
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
                <Sparkles className="h-4 w-4 text-white" />
              </div>

              {/* Quick Actions */}
              {quickActions.map((action) => (
                <motion.button
                  key={action.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction(action)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3 py-1.5",
                    "text-xs font-medium text-white",
                    "bg-gradient-to-r",
                    action.color,
                    "hover:shadow-md transition-shadow"
                  )}
                >
                  <action.icon className="h-3 w-3" />
                  {action.label}
                </motion.button>
              ))}
            </div>

            {/* Arrow pointing down */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full">
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-card" />
            </div>

            {/* Selected text preview */}
            {selectedText.length > 20 && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-max max-w-[200px]"
              >
                <div className="rounded-lg bg-muted/90 backdrop-blur-sm px-2 py-1 text-xs text-muted-foreground truncate">
                  &quot;{selectedText.slice(0, 30)}...&quot;
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint that appears on hover when no text selected */}
      {!disabled && !isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          className="absolute -top-6 right-0 flex items-center gap-1.5 text-xs text-muted-foreground opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
        >
          <Sparkles className="h-3 w-3 text-indigo-500" />
          <span>Select text to ask AI</span>
        </motion.div>
      )}
    </div>
  );
}

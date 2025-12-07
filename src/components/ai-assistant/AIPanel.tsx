"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, GripVertical, Trash2, RotateCcw, AlertCircle } from "lucide-react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { panelSlideRight, backdropVariants } from "@/lib/animations";
import { useChatStore } from "@/stores/chatStore";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickActions } from "./QuickActions";
import { TypingIndicator } from "./TypingIndicator";
import { ContextBadge } from "./ContextBadge";

interface AIPanelProps {
  questionContext?: {
    questionText: string;
    questionNumber: number;
    topic: string;
  };
  onSendMessage: (message: string) => void;
  onQuickAction: (action: string) => void;
}

export function AIPanel({
  questionContext,
  onSendMessage,
  onQuickAction,
}: AIPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const {
    messages,
    panel,
    streaming,
    isLoading,
    error,
    closePanel,
    setPanelWidth,
    setResizing,
    clearMessages,
    setError,
  } = useChatStore();

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, streaming.currentContent]);

  // Handle resize
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setResizing(true);

    const startX = e.clientX;
    const startWidth = panel.width;

    const handleMouseMove = (e: MouseEvent) => {
      const diff = startX - e.clientX;
      const newWidth = Math.min(Math.max(startWidth + diff, 320), 600);
      setPanelWidth(newWidth);
    };

    const handleMouseUp = () => {
      setResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <AnimatePresence>
      {panel.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={closePanel}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
          />

          {/* Panel */}
          <motion.div
            variants={panelSlideRight}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ width: panel.width }}
            className={cn(
              "fixed right-0 top-0 z-50 h-full",
              "flex flex-col",
              "bg-card/95 backdrop-blur-xl border-l-2 border-border",
              "shadow-2xl shadow-black/10",
              panel.isResizing && "select-none"
            )}
          >
            {/* Resize Handle */}
            <div
              onMouseDown={handleMouseDown}
              className="absolute left-0 top-0 h-full w-1 cursor-ew-resize group hidden lg:flex items-center"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-1 rounded-full bg-border opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-border p-3 shrink-0 bg-background/50 backdrop-blur-md">
              <div className="flex items-center gap-3 overflow-hidden">
                <motion.div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20"
                  animate={isLoading ? { rotate: 360 } : {}}
                  transition={{
                    duration: 2,
                    repeat: isLoading ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <Sparkles className="h-4 w-4 text-white" />
                </motion.div>

                {/* Compact Context Badge - Merged into Header */}
                {questionContext ? (
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm truncate">
                        Question {questionContext.questionNumber}
                      </span>
                      <span className="text-[10px] items-center rounded-full bg-muted px-2 py-0.5 font-medium text-muted-foreground hidden sm:inline-flex">
                        {questionContext.topic}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                      AI Study Assistant
                    </span>
                  </div>
                ) : (
                  <div>
                    <h2 className="font-semibold text-sm">AI Study Assistant</h2>
                    <p className="text-[10px] text-muted-foreground">
                      Powered by Gemini 2.5 Flash
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <TooltipProvider delayDuration={300}>
                  {/* Clear Chat */}
                  {messages.length > 0 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowClearConfirm(true)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Clear conversation</TooltipContent>
                    </Tooltip>
                  )}
                  {/* Close */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={closePanel}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Close panel</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Clear Confirmation */}
            <AnimatePresence>
              {showClearConfirm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-b border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 p-3 shrink-0"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      Clear all messages?
                    </p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowClearConfirm(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          clearMessages();
                          setShowClearConfirm(false);
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Actions - Scrollable Row */}
            <div className="border-b-2 border-border px-3 py-2 shrink-0 overflow-x-auto scrollbar-none bg-muted/30">
              <div className="w-max">
                <QuickActions onAction={onQuickAction} disabled={isLoading} />
              </div>
            </div>

            {/* Error Banner */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-b border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20 p-3"
                >
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-rose-500" />
                    <p className="text-sm text-rose-700 dark:text-rose-300 flex-1">
                      {error}
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setError(null)}
                      className="h-6 px-2"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            <ScrollArea className="flex-1 min-h-0 p-4">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-8 text-center"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="mb-6 relative h-32 w-32"
                    >
                      <NextImage
                        src="/assets/ai-mascot.png"
                        alt="AI Mascot"
                        fill
                        className="object-contain drop-shadow-xl"
                        priority
                      />
                    </motion.div>
                    <h3 className="font-bold text-lg text-foreground mb-2">
                      How can I help you learn?
                    </h3>
                    <p className="mt-2 max-w-[220px] text-sm text-muted-foreground">
                      Ask me anything about this question or use the quick actions above.
                    </p>

                    {/* Suggestion chips */}
                    <div className="mt-6 space-y-2">
                      <p className="text-xs text-muted-foreground">Try asking:</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {[
                          "Explain this concept",
                          "Give me a hint",
                          "Why is A wrong?",
                        ].map((suggestion) => (
                          <motion.button
                            key={suggestion}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSendMessage(suggestion)}
                            className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors"
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  messages.map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))
                )}

                {/* Streaming indicator */}
                {streaming.isStreaming && <TypingIndicator />}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t-2 border-border p-4 bg-background/50 backdrop-blur-md">
              <ChatInput
                onSend={onSendMessage}
                disabled={isLoading}
                placeholder="Ask me anything..."
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

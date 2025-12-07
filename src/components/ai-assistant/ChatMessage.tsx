"use client";

import { motion } from "framer-motion";
import { User, Sparkles, Copy, Check, RefreshCw } from "lucide-react";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { chatMessageVariants } from "@/lib/animations";
import type { ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatMessageProps {
  message: ChatMessageType;
  onRetry?: () => void;
}

export function ChatMessage({ message, onRetry }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const isError = message.status === "error";
  const isStreaming = message.status === "sending" || message.status === "streaming";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      variants={chatMessageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={cn("flex gap-3", isUser && "flex-row-reverse")}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser
            ? "bg-muted"
            : "bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-500/20"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Sparkles className="h-4 w-4 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          "group relative max-w-[85%] rounded-3xl px-5 py-3.5 shadow-sm transition-all hover:shadow-md",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-lg"
            : "bg-white dark:bg-muted/40 border-2 border-border/50 rounded-bl-lg",
          isError && "border-rose-300 dark:border-rose-700 bg-rose-50 dark:bg-rose-900/20"
        )}
      >
        {/* Message Text with Markdown-like rendering */}
        <div className={cn(
          "prose prose-sm dark:prose-invert max-w-none",
          isUser && "prose-invert"
        )}>
          {message.content ? (
            <MessageContent content={message.content} isUser={isUser} />
          ) : isStreaming ? (
            <span className="inline-flex items-center gap-1 text-muted-foreground">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Thinking...
              </motion.span>
            </span>
          ) : null}
        </div>

        {/* Actions (AI messages only) */}
        {!isUser && message.content && !isStreaming && (
          <div className={cn(
            "absolute -right-2 -top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          )}>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="h-7 w-7 bg-card border border-border shadow-sm"
            >
              {copied ? (
                <Check className="h-3 w-3 text-emerald-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
            {isError && onRetry && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onRetry}
                className="h-7 w-7 bg-card border border-border shadow-sm"
              >
                <RefreshCw className="h-3 w-3" />
              </Button>
            )}
          </div>
        )}

        {/* Timestamp */}
        <span
          className={cn(
            "mt-1 block text-[10px]",
            isUser ? "text-primary-foreground/60" : "text-muted-foreground"
          )}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}

// Enhanced markdown-like content renderer
function MessageContent({ content, isUser }: { content: string; isUser: boolean }) {
  const parts = useMemo(() => content.split(/(```[\s\S]*?```)/g), [content]);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("```")) {
          // Code block
          const match = part.match(/```(\w+)?\n?([\s\S]*?)```/);
          const language = match?.[1] || "";
          const codeContent = match?.[2] || part.replace(/```\w*\n?/, "").replace(/```$/, "");

          return (
            <CodeBlock key={index} language={language} code={codeContent.trim()} />
          );
        }

        // Regular text with inline formatting
        return <TextContent key={index} text={part} isUser={isUser} />;
      })}
    </>
  );
}

// Code block component with syntax highlighting
function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group/code relative my-3 rounded-lg overflow-hidden">
      {/* Header */}
      {language && (
        <div className="flex items-center justify-between bg-gray-800 px-3 py-1.5 text-xs text-gray-400">
          <span>{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 opacity-0 group-hover/code:opacity-100 transition-opacity hover:text-white"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </button>
        </div>
      )}
      {/* Code content */}
      <pre className="overflow-x-auto bg-gray-900 p-3 text-sm">
        <code className="text-gray-100 font-mono">{highlightCode(code, language)}</code>
      </pre>
    </div>
  );
}

// Basic syntax highlighting
function highlightCode(code: string, language: string): React.ReactNode {
  // Simple keyword highlighting for common languages
  const keywords: Record<string, string[]> = {
    javascript: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "class", "import", "export", "from", "async", "await", "try", "catch"],
    typescript: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "class", "import", "export", "from", "async", "await", "try", "catch", "interface", "type", "enum"],
    python: ["def", "class", "return", "if", "else", "elif", "for", "while", "import", "from", "try", "except", "with", "as", "lambda", "yield", "async", "await"],
    js: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "class", "import", "export", "from", "async", "await"],
    ts: ["const", "let", "var", "function", "return", "if", "else", "for", "while", "class", "import", "export", "from", "async", "await", "interface", "type"],
  };

  const langKeywords = keywords[language.toLowerCase()] || [];

  if (langKeywords.length === 0) {
    return code;
  }

  // Split by words and highlight keywords
  const parts = code.split(/(\b\w+\b)/g);

  return parts.map((part, i) => {
    if (langKeywords.includes(part)) {
      return (
        <span key={i} className="text-purple-400 font-medium">
          {part}
        </span>
      );
    }
    // Highlight strings
    if (/^["'`].*["'`]$/.test(part)) {
      return (
        <span key={i} className="text-emerald-400">
          {part}
        </span>
      );
    }
    // Highlight numbers
    if (/^\d+$/.test(part)) {
      return (
        <span key={i} className="text-amber-400">
          {part}
        </span>
      );
    }
    return part;
  });
}

function TextContent({ text, isUser }: { text: string; isUser: boolean }) {
  const lines = text.split("\n");

  return (
    <>
      {lines.map((line, i) => {
        // Headers
        if (line.startsWith("### ")) {
          return (
            <h4 key={i} className={cn(
              "font-semibold mt-3 mb-1",
              !isUser && "text-foreground"
            )}>
              {processInlineFormatting(line.slice(4), isUser)}
            </h4>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h3 key={i} className={cn(
              "font-bold mt-3 mb-1",
              !isUser && "text-foreground"
            )}>
              {processInlineFormatting(line.slice(3), isUser)}
            </h3>
          );
        }

        // Bullet points
        if (line.startsWith("- ") || line.startsWith("• ") || line.startsWith("* ")) {
          return (
            <div key={i} className="flex gap-2 ml-2 my-0.5">
              <span className={cn(isUser ? "text-primary-foreground/70" : "text-primary")}>•</span>
              <span>{processInlineFormatting(line.slice(2), isUser)}</span>
            </div>
          );
        }

        // Numbered lists
        const numberedMatch = line.match(/^(\d+)\.\s/);
        if (numberedMatch) {
          return (
            <div key={i} className="flex gap-2 ml-2 my-0.5">
              <span className={cn(
                "font-medium",
                isUser ? "text-primary-foreground/70" : "text-primary"
              )}>
                {numberedMatch[1]}.
              </span>
              <span>
                {processInlineFormatting(line.slice(numberedMatch[0].length), isUser)}
              </span>
            </div>
          );
        }

        // Empty lines
        if (line.trim() === "") {
          return <div key={i} className="h-2" />;
        }

        // Regular paragraph
        return (
          <p key={i} className="leading-relaxed my-0.5">
            {processInlineFormatting(line, isUser)}
          </p>
        );
      })}
    </>
  );
}

function processInlineFormatting(text: string, isUser: boolean): React.ReactNode {
  // Process bold, italic, and code
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);

  return parts.map((part, i) => {
    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className={cn(
          "font-semibold",
          !isUser && "text-foreground"
        )}>
          {part.slice(2, -2)}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
      return (
        <em key={i}>
          {part.slice(1, -1)}
        </em>
      );
    }

    // Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className={cn(
            "rounded px-1 py-0.5 text-sm font-mono",
            isUser
              ? "bg-white/20 text-primary-foreground"
              : "bg-muted text-primary"
          )}
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return <span key={i}>{part}</span>;
  });
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "numeric",
  }).format(new Date(date));
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Case } from "@/types/exam";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface CaseStudyDisplayProps {
    caseData: Case;
    currentQuestionIndex: number;
    totalQuestions: number;
    isExpanded?: boolean;
    onToggleExpand?: () => void;
    onAskAI?: (prompt: string) => void;
}

import { SelectableTextWrapper } from "@/components/ai-assistant/SelectableTextWrapper";

export function CaseStudyDisplay({
    caseData,
    currentQuestionIndex,
    totalQuestions,
    isExpanded = true,
    onToggleExpand,
    onAskAI,
}: CaseStudyDisplayProps) {
    const [localExpanded, setLocalExpanded] = useState(isExpanded);

    const expanded = onToggleExpand ? isExpanded : localExpanded;
    const toggleExpand = onToggleExpand || (() => setLocalExpanded(!localExpanded));

    return (
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
            {/* Header */}
            <div
                className="flex items-center justify-between p-4 bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors border-b border-border/50"
                onClick={toggleExpand}
            >
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                        <FileText className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                Case Study {caseData.caseNumber}
                            </span>
                        </div>
                        <h3 className="font-semibold text-lg leading-tight text-foreground">
                            {caseData.title || "Reading Passage"}
                        </h3>
                    </div>
                    {/* Progress Badge */}
                    <div className="ml-4 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium text-muted-foreground">
                        Question {currentQuestionIndex + 1} of {totalQuestions}
                    </div>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0">
                    {expanded ? (
                        <ChevronUp className="h-5 w-5" />
                    ) : (
                        <ChevronDown className="h-5 w-5" />
                    )}
                </Button>
            </div>

            {/* Content */}
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-white dark:bg-zinc-900/50"
                    >
                        <div className="p-6 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent">
                            {onAskAI ? (
                                <SelectableTextWrapper onAskAI={onAskAI}>
                                    <MarkdownContent content={caseData.content} />
                                </SelectableTextWrapper>
                            ) : (
                                <MarkdownContent content={caseData.content} />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function MarkdownContent({ content }: { content: string }) {
    return (
        <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:underline">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    table: ({ children }) => (
                        <div className="my-6 w-full overflow-hidden rounded-lg border border-border shadow-sm">
                            <table className="w-full text-sm text-left">{children}</table>
                        </div>
                    ),
                    thead: ({ children }) => (
                        <thead className="bg-muted/50 text-xs uppercase font-medium text-muted-foreground border-b border-border">
                            {children}
                        </thead>
                    ),
                    tbody: ({ children }) => (
                        <tbody className="divide-y divide-border bg-card">
                            {children}
                        </tbody>
                    ),
                    tr: ({ children }) => (
                        <tr className="hover:bg-muted/30 transition-colors">
                            {children}
                        </tr>
                    ),
                    th: ({ children }) => (
                        <th className="px-4 py-3 font-semibold tracking-wider">
                            {children}
                        </th>
                    ),
                    td: ({ children }) => (
                        <td className="px-4 py-3 text-foreground/80">
                            {children}
                        </td>
                    ),
                    p: ({ children }) => (
                        <p className="mb-4 leading-relaxed text-foreground/90">
                            {children}
                        </p>
                    ),
                    ul: ({ children }) => (
                        <ul className="my-4 list-disc pl-6 space-y-1 text-foreground/90">
                            {children}
                        </ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="my-4 list-decimal pl-6 space-y-1 text-foreground/90">
                            {children}
                        </ol>
                    ),
                    blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 py-2 pl-4 pr-2 italic my-4 rounded-r-lg">
                            {children}
                        </blockquote>
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}

export default CaseStudyDisplay;

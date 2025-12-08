"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
    content: string;
    className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
    // Function to preprocess content and fix "headerless" tables
    const preprocessContent = (text: string) => {
        if (!text) return "";

        const lines = text.split("\n");
        const processedLines: string[] = [];
        let inTable = false;
        let tableBuffer: string[] = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            const isTableLine = line.startsWith("|") && line.includes("|");

            if (isTableLine) {
                if (!inTable) {
                    inTable = true;
                    tableBuffer = [];
                }
                tableBuffer.push(line);
            } else {
                if (inTable) {
                    // End of table block, process it
                    processTableBuffer(tableBuffer, processedLines);
                    inTable = false;
                }
                processedLines.push(lines[i]);
            }
        }

        // Flush remaining buffer if file ends with a table
        if (inTable) {
            processTableBuffer(tableBuffer, processedLines);
        }

        return processedLines.join("\n");
    };

    const processTableBuffer = (buffer: string[], output: string[]) => {
        if (buffer.length === 0) return;

        // Check if it already has a separator row (e.g. |---|---|)
        const hasSeparator = buffer.some(line => line.match(/^\|\s*[-:]+\s*\|/));

        if (!hasSeparator) {
            // Detect columns from the first row to determine separator length
            const firstRow = buffer[0];
            // Count pipes - 1 roughly equals columns (ignoring escaped pipes for now basic implementation)
            const colCount = (firstRow.match(/\|/g) || []).length - 1;

            if (colCount > 0) {
                // Inject separator after the first row (header)
                // Assume first row is header
                output.push(buffer[0]);

                // Create separator row: | --- | --- | ...
                const separator = "|" + Array(colCount).fill(" --- ").join("|") + "|";
                output.push(separator);

                // Push the rest
                for (let k = 1; k < buffer.length; k++) {
                    output.push(buffer[k]);
                }
                return;
            }
        }

        // If it has separator or couldn't parse, just push original lines
        output.push(...buffer);
    };

    const processedContent = preprocessContent(content);

    return (
        <div className={cn("prose dark:prose-invert max-w-none", className)}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    table: ({ node, ...props }) => (
                        <div className="my-6 w-full overflow-hidden rounded-lg border border-border shadow-sm">
                            <table className="w-full border-collapse bg-card text-sm" {...props} />
                        </div>
                    ),
                    thead: ({ node, ...props }) => (
                        <thead className="bg-muted/50" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                        <th
                            className="border-b border-border px-4 py-3 text-left font-medium text-muted-foreground [&[align=center]]:text-center [&[align=right]]:text-right"
                            {...props}
                        />
                    ),
                    tr: ({ node, ...props }) => (
                        <tr
                            className="border-b border-border/50 bg-card transition-colors hover:bg-muted/30 last:border-0"
                            {...props}
                        />
                    ),
                    td: ({ node, ...props }) => (
                        <td
                            className="px-4 py-3 align-middle text-foreground [&[align=center]]:text-center [&[align=right]]:text-right"
                            {...props}
                        />
                    ),
                    p: ({ node, ...props }) => (
                        <p className="leading-relaxed text-foreground [&:not(:first-child)]:mt-6" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                        <li className="text-foreground" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground" {...props} />
                    ),
                }}
            >
                {processedContent}
            </ReactMarkdown>
        </div>
    );
}

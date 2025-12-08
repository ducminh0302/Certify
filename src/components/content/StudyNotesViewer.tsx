"use client";

import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Download,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Calculator,
  FileText,
  Link2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { StudyNote, Formula, Example } from "@/types/content";

// Lazy load MermaidDiagram
const MermaidDiagram = lazy(() =>
  import("@/components/visual/MermaidDiagram").then((mod) => ({
    default: mod.MermaidDiagram,
  }))
);

interface StudyNotesViewerProps {
  note: StudyNote;
  onBookmark?: (noteId: string) => void;
  onTopicClick?: (topic: string) => void;
  onExport?: () => void;
  className?: string;
}

export function StudyNotesViewer({
  note,
  onBookmark,
  onTopicClick,
  onExport,
  className,
}: StudyNotesViewerProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "content",
    "keyPoints",
  ]);
  const [copiedFormula, setCopiedFormula] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const copyFormula = async (formula: Formula) => {
    await navigator.clipboard.writeText(formula.formula);
    setCopiedFormula(formula.id);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">
              {note.topic}
            </span>
            {note.source === "ai-generated" && (
              <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                AI Generated
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold">{note.title}</h1>
        </div>
        <div className="flex gap-2">
          {onBookmark && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onBookmark(note.id)}
            >
              {note.isBookmarked ? (
                <BookmarkCheck className="h-5 w-5 text-amber-500" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
          )}
          {onExport && (
            <Button variant="ghost" size="icon" onClick={onExport}>
              <Download className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Key Points */}
      <CollapsibleSection
        title="Key Points"
        icon={<Lightbulb className="h-5 w-5 text-amber-500" />}
        isExpanded={expandedSections.includes("keyPoints")}
        onToggle={() => toggleSection("keyPoints")}
      >
        <ul className="space-y-2">
          {note.keyPoints.map((point, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
            >
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {index + 1}.
              </span>
              <span>{point}</span>
            </motion.li>
          ))}
        </ul>
      </CollapsibleSection>

      {/* Main Content */}
      <CollapsibleSection
        title="Detailed Notes"
        icon={<FileText className="h-5 w-5 text-blue-500" />}
        isExpanded={expandedSections.includes("content")}
        onToggle={() => toggleSection("content")}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <MarkdownContent content={note.content} />
        </div>
      </CollapsibleSection>

      {/* Formulas */}
      {note.formulas && note.formulas.length > 0 && (
        <CollapsibleSection
          title={`Formulas (${note.formulas.length})`}
          icon={<Calculator className="h-5 w-5 text-emerald-500" />}
          isExpanded={expandedSections.includes("formulas")}
          onToggle={() => toggleSection("formulas")}
        >
          <div className="space-y-4">
            {note.formulas.map((formula) => (
              <FormulaCard
                key={formula.id}
                formula={formula}
                isCopied={copiedFormula === formula.id}
                onCopy={() => copyFormula(formula)}
              />
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Examples */}
      {note.examples && note.examples.length > 0 && (
        <CollapsibleSection
          title={`Examples (${note.examples.length})`}
          icon={<Lightbulb className="h-5 w-5 text-purple-500" />}
          isExpanded={expandedSections.includes("examples")}
          onToggle={() => toggleSection("examples")}
        >
          <div className="space-y-4">
            {note.examples.map((example) => (
              <ExampleCard key={example.id} example={example} />
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* Related Topics */}
      {note.relatedTopics && note.relatedTopics.length > 0 && (
        <CollapsibleSection
          title="Related Topics"
          icon={<Link2 className="h-5 w-5 text-indigo-500" />}
          isExpanded={expandedSections.includes("related")}
          onToggle={() => toggleSection("related")}
        >
          <div className="flex flex-wrap gap-2">
            {note.relatedTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => onTopicClick?.(topic)}
                className="px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
}

// Collapsible Section Component
interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function CollapsibleSection({
  title,
  icon,
  isExpanded,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors"
      >
        {icon}
        <span className="font-semibold flex-1 text-left">{title}</span>
        {isExpanded ? (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      {isExpanded && <div className="px-4 pb-4">{children}</div>}
    </div>
  );
}

// Formula Card Component
interface FormulaCardProps {
  formula: Formula;
  isCopied: boolean;
  onCopy: () => void;
}

function FormulaCard({ formula, isCopied, onCopy }: FormulaCardProps) {
  return (
    <div className="p-4 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-emerald-700 dark:text-emerald-300">
          {formula.name}
        </h4>
        <Button variant="ghost" size="sm" onClick={onCopy}>
          {isCopied ? (
            <Check className="h-4 w-4 text-emerald-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="p-3 bg-white dark:bg-card rounded-lg font-mono text-lg mb-3">
        {formula.formula}
      </div>
      <p className="text-sm text-muted-foreground mb-2">{formula.description}</p>
      {formula.variables && formula.variables.length > 0 && (
        <div className="text-sm">
          <span className="font-medium">Variables: </span>
          {formula.variables.map((v, i) => (
            <span key={v.symbol}>
              <code className="px-1 bg-muted rounded">{v.symbol}</code> = {v.meaning}
              {i < formula.variables!.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// Example Card Component
function ExampleCard({ example }: { example: Example }) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
      <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
        {example.title}
      </h4>
      <div className="mb-3">
        <span className="text-sm font-medium text-muted-foreground">Problem:</span>
        <p className="mt-1">{example.problem}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowSolution(!showSolution)}
        className="mb-3"
      >
        {showSolution ? "Hide Solution" : "Show Solution"}
      </Button>
      {showSolution && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="space-y-3"
        >
          <div>
            <span className="text-sm font-medium text-muted-foreground">Solution:</span>
            <p className="mt-1 p-3 bg-white dark:bg-card rounded-lg">
              {example.solution}
            </p>
          </div>
          {example.explanation && (
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Explanation:
              </span>
              <p className="mt-1 text-sm text-muted-foreground">
                {example.explanation}
              </p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// Simple Markdown Content Renderer
function MarkdownContent({ content }: { content: string }) {
  // Parse markdown-like content
  const lines = content.split("\n");

  return (
    <>
      {lines.map((line, i) => {
        // Headers
        if (line.startsWith("### ")) {
          return (
            <h4 key={i} className="font-semibold mt-4 mb-2">
              {line.slice(4)}
            </h4>
          );
        }
        if (line.startsWith("## ")) {
          return (
            <h3 key={i} className="font-bold mt-4 mb-2">
              {line.slice(3)}
            </h3>
          );
        }

        // Check for mermaid blocks
        if (line.startsWith("```mermaid")) {
          // Find end of mermaid block
          let mermaidContent = "";
          let j = i + 1;
          while (j < lines.length && !lines[j].startsWith("```")) {
            mermaidContent += lines[j] + "\n";
            j++;
          }
          if (mermaidContent) {
            return (
              <Suspense
                key={i}
                fallback={
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                }
              >
                <MermaidDiagram chart={mermaidContent.trim()} />
              </Suspense>
            );
          }
        }

        // Skip lines that are part of mermaid block
        if (line.startsWith("```") || lines[i - 1]?.includes("mermaid")) {
          return null;
        }

        // Bullet points
        if (line.startsWith("- ") || line.startsWith("* ")) {
          return (
            <li key={i} className="ml-4">
              {line.slice(2)}
            </li>
          );
        }

        // Empty lines
        if (line.trim() === "") {
          return <br key={i} />;
        }

        // Regular paragraph
        return <p key={i}>{line}</p>;
      })}
    </>
  );
}

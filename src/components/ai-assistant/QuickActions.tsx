"use client";

import { motion } from "framer-motion";
import { Lightbulb, HelpCircle, XCircle, BookOpen, GitBranch, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonTapSubtle, staggerContainerFast, fadeInUp } from "@/lib/animations";

interface QuickActionsProps {
  onAction: (action: string) => void;
  disabled?: boolean;
}

const quickActions = [
  {
    id: "explain",
    label: "Explain this",
    icon: Lightbulb,
    prompt:
      "Please explain this question in simple terms. What concept is it testing and what should I understand to answer it correctly?",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30",
    textColor: "text-amber-700 dark:text-amber-400",
  },
  {
    id: "hint",
    label: "Give me a hint",
    icon: HelpCircle,
    prompt:
      "Give me a helpful hint for this question without revealing the answer directly. Guide me toward the right thinking process.",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30",
    textColor: "text-indigo-700 dark:text-indigo-400",
  },
  {
    id: "wrong",
    label: "Why wrong?",
    icon: XCircle,
    prompt:
      "I got this wrong. Can you explain why my answer was incorrect and help me understand the right concept?",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50 dark:bg-rose-900/20 hover:bg-rose-100 dark:hover:bg-rose-900/30",
    textColor: "text-rose-700 dark:text-rose-400",
  },
  {
    id: "concepts",
    label: "Related concepts",
    icon: BookOpen,
    prompt:
      "What related concepts should I study to better understand this topic? Give me a brief overview of each.",
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30",
    textColor: "text-emerald-700 dark:text-emerald-400",
  },
  {
    id: "mindmap",
    label: "Mind Map",
    icon: GitBranch,
    prompt:
      `Create a mind map showing the key concepts related to this question.

Format your response as a Mermaid mindmap diagram:
\`\`\`mermaid
mindmap
  root((Main Topic))
    Concept 1
      Sub-concept 1.1
      Sub-concept 1.2
    Concept 2
      Sub-concept 2.1
    Concept 3
\`\`\`

After the diagram, briefly explain each main branch (2-3 sentences each).`,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30",
    textColor: "text-cyan-700 dark:text-cyan-400",
  },
  {
    id: "flowchart",
    label: "Flowchart",
    icon: Workflow,
    prompt:
      `Create a flowchart showing the process or decision flow for solving this type of question.

Use a Mermaid flowchart:
\`\`\`mermaid
graph TD
    A[Start: Read Question] --> B{Identify Key Concept}
    B --> C[Apply Formula/Rule]
    C --> D{Check Answer}
    D -->|Correct| E[Done]
    D -->|Wrong| F[Review Concept]
    F --> B
\`\`\`

Then explain each step briefly.`,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50 dark:bg-violet-900/20 hover:bg-violet-100 dark:hover:bg-violet-900/30",
    textColor: "text-violet-700 dark:text-violet-400",
  },
];

export function QuickActions({ onAction, disabled = false }: QuickActionsProps) {
  return (
    <motion.div
      variants={staggerContainerFast}
      initial="initial"
      animate="animate"
      className="flex flex-wrap gap-2"
    >
      {quickActions.map((action) => (
        <motion.button
          key={action.id}
          variants={fadeInUp}
          {...buttonTapSubtle}
          onClick={() => onAction(action.prompt)}
          disabled={disabled}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
            action.bgColor,
            action.textColor,
            "border border-transparent",
            "hover:border-current/20 hover:shadow-sm",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <action.icon className="h-3.5 w-3.5" />
          {action.label}
        </motion.button>
      ))}
    </motion.div>
  );
}

"use client";

import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MindMapNode {
  id: string;
  label: string;
  children?: MindMapNode[];
  color?: string;
}

interface MindMapProps {
  data: MindMapNode;
  className?: string;
  onNodeClick?: (node: MindMapNode) => void;
}

// Color palette for different levels
const COLORS = [
  "from-indigo-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-pink-500 to-rose-600",
  "from-cyan-500 to-blue-600",
  "from-violet-500 to-purple-600",
];

export function MindMap({ data, className, onNodeClick }: MindMapProps) {
  const getColor = useCallback((depth: number, index: number) => {
    if (depth === 0) return "from-indigo-600 to-purple-700";
    return COLORS[(index + depth) % COLORS.length];
  }, []);

  return (
    <div className={cn("p-4 overflow-auto", className)}>
      <div className="min-w-max">
        <MindMapNodeComponent
          node={data}
          depth={0}
          index={0}
          getColor={getColor}
          onNodeClick={onNodeClick}
        />
      </div>
    </div>
  );
}

interface MindMapNodeComponentProps {
  node: MindMapNode;
  depth: number;
  index: number;
  getColor: (depth: number, index: number) => string;
  onNodeClick?: (node: MindMapNode) => void;
}

function MindMapNodeComponent({
  node,
  depth,
  index,
  getColor,
  onNodeClick,
}: MindMapNodeComponentProps) {
  const hasChildren = node.children && node.children.length > 0;
  const colorClass = node.color || getColor(depth, index);

  return (
    <div className="flex items-start gap-4">
      {/* Node */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: depth * 0.1 + index * 0.05 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onNodeClick?.(node)}
        className={cn(
          "relative px-4 py-2 rounded-xl font-medium text-white shadow-lg",
          "bg-gradient-to-br",
          colorClass,
          depth === 0 ? "text-lg px-6 py-3" : "text-sm",
          "hover:shadow-xl transition-shadow cursor-pointer"
        )}
      >
        {node.label}

        {/* Connector line to children */}
        {hasChildren && (
          <div className="absolute top-1/2 -right-4 w-4 h-px bg-border" />
        )}
      </motion.button>

      {/* Children */}
      {hasChildren && (
        <div className="flex flex-col gap-2 relative">
          {/* Vertical connector line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px bg-border"
            style={{
              top: node.children!.length > 1 ? "50%" : "0",
              height: node.children!.length > 1 ? `${(node.children!.length - 1) * 100}%` : "0",
              transform: node.children!.length > 1 ? "translateY(-50%)" : "none",
            }}
          />

          {node.children!.map((child, i) => (
            <div key={child.id} className="flex items-center">
              {/* Horizontal connector */}
              <div className="w-4 h-px bg-border" />

              <MindMapNodeComponent
                node={child}
                depth={depth + 1}
                index={i}
                getColor={getColor}
                onNodeClick={onNodeClick}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Simple mind map renderer from text structure
export function SimpleMindMap({
  topic,
  subtopics,
  className,
  onTopicClick,
}: {
  topic: string;
  subtopics: string[];
  className?: string;
  onTopicClick?: (topic: string) => void;
}) {
  const data: MindMapNode = useMemo(
    () => ({
      id: "root",
      label: topic,
      children: subtopics.map((sub, i) => ({
        id: `sub-${i}`,
        label: sub,
      })),
    }),
    [topic, subtopics]
  );

  return (
    <MindMap
      data={data}
      className={className}
      onNodeClick={(node) => onTopicClick?.(node.label)}
    />
  );
}

// Parse mind map from AI response
export function parseMindMapFromText(text: string): MindMapNode | null {
  // Try to parse structured format like:
  // **Main Topic**
  // - Subtopic 1
  //   - Detail 1
  //   - Detail 2
  // - Subtopic 2

  const lines = text.split("\n").filter((line) => line.trim());
  if (lines.length === 0) return null;

  // Find main topic (first bold text or first line)
  let mainTopic = lines[0].replace(/\*\*/g, "").replace(/^#+\s*/, "").trim();

  const children: MindMapNode[] = [];
  let currentParent: MindMapNode | null = null;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check indentation level
    const indent = line.search(/\S/);
    const isSubItem = indent > 2 || line.startsWith("  -");

    // Extract text (remove bullet points)
    const text = trimmed
      .replace(/^[-*•]\s*/, "")
      .replace(/^\d+\.\s*/, "")
      .replace(/\*\*/g, "")
      .trim();

    if (!text) continue;

    if (isSubItem && currentParent) {
      // Add as child of current parent
      if (!currentParent.children) currentParent.children = [];
      currentParent.children.push({
        id: `node-${i}`,
        label: text,
      });
    } else if (trimmed.startsWith("-") || trimmed.startsWith("*") || trimmed.match(/^\d+\./)) {
      // New top-level item
      currentParent = {
        id: `node-${i}`,
        label: text,
        children: [],
      };
      children.push(currentParent);
    }
  }

  return {
    id: "root",
    label: mainTopic,
    children: children.length > 0 ? children : undefined,
  };
}

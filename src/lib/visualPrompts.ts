/**
 * Prompts for generating visual content from AI
 */

export const VISUAL_PROMPTS = {
  // Mind map of concept relationships
  mindMap: (topic: string) => `Create a mind map showing the key concepts related to "${topic}".

Format your response as a Mermaid mindmap diagram:
\`\`\`mermaid
mindmap
  root((${topic}))
    Concept 1
      Sub-concept 1.1
      Sub-concept 1.2
    Concept 2
      Sub-concept 2.1
    Concept 3
\`\`\`

After the diagram, briefly explain each main branch (2-3 sentences each).`,

  // Flowchart for processes
  flowchart: (topic: string) => `Create a flowchart showing the process or decision flow for "${topic}".

Use a Mermaid flowchart:
\`\`\`mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
\`\`\`

Then explain each step briefly.`,

  // Concept comparison
  comparison: (concept1: string, concept2: string) => `Compare and contrast "${concept1}" vs "${concept2}".

First, show the comparison visually:
\`\`\`mermaid
graph LR
    subgraph "${concept1}"
        A1[Feature 1]
        A2[Feature 2]
    end
    subgraph "${concept2}"
        B1[Feature 1]
        B2[Feature 2]
    end
    A1 -.->|differs| B1
    A2 -.->|similar| B2
\`\`\`

Then provide a comparison table and explain key differences.`,

  // Topic hierarchy
  hierarchy: (topic: string) => `Show the hierarchical structure of "${topic}" and its related concepts.

\`\`\`mermaid
graph TB
    A[${topic}] --> B[Category 1]
    A --> C[Category 2]
    B --> D[Sub-item]
    B --> E[Sub-item]
    C --> F[Sub-item]
\`\`\`

Explain how these concepts relate to each other.`,

  // Formula breakdown
  formulaBreakdown: (formula: string) => `Break down and explain this formula: ${formula}

Show the components and their relationships:
\`\`\`mermaid
graph LR
    A[Formula] --> B[Component 1]
    A --> C[Component 2]
    B --> D[Meaning]
    C --> E[Meaning]
\`\`\`

Then explain each variable and when to use this formula.`,

  // Study roadmap
  studyRoadmap: (topic: string) => `Create a study roadmap for mastering "${topic}".

\`\`\`mermaid
graph LR
    A[Prerequisites] --> B[Fundamentals]
    B --> C[Core Concepts]
    C --> D[Advanced Topics]
    D --> E[Practice Problems]
    E --> F[Mastery]
\`\`\`

List what to study at each stage.`,
};

// Quick action prompts for visual content
export const VISUAL_QUICK_ACTIONS = [
  {
    id: "mind-map",
    label: "Mind Map",
    icon: "git-branch",
    prompt: (topic: string) => VISUAL_PROMPTS.mindMap(topic),
  },
  {
    id: "flowchart",
    label: "Flowchart",
    icon: "workflow",
    prompt: (topic: string) => VISUAL_PROMPTS.flowchart(topic),
  },
  {
    id: "comparison",
    label: "Compare",
    icon: "scale",
    prompt: (topic: string) =>
      `Compare the key concepts in this question. Show similarities and differences visually using a Mermaid diagram, then explain.`,
  },
  {
    id: "hierarchy",
    label: "Structure",
    icon: "list-tree",
    prompt: (topic: string) => VISUAL_PROMPTS.hierarchy(topic),
  },
];

// Check if a response contains visual content
export function hasVisualContent(content: string): boolean {
  return (
    content.includes("```mermaid") ||
    content.includes("```diagram") ||
    content.includes("┌") || // ASCII tables
    content.includes("│")
  );
}

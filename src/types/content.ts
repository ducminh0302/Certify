// ============================================
// SLIDES TYPES
// ============================================

export interface Slide {
  id: string;
  type: "title" | "content" | "bullets" | "comparison" | "diagram" | "summary";
  title: string;
  content?: string;
  bullets?: string[];
  notes?: string; // Presenter notes
  diagram?: string; // Mermaid diagram code
  leftColumn?: { title: string; items: string[] };
  rightColumn?: { title: string; items: string[] };
}

export interface SlidesDeck {
  id: string;
  topic: string;
  title: string;
  description?: string;
  slides: Slide[];
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// STUDY NOTES TYPES
// ============================================

export interface StudyNote {
  id: string;
  topic: string;
  title: string;
  content: string; // Markdown content
  keyPoints: string[];
  formulas?: Formula[];
  examples?: Example[];
  relatedTopics?: string[];
  createdAt: Date;
  updatedAt: Date;
  isBookmarked: boolean;
  source?: "ai-generated" | "user-created";
}

export interface Formula {
  id: string;
  name: string;
  formula: string; // LaTeX or plain text
  description: string;
  variables?: { symbol: string; meaning: string }[];
}

export interface Example {
  id: string;
  title: string;
  problem: string;
  solution: string;
  explanation?: string;
}

// ============================================
// PERSONAL NOTES TYPES
// ============================================

export interface PersonalNote {
  id: string;
  questionId?: string; // Optional link to specific question
  topic?: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  color?: string;
}

// ============================================
// BOOKMARKS TYPES
// ============================================

export interface Bookmark {
  id: string;
  type: "question" | "explanation" | "note" | "slide";
  referenceId: string;
  title: string;
  preview?: string;
  topic?: string;
  createdAt: Date;
}

// ============================================
// EXPORT TYPES
// ============================================

export interface ExportConfig {
  format: "pdf" | "markdown" | "html";
  includeNotes: boolean;
  includeFormulas: boolean;
  includeExamples: boolean;
  includeDiagrams: boolean;
}

import type { Exam } from "@/types/exam";

// Exam metadata ONLY - no questions (lightweight for fast loading)
export interface ExamMetadata {
  id: string;
  name: string;
  description: string;
  category: "cfa" | "aws" | "azure" | "gcp" | "pmp";
  level?: string;
  totalQuestions: number;
  timeLimit: number;
  passingScore: number;
  icon: string;
  topics?: string[];
}

// Lightweight metadata - loaded immediately (< 1KB)
export const examMetadata: ExamMetadata[] = [
  {
    id: "cfa-level-1-session-1",
    name: "CFA Level I - Session 1 (Ethics & Tools)",
    description: "Ethics, Professional Standards, Quantitative Methods, and Economics",
    category: "cfa",
    level: "1",
    totalQuestions: 90,
    timeLimit: 135,
    passingScore: 70,
    icon: "📊",
    topics: [
      "Ethics & Professional Standards",
      "Quantitative Methods",
      "Economics",
    ],
  },
  {
    id: "cfa-level-1-session-2",
    name: "CFA Level I - Session 2 (Assets & Portfolio)",
    description: "Financial Reporting, Corporate Finance, Equity, Fixed Income, Derivatives, and Portfolio Management",
    category: "cfa",
    level: "1",
    totalQuestions: 88,
    timeLimit: 132,
    passingScore: 70,
    icon: "📈",
    topics: [
      "Financial Statement Analysis",
      "Corporate Finance",
      "Equity Investments",
      "Fixed Income",
      "Derivatives",
      "Alternative Investments",
      "Portfolio Management",
    ],
  },
  // CFA Level 2 - Case Study Format
  {
    id: "cfa-level-2-session-1",
    name: "CFA Level II - Session 1",
    description: "Item Sets: Quantitative Methods, Economics, Financial Reporting, Corporate Finance",
    category: "cfa",
    level: "2",
    totalQuestions: 44, // All 11 cases complete
    timeLimit: 132,
    passingScore: 70,
    icon: "📋",
    topics: [
      "Quantitative Methods",
      "Economics",
      "Financial Statement Analysis",
      "Corporate Finance",
      "Equity Investments",
      "Ethics",
    ],
  },
  {
    id: "cfa-level-2-session-2",
    name: "CFA Level II - Session 2",
    description: "Item Sets: Equity, Fixed Income, Derivatives, Portfolio Management, Ethics",
    category: "cfa",
    level: "2",
    totalQuestions: 44,
    timeLimit: 132,
    passingScore: 70,
    icon: "📈",
    topics: [
      "Equity Investments",
      "Fixed Income",
      "Derivatives",
      "Portfolio Management",
      "Ethics",
    ],
  },
];

// Metadata lookup by ID
export const examMetadataById: Record<string, ExamMetadata> = Object.fromEntries(
  examMetadata.map((exam) => [exam.id, exam])
);

// Get all exam metadata (fast - no questions loaded)
export function getAllExamMetadata(): ExamMetadata[] {
  return examMetadata;
}

// Get exam metadata by ID (fast - no questions loaded)
export function getExamMetadataById(id: string): ExamMetadata | undefined {
  return examMetadataById[id];
}

// LAZY LOAD: Get full exam with questions (dynamic import)
// This is the ONLY way to load questions - ensures lazy loading
export async function getExamById(id: string): Promise<Exam | undefined> {
  switch (id) {
    case "cfa-level-1-session-1": {
      const { cfaLevel1Exam } = await import("./cfa-level-1-session-1");
      return cfaLevel1Exam;
    }
    case "cfa-level-1-session-2": {
      const { cfaLevel1Session2Exam } = await import("./cfa-level-1-session-2");
      return cfaLevel1Session2Exam;
    }
    case "cfa-level-2-session-1": {
      const { cfaLevel2Session1Exam } = await import("./cfa-level-2-session-1");
      return cfaLevel2Session1Exam;
    }
    case "cfa-level-2-session-2": {
      const { cfaLevel2Session2Exam } = await import("./cfa-level-2-session-2");
      return cfaLevel2Session2Exam;
    }
    default:
      return undefined;
  }
}

// Lazy load all exams (use sparingly - prefer metadata for listings)
export async function getAllExams(): Promise<Exam[]> {
  const exams = await Promise.all(
    examMetadata.map((meta) => getExamById(meta.id))
  );
  return exams.filter((exam): exam is Exam => exam !== undefined);
}

// ======================================================
// DEPRECATED EXPORTS - For backward compatibility ONLY
// These will trigger immediate loading of all exam data
// Prefer: examMetadata for listings, getExamById for full exam
// ======================================================

// Re-export for backward compatibility (causes immediate load)
export { cfaLevel1Exam } from "./cfa-level-1-session-1";
export { cfaLevel1Session2Exam } from "./cfa-level-1-session-2";

// Static allExams - DEPRECATED: Use examMetadata instead
// This import will load ~189KB of exam data immediately
import { cfaLevel1Exam } from "./cfa-level-1-session-1";
import { cfaLevel1Session2Exam } from "./cfa-level-1-session-2";

/** @deprecated Use examMetadata for listings, getExamById for full exam */
export const allExams: Exam[] = [cfaLevel1Exam, cfaLevel1Session2Exam];

/** @deprecated Use getExamById instead */
export function getExamByIdSync(id: string): Exam | undefined {
  return allExams.find(exam => exam.id === id);
}

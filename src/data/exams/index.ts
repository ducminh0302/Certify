import { cfaLevel1Exam } from "./cfa-level-1-session-1";
import { cfaLevel1Session2Exam } from "./cfa-level-1-session-2";
import type { Exam } from "@/types/exam";

// All available exams
export const allExams: Exam[] = [cfaLevel1Exam, cfaLevel1Session2Exam];

// Alias for compatibility
export const exams = allExams;

// Exam lookup by ID
export const examById: Record<string, Exam> = {
  [cfaLevel1Exam.id]: cfaLevel1Exam,
  [cfaLevel1Session2Exam.id]: cfaLevel1Session2Exam,
};

// Get exam by ID
export function getExamById(id: string): Exam | undefined {
  return examById[id];
}

// Get all exams
export function getAllExams(): Exam[] {
  return allExams;
}

// Get exams by category
export function getExamsByCategory(category: Exam["category"]): Exam[] {
  return allExams.filter((exam) => exam.category === category);
}

// Export individual exams
export { cfaLevel1Exam, cfaLevel1Session2Exam };

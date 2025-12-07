import { cfaLevel1Exam } from "./cfa-level-1";
import type { Exam } from "@/types/exam";

// All available exams
export const allExams: Exam[] = [cfaLevel1Exam];

// Alias for compatibility
export const exams = allExams;

// Exam lookup by ID
export const examById: Record<string, Exam> = {
  [cfaLevel1Exam.id]: cfaLevel1Exam,
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
export { cfaLevel1Exam };

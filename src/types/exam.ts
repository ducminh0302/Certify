// ============================================
// EXAM TYPES
// ============================================

export interface Exam {
  id: string;
  name: string;
  description: string;
  category: ExamCategory;
  totalQuestions: number;
  timeLimit: number; // in minutes
  passingScore: number; // percentage (e.g., 70)
  questions: Question[];
  topics: string[];
  difficulty: Difficulty;
  icon?: string;
  color?: string;
}

export type ExamCategory =
  | "finance"
  | "cloud"
  | "development"
  | "data"
  | "security"
  | "management"
  | "other";

export type Difficulty = "beginner" | "intermediate" | "advanced";

// ============================================
// QUESTION TYPES
// ============================================

export interface BaseQuestion {
  id: string;
  text: string;
  topic: string;
  difficulty: Difficulty;
  explanation?: string;
  references?: string[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple-choice";
  options: Option[];
  correctAnswer: string; // option id
}

export interface MultipleSelectQuestion extends BaseQuestion {
  type: "multiple-select";
  options: Option[];
  correctAnswers: string[]; // option ids
}

export interface ItemSetQuestion extends BaseQuestion {
  type: "item-set";
  stem: string; // The scenario/case study text
  subQuestions: SubQuestion[];
}

export interface ConstructedResponseQuestion extends BaseQuestion {
  type: "constructed-response";
  sampleAnswer?: string;
  gradingCriteria?: string[];
}

export type Question =
  | MultipleChoiceQuestion
  | MultipleSelectQuestion
  | ItemSetQuestion
  | ConstructedResponseQuestion;

// ============================================
// SUPPORTING TYPES
// ============================================

export interface Option {
  id: string;
  label: string; // A, B, C, D
  text: string;
}

export interface SubQuestion {
  id: string;
  text: string;
  options: Option[];
  correctAnswer: string;
  explanation?: string;
}

// ============================================
// EXAM STATE TYPES
// ============================================

export interface ExamSession {
  examId: string;
  startedAt: Date;
  answers: Record<string, UserAnswer>;
  markedForReview: Set<string>;
  currentQuestionIndex: number;
  timeRemaining: number; // in seconds
  isCompleted: boolean;
}

export interface UserAnswer {
  questionId: string;
  selectedOption?: string; // for multiple-choice
  selectedOptions?: string[]; // for multiple-select
  textResponse?: string; // for constructed-response
  subAnswers?: Record<string, string>; // for item-set: subQuestionId -> optionId
  answeredAt: Date;
  timeSpent: number; // seconds spent on this question
}

// ============================================
// RESULTS TYPES
// ============================================

export interface ExamResult {
  examId: string;
  examName: string;
  completedAt: Date;
  timeTaken: number; // in seconds
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  score: number; // percentage
  passed: boolean;
  topicBreakdown: TopicScore[];
  questionResults: QuestionResult[];
}

export interface TopicScore {
  topic: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number; // percentage
}

export interface QuestionResult {
  questionId: string;
  questionText: string;
  topic: string;
  userAnswer: UserAnswer | null;
  correctAnswer: string | string[];
  isCorrect: boolean;
  explanation?: string;
}

// ============================================
// UI STATE TYPES
// ============================================

export interface QuestionNavigatorItem {
  questionId: string;
  questionNumber: number;
  status: QuestionStatus;
}

export type QuestionStatus =
  | "unanswered"
  | "answered"
  | "marked"
  | "answered-marked"
  | "correct"
  | "incorrect"
  | "correct-marked"
  | "incorrect-marked"
  | "current";

export interface ExamProgress {
  totalQuestions: number;
  answeredQuestions: number;
  markedQuestions: number;
  percentComplete: number;
}

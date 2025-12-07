// ============================================
// CHAT TYPES
// ============================================

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  status?: MessageStatus;
  metadata?: MessageMetadata;
}

export type MessageStatus = "sending" | "sent" | "error" | "streaming";

export interface MessageMetadata {
  questionContext?: QuestionContext;
  quickAction?: QuickActionType;
  attachments?: Attachment[];
}

export interface QuestionContext {
  questionId: string;
  questionText: string;
  questionNumber?: number;
  topic?: string;
  questionType?: string;
  options?: { label: string; text: string }[];
  selectedAnswer?: string;
}

export type QuickActionType =
  | "explain"
  | "hint"
  | "why-wrong"
  | "related"
  | "simplify";

export interface Attachment {
  id: string;
  type: "image" | "text-selection";
  content: string; // URL or selected text
  name?: string;
}

// ============================================
// CHAT STATE TYPES
// ============================================

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  currentContext?: QuestionContext;
  isLoading: boolean;
  error?: string;
}

export interface ChatSettings {
  searchAssistEnabled: boolean;
  contextModeEnabled: boolean;
  autoContextEnabled: boolean; // Auto-attach current question
}

// ============================================
// QUICK ACTIONS
// ============================================

export interface QuickAction {
  id: QuickActionType;
  label: string;
  icon: string;
  prompt: string | ((context?: QuestionContext) => string);
}

export const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "explain",
    label: "Explain this",
    icon: "lightbulb",
    prompt:
      "Please explain this question in simple terms. What concept is it testing?",
  },
  {
    id: "hint",
    label: "Give me a hint",
    icon: "sparkles",
    prompt:
      "Give me a helpful hint without revealing the answer. Guide my thinking.",
  },
  {
    id: "why-wrong",
    label: "Why is this wrong?",
    icon: "help-circle",
    prompt: (context) =>
      context?.selectedAnswer
        ? `I chose "${context.selectedAnswer}" but I'm not sure. Can you explain if this is correct and why?`
        : "Can you explain why my answer might be wrong?",
  },
  {
    id: "related",
    label: "Related concepts",
    icon: "book-open",
    prompt: "What related concepts should I study to understand this better?",
  },
  {
    id: "simplify",
    label: "Simplify",
    icon: "minimize",
    prompt: "Can you explain this in even simpler terms?",
  },
];

// ============================================
// STREAMING TYPES
// ============================================

export interface StreamingState {
  isStreaming: boolean;
  currentContent: string;
  messageId: string | null;
}

// ============================================
// AI PANEL TYPES
// ============================================

export interface AIPanelState {
  isOpen: boolean;
  width: number; // Panel width in pixels
  isResizing: boolean;
}

export const DEFAULT_PANEL_WIDTH = 400;
export const MIN_PANEL_WIDTH = 320;
export const MAX_PANEL_WIDTH = 600;

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Exam,
  Question,
  UserAnswer,
  ExamResult,
  TopicScore,
  QuestionResult,
  ExamProgress,
} from "@/types/exam";

interface ExamState {
  // Current exam data
  currentExam: Exam | null;
  currentQuestionIndex: number;
  answers: Record<string, UserAnswer>;
  markedForReview: string[];
  timeRemaining: number; // in seconds
  questionStartTime: number; // timestamp when current question was shown

  // Exam status
  isExamStarted: boolean;
  isExamCompleted: boolean;
  isPaused: boolean;

  // Results
  lastResult: ExamResult | null;

  // Actions
  startExam: (exam: Exam) => void;
  selectAnswer: (questionId: string, answer: string) => void;
  selectMultipleAnswers: (questionId: string, answers: string[]) => void;
  setTextResponse: (questionId: string, text: string) => void;
  clearAnswer: (questionId: string) => void;
  toggleMarkForReview: (questionId: string) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  goToQuestion: (index: number) => void;
  tick: () => void; // Called every second to update timer
  pauseExam: () => void;
  resumeExam: () => void;
  submitExam: () => ExamResult;
  resetExam: () => void;

  // Helpers
  getCurrentQuestion: () => Question | null;
  getProgress: () => ExamProgress;
  isQuestionAnswered: (questionId: string) => boolean;
  isQuestionMarked: (questionId: string) => boolean;
}

export const useExamStore = create<ExamState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentExam: null,
      currentQuestionIndex: 0,
      answers: {},
      markedForReview: [],
      timeRemaining: 0,
      questionStartTime: 0,
      isExamStarted: false,
      isExamCompleted: false,
      isPaused: false,
      lastResult: null,

      // Actions
      startExam: (exam) => {
        set({
          currentExam: exam,
          currentQuestionIndex: 0,
          answers: {},
          markedForReview: [],
          timeRemaining: exam.timeLimit * 60, // Convert minutes to seconds
          questionStartTime: Date.now(),
          isExamStarted: true,
          isExamCompleted: false,
          isPaused: false,
          lastResult: null,
        });
      },

      selectAnswer: (questionId, answer) => {
        const { answers, questionStartTime } = get();
        const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

        set({
          answers: {
            ...answers,
            [questionId]: {
              questionId,
              selectedOption: answer,
              answeredAt: new Date(),
              timeSpent: (answers[questionId]?.timeSpent || 0) + timeSpent,
            },
          },
          questionStartTime: Date.now(),
        });
      },

      selectMultipleAnswers: (questionId, selectedAnswers) => {
        const { answers, questionStartTime } = get();
        const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

        set({
          answers: {
            ...answers,
            [questionId]: {
              questionId,
              selectedOptions: selectedAnswers,
              answeredAt: new Date(),
              timeSpent: (answers[questionId]?.timeSpent || 0) + timeSpent,
            },
          },
          questionStartTime: Date.now(),
        });
      },

      setTextResponse: (questionId, text) => {
        const { answers, questionStartTime } = get();
        const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

        set({
          answers: {
            ...answers,
            [questionId]: {
              questionId,
              textResponse: text,
              answeredAt: new Date(),
              timeSpent: (answers[questionId]?.timeSpent || 0) + timeSpent,
            },
          },
          questionStartTime: Date.now(),
        });
      },

      clearAnswer: (questionId) => {
        const { answers } = get();
        const newAnswers = { ...answers };
        delete newAnswers[questionId];
        set({ answers: newAnswers });
      },

      toggleMarkForReview: (questionId) => {
        const { markedForReview } = get();
        const isMarked = markedForReview.includes(questionId);

        set({
          markedForReview: isMarked
            ? markedForReview.filter((id) => id !== questionId)
            : [...markedForReview, questionId],
        });
      },

      nextQuestion: () => {
        const { currentQuestionIndex, currentExam } = get();
        if (currentExam && currentQuestionIndex < currentExam.questions.length - 1) {
          set({
            currentQuestionIndex: currentQuestionIndex + 1,
            questionStartTime: Date.now(),
          });
        }
      },

      previousQuestion: () => {
        const { currentQuestionIndex } = get();
        if (currentQuestionIndex > 0) {
          set({
            currentQuestionIndex: currentQuestionIndex - 1,
            questionStartTime: Date.now(),
          });
        }
      },

      goToQuestion: (index) => {
        const { currentExam } = get();
        if (currentExam && index >= 0 && index < currentExam.questions.length) {
          set({
            currentQuestionIndex: index,
            questionStartTime: Date.now(),
          });
        }
      },

      tick: () => {
        const { timeRemaining, isPaused, isExamCompleted } = get();
        if (!isPaused && !isExamCompleted && timeRemaining > 0) {
          set({ timeRemaining: timeRemaining - 1 });
        }
      },

      pauseExam: () => set({ isPaused: true }),
      resumeExam: () => set({ isPaused: false }),

      submitExam: () => {
        const { currentExam, answers, timeRemaining } = get();

        if (!currentExam) {
          throw new Error("No exam to submit");
        }

        // Calculate results
        const questionResults: QuestionResult[] = currentExam.questions.map(
          (question) => {
            const userAnswer = answers[question.id] || null;
            let isCorrect = false;
            let correctAnswer: string | string[] = "";

            if (question.type === "multiple-choice") {
              correctAnswer = question.correctAnswer;
              isCorrect = userAnswer?.selectedOption === question.correctAnswer;
            } else if (question.type === "multiple-select") {
              correctAnswer = question.correctAnswers;
              const selected = userAnswer?.selectedOptions || [];
              isCorrect =
                selected.length === question.correctAnswers.length &&
                selected.every((a) => question.correctAnswers.includes(a));
            }

            return {
              questionId: question.id,
              questionText: question.text,
              topic: question.topic,
              userAnswer,
              correctAnswer,
              isCorrect,
              explanation: question.explanation,
            };
          }
        );

        // Calculate topic breakdown
        const topicMap = new Map<string, { total: number; correct: number }>();
        questionResults.forEach((result) => {
          const topic = result.topic;
          const existing = topicMap.get(topic) || { total: 0, correct: 0 };
          topicMap.set(topic, {
            total: existing.total + 1,
            correct: existing.correct + (result.isCorrect ? 1 : 0),
          });
        });

        const topicBreakdown: TopicScore[] = Array.from(topicMap.entries()).map(
          ([topic, data]) => ({
            topic,
            totalQuestions: data.total,
            correctAnswers: data.correct,
            score: Math.round((data.correct / data.total) * 100),
          })
        );

        const correctCount = questionResults.filter((r) => r.isCorrect).length;
        const answeredCount = Object.keys(answers).length;
        const score = Math.round((correctCount / currentExam.totalQuestions) * 100);

        const result: ExamResult = {
          examId: currentExam.id,
          examName: currentExam.name,
          completedAt: new Date(),
          timeTaken: currentExam.timeLimit * 60 - timeRemaining,
          totalQuestions: currentExam.totalQuestions,
          correctAnswers: correctCount,
          incorrectAnswers: answeredCount - correctCount,
          unanswered: currentExam.totalQuestions - answeredCount,
          score,
          passed: score >= currentExam.passingScore,
          topicBreakdown,
          questionResults,
        };

        set({
          isExamCompleted: true,
          lastResult: result,
        });

        return result;
      },

      resetExam: () => {
        set({
          currentExam: null,
          currentQuestionIndex: 0,
          answers: {},
          markedForReview: [],
          timeRemaining: 0,
          questionStartTime: 0,
          isExamStarted: false,
          isExamCompleted: false,
          isPaused: false,
        });
      },

      // Helpers
      getCurrentQuestion: () => {
        const { currentExam, currentQuestionIndex } = get();
        return currentExam?.questions[currentQuestionIndex] || null;
      },

      getProgress: () => {
        const { currentExam, answers, markedForReview } = get();
        const total = currentExam?.totalQuestions || 0;
        const answered = Object.keys(answers).length;

        return {
          totalQuestions: total,
          answeredQuestions: answered,
          markedQuestions: markedForReview.length,
          percentComplete: total > 0 ? Math.round((answered / total) * 100) : 0,
        };
      },

      isQuestionAnswered: (questionId) => {
        return !!get().answers[questionId];
      },

      isQuestionMarked: (questionId) => {
        return get().markedForReview.includes(questionId);
      },
    }),
    {
      name: "certify-exam-storage-v2",
      partialize: (state) => ({
        currentExam: state.currentExam,
        answers: state.answers,
        markedForReview: state.markedForReview,
        currentQuestionIndex: state.currentQuestionIndex,
        timeRemaining: state.timeRemaining,
        isExamStarted: state.isExamStarted,
      }),
    }
  )
);

"use client";

import { useEffect, useCallback, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExamHeader } from "@/components/exam/ExamHeader";
import { QuestionDisplay } from "@/components/exam/QuestionDisplay";
import { AnswerOptions } from "@/components/exam/AnswerOptions";
import { AnswerFeedback } from "@/components/exam/AnswerFeedback";
import { QuestionNavigator } from "@/components/exam/QuestionNavigator";
import { ExamControls, KeyboardHints } from "@/components/exam/ExamControls";
import { CaseStudyDisplay } from "@/components/exam/CaseStudyDisplay";
import { AIPanel } from "@/components/ai-assistant/AIPanel";
import { SelectableTextWrapper } from "@/components/ai-assistant/SelectableTextWrapper";
import { useExamStore } from "@/stores/examStore";
import { useChatStore } from "@/stores/chatStore";
import { useUserStore } from "@/stores/userStore";
import { getExamById } from "@/data/exams";
import { pageTransition } from "@/lib/animations";
import type { QuestionStatus, MultipleChoiceQuestion, Case } from "@/types/exam";
import { useExamSounds } from "@/hooks/use-exam-sounds";

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const examId = params.examId as string;

  const [showNavigator, setShowNavigator] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const { playComplete } = useExamSounds();

  // Exam store
  const {
    currentExam,
    currentQuestionIndex,
    answers,
    markedForReview,
    timeRemaining,
    isExamStarted,
    isExamCompleted,
    startExam,
    selectAnswer,
    clearAnswer,
    toggleMarkForReview,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    tick,
    submitExam,
    resetExam,
    isQuestionAnswered,
    isQuestionMarked,
  } = useExamStore();

  // Chat store
  const {
    openPanel,
    addMessage,
    setContext,
    setLoading,
    startStreaming,
    appendStreamContent,
    endStreaming,
    clearMessages,
  } = useChatStore();

  // User store for personalization
  const {
    getPersonalizationContext,
    updateTopicPerformance,
    recordSession,
    addToReviewQueue,
    incrementDailyProgress,
  } = useUserStore();

  // Initialize exam - lazy loading
  useEffect(() => {
    const loadExam = async () => {
      if (!isExamStarted) {
        const exam = await getExamById(examId);
        if (exam) {
          startExam(exam);
          clearMessages();
        }
      }
    };
    loadExam();
  }, [examId, isExamStarted, startExam, clearMessages]);

  // Redirect if exam completed
  useEffect(() => {
    if (isExamCompleted) {
      router.push(`/results/${examId}`);
    }
  }, [isExamCompleted, examId, router]);

  // Current question - support both standalone and case-study formats
  const isCaseStudyExam = currentExam?.structure === "case-study" && currentExam?.cases;

  // For case-study exams, find current case and question within case
  const getCurrentCaseInfo = () => {
    if (!isCaseStudyExam || !currentExam?.cases) return null;

    let questionCounter = 0;
    for (const caseItem of currentExam.cases) {
      const questionsInCase = caseItem.questions.length;
      if (currentQuestionIndex < questionCounter + questionsInCase) {
        return {
          case: caseItem,
          questionIndexInCase: currentQuestionIndex - questionCounter,
          totalQuestionsInCase: questionsInCase,
        };
      }
      questionCounter += questionsInCase;
    }
    return null;
  };

  const caseInfo = getCurrentCaseInfo();

  // Get current question based on exam structure
  const currentQuestion = isCaseStudyExam && caseInfo
    ? caseInfo.case.questions[caseInfo.questionIndexInCase] as unknown as MultipleChoiceQuestion
    : currentExam?.questions[currentQuestionIndex] as MultipleChoiceQuestion | undefined;

  // Update AI context when question changes
  useEffect(() => {
    if (currentQuestion) {
      setContext({
        questionId: currentQuestion.id,
        questionText: currentQuestion.text,
        questionNumber: currentQuestionIndex + 1,
        topic: currentQuestion.topic,
      });
    }
  }, [currentQuestion, currentQuestionIndex, setContext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't handle if typing in input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          previousQuestion();
          setShowFeedback(false);
          break;
        case "ArrowRight":
          if (!showFeedback) {
            nextQuestion();
          }
          break;
        case "1":
        case "2":
        case "3":
        case "4":
          if (currentQuestion?.type === "multiple-choice" && !showFeedback) {
            const optionIndex = parseInt(e.key) - 1;
            const option = currentQuestion.options[optionIndex];
            if (option) {
              handleSelectAnswer(option.id);
            }
          }
          break;
        case "m":
        case "M":
          if (currentQuestion) {
            toggleMarkForReview(currentQuestion.id);
          }
          break;
        case "a":
        case "A":
          openPanel();
          break;
        case "Escape":
          setShowFeedback(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentQuestion,
    showFeedback,
    previousQuestion,
    nextQuestion,
    toggleMarkForReview,
    openPanel,
  ]);

  // Handle answer selection
  const handleSelectAnswer = useCallback(
    (optionId: string) => {
      if (currentQuestion && !showFeedback) {
        selectAnswer(currentQuestion.id, optionId);

        // Check if answer is correct
        const isCorrect = currentQuestion.type === "multiple-choice" &&
          optionId === currentQuestion.correctAnswer;

        // Track performance for analytics
        const timeSpent = answers[currentQuestion.id]?.timeSpent || 0;
        updateTopicPerformance(
          currentQuestion.topic,
          isCorrect,
          timeSpent,
          currentQuestion.id,
          currentQuestion.difficulty as "easy" | "medium" | "hard" | undefined
        );

        // Increment daily progress
        incrementDailyProgress();

        // Add to review queue if wrong (spaced repetition)
        if (!isCorrect) {
          addToReviewQueue(
            currentQuestion.id,
            currentQuestion.topic,
            (currentQuestion.difficulty as "easy" | "medium" | "hard") || "medium"
          );
        }

        // Show instant feedback
        setShowFeedback(true);
      }
    },
    [currentQuestion, selectAnswer, showFeedback, answers, updateTopicPerformance, incrementDailyProgress, addToReviewQueue]
  );

  // Handle continue after feedback
  const handleContinue = useCallback(() => {
    setShowFeedback(false);
    if (currentQuestionIndex < (currentExam?.totalQuestions || 0) - 1) {
      nextQuestion();
    }
  }, [currentQuestionIndex, currentExam?.totalQuestions, nextQuestion]);

  // Handle clear answer
  const handleClearAnswer = useCallback(() => {
    if (currentQuestion) {
      clearAnswer(currentQuestion.id);
      setShowFeedback(false);
    }
  }, [currentQuestion, clearAnswer]);

  // Handle submit exam
  const handleSubmitExam = useCallback(() => {
    playComplete();
    submitExam();
  }, [submitExam, playComplete]);


  // Handle exit exam
  const handleExitExam = useCallback(() => {
    resetExam();
    router.push("/exam/select");
  }, [resetExam, router]);

  // Handle AI message
  const handleSendMessage = useCallback(
    async (message: string) => {
      // Add user message
      addMessage({ role: "user", content: message });
      setLoading(true);

      // Create placeholder AI message
      const aiMessageId = addMessage({ role: "assistant", content: "", status: "sending" });
      startStreaming(aiMessageId);

      try {
        const context = currentQuestion
          ? `Question ${currentQuestionIndex + 1}: ${currentQuestion.text}\nTopic: ${currentQuestion.topic}\nOptions:\n${currentQuestion.options?.map((o) => `${o.label}. ${o.text}`).join("\n") || ""}`
          : undefined;

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: message }],
            context,
            personalization: getPersonalizationContext(currentQuestion?.topic),
          }),
        });

        if (!response.ok) throw new Error("Failed to get response");

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No reader");

        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value);
          appendStreamContent(text);
        }
      } catch (error) {
        console.error("Chat error:", error);
        appendStreamContent(
          "Sorry, I encountered an error. Please try again."
        );
      } finally {
        endStreaming();
      }
    },
    [
      addMessage,
      setLoading,
      startStreaming,
      appendStreamContent,
      endStreaming,
      currentQuestion,
      currentQuestionIndex,
      getPersonalizationContext,
    ]
  );

  // Handle quick action
  const handleQuickAction = useCallback(
    (prompt: string) => {
      handleSendMessage(prompt);
    },
    [handleSendMessage]
  );

  // Get question statuses for navigator
  const getQuestionStatuses = useCallback(() => {
    const statuses = new Map<number, QuestionStatus>();
    if (currentExam) {
      // Helper to get all questions regardless of structure
      const allQuestions = currentExam.structure === "case-study" && currentExam.cases
        ? currentExam.cases.flatMap(c => c.questions)
        : currentExam.questions;

      allQuestions.forEach((q, index) => {
        const userAnswer = answers[q.id];
        const isAnswered = !!userAnswer?.selectedOption;
        const isMarked = markedForReview.includes(q.id);

        let status: QuestionStatus = "unanswered";

        if (isAnswered) {
          let isCorrect = false;

          // Check explicitly for multiple-select type which has distinct properties
          // CaseQuestion (missing type) defaults to multiple-choice logic
          if ('type' in q && q.type === "multiple-select") {
            const userSelected = userAnswer.selectedOptions || [];
            const correct = (q as any).correctAnswers || [];
            isCorrect =
              userSelected.length === correct.length &&
              userSelected.every((val: string) => correct.includes(val));
          } else {
            // Default to multiple-choice (single answer)
            // Works for MultipleChoiceQuestion and CaseQuestion
            const correct = 'correctAnswer' in q ? q.correctAnswer : '';
            isCorrect = userAnswer.selectedOption === correct;
          }

          if (isMarked) {
            status = isCorrect ? "correct-marked" : "incorrect-marked";
          } else {
            status = isCorrect ? "correct" : "incorrect";
          }
        } else if (isMarked) {
          status = "marked";
        }

        statuses.set(index, status);
      });
    }
    return statuses;
  }, [currentExam, answers, markedForReview]);

  // Loading state
  if (!currentExam || !currentQuestion) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading exam...</p>
        </div>
      </div>
    );
  }

  const currentAnswer = answers[currentQuestion.id]?.selectedOption;
  const isCorrect = currentAnswer === currentQuestion.correctAnswer;
  const correctOption = currentQuestion.options?.find(
    (o) => o.id === currentQuestion.correctAnswer
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Exam Header */}
      <ExamHeader
        examName={currentExam.name}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={currentExam.totalQuestions}
        timeRemaining={timeRemaining}
        onExit={handleExitExam}
        onTick={tick}
      />

      {/* Main Content */}
      <div className="flex">
        {/* Question Navigator Sidebar - Moved to Left */}
        <aside className="hidden lg:block p-4">
          <div className="sticky top-20">
            <QuestionNavigator
              totalQuestions={currentExam.totalQuestions}
              currentQuestion={currentQuestionIndex}
              questionStatuses={getQuestionStatuses()}
              isCollapsed={!showNavigator}
              onToggle={() => setShowNavigator(!showNavigator)}
              onNavigate={(index) => {
                goToQuestion(index);
                setShowFeedback(false);
              }}
              structure={currentExam.structure}
              cases={currentExam.cases?.map(c => ({
                id: c.id,
                title: c.title,
                questionCount: c.questions.length
              }))}
            />
          </div>
        </aside>

        {/* Main Exam Area */}
        <main className="flex-1 p-4 md:p-8 min-w-0">
          <motion.div
            variants={pageTransition}
            initial="initial"
            animate="animate"
            className="mx-auto max-w-3xl"
          >
            {/* Mobile Navigator Toggle */}
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNavigator(!showNavigator)}
                className="gap-2"
              >
                <Menu className="h-4 w-4" />
                Questions
              </Button>
            </div>

            {/* Case Study Display - for Level 2+ exams */}
            {isCaseStudyExam && caseInfo && (
              <div className="mb-6">
                <CaseStudyDisplay
                  caseData={caseInfo.case}
                  currentQuestionIndex={caseInfo.questionIndexInCase}
                  totalQuestions={caseInfo.totalQuestionsInCase}
                  onAskAI={(prompt) => {
                    openPanel();
                    handleSendMessage(prompt);
                  }}
                />
              </div>
            )}

            {/* Question Display - Wrapped with selectable text for AI */}
            <SelectableTextWrapper
              onAskAI={(prompt) => {
                openPanel();
                handleSendMessage(prompt);
              }}
              disabled={showFeedback}
            >
              <QuestionDisplay
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={currentExam.totalQuestions}
                isMarked={isQuestionMarked(currentQuestion.id)}
              />
            </SelectableTextWrapper>

            {/* Answer Options */}
            <div className="mt-8">
              <AnimatePresence mode="wait">
                <AnswerOptions
                  key={currentQuestion.id}
                  options={currentQuestion.options || []}
                  selectedAnswer={currentAnswer}
                  correctAnswer={currentQuestion.correctAnswer}
                  showFeedback={showFeedback}
                  disabled={showFeedback}
                  onSelect={handleSelectAnswer}
                />
              </AnimatePresence>
            </div>

            {/* Feedback */}
            <AnswerFeedback
              isCorrect={isCorrect}
              isVisible={showFeedback}
              explanation={currentQuestion.explanation}
              correctAnswer={
                correctOption
                  ? `${correctOption.label}. ${correctOption.text}`
                  : undefined
              }
              onContinue={handleContinue}
              onAskAI={openPanel}
            />

            {/* Controls */}
            <div className="mt-8 rounded-xl border border-border bg-card p-4">
              <ExamControls
                currentQuestion={currentQuestionIndex}
                totalQuestions={currentExam.totalQuestions}
                isMarked={isQuestionMarked(currentQuestion.id)}
                hasAnswer={!!currentAnswer}
                showFeedback={showFeedback}
                onPrevious={() => {
                  previousQuestion();
                  setShowFeedback(false);
                }}
                onNext={() => {
                  nextQuestion();
                  setShowFeedback(false);
                }}
                onToggleMark={() => toggleMarkForReview(currentQuestion.id)}
                onClearAnswer={handleClearAnswer}
                onSubmitExam={handleSubmitExam}
                onOpenAI={openPanel}
              />
              <KeyboardHints />
            </div>
          </motion.div>
        </main>

        {/* AI Panel - Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <AIPanel
            variant="sidebar"
            questionContext={{
              questionText: currentQuestion.text,
              questionNumber: currentQuestionIndex + 1,
              topic: currentQuestion.topic,
            }}
            onSendMessage={handleSendMessage}
            onQuickAction={handleQuickAction}
          />
        </div>
      </div>

      {/* AI Panel - Mobile Overlay */}
      <div className="lg:hidden">
        <AIPanel
          variant="overlay"
          questionContext={{
            questionText: currentQuestion.text,
            questionNumber: currentQuestionIndex + 1,
            topic: currentQuestion.topic,
          }}
          onSendMessage={handleSendMessage}
          onQuickAction={handleQuickAction}
        />
      </div>
    </div>
  );
}

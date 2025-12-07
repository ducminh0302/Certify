"use client";

import { useCallback, useRef } from "react";
import { useChatStore } from "@/stores/chatStore";
import type { Question } from "@/types/exam";

interface UseAIChatOptions {
  currentQuestion?: Question | null;
  questionNumber?: number;
}

export function useAIChat(options: UseAIChatOptions = {}) {
  const { currentQuestion, questionNumber } = options;
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    messages,
    isLoading,
    error,
    streaming,
    panel,
    addMessage,
    setLoading,
    setError,
    startStreaming,
    appendStreamContent,
    endStreaming,
    openPanel,
    closePanel,
    togglePanel,
    clearMessages,
    setContext,
  } = useChatStore();

  // Build context string from current question
  const buildContext = useCallback(() => {
    if (!currentQuestion) return undefined;

    let context = `Question ${questionNumber || 1}: ${currentQuestion.text}\n`;
    context += `Topic: ${currentQuestion.topic}\n`;
    context += `Difficulty: ${currentQuestion.difficulty}\n`;

    if (currentQuestion.type === "multiple-choice" && currentQuestion.options) {
      context += `Options:\n`;
      currentQuestion.options.forEach((opt) => {
        context += `${opt.label}. ${opt.text}\n`;
      });
    }

    return context;
  }, [currentQuestion, questionNumber]);

  // Send message to AI
  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!userMessage.trim() || isLoading) return;

      // Cancel any previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      // Add user message
      addMessage({ role: "user", content: userMessage });
      setLoading(true);
      setError(null);

      // Create placeholder AI message and get its ID from store
      const aiMessageId = addMessage({ role: "assistant", content: "", status: "sending" });

      if (aiMessageId) {
        startStreaming(aiMessageId);
      }

      try {
        const context = buildContext();

        // Build messages for API
        const apiMessages = [
          ...messages.map((m) => ({
            role: m.role as "user" | "assistant",
            content: m.content,
          })),
          { role: "user" as const, content: userMessage },
        ];

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: apiMessages,
            context,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to get response");
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value);
          appendStreamContent(text);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          // Request was cancelled, ignore
          return;
        }
        console.error("Chat error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred. Please try again."
        );
        appendStreamContent(
          "\n\n*Sorry, I encountered an error. Please try again.*"
        );
      } finally {
        endStreaming();
        abortControllerRef.current = null;
      }
    },
    [
      isLoading,
      messages,
      addMessage,
      setLoading,
      setError,
      startStreaming,
      appendStreamContent,
      endStreaming,
      buildContext,
    ]
  );

  // Quick actions
  const explainQuestion = useCallback(() => {
    sendMessage(
      "Please explain this question in simple terms. What concept is it testing and what should I understand to answer it correctly?"
    );
  }, [sendMessage]);

  const getHint = useCallback(() => {
    sendMessage(
      "Give me a helpful hint for this question without revealing the answer directly. Guide me toward the right thinking process."
    );
  }, [sendMessage]);

  const explainWrongAnswer = useCallback(
    (wrongAnswer?: string) => {
      if (wrongAnswer) {
        sendMessage(
          `I chose "${wrongAnswer}" but it was wrong. Can you explain why this answer is incorrect and help me understand the right concept?`
        );
      } else {
        sendMessage(
          "Can you explain why my answer might be wrong and help me understand the correct approach?"
        );
      }
    },
    [sendMessage]
  );

  const explainOption = useCallback(
    (optionLabel: string, optionText: string) => {
      sendMessage(
        `Can you explain option ${optionLabel} ("${optionText}")? Is it correct or incorrect, and why?`
      );
    },
    [sendMessage]
  );

  const getRelatedConcepts = useCallback(() => {
    sendMessage(
      "What related concepts should I study to better understand this topic? Give me a brief overview of each."
    );
  }, [sendMessage]);

  const simplifyExplanation = useCallback(() => {
    sendMessage(
      "Can you explain this in even simpler terms? Pretend I'm completely new to this topic."
    );
  }, [sendMessage]);

  // Cancel ongoing request
  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      endStreaming();
      setLoading(false);
    }
  }, [endStreaming, setLoading]);

  // Update context when question changes
  const updateContext = useCallback(() => {
    if (currentQuestion) {
      setContext({
        questionId: currentQuestion.id,
        questionText: currentQuestion.text,
        questionNumber,
        topic: currentQuestion.topic,
      });
    }
  }, [currentQuestion, questionNumber, setContext]);

  return {
    // State
    messages,
    isLoading,
    error,
    isStreaming: streaming.isStreaming,
    isPanelOpen: panel.isOpen,

    // Actions
    sendMessage,
    cancelRequest,
    clearMessages,
    updateContext,

    // Panel
    openPanel,
    closePanel,
    togglePanel,

    // Quick Actions
    explainQuestion,
    getHint,
    explainWrongAnswer,
    explainOption,
    getRelatedConcepts,
    simplifyExplanation,
  };
}

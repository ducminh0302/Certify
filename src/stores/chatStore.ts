import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ChatMessage,
  QuestionContext,
  ChatSettings,
  StreamingState,
  AIPanelState,
} from "@/types/chat";
import { DEFAULT_PANEL_WIDTH } from "@/types/chat";

interface ChatState {
  // Messages
  messages: ChatMessage[];
  currentContext: QuestionContext | null;

  // UI State
  isLoading: boolean;
  error: string | null;
  streaming: StreamingState;

  // Panel state
  panel: AIPanelState;

  // Settings
  settings: ChatSettings;

  // Actions - Messages
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => string;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  clearMessages: () => void;
  setContext: (context: QuestionContext | null) => void;

  // Actions - Loading/Error
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // Actions - Streaming
  startStreaming: (messageId: string) => void;
  appendStreamContent: (content: string) => void;
  endStreaming: () => void;

  // Actions - Panel
  openPanel: () => void;
  closePanel: () => void;
  togglePanel: () => void;
  setPanelWidth: (width: number) => void;
  setResizing: (isResizing: boolean) => void;

  // Actions - Settings
  updateSettings: (settings: Partial<ChatSettings>) => void;
  toggleSearchAssist: () => void;
  toggleContextMode: () => void;
}

function generateId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      // Initial state
      messages: [],
      currentContext: null,
      isLoading: false,
      error: null,
      streaming: {
        isStreaming: false,
        currentContent: "",
        messageId: null,
      },
      panel: {
        isOpen: false,
        width: DEFAULT_PANEL_WIDTH,
        isResizing: false,
      },
      settings: {
        searchAssistEnabled: false,
        contextModeEnabled: true,
        autoContextEnabled: true,
      },

      // Message actions
      addMessage: (message) => {
        const newMessage: ChatMessage = {
          ...message,
          id: generateId(),
          timestamp: new Date(),
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
        return newMessage.id;
      },

      updateMessage: (id, updates) => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, ...updates } : msg
          ),
        }));
      },

      clearMessages: () => {
        set({ messages: [], error: null });
      },

      setContext: (context) => {
        set({ currentContext: context });
      },

      // Loading/Error actions
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      // Streaming actions
      startStreaming: (messageId) => {
        set({
          streaming: {
            isStreaming: true,
            currentContent: "",
            messageId,
          },
        });
      },

      appendStreamContent: (content) => {
        const { streaming, messages } = get();
        const messageId = streaming.messageId;
        const newContent = streaming.currentContent + content;

        // Update both streaming state and message content in one set call
        set({
          streaming: {
            ...streaming,
            currentContent: newContent,
          },
          messages: messageId
            ? messages.map((msg) =>
              msg.id === messageId
                ? { ...msg, content: newContent, status: "streaming" }
                : msg
            )
            : messages,
        });
      },

      endStreaming: () => {
        const { streaming, messages } = get();

        // Update message status to sent
        if (streaming.messageId) {
          set({
            messages: messages.map((msg) =>
              msg.id === streaming.messageId ? { ...msg, status: "sent" } : msg
            ),
          });
        }

        set({
          streaming: {
            isStreaming: false,
            currentContent: "",
            messageId: null,
          },
          isLoading: false,
        });
      },

      // Panel actions
      openPanel: () => {
        set((state) => ({
          panel: { ...state.panel, isOpen: true },
        }));
      },

      closePanel: () => {
        set((state) => ({
          panel: { ...state.panel, isOpen: false },
        }));
      },

      togglePanel: () => {
        set((state) => ({
          panel: { ...state.panel, isOpen: !state.panel.isOpen },
        }));
      },

      setPanelWidth: (width) => {
        set((state) => ({
          panel: { ...state.panel, width },
        }));
      },

      setResizing: (isResizing) => {
        set((state) => ({
          panel: { ...state.panel, isResizing },
        }));
      },

      // Settings actions
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        }));
      },

      toggleSearchAssist: () => {
        set((state) => ({
          settings: {
            ...state.settings,
            searchAssistEnabled: !state.settings.searchAssistEnabled,
          },
        }));
      },

      toggleContextMode: () => {
        set((state) => ({
          settings: {
            ...state.settings,
            contextModeEnabled: !state.settings.contextModeEnabled,
          },
        }));
      },
    }),
    {
      name: "certify-chat-storage",
      partialize: (state) => ({
        settings: state.settings,
        panel: {
          width: state.panel.width,
        },
      }),
    }
  )
);

// Selector hooks for common use cases
export const useChatMessages = () => useChatStore((state) => state.messages);
export const useIsChatLoading = () => useChatStore((state) => state.isLoading);
export const useAIPanel = () => useChatStore((state) => state.panel);
export const useChatSettings = () => useChatStore((state) => state.settings);

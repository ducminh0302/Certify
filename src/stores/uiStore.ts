import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";

interface UIState {
  // Theme
  theme: Theme;
  resolvedTheme: "light" | "dark";

  // Navigation
  isSidebarOpen: boolean;
  isNavigatorOpen: boolean; // Question navigator in exam

  // Modals
  isExitDialogOpen: boolean;
  isSubmitDialogOpen: boolean;

  // Feedback
  showAnswerFeedback: boolean;
  feedbackDuration: number; // ms

  // Sound
  soundEnabled: boolean;

  // Actions
  setTheme: (theme: Theme) => void;
  setResolvedTheme: (theme: "light" | "dark") => void;
  toggleSidebar: () => void;
  toggleNavigator: () => void;
  openExitDialog: () => void;
  closeExitDialog: () => void;
  openSubmitDialog: () => void;
  closeSubmitDialog: () => void;
  setShowAnswerFeedback: (show: boolean) => void;
  toggleSound: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Initial state
      theme: "system",
      resolvedTheme: "light",
      isSidebarOpen: true,
      isNavigatorOpen: true,
      isExitDialogOpen: false,
      isSubmitDialogOpen: false,
      showAnswerFeedback: true,
      feedbackDuration: 1500,
      soundEnabled: false,

      // Actions
      setTheme: (theme) => set({ theme }),
      setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      toggleNavigator: () =>
        set((state) => ({ isNavigatorOpen: !state.isNavigatorOpen })),
      openExitDialog: () => set({ isExitDialogOpen: true }),
      closeExitDialog: () => set({ isExitDialogOpen: false }),
      openSubmitDialog: () => set({ isSubmitDialogOpen: true }),
      closeSubmitDialog: () => set({ isSubmitDialogOpen: false }),
      setShowAnswerFeedback: (show) => set({ showAnswerFeedback: show }),
      toggleSound: () =>
        set((state) => ({ soundEnabled: !state.soundEnabled })),
    }),
    {
      name: "certify-ui-storage",
      partialize: (state) => ({
        theme: state.theme,
        isSidebarOpen: state.isSidebarOpen,
        isNavigatorOpen: state.isNavigatorOpen,
        showAnswerFeedback: state.showAnswerFeedback,
        soundEnabled: state.soundEnabled,
      }),
    }
  )
);

// Convenience hooks
export const useTheme = () => useUIStore((state) => state.theme);
export const useResolvedTheme = () => useUIStore((state) => state.resolvedTheme);

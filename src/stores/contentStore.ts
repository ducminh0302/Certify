import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  SlidesDeck,
  StudyNote,
  PersonalNote,
  Bookmark,
} from "@/types/content";

interface ContentState {
  // Slides
  slidesDecks: SlidesDeck[];
  currentDeck: SlidesDeck | null;

  // Study Notes
  studyNotes: StudyNote[];

  // Personal Notes
  personalNotes: PersonalNote[];

  // Bookmarks
  bookmarks: Bookmark[];

  // Actions - Slides
  addSlidesDeck: (deck: SlidesDeck) => void;
  setCurrentDeck: (deck: SlidesDeck | null) => void;
  deleteSlidesDeck: (id: string) => void;

  // Actions - Study Notes
  addStudyNote: (note: StudyNote) => void;
  updateStudyNote: (id: string, updates: Partial<StudyNote>) => void;
  deleteStudyNote: (id: string) => void;
  toggleNoteBookmark: (id: string) => void;

  // Actions - Personal Notes
  addPersonalNote: (note: Omit<PersonalNote, "id" | "createdAt" | "updatedAt">) => void;
  updatePersonalNote: (id: string, updates: Partial<PersonalNote>) => void;
  deletePersonalNote: (id: string) => void;
  getNotesForQuestion: (questionId: string) => PersonalNote[];
  getNotesForTopic: (topic: string) => PersonalNote[];

  // Actions - Bookmarks
  addBookmark: (bookmark: Omit<Bookmark, "id" | "createdAt">) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (referenceId: string) => boolean;
}

function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      slidesDecks: [],
      currentDeck: null,
      studyNotes: [],
      personalNotes: [],
      bookmarks: [],

      // Slides Actions
      addSlidesDeck: (deck) => {
        set((state) => ({
          slidesDecks: [deck, ...state.slidesDecks],
        }));
      },

      setCurrentDeck: (deck) => {
        set({ currentDeck: deck });
      },

      deleteSlidesDeck: (id) => {
        set((state) => ({
          slidesDecks: state.slidesDecks.filter((d) => d.id !== id),
          currentDeck: state.currentDeck?.id === id ? null : state.currentDeck,
        }));
      },

      // Study Notes Actions
      addStudyNote: (note) => {
        set((state) => ({
          studyNotes: [note, ...state.studyNotes],
        }));
      },

      updateStudyNote: (id, updates) => {
        set((state) => ({
          studyNotes: state.studyNotes.map((note) =>
            note.id === id
              ? { ...note, ...updates, updatedAt: new Date() }
              : note
          ),
        }));
      },

      deleteStudyNote: (id) => {
        set((state) => ({
          studyNotes: state.studyNotes.filter((n) => n.id !== id),
        }));
      },

      toggleNoteBookmark: (id) => {
        set((state) => ({
          studyNotes: state.studyNotes.map((note) =>
            note.id === id
              ? { ...note, isBookmarked: !note.isBookmarked }
              : note
          ),
        }));
      },

      // Personal Notes Actions
      addPersonalNote: (noteData) => {
        const now = new Date();
        const note: PersonalNote = {
          ...noteData,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          personalNotes: [note, ...state.personalNotes],
        }));
      },

      updatePersonalNote: (id, updates) => {
        set((state) => ({
          personalNotes: state.personalNotes.map((note) =>
            note.id === id
              ? { ...note, ...updates, updatedAt: new Date() }
              : note
          ),
        }));
      },

      deletePersonalNote: (id) => {
        set((state) => ({
          personalNotes: state.personalNotes.filter((n) => n.id !== id),
        }));
      },

      getNotesForQuestion: (questionId) => {
        return get().personalNotes.filter((n) => n.questionId === questionId);
      },

      getNotesForTopic: (topic) => {
        return get().personalNotes.filter((n) => n.topic === topic);
      },

      // Bookmarks Actions
      addBookmark: (bookmarkData) => {
        const bookmark: Bookmark = {
          ...bookmarkData,
          id: generateId(),
          createdAt: new Date(),
        };
        set((state) => ({
          bookmarks: [bookmark, ...state.bookmarks],
        }));
      },

      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        }));
      },

      isBookmarked: (referenceId) => {
        return get().bookmarks.some((b) => b.referenceId === referenceId);
      },
    }),
    {
      name: "certify-content-storage",
      partialize: (state) => ({
        slidesDecks: state.slidesDecks,
        studyNotes: state.studyNotes,
        personalNotes: state.personalNotes,
        bookmarks: state.bookmarks,
      }),
    }
  )
);

// Selector hooks
export const useSlideDecks = () => useContentStore((state) => state.slidesDecks);
export const useCurrentDeck = () => useContentStore((state) => state.currentDeck);
export const useStudyNotes = () => useContentStore((state) => state.studyNotes);
export const usePersonalNotes = () => useContentStore((state) => state.personalNotes);
export const useBookmarks = () => useContentStore((state) => state.bookmarks);

"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  BookOpen,
  Presentation,
  FileText,
  StickyNote,
  Bookmark,
  Plus,
  Loader2,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggleCompact } from "@/components/layout/ThemeToggle";
import { SlideViewer } from "@/components/content/SlideViewer";
import { StudyNotesViewer } from "@/components/content/StudyNotesViewer";
import { PersonalNotes } from "@/components/content/PersonalNotes";
import {
  useContentStore,
  useSlideDecks,
  useStudyNotes,
  usePersonalNotes,
} from "@/stores/contentStore";
import { SLIDES_PROMPT, STUDY_NOTES_PROMPT, parseAIJSON } from "@/lib/contentPrompts";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { cn } from "@/lib/utils";
import { CFA_TOPICS } from "@/types/user";
import type { SlidesDeck, StudyNote, Slide } from "@/types/content";

type Tab = "slides" | "notes" | "personal" | "bookmarks";

export default function StudyPage() {
  const [activeTab, setActiveTab] = useState<Tab>("slides");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showTopicPicker, setShowTopicPicker] = useState(false);
  const [generationType, setGenerationType] = useState<"slides" | "notes">("slides");

  // Store hooks
  const slidesDecks = useSlideDecks();
  const studyNotes = useStudyNotes();
  const personalNotes = usePersonalNotes();
  const {
    addSlidesDeck,
    currentDeck,
    setCurrentDeck,
    deleteSlidesDeck,
    addStudyNote,
    toggleNoteBookmark,
    addPersonalNote,
    updatePersonalNote,
    deletePersonalNote,
    bookmarks,
  } = useContentStore();

  // Generate slides with AI
  const generateSlides = useCallback(async (topic: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: SLIDES_PROMPT(topic, 8) }],
        }),
      });

      if (!response.ok) throw new Error("Failed to generate slides");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      let fullContent = "";
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullContent += decoder.decode(value);
      }

      const slides = parseAIJSON<Slide[]>(fullContent);
      if (slides && slides.length > 0) {
        const deck: SlidesDeck = {
          id: `deck_${Date.now()}`,
          topic,
          title: `${topic} - Study Slides`,
          slides,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        addSlidesDeck(deck);
        setCurrentDeck(deck);
      }
    } catch (error) {
      console.error("Error generating slides:", error);
    } finally {
      setIsGenerating(false);
      setShowTopicPicker(false);
    }
  }, [addSlidesDeck, setCurrentDeck]);

  // Generate study notes with AI
  const generateNotes = useCallback(async (topic: string) => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: STUDY_NOTES_PROMPT(topic) }],
        }),
      });

      if (!response.ok) throw new Error("Failed to generate notes");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      let fullContent = "";
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullContent += decoder.decode(value);
      }

      const noteData = parseAIJSON<Partial<StudyNote>>(fullContent);
      if (noteData) {
        const note: StudyNote = {
          id: `note_${Date.now()}`,
          topic,
          title: noteData.title || `${topic} - Study Notes`,
          content: noteData.content || "",
          keyPoints: noteData.keyPoints || [],
          formulas: noteData.formulas,
          examples: noteData.examples,
          relatedTopics: noteData.relatedTopics,
          createdAt: new Date(),
          updatedAt: new Date(),
          isBookmarked: false,
          source: "ai-generated",
        };
        addStudyNote(note);
        setActiveTab("notes");
      }
    } catch (error) {
      console.error("Error generating notes:", error);
    } finally {
      setIsGenerating(false);
      setShowTopicPicker(false);
    }
  }, [addStudyNote]);

  const handleGenerate = (type: "slides" | "notes") => {
    setGenerationType(type);
    setShowTopicPicker(true);
  };

  const handleTopicSelect = (topic: string) => {
    setSelectedTopic(topic);
    if (generationType === "slides") {
      generateSlides(topic);
    } else {
      generateNotes(topic);
    }
  };

  const tabs = [
    { id: "slides" as Tab, label: "Slides", icon: Presentation, count: slidesDecks.length },
    { id: "notes" as Tab, label: "Study Notes", icon: FileText, count: studyNotes.length },
    { id: "personal" as Tab, label: "My Notes", icon: StickyNote, count: personalNotes.length },
    { id: "bookmarks" as Tab, label: "Bookmarks", icon: Bookmark, count: bookmarks.length },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">Certify.AI</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggleCompact />
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          {/* Page Header */}
          <motion.div variants={fadeInUp} className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Study Materials</h1>
              <p className="text-muted-foreground mt-1">
                AI-generated slides, notes, and your personal study resources
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => handleGenerate("slides")}
                disabled={isGenerating}
                className="gap-2"
              >
                {isGenerating && generationType === "slides" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
                Generate Slides
              </Button>
              <Button
                onClick={() => handleGenerate("notes")}
                disabled={isGenerating}
                variant="outline"
                className="gap-2"
              >
                {isGenerating && generationType === "notes" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Generate Notes
              </Button>
            </div>
          </motion.div>

          {/* Topic Picker Modal */}
          {showTopicPicker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onClick={() => !isGenerating && setShowTopicPicker(false)}
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="w-full max-w-md bg-card rounded-2xl shadow-xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-semibold mb-4">
                  Select a Topic for {generationType === "slides" ? "Slides" : "Notes"}
                </h3>
                {isGenerating ? (
                  <div className="flex flex-col items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mb-3" />
                    <p className="text-muted-foreground">
                      Generating {generationType}...
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      This may take a moment
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {CFA_TOPICS.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => handleTopicSelect(topic)}
                        className="p-3 text-left rounded-lg border hover:bg-muted transition-colors"
                      >
                        <span className="text-sm">{topic}</span>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Tabs */}
          <motion.div variants={fadeInUp}>
            <div className="flex border-b">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-3 border-b-2 transition-colors",
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="px-2 py-0.5 bg-muted rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div variants={fadeInUp}>
            {activeTab === "slides" && (
              <div>
                {currentDeck ? (
                  <SlideViewer
                    deck={currentDeck}
                    onClose={() => setCurrentDeck(null)}
                  />
                ) : (
                  <div className="space-y-4">
                    {slidesDecks.length === 0 ? (
                      <EmptyState
                        icon={Presentation}
                        title="No slides yet"
                        description="Generate AI-powered slides for any CFA topic"
                        actionLabel="Generate Slides"
                        onAction={() => handleGenerate("slides")}
                      />
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {slidesDecks.map((deck) => (
                          <DeckCard
                            key={deck.id}
                            deck={deck}
                            onClick={() => setCurrentDeck(deck)}
                            onDelete={() => deleteSlidesDeck(deck.id)}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === "notes" && (
              <div>
                {studyNotes.length === 0 ? (
                  <EmptyState
                    icon={FileText}
                    title="No study notes yet"
                    description="Generate comprehensive AI study notes"
                    actionLabel="Generate Notes"
                    onAction={() => handleGenerate("notes")}
                  />
                ) : (
                  <div className="space-y-4">
                    {studyNotes.map((note) => (
                      <StudyNotesViewer
                        key={note.id}
                        note={note}
                        onBookmark={() => toggleNoteBookmark(note.id)}
                        className="border rounded-xl"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "personal" && (
              <PersonalNotes
                notes={personalNotes}
                onSave={addPersonalNote}
                onUpdate={updatePersonalNote}
                onDelete={deletePersonalNote}
              />
            )}

            {activeTab === "bookmarks" && (
              <div>
                {bookmarks.length === 0 ? (
                  <EmptyState
                    icon={Bookmark}
                    title="No bookmarks yet"
                    description="Bookmark important notes and explanations for quick access"
                  />
                ) : (
                  <div className="space-y-2">
                    {bookmarks.map((bookmark) => (
                      <div
                        key={bookmark.id}
                        className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                      >
                        <Bookmark className="h-5 w-5 text-amber-500" />
                        <div className="flex-1">
                          <p className="font-medium">{bookmark.title}</p>
                          {bookmark.preview && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {bookmark.preview}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

// Empty State Component
function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="text-center py-12">
      <Icon className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="gap-2">
          <Sparkles className="h-4 w-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

// Deck Card Component
function DeckCard({
  deck,
  onClick,
  onDelete,
}: {
  deck: SlidesDeck;
  onClick: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group p-4 rounded-xl border bg-card hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Presentation className="h-5 w-5 text-primary" />
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 p-1 rounded transition-opacity"
        >
          ×
        </button>
      </div>
      <h3 className="font-semibold mb-1 line-clamp-1">{deck.title}</h3>
      <p className="text-sm text-muted-foreground mb-3">{deck.topic}</p>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{deck.slides.length} slides</span>
        <span>{new Date(deck.createdAt).toLocaleDateString()}</span>
      </div>
    </motion.div>
  );
}

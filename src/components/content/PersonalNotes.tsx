"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Tag,
  Search,
  StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { PersonalNote } from "@/types/content";

interface PersonalNotesProps {
  notes: PersonalNote[];
  onSave: (note: Omit<PersonalNote, "id" | "createdAt" | "updatedAt">) => void;
  onUpdate: (id: string, note: Partial<PersonalNote>) => void;
  onDelete: (id: string) => void;
  className?: string;
}

const NOTE_COLORS = [
  { name: "yellow", bg: "bg-yellow-100 dark:bg-yellow-900/30", border: "border-yellow-300 dark:border-yellow-700" },
  { name: "blue", bg: "bg-blue-100 dark:bg-blue-900/30", border: "border-blue-300 dark:border-blue-700" },
  { name: "green", bg: "bg-green-100 dark:bg-green-900/30", border: "border-green-300 dark:border-green-700" },
  { name: "pink", bg: "bg-pink-100 dark:bg-pink-900/30", border: "border-pink-300 dark:border-pink-700" },
  { name: "purple", bg: "bg-purple-100 dark:bg-purple-900/30", border: "border-purple-300 dark:border-purple-700" },
];

export function PersonalNotes({
  notes,
  onSave,
  onUpdate,
  onDelete,
  className,
}: PersonalNotesProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get all unique tags
  const allTags = Array.from(new Set(notes.flatMap((n) => n.tags)));

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      searchQuery === "" ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === null || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <StickyNote className="h-5 w-5 text-amber-500" />
          My Notes ({notes.length})
        </h2>
        <Button onClick={() => setIsCreating(true)} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Note
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border bg-background"
          />
        </div>
        {allTags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedTag(null)}
              className={cn(
                "px-3 py-1 rounded-full text-sm transition-colors",
                selectedTag === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              )}
            >
              All
            </button>
            {allTags.slice(0, 5).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={cn(
                  "px-3 py-1 rounded-full text-sm transition-colors",
                  selectedTag === tag
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/80"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Create Note Form */}
      <AnimatePresence>
        {isCreating && (
          <NoteEditor
            onSave={(note) => {
              onSave(note);
              setIsCreating(false);
            }}
            onCancel={() => setIsCreating(false)}
          />
        )}
      </AnimatePresence>

      {/* Notes Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              {editingId === note.id ? (
                <NoteEditor
                  initialNote={note}
                  onSave={(updated) => {
                    onUpdate(note.id, updated);
                    setEditingId(null);
                  }}
                  onCancel={() => setEditingId(null)}
                />
              ) : (
                <NoteCard
                  note={note}
                  onEdit={() => setEditingId(note.id)}
                  onDelete={() => onDelete(note.id)}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 && !isCreating && (
        <div className="text-center py-12 text-muted-foreground">
          <StickyNote className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No notes found.</p>
          <p className="text-sm">
            {searchQuery || selectedTag
              ? "Try adjusting your search or filter."
              : "Create your first note to get started!"}
          </p>
        </div>
      )}
    </div>
  );
}

// Note Card Component
interface NoteCardProps {
  note: PersonalNote;
  onEdit: () => void;
  onDelete: () => void;
}

function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const colorConfig = NOTE_COLORS.find((c) => c.name === note.color) || NOTE_COLORS[0];

  return (
    <div
      className={cn(
        "p-4 rounded-xl border-2 transition-all hover:shadow-md",
        colorConfig.bg,
        colorConfig.border
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold line-clamp-1">{note.title}</h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onEdit}>
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
        {note.content}
      </p>
      {note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-background/50 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      {note.topic && (
        <div className="mt-2 text-xs text-muted-foreground">
          Topic: {note.topic}
        </div>
      )}
    </div>
  );
}

// Note Editor Component
interface NoteEditorProps {
  initialNote?: PersonalNote;
  onSave: (note: Omit<PersonalNote, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

function NoteEditor({ initialNote, onSave, onCancel }: NoteEditorProps) {
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");
  const [tags, setTags] = useState<string[]>(initialNote?.tags || []);
  const [tagInput, setTagInput] = useState("");
  const [color, setColor] = useState(initialNote?.color || "yellow");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSave = () => {
    if (title.trim() && content.trim()) {
      onSave({
        title: title.trim(),
        content: content.trim(),
        tags,
        color,
        topic: initialNote?.topic,
        questionId: initialNote?.questionId,
      });
    }
  };

  const colorConfig = NOTE_COLORS.find((c) => c.name === color) || NOTE_COLORS[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={cn(
        "p-4 rounded-xl border-2",
        colorConfig.bg,
        colorConfig.border
      )}
    >
      <input
        type="text"
        placeholder="Note title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 px-3 py-2 rounded-lg border bg-background font-semibold"
        autoFocus
      />
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        className="w-full mb-3 px-3 py-2 rounded-lg border bg-background resize-none"
      />

      {/* Tags */}
      <div className="mb-3">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
            className="flex-1 px-3 py-1.5 rounded-lg border bg-background text-sm"
          />
          <Button size="sm" variant="outline" onClick={handleAddTag}>
            <Tag className="h-4 w-4" />
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-background rounded-full text-xs flex items-center gap-1"
              >
                {tag}
                <button onClick={() => handleRemoveTag(tag)}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Color Picker */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-muted-foreground">Color:</span>
        {NOTE_COLORS.map((c) => (
          <button
            key={c.name}
            onClick={() => setColor(c.name)}
            className={cn(
              "w-6 h-6 rounded-full border-2 transition-transform",
              c.bg,
              color === c.name ? "scale-125 border-foreground" : "border-transparent"
            )}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleSave} disabled={!title.trim() || !content.trim()}>
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>
      </div>
    </motion.div>
  );
}

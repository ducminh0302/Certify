"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Download,
  X,
  Presentation,
  FileText,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Slide, SlidesDeck } from "@/types/content";

// Lazy load MermaidDiagram
const MermaidDiagram = lazy(() =>
  import("@/components/visual/MermaidDiagram").then((mod) => ({
    default: mod.MermaidDiagram,
  }))
);

interface SlideViewerProps {
  deck: SlidesDeck;
  onClose?: () => void;
  onExport?: () => void;
}

export function SlideViewer({ deck, onClose, onExport }: SlideViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const currentSlide = deck.slides[currentIndex];
  const totalSlides = deck.slides.length;

  const goToNext = useCallback(() => {
    if (currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex, totalSlides]);

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
        case " ":
          goToNext();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "Escape":
          if (isFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
          } else if (onClose) {
            onClose();
          }
          break;
        case "f":
          toggleFullscreen();
          break;
      }
    },
    [goToNext, goToPrevious, isFullscreen, onClose, toggleFullscreen]
  );

  return (
    <div
      className={cn(
        "flex flex-col bg-background",
        isFullscreen ? "fixed inset-0 z-50" : "rounded-2xl border shadow-lg"
      )}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Presentation className="h-5 w-5 text-primary" />
          <div>
            <h2 className="font-semibold">{deck.title}</h2>
            <p className="text-sm text-muted-foreground">{deck.topic}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotes(!showNotes)}
            className={cn(showNotes && "bg-muted")}
          >
            <FileText className="h-4 w-4 mr-1" />
            Notes
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          {onExport && (
            <Button variant="ghost" size="icon" onClick={onExport}>
              <Download className="h-4 w-4" />
            </Button>
          )}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Slide Content */}
      <div className="flex-1 flex">
        <div className={cn("flex-1 relative", showNotes && "pr-80")}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 p-8 overflow-auto"
            >
              <SlideContent slide={currentSlide} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full",
              "bg-card/80 backdrop-blur border shadow-lg",
              "hover:bg-card transition-colors",
              "disabled:opacity-30 disabled:cursor-not-allowed"
            )}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === totalSlides - 1}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full",
              "bg-card/80 backdrop-blur border shadow-lg",
              "hover:bg-card transition-colors",
              "disabled:opacity-30 disabled:cursor-not-allowed"
            )}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Notes Panel */}
        {showNotes && (
          <div className="w-80 border-l bg-muted/30 p-4">
            <h3 className="font-medium mb-2">Presenter Notes</h3>
            <p className="text-sm text-muted-foreground">
              {currentSlide.notes || "No notes for this slide."}
            </p>
          </div>
        )}
      </div>

      {/* Footer with Progress */}
      <div className="flex items-center justify-between p-4 border-t">
        {/* Slide Thumbnails */}
        <div className="flex gap-1.5">
          {deck.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-8 h-1.5 rounded-full transition-all",
                index === currentIndex
                  ? "bg-primary"
                  : "bg-muted hover:bg-muted-foreground/30"
              )}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <span className="text-sm text-muted-foreground">
          {currentIndex + 1} / {totalSlides}
        </span>
      </div>
    </div>
  );
}

// Individual Slide Content Renderer
function SlideContent({ slide }: { slide: Slide }) {
  switch (slide.type) {
    case "title":
      return (
        <div className="h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
          {slide.content && (
            <p className="text-xl text-muted-foreground">{slide.content}</p>
          )}
        </div>
      );

    case "content":
      return (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{slide.title}</h2>
          <div className="prose prose-lg dark:prose-invert">
            <p>{slide.content}</p>
          </div>
        </div>
      );

    case "bullets":
      return (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{slide.title}</h2>
          <ul className="space-y-4">
            {slide.bullets?.map((bullet, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-3 text-lg"
              >
                <span className="text-primary font-bold">•</span>
                <span>{bullet}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      );

    case "comparison":
      return (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">{slide.title}</h2>
          <div className="grid grid-cols-2 gap-8">
            {slide.leftColumn && (
              <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-lg mb-4 text-blue-700 dark:text-blue-300">
                  {slide.leftColumn.title}
                </h3>
                <ul className="space-y-2">
                  {slide.leftColumn.items.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-blue-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {slide.rightColumn && (
              <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <h3 className="font-semibold text-lg mb-4 text-emerald-700 dark:text-emerald-300">
                  {slide.rightColumn.title}
                </h3>
                <ul className="space-y-2">
                  {slide.rightColumn.items.map((item, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-emerald-500">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      );

    case "diagram":
      return (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">{slide.title}</h2>
          {slide.diagram && (
            <Suspense
              fallback={
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              }
            >
              <MermaidDiagram chart={slide.diagram} />
            </Suspense>
          )}
          {slide.content && (
            <p className="text-center text-muted-foreground mt-4">
              {slide.content}
            </p>
          )}
        </div>
      );

    case "summary":
      return (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">{slide.title}</h2>
          <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border">
            {slide.bullets ? (
              <ul className="space-y-3">
                {slide.bullets.map((bullet, index) => (
                  <li key={index} className="flex gap-3 text-lg">
                    <span className="text-primary font-bold">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-lg">{slide.content}</p>
            )}
          </div>
        </div>
      );

    default:
      return (
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">{slide.title}</h2>
          <p>{slide.content}</p>
        </div>
      );
  }
}

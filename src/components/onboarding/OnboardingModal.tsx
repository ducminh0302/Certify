"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  RefreshCw,
  BookOpen,
  Zap,
  Eye,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Target,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/userStore";
import type {
  ExperienceLevel,
  UserBackground,
  ExplanationStyle,
  OnboardingAnswers,
} from "@/types/user";
import { CFA_TOPICS } from "@/types/user";

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

type Step = "welcome" | "experience" | "background" | "style" | "topics" | "complete";

const STEPS: Step[] = ["welcome", "experience", "background", "style", "topics", "complete"];

export function OnboardingModal({ isOpen, onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const { createProfile } = useUserStore();

  const currentStepIndex = STEPS.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / STEPS.length) * 100;

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex]);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex]);
    }
  };

  const handleComplete = () => {
    createProfile(answers);
    onComplete();
  };

  const canProceed = () => {
    switch (currentStep) {
      case "welcome":
        return true;
      case "experience":
        return !!answers.experienceLevel;
      case "background":
        return !!answers.background;
      case "style":
        return !!answers.explanationStyle;
      case "topics":
        return true; // Topics are optional
      case "complete":
        return true;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-xl p-0 gap-0 overflow-hidden"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Progress bar */}
        <div className="px-6 pt-6">
          <Progress value={progress} className="h-1" />
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Step {currentStepIndex + 1} of {STEPS.length}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === "welcome" && <WelcomeStep />}
              {currentStep === "experience" && (
                <ExperienceStep
                  value={answers.experienceLevel}
                  onChange={(v) => setAnswers({ ...answers, experienceLevel: v })}
                />
              )}
              {currentStep === "background" && (
                <BackgroundStep
                  value={answers.background}
                  onChange={(v) => setAnswers({ ...answers, background: v })}
                />
              )}
              {currentStep === "style" && (
                <StyleStep
                  value={answers.explanationStyle}
                  onChange={(v) => setAnswers({ ...answers, explanationStyle: v })}
                />
              )}
              {currentStep === "topics" && (
                <TopicsStep
                  value={answers.focusTopics || []}
                  onChange={(v) => setAnswers({ ...answers, focusTopics: v })}
                />
              )}
              {currentStep === "complete" && <CompleteStep answers={answers} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between border-t p-4 bg-muted/30">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStepIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          {currentStep === "complete" ? (
            <Button onClick={handleComplete} className="gap-2 bg-gradient-primary">
              Start Learning
              <Sparkles className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2"
            >
              Continue
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Step Components

function WelcomeStep() {
  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mx-auto w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center"
      >
        <Sparkles className="h-10 w-10 text-white" />
      </motion.div>

      <div className="space-y-2">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Certify.AI</DialogTitle>
        </DialogHeader>
        <p className="text-muted-foreground">
          Let&apos;s personalize your learning experience. This will only take a minute.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4">
        {[
          { icon: Target, label: "Personalized", desc: "Tailored explanations" },
          { icon: Zap, label: "Adaptive", desc: "Learns your pace" },
          { icon: BookOpen, label: "Effective", desc: "+9% better scores" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="text-center p-3 rounded-xl bg-muted/50"
          >
            <item.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
            <p className="text-sm font-medium">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

interface OptionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

function OptionCard({ icon: Icon, title, description, selected, onClick }: OptionCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full p-4 rounded-xl border-2 text-left transition-all",
        selected
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "p-2 rounded-lg",
            selected ? "bg-primary text-white" : "bg-muted"
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-medium">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {selected && (
          <Check className="h-5 w-5 text-primary shrink-0" />
        )}
      </div>
    </motion.button>
  );
}

function ExperienceStep({
  value,
  onChange,
}: {
  value?: ExperienceLevel;
  onChange: (v: ExperienceLevel) => void;
}) {
  const options: { level: ExperienceLevel; icon: React.ElementType; title: string; desc: string }[] = [
    {
      level: "beginner",
      icon: BookOpen,
      title: "Beginner",
      desc: "New to this subject, need detailed explanations",
    },
    {
      level: "intermediate",
      icon: GraduationCap,
      title: "Intermediate",
      desc: "Some prior knowledge, familiar with basics",
    },
    {
      level: "advanced",
      icon: Target,
      title: "Advanced",
      desc: "Experienced, just need quick refreshers",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">What&apos;s your experience level?</h2>
        <p className="text-muted-foreground mt-1">
          This helps us adjust the complexity of explanations
        </p>
      </div>

      <div className="space-y-3">
        {options.map((opt) => (
          <OptionCard
            key={opt.level}
            icon={opt.icon}
            title={opt.title}
            description={opt.desc}
            selected={value === opt.level}
            onClick={() => onChange(opt.level)}
          />
        ))}
      </div>
    </div>
  );
}

function BackgroundStep({
  value,
  onChange,
}: {
  value?: UserBackground;
  onChange: (v: UserBackground) => void;
}) {
  const options: { bg: UserBackground; icon: React.ElementType; title: string; desc: string }[] = [
    {
      bg: "student",
      icon: GraduationCap,
      title: "Student",
      desc: "Currently studying finance or related field",
    },
    {
      bg: "working-professional",
      icon: Briefcase,
      title: "Working Professional",
      desc: "Already working in finance/investment",
    },
    {
      bg: "career-changer",
      icon: RefreshCw,
      title: "Career Changer",
      desc: "Transitioning to finance from another field",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">What&apos;s your background?</h2>
        <p className="text-muted-foreground mt-1">
          We&apos;ll use relevant examples based on your experience
        </p>
      </div>

      <div className="space-y-3">
        {options.map((opt) => (
          <OptionCard
            key={opt.bg}
            icon={opt.icon}
            title={opt.title}
            description={opt.desc}
            selected={value === opt.bg}
            onClick={() => onChange(opt.bg)}
          />
        ))}
      </div>
    </div>
  );
}

function StyleStep({
  value,
  onChange,
}: {
  value?: ExplanationStyle;
  onChange: (v: ExplanationStyle) => void;
}) {
  const options: { style: ExplanationStyle; icon: React.ElementType; title: string; desc: string }[] = [
    {
      style: "detailed",
      icon: BookOpen,
      title: "Detailed",
      desc: "Step-by-step explanations with examples",
    },
    {
      style: "concise",
      icon: Zap,
      title: "Concise",
      desc: "Brief and to the point, just the essentials",
    },
    {
      style: "visual",
      icon: Eye,
      title: "Visual",
      desc: "Diagrams and visual aids when possible",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">How do you prefer to learn?</h2>
        <p className="text-muted-foreground mt-1">
          Choose your preferred explanation style
        </p>
      </div>

      <div className="space-y-3">
        {options.map((opt) => (
          <OptionCard
            key={opt.style}
            icon={opt.icon}
            title={opt.title}
            description={opt.desc}
            selected={value === opt.style}
            onClick={() => onChange(opt.style)}
          />
        ))}
      </div>
    </div>
  );
}

function TopicsStep({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggleTopic = (topic: string) => {
    if (value.includes(topic)) {
      onChange(value.filter((t) => t !== topic));
    } else {
      onChange([...value, topic]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Any topics to focus on?</h2>
        <p className="text-muted-foreground mt-1">
          Optional: Select topics you want to prioritize
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {CFA_TOPICS.map((topic) => (
          <motion.button
            key={topic}
            onClick={() => toggleTopic(topic)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all",
              value.includes(topic)
                ? "border-primary bg-primary/10 text-primary"
                : "border-border hover:border-primary/50"
            )}
          >
            {value.includes(topic) && <Check className="inline h-3 w-3 mr-1" />}
            {topic}
          </motion.button>
        ))}
      </div>

      <p className="text-xs text-center text-muted-foreground">
        You can change these later in settings
      </p>
    </div>
  );
}

function CompleteStep({ answers }: { answers: OnboardingAnswers }) {
  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mx-auto w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
      >
        <Check className="h-10 w-10 text-green-600 dark:text-green-400" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">You&apos;re all set!</h2>
        <p className="text-muted-foreground">
          Your AI assistant is now personalized for your learning style
        </p>
      </div>

      <div className="bg-muted/50 rounded-xl p-4 text-left space-y-3">
        <h3 className="font-medium text-sm text-muted-foreground">Your preferences:</h3>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Level</p>
            <p className="font-medium capitalize">{answers.experienceLevel}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Background</p>
            <p className="font-medium capitalize">
              {answers.background?.replace("-", " ")}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Style</p>
            <p className="font-medium capitalize">{answers.explanationStyle}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Focus topics</p>
            <p className="font-medium">
              {answers.focusTopics?.length || 0} selected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

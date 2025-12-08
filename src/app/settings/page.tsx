"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  User,
  BookOpen,
  Briefcase,
  GraduationCap,
  RefreshCw,
  Zap,
  Eye,
  Trash2,
  Check,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggleCompact } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/stores/userStore";
import type {
  ExperienceLevel,
  UserBackground,
  ExplanationStyle,
} from "@/types/user";
import { CFA_TOPICS } from "@/types/user";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const router = useRouter();
  const { profile, analytics, updateProfile, resetProfile } = useUserStore();

  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("beginner");
  const [background, setBackground] = useState<UserBackground>("student");
  const [explanationStyle, setExplanationStyle] = useState<ExplanationStyle>("detailed");
  const [focusTopics, setFocusTopics] = useState<string[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Load profile data
  useEffect(() => {
    if (profile) {
      setExperienceLevel(profile.experienceLevel);
      setBackground(profile.background);
      setExplanationStyle(profile.explanationStyle);
      setFocusTopics(profile.focusTopics || []);
    }
  }, [profile]);

  // Track changes
  useEffect(() => {
    if (profile) {
      const changed =
        experienceLevel !== profile.experienceLevel ||
        background !== profile.background ||
        explanationStyle !== profile.explanationStyle ||
        JSON.stringify(focusTopics) !== JSON.stringify(profile.focusTopics || []);
      setHasChanges(changed);
    }
  }, [experienceLevel, background, explanationStyle, focusTopics, profile]);

  const handleSave = () => {
    updateProfile({
      experienceLevel,
      background,
      explanationStyle,
      focusTopics,
    });
    setHasChanges(false);
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    resetProfile();
    setShowResetConfirm(false);
    toast.success("Profile reset. You'll see the onboarding again on next visit.");
    router.push("/");
  };

  const toggleTopic = (topic: string) => {
    setFocusTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No profile found</p>
          <Link href="/">
            <Button>Go to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggleCompact />
            {hasChanges && (
              <Button onClick={handleSave} className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto max-w-3xl px-4 py-8">
        <div className="space-y-8">
          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Overview
              </CardTitle>
              <CardDescription>
                Your learning profile summary
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Questions Answered</p>
                  <p className="text-2xl font-bold">{analytics?.totalQuestionsAnswered || 0}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Overall Accuracy</p>
                  <p className="text-2xl font-bold">{analytics?.overallAccuracy || 0}%</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Current Streak</p>
                  <p className="text-2xl font-bold">{analytics?.currentStreak || 0} days</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground">Study Time</p>
                  <p className="text-2xl font-bold">
                    {Math.round((analytics?.totalStudyTime || 0) / 60)}m
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience Level */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Experience Level
              </CardTitle>
              <CardDescription>
                How much do you know about this subject?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {[
                  { level: "beginner" as const, icon: BookOpen, title: "Beginner", desc: "New to this subject" },
                  { level: "intermediate" as const, icon: GraduationCap, title: "Intermediate", desc: "Some prior knowledge" },
                  { level: "advanced" as const, icon: Zap, title: "Advanced", desc: "Experienced practitioner" },
                ].map((opt) => (
                  <button
                    key={opt.level}
                    onClick={() => setExperienceLevel(opt.level)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                      experienceLevel === opt.level
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-lg",
                      experienceLevel === opt.level ? "bg-primary text-white" : "bg-muted"
                    )}>
                      <opt.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{opt.title}</p>
                      <p className="text-sm text-muted-foreground">{opt.desc}</p>
                    </div>
                    {experienceLevel === opt.level && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Background */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Your Background
              </CardTitle>
              <CardDescription>
                This helps us provide relevant examples
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {[
                  { bg: "student" as const, icon: GraduationCap, title: "Student", desc: "Currently studying" },
                  { bg: "working-professional" as const, icon: Briefcase, title: "Working Professional", desc: "In the field" },
                  { bg: "career-changer" as const, icon: RefreshCw, title: "Career Changer", desc: "Transitioning" },
                ].map((opt) => (
                  <button
                    key={opt.bg}
                    onClick={() => setBackground(opt.bg)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                      background === opt.bg
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-lg",
                      background === opt.bg ? "bg-primary text-white" : "bg-muted"
                    )}>
                      <opt.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{opt.title}</p>
                      <p className="text-sm text-muted-foreground">{opt.desc}</p>
                    </div>
                    {background === opt.bg && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Explanation Style */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Explanation Style
              </CardTitle>
              <CardDescription>
                How do you prefer AI explanations?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {[
                  { style: "detailed" as const, icon: BookOpen, title: "Detailed", desc: "Step-by-step with examples" },
                  { style: "concise" as const, icon: Zap, title: "Concise", desc: "Brief and to the point" },
                  { style: "visual" as const, icon: Eye, title: "Visual", desc: "Diagrams when possible" },
                ].map((opt) => (
                  <button
                    key={opt.style}
                    onClick={() => setExplanationStyle(opt.style)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all",
                      explanationStyle === opt.style
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-lg",
                      explanationStyle === opt.style ? "bg-primary text-white" : "bg-muted"
                    )}>
                      <opt.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{opt.title}</p>
                      <p className="text-sm text-muted-foreground">{opt.desc}</p>
                    </div>
                    {explanationStyle === opt.style && (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Focus Topics */}
          <Card>
            <CardHeader>
              <CardTitle>Focus Topics</CardTitle>
              <CardDescription>
                Select topics you want to prioritize (optional)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {CFA_TOPICS.map((topic) => (
                  <motion.button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium border-2 transition-all",
                      focusTopics.includes(topic)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {focusTopics.includes(topic) && (
                      <Check className="inline h-3 w-3 mr-1" />
                    )}
                    {topic}
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Insights */}
          {analytics && analytics.topicPerformance.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>
                  Based on your practice sessions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics.weakTopics.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-amber-600 dark:text-amber-400 mb-2">
                        Needs Improvement
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {analytics.weakTopics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 rounded-md text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {analytics.strongTopics.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                        Strong Areas
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {analytics.strongTopics.map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 rounded-md text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          <Separator />

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {showResetConfirm ? (
                <div className="p-4 rounded-lg bg-destructive/10 space-y-4">
                  <p className="text-sm">
                    Are you sure? This will delete all your progress and settings.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowResetConfirm(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleReset}
                    >
                      Yes, Reset Everything
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="border-destructive/50 text-destructive hover:bg-destructive/10"
                  onClick={() => setShowResetConfirm(true)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Reset Profile & Progress
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

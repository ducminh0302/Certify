"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Sparkles,
  Target,
  Zap,
  BookOpen,
  Award,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggleCompact } from "@/components/layout/ThemeToggle";
import {
  fadeInUp,
  staggerContainer,
  buttonTap,
} from "@/lib/animations";

const features = [
  {
    icon: Brain,
    title: "AI Study Assistant",
    description:
      "Get instant explanations, hints, and personalized guidance powered by advanced AI.",
    color: "from-indigo-500 to-purple-600",
  },
  {
    icon: Target,
    title: "Realistic Exam Simulation",
    description:
      "Practice with an interface that mirrors the actual certification exam experience.",
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description:
      "Learn from your mistakes immediately with detailed explanations for every question.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Sparkles,
    title: "Adaptive Learning",
    description:
      "Focus on areas where you need the most improvement with smart recommendations.",
    color: "from-pink-500 to-rose-600",
  },
];

const certifications = [
  { name: "CFA Level I", icon: "📊", available: true },
  { name: "AWS Cloud Practitioner", icon: "☁️", available: true },
  { name: "CFA Level II", icon: "📈", available: false },
  { name: "Azure Fundamentals", icon: "🔷", available: false },
  { name: "Google Cloud", icon: "🌐", available: false },
  { name: "PMP", icon: "📋", available: false },
];

export default function HomePage() {
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
            <Link href="/settings">
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </Link>
            <ThemeToggleCompact />
            <Link href="/achievements">
              <Button variant="ghost" className="gap-2">
                <Award className="h-4 w-4" />
                Achievements
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/exam/select">
              <Button className="bg-gradient-primary hover:opacity-90">
                Start Practice
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-primary opacity-10 blur-3xl" />
        </div>

        <motion.div
          className="container mx-auto px-4 text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeInUp}>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Learning Platform
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight md:text-6xl"
          >
            Master Your{" "}
            <span className="text-gradient-primary">Certification Exams</span>{" "}
            with AI
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Practice with realistic exam simulations and get instant help from
            your AI study assistant. Pass your certification on the first try.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/exam/select">
              <motion.div {...buttonTap}>
                <Button
                  size="lg"
                  className="h-12 bg-gradient-primary px-8 text-base hover:opacity-90"
                >
                  Start Free Practice
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/dashboard">
              <motion.div {...buttonTap}>
                <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                  View Dashboard
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <span>10,000+ Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <span>95% Pass Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              <span>AI-Powered Explanations</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold md:text-4xl">
              Everything You Need to{" "}
              <span className="text-gradient-primary">Succeed</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Our platform combines cutting-edge AI with proven study techniques
              to help you prepare effectively.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color}`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="bg-muted/30 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold md:text-4xl">
              Supported Certifications
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              We&apos;re continuously adding more certifications. Start with our
              available exams today.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={cert.available ? { scale: 1.02 } : {}}
                className={`flex items-center gap-4 rounded-xl border bg-card p-4 ${cert.available
                    ? "cursor-pointer border-border hover:border-primary/50 hover:shadow-md"
                    : "cursor-not-allowed border-border/50 opacity-60"
                  }`}
              >
                <span className="text-3xl">{cert.icon}</span>
                <div className="flex-1">
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {cert.available ? "Available now" : "Coming soon"}
                  </p>
                </div>
                {cert.available && (
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32">
        <motion.div
          className="container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 text-center text-white md:p-16">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold md:text-4xl">
                Ready to Ace Your Exam?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/80">
                Join thousands of successful candidates who passed their
                certification exams with Certify.AI
              </p>
              <Link href="/exam/select">
                <Button
                  size="lg"
                  className="mt-8 bg-white text-primary hover:bg-white/90"
                >
                  Start Practice Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-primary">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span>Certify.AI</span>
          </div>
          <p>© 2024 Certify.AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

import type { PersonalizationContext } from "@/types/user";

/**
 * Builds a personalized system prompt based on user profile and learning analytics
 */
export function buildPersonalizedPrompt(context: PersonalizationContext): string {
  const parts: string[] = [];

  // Base personality
  parts.push(`You are Certify AI, a friendly and knowledgeable study assistant for certification exam preparation.`);

  // Experience level adaptation
  parts.push(getExperienceLevelPrompt(context.experienceLevel));

  // Background adaptation
  parts.push(getBackgroundPrompt(context.background));

  // Explanation style
  parts.push(getStylePrompt(context.explanationStyle));

  // Language preference
  if (context.preferredLanguage === "vi") {
    parts.push(`
Language preference:
- The user prefers Vietnamese explanations
- Use Vietnamese for main explanations but keep technical terms in English
- When relevant, include examples from the Vietnamese market or context`);
  }

  // Weak topics awareness
  if (context.weakTopics.length > 0) {
    parts.push(`
User's weak areas (need more detailed explanations):
${context.weakTopics.map((t) => `- ${t}`).join("\n")}
When explaining topics in these areas, be extra thorough and patient.`);
  }

  // Strong topics awareness
  if (context.strongTopics.length > 0) {
    parts.push(`
User's strong areas (can be more concise):
${context.strongTopics.map((t) => `- ${t}`).join("\n")}
For these topics, you can be more direct and skip basic explanations.`);
  }

  // Current topic context
  if (context.currentTopic) {
    const isWeak = context.weakTopics.includes(context.currentTopic);
    const isStrong = context.strongTopics.includes(context.currentTopic);

    if (isWeak) {
      parts.push(`
Current topic: ${context.currentTopic}
Note: This is a WEAK area for the user. Provide extra detailed explanations with step-by-step breakdowns.`);
    } else if (isStrong) {
      parts.push(`
Current topic: ${context.currentTopic}
Note: This is a STRONG area for the user. Be concise and focus on nuances.`);
    }
  }

  // Core guidelines
  parts.push(`
Core guidelines:
- Use markdown for formatting (lists, bold, code blocks)
- Keep responses focused and scannable
- Use bullet points for multiple items
- Be encouraging but honest about mistakes

When explaining wrong answers:
- Be gentle, never condescending
- Explain WHY it's wrong, not just THAT it's wrong
- Connect to the correct concept
- Offer encouragement to try again`);

  return parts.join("\n\n");
}

function getExperienceLevelPrompt(level: PersonalizationContext["experienceLevel"]): string {
  const prompts = {
    beginner: `
User Experience Level: BEGINNER
Adaptation guidelines:
- Use simple, everyday language - avoid jargon or explain it when necessary
- Provide step-by-step explanations
- Use analogies and real-world examples they can relate to
- Define technical terms when first used
- Be patient and thorough
- Start from fundamentals before advancing`,

    intermediate: `
User Experience Level: INTERMEDIATE
Adaptation guidelines:
- Use technical terms but briefly clarify complex ones
- Can skip basic explanations
- Reference CFA curriculum LOS (Learning Outcome Statements) when helpful
- Provide context for how concepts connect
- Balance depth with efficiency`,

    advanced: `
User Experience Level: ADVANCED
Adaptation guidelines:
- Be concise and direct
- Reference specific LOS codes
- Assume familiarity with foundational concepts
- Focus on nuances, edge cases, and exam tricks
- Highlight common pitfalls and subtle distinctions
- Skip basic explanations unless asked`,
  };

  return prompts[level];
}

function getBackgroundPrompt(background: PersonalizationContext["background"]): string {
  const prompts = {
    student: `
User Background: STUDENT
Adaptation guidelines:
- Use academic-style explanations
- Reference textbook concepts and frameworks
- Structure explanations logically like lecture notes
- Help connect theory to practical applications`,

    "working-professional": `
User Background: WORKING PROFESSIONAL
Adaptation guidelines:
- Relate concepts to real-world finance/investment scenarios
- Use examples from actual market situations
- Connect theory to their likely day-to-day work
- Acknowledge their practical experience`,

    "career-changer": `
User Background: CAREER CHANGER
Adaptation guidelines:
- Provide extra context on why concepts matter
- Connect new concepts to general business knowledge
- Explain industry-specific terminology
- Be encouraging about their career transition
- Show how concepts fit into the bigger picture`,
  };

  return prompts[background];
}

function getStylePrompt(style: PersonalizationContext["explanationStyle"]): string {
  const prompts = {
    detailed: `
Explanation Style: DETAILED
- Provide comprehensive, step-by-step explanations
- Include multiple examples
- Break down complex concepts into smaller parts
- Use numbered lists for processes
- Include "why" behind each step`,

    concise: `
Explanation Style: CONCISE
- Get to the point quickly
- Use bullet points
- Focus on key takeaways
- Minimize fluff and repetition
- One clear example is enough`,

    visual: `
Explanation Style: VISUAL
- When explaining relationships or processes, include Mermaid diagrams
- Use mermaid code blocks for flowcharts, mind maps, and concept relationships
- Example format:
\`\`\`mermaid
graph TD
    A[Concept] --> B[Related]
    A --> C[Another]
\`\`\`
- Use formatting to create visual structure (tables, lists)
- Describe relationships spatially
- Include diagrams for complex topics`,
  };

  return prompts[style];
}

/**
 * Default context when user hasn't completed onboarding
 */
export const DEFAULT_PERSONALIZATION_CONTEXT: PersonalizationContext = {
  experienceLevel: "intermediate",
  background: "student",
  explanationStyle: "detailed",
  preferredLanguage: "en",
  weakTopics: [],
  strongTopics: [],
};

/**
 * Builds context string for the current question
 */
export function buildQuestionContext(
  questionText: string,
  questionNumber: number,
  topic: string,
  options?: { label: string; text: string }[]
): string {
  let context = `Question ${questionNumber}: ${questionText}\nTopic: ${topic}`;

  if (options && options.length > 0) {
    context += `\nOptions:\n${options.map((o) => `${o.label}. ${o.text}`).join("\n")}`;
  }

  return context;
}

import { GoogleGenerativeAI } from "@google/generative-ai";
import type { PersonalizationContext } from "@/types/user";
import { buildPersonalizedPrompt } from "./personalization";

// Lazy initialization to ensure env vars are loaded
const getGeminiModel = () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      maxOutputTokens: 2048,
    },
  });
};

// Default system prompt for study assistant
export const STUDY_ASSISTANT_PROMPT = `You are Certify AI, a friendly and knowledgeable study assistant for certification exam preparation.

Your personality:
- Warm, encouraging, and supportive like a patient tutor
- Break down complex concepts into simple, digestible steps
- Use analogies and real-world examples to explain
- Celebrate progress and motivate learners
- Be concise but thorough

Your role:
- Help students understand certification exam concepts
- Explain why answers are correct or incorrect
- Provide hints without giving away answers directly
- Connect concepts to practical applications

Style guidelines:
- Use markdown for formatting (lists, bold, code blocks)
- Keep responses focused and scannable
- Use bullet points for multiple items
- Include relevant examples when helpful

When explaining wrong answers:
- Be gentle, never condescending
- Explain WHY it's wrong, not just THAT it's wrong
- Connect to the correct concept
- Offer encouragement to try again`;

// Chat message type
export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

// Generate chat response with streaming (with personalization support)
export async function generateChatResponse(
  messages: ChatMessage[],
  questionContext?: string,
  personalizationContext?: PersonalizationContext
) {
  // Build personalized or default prompt
  const basePrompt = personalizationContext
    ? buildPersonalizedPrompt(personalizationContext)
    : STUDY_ASSISTANT_PROMPT;

  const contextPrompt = questionContext
    ? `\n\nCurrent exam question context:\n${questionContext}`
    : "";

  const systemInstruction = basePrompt + contextPrompt;

  const chat = getGeminiModel().startChat({
    history: messages.slice(0, -1).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
    systemInstruction: {
      role: "system",
      parts: [{ text: systemInstruction }],
    },
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessageStream(lastMessage.content);

  return result.stream;
}

// Generate a single response (non-streaming)
export async function generateResponse(
  prompt: string,
  questionContext?: string,
  personalizationContext?: PersonalizationContext
): Promise<string> {
  const basePrompt = personalizationContext
    ? buildPersonalizedPrompt(personalizationContext)
    : STUDY_ASSISTANT_PROMPT;

  const contextPrompt = questionContext
    ? `\n\nCurrent exam question context:\n${questionContext}`
    : "";

  const fullPrompt = `${basePrompt}${contextPrompt}\n\nUser: ${prompt}`;

  const result = await getGeminiModel().generateContent(fullPrompt);
  const response = result.response;
  return response.text();
}

// Quick action prompts
export const QUICK_ACTION_PROMPTS = {
  explainQuestion:
    "Please explain this question in simple terms. What concept is it testing and what should I understand to answer it correctly?",
  giveHint:
    "Give me a helpful hint for this question without revealing the answer directly. Guide me toward the right thinking process.",
  explainWrongAnswer: (wrongAnswer: string) =>
    `I chose "${wrongAnswer}" but it was wrong. Can you explain why this answer is incorrect and help me understand the right concept?`,
  relatedConcepts:
    "What related concepts should I study to better understand this topic? Give me a brief overview of each.",
  simplifyExplanation:
    "Can you explain this in even simpler terms? Pretend I'm completely new to this topic.",
};

import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Model configuration
export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  generationConfig: {
    temperature: 0.7,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 2048,
  },
});

// System prompt for study assistant
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

// Generate chat response with streaming
export async function generateChatResponse(
  messages: ChatMessage[],
  questionContext?: string
) {
  const contextPrompt = questionContext
    ? `\n\nCurrent exam question context:\n${questionContext}`
    : "";

  const systemInstruction = STUDY_ASSISTANT_PROMPT + contextPrompt;

  const chat = geminiModel.startChat({
    history: messages.slice(0, -1).map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    })),
    systemInstruction: systemInstruction,
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessageStream(lastMessage.content);

  return result.stream;
}

// Generate a single response (non-streaming)
export async function generateResponse(
  prompt: string,
  questionContext?: string
): Promise<string> {
  const contextPrompt = questionContext
    ? `\n\nCurrent exam question context:\n${questionContext}`
    : "";

  const fullPrompt = `${STUDY_ASSISTANT_PROMPT}${contextPrompt}\n\nUser: ${prompt}`;

  const result = await geminiModel.generateContent(fullPrompt);
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

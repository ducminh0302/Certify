import { NextRequest } from "next/server";
import { generateChatResponse, ChatMessage } from "@/lib/gemini";
import type { PersonalizationContext } from "@/types/user";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { messages, context, personalization } = (await req.json()) as {
      messages: ChatMessage[];
      context?: string;
      personalization?: PersonalizationContext;
    };

    if (!messages || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Messages are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      // Return mock response for development
      const lastUserMessage = messages[messages.length - 1]?.content;
      return new Response(
        createMockStream(lastUserMessage, personalization),
        {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Transfer-Encoding": "chunked",
          },
        }
      );
    }

    console.log("Processing chat request...");
    console.log("API Key present:", !!process.env.GEMINI_API_KEY);
    console.log("Messages count:", messages.length);
    console.log("Context length:", context?.length || 0);
    console.log("Personalization:", personalization?.experienceLevel || "none");

    const stream = await generateChatResponse(messages, context, personalization);

    // Create a readable stream from the Gemini response
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.text();
            controller.enqueue(new TextEncoder().encode(text));
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Mock responses for development without API key
const MOCK_RESPONSES = {
  explain: `## Understanding This Question

This question is testing your understanding of **professional standards and ethical conduct**.

**Key Concepts:**
- The question focuses on *compliance procedures* and *supervisory responsibilities*
- It's asking about recommended practices, not mandatory requirements
- Consider the practical implications of each choice

**What to Look For:**
1. Options that align with fiduciary principles
2. Separation of ethical codes from detailed procedures
3. Client communication appropriateness

Think about the underlying principle: ethics codes should provide broad guidance while compliance procedures handle specific implementation details.

Would you like me to explain any specific option?`,

  hint: `## Here's a Helpful Hint

Without giving away the answer, consider this:

**Think about the purpose of each document:**
- An **ethics code** → High-level principles and values
- **Compliance procedures** → Specific, detailed implementation steps

**Ask yourself:**
- Should clients need to know the firm's internal compliance details?
- Should ethics and compliance be combined or separate?

The correct answer reflects *best practices* for maintaining both ethical standards AND practical compliance.

*Focus on what supervisors should **encourage** firms to adopt.*`,

  wrong: `## Let's Understand Why That Might Not Be Right

Don't worry - this is a tricky question! Let me help clarify:

**Common Misconceptions:**
- Sharing detailed compliance procedures with clients seems transparent, but it's not recommended practice
- Combining ethics codes with compliance procedures can create confusion

**The Key Insight:**
Ethics codes should be *principle-based* and broadly applicable, while compliance procedures are *specific* and internal.

**Remember:**
- Ethics → **What** we should do (principles)
- Compliance → **How** we do it (procedures)

Would you like me to walk through each option in detail?`,

  concepts: `## Related Concepts to Study

Based on this question, here are the key topics you should review:

### 1. Standards of Professional Conduct
- Fiduciary duty and its applications
- Supervisory responsibilities (Standard IV)
- Independence and objectivity requirements

### 2. Compliance Programs
- Elements of an effective compliance system
- Role of compliance officers
- Documentation requirements

### 3. Code of Ethics vs. Compliance Manual
- Purpose and scope differences
- Implementation strategies
- Client communication guidelines

**Study Tip:** The CFA Institute Standards of Practice Handbook has detailed guidance on each of these areas.

Would you like me to elaborate on any of these topics?`,

  default: `## Let Me Help You With This!

Great question! Let me break this down:

**What This Question Tests:**
- Your understanding of professional standards
- Knowledge of best practices for supervisors
- Ability to distinguish between ethics and compliance

**Approach:**
1. First, identify what the question is really asking
2. Consider the practical implications of each option
3. Think about the underlying principles

**Key Takeaway:**
The correct answer will align with established best practices that promote both ethical conduct AND effective compliance.

Is there a specific aspect you'd like me to clarify further?`,
};

// Get personalized prefix based on user level
function getPersonalizedPrefix(personalization?: PersonalizationContext): string {
  if (!personalization) return "";
  
  const level = personalization.experienceLevel;
  if (level === "beginner") {
    return "Let me explain this in simple terms:\n\n";
  } else if (level === "advanced") {
    return "Quick summary:\n\n";
  }
  return "";
}

// Mock stream for development without API key
function createMockStream(userMessage?: string, personalization?: PersonalizationContext): ReadableStream {
  // Determine which response to use based on the message
  let mockResponse = MOCK_RESPONSES.default;

  const message = userMessage?.toLowerCase() || "";

  if (message.includes("explain") || message.includes("concept")) {
    mockResponse = MOCK_RESPONSES.explain;
  } else if (message.includes("hint") || message.includes("guide")) {
    mockResponse = MOCK_RESPONSES.hint;
  } else if (message.includes("wrong") || message.includes("incorrect")) {
    mockResponse = MOCK_RESPONSES.wrong;
  } else if (message.includes("related") || message.includes("study") || message.includes("concept")) {
    mockResponse = MOCK_RESPONSES.concepts;
  }

  // Add personalized prefix
  const prefix = getPersonalizedPrefix(personalization);
  mockResponse = prefix + mockResponse;

  const chunks = mockResponse.split(" ");
  let index = 0;

  return new ReadableStream({
    async pull(controller) {
      if (index < chunks.length) {
        const chunk = chunks[index] + (index < chunks.length - 1 ? " " : "");
        controller.enqueue(new TextEncoder().encode(chunk));
        index++;
        // Simulate typing delay (varies for natural feel)
        const delay = 30 + Math.random() * 40;
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        controller.close();
      }
    },
  });
}

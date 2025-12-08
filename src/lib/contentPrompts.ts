/**
 * Prompts for generating educational content from AI
 */

// Generate a slide deck for a topic
export const SLIDES_PROMPT = (topic: string, slideCount: number = 8) => `
Create a concise educational slide deck about "${topic}" for CFA exam preparation.

Generate exactly ${slideCount} slides in JSON format. Each slide should have:
- id: unique string
- type: one of "title", "content", "bullets", "comparison", "diagram", "summary"
- title: slide title
- content: main text (for content type)
- bullets: array of bullet points (for bullets type)
- notes: presenter notes (1-2 sentences)
- diagram: mermaid diagram code (for diagram type only)

Slide structure:
1. Title slide (type: "title")
2-3. Key concepts (type: "bullets")
4. Visual diagram if applicable (type: "diagram")
5-6. Important details (type: "content" or "bullets")
7. Comparison if relevant (type: "comparison")
8. Summary/Key takeaways (type: "summary")

Return ONLY valid JSON array of slides, no other text:
[
  {
    "id": "slide-1",
    "type": "title",
    "title": "${topic}",
    "content": "Brief subtitle",
    "notes": "Presenter notes here"
  },
  ...
]
`;

// Generate study notes for a topic
export const STUDY_NOTES_PROMPT = (topic: string) => `
Create comprehensive study notes for "${topic}" for CFA exam preparation.

Structure the response as JSON with:
{
  "title": "Topic title",
  "content": "Main content in markdown format with headers, lists, etc.",
  "keyPoints": ["Key point 1", "Key point 2", ...],
  "formulas": [
    {
      "id": "f1",
      "name": "Formula name",
      "formula": "The formula",
      "description": "When and how to use it",
      "variables": [{"symbol": "X", "meaning": "explanation"}]
    }
  ],
  "examples": [
    {
      "id": "e1",
      "title": "Example title",
      "problem": "The problem statement",
      "solution": "Step by step solution",
      "explanation": "Why this approach works"
    }
  ],
  "relatedTopics": ["Related topic 1", "Related topic 2"]
}

Make it exam-focused with:
- Clear explanations
- Practical examples
- Common exam traps to avoid
- Memory aids/mnemonics if helpful

Return ONLY valid JSON, no other text.
`;

// Generate summary for quick review
export const QUICK_SUMMARY_PROMPT = (topic: string) => `
Create a quick review summary for "${topic}" that can be read in 2 minutes.

Format as markdown with:
## Key Concepts
- Bullet point summaries

## Must-Know Formulas
- Formula 1: explanation
- Formula 2: explanation

## Exam Tips
- Common mistakes to avoid
- Quick tricks

## Memory Aids
- Mnemonics or memory tricks

Keep it concise and exam-focused. This is for last-minute review.
`;

// Generate flashcard-style Q&A
export const FLASHCARDS_PROMPT = (topic: string, count: number = 10) => `
Create ${count} flashcard-style questions and answers about "${topic}" for CFA exam prep.

Return as JSON array:
[
  {
    "id": "fc-1",
    "question": "Question text",
    "answer": "Answer text",
    "difficulty": "easy|medium|hard"
  }
]

Mix difficulty levels:
- 30% easy (definitions, basic concepts)
- 50% medium (applications, calculations)
- 20% hard (edge cases, complex scenarios)

Return ONLY valid JSON array.
`;

// Parse AI response to extract JSON
export function parseAIJSON<T>(response: string): T | null {
  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\[[\s\S]*\]|\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as T;
    }
    return JSON.parse(response) as T;
  } catch (error) {
    console.error("Failed to parse AI JSON response:", error);
    return null;
  }
}

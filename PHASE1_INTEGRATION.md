# Phase 1 Integration Guide

> Hướng dẫn tích hợp các thay đổi Phase 1: Personalization Foundation
> Chạy sau khi dừng dev server để tránh conflict

## Files đã tạo mới (sẵn sàng sử dụng)

1. `src/types/user.ts` - User profile types
2. `src/stores/userStore.ts` - User state management
3. `src/lib/personalization.ts` - AI prompt personalization
4. `src/components/onboarding/OnboardingModal.tsx` - Onboarding UI
5. `src/components/onboarding/OnboardingWrapper.tsx` - Auto-show onboarding
6. `src/components/onboarding/index.ts` - Exports
7. `src/app/settings/page.tsx` - Settings page

---

## Manual Changes Required

### 1. Update `src/app/layout.tsx`

Thêm import và wrap children với OnboardingWrapper:

```tsx
// Thêm import
import { OnboardingWrapper } from "@/components/onboarding";

// Trong return, wrap children:
<ThemeProvider>
  <OnboardingWrapper>
    {children}
  </OnboardingWrapper>
  <Toaster ... />
</ThemeProvider>
```

---

### 2. Update `src/lib/gemini.ts`

Thêm import và update function signature:

```tsx
// Thêm imports ở đầu file
import type { PersonalizationContext } from "@/types/user";
import { buildPersonalizedPrompt } from "./personalization";

// Update generateChatResponse function
export async function generateChatResponse(
  messages: ChatMessage[],
  questionContext?: string,
  personalizationContext?: PersonalizationContext  // <-- thêm param mới
) {
  // Build personalized or default prompt
  const basePrompt = personalizationContext
    ? buildPersonalizedPrompt(personalizationContext)
    : STUDY_ASSISTANT_PROMPT;

  const contextPrompt = questionContext
    ? `\n\nCurrent exam question context:\n${questionContext}`
    : "";

  const systemInstruction = basePrompt + contextPrompt;

  // ... rest of function unchanged
}

// Tương tự update generateResponse function
export async function generateResponse(
  prompt: string,
  questionContext?: string,
  personalizationContext?: PersonalizationContext  // <-- thêm param mới
): Promise<string> {
  const basePrompt = personalizationContext
    ? buildPersonalizedPrompt(personalizationContext)
    : STUDY_ASSISTANT_PROMPT;

  // ... rest unchanged
}
```

---

### 3. Update `src/app/api/chat/route.ts`

Thêm support cho personalization context:

```tsx
// Thêm import
import type { PersonalizationContext } from "@/types/user";

// Update request body parsing
const { messages, context, personalization } = (await req.json()) as {
  messages: ChatMessage[];
  context?: string;
  personalization?: PersonalizationContext;  // <-- thêm field mới
};

// Pass personalization to generateChatResponse
const stream = await generateChatResponse(messages, context, personalization);
```

---

### 4. Update `src/app/exam/[examId]/page.tsx`

Thêm tracking performance và gửi personalization context:

```tsx
// Thêm imports
import { useUserStore } from "@/stores/userStore";

// Trong component, thêm
const {
  updateTopicPerformance,
  getPersonalizationContext,
  recordSession
} = useUserStore();

// Khi user trả lời câu hỏi, update tracking (trong handleSelectAnswer hoặc tương tự):
useEffect(() => {
  if (showFeedback && currentQuestion) {
    const timeSpent = /* calculate time spent */;
    updateTopicPerformance(currentQuestion.topic, isCorrect, timeSpent);
  }
}, [showFeedback, currentQuestion, isCorrect]);

// Record session khi bắt đầu exam
useEffect(() => {
  recordSession();
}, []);

// Update handleSendMessage để include personalization:
const handleSendMessage = useCallback(
  async (message: string) => {
    // ... existing code ...

    const personalization = getPersonalizationContext(currentQuestion?.topic);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: message }],
        context,
        personalization,  // <-- thêm field mới
      }),
    });

    // ... rest unchanged
  },
  [/* add getPersonalizationContext to deps */]
);
```

---

### 5. Add Settings Link to Home Page

Trong `src/app/page.tsx`, thêm link đến settings:

```tsx
// Trong header, thêm link
<Link href="/settings">
  <Button variant="ghost">Settings</Button>
</Link>
```

---

## Testing Checklist

- [ ] Mở app, onboarding modal xuất hiện
- [ ] Hoàn thành onboarding, modal đóng
- [ ] Mở lại app, onboarding không xuất hiện nữa
- [ ] Vào Settings page, thấy profile đã lưu
- [ ] Thay đổi settings, save thành công
- [ ] Làm bài exam, AI response phản ánh personalization
- [ ] Reset profile trong settings, onboarding xuất hiện lại

---

## File Structure After Phase 1

```
src/
├── app/
│   ├── settings/
│   │   └── page.tsx          ✅ NEW
│   └── layout.tsx            🔄 MODIFIED
├── components/
│   └── onboarding/
│       ├── index.ts          ✅ NEW
│       ├── OnboardingModal.tsx    ✅ NEW
│       └── OnboardingWrapper.tsx  ✅ NEW
├── lib/
│   ├── gemini.ts             🔄 MODIFIED
│   └── personalization.ts    ✅ NEW
├── stores/
│   └── userStore.ts          ✅ NEW
└── types/
    └── user.ts               ✅ NEW
```

---

## Next Steps (Phase 2)

Sau khi hoàn thành Phase 1, tiếp tục với:
- Mind Maps generation
- Mermaid diagram support
- Visual explanations

Xem `ROADMAP.md` để biết chi tiết.

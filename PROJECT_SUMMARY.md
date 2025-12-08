# 📚 CERTIFY.AI - PROJECT SUMMARY

> **AI-Powered Exam Preparation Platform**  
> Last Updated: December 8, 2024

---

## 🎯 Project Overview

Certify.AI là một nền tảng học tập thông minh sử dụng AI để giúp người dùng chuẩn bị cho các kỳ thi chứng chỉ (CFA, AWS, v.v.). Dự án được xây dựng dựa trên nghiên cứu "Learn Your Way" của Google Research với mục tiêu:

- **+9%** cải thiện điểm ngay sau khi học
- **+11%** cải thiện retention sau 3-5 ngày
- **93%** người dùng muốn tiếp tục sử dụng

---

## 🛠 Tech Stack

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.0.7 | React Framework with App Router |
| **React** | 19.2.0 | UI Library |
| **TypeScript** | 5.x | Type Safety |
| **Tailwind CSS** | 4.x | Styling |
| **Turbopack** | Built-in | Fast Development Bundler |

### State Management
| Technology | Purpose |
|------------|---------|
| **Zustand** | Global state management với persistence |

### AI/ML
| Technology | Purpose |
|------------|---------|
| **Google Generative AI** | Gemini 2.5 Flash cho AI Study Assistant |

### UI Components
| Library | Purpose |
|---------|---------|
| **Radix UI** | Accessible primitives (Dialog, Label, Progress, RadioGroup, etc.) |
| **Framer Motion** | Animations & transitions |
| **Lucide React** | Icon library |
| **React Hot Toast** | Notification toasts |
| **React Markdown** | Markdown rendering for AI responses |
| **Mermaid** | Diagram generation |
| **Canvas Confetti** | Celebration effects |
| **use-sound** | Audio feedback |

---

## 📁 Project Structure

```
d:\cert\certify-ai\
├── public/
│   └── assets/
│       └── ai-mascot.png          # AI Mascot image
│
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── page.tsx               # Home page
│   │   ├── layout.tsx             # Root layout
│   │   ├── globals.css            # Global styles
│   │   ├── achievements/          # Achievements page
│   │   ├── api/chat/              # AI Chat API endpoint
│   │   ├── dashboard/             # Dashboard page
│   │   ├── exam/
│   │   │   ├── select/            # Exam selection page
│   │   │   └── [examId]/          # Dynamic exam page
│   │   ├── results/[examId]/      # Results page
│   │   ├── settings/              # Settings page
│   │   └── study/                 # Study page
│   │
│   ├── components/                 # React components
│   │   ├── ai-assistant/          # AI Chat components (9 files)
│   │   ├── analytics/             # Analytics components (4 files)
│   │   ├── content/               # Content generation (4 files)
│   │   ├── dashboard/             # Dashboard widgets (7 files)
│   │   ├── exam/                  # Exam interface (7 files)
│   │   ├── gamification/          # Gamification system (4 files)
│   │   ├── layout/                # Layout components (2 files)
│   │   ├── onboarding/            # Onboarding flow (3 files)
│   │   ├── results/               # Results analysis (7 files)
│   │   ├── ui/                    # Base UI components (14 files)
│   │   └── visual/                # Visual learning (3 files)
│   │
│   ├── data/
│   │   └── exams/                 # Question banks
│   │       ├── cfa-level-1-session-1.ts  # ~100KB, 90 questions
│   │       ├── cfa-level-1-session-2.ts  # ~89KB, 88 questions
│   │       └── index.ts
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── use-exam-sounds.ts     # Audio feedback hook
│   │   └── useAIChat.ts           # AI Chat hook
│   │
│   ├── lib/                       # Utility libraries
│   │   ├── animations.ts          # Framer Motion variants
│   │   ├── contentPrompts.ts      # Content generation prompts
│   │   ├── gemini.ts              # Gemini AI integration
│   │   ├── personalization.ts     # AI personalization logic
│   │   ├── utils.ts               # Helper utilities
│   │   └── visualPrompts.ts       # Visual generation prompts
│   │
│   ├── stores/                    # Zustand stores
│   │   ├── chatStore.ts           # Chat state
│   │   ├── contentStore.ts        # Content generation state
│   │   ├── examStore.ts           # Exam session state
│   │   ├── progressStore.ts       # Gamification & progress
│   │   ├── uiStore.ts             # UI state
│   │   └── userStore.ts           # User profile & analytics
│   │
│   └── types/                     # TypeScript definitions
│       ├── chat.ts
│       ├── content.ts
│       ├── exam.ts
│       ├── index.ts
│       └── user.ts
│
├── ROADMAP.md                     # Development roadmap
├── PHASE1_INTEGRATION.md          # Phase 1 integration guide
├── package.json
└── tsconfig.json
```

---

## 📊 Development Phases Status

### ✅ MVP (Completed)
- [x] Exam simulation interface với timer, navigation
- [x] Instant feedback sau mỗi câu trả lời
- [x] AI Chat Assistant (Gemini 2.5 Flash)
- [x] Text selection để hỏi AI
- [x] Keyboard navigation
- [x] Results analytics với topic breakdown
- [x] Dark/Light mode
- [x] State persistence (Zustand)
- [x] CFA Level I question bank (2 sessions - 178 questions)

### ✅ Phase 1: Personalization Foundation (Completed)
- [x] User Profiling
  - Onboarding flow (experience level, background, preferences)
  - Profile storage trong localStorage/Zustand
  - Settings page để edit profile
- [x] Adaptive AI Explanations
  - System prompt với user context
  - Beginner/Intermediate/Advanced modes
  - Weak topics tracking
- [x] Contextual Examples
  - AI tự động dùng ví dụ phù hợp với background

### ⬜ Phase 2: Visual Learning (Not Started)
- [ ] Mind Maps generation
- [ ] Mermaid diagram support
- [ ] KaTeX formula rendering
- [ ] Comparison tables

### ✅ Phase 3: Adaptive Learning (Completed)
- [x] Performance Tracking
  - Detailed analytics per topic
  - Time spent per question tracking
  - Strength/weakness heatmap
- [x] Smart Recommendations
  - AI suggest topics cần review
  - Spaced repetition for wrong answers
  - Focus Mode - practice weak areas only
  - Daily/weekly study goals
- [x] Difficulty tagging system

### ⬜ Phase 4: Enhanced Content (Not Started)
- [ ] Slides Mode
- [ ] Study Notes generator
- [ ] Question Bank Expansion (CFA Level II, AWS)

### ✅ Phase 5: Social & Gamification (Completed - December 2024)
- [x] XP system cho completed questions
- [x] Streak tracking (daily practice)
- [x] Achievement badges (10+ achievements)
- [x] Level progression
- [x] Achievement notification toasts
- [x] Level-up celebration modal
- [x] XP animation effects
- [x] Leaderboard (mock data)
- [x] Full Achievements page with tabs
- [x] Navigation links from all pages

---

## 🎮 Gamification System Details

### XP System
| Action | XP Earned |
|--------|-----------|
| Correct answer | Base XP varies by difficulty |
| Exam completion | Bonus XP |
| Perfect score | 2x multiplier |
| Streak bonus | +10% per day |

### Level Progression
- Exponential XP growth formula
- Level titles unlock at milestones

### Achievements (10+ Available)
| Category | Examples |
|----------|----------|
| **Milestone** | First Steps, Dedicated Learner |
| **Streak** | On Fire, Unstoppable |
| **Performance** | Perfect Score, Topic Master |
| **Dedication** | Study Time milestones |

---

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Dark/Light mode support
- **Typography**: Nunito + Outfit fonts
- **Gradients**: Primary gradient (indigo → purple)
- **Animations**: Smooth transitions với Framer Motion
- **Responsive**: Mobile-first design

### Components Overview

#### AI Assistant Panel
- Collapsible side panel
- Real-time streaming responses
- Quick action buttons
- Markdown rendering với code highlighting

#### Exam Interface
- Question navigator sidebar
- Timer display
- Progress indicator
- Keyboard shortcuts (Arrow keys, 1-3 for answers)
- Audio feedback for correct/incorrect

#### Results Analytics
- Score circle với animation
- Topic breakdown bars
- Performance radar chart
- Question review with explanations
- Study recommendations

#### Dashboard
- Welcome section với greeting
- Streak indicator
- Level progress bar
- Stats grid (XP, Accuracy, Study Time, Exams)
- Continue Learning card
- Recent Activity feed
- Topic Performance Heatmap
- Study Recommendations
- Achievements showcase
- Leaderboard preview
- Focus Mode button

---

## 📦 Question Bank

### CFA Level I
| Session | Questions | Size |
|---------|-----------|------|
| Session 1 (Ethics & Tools) | 90 | ~100KB |
| Session 2 (Economics & Assets) | 88 | ~89KB |
| **Total** | **178** | **~189KB** |

### Topics Covered
- Ethics
- Quantitative Methods
- Economics
- Financial Statement Analysis
- Corporate Finance
- Equity Investments
- Fixed Income
- Derivatives
- Alternative Investments
- Portfolio Management

---

## 🔧 Configuration Files

### Environment Variables (.env.local)
```
GEMINI_API_KEY=your_api_key_here
```

### Key Config Files
- `next.config.ts` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS for Tailwind
- `components.json` - shadcn/ui configuration

---

## 🚀 Getting Started

### Installation
```bash
cd d:\cert\certify-ai
npm install
```

### Development
```bash
npm run dev
# Server runs at http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

---

## 📈 Routes

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Home page with features |
| `/dashboard` | Static | User dashboard |
| `/achievements` | Static | Achievements & Leaderboard |
| `/exam/select` | Static | Exam selection |
| `/exam/[examId]` | Dynamic | Exam taking interface |
| `/results/[examId]` | Dynamic | Exam results |
| `/settings` | Static | User settings |
| `/study` | Static | Study resources |
| `/api/chat` | Dynamic | AI Chat API endpoint |

---

## 🔮 Future Roadmap

### Deferred Features (Cost/Complexity)
- [ ] Audio explanations (TTS APIs)
- [ ] Podcast-style lessons
- [ ] Voice input
- [ ] Real-time tutoring conversations
- [ ] Essay grading
- [ ] Custom question generation

### Infrastructure Needs
- [ ] User authentication
- [ ] Cloud database (Supabase)
- [ ] Progress sync across devices
- [ ] Admin CMS

---

## 📝 Technical Debt & Improvements

### Performance
- [ ] Lazy load question banks
- [ ] Optimize bundle size
- [ ] Image optimization

### Code Quality
- [ ] Unit tests cho stores
- [ ] E2E tests cho exam flow
- [ ] Error boundary improvements

### Accessibility
- [ ] Screen reader improvements
- [ ] Keyboard navigation audit
- [ ] Color contrast review

---

## 📊 Success Metrics (Targets)

| Metric | Phase 1 Target | Phase 2 Target |
|--------|----------------|----------------|
| Avg session time | +20% | +40% |
| Questions per session | +15% | +30% |
| Return user rate | 60% | 75% |
| User satisfaction | 80% | 90% |

---

## 🤝 Credits

- **Research Base**: Google Research "Learn Your Way"
- **AI Model**: Google Gemini 2.5 Flash
- **UI Framework**: Radix UI + Tailwind CSS
- **Icons**: Lucide React

---

*Document generated: December 8, 2024*

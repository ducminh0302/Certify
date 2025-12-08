# Certify.AI - Product Roadmap

> Dựa trên nghiên cứu "Learn Your Way" của Google Research
> Reference: https://research.google/blog/learn-your-way-reimagining-textbooks-with-generative-ai/

---

## 📊 Overall Progress Summary

| Phase | Status | Completion |
|-------|--------|------------|
| MVP | ✅ Done | 100% |
| Phase 1: Personalization | ✅ Done | 100% |
| Phase 2: Visual Learning | ⬜ Not Started | 0% |
| Phase 3: Adaptive Learning | ✅ Done | 100% |
| Phase 4: Enhanced Content | ⬜ Not Started | 0% |
| Phase 5: Gamification | ✅ Done | 100% |

**Last Updated:** December 8, 2024

---

## Research Insights

Google Research đã chứng minh với 60 học sinh (15-18 tuổi):
- **+9%** điểm kiểm tra ngay sau học
- **+11%** điểm retention sau 3-5 ngày
- **100%** cảm thấy thoải mái hơn với bài test
- **93%** muốn tiếp tục sử dụng

**Key findings áp dụng được:**
1. Personalization theo level & interests tạo impact lớn nhất
2. Dual Coding Theory - multiple representations tăng retention
3. Student agency - cho user chọn cách học tăng engagement

---

## Current State (MVP)

### Done
- [x] Exam simulation interface với timer, navigation
- [x] Instant feedback sau mỗi câu trả lời
- [x] AI Chat Assistant (Gemini 2.5 Flash)
- [x] Text selection để hỏi AI
- [x] Keyboard navigation
- [x] Results analytics với topic breakdown
- [x] Dark/Light mode
- [x] State persistence (Zustand)
- [x] CFA Level I question bank (2 sessions)

---

## Phase 1: Personalization Foundation

**Goal:** Cá nhân hóa trải nghiệm học tập
**Impact dự kiến:** +9% improvement (theo Google research)
**Effort:** Medium

### 1.1 User Profiling
- [ ] Onboarding flow hỏi về background
  - Experience level: Beginner / Some knowledge / Advanced
  - Background: Student / Working professional / Career changer
  - Target exam date (để tính study pace)
- [ ] Store user profile trong localStorage/Zustand
- [ ] Profile settings page để edit

### 1.2 Adaptive AI Explanations
- [ ] Enhance system prompt với user context
- [ ] Beginner mode: Giải thích chi tiết, nhiều ví dụ, tránh jargon
- [ ] Advanced mode: Concise, reference LOS codes, assume prior knowledge
- [ ] Track user's weak topics từ exam results

### 1.3 Contextual Examples
- [ ] AI tự động dùng ví dụ phù hợp với background
- [ ] Option cho user request "Explain with real-world example"
- [ ] Vietnamese market examples cho VN users (optional)

---

## Phase 2: Visual Learning (Dual Coding)

**Goal:** Tăng retention qua multiple representations
**Impact dự kiến:** +11% retention (theo Google research)
**Effort:** Medium-High

### 2.1 Mind Maps
- [ ] Generate mind map cho mỗi topic/concept
- [ ] Interactive mind map viewer (có thể dùng react-flow hoặc d3)
- [ ] "Show as Mind Map" button trong AI panel
- [ ] Export mind map as image

### 2.2 Visual Explanations
- [ ] AI generate Mermaid diagrams cho concepts phức tạp
- [ ] Mermaid renderer component
- [ ] Formula/equation rendering (KaTeX)
- [ ] Comparison tables cho similar concepts

### 2.3 Concept Relationships
- [ ] Link related questions trong exam
- [ ] "Related Topics" section trong AI response
- [ ] Topic dependency graph (prerequisite concepts)

---

## Phase 3: Adaptive Learning

**Goal:** Tự động điều chỉnh độ khó và focus areas
**Impact dự kiến:** Higher engagement & efficiency
**Effort:** High

### 3.1 Performance Tracking
- [ ] Detailed analytics per topic
- [ ] Time spent per question tracking
- [ ] Mistake pattern analysis
- [ ] Strength/weakness heatmap

### 3.2 Smart Recommendations
- [ ] AI suggest topics cần review
- [ ] Spaced repetition cho wrong answers
- [ ] "Focus Mode" - practice weak areas only
- [ ] Daily/weekly study goals

### 3.3 Difficulty Adjustment
- [ ] Tag questions by difficulty (easy/medium/hard)
- [ ] Adaptive question selection based on performance
- [ ] Progressive difficulty trong practice sessions

---

## Phase 4: Enhanced Content

**Goal:** Richer learning materials
**Effort:** Medium

### 4.1 Slides Mode
- [ ] AI generate slide deck từ topic
- [ ] Slide viewer component
- [ ] Export as PDF
- [ ] Presenter notes

### 4.2 Study Notes
- [ ] AI generate summary notes per topic
- [ ] User can save/bookmark explanations
- [ ] Personal notes feature
- [ ] Export study materials

### 4.3 Question Bank Expansion
- [ ] CFA Level I - more sessions
- [ ] CFA Level II questions
- [ ] AWS Cloud Practitioner
- [ ] Question import tool (admin)

---

## Phase 5: Social & Gamification ✅

**Goal:** Tăng motivation và engagement
**Effort:** Medium
**Status:** COMPLETED (December 2024)

### 5.1 Progress Gamification
- [x] XP system cho completed questions
- [x] Streak tracking (daily practice)
- [x] Achievement badges
- [x] Level progression
- [x] Achievement notification toasts
- [x] Level-up celebration modal
- [x] XP animation effects

### 5.2 Leaderboards
- [x] Anonymous performance comparison (mock data)
- [x] Weekly/monthly rankings
- [x] Leaderboard compact view on dashboard

### 5.3 Achievements Page
- [x] Full achievements page with tabs
- [x] Statistics view
- [x] Navigation links from all pages

---


## Deferred (Cost/Complexity concerns)

### Audio Features (High cost - TTS APIs)
- Audio explanations
- Podcast-style lessons
- Voice input for questions

### Advanced AI Features (High complexity)
- Real-time tutoring conversations
- Essay/constructed response grading
- Custom question generation

### Backend Requirements (Infrastructure)
- User accounts & authentication
- Cloud database
- Progress sync across devices
- Admin CMS for content

---

## Technical Debt & Improvements

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

## Priority Matrix

| Feature | Impact | Effort | Priority |
|---------|--------|--------|----------|
| User Profiling | High | Low | P0 |
| Adaptive AI Explanations | High | Low | P0 |
| Mind Maps | High | Medium | P1 |
| Visual Diagrams (Mermaid) | High | Low | P1 |
| Performance Tracking | Medium | Medium | P2 |
| Smart Recommendations | High | High | P2 |
| Slides Mode | Medium | Medium | P3 |
| Gamification | Medium | Medium | P3 |

---

## Next Steps

1. **Immediate (Week 1-2):**
   - Implement user profiling system
   - Enhance AI prompts với personalization

2. **Short-term (Week 3-4):**
   - Add Mermaid diagram support
   - Basic mind map generation

3. **Medium-term (Month 2):**
   - Performance analytics dashboard
   - Topic-based recommendations

---

## Success Metrics

| Metric | Current | Target (Phase 1) | Target (Phase 2) |
|--------|---------|------------------|------------------|
| Avg session time | TBD | +20% | +40% |
| Questions per session | TBD | +15% | +30% |
| Return user rate | TBD | 60% | 75% |
| User satisfaction | TBD | 80% | 90% |

---

*Last updated: December 2024*

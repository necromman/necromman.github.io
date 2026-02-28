# Series 39: 코드가 마지막이다 (code-last-series)

> **시리즈 슬러그:** code-last-series
> **시리즈 번호:** Series 39
> **콘텐츠 유형:** 정보전달형 (prompt-driven-guide 적용)
> **기획일:** 2026-02-28
> **상태:** 기획 — 사용자 승인 대기

---

## 1. 시리즈 컨셉

### 핵심 질문
"AI가 코드를 쓰는 시대, 개발자의 진짜 무기는 뭔가?"

### 한 줄 정의
바이브 코딩을 넘어 에이전틱 엔지니어링으로 — SDD/DDD 방법론 비교부터 복붙 가능한 에이전트 설계 프롬프트까지.

### 대상 독자
- AI 코딩 도구를 쓰지만 큰 프로젝트에서 막히는 개발자
- 바이브 코딩으로 시작했는데 "이게 맞나?" 싶은 사람
- Claude Code / Cursor / Copilot으로 실전 워크플로우를 잡고 싶은 사람
- **"프롬프트 줘"** 하는 실전 지향 독자

### 톤
- 데이터 기반 분석 + 즉시 실행 가능한 프롬프트/템플릿
- "이론은 짧게, 프롬프트는 길게"
- 반대 의견도 인정 (바이브 코딩의 쓸모, SDD의 과설계 리스크)

### 차별화
- 기존 "바이브 코딩" 시리즈(Series 14): 개념 소개 중심
- 기존 "로봇 동료와 코딩하는 법" 시리즈(Series 8): AI 활용 팁 중심
- **이번 시리즈**: 방법론 + 워크플로우 + **복붙 프롬프트** 중심. 읽고 나면 바로 자기 프로젝트에 적용 가능.

---

## 2. 자료조사 요약

### 핵심 데이터 포인트
| 데이터 | 수치 | 출처 |
|--------|------|------|
| AI 코드 이슈 배율 | 인간 대비 1.7x | CodeRabbit 2025 |
| AI 코드 보안 결함률 | 45% | Veracode 2025 |
| XSS 취약점 배율 | 2.74x | Apiiro 2025 |
| 수동 리뷰 비율 | 개발자 75% | Stack Overflow 2025 |
| SDD 적용 시 생산성 | 5~8x 향상 | ThoughtWorks 2025 |
| AGENTS.md 채택 | 20,000+ repos | GitHub 2025 |
| LLM instruction 한계 | ~150-200개 | Anthropic 내부 |
| 3-Tier 프로젝트 사례 | 108K LoC, 70일, 283세션 | arXiv 2026 |

### 전문가 인용 (시리즈 전체에서 활용)
- **Andrej Karpathy**: "vibe coding" → "agentic engineering" 전환 선언
- **Addy Osmani**: "에이전트가 코드에서 알아낼 수 있으면 문서에서 삭제"
- **Boris Cherny** (Claude Code 창시자): 한 달간 PR 100% AI 작성
- **Simon Willison**: "설명 못 하는 코드는 커밋하지 않는다"
- **Martin Fowler**: Context Engineering for Coding Agents 분류 체계

---

## 3. 시리즈 구성 (5편)

### 전체 아크

```
01 WHY    — 왜 코드가 마지막이어야 하나 (패러다임 전환)
02 WHAT   — SDD vs DDD, 어떤 방법론이 맞나 (비교 + 판단 기준)
03 HOW-1  — 설계서가 곧 코드다 (CLAUDE.md + 폴더 구조 + 템플릿)
04 HOW-2  — 테스트가 진짜 코드다 (TDAID + 에이전트 워크플로우)
05 SCALE  — 100줄에서 10만줄까지 (스케일링 + 3-Tier 아키텍처)
```

---

### 01. 코드를 치기 전에 벌어지는 일 (`before-you-code.html`)

**역할**: 분석 — 패러다임 전환의 근거와 맥락
**태그**: 분석

**Part I — 바이브 코딩, 그 다음**
- 카파시의 vibe coding(2025.02) → agentic engineering(2026.02) 타임라인
- AI 코드 1.7x 이슈, 보안 결함 45% — "빠르게 만들수록 느리게 끝난다"
- Comprehension Debt(이해 부채): 생성 속도 > 이해 속도

**Part II — 코드 리뷰의 한계**
- 75%가 수동 리뷰 — 그런데 리뷰할 코드가 AI 속도로 불어남
- "코드 리뷰는 스케일하지 않는다" (CodeRabbit 데이터)
- 구성도: 기존 워크플로우 vs 에이전틱 워크플로우 비교

**Part III — 그래서 뭘 해야 하나**
- 개발자의 새 역할: 아키텍트 + 감독자 + 테스트 설계자
- 이 시리즈의 로드맵 (5편 요약)

**프롬프트 박스 (2개)**:
1. "내 프로젝트의 AI 코드 리스크를 진단하고 싶다면" — 프로젝트 진단 프롬프트
2. "바이브 코딩에서 에이전틱 엔지니어링으로 전환하고 싶다면" — 전환 로드맵 생성 프롬프트

---

### 02. SDD vs DDD — 어떤 방법론이 맞나 (`sdd-vs-ddd.html`)

**역할**: 비교 분석 — 방법론 선택 가이드
**태그**: 분석/가이드

**Part I — SDD (Spec-Driven Development)**
- 스펙이 소스 오브 트루스 — 3단계 엄격도 (Spec-First / Spec-Anchored / Spec-as-Source)
- 구성도: SDD 워크플로우 (Specify → Plan → Tasks → Implement → Verify)
- GitHub Spec Kit, BMAD Method, Kiro, Tessl 비교
- 적합 상황: 명확한 요구사항, 팀 프로젝트, 장기 유지보수

**Part II — DDD (Document-Driven Development)**
- 문서가 AI 에이전트의 행동을 지배 — CLAUDE.md = 프로젝트 헌법
- AGENTS.md: 20,000+ repos, Linux Foundation 거버넌스
- Martin Fowler의 5가지 컨텍스트 타입 (CLAUDE.md / Rules / Skills / Hooks / Subagents)
- 적합 상황: AI 에이전트 중심 개발, 유연한 요구사항, 개인/소규모 팀

**Part III — 판단 기준: 언제 뭘 쓰나**
- 비교표: SDD vs DDD (8가지 기준)
- 프로젝트 규모별 추천 (사이드 프로젝트 / 팀 프로젝트 / 엔터프라이즈)
- 혼합 전략: "DDD로 시작, SDD로 강화"
- 반대 의견: SDD의 과설계 리스크, DDD의 문서 부패 리스크

**프롬프트 박스 (4개)**:
1. "SDD 워크플로우를 내 프로젝트에 세팅하고 싶다면" — GitHub Spec Kit 초기 설정 프롬프트
2. "BMAD Method를 Claude Code에 적용하고 싶다면" — BMAD 설치 + 커스터마이징 프롬프트
3. "내 프로젝트에 맞는 방법론을 AI에게 진단받고 싶다면" — 방법론 진단 프롬프트
4. "DDD 스타일 AGENTS.md를 생성하고 싶다면" — AGENTS.md 자동 생성 프롬프트

---

### 03. 설계서가 곧 코드다 (`design-is-code.html`)

**역할**: 실전 가이드 — CLAUDE.md + 폴더 구조 + 에이전트 설계
**태그**: 가이드

**Part I — CLAUDE.md 해부학**
- 300줄 이하의 법칙 (Anthropic 공식 권장)
- 포함해야 할 것 vs 삭제해야 할 것 (Addy Osmani 원칙)
- `@path/to/import` 문법으로 문서 분리
- 실전 CLAUDE.md 구조 (커맨드 / 스타일 / 아키텍처 / 워크플로우)

**Part II — 폴더 아키텍처**
- `.claude/` 전체 구조: settings / agents / commands / skills / rules
- 각 폴더의 역할과 로딩 타이밍 (항상 / 스코프별 / 온디맨드 / 트리거)
- 구성도: 5가지 컨텍스트 타입과 로딩 우선순위

**Part III — 에이전트 설계**
- 서브에이전트 정의 포맷 (name / description / tools / model / prompt)
- 슬래시 커맨드 정의 포맷
- 스킬 정의 포맷
- 서브에이전트 라우팅 규칙 (병렬 / 순차 / 백그라운드)
- Agent Teams(Swarms): 3~5 팀원, 팀원당 5~6 태스크

**프롬프트 박스 (5개)** ★ 이 편의 핵심:
1. "내 프로젝트의 CLAUDE.md를 자동 생성하고 싶다면" — CLAUDE.md 생성 프롬프트
2. "폴더 구조를 자동 스캐폴딩하고 싶다면" — .claude/ 초기 세팅 프롬프트
3. "코드 리뷰 에이전트를 만들고 싶다면" — 서브에이전트 정의 프롬프트
4. "보안 검수 에이전트를 만들고 싶다면" — 보안 전문 서브에이전트 프롬프트
5. "슬래시 커맨드로 반복 작업을 자동화하고 싶다면" — 커맨드 정의 프롬프트

---

### 04. 테스트가 진짜 코드다 (`tests-are-real-code.html`)

**역할**: 실전 가이드 — TDAID + 에이전트 검증 워크플로우
**태그**: 가이드

**Part I — 왜 테스트가 코드보다 가치 있나**
- AI 코드의 실패 모드: 존재하지 않는 메서드 호출, 해피 패스만 통과
- 코드 리뷰 vs 테스트 — 스케일링 비교
- "테스트 = 에이전트를 신뢰 불가 → 신뢰 가능으로 전환하는 핵심"
- 구성도: 코드 리뷰 확장성 vs 테스트 확장성 비교

**Part II — TDAID (Test-Driven AI Development)**
- 5단계 사이클: Plan → Red → Green → Refactor → Validate
- ATDD 패턴: Given/When/Then → 테스트 생성 → Red → TDD → 뮤테이션 테스트
- 두 갈래 테스트: Acceptance(WHAT) + Unit(HOW)
- 구성도: TDAID 5단계 워크플로우

**Part III — 에이전트 검증 루프**
- Adversarial Review: 다른 모델로 교차 리뷰
- 셀프 리뷰 프롬프트 패턴 (구현 → 리뷰 → 수정 → 확인)
- Hooks로 자동 검증 트리거
- 구성도: 구현 → 테스트 → 리뷰 → 커밋 자동화 루프

**프롬프트 박스 (5개)** ★ 핵심:
1. "테스트를 먼저 쓰고 AI에게 구현을 맡기고 싶다면" — TDAID Red-Green 프롬프트
2. "Given/When/Then 스펙을 작성하고 싶다면" — ATDD 스펙 작성 프롬프트
3. "AI가 짠 코드를 AI로 교차 리뷰하고 싶다면" — Adversarial Review 프롬프트
4. "뮤테이션 테스트로 테스트 품질을 검증하고 싶다면" — 뮤테이션 테스트 프롬프트
5. "커밋 전 자동 검증 Hook을 만들고 싶다면" — Hook 설정 프롬프트

---

### 05. 100줄에서 10만줄까지 (`scaling-with-agents.html`)

**역할**: 전략 — 프로젝트 규모별 스케일링
**태그**: 전략

**Part I — 작은 프로젝트는 왜 문제 없는가**
- 컨텍스트 윈도우 안에 전부 들어감 → CLAUDE.md 하나면 충분
- 바이브 코딩도 유효한 구간: 프로토타입, 해커톤, 사이드 프로젝트
- "벽"의 정체: 코드베이스가 컨텍스트 윈도우를 초과하는 순간

**Part II — 3-Tier 컨텍스트 아키텍처**
- 108K LoC C# 프로젝트 실전 사례 (arXiv 2026)
- Hot Memory (항상 로딩, ~660줄): 코드 표준, 빌드, 오케스트레이션
- Domain Specialists (자동 호출, 각 ~711줄): 19개 전문 에이전트
- Cold Memory (온디맨드, 총 ~16,250줄): 34개 스펙 문서
- 구성도: 3-Tier 아키텍처 다이어그램
- 유지보수 비용: 주당 1~2시간

**Part III — 코드베이스 AI 최적화**
- 단일 진실 소스 원칙 (에이전트 처리 시간 40% 감소)
- 목적별 유틸리티 스크립트
- 엣지 케이스 명시
- 결과: 토큰 75% 감소, 순환 추론 80%+ 감소
- Agent Teams: 언제 Swarms를 써야 하는가

**프롬프트 박스 (4개)**:
1. "3-Tier 컨텍스트 아키텍처를 내 프로젝트에 구축하고 싶다면" — 아키텍처 설계 프롬프트
2. "기존 코드베이스를 AI-친화적으로 리팩토링하고 싶다면" — 코드베이스 최적화 프롬프트
3. "Agent Teams로 대규모 기능을 병렬 개발하고 싶다면" — Swarms 설정 프롬프트
4. "프로젝트 규모에 맞는 전체 설정을 한 번에 받고 싶다면" — 규모별 올인원 설정 프롬프트

---

## 4. 프롬프트 박스 총 요약

| 편 | 프롬프트 수 | 핵심 프롬프트 |
|----|-----------|-------------|
| 01 | 2개 | 프로젝트 리스크 진단, 전환 로드맵 |
| 02 | 4개 | SDD 세팅, BMAD 적용, 방법론 진단, AGENTS.md 생성 |
| 03 | 5개 | CLAUDE.md 생성, 폴더 스캐폴딩, 리뷰 에이전트, 보안 에이전트, 슬래시 커맨드 |
| 04 | 5개 | TDAID Red-Green, ATDD 스펙, 교차 리뷰, 뮤테이션 테스트, Hook 설정 |
| 05 | 4개 | 3-Tier 아키텍처, 코드베이스 최적화, Swarms, 규모별 올인원 |
| **합계** | **20개** | — |

**독자가 이 시리즈를 다 읽으면 가져가는 것**: 20개의 복붙 프롬프트 + 에이전트 설계 템플릿 + 프로젝트 규모별 설정 키트

---

## 5. 디자인 노트

- **prompt-driven-guide** 스킬 적용: 코드 없이 구성도 + 프롬프트
- 매 섹션: [개념 설명 2-3문단] → [CSS 다이어그램] → [비교표/판단 기준] → [프롬프트 박스]
- 프롬프트 3계층: 아키텍처 / 코드 / 검증
- CSS 컴포넌트: `.prompt-box`, `.dia-eq`, `.arch-layer`, `.step-flow`, `.stats-banner`
- 모든 프롬프트 박스에 자동 복사 버튼 포함

---

## 6. 제작 순서

- [x] Phase 0: 자료조사 (research.md)
- [x] Phase 1: 기획서 (series-plan.md)
- [ ] **사용자 승인** ← ★ 현재 위치
- [ ] Phase 2: 01편 집필
- [ ] Phase 3: 01편 검증 (Fact Checker + Editor)
- [ ] Phase 2-3: 02~05편 반복
- [ ] Phase 4: 배포 준비 (content-data.js, series-nav.js, sitemap.xml)

---

## 7. 참고 자료

### 핵심 출처
- ThoughtWorks: Spec-Driven Development (2025)
- GitHub Blog: Spec Kit 오픈소스 (2025.09)
- Anthropic: Claude Code Best Practices
- Anthropic: Effective Context Engineering for AI Agents
- Martin Fowler: Context Engineering for Coding Agents
- Addy Osmani: AI Coding Workflow, Claude Code Agent Teams
- arXiv (2602.20478): Codified Context — 108K LoC 사례
- CodeRabbit: AI Code Quality Data (2025)
- BMAD Method GitHub
- ATDD for Claude Code GitHub
- Veracode: GenAI Code Security Report (2025)
- Stack Overflow: 2025 Developer Survey

### 한국어 출처
- GeekNews: 2026년 LLM 코딩 워크플로우
- Brunch: AI 에이전트와 에이전틱 워크플로우
- PyTorch Korea: CS146S AI-native 개발 워크플로우 (스탠포드)

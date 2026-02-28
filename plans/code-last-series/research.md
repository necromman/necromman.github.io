# Research: SDD, DDD, Agentic Engineering, AI 코딩 시대의 개발 방법론

**조사일**: 2026-02-28
**조사 범위**: 2025~2026년 최신 트렌드
**관련 시리즈**: code-last-series (코드는 마지막이다)

---

## 1. SDD (Spec-Driven Development) — 스펙 주도 개발

### 1.1 정의와 핵심 개념

SDD는 **명세(specification)를 진실의 원천(source of truth)으로 두고, 코드를 명세에서 파생되는 이차 산출물로 취급하는 개발 패러다임**이다.

전통적 워크플로우: `요구사항 → 설계 → 수동 코딩 → 테스트`
SDD 워크플로우: `요구사항 → 상세 명세 → AI 생성 → 검증`

> "Spec-driven development may not have the visibility of a term like vibe coding, but it's nevertheless one of the most important practices to emerge in 2025."
> — [Thoughtworks (2025)](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices)

### 1.2 SDD의 3단계 엄격도 (학술 논문 기반)

| 레벨 | 이름 | 설명 |
|------|------|------|
| Level 1 | **Spec-First** | 명세로 시작하되, 이후 코드가 명세에서 벗어날 수 있음 |
| Level 2 | **Spec-Anchored** | 명세와 코드를 함께 유지, CI에서 정합성 자동 검사 |
| Level 3 | **Spec-as-Source** | 코드를 명세에서 100% 생성, 수동 편집 금지 |

출처: [arxiv.org/abs/2602.00180 — "Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants"](https://arxiv.org/abs/2602.00180)

### 1.3 핵심 효과 데이터

- **생산 속도**: 명세 단계를 거쳐도 time-to-production이 **5~8배 빠름** (Thoughtworks)
- **오류 감소**: 사람이 리파인한 명세 + AI 생성 시 **오류 최대 50% 감소** (arxiv 논문)
- **통합 시간**: 금융 서비스 사례에서 **통합 사이클 75% 단축** (arxiv 논문)
- **환각 감소**: 명확한 명세가 모델 환각(hallucination)을 줄이고 더 견고한 코드 산출

### 1.4 SDD 워크플로우 (실무 4단계)

```
1. Specify  — 스펙 생성 (PRD, 요구사항, 기술 제약)
2. Plan     — 기술 계획 수립 (아키텍처, 의존성, 단계)
3. Tasks    — 작업 분해 (작고 테스트 가능한 단위로)
4. Implement — 구현 + 검증 (AI 에이전트가 실행, 사람이 검토)
```

### 1.5 SDD 도구 생태계 (2025~2026)

| 도구 | 제작사 | 특징 |
|------|--------|------|
| **GitHub Spec Kit** | GitHub/Microsoft | 오픈소스, Specify CLI, `.specify/` 폴더 구조 |
| **BMAD Method** | 오픈소스 커뮤니티 | 21개 AI 에이전트, 50+ 워크플로우, 4단계 사이클 |
| **Kiro** | Amazon | 3단계(Requirements → Design → Tasks), steering 파일 자동 생성 |
| **Tessl** | 상용 | Martin Fowler 블로그에서 분석 |
| **OpenSpec** | 오픈소스 | 경량 SDD 프레임워크 |
| **PromptX** | 오픈소스 | 프롬프트 중심 SDD |

출처:
- [GitHub Spec Kit (GitHub Blog)](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
- [BMAD Method](http://docs.bmad-method.org/)
- [Martin Fowler - SDD Tools 비교](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- [SDD 프레임워크 비교 (redreamality)](https://redreamality.com/blog/-sddbmad-vs-spec-kit-vs-openspec-vs-promptx/)

### 1.6 SDD의 한계와 주의점

1. **과잉 명세(Over-specification)**: 지나치게 상세한 명세가 구현을 불필요하게 제약
2. **명세 부패(Specification rot)**: 코드 변경 시 명세를 업데이트하지 않으면 신뢰 상실
3. **프로세스 오버헤드**: 명세가 관료적 양식이 되면 생산성 저하
4. **거짓 자신감**: 명세 테스트를 통과해도, 명세 자체가 결함이면 소프트웨어도 결함

> "We can't rely on functional requirements alone: we need to pay attention to the technical details. Handcrafting detailed rules for AI ultimately doesn't scale."
> — [Thoughtworks (2025)](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices)

### 1.7 한국어 리소스

- [스펙 주도 개발(SDD) 심층 탐구 — 요즘IT](https://yozm.wishket.com/magazine/)
- [스펙 주도 개발이란? — 테크버킷](https://techbukket.com/blog/spec-driven-development)
- [AI 시대, '바이브 코딩'은 끝났다 — 유쌤의 IT 연구실](https://wikidocs.net/blog/@itlab/5203/)
- [SDD 학술 논문 — KCI (한국연구재단)](https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART003249956)
- [GeekNews — SDD 이해하기](https://news.hada.io/topic?id=23776)

---

## 2. DDD (Document-Driven Development) — 문서 주도 개발

### 2.1 전통적 DDD (Domain-Driven Design)과의 구별

| 개념 | Domain-Driven Design (전통) | Document-Driven Development (AI 시대) |
|------|---------------------------|--------------------------------------|
| **핵심** | 도메인 모델이 코드를 주도 | 문서(MD 파일)가 AI 에이전트를 주도 |
| **산출물** | 유비쿼터스 언어, 바운디드 컨텍스트 | CLAUDE.md, AGENTS.md, 아키텍처 문서 |
| **목적** | 비즈니스 복잡성 관리 | AI 에이전트의 행동 제어 |
| **등장 시기** | Eric Evans, 2003 | 2024~2025 AI 도구 확산과 함께 |

### 2.2 CLAUDE.md — AI 에이전트의 프로젝트 헌법

**정의**: Claude Code가 모든 세션 시작 시 읽는 마크다운 파일. 프로젝트의 규칙, 패턴, 워크플로우를 정의.

**핵심 원칙** (HumanLayer 블로그):
- LLM은 무상태(stateless): "CLAUDE.md is the only file that by default goes into every single conversation you have with the agent"
- **WHAT/WHY/HOW 프레임워크**: 프로젝트 기술 스택(WHAT), 목적(WHY), 개발 워크플로우(HOW)
- **명령 한계**: 프론티어 LLM이 안정적으로 따를 수 있는 지시는 약 **150~200개** (Claude Code 시스템 프롬프트가 이미 ~50개 차지)

**작성 모범 사례**:

| 하지 말 것 | 할 것 |
|-----------|------|
| /init 자동 생성으로 파일 생성 | 수동으로 신중하게 작성 |
| 스타일 가이드 상세 기술 | 린터(Biome 등)에 위임 |
| 300줄 이상의 거대 파일 | 60줄 미만, 포인터로 외부 참조 |
| 코드 스니펫 복사 | `file:line` 참조로 최신 상태 유지 |
| 모든 지시를 한 파일에 | 계층적 CLAUDE.md (루트 + 서브폴더) |

**추천 폴더 구조** (Addy Osmani):
```
agent_docs/
  ├── building_the_project.md
  ├── running_tests.md
  ├── code_conventions.md
  ├── service_architecture.md
  ├── database_schema.md
  └── service_communication_patterns.md
```

출처:
- [Writing a good CLAUDE.md — HumanLayer](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- [Using CLAUDE.MD files — Anthropic](https://claude.com/blog/using-claude-md-files)
- [Stop Using /init for AGENTS.md — Addy Osmani](https://addyosmani.com/blog/agents-md/)

### 2.3 AGENTS.md — AI 코딩 에이전트의 오픈 표준

**정의**: AI 코딩 에이전트를 위한 기계 판독 가능 매니페스트. "README for agents."

**역사**:
- 2025년 중반, Sourcegraph/OpenAI/Google/Cursor 등의 협업으로 탄생
- 현재 Linux Foundation 산하 Agentic AI Foundation에서 관리
- GitHub 20,000개 이상의 리포지토리에서 채택

**지원 도구**: Claude Code, Cursor, GitHub Copilot, Gemini CLI, Windsurf, Aider, Zed, Warp, RooCode 등 20개 이상

**AGENTS.md에 넣어야 할 것** (Addy Osmani):
- 에이전트가 코드를 읽어서는 발견할 수 없는 비직관적 정보만
  - 예: "Use `uv` for package management"
  - 예: "Always run tests with `--no-cache` or you'll get false positives"
  - 예: 삭제하면 안 되는 레거시 디렉터리 경고(지뢰)

**AGENTS.md에 넣지 말 것**:
- 코드베이스 개요 (에이전트가 디렉터리 탐색으로 발견 가능)
- 기술 스택 요약 (설정 파일에서 확인 가능)
- 모듈 설명 (코드 검사로 파악 가능)

> "Can the agent discover this on its own by reading the code? If yes, delete it."
> — [Addy Osmani](https://addyosmani.com/blog/agents-md/)

출처:
- [AGENTS.md 공식 사이트](https://agents.md/)
- [AGENTS.md GitHub 리포](https://github.com/agentsmd/agents.md)
- [AGENTS.md Emerges as Open Standard — InfoQ](https://www.infoq.com/news/2025/08/agents-md/)
- [A Complete Guide to AGENTS.md — AI Hero](https://www.aihero.dev/a-complete-guide-to-agents-md)

### 2.4 README-Driven Development의 부활

- Tom Preston-Werner(GitHub 공동창업자)가 2010년 제안한 개념이 AI 시대에 재조명
- **핵심**: 코드를 쓰기 전에 README(사용자 문서)를 먼저 작성
- **AI 시대 확장**: README가 단순히 개발자 가이드가 아니라 AI 에이전트의 직접 입력으로 기능
- **AI 우선 개발 패턴**: 모든 서비스에 README.md 배치, ADR(Architecture Decision Record)로 의사결정 문서화, 코드 주석으로 의도적 설계 표시

출처: [Markdown Driven Development — DEV Community](https://dev.to/simbo1905/augmented-intelligence-ai-coding-using-markdown-driven-development-pg5)

---

## 3. Agentic Engineering — 에이전틱 엔지니어링

### 3.1 용어의 기원

**Andrej Karpathy** (OpenAI 공동창업자):
- 2025.02.02: "vibe coding" 용어를 만듦 — "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes"
- 2026.02.04: "agentic engineering" 용어 제안 — "personally my current favourite 'agentic engineering'"
- 핵심 주장: "you are not writing the code directly 99% of the time… you are orchestrating agents who do and acting as oversight"

> "We have shifted from vibes to discipline. This isn't just a rebrand; it marks the maturation of the industry from weekend hacking to professional system orchestration."
> — 각종 기술 매체 요약

출처:
- [Karpathy on X — 1년 회고](https://x.com/karpathy/status/2019137879310836075)
- [Benzinga — Karpathy Says Agentic Engineering](https://www.benzinga.com/news/topics/26/02/50862150/the-man-who-coined-vibe-coding-says-the-next-big-thing-is-agentic-engineering)
- [Glide Blog — What is Agentic Engineering](https://www.glideapps.com/blog/what-is-agentic-engineering)

### 3.2 바이브 코딩 vs. 에이전틱 엔지니어링 비교

| 측면 | Vibe Coding (2025) | Agentic Engineering (2026) |
|------|-------------------|--------------------------|
| **접근법** | 자유형, 프롬프트 주도 | 구조적, 목표 주도 |
| **사람 역할** | 협업자 (프롬프트, 수정) | 아키텍트, 감독관 (규칙 설정, 모니터링) |
| **감독** | 최소 리뷰, 검증 없는 출력 | 품질 게이트, 자동화 테스트, 감사 추적 |
| **리스크** | 보안 취약점, 기술 부채 | 검증 레이어로 완화 |
| **팀 포커스** | 개인 생산성 | 조직적 시스템 |
| **코드 이해** | 코드 존재 자체를 잊음 | 아키텍처와 품질을 소유 |

### 3.3 Addy Osmani의 에이전틱 엔지니어링 4원칙

1. **계획으로 시작 (Start with a plan)**: 프롬프트 전에 설계 문서/명세 작성, 작업을 잘 정의된 태스크로 분해
2. **지시 후 리뷰 (Direct, then review)**: 스코프가 명확한 태스크를 AI에 할당, 사람이 코드 리뷰와 동일한 엄격함으로 검토
3. **끊임없이 테스트 (Test relentlessly)**: **이것이 가장 큰 차별점**. 견고한 테스트 스위트가 자신 있는 반복을 가능하게 함
4. **코드베이스를 소유 (Own the codebase)**: 문서화, 버전 관리, CI/CD, 프로덕션 모니터링 유지

> "Agentic engineering = AI does the implementation, human owns the architecture, quality, and correctness."
> — [Addy Osmani](https://addyosmani.com/blog/agentic-engineering/)

### 3.4 "테스트 코드가 프로덕션 코드보다 가치 있다" — 근거

#### 논거 1: 테스트가 AI 에이전트의 지침이 된다
- "When code is written by agents instead of humans, tests become the guide — the stable reference point that gives the agent a sense of direction." (Awesome Testing)
- 에이전트가 테스트를 통과할 때까지 반복 → 객관적 성공 기준이 주관적 판단을 대체

#### 논거 2: AI 생성 코드의 품질 문제
- AI 생성 코드는 사람 코드 대비 **1.7배 더 많은 이슈**를 포함 (CodeRabbit)
- 논리/정확성 오류 **1.75배**, 유지보수성 오류 **1.64배**, 보안 문제 **1.57배**, 성능 문제 **1.42배**
- 45%의 AI 생성 코드에 보안 결함 존재

출처: [CodeRabbit — AI vs Human Code Generation Report](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report)

#### 논거 3: 코드 리뷰가 스케일하지 않는다
- AI가 코드 생성 속도를 높이지만, **사람의 리뷰는 선형 확장 불가**
- AI 작성 코드는 사람이 직접 쓴 코드보다 **인지적으로 리뷰하기 더 어려움**
- 2025년: AI가 속도의 해 → 코드 리뷰가 병목
- 2026년: AI 품질의 해 → 멀티 에이전트 검증 워크플로우 부상

출처: [CodeRabbit — 2025 Speed, 2026 Quality](https://www.coderabbit.ai/blog/2025-was-the-year-of-ai-speed-2026-will-be-the-year-of-ai-quality)

#### 논거 4: 프로덕션 코드는 재생성 가능, 테스트 코드는 의도를 담는다
- 프로덕션 코드: AI가 명세에서 재생성 가능 (일회용)
- 테스트 코드: 비즈니스 의도, 엣지 케이스, 안전 조건을 인코딩 → **인간의 의도가 담긴 영구 산출물**
- SDD에서 명세 + 테스트가 "코드보다 오래 사는 산출물"

#### 논거 5: Comprehension Debt (이해력 부채)
- 에이전트가 코드를 생성하는 속도가 사람이 이해하는 속도보다 빠름
- 처음 80%는 쉬우나, 나머지 20% (통합, 미묘한 버그, 성능 튜닝)에 깊은 이해 필요
- **80% 문제**: AI가 80%를 빠르게 생성하지만, 나머지 20%에서 기존보다 더 많은 시간 소요

출처: [Addy Osmani — The 80% Problem in Agentic Coding](https://addyo.substack.com/p/the-80-problem-in-agentic-coding)

### 3.5 코드 리뷰의 한계 (AI 생성 코드)

| 문제 | 설명 |
|------|------|
| **인지 부하 증가** | AI 코드는 컨텍스트 없이 생성되므로, 리뷰어가 의도를 추론해야 함 |
| **디프 크기 폭증** | AI가 한 번에 수백 줄 생성 → 기존 리뷰 프로세스 과부하 |
| **자신감 편향** | "AI가 만들었으니 맞겠지" → 리뷰 느슨해짐 |
| **보안 사각지대** | XSS 2.74배, 안전하지 않은 역직렬화 1.82배, 부적절한 비밀번호 처리 1.88배 |
| **75% 수동 리뷰** | 개발자 75%가 AI 코드를 병합 전 수동 검토 (하지만 형식적으로) |

출처:
- [CodeRabbit — AI Code Report](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report)
- [The Register — AI-authored code needs more attention](https://www.theregister.com/2025/12/17/ai_code_bugs)
- [NetCorp — AI-Generated Code Statistics 2026](https://www.netcorpsoftwaredevelopment.com/blog/ai-generated-code-statistics)

### 3.6 에이전트 오케스트레이션 워크플로우 설계

**4기둥 프로덕션 프레임워크** (DEV Community):

1. **명세로 시작 (Specifications Over Vagueness)**: 수용 기준, 경계 조건, 명시적 비목표(non-goals) 포함
2. **테스트 우선 방어 (Test-Driven Defense)**: 테스트를 먼저 쓰고, 정확성 확인, 에이전트가 통과할 때까지 구현
3. **원자적 분해 (Atomic Decomposition)**: 태스크를 3~5개 파일만 건드리는 단위로 분해, 사람이 리뷰 가능한 디프
4. **신선한 컨텍스트 리뷰 (Fresh-Context Review)**: 별도 세션에서 자기 코드 리뷰 → "이전 실수를 두 배로 하는" 것 방지

**멀티 에이전트 검증** (CodeRabbit 2026 전망):
- 하나가 쓰고, 다른 하나가 비평하고, 다른 하나가 테스트하고, 다른 하나가 컴플라이언스 검증
- 단일 에이전트 생성 → 계층적 검증 시스템으로 진화

출처:
- [DEV Community — From Vibe Coding to Agentic Engineering](https://dev.to/jasonguo/from-vibe-coding-to-agentic-engineering-when-coding-becomes-orchestrating-agents-1b0n)
- [Addy Osmani — Future of Agentic Coding: Conductors to Orchestrators](https://addyosmani.com/blog/future-agentic-coding/)

### 3.7 위임하면 안 되는 영역

절대 AI 에이전트에 위임하지 말 것:
- 보안 핵심 로직 (결제 처리, 인증)
- 컴플라이언스 민감 데이터 (PII 처리)
- 인프라 코드 (Terraform 설정)

### 3.8 한국 맥락

- **앤트로픽 AI 해커톤**: 2026년 2월, 비개발자가 석권 → 바이브 코딩 시대의 개막
- **에이전틱 AI 원년**: SK텔레콤 모든 사업 영역에 AI 적용 선언 (2026)
- **CIO 칼럼**: "에이전틱 AI 시대에 맞춘 DX 전략 개편 필요"

출처:
- [전자신문 — 앤트로픽 해커톤 비개발자 석권](https://www.etnews.com/20260225000247)
- [CIO — 에이전틱 AI 시대 DX 전략](https://www.cio.com/article/3979647/)
- [Raylogue — 에이전틱 AI 원년, 한국 기업](https://www.raylogue.com/agentic-ai-korea-2026/)

---

## 4. Claude Code 실무 패턴

### 4.1 CLAUDE.md 작성 모범 사례

**핵심 통계**: 프론티어 LLM이 안정적으로 따르는 지시 수 = **약 150~200개**

**추천 구조**:
```markdown
# Project Name

## 빌드 & 실행
- `npm run build` / `npm test` / `npm run dev`

## 아키텍처
- [서비스 구조 → agent_docs/architecture.md]
- [DB 스키마 → agent_docs/database.md]

## 코드 규칙
- [규칙 파일 → agent_docs/conventions.md]

## 테스트
- [테스트 가이드 → agent_docs/testing.md]

## 주의사항 (지뢰)
- /legacy/ 폴더 삭제 금지 (런타임 참조)
- 테스트 시 --no-cache 필수
```

**원칙**:
1. **60줄 미만**으로 유지 (HumanLayer 실제 사례)
2. **에이전트가 발견할 수 없는 것만** 기록 (코드로 알 수 있는 것은 빼기)
3. **포인터 > 복사**: 코드 스니펫보다 `file:line` 참조
4. **계층적**: 루트 CLAUDE.md + 서브폴더별 CLAUDE.md
5. **살아있는 문서**: 에이전트가 반복적으로 실패하면, CLAUDE.md보다 코드베이스 자체를 개선

출처:
- [HumanLayer — Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- [Anthropic — Best Practices for Claude Code](https://code.claude.com/docs/en/best-practices)
- [Claude Blog — Using CLAUDE.MD files](https://claude.com/blog/using-claude-md-files)

### 4.2 에이전트 주도 개발의 폴더 구조

**Claude Code 커스텀 서브에이전트 구조**:
```
.claude/
  ├── agents/         # 커스텀 서브에이전트 정의
  ├── commands/        # 슬래시 커맨드 (재사용 가능한 프롬프트)
  ├── skills/          # 도메인별 스킬 (SKILL.md)
  ├── rules/           # 프로젝트 규칙 (.md)
  └── settings.json    # 권한, 허용 도구 설정

plans/
  └── [feature-slug]/  # 기능별 설계 문서
      ├── research.md
      ├── spec.md
      └── plan.md

agent_docs/             # AI가 참조할 상세 문서
  ├── architecture.md
  ├── testing.md
  └── conventions.md
```

**서브에이전트 유형**:
- **Explore**: 파일 탐색, 코드 검색, 코드베이스 이해에 최적화
- **Plan**: 읽기 전용 모드, 설계와 분석에 집중
- **General-purpose**: 복잡한 리서치, 다단계 작업, 코드 수정
- **Custom**: 도메인별 전문 에이전트 (데이터, 문서, 분석 등)

**2026년 1월 발견**: Claude Code에 "Swarms" 멀티에이전트 오케스트레이션 기능이 기능 플래그 뒤에 숨어 있었음

출처:
- [Claude Code Docs — Create custom subagents](https://code.claude.com/docs/en/sub-agents)
- [Claude Code Agent Teams — Complete Guide 2026](https://claudefa.st/blog/guide/agents/agent-teams)
- [eesel.ai — Claude Code Sub-agent Guide](https://www.eesel.ai/blog/claude-code-sub-agent)

### 4.3 규칙/지시 구조화 패턴

**Cursor 규칙 시스템** (참고):
- `.cursorrules` 파일 → 2025년부터 deprecated
- 현재: `.cursor/rules/` 폴더의 개별 `.mdc` 파일로 이동
- **일관성 65% 향상, 컨텍스트 전환 40% 감소** (개발자 설문)

**교훈**: 단일 거대 파일보다 **모듈화된 규칙 파일**이 더 효과적
- 태스크 유형에 따라 관련 규칙만 로드
- 오래된 지시는 토큰을 낭비하고 성능을 저하

출처:
- [Cursor Docs — Rules](https://cursor.com/docs/context/rules)
- [cursorrules.org — Mastering Cursor Rules](https://cursorrules.org/blog/mastering-cursor-rules-developer-blueprint-context-aware-ai)

### 4.4 소규모 → 대규모 프로젝트 확장

**소규모** (개인 프로젝트):
- 루트 CLAUDE.md 하나면 충분
- 슬래시 커맨드로 반복 작업 자동화
- 인터뷰 패턴: "먼저 질문하고, 확인 후 코딩"

**중규모** (팀 프로젝트):
- 계층적 CLAUDE.md (루트 + 서브폴더)
- agent_docs/ 폴더로 상세 문서 분리
- CI/CD에 AI 코드 품질 체크 통합

**대규모** (엔터프라이즈):
- AGENTS.md 표준 채택 (크로스 도구 호환)
- 멀티 에이전트 오케스트레이션 (Swarms)
- AI 거버넌스 정책 수립 (사용 범위, 문서화 요구, 리뷰 기준)
- 서드파티 검증 도구 도입

출처:
- [My 7 Essential Claude Code Best Practices — eesel.ai](https://www.eesel.ai/blog/claude-code-best-practices)
- [Claude Code Best Practices — sidetool.co](https://www.sidetool.co/post/claude-code-best-practices-tips-power-users-2025/)

---

## 5. 실전 프레임워크

### 5.1 TDAID — Test-Driven AI Development

**전통 TDD** `Red → Green → Refactor`를 AI용으로 확장:

```
Plan → Red → Green → Refactor → Validate
  ↑                                  |
  └──────────── 반복 ────────────────┘
```

**각 단계**:
1. **Plan**: AI에게 구조화된 구현 계획 생성 요청 (Red/Green/Refactor 체크포인트 포함)
2. **Red**: 원하는 동작을 표현하는 실패 테스트 작성
3. **Green**: 테스트를 통과하는 최소 코드 구현 (최적화 금지)
4. **Refactor**: 테스트 통과 유지하면서 정리
5. **Validate**: 사람이 의도적으로 확인 (이것이 AI 개발의 병목)

**핵심 가이드라인**:
- 각 TDD 페이즈 후 로컬 커밋 (되돌리기 가능)
- AI가 과도한 코드 생성 시 → 리버트, 더 작은 스코프로 재시작
- 하나의 거대 변경보다 여러 작은 TDD 루프
- 테스트가 "옳은 이유로" 실패하는지 수동 확인

> "Tests give us a reliable exit criteria. Agents iterate until previously failed tests pass—objective success criteria replace subjective agent judgment."
> — [Awesome Testing — TDAID](https://www.awesome-testing.com/2025/10/test-driven-ai-development-tdaid)

### 5.2 BMAD Method — Breakthrough Method for Agile AI-Driven Development

**4단계 사이클**:
```
Analysis → Planning → Solutioning → Implementation
```

1. **Analysis**: 문제를 1페이지 PRD로 정리
2. **Planning**: 수용 기준이 있는 사용자 스토리로 분해
3. **Solutioning**: 아키텍트가 최소 설계, 개발자가 구현 단계 제안
4. **Implementation**: 작은 스토리 단위로 반복, 명확한 기준으로 검증

**특징**:
- 21개 특화 AI 에이전트 (전체 애자일 팀 시뮬레이션)
- 50+ 가이드 워크플로우
- 프로젝트 규모에 따른 지능적 적응
- 적대적 리뷰(adversarial review) 내장
- 100% 무료 오픈소스

출처: [BMAD Method GitHub](https://github.com/bmad-code-org/BMAD-METHOD)

### 5.3 GitHub Spec Kit

**구조**:
```
project/
  ├── .github/          # 에이전트 프롬프트
  └── .specify/
      ├── specs/        # 명세 문서
      ├── plans/        # 기술 계획
      ├── tasks/        # 분해된 태스크
      └── scripts/      # 헬퍼 스크립트
```

**CLI**: `specify` 명령으로 3단계 실행
1. Specify → 스펙 생성
2. Plan → 기술 계획
3. Tasks → 태스크 분해

**핵심 철학**: "Product Requirements Document isn't a guide for implementation; it's the source that generates implementation."

출처: [GitHub Blog — Spec-driven development with AI](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)

### 5.4 Addy Osmani의 좋은 스펙 작성법

**6가지 필수 영역**:
```markdown
# Project Spec: [프로젝트명]

## 목표 (Objective)
[명확한 사용자 중심 목표]

## 기술 스택 (Tech Stack)
React 18+, TypeScript, Vite, Tailwind CSS...

## 명령어 (Commands)
- Build: `npm run build`
- Test: `npm test`

## 프로젝트 구조
- `src/` for code, `tests/` for tests

## Git 워크플로우
- 브랜치 네이밍, 커밋 포맷, PR 요구사항

## 경계 (Boundaries)
✅ 항상: 커밋 전 테스트 실행
⚠️ 먼저 물어볼 것: DB 스키마 변경
🚫 절대 금지: 시크릿 커밋
```

**핵심 실수 회피**:
- "뭔가 멋진 거 만들어줘" → 앵커 포인트 없음
- 거대한 명세 → "지시의 저주" — 모델이 요구사항에 압도되면 성능 저하
- AI가 생성한 코드를 리뷰 없이 수용
- 제약 조건 없으면 에이전트가 안전하지 않은 결정

출처: [Addy Osmani — How to write a good spec for AI agents](https://addyosmani.com/blog/good-spec/)

### 5.5 프롬프트 & 템플릿 패턴

**인터뷰 패턴** (Claude Code):
```
"이 기능을 구현하기 전에, 먼저 질문해줘.
기술적 구현, UI/UX, 엣지 케이스, 트레이드오프에 대해 물어봐.
내가 확인하기 전까지 코드를 작성하지 마."
```

**Plan Mode 패턴**:
```
"계획부터 세워줘. 코드를 작성하지 마.
1. 무엇을 변경할 것인지
2. 어떤 파일을 건드릴 것인지
3. 어떤 테스트가 필요한지
내가 '진행'이라고 할 때까지 기다려."
```

**Atomic Task 패턴**:
```
"이 기능을 3~5개 파일만 건드리는 작은 태스크로 분해해줘.
각 태스크는:
- 독립적으로 테스트 가능
- 하나의 커밋으로 완결
- 디프가 사람이 리뷰할 수 있는 크기"
```

---

## 6. 반론 & 대립 관점

### 6.1 "SDD는 과잉 엔지니어링이다"
- **주장**: 프로토타입, 해커톤, MVP에서는 명세 작성이 오히려 속도를 늦춘다
- **반론**: SDD 옹호자도 "작은 프로젝트는 가볍게" 인정. 핵심은 규모에 따른 적응
- **Thoughtworks**: "handcrafting detailed rules for AI ultimately doesn't scale" — 지나치게 상세한 명세도 문제

### 6.2 "테스트가 프로덕션보다 중요하다는 건 과장이다"
- **주장**: 테스트 자체가 잘못되면 잘못된 자신감을 줄 뿐. 테스트도 AI가 생성하면 같은 문제
- **반론**: 테스트의 "의도"는 사람이 정의하고, 구현만 AI가 할 때 가장 효과적. 테스트 의도까지 AI에 맡기면 위험
- **절충**: "테스트 의도는 사람이, 테스트 코드는 AI가"

### 6.3 "에이전틱 엔지니어링은 시니어만의 특권이다"
- **Addy Osmani 경고**: "agentic engineering disproportionately benefits experienced engineers"
- **위험**: 주니어가 프롬프트부터 시작하면 시스템 설계, 보안, 성능의 기초 역량 위축
- **대안**: 주니어는 AI 없이 기초를 먼저 다지고, 그 다음 AI를 도구로 활용

### 6.4 "바이브 코딩도 가치 있다"
- **Karpathy 원래 의도**: "shower of thoughts throwaway tweet" — 바이브 코딩은 탐색/실험에 적합
- **적합한 상황**: 프로토타이핑, 학습, 아이디어 검증, 1회성 스크립트
- **부적합**: 프로덕션 코드, 팀 프로젝트, 장기 유지보수 시스템

### 6.5 "AI 코드 품질 문제는 도구가 해결할 것이다"
- **낙관론**: AI 모델 성능이 빠르게 개선 → 2026년 말이면 품질 문제 대부분 해소
- **현실**: CodeRabbit 보고서에 따르면 아직 1.7배 이슈가 더 많고, 보안 문제는 오히려 심화
- **Pragmatic Engineer**: "2025 was the year of AI speed. 2026 will be the year of AI quality." — 아직 진행 중

---

## 7. 타임라인 정리

| 시기 | 이벤트 |
|------|--------|
| 2025.02 | Karpathy "vibe coding" 용어 탄생 |
| 2025 상반기 | AI 코딩 도구 대중화 (Cursor, Claude Code, Copilot) |
| 2025.08 | AGENTS.md 오픈 표준 등장 (Sourcegraph + OpenAI + Google + Cursor) |
| 2025.09 | GitHub Spec Kit 공개 |
| 2025.11~12 | Opus 4.5, GPT-5.2, Gemini 3 출시 → 티핑 포인트 |
| 2025.12 | Boris Cherny: Claude Code 기여 100% AI 작성 |
| 2025.12 | Tenzai: AI 코딩 앱 15개 보안 감사 → 69개 취약점 발견 |
| 2026.01 | Pragmatic Engineer: "AI가 거의 모든 코드를 쓸 때" 분석 |
| 2026.01 | Claude Code Swarms 멀티에이전트 기능 발견 |
| 2026.02.04 | Karpathy "agentic engineering" 용어 제안 |
| 2026.02 | Cursor Cloud Agents 출시 (자율 코딩 에이전트) |
| 2026.02 | Thoughtworks Tech Radar에 SDD 등재 |
| 2026.02 | GLM-5 논문: "From Vibe Coding to Agentic Engineering" |

---

## 8. 핵심 인용구 모음

> "Spec-driven development inverts the traditional workflow by treating specifications as the source of truth and code as a generated or verified secondary artifact."
> — [Thoughtworks](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices)

> "You are not writing the code directly 99% of the time… you are orchestrating agents who do and acting as oversight."
> — [Andrej Karpathy, 2026.02](https://x.com/karpathy/status/2019137879310836075)

> "The engineers thriving in 2026 aren't just using better tools but have reconceptualized their role from implementer to orchestrator."
> — [Addy Osmani](https://addyo.substack.com/p/the-80-problem-in-agentic-coding)

> "Can the agent discover this on its own by reading the code? If yes, delete it."
> — [Addy Osmani, on AGENTS.md](https://addyosmani.com/blog/agents-md/)

> "AI code has 1.7x more issues and bugs in it compared to human-written alternatives."
> — [CodeRabbit](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report)

> "Tests give us a reliable exit criteria. Agents iterate until previously failed tests pass."
> — [Awesome Testing, TDAID](https://www.awesome-testing.com/2025/10/test-driven-ai-development-tdaid)

> "CLAUDE.md is the only file that by default goes into every single conversation you have with the agent."
> — [HumanLayer](https://www.humanlayer.dev/blog/writing-a-good-claude-md)

> "Prototyping expertise diminishes when non-technical people can build apps independently."
> — [Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/when-ai-writes-almost-all-code-what)

> "Handcrafting detailed rules for AI ultimately doesn't scale."
> — [Thoughtworks](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices)

---

## 9. 출처 종합

### 영문 핵심 출처
1. [Thoughtworks — Spec-Driven Development (2025)](https://www.thoughtworks.com/en-us/insights/blog/agile-engineering-practices/spec-driven-development-unpacking-2025-new-engineering-practices)
2. [arxiv — SDD: From Code to Contract (2026.02)](https://arxiv.org/abs/2602.00180)
3. [Addy Osmani — Agentic Engineering](https://addyosmani.com/blog/agentic-engineering/)
4. [Addy Osmani — The 80% Problem](https://addyo.substack.com/p/the-80-problem-in-agentic-coding)
5. [Addy Osmani — How to write a good spec](https://addyosmani.com/blog/good-spec/)
6. [Addy Osmani — Stop Using /init for AGENTS.md](https://addyosmani.com/blog/agents-md/)
7. [Addy Osmani — Future of Agentic Coding](https://addyosmani.com/blog/future-agentic-coding/)
8. [Addy Osmani — My LLM Coding Workflow 2026](https://addyosmani.com/blog/ai-coding-workflow/)
9. [HumanLayer — Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
10. [AGENTS.md Official](https://agents.md/)
11. [GitHub Blog — Spec Kit](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
12. [BMAD Method](https://github.com/bmad-code-org/BMAD-METHOD)
13. [Glide Blog — What is Agentic Engineering](https://www.glideapps.com/blog/what-is-agentic-engineering)
14. [Pragmatic Engineer — When AI Writes All Code](https://newsletter.pragmaticengineer.com/p/when-ai-writes-almost-all-code-what)
15. [CodeRabbit — AI vs Human Code Report](https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report)
16. [CodeRabbit — 2025 Speed, 2026 Quality](https://www.coderabbit.ai/blog/2025-was-the-year-of-ai-speed-2026-will-be-the-year-of-ai-quality)
17. [Awesome Testing — TDAID](https://www.awesome-testing.com/2025/10/test-driven-ai-development-tdaid)
18. [DEV Community — Vibe Coding to Agentic Engineering](https://dev.to/jasonguo/from-vibe-coding-to-agentic-engineering-when-coding-becomes-orchestrating-agents-1b0n)
19. [Martin Fowler — SDD Tools](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
20. [InfoQ — Spec Driven Development](https://www.infoq.com/articles/spec-driven-development/)
21. [Claude Code Docs — Sub-agents](https://code.claude.com/docs/en/sub-agents)
22. [Claude Code Docs — Best Practices](https://code.claude.com/docs/en/best-practices)
23. [The Register — AI-authored code bugs](https://www.theregister.com/2025/12/17/ai_code_bugs)
24. [Karpathy on X (2026.02)](https://x.com/karpathy/status/2019137879310836075)
25. [Benzinga — Karpathy Agentic Engineering](https://www.benzinga.com/news/topics/26/02/50862150/the-man-who-coined-vibe-coding-says-the-next-big-thing-is-agentic-engineering)
26. [Microsoft Learn — Spec Kit Training](https://learn.microsoft.com/en-us/training/modules/spec-driven-development-github-spec-kit-enterprise-developers/)
27. [Agent Factory — SDD with Claude Code](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/spec-driven-development)
28. [SDD Frameworks Comparison](https://redreamality.com/blog/-sddbmad-vs-spec-kit-vs-openspec-vs-promptx/)
29. [The New Stack — Vibe Coding to Agentic Engineering](https://thenewstack.io/vibe-coding-agentic-engineering/)
30. [Cursor Docs — Rules](https://cursor.com/docs/context/rules)

### 한국어 출처
31. [요즘IT — 스펙 주도 개발(SDD) 심층 탐구](https://yozm.wishket.com/magazine/)
32. [테크버킷 — 스펙 주도 개발이란?](https://techbukket.com/blog/spec-driven-development)
33. [유쌤의 IT 연구실 — 바이브 코딩은 끝났다](https://wikidocs.net/blog/@itlab/5203/)
34. [KCI — AI와 Vibe Coding SDD 논문](https://www.kci.go.kr/kciportal/landing/article.kci?arti_id=ART003249956)
35. [GeekNews — SDD 이해하기](https://news.hada.io/topic?id=23776)
36. [전자신문 — 앤트로픽 해커톤](https://www.etnews.com/20260225000247)
37. [CIO — 에이전틱 AI DX 전략](https://www.cio.com/article/3979647/)
38. [Raylogue — 에이전틱 AI 원년](https://www.raylogue.com/agentic-ai-korea-2026/)
39. [데이터넷 — 바이브 코딩의 함정, SDD로 해결](https://www.datanet.co.kr/news/articleView.html?idxno=205454)
40. [나무위키 — 바이브 코딩](https://namu.wiki/w/%EB%B0%94%EC%9D%B4%EB%B8%8C%20%EC%BD%94%EB%94%A9)

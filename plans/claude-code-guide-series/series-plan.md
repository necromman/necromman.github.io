# 시리즈 기획서: 컨텍스트는 우유다

> **시리즈 슬러그:** `claude-code-guide-series`
> **시리즈 번호:** Series 21
> **기획일:** 2026-02-12
> **상태:** 완료
> **원본 출처:** [ykdojo/claude-code-tips](https://github.com/ykdojo/claude-code-tips) (45개 팁)

## 1. 시리즈 컨셉

### 핵심 질문
Claude Code를 쓰고 있지만, 정말 제대로 쓰고 있는가? 45개 팁 중 실전에서 가장 큰 차이를 만드는 것들만 추려서, "왜"까지 설명하는 실전 가이드.

### 타겟 독자
- Claude Code를 이미 쓰고 있거나 쓸 예정인 개발자
- AI 코딩 도구에 관심 있는 한국 개발자 (시니어/주니어 모두)
- 바이브 코딩 시리즈를 읽고 Claude Code에 흥미가 생긴 독자
- 월 $20~$200 구독을 고려 중인 실무자

### 시리즈 톤
- 실전 위주. "이론보다 키보드 위의 손가락"
- 원본 45개 팁을 단순 번역/나열하지 않고, 한국 개발 환경에 맞게 재구성
- 각 팁에 "왜 이게 중요한가"와 "바로 적용하는 법"을 함께 제시
- ykdojo 원본에 대한 크레딧을 명시하되, 독립적인 에디토리얼 콘텐츠로 재창작

### 원본 45개 팁 큐레이션

**채택 (25개):** 실전 영향력이 높고, 즉시 적용 가능한 팁
| 편 | 채택 팁 |
|----|---------|
| 1편 | Tip 0 (상태 표시줄), Tip 1 (슬래시 커맨드), Tip 7 (별칭), Tip 6 (터미널 출력), Tip 38 (입력 편집) |
| 2편 | Tip 5 (컨텍스트=우유), Tip 8 (수동 압축), Tip 3 (문제 분해), Tip 15 (시스템 프롬프트 경량화), Tip 25 (CLAUDE.md vs Skills), Tip 30 (CLAUDE.md 정리) |
| 3편 | Tip 9 (자율 실행 루프), Tip 34 (TDD), Tip 4 (Git/GitHub CLI), Tip 16 (Git worktrees), Tip 26 (PR 리뷰), Tip 39 (계획 vs 프로토타입) |
| 4편 | Tip 21 (컨테이너), Tip 27 (리서치 도구), Tip 29 (DevOps), Tip 36 (백그라운드 서브에이전트), Tip 14 (터미널 탭 멀티태스킹), Tip 40 (복잡한 코드 단순화) |
| 5편 | Tip 37 (개인화 소프트웨어), Tip 41 (메타 자동화), Tip 35 (반복적 문제해결), Tip 12 (워크플로우 투자), Tip 31 (유니버설 인터페이스), Tip 32 (추상화 레벨) |

**제외 (20개):** 플랫폼 한정(Mac 전용), 지나치게 기초적, 또는 한국 독자에게 맥락이 약한 팁
- Tip 2 (음성 입력 — Mac 전용), Tip 10 (Cmd+A — 트릭 수준), Tip 11 (Gemini CLI 폴백 — 니치), Tip 13 (대화 검색 — 기초), Tip 17 (지수 백오프 — 니치), Tip 18 (글쓰기 보조 — 주제 벗어남), Tip 19 (마크다운 — 기초), Tip 20 (Notion 링크 — 니치), Tip 22 (연습 — 당연한 말), Tip 23/23a/23b/23c (대화 복제 — 고급 니치), Tip 24 (realpath — 사소), Tip 28 (검증 방법 — 9편에 흡수), Tip 33 (승인 커맨드 감사 — 보안 니치), Tip 42/43 (지식 공유/학습 — 일반론), Tip 44/45 (플러그인/설정 스크립트 — 특정 도구)

## 2. 자료조사 요약

### Claude Code 시장 현황 (2026년 2월 기준)
- **Claude Code $1B ARR**: 출시 6개월 만에 연간 $10억 매출 달성. ChatGPT도 이 속도는 못 냄 (Medium, AI CERTs)
- **Anthropic 전체 ARR $9B** (2025년 말), 2026년 $20-26B 전망 (Sacra)
- **Claude 월간 사용자 1,890만 명** (2025년 Q3), 모바일 앱 5,000만 다운로드
- **개발자 AI 도구 사용률 85%** (JetBrains 2025)

### 경쟁 도구 비교
- **Front-Runners**: Cursor, Claude Code, Codex, GitHub Copilot, Cline (Faros AI)
- **Claude Code 강점**: "가장 강력한 코딩 두뇌" — 복잡한 추론 작업에서 우위 (Reddit 개발자 커뮤니티)
- **Gemini CLI 강점**: 무료 티어, 100만 토큰 컨텍스트, 멀티모달 (이미지/PDF 지원)
- **Cursor 강점**: IDE 통합, Diff 워크플로우, 직관적 UX

### 한국 개발자 커뮤니티 피드백 (GeekNews)
- "Python, Ruby, TypeScript 50M+ 토큰 프로젝트에 투입" — 대규모 실전 사례
- "Sonnet은 속도, Opus는 복잡한 버그" — 모델 선택 전략이 핵심
- "압축 대신 새 채팅 + Scratchpad" — 컨텍스트 관리가 가장 중요한 스킬
- "작업 특성에 따라 생산성 1.5~10배 변동" — 도구보다 사용법이 관건

### 핵심 인사이트
1. **컨텍스트 관리가 #1 스킬**: 대부분의 고급 사용자가 "컨텍스트가 길어지면 성능이 떨어진다"고 증언
2. **테스트가 자율성의 열쇠**: 검증 수단을 제공하면 Claude가 자율적으로 작업 가능
3. **CLAUDE.md가 곧 아키텍처**: 시스템 프롬프트 설계가 코딩 실력만큼 중요
4. **도구가 아니라 워크플로우**: 같은 도구도 워크플로우에 따라 10배 차이

## 3. 시리즈 구성 (5편)

### 1편: 처음 30분
- **슬러그**: `the-first-thirty-minutes`
- **역할/태그**: 입문 / 설정
- **핵심**: 설치 직후 반드시 해야 할 설정과 필수 커맨드. "그냥 쓰는 것"과 "세팅하고 쓰는 것"의 차이
- **Part 구성**:
  - Part I "터미널을 열었다": Claude Code가 뭔지, 왜 $1B 매출을 찍었는지. IDE 기반 도구(Cursor, Copilot)와의 근본적 차이
  - Part II "상태 표시줄을 바꿔라" (Tip 0): 커스텀 상태 표시줄로 모델, 브랜치, 토큰 사용량을 한눈에. 10가지 컬러 테마
  - Part III "외워야 할 5가지" (Tip 1): `/usage` (레이트 리밋), `/clear` (새 시작), `/compact` (압축), `/mcp`, `/stats`. 각각이 왜 중요한지
  - Part IV "별칭이 만드는 3초의 차이" (Tip 7): `c`, `ch`, `co` 등 터미널 별칭 설정. `-c` 플래그로 원라이너 실행
  - Part V "터미널 밖으로 꺼내는 법" (Tip 6): `/copy`, 파일 쓰기, VS Code 연동. 결과물을 활용하는 실전 방법

### 2편: 컨텍스트는 우유다
- **슬러그**: `context-is-milk`
- **역할/태그**: 핵심 원리 / 컨텍스트 관리
- **핵심**: Claude Code를 잘 쓰는 것의 80%는 컨텍스트 관리다. 시리즈의 심장부
- **Part 구성**:
  - Part I "유통기한이 있는 자원" (Tip 5): 컨텍스트가 길어지면 왜 성능이 떨어지는가. 200K 토큰 제한의 실체. "신선하고 응축된" 컨텍스트의 원칙
  - Part II "수동 압축의 기술" (Tip 8): 자동 압축 끄기, HANDOFF.md 파일로 진행 상황 넘기기, /compact vs 새 대화 시작의 판단 기준
  - Part III "큰 문제를 잘게 쪼개라" (Tip 3): 소프트웨어 엔지니어링의 기본 원칙이 AI에도 적용됨. 점진적 분해 전략
  - Part IV "시스템 프롬프트 다이어트" (Tip 15): 안 쓰는 기능 비활성화, MCP 도구 레이지 로딩, 토큰 50% 절감 사례
  - Part V "CLAUDE.md라는 아키텍처" (Tip 25, 30): CLAUDE.md, Skills, Slash Commands, Plugins의 차이. 간결하게 유지하고 주기적으로 리뷰하는 법

### 3편: 자율 주행 모드
- **슬러그**: `autonomous-mode`
- **역할/태그**: 실전 워크플로우 / 자동화
- **핵심**: 테스트와 검증 수단을 제공하면 Claude는 자율적으로 작업한다. "감독"에서 "위임"으로
- **Part 구성**:
  - Part I "검증이 자율을 만든다" (Tip 9): 자율 실행의 핵심 — tmux로 인터랙티브 테스트, git bisect, Playwright로 검증 루프 구축
  - Part II "테스트를 먼저 쓴다" (Tip 34): TDD와 Claude Code의 궁합. Claude가 포괄적 테스트 스위트를 만들게 하고, 그 테스트가 자율 작업의 가드레일이 됨
  - Part III "Git을 프로처럼" (Tip 4): Git 조작과 GitHub CLI를 Claude에게 위임. 드래프트 PR로 안전하게. GraphQL 쿼리로 고급 작업
  - Part IV "두 개의 브랜치를 동시에" (Tip 16): Git worktree로 브랜치 전환 없이 병렬 작업. Claude Code 멀티 인스턴스와의 조합
  - Part V "계획과 프로토타입 사이" (Tip 39, 26): /plan 모드로 설계, 빠른 프로토타이핑으로 검증, PR 리뷰로 품질 확보. 세 단계의 균형

### 4편: 터미널 밖으로
- **슬러그**: `beyond-the-terminal`
- **역할/태그**: 확장 활용 / 멀티태스킹
- **핵심**: Claude Code는 코드만 짜는 도구가 아니다. DevOps, 리서치, 리팩토링, 병렬 작업까지
- **Part 구성**:
  - Part I "컨테이너 안의 Claude" (Tip 21): 위험한 작업을 컨테이너에서 격리 실행. Docker 안에서 Claude Code 인스턴스를 띄우는 패턴
  - Part II "리서치 에이전트" (Tip 27): 코딩 전 조사, 기술 문서 분석, 지식 종합. Claude Code를 리서치 도구로 쓰는 워크플로우
  - Part III "DevOps 엔지니어" (Tip 29): 인프라 자동화, 배포 스크립트, 시스템 관리. 소프트웨어 개발과 동일한 원칙 적용
  - Part IV "백그라운드에서 돌려라" (Tip 36, 14): 서브에이전트 백그라운드 실행, 터미널 탭 멀티태스킹. 블로킹 없이 병렬 진행
  - Part V "복잡함을 줄여라" (Tip 40): 과도하게 복잡해진 코드를 Claude에게 리팩토링 요청. 읽기 쉬운 코드가 유지보수 가능한 코드

### 5편: 나만의 도구를 만든다
- **슬러그**: `build-your-own-tools`
- **역할/태그**: 철학 / 미래
- **핵심**: Claude Code의 진정한 가치는 "나만의 워크플로우"를 만들 수 있다는 것. 도구의 도구
- **Part 구성**:
  - Part I "개인화 소프트웨어의 시대" (Tip 37): 표준화를 넘어 개인 최적화로. Claude Code를 자신의 워크플로우에 맞추는 것이 핵심
  - Part II "자동화의 자동화" (Tip 41): 반복적인 자동화 작업 자체를 자동화. 메타-자동화의 복리 효과
  - Part III "유니버설 인터페이스" (Tip 31, 32): Claude를 모든 기술 작업의 단일 진입점으로. 추상화 레벨을 상황에 맞게 조절하는 판단력
  - Part IV "미지의 영역에서 더 대담하게" (Tip 35): 익숙하지 않은 문제에 반복적으로 도전. Claude가 탐색을 잘 처리함. 점진적 이해
  - Part V "워크플로우에 투자하라" (Tip 12): 지금 30분 투자가 앞으로 300시간을 절약. 커스터마이징의 복리 효과. 시리즈 마무리

## 4. 디자인 노트

### 시리즈 고유 컴포넌트
- **팁 카드** (`.tip-card`): 원본 팁 번호 + 한줄 요약 + "바로 적용" 코드/명령어를 담는 카드. 각 팁을 시각적으로 구분
- **터미널 블록** (`.terminal-block`): 실제 터미널 입출력을 보여주는 코드 블록. 프롬프트($) + 출력 + 주석
- **비교 테이블** (`.compare-table`): Before/After, 도구 비교 등을 위한 2컬럼 테이블
- **통계 카드** (`.stat-card`): $1B, 85%, 10배 등 핵심 숫자를 강조하는 인포 블록
- **워크플로우 다이어그램** (`.workflow`): 텍스트 기반 워크플로우 흐름도 (ASCII art 스타일)
- 기존 `.pull-quote`, `.warning-box`, `.mechanism-row`, `.prose` 재사용

### editorial-base.css 확장 필요사항
- 특별한 확장 불필요. 페이지 고유 `<style>`로 처리

## 5. 제작 순서

- [x] 자료조사 (원본 45개 팁 분석, 시장 데이터, 한국 커뮤니티 피드백)
- [x] 기획서 작성
- [ ] 1편 HTML 작성 (`the-first-thirty-minutes.html`)
- [ ] 2편 HTML 작성 (`context-is-milk.html`)
- [ ] 3편 HTML 작성 (`autonomous-mode.html`)
- [ ] 4편 HTML 작성 (`beyond-the-terminal.html`)
- [ ] 5편 HTML 작성 (`build-your-own-tools.html`)
- [ ] `assets/content-data.js` 업데이트
- [ ] `assets/series-nav.js` SERIES 데이터 추가
- [ ] `content/index.md` 업데이트
- [ ] `sitemap.xml` URL 추가
- [ ] `CLAUDE.md` 시리즈 정보 추가
- [ ] `npx eleventy` 빌드 확인

## 6. 참고 자료 (출처)

### 원본
- [ykdojo/claude-code-tips](https://github.com/ykdojo/claude-code-tips) — 45 Claude Code Tips: From Basics to Advanced

### 시장 데이터
- [Claude Code Hits $1B Revenue](https://medium.com/@toolmesh/claude-code-hits-1b-revenue-developer-uses-ai-for-100-code-1e1de3149ec8) — Claude Code $1B ARR (Medium/Toolmesh)
- [Anthropic Revenue & Valuation](https://sacra.com/c/anthropic/) — Anthropic ARR $9B, 2026 전망 $20-26B (Sacra)
- [Claude Statistics 2026](https://backlinko.com/claude-users) — Claude 1,890만 사용자, 5,000만 앱 다운로드 (Backlinko)
- [Best AI Coding Agents 2026](https://www.faros.ai/blog/best-ai-coding-agents-2026) — 개발자 AI 도구 사용률 85% (Faros AI / JetBrains)

### 경쟁 분석
- [Claude Code vs Gemini CLI](https://shipyard.build/blog/claude-code-vs-gemini-cli/) — Shipyard 비교 분석
- [Claude Code vs Codex vs Gemini](https://www.educative.io/blog/claude-code-vs-codex-vs-gemini-code-assist) — Educative 2026 리뷰

### 한국 커뮤니티
- [Claude Code 2주 사용 후기](https://news.hada.io/topic?id=22053) — GeekNews 한국 개발자 리뷰
- [Claude Code가 왜 그렇게 좋은가](https://news.hada.io/topic?id=22696) — GeekNews 아키텍처 분석

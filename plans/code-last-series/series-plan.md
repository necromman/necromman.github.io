# Series 29: 코드는 마지막이다 (code-last-series)

**상태**: 기획 완료 / 1편 작성 중
**생성일**: 2026-02-15

## 시리즈 컨셉

### 핵심 질문
"바이브 코딩에서 왜 빠르게 시작할수록 느리게 끝나는가?"

### 대상 독자
- AI 코딩 도구를 사용하는 개발자 (주니어~시니어)
- 바이브 코딩을 시작했지만 생산성이 기대만큼 안 나오는 사람
- 코드를 먼저 치는 습관에서 벗어나고 싶은 사람

### 톤
데이터 기반 분석 + 실전 가이드. 개인 경험이 아닌 연구/통계로 논증.
"내 생각이 틀릴 수 있다"는 전제 하에, 반례(프로토타입, 해커톤 등)도 인정.

## 리서치 요약

### 핵심 데이터
| 데이터 | 수치 | 출처 |
|--------|------|------|
| AI 코드 보안 결함률 | 45% | Veracode 2025 |
| Fortune 50 취약점 증가 | 10x (6개월) | Apiiro 2025 |
| AI 코드 디버깅 추가 시간 | 70% 개발자 보고 | Harness 2025 |
| "거의 맞지만 틀린" 좌절 | 66% | Stack Overflow 2025 |
| AI 도구 채택률 vs 신뢰도 | 84% vs 29% | Stack Overflow 2025 |
| 워킹 메모리 한계 | 3-4 chunks | Cowan 2001 |
| 컨텍스트 전환 회복 시간 | 23분 15초 | Gloria Mark, UCI |
| 자기 중단 비율 | 49% | Gloria Mark |
| Tenzai 보안 테스트 결과 | 15앱, 69취약점 | Tenzai 2025.12 |

### 전문가 인용
- **Andrej Karpathy**: vibe coding(2025.02) → agentic engineering(2026.02) 전환
- **Simon Willison**: "설명 못 하는 코드는 커밋하지 않는다" 황금률
- **Kent Beck**: "Make it work, make it right, make it fast"
- **Martin Fowler**: 기술 부채 4분면 — Reckless/Inadvertent가 최악
- **Tenzai**: "보안 통제를 시도조차 하지 않았다"

### 인지과학
- 워킹 메모리(Cowan 2001): 순수 용량 3-4개
- Zeigarnik 효과: 미완성 → 인지 부담, 계획 수립 → 해소
- 인지 부하 이론(Sweller 1988): 내재적/외재적/생성적 부하
- Gloria Mark: 평균 집중 47초, 자기 중단 49%

## 시리즈 구성 (3편)

### 01. 결과물이 없는 시간 (`time-without-output.html`)
- **역할**: 분석 — 속도의 역설, 인지과학, 5단계 워크플로우
- **태그**: 분석/가이드
- **구성**:
  - Part I: 속도의 함정 — 바이브 코딩 실패 데이터
  - Part II: 뇌가 감당 못 한다 — 인지과학 근거
  - Part III: 코드 없는 첫 3시간 — 5단계 워크플로우 + 프롬프트
- **프롬프트 박스**: 5개 (생각 정리, 자료 수집, PRD 작성, 맥락 주입, 개발)

### 02. PRD가 반이다 (`prd-is-half.html`)
- **역할**: 가이드 — 문서 작성, 맥락 설계, 규칙 파일
- **태그**: 가이드
- **구성**:
  - Part I: PRD의 구조 — 사용자 스토리, 아키텍처, 제외 범위
  - Part II: CLAUDE.md / .cursorrules 설계 — AI가 읽는 문서
  - Part III: 맥락의 유통기한 — 컨텍스트 윈도우와 문서 관리
- **프롬프트 박스**: 4개 (PRD 템플릿, 규칙 파일, 사용자 스토리, 아키텍처)

### 03. 한 번에 완성한다 (`build-in-one-shot.html`)
- **역할**: 실전 — 맥락 주입 개발, 디테일링, Before/After
- **태그**: 실전
- **구성**:
  - Part I: 개발 시작 조건 — 언제 코드를 쳐도 되는가
  - Part II: Before/After — 같은 프로젝트, 다른 접근
  - Part III: 디테일링 — 코드 리뷰, 테스트, 리팩토링 프롬프트
- **프롬프트 박스**: 4개 (기능 구현, 셀프 리뷰, 테스트, 리팩토링)

## 디자인 노트
- prompt-driven-guide 스킬 적용 (코드 대신 프롬프트 제공)
- 커스텀 컴포넌트: stat-grid, workflow-diagram, comparison, prompt-box
- 참조 문서: `mcp-agent-guide-series/agent-is-three-configs.html`

## 참조
- Veracode, GenAI Code Security Report, 2025
- Apiiro, 4x Velocity 10x Vulnerabilities, 2025
- Tenzai, Bad Vibes — AI Coding Agent Security, 2025.12
- Stack Overflow, 2025 Developer Survey
- Harness, State of Code Assistants, 2025
- Cowan, The Magical Mystery Four, 2001
- Gloria Mark, Attention Span, 2023
- Zeigarnik, Das Behalten erledigter und unerledigter Handlungen, 1927
- Simon Willison, Not All AI-Assisted Programming Is Vibe Coding, 2025
- Kent Beck, Make It Work Make It Right Make It Fast
- Martin Fowler, Technical Debt Quadrant, 2009
- Andrej Karpathy, @karpathy, 2025-2026

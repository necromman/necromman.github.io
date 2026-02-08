# 시리즈 기획서: 디자이너 없이 제품 만들기

> **시리즈 슬러그:** `vibe-design-series`
> **시리즈 번호:** Series 08
> **기획일:** 2026-02-09
> **상태:** 기획 완료 → 콘텐츠 제작 대기

---

## 1. 시리즈 컨셉

### 핵심 질문
> "바이브 코딩으로 기능은 만들었다. 그런데 왜 다 같은 보라색 그라디언트인가?"

바이브 코딩의 최대 병목은 코드가 아니라 **디자인**이다. AI가 만든 앱은 기능적으로 작동하지만, 디자인은 일관성이 없고, "AI가 만든 티"가 역력하다. 이 시리즈는 디자이너 없이도 프로덕션급 디자인을 달성하는 구체적 방법론을 다룬다.

### 타겟 독자
- 바이브 코딩으로 사이드 프로젝트/MVP를 만들고 있는 개발자 및 비개발자
- "기능은 되는데 디자인이 구린" 단계에서 막혀 있는 1인 메이커
- AI 도구를 쓰지만 산출물이 "AI스럽다"는 피드백을 받는 사람

### 시리즈 톤
- 바이브 코딩 시리즈(Series 04)의 연장선. 실용적이고 직설적
- 디자인 이론이 아닌 "당장 따라할 수 있는 워크플로우" 중심
- Before/After 비교, 실제 도구 스크린샷, 체크리스트 형태의 실전 콘텐츠

---

## 2. 자료조사 요약

### 2-1. "AI스러운 디자인"의 정체

**보라색 그라디언트 증후군 — 기원과 메커니즘**
- 2025년 8월, Tailwind 창시자 Adam Wathan이 "5년 전 Tailwind UI의 모든 버튼에 `bg-indigo-500`을 적용한 것에 대해 사과한다"고 발언. 이것이 AI가 보라색을 기본으로 찍는 근본 원인
- AI가 생성하는 UI의 공통 패턴: Inter/Roboto 폰트, 보라/인디고 액센트 + 흰 배경, 3열 카드 그리드, 미세한 그림자와 둥근 모서리, 소극적이고 균일한 색상 배분
- **자기 강화 순환(Self-Reinforcing Cycle)**: AI가 보라색 사이트를 생성 → 웹에 게시 → 새 모델의 훈련 데이터에 포함 → 보라색 편향 강화
- "LLM은 디자이너가 아니라 통계적 패턴 매칭기다. 'landing page를 만들어줘'라고 하면, 2019~2024년 GitHub에서 수집된 모든 Tailwind CSS 튜토리얼의 중앙값을 돌려받는 것이다"
- "모든 AI 생성 사이트에는 무균질적인(sterile) 품질이 있다. 기술적으로 맞는 말을 다 하지만 진짜 대화는 해본 적 없는 사람을 만난 느낌이다"
- 출처: prg.sh, Medium (kai.ni), dev.to, deeplearning.fr, Hacker News, Reddit r/webdev (2025)

**정량 데이터**
| 지표 | 수치 | 출처 |
|------|------|------|
| 바이브 코딩 검색량 증가 | 6,700% (2025 봄) | Second Talent |
| AI 코딩 도구 사용/계획 개발자 | 84% | Stack Overflow 2025 |
| AI 코드 디버깅 > 직접 작성 시간 | 45% | Stack Overflow 2025 |
| AI 도구 신뢰하지 않는 개발자 (사용하면서도) | 46% | Stack Overflow 2025 |
| 전문 업무에서 바이브 코딩 미사용 | 72% | Stack Overflow 2025 |
| AI 코드 churn rate 증가 | +41% | Stack Overflow 2025 |
| 글로벌 AI 생성 코드 비율 | 41% (2,560억 줄) | Netcorp 2024 |
| METR 연구: AI 도구 사용 시 생산성 변화 | -19% (인식: +20%, 괴리 39%p) | METR 2025.07 |
| 바이브 코딩 글로벌 시장 규모 (2025) | 47억 달러 (2027 예측: 123억, CAGR 38%) | Market Clarity |
| AI 생성 코드 보안 결함 비율 | ~45% | Georgetown CSET |
| 비개발자 바이브 코딩 사용자 비율 | 63% | Second Talent 2026 |
| Gartner 예측: 2026년 신규 코드 AI 생성 비율 | 60% | Gartner |
| Lovable 보안 노출 앱 수 | 170개 (303 엔드포인트) | Superblocks/CVE-2025-48757 |

**전문가 의견**
- Adam Wathan (Tailwind CSS 창시자): bg-indigo-500이 모든 AI 디자인의 보라색 편향 기원
- Addy Osmani (Google Chrome 엔지니어링 리드): "AI는 시각적으로 그럴듯한 UI를 빠르게 만들지만, 의미 있는 사용자 경험을 만드는 것과는 별개의 문제"
- Jeremy Howard (fast.ai 창립자): "다크 플로우(Dark Flow)" — 슬롯머신의 "Loss Disguised as a Win"과 동일. 69%의 개발자가 속도 저하를 측정적으로 경험했음에도 AI 도구를 계속 사용

### 2-2. 디자인 시스템의 민주화

**shadcn/ui 혁명**
- GitHub Stars: 106,000+ / NPM 주간 다운로드: 560,000+
- 핵심 혁신: "라이브러리 소비자"에서 "코드 소유자"로 패러다임 전환
- copy-paste 방식이라 AI 코드 생성과 최적 궁합
- v0.dev가 shadcn 컴포넌트를 기본 생성 → SaaS 스타터킷의 사실상 표준
- 출처: SaaSIndie, DevKit.best (2025)

**Tailwind CSS의 역할**
- "Tailwind의 가장 큰 기여는 유틸리티 클래스가 아니라 개발자가 디자인에 다시 관심을 갖게 만든 것"
- LLM이 Tailwind 코드를 다른 어떤 스타일링 방식보다 잘 생성함
- Tailwind v4: `@theme` 디렉티브로 CSS 네이티브 디자인 토큰 정의 가능. JS 설정 파일 불필요
- 출처: Magic Patterns, ititans.com (2025)

**W3C Design Tokens 표준 (2025년 10월)**
- 첫 번째 안정 버전(stable version) 공개
- 벤더 중립적 포맷으로 도구/플랫폼 간 디자인 결정 공유 표준화
- "디자인 결정의 단일 진실 소스(single source of truth)"
- 출처: W3C Design Tokens Community Group (2025.10.28)

### 2-3. AI 규칙 파일의 진화

**타임라인**
1. `.cursorrules` (2023-2024): Cursor가 선도. 프로젝트별 AI 지시사항 단일 파일
2. `.cursor/rules/*.mdc` (2025): YAML frontmatter + XML 태그로 구조화
3. `AGENTS.md` (2025): OpenAI, Google, Anthropic, Cursor, Sourcegraph 합의. 60,000+ 프로젝트 채택
4. `CLAUDE.md` (Anthropic): Claude Code 전용. "CLAUDE.md를 만들되, AGENTS.md를 참조하게 하라"가 현재 권장 패턴

**디자인 규칙 주입 방법**
- AGENTS.md/CLAUDE.md에 디자인 토큰, 컴포넌트 규칙, 코드 컨벤션을 마크다운으로 기술
- 모든 LLM API 호출 시 자동 포함되어 일관된 코드 생성
- 출처: agents.md 공식, Arize AI (2025)

### 2-4. 스크린샷 → 코드 워크플로우 & 참조 디자인 기반 접근

**screenshot-to-code** (GitHub Stars: 71,400+)
- 스크린샷을 HTML/Tailwind/React/Vue 코드로 변환
- Claude 3 Sonnet 정확도: 70.31% / GPT-4 Vision: 65.10%

**PageAI Starter Kit — 현재 가장 효과적인 워크플로우**
1. 디자인 목업 이미지 1장 준비 (Dribbble, 자체 디자인, 와이어프레임 스크린샷)
2. 상세 디자인 브리프 작성 — 타이포그래피, 색상, 간격, 톤 등 구체적 지시
3. 스타터 킷 + 규칙 파일 — Cursor rules가 내장된 코드베이스 위에 구축
4. Playwright MCP로 자동 스크린샷 — 모바일 뷰, 다크 모드 등 자동 검증 후 브리프와 일치할 때까지 반복
- "스크린샷 + 모호한 지시 = AI가 추측 (보라색 UI). 좋은 입력(디자인 + 브리프) + 견고한 기반(스타터 킷) + 규칙 = 1-shot 프로덕션 수준"
- 출처: PageAI (pageai.pro), GitHub PageAI-Pro/vibe-coding-starter

**Figma MCP Server (2025-2026)**
- MCP로 Figma 파일의 구조화된 콘텐츠를 AI 에이전트에 노출
- 렌더링된 픽셀 대신 실제 노드 트리, 변형 정보, 레이아웃 제약, 디자인 토큰 전달
- 적절한 워크플로우 갖춘 팀에서 **초기 개발 시간 50-70% 단축**
- Figma가 제안하는 새 패러다임: MCP 서버가 코드베이스를 스캔 → 디자인 규칙 파일 자동 생성 → AI 에이전트의 시스템 레벨 가이드로 작동
- 출처: Builder.io, AIMultiple Research, Figma Blog (2025-2026)

**Storybook MCP (2025-2026)**
- AI 에이전트에게 팀의 프론트엔드 패턴을 기계 가독 가능한 컨텍스트로 제공
- 200개 컴포넌트 디자인 시스템 기준 **100시간 이상 개발 시간 절약**, 컴포넌트당 30~45분 절약
- 출처: Storybook 공식, Codrops, UXPin (2025)

### 2-5. 1인 메이커 성공 사례

| 메이커 | 제품 | 월 수익 | 디자인 전략 |
|--------|------|---------|-------------|
| Pieter Levels | Nomad List, PhotoAI | $250,000+ | "의도적으로 못생기게 시작". 기능 우선, 점진적 개선 |
| Marc Lou | ShipFast 외 11+ | $124,772 | Tailwind 기반 보일러플레이트. 디자인을 템플릿화 |
| Tony Dinh | TypingMind, DevUtils | $83,000 | "직관적 레이아웃과 기능적 명확성". 인터페이스 유료화 |

**공통 패턴**: 디자인 퀄리티보다 문제 해결이 수익을 만든다. 그러나 "최소한의 일관성"은 반드시 필요.

### 2-6. 한국 맥락

**한글 타이포그래피의 특수성**
- 한글은 자모 조합 구조상 영문보다 글자 폭이 넓고, line-height/letter-spacing이 다르게 작동
- AI가 영문 기준으로 생성한 타이포그래피는 한글에서 답답하거나 과도하게 퍼짐
- Pretendard Variable이 한국 개발자 사이에서 사실상 표준 한글 UI 폰트로 자리잡음

**한국 디자이너의 AI 체험기**
- TOKTOKHAN.DEV 디자이너 (Cursor 활용): "핵심 기능은 문제없이 작동했으나, 디자이너의 눈에는 부족한 점과 추가하고 싶은 디테일이 너무나도 많았다". Inter → Pretendard 폰트 전환, 반응형 패딩/뱃지 간격 등 수동 수정 필요. 결론: "AI의 발전은 무기력보다는 가능성에 가깝다"
- pxd 디자이너: "바이브 코딩의 특성은 한 번의 명령으로 완벽한 결과를 얻는 것이 아니라, 반복 대화를 통한 점진적 정교화". 상세 지시도 오해받아 여러 번 반복 필요
- 한국 시장의 디자인 기대치: 네이버/카카오/토스 수준의 모바일 UX를 기본으로 기대
- 출처: blog.toktokhan.dev, story.pxd.co.kr

**한국 바이브 코딩 커뮤니티**
- 바이브 코딩 코리아 (vibecoding.ai-c.kr): AI Korea 개발자 성장 커뮤니티
- vibecode.kr: AI 창작자를 위한 바이브 코딩 커뮤니티
- 팝업스튜디오: UKF 2026 서밋에서 바이브 코딩 실시간 개발 시연

### 2-7. 프로덕션 디자인 QA

**비주얼 리그레션 테스팅**
| 도구 | 전문 분야 | 특징 |
|------|----------|------|
| Chromatic | 컴포넌트 단위 (Storybook) | 3줄 코드로 시작, PR 라이브 프리뷰 |
| Percy | 전체 페이지 | OCR 텍스트 시프트 감지, 실제 디바이스 지원 |

**접근성(a11y) 한계**
- 자동화 도구가 감지할 수 있는 WCAG 이슈: 전체의 30-50%에 불과
- AI 생성 alt 텍스트: "공원의 개"는 맞추지만 "안내견"이라는 맥락을 놓침
- 인간 검수가 반드시 필요한 영역

---

## 3. 시리즈 구성 (5편)

### 1편: 보라색 그라디언트 증후군

> **슬러그:** `purple-gradient-syndrome`
> **역할:** 문제 진단
> **태그:** 분석

**핵심 주장**: 바이브 코딩의 진짜 병목은 코드가 아니라 디자인이다. AI가 만드는 UI는 왜 다 비슷하고, 왜 "AI가 만든 티"가 나는가.

**Part 구성:**

Part 1 — "bg-indigo-500의 원죄"
- 2025년 8월 Adam Wathan (Tailwind 창시자)의 공개 사과: "5년 전 모든 데모 버튼에 bg-indigo-500을 쓴 것이 이 모든 보라색의 시작"
- AI UI의 공통 패턴: Inter/Roboto 폰트, 보라/인디고 액센트, 3열 카드 그리드, 균일한 색상 배분
- 자기 강화 순환: AI가 보라색 사이트 생성 → 웹에 게시 → 훈련 데이터 재흡수 → 편향 강화
- "LLM은 디자이너가 아니라 통계적 패턴 매칭기. 'landing page를 만들어줘'는 2019~2024 Tailwind 튜토리얼의 중앙값을 돌려받는 것"
- 핵심 데이터: 바이브 코딩 검색량 6,700% 증가, 시장 규모 47억 달러, 전문 업무 미사용 72%

Part 2 — "디자인이 무너지는 메커니즘"
- Jeremy Howard의 "다크 플로우(Dark Flow)": 슬롯머신의 "Loss Disguised as a Win"과 동일 메커니즘. 실제 비생산적이면서 생산성의 환상을 줌
- METR 연구: AI 도구 사용 시 -19% 생산성, 그러나 본인 인식은 +20% (괴리 39%p). 69%가 속도 저하를 경험하면서도 계속 사용
- 세션이 길어질수록 AI가 이전 맥락을 잃고 디자인 드리프트 발생
- "무균질적(sterile) 품질 — 기술적으로 맞는 말을 다 하지만 진짜 대화는 해본 적 없는 사람을 만난 느낌"
- 실패 사례: Cursor로 손코딩 0%로 만든 SaaS → 보안 침해 → 영구 서비스 종료
- Lovable CVE-2025-48757: 170개 앱, 303개 엔드포인트에서 개인정보 노출

Part 3 — "AI스러운 디자인 체크리스트"
- 자가 진단: 내 프로젝트에 이 증상이 있는가?
  - 보라색/파랑 그라디언트 헤더
  - 의미 없는 카드 그리드
  - 폰트 3개 이상 혼용
  - 색상에 이름이 없다 (하드코딩)
  - 모바일에서 깨짐
- Addy Osmani: "시각적으로 그럴듯한 UI ≠ 의미 있는 사용자 경험"

### 2편: 디자인 토큰이라는 언어

> **슬러그:** `design-tokens-as-language`
> **역할:** 개념 — AI에게 디자인을 가르치는 방법
> **태그:** 가이드

**핵심 주장**: AI에게 "예쁘게 만들어"라고 하면 보라색 그라디언트가 나온다. "이 규칙대로 만들어"라고 하면 일관된 디자인이 나온다. 그 규칙의 이름이 디자인 토큰이다.

**Part 구성:**

Part 1 — "색상에 이름을 붙여라"
- 디자인 토큰이란 무엇인가: "디자인 결정의 단일 진실 소스"
- W3C Design Tokens 표준 (2025년 10월 첫 안정 버전)
- CSS 변수 = 가장 접근하기 쉬운 디자인 토큰
- Before/After: `#6366f1` vs `--color-primary`

Part 2 — "Tailwind v4가 바꾼 것"
- `@theme` 디렉티브: CSS 네이티브 디자인 토큰
- JS 설정 파일 없이 CSS 하나로 디자인 시스템 정의
- 실습: 최소한의 @theme으로 프로젝트 전체 톤 잡기
- 컨텍스트별 테마 스코핑 (다크모드, 테넌트별 브랜딩)

Part 3 — "AI 규칙 파일에 디자인을 심어라"
- `.cursorrules` → `AGENTS.md` → `CLAUDE.md` 진화 타임라인
- 디자인 규칙을 AI 에이전트에 주입하는 실전 방법
- 실습: CLAUDE.md에 디자인 토큰과 컴포넌트 규칙 작성하기
- 60,000+ 오픈소스 프로젝트가 채택한 AGENTS.md 표준

Part 4 — "규칙이 만드는 일관성"
- 규칙 파일 Before/After 비교 (동일 프롬프트, 규칙 유무 차이)
- 디자인 드리프트를 막는 토큰의 역할
- editorial 프로젝트 사례: CSS 변수 + CLAUDE.md 스킬 시스템이 만든 일관성

### 3편: 남의 디자인을 훔치는 기술

> **슬러그:** `steal-like-a-designer`
> **역할:** 실전 — 참조 디자인 기반 워크플로우
> **태그:** 실전

**핵심 주장**: 디자이너가 처음부터 창작하는 경우는 거의 없다. 참조 디자인을 수집하고, 분석하고, AI에게 맥락으로 주는 것이 "디자이너 없는 디자인"의 핵심이다.

**Part 구성:**

Part 1 — "참조 수집의 기술"
- 디자이너도 Dribbble/Behance에서 참조를 수집한다
- 참조의 목적: "이렇게 만들어"가 아니라 "이 톤과 구조로"
- 참조 수집 소스: Dribbble, Behance, Land-book, Mobbin, Godly, Refero
- 한국 참조: 토스, 당근, 카카오뱅크의 디자인 패턴

Part 2 — "스크린샷 → 코드의 현실"
- screenshot-to-code (GitHub 71,400+ Stars): 정확도 Claude 70%, GPT-4V 65%
- 한계: 레이아웃은 잡지만 인터랙션, 반응형, 토큰은 못 잡음
- 올바른 용법: 전체 복제가 아니라 "구조 참조 + 토큰 적용"
- Vision MCP: 스크린샷을 구조적 컨텍스트로 변환

Part 3 — "Figma 없이 Figma를 쓰는 법"
- Figma Community: 무료 템플릿 수천 개 (SaaS Dashboard, Landing Page 등)
- Figma MCP Server (2025 출시): AI 에이전트에 구조적 디자인 정보 직접 전달
- 개발 시간 50-70% 단축 (적절한 워크플로우 기준)
- 설정 방법: Claude Code → `claude mcp add figma-remote-mcp`, Cursor → Dev Mode MCP
- Figma의 새 패러다임: MCP가 코드베이스를 스캔 → 디자인 규칙 파일 자동 생성

Part 4 — "PageAI 방식: 디자인 브리프 + 규칙 파일"
- PageAI Starter Kit: 현재 가장 효과적인 참조 기반 워크플로우
- 핵심: 디자인 목업 1장 + 상세 브리프 + 스타터킷 + Playwright MCP 자동 검증
- "모호한 지시 = 보라색 UI. 좋은 입력 + 견고한 기반 + 규칙 = 1-shot 프로덕션 수준"
- 한국 디자이너 검증: TOKTOKHAN.DEV "디자이너 눈에는 디테일이 부족", pxd "반복 대화를 통한 점진적 정교화"
- 최적 워크플로우: 참조 수집(Mobbin/Dribbble) → 구조 추출(Figma MCP) → 코드 생성(Claude/Cursor) → 토큰 적용 → 자동 검증
- 단일 도구가 아니라 도구 체인이 답이다

### 4편: shadcn/ui라는 치트키

> **슬러그:** `shadcn-cheat-code`
> **역할:** 실전 — 컴포넌트 라이브러리 전략
> **태그:** 실전

**핵심 주장**: shadcn/ui는 "디자이너 없는 개발자"를 위한 가장 현실적인 답이다. copy-paste 방식이 AI 워크플로우와 최적 궁합을 이루는 이유, 그리고 "그냥 갖다 쓰기"를 넘어 브랜드를 입히는 방법.

**Part 구성:**

Part 1 — "왜 shadcn/ui인가"
- GitHub Stars 106,000+ / NPM 주간 560,000+: 사실상 표준
- 패러다임 전환: 라이브러리 소비자 → 코드 소유자
- copy-paste = AI 코드 생성의 최적 입력. v0.dev가 shadcn을 기본 출력하는 이유
- MUI, Chakra, Ant Design 비교: 왜 바이브 코딩에서 shadcn이 이기는가

Part 2 — "보일러플레이트라는 지름길"
- Marc Lou의 ShipFast: Tailwind + shadcn 기반 SaaS 보일러플레이트로 첫 달 $40,000
- SaaS 스타터킷 생태계: auth, billing, dashboard가 이미 디자인된 상태
- 보일러플레이트 vs 직접 구축: 시간/비용/디자인 품질 트레이드오프
- Tailwind UI ($299), Cruip, shadcn Studio: 템플릿 마켓플레이스 비교

Part 3 — "기본에서 브랜드로"
- shadcn 기본 테마가 "그냥 shadcn" 같은 이유
- 테마 커스터마이징 실습: 색상 팔레트 교체, 타이포그래피 변경, 간격 조정
- CSS 변수 오버라이드로 브랜드 아이덴티티 입히기
- Before/After: 기본 shadcn vs 커스텀 테마 적용

Part 4 — "React 없이도 되는가"
- Vanilla HTML/CSS 프로젝트에서의 대안
- Tailwind + 직접 컴포넌트: editorial 프로젝트의 CSS 변수 시스템 사례
- Pieter Levels 방식: vanilla HTML + jQuery로 월 $250K
- 프레임워크 없는 프로젝트를 위한 디자인 시스템 구축법

### 5편: 배포 버튼을 누르기 전에

> **슬러그:** `before-you-deploy`
> **역할:** 마무리 — 디자인 QA와 제품화
> **태그:** 실전

**핵심 주장**: "작동하는 것"과 "제품인 것"의 차이는 디자인 QA에 있다. 배포 전 30분 투자로 "AI가 만든 티"를 80% 제거하는 체크리스트.

**Part 구성:**

Part 1 — "AI가 놓치는 것들"
- 접근성: 자동화 도구가 잡는 WCAG 이슈는 전체의 30-50%에 불과
- 반응형: AI가 데스크톱 퍼스트로 생성, 모바일은 사후 대응
- 한글 타이포그래피: 영문 기준 생성 → 한글에서 답답하거나 과도하게 퍼짐
- 마이크로 인터랙션: hover, focus, transition — AI가 가장 대충 처리하는 영역

Part 2 — "30분 디자인 QA 체크리스트"
- 색상: 하드코딩 없는가? CSS 변수로 통일했는가?
- 타이포그래피: 폰트 2종 이내인가? 한글/영문 폴백 설정했는가?
- 간격: 8px 그리드 단위인가? 일관된 padding/margin인가?
- 반응형: 320px에서 깨지지 않는가? 터치 타겟 44px 이상인가?
- 접근성: 색상 대비 4.5:1 이상인가? alt 텍스트 있는가?
- 성능: 이미지 최적화했는가? CLS 없는가?

Part 3 — "비주얼 리그레션 테스팅"
- Chromatic: Storybook 컴포넌트 단위 검증 (3줄 코드로 시작)
- Percy: 전체 페이지 크로스 브라우저 검증
- 1인 메이커를 위한 간소화 버전: 스크린샷 비교 + AI 피드백
- AI에게 "내 디자인 리뷰해줘" 프롬프트 템플릿

Part 4 — "MVP에서 제품으로"
- Pieter Levels, Marc Lou, Tony Dinh의 공통 패턴: "못생겨도 출시 → 점진적 개선"
- 하이브리드 모델: AI로 검증 → 검증된 부분만 정밀 리팩토링
- "빠르게 검증, 정밀하게 측정, 의도적으로 확장"
- 디자인 리팩토링 우선순위: 전환율에 직접 영향 주는 화면부터

---

## 4. 디자인 노트

### 시리즈 고유 컴포넌트

**Before/After 비교 블록**
- 좌우 또는 상하 분할로 AI 기본 출력 vs 개선 결과를 나란히 보여주는 컴포넌트
- `.comparison-block`: 2컬럼 그리드, 모바일에서 1컬럼 스택
- "Before" 쪽에 빨간/회색 오버레이, "After" 쪽에 초록/하이라이트

**코드 블록 + 결과 미리보기**
- CSS 변수, @theme, CLAUDE.md 규칙 등 코드 예시가 많은 시리즈
- 코드 블록 아래에 "이렇게 보인다" 결과 미리보기를 넣는 패턴
- `.code-preview-pair`: 코드 + 비주얼 결과를 묶는 컨테이너

**도구 비교 카드**
- shadcn/ui, MUI, Chakra 등 도구 비교 시 사용
- `.tool-card`: 아이콘/로고 + 핵심 수치 + 장단점
- 기존 `mechanism-row`를 확장하되 더 시각적으로

**체크리스트 블록**
- 5편의 "30분 디자인 QA 체크리스트" 등에 사용
- `.checklist`: 체크 아이콘 + 항목 + 설명
- 프린트 시 체크박스로 변환

### editorial-base.css 확장 필요사항
- `.comparison-block` 컴포넌트 추가 (Before/After 비교)
- `.code-preview-pair` 컴포넌트 추가 (코드 + 결과 미리보기)
- 기존 `.technique` 클래스를 활용하되, 코드 중심 레이아웃 변형 필요
- 기존 `.warning-box`에 "Before" 스타일 변형 추가

---

## 5. 제작 순서

- [ ] 1편 `purple-gradient-syndrome.html` 제작 (문제 진단)
- [ ] 2편 `design-tokens-as-language.html` 제작 (디자인 토큰 개념)
- [ ] 3편 `steal-like-a-designer.html` 제작 (참조 디자인 워크플로우)
- [ ] 4편 `shadcn-cheat-code.html` 제작 (컴포넌트 라이브러리)
- [ ] 5편 `before-you-deploy.html` 제작 (디자인 QA와 제품화)
- [ ] `assets/series-nav.js` SERIES 데이터에 vibe-design-series 추가
- [ ] `assets/content-data.js`에 시리즈/글 데이터 추가
- [ ] `content/index.md` 업데이트
- [ ] `CLAUDE.md` 콘텐츠 관리 섹션 업데이트
- [ ] editorial-base.css에 시리즈 고유 컴포넌트 추가

---

## 6. 참고 자료 (출처)

### 학술/리포트
- METR (2025.07). "Early-2025 AI on Experienced Open-Source Developer Productivity" — 16명 숙련 개발자, 246개 실제 작업, -19% 결과. https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- W3C Design Tokens Community Group (2025.10.28). "Design Tokens Specification 2025.10" — 첫 번째 안정 버전. https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/
- Stack Overflow (2025). "2025 Developer Survey — AI Section". https://survey.stackoverflow.co/2025/ai
- Georgetown CSET. AI 생성 코드 보안 결함 비율 ~45%

### 산업 통계
- Second Talent (2025). "Top Vibe Coding Statistics & Trends 2026". https://www.secondtalent.com/resources/vibe-coding-statistics/
- Netcorp (2024). "AI-Generated Code Statistics 2026". https://www.netcorpsoftwaredevelopment.com/blog/ai-generated-code-statistics
- SaaSIndie (2025). "The Rise of Shadcn/UI". https://saasindie.com/blog/shadcn-ui-trends-and-future
- DevKit.best (2025). "Shadcn UI Ecosystem 2025". https://www.devkit.best/blog/mdx/shadcn-ui-ecosystem-complete-guide-2025

### 도구/플랫폼
- Vercel (2025). "How to prompt v0". https://vercel.com/blog/how-to-prompt-v0
- Builder.io (2026). "Design to Code with the Figma MCP Server". https://www.builder.io/blog/figma-mcp-server
- AIMultiple Research (2026). "Figma MCP Server Tested: Figma to Code in 2026". https://research.aimultiple.com/figma-to-code/
- Figma (2025). "Guide to the Figma MCP Server". https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server
- abi/screenshot-to-code. GitHub (71,400+ Stars). https://github.com/abi/screenshot-to-code

### 전문가 의견
- Addy Osmani (Google Chrome Engineering Lead). AI 디자인의 한계에 대한 발언
- Jeremy Howard (fast.ai 창립자). "다크 플로우(Dark Flow)" 개념

### 인디해커/사례
- Pieter Levels. "How I build my minimum viable products". https://levels.io/how-i-build-my-minimum-viable-products/
- Marc Lou (IndiePattern). https://indiepattern.com/stories/marc-lou/
- Tony Dinh (IndiePattern). https://indiepattern.com/stories/tony-dinh-typingmind/
- IT Revolution (2025). "Four Case Studies in Vibe Coding". https://itrevolution.com/articles/four-case-studies-in-vibe-coding/

### AI 규칙 파일
- AGENTS.md 공식. https://agents.md/
- Arize AI (2025). "Optimizing Coding Agent Rules". https://arize.com/blog/optimizing-coding-agent-rules-claude-md-agents-md-clinerules-cursor-rules-for-improved-accuracy/

### Tailwind CSS
- Magic Patterns (2025). "Should you use Tailwind in 2025?". https://www.magicpatterns.com/blog/should-you-use-tailwind-in-2025
- Tailwind CSS v4 공식 블로그. https://tailwindcss.com/blog/tailwindcss-v4
- Nicolalazzari.ai (2025). "Tailwind Design Tokens: Complete Guide 2025". https://nicolalazzari.ai/articles/integrating-design-tokens-with-tailwind-css

### 보라색 그라디언트 문제/AI 디자인 비평
- "Why Your AI Keeps Building the Same Purple Gradient Website". https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website
- "Design Observation: Why Do AI-Generated Websites Always Favour Blue-Purple Gradients?" (Medium). https://medium.com/@kai.ni/design-observation-why-do-ai-generated-websites-always-favour-blue-purple-gradients-ea91bf038d4c
- "AI Purple Problem: Make Your UI Unmistakable" (DEV). https://dev.to/jaainil/ai-purple-problem-make-your-ui-unmistakable-3ono
- "The Hidden Purple Bias in AI-Generated Interfaces" (deeplearning.fr). https://deeplearning.fr/the-hidden-purple-bias-in-ai-generated-interfaces-uncovering-the-technical-roots-and-building-better-prompts/
- "Why AI-Generated Designs Look the Same & How to Fix It" (Vandelay Design). https://www.vandelaydesign.com/why-ai-generated-designs-look-the-same/

### 다크 플로우/바이브 코딩 비평
- Jeremy Howard. "Breaking the Spell of Vibe Coding" (fast.ai, 2026.01.28). https://www.fast.ai/posts/2026-01-28-dark-flow/
- "Four Case Studies in Vibe Coding" (IT Revolution). https://itrevolution.com/articles/four-case-studies-in-vibe-coding/
- Addy Osmani. "Vibe coding is not the same as AI-Assisted engineering". https://medium.com/@addyosmani/vibe-coding-is-not-the-same-as-ai-assisted-engineering-3f81088d5b98

### 참조 디자인/워크플로우
- PageAI. "Vibe Coding Starter Guide: from Design to Production". https://pageai.pro/blog/vibe-coding-starter-guide
- PageAI Vibe Coding Starter (GitHub). https://github.com/PageAI-Pro/vibe-coding-starter
- Figma. "Design Systems And AI: Why MCP Servers Are The Unlock". https://www.figma.com/blog/design-systems-ai-mcp/
- Storybook MCP sneak peek. https://storybook.js.org/blog/storybook-mcp-sneak-peek/

### 한국 맥락
- TOKTOKHAN.DEV. "디자이너의 AI 바이브 코딩 체험기 feat. Cursor". https://blog.toktokhan.dev/디자이너의-ai-바이브-코딩-체험기-feat-cursor-8e2c3a17e4b2
- pxd. "바이브 코딩으로 간단한 웹사이트 구현해보기". https://story.pxd.co.kr/1844
- "바이브 코딩 시대, UX/UI 디자인 이렇게 준비하세요". https://brunch.co.kr/@ghidesigner/245
- "UI를 위한 타이포그래피". https://brunch.co.kr/@@TZu/40
- 바이브 코딩 코리아. https://vibecoding.ai-c.kr/
- vibecode.kr. https://vibecode.kr/

### 디자인 QA
- Percy vs Chromatic 비교. https://medium.com/@crissyjoshua/percy-vs-chromatic-which-visual-regression-testing-tool-to-use-6cdce77238dc
- Chromatic for Designers. https://www.hackdesign.org/toolkit/chromatic/
- HTTP Archive (2025). "2025 Web Almanac — Accessibility". https://almanac.httparchive.org/en/2025/accessibility

---
name: editorial-content-page
description: Use this skill when the user wants to create a single-page HTML document that presents structured information (summaries, guides, reports, learning notes) in a polished editorial/magazine style. Trigger when the user asks to "정리해줘", "한눈에 보이게", "보기 좋게 만들어", "잘 정리된 문서", or wants content presented as a readable, print-quality web page rather than a slide deck or spreadsheet. Also trigger when the user provides YouTube transcripts, article summaries, book notes, or any structured knowledge and wants it turned into a visually refined single-page reference. Do NOT use for dashboards, interactive apps, data-heavy tables, or slide presentations.
---

# Editorial Content Page

유튜브 요약, 학습 노트, 가이드, 리포트 등 구조화된 정보를 에디토리얼/매거진 스타일의 단일 HTML 페이지로 제작하는 스킬.

## 디자인 의도

이 스킬의 목표는 **"AI가 만든 것 같지 않은"** 정보 전달 문서를 만드는 것이다. 일반적인 AI 출력물은 이모지 아이콘, 다크 테마 카드 UI, 그라디언트 배경 등으로 즉시 "AI 산출물"로 인식된다. 이 스킬은 그 대신 인쇄 매체(잡지, 학술 논문, 에디토리얼)의 디자인 언어를 차용하여 정보의 신뢰감과 가독성을 높인다.

## 핵심 디자인 원칙

### 1. 타이포그래피가 디자인이다

아이콘, 일러스트, 장식 요소 대신 **서체의 위계(hierarchy)만으로** 정보 구조를 표현한다.

- 제목: 본문보다 크고, 강조 단어만 bold + accent color
- 섹션 라벨: 모노스페이스, 소문자, letter-spacing 넓게
- 본문: 적당한 line-height(1.85~1.9), 충분한 여백

### 2. 서체 선택 규칙 — 이중 서체 전략

**핵심:** 영문은 세리프, 한글은 모던 산세리프를 조합한다. 한국어 세리프(Noto Serif KR 등)는 획이 두껍고 올드한 인상을 주므로 사용하지 않는다.

```
영문 세리프:    'Source Serif 4' (제목/본문의 라틴 글리프) — 셀프호스팅, font-display: optional
한글 산세리프:  'Pretendard Variable' (제목/본문의 한글 글리프) — jsDelivr CDN, 다이나믹 서브셋
라벨/넘버링:   'JetBrains Mono' (monospace) — 셀프호스팅, font-display: optional
```

**CSS font-family 작성법:** 한 스택 안에 라틴 서체를 먼저, 메트릭 보정 폴백을 그 다음, 한글 서체를 뒤에 배치한다. 브라우저는 글리프가 없는 문자에 대해 다음 서체로 fallback한다.

```css
--serif: 'Source Serif 4', 'Source Serif 4 Fallback', 'Pretendard Variable', 'Pretendard', serif;
--mono: 'JetBrains Mono', 'JetBrains Mono Fallback', 'Courier New', monospace;
```

이렇게 하면 영문은 Source Serif 4(세리프)로, 한글은 Pretendard Variable(산세리프)로 렌더링된다. 한국 고급 출판물에서 자주 쓰이는 조합이다. `Source Serif 4 Fallback`과 `JetBrains Mono Fallback`은 fontpie로 계산된 메트릭 보정 폴백 폰트로, CLS(레이아웃 시프트)를 제거한다.

**폰트 로딩 (Zero CLS 전략):**

Source Serif 4와 JetBrains Mono는 `assets/fonts/`에 셀프호스팅되며, `editorial-base.css`에서 `@font-face`로 선언한다 (`font-display: optional`). Pretendard는 jsDelivr CDN의 변수 다이나믹 서브셋을 사용한다.

```html
<!-- 폰트 preload (Source Serif 4만 — 본문 폰트이므로 최우선) -->
<link rel="preload" href="../../assets/fonts/source-serif-4-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<!-- Pretendard CDN preconnect + 다이나믹 서브셋 -->
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<!-- 공통 CSS (셀프호스팅 @font-face 포함) -->
<link rel="stylesheet" href="../../assets/editorial-base.css">
```

`editorial-base.css`에 셀프호스팅 폰트 `@font-face`(Source Serif 4, JetBrains Mono, 메트릭 보정 폴백), 변수, 리셋, 타이포그래피, 공통 컴포넌트(masthead, section-head, prose, pull-quote, mechanism-row, technique, warning-box, closing, footer, 반응형, 프린트)가 포함되어 있다. 각 HTML의 `<style>` 태그에는 **해당 페이지 고유 컴포넌트만** 작성한다.

**왜 이렇게 하는가:**
- `font-display: optional` — 폰트가 ~100ms 내 로드되면 사용, 아니면 폴백 유지. **스왑이 발생하지 않아 CLS 제로.**
- `preload` — 셀프호스팅 폰트를 HTML 파싱과 동시에 다운로드 시작. optional의 100ms 윈도우 내 거의 항상 도착.
- 메트릭 보정 폴백 — fontpie로 계산된 정확한 `size-adjust`, `ascent-override` 값으로, 만약 폴백이 보여도 레이아웃이 동일.
- 다이나믹 서브셋 — Pretendard의 92개 유니코드 슬라이스 중 페이지에 필요한 것만 다운로드.

**금지 서체:** Noto Serif KR(한글 세리프 — 무겁고 올드함), Cormorant Garamond(올드스타일 숫자 문제), Inter/Roboto/Arial/system-ui(AI 출력물 느낌).

**중요:** `font-variant-numeric: lining-nums tabular-nums`를 body에 반드시 적용한다. 올드스타일 숫자가 한국어 콘텐츠에서 어색하게 보이는 문제를 방지한다.

### 3. 이탤릭체 사용 금지

한국어 콘텐츠에서 이탤릭체는 가독성을 해친다. 강조는 모두 **bold(font-weight: 700)** + accent color로 처리한다. `<em>` 태그 대신 `<strong>` 태그를 사용한다.

### 4. 이모지/아이콘 사용 금지

정보 구분은 넘버링(01, 02, 03), 라벨 텍스트, 선(border/rule)으로만 처리한다. 이모지나 SVG 아이콘은 사용하지 않는다.

### 5. 색상 체계 — 반드시 CSS 변수로 공통화

**모든 색상은 `:root` CSS 변수로 정의한다.** 스타일 블록 내 어디에서도 하드코딩된 색상값(`#3a3a36`, `#5a5a55` 등)을 직접 쓰지 않는다.

```css
:root {
  --bg: #faf8f4;          /* 크림 배경 — 순백색 아님 */
  --fg: #1a1a18;          /* 거의 검정 */
  --muted: #8a8680;       /* 보조 텍스트, 라벨 */
  --accent: #c43e2a;      /* 포인트 — 빨간 계열 하나만 */
  --rule: #d5d0c8;        /* 구분선 */
  --card-bg: #f2efe9;     /* 박스/카드 배경 */
  --prose: #3a3a36;       /* 본문 텍스트 */
  --secondary: #6a6862;   /* 부가 설명, 소항목 본문 */
}
```

다크 테마를 기본으로 하지 않는다. 인쇄물 느낌의 라이트 크림 톤이 정보 전달 문서에 더 적합하다. accent color는 한 가지만 사용하고, 그라디언트는 쓰지 않는다.

### 6. 한글 타이포그래피 주의사항

- **한글은 라틴보다 시각적으로 무겁다.** 같은 font-weight라도 한글이 더 굵어 보인다. 제목에서 한글 font-weight를 라틴보다 한 단계 낮추는 것을 고려한다 (예: 라틴 900이면 한글은 700~800).
- **한글 letter-spacing은 0 또는 약간 마이너스(-0.5px~-1px)가 자연스럽다.** 양수 letter-spacing은 한글에서 어색하다 (라벨용 영문 모노스페이스는 예외).
- **한글 line-height는 1.8~2.0이 적당하다.** 라틴보다 높아야 읽기 편하다.
- **숫자/영문이 혼합된 한글 문장에서** `font-variant-numeric: lining-nums tabular-nums`는 필수다.
- **한글이 포함된 라벨은 모노스페이스를 쓰지 않는다.** 모노스페이스 + 소형 폰트(0.6rem) + 넓은 letter-spacing은 영문 전용 라벨(Part I, Mechanism 01 등)에만 사용한다. 한글이 포함된 라벨(카테고리명, 경고 제목 등)은 본문 서체(`var(--serif)`)로, 폰트 크기 0.8rem 이상, letter-spacing 2px 이하, font-weight 700으로 처리한다.

## 페이지 구조

### 레이아웃 템플릿

```
[Masthead]        — 상단 라벨 + 대제목 + 부제
  |
[Part I]          — 섹션 라벨(모노) + 섹션 제목(bold)
  |- 본문 prose
  |- 3-column grid  — 1px gap, border로 구분 (카드 아님)
  +- Pull quote     — 상하 border, 중앙 정렬, bold
  +- Timeline       — 1px gap grid, 시간+설명 2컬럼
  |
[Part II]         — 기술/방법론 블록 반복
  |- 넘버 + 제목
  |- 부제 (muted, 일반체)
  +- 배경 박스 (card-bg)
  |
[Part III]        — 2-column 적용 섹션
  |- 좌: 카테고리 A
  +- 우: 카테고리 B
  |
[Warning Box]     — 1px solid border, 넘버링 리스트
  |
[Closing]         — 핵심 메시지 + 부연
  |
[Footer]          — 출처/크레딧 (모노, 작게)
```

### 핵심 컴포넌트별 CSS 패턴

#### Masthead (페이지 헤더)

```css
.masthead {
  text-align: center;
  padding-bottom: 56px;
  border-bottom: 1px solid var(--fg);
  margin-bottom: 64px;
}

.masthead .issue {
  font-family: var(--mono);
  font-size: 0.65rem;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--muted);
}

.masthead h1 {
  font-size: 3.2rem;
  font-weight: 400;
  line-height: 1.2;
}

.masthead h1 strong {
  font-weight: 900;
  color: var(--accent);
}
```

#### 3-Column Mechanism Grid

카드가 아니라 1px gap으로 구분되는 그리드. 배경색 차이 없이 선으로만 나눈다.

```css
.mechanism-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1px;
  background: var(--rule);
  border: 1px solid var(--rule);
}

.mechanism {
  background: var(--bg);
  padding: 32px 24px;
}
```

#### Pull Quote (핵심 인용)

```css
.pull-quote {
  padding: 44px 0;
  border-top: 1px solid var(--fg);
  border-bottom: 1px solid var(--fg);
  text-align: center;
}

.pull-quote p {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.6;
}

.pull-quote .attr {
  font-family: var(--mono);
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: var(--accent);
  font-weight: 600;
}
```

#### Timeline (시간순 사건 정리)

사건 전개, 사고 경과 등 시간 순서가 핵심인 정보를 정리할 때 사용한다. `.mechanism-row`와 동일한 **1px 갭 그리드** 패턴을 따른다. 장식적 요소(세로 선, 원형 마커 등)를 사용하지 않고, 구조화된 데이터 테이블처럼 표현한다.

**디자인 원칙:**
- `.mechanism-row`처럼 `background: var(--rule)` + `gap: 1px`로 셀 사이 구분선을 만든다
- 시간 컬럼은 `card-bg` 배경으로 시각적 분리 — 본문과 시간의 위계가 명확해진다
- 장식적 세로 선(`::before`)이나 원형 도트 마커를 사용하지 않는다
- 각 행의 높이는 콘텐츠에 따라 자연스럽게 결정된다

**HTML 마크업:**
```html
<div style="font-family:var(--serif);font-size:0.8rem;letter-spacing:2px;color:var(--muted);font-weight:700;margin-bottom:16px">타임라인 제목</div>

<ul class="timeline">
  <li>
    <span class="t-time">19:00</span>
    <div class="t-desc">사건 설명. <strong>강조할 부분</strong>은 bold로 처리.</div>
  </li>
  <li>
    <span class="t-time">19:20</span>
    <div class="t-desc">다음 사건 설명.</div>
  </li>
</ul>
```

**CSS 패턴 (페이지 인라인 `<style>`에 작성):**
```css
/* TIMELINE — 1px gap grid (mechanism-row 패턴) */
.timeline {
  margin: 40px 0 48px;
  list-style: none;
  background: var(--rule);
  border: 1px solid var(--rule);
  display: grid;
  gap: 1px;
}
.timeline li {
  display: grid;
  grid-template-columns: 80px 1fr;
  background: var(--bg);
}
.timeline .t-time {
  font-family: var(--mono);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent);
  padding: 20px 12px;
  text-align: right;
  background: var(--card-bg);    /* 시간 컬럼만 배경색 분리 */
}
.timeline .t-desc {
  font-size: 0.92rem;
  color: var(--prose);
  line-height: 1.7;
  padding: 20px 24px;
}
.timeline .t-desc strong {
  font-weight: 700;
  color: var(--fg);
}

/* 모바일 */
@media (max-width: 700px) {
  .timeline li { grid-template-columns: 64px 1fr; }
  .timeline .t-time { padding: 16px 8px; font-size: 0.75rem; }
  .timeline .t-desc { padding: 16px; }
}
```

**금지 패턴:**
- `::before`로 세로 연결 선 만들기 — 장식적이고, 콘텐츠와 정렬이 어긋나기 쉽다
- `border-radius: 50%`의 원형 도트 마커 — 에디토리얼 스타일과 맞지 않는다
- `border-bottom`으로 행 구분 — 1px 갭 그리드가 더 깔끔하다
- 타임라인 제목에 `<h3>` + 인라인 스타일 — 한글 라벨 패턴(serif, 0.8rem, letter-spacing 2px)을 사용한다

**타임라인 제목 라벨 규칙:**
- 한글이 포함되므로 모노스페이스를 쓰지 않는다
- `var(--serif)`, `0.8rem`, `letter-spacing: 2px`, `font-weight: 700`, `color: var(--muted)` 패턴을 따른다
- `.w-title`과 동일한 한글 라벨 규칙 적용

#### Warning/Self-Diagnosis Box

한글이 포함된 제목(.w-title)은 모노스페이스가 아닌 본문 서체를 사용한다.

```css
.warning-box {
  border: 1px solid var(--fg);
  padding: 32px 36px;
}

/* 한글 포함 라벨 — 모노스페이스 금지 */
.warning-box .w-title {
  font-family: var(--serif);   /* 모노 아님 */
  font-size: 0.8rem;           /* 0.6rem은 한글에 너무 작음 */
  letter-spacing: 2px;         /* 4px은 한글에 과도함 */
  font-weight: 700;
}

.warning-list {
  list-style: none;
  counter-reset: warn;
}

.warning-list li::before {
  content: counter(warn, decimal-leading-zero);
  font-family: var(--mono);
  font-weight: 700;
  color: var(--accent);
}
```

## 반응형 처리

```css
@media (max-width: 700px) {
  .mechanism-row { grid-template-columns: 1fr; }
  .app-columns { grid-template-columns: 1fr; }
  .masthead h1 { font-size: 2.2rem; }
}
```

3-column과 2-column은 모바일에서 1-column으로 전환한다. 나머지 요소는 max-width: 780px 컨테이너가 자연스럽게 처리한다.

## 콘텐츠 작성 규칙

### 정보 구조화 프로세스

1. 원본 콘텐츠에서 **핵심 구조를 3단계로 추출**한다: 문제(Why) -> 해법(How) -> 적용(What)
2. 각 단계는 Part I, II, III로 분리한다
3. Part 내부는 산문(prose) -> 구조화된 블록(grid/technique) -> 강조(pull quote) 순서로 배치한다

### 텍스트 톤

- 경어체가 아닌 **평서문/단정문** 사용 ("~한다", "~이다")
- 불필요한 수식어 제거, 짧고 직접적인 문장
- 독자에게 말을 거는 2인칭 최소화 — 정보 전달 문서이므로 객관적 톤 유지

### HTML 마크업 규칙

- 강조: `<strong>` 사용. `<em>` 사용 금지
- 섹션 라벨: `<span class="num">` 또는 `<div class="m-label">`로 처리
- 넘버링: CSS counter 또는 직접 텍스트로. `<ol>` 태그보다 수동 제어 선호
- 본문: `<p class="prose">`로 통일

## 체크리스트 (산출물 검수)

산출물 생성 후 아래 항목을 확인한다:

- [ ] 이모지/아이콘이 없는가
- [ ] 이탤릭체가 없는가 (한국어 콘텐츠의 경우)
- [ ] 숫자가 정상 렌더링되는가 (올드스타일 숫자 문제 없는가)
- [ ] accent color가 1가지만 사용되었는가
- [ ] 그라디언트가 없는가
- [ ] Pull quote의 attribution 텍스트가 충분히 큰가 (0.7rem 이상)
- [ ] 모바일 반응형이 작동하는가
- [ ] font-variant-numeric이 적용되어 있는가
- [ ] 본문 line-height가 1.85 이상인가
- [ ] **모든 색상이 CSS 변수로 정의되어 있는가 (하드코딩 없음)**
- [ ] **한글 서체가 Pretendard Variable로 렌더링되는가 (Noto Serif KR 아님)**
- [ ] **폰트 preload 태그가 `<head>`에 있는가 (source-serif-4 woff2)**
- [ ] **Google Fonts `@import`나 외부 `<link>`를 사용하지 않는가 (셀프호스팅 필수)**
- [ ] **한글 font-weight가 라틴 대비 적절한가 (너무 무겁지 않은가)**

## 이 스킬이 만들어진 배경

이 스킬은 유튜브 영상 요약을 HTML로 정리하는 과정에서 반복된 피드백을 통해 도출되었다. 주요 교훈:

1. **첫 번째 버전 (다크 테마 + 이모지 카드):** "너무 AI가 만든 것 같다"는 피드백. 이모지 아이콘과 다크 테마 카드 UI가 AI 산출물의 전형적 패턴으로 인식됨.
2. **두 번째 버전 (에디토리얼 + 이탤릭):** 구조와 레이아웃은 호평받았으나, Cormorant Garamond의 올드스타일 숫자와 이탤릭체가 한국어에서 어색하게 렌더링됨.
3. **세 번째 버전:** Source Serif 4로 교체, 이탤릭 전면 제거, bold 기반 위계로 전환, pull quote attribution 크기 확대. 구조는 호평.
4. **네 번째 버전 (현재):** Noto Serif KR이 한글에서 촌스럽다는 피드백. Pretendard로 교체하여 영문 세리프 + 한글 모던 산세리프 이중 전략 도입. 하드코딩 색상을 전부 CSS 변수로 공통화.

핵심 인사이트:
- **한국어 콘텐츠에서는 라틴 타이포그래피 관습(이탤릭, 올드스타일 숫자, 세리프 본문)을 그대로 적용하면 안 된다.**
- **한국어 세리프 폰트는 대부분 올드한 인상을 준다.** 모던한 한글 문서에는 Pretendard 같은 현대적 산세리프가 적합하다.
- **색상은 반드시 CSS 변수로 관리한다.** 하드코딩은 유지보수와 테마 변경을 어렵게 만든다.

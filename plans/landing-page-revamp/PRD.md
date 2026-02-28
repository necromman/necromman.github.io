# PRD: 랜딩 페이지 개편

> 작성일: 2026-02-28
> 상태: Draft
> 근거 문서: [analysis-summary.md](./analysis-summary.md) 및 영역별 상세 분석 5건

---

## 1. 배경 및 목적

### 현재 상황

- 38개 시리즈, 150+ 글이 **카테고리 구분 없이 일렬 나열**
- **무한 스크롤** 방식으로 "끝"을 알 수 없고, URL에 상태가 반영되지 않아 북마크/공유 불가
- 콘텐츠가 늘수록 발견성(discoverability)이 계속 저하됨

### 목적

1. **카테고리 시스템** 도입으로 콘텐츠 발견성 확보
2. **전통 페이지네이션** 전환으로 사용자 진행감 제공 및 URL 상태 관리
3. 개편 과정에서 디자인, 성능, 반응형, 접근성/SEO도 함께 개선

---

## 2. 스코프

### In Scope

| 영역 | 범위 |
|------|------|
| 카테고리 | content-data.js에 category 필드 추가, 탭 필터 UI, TOC 계층화 |
| 페이지네이션 | 무한스크롤 → 번호 페이지네이션, URL 상태 관리 |
| 검색 개선 | debounce, 카테고리+검색 통합, 검색 중 정렬 활성화 |
| 디자인 | 카드 경계 강화, card-bg 명도 조정, 시리즈 구분자 개선 |
| 성능 | content-data.js 경량화, series-nav.js CSS 외부화 |
| 반응형 | fluid typography (clamp), 모바일 TOC CLS 보정 |
| 접근성 | ARIA live region, 포커스 트랩, aria-label 추가 |
| SEO | BreadcrumbList JSON-LD |

### Out of Scope (이번 개편에서 제외)

- 시리즈별 인덱스 페이지 생성
- 관련 글 추천 알고리즘
- OG 이미지 WebP 전환
- Pretendard 자체호스팅
- JS/CSS 최소화 (terser/cssnano)
- asset hash plugin
- Service Worker / 오프라인 지원
- 검색 relevance 스코어링

---

## 3. 요구사항

### 3.1 카테고리 시스템

#### 3.1.1 데이터 구조

**content-data.js에 추가할 필드:**

```javascript
// 카테고리 정의
var CATEGORIES = {
  tech:     { label: '기술 & 개발' },
  analysis: { label: '분석 & 팩트체크' },
  fiction:  { label: '소설 & 창작' },
  career:   { label: '업무 & 커리어' }
};

// 각 시리즈에 category 필드 추가
{ id: 'vibe-coding', category: 'tech', title: '...', ... }
```

**분류 기준** — [analysis-summary.md §5](./analysis-summary.md) 참조:
- tech (11개): vibe-coding, claude-code-guide, git-survival, gitlab-migration, server-infra-guide, ai-server-setup, openclaw, why-react, code-last, mcp-agent-guide, qwen-for-humans
- analysis (10개): wasted-life, bithumb-60t, dev-survival, lineage-classic, claude-cowork, vibe-design, ufo-physics, diligence-paradox, ai-job-debate, youtube-outage
- fiction (12개): sovereign-ai-novel, masterkey, ai-withdrawal, illusion-of-knowing, starcraft-timeslip, vow-system, voice-phishing, modern-mukhyang, seventh-seat, overlap, debug-mode, one-punch-reason
- career (5개): future-cashcow, robot-coworker, toss-reality, agent-boss, innobiz-guide

#### 3.1.2 카테고리 탭 UI

```
[전체] [기술 & 개발] [분석 & 팩트체크] [소설 & 창작] [업무 & 커리어]
```

- 위치: 검색 바와 카드 그리드 사이
- 활성 탭: `var(--accent)` 배경 + `var(--bg)` 텍스트
- 모바일: 수평 스크롤 (`overflow-x: auto`)
- 탭 클릭 시: 해당 카테고리만 표시, page → 1 리셋, URL 갱신

#### 3.1.3 TOC 카테고리 계층화

- `<details>`/`<summary>` 기반 접기/펴기
- 현재 active 시리즈가 속한 카테고리는 자동 `open`
- 각 카테고리 헤더에 시리즈 수 표시: `기술 & 개발 (11)`
- 각 시리즈 항목에 `title` 속성으로 description tooltip

#### 3.1.4 SSR 카드에 카테고리 속성 부여

```html
<article class="article-card" data-category="tech" data-series="vibe-coding" ...>
```

- 11ty 빌드 시 content-data.js의 category를 HTML `data-category` 속성으로 출력
- JS에서 `querySelectorAll('[data-category="tech"]')` 로 필터링

---

### 3.2 페이지네이션

#### 3.2.1 무한스크롤 제거

- `IntersectionObserver` 기반 `setupInfiniteScroll()` 제거
- `#load-sentinel` 요소 제거

#### 3.2.2 번호 페이지네이션 UI

```
◀  1  2  3  ...  8  ▶
     12 / 38 시리즈
```

- 위치: 카드 그리드 하단
- PAGE_SIZE: 5 (시리즈 단위, 유지)
- 현재 페이지 강조: accent 배경
- 5페이지 이상 시 말줄임(...) 처리
- 첫/끝 페이지에서 ◀/▶ 비활성

#### 3.2.3 URL 상태 관리

```
https://necromman.github.io/?category=tech&page=2
```

- `history.replaceState`로 URL 갱신 (새 히스토리 항목 안 만듦)
- `popstate` 이벤트로 브라우저 뒤로가기/앞으로가기 대응
- 초기 로드 시 URL 파라미터에서 상태 복원
- 유효하지 않은 파라미터 → 기본값 (전체, 1페이지)

#### 3.2.4 페이지 전환 동작

- 페이지 전환 시 `window.scrollTo({ top: contentAreaTop, behavior: 'smooth' })`
- 카테고리 변경 시 page → 1 리셋
- 검색 입력 시 page → 1 리셋

---

### 3.3 검색 개선

#### 3.3.1 debounce 적용

- 검색 입력에 250ms debounce
- debounce 중 입력 변경 시 타이머 리셋

#### 3.3.2 카테고리 + 검색 통합

- 검색은 현재 활성 카테고리 내에서만 필터링 (AND 조건)
- "전체" 탭에서는 모든 시리즈 대상 검색
- 카테고리 전환 시 검색어 유지

#### 3.3.3 검색 중 정렬 활성화

- 현재: `isSearching` 시 정렬 차단 → 제거
- 검색 결과에도 최신순/오래된순 정렬 적용

---

### 3.4 디자인 개선

#### 3.4.1 카드 경계 강화

```css
.article-card {
  border: 1px solid var(--rule);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
[data-theme="dark"] .article-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}
```

#### 3.4.2 카드/박스 배경 명도 조정

```css
:root { --card-bg: #ebe7df; }               /* #f2efe9 → 명도 차 확대 */
[data-theme="dark"] { --card-bg: #2f2d28; } /* #26241f → 대응 강화 */
```

#### 3.4.3 시리즈 구분자 좌측 보더

```css
.series-divider {
  border-left: 4px solid var(--accent);
  padding-left: 16px;
}
```

#### 3.4.4 검색 포커스 피드백

```css
.search-input:focus {
  border-color: var(--fg);
  box-shadow: 0 0 0 3px rgba(196, 62, 42, 0.05);
}
```

---

### 3.5 성능 개선

#### 3.5.1 content-data.js 경량화

**현재**: 68KB (모든 시리즈/글 메타데이터 + 검색 텍스트를 JS에 인라인)

**방안**: `search` 필드를 별도 파일로 분리하거나, 11ty 빌드 시 SSR HTML에 `data-search` 속성을 이미 출력하고 있으므로 content-data.js에서 `search` 필드 제거

- `search` 필드는 이미 HTML `data-search` 속성에 복제되어 있음
- content-data.js에서 제거하면 번들 크기 대폭 감소

#### 3.5.2 series-nav.js CSS 외부화

- JS 문자열로 관리되는 CSS (~6KB)를 `assets/series-nav.css`로 분리
- `article.njk`에서 `<link rel="stylesheet" href="/assets/series-nav.css">` 추가

---

### 3.6 반응형 개선

#### 3.6.1 fluid typography

```css
.masthead h1 { font-size: clamp(2.2rem, 5vw, 3.2rem); }
.section-head h2 { font-size: clamp(1.5rem, 3vw, 2rem); }
.pull-quote p { font-size: clamp(1.2rem, 2.5vw, 1.5rem); }
.closing h2 { font-size: clamp(1.6rem, 3.5vw, 2.2rem); }
```

- 기존 미디어쿼리 기반 고정값 점프를 `clamp()`로 대체
- 700px 미디어쿼리의 폰트 관련 규칙 제거 (clamp가 대신 처리)

#### 3.6.2 모바일 TOC CLS 보정

```javascript
// body overflow hidden 시 스크롤바 너비만큼 padding 보정
function openMobileToc() {
  var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = scrollbarWidth + 'px';
}
function closeMobileToc() {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}
```

---

### 3.7 접근성

#### 3.7.1 ARIA live region

```javascript
// 검색 결과, 페이지 변경, 정렬 변경 시 스크린 리더에 알림
var announcer = createLiveRegion(); // role="status", aria-live="polite"

// 사용 예
announce('23개 결과');
announce('2페이지, 10/38 시리즈');
announce('최신순으로 정렬됨');
```

#### 3.7.2 aria-label 추가

| 요소 | aria-label |
|------|-----------|
| 검색 입력 | "시리즈 및 콘텐츠 검색" |
| 정렬 버튼 | "정렬 전환 (현재: 최신순)" + `aria-pressed` |
| 네비게이션 | "메인 네비게이션" |
| TOC 사이드바 | "시리즈 목차" |
| 페이지네이션 | "페이지 네비게이션" |
| 카테고리 탭 | "카테고리 필터" |

#### 3.7.3 모바일 TOC 포커스 트랩

- 드로어 열림 시 첫 포커스 가능 요소로 포커스 이동
- Tab/Shift+Tab이 드로어 내부에서만 순환
- Escape 키로 닫기
- 닫힐 때 토글 버튼으로 포커스 복귀

---

### 3.8 SEO

#### 3.8.1 BreadcrumbList JSON-LD

```html
<!-- article.njk에 추가 -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",
      "item": "https://necromman.github.io/" },
    { "@type": "ListItem", "position": 2, "name": "{{ seriesTitle }}" },
    { "@type": "ListItem", "position": 3, "name": "{{ pageTitle }}",
      "item": "{{ canonicalUrl }}" }
  ]
}
</script>
```

---

## 4. 수정 대상 파일

| 파일 | 변경 내용 |
|------|----------|
| `assets/content-data.js` | CATEGORIES 정의 추가, 각 시리즈에 category 필드 추가, search 필드 제거 검토 |
| `assets/index-app.js` | 무한스크롤→페이지네이션, 카테고리 필터, URL 상태, debounce, ARIA, 포커스트랩 |
| `assets/index.css` | 카테고리 탭, 페이지네이션 UI, 카드 경계, card-bg, 시리즈 구분자, 검색 포커스 |
| `assets/editorial-base.css` | card-bg 변수 조정, fluid typography (clamp), secondary 텍스트 구분 |
| `assets/series-nav.js` | 인라인 CSS 제거 (외부 파일로 분리) |
| `assets/series-nav.css` | **신규** — series-nav.js에서 분리한 CSS |
| `assets/nav.js` | aria-label 추가 |
| `content/index.md` | 카테고리 탭 마크업 추가 (SSR), 페이지네이션 마크업 추가 |
| `_includes/layouts/landing.njk` | series-nav.css link 태그 추가 (해당시) |
| `_includes/layouts/article.njk` | BreadcrumbList JSON-LD 추가, series-nav.css link |

---

## 5. 구현 순서

### Phase A: 카테고리 + 페이지네이션 (핵심)

> 이 Phase가 완료되어야 나머지가 의미 있음

1. `content-data.js`에 CATEGORIES 정의 + 38개 시리즈 category 매핑
2. `content/index.md`에 카테고리 탭 마크업 추가
3. `index-app.js` — 카테고리 필터 로직 구현
4. `index-app.js` — 무한스크롤 제거 + 번호 페이지네이션 구현
5. `index-app.js` — URL 상태 관리 (`?category=&page=`)
6. `index.css` — 카테고리 탭 + 페이지네이션 스타일
7. TOC 카테고리 계층화 (`<details>`/`<summary>`)

### Phase B: 검색 + 디자인 + 성능

8. `index-app.js` — 검색 debounce 250ms
9. `index-app.js` — 카테고리+검색 통합 (AND 필터)
10. `index-app.js` — 검색 중 정렬 활성화
11. `index.css` — 카드 경계 강화, 검색 포커스 피드백
12. `editorial-base.css` — card-bg 명도 조정
13. `index.css` — 시리즈 구분자 좌측 보더
14. `content-data.js` — search 필드 제거 (경량화)
15. `series-nav.js` → `series-nav.css` 분리

### Phase C: 반응형 + 접근성 + SEO

16. `editorial-base.css` — fluid typography (clamp)
17. `index-app.js` — 모바일 TOC CLS 보정
18. `index-app.js` — ARIA live region 추가
19. `index-app.js` — aria-label 추가 (검색, 정렬, TOC)
20. `index-app.js` — 모바일 TOC 포커스 트랩 + Escape
21. `nav.js` — aria-label 추가
22. `article.njk` — BreadcrumbList JSON-LD

### Phase D: 검증 + 배포

23. `npx eleventy` 빌드 검증
24. 전 페이지 다크모드 확인
25. 모바일 레이아웃 확인 (375px, 768px, 1024px)
26. 스크린 리더 테스트 (ARIA 동작 확인)
27. URL 상태 동작 확인 (뒤로가기, 직접 URL 접근)

---

## 6. 상태 모델

### URL 파라미터

```
?category={tech|analysis|fiction|career}  — 생략 시 전체
&page={number}                            — 생략 시 1
```

### JS 상태 변수

```javascript
var currentCategory = null;   // null = 전체
var currentPage = 1;
var searchQuery = '';
var sortOrder = 'desc';       // 기존 유지
```

### 상태 전이 규칙

| 사용자 동작 | category | page | searchQuery | sortOrder |
|------------|----------|------|-------------|-----------|
| 카테고리 탭 클릭 | 변경 | → 1 | 유지 | 유지 |
| 페이지 번호 클릭 | 유지 | 변경 | 유지 | 유지 |
| 검색 입력 | 유지 | → 1 | 변경 | 유지 |
| 검색 지우기 | 유지 | → 1 | → '' | 유지 |
| 정렬 토글 | 유지 | 유지 | 유지 | 토글 |
| 브라우저 뒤로가기 | popstate에서 복원 | popstate에서 복원 | — | — |

---

## 7. 성공 지표

| 지표 | 현재 | 목표 |
|------|------|------|
| 콘텐츠 발견 경로 | 검색/스크롤만 | 카테고리+페이징+검색 |
| URL 상태 지원 | 없음 | 카테고리+페이지 |
| 카드 그리드 하단 → "끝" 인식 | 불가 | 페이지네이션으로 명확 |
| 검색 응답성 (FID) | ~150ms | < 100ms |
| JS 번들 (랜딩) | 77KB | ~45KB (-40%) |
| 접근성 ARIA 커버리지 | 부분적 | live region + focus trap + label |
| BreadcrumbList | 없음 | 전 글 페이지 적용 |

---

## 8. 참조 문서

| 문서 | 설명 |
|------|------|
| [analysis-summary.md](./analysis-summary.md) | 종합 현황 분석 (문제 목록, 카테고리 초안) |
| [ux-ia-analysis.md](./ux-ia-analysis.md) | UX/정보설계 상세 (카테고리, 페이징, TOC, 검색) |
| [visual-design-analysis.md](./visual-design-analysis.md) | 비주얼 디자인 상세 (카드, 타이포, 컬러) |
| [performance-analysis.md](./performance-analysis.md) | 성능 상세 (번들, 런타임, CWV) |
| [responsive-analysis.md](./responsive-analysis.md) | 반응형 상세 (브레이크포인트, 레이아웃) |
| [a11y-seo-analysis.md](./a11y-seo-analysis.md) | 접근성/SEO 상세 (ARIA, 메타태그) |

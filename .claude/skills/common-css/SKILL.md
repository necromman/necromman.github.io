---
name: common-css
description: Use this skill when modifying or referencing the shared CSS design system (assets/editorial-base.css). Trigger when the user wants to change colors, typography, spacing, or shared component styles across all content pages. Also trigger when creating new content pages to understand which CSS is already provided by the base and what needs to be written as page-specific styles.
---

# Common CSS — 공통 디자인 시스템 (editorial-base.css)

모든 콘텐츠 페이지가 공유하는 CSS 디자인 시스템. `assets/editorial-base.css` 파일 하나를 수정하면 전체 콘텐츠에 일괄 반영된다.

## 파일 위치

```
assets/editorial-base.css
```

## HTML에서 로드하는 방법

폰트 preload → Pretendard CDN → editorial-base.css → 인라인 `<style>` 순서로 배치한다:

```html
<!-- 1. 본문 폰트 preload (셀프호스팅, CLS 제거용) -->
<link rel="preload" href="../../assets/fonts/source-serif-4-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<!-- 2. Pretendard CDN (변수 다이나믹 서브셋) -->
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<!-- 3. 공통 CSS (셀프호스팅 @font-face + 디자인 시스템) -->
<link rel="stylesheet" href="../../assets/editorial-base.css">
<style>
  /* 이 페이지 고유 스타일만 여기에 작성 */
</style>
```

경로 `../../`는 `content/[시리즈]/` 기준. 깊이가 다르면 상대경로를 조정한다.

## editorial-base.css에 포함된 항목

### 1. 변수 & 리셋

| 항목 | 설명 |
|------|------|
| `@font-face` 셀프호스팅 폰트 | Source Serif 4 (variable, woff2, `font-display: optional`), JetBrains Mono (variable, woff2, `font-display: optional`) |
| `@font-face` 메트릭 보정 폴백 | Source Serif 4 Fallback (Times New Roman 기반, fontpie 계산값), JetBrains Mono Fallback (Courier New 기반) |
| `:root` 변수 | `--bg`, `--fg`, `--muted`, `--accent`, `--rule`, `--card-bg`, `--prose`, `--secondary`, `--serif`, `--mono` |
| `*` 리셋 | margin, padding, box-sizing |
| `body` | 서체, 배경, 색상, line-height, antialiasing, font-variant-numeric |

### 2. 레이아웃

| 셀렉터 | 용도 |
|--------|------|
| `.page` | 콘텐츠 컨테이너 (max-width: 780px, 중앙 정렬) |

### 3. 타이포그래피 컴포넌트

| 셀렉터 | 용도 |
|--------|------|
| `.masthead` | 페이지 상단 헤더 영역 (제목, 서브타이틀) |
| `.masthead .issue` | 모노스페이스 라벨 (시리즈/이슈 번호) |
| `.masthead h1` | 메인 제목 (3.2rem, weight 400, strong은 accent) |
| `.masthead .deck` | 서브타이틀 (1.1rem, muted) |
| `.section-head` | 섹션 구분 헤더 |
| `.section-head .num` | 섹션 넘버 라벨 (모노스페이스, accent) |
| `.section-head h2` | 섹션 제목 (2rem, strong은 accent) |
| `.prose` | 본문 텍스트 블록 |

### 4. 공통 컴포넌트

| 셀렉터 | 용도 |
|--------|------|
| `.mechanism-row` / `.mechanism` | 3컬럼 그리드 카드 (라벨 + 제목 + 설명) |
| `.pull-quote` | 인용문 블록 (상하 border, 중앙 정렬) |
| `.technique` / `.technique-header` / `.t-body` | 번호 매긴 기법/항목 블록 |
| `.warning-box` / `.warning-list` | 경고/진단 박스 (카운터 리스트) |

### 5. 하단 영역

| 셀렉터 | 용도 |
|--------|------|
| `.closing` | 마무리 섹션 (큰 텍스트 + 서브) |
| `.footer` | 페이지 풋터 (모노스페이스 라벨) |

### 6. 반응형 & 프린트

| 미디어 쿼리 | 내용 |
|------------|------|
| `@media (max-width: 700px)` | 모바일 레이아웃 조정 (제목 축소, 그리드 1컬럼화) |
| `@media print` | 프린트용 배경색 제거 |

## 페이지별 인라인 `<style>` 작성 규칙

### 포함해야 할 것 (고유 스타일)

- 해당 페이지에서만 사용하는 컴포넌트 CSS (예: `.data-table`, `.versus-row`, `.flow`, `.timeline`)
- base에서 제공하는 스타일의 오버라이드 (예: `.masthead h1 { font-weight: 900; }`)
- 해당 페이지 전용 모바일 반응형 규칙

### 포함하지 않을 것 (base에 이미 있음)

- `:root` 변수 정의
- `*`, `body`, `.page` 리셋/레이아웃
- `.masthead` 기본 스타일 (오버라이드만 작성)
- `.section-head`, `.prose`, `.pull-quote`, `.mechanism-row`, `.technique`, `.warning-box`, `.closing`, `.footer`
- 공통 `@media` 반응형 규칙 (`.page`, `.masthead h1`, `.mechanism-row`, `.section-head h2`, `.pull-quote p`, `.closing .big`)
- `@media print`

### 오버라이드 예시

```css
/* so-what-now.html — masthead 스타일이 다를 때 */
.masthead h1 {
  font-weight: 900;
  line-height: 1.15;
  letter-spacing: -2px;
}
.masthead .deck {
  font-size: 1.05rem;
  max-width: 460px;
}
.closing .sub { max-width: 460px; }
```

## 랜딩 페이지 CSS (`assets/index.css`)

랜딩 페이지(`index.html`)는 `editorial-base.css` + `index.css` 두 파일을 로드한다.

- `editorial-base.css`에서 @font-face, `:root` 변수, 리셋, body 스타일을 상속받는다
- `index.css`에는 랜딩 페이지 고유 스타일만 정의한다 (`.container`, `.toolbar`, `.series-section`, `.article-item`, `.site-footer`, `.control-btn` 등)
- `.masthead` 스타일은 editorial-base.css와 겹치므로, index.css에서 차이나는 속성만 오버라이드한다
- **editorial-base.css의 변수를 변경하면 index.css에도 자동 반영된다** (변수 상속)

## 수정 시 주의사항

- **editorial-base.css를 수정하면 모든 콘텐츠 페이지에 영향을 준다.** 변경 전 전체 페이지에 미치는 영향을 고려한다.
- 색상 값을 변경할 때는 `:root` 변수만 수정한다. 하드코딩된 색상값을 직접 쓰지 않는다.
- **폰트는 셀프호스팅한다.** Google Fonts `@import`나 외부 `<link>`를 사용하지 않는다. 새 폰트를 추가하려면 `assets/fonts/`에 WOFF2 파일을 넣고 `@font-face`를 editorial-base.css에 선언한다.
- **폰트 메트릭 보정 폴백을 반드시 함께 선언한다.** `npx fontpie [font.woff2] --fallback serif` 또는 `--fallback mono`로 정확한 `size-adjust`, `ascent-override`, `descent-override` 값을 계산하여 CLS를 방지한다.
- 새 공통 컴포넌트를 추가할 때는 3개 이상의 페이지에서 동일하게 사용되는 경우에만 base에 넣는다. 1-2개 페이지에서만 쓰이면 인라인 `<style>`에 둔다.
- `nav.js`의 인라인 스타일(`border-bottom`, `background`, `sticky`)도 이 디자인 시스템의 변수 값을 사용한다. nav.js 수정 시 변수값과 동기화한다.

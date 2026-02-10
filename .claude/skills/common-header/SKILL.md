---
name: common-header
description: Use this skill when modifying the shared navigation header (assets/nav.js) or when adding the navigation to new content pages. Trigger when the user reports navigation issues, wants to change the header design, add new navigation links, or when creating new HTML content that needs the shared header. Also reference when debugging path/routing issues between pages.
---

# Common Header — 공통 네비게이션 (nav.js)

모든 콘텐츠 페이지 상단에 자동 삽입되는 공유 네비게이션 바. JavaScript로 DOM에 동적 삽입하여 HTML 파일마다 수동으로 헤더를 작성할 필요가 없다.

## 파일 위치

```
assets/nav.js
```

## HTML에서 로드하는 방법

`</head>` 직전에 `defer` 속성과 함께 추가한다:

```html
<script src="../../assets/nav.js" defer></script>
</head>
```

경로 `../../`는 `content/[시리즈]/` 기준. 깊이가 다르면 상대경로를 조정한다.

## 동작 원리

### 홈 URL 계산

nav.js는 자신의 `<script src>` 경로를 역산하여 프로젝트 루트를 찾는다:

```
src="../../assets/nav.js"
  → "../../assets/nav.js".replace("assets/nav.js", "")
  → basePath = "../../"
  → homeUrl = "../../index.html"
```

이 방식의 장점:
- **로컬 (file://)**: `../../index.html`로 정확한 상대경로 이동
- **배포 (GitHub Pages)**: `../../index.html`이 `/editorial/index.html`로 해석
- **깊이가 다른 페이지**: `src` 경로만 맞추면 자동으로 올바른 home URL 생성

### Fallback

`<script src>`에서 경로를 찾지 못할 경우 (동적 로드 등):
- URL에 `/editorial/`이 포함되면 → `/editorial/`을 base로 사용
- 그 외 → `/`를 base로 사용

### DOM 삽입

`<body>`의 첫 번째 자식 요소 앞에 `<nav id="site-nav">`을 삽입한다. `defer` 속성 덕분에 DOM이 파싱된 후 실행된다.

## 네비게이션 바 구성

```
┌─────────────────────────────────────────────────────────┐
│  Editorial                    [Dark]  ← 목록으로         │
└─────────────────────────────────────────────────────────┘
```

| 요소 | 동작 |
|------|------|
| **Editorial** (좌) | 홈(index.html)으로 이동. Source Serif 4, 0.95rem, weight 700 |
| **[Dark/Light]** (우) | 다크/라이트 테마 토글 버튼. 모노스페이스, 0.65rem |
| **← 목록으로** (우) | 홈(index.html)으로 이동. 0.8rem, muted 색상 |

## 스타일 규칙

nav.js는 `<style>` 태그를 `<head>`에 삽입하여 CSS 변수(`var(--*)`)를 사용한다. **하드코딩 색상값을 사용하지 않으므로** editorial-base.css의 변수를 변경하면 자동 반영되고, 다크모드도 자동 대응된다.

| 속성 | CSS 변수 |
|------|----------|
| `background` | `var(--bg)` |
| `border-bottom` | `var(--rule)` |
| `color` (← 목록으로) | `var(--muted)` |
| `color` (Editorial) | `var(--fg)` |
| `font-family` | `var(--serif)`, `var(--mono)` |
| `position` | `sticky` |
| `z-index` | `100` |

## 테마 토글 버튼

nav.js는 `.theme-toggle-btn` 클래스의 버튼을 자동 삽입한다. 실제 토글 로직은 `assets/theme-toggle.js`가 담당한다. theme-toggle.js는 `.theme-toggle-btn` 클래스를 가진 모든 버튼에 이벤트를 바인딩하고, 텍스트를 현재 테마에 따라 "Dark"/"Light"로 업데이트한다.

## 수정 시 체크리스트

- [ ] 로컬 환경(file://)에서 홈 링크가 정상 작동하는가
- [ ] 배포 환경(https://necromman.github.io/editorial/)에서 정상 작동하는가
- [ ] nav 바의 색상이 editorial-base.css의 변수 값과 일치하는가
- [ ] nav 바의 max-width가 `.page`와 동일한가
- [ ] `position: sticky; top: 0`으로 스크롤 시 고정되는가
- [ ] 페이지 콘텐츠 위에 nav가 정상적으로 표시되는가 (z-index)

## 새 콘텐츠 페이지 추가 시

1. `<script src="../../assets/nav.js" defer></script>`를 `</head>` 직전에 추가
2. `<script src="../../assets/theme-toggle.js" defer></script>`를 nav.js 뒤에 추가 (series-nav.js가 있으면 그 뒤에)
3. `src` 경로의 `../../`가 프로젝트 루트를 가리키는지 확인
4. 별도의 HTML 마크업이나 CSS 추가는 불필요 (nav.js가 자동 생성)

## 확장 시 고려사항

- 네비게이션에 링크를 추가하려면 nav.js의 `innerHTML` 부분을 수정한다
- 시리즈 간 이동(이전/다음 글)이 필요하면 nav.js에 data 속성 기반 로직을 추가할 수 있다
- 반응형 메뉴(햄버거)가 필요해지면 nav.js를 확장하되, 현재의 단순한 구조를 최대한 유지한다

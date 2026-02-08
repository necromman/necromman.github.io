---
name: series-nav
description: Use this skill when adding or modifying series article navigation (assets/series-nav.js). Trigger when adding new articles to an existing series, creating a new series, or when the user wants to change the prev/next navigation design at the bottom of content pages.
---

# Series Navigation — 시리즈 이전/다음 글 네비게이션 (series-nav.js)

콘텐츠 페이지 하단에 같은 시리즈의 이전 글/다음 글을 보여주는 네비게이션. JavaScript로 `.footer` 앞에 동적 삽입한다.

## 파일 위치

```
assets/series-nav.js
```

## HTML에서 로드하는 방법

nav.js 바로 다음에 `defer` 속성과 함께 추가한다:

```html
<script src="../../assets/nav.js" defer></script>
<script src="../../assets/series-nav.js" defer></script>
</head>
```

경로 `../../`는 `content/[시리즈]/` 기준. 깊이가 다르면 상대경로를 조정한다.

## 동작 원리

1. `SERIES` 객체에서 모든 시리즈 데이터를 관리한다
2. 현재 페이지의 URL pathname에서 파일명(slug)을 추출한다
3. SERIES 데이터에서 해당 slug가 속한 시리즈와 인덱스를 찾는다
4. 이전/다음 글이 있으면 링크를 생성하고, `.footer` 요소 앞에 `<nav id="series-nav">`를 삽입한다

## SERIES 데이터 구조

```javascript
var SERIES = {
  'wasted-life-series': {        // 시리즈 폴더명 (영문 슬러그)
    label: 'Series 01',           // 시리즈 번호 라벨
    title: '99%가 인생을 낭비하는 이유',  // 시리즈 한글 제목
    articles: [
      { slug: '99-percent-wasted-life-guide', title: '99퍼센트 인생낭비 적용가이드' },
      { slug: 'what-self-help-wont-tell-you', title: '자기계발이 말하지 않는 것' },
      // ...순서대로 추가
    ]
  }
};
```

**규칙:**
- `slug`는 `.html` 확장자 없이 파일명만 쓴다
- `articles` 배열의 순서가 곧 이전/다음 글의 순서다
- 첫 번째 글에는 이전 글이 없고, 마지막 글에는 다음 글이 없다
- 시리즈 키(`'wasted-life-series'`)는 `content/` 아래 폴더명과 일치시킨다

## 네비게이션 UI 구성

```
┌──────────────────────────────────────────────────┐
│  Series 01  99%가 인생을 낭비하는 이유             │
├────────────────────────┬─────────────────────────┤
│  ← 이전 글              │            다음 글 →    │
│  자기계발이 말하지 않는 것 │         변화의 조건      │
└────────────────────────┴─────────────────────────┘
```

| 요소 | 스타일 |
|------|--------|
| 시리즈 라벨 | JetBrains Mono, 0.6rem, letter-spacing 3px, accent 색상 |
| 시리즈 제목 | Source Serif 4, 0.85rem, muted 색상 |
| 방향 라벨 (← 이전 글 / 다음 글 →) | JetBrains Mono, 0.6rem, letter-spacing 2px, muted |
| 글 제목 | Source Serif 4, 0.95rem, weight 600, fg 색상 |
| 카드 배경 | bg 색상, hover 시 약간 어두운 배경 |
| 카드 간격 | 1px gap, rule 색상 배경으로 구분선 효과 |

## 스타일 값 동기화

nav.js와 마찬가지로 인라인 스타일을 사용한다. editorial-base.css의 변수 값이 변경되면 series-nav.js도 함께 수정해야 한다:

| 인라인 값 | 대응 CSS 변수 |
|-----------|--------------|
| `#faf8f4` | `--bg` |
| `#f2efe9` | hover 배경 (bg보다 약간 어두운 톤) |
| `#1a1a18` | `--fg` |
| `#8a8680` | `--muted` |
| `#c43e2a` | `--accent` |
| `#d5d0c8` | `--rule` |

## 새 글 추가 시

1. `series-nav.js`의 `SERIES` 객체에서 해당 시리즈의 `articles` 배열에 새 항목 추가
2. `assets/content-data.js`의 해당 시리즈 `articles` 배열에도 새 항목 추가 (랜딩 페이지 반영)
3. 새 HTML 파일에 `<script src="../../assets/series-nav.js" defer></script>` 추가
4. HTML에 `.footer` 요소가 있는지 확인 (series-nav는 `.footer` 앞에 삽입된다)

## 새 시리즈 추가 시

1. `SERIES` 객체에 새 시리즈 키를 추가한다:
```javascript
'new-series-slug': {
  label: 'Series 02',
  title: '시리즈 한글 제목',
  articles: [
    { slug: 'first-article', title: '첫 번째 글 제목' },
    // ...
  ]
}
```
2. `assets/content-data.js`에도 새 시리즈 객체를 추가한다 (랜딩 페이지 반영)
3. 시리즈 키는 `content/` 아래 폴더명과 일치시킨다
4. `label`은 `Series 02`, `Series 03` 순으로 넘버링한다

## 수정 시 체크리스트

- [ ] SERIES 데이터의 slug가 실제 파일명과 일치하는가
- [ ] articles 배열 순서가 원하는 이전/다음 순서인가
- [ ] 인라인 스타일 색상 값이 editorial-base.css 변수와 동기화되어 있는가
- [ ] `.footer` 요소가 HTML에 존재하는가 (삽입 대상)
- [ ] 로컬/배포 환경 모두에서 링크가 정상 작동하는가 (상대경로 slug.html)

## 의존성

- `.footer` 요소가 DOM에 있어야 한다 (삽입 위치)
- `defer` 속성으로 DOM 파싱 후 실행되어야 한다
- nav.js와 독립적으로 동작한다 (의존 관계 없음)

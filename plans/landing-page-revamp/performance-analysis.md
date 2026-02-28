# 성능 최적화 상세 분석

> 분석일: 2026-02-28

---

## 1. 번들 크기

### JavaScript

| 파일 | 크기 | Gzip 추정 | 로딩 대상 | 비고 |
|------|------|----------|----------|------|
| content-data.js | **68KB** | 21KB | 랜딩 페이지만 | 38개 시리즈 전체 메타데이터 인라인 |
| series-nav.js | **20KB** | 6.7KB | 모든 글 페이지 (150+) | CSS 6KB가 JS 문자열로 포함 |
| index-app.js | 17KB | 4.6KB | 랜딩 페이지만 | 페이징, 검색, 정렬, TOC |
| nav.js | 2.9KB | — | 모든 글 페이지 | 간결, 문제 없음 |
| theme-toggle.js | 2KB | — | 모든 페이지 | 간결, head에서 즉시 실행 |
| **합계** | **110KB** | — | — | — |

### CSS

| 파일 | 크기 | Gzip 추정 | 비고 |
|------|------|----------|------|
| editorial-base.css | 8.8KB | 2.6KB | 공통 디자인 시스템 |
| index.css | 12KB | 3KB | 랜딩 페이지 그리드/카드 |
| **합계** | **20.8KB** | 5.6KB | 최소화 미적용 상태 |

### 폰트

| 폰트 | 크기 | 로딩 전략 |
|------|------|----------|
| Source Serif 4 (WOFF2) | ~50KB | preload + font-display: swap |
| JetBrains Mono (WOFF2) | ~40KB | preload + font-display: swap |
| Pretendard (CDN) | 가변 | preload + onload 비동기 |

---

## 2. 핵심 병목

### 2.1 content-data.js (68KB) — 치명적

**문제**: 38개 시리즈 × 150+ 글의 전체 메타데이터가 JS 번들에 하드코딩

**구조**:
```javascript
var data = [
  { id: '...', title: '...', description: '...', articles: [
    { title: '...', role: '...', tag: '...', href: '...', search: '...(길다)...' },
    // ...
  ]},
  // × 38개
];
```

**search 필드가 주 용량 차지**: 각 글의 검색 텍스트가 수백 자

**개선안**:
1. **JSON 분리**: `content-data.js` → `data/content.json` + `fetch()` 비동기 로드
2. **검색 인덱스 분리**: `search` 필드만 별도 파일로 lazy load
3. **SSR 활용**: 11ty 빌드 시 카드 HTML을 사전 생성 (이미 부분 적용 중)

**예상 절감**: 랜딩 JS 번들 77KB → 30KB (61% 감소)

### 2.2 series-nav.js CSS 인라인 (6KB) — 높음

**문제**: 라인 376~388에서 CSS를 JS 문자열로 관리

```javascript
var css = `
  .series-nav-container { ... }
  .series-nav-btn { ... }
  /* ~20줄의 CSS */
`;
var style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);
```

**개선안**: `assets/series-nav.css`로 분리 → `article.njk`에서 `<link>` 로드

**예상 절감**: series-nav.js 20KB → 14KB (30%)

### 2.3 검색 debounce 없음 — 높음

**현재**: 매 `input` 이벤트마다 150+ 카드의 `data-search` 속성 읽기 + `style.display` 토글

**개선안**:
```javascript
var debounceTimer;
searchInput.addEventListener('input', function() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(handleSearch, 250);
});
```

---

## 3. 런타임 성능

### 3.1 양호한 부분

| 항목 | 구현 | 평가 |
|------|------|------|
| 스크롤 추적 | requestAnimationFrame | 60fps 안정 |
| 무한 스크롤 | IntersectionObserver + rootMargin 200px | 효율적 |
| 렌더링 격리 | contain: layout style paint | CWV 최적화 |
| 뷰포트 밖 건너뛰기 | content-visibility: auto | LCP 개선 |
| 메모리 | IIFE 스코프, 전역 오염 없음 | 누수 위험 낮음 |

### 3.2 개선 필요

| 항목 | 문제 | 개선안 |
|------|------|--------|
| TOC 활성화 | 매번 모든 TOC 항목 순회 → classList.remove('active') | 이전 active item 변수 추적, 2개만 업데이트 |
| 검색 | O(n) 카드 순회 (150+), debounce 없음 | debounce 250ms, classList 토글 |
| 모바일 TOC | `void tocOverlay.offsetWidth` 강제 reflow | 대안: `getComputedStyle` 검토 |

---

## 4. 이미지 최적화

### OG 이미지

| 항목 | 현황 |
|------|------|
| 총 수량 | ~137개 |
| 총 용량 | 2.2MB |
| 형식 | PNG |
| 생성 | `scripts/generate-og.mjs` (Satori) |

**개선안**: PNG → WebP 변환 시 ~50% 절감 (2.2MB → 1.1MB)

### 콘텐츠 이미지

- 글 내부에 `<img>` 거의 없음 (텍스트 중심 에디토리얼)
- lazy loading 현재 불필요, 향후 이미지 추가 시 고려

---

## 5. 캐싱 & 빌드

### HTTP 캐싱

| 자산 | 현재 | 권장 |
|------|------|------|
| HTML | GitHub Pages 기본 | 유지 |
| JS/CSS | 파일명 해시 없음 | asset hash plugin 도입 |
| 폰트 | WOFF2 | immutable 취급 가능 |
| OG 이미지 | 빌드 시 재생성 | 변경분만 커밋 |

### 빌드 최적화

| 항목 | 현황 | 개선 |
|------|------|------|
| CSS 최소화 | 미설정 | cssnano 추가 (15% 절감) |
| JS 최소화 | 미설정 | terser 추가 |
| 증분 빌드 | 11ty 기본 | 양호 |
| OG 이미지 | 전체 재생성 가능 | 변경분만 생성으로 개선 |

---

## 6. Core Web Vitals 추정

| 메트릭 | 현재 추정 | 목표 | 주요 영향 요소 |
|--------|----------|------|---------------|
| LCP | ~2.5s | < 2.5s | 폰트 preload (이미 적용), content-data.js 크기 |
| FID | ~100ms | < 100ms | 검색 debounce 부재, 150개 카드 순회 |
| CLS | ~0.05 | < 0.1 | fontpie 메트릭 보정으로 거의 0 |
| INP | — | < 200ms | 카드 클릭 응답성 양호 |

### 개선 후 예상

| 메트릭 | 현재 | 개선 후 |
|--------|------|---------|
| JS 번들 (랜딩) | 77KB | ~30KB (-61%) |
| JS 번들 (글) | 24KB | ~18KB (-25%) |
| 초기 로드 | ~3.0s | ~2.2s (-27%) |
| LCP | ~2.5s | ~2.0s (-20%) |
| FID (검색) | ~150ms | ~80ms (-47%) |

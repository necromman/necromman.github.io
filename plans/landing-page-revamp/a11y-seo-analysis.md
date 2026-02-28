# 접근성 & SEO 상세 분석

> 분석일: 2026-02-28

---

## 1. 접근성 (WCAG 2.1 AA)

### 1.1 시맨틱 HTML — 양호

| 항목 | 상태 | 비고 |
|------|------|------|
| `<article>`, `<header>`, `<main>` | 사용 중 | 적절 |
| `<nav>` | nav.js에서 생성 | `aria-label` 미부여 |
| heading 계층 | h1 단일 사용 강제 | 양호 |
| landmark roles | 부분적 | TOC에 `role="complementary"` 없음 |

**개선 필요**:
```html
<nav id="site-nav" aria-label="메인 네비게이션">
<aside class="toc-sidebar" role="complementary" aria-label="목차">
```

### 1.2 ARIA 속성 — 부족

| 요소 | 현재 | 필요 |
|------|------|------|
| 테마 토글 | `aria-label` 있음 | 유지 |
| 검색 입력 | `aria-label` 없음 | 추가: `aria-label="시리즈 검색"` |
| 정렬 버튼 | `aria-label` 없음 | 추가: `aria-label` + `aria-pressed` |
| 검색 결과 수 | `aria-live` 없음 | 추가: `aria-live="polite"` |
| TOC 활성 항목 | `.active` 클래스만 | 추가: `aria-current="true"` |
| 페이지 진행 | 시각적 표시만 | 추가: `aria-live="polite"` |

### 1.3 키보드 네비게이션 — 부분적

| 항목 | 상태 |
|------|------|
| 모든 인터랙티브 요소에 focus 도달 | 가능 |
| focus-visible 스타일 | 브라우저 기본값 |
| 모바일 TOC 포커스 트랩 | **미구현** |
| Escape 키로 모달 닫기 | **미구현** |
| 검색 후 포커스 관리 | **미구현** |

**개선안: 포커스 트랩 + Escape 닫기**

```javascript
function openMobileToc() {
  // ... 기존 코드 ...

  var focusable = tocSidebar.querySelectorAll(
    'button, [href], input, [tabindex]:not([tabindex="-1"])'
  );
  var first = focusable[0];
  var last = focusable[focusable.length - 1];

  tocSidebar.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closeMobileToc(); return; }
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });

  first.focus();
}

function closeMobileToc() {
  // ... 기존 코드 ...
  tocToggle.focus();  // 포커스 복귀
}
```

### 1.4 색상 대비 — 양호

| 조합 | 대비 | WCAG |
|------|------|------|
| fg(#1a1a18) vs bg(#faf8f4) | 20:1+ | AAA |
| prose(#3a3a36) vs bg | AAA | |
| accent(#c43e2a) vs bg | AA | |
| muted(#8a8680) vs bg | ~4.5:1 | AA 경계선 |

**주의**: `--muted` + 작은 텍스트(0.6rem 이하) 조합은 WCAG AA 미충족 가능

### 1.5 ARIA Live Region 추가안

```javascript
// 화면에 보이지 않는 상태 알림 영역
function createLiveRegion() {
  var el = document.createElement('div');
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  el.setAttribute('aria-atomic', 'true');
  el.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden';
  document.body.appendChild(el);
  return el;
}

var announcer = createLiveRegion();

function announce(msg) { announcer.textContent = msg; }

// 사용 예
// 검색 완료 시: announce('23개 결과');
// 페이지 변경 시: announce('2페이지, 10/38 시리즈');
// 정렬 변경 시: announce('최신순으로 정렬됨');
```

---

## 2. SEO

### 2.1 메타 태그 — 탁월 (100%)

```html
<!-- article.njk 자동 생성 -->
<title>{{ pageTitle }} — Editorial</title>
<meta name="description" content="{{ description }}">
<link rel="canonical" href="{{ canonicalUrl }}">
<meta property="og:type" content="article">
<meta property="og:title" content="{{ pageTitle }}">
<meta property="og:description" content="{{ description }}">
<meta property="og:image" content="{{ ogImage }}">
<meta property="og:locale" content="ko_KR">
<meta property="article:published_time" content="{{ datePublished }}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ pageTitle }}">
```

### 2.2 구조화 데이터 — 양호, 개선 가능

**현재 구현**:
- 랜딩: `WebSite` 스키마
- 글: `Article` 스키마 (완전)

**미구현**:
- **BreadcrumbList**: 시리즈 → 글 계층 명시 → Google SERP breadcrumb 표시

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://necromman.github.io/" },
    { "@type": "ListItem", "position": 2, "name": "시리즈명" },
    { "@type": "ListItem", "position": 3, "name": "글 제목", "item": "canonical_url" }
  ]
}
```

### 2.3 sitemap.xml — 양호

- 38개 시리즈 + 150+ 글 모두 포함
- `lastmod` 날짜 정확
- `changefreq: monthly`, `priority: 0.8` 일관
- 랜딩 `priority: 1.0`

**개선 가능**: 최신 콘텐츠 priority 0.9, 오래된 콘텐츠 0.7 차등 적용

### 2.4 콘텐츠 인덱싱 — 탁월

- SSG (11ty) → 모든 콘텐츠가 사전 렌더링된 HTML
- 크롤러가 JS 없이 전체 콘텐츠 접근 가능
- robots.txt: 전체 허용 + sitemap 명시

### 2.5 내부 링크 — 개선 가능

**현재**:
- 시리즈 이전/다음 네비게이션 있음
- 관련 글 추천 없음
- 시리즈별 인덱스 페이지 없음

**개선안**:
1. 글 하단에 "같은 시리즈의 다른 글" 링크 추가
2. 시리즈별 인덱스 페이지 생성 (선택)
3. 관련 카테고리 글 추천 (선택)

---

## 3. 한글 특화

### 3.1 lang 속성 — 완벽

```html
<html lang="ko">
```

### 3.2 폰트 로딩 — 개선 필요

| 폰트 | 방식 | 문제 |
|------|------|------|
| Source Serif 4 | 자체호스팅 WOFF2 | 없음 |
| JetBrains Mono | 자체호스팅 WOFF2 | 없음 |
| **Pretendard** | **CDN (jsDelivr)** | **외부 의존** |

**Pretendard CDN 의존 문제**:
- CDN 장애 시 한글 렌더링 불안정
- DNS 조회 + 연결 지연 추가
- 현재 `preconnect` 미설정

**개선안 (3가지)**:
1. **자체호스팅** (권장): Pretendard subset 다운로드 → `/assets/fonts/`
2. **preconnect 추가** (단기): `<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>`
3. **시스템 폰트 폴백** (대안): `-apple-system, 'Segoe UI', sans-serif`

### 3.3 Naver 검색 최적화

- `naver-site-verification` 메타 태그: 확인 필요
- 한글 `<title>`, `<meta description>`: 모든 페이지 적용 완료

---

## 4. 종합 개선 우선순위

### 즉시 (P0)

| 항목 | 작업 시간 |
|------|----------|
| ARIA live region (검색 결과, 페이지 상태) | 1시간 |
| 검색 입력 `aria-label` 추가 | 10분 |
| 정렬 버튼 `aria-label` + `aria-pressed` | 10분 |
| 네비게이션 `aria-label` | 10분 |

### 단기 (P1)

| 항목 | 작업 시간 |
|------|----------|
| 모바일 TOC 포커스 트랩 + Escape 닫기 | 2시간 |
| BreadcrumbList JSON-LD (article.njk) | 1시간 |
| Pretendard preconnect 추가 | 10분 |

### 중기 (P2)

| 항목 | 작업 시간 |
|------|----------|
| Pretendard 자체호스팅 전환 | 3시간 |
| 글 하단 "같은 시리즈" 관련 링크 | 2시간 |
| sitemap priority 차등 적용 | 30분 |
| focus-visible 커스텀 스타일 | 30분 |

# 반응형 레이아웃 상세 분석

> 분석일: 2026-02-28

---

## 1. 브레이크포인트 체계

### 현재 사용 중 (4개)

| 브레이크포인트 | 파일 | 변화 |
|---------------|------|------|
| 1200px | index.css | 사이드바 숨김, 모바일 TOC 토글 표시 |
| 900px | index.css | 카드 그리드 3열 → 2열 |
| 700px | editorial-base.css + 콘텐츠 인라인 | 글 페이지 모바일 전환, 폰트 축소 |
| 600px | index.css | 카드 그리드 2열 → 1열, 모바일 세밀 조정 |

### 문제점

1. **분산 관리**: 1200px이 index.css에서만 정의, editorial-base.css에는 700px만
2. **태블릿 구간 미흡**: 700~900px 사이에 세밀한 규칙 부족
3. **콘텐츠 인라인 CSS**: 각 글마다 700px 미디어쿼리를 개별 정의 (중복)
4. **고정값 점프**: 3.2rem → 2.2rem 급변 (clamp 미사용)

### 개선안: 통합 브레이크포인트

| 단계 | 현재 | 권장 | 대상 기기 |
|------|------|------|----------|
| XL | — | 1280px | 대형 모니터 |
| LG | 1200px | 1024px | 노트북/소형 데스크탑 |
| MD | 900px | 768px | 태블릿 세로 |
| SM | 600px | 640px | 모바일 가로 |
| XS | — | 480px | 소형 모바일 (iPhone SE) |

---

## 2. 랜딩 페이지 레이아웃

### 데스크탑 (1200px+)

```css
.main-layout {
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 40px;
}
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}
```

### 태블릿 (< 1200px)

```css
.main-layout {
  grid-template-columns: 1fr;  /* 사이드바 제거 */
  gap: 0;
}
.toc-sidebar { display: none; }
.toc-mobile-toggle { display: block; }
```

**문제**: 1200px에서 사이드바가 갑자기 사라짐 → 250px 급격한 폭 변화

### 900px

```css
.card-grid {
  grid-template-columns: repeat(2, 1fr);  /* 3열 → 2열 */
  gap: 24px;
}
```

### 모바일 (< 600px)

```css
.card-grid {
  grid-template-columns: 1fr;  /* 1열 */
  gap: 16px;
}
.article-card:hover { transform: none; }  /* 호버 비활성 */
.container { padding: 48px 20px 80px; }
```

---

## 3. 글 페이지 레이아웃

### 기본

```css
.page {
  max-width: 780px;
  margin: 0 auto;
  padding: 80px 40px 100px;
}
```

### 모바일 (< 700px)

```css
.page { padding: 48px 24px 60px; }
.masthead h1 { font-size: 2.2rem; }  /* 3.2rem → 2.2rem */
.section-head h2 { font-size: 1.5rem; }  /* 2rem → 1.5rem */
.pull-quote p { font-size: 1.2rem; }  /* 1.5rem → 1.2rem */
```

**문제**: 700px 이하 단 하나의 규칙만 정의. 600px, 480px 구간 무시.

---

## 4. 모바일 TOC 드로어

### 구현

```css
.toc-sidebar.mobile-open {
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: 280px;
  transform: translateX(0);
  transition: transform 0.3s ease;
}
@media (max-width: 600px) {
  .toc-sidebar.mobile-open {
    width: 260px;   /* 280px → 260px */
    padding: 20px 16px;
  }
}
```

### 문제점

- body overflow 'clip' → 스크롤바 너비만큼 레이아웃 시프트 (CLS)
- 포커스 트랩 미구현
- iPhone SE(375px)에서 260px 드로어 → 남은 115px이 오버레이 영역으로 충분

### 개선안

```javascript
function openMobileToc() {
  var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = scrollbarWidth + 'px';
  // + 포커스 트랩 설정
}
function closeMobileToc() {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  // + 포커스 복귀
}
```

---

## 5. 타이포그래피 반응형

### 현재: 고정값 점프

```css
/* 데스크탑 */
.masthead h1 { font-size: 3.2rem; }

/* 모바일 (< 700px) */
.masthead h1 { font-size: 2.2rem; }

/* 700px → 699px에서 31% 급변 */
```

### 개선안: fluid typography

```css
.masthead h1 { font-size: clamp(2.2rem, 5vw, 3.2rem); }
.section-head h2 { font-size: clamp(1.5rem, 3vw, 2rem); }
.pull-quote p { font-size: clamp(1.2rem, 2.5vw, 1.5rem); }
.closing h2 { font-size: clamp(1.6rem, 3.5vw, 2.2rem); }
```

---

## 6. 코드블록 & 테이블 반응형

### 코드블록

```css
/* 현재: 모바일 축소 규칙 없음 */
.terminal { font-size: 0.82rem; overflow-x: auto; }

/* 개선안 */
@media (max-width: 600px) {
  .terminal,
  pre code { font-size: 0.75rem; }
}
```

### 테이블

```css
/* 현재: 부분적 처리 */
@media (max-width: 700px) {
  .data-table { font-size: 0.82rem; }
  .data-table th, .data-table td { padding: 8px 10px; }
}
```

---

## 7. 네비게이션 반응형

### 헤더 (nav.js)

```css
#site-nav .nav-inner {
  max-width: 780px;
  padding: 12px 24px;
  display: flex;
  justify-content: space-between;
}
```

- CSS 미디어쿼리 없음 (글 페이지 전용)
- flex 기반이라 자동 축소됨
- 문제 없음

### 시리즈 이전/다음 (series-nav.js)

- 반응형 처리 미정의
- CSS가 JS에 인라인되어 있어 수정 복잡
- → CSS 외부화 후 반응형 규칙 추가 필요

---

## 8. 종합 개선 우선순위

| 우선순위 | 항목 | 예상 효과 |
|---------|------|----------|
| 높음 | fluid typography (clamp) 도입 | 폰트 크기 급변 제거 |
| 높음 | 모바일 TOC CLS 보정 | CLS 0.05 → 0 |
| 중간 | 브레이크포인트 통합 정리 | 유지보수성 향상 |
| 중간 | 코드블록 모바일 폰트 축소 | 모바일 가독성 향상 |
| 낮음 | 태블릿 구간 세밀 조정 | 태블릿 사용자 경험 향상 |

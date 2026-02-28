# UX / 정보설계 상세 분석

> 분석일: 2026-02-28

---

## 1. 카테고리 시스템 현황

### 문제

- `content-data.js`에 `category` 필드가 없음
- 38개 시리즈가 등록 순서(배열 인덱스)로만 구분
- 사용자가 "기술 글"과 "소설"을 구분할 방법이 없음
- 초방문자의 콘텐츠 발견 경로: 검색 or 무한 스크롤뿐

### content-data.js 현재 구조

```javascript
var data = [
  {
    id: 'wasted-life',
    title: '99%가 인생을 낭비하는 이유',
    description: '...',
    articles: [
      {
        title: '99퍼센트 인생낭비 적용가이드',
        role: '유튜브 스크립트를 에디토리얼로 재구성',
        tag: '원본 정리',
        href: 'content/wasted-life-series/99-percent-wasted-life-guide.html',
        search: '[검색용 키워드들]'
      },
      // ...
    ]
  },
  // ... 38개
];
```

### 개선 방향

```javascript
// category 필드 추가
var CATEGORIES = {
  tech:     { label: '기술 & 개발',    count: 11 },
  analysis: { label: '분석 & 팩트체크', count: 10 },
  fiction:  { label: '소설 & 창작',    count: 12 },
  career:   { label: '업무 & 커리어',  count: 5  }
};

var data = [
  {
    id: 'wasted-life',
    title: '99%가 인생을 낭비하는 이유',
    description: '...',
    category: 'analysis',  // ← 새 필드
    articles: [...]
  },
  // ...
];
```

### 카테고리 필터 UI 권장안: 탭 바

```
[전체] [기술 & 개발] [분석 & 팩트체크] [소설 & 창작] [업무 & 커리어]
```

- 스크린 상단 검색 바 아래 배치
- 모바일에서 수평 스크롤 가능 (`overflow-x: auto`)
- 활성 탭에 accent 색상 적용

---

## 2. 페이징 현황

### 현재: 무한 스크롤

```javascript
// index-app.js
var PAGE_SIZE = 5;  // 시리즈 단위 (글 단위 아님)

// IntersectionObserver로 sentinel 감시
scrollObserver = new IntersectionObserver(function(entries) {
  if (isSearching) return;
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].isIntersecting && currentPage < totalPages) {
      currentPage++;
      applyPagination();
    }
  }
}, { rootMargin: '200px' });
```

### 문제점

| 문제 | 영향 |
|------|------|
| "페이지의 끝"을 알 수 없음 | 사용자 진행감 부재 |
| URL에 상태 미반영 | 북마크 불가, 뒤로가기 시 상태 유실 |
| 페이지 정보 0.6rem으로 미약 | "현재 위치" 인식 불가 |
| 검색 중 페이징 비활성 | 검색 결과가 많을 때 전체 노출 |

### 개선 방향: 전통 페이지네이션

```
┌─────────────────────────────────────────────┐
│ (콘텐츠 영역)                                │
├─────────────────────────────────────────────┤
│    ◀  1  2  3  4  5  ...  8  ▶              │
│              12 / 38 시리즈                  │
└─────────────────────────────────────────────┘
```

- PAGE_SIZE=5 유지 (5 시리즈 × 평균 3.5편 = ~17개 글/페이지)
- URL 상태: `?page=2&category=tech`
- `history.replaceState`로 브라우저 뒤로가기 대응
- 페이지 전환 시 `window.scrollTo({ top: 0, behavior: 'smooth' })`

---

## 3. TOC / 사이드바 현황

### 현재 구조

- 데스크탑(1200px+): 우측 고정 사이드바 220px
- 모바일(< 1200px): 햄버거 → 드로어 슬라이드
- 38개 항목 일렬 나열, 카테고리 그룹 없음
- 스크롤 추적으로 현재 시리즈 `.active` 표시
- TOC에서 클릭 시 해당 시리즈까지 페이지 로드 (`loadUpToSeries`)

### 문제점

- 38개 항목이 스크롤 피로 유발
- 시리즈 설명(description) 미표시
- 카테고리 그룹화 없음 → 전체 목록 파악 어려움
- 모바일 드로어 열 때 포커스 트랩 없음

### 개선 방향: 카테고리 계층화

```html
<details class="toc-category" open>
  <summary>기술 & 개발 <span class="toc-count">(11)</span></summary>
  <div class="toc-items">
    <a class="toc-item" title="AI 코딩 도구 비교 및 프롬프트 기법">01 바이브 코딩</a>
    <a class="toc-item" title="주니어 개발자를 위한 Git 명령어 가이드">02 Git 생존기</a>
    <!-- ... -->
  </div>
</details>
<details class="toc-category">
  <summary>분석 & 팩트체크 <span class="toc-count">(10)</span></summary>
  <!-- ... -->
</details>
```

- `<details>`/`<summary>`로 네이티브 접기/펴기
- 현재 active 시리즈가 속한 카테고리는 자동 펼침
- 각 항목에 `title` 속성으로 설명 tooltip 제공

---

## 4. 검색 현황

### 현재 구현

```javascript
// index-app.js
function applySearch(query) {
  // 모든 카드의 data-search + 제목 + role을 순회
  // substring 매칭으로 display:none 토글
  // 일치하지 않는 시리즈 divider도 숨김
  // 검색 중 페이징 비활성 (모든 결과 표시)
  // 검색 중 정렬 비활성
}
```

### 문제점

| 문제 | 영향 |
|------|------|
| 단순 substring 매칭 | "AI" 검색 시 "AI가", "회사AI" 모두 noise |
| 검색 중 정렬 불가 | 최신 결과부터 보기 불가 |
| relevance 순서 없음 | DOM 순서 그대로 표시 |
| 카테고리 필터와 분리 | "기술 + AI" 조합 검색 불가 |
| debounce 없음 | 매 입력마다 150개 카드 순회 |

### 개선 방향

1. **검색 + 카테고리 필터 통합**: AND 조건 결합
2. **검색 중 정렬 활성화**: 검색 결과도 최신순/오래된순 정렬
3. **debounce 250ms**: 입력 안정 후 검색 실행
4. **검색 결과 수 표시**: `aria-live="polite"` 라이브 리전으로 알림

---

## 5. 카테고리 + 페이징 + 검색 상호작용 설계

### 상태 모델

```
URL: ?category=tech&page=2&q=AI

상태 변수:
  currentCategory = 'tech'   // null이면 전체
  currentPage = 2
  searchQuery = 'AI'         // 빈 문자열이면 비활성
```

### 상호작용 규칙

| 동작 | 결과 |
|------|------|
| 카테고리 탭 클릭 | page → 1, 해당 카테고리 필터 적용, URL 갱신 |
| 페이지 번호 클릭 | 해당 페이지로 이동, 카테고리/검색 유지 |
| 검색 입력 | page → 1, 카테고리 유지, 결과 필터링 |
| 검색 지우기 | page → 1, 카테고리 유지, 전체 표시 |
| 정렬 토글 | page 유지, 카테고리/검색 유지, DOM 재정렬 |
| 브라우저 뒤로가기 | popstate 이벤트로 이전 상태 복원 |

### 페이지 수 계산

```javascript
function calculateTotalPages() {
  var filteredSeries = seriesGroups;

  // 카테고리 필터
  if (currentCategory) {
    filteredSeries = filteredSeries.filter(function(g) {
      return g.category === currentCategory;
    });
  }

  // 검색 필터
  if (searchQuery) {
    filteredSeries = filteredSeries.filter(function(g) {
      return matchesSearch(g, searchQuery);
    });
  }

  return Math.ceil(filteredSeries.length / PAGE_SIZE);
}
```

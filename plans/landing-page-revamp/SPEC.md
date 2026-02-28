# SPEC: 랜딩 페이지 개편 — 구현 명세

> 작성일: 2026-02-28
> 근거: [PRD.md](./PRD.md) | 상태: Draft — 승인 후 구현 착수

---

## 목차

1. [수정 대상 파일 매트릭스](#1-수정-대상-파일-매트릭스)
2. [Phase A: 카테고리 + 페이지네이션](#2-phase-a-카테고리--페이지네이션)
3. [Phase B: 검색 + 디자인 + 성능](#3-phase-b-검색--디자인--성능)
4. [Phase C: 반응형 + 접근성 + SEO](#4-phase-c-반응형--접근성--seo)
5. [Phase D: 검증 + 배포](#5-phase-d-검증--배포)

---

## 1. 수정 대상 파일 매트릭스

| # | 파일 | Phase | 변경 유형 |
|---|------|-------|----------|
| 1 | `assets/content-data.js` | A, B | 수정 |
| 2 | `assets/index-app.js` | A, B, C | 대규모 수정 |
| 3 | `assets/index.css` | A, B, C | 대규모 수정 |
| 4 | `assets/editorial-base.css` | B, C | 수정 |
| 5 | `assets/series-nav.js` | B | 수정 (CSS 제거) |
| 6 | `assets/series-nav.css` | B | **신규 생성** |
| 7 | `assets/nav.js` | C | 수정 |
| 8 | `index.html` | A | 수정 (Nunjucks 템플릿) |
| 9 | `_includes/layouts/landing.njk` | B | 수정 |
| 10 | `_includes/layouts/article.njk` | B, C | 수정 |

---

## 2. Phase A: 카테고리 + 페이지네이션

> 핵심 기능. 이 Phase 없이 나머지는 의미 없음.

### A-1. content-data.js — CATEGORIES 정의 + category 필드 추가

**현재 구조** (line 7~):
```javascript
(function () {
  var data = [
    { id: 'wasted-life', title: '...', description: '...', articles: [...] },
    // × 38개
  ];
```

**변경**: data 배열 위에 CATEGORIES 객체 추가, 각 시리즈에 category 필드 추가

```javascript
(function () {
  var CATEGORIES = {
    tech:     { label: '기술 & 개발' },
    analysis: { label: '분석 & 팩트체크' },
    fiction:  { label: '소설 & 창작' },
    career:   { label: '업무 & 커리어' }
  };

  var data = [
    { id: 'wasted-life', category: 'analysis', title: '...', ... },
    { id: 'bithumb-60t', category: 'analysis', title: '...', ... },
    // ...
  ];
```

**카테고리 매핑 (38개 전체)**:

| category | 시리즈 id 목록 |
|----------|--------------|
| `tech` (11) | vibe-coding, claude-code-guide, git-survival, gitlab-migration, server-infra-guide, ai-server-setup, openclaw, why-react, code-last, mcp-agent-guide, qwen-for-humans |
| `analysis` (10) | wasted-life, bithumb-60t, dev-survival, lineage-classic, claude-cowork, vibe-design, ufo-physics, diligence-paradox, ai-job-debate, youtube-outage |
| `fiction` (12) | sovereign-ai-novel, masterkey, ai-withdrawal, illusion-of-knowing, starcraft-timeslip, vow-system, voice-phishing, modern-mukhyang, seventh-seat, overlap, debug-mode, one-punch-reason |
| `career` (5) | future-cashcow, robot-coworker, toss-reality, agent-boss, innobiz-guide |

**CATEGORIES 및 data의 window 노출** (11ty 빌드 시 템플릿에서 접근 필요):

```javascript
  // IIFE 끝부분 — 기존 window.contentData 노출 패턴 유지
  window.contentData = data;
  window.CATEGORIES = CATEGORIES;
})();
```

### A-2. index.html — 카테고리 탭 마크업 + data-category 속성 + 페이지네이션 마크업

**현재 구조** (line 17~27):
```html
<div class="toolbar">
  <input ... id="searchInput" ...>
  <div class="toolbar-meta">
    <span class="search-count" id="searchCount"></span>
    <div class="controls">
      <button ... id="sortBtn"></button>
    </div>
  </div>
</div>
<div id="noResults" ...>검색 결과가 없습니다</div>
```

#### A-2a. 카테고리 탭 삽입

toolbar와 noResults 사이에 카테고리 탭 바 삽입:

```html
  </div><!-- .toolbar 끝 -->

  <div class="category-tabs" id="categoryTabs" role="tablist" aria-label="카테고리 필터">
    <button class="category-tab active" data-category="" role="tab" aria-selected="true">전체</button>
    <button class="category-tab" data-category="tech" role="tab" aria-selected="false">기술 &amp; 개발</button>
    <button class="category-tab" data-category="analysis" role="tab" aria-selected="false">분석 &amp; 팩트체크</button>
    <button class="category-tab" data-category="fiction" role="tab" aria-selected="false">소설 &amp; 창작</button>
    <button class="category-tab" data-category="career" role="tab" aria-selected="false">업무 &amp; 커리어</button>
  </div>

  <div id="noResults" ...>
```

> **참고**: 카테고리 탭은 JS 데이터가 아닌 SSR HTML로 직접 렌더링한다. CATEGORIES 객체와 동기화는 수동 관리. 카테고리 추가/변경 빈도가 극히 낮으므로 이 방식이 적합.

#### A-2b. 카드에 data-category 속성 추가

시리즈 divider와 카드에 category 데이터 속성 추가. 11ty 빌드 시 contentData에서 category를 읽어 HTML에 반영:

```html
{%- for series in contentData | reverse %}
  {%- set seriesNum = loop.revindex %}
  <div class="series-divider" id="series-{{ series.id }}"
       data-series="{{ series.id }}"
       data-series-num="{{ seriesNum }}"
       data-category="{{ series.category }}">
```

```html
  <a class="article-card" href="{{ a.href }}"
     data-search="{{ a.search | e }}"
     data-series="{{ series.id }}"
     data-series-num="{{ seriesNum }}"
     data-category="{{ series.category }}">
```

#### A-2c. 무한스크롤 sentinel 제거 + 페이지네이션 마크업 추가

**제거**: `<div class="load-sentinel" id="loadSentinel"></div>` (line 52)

**추가** (card-grid 닫기 직전 — `</main>` 바로 위):

```html
      <nav class="pagination" id="pagination" aria-label="페이지 네비게이션">
        <!-- JS가 동적으로 버튼 생성 -->
      </nav>
    </main>
```

#### A-2d. TOC 카테고리 계층화

**현재** (line 60~68): 플랫 목록
```html
<nav class="toc-nav" id="tocNav">
  {%- for series in contentData | reverse %}
    <a class="toc-item" ...>
  {%- endfor %}
</nav>
```

**변경**: `<details>`/`<summary>` 기반 카테고리 그룹

```html
<nav class="toc-nav" id="tocNav">
  {%- set catOrder = ['tech', 'analysis', 'fiction', 'career'] %}
  {%- set catLabels = {
    'tech': '기술 & 개발',
    'analysis': '분석 & 팩트체크',
    'fiction': '소설 & 창작',
    'career': '업무 & 커리어'
  } %}
  {%- for cat in catOrder %}
    {%- set catSeries = contentData | selectattr("category", "equalto", cat) | list %}
    <details class="toc-category" data-category="{{ cat }}">
      <summary>{{ catLabels[cat] }} <span class="toc-count">({{ catSeries | length }})</span></summary>
      <div class="toc-items">
      {%- for series in catSeries | reverse %}
        {%- set seriesNum = loop.revindex %}
        <a class="toc-item" href="#series-{{ series.id }}"
           data-toc-series="{{ series.id }}"
           title="{{ series.description | e }}">
          <span class="toc-title">{{ series.title | e }}</span>
        </a>
      {%- endfor %}
      </div>
    </details>
  {%- endfor %}
</nav>
```

> **변경점**: TOC에서 시리즈 번호(`toc-num`) 제거 — 카테고리 내에서 번호가 불연속이 되므로 의미 없음. 대신 시리즈 description을 `title` 속성으로 추가하여 tooltip 제공.

> **주의 — Nunjucks `selectattr` 필터**: 11ty 기본 Nunjucks에서 `selectattr`는 지원된다. 다만 contentData 배열에 `category` 필드가 있어야 하므로, A-1 작업이 선행되어야 한다.

### A-3. index-app.js — 핵심 로직 재작성

**변경 범위**: 560줄 중 ~70% 재작성. 무한스크롤 제거, 카테고리 필터, 번호 페이지네이션, URL 상태 관리 추가.

#### A-3a. 상수 및 상태 변수

**현재**:
```javascript
var PAGE_SIZE = 5;
var sortOrder = loadSort();
var currentPage = 1;
var totalPages = 1;
var isSearching = false;
var seriesGroups = [];
```

**변경**:
```javascript
var PAGE_SIZE = 5;
var sortOrder = loadSort();
var currentCategory = null;   // null = 전체
var currentPage = 1;
var totalPages = 1;
var searchQuery = '';
var seriesGroups = [];         // 전체 그룹 (정렬 후 캐시)
var filteredGroups = [];       // 카테고리+검색 적용 후 그룹
```

> `isSearching` boolean 제거 — `searchQuery` 문자열의 비어있음 여부로 판별.

#### A-3b. DOM refs 추가

```javascript
var categoryTabs, paginationEl;
// 기존 loadSentinel 제거
```

DOMContentLoaded 내:
```javascript
categoryTabs = document.getElementById('categoryTabs');
paginationEl = document.getElementById('pagination');
// loadSentinel = ... 제거
```

#### A-3c. 카테고리 필터 로직

```javascript
function setCategory(cat) {
  currentCategory = cat || null;
  currentPage = 1;
  syncCategoryTabs();
  render();
  updateUrl();
}

function syncCategoryTabs() {
  var tabs = categoryTabs.querySelectorAll('.category-tab');
  for (var i = 0; i < tabs.length; i++) {
    var tabCat = tabs[i].getAttribute('data-category');
    var isActive = (tabCat === (currentCategory || ''));
    tabs[i].classList.toggle('active', isActive);
    tabs[i].setAttribute('aria-selected', isActive ? 'true' : 'false');
  }
}
```

이벤트 바인딩 (DOMContentLoaded 내):
```javascript
categoryTabs.addEventListener('click', function (e) {
  var tab = e.target.closest('.category-tab');
  if (!tab) return;
  setCategory(tab.getAttribute('data-category'));
});
```

#### A-3d. 필터링 + 페이지네이션 통합 — render()

현재의 `applyPagination()` + `applySearch()`를 하나의 `render()` 함수로 통합:

```javascript
/**
 * 핵심 렌더 함수.
 * 1. seriesGroups에서 카테고리+검색 필터 적용 → filteredGroups
 * 2. filteredGroups에 페이지네이션 적용 (표시/숨김)
 * 3. TOC 상태 업데이트
 * 4. 페이지네이션 UI 렌더
 * 5. 페이지 정보 업데이트
 */
function render() {
  invalidateDividerCache();
  seriesGroups = collectSeriesGroups();

  // 1. 필터링
  filteredGroups = seriesGroups;

  if (currentCategory) {
    filteredGroups = filteredGroups.filter(function (g) {
      return g.category === currentCategory;
    });
  }

  if (searchQuery) {
    filteredGroups = filteredGroups.filter(function (g) {
      return matchesSearch(g, searchQuery);
    });
  }

  // 2. 페이지네이션
  totalPages = Math.max(1, Math.ceil(filteredGroups.length / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  var startIdx = (currentPage - 1) * PAGE_SIZE;
  var endIdx = startIdx + PAGE_SIZE;

  // 모든 시리즈 숨기기
  for (var i = 0; i < seriesGroups.length; i++) {
    setGroupVisible(seriesGroups[i], false);
  }

  // 현재 페이지의 필터된 시리즈만 표시
  for (var j = 0; j < filteredGroups.length; j++) {
    setGroupVisible(filteredGroups[j], j >= startIdx && j < endIdx);
  }

  // 3~5
  updateTocStates();
  renderPagination();
  updatePageInfo();
}

function setGroupVisible(group, visible) {
  var method = visible ? 'remove' : 'add';
  group.divider.classList[method]('paged-hidden');
  group.divider.style.display = '';  // 검색 인라인 스타일 클리어
  for (var i = 0; i < group.cards.length; i++) {
    group.cards[i].classList[method]('paged-hidden');
    group.cards[i].style.display = '';
  }
}
```

#### A-3e. collectSeriesGroups 수정

category 속성 수집 추가:

```javascript
function collectSeriesGroups() {
  var items = contentArea.querySelectorAll('.series-divider, .article-card');
  var groups = [];
  var current = null;

  for (var i = 0; i < items.length; i++) {
    var el = items[i];
    if (el.classList.contains('series-divider')) {
      current = {
        divider: el,
        cards: [],
        num: parseInt(el.getAttribute('data-series-num'), 10),
        seriesId: el.getAttribute('data-series'),
        category: el.getAttribute('data-category')   // ← 추가
      };
      groups.push(current);
    } else if (current) {
      current.cards.push(el);
    }
  }

  return groups;
}
```

#### A-3f. 검색 매칭 함수

```javascript
/**
 * 시리즈 그룹 내 카드 중 하나라도 검색어에 매칭되면 true
 */
function matchesSearch(group, query) {
  // divider 제목 검사
  var divTitle = group.divider.querySelector('.series-divider-title');
  if (divTitle && divTitle.textContent.toLowerCase().indexOf(query) !== -1) {
    return true;
  }
  // 카드별 검사
  for (var i = 0; i < group.cards.length; i++) {
    var card = group.cards[i];
    var searchText = (card.getAttribute('data-search') || '').toLowerCase();
    var titleText = card.querySelector('.card-title').textContent.toLowerCase();
    var roleText = card.querySelector('.card-desc').textContent.toLowerCase();
    if ((searchText + ' ' + titleText + ' ' + roleText).indexOf(query) !== -1) {
      return true;
    }
  }
  return false;
}
```

> **설계 결정**: 검색은 시리즈 단위 표시/숨김. 현재와 동일하게 시리즈 내 하나라도 매칭되면 해당 시리즈 전체(divider + 모든 카드)를 표시한다. 개별 카드 숨김은 사용자 혼란 유발.

#### A-3g. 번호 페이지네이션 UI 렌더

```javascript
function renderPagination() {
  if (!paginationEl) return;

  // 1페이지뿐이면 숨김
  if (totalPages <= 1) {
    paginationEl.innerHTML = '';
    return;
  }

  var html = '';

  // 이전 버튼
  html += '<button class="page-btn page-prev"'
    + (currentPage <= 1 ? ' disabled' : '')
    + ' aria-label="이전 페이지">&lsaquo;</button>';

  // 페이지 번호들
  var pages = getPageNumbers(currentPage, totalPages);
  for (var i = 0; i < pages.length; i++) {
    var p = pages[i];
    if (p === '...') {
      html += '<span class="page-ellipsis">&hellip;</span>';
    } else {
      html += '<button class="page-btn page-num'
        + (p === currentPage ? ' active' : '')
        + '" data-page="' + p + '"'
        + (p === currentPage ? ' aria-current="page"' : '')
        + '>' + p + '</button>';
    }
  }

  // 다음 버튼
  html += '<button class="page-btn page-next"'
    + (currentPage >= totalPages ? ' disabled' : '')
    + ' aria-label="다음 페이지">&rsaquo;</button>';

  // 카운터
  var start = (currentPage - 1) * PAGE_SIZE + 1;
  var end = Math.min(currentPage * PAGE_SIZE, filteredGroups.length);
  html += '<div class="page-counter">' + start + '-' + end
    + ' / ' + filteredGroups.length + ' 시리즈</div>';

  paginationEl.innerHTML = html;
}

/**
 * 페이지 번호 배열 생성 (말줄임 포함)
 * 최대 7개 슬롯: [1] [...] [4] [5] [6] [...] [10]
 */
function getPageNumbers(current, total) {
  if (total <= 7) {
    var arr = [];
    for (var i = 1; i <= total; i++) arr.push(i);
    return arr;
  }

  var pages = [1];

  if (current > 3) pages.push('...');

  var rangeStart = Math.max(2, current - 1);
  var rangeEnd = Math.min(total - 1, current + 1);

  for (var j = rangeStart; j <= rangeEnd; j++) {
    pages.push(j);
  }

  if (current < total - 2) pages.push('...');

  pages.push(total);
  return pages;
}
```

이벤트 바인딩 (이벤트 위임):
```javascript
paginationEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.page-btn');
  if (!btn || btn.disabled) return;

  if (btn.classList.contains('page-prev')) {
    currentPage--;
  } else if (btn.classList.contains('page-next')) {
    currentPage++;
  } else if (btn.classList.contains('page-num')) {
    currentPage = parseInt(btn.getAttribute('data-page'), 10);
  }

  render();
  updateUrl();

  // 카드 영역 상단으로 스크롤
  var toolbarBottom = categoryTabs.getBoundingClientRect().bottom + window.scrollY;
  window.scrollTo({ top: toolbarBottom, behavior: 'smooth' });
});
```

#### A-3h. URL 상태 관리

```javascript
function updateUrl() {
  var params = new URLSearchParams();
  if (currentCategory) params.set('category', currentCategory);
  if (currentPage > 1) params.set('page', String(currentPage));

  var qs = params.toString();
  var url = window.location.pathname + (qs ? '?' + qs : '');
  history.replaceState({ category: currentCategory, page: currentPage }, '', url);
}

function restoreFromUrl() {
  var params = new URLSearchParams(window.location.search);

  var cat = params.get('category');
  if (cat && ['tech', 'analysis', 'fiction', 'career'].indexOf(cat) !== -1) {
    currentCategory = cat;
  }

  var page = parseInt(params.get('page'), 10);
  if (page > 0) {
    currentPage = page;
  }
}
```

popstate 대응:
```javascript
window.addEventListener('popstate', function (e) {
  if (e.state) {
    currentCategory = e.state.category || null;
    currentPage = e.state.page || 1;
  } else {
    restoreFromUrl();
  }
  syncCategoryTabs();
  render();
});
```

#### A-3i. 무한스크롤 관련 코드 제거

삭제 대상:
- `setupInfiniteScroll()` 함수 전체 (line 146~163)
- `loadNextPage()` 함수 (line 107~111)
- `loadSentinel` DOM ref (line 44)
- `scrollObserver` 변수 (line 45)
- DOMContentLoaded 내 `setupInfiniteScroll()` 호출 (line 552)
- DOMContentLoaded 내 `loadSentinel = document.getElementById(...)` (line 516)

#### A-3j. 정렬 함수 수정

`reorderAll()`의 기존 로직은 유지하되, 마지막에 `applyPagination()` 대신 `render()` 호출:

```javascript
function reorderAll() {
  // ... 기존 DOM 재배치 코드 유지 ...

  // TOC 재정렬 — 카테고리 계층화 후에는 TOC 재정렬 불필요
  // (TOC는 카테고리별 details/summary이므로 정렬 대상 아님)

  currentPage = 1;
  render();
  updateUrl();
}
```

> **TOC 정렬 변경**: 카테고리 계층화된 TOC에서 시리즈 순서를 변경하면 UX가 혼란스러워짐. 정렬은 카드 그리드에만 적용하고, TOC는 고정 순서를 유지.

#### A-3k. TOC 상태 업데이트 수정

카테고리 계층화 대응:

```javascript
function updateTocStates() {
  // 현재 표시 중인 시리즈 ID 맵
  var visibleIds = {};
  for (var i = 0; i < filteredGroups.length; i++) {
    var g = filteredGroups[i];
    var idx = i;
    var start = (currentPage - 1) * PAGE_SIZE;
    var end = start + PAGE_SIZE;
    if (idx >= start && idx < end) {
      visibleIds[g.seriesId] = true;
    }
  }

  // TOC 항목 업데이트
  var tocItems = tocNav.querySelectorAll('.toc-item');
  for (var j = 0; j < tocItems.length; j++) {
    var tocItem = tocItems[j];
    var sid = tocItem.getAttribute('data-toc-series');
    tocItem.classList.toggle('unloaded', !visibleIds[sid]);
    tocItem.style.opacity = '';  // 검색 인라인 스타일 클리어
  }

  // 활성 카테고리의 details 자동 열기
  var details = tocNav.querySelectorAll('.toc-category');
  for (var k = 0; k < details.length; k++) {
    var detailsCat = details[k].getAttribute('data-category');
    if (currentCategory) {
      details[k].open = (detailsCat === currentCategory);
    } else {
      // 전체 탭: activeSeriesId가 속한 카테고리만 열기
      if (activeSeriesId) {
        var activeItem = details[k].querySelector('[data-toc-series="' + activeSeriesId + '"]');
        details[k].open = !!activeItem;
      }
    }
  }
}
```

#### A-3l. TOC 클릭 핸들러 수정

`loadUpToSeries` 제거 (페이지네이션으로 불필요):

```javascript
function handleTocClick(e) {
  e.preventDefault();
  var tocItem = e.target.closest('.toc-item');
  if (!tocItem) return;

  var seriesId = tocItem.getAttribute('data-toc-series');

  // 해당 시리즈가 표시되는 페이지로 이동
  navigateToSeries(seriesId);

  closeMobileToc();
}

function navigateToSeries(seriesId) {
  // filteredGroups에서 해당 시리즈 찾기
  for (var i = 0; i < filteredGroups.length; i++) {
    if (filteredGroups[i].seriesId === seriesId) {
      var targetPage = Math.floor(i / PAGE_SIZE) + 1;
      if (targetPage !== currentPage) {
        currentPage = targetPage;
        render();
        updateUrl();
      }

      // 스크롤
      setTimeout(function () {
        var divider = document.getElementById('series-' + seriesId);
        if (divider) {
          divider.scrollIntoView({ behavior: 'instant', block: 'start' });
        }
        setActiveTocItem(seriesId);
      }, 50);
      return;
    }
  }

  // filteredGroups에 없으면 (다른 카테고리) — 카테고리 전환
  for (var j = 0; j < seriesGroups.length; j++) {
    if (seriesGroups[j].seriesId === seriesId) {
      currentCategory = seriesGroups[j].category;
      syncCategoryTabs();
      // 재귀 호출로 해당 시리즈 페이지 이동
      render();
      navigateToSeries(seriesId);
      return;
    }
  }
}
```

#### A-3m. 초기화 흐름 수정

DOMContentLoaded 내 실행 순서:

```javascript
document.addEventListener('DOMContentLoaded', function () {
  // 1. DOM refs
  contentArea = document.getElementById('contentArea');
  searchInput = document.getElementById('searchInput');
  searchCount = document.getElementById('searchCount');
  noResults = document.getElementById('noResults');
  sortBtn = document.getElementById('sortBtn');
  tocNav = document.getElementById('tocNav');
  tocSidebar = document.getElementById('tocSidebar');
  tocOverlay = document.getElementById('tocOverlay');
  tocToggle = document.getElementById('tocMobileToggle');
  tocPageInfo = document.getElementById('tocPageInfo');
  categoryTabs = document.getElementById('categoryTabs');
  paginationEl = document.getElementById('pagination');
  pageProgress = document.getElementById('pageProgress');
  scrollTopBtn = document.getElementById('scrollTopBtn');

  // 2. URL에서 상태 복원
  restoreFromUrl();

  // 3. 정렬 적용 (SSR 기본은 desc)
  if (sortOrder === 'asc') {
    reorderAll();
  }

  // 4. 카테고리 탭 싱크
  syncCategoryTabs();

  // 5. 초기 렌더
  render();

  // 6. 이벤트 바인딩
  sortBtn.addEventListener('click', handleSort);
  searchInput.addEventListener('input', handleSearch);  // Phase B에서 debounce 추가
  tocNav.addEventListener('click', handleTocClick);
  categoryTabs.addEventListener('click', function (e) { /* A-3c 참조 */ });
  paginationEl.addEventListener('click', function (e) { /* A-3g 참조 */ });

  if (tocToggle) tocToggle.addEventListener('click', openMobileToc);
  if (tocOverlay) tocOverlay.addEventListener('click', closeMobileToc);

  // Mobile TOC close button
  var closeBtn = document.createElement('button');
  closeBtn.className = 'toc-close-btn';
  closeBtn.textContent = '닫기';
  closeBtn.addEventListener('click', closeMobileToc);
  tocSidebar.insertBefore(closeBtn, tocSidebar.firstChild);

  syncSortBtn();
  setupActiveTracking();
  setupScrollTopBtn();

  // popstate
  window.addEventListener('popstate', function (e) { /* A-3h 참조 */ });
});
```

### A-4. index.css — 카테고리 탭 + 페이지네이션 스타일

#### A-4a. 카테고리 탭

```css
/* ===== Category Tabs ===== */
.category-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;            /* Firefox */
  -ms-overflow-style: none;         /* IE/Edge */
}

.category-tabs::-webkit-scrollbar {
  display: none;                    /* Chrome/Safari */
}

.category-tab {
  font-family: var(--serif);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--secondary);
  background: none;
  border: 1px solid var(--rule);
  padding: 8px 20px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
}

.category-tab:hover {
  border-color: var(--fg);
  color: var(--fg);
}

.category-tab.active {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
}
```

모바일:
```css
@media (max-width: 600px) {
  .category-tabs { gap: 6px; margin-bottom: 24px; }
  .category-tab { font-size: 0.78rem; padding: 6px 14px; }
}
```

#### A-4b. 페이지네이션

```css
/* ===== Pagination ===== */
.pagination {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 48px 0 0;
}

.page-btn {
  font-family: var(--serif);
  font-size: 0.9rem;
  min-width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--secondary);
  background: none;
  border: 1px solid var(--rule);
  cursor: pointer;
  transition: all 0.2s;
}

.page-btn:hover:not(:disabled):not(.active) {
  border-color: var(--fg);
  color: var(--fg);
}

.page-btn.active {
  background: var(--accent);
  color: var(--bg);
  border-color: var(--accent);
  font-weight: 700;
}

.page-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

.page-ellipsis {
  font-size: 0.9rem;
  color: var(--muted);
  padding: 0 4px;
}

.page-counter {
  width: 100%;
  text-align: center;
  margin-top: 8px;
  font-family: var(--mono);
  font-size: 0.7rem;
  letter-spacing: 1px;
  color: var(--muted);
}
```

#### A-4c. TOC 카테고리 그룹

```css
/* ===== TOC Category Groups ===== */
.toc-category {
  margin-bottom: 4px;
}

.toc-category > summary {
  font-family: var(--serif);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--fg);
  padding: 8px 8px;
  cursor: pointer;
  list-style: none;           /* 기본 삼각형 제거 */
  border-left: 2px solid transparent;
  transition: background 0.2s;
}

.toc-category > summary::-webkit-details-marker {
  display: none;
}

.toc-category > summary::before {
  content: '▸';
  display: inline-block;
  margin-right: 6px;
  transition: transform 0.2s;
  font-size: 0.7rem;
}

.toc-category[open] > summary::before {
  transform: rotate(90deg);
}

.toc-category > summary:hover {
  background: var(--card-bg);
}

.toc-count {
  font-weight: 400;
  color: var(--muted);
  font-size: 0.7rem;
}

.toc-items {
  padding-left: 12px;
}
```

#### A-4d. 기존 스타일 삭제/수정

**삭제**:
- `.load-sentinel` 스타일 (line 167~171)
- `.page-progress` 스타일 (line 508~519) — 새 `.page-counter`로 대체

**수정**:
- `.toc-num` 스타일 (line 370~377) — 삭제 (TOC에서 번호 제거)

---

## 3. Phase B: 검색 + 디자인 + 성능

### B-1. index-app.js — 검색 debounce

```javascript
var debounceTimer = null;

function handleSearch() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(function () {
    var query = searchInput.value.trim().toLowerCase();
    searchQuery = query;
    currentPage = 1;
    render();
    updateUrl();

    // 검색 결과 수 표시
    if (query) {
      searchCount.textContent = filteredGroups.length + ' series';
      noResults.style.display = filteredGroups.length === 0 ? 'block' : 'none';
    } else {
      searchCount.textContent = '';
      noResults.style.display = 'none';
    }
  }, 250);
}
```

### B-2. index-app.js — 검색 중 정렬 활성화

**변경**: `handleSort()`에서 `isSearching` 체크 제거 (이미 A-3에서 `isSearching` 자체를 제거함). 정렬 시 `render()` 호출로 검색 필터가 유지된 채 정렬됨.

### B-3. index.css — 카드 경계 강화

**현재** (line 182):
```css
.article-card {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}
```

**변경**:
```css
.article-card {
  border: 1px solid var(--rule);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
```

**다크모드** (line 270~276):
```css
[data-theme="dark"] .article-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
}
[data-theme="dark"] .article-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.35);
}
```

### B-4. editorial-base.css — card-bg 명도 조정

**현재** (line ~55, ~72):
```css
:root { --card-bg: #f2efe9; }
[data-theme="dark"] { --card-bg: #26241f; }
```

**변경**:
```css
:root { --card-bg: #ebe7df; }
[data-theme="dark"] { --card-bg: #2f2d28; }
```

### B-5. index.css — 시리즈 구분자 좌측 보더

**현재** (line 133~140):
```css
.series-divider {
  grid-column: 1 / -1;
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 32px 0 12px;
  border-bottom: 2px solid var(--fg);
}
```

**변경**:
```css
.series-divider {
  grid-column: 1 / -1;
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 32px 0 12px 16px;
  border-bottom: 2px solid var(--fg);
  border-left: 4px solid var(--accent);
}
```

### B-6. index.css — 검색 포커스 피드백

**현재** (line 60~62):
```css
.search-input:focus {
  border-color: var(--fg);
}
```

**변경**:
```css
.search-input:focus {
  border-color: var(--fg);
  box-shadow: 0 0 0 3px rgba(196, 62, 42, 0.08);
}
```

### B-7. content-data.js — search 필드 제거

**현재**: 각 article 객체에 `search: '키워드 키워드 ...'` 포함 (~68KB 중 상당 부분)

**변경**: `search` 필드를 모든 article 객체에서 삭제

**근거**: 11ty 빌드 시 이미 `data-search` HTML 속성으로 출력하고 있으므로, JS에서 중복 보유할 필요 없음. 검색은 DOM의 `data-search` + 카드 텍스트에서 수행 (현재 `applySearch()`도 이 방식 사용).

**예상 효과**: ~68KB → ~35KB (약 50% 감소)

### B-8. series-nav.js → series-nav.css 분리

**현재**: series-nav.js 내에 CSS를 JS 문자열로 관리 (createElement('style') + textContent)

**작업**:
1. series-nav.js에서 CSS 문자열 추출 → `assets/series-nav.css` 파일로 생성
2. series-nav.js에서 style 요소 생성/삽입 코드 삭제
3. `article.njk`에 `<link rel="stylesheet" href="/assets/series-nav.css">` 추가

**article.njk 변경** (line 61 부근, editorial-base.css 뒤):
```html
<link rel="stylesheet" href="/assets/editorial-base.css">
<link rel="stylesheet" href="/assets/series-nav.css">
```

---

## 4. Phase C: 반응형 + 접근성 + SEO

### C-1. editorial-base.css — fluid typography

**현재** (미디어쿼리 기반 고정값):
```css
/* editorial-base.css line ~415 */
@media (max-width: 700px) {
  .masthead h1 { font-size: 2.2rem; }
  .section-head h2 { font-size: 1.5rem; }
  .pull-quote p { font-size: 1.2rem; }
  .closing h2 { font-size: 1.6rem; }
}
```

**변경**: 기본 규칙에 `clamp()` 적용, 미디어쿼리의 해당 규칙 제거

```css
/* 기본 규칙 수정 */
.masthead h1 { font-size: clamp(2.2rem, 5vw, 3.2rem); }
.section-head h2 { font-size: clamp(1.5rem, 3vw, 2rem); }
.pull-quote p { font-size: clamp(1.2rem, 2.5vw, 1.5rem); }
.closing h2 { font-size: clamp(1.6rem, 3.5vw, 2.2rem); }

/* 700px 미디어쿼리에서 위 4개 폰트 규칙만 제거 (나머지 padding 등은 유지) */
```

> index.css의 `.masthead h1 { font-size: 2.2rem }` (600px 미디어쿼리 내)도 제거 — clamp가 대신 처리.

### C-2. index-app.js — 모바일 TOC CLS 보정

**현재** `openMobileToc()` (line 455~461):
```javascript
function openMobileToc() {
  tocSidebar.classList.add('mobile-open');
  tocOverlay.style.display = 'block';
  void tocOverlay.offsetWidth;
  tocOverlay.classList.add('open');
  document.body.style.overflow = 'clip';
}
```

**변경**:
```javascript
function openMobileToc() {
  var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  tocSidebar.classList.add('mobile-open');
  tocOverlay.style.display = 'block';
  void tocOverlay.offsetWidth;
  tocOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = scrollbarWidth + 'px';
}

function closeMobileToc() {
  tocSidebar.classList.remove('mobile-open');
  tocOverlay.classList.remove('open');
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
  setTimeout(function () {
    if (!tocOverlay.classList.contains('open')) {
      tocOverlay.style.display = 'none';
    }
  }, 300);
}
```

### C-3. index-app.js — ARIA live region

```javascript
var announcer = null;

function createLiveRegion() {
  var el = document.createElement('div');
  el.setAttribute('role', 'status');
  el.setAttribute('aria-live', 'polite');
  el.setAttribute('aria-atomic', 'true');
  el.style.cssText = 'position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden';
  document.body.appendChild(el);
  return el;
}

function announce(msg) {
  if (announcer) announcer.textContent = msg;
}
```

`DOMContentLoaded`에서 `announcer = createLiveRegion();` 호출.

**announce 삽입 지점**:
- `render()` 끝: `announce(filteredGroups.length + '개 시리즈, ' + currentPage + '/' + totalPages + ' 페이지');`
- `handleSort()` 끝: `announce(sortOrder === 'desc' ? '최신순으로 정렬됨' : '오래된순으로 정렬됨');`

### C-4. index-app.js — aria-label 추가

DOMContentLoaded 내:
```javascript
searchInput.setAttribute('aria-label', '시리즈 및 콘텐츠 검색');
```

`syncSortBtn()` 수정:
```javascript
function syncSortBtn() {
  if (sortOrder === 'desc') {
    sortBtn.textContent = '최신순';
    sortBtn.classList.add('active');
    sortBtn.setAttribute('aria-label', '정렬 전환 (현재: 최신순)');
    sortBtn.setAttribute('aria-pressed', 'true');
  } else {
    sortBtn.textContent = '오래된순';
    sortBtn.classList.remove('active');
    sortBtn.setAttribute('aria-label', '정렬 전환 (현재: 오래된순)');
    sortBtn.setAttribute('aria-pressed', 'false');
  }
}
```

### C-5. index-app.js — 모바일 TOC 포커스 트랩

```javascript
var focusTrapHandler = null;
var prevFocusEl = null;

function openMobileToc() {
  prevFocusEl = document.activeElement;

  // ... 기존 열기 코드 (C-2 참조) ...

  // 포커스 트랩 설정
  setTimeout(function () {
    var focusable = tocSidebar.querySelectorAll(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    focusTrapHandler = function (e) {
      if (e.key === 'Escape') { closeMobileToc(); return; }
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    tocSidebar.addEventListener('keydown', focusTrapHandler);
    first.focus();
  }, 100);
}

function closeMobileToc() {
  // ... 기존 닫기 코드 (C-2 참조) ...

  if (focusTrapHandler) {
    tocSidebar.removeEventListener('keydown', focusTrapHandler);
    focusTrapHandler = null;
  }

  if (prevFocusEl) {
    prevFocusEl.focus();
    prevFocusEl = null;
  }
}
```

### C-6. nav.js — aria-label 추가

nav.js가 생성하는 `<nav>` 요소에 aria-label 추가:

```javascript
// nav 요소 생성 시
nav.setAttribute('aria-label', '메인 네비게이션');
```

### C-7. article.njk — BreadcrumbList JSON-LD

기존 Article JSON-LD 아래에 BreadcrumbList 추가 (line 58 뒤):

```html
<script type="application/ld+json">{{ ld | dump | safe }}</script>
{% if seriesTitle %}
{% set breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://necromman.github.io/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": seriesTitle
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": headline,
      "item": canonicalUrl
    }
  ]
} %}
<script type="application/ld+json">{{ breadcrumb | dump | safe }}</script>
{% endif %}
```

> **참고**: `seriesTitle` front matter 필드가 필요. 현재 콘텐츠 HTML에 이 필드가 없으면 추가 작업 필요. 단, 이번 개편에서는 article.njk 템플릿만 준비하고, 기존 콘텐츠에 일괄 seriesTitle 추가는 별도 작업으로 분리.

---

## 5. Phase D: 검증 + 배포

### D-1. 빌드 검증

```bash
npx eleventy
```

확인 항목:
- [ ] 빌드 에러 없음
- [ ] `_site/index.html`에 카테고리 탭 마크업 존재
- [ ] `_site/index.html`에 `data-category` 속성 존재
- [ ] `_site/index.html`에 `.load-sentinel` 없음
- [ ] `_site/index.html`에 `.pagination` nav 존재
- [ ] `_site/index.html`에 TOC `<details>` 구조 존재

### D-2. 기능 검증

| # | 테스트 | 기대 결과 |
|---|--------|----------|
| 1 | 직접 접속: `/?category=tech&page=2` | tech 카테고리 2페이지 표시 |
| 2 | 카테고리 탭 클릭 → URL 변경 확인 | `?category=fiction` |
| 3 | 페이지 번호 클릭 → URL 변경 확인 | `?category=fiction&page=2` |
| 4 | 브라우저 뒤로가기 → 이전 상태 복원 | popstate 동작 |
| 5 | 검색 입력 → 250ms 후 필터 적용 | debounce 동작 |
| 6 | 검색 + 카테고리 = AND 필터 | 교차 필터 |
| 7 | 검색 중 정렬 토글 | 정상 동작 |
| 8 | TOC 카테고리 접기/펴기 | details/summary 동작 |
| 9 | TOC 항목 클릭 → 해당 시리즈 페이지로 이동 + 스크롤 | navigateToSeries 동작 |
| 10 | 유효하지 않은 URL 파라미터 | 기본값 (전체, 1페이지) |

### D-3. 다크모드 검증

- [ ] 카테고리 탭 active 상태 색상
- [ ] 페이지네이션 active 상태 색상
- [ ] 카드 경계(border + shadow) 가시성
- [ ] TOC category summary 색상
- [ ] 검색 포커스 shadow 색상

### D-4. 반응형 검증

| 뷰포트 | 확인 항목 |
|--------|----------|
| 1400px+ | 2열 (카드그리드 3열 + TOC 사이드바) |
| 1199px | 사이드바 숨김, 모바일 TOC 토글 표시 |
| 900px | 카드 2열 |
| 600px | 카드 1열, 카테고리 탭 수평 스크롤 |
| 375px (iPhone SE) | 전체 레이아웃 정상, TOC 드로어 260px |

### D-5. 접근성 검증

- [ ] 카테고리 탭: `role="tablist"`, `aria-selected`
- [ ] 페이지네이션: `aria-label`, `aria-current="page"`
- [ ] 검색: `aria-label` 존재
- [ ] 정렬: `aria-label` + `aria-pressed`
- [ ] ARIA live region: 페이지 변경/검색 시 announce 동작
- [ ] 모바일 TOC: 포커스 트랩, Escape 닫기, 포커스 복귀
- [ ] 키보드 네비게이션: Tab으로 모든 인터랙티브 요소 접근 가능

---

## 부록: 삭제 대상 코드 목록

### index-app.js에서 삭제

| 라인 | 코드 | 이유 |
|------|------|------|
| 37 | `var isSearching = false;` | `searchQuery`로 대체 |
| 44 | `var loadSentinel, ...` | 무한스크롤 제거 |
| 45 | `var scrollObserver = null;` | 무한스크롤 제거 |
| 75~105 | `applyPagination()` | `render()`로 대체 |
| 107~111 | `loadNextPage()` | 페이지네이션으로 대체 |
| 113~125 | `loadUpToSeries()` | `navigateToSeries()`로 대체 |
| 146~163 | `setupInfiniteScroll()` | 무한스크롤 제거 |
| 366~451 | `applySearch()`, `clearSearch()`, `handleSearch()` | `render()` + debounce로 대체 |
| 516 | `loadSentinel = document.getElementById(...)` | 제거 |
| 552 | `setupInfiniteScroll()` 호출 | 제거 |

### index.html에서 삭제

| 라인 | 코드 | 이유 |
|------|------|------|
| 52 | `<div class="load-sentinel" id="loadSentinel"></div>` | 무한스크롤 제거 |

### index.css에서 삭제

| 라인 | 코드 | 이유 |
|------|------|------|
| 167~171 | `.load-sentinel` 스타일 | 요소 삭제됨 |
| 370~377 | `.toc-num` 스타일 | TOC 번호 제거 |
| 508~519 | `.page-progress` 스타일 | `.page-counter`로 대체 |

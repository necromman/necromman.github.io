/**
 * index-app.js
 * Progressive enhancement for the SSR landing page.
 * HTML is pre-rendered by 11ty (SEO-friendly). This script adds:
 * - Category filtering (tech / analysis / fiction / career)
 * - Pagination (5 series per page, numbered pages)
 * - URL state management (?category=&page=)
 * - TOC sidebar (active tracking, click-to-navigate, category groups)
 * - Search (filter cards by keyword, debounce 250ms)
 * - Sort (ascending/descending by series number)
 * - Mobile TOC drawer with focus trap
 *
 * localStorage keys:
 *   editorial-sort — 'asc' | 'desc' (default: desc)
 */
(function () {
  'use strict';

  /* ========== Constants ========== */

  var PAGE_SIZE = 5; // series per page
  var VALID_CATEGORIES = ['tech', 'analysis', 'fiction', 'career'];

  /* ========== localStorage ========== */

  function loadSort() {
    var v = localStorage.getItem('editorial-sort');
    return v === 'asc' ? 'asc' : 'desc';
  }

  function saveSort(order) {
    localStorage.setItem('editorial-sort', order);
  }

  /* ========== State ========== */

  var sortOrder = loadSort();
  var currentCategory = null;   // null = 전체
  var currentPage = 1;
  var totalPages = 1;
  var searchQuery = '';
  var seriesGroups = [];         // 전체 그룹 (DOM 순서)
  var filteredGroups = [];       // 카테고리+검색 적용 후

  /* ========== DOM refs ========== */

  var contentArea, searchInput, searchCount, noResults, sortBtn;
  var tocNav, tocSidebar, tocOverlay, tocToggle, tocPageInfo;
  var categoryTabs, paginationEl, scrollTopBtn;

  /* ========== Series groups ========== */

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
          category: el.getAttribute('data-category')
        };
        groups.push(current);
      } else if (current) {
        current.cards.push(el);
      }
    }

    return groups;
  }

  /* ========== Core render ========== */

  var cachedVisibleDividers = null;

  function invalidateDividerCache() {
    cachedVisibleDividers = null;
  }

  function getVisibleDividers() {
    if (!cachedVisibleDividers) {
      cachedVisibleDividers = Array.prototype.slice.call(
        contentArea.querySelectorAll('.series-divider:not(.paged-hidden)')
      );
    }
    return cachedVisibleDividers;
  }

  /**
   * 핵심 렌더 함수.
   * 1. seriesGroups에서 카테고리+검색 필터 → filteredGroups
   * 2. 페이지네이션 적용 (표시/숨김)
   * 3. TOC 업데이트
   * 4. 페이지네이션 UI
   * 5. 페이지 정보
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

    // 검색 결과 수 표시
    if (searchQuery) {
      searchCount.textContent = filteredGroups.length + ' series';
      noResults.style.display = filteredGroups.length === 0 ? 'block' : 'none';
    } else {
      searchCount.textContent = '';
      noResults.style.display = 'none';
    }

    // ARIA announce
    if (searchQuery) {
      announce(filteredGroups.length + '개 시리즈 검색됨');
    } else {
      announce(filteredGroups.length + '개 시리즈, ' + currentPage + '/' + totalPages + ' 페이지');
    }
  }

  function setGroupVisible(group, visible) {
    var method = visible ? 'remove' : 'add';
    group.divider.classList[method]('paged-hidden');
    group.divider.style.display = '';
    for (var i = 0; i < group.cards.length; i++) {
      group.cards[i].classList[method]('paged-hidden');
      group.cards[i].style.display = '';
    }
  }

  /* ========== Search ========== */

  function matchesSearch(group, query) {
    var divTitle = group.divider.querySelector('.series-divider-title');
    if (divTitle && divTitle.textContent.toLowerCase().indexOf(query) !== -1) {
      return true;
    }
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

  var debounceTimer = null;

  function handleSearch() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      var query = searchInput.value.trim().toLowerCase();
      searchQuery = query;
      currentPage = 1;
      render();
      updateUrl();
    }, 250);
  }

  /* ========== Category ========== */

  function setCategory(cat) {
    currentCategory = cat || null;
    currentPage = 1;
    searchQuery = '';
    searchInput.value = '';
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

  /* ========== Pagination UI ========== */

  function renderPagination() {
    if (!paginationEl) return;

    if (totalPages <= 1) {
      paginationEl.innerHTML = '';
      return;
    }

    var html = '';

    // 이전 버튼
    html += '<button class="page-btn page-prev"'
      + (currentPage <= 1 ? ' disabled' : '')
      + ' aria-label="이전 페이지">&lsaquo;</button>';

    // 페이지 번호
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

  function handlePaginationClick(e) {
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
    var target = categoryTabs || contentArea;
    var top = target.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: top, behavior: 'smooth' });
  }

  /* ========== URL State ========== */

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
    if (cat && VALID_CATEGORIES.indexOf(cat) !== -1) {
      currentCategory = cat;
    }

    var page = parseInt(params.get('page'), 10);
    if (page > 0) {
      currentPage = page;
    }
  }

  /* ========== Page Info ========== */

  function updatePageInfo() {
    if (tocPageInfo) {
      tocPageInfo.textContent = filteredGroups.length + ' 시리즈';
    }
  }

  /* ========== TOC ========== */

  var activeSeriesId = null;

  function updateTocStates() {
    // 현재 페이지에 표시 중인 시리즈 ID
    var visibleIds = {};
    var startIdx = (currentPage - 1) * PAGE_SIZE;
    var endIdx = startIdx + PAGE_SIZE;
    for (var i = 0; i < filteredGroups.length; i++) {
      if (i >= startIdx && i < endIdx) {
        visibleIds[filteredGroups[i].seriesId] = true;
      }
    }

    // TOC 항목 업데이트
    var tocItems = tocNav.querySelectorAll('.toc-item');
    for (var j = 0; j < tocItems.length; j++) {
      var tocItem = tocItems[j];
      var sid = tocItem.getAttribute('data-toc-series');
      tocItem.classList.toggle('unloaded', !visibleIds[sid]);
      tocItem.style.opacity = '';
    }

    // 활성 카테고리 details 자동 열기
    var details = tocNav.querySelectorAll('.toc-category');
    for (var k = 0; k < details.length; k++) {
      var detailsCat = details[k].getAttribute('data-category');
      if (currentCategory) {
        details[k].open = (detailsCat === currentCategory);
      } else {
        // 전체 탭: activeSeriesId가 속한 카테고리만 열기, 없으면 첫 번째 열기
        if (activeSeriesId) {
          var activeItem = details[k].querySelector('[data-toc-series="' + activeSeriesId + '"]');
          details[k].open = !!activeItem;
        } else {
          details[k].open = (k === 0);
        }
      }
    }
  }

  /* ========== Active scroll tracking ========== */

  var activeTicking = false;

  function setActiveTocItem(seriesId) {
    if (seriesId === activeSeriesId) return;
    activeSeriesId = seriesId;

    var allItems = tocNav.querySelectorAll('.toc-item');
    for (var j = 0; j < allItems.length; j++) {
      allItems[j].classList.remove('active');
    }

    var tocItem = tocNav.querySelector('[data-toc-series="' + seriesId + '"]');
    if (tocItem) {
      tocItem.classList.add('active');
      scrollTocItemIntoView(tocItem);
    }
  }

  function updateActiveOnScroll() {
    var dividers = getVisibleDividers();
    if (!dividers.length) return;

    var offset = 150;
    var best = null;

    for (var i = dividers.length - 1; i >= 0; i--) {
      if (dividers[i].getBoundingClientRect().top <= offset) {
        best = dividers[i];
        break;
      }
    }

    var scrollBottom = window.innerHeight + window.scrollY;
    var docHeight = document.documentElement.scrollHeight;
    if (docHeight - scrollBottom < 100) {
      best = dividers[dividers.length - 1];
    }

    if (!best) best = dividers[0];

    setActiveTocItem(best.getAttribute('data-series'));
  }

  function setupActiveTracking() {
    window.addEventListener('scroll', function () {
      if (!activeTicking) {
        requestAnimationFrame(function () {
          updateActiveOnScroll();
          activeTicking = false;
        });
        activeTicking = true;
      }
    }, { passive: true });

    updateActiveOnScroll();
  }

  function scrollTocItemIntoView(tocItem) {
    if (!tocNav) return;
    var navRect = tocNav.getBoundingClientRect();
    var itemRect = tocItem.getBoundingClientRect();

    if (itemRect.top < navRect.top || itemRect.bottom > navRect.bottom) {
      tocItem.scrollIntoView({ block: 'nearest', behavior: 'instant' });
    }
  }

  /* ========== TOC click ========== */

  function handleTocClick(e) {
    e.preventDefault();
    var tocItem = e.target.closest('.toc-item');
    if (!tocItem) return;

    var seriesId = tocItem.getAttribute('data-toc-series');
    navigateToSeries(seriesId);
    closeMobileToc();
  }

  function navigateToSeries(seriesId) {
    // filteredGroups에서 찾기
    for (var i = 0; i < filteredGroups.length; i++) {
      if (filteredGroups[i].seriesId === seriesId) {
        var targetPage = Math.floor(i / PAGE_SIZE) + 1;
        if (targetPage !== currentPage) {
          currentPage = targetPage;
          render();
          updateUrl();
        }

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

    // filteredGroups에 없으면 — 카테고리 전환
    for (var j = 0; j < seriesGroups.length; j++) {
      if (seriesGroups[j].seriesId === seriesId) {
        currentCategory = seriesGroups[j].category;
        currentPage = 1;
        syncCategoryTabs();
        render();
        updateUrl();
        navigateToSeries(seriesId);
        return;
      }
    }
  }

  /* ========== Sort ========== */

  function reorderAll() {
    var items = Array.prototype.slice.call(
      contentArea.querySelectorAll('.series-divider, .article-card')
    );
    items.sort(function (a, b) {
      var aNum = parseInt(a.getAttribute('data-series-num'), 10);
      var bNum = parseInt(b.getAttribute('data-series-num'), 10);
      return sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
    });
    // pagination nav을 제외하고 재배치
    var pNav = contentArea.querySelector('.pagination');
    items.forEach(function (el) {
      contentArea.insertBefore(el, pNav);
    });

    currentPage = 1;
    render();
    updateUrl();
  }

  function handleSort() {
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    saveSort(sortOrder);
    syncSortBtn();
    reorderAll();
    announce(sortOrder === 'desc' ? '최신순으로 정렬됨' : '오래된순으로 정렬됨');
  }

  function syncSortBtn() {
    if (sortOrder === 'desc') {
      sortBtn.textContent = '\uCD5C\uC2E0\uC21C';
      sortBtn.classList.add('active');
      sortBtn.setAttribute('aria-label', '정렬 전환 (현재: 최신순)');
      sortBtn.setAttribute('aria-pressed', 'true');
    } else {
      sortBtn.textContent = '\uC624\uB798\uB41C\uC21C';
      sortBtn.classList.remove('active');
      sortBtn.setAttribute('aria-label', '정렬 전환 (현재: 오래된순)');
      sortBtn.setAttribute('aria-pressed', 'false');
    }
  }

  /* ========== ARIA Live Region ========== */

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

  /* ========== Mobile TOC ========== */

  var focusTrapHandler = null;
  var prevFocusEl = null;

  function openMobileToc() {
    prevFocusEl = document.activeElement;

    var scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    tocSidebar.classList.add('mobile-open');
    tocOverlay.style.display = 'block';
    void tocOverlay.offsetWidth;
    tocOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollbarWidth + 'px';

    // 포커스 트랩
    setTimeout(function () {
      var focusable = tocSidebar.querySelectorAll(
        'button, [href], input, summary, [tabindex]:not([tabindex="-1"])'
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
    tocSidebar.classList.remove('mobile-open');
    tocOverlay.classList.remove('open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';

    if (focusTrapHandler) {
      tocSidebar.removeEventListener('keydown', focusTrapHandler);
      focusTrapHandler = null;
    }

    if (prevFocusEl) {
      prevFocusEl.focus();
      prevFocusEl = null;
    }

    setTimeout(function () {
      if (!tocOverlay.classList.contains('open')) {
        tocOverlay.style.display = 'none';
      }
    }, 300);
  }

  /* ========== Scroll to Top ========== */

  function setupScrollTopBtn() {
    if (!scrollTopBtn) return;

    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'instant' });
    });

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          if (window.scrollY > 400) {
            scrollTopBtn.classList.add('visible');
          } else {
            scrollTopBtn.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ========== Init ========== */

  document.addEventListener('DOMContentLoaded', function () {
    // DOM refs
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
    scrollTopBtn = document.getElementById('scrollTopBtn');

    // ARIA live region
    announcer = createLiveRegion();

    // Mobile TOC close button
    var closeBtn = document.createElement('button');
    closeBtn.className = 'toc-close-btn';
    closeBtn.textContent = '\uB2EB\uAE30';
    closeBtn.addEventListener('click', closeMobileToc);
    tocSidebar.insertBefore(closeBtn, tocSidebar.firstChild);

    // URL에서 상태 복원
    restoreFromUrl();

    // 정렬 적용 (SSR 기본은 desc)
    if (sortOrder === 'asc') {
      reorderAll();
    }

    // 카테고리 탭 싱크
    syncCategoryTabs();

    // 초기 렌더
    render();

    // 이벤트 바인딩
    sortBtn.addEventListener('click', handleSort);
    searchInput.addEventListener('input', handleSearch);
    tocNav.addEventListener('click', handleTocClick);

    categoryTabs.addEventListener('click', function (e) {
      var tab = e.target.closest('.category-tab');
      if (!tab) return;
      setCategory(tab.getAttribute('data-category'));
    });

    // TOC 카테고리 summary 클릭 → 해당 카테고리 탭 필터 연동
    tocNav.addEventListener('click', function (e) {
      var summary = e.target.closest('.toc-category > summary');
      if (!summary) return;
      var detailsEl = summary.parentElement;
      var cat = detailsEl.getAttribute('data-category');
      if (!cat) return;

      // 이미 해당 카테고리가 활성화된 상태면 → 전체 탭으로 복귀
      if (currentCategory === cat) {
        setCategory('');
      } else {
        setCategory(cat);
      }
      // details open/close는 render()의 syncToc가 처리하므로 기본 동작 차단
      e.preventDefault();
    });

    paginationEl.addEventListener('click', handlePaginationClick);

    if (tocToggle) {
      tocToggle.addEventListener('click', openMobileToc);
    }

    if (tocOverlay) {
      tocOverlay.addEventListener('click', closeMobileToc);
    }

    // Sync sort button label
    syncSortBtn();

    // Active tracking
    setupActiveTracking();

    // Scroll to top
    setupScrollTopBtn();

    // popstate
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
  });
})();

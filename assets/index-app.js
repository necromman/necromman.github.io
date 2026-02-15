/**
 * index-app.js
 * Progressive enhancement for the SSR landing page.
 * HTML is pre-rendered by 11ty (SEO-friendly). This script adds:
 * - Pagination (5 series per page, infinite scroll)
 * - TOC sidebar (active tracking, click-to-navigate)
 * - Search (filter cards by keyword, disables pagination)
 * - Sort (ascending/descending by series number)
 * - Mobile TOC drawer
 *
 * localStorage keys:
 *   editorial-sort — 'asc' | 'desc' (default: desc)
 */
(function () {
  'use strict';

  /* ========== Constants ========== */

  var PAGE_SIZE = 5; // series per page

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
  var currentPage = 1;
  var totalPages = 1;
  var isSearching = false;
  var seriesGroups = []; // [{ divider, cards, num, seriesId }] in current DOM order

  /* ========== DOM refs ========== */

  var contentArea, searchInput, searchCount, noResults, sortBtn;
  var tocNav, tocSidebar, tocOverlay, tocToggle, tocPageInfo;
  var loadSentinel, pageProgress, scrollTopBtn;
  var scrollObserver = null;

  /* ========== Series groups ========== */

  /** Collect series dividers and their associated cards from DOM order */
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
          seriesId: el.getAttribute('data-series')
        };
        groups.push(current);
      } else if (current) {
        current.cards.push(el);
      }
    }

    return groups;
  }

  /* ========== Pagination ========== */

  function applyPagination() {
    if (isSearching) return;

    seriesGroups = collectSeriesGroups();
    totalPages = Math.ceil(seriesGroups.length / PAGE_SIZE);
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    var visibleCount = currentPage * PAGE_SIZE;

    for (var i = 0; i < seriesGroups.length; i++) {
      var g = seriesGroups[i];
      var hidden = i >= visibleCount;

      if (hidden) {
        g.divider.classList.add('paged-hidden');
        for (var j = 0; j < g.cards.length; j++) {
          g.cards[j].classList.add('paged-hidden');
        }
      } else {
        g.divider.classList.remove('paged-hidden');
        for (var k = 0; k < g.cards.length; k++) {
          g.cards[k].classList.remove('paged-hidden');
        }
      }
    }

    updateTocStates();
    updatePageInfo();
  }

  function loadNextPage() {
    if (currentPage >= totalPages) return;
    currentPage++;
    applyPagination();
  }

  function loadUpToSeries(seriesId) {
    seriesGroups = collectSeriesGroups();
    for (var i = 0; i < seriesGroups.length; i++) {
      if (seriesGroups[i].seriesId === seriesId) {
        var neededPage = Math.ceil((i + 1) / PAGE_SIZE);
        if (neededPage > currentPage) {
          currentPage = neededPage;
          applyPagination();
        }
        return;
      }
    }
  }

  function updatePageInfo() {
    var loaded = Math.min(currentPage * PAGE_SIZE, seriesGroups.length);
    var total = seriesGroups.length;

    if (tocPageInfo) {
      tocPageInfo.textContent = loaded + ' / ' + total;
    }

    if (pageProgress) {
      if (loaded < total) {
        pageProgress.textContent = loaded + ' / ' + total + ' series';
      } else {
        pageProgress.textContent = '';
      }
    }
  }

  /* ========== Infinite Scroll ========== */

  function setupInfiniteScroll() {
    if (!('IntersectionObserver' in window)) return;

    scrollObserver = new IntersectionObserver(function (entries) {
      if (isSearching) return;
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting && currentPage < totalPages) {
          loadNextPage();
        }
      }
    }, {
      rootMargin: '200px'
    });

    if (loadSentinel) {
      scrollObserver.observe(loadSentinel);
    }
  }

  /* ========== TOC ========== */

  function updateTocStates() {
    var tocItems = tocNav.querySelectorAll('.toc-item');
    var visibleCount = currentPage * PAGE_SIZE;

    for (var i = 0; i < tocItems.length; i++) {
      var tocItem = tocItems[i];
      var tocSeriesId = tocItem.getAttribute('data-toc-series');

      // Find this series' index in seriesGroups
      var groupIndex = -1;
      for (var j = 0; j < seriesGroups.length; j++) {
        if (seriesGroups[j].seriesId === tocSeriesId) {
          groupIndex = j;
          break;
        }
      }

      if (groupIndex >= 0 && groupIndex < visibleCount) {
        tocItem.classList.remove('unloaded');
      } else {
        tocItem.classList.add('unloaded');
      }
    }
  }

  /**
   * Scroll-based active tracking (Bootstrap ScrollSpy approach).
   *
   * Algorithm:
   * 1. Find the LAST divider whose top has scrolled past the offset line
   *    → this is the section the user is currently reading.
   * 2. Bottom-of-page: if the user has scrolled to the very bottom,
   *    force the last visible divider as active (classic ScrollSpy fix).
   * 3. Top fallback: if no divider has passed the offset yet, activate
   *    the first one.
   */
  var activeSeriesId = null;
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
    var dividers = contentArea.querySelectorAll('.series-divider:not(.paged-hidden)');
    if (!dividers.length) return;

    var offset = 150; // threshold from top of viewport
    var best = null;

    // 1. Find the LAST divider whose top has crossed the offset line.
    //    By iterating forward and overwriting `best`, we naturally
    //    end up with the most recent (lowest on page) qualifying section.
    for (var i = 0; i < dividers.length; i++) {
      if (dividers[i].getBoundingClientRect().top <= offset) {
        best = dividers[i];
      }
    }

    // 2. Bottom-of-page fix: when the user is near the bottom,
    //    the last section can never scroll its divider past the offset.
    //    Force the last visible divider as active.
    var scrollBottom = window.innerHeight + window.scrollY;
    var docHeight = document.documentElement.scrollHeight;
    if (docHeight - scrollBottom < 100) {
      best = dividers[dividers.length - 1];
    }

    // 3. Top fallback: nothing has passed the offset yet → first divider.
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
    });

    // Initial sync
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

  function handleTocClick(e) {
    e.preventDefault();
    var tocItem = e.target.closest('.toc-item');
    if (!tocItem) return;

    var seriesId = tocItem.getAttribute('data-toc-series');

    // Load up to this series if not yet loaded
    loadUpToSeries(seriesId);

    // Immediately set this item as active (don't wait for scroll event)
    setActiveTocItem(seriesId);

    // Scroll to series divider (instant, no animation)
    var divider = document.getElementById('series-' + seriesId);
    if (divider) {
      divider.scrollIntoView({ behavior: 'instant', block: 'start' });
    }

    // Close mobile drawer if open
    closeMobileToc();
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
    items.forEach(function (el) {
      contentArea.appendChild(el);
    });

    // Also reorder TOC items
    var tocItems = Array.prototype.slice.call(
      tocNav.querySelectorAll('.toc-item')
    );
    tocItems.sort(function (a, b) {
      var aNum = parseInt(a.getAttribute('data-toc-num'), 10);
      var bNum = parseInt(b.getAttribute('data-toc-num'), 10);
      return sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
    });
    tocItems.forEach(function (el) {
      tocNav.appendChild(el);
    });

    // Reset pagination
    currentPage = 1;
    applyPagination();
  }

  function handleSort() {
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    saveSort(sortOrder);
    syncSortBtn();
    reorderAll();
  }

  function syncSortBtn() {
    if (sortOrder === 'desc') {
      sortBtn.textContent = '\uCD5C\uC2E0\uC21C';
      sortBtn.classList.add('active');
    } else {
      sortBtn.textContent = '\uC624\uB798\uB41C\uC21C';
      sortBtn.classList.remove('active');
    }
  }

  /* ========== Search ========== */

  function applySearch(query) {
    var cards = contentArea.querySelectorAll('.article-card');
    var dividers = contentArea.querySelectorAll('.series-divider');
    var totalVisible = 0;
    var visibleSeries = {};

    // Remove pagination hiding during search
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.remove('paged-hidden');
    }
    for (var d = 0; d < dividers.length; d++) {
      dividers[d].classList.remove('paged-hidden');
    }

    for (var j = 0; j < cards.length; j++) {
      var card = cards[j];
      var searchText = (card.getAttribute('data-search') || '').toLowerCase();
      var titleText = card.querySelector('.card-title').textContent.toLowerCase();
      var roleText = card.querySelector('.card-desc').textContent.toLowerCase();
      var combined = searchText + ' ' + titleText + ' ' + roleText;

      if (combined.indexOf(query) !== -1) {
        card.style.display = '';
        visibleSeries[card.getAttribute('data-series')] = true;
        totalVisible++;
      } else {
        card.style.display = 'none';
      }
    }

    for (var k = 0; k < dividers.length; k++) {
      var sid = dividers[k].getAttribute('data-series');
      dividers[k].style.display = visibleSeries[sid] ? '' : 'none';
    }

    // Update TOC: highlight matching series
    var tocItems = tocNav.querySelectorAll('.toc-item');
    for (var t = 0; t < tocItems.length; t++) {
      var tocSid = tocItems[t].getAttribute('data-toc-series');
      tocItems[t].classList.remove('unloaded');
      if (visibleSeries[tocSid]) {
        tocItems[t].style.opacity = '';
      } else {
        tocItems[t].style.opacity = '0.3';
      }
    }

    searchCount.textContent = totalVisible + ' results';
    noResults.style.display = totalVisible === 0 ? 'block' : 'none';

    isSearching = true;
  }

  function clearSearch() {
    var items = contentArea.querySelectorAll('.article-card, .series-divider');
    for (var i = 0; i < items.length; i++) {
      items[i].style.display = '';
    }

    // Reset TOC opacity
    var tocItems = tocNav.querySelectorAll('.toc-item');
    for (var t = 0; t < tocItems.length; t++) {
      tocItems[t].style.opacity = '';
    }

    searchCount.textContent = '';
    noResults.style.display = 'none';

    isSearching = false;

    // Re-apply pagination
    applyPagination();
  }

  function handleSearch() {
    var query = searchInput.value.trim().toLowerCase();
    if (!query) {
      clearSearch();
      return;
    }
    applySearch(query);
  }

  /* ========== Mobile TOC ========== */

  function openMobileToc() {
    tocSidebar.classList.add('mobile-open');
    tocOverlay.style.display = 'block';
    // Force reflow for transition
    void tocOverlay.offsetWidth;
    tocOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileToc() {
    tocSidebar.classList.remove('mobile-open');
    tocOverlay.classList.remove('open');
    document.body.style.overflow = '';
    // Hide overlay after transition
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

    // Show/hide based on scroll position
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
    });
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
    loadSentinel = document.getElementById('loadSentinel');
    pageProgress = document.getElementById('pageProgress');
    scrollTopBtn = document.getElementById('scrollTopBtn');

    // Add close button to TOC sidebar (for mobile)
    var closeBtn = document.createElement('button');
    closeBtn.className = 'toc-close-btn';
    closeBtn.textContent = '\uB2EB\uAE30';
    closeBtn.addEventListener('click', closeMobileToc);
    tocSidebar.insertBefore(closeBtn, tocSidebar.firstChild);

    // Apply saved sort order (SSR default is descending)
    if (sortOrder === 'asc') {
      reorderAll();
    } else {
      // Just apply pagination for default desc order
      applyPagination();
    }

    // Bind events
    sortBtn.addEventListener('click', handleSort);
    searchInput.addEventListener('input', handleSearch);
    tocNav.addEventListener('click', handleTocClick);

    if (tocToggle) {
      tocToggle.addEventListener('click', openMobileToc);
    }

    if (tocOverlay) {
      tocOverlay.addEventListener('click', closeMobileToc);
    }

    // Sync button label
    syncSortBtn();

    // Setup infinite scroll
    setupInfiniteScroll();

    // Setup active series tracking
    setupActiveTracking();

    // Setup scroll to top button
    setupScrollTopBtn();
  });
})();

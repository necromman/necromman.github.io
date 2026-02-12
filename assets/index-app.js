/**
 * index-app.js
 * Progressive enhancement for the SSR landing page.
 * HTML is pre-rendered by 11ty. This script adds:
 * - Search (filter articles by keyword)
 * - Sort (ascending/descending by series number)
 * - Collapse/Expand (toggle series bodies)
 *
 * localStorage keys:
 *   editorial-sort      — 'asc' | 'desc' (default: desc)
 *   editorial-collapsed — JSON object { seriesId: true/false }
 */
(function () {
  'use strict';

  /* ---------- localStorage helpers ---------- */

  function loadSort() {
    var v = localStorage.getItem('editorial-sort');
    return v === 'asc' ? 'asc' : 'desc';
  }

  function saveSort(order) {
    localStorage.setItem('editorial-sort', order);
  }

  function loadCollapsed() {
    try {
      var v = localStorage.getItem('editorial-collapsed');
      return v ? JSON.parse(v) : {};
    } catch (e) {
      return {};
    }
  }

  function saveCollapsed(obj) {
    localStorage.setItem('editorial-collapsed', JSON.stringify(obj));
  }

  /* ---------- State ---------- */

  var sortOrder = loadSort();
  var collapsed = loadCollapsed();

  var contentArea, searchInput, searchCount, noResults, sortBtn, toggleAllBtn;

  /* ---------- Sort ---------- */

  function reorderSections() {
    var sections = Array.prototype.slice.call(contentArea.querySelectorAll('.series-section'));
    sections.sort(function (a, b) {
      var aNum = parseInt(a.getAttribute('data-series-num'), 10);
      var bNum = parseInt(b.getAttribute('data-series-num'), 10);
      return sortOrder === 'asc' ? aNum - bNum : bNum - aNum;
    });
    sections.forEach(function (s) {
      contentArea.appendChild(s);
    });
  }

  function handleSort() {
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    saveSort(sortOrder);
    syncSortBtn();
    reorderSections();
  }

  function syncSortBtn() {
    if (sortOrder === 'desc') {
      sortBtn.textContent = '최신순';
      sortBtn.classList.add('active');
    } else {
      sortBtn.textContent = '오래된순';
      sortBtn.classList.remove('active');
    }
  }

  /* ---------- Collapse ---------- */

  function applyCollapsedState() {
    var sections = contentArea.querySelectorAll('.series-section');
    for (var i = 0; i < sections.length; i++) {
      var id = sections[i].getAttribute('data-series');
      var body = sections[i].querySelector('.series-body');
      var toggle = sections[i].querySelector('.series-toggle');
      if (collapsed[id]) {
        body.classList.add('collapsed');
        toggle.classList.add('collapsed');
      }
    }
  }

  function onHeaderClick() {
    var id = this.getAttribute('data-sid');
    var body = this.nextElementSibling;
    var toggle = this.querySelector('.series-toggle');
    body.classList.toggle('collapsed');
    toggle.classList.toggle('collapsed');
    collapsed[id] = body.classList.contains('collapsed');
    saveCollapsed(collapsed);
    syncToggleAllBtn();
  }

  function bindHeaders() {
    var headers = contentArea.querySelectorAll('.series-header');
    for (var i = 0; i < headers.length; i++) {
      headers[i].addEventListener('click', onHeaderClick);
    }
  }

  /* ---------- Toggle All ---------- */

  function isAllExpanded() {
    var bodies = contentArea.querySelectorAll('.series-body');
    if (!bodies.length) return true;
    for (var i = 0; i < bodies.length; i++) {
      if (bodies[i].classList.contains('collapsed')) return false;
    }
    return true;
  }

  function handleToggleAll() {
    var expand = !isAllExpanded();
    var bodies = contentArea.querySelectorAll('.series-body');
    var toggles = contentArea.querySelectorAll('.series-toggle');
    var sections = contentArea.querySelectorAll('.series-section');

    for (var i = 0; i < bodies.length; i++) {
      if (expand) {
        bodies[i].classList.remove('collapsed');
        toggles[i].classList.remove('collapsed');
      } else {
        bodies[i].classList.add('collapsed');
        toggles[i].classList.add('collapsed');
      }
    }
    for (var j = 0; j < sections.length; j++) {
      collapsed[sections[j].getAttribute('data-series')] = !expand;
    }
    saveCollapsed(collapsed);
    syncToggleAllBtn();
  }

  function syncToggleAllBtn() {
    toggleAllBtn.textContent = isAllExpanded() ? '모두 접기' : '모두 펼침';
  }

  /* ---------- Search ---------- */

  function applySearch(query) {
    var sections = contentArea.querySelectorAll('.series-section');
    var totalVisible = 0;

    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var items = section.querySelectorAll('li');
      var sectionVisible = 0;

      for (var j = 0; j < items.length; j++) {
        var link = items[j].querySelector('.article-item');
        var searchText = (link.getAttribute('data-search') || '').toLowerCase();
        var titleText = link.querySelector('.article-title').textContent.toLowerCase();
        var roleText = link.querySelector('.article-role').textContent.toLowerCase();
        var combined = searchText + ' ' + titleText + ' ' + roleText;

        if (combined.indexOf(query) !== -1) {
          items[j].style.display = '';
          sectionVisible++;
        } else {
          items[j].style.display = 'none';
        }
      }

      if (sectionVisible > 0) {
        section.style.display = '';
        section.querySelector('.series-body').classList.remove('collapsed');
        section.querySelector('.series-toggle').classList.remove('collapsed');
      } else {
        section.style.display = 'none';
      }
      totalVisible += sectionVisible;
    }

    searchCount.textContent = totalVisible + ' results';
    noResults.style.display = totalVisible === 0 ? 'block' : 'none';
  }

  function clearSearch() {
    var sections = contentArea.querySelectorAll('.series-section');
    for (var i = 0; i < sections.length; i++) {
      sections[i].style.display = '';
      var items = sections[i].querySelectorAll('li');
      for (var j = 0; j < items.length; j++) {
        items[j].style.display = '';
      }
      var id = sections[i].getAttribute('data-series');
      var body = sections[i].querySelector('.series-body');
      var toggle = sections[i].querySelector('.series-toggle');
      if (collapsed[id]) {
        body.classList.add('collapsed');
        toggle.classList.add('collapsed');
      } else {
        body.classList.remove('collapsed');
        toggle.classList.remove('collapsed');
      }
    }
    searchCount.textContent = '';
    noResults.style.display = 'none';
  }

  function handleSearch() {
    var query = searchInput.value.trim().toLowerCase();
    if (!query) {
      clearSearch();
      return;
    }
    applySearch(query);
  }

  /* ---------- Init ---------- */

  document.addEventListener('DOMContentLoaded', function () {
    contentArea = document.getElementById('contentArea');
    searchInput = document.getElementById('searchInput');
    searchCount = document.getElementById('searchCount');
    noResults = document.getElementById('noResults');
    sortBtn = document.getElementById('sortBtn');
    toggleAllBtn = document.getElementById('toggleAllBtn');

    // Apply saved collapsed state to SSR HTML
    applyCollapsedState();

    // Apply saved sort order (SSR default is descending)
    if (sortOrder === 'asc') {
      reorderSections();
    }

    // Bind events
    bindHeaders();
    sortBtn.addEventListener('click', handleSort);
    toggleAllBtn.addEventListener('click', handleToggleAll);
    searchInput.addEventListener('input', handleSearch);

    // Sync button labels
    syncSortBtn();
    syncToggleAllBtn();
  });
})();

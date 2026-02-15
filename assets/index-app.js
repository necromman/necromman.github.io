/**
 * index-app.js
 * Progressive enhancement for the SSR landing page.
 * HTML is pre-rendered by 11ty. This script adds:
 * - Search (filter cards by keyword)
 * - Sort (ascending/descending by series number)
 *
 * Grid children: .series-divider (full-width headers) + .article-card
 * Both carry data-series-num for sorting.
 *
 * localStorage keys:
 *   editorial-sort — 'asc' | 'desc' (default: desc)
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

  /* ---------- State ---------- */

  var sortOrder = loadSort();
  var contentArea, searchInput, searchCount, noResults, sortBtn;

  /* ---------- Sort ---------- */

  function reorderAll() {
    // Collect all grid children (dividers + cards)
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
  }

  function handleSort() {
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    saveSort(sortOrder);
    syncSortBtn();
    reorderAll();
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

  /* ---------- Search ---------- */

  function applySearch(query) {
    var cards = contentArea.querySelectorAll('.article-card');
    var dividers = contentArea.querySelectorAll('.series-divider');
    var totalVisible = 0;
    var visibleSeries = {};

    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
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

    // Show/hide series dividers based on whether any card in that series matched
    for (var j = 0; j < dividers.length; j++) {
      var sid = dividers[j].getAttribute('data-series');
      dividers[j].style.display = visibleSeries[sid] ? '' : 'none';
    }

    searchCount.textContent = totalVisible + ' results';
    noResults.style.display = totalVisible === 0 ? 'block' : 'none';
  }

  function clearSearch() {
    var items = contentArea.querySelectorAll('.article-card, .series-divider');
    for (var i = 0; i < items.length; i++) {
      items[i].style.display = '';
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

    // Apply saved sort order (SSR default is descending)
    if (sortOrder === 'asc') {
      reorderAll();
    }

    // Bind events
    sortBtn.addEventListener('click', handleSort);
    searchInput.addEventListener('input', handleSearch);

    // Sync button label
    syncSortBtn();
  });
})();

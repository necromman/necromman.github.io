/**
 * index-app.js
 * 랜딩 페이지 렌더링, 검색, 정렬(ASC/DESC), 모두 펼침/접기 로직
 * content-data.js가 먼저 로드되어야 합니다.
 */
(function () {
  'use strict';

  var sortOrder = 'asc';
  var collapsed = {};

  var contentArea, searchInput, searchCount, noResults, sortBtn, toggleAllBtn;

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function esc(s) {
    var el = document.createElement('span');
    el.textContent = s;
    return el.innerHTML;
  }

  function getSortedData() {
    var data = window.CONTENT_DATA.slice();
    if (sortOrder === 'desc') {
      data.reverse();
    }
    return data;
  }

  function render() {
    var data = getSortedData();
    var html = '';

    data.forEach(function (series) {
      var seriesNum = window.CONTENT_DATA.indexOf(series) + 1;
      var isCollapsed = !!collapsed[series.id];
      html += '<section class="series-section" data-series="' + series.id + '">'
        + '<div class="series-header" data-sid="' + series.id + '">'
        + '<span class="series-label">Series ' + pad(seriesNum) + '</span>'
        + '<h2 class="series-title">' + esc(series.title) + '</h2>'
        + '<span class="series-toggle' + (isCollapsed ? ' collapsed' : '') + '">&#9660;</span>'
        + '</div>'
        + '<div class="series-body' + (isCollapsed ? ' collapsed' : '') + '">'
        + '<div class="series-meta">'
        + '<p class="series-desc">' + esc(series.description) + '</p>'
        + '<span class="series-count">' + series.articles.length + ' articles</span>'
        + '</div>'
        + '<nav><ul class="article-list">';

      series.articles.forEach(function (a, aIdx) {
        html += '<li>'
          + '<a class="article-item" href="' + a.href + '" data-search="' + esc(a.search) + '">'
          + '<span class="article-num">' + pad(aIdx + 1) + '</span>'
          + '<div class="article-info">'
          + '<div class="article-title">' + esc(a.title) + '</div>'
          + '<div class="article-role">' + esc(a.role) + '</div>'
          + '</div>'
          + '<span class="article-tag">' + esc(a.tag) + '</span>'
          + '</a></li>';
      });

      html += '</ul></nav></div></section>';
    });

    contentArea.innerHTML = html;
    bindHeaders();
    syncToggleAllBtn();

    var query = searchInput.value.trim().toLowerCase();
    if (query) applySearch(query);
  }

  function bindHeaders() {
    var headers = contentArea.querySelectorAll('.series-header');
    for (var i = 0; i < headers.length; i++) {
      headers[i].addEventListener('click', onHeaderClick);
    }
  }

  function onHeaderClick() {
    var id = this.getAttribute('data-sid');
    var body = this.nextElementSibling;
    var toggle = this.querySelector('.series-toggle');
    body.classList.toggle('collapsed');
    toggle.classList.toggle('collapsed');
    collapsed[id] = body.classList.contains('collapsed');
    syncToggleAllBtn();
  }

  /* ---------- 정렬 ---------- */

  function handleSort() {
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    syncSortBtn();
    render();
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

  /* ---------- 모두 펼침/접기 ---------- */

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
    syncToggleAllBtn();
  }

  function syncToggleAllBtn() {
    toggleAllBtn.textContent = isAllExpanded() ? '모두 접기' : '모두 펼침';
  }

  /* ---------- 검색 ---------- */

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

  /* ---------- 초기화 ---------- */

  document.addEventListener('DOMContentLoaded', function () {
    contentArea = document.getElementById('contentArea');
    searchInput = document.getElementById('searchInput');
    searchCount = document.getElementById('searchCount');
    noResults = document.getElementById('noResults');
    sortBtn = document.getElementById('sortBtn');
    toggleAllBtn = document.getElementById('toggleAllBtn');

    sortBtn.addEventListener('click', handleSort);
    toggleAllBtn.addEventListener('click', handleToggleAll);
    searchInput.addEventListener('input', handleSearch);

    syncSortBtn();
    render();
  });
})();

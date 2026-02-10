/* theme-toggle.js — 다크/라이트 테마 토글 (전역)
 *
 * 동작 방식:
 * 1. <head> 인라인 스크립트가 FOUC 방지용으로 즉시 data-theme 적용
 * 2. 이 파일은 토글 버튼 UI + 이벤트만 담당
 * 3. nav.js가 삽입한 #theme-toggle 버튼에 이벤트를 바인딩
 * 4. index.html은 nav.js 없이 자체 토글 버튼 사용
 */
(function () {
  'use strict';

  function getTheme() {
    var saved = localStorage.getItem('editorial-theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('editorial-theme', theme);
    updateButtons(theme);
  }

  function updateButtons(theme) {
    var btns = document.querySelectorAll('.theme-toggle-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].textContent = theme === 'dark' ? 'Light' : 'Dark';
      btns[i].setAttribute('aria-label',
        theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환');
    }
  }

  function toggle() {
    var current = document.documentElement.getAttribute('data-theme') || getTheme();
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // 토글 버튼 이벤트 바인딩
  function bindButtons() {
    var btns = document.querySelectorAll('.theme-toggle-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', toggle);
    }
    updateButtons(getTheme());
  }

  // OS 다크모드 변경 감지
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
    if (!localStorage.getItem('editorial-theme')) {
      applyTheme(getTheme());
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindButtons);
  } else {
    bindButtons();
  }
})();

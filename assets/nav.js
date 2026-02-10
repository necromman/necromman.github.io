(function() {
  // nav.js의 script src 경로에서 프로젝트 루트 경로를 역산한다
  // src="../../assets/nav.js" → basePath = "../../"
  // src="../assets/nav.js"   → basePath = "../"
  var scripts = document.getElementsByTagName('script');
  var basePath = '';
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].getAttribute('src') || '';
    if (src.indexOf('assets/nav.js') !== -1) {
      basePath = src.replace('assets/nav.js', '');
      break;
    }
  }

  // fallback: GitHub Pages 배포 환경
  if (!basePath) {
    var path = window.location.pathname;
    if (path.indexOf('/editorial/') !== -1) {
      basePath = '/editorial/';
    } else {
      basePath = '/';
    }
  }

  var homeUrl = basePath + 'index.html';

  // 스타일시트 삽입 (CSS 변수 사용 — 다크모드 자동 대응)
  var style = document.createElement('style');
  style.textContent =
    '#site-nav{border-bottom:1px solid var(--rule);background:var(--bg);position:sticky;top:0;z-index:100;will-change:transform}' +
    '#site-nav .nav-inner{max-width:780px;margin:0 auto;padding:12px 24px;display:flex;align-items:center;justify-content:space-between}' +
    '#site-nav .nav-logo{font-family:var(--serif);font-size:0.95rem;font-weight:700;color:var(--fg);text-decoration:none;letter-spacing:-0.5px}' +
    '#site-nav .nav-right{display:flex;align-items:center;gap:16px}' +
    '#site-nav .nav-back{font-family:var(--serif);font-size:0.8rem;color:var(--muted);text-decoration:none}' +
    '#site-nav .theme-toggle-btn{font-family:var(--mono);font-size:0.65rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);background:none;border:1px solid var(--rule);padding:4px 12px;cursor:pointer;transition:border-color 0.2s,color 0.2s}' +
    '#site-nav .theme-toggle-btn:hover{border-color:var(--fg);color:var(--fg)}';
  document.head.appendChild(style);

  var nav = document.createElement('nav');
  nav.setAttribute('id', 'site-nav');
  nav.innerHTML =
    '<div class="nav-inner">' +
      '<a href="' + homeUrl + '" class="nav-logo">Editorial</a>' +
      '<div class="nav-right">' +
        '<button type="button" class="theme-toggle-btn" aria-label="테마 전환">Dark</button>' +
        '<a href="' + homeUrl + '" class="nav-back">\u2190 \ubaa9\ub85d\uc73c\ub85c</a>' +
      '</div>' +
    '</div>';

  document.body.insertBefore(nav, document.body.firstChild);

  // GoatCounter 수동 추적 (count.js 없이 — CSP 충돌 방지)
  if (location.protocol !== 'file:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1' && location.hostname !== '::1') {
    var img = new Image();
    img.src = 'https://necromman.goatcounter.com/count?p=' + encodeURIComponent(location.pathname)
      + '&t=' + encodeURIComponent(document.title)
      + '&r=' + encodeURIComponent(document.referrer);
  }
})();

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

  var nav = document.createElement('nav');
  nav.setAttribute('id', 'site-nav');
  nav.innerHTML =
    '<div style="max-width:780px;margin:0 auto;padding:12px 24px;display:flex;align-items:center;justify-content:space-between">' +
      '<a href="' + homeUrl + '" style="font-family:\'Source Serif 4\',\'Source Serif 4 Fallback\',\'Pretendard Variable\',Pretendard,serif;font-size:0.95rem;font-weight:700;color:inherit;text-decoration:none;letter-spacing:-0.5px">' +
        'Editorial' +
      '</a>' +
      '<a href="' + homeUrl + '" style="font-family:\'Source Serif 4\',\'Source Serif 4 Fallback\',\'Pretendard Variable\',Pretendard,serif;font-size:0.8rem;color:#8a8680;text-decoration:none">' +
        '\u2190 \ubaa9\ub85d\uc73c\ub85c' +
      '</a>' +
    '</div>';

  nav.style.cssText = 'border-bottom:1px solid #d5d0c8;background:#faf8f4;position:sticky;top:0;z-index:100';

  document.body.insertBefore(nav, document.body.firstChild);

  // GoatCounter 수동 추적 (count.js 없이 — CSP 충돌 방지)
  if (location.protocol !== 'file:' && location.hostname !== 'localhost') {
    var img = new Image();
    img.src = 'https://necromman.goatcounter.com/count?p=' + encodeURIComponent(location.pathname)
      + '&r=' + encodeURIComponent(document.referrer);
  }
})();

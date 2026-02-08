(function() {
  // 시리즈 데이터 — 새 콘텐츠 추가 시 여기에 항목을 추가한다
  var SERIES = {
    'wasted-life-series': {
      label: 'Series 01',
      title: '99%\uAC00 \uC778\uC0DD\uC744 \uB0AD\uBE44\uD558\uB294 \uC774\uC720',
      articles: [
        { slug: '99-percent-wasted-life-guide', title: '99\uD37C\uC13C\uD2B8 \uC778\uC0DD\uB0AD\uBE44 \uC801\uC6A9\uAC00\uC774\uB4DC' },
        { slug: 'what-self-help-wont-tell-you', title: '\uC790\uAE30\uACC4\uBC1C\uC774 \uB9D0\uD558\uC9C0 \uC54A\uB294 \uAC83' },
        { slug: 'conditions-for-change', title: '\uBCC0\uD654\uC758 \uC870\uAC74' },
        { slug: 'so-what-now', title: '\uADF8\uB798\uC11C \uC5B4\uB5A1\uD558\uB77C\uACE0' },
        { slug: 'how-this-was-made', title: '\uC774 \uBB38\uC11C\uB294 \uC5B4\uB5BB\uAC8C \uB9CC\uB4E4\uC5B4\uC84C\uB294\uAC00' }
      ]
    }
  };

  // 현재 페이지의 슬러그와 시리즈를 찾는다
  var path = window.location.pathname;
  var filename = path.split('/').pop().replace('.html', '');
  var currentSeries = null;
  var currentIndex = -1;

  for (var seriesKey in SERIES) {
    var series = SERIES[seriesKey];
    for (var i = 0; i < series.articles.length; i++) {
      if (series.articles[i].slug === filename) {
        currentSeries = series;
        currentIndex = i;
        break;
      }
    }
    if (currentSeries) break;
  }

  if (!currentSeries || currentIndex === -1) return;

  var prev = currentIndex > 0 ? currentSeries.articles[currentIndex - 1] : null;
  var next = currentIndex < currentSeries.articles.length - 1 ? currentSeries.articles[currentIndex + 1] : null;

  if (!prev && !next) return;

  // 네비게이션 HTML 생성
  var html = '<div style="border-top:1px solid #1a1a18;padding-top:12px;margin-bottom:8px">' +
    '<span style="font-family:\'JetBrains Mono\',monospace;font-size:0.6rem;letter-spacing:3px;text-transform:uppercase;color:#c43e2a;font-weight:600">' +
    currentSeries.label + '</span>' +
    '<span style="font-family:\'Source Serif 4\',Pretendard,sans-serif;font-size:0.85rem;color:#8a8680;margin-left:12px">' +
    currentSeries.title + '</span>' +
    '</div>';

  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#d5d0c8;border:1px solid #d5d0c8">';

  // 이전 글
  if (prev) {
    html += '<a href="' + prev.slug + '.html" style="background:#faf8f4;padding:24px 20px;text-decoration:none;color:inherit;display:block;transition:background 0.2s"' +
      ' onmouseover="this.style.background=\'#f2efe9\'" onmouseout="this.style.background=\'#faf8f4\'">' +
      '<span style="font-family:\'JetBrains Mono\',monospace;font-size:0.6rem;letter-spacing:2px;text-transform:uppercase;color:#8a8680;display:block;margin-bottom:8px">' +
      '\u2190 \uC774\uC804 \uAE00</span>' +
      '<span style="font-family:\'Source Serif 4\',Pretendard,sans-serif;font-size:0.95rem;font-weight:600;line-height:1.4;color:#1a1a18">' +
      prev.title + '</span></a>';
  } else {
    html += '<div style="background:#faf8f4;padding:24px 20px"></div>';
  }

  // 다음 글
  if (next) {
    html += '<a href="' + next.slug + '.html" style="background:#faf8f4;padding:24px 20px;text-decoration:none;color:inherit;display:block;text-align:right;transition:background 0.2s"' +
      ' onmouseover="this.style.background=\'#f2efe9\'" onmouseout="this.style.background=\'#faf8f4\'">' +
      '<span style="font-family:\'JetBrains Mono\',monospace;font-size:0.6rem;letter-spacing:2px;text-transform:uppercase;color:#8a8680;display:block;margin-bottom:8px">' +
      '\uB2E4\uC74C \uAE00 \u2192</span>' +
      '<span style="font-family:\'Source Serif 4\',Pretendard,sans-serif;font-size:0.95rem;font-weight:600;line-height:1.4;color:#1a1a18">' +
      next.title + '</span></a>';
  } else {
    html += '<div style="background:#faf8f4;padding:24px 20px"></div>';
  }

  html += '</div>';

  // .footer 앞에 삽입
  var container = document.createElement('nav');
  container.setAttribute('id', 'series-nav');
  container.style.cssText = 'margin-top:64px';
  container.innerHTML = html;

  var footer = document.querySelector('.footer');
  if (footer) {
    footer.parentNode.insertBefore(container, footer);
  }
})();

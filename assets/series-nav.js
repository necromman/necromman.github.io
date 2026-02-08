(function() {
  // 시리즈 데이터 — 새 콘텐츠 추가 시 여기에 항목을 추가한다
  var SERIES = {
    'wasted-life-series': {
      label: 'Series 01',
      title: '99%가 인생을 낭비하는 이유',
      articles: [
        { slug: '99-percent-wasted-life-guide', title: '99퍼센트 인생낭비 적용가이드' },
        { slug: 'what-self-help-wont-tell-you', title: '자기계발이 말하지 않는 것' },
        { slug: 'conditions-for-change', title: '변화의 조건' },
        { slug: 'so-what-now', title: '그래서 어떡하라고' },
        { slug: 'how-this-was-made', title: '이 문서는 어떻게 만들어졌는가' }
      ]
    },
    'bithumb-60t-series': {
      label: 'Series 02',
      title: '딸깍 한 번의 60조 원',
      articles: [
        { slug: 'bithumb-60-trillion-incident', title: '딸깍 한 번의 60조 원' },
        { slug: 'whose-money-is-it', title: '그 돈은 누구의 것인가' },
        { slug: 'why-exchanges-use-ledgers', title: '거래소는 왜 장부로 거래하는가' }
      ]
    },
    'dev-survival-series': {
      label: 'Series 03',
      title: 'AI 시대 개발자 생존 보고서',
      articles: [
        { slug: 'ai-replaced-developers-reality', title: 'AI가 개발자를 대체한다는 말, 얼마나 사실인가' },
        { slug: 'why-developers-wont-disappear', title: '그래도 개발자가 사라지지 않는 이유' },
        { slug: 'developer-survival-playbook', title: '개발자 생존 플레이북' },
        { slug: 'developer-identity-in-ai-era', title: 'AI 시대, 개발자라는 정체성' }
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
      '\u2190 이전 글</span>' +
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
      '다음 글 \u2192</span>' +
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

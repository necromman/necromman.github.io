(function() {
  // 시리즈 데이터 — 새 콘텐츠 추가 시 여기에 항목을 추가한다
  var SERIES = {
    'wasted-life-series': {
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
      title: '딸깍 한 번의 60조 원',
      articles: [
        { slug: 'bithumb-60-trillion-incident', title: '딸깍 한 번의 60조 원' },
        { slug: 'whose-money-is-it', title: '그 돈은 누구의 것인가' },
        { slug: 'why-exchanges-use-ledgers', title: '거래소는 왜 장부로 거래하는가' }
      ]
    },
    'dev-survival-series': {
      title: 'AI 시대 개발자 생존 보고서',
      articles: [
        { slug: 'ai-replaced-developers-reality', title: 'AI가 개발자를 대체한다는 말, 얼마나 사실인가' },
        { slug: 'why-developers-wont-disappear', title: '그래도 개발자가 사라지지 않는 이유' },
        { slug: 'developer-survival-playbook', title: '개발자 생존 플레이북' },
        { slug: 'developer-identity-in-ai-era', title: 'AI 시대, 개발자라는 정체성' }
      ]
    },
    'vibe-coding-series': {
      title: '그래서 바이브 코딩은 뭘로 해야 되는데?',
      articles: [
        { slug: 'what-is-vibe-coding', title: '코드를 잊어버려라' },
        { slug: 'vibe-coding-tools-compared', title: '결국 뭘 쓸 것인가' },
        { slug: 'vibe-coding-survival-guide', title: '바이브 코딩의 함정' },
        { slug: 'vibe-coding-prompt-playbook', title: '프롬프트가 반이다' },
        { slug: 'vibe-coding-future', title: '에이전틱 엔지니어링 시대' },
        { slug: 'claude-code-in-practice', title: '터미널 하나면 된다' }
      ]
    },
    'openclaw-series': {
      title: 'OpenClaw 해부',
      articles: [
        { slug: 'what-is-openclaw', title: '이름 다섯 개, 스타 18만 — OpenClaw은 대체 뭔가' },
        { slug: 'openclaw-setup-and-reality', title: "'무료' AI 에이전트의 진짜 비용" },
        { slug: 'openclaw-security-and-alternatives', title: '만능 열쇠를 건네기 전에' }
      ]
    },
    'lineage-classic-series': {
      title: '린저씨의 귀환',
      articles: [
        { slug: 'lineage-classic-history', title: '1998년, 아덴의 탄생' },
        { slug: 'lineage-classic-return-of-linjerssi', title: '린저씨, 다시 아덴으로' },
        { slug: 'lineage-classic-bj-stamina', title: '올나잇은 20대의 특권이었다' },
        { slug: 'lineage-never-ends', title: '리니지는 끝나지 않는다' }
      ]
    },
    'claude-cowork-series': {
      title: '딸깍이 소프트웨어를 죽인다고?',
      articles: [
        { slug: 'saaspocalypse-what-happened', title: '7일 만에 1조 달러가 증발했다' },
        { slug: 'is-software-really-dead', title: '소프트웨어는 정말 죽는가' },
        { slug: 'software-survival-playbook', title: '소프트웨어 생존 플레이북' },
        { slug: 'future-of-software-2030', title: '2030년, 소프트웨어의 다음 형태' }
      ]
    },
    'vibe-design-series': {
      title: '디자이너 없이 제품 만들기',
      articles: [
        { slug: 'purple-gradient-syndrome', title: '보라색 그라디언트 증후군' },
        { slug: 'design-tokens-as-language', title: '디자인 토큰이라는 언어' },
        { slug: 'steal-like-a-designer', title: '남의 디자인을 훔치는 기술' },
        { slug: 'shadcn-cheat-code', title: 'shadcn/ui라는 치트키' },
        { slug: 'before-you-deploy', title: '배포 버튼을 누르기 전에' }
      ]
    },
    'git-series': {
      title: 'Git, pair 없이 살아남기',
      articles: [
        { slug: 'git-junior-survival-guide', title: 'commit, push, 기도 — 주니어의 Git' },
        { slug: 'git-disaster-and-recovery', title: 'force push 하나로 팀을 멸망시키는 법' },
        { slug: 'git-hidden-gems', title: 'git bisect를 아는 사람은 1%뿐이다' },
        { slug: 'git-branching-strategies', title: '브랜치 전략은 팀의 거울이다' },
        { slug: 'git-productivity-setup', title: '.gitconfig 하나로 생산성 2배' }
      ]
    },
    'gitlab-migration-series': {
      title: 'CTO의 깃랩 이사 공지가 불안한 이유',
      articles: [
        { slug: 'gitlab-migration-notice-anatomy', title: '내일 GitLab 주소 바뀝니다' },
        { slug: 'gitlab-migration-the-right-way', title: 'GitLab 서버 이사 — 정석은 이렇다' },
        { slug: 'gitlab-migration-developer-survival', title: '월요일 아침, git push가 안 될 때' }
      ]
    },
    'server-infra-guide-series': {
      title: '192.168.0.x의 규칙',
      articles: [
        { slug: 'server-infra-overview', title: '같은 네트워크, 제각각의 역할' },
        { slug: 'traefik-the-gatekeeper', title: '모든 트래픽은 여기를 지난다' },
        { slug: 'developer-server-survival-guide', title: '내 서버인데 왜 마음대로 못 쓰냐고요' },
        { slug: 'traefik-routing-guide', title: '저장하면 끝이다' }
      ]
    },
    'innobiz-guide-series': {
      title: '이노비즈 인증, 서류가 기술을 이긴다',
      articles: [
        { slug: 'innobiz-certification-guide', title: '서류가 기술을 증명한다' }
      ]
    },
    'sovereign-ai-novel-series': {
      title: '소버린 배당일',
      articles: [
        { slug: 'sovereign-dividend-day', title: '배당일' },
        { slug: 'compute-war', title: '컴퓨트 전쟁' },
        { slug: 'is-sovereign-ai-possible', title: '소버린 AI는 가능한가' },
        { slug: 'geopolitics-of-compute', title: '연산의 지정학' },
        { slug: 'human-without-labor', title: '일하지 않는 인간' }
      ]
    },
    'masterkey-series': {
      title: '마스터키',
      articles: [
        { slug: 'the-ai-knows-me', title: '그 AI는 나보다 나를 잘 안다' },
        { slug: 'the-proxy', title: '대리인' },
        { slug: 'invisible-legion', title: '보이지 않는 군단' },
        { slug: 'the-abyss', title: '심연' },
        { slug: 'masterkey', title: '마스터키' }
      ]
    },
    'ai-withdrawal-series': {
      title: '금단의 코드 — AI 없는 48시간',
      articles: [
        { slug: 'forbidden-code', title: '금단의 코드' },
        { slug: 'born-with-copilot', title: 'Copilot이 낳은 아이' },
        { slug: 'no-ai-friday', title: '금요일은 날코딩' },
        { slug: 'the-centaur-developer', title: '센타우르' }
      ]
    },
    'illusion-of-knowing-series': {
      title: '안다는 착각',
      articles: [
        { slug: 'forty-five-percent-vulnerable', title: '45%는 취약하다' },
        { slug: 'four-point-illusion', title: '4점의 착각' },
        { slug: 'the-floor-rose', title: '바닥이 올라왔을 뿐이다' },
        { slug: 'the-map-and-the-terrain', title: '지도와 지형' }
      ]
    },
    'future-cashcow-series': {
      title: '대표님의 미래먹거리',
      articles: [
        { slug: 'boss-wants-ai', title: '대표님, 그건 ChatGPT가 아닙니다' },
        { slug: 'one-point-two-percent', title: '월급의 1.2%' },
        { slug: 'five-hundred-megabytes', title: 'Supabase 무료 티어의 500MB' },
        { slug: 'demo-day-disaster', title: '데모가 터진 날' },
        { slug: 'the-business-plan', title: '사업계획서를 쓰는 밤' }
      ]
    },
    'ufo-physics-series': {
      title: '거기서 어떻게 오셨어요',
      articles: [
        { slug: 'ufo-mach-sixty', title: '틱택은 마하 60으로 날았다' },
        { slug: 'ufo-encounters', title: '인류가 목격한 것들' },
        { slug: 'ufo-theoretical-physics', title: '그 움직임을 가능하게 하려면' },
        { slug: 'interstellar-travel-reality', title: '별까지 가는 현실적인 방법' },
        { slug: 'fermis-question', title: '페르미의 질문' }
      ]
    },
    'starcraft-timeslip-series': {
      title: 'GG',
      articles: [
        { slug: 'one-thousand-won', title: '다시, 천 원짜리 한 장' },
        { slug: 'apm-one-thirty', title: 'APM 130의 벽' },
        { slug: 'trainee-number-seven', title: '연습생 번호 7번' },
        { slug: 'the-man-who-changed-meta', title: '메타를 바꾼 남자' },
        { slug: 'gg', title: 'GG' }
      ]
    },
    'vow-system-series': {
      title: '서약빨',
      articles: [
        { slug: 'first-shackle', title: '첫 번째 족쇄' },
        { slug: 'zero-freedom', title: '자유가 0이 되는 순간' },
        { slug: 'creators-defeat', title: '만든 자의 패배' },
        { slug: 'tower-of-vows', title: '서약의 탑' },
        { slug: 'full-dive-out', title: '풀다이브 아웃' }
      ]
    },
    'claude-code-guide-series': {
      title: '컨텍스트는 우유다',
      articles: [
        { slug: 'the-first-thirty-minutes', title: '처음 30분' },
        { slug: 'context-is-milk', title: '컨텍스트는 우유다' },
        { slug: 'autonomous-mode', title: '자율 주행 모드' },
        { slug: 'beyond-the-terminal', title: '터미널 밖으로' },
        { slug: 'build-your-own-tools', title: '나만의 도구를 만든다' }
      ]
    },
    'voice-phishing-series': {
      title: '엄마의 전화',
      articles: [
        { slug: 'hello-mom', title: '여보세요' },
        { slug: 'not-your-money', title: '본인의 돈이 아닙니다' },
        { slug: 'overruled', title: '각하합니다' },
        { slug: 'life-goes-on', title: '삶은 계속된다' }
      ]
    },
    'ai-server-setup-series': {
      title: '서버는 샀는데',
      articles: [
        { slug: 'no-data-yet', title: '데이터가 없다' },
        { slug: 'what-to-build', title: '뭘 만들 것인가' },
        { slug: 'before-the-server-arrives', title: '56일 후' }
      ]
    },
    'modern-mukhyang-series': {
      title: '묵향 — 탈마',
      articles: [
        { slug: 'non-standard', title: '탈마(脫魔)' }
      ]
    },
    'seventh-seat-series': {
      title: '일곱 번째 자리',
      articles: [
        { slug: 'empty-seat', title: '빈 자리' },
        { slug: 'mirror-forest', title: '거울의 숲' }
      ]
    },
    'mcp-agent-guide-series': {
      title: '에이전트 조립 가이드',
      articles: [
        { slug: 'agent-is-three-configs', title: '에이전트 조립하기' }
      ]
    }
  };

  // 현재 페이지의 슬러그와 시리즈를 찾는다
  var path = window.location.pathname;
  var filename = path.split('/').pop().replace('.html', '');
  var currentSeries = null;
  var currentSeriesKey = null;
  var currentIndex = -1;

  for (var seriesKey in SERIES) {
    var series = SERIES[seriesKey];
    for (var i = 0; i < series.articles.length; i++) {
      if (series.articles[i].slug === filename) {
        currentSeries = series;
        currentSeriesKey = seriesKey;
        currentIndex = i;
        break;
      }
    }
    if (currentSeries) break;
  }

  if (!currentSeries || currentIndex === -1) return;

  // 시리즈 번호를 객체 순서에서 자동 계산
  var seriesKeys = Object.keys(SERIES);
  var seriesNum = seriesKeys.indexOf(currentSeriesKey) + 1;
  var label = 'Series ' + (seriesNum < 10 ? '0' + seriesNum : String(seriesNum));

  var prev = currentIndex > 0 ? currentSeries.articles[currentIndex - 1] : null;
  var next = currentIndex < currentSeries.articles.length - 1 ? currentSeries.articles[currentIndex + 1] : null;

  if (!prev && !next) return;

  // CSS 변수 기반 스타일 삽입 (다크모드 자동 대응)
  var style = document.createElement('style');
  style.textContent =
    '#series-nav{margin-top:64px}' +
    '#series-nav .sn-header{border-top:1px solid var(--fg);padding-top:12px;margin-bottom:8px}' +
    '#series-nav .sn-label{font-family:var(--mono);font-size:0.6rem;letter-spacing:3px;text-transform:uppercase;color:var(--accent);font-weight:600}' +
    '#series-nav .sn-title{font-family:var(--serif);font-size:0.85rem;color:var(--muted);margin-left:12px}' +
    '#series-nav .sn-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--rule);border:1px solid var(--rule)}' +
    '#series-nav .sn-link{background:var(--bg);padding:24px 20px;text-decoration:none;color:inherit;display:block;transition:background 0.2s}' +
    '#series-nav .sn-link:hover{background:var(--card-bg)}' +
    '#series-nav .sn-empty{background:var(--bg);padding:24px 20px}' +
    '#series-nav .sn-dir{font-family:var(--mono);font-size:0.6rem;letter-spacing:2px;text-transform:uppercase;color:var(--muted);display:block;margin-bottom:8px}' +
    '#series-nav .sn-name{font-family:var(--serif);font-size:0.95rem;font-weight:600;line-height:1.4;color:var(--fg)}' +
    '#series-nav .sn-next{text-align:right}';
  document.head.appendChild(style);

  // 네비게이션 HTML 생성
  var html = '<div class="sn-header">' +
    '<span class="sn-label">' + label + '</span>' +
    '<span class="sn-title">' + currentSeries.title + '</span>' +
    '</div>';

  html += '<div class="sn-grid">';

  // 이전 글
  if (prev) {
    html += '<a href="' + prev.slug + '.html" class="sn-link">' +
      '<span class="sn-dir">\u2190 이전 글</span>' +
      '<span class="sn-name">' + prev.title + '</span></a>';
  } else {
    html += '<div class="sn-empty"></div>';
  }

  // 다음 글
  if (next) {
    html += '<a href="' + next.slug + '.html" class="sn-link sn-next">' +
      '<span class="sn-dir">다음 글 \u2192</span>' +
      '<span class="sn-name">' + next.title + '</span></a>';
  } else {
    html += '<div class="sn-empty"></div>';
  }

  html += '</div>';

  // .footer 앞에 삽입
  var container = document.createElement('nav');
  container.setAttribute('id', 'series-nav');
  container.innerHTML = html;

  var footer = document.querySelector('.footer');
  if (footer) {
    footer.parentNode.insertBefore(container, footer);
  }
})();

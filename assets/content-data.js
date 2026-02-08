/**
 * content-data.js
 * 블로그 콘텐츠 데이터. 새 시리즈/글 추가 시 이 파일만 수정하면 됩니다.
 */
window.CONTENT_DATA = [
  {
    id: 'wasted-life',
    seriesNum: 1,
    title: '99%가 인생을 낭비하는 이유',
    description: '유튜브 영상 하나에서 출발한 5편 시리즈. 원본 정리에서 팩트 반박, 종합 분석, 실행 매뉴얼, 제작 과정까지.',
    articles: [
      {
        num: 1,
        title: '99퍼센트 인생낭비 적용가이드',
        role: '유튜브 스크립트를 에디토리얼로 재구성',
        tag: '원본 정리',
        href: 'content/wasted-life-series/99-percent-wasted-life-guide.html',
        search: '99퍼센트 인생낭비 적용가이드 원본 정리 유튜브 스크립트 에디토리얼'
      },
      {
        num: 2,
        title: '자기계발이 말하지 않는 것',
        role: '학술 논문과 OECD 데이터로 팩트 기반 반박',
        tag: '반박',
        href: 'content/wasted-life-series/what-self-help-wont-tell-you.html',
        search: '자기계발이 말하지 않는 것 반박 학술 논문 OECD 데이터 생존자편향'
      },
      {
        num: 3,
        title: '변화의 조건',
        role: '양쪽 맹점을 교차 검증하는 종합 분석',
        tag: '종합',
        href: 'content/wasted-life-series/conditions-for-change.html',
        search: '변화의 조건 종합 분석 교차 검증 맹점 행동경제학 의사결정'
      },
      {
        num: 4,
        title: '그래서 어떡하라고',
        role: '자가 진단 + 90일 실험 프로토콜 실행 매뉴얼',
        tag: '실행',
        href: 'content/wasted-life-series/so-what-now.html',
        search: '그래서 어떡하라고 실행 매뉴얼 자가진단 90일 실험 프로토콜 습관'
      },
      {
        num: 5,
        title: '이 문서는 어떻게 만들어졌는가',
        role: 'AI 워크플로우와 콘텐츠 제작 과정',
        tag: '메타',
        href: 'content/wasted-life-series/how-this-was-made.html',
        search: '이 문서는 어떻게 만들어졌는가 메타 AI 워크플로우 콘텐츠 제작 과정 Gemini Claude'
      }
    ]
  },
  {
    id: 'bithumb-60t',
    seriesNum: 2,
    title: '딸깍 한 번의 60조 원',
    description: '빗썸 비트코인 62만 개 오지급 사고의 전말. 단위 입력 실수 하나가 만든 60조 원 규모의 유령 자산과 가상자산 거래소의 구조적 문제를 분석한다.',
    articles: [
      {
        num: 1,
        title: '딸깍 한 번의 60조 원',
        role: '빗썸 비트코인 62만 개 오지급 사고 분석',
        tag: '사고 분석',
        href: 'content/bithumb-60t-series/bithumb-60-trillion-incident.html',
        search: '딸깍 한 번의 60조 원 빗썸 비트코인 오지급 사고 거래소 장부 거래 삼성증권 유령주식 가상자산 규제'
      },
      {
        num: 2,
        title: '그 돈은 누구의 것인가',
        role: '오지급 130억 원의 수익화 경로, 법적 결과, 시나리오 분석',
        tag: '법적 분석',
        href: 'content/bithumb-60t-series/whose-money-is-it.html',
        search: '그 돈은 누구의 것인가 빗썸 오지급 수익화 법적 분석 부당이득 횡령 판례 삼성증권 착오송금 시나리오'
      },
      {
        num: 3,
        title: '거래소는 왜 장부로 거래하는가',
        role: '블록체인 한계, 거래소 아키텍처, 안전장치 부재의 기술적 해부',
        tag: '기술 분석',
        href: 'content/bithumb-60t-series/why-exchanges-use-ledgers.html',
        search: '거래소는 왜 장부로 거래하는가 블록체인 내부장부 매칭엔진 TPS 핫월렛 콜드월렛 바이낸스 코인베이스 FTX PoR 준비자산증명 DEX'
      }
    ]
  },
  {
    id: 'dev-survival',
    seriesNum: 3,
    title: 'AI 시대 개발자 생존 보고서',
    description: 'AI가 개발자를 대체한다는 불안 속에서, 데이터로 현실을 직시하고 역사적 패턴으로 반론하고 구체적 생존 전략까지. 신입과 경력 모두를 위한 4편 시리즈.',
    articles: [
      {
        num: 1,
        title: 'AI가 개발자를 대체한다는 말, 얼마나 사실인가',
        role: '데이터 기반 현실 직시',
        tag: '팩트 직시',
        href: 'content/dev-survival-series/ai-replaced-developers-reality.html',
        search: 'AI가 개발자를 대체한다는 말 얼마나 사실인가 팩트 데이터 GitHub Copilot 신입 채용 한국 개발자 고용 시장 바이브코딩'
      },
      {
        num: 2,
        title: '그래도 개발자가 사라지지 않는 이유',
        role: '역사적 패턴과 AI 한계 분석',
        tag: '반론',
        href: 'content/dev-survival-series/why-developers-wont-disappear.html',
        search: '그래도 개발자가 사라지지 않는 이유 반론 역사 자동화 AI 한계 아키텍처 요구사항 코드품질 복잡성'
      },
      {
        num: 3,
        title: '개발자 생존 플레이북',
        role: '신입/경력별 구체적 생존 전략',
        tag: '실행',
        href: 'content/dev-survival-series/developer-survival-playbook.html',
        search: '개발자 생존 플레이북 실행 전략 신입 경력 오픈소스 T자형 도메인 지식 AI 활용 한국 시장 SI 스타트업'
      },
      {
        num: 4,
        title: 'AI 시대, 개발자라는 정체성',
        role: '마인드셋 전환과 5년 후 시나리오',
        tag: '결론',
        href: 'content/dev-survival-series/developer-identity-in-ai-era.html',
        search: 'AI 시대 개발자라는 정체성 결론 마인드셋 5년 후 시나리오 문제 해결 불안 적응 네트워크'
      }
    ]
  },
  {
    id: 'vibe-coding',
    seriesNum: 4,
    title: '그래서 바이브 코딩은 뭘로 해야 되는데?',
    description: 'Cursor? Copilot? Claude Code? AI 코딩 도구가 넘쳐나는 시대, 뭘 써야 하는지부터 프롬프트 작성법까지. 비개발자도 이해할 수 있는 바이브 코딩 완전 가이드.',
    articles: [
      {
        num: 1,
        title: '코드를 잊어버려라',
        role: '바이브 코딩 개념과 시장 현황 입문',
        tag: '입문',
        href: 'content/vibe-coding-series/what-is-vibe-coding.html',
        search: '바이브 코딩 뭔데 입문 개념 Karpathy 카르파티 vibe coding 시장 현황 개발자 비개발자 AI 코딩'
      },
      {
        num: 2,
        title: '결국 뭘 쓸 것인가',
        role: 'Cursor, Copilot, Claude Code 등 8개 도구 상세 비교',
        tag: '비교분석',
        href: 'content/vibe-coding-series/vibe-coding-tools-compared.html',
        search: 'AI 코딩 도구 비교 Cursor Copilot Claude Code Windsurf Bolt Lovable Replit v0 가격 기능 추천'
      },
      {
        num: 3,
        title: '바이브 코딩의 함정',
        role: '보안 결함, 비용 폭탄, 실제 사고 사례와 체크리스트',
        tag: '실전',
        href: 'content/vibe-coding-series/vibe-coding-survival-guide.html',
        search: '바이브 코딩 생존 가이드 보안 결함 비용 폭탄 사고 사례 취약점 체크리스트 위험 삽질'
      },
      {
        num: 4,
        title: '프롬프트가 반이다',
        role: '프롬프트 구조화, Before/After 예시, 규칙 파일 작성법',
        tag: '실전',
        href: 'content/vibe-coding-series/vibe-coding-prompt-playbook.html',
        search: '프롬프트 플레이북 바이브 코딩 프롬프트 엔지니어링 구조화 Before After 규칙 파일 CLAUDE.md cursorrules'
      },
      {
        num: 5,
        title: '에이전틱 엔지니어링 시대',
        role: '에이전틱 엔지니어링과 개발자 역할 재정의',
        tag: '전망',
        href: 'content/vibe-coding-series/vibe-coding-future.html',
        search: '바이브 코딩 미래 에이전틱 엔지니어링 Karpathy 카르파티 개발자 역할 오케스트레이터 AI 에이전트'
      },
      {
        num: 6,
        title: '터미널 하나면 된다',
        role: 'Claude Code 실전: PRD부터 Docker 배포까지 전 구간 워크플로우',
        tag: '실전',
        href: 'content/vibe-coding-series/claude-code-in-practice.html',
        search: 'Claude Code 클로드코드 실전 PRD 배포 Docker Jenkins CLAUDE.md Skills 프롬프트 레시피 Python Java React TanStack 터미널 VS Code'
      }
    ]
  },
  {
    id: 'openclaw',
    seriesNum: 5,
    title: 'OpenClaw 해부',
    description: 'GitHub 역사상 가장 빠르게 성장한 오픈소스 AI 에이전트 OpenClaw. 5번 개명 드라마부터 보안 경고, 비용의 진실, 대안까지 완전 해부한다.',
    articles: [
      {
        num: 1,
        title: '이름 다섯 개, 스타 18만 — OpenClaw은 대체 뭔가',
        role: '5번 개명 드라마, Moltbook 사태, 바이럴 해부',
        tag: '해설',
        href: 'content/openclaw-series/what-is-openclaw.html',
        search: 'OpenClaw 오픈클로 Clawdbot Moltbot 개명 이름변경 GitHub 스타 Peter Steinberger Moltbook AI 에이전트 정체'
      },
      {
        num: 2,
        title: "'무료' AI 에이전트의 진짜 비용",
        role: '설치 가이드, 활용 시나리오, 월 비용 분석',
        tag: '가이드',
        href: 'content/openclaw-series/openclaw-setup-and-reality.html',
        search: 'OpenClaw 오픈클로 설치 세팅 비용 가격 API 토큰 월 청구서 활용법 WhatsApp Telegram 무료 오픈소스'
      },
      {
        num: 3,
        title: '만능 열쇠를 건네기 전에',
        role: 'CVE 분석, 보안 리스크, NanoClaw·n8n 등 대안 비교',
        tag: '분석',
        href: 'content/openclaw-series/openclaw-security-and-alternatives.html',
        search: 'OpenClaw 오픈클로 보안 CVE RCE 프롬프트 인젝션 CrowdStrike Trend Micro NanoClaw n8n Claude Code 대안'
      }
    ]
  },
  {
    id: 'lineage-classic',
    seriesNum: 6,
    title: '린저씨의 귀환',
    description: '1998년에 PC방을 점령했던 10대가 2026년에 40대가 되어 돌아왔다. 리니지 클래식 연대기 — 역사, BJ 체력 이슈, 9조 원 경제, 그리고 29,700원의 마지막 승부.',
    articles: [
      {
        num: 1,
        title: '1998년, 아덴의 탄생',
        role: 'PC방의 왕에서 9조 원 경제까지 28년의 역사',
        tag: '역사',
        href: 'content/lineage-classic-series/lineage-classic-history.html',
        search: '리니지 역사 1998 PC방 아덴 린저씨 바츠 해방전쟁 집행검 혈맹 공성전 동접 22만 엔씨소프트'
      },
      {
        num: 2,
        title: '린저씨, 다시 아덴으로',
        role: '엔씨 첫 적자와 월정액 29,700원의 승부수',
        tag: '분석',
        href: 'content/lineage-classic-series/lineage-classic-return-of-linjerssi.html',
        search: '리니지 클래식 엔씨소프트 적자 월정액 29700원 시즌패스 철회 서버 증설 복귀 린저씨'
      },
      {
        num: 3,
        title: '올나잇은 20대의 특권이었다',
        role: '40대 BJ들의 체력 이슈와 데포로쥬 3파전',
        tag: '유머',
        href: 'content/lineage-classic-series/lineage-classic-bj-stamina.html',
        search: '리니지 BJ 불도그 만만 꽃태자 올나잇 체력 40대 수액 한의원 데포로쥬 PC방 밈'
      },
      {
        num: 4,
        title: '리니지는 끝나지 않는다',
        role: '트럭시위부터 0.0001% 확률까지 28년 유산과 전망',
        tag: '결론',
        href: 'content/lineage-classic-series/lineage-never-ends.html',
        search: '리니지 문화 트럭시위 택진이형 사행성 0.0001 확률 린저씨 미래 전망 28년'
      }
    ]
  },
  {
    id: 'claude-cowork',
    seriesNum: 7,
    title: '딸깍이 소프트웨어를 죽인다고?',
    description: 'Claude Cowork 출시 후 7일 만에 1조 달러가 증발했다. AI 에이전트가 기존 소프트웨어를 정말 대체하는지, 데이터로 검증하고 생존 전략까지.',
    articles: [
      {
        num: 1,
        title: '7일 만에 1조 달러가 증발했다',
        role: 'SaaSpocalypse 사건 재구성',
        tag: '사건분석',
        href: 'content/claude-cowork-series/saaspocalypse-what-happened.html',
        search: 'Claude Cowork 클로드 코워크 SaaSpocalypse 소프트웨어 주가 폭락 413조 증발 가트너 리갈줌 Anthropic'
      },
      {
        num: 2,
        title: '소프트웨어는 정말 죽는가',
        role: '찬반 데이터 대결 — 팩트 기반 검증',
        tag: '팩트분석',
        href: 'content/claude-cowork-series/is-software-really-dead.html',
        search: 'SaaS 종말 AI 에이전트 소프트웨어 대체 젠슨 황 반박 나델라 골드만삭스 가트너 클라르나 AI 프로젝트 실패율'
      },
      {
        num: 3,
        title: '소프트웨어 생존 플레이북',
        role: '기업/개발자/사무직/투자자별 대응 전략',
        tag: '실전가이드',
        href: 'content/claude-cowork-series/software-survival-playbook.html',
        search: 'AI 시대 소프트웨어 전략 SaaS 생존 개발자 대응 사무직 AI 에이전트 활용 한국 기업 투자 체크리스트'
      },
      {
        num: 4,
        title: '2030년, 소프트웨어의 다음 형태',
        role: '4가지 시나리오와 2026-2035 타임라인',
        tag: '전망',
        href: 'content/claude-cowork-series/future-of-software-2030.html',
        search: '에이전틱 AI 미래 소프트웨어 2030 타임라인 SaaS 미래 메인프레임 Bain 가트너 Per-seat 과금 모델'
      }
    ]
  },
  {
    id: 'vibe-design',
    seriesNum: 8,
    title: '디자이너 없이 제품 만들기',
    description: '바이브 코딩의 진짜 병목은 디자인이다. bg-indigo-500의 원죄부터 디자인 토큰, 참조 디자인 워크플로우, shadcn/ui 전략, 배포 전 QA까지.',
    articles: [
      {
        num: 1,
        title: '보라색 그라디언트 증후군',
        role: 'AI UI가 다 비슷한 이유와 디자인 드리프트의 메커니즘',
        tag: '분석',
        href: 'content/vibe-design-series/purple-gradient-syndrome.html',
        search: '보라색 그라디언트 AI 디자인 슬롭 bg-indigo-500 다크플로우 METR 바이브코딩 디자인 일관성 Tailwind Adam Wathan'
      },
      {
        num: 2,
        title: '디자인 토큰이라는 언어',
        role: 'CSS 변수, Tailwind @theme, CLAUDE.md로 AI에게 디자인을 가르치는 법',
        tag: '가이드',
        href: 'content/vibe-design-series/design-tokens-as-language.html',
        search: '디자인 토큰 CSS 변수 Tailwind v4 @theme CLAUDE.md AGENTS.md cursorrules 디자인 시스템 W3C'
      },
      {
        num: 3,
        title: '남의 디자인을 훔치는 기술',
        role: '참조 디자인 수집부터 Figma MCP, screenshot-to-code까지',
        tag: '실전',
        href: 'content/vibe-design-series/steal-like-a-designer.html',
        search: '참조 디자인 Dribbble Mobbin Figma MCP screenshot-to-code PageAI 워크플로우 스크린샷 코드 변환'
      },
      {
        num: 4,
        title: 'shadcn/ui라는 치트키',
        role: '106K Stars 컴포넌트 라이브러리로 디자인 문제를 우회하는 전략',
        tag: '실전',
        href: 'content/vibe-design-series/shadcn-cheat-code.html',
        search: 'shadcn ui 컴포넌트 라이브러리 Tailwind UI ShipFast Marc Lou 보일러플레이트 테마 커스터마이징 브랜딩'
      },
      {
        num: 5,
        title: '배포 버튼을 누르기 전에',
        role: '30분 디자인 QA 체크리스트와 MVP에서 제품으로의 전환',
        tag: '실전',
        href: 'content/vibe-design-series/before-you-deploy.html',
        search: '디자인 QA 체크리스트 접근성 반응형 비주얼 리그레션 Chromatic Percy MVP 제품화 배포'
      }
    ]
  },
  {
    id: 'git-survival',
    seriesNum: 9,
    title: 'Git, pair 없이 살아남기',
    description: '개발자 93.87%가 쓰지만 52.2%는 매달 실수한다. 주니어 생존 명령어부터 force push 참사, 숨겨진 기능, 브랜치 전략, 생산성 세팅까지.',
    articles: [
      {
        num: 1,
        title: 'commit, push, 기도 — 주니어의 Git',
        role: '주니어 생존 명령어와 실전 워크플로우',
        tag: '입문',
        href: 'content/git-series/git-junior-survival-guide.html',
        search: 'Git 주니어 입문 commit push pull merge 브랜치 GitHub Flow 커밋 메시지 컨벤셔널 커밋'
      },
      {
        num: 2,
        title: 'force push 하나로 팀을 멸망시키는 법',
        role: '실제 사고와 복구 매뉴얼',
        tag: '사고/복구',
        href: 'content/git-series/git-disaster-and-recovery.html',
        search: 'Git 사고 force push reset revert reflog 시크릿 유출 GitGuardian Jenkins GitLab 삼성 복구'
      },
      {
        num: 3,
        title: 'git bisect를 아는 사람은 1%뿐이다',
        role: '숨겨진 고급 기능 해부',
        tag: '심화',
        href: 'content/git-series/git-hidden-gems.html',
        search: 'Git bisect worktree rerere blame stash interactive rebase archive notes 숨겨진 기능 고급'
      },
      {
        num: 4,
        title: '브랜치 전략은 팀의 거울이다',
        role: 'Git Flow vs GitHub Flow vs Trunk-Based',
        tag: '전략',
        href: 'content/git-series/git-branching-strategies.html',
        search: 'Git Flow GitHub Flow Trunk-Based 브랜치 전략 PR 코드리뷰 merge rebase squash Git Hooks'
      },
      {
        num: 5,
        title: '.gitconfig 하나로 생산성 2배',
        role: '추천 도구, 설정, AI 연동',
        tag: '생산성',
        href: 'content/git-series/git-productivity-setup.html',
        search: 'gitconfig alias delta lazygit gh CLI Git 생산성 AI 커밋 도구 추천 설정 Rust'
      }
    ]
  }
];

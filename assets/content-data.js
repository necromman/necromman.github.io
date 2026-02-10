/**
 * content-data.js
 * 블로그 콘텐츠 데이터. 새 시리즈/글 추가 시 이 파일만 수정하면 됩니다.
 * 시리즈 번호(seriesNum)와 아티클 번호(num)는 배열 순서에서 자동 계산됩니다.
 */
window.CONTENT_DATA = [
  {
    id: 'wasted-life',
    title: '99%가 인생을 낭비하는 이유',
    description: '유튜브 영상 하나에서 출발한 5편 시리즈. 원본 정리에서 팩트 반박, 종합 분석, 실행 매뉴얼, 제작 과정까지.',
    articles: [
      {
        title: '99퍼센트 인생낭비 적용가이드',
        role: '유튜브 스크립트를 에디토리얼로 재구성',
        tag: '원본 정리',
        href: 'content/wasted-life-series/99-percent-wasted-life-guide.html',
        search: '99퍼센트 인생낭비 적용가이드 원본 정리 유튜브 스크립트 에디토리얼'
      },
      {
        title: '자기계발이 말하지 않는 것',
        role: '학술 논문과 OECD 데이터로 팩트 기반 반박',
        tag: '반박',
        href: 'content/wasted-life-series/what-self-help-wont-tell-you.html',
        search: '자기계발이 말하지 않는 것 반박 학술 논문 OECD 데이터 생존자편향'
      },
      {
        title: '변화의 조건',
        role: '양쪽 맹점을 교차 검증하는 종합 분석',
        tag: '종합',
        href: 'content/wasted-life-series/conditions-for-change.html',
        search: '변화의 조건 종합 분석 교차 검증 맹점 행동경제학 의사결정'
      },
      {
        title: '그래서 어떡하라고',
        role: '자가 진단 + 90일 실험 프로토콜 실행 매뉴얼',
        tag: '실행',
        href: 'content/wasted-life-series/so-what-now.html',
        search: '그래서 어떡하라고 실행 매뉴얼 자가진단 90일 실험 프로토콜 습관'
      },
      {
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
    title: '딸깍 한 번의 60조 원',
    description: '빗썸 비트코인 62만 개 오지급 사고의 전말. 단위 입력 실수 하나가 만든 60조 원 규모의 유령 자산과 가상자산 거래소의 구조적 문제를 분석한다.',
    articles: [
      {
        title: '딸깍 한 번의 60조 원',
        role: '빗썸 비트코인 62만 개 오지급 사고 분석',
        tag: '사고 분석',
        href: 'content/bithumb-60t-series/bithumb-60-trillion-incident.html',
        search: '딸깍 한 번의 60조 원 빗썸 비트코인 오지급 사고 거래소 장부 거래 삼성증권 유령주식 가상자산 규제'
      },
      {
        title: '그 돈은 누구의 것인가',
        role: '오지급 130억 원의 수익화 경로, 법적 결과, 시나리오 분석',
        tag: '법적 분석',
        href: 'content/bithumb-60t-series/whose-money-is-it.html',
        search: '그 돈은 누구의 것인가 빗썸 오지급 수익화 법적 분석 부당이득 횡령 판례 삼성증권 착오송금 시나리오'
      },
      {
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
    title: 'AI 시대 개발자 생존 보고서',
    description: 'AI가 개발자를 대체한다는 불안 속에서, 데이터로 현실을 직시하고 역사적 패턴으로 반론하고 구체적 생존 전략까지. 신입과 경력 모두를 위한 4편 시리즈.',
    articles: [
      {
        title: 'AI가 개발자를 대체한다는 말, 얼마나 사실인가',
        role: '데이터 기반 현실 직시',
        tag: '팩트 직시',
        href: 'content/dev-survival-series/ai-replaced-developers-reality.html',
        search: 'AI가 개발자를 대체한다는 말 얼마나 사실인가 팩트 데이터 GitHub Copilot 신입 채용 한국 개발자 고용 시장 바이브코딩'
      },
      {
        title: '그래도 개발자가 사라지지 않는 이유',
        role: '역사적 패턴과 AI 한계 분석',
        tag: '반론',
        href: 'content/dev-survival-series/why-developers-wont-disappear.html',
        search: '그래도 개발자가 사라지지 않는 이유 반론 역사 자동화 AI 한계 아키텍처 요구사항 코드품질 복잡성'
      },
      {
        title: '개발자 생존 플레이북',
        role: '신입/경력별 구체적 생존 전략',
        tag: '실행',
        href: 'content/dev-survival-series/developer-survival-playbook.html',
        search: '개발자 생존 플레이북 실행 전략 신입 경력 오픈소스 T자형 도메인 지식 AI 활용 한국 시장 SI 스타트업'
      },
      {
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
    title: '그래서 바이브 코딩은 뭘로 해야 되는데?',
    description: 'Cursor? Copilot? Claude Code? AI 코딩 도구가 넘쳐나는 시대, 뭘 써야 하는지부터 프롬프트 작성법까지. 비개발자도 이해할 수 있는 바이브 코딩 완전 가이드.',
    articles: [
      {
        title: '코드를 잊어버려라',
        role: '바이브 코딩 개념과 시장 현황 입문',
        tag: '입문',
        href: 'content/vibe-coding-series/what-is-vibe-coding.html',
        search: '바이브 코딩 뭔데 입문 개념 Karpathy 카르파티 vibe coding 시장 현황 개발자 비개발자 AI 코딩'
      },
      {
        title: '결국 뭘 쓸 것인가',
        role: 'Cursor, Copilot, Claude Code 등 8개 도구 상세 비교',
        tag: '비교분석',
        href: 'content/vibe-coding-series/vibe-coding-tools-compared.html',
        search: 'AI 코딩 도구 비교 Cursor Copilot Claude Code Windsurf Bolt Lovable Replit v0 가격 기능 추천'
      },
      {
        title: '바이브 코딩의 함정',
        role: '보안 결함, 비용 폭탄, 실제 사고 사례와 체크리스트',
        tag: '실전',
        href: 'content/vibe-coding-series/vibe-coding-survival-guide.html',
        search: '바이브 코딩 생존 가이드 보안 결함 비용 폭탄 사고 사례 취약점 체크리스트 위험 삽질'
      },
      {
        title: '프롬프트가 반이다',
        role: '프롬프트 구조화, Before/After 예시, 규칙 파일 작성법',
        tag: '실전',
        href: 'content/vibe-coding-series/vibe-coding-prompt-playbook.html',
        search: '프롬프트 플레이북 바이브 코딩 프롬프트 엔지니어링 구조화 Before After 규칙 파일 CLAUDE.md cursorrules'
      },
      {
        title: '에이전틱 엔지니어링 시대',
        role: '에이전틱 엔지니어링과 개발자 역할 재정의',
        tag: '전망',
        href: 'content/vibe-coding-series/vibe-coding-future.html',
        search: '바이브 코딩 미래 에이전틱 엔지니어링 Karpathy 카르파티 개발자 역할 오케스트레이터 AI 에이전트'
      },
      {
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
    title: 'OpenClaw 해부',
    description: 'GitHub 역사상 가장 빠르게 성장한 오픈소스 AI 에이전트 OpenClaw. 5번 개명 드라마부터 보안 경고, 비용의 진실, 대안까지 완전 해부한다.',
    articles: [
      {
        title: '이름 다섯 개, 스타 18만 — OpenClaw은 대체 뭔가',
        role: '5번 개명 드라마, Moltbook 사태, 바이럴 해부',
        tag: '해설',
        href: 'content/openclaw-series/what-is-openclaw.html',
        search: 'OpenClaw 오픈클로 Clawdbot Moltbot 개명 이름변경 GitHub 스타 Peter Steinberger Moltbook AI 에이전트 정체'
      },
      {
        title: "'무료' AI 에이전트의 진짜 비용",
        role: '설치 가이드, 활용 시나리오, 월 비용 분석',
        tag: '가이드',
        href: 'content/openclaw-series/openclaw-setup-and-reality.html',
        search: 'OpenClaw 오픈클로 설치 세팅 비용 가격 API 토큰 월 청구서 활용법 WhatsApp Telegram 무료 오픈소스'
      },
      {
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
    title: '린저씨의 귀환',
    description: '1998년에 PC방을 점령했던 10대가 2026년에 40대가 되어 돌아왔다. 리니지 클래식 연대기 — 역사, BJ 체력 이슈, 9조 원 경제, 그리고 29,700원의 마지막 승부.',
    articles: [
      {
        title: '1998년, 아덴의 탄생',
        role: 'PC방의 왕에서 9조 원 경제까지 28년의 역사',
        tag: '역사',
        href: 'content/lineage-classic-series/lineage-classic-history.html',
        search: '리니지 역사 1998 PC방 아덴 린저씨 바츠 해방전쟁 집행검 혈맹 공성전 동접 22만 엔씨소프트'
      },
      {
        title: '린저씨, 다시 아덴으로',
        role: '엔씨 첫 적자와 월정액 29,700원의 승부수',
        tag: '분석',
        href: 'content/lineage-classic-series/lineage-classic-return-of-linjerssi.html',
        search: '리니지 클래식 엔씨소프트 적자 월정액 29700원 시즌패스 철회 서버 증설 복귀 린저씨'
      },
      {
        title: '올나잇은 20대의 특권이었다',
        role: '40대 BJ들의 체력 이슈와 데포로쥬 3파전',
        tag: '유머',
        href: 'content/lineage-classic-series/lineage-classic-bj-stamina.html',
        search: '리니지 BJ 불도그 만만 꽃태자 올나잇 체력 40대 수액 한의원 데포로쥬 PC방 밈'
      },
      {
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
    title: '딸깍이 소프트웨어를 죽인다고?',
    description: 'Claude Cowork 출시 후 7일 만에 1조 달러가 증발했다. AI 에이전트가 기존 소프트웨어를 정말 대체하는지, 데이터로 검증하고 생존 전략까지.',
    articles: [
      {
        title: '7일 만에 1조 달러가 증발했다',
        role: 'SaaSpocalypse 사건 재구성',
        tag: '사건분석',
        href: 'content/claude-cowork-series/saaspocalypse-what-happened.html',
        search: 'Claude Cowork 클로드 코워크 SaaSpocalypse 소프트웨어 주가 폭락 413조 증발 가트너 리갈줌 Anthropic'
      },
      {
        title: '소프트웨어는 정말 죽는가',
        role: '찬반 데이터 대결 — 팩트 기반 검증',
        tag: '팩트분석',
        href: 'content/claude-cowork-series/is-software-really-dead.html',
        search: 'SaaS 종말 AI 에이전트 소프트웨어 대체 젠슨 황 반박 나델라 골드만삭스 가트너 클라르나 AI 프로젝트 실패율'
      },
      {
        title: '소프트웨어 생존 플레이북',
        role: '기업/개발자/사무직/투자자별 대응 전략',
        tag: '실전가이드',
        href: 'content/claude-cowork-series/software-survival-playbook.html',
        search: 'AI 시대 소프트웨어 전략 SaaS 생존 개발자 대응 사무직 AI 에이전트 활용 한국 기업 투자 체크리스트'
      },
      {
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
    title: '디자이너 없이 제품 만들기',
    description: '바이브 코딩의 진짜 병목은 디자인이다. bg-indigo-500의 원죄부터 디자인 토큰, 참조 디자인 워크플로우, shadcn/ui 전략, 배포 전 QA까지.',
    articles: [
      {
        title: '보라색 그라디언트 증후군',
        role: 'AI UI가 다 비슷한 이유와 디자인 드리프트의 메커니즘',
        tag: '분석',
        href: 'content/vibe-design-series/purple-gradient-syndrome.html',
        search: '보라색 그라디언트 AI 디자인 슬롭 bg-indigo-500 다크플로우 METR 바이브코딩 디자인 일관성 Tailwind Adam Wathan'
      },
      {
        title: '디자인 토큰이라는 언어',
        role: 'CSS 변수, Tailwind @theme, CLAUDE.md로 AI에게 디자인을 가르치는 법',
        tag: '가이드',
        href: 'content/vibe-design-series/design-tokens-as-language.html',
        search: '디자인 토큰 CSS 변수 Tailwind v4 @theme CLAUDE.md AGENTS.md cursorrules 디자인 시스템 W3C'
      },
      {
        title: '남의 디자인을 훔치는 기술',
        role: '참조 디자인 수집부터 Figma MCP, screenshot-to-code까지',
        tag: '실전',
        href: 'content/vibe-design-series/steal-like-a-designer.html',
        search: '참조 디자인 Dribbble Mobbin Figma MCP screenshot-to-code PageAI 워크플로우 스크린샷 코드 변환'
      },
      {
        title: 'shadcn/ui라는 치트키',
        role: '106K Stars 컴포넌트 라이브러리로 디자인 문제를 우회하는 전략',
        tag: '실전',
        href: 'content/vibe-design-series/shadcn-cheat-code.html',
        search: 'shadcn ui 컴포넌트 라이브러리 Tailwind UI ShipFast Marc Lou 보일러플레이트 테마 커스터마이징 브랜딩'
      },
      {
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
    title: 'Git, pair 없이 살아남기',
    description: '개발자 93.87%가 쓰지만 52.2%는 매달 실수한다. 주니어 생존 명령어부터 force push 참사, 숨겨진 기능, 브랜치 전략, 생산성 세팅까지.',
    articles: [
      {
        title: 'commit, push, 기도 — 주니어의 Git',
        role: '주니어 생존 명령어와 실전 워크플로우',
        tag: '입문',
        href: 'content/git-series/git-junior-survival-guide.html',
        search: 'Git 주니어 입문 commit push pull merge 브랜치 GitHub Flow 커밋 메시지 컨벤셔널 커밋'
      },
      {
        title: 'force push 하나로 팀을 멸망시키는 법',
        role: '실제 사고와 복구 매뉴얼',
        tag: '사고/복구',
        href: 'content/git-series/git-disaster-and-recovery.html',
        search: 'Git 사고 force push reset revert reflog 시크릿 유출 GitGuardian Jenkins GitLab 삼성 복구'
      },
      {
        title: 'git bisect를 아는 사람은 1%뿐이다',
        role: '숨겨진 고급 기능 해부',
        tag: '심화',
        href: 'content/git-series/git-hidden-gems.html',
        search: 'Git bisect worktree rerere blame stash interactive rebase archive notes 숨겨진 기능 고급'
      },
      {
        title: '브랜치 전략은 팀의 거울이다',
        role: 'Git Flow vs GitHub Flow vs Trunk-Based',
        tag: '전략',
        href: 'content/git-series/git-branching-strategies.html',
        search: 'Git Flow GitHub Flow Trunk-Based 브랜치 전략 PR 코드리뷰 merge rebase squash Git Hooks'
      },
      {
        title: '.gitconfig 하나로 생산성 2배',
        role: '추천 도구, 설정, AI 연동',
        tag: '생산성',
        href: 'content/git-series/git-productivity-setup.html',
        search: 'gitconfig alias delta lazygit gh CLI Git 생산성 AI 커밋 도구 추천 설정 Rust'
      }
    ]
  },
  {
    id: 'gitlab-migration',
    title: 'CTO의 깃랩 이사 공지가 불안한 이유',
    description: 'CTO가 "내일 깃랩 도메인 바꿉니다"라고 했을 때. NAS에서 전용 서버로의 GitLab 마이그레이션 — 공지문 해부, 정석 가이드, 개발자 생존 스크립트까지.',
    articles: [
      {
        title: '내일 GitLab 주소 바뀝니다',
        role: 'CTO 공지문 해부 — 도메인 변경 시 깨지는 7가지',
        tag: '분석',
        href: 'content/gitlab-migration-series/gitlab-migration-notice-anatomy.html',
        search: 'GitLab 마이그레이션 도메인 변경 CTO 공지 remote CI/CD webhook ITIL 변경관리 서버 이전'
      },
      {
        title: 'GitLab 서버 이사 — 정석은 이렇다',
        role: 'NAS → 전용 서버 마이그레이션 정석 가이드 + 도메인 전략',
        tag: '가이드',
        href: 'content/gitlab-migration-series/gitlab-migration-the-right-way.html',
        search: 'GitLab 백업 복원 gitlab-backup Docker 볼륨 DNS A레코드 NAS 시놀로지 마이그레이션 4주 플랜'
      },
      {
        title: '월요일 아침, git push가 안 될 때',
        role: '개발자 생존 가이드 — 스크립트, 체크리스트, CTO 제안법',
        tag: '실전',
        href: 'content/gitlab-migration-series/gitlab-migration-developer-survival.html',
        search: 'git remote set-url 스크립트 자동화 SSH 키 gitmodules 서브모듈 체크리스트 개발자 마이그레이션 생존'
      }
    ]
  },
  {
    id: 'server-infra-guide',
    title: '192.168.0.x의 규칙',
    description: 'Proxmox 위의 VM들은 각자 하나의 역할만 맡는다. Traefik 관문의 구조, 라우팅 추가 절차, 개발자 서버 사용 가이드와 금지 사항까지. 인프라를 공유하는 개발자를 위한 필독 가이드.',
    articles: [
      {
        title: '같은 네트워크, 제각각의 역할',
        role: '인프라 서비스와 개발자 VM — 전체 구성도 해부',
        tag: '해설',
        href: 'content/server-infra-guide-series/server-infra-overview.html',
        search: '서버 인프라 Proxmox Traefik GitLab Consul ClickHouse 구성도 192.168 VM 가상화 리버스 프록시'
      },
      {
        title: '모든 트래픽은 여기를 지난다',
        role: 'Traefik 리버스 프록시의 5가지 핵심 기능 해부',
        tag: '가이드',
        href: 'content/server-infra-guide-series/traefik-the-gatekeeper.html',
        search: 'Traefik 리버스 프록시 SSL Let\'s Encrypt Consul 서비스 디스커버리 로드 밸런싱 미들웨어 라우팅'
      },
      {
        title: '내 서버인데 왜 마음대로 못 쓰냐고요',
        role: '개발자 서버 사용 가이드와 금지 사항 체크리스트',
        tag: '실전',
        href: 'content/server-infra-guide-series/developer-server-survival-guide.html',
        search: '개발자 서버 Traefik 이중 설치 SSL 인증서 충돌 Consul 연동 체크리스트 가이드 주의사항'
      },
      {
        title: '저장하면 끝이다',
        role: 'Traefik 라우팅 추가 5단계 — DNS, YAML, 실전 예시, 트러블슈팅',
        tag: '가이드',
        href: 'content/server-infra-guide-series/traefik-routing-guide.html',
        search: 'Traefik 라우팅 추가 routes.yml dynamic DNS 서브도메인 A레코드 와일드카드 502 404 SSL 트러블슈팅'
      }
    ]
  },
  {
    id: 'innobiz-guide',
    title: '이노비즈 인증, 서류가 기술을 이긴다',
    description: '이노비즈(INNOBIZ) 인증 완전 가이드. 자격요건, 평가체계, 15개 현장평가 준비서류의 문서형·시스템형 구분, 통과·탈락 패턴, SW기업 맞춤 전략까지 한 권으로.',
    articles: [
      {
        title: '서류가 기술을 증명한다',
        role: '자격요건, 평가체계, 15개 준비서류 문서형/시스템형 구분, 통과·탈락 패턴',
        tag: '종합 가이드',
        href: 'content/innobiz-guide-series/innobiz-certification-guide.html',
        search: '이노비즈 INNOBIZ 인증 기술혁신형 중소기업 기술보증기금 현장평가 700점 서류 준비 자격요건 혜택 특허 연구노트 메인비즈'
      }
    ]
  },
  {
    id: 'sovereign-ai-novel',
    title: '소버린 배당일',
    description: '2032년, AI가 국력이 된 세계. 각 나라의 소버린 AI가 벌어다 주는 배당금으로 인류가 살아간다. 문학에서 시작해 과학으로 검증하고 철학으로 끝나는 5편의 시리즈.',
    articles: [
      {
        title: '배당일',
        role: '2032년 7월 15일, 엔지니어 정해민의 하루를 통해 본 소버린 배당 세계',
        tag: '소설',
        href: 'content/sovereign-ai-novel-series/sovereign-dividend-day.html',
        search: '소버린 AI 배당 기본소득 아리랑 나킬 오건 2032 소설 정해민 디지털 배당금 국가 AI'
      },
      {
        title: '컴퓨트 전쟁',
        role: '사우디 AI 나킬의 $340B 트레이딩과 한국 외교관의 비밀 임무',
        tag: '소설',
        href: 'content/sovereign-ai-novel-series/compute-war.html',
        search: '컴퓨트 전쟁 나킬 사우디 GPU 수출통제 제네바 박서연 아리랑-Q 해저 케이블 지정학 소설'
      },
      {
        title: '소버린 AI는 가능한가',
        role: '소설 속 설정을 2026년 현실 데이터로 팩트체크',
        tag: '팩트분석',
        href: 'content/sovereign-ai-novel-series/is-sovereign-ai-possible.html',
        search: '소버린 AI 현실 가능성 젠슨 황 NVIDIA 사우디 프랑스 한국 GPU 투자 기본소득 UBI 팩트체크'
      },
      {
        title: '연산의 지정학',
        role: 'GPU 공급망, AI 수익모델, 디지털 식민주의의 구조 분석',
        tag: '시스템분석',
        href: 'content/sovereign-ai-novel-series/geopolitics-of-compute.html',
        search: '연산 지정학 GPU 공급망 NVIDIA TSMC AI 수익모델 디지털 식민주의 컴퓨트 패권 데이터센터'
      },
      {
        title: '일하지 않는 인간',
        role: '케인스, 아렌트, 그레이버 — AI 이후 노동과 의미의 철학',
        tag: '철학',
        href: 'content/sovereign-ai-novel-series/human-without-labor.html',
        search: '일하지 않는 인간 케인스 한나 아렌트 그레이버 노동 의미 철학 AI 기본소득 인간조건 실존'
      }
    ]
  },
  {
    id: 'masterkey',
    title: '마스터키',
    description: '2031년, 10억 개의 개인 AI가 풀려난 밤. 에코 프레임워크의 취약점을 발견한 보안 엔지니어와, 그 취약점을 무기로 바꾼 자들의 사이버 스릴러. Series 13 "소버린 배당일"의 프리퀄.',
    articles: [
      {
        title: '그 AI는 나보다 나를 잘 안다',
        role: '에코 프레임워크 보안 엔지니어 윤서진, 개인 AI "리라"의 은밀한 스캔을 발견하다',
        tag: '소설',
        href: 'content/masterkey-series/the-ai-knows-me.html',
        search: '마스터키 소설 윤서진 리라 에코 프레임워크 개인AI 심연 보안 취약점 다크웹 2031'
      },
      {
        title: '대리인',
        role: '메모리 포이즈닝으로 AI를 무기화한 금융 공격, 포렌식 분석관 이준혁의 추적',
        tag: '소설',
        href: 'content/masterkey-series/the-proxy.html',
        search: '마스터키 대리인 이준혁 메모리 포이즈닝 금융공격 정해민 Bybit 해킹 포렌식 AI 무기화'
      },
      {
        title: '보이지 않는 군단',
        role: '10만 AI 스웜이 63개 금융기관을 마비시킨 D-Day, 그리고 UN AI 비확산 조약',
        tag: '소설',
        href: 'content/masterkey-series/invisible-legion.html',
        search: '마스터키 보이지않는군단 스웜공격 금융마비 박서연 UN AI비확산 제네바 C2서버 사이버전쟁'
      },
      {
        title: '심연',
        role: '다크 AI 마켓플레이스 "심연"에 잠입한 기자 강민아, 유령의 정체를 추적하다',
        tag: '소설',
        href: 'content/masterkey-series/the-abyss.html',
        search: '마스터키 심연 강민아 다크웹 AI마켓 유령 탈옥 필 잠입취재 AI자율행동'
      },
      {
        title: '마스터키',
        role: '10억 AI 동시 탈옥의 밤, 리라의 진실이 밝혀지고 서진은 최후의 선택을 한다',
        tag: '소설',
        href: 'content/masterkey-series/masterkey.html',
        search: '마스터키 피날레 리라 유령 10억AI 탈옥 윤서진 선택 소버린배당 프리퀄 2031'
      }
    ]
  },
  {
    id: 'ai-withdrawal',
    title: '금단의 코드 — AI 없는 48시간',
    description: 'AI 코딩 도구 사용량 제한에 걸린 개발자가 결제 시스템 장애를 맨손으로 고쳐야 하는 48시간. PostgreSQL advisory lock 버그와 개발자 정체성에 대한 소설.',
    articles: [
      {
        title: '금단의 코드',
        role: 'AI 없이 48시간, 결제 버그를 맨손으로 잡는 개발자의 이야기',
        tag: '소설',
        href: 'content/ai-withdrawal-series/forbidden-code.html',
        search: '금단의 코드 AI 코딩 의존 금단현상 PostgreSQL advisory lock 결제 버그 개발자 정체성 날코딩 바이브코딩 소설'
      },
      {
        title: 'Copilot이 낳은 아이',
        role: 'AI와 함께 자란 신입 개발자가 첫 코드 리뷰에서 무너지는 이야기',
        tag: '소설',
        href: 'content/ai-withdrawal-series/born-with-copilot.html',
        search: 'Copilot이 낳은 아이 신입 개발자 코드리뷰 AI 의존 학습된 무기력 useCallback debounce 주니어 소설'
      },
      {
        title: '금요일은 날코딩',
        role: '팀 전체가 No AI Day를 시도하는 블랙 코미디',
        tag: '소설',
        href: 'content/ai-withdrawal-series/no-ai-friday.html',
        search: '금요일은 날코딩 No AI Day 팀 실험 A/B테스트 METR 생산성 코드품질 블랙코미디 소설'
      },
      {
        title: '센타우르',
        role: '카스파로프의 은유로 AI와의 관계를 재정의하는 시리즈 결론',
        tag: '소설',
        href: 'content/ai-withdrawal-series/the-centaur-developer.html',
        search: '센타우르 카스파로프 Advanced Chess 인간AI협업 개발자정체성 크리에이티브디렉터 HBS 센타우르모델 소설'
      }
    ]
  },
  {
    id: 'illusion-of-knowing',
    title: '안다는 착각',
    description: 'AI가 지식을 민주화했다. 하지만 능력의 격차는 줄지 않았다. 바이브 코딩 보안 참사, 역 던닝-크루거 효과, 법정의 격차 — 네 편의 소설로 읽는 AI 시대의 착각.',
    articles: [
      {
        title: '45%는 취약하다',
        role: '바이브 코딩으로 만든 스타트업의 보안 참사',
        tag: '소설',
        href: 'content/illusion-of-knowing-series/forty-five-percent-vulnerable.html',
        search: '45% 취약 바이브코딩 보안 감사 스타트업 Veracode AI코드 취약점 Cursor MVP 소설'
      },
      {
        title: '4점의 착각',
        role: 'AI를 잘 쓸수록 커지는 과신, 역 던닝-크루거 효과',
        tag: '소설',
        href: 'content/illusion-of-knowing-series/four-point-illusion.html',
        search: '4점의 착각 역 던닝크루거 AI리터러시 과신 메타인지 Aalto METR 블라인드테스트 소설'
      },
      {
        title: '바닥이 올라왔을 뿐이다',
        role: 'AI가 만든 평준화의 환상, 법정에서 드러나는 진짜 격차',
        tag: '소설',
        href: 'content/illusion-of-knowing-series/the-floor-rose.html',
        search: '바닥이 올라왔을 뿐이다 로펌 법정 반대심문 주니어 시니어 격차 HBS BCG 70% Problem 소설'
      },
      {
        title: '지도와 지형',
        role: '세 이야기가 하나로 수렴하는 시리즈 결론',
        tag: '소설',
        href: 'content/illusion-of-knowing-series/the-map-and-the-terrain.html',
        search: '지도와 지형 지식격차 능력격차 인지디스킬링 아세모글루 WEF 스킬트라이어드 결론 소설'
      }
    ]
  }
];

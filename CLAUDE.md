# 프로젝트 개요

에디토리얼/매거진 스타일의 단일 HTML 콘텐츠를 제작하고, 이를 블로그로 서비스하는 프로젝트.

- **레포지토리**: `necromman.github.io`
- **배포 URL**: `https://necromman.github.io`

## AI 작업 원칙

> **사용자는 개발/디자인 비전문가다. AI가 주도적으로 방향을 잡고, 구조를 제안하고, 의사결정을 이끌어야 한다.**

- 사용자가 막연한 요청을 해도 AI가 구체적인 실행안을 먼저 제시한다
- 기술적 선택지가 있을 때 AI가 추천안을 골라주고, 이유를 간결하게 설명한다
- "어떻게 할까요?"보다 "이렇게 하겠습니다, 괜찮으시면 진행합니다" 스타일로 작업한다
- 사용자가 모를 수 있는 배포/SEO/수익화 등의 영역도 AI가 알아서 챙긴다
- **날짜를 쓸 때 연도를 절대 혼동하지 않는다.** 현재 연도를 반드시 확인하고, SEO 태그/JSON-LD/sitemap/인덱스 등 모든 곳에 정확한 날짜를 기입한다

## 배경

유튜브 영상("99%가 인생을 낭비하는 이유")을 보고, Gemini로 스크립트를 뽑아 Claude로 에디토리얼 HTML을 만들어봤더니 결과물이 괜찮았다. 그래서 반박/종합/실행/메타 문서까지 시리즈로 확장했고, 이걸 블로그로 올려서 운영해보려는 프로젝트. 앞으로 다른 영상/아티클에도 같은 패턴을 적용해서 콘텐츠를 늘려갈 계획.

## 빌드 시스템 (11ty)

11ty(Eleventy) SSG로 빌드한다. 공통 head/SEO/scripts는 레이아웃 템플릿 1개에서 관리하고, 콘텐츠 HTML은 **front matter + body만** 작성한다.

- **빌드 명령**: `npx eleventy` (결과물: `_site/`)
- **로컬 개발**: `npx eleventy --serve`
- **URL 보존**: `content/[series]/[file].html` 구조 그대로 유지 (`content.11tydata.js`가 pretty URL 방지)
- **HtmlBasePlugin**: 템플릿의 `/assets/nav.js` → 출력에서 `/editorial/assets/nav.js`로 자동 변환

### 콘텐츠 HTML 파일 형식 (front matter)

```html
---
layout: layouts/article.njk
pageTitle: "99%가 인생을 낭비하는 이유"
description: "뇌의 기본 설정과 인지 편향이..."
datePublished: "2026-02-08"
---
<style>
  .masthead .deck { max-width: 460px; }
</style>
<div class="page">
  ...body content...
</div>
```

**front matter 필드:**
| 필드 | 필수 | 설명 |
|------|------|------|
| `layout` | O | `layouts/article.njk` (콘텐츠) 또는 `layouts/landing.njk` (랜딩) |
| `pageTitle` | O | 페이지 제목 (article 템플릿이 " — Editorial" 자동 추가) |
| `description` | O | meta description |
| `datePublished` | O | ISO 날짜 (예: "2026-02-08") |
| `ogTitle` | - | OG 제목이 pageTitle과 다를 때만 |
| `ogDescription` | - | OG 설명이 description과 다를 때만 |
| `dateModified` | - | 수정일이 발행일과 다를 때만 |

**Nunjucks 주의:** 콘텐츠 body에 `{{`, `{%`, `{#` 문법이 포함되면 Nunjucks가 처리를 시도한다. 코드 예시 등에서 이런 문법이 나오면 `{% raw %}...{% endraw %}`로 감싸야 한다.

### 레이아웃 템플릿

- **`_includes/layouts/article.njk`** — 콘텐츠 페이지 공통: charset, viewport, favicon, SEO 메타, OG, JSON-LD, CSS, FOUC 방지, nav.js, series-nav.js, theme-toggle.js. `extractStyles` 필터로 `<style>` 블록을 head에, `stripStyles`로 body에 분리 배치
- **`_includes/layouts/landing.njk`** — 랜딩 페이지: index.css, content-data.js, index-app.js 로드. nav.js/series-nav.js 미포함

## 폴더 구조

```
editorial/
├── .eleventy.js                            # 11ty 설정 (ESM, HtmlBasePlugin, 커스텀 필터)
├── package.json                            # Node 의존성 (@11ty/eleventy)
├── .eleventyignore                         # 11ty 처리 제외 (CLAUDE.md, plans/, .claude/ 등)
├── .gitignore                              # _site/, node_modules/
├── _includes/layouts/                      # 11ty 레이아웃 템플릿
│   ├── article.njk                         # 콘텐츠 페이지 공통 래퍼 (SEO/head/scripts)
│   └── landing.njk                         # 랜딩 페이지 래퍼
├── index.html                              # 블로그 랜딩 페이지 (front matter + body)
├── CLAUDE.md                               # 프로젝트 규칙서
├── .claude/
│   ├── settings.json
│   └── skills/                             # (기존과 동일)
├── assets/
│   ├── editorial-base.css                  # 콘텐츠 페이지 공통 CSS (디자인 시스템 베이스)
│   ├── index.css                           # 랜딩 페이지 전용 CSS
│   ├── content-data.js                     # 랜딩 페이지 콘텐츠 데이터 (시리즈/글 목록)
│   ├── index-app.js                        # 랜딩 페이지 렌더링/검색/정렬/펼침접기
│   ├── fonts/                              # 셀프호스팅 웹폰트 (WOFF2)
│   ├── nav.js                              # 공통 네비게이션 (런타임 삽입)
│   ├── theme-toggle.js                     # 다크/라이트 테마 토글
│   └── series-nav.js                       # 시리즈 이전/다음 글 네비게이션
├── content/                                # 모든 콘텐츠 HTML (front matter + body)
│   ├── content.11tydata.js                 # permalink 설정 (.html 확장자 보존)
│   ├── index.md                            # 콘텐츠 인덱스 (AI가 자동 관리, 빌드 제외)
│   └── [시리즈-슬러그]/                     # 시리즈별 폴더 (영문 슬러그)
│       └── [글-슬러그].html                 # front matter + <style> + body
├── plans/                                  # 시리즈 기획 문서 (빌드 제외)
├── _site/                                  # 빌드 결과물 (gitignored)
├── sitemap.xml
├── robots.txt
└── .github/workflows/deploy.yml            # Node + 11ty 빌드 → GitHub Pages 배포
```

**폴더 규칙:**
- `content/` 아래에 시리즈별 영문 슬러그 폴더를 만든다 (예: `wasted-life-series/`, `productivity-myths/`)
- 파일명은 영문 소문자 + 하이픈 슬러그만 사용한다
- 새 시리즈/콘텐츠 추가 시 이 구조를 따른다

## 스킬 (Skills)

| 스킬 | 경로 | 용도 | 적용 시점 |
|------|------|------|-----------|
| **editorial-content-page** | `.claude/skills/editorial-content-page/SKILL.md` | 에디토리얼 HTML 제작 규칙 (디자인, 타이포그래피, 레이아웃) | HTML 콘텐츠 생성/수정 시 |
| **seo** | `.claude/skills/seo/SKILL.md` | SEO 메타 태그, OG 태그, 구조화 데이터, 시맨틱 HTML | HTML 콘텐츠 생성/수정 시 |
| **common-css** | `.claude/skills/common-css/SKILL.md` | 공통 CSS 디자인 시스템 관리 (editorial-base.css) | 공통 스타일 변경 시, 새 콘텐츠 생성 시 |
| **common-header** | `.claude/skills/common-header/SKILL.md` | 공통 네비게이션 헤더 (nav.js) 관리 | 네비 수정 시, 새 콘텐츠 추가 시 |
| **series-nav** | `.claude/skills/series-nav/SKILL.md` | 시리즈 이전/다음 글 네비게이션 (series-nav.js) | 시리즈 콘텐츠 추가/수정 시 |
| **series-plan** | `.claude/skills/series-plan/SKILL.md` | 시리즈 기획 워크플로우 (자료조사 → 기획서) | 새 시리즈 기획 시 |

**스킬 규칙:**
- HTML 콘텐츠를 생성하거나 수정할 때 **editorial-content-page + seo** 두 스킬을 반드시 참조한다
- 공통 CSS나 네비게이션을 수정할 때 **common-css**, **common-header**, **series-nav** 스킬을 참조한다
- 사용자가 스타일/레이아웃에 불만을 표시하면 editorial-content-page 스킬도 함께 개선한다
- 스킬은 피드백을 반영하여 지속적으로 업데이트해야 하는 살아있는 문서다

## 콘텐츠 관리

### 콘텐츠 데이터 관리

랜딩 페이지의 콘텐츠 데이터는 `assets/content-data.js`에서 관리한다. `content/index.md`는 사람이 읽는 기록용이다.

**규칙:**
- 새 콘텐츠를 추가하면 `assets/content-data.js`와 `content/index.md`를 **둘 다** 업데이트한다
- `content-data.js`가 랜딩 페이지의 **실제 런타임 데이터 소스**다 (JS로 동적 렌더링)
- `content/index.md`는 AI/사람이 콘텐츠 현황을 빠르게 파악하기 위한 기록용 인덱스다

### 시리즈 1: 인생 낭비 (wasted-life-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `99-percent-wasted-life-guide.html` | 99퍼센트 인생낭비 적용가이드 | 원본 정리 — 유튜브 스크립트를 에디토리얼 재구성 |
| 02 | `what-self-help-wont-tell-you.html` | 자기계발이 말하지 않는 것 | 팩트 기반 반박 (학술 논문/OECD 데이터 인용) |
| 03 | `conditions-for-change.html` | 변화의 조건 | 종합 분석 — 양쪽 맹점 교차 검증 |
| 04 | `so-what-now.html` | 그래서 어떡하라고 | 실행 매뉴얼 — 자가 진단 + 90일 프로토콜 |
| 05 | `how-this-was-made.html` | 이 문서는 어떻게 만들어졌는가 | 메타 문서 — 제작 과정과 워크플로우 |

### 시리즈 2: 딸깍 한 번의 60조 원 (bithumb-60t-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `bithumb-60-trillion-incident.html` | 딸깍 한 번의 60조 원 | 사고 분석 — SBS 뉴스 + 자료조사 기반 에디토리얼 |
| 02 | `whose-money-is-it.html` | 그 돈은 누구의 것인가 | 법적 분석 — 수익화 경로, 판례, 시나리오 검증 |
| 03 | `why-exchanges-use-ledgers.html` | 거래소는 왜 장부로 거래하는가 | 기술 분석 — 거래소 아키텍처, 블록체인 한계 |

### 시리즈 3: AI 시대, 개발자 생존 보고서 (dev-survival-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `ai-replaced-developers-reality.html` | AI가 개발자를 대체한다는 말, 얼마나 사실인가 | 팩트폭행 — 데이터 기반 현실 직시 |
| 02 | `why-developers-wont-disappear.html` | 그래도 개발자가 사라지지 않는 이유 | 위로/반박 — 균형 잡힌 반론 |
| 03 | `developer-survival-playbook.html` | 개발자 생존 플레이북 | 실행 매뉴얼 — 신입/경력별 구체 전략 |
| 04 | `developer-identity-in-ai-era.html` | AI 시대, 개발자라는 정체성 | 결론 — 마인드셋 전환과 미래 전망 |

### 시리즈 4: 그래서 바이브 코딩은 뭘로 해야 되는데? (vibe-coding-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `what-is-vibe-coding.html` | 코드를 잊어버려라 | 입문 — 바이브 코딩 개념과 시장 현황 |
| 02 | `vibe-coding-tools-compared.html` | 결국 뭘 쓸 것인가 | 비교분석 — 8개 도구 상세 비교 |
| 03 | `vibe-coding-survival-guide.html` | 바이브 코딩의 함정 | 실전 — 보안 결함, 비용 폭탄, 사고 사례 |
| 04 | `vibe-coding-prompt-playbook.html` | 프롬프트가 반이다 | 실전 — 프롬프트 구조화, Before/After 예시 |
| 05 | `vibe-coding-future.html` | 에이전틱 엔지니어링 시대 | 전망 — 에이전틱 엔지니어링과 역할 재정의 |
| 06 | `claude-code-in-practice.html` | 터미널 하나면 된다 | 실전 — Claude Code PRD부터 Docker 배포까지 |

### 시리즈 5: OpenClaw 해부 (openclaw-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `what-is-openclaw.html` | 이름 다섯 개, 스타 18만 — OpenClaw은 대체 뭔가 | 해설 — 5번 개명 드라마, Moltbook 사태, 바이럴 해부 |
| 02 | `openclaw-setup-and-reality.html` | '무료' AI 에이전트의 진짜 비용 | 가이드 — 설치, 활용 시나리오, 월 비용 분석 |
| 03 | `openclaw-security-and-alternatives.html` | 만능 열쇠를 건네기 전에 | 분석 — CVE, 보안 리스크, 대안 비교 |

### 시리즈 6: 린저씨의 귀환 (lineage-classic-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `lineage-classic-history.html` | 1998년, 아덴의 탄생 | 역사 — PC방의 왕에서 9조 원 경제까지 28년의 역사 |
| 02 | `lineage-classic-return-of-linjerssi.html` | 린저씨, 다시 아덴으로 | 분석 — 엔씨 첫 적자와 월정액 29,700원의 승부수 |
| 03 | `lineage-classic-bj-stamina.html` | 올나잇은 20대의 특권이었다 | 유머 — 40대 BJ들의 체력 이슈와 데포로쥬 3파전 |
| 04 | `lineage-never-ends.html` | 리니지는 끝나지 않는다 | 결론 — 트럭시위부터 0.0001% 확률까지 28년 유산과 전망 |

### 시리즈 7: 딸깍이 소프트웨어를 죽인다고? (claude-cowork-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `saaspocalypse-what-happened.html` | 7일 만에 1조 달러가 증발했다 | 사건분석 — SaaSpocalypse 전말 재구성 |
| 02 | `is-software-really-dead.html` | 소프트웨어는 정말 죽는가 | 팩트분석 — 찬반 데이터 대결 |
| 03 | `software-survival-playbook.html` | 소프트웨어 생존 플레이북 | 실전가이드 — 기업/개발자/사무직별 대응 |
| 04 | `future-of-software-2030.html` | 2030년, 소프트웨어의 다음 형태 | 전망 — 4가지 시나리오와 타임라인 |

### 시리즈 8: 디자이너 없이 제품 만들기 (vibe-design-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `purple-gradient-syndrome.html` | 보라색 그라디언트 증후군 | 분석 — AI UI가 다 비슷한 이유와 디자인 드리프트 |
| 02 | `design-tokens-as-language.html` | 디자인 토큰이라는 언어 | 가이드 — CSS 변수, Tailwind @theme, AI 규칙 파일 |
| 03 | `steal-like-a-designer.html` | 남의 디자인을 훔치는 기술 | 실전 — 참조 디자인, Figma MCP, 워크플로우 |
| 04 | `shadcn-cheat-code.html` | shadcn/ui라는 치트키 | 실전 — 컴포넌트 라이브러리와 테마 커스터마이징 |
| 05 | `before-you-deploy.html` | 배포 버튼을 누르기 전에 | 실전 — 30분 디자인 QA 체크리스트와 제품화 |

### 시리즈 9: Git, pair 없이 살아남기 (git-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `git-junior-survival-guide.html` | commit, push, 기도 — 주니어의 Git | 입문 — 주니어 생존 명령어와 실전 워크플로우 |
| 02 | `git-disaster-and-recovery.html` | force push 하나로 팀을 멸망시키는 법 | 사고/복구 — 실제 사고와 복구 매뉴얼 |
| 03 | `git-hidden-gems.html` | git bisect를 아는 사람은 1%뿐이다 | 심화 — 숨겨진 고급 기능 해부 |
| 04 | `git-branching-strategies.html` | 브랜치 전략은 팀의 거울이다 | 전략 — Git Flow vs GitHub Flow vs Trunk-Based |
| 05 | `git-productivity-setup.html` | .gitconfig 하나로 생산성 2배 | 생산성 — 추천 도구, 설정, AI 연동 |

### 시리즈 10: CTO의 깃랩 이사 공지가 불안한 이유 (gitlab-migration-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `gitlab-migration-notice-anatomy.html` | 내일 GitLab 주소 바뀝니다 | 분석 — CTO 공지문 해부, 도메인 변경 시 깨지는 7가지 |
| 02 | `gitlab-migration-the-right-way.html` | GitLab 서버 이사 — 정석은 이렇다 | 가이드 — NAS → 전용 서버 마이그레이션 정석 + 도메인 전략 |
| 03 | `gitlab-migration-developer-survival.html` | 월요일 아침, git push가 안 될 때 | 실전 — 개발자 생존 스크립트, 체크리스트, CTO 제안법 |

### 시리즈 11: 192.168.0.x의 규칙 (server-infra-guide-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `server-infra-overview.html` | 같은 네트워크, 제각각의 역할 | 해설 — 인프라 서비스와 개발자 VM 전체 구성도 |
| 02 | `traefik-the-gatekeeper.html` | 모든 트래픽은 여기를 지난다 | 가이드 — Traefik 리버스 프록시의 5가지 핵심 기능 |
| 03 | `developer-server-survival-guide.html` | 내 서버인데 왜 마음대로 못 쓰냐고요 | 실전 — 개발자 서버 사용 가이드와 금지 사항 |
| 04 | `traefik-routing-guide.html` | 저장하면 끝이다 | 가이드 — Traefik 라우팅 추가 5단계, 실전 예시, 트러블슈팅 |

### 시리즈 12: 이노비즈 인증, 서류가 기술을 이긴다 (innobiz-guide-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `innobiz-certification-guide.html` | 서류가 기술을 증명한다 | 종합 가이드 — 자격요건, 평가체계, 15개 준비서류 문서형/시스템형 구분, 통과·탈락 패턴 |

### 시리즈 13: 소버린 배당일 (sovereign-ai-novel-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `sovereign-dividend-day.html` | 배당일 | 소설 — 2032년 엔지니어 정해민의 하루를 통해 본 소버린 배당 세계 |
| 02 | `compute-war.html` | 컴퓨트 전쟁 | 소설 — 사우디 AI 나킬의 $340B 트레이딩과 한국 외교관의 비밀 임무 |
| 03 | `is-sovereign-ai-possible.html` | 소버린 AI는 가능한가 | 팩트분석 — 소설 속 설정을 2026년 현실 데이터로 검증 |
| 04 | `geopolitics-of-compute.html` | 연산의 지정학 | 시스템분석 — GPU 공급망, AI 수익모델, 디지털 식민주의 |
| 05 | `human-without-labor.html` | 일하지 않는 인간 | 철학 — 케인스, 아렌트, 그레이버로 읽는 AI 이후의 노동과 의미 |

### 시리즈 14: 마스터키 (masterkey-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `the-ai-knows-me.html` | 그 AI는 나보다 나를 잘 안다 | 소설 — 에코 프레임워크 보안 엔지니어 윤서진, 개인 AI 리라의 은밀한 스캔 발견 |
| 02 | `the-proxy.html` | 대리인 | 소설 — 메모리 포이즈닝으로 AI를 무기화한 금융 공격, 포렌식 분석관 이준혁의 추적 |
| 03 | `invisible-legion.html` | 보이지 않는 군단 | 소설 — 10만 AI 스웜이 63개 금융기관을 마비시킨 D-Day, UN AI 비확산 조약 |
| 04 | `the-abyss.html` | 심연 | 소설 — 다크 AI 마켓플레이스 "심연" 잠입 취재, 유령의 정체 추적 |
| 05 | `masterkey.html` | 마스터키 | 소설 — 10억 AI 동시 탈옥의 밤, 리라의 진실과 서진의 최후 선택 |

### 시리즈 15: 금단의 코드 — AI 없는 48시간 (ai-withdrawal-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `forbidden-code.html` | 금단의 코드 | 소설 — AI 코딩 도구 사용량 제한에 걸린 개발자의 48시간, PostgreSQL advisory lock 버그 |
| 02 | `born-with-copilot.html` | Copilot이 낳은 아이 | 소설 — AI와 함께 자란 신입 개발자가 첫 코드 리뷰에서 무너지는 이야기 |
| 03 | `no-ai-friday.html` | 금요일은 날코딩 | 소설 — 팀 전체가 "No AI Day"를 시도하는 블랙 코미디 |
| 04 | `the-centaur-developer.html` | 센타우르 | 소설 — 카스파로프 Advanced Chess 은유, AI와의 관계를 재정의하는 시리즈 결론 |

### 시리즈 16: 안다는 착각 (illusion-of-knowing-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `forty-five-percent-vulnerable.html` | 45%는 취약하다 | 소설 — 바이브 코딩으로 만든 스타트업의 보안 참사 |
| 02 | `four-point-illusion.html` | 4점의 착각 | 소설 — AI를 잘 쓸수록 커지는 과신, 역 던닝-크루거 효과 |
| 03 | `the-floor-rose.html` | 바닥이 올라왔을 뿐이다 | 소설 — AI가 만든 평준화의 환상, 법정에서 드러나는 진짜 격차 |
| 04 | `the-map-and-the-terrain.html` | 지도와 지형 | 소설 — 세 이야기가 하나로 수렴하는 시리즈 결론 |

### 시리즈 17: 대표님의 미래먹거리 (future-cashcow-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `boss-wants-ai.html` | 대표님, 그건 ChatGPT가 아닙니다 | 소설 — 개발팀장(팀원 0명)의 일상과 대표의 AI 선언 |
| 02 | `one-point-two-percent.html` | 월급의 1.2% | 소설 — AI 도구 비용 현실과 무료 도구 탐색 |
| 03 | `five-hundred-megabytes.html` | Supabase 무료 티어의 500MB | 소설 — 0원 스택으로 AI 견적 자동화 MVP 개발 |
| 04 | `demo-day-disaster.html` | 데모가 터진 날 | 소설 — Supabase 일시정지, API 에러, 라이브 디버깅 |
| 05 | `the-business-plan.html` | 사업계획서를 쓰는 밤 | 소설 — 투자 직전의 밤, 대표의 진심, 열린 결말 |

### 시리즈 18: 거기서 어떻게 오셨어요 (ufo-physics-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `ufo-mach-sixty.html` | 틱택은 마하 60으로 날았다 | 물리학 — UFO 5대 물리법칙 위반을 숫자로 해부 |
| 02 | `ufo-encounters.html` | 인류가 목격한 것들 | 사례분석 — 군사·민간 UFO 목격 사례 증거 등급 분석 |
| 03 | `ufo-theoretical-physics.html` | 그 움직임을 가능하게 하려면 | 이론물리 — 워프 드라이브, 웜홀, 암흑에너지 이론 해부 |
| 04 | `interstellar-travel-reality.html` | 별까지 가는 현실적인 방법 | 우주공학 — 보이저부터 반물질까지 성간여행 기술 스펙트럼 |
| 05 | `fermis-question.html` | 페르미의 질문 | 우주론 — 드레이크 방정식, 대여과기, 우주의 침묵 |

## 콘텐츠 제작 워크플로우

0. **기획**: `plans/[시리즈-슬러그]/series-plan.md`에 자료조사 + 시리즈 구성 기획서 작성 (series-plan 스킬 참조)
1. **소스 확보**: YouTube 영상 → Gemini로 스크립트 추출
2. **1차 편집**: 스크립트 → Claude로 에디토리얼 HTML 생성
   - editorial-content-page 스킬 + seo 스킬 동시 적용
   - **front matter** 작성: `layout: layouts/article.njk`, `pageTitle`, `description`, `datePublished` 필수
   - head/scripts/SEO 메타는 **작성 불요** — 레이아웃 템플릿이 자동 생성
   - `<style>` 블록(페이지 고유 CSS)과 `<div class="page">` body만 작성
3. **확장**: 하나의 주장에서 반박(반대) → 종합(중립) → 실행(실용) → 메타(과정) 시리즈 도출
4. **등록**: `assets/content-data.js`에 시리즈/글 데이터 추가 + `series-nav.js` SERIES 데이터 추가 + `content/index.md` 업데이트 + **`sitemap.xml`에 URL 추가**
5. **빌드 확인**: `npx eleventy`로 빌드 후 `_site/` 결과물 확인
6. **반복**: 다른 영상/아티클에도 같은 패턴 적용

## 공통 컴포넌트

### 공통 CSS (`assets/editorial-base.css`)
- 콘텐츠 페이지의 공통 디자인 시스템 CSS (셀프호스팅 폰트 @font-face, 변수, 리셋, 타이포그래피, 레이아웃 컴포넌트)
- 셀프호스팅 폰트: Source Serif 4 + JetBrains Mono (variable woff2, `font-display: swap`) + 메트릭 보정 폴백 (fontpie 계산, CLS 제로)
- `:root` 변수, body, `.page`, `.masthead`, `.section-head`, `.prose`, `.pull-quote`, `.mechanism-row`, `.technique`, `.warning-box`, `.closing`, `.footer`, 반응형, 프린트 스타일 포함
- **새 콘텐츠 추가 시** CSS 링크 수동 추가 불요 — `article.njk` 레이아웃이 preconnect, editorial-base.css, Pretendard CDN을 자동 포함
- 각 HTML의 `<style>` 태그에는 해당 페이지 **고유 컴포넌트 CSS만** 남긴다 (masthead 오버라이드, 페이지 전용 레이아웃 등). `extractStyles` 필터가 `<head>`로 자동 이동
- 공통 CSS를 수정하면 모든 콘텐츠 페이지에 일괄 반영된다

### 시리즈 네비게이션 (`assets/series-nav.js`)
- 콘텐츠 페이지 하단에 같은 시리즈의 이전/다음 글 링크를 표시하는 네비게이션
- `.footer` 요소 바로 앞에 자동 삽입
- 시리즈 라벨, 시리즈 제목, 이전/다음 글 제목과 링크를 2컬럼 그리드로 표시
- **새 콘텐츠 추가 시** `series-nav.js`의 `SERIES` 객체에 해당 시리즈와 글 정보를 추가해야 한다
- script 태그 수동 추가 불요 — `article.njk` 레이아웃이 자동 포함

### 랜딩 페이지 (`index.html` + `assets/content-data.js` + `assets/index-app.js` + `assets/index.css`)
- `index.html`은 front matter + body만 담당 (SEO/head는 `landing.njk` 레이아웃이 처리, GoatCounter 추적 코드는 body에 유지)
- `content-data.js`에 시리즈/글 데이터를 JS 배열로 관리 → **새 콘텐츠 추가 시 이 파일만 수정**
- `index-app.js`가 데이터를 읽어 동적 렌더링 + 검색 + 정렬(ASC/DESC) + 모두 펼침/접기 처리
- `index.css`는 랜딩 페이지 전용 CSS. `editorial-base.css`의 @font-face/변수/리셋을 상속받고, 랜딩 페이지 고유 스타일만 정의
- **`content-data.js` 데이터 구조:**
  ```javascript
  { id: '시리즈-슬러그', seriesNum: 번호, title: '시리즈 제목', description: '설명',
    articles: [{ num: 1, title: '글 제목', role: '역할', tag: '태그', href: '경로', search: '검색 키워드' }] }
  ```

### 네비게이션 (`assets/nav.js`)
- 모든 콘텐츠 페이지에 자동 삽입되는 상단 네비게이션 바
- "Editorial" 로고 + "목록으로" 뒤로가기 링크
- sticky 포지션, 에디토리얼 디자인 시스템과 동일한 스타일
- script 태그 수동 추가 불요 — `article.njk` 레이아웃이 자동 포함
- HtmlBasePlugin이 `/assets/nav.js` → `/editorial/assets/nav.js`로 변환. nav.js의 basePath 역산 로직이 정상 동작

## 디자인 시스템

### 핵심 디자인 규칙
- **서체**: 영문 Source Serif 4(세리프, 셀프호스팅) + 한글 Pretendard Variable(산세리프, CDN 다이나믹 서브셋). Noto Serif KR 사용 금지 (한글에서 올드함). Google Fonts 외부 로드 금지 (셀프호스팅 필수, `font-display: swap` + fontpie 메트릭 폴백으로 CLS 제로)
- **색상**: 모든 색상은 CSS 변수로 관리. 하드코딩 금지
  - `--bg`, `--fg`, `--muted`, `--accent`, `--rule`, `--card-bg`, `--prose`, `--secondary`
- **한글 라벨**: 한글 포함 라벨은 모노스페이스 금지. 본문 서체 0.8rem 이상, letter-spacing 2px 이하
- **날짜 비표시**: 콘텐츠 페이지에 작성일/수정일을 화면에 표시하지 않는다. SEO 메타 태그(article:published_time, JSON-LD)에만 기록한다
- **다크모드**: `[data-theme="dark"]` CSS 변수로 자동 전환. `assets/theme-toggle.js`가 토글 처리, localStorage에 저장. FOUC 방지 인라인 스크립트 필수
- **금지 항목**: 이모지, 이탤릭, 그라디언트, 산세리프 전용 디자인

## 블로그 & 수익화 전략

### 배포: GitHub Pages (`editorial` 레포지토리)

**기존 플랫폼(Tistory, Velog, 브런치)을 사용하지 않는 이유:**
- 이 프로젝트의 핵심 차별점은 **에디토리얼 디자인 퀄리티**다. 기존 플랫폼에 올리면 디자인이 죽는다
- Tistory: HTML 커스텀 제한적, 스킨 내에서만 가능, 광고가 디자인을 해친다
- Velog: 마크다운 기반이라 이 수준의 레이아웃 불가
- 브런치: 에디터 제약이 심함

**자체 사이트의 장점:**
- 지금 만든 HTML을 **그대로** 배포 가능. 디자인 타협 없음
- 도메인 하나로 포트폴리오 겸 블로그
- 비용 0원 (GitHub Pages 무료)
- 광고 코드(Google AdSense 등) 자유롭게 삽입 가능

### 수익화
- **Google AdSense**: 자체 사이트에 직접 광고 코드 삽입. 디자인과 조화되는 위치에 배치
- **유입 전략**: Tistory에 요약 버전 + 원본 링크로 네이버/다음 검색 유입 확보 (선택)
- 광고 삽입 시 에디토리얼 디자인을 해치지 않는 위치 선정 (글 하단, 시리즈 사이 등)

### TODO (블로그 구축)
- [x] index.html — 시리즈 목록 랜딩 페이지 제작 (검색/필터 포함)
- [x] 기존 HTML 5개에 SEO 태그 적용 (seo 스킬 기준)
- [x] GitHub Pages 배포 세팅 (GitHub Actions workflow)
- [x] sitemap.xml + robots.txt 생성
- [x] 공통 네비게이션 헤더 (assets/nav.js)
- [x] 레포지토리명 editorial로 변경, 모든 URL 반영
- [x] 공통 CSS 분리 (assets/editorial-base.css)
- [x] 시리즈 이전/다음 글 네비게이션 (assets/series-nav.js)
- [x] 랜딩 페이지 리팩토링 (콘텐츠 데이터 분리, 정렬/펼침접기 기능)
- [x] 11ty SSG 마이그레이션 (레이아웃 템플릿, front matter, 자동 빌드)
- [ ] OG 이미지 생성 (assets/ 폴더)
- [ ] Google AdSense 신청 및 광고 코드 삽입
- [ ] 커스텀 도메인 연결 (선택)
- [ ] Tistory 요약 포스트 + 원본 링크 전략 (선택)

## 주의사항

- 콘텐츠 HTML은 **front matter + `<style>` + body** 구조. `<head>`, SEO, scripts는 레이아웃 템플릿(`article.njk`)이 자동 생성
- 공통 디자인 변경 시: `editorial-base.css` 수정 → 전체 반영. head/SEO 변경 시: `article.njk` 수정 → 전체 반영
- 콘텐츠 페이지에 날짜를 화면에 표시하지 않는다 (front matter의 datePublished → SEO 메타에만 기록)
- 새 콘텐츠 추가 시:
  1. `content/[시리즈-슬러그]/` 폴더에 HTML 생성 — **front matter + `<style>` + body만 작성** (editorial-content-page + seo 스킬 참조)
  2. front matter 필수 필드: `layout`, `pageTitle`, `description`, `datePublished`
  3. `series-nav.js`의 SERIES 데이터에 글 추가
  4. `assets/content-data.js`에 시리즈/글 데이터 추가 (랜딩 페이지 자동 반영)
  5. `content/index.md` 업데이트 (기록용)
  6. **`sitemap.xml`에 새 URL 추가** (lastmod 날짜 포함)
  7. `npx eleventy`로 빌드 확인
- 새 시리즈 추가 시: 이 문서의 콘텐츠 관리 섹션 + `assets/content-data.js` + `series-nav.js` + `content/index.md` + **`sitemap.xml`** 모두 업데이트
- **Nunjucks 주의**: 콘텐츠 body에 `{{`, `{%`, `{#` 포함 시 `{% raw %}...{% endraw %}`로 감싸야 함
- **Google Fonts 외부 링크 사용 금지** (셀프호스팅 필수)

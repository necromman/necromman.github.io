# 프로젝트 개요

에디토리얼/매거진 스타일의 단일 HTML 콘텐츠를 제작하고, 이를 블로그로 서비스하는 프로젝트.

- **레포지토리**: `editorial`
- **배포 URL**: `https://necromman.github.io/editorial/`

## AI 작업 원칙

> **사용자는 개발/디자인 비전문가다. AI가 주도적으로 방향을 잡고, 구조를 제안하고, 의사결정을 이끌어야 한다.**

- 사용자가 막연한 요청을 해도 AI가 구체적인 실행안을 먼저 제시한다
- 기술적 선택지가 있을 때 AI가 추천안을 골라주고, 이유를 간결하게 설명한다
- "어떻게 할까요?"보다 "이렇게 하겠습니다, 괜찮으시면 진행합니다" 스타일로 작업한다
- 사용자가 모를 수 있는 배포/SEO/수익화 등의 영역도 AI가 알아서 챙긴다
- **날짜를 쓸 때 연도를 절대 혼동하지 않는다.** 현재 연도를 반드시 확인하고, SEO 태그/JSON-LD/sitemap/인덱스 등 모든 곳에 정확한 날짜를 기입한다

## 배경

유튜브 영상("99%가 인생을 낭비하는 이유")을 보고, Gemini로 스크립트를 뽑아 Claude로 에디토리얼 HTML을 만들어봤더니 결과물이 괜찮았다. 그래서 반박/종합/실행/메타 문서까지 시리즈로 확장했고, 이걸 블로그로 올려서 운영해보려는 프로젝트. 앞으로 다른 영상/아티클에도 같은 패턴을 적용해서 콘텐츠를 늘려갈 계획.

## 폴더 구조

```
editorial/
├── index.html                              # 블로그 랜딩 페이지 (검색/필터 포함)
├── CLAUDE.md                               # 프로젝트 규칙서
├── .claude/
│   ├── settings.json
│   └── skills/
│       ├── editorial-content-page/
│       │   └── SKILL.md                    # 에디토리얼 HTML 제작 스킬
│       ├── seo/
│       │   └── SKILL.md                    # SEO 최적화 스킬
│       ├── common-css/
│       │   └── SKILL.md                    # 공통 CSS 디자인 시스템 스킬
│       ├── common-header/
│       │   └── SKILL.md                    # 공통 네비게이션 헤더 스킬
│       └── series-nav/
│           └── SKILL.md                    # 시리즈 네비게이션 스킬
├── assets/
│   ├── editorial-base.css                  # 콘텐츠 페이지 공통 CSS (디자인 시스템 베이스)
│   ├── nav.js                              # 공통 네비게이션 (전 페이지 자동 삽입)
│   └── series-nav.js                       # 시리즈 내 이전/다음 글 네비게이션
├── content/                                # 모든 콘텐츠 HTML
│   ├── index.md                            # 콘텐츠 인덱스 (AI가 자동 관리)
│   └── wasted-life-series/                 # 시리즈별 폴더 (영문 슬러그)
│       ├── 99-percent-wasted-life-guide.html
│       ├── what-self-help-wont-tell-you.html
│       ├── conditions-for-change.html
│       ├── so-what-now.html
│       └── how-this-was-made.html
├── sitemap.xml
├── robots.txt
└── .github/workflows/deploy.yml            # GitHub Pages 자동 배포
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

**스킬 규칙:**
- HTML 콘텐츠를 생성하거나 수정할 때 **editorial-content-page + seo** 두 스킬을 반드시 참조한다
- 공통 CSS나 네비게이션을 수정할 때 **common-css**, **common-header**, **series-nav** 스킬을 참조한다
- 사용자가 스타일/레이아웃에 불만을 표시하면 editorial-content-page 스킬도 함께 개선한다
- 스킬은 피드백을 반영하여 지속적으로 업데이트해야 하는 살아있는 문서다

## 콘텐츠 관리

### 콘텐츠 인덱스

`content/index.md`가 모든 콘텐츠의 목록을 관리한다.

**규칙:**
- 새 콘텐츠를 추가하면 `content/index.md`를 **반드시** 업데이트한다
- 새 시리즈를 추가하면 인덱스에 시리즈 섹션을 추가한다
- 이 인덱스는 블로그 랜딩 페이지(index.html) 생성 시 데이터 소스로 사용된다

### 시리즈 1: 인생 낭비 (wasted-life-series)

| # | 파일 | 한글 제목 | 역할 |
|---|------|-----------|------|
| 01 | `99-percent-wasted-life-guide.html` | 99퍼센트 인생낭비 적용가이드 | 원본 정리 — 유튜브 스크립트를 에디토리얼 재구성 |
| 02 | `what-self-help-wont-tell-you.html` | 자기계발이 말하지 않는 것 | 팩트 기반 반박 (학술 논문/OECD 데이터 인용) |
| 03 | `conditions-for-change.html` | 변화의 조건 | 종합 분석 — 양쪽 맹점 교차 검증 |
| 04 | `so-what-now.html` | 그래서 어떡하라고 | 실행 매뉴얼 — 자가 진단 + 90일 프로토콜 |
| 05 | `how-this-was-made.html` | 이 문서는 어떻게 만들어졌는가 | 메타 문서 — 제작 과정과 워크플로우 |

## 콘텐츠 제작 워크플로우

1. **소스 확보**: YouTube 영상 → Gemini로 스크립트 추출
2. **1차 편집**: 스크립트 → Claude로 에디토리얼 HTML 생성
   - editorial-content-page 스킬 + seo 스킬 동시 적용
   - `<script src="../../assets/nav.js" defer></script>` 반드시 포함
   - `<script src="../../assets/series-nav.js" defer></script>` 시리즈 콘텐츠일 경우 반드시 포함
3. **확장**: 하나의 주장에서 반박(반대) → 종합(중립) → 실행(실용) → 메타(과정) 시리즈 도출
4. **등록**: `content/index.md` 인덱스 업데이트 + `index.html`에 시리즈/글 항목 추가
5. **반복**: 다른 영상/아티클에도 같은 패턴 적용

## 공통 컴포넌트

### 공통 CSS (`assets/editorial-base.css`)
- 콘텐츠 페이지의 공통 디자인 시스템 CSS (변수, 리셋, 타이포그래피, 레이아웃 컴포넌트)
- `:root` 변수, body, `.page`, `.masthead`, `.section-head`, `.prose`, `.pull-quote`, `.mechanism-row`, `.technique`, `.warning-box`, `.closing`, `.footer`, 반응형, 프린트 스타일 포함
- **새 콘텐츠 추가 시** `<link rel="stylesheet" href="../../assets/editorial-base.css">`를 Pretendard CDN 링크 바로 다음에 추가한다
- 각 HTML의 `<style>` 태그에는 해당 페이지 **고유 컴포넌트 CSS만** 남긴다 (masthead 오버라이드, 페이지 전용 레이아웃 등)
- 공통 CSS를 수정하면 모든 콘텐츠 페이지에 일괄 반영된다

### 시리즈 네비게이션 (`assets/series-nav.js`)
- 콘텐츠 페이지 하단에 같은 시리즈의 이전/다음 글 링크를 표시하는 네비게이션
- `.footer` 요소 바로 앞에 자동 삽입
- 시리즈 라벨, 시리즈 제목, 이전/다음 글 제목과 링크를 2컬럼 그리드로 표시
- **새 콘텐츠 추가 시** `series-nav.js`의 `SERIES` 객체에 해당 시리즈와 글 정보를 추가해야 한다
- **새 콘텐츠 추가 시** `<script src="../../assets/series-nav.js" defer></script>`를 nav.js 스크립트 바로 다음에 추가한다

### 네비게이션 (`assets/nav.js`)
- 모든 콘텐츠 페이지에 자동 삽입되는 상단 네비게이션 바
- "Editorial" 로고 + "목록으로" 뒤로가기 링크
- sticky 포지션, 에디토리얼 디자인 시스템과 동일한 스타일
- **새 콘텐츠 추가 시** `<script src="../../assets/nav.js" defer></script>`를 `</head>` 직전에 추가한다
- 경로의 `../../`는 `content/[시리즈]/` 기준. 깊이가 다르면 상대경로 조정

## 디자인 시스템

### 핵심 디자인 규칙
- **서체**: 영문 Source Serif 4(세리프) + 한글 Pretendard(산세리프). Noto Serif KR 사용 금지 (한글에서 올드함)
- **색상**: 모든 색상은 CSS 변수로 관리. 하드코딩 금지
  - `--bg`, `--fg`, `--muted`, `--accent`, `--rule`, `--card-bg`, `--prose`, `--secondary`
- **한글 라벨**: 한글 포함 라벨은 모노스페이스 금지. 본문 서체 0.8rem 이상, letter-spacing 2px 이하
- **날짜 비표시**: 콘텐츠 페이지에 작성일/수정일을 화면에 표시하지 않는다. SEO 메타 태그(article:published_time, JSON-LD)에만 기록한다
- **금지 항목**: 이모지, 이탤릭, 그라디언트, 다크 테마, 산세리프 전용 디자인

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
- [ ] OG 이미지 생성 (assets/ 폴더)
- [ ] Google AdSense 신청 및 광고 코드 삽입
- [ ] 커스텀 도메인 연결 (선택)
- [ ] Tistory 요약 포스트 + 원본 링크 전략 (선택)

## 주의사항

- 콘텐츠 HTML은 `editorial-base.css`(공통) + 인라인 `<style>`(고유) 구조. 공통 디자인 변경 시 CSS 파일만 수정하면 전체 반영
- 콘텐츠 페이지에 날짜를 화면에 표시하지 않는다 (SEO 메타에만 기록)
- 새 콘텐츠 추가 시: `content/[시리즈-슬러그]/` 폴더에 넣고, 두 스킬(editorial-content-page + seo) 참조하고, `editorial-base.css` 링크 + nav.js + series-nav.js 스크립트 포함하고, `series-nav.js`의 SERIES 데이터에 글 추가하고, `content/index.md` + `index.html` 업데이트
- 새 시리즈 추가 시: 이 문서의 콘텐츠 관리 섹션과 `content/index.md` 모두 업데이트

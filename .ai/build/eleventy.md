# 빌드 시스템 (11ty)

11ty(Eleventy) SSG로 빌드한다. 공통 head/SEO/scripts는 레이아웃 템플릿 1개에서 관리하고, 콘텐츠 HTML은 **front matter + body만** 작성한다.

- **빌드 명령**: `npx eleventy` (결과물: `_site/`)
- **로컬 개발**: `npx eleventy --serve`
- **URL 보존**: `content/[series]/[file].html` 구조 그대로 유지 (`content.11tydata.js`가 pretty URL 방지)
- **HtmlBasePlugin**: 템플릿의 `/assets/nav.js` → 출력에서 `/editorial/assets/nav.js`로 자동 변환

## 콘텐츠 HTML 파일 형식 (front matter)

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

## 레이아웃 템플릿

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
├── CLAUDE.md                               # 프로젝트 규칙서 (인덱스)
├── .ai/                                    # AI 작업 참조 문서 (빌드 제외)
│   ├── build/eleventy.md                   # 빌드 시스템 상세
│   ├── content/catalog.md                  # 콘텐츠 카탈로그 (30개 시리즈)
│   ├── design/components.md                # 공통 컴포넌트 & 디자인 시스템
│   └── project/monetization.md             # 수익화 & 프로젝트 전략
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

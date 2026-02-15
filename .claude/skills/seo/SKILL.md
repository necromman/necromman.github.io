---
name: seo
description: Use this skill whenever creating or modifying HTML content pages for the blog. This skill ensures every page has proper SEO meta tags, Open Graph tags, structured data, and semantic HTML for search engine visibility. Must be applied together with the editorial-content-page skill. Trigger automatically when generating any HTML content in the content/ directory.
---

# SEO Skill

블로그에 배포되는 모든 HTML 콘텐츠에 검색 엔진 최적화(SEO)를 적용하는 스킬. editorial-content-page 스킬과 반드시 함께 사용한다.

## 11ty 기반 SEO 적용

**SEO 태그(title, description, OG, Twitter, JSON-LD, canonical)는 `article.njk` 레이아웃 템플릿이 자동 생성한다.** 콘텐츠 HTML에 직접 작성하지 않는다.

콘텐츠 작성 시 front matter만 정확히 기입하면 SEO가 자동 적용된다:

```yaml
---
layout: layouts/article.njk
pageTitle: "99%가 인생을 낭비하는 이유"     # <title> + OG title (60자 이내)
description: "뇌의 기본 설정과 인지 편향이..." # meta description (150자 이내)
datePublished: "2026-02-08"                    # ISO 8601 날짜
ogTitle: "OG 전용 제목"                        # pageTitle과 다를 때만 (선택)
ogDescription: "OG 전용 설명"                  # description과 다를 때만 (선택)
dateModified: "2026-02-09"                     # 수정일이 다를 때만 (선택)
---
```

## SEO 참고 기준

### 1. 제목과 설명

- `pageTitle`은 60자 이내, 핵심 키워드 포함
- `description`은 150자 이내, 콘텐츠 핵심 요약
- 템플릿이 `{pageTitle} — Editorial` 형식으로 `<title>` 자동 생성

### 2. Open Graph / Twitter Card / JSON-LD

`article.njk` 템플릿이 front matter 데이터로 자동 생성:
- OG: type(article), title, description, url, locale, site_name, published_time
- Twitter: card(summary_large_image), title, description
- JSON-LD: Article 타입, headline, description, datePublished, dateModified, publisher, mainEntityOfPage

`ogTitle`, `ogDescription`이 설정되면 OG/Twitter에 해당 값을 사용하고, 없으면 `pageTitle`/`description`을 사용한다.

### 3. 시맨틱 HTML

콘텐츠 영역에 시맨틱 태그를 사용한다:

```html
<article>
  <header>
    <!-- masthead: 제목, 부제, 날짜 -->
  </header>
  <main>
    <section><!-- Part I --></section>
    <section><!-- Part II --></section>
    <section><!-- Part III --></section>
  </main>
  <footer>
    <!-- 출처, 크레딧 -->
  </footer>
</article>
```

- `<article>` 태그로 콘텐츠 전체를 감싼다
- 각 Part는 `<section>` 태그로 감싼다
- 제목 태그 위계: `<h1>` 1개(페이지 제목), `<h2>`(Part 제목), `<h3>`(소항목)

### 4. 이미지 최적화 (해당 시)

```html
<img src="..." alt="{이미지 설명}" width="..." height="..." loading="lazy">
```

- `alt` 속성 필수 (빈 문자열 금지, 장식용 이미지는 `alt=""`)
- `width`/`height` 명시 (CLS 방지)
- `loading="lazy"` (첫 화면 이미지 제외)

## URL 규칙

- 파일명은 영문 소문자 + 하이픈 슬러그 사용
- 예: `content/wasted-life-series/so-what-now.html`
- URL에 한글, 언더스코어(_), 대문자 사용 금지

## 날짜 규칙

- **연도를 절대 혼동하지 않는다.** 콘텐츠 생성 시점의 실제 연도를 확인하여 기입한다
- `article:published_time`, `datePublished`, `dateModified`, sitemap `lastmod` 등 모든 날짜 필드에 정확한 날짜를 사용한다
- 날짜 형식은 ISO 8601 (`YYYY-MM-DD`)을 사용한다

## sitemap.xml 업데이트 (필수)

**새 콘텐츠를 추가할 때마다 `sitemap.xml`에 해당 URL을 반드시 추가한다.** 이 단계를 빠뜨리면 검색 엔진이 새 콘텐츠를 발견하지 못한다.

```xml
<url>
  <loc>https://necromman.github.io/content/[시리즈-슬러그]/[파일-슬러그].html</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

- `lastmod`는 콘텐츠 생성일과 동일하게 기입한다
- 시리즈별로 XML 주석(`<!-- Series XX: 시리즈 제목 -->`)으로 구분한다
- 랜딩 페이지(`/`)의 `lastmod`도 새 콘텐츠 추가 시 갱신한다

## 체크리스트 (SEO 검수)

콘텐츠 생성 후 아래 항목을 확인한다:

**Front matter 검수:**
- [ ] `layout: layouts/article.njk`가 설정되어 있는가
- [ ] `pageTitle`이 60자 이내이고 핵심 키워드를 포함하는가
- [ ] `description`이 150자 이내인가
- [ ] `datePublished`가 ISO 8601 형식이고 정확한 날짜인가
- [ ] OG 전용 제목/설명이 필요한 경우 `ogTitle`/`ogDescription`이 설정되어 있는가

**콘텐츠 영역 검수:**
- [ ] `<h1>` 태그가 정확히 1개인가
- [ ] 제목 위계가 순서대로인가 (h1 → h2 → h3, 건너뛰기 없음)
- [ ] `<article>`, `<section>` 시맨틱 태그를 사용하는가
- [ ] 파일명이 영문 슬러그인가

**등록 검수:**
- [ ] **`sitemap.xml`에 새 URL이 추가되었는가**
- [ ] `assets/content-data.js`에 데이터가 추가되었는가
- [ ] `.ai/content/catalog.md`에 시리즈/글 목록이 추가되었는가

## 이 스킬의 적용 시점

- **새 HTML 콘텐츠 작성 시**: editorial-content-page 스킬과 함께 반드시 적용. front matter 필드를 정확히 기입
- **기존 HTML 수정 시**: front matter의 SEO 필드가 빠져 있으면 추가
- **content/index.md 업데이트 시**: 새 콘텐츠의 슬러그와 메타 정보 반영

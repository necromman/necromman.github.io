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

## 상세 문서 (.ai/)

프로젝트 상세 정보는 `.ai/` 폴더에 분리 관리한다. 필요 시 참조:

| 문서 | 경로 | 내용 |
|------|------|------|
| **빌드 시스템** | [`.ai/build/eleventy.md`](.ai/build/eleventy.md) | 11ty 설정, 빌드 명령, front matter 형식, 레이아웃 템플릿, 폴더 구조 |
| **콘텐츠 카탈로그** | [`.ai/content/catalog.md`](.ai/content/catalog.md) | 30개 시리즈 전체 목록, 콘텐츠 데이터 관리 규칙 |
| **컴포넌트 & 디자인** | [`.ai/design/components.md`](.ai/design/components.md) | 공통 CSS, 네비게이션, 랜딩 페이지, 디자인 시스템 규칙 |
| **수익화 & 전략** | [`.ai/project/monetization.md`](.ai/project/monetization.md) | 배포 전략, 수익화, TODO, 콘텐츠 제작 워크플로우 |

## 빌드 시스템 (요약)

11ty(Eleventy) SSG. 상세: [`.ai/build/eleventy.md`](.ai/build/eleventy.md)

- **빌드**: `npx eleventy` (결과물: `_site/`)
- **로컬 개발**: `npx eleventy --serve`
- 콘텐츠 HTML은 **front matter + `<style>` + body만** 작성. head/SEO/scripts는 레이아웃 템플릿이 자동 생성
- **Nunjucks 주의**: body에 `{{`, `{%`, `{#` 포함 시 `{% raw %}...{% endraw %}`로 감싸야 함

## 스킬 (Skills)

| 스킬 | 경로 | 용도 | 적용 시점 |
|------|------|------|-----------|
| **editorial-content-page** | `.claude/skills/editorial-content-page/SKILL.md` | 에디토리얼 HTML 제작 규칙 (디자인, 타이포그래피, 레이아웃) | HTML 콘텐츠 생성/수정 시 |
| **seo** | `.claude/skills/seo/SKILL.md` | SEO 메타 태그, OG 태그, 구조화 데이터, 시맨틱 HTML | HTML 콘텐츠 생성/수정 시 |
| **common-css** | `.claude/skills/common-css/SKILL.md` | 공통 CSS 디자인 시스템 관리 (editorial-base.css) | 공통 스타일 변경 시, 새 콘텐츠 생성 시 |
| **common-header** | `.claude/skills/common-header/SKILL.md` | 공통 네비게이션 헤더 (nav.js) 관리 | 네비 수정 시, 새 콘텐츠 추가 시 |
| **series-nav** | `.claude/skills/series-nav/SKILL.md` | 시리즈 이전/다음 글 네비게이션 (series-nav.js) | 시리즈 콘텐츠 추가/수정 시 |
| **series-plan** | `.claude/skills/series-plan/SKILL.md` | 시리즈 기획 워크플로우 (자료조사 → 기획서) | 새 시리즈 기획 시 |
| **prompt-driven-guide** | `.claude/skills/prompt-driven-guide/SKILL.md` | 코드 대신 프롬프트를 제공하는 기술 가이드 제작 규칙 | 기술 해설 시리즈에서 코드 없이 구성도+프롬프트로 작성 시 |

**스킬 규칙:**
- HTML 콘텐츠를 생성하거나 수정할 때 **editorial-content-page + seo** 두 스킬을 반드시 참조한다
- 기술 해설 콘텐츠에서 코드 대신 프롬프트를 제공할 때 **prompt-driven-guide** 스킬을 추가 참조한다
- 공통 CSS나 네비게이션을 수정할 때 **common-css**, **common-header**, **series-nav** 스킬을 참조한다
- 사용자가 스타일/레이아웃에 불만을 표시하면 editorial-content-page 스킬도 함께 개선한다
- 스킬은 피드백을 반영하여 지속적으로 업데이트해야 하는 살아있는 문서다

## 콘텐츠 관리 (요약)

전체 카탈로그(30개 시리즈): [`.ai/content/catalog.md`](.ai/content/catalog.md)

**새 콘텐츠 추가 체크리스트:**
1. `content/[시리즈-슬러그]/` 폴더에 HTML 생성 — **front matter + `<style>` + body만 작성**
2. front matter 필수 필드: `layout`, `pageTitle`, `description`, `datePublished`
3. `series-nav.js`의 SERIES 데이터에 글 추가
4. `assets/content-data.js`에 시리즈/글 데이터 추가
5. `content/index.md` 업데이트 (기록용)
6. **`sitemap.xml`에 새 URL 추가** (lastmod 날짜 포함)
7. `.ai/content/catalog.md`에 시리즈/글 목록 추가
8. `npx eleventy`로 빌드 확인

**새 시리즈 추가 시**: 위 체크리스트 + 이 문서 하단 참조사항 확인

## 주의사항

- 콘텐츠 HTML은 **front matter + `<style>` + body** 구조. `<head>`, SEO, scripts는 레이아웃 템플릿(`article.njk`)이 자동 생성
- 공통 디자인 변경 시: `editorial-base.css` 수정 → 전체 반영. head/SEO 변경 시: `article.njk` 수정 → 전체 반영
- 콘텐츠 페이지에 날짜를 화면에 표시하지 않는다 (front matter의 datePublished → SEO 메타에만 기록)
- **Nunjucks 주의**: 콘텐츠 body에 `{{`, `{%`, `{#` 포함 시 `{% raw %}...{% endraw %}`로 감싸야 함
- **Google Fonts 외부 링크 사용 금지** (셀프호스팅 필수)
- 파일명은 영문 소문자 + 하이픈 슬러그만 사용

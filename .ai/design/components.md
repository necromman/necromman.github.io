# 공통 컴포넌트 & 디자인 시스템

## 공통 CSS (`assets/editorial-base.css`)

- 콘텐츠 페이지의 공통 디자인 시스템 CSS (셀프호스팅 폰트 @font-face, 변수, 리셋, 타이포그래피, 레이아웃 컴포넌트)
- 셀프호스팅 폰트: Source Serif 4 + JetBrains Mono (variable woff2, `font-display: swap`) + 메트릭 보정 폴백 (fontpie 계산, CLS 제로)
- `:root` 변수, body, `.page`, `.masthead`, `.section-head`, `.prose`, `.pull-quote`, `.mechanism-row`, `.technique`, `.warning-box`, `.closing`, `.footer`, 반응형, 프린트 스타일 포함
- **새 콘텐츠 추가 시** CSS 링크 수동 추가 불요 — `article.njk` 레이아웃이 preconnect, editorial-base.css, Pretendard CDN을 자동 포함
- 각 HTML의 `<style>` 태그에는 해당 페이지 **고유 컴포넌트 CSS만** 남긴다 (masthead 오버라이드, 페이지 전용 레이아웃 등). `extractStyles` 필터가 `<head>`로 자동 이동
- 공통 CSS를 수정하면 모든 콘텐츠 페이지에 일괄 반영된다

## 시리즈 네비게이션 (`assets/series-nav.js`)

- 콘텐츠 페이지 하단에 같은 시리즈의 이전/다음 글 링크를 표시하는 네비게이션
- `.footer` 요소 바로 앞에 자동 삽입
- 시리즈 라벨, 시리즈 제목, 이전/다음 글 제목과 링크를 2컬럼 그리드로 표시
- **새 콘텐츠 추가 시** `series-nav.js`의 `SERIES` 객체에 해당 시리즈와 글 정보를 추가해야 한다
- script 태그 수동 추가 불요 — `article.njk` 레이아웃이 자동 포함

## 랜딩 페이지 (`index.html` + `assets/content-data.js` + `assets/index-app.js` + `assets/index.css`)

- `index.html`은 front matter + Nunjucks 템플릿 body (SEO/head는 `landing.njk` 레이아웃이 처리, GoatCounter 추적 코드는 body에 유지)
- **11ty SSR**: `index.html`이 Nunjucks 템플릿으로 `contentData`를 순회하며 카드 HTML을 서버 렌더링. JS는 인터랙션(필터, 페이지네이션, 검색)만 담당
- `content-data.js`에 시리즈/글 데이터를 JS 배열로 관리 → **새 콘텐츠 추가 시 이 파일만 수정**
- `index-app.js` 기능: 카테고리 필터 + 텍스트 검색(250ms 디바운스) + 번호 페이지네이션 + URL 상태 관리(`?category=&page=`) + 정렬(ASC/DESC) + TOC 연동 + ARIA 라이브 리전
- `index.css`는 랜딩 페이지 전용 CSS. `editorial-base.css`의 @font-face/변수/리셋을 상속받고, 랜딩 페이지 고유 스타일만 정의

**랜딩 페이지 주요 UI 구성:**
- **카테고리 탭**: 전체 / 기술 & 개발 / 분석 & 팩트체크 / 소설 & 창작 / 업무 & 커리어 (ARIA `role="tablist"`)
- **번호 페이지네이션**: 시리즈 5개 단위, 말줄임(...) 지원, URL `?page=N` 동기화
- **TOC 사이드바**: `<details>/<summary>` 카테고리별 접이식 목차, 카테고리 클릭 시 탭 필터 연동
- **URL 상태**: `?category=tech&page=2` 형태, `history.replaceState` + `popstate` 처리

- **`content-data.js` 데이터 구조:**
  ```javascript
  var CATEGORIES = { tech: { label: '기술 & 개발' }, analysis: { label: '분석 & 팩트체크' }, fiction: { label: '소설 & 창작' }, career: { label: '업무 & 커리어' } };
  { id: '시리즈-슬러그', category: 'tech', seriesNum: 번호, title: '시리즈 제목', description: '설명',
    articles: [{ num: 1, title: '글 제목', role: '역할', tag: '태그', href: '경로', search: '검색 키워드' }] }
  ```
  - `category` 필드 필수. 분류 기준은 CLAUDE.md 참조

## 네비게이션 (`assets/nav.js`)

- 모든 콘텐츠 페이지에 자동 삽입되는 상단 네비게이션 바
- "Editorial" 로고 + "목록으로" 뒤로가기 링크
- sticky 포지션, 에디토리얼 디자인 시스템과 동일한 스타일
- script 태그 수동 추가 불요 — `article.njk` 레이아웃이 자동 포함
- HtmlBasePlugin이 `/assets/nav.js` → `/editorial/assets/nav.js`로 변환. nav.js의 basePath 역산 로직이 정상 동작

## 디자인 시스템 핵심 규칙

- **서체**: 영문 Source Serif 4(세리프, 셀프호스팅) + 한글 Pretendard Variable(산세리프, CDN 다이나믹 서브셋). Noto Serif KR 사용 금지 (한글에서 올드함). Google Fonts 외부 로드 금지 (셀프호스팅 필수, `font-display: swap` + fontpie 메트릭 폴백으로 CLS 제로)
- **색상**: 모든 색상은 CSS 변수로 관리. 하드코딩 금지
  - `--bg`, `--fg`, `--muted`, `--accent`, `--rule`, `--card-bg`, `--prose`, `--secondary`
- **한글 라벨**: 한글 포함 라벨은 모노스페이스 금지. 본문 서체 0.8rem 이상, letter-spacing 2px 이하
- **날짜 비표시**: 콘텐츠 페이지에 작성일/수정일을 화면에 표시하지 않는다. SEO 메타 태그(article:published_time, JSON-LD)에만 기록한다
- **다크모드**: `[data-theme="dark"]` CSS 변수로 자동 전환. `assets/theme-toggle.js`가 토글 처리, localStorage에 저장. FOUC 방지 인라인 스크립트 필수
- **금지 항목**: 이모지, 이탤릭, 그라디언트, 산세리프 전용 디자인

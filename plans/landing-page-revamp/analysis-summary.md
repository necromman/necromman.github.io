# 랜딩 페이지 개편 — 현황 분석 보고서

> 분석일: 2026-02-28
> 분석 에이전트: UX/IA, 비주얼 디자인, 성능 최적화, 반응형 레이아웃, 접근성/SEO (5개 병렬)

---

## 1. 프로젝트 현황

### 1.1 콘텐츠 규모

| 항목 | 수치 |
|------|------|
| 시리즈 수 | 38개 |
| 총 글 수 | 150+ |
| 시리즈당 편 수 | 1편 (innobiz) ~ 9편 (robot-coworker) |
| 콘텐츠 유형 | 정보전달 60%, 소설/창작 30%, 혼합 10% |

### 1.2 기술 스택

- **빌드**: 11ty (Eleventy) SSG → `_site/` 출력
- **프론트엔드**: Vanilla JS (프레임워크 없음), CSS 변수 기반 디자인 시스템
- **배포**: GitHub Pages
- **분석**: GoatCounter

### 1.3 파일 구조 (랜딩 관련)

```
assets/
├── content-data.js      # 38개 시리즈 메타데이터 (68KB)
├── index-app.js         # 랜딩 페이지 JS — 페이징, 검색, 정렬, TOC (17KB)
├── index.css            # 랜딩 페이지 CSS (12KB)
├── editorial-base.css   # 공통 CSS 디자인 시스템 (8.8KB)
├── nav.js               # 공통 헤더 (2.9KB)
├── series-nav.js        # 시리즈 이전/다음 네비게이션 (20KB)
├── theme-toggle.js      # 다크모드 토글 (2KB)
└── fonts/               # 셀프호스팅 폰트 (Source Serif 4, JetBrains Mono)

_includes/layouts/
├── landing.njk          # 랜딩 페이지 템플릿
└── article.njk          # 글 페이지 템플릿

content/
├── index.md             # 랜딩 페이지 소스
└── [38개 시리즈 폴더]/   # 개별 콘텐츠 HTML
```

---

## 2. 현재 랜딩 페이지 구조

### 2.1 레이아웃

```
┌─────────────────────────────────────────────────────────┐
│ .masthead — 사이트 제목 + 부제                          │
├─────────────────────────────────────────────────────────┤
│ .toolbar — 검색 입력 + 정렬 버튼                        │
├────────────────────────────────────┬────────────────────┤
│ .card-grid (3열)                   │ .toc-sidebar       │
│ ┌──────────────────────────────┐   │ (220px 고정)       │
│ │ .series-divider (full-width) │   │                    │
│ │ 시리즈 01 — 시리즈 제목      │   │ 01 시리즈1         │
│ ├──────┬──────┬──────┐         │   │ 02 시리즈2         │
│ │ card │ card │ card │         │   │ 03 시리즈3         │
│ ├──────┴──────┴──────┤         │   │ ...                │
│ │ .series-divider    │         │   │ 38 시리즈38        │
│ │ ...                │         │   │                    │
│ └────────────────────┘         │   │ 페이지 정보:       │
│                                │   │ 12/38 (0.6rem)     │
│ [load-sentinel]                │   │                    │
├────────────────────────────────┴────────────────────────┤
│ .site-footer                                            │
└─────────────────────────────────────────────────────────┘
```

### 2.2 데이터 흐름

```
content-data.js (38개 시리즈 객체)
  │
  ├── 11ty 빌드 시 → SSR HTML 생성 (SEO 친화적)
  │
  └── 런타임 (index-app.js)
      ├── collectSeriesGroups() → DOM에서 시리즈/글 수집
      ├── applyPagination()    → PAGE_SIZE=5로 숨김/표시
      ├── applySearch()        → data-search 기반 필터링
      ├── reorderAll()         → 시리즈 번호 기준 DOM 재배치
      ├── updateActiveOnScroll() → TOC 스크롤 추적
      └── setupInfiniteScroll()  → IntersectionObserver 감시
```

### 2.3 현재 기능 목록

| 기능 | 구현 방식 | 상태 |
|------|----------|------|
| 무한 스크롤 | IntersectionObserver + rootMargin 200px | 동작 |
| 검색 | data-search 속성 substring 매칭 | 동작 (debounce 없음) |
| 정렬 | 시리즈 번호 asc/desc DOM 재배치 | 동작 (검색 중 비활성) |
| TOC 스크롤 추적 | requestAnimationFrame + getBoundingClientRect | 동작 |
| 모바일 TOC 드로어 | transform 기반 슬라이드 인/아웃 | 동작 |
| 다크모드 | CSS 변수 + localStorage | 동작 |
| 카테고리 필터 | **미구현** | — |
| 전통 페이지네이션 | **미구현** | — |
| URL 상태 관리 | **미구현** | — |

---

## 3. 영역별 평가 요약

### 3.1 UX / 정보설계 — 평점: 5/10

| 강점 | 약점 |
|------|------|
| SSR 우선 (SEO 친화적) | 38개 시리즈가 카테고리 없이 일렬 나열 |
| 스크롤 기반 TOC 추적 | 무한스크롤이라 "끝"을 알 수 없음 |
| 검색 + 정렬 기본 기능 | 검색 중 정렬 불가, relevance 정렬 없음 |
| 반응형 모바일 드로어 | TOC 38개 항목이 그룹 없이 나열 |

### 3.2 비주얼 디자인 — 평점: 7/10

| 강점 | 약점 |
|------|------|
| 깔끔한 에디토리얼 스타일 | 카드 경계가 약함 (그림자 0.04 opacity) |
| 9개 CSS 변수로 일관된 컬러 시스템 | accent 색상이 하나뿐 (구분 불가) |
| 라이트/다크 모드 완벽 대응 | card-bg와 bg의 명도 차 불충분 (3.2%) |
| Source Serif 4 + JetBrains Mono 조합 우수 | 다크모드 그림자가 여전히 rgba(0,0,0,...) |

### 3.3 성능 — 평점: 6/10

| 강점 | 약점 |
|------|------|
| IntersectionObserver 활용 | content-data.js 68KB (전체 메타데이터 인라인) |
| requestAnimationFrame 스크롤 최적화 | series-nav.js에 CSS 6KB가 인라인 |
| fontpie 메트릭으로 CLS 제로 | 검색 debounce 없음 |
| contain/content-visibility 적용 | JS/CSS 최소화 미설정 |

### 3.4 반응형 — 평점: 6/10

| 강점 | 약점 |
|------|------|
| 4단계 브레이크포인트 체계 | fluid typography (clamp) 미사용 |
| 모바일 호버 효과 비활성화 | 태블릿 구간 (700~900px) 규칙 부족 |
| 하드웨어 가속 TOC 애니메이션 | 코드블록 모바일 폰트 축소 미정의 |
| 카드 비율 유지 (padding-top 트릭) | 브레이크포인트가 여러 파일에 분산 관리 |

### 3.5 접근성 / SEO — 평점: 7.5/10

| 강점 | 약점 |
|------|------|
| 시맨틱 HTML 적절 사용 | ARIA live region 없음 (동적 변경 알림 불가) |
| JSON-LD Article 스키마 완벽 | 모바일 TOC 포커스 트랩 미구현 |
| OG/Twitter 메타 태그 완전 | 버튼 상태 aria 속성 부족 |
| sitemap.xml 완전 | BreadcrumbList JSON-LD 미구현 |
| WCAG AA 색상 대비 충족 | Pretendard 폰트 CDN 의존 |

---

## 4. 핵심 문제 정리 (PRD 도출용)

### 치명적 (Critical)

| # | 문제 | 영향 | 원인 |
|---|------|------|------|
| C1 | 카테고리 없이 38개 시리즈 일렬 나열 | 콘텐츠 발견성 극히 낮음 | content-data.js에 category 필드 없음 |
| C2 | 무한스크롤로 "끝"을 알 수 없음 | 사용자 진행감 부재, 북마크 불가 | IntersectionObserver 방식 한계 |

### 높음 (High)

| # | 문제 | 영향 | 원인 |
|---|------|------|------|
| H1 | URL에 페이지/필터 상태 미반영 | 뒤로가기/공유 불가 | history API 미사용 |
| H2 | content-data.js 68KB 인라인 | 초기 로딩 지연 | 전체 메타데이터를 JS 번들에 포함 |
| H3 | 검색 debounce 없음 | 150개 카드 매 입력마다 순회 | setTimeout 미적용 |
| H4 | ARIA 접근성 부재 | 스크린 리더 사용자 경험 불가 | live region, focus trap 미구현 |
| H5 | TOC 38개 항목 그룹화 없음 | 원하는 시리즈 찾기 어려움 | 카테고리 분류 미적용 |

### 중간 (Medium)

| # | 문제 | 영향 | 원인 |
|---|------|------|------|
| M1 | 카드 경계 시각적으로 약함 | 데스크탑에서 카드 구분 어려움 | box-shadow opacity 0.04 |
| M2 | fluid typography 미사용 | 700px에서 폰트 크기 급격히 점프 | clamp() 미적용 |
| M3 | series-nav.js에 CSS 인라인 | 불필요한 6KB JS 번들 증가 | 스타일을 JS 문자열로 관리 |
| M4 | card-bg와 bg 명도 차 불충분 | 카드/박스 배경 구분 약함 | 명도 차 3.2% |
| M5 | BreadcrumbList JSON-LD 없음 | Google SERP에서 breadcrumb 미표시 | article.njk에 미구현 |
| M6 | 다크모드 그림자 미조정 | 다크에서 그림자가 너무 강함 | rgba(0,0,0,...) 고정 |
| M7 | Pretendard 폰트 CDN 의존 | 외부 CDN 장애 시 한글 렌더링 불안정 | 자체호스팅 미전환 |
| M8 | 검색 중 정렬 비활성 | 검색 결과 최신순 정렬 불가 | isSearching 시 sort 차단 |

### 낮음 (Low)

| # | 문제 | 영향 | 원인 |
|---|------|------|------|
| L1 | OG 이미지 PNG (2.2MB 총량) | 저장소 용량 증가 | WebP 미전환 |
| L2 | 코드블록 모바일 폰트 미축소 | 가로 스크롤 빈번 | 600px 이하 규칙 없음 |
| L3 | JS/CSS 최소화 미설정 | 15% 크기 절감 가능 | terser/cssnano 미적용 |
| L4 | asset hash 없음 | 캐시 효율 떨어짐 | 11ty plugin 미설정 |
| L5 | 검색 relevance 정렬 없음 | 결과 정확도 표시 불가 | 스코어링 로직 없음 |

---

## 5. 카테고리 분류 초안

38개 시리즈를 4개 카테고리로 분류 (에이전트 분석 기반):

### 기술 & 개발 (tech) — 11개

| # | 시리즈 ID | 시리즈명 |
|---|----------|---------|
| 1 | vibe-coding | 바이브 코딩 완전 가이드 |
| 2 | claude-code-guide | 컨텍스트는 우유다 |
| 3 | git-survival | Git, pair 없이 살아남기 |
| 4 | gitlab-migration | CTO의 깃랩 이사 공지 |
| 5 | server-infra-guide | 192.168.0.x의 규칙 |
| 6 | ai-server-setup | 서버는 샀는데 |
| 7 | openclaw | OpenClaw 해부 |
| 8 | why-react | React가 뭐길래 |
| 9 | code-last | 코드는 마지막이다 |
| 10 | mcp-agent-guide | 에이전트 조립 가이드 |
| 11 | qwen-for-humans | Qwen3.5, 인간의 언어로 |

### 분석 & 팩트체크 (analysis) — 10개

| # | 시리즈 ID | 시리즈명 |
|---|----------|---------|
| 1 | wasted-life | 99%가 인생을 낭비하는 이유 |
| 2 | bithumb-60t | 딸깍 한 번의 60조 원 |
| 3 | dev-survival | AI 시대 개발자 생존기 |
| 4 | lineage-classic | 린저씨의 귀환 |
| 5 | claude-cowork | 딸깍이 소프트웨어를 죽인다 |
| 6 | vibe-design | 디자이너 없이 제품 만들기 |
| 7 | ufo-physics | 거기서 어떻게 오셨어요 |
| 8 | diligence-paradox | 성실함이 배신하는 순간 |
| 9 | ai-job-debate | AI가 일자리를 빼앗는가 |
| 10 | youtube-outage | Something Went Wrong |

### 소설 & 창작 (fiction) — 12개

| # | 시리즈 ID | 시리즈명 |
|---|----------|---------|
| 1 | sovereign-ai-novel | 소버린 배당일 |
| 2 | masterkey | 마스터키 |
| 3 | ai-withdrawal | 금단의 코드 |
| 4 | illusion-of-knowing | 안다는 착각 |
| 5 | starcraft-timeslip | GG |
| 6 | vow-system | 서약빨 |
| 7 | voice-phishing | 엄마의 전화 |
| 8 | modern-mukhyang | 묵향: 리부트 |
| 9 | seventh-seat | 일곱 번째 자리 |
| 10 | overlap | 겹침 |
| 11 | debug-mode | The Dawn of Light |
| 12 | one-punch-reason | 강해져버린 이유 |

### 업무 & 커리어 (career) — 5개

| # | 시리즈 ID | 시리즈명 |
|---|----------|---------|
| 1 | future-cashcow | 대표님의 미래먹거리 |
| 2 | robot-coworker | 로봇 동료와 코딩하는 법 |
| 3 | toss-reality | 편의점은 공짜인데 |
| 4 | agent-boss | 에이전트 보스 |
| 5 | innobiz-guide | 이노비즈 인증 |

---

## 6. 참조: 상세 분석 문서

각 영역의 상세 분석은 별도 문서로 분리:

| 문서 | 내용 |
|------|------|
| [ux-ia-analysis.md](./ux-ia-analysis.md) | UX/정보설계 — 카테고리, 페이징, TOC, 검색 |
| [visual-design-analysis.md](./visual-design-analysis.md) | 비주얼 디자인 — 카드, 타이포, 컬러, 시각요소 |
| [performance-analysis.md](./performance-analysis.md) | 성능 — 번들크기, 런타임, CWV, 캐싱 |
| [responsive-analysis.md](./responsive-analysis.md) | 반응형 — 브레이크포인트, 레이아웃, 폰트 |
| [a11y-seo-analysis.md](./a11y-seo-analysis.md) | 접근성/SEO — ARIA, 메타태그, 구조화데이터 |

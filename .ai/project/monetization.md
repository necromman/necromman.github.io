# 블로그 & 수익화 전략

## 배포: GitHub Pages (`editorial` 레포지토리)

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

## 수익화

- **Google AdSense**: 자체 사이트에 직접 광고 코드 삽입. 디자인과 조화되는 위치에 배치
- **유입 전략**: Tistory에 요약 버전 + 원본 링크로 네이버/다음 검색 유입 확보 (선택)
- 광고 삽입 시 에디토리얼 디자인을 해치지 않는 위치 선정 (글 하단, 시리즈 사이 등)

## TODO (블로그 구축)

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
- [x] OG 이미지 생성 (빌드 타임 자동 생성: satori + resvg)
- [ ] Google AdSense 신청 및 광고 코드 삽입
- [ ] 커스텀 도메인 연결 (선택)
- [ ] Tistory 요약 포스트 + 원본 링크 전략 (선택)

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

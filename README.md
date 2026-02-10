# Editorial

에디토리얼/매거진 스타일 블로그. 11ty(Eleventy)로 빌드하고 GitHub Pages로 배포한다.

- 배포 URL: https://necromman.github.io/
- main 브랜치에 push하면 GitHub Actions가 자동 빌드 + 배포

## 실행 방법

```bash
# 의존성 설치 (최초 1회)
npm install

# 로컬 개발 서버 (http://localhost:3000)
npm run dev

# 빌드만 (배포용, _site/ 폴더에 출력)
npm run build
```

## 프로젝트 구조

```
editorial/
├── index.html                     # 블로그 랜딩 페이지
├── content/                       # 콘텐츠 HTML (시리즈별 폴더)
│   ├── index.md                   # 콘텐츠 인덱스 (기록용)
│   ├── content.11tydata.js        # URL 보존용 permalink 설정
│   ├── wasted-life-series/        # 시리즈 1: 인생 낭비
│   ├── bithumb-60t-series/        # 시리즈 2: 딸깍 한 번의 60조 원
│   ├── dev-survival-series/       # 시리즈 3: AI 시대 개발자 생존
│   ├── vibe-coding-series/        # 시리즈 4: 바이브 코딩
│   ├── openclaw-series/           # 시리즈 5: OpenClaw 해부
│   ├── lineage-classic-series/    # 시리즈 6: 린저씨의 귀환
│   ├── claude-cowork-series/      # 시리즈 7: 딸깍이 소프트웨어를 죽인다고?
│   ├── vibe-design-series/        # 시리즈 8: 디자이너 없이 제품 만들기
│   ├── git-series/                # 시리즈 9: Git 생존기
│   ├── gitlab-migration-series/   # 시리즈 10: GitLab 이사
│   ├── server-infra-guide-series/ # 시리즈 11: 192.168.0.x의 규칙
│   ├── innobiz-guide-series/      # 시리즈 12: 이노비즈 인증
│   ├── sovereign-ai-novel-series/ # 시리즈 13: 소버린 배당일
│   ├── masterkey-series/          # 시리즈 14: 마스터키
│   ├── ai-withdrawal-series/      # 시리즈 15: AI 없는 48시간
│   └── illusion-of-knowing-series/# 시리즈 16: 안다는 착각
├── assets/
│   ├── editorial-base.css         # 공통 CSS 디자인 시스템
│   ├── index.css                  # 랜딩 페이지 전용 CSS
│   ├── content-data.js            # 랜딩 페이지 콘텐츠 데이터
│   ├── index-app.js               # 랜딩 페이지 렌더링/검색/정렬
│   ├── nav.js                     # 공통 네비게이션 헤더
│   ├── series-nav.js              # 시리즈 이전/다음 글 네비게이션
│   ├── theme-toggle.js            # 다크/라이트 테마 토글
│   └── fonts/                     # 셀프호스팅 웹폰트 (WOFF2)
├── _includes/layouts/
│   ├── article.njk                # 콘텐츠 페이지 레이아웃 (SEO 자동 생성)
│   └── landing.njk                # 랜딩 페이지 레이아웃
├── .eleventy.js                   # 11ty 설정
├── package.json                   # Node 의존성 + 스크립트
├── sitemap.xml
├── robots.txt
├── _site/                         # 빌드 결과물 (gitignored)
└── .github/workflows/deploy.yml   # GitHub Pages 자동 배포
```

## 콘텐츠 추가 방법

1. `content/[시리즈-슬러그]/[파일-슬러그].html` 생성
2. front matter 작성:
   ```yaml
   ---
   layout: layouts/article.njk
   pageTitle: "제목 (60자 이내)"
   description: "설명 (150자 이내)"
   datePublished: "YYYY-MM-DD"
   ---
   ```
3. `assets/content-data.js`에 데이터 추가
4. `assets/series-nav.js`에 시리즈 데이터 추가
5. `sitemap.xml`에 URL 추가
6. `content/index.md` 업데이트

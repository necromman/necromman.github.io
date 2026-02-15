# 시리즈 기획서: React가 뭐길래

> **시리즈 슬러그:** `why-react-series`
> **시리즈 번호:** Series 28
> **기획일:** 2026-02-15
> **상태:** 기획 완료 → 콘텐츠 제작 대기

---

## 1. 시리즈 컨셉

### 핵심 질문
"공공기관/대학에서 쓰는 상용 웹 플랫폼, 계속 써야 하나? React로 바꿔도 되는 건가?"

### 타겟 독자
- **1차 타겟**: 공공기관/대학교 IT 담당자 (비개발자, 의사결정권자)
- **2차 타겟**: 기술 스택 변경을 고민하는 중소 SI 업체 대표/PM
- **3차 타겟**: 상용 플랫폼 프로젝트에 투입된 주니어 개발자

### 시리즈 톤
- **어조**: 담당자에게 설명하는 선임 컨설턴트의 어조. 기술 용어 최소화, 비유와 숫자로 설명
- **핵심 메시지**: "겁먹지 마세요. React가 더 안전합니다."
- **금지**: 특정 업체명 직접 비교/비하 금지. 제품군 단위로만 언급 ("상용 웹 플랫폼", "국산 UI 솔루션")
- **참고**: `agent-is-three-configs.html` 스타일 — 구성도, 비교표, 판단 기준표 등 시각적 구조물 적극 활용

---

## 2. 자료조사 요약

### 2-1. 상용 웹 플랫폼 현황

**시장 규모 (추정)**
- 인스웨이브시스템즈(WebSquare): 매출 304억 원 (2024), 800+ 레퍼런스 사이트
- 투비소프트(Nexacro): 매출 249억 원 (2024), 7,000+ 레퍼런스 사이트
- 토마토시스템(eXBuilder): 직원 244명, 대학/공공/금융 확장 중
- 합산 시장규모: 약 500~600억 원 (프론트엔드 UI 솔루션만)
- 출처: FnGuide 기업정보, 인크루트/사람인 기업정보, ZDNet/전자신문 보도

**핵심 레퍼런스**
- 국세청 홈택스: WebSquare AI로 4,000개 화면 재구축 (2024-2025)
- 계명대학교 EDWARD 학사포털: Nexacro Platform
- 한양대학교 차세대 교내정보시스템: Nexacro 컨버전
- 금융감독원: Nexacro 전환

**개발자 커뮤니티 불만 (OKKY)**
- "QnA 참고자료가 너무 적다" — 레퍼런스 부족
- "간단한 그리드 외에 스크립트 지옥" — 복잡한 UI 구현 난이도
- "마이너 업데이트도 라이선스 재구매" — 높은 유지비용
- "과도기적 도구가 언제 없어지나" — 미래 불확실성
- "상용 플랫폼 중 압도적으로 구리다" — 개발자 경험 불만
- 출처: OKKY 커뮤니티 (okky.kr/articles/729484, 1511844, 566396)

### 2-2. React 생태계 데이터

**글로벌 채택률 (2025-2026)**
| 지표 | 수치 | 출처 |
|------|------|------|
| Stack Overflow 인기도 | 44.7% (2025, 개발자 49,000명 조사) | Stack Overflow Developer Survey 2025 |
| State of JS 사용률 | 81.1% (프론트엔드 프레임워크 1위) | State of JavaScript 2024 |
| GitHub Stars | 207,000~236,000+ | GitHub |
| npm 주간 다운로드 | 2,000만~3,900만 | npm Trends |
| 전 세계 웹사이트 사용 | 약 1,100만 사이트 | eSparkInfo |
| Fortune 500 채택률 | 80% | eSparkInfo |
| 자금 확보 스타트업 React 선택률 | 88.6% ($25.2B 중 $28.5B) | 산업 리포트 |

**한국 기업 채택 현황**
- 토스(비바리퍼블리카): React + TypeScript 핵심 스택, 사내 기술 발표 90건+
- 네이버: 내부 로그 시스템 등 React 활용, 고성능 윈도잉 그리드 개발
- 카카오엔터테인먼트: FE 기술 블로그 운영
- 우아한형제들(배달의민족), 당근마켓 등 주요 테크 기업
- 업계 컨센서스: "TypeScript + React가 기본 세트"
- 출처: 토스 기술 블로그 (toss.tech), 코드너리 (codenary.co.kr)

**한국 채용 시장**
- 잡코리아 "React" 검색: 1,123건 (2026.02 기준)
- Indeed Korea: 100건+
- 주니어 연봉: 3,800~6,000만 원 / 빅테크: 6,000~7,500만 원
- 4년차: 6,000~9,000만 원 / 7년차+: 1억 원 이상 가능
- 프리랜서 시장: React 비중 12%(2024) → 15%(2025 상반기)
- "JAVA와 React를 함께 요구하는 사례가 두드러지고 있다"
- 출처: 잡코리아, 그룹바이 연봉 분석, 위시켓 프리랜서 리포트

### 2-3. 공공 부문 디지털 전환 정책

**디지털플랫폼정부 추진**
- 2026 목표: 공공시스템 70%+ 클라우드 네이티브
- 2030 목표: 90% 전환
- 2025 예산: 430억 원 (9개 시스템 클라우드 네이티브 전환)
- 핵심 원칙: "표준화된 개방형 기술 사용" (행정기관 및 공공기관 정보시스템 구축운영 지침, 2025.1.2 시행)
- 출처: 행정안전부, 정책브리핑, ZDNet

**전자정부표준프레임워크**
- 현재 버전: v4.3 (2025.03)
- 공공 IT 프로젝트 채택률: 66.3% (2024)
- **v4.0(2022)부터 React + Spring Boot 공식 지원** — GitHub 템플릿 제공
- Vue.js 연동 매뉴얼도 제공
- "정부에 납품하는 신생 업체들이 프론트엔드에 React를 채택하는 경우가 늘어나 일부 정부 사이트에 React 도입이 실제로 늘어나는 효과"
- 출처: 나무위키 전자정부표준프레임워크, GitHub eGovFramework

**GS인증 장벽**
- GS인증은 버전별 재인증 필요 → 오픈소스의 빠른 버전 업데이트와 구조적 불일치
- "오픈소스 GS인증 요구는 사업하지 말란 소리" (디지털데일리 헤드라인)
- **우회 경로**: 전자정부표준프레임워크(React 지원) 사용 시 GS인증 대안으로 인정
- 출처: 디지털데일리, 국가법령정보센터

### 2-4. 마이그레이션 ROI 데이터

**비용 절감 (글로벌)**
- 레거시 유지보수: IT 예산의 60~80% 소모
- 현대화 후 운영비: 5년간 30~50% 절감 (IBM 연구)
- TCO 절감: 20~45%, 투자 회수 기간: 12~36개월
- 유지보수 비용: 현대화 후 12~18개월 내 30~40% 감소
- 개발 생산성: 40~60% 향상
- 장애 발생률: 70~90% 감소
- 시장 출시 속도: 2~3배 향상
- 출처: BayOne, Devox Software, IBM Modernization Research

**React 라이선스**
- MIT 라이선스: 상용, 수정, 배포 모두 $0
- 상용 플랫폼: 비공개 가격 + 버전 업그레이드 비용 (마이너 업데이트도 재구매)

### 2-5. 한국 SI 시장 세분화

| 세그먼트 | 지배적 기술 | 비고 |
|---------|-----------|------|
| 테크 스타트업 ("네카라쿠배당토") | React + TypeScript | 업계 표준 |
| 대기업 SI | Vue.js | 삼성SDS, 네이버 영향 |
| 레거시 공공 | jQuery + JSP | 전자정부표준프레임워크 내 |
| 기업용 UI 플랫폼 | WebSquare, Nexacro, eXBuilder | 금융, 대학, 레거시 공공 |

---

## 3. 시리즈 구성 (4편)

### 01. 이 화면을 만드는 데 얼마를 쓰고 있는가
- **슬러그**: `hidden-cost-of-licensed-platforms.html`
- **역할**: 문제 인식 — 상용 웹 플랫폼의 실체와 숨겨진 비용
- **태그**: 분석

**Part 구성:**

**Part I — 그 솔루션의 이름**
- 공공기관/대학 웹 시스템에 쓰이는 "상용 웹 플랫폼"이란 무엇인가
- 2000년대 ActiveX → HTML5 전환기에 탄생한 도구들
- 왜 도입했는가: 빠른 개발, 그리드 화면, SI 프로젝트 효율성
- 핵심 데이터: 국세청 홈택스 4,000개 화면, 7,000+ 레퍼런스 사이트

**Part II — 보이지 않는 비용**
- 라이선스 비용 구조: 도입비 + 마이너 업데이트 재구매 + 유지보수 계약
- 벤더 락인: 한 벤더에 묶이면 협상력 제로
- 비교 다이어그램: "상용 플랫폼의 비용 구조" vs "오픈소스의 비용 구조"
- 숨겨진 비용: 개발자 채용 난이도, 레퍼런스 부족, 커뮤니티 부재

**Part III — 개발자들은 알고 있다**
- OKKY 커뮤니티 실제 목소리 인용 (익명 처리)
- "QnA 참고자료가 너무 적다" / "스크립트 지옥" / "과도기적 도구"
- Stack Overflow 질문 수 비교: 상용 플랫폼 vs React (극단적 차이)
- IT 예산의 60~80%가 레거시 유지보수에 소모된다는 글로벌 데이터

**디자인 노트:**
- 비교 다이어그램(2컬럼): 상용 플랫폼 비용 구조 vs 오픈소스 비용 구조
- 경고 박스: "라이선스 비용만 보면 안 되는 이유 3가지"
- 풀 쿼트: 개발자 커뮤니티 목소리

---

### 02. React는 무료입니다
- **슬러그**: `react-is-free.html`
- **역할**: 교육 — 비개발자를 위한 React 설명
- **태그**: 해설

**Part 구성:**

**Part I — React는 프로그램이 아닙니다**
- 비개발자가 오해하는 것: "React를 설치하나요?" → 아니요
- React는 "웹 화면을 만드는 설계도 규칙"이다 (비유: 레고 블록)
- 상용 플랫폼은 "완성된 가구" / React는 "레고 블록 세트" — 더 자유롭지만 조립이 필요
- 도식: "상용 플랫폼의 구조" vs "React의 구조"

**Part II — 누가 만들었고, 누가 쓰는가**
- Meta(Facebook)가 만들고, MIT 라이선스로 공개 → 누구나 무료
- 전 세계 1,100만 사이트, Fortune 500의 80%
- 한국: 토스, 네이버, 카카오, 배달의민족, 당근마켓
- 비교표: "상용 플랫폼을 쓰는 곳" vs "React를 쓰는 곳"
- Stack Overflow 2025: 개발자 44.7%가 사용 (1위)

**Part III — 0원의 의미**
- MIT 라이선스: 상용/수정/배포 모두 무료
- 비교: 상용 플랫폼 도입비 + 업데이트비 + 유지보수비 vs React $0
- 진짜 비용은 개발 인력 → 그런데 React 개발자가 압도적으로 많다
- 잡코리아 "React" 1,123건 vs 상용 플랫폼 전문 개발자 구인난

**Part IV — 담당자가 ChatGPT에게 물어볼 수 있는 것**
- AI 시대의 새로운 이점: ChatGPT/Claude에게 React 코드를 물어볼 수 있다
- 상용 플랫폼은 폐쇄 생태계 → AI가 학습한 데이터가 거의 없다
- React는 공개 생태계 → AI가 수억 줄의 코드를 학습했다
- "담당자도 ChatGPT는 쓸 거 아니냐" — React 생태계는 AI와 궁합이 맞는다

**디자인 노트:**
- 에이전트 기획서 스타일 등식 다이어그램: "React = 레고 블록"
- 3컬럼 카드: "누가 만들었나" / "얼마인가" / "누가 쓰나"
- 비교 다이어그램(2컬럼): 상용 플랫폼 생태계 vs React 생태계
- 판단 기준표: AI에게 물어볼 수 있는 것 vs 없는 것

---

### 03. 개발자 1,000명 vs 개발자 10명
- **슬러그**: `thousand-vs-ten-developers.html`
- **역할**: 근거 — 개발자 풀, 생태계, 미래 안전성
- **태그**: 분석

**Part 구성:**

**Part I — 채용 공고의 현실**
- React 채용 공고: 잡코리아 1,123건 vs 상용 플랫폼 전문가: 소수
- React 주니어 연봉: 3,800~6,000만 원 (풍부한 공급)
- 상용 플랫폼 5년차+: 높은 단가, 낮은 공급, 프로젝트 의존
- 비유: "React는 고속도로, 상용 플랫폼은 비포장 국도" — 어디에 인프라가 더 많은가

**Part II — 레퍼런스의 격차**
- Stack Overflow: React 400,000+ 질문 vs 상용 플랫폼 수십 건
- npm 생태계: 주간 2,000만~3,900만 다운로드
- GitHub Stars: 207,000~236,000+
- 커뮤니티: GitHub Issues, Discord, Reddit, 한국 개발자 커뮤니티
- vs 상용 플랫폼: 벤더 QnA 게시판(유료 지원), OKKY 소수 글

**Part III — 5년 후를 생각하면**
- 상용 플랫폼 벤더의 규모: 직원 200~300명 내외의 중소기업
- React 뒤의 조직: Meta + 전 세계 오픈소스 커뮤니티
- 벤더 의존 리스크: 벤더가 사업을 접으면? 인수합병되면?
- React는 MIT 라이선스 → 벤더 리스크 제로
- 정부 정책 방향: "표준화된 개방형 기술" 원칙 (2025년 지침)

**Part IV — 기술 부채라는 시한폭탄**
- 레거시 유지보수: IT 예산의 60~80% (글로벌 평균)
- 현대화 후: 30~50% 비용 절감, 12~36개월 투자 회수
- 개발 생산성: 40~60% 향상
- 시장 출시 속도: 2~3배
- 비유: "낡은 건물 유지보수비가 신축보다 비싸지는 순간"

**디자인 노트:**
- 대비형 숫자 카드: "1,123 vs ?" (채용 공고), "400,000+ vs ~50" (SO 질문)
- 아키텍처 다이어그램: 5년 후 시나리오 비교
- 경고 박스: "벤더 의존이 위험한 이유 3가지"

---

### 04. 바꿔도 됩니다
- **슬러그**: `you-can-switch.html`
- **역할**: 실행 — 전환 안전성 근거 + 담당자용 체크리스트
- **태그**: 가이드

**Part 구성:**

**Part I — 정부가 이미 허락했다**
- 전자정부표준프레임워크 v4.0(2022)부터 React 공식 지원
- 공공 IT 프로젝트 66.3%가 전자정부표준프레임워크 사용
- GitHub에 React 템플릿까지 제공 (egovframe-template-simple-react)
- 디지털플랫폼정부: 2030년까지 90% 클라우드 네이티브 전환
- "개방형 기술 사용 원칙" — 행정안전부 고시

**Part II — GS인증이 없어도 괜찮은 이유**
- GS인증의 구조적 한계: 오픈소스와 근본적 불일치
- 전자정부표준프레임워크 = GS인증의 대안 경로
- React + 전자정부표준프레임워크 조합 = 공공 프로젝트 진입 가능
- 실제로 정부 사이트에 React 도입이 늘어나는 추세

**Part III — 전환은 한 번에 하지 않는다**
- 빅뱅 전환 vs 점진적 전환(Strangler Fig 패턴)
- 현실적 전환 전략: 신규 화면만 React, 기존 화면은 유지
- 마이그레이션 기간: 중규모 시스템 4~7개월 (AI 활용 시)
- ROI 데이터: 12~18개월 내 유지보수 비용 30~40% 감소

**Part IV — 전환 전에 물어봐야 할 다섯 가지**
1. 현재 시스템의 연간 라이선스/유지보수 비용은 얼마인가?
2. 상용 플랫폼 전문 개발자를 3개월 안에 구할 수 있는가?
3. 현재 벤더가 사업을 접으면 어떻게 되는가?
4. 전자정부표준프레임워크를 사용하고 있는가?
5. 5년 후에도 같은 기술을 쓸 자신이 있는가?

**Part V — 담당자를 위한 한 줄 요약**
- "React는 전 세계 개발자의 44.7%가 사용하는, MIT 라이선스(무료) 기술이며, 대한민국 전자정부표준프레임워크가 공식 지원합니다. 바꿔도 됩니다."

**디자인 노트:**
- 아키텍처 다이어그램: 점진적 전환 전략 (기존 시스템 → 점진적 React 도입)
- 체크리스트 카드: 5가지 질문
- 풀 쿼트: "바꿔도 됩니다"
- 클로징: 한 줄 요약 강조

---

## 4. 디자인 노트

### 시리즈 고유 컴포넌트
- **비교 다이어그램 (dia-cmp)**: 상용 플랫폼 vs React 2컬럼 비교 (agent-is-three-configs 스타일)
- **숫자 대비 카드**: 큰 숫자로 격차를 시각화 (예: "1,123 vs ?")
- **판단 기준표 (criteria-list)**: 전환 결정 체크리스트
- **3컬럼 카드 (config-cards)**: 핵심 개념 3개 병렬 배치
- **경고 박스 (warning-box)**: "흔한 오해 3가지" 등
- **아키텍처 다이어그램 (arch-diagram)**: 전환 전략 시각화
- **풀 쿼트 (pull-quote)**: 핵심 메시지 강조

### editorial-base.css 확장 필요사항
- 기존 컴포넌트로 충분. 추가 CSS 필요 없음
- 각 페이지 `<style>` 태그에 페이지 고유 컴포넌트만 정의 (agent-is-three-configs 패턴 따름)

### 톤/스타일 주의사항
- **특정 제품명 직접 언급 최소화**: "상용 웹 플랫폼", "국산 UI 솔루션", "기존 시스템" 등 일반 용어 사용
- 개발자 커뮤니티 인용 시 제품명은 "○○○" 등으로 마스킹하거나 "상용 플랫폼"으로 치환
- **비유 중심**: 기술 용어 대신 비유로 설명 (레고 블록, 고속도로 vs 비포장 국도, 건물 유지보수)
- **숫자 중심**: 주장마다 데이터 근거 필수

---

## 5. 제작 순서

- [ ] 01편 `hidden-cost-of-licensed-platforms.html` 제작
- [ ] 02편 `react-is-free.html` 제작
- [ ] 03편 `thousand-vs-ten-developers.html` 제작
- [ ] 04편 `you-can-switch.html` 제작
- [ ] `series-nav.js` SERIES 데이터 추가
- [ ] `assets/content-data.js` 시리즈/글 데이터 추가
- [ ] `content/index.md` 업데이트
- [ ] `sitemap.xml` URL 추가
- [ ] `CLAUDE.md` 콘텐츠 관리 섹션 업데이트
- [ ] `npx eleventy` 빌드 확인

---

## 6. 참고 자료 (출처)

### 상용 플랫폼 시장
- [ZDNet: 인스웨이브 홈택스 고도화 1단계 완수](https://zdnet.co.kr/view/?no=20250120105611)
- [전자신문: 인스웨이브 국세청 홈택스 고도화](https://www.etnews.com/20250120000080)
- [데이터넷: 인스웨이브 10년 이상 기술력](https://www.datanet.co.kr/news/articleView.html?idxno=132603)
- [한국경제: 투비소프트 3년만에 흑자전환](https://plus.hankyung.com/apps/newsinside.view?aid=202403217317O)
- [NSP통신: 투비소프트 계명대 EDWARD 시스템](https://www.nspna.com/news/?mode=view&newsid=172022)
- [ZDNet: 토마토시스템 대학 전산인들 호평](https://zdnet.co.kr/view/?no=20190709075718)
- [전자신문: 엑스빌더6 전자정부 표준프레임 호환](https://www.etnews.com/20230719000158)

### 개발자 불만/커뮤니티
- [OKKY: 웹스퀘어 쓰는 플젝 왔는데 고통스럽네요](https://okky.kr/articles/729484)
- [OKKY: 주니어들이 이해 못하는 넥사크로/웹스퀘어가 매력적인 이유](https://okky.kr/articles/1511844)
- [OKKY: 과도기적인 툴은 언제 없어질까요](https://okky.kr/article/566396)
- [OKKY: nexacro와 websquare의 차이점](https://okky.kr/articles/634490)

### React 통계
- [Stack Overflow Developer Survey 2025](https://survey.stackoverflow.co/2025/)
- [State of JavaScript 2024](https://2024.stateofjs.com/en-US)
- [eSparkInfo: 45+ React Statistics 2026](https://www.esparkinfo.com/software-development/technologies/reactjs/statistics)
- [W3Techs: React Usage Statistics February 2026](https://w3techs.com/technologies/details/js-react)
- [GitHub Front-end Framework Popularity](https://gist.github.com/tkrotoff/b1caa4c3a185629299ec234d2314e190)

### 한국 React 시장
- [토스 프론트엔드 챕터](https://toss.tech/article/toss-frontend-chapter)
- [코드너리 ReactJS 기업 목록](https://www.codenary.co.kr/techstack/detail/reactjs)
- [잡코리아 React 채용공고](https://www.jobkorea.co.kr/Search/?stext=react)
- [그룹바이: 2025 개발자 연차별 연봉](https://groupby.careers/)
- [위시켓: 2025 프리랜서 개발자 시장 리포트](https://blog.wishket.com/blog/freelance-developer-market-trend-2025)

### 공공 디지털 전환
- [행정안전부: 정보시스템 구축운영 지침 2025-01호](https://www.mois.go.kr/frt/bbs/type001/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000016&nttId=114850)
- [정책브리핑: 2030 클라우드 전환](https://www.korea.kr/news/policyNewsView.do?newsId=148921766)
- [ZDNet: 행안부 클라우드 네이티브 전환 성과](https://zdnet.co.kr/view/?no=20251223154641)
- [나무위키: 전자정부표준프레임워크](https://namu.wiki/w/%EC%A0%84%EC%9E%90%EC%A0%95%EB%B6%80%ED%91%9C%EC%A4%80%ED%94%84%EB%A0%88%EC%9E%84%EC%9B%8C%ED%81%AC)
- [GitHub: eGovFramework React Template](https://github.com/eGovFramework/egovframe-template-simple-react)
- [디지털데일리: 오픈소스 GS인증 요구는 사업하지 말란 소리](https://m.ddaily.co.kr/page/view/2007082116220253573)

### 마이그레이션 ROI
- [BayOne: Business Case for Legacy Modernization 2026](https://bayone.com/business-case-for-legacy-application-modernization-2025/)
- [Devox: Legacy Modernization ROI Guide](https://devoxsoftware.com/blog/legacy-modernization-roi-a-cost-focused-guide/)
- [RecordPoint: Hidden Costs of Legacy Systems](https://www.recordpoint.com/blog/maintaining-legacy-systems-costs)

### 기술 비교
- [React 공식: Accessibility](https://legacy.reactjs.org/docs/accessibility.html)
- [React Aria: Accessibility](https://react-spectrum.adobe.com/react-aria/accessibility.html)
- [Sencha: Enterprise UI Framework Benchmark 2026](https://www.sencha.com/blog/react-angular-or-ext-js-benchmarking-enterprise-ui-frameworks-for-2026/)

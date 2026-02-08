# 시리즈 기획서: 딸깍이 소프트웨어를 죽인다고? — Claude Cowork와 SaaSpocalypse

> **시리즈 슬러그:** `claude-cowork-series`
> **시리즈 번호:** Series 07
> **기획일:** 2026-02-09
> **상태:** 기획 완료 → 콘텐츠 제작 대기

---

## 1. 시리즈 컨셉

### 핵심 질문
> Anthropic의 Claude Cowork 출시 후 글로벌 소프트웨어 주식 시가총액 1조 달러가 증발했다. AI 에이전트가 정말 기존 소프트웨어를 대체하는 것인가, 아니면 시장의 과잉 공포인가?

### 타겟 독자
- IT/SW 업계 종사자 (개발자, PM, 기획자)
- 주식/투자에 관심 있는 일반 직장인
- "AI가 내 직업을 대체할까" 불안한 사무직 종사자
- SaaS 서비스를 사용하는 기업 의사결정자

### 시리즈 톤
- **1편**: 뉴스 르포 — "무슨 일이 벌어졌는가" (사건 재구성)
- **2편**: 데이터 분석 — "진짜 대체되는가" (팩트 기반 검증)
- **3편**: 투자/생존 전략 — "그래서 어떻게 해야 하는가" (실행 매뉴얼)
- **4편**: 전망 — "소프트웨어의 다음 형태" (미래 시나리오)

---

## 2. 자료조사 요약

### 2-1. Claude Cowork — 무엇인가

| 항목 | 내용 | 출처 |
|------|------|------|
| 출시일 | 2026년 1월 12일 (리서치 프리뷰) | [Claude 공식 블로그](https://claude.com/blog/cowork-research-preview) |
| 11개 플러그인 | 1월 30일 추가 — 법률, 재무, 마케팅, 고객지원, 영업, 데이터, PM, 생물학 연구 등 | [TechCrunch](https://techcrunch.com/2026/01/30/anthropic-brings-agentic-plugins-to-cowork/) |
| 핵심 차별점 | 로컬 폴더 접근 → 파일 읽기/편집/생성을 자율적으로 수행. "Claude Code for the rest of your work" | [TIME](https://time.com/7346545/ai-claude-cowork-code-chatbots/) |
| 가격 | Pro $20/월, Max $100~200/월, Team/Enterprise 커스텀 | [Claude Pricing](https://claude.com/pricing) |
| 플랫폼 | macOS 전용 (Claude Desktop 앱 필요) | [Engadget](https://www.engadget.com/ai/anthropic-opens-up-its-claude-cowork-feature-to-anyone-with-a-20-subscription-194000021.html) |
| 기존 챗봇과 차이 | 채팅 → 자율 에이전트. 질문에 답하는 게 아니라 파일을 직접 만들고 편집 | [Simon Willison](https://simonw.substack.com/p/first-impressions-of-claude-cowork) |

### 2-2. SaaSpocalypse — 시장 충격

| 날짜 | 사건 | 출처 |
|------|------|------|
| 1월 30일 | Anthropic, 11개 플러그인 출시 → 법률 플러그인이 기폭제 | [GitHub](https://github.com/anthropics/knowledge-work-plugins) |
| 2월 3일(월) | **하루 만에 $285B(약 413조 원) 시가총액 증발**. "SaaSpocalypse" 명명 (제프리스 Jeffrey Favuzza) | [Bloomberg](https://www.bloomberg.com/news/articles/2026-02-04/what-s-behind-the-saaspocalypse-plunge-in-software-stocks) |
| 2월 4일(화) | S&P 500 소프트웨어 지수 -4.6%. 유럽 소프트웨어 지수 -5%+ | [CNBC](https://www.cnbc.com/2026/02/04/software-stocks-plunge-us-ai-disruption.html) |
| 2월 5일(수) | OpenAI, "Frontier" (시맨틱 OS) 출시 → 공포 가중. Anthropic Opus 4.6 업데이트 | [Fortune](https://fortune.com/2026/02/05/openai-frontier-ai-agent-platform-enterprises-challenges-saas-salesforce-workday/) |
| 2월 6일(목) | 누적 ~$1T(약 1,450조 원) 증발. 애틀라시안 23% 매출 성장에도 -6% | [Yahoo Finance](https://finance.yahoo.com/news/us-software-stocks-stabilize-bruising-121536263.html) |

**개별 기업 주가 하락:**

| 기업 | 단일일 하락폭 | 비고 |
|------|-------------|------|
| 가트너 (Gartner) | -31% | 리서치/분석, 가이던스도 부진 |
| 리갈줌 (LegalZoom) | -20% | 법률 플러그인 직격탄 |
| 톰슨 로이터 (Thomson Reuters) | -15.8% | 사상 최대 단일일 하락 |
| RELX (렉시스넥시스) | -14% | 법률/데이터 분석 |
| 인튜잇 (Intuit/TurboTax) | -11% | 세무/회계 소프트웨어 |
| 서비스나우 (ServiceNow) | -7% | YTD -28%, ATH $239 → ~$109 |
| 세일즈포스 (Salesforce) | -6~7% | CRM, YTD -26% |
| 애틀라시안 (Atlassian) | -6% | 23% 매출 성장에도 하락, YTD -35% |
| 어도비 (Adobe) | -4.6% | 크리에이티브/문서 |
| 마이크로소프트 (Microsoft) | -3.7% | 광범위한 기술주 하락 |

**글로벌 파급:**
- 인도 Nifty IT 지수 -7%+, ~2조 루피(약 $24B) 증발 — 인포시스 -7.2%, TCS -5.6% ([The Week](https://www.theweek.in/news/biz-tech/2026/02/04/explained-anthropics-new-ai-tool-that-has-caused-shares-of-tcs-infosys-and-wipro-to-crash.html))
- 유럽 Stoxx 소프트웨어 지수 -5%+, 카지미니 -9.2%

**한국 주식 시장:**

| 기업 | 하락폭 | 카테고리 |
|------|--------|----------|
| 더존비즈온 | -14.0% | ERP/비즈니스 소프트웨어 |
| 현대오토에버 | -15.5% | 자동차 IT/SI |
| 한글과컴퓨터 | -11.0% | 오피스/문서 |
| 안랩 | -7.7% | 사이버보안 |
| 삼성SDS | -4.4% | 시스템 통합 |

출처: [디지털투데이](https://www.digitaltoday.co.kr/news/articleView.html?idxno=627972), [머니투데이](https://www.mt.co.kr/world/2026/02/04/2026020414521696794)

### 2-3. "소프트웨어는 죽었다" — 찬성론 (Bull Case)

| 주장 | 근거 | 출처 |
|------|------|------|
| **나델라**: "SaaS는 죽었다" | BG2 팟캐스트 (2024.12). "비즈니스 앱은 CRUD DB + 비즈니스 로직. 비즈니스 로직이 AI 에이전트로 이동" | [Windows Gadget Hacks](https://windows.gadgethacks.com/news/microsoft-ceo-nadella-saas-is-dead-ai-agents-take-over/) |
| **아모데이**: "6~12개월 내 대체" | 다보스 2026. AI가 소프트웨어 엔지니어 업무의 "대부분, 아마 전부"를 수행 | [Entrepreneur](https://www.entrepreneur.com/business-news/ai-ceo-says-software-engineers-could-be-replaced-in-months/502087) |
| **골드만삭스**: $780B 시장 | 2030년까지 소프트웨어 시장 $780B, AI 에이전트가 60%+ 점유 | [Goldman Sachs](https://www.goldmansachs.com/insights/articles/ai-agents-to-boost-productivity-and-size-of-software-market) |
| **가트너**: 40% 앱에 에이전트 | 2026년 말까지 기업 앱의 40%에 AI 에이전트 탑재 (2025년 <5%) | [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025) |
| **맥킨지**: $2.6T~$4.4T | 생성형 AI가 추가 가치 $2.6조~$4.4조 창출 가능 | [McKinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) |
| **Per-seat 모델 붕괴** | AI 에이전트 1개가 직원 5명분 업무 → 인원당 과금 모델 붕괴. 가트너: 2026년 기업 SaaS 40%가 성과 기반 요금제 도입 | [Getmonetizely](https://www.getmonetizely.com/blogs/the-2026-guide-to-saas-ai-and-agentic-pricing-models) |

### 2-4. "소프트웨어는 안 죽는다" — 반대론 (Bear Case)

| 주장 | 근거 | 출처 |
|------|------|------|
| **젠슨 황**: "가장 비논리적" | Cisco AI Summit (2026.02). "AI가 소프트웨어를 대체한다는 건 세상에서 가장 비논리적. AI는 도구를 '사용'하지, 새로 만들지 않는다" | [Yahoo Finance](https://finance.yahoo.com/news/nvidia-boss-jensen-huang-says-164113817.html) |
| **웨드부시 댄 아이브스**: "아마겟돈은 과장" | "이 매도 규모는 도저히 이해할 수 없다. 현실과 거리가 먼 아마겟돈 시나리오를 반영" | [CNBC](https://www.cnbc.com/2026/02/05/dan-ives-names-5-stocks-to-buy-amid-software-armageddon.html) |
| **JPMorgan 마크 머피** | "LLM 플러그인 하나가 모든 미션 크리티컬 기업 소프트웨어를 대체한다는 건 비논리적 비약" | [Bloomberg](https://www.bloomberg.com/news/articles/2026-02-04/software-stocks-are-now-sentenced-before-trial-jpmorgan-says) |
| **AI 보안 위기** | 88% 조직이 AI 에이전트 보안 사고 경험. 14.4%만 완전한 보안/IT 승인 하에 배포 | [Gravitee](https://www.gravitee.io/blog/state-of-ai-agent-security-2026-report-when-adoption-outpaces-control) |
| **프로젝트 실패율** | AI 프로젝트 80%+ 실패. 가트너: 2027년까지 에이전틱 AI 프로젝트 40%+ 취소 | [Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027) |
| **클라르나 역전** | 700명분 업무 대체 성공 → 5개월 후 사람 재고용. 고객 불만, 공감 부재 | [Entrepreneur](https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396) |
| **인큠번트 반격** | ServiceNow, Moveworks $2.85B 인수. Salesforce Agentforce 출시. 인큠번트들이 AI를 흡수 | [Bain](https://www.bain.com/insights/will-agentic-ai-disrupt-saas-technology-report-2025/) |
| **애틀라시안 CEO** | "AI는 애틀라시안에 좋다. 소프트웨어가 죽었다고? 그건 소음이 신호를 압도한 것" — 23% 매출 성장 중 | [TS2 Tech](https://ts2.tech/en/atlassian-stock-slides-after-q2-results-as-ceo-rejects-software-is-dead-ai-fears/) |

### 2-5. 취약 카테고리 순위

| 순위 | 카테고리 | 취약도 | 근거 |
|------|----------|--------|------|
| 1 | **법률 테크** | 최고 | 문서 중심, 규칙 기반. 리갈줌 -20%, 톰슨로이터 -15.8%. Harvey AI 밸류에이션 $8B |
| 2 | **고객 서비스** | 높음 | 클라르나 700명 대체 사례. 단 역전도 발생 |
| 3 | **재무 분석** | 높음 | 패턴 인식, 리포트 생성에 최적. 규제 의무가 바닥을 형성 |
| 4 | **데이터 분석** | 중간 | Tableau/Power BI가 AI 통합 중. 엔터프라이즈 데이터 통합이 해자 |
| 5 | **프로젝트 관리** | 낮음 | 협업 중심. Asana/Monday.com이 AI를 내장하며 적응 |

### 2-6. 한국 맥락

| 항목 | 데이터 | 출처 |
|------|--------|------|
| 한국 SW주 하락 | 더존비즈온 -14%, 한컴 -11%, 안랩 -7.7% | [디지털투데이](https://www.digitaltoday.co.kr/news/articleView.html?idxno=627972) |
| 한국 미디어 프레이밍 | "클로드 쇼크", "413조 증발 공포", "SW 종말 포모" | [뉴스클레임](https://www.newsclaim.co.kr/news/articleView.html?idxno=3054900) |
| 삼성SDS AI 전략 | CES 2026에서 AI 에이전트 기반 AX 선언. FabriX 플랫폼, AI로 공무원 일일 업무 5시간 20분 단축 | [서울경제](https://www.sedaily.com/NewsView/2K77ZQANC9) |
| 한국 개발자 수 | 266만 명 돌파, 역대 최대 증가폭 | [다음](https://v.daum.net/v/20260130161801788) |
| VC 전략 수정 | "관련 정책과 VC 전략의 근본적 수정 불가피" | [뉴스1](https://www.news1.kr/industry/sb-founded/6063335) |
| SaaS 독립 전략 | 네이버, 카카오, 쿠팡 등 외부 SaaS 의존에서 내부 개발로 전환 가속 | [인사이트코리아](https://www.insightkorea.co.kr/news/articleView.html?idxno=239799) |

### 2-7. 타임라인 — 전문가 합의

| 연도 | 마일스톤 | 출처 |
|------|----------|------|
| 2025 | 실험 단계. AI 어시스턴트가 대부분의 앱에 탑재. 에이전트 탑재 앱 <5% | Gartner |
| 2026 | **결정적 변곡점**. 기업 앱 40%에 에이전트. 대규모 배포 시작 | Gartner |
| 2027 | 협력형 에이전트 등장. 단, 에이전틱 AI 프로젝트 40%+ 취소 | Gartner |
| 2028 | 크로스플랫폼 에이전트 생태계. 금융업 에이전트 연간 가치 $450B | McKinsey |
| 2029 | 지식 노동자 절반이 에이전트를 직접 생성/관리/배포 | Gartner |
| 2030 | 전통 SaaS = "2030년대의 메인프레임" (MS Charles Lamanna) | [The New Stack](https://thenewstack.io/microsoft-ai-business-agents-will-kill-saas-by-2030/) |
| 2035 | 에이전틱 AI, 기업 소프트웨어 매출의 ~30% ($450B+) | Gartner |

---

## 3. 시리즈 구성 (4편)

### 3-1. 1편: 7일 만에 1조 달러가 증발했다

> **슬러그:** `saaspocalypse-what-happened`
> **역할:** 사건 재구성 — 뉴스 르포 스타일
> **태그:** 사건분석
> **검색 키워드:** Claude Cowork, SaaSpocalypse, 소프트웨어 주가 폭락, 413조 증발

**Part 구성:**

| Part | 제목 | 핵심 내용 |
|------|------|-----------|
| 1 | 월요일, 413조 원이 사라졌다 | 2월 3일 사건 재구성. "get me out" 스타일 매도. $285B 하루 증발 |
| 2 | Claude Cowork — 챗봇이 에이전트가 되다 | Cowork의 정체: 로컬 파일 접근, 11개 플러그인, 법률 플러그인이 기폭제 |
| 3 | 주가 폭락의 지도 | 기업별 하락폭 시각화. 가트너 -31%, 리갈줌 -20%, 톰슨로이터 -15.8%. 인도/유럽/한국 파급 |
| 4 | OpenAI도 가세하다 | 2월 5일 Frontier(시맨틱 OS) 출시. "세일즈포스를 데이터 사일로로 취급" |
| 5 | 한국의 413조 | 더존비즈온 -14%, 한컴 -11%, "클로드 쇼크" 미디어 프레이밍 |

**핵심 인용:**
- JPMorgan 토비 오그: "유죄 추정을 넘어 재판 전에 선고를 받고 있다"
- Bloomberg: "'get me out' 스타일 매도"

---

### 3-2. 2편: 소프트웨어는 정말 죽는가

> **슬러그:** `is-software-really-dead`
> **역할:** 팩트 기반 검증 — 찬반 데이터 대결
> **태그:** 팩트분석
> **검색 키워드:** SaaS 종말, AI 에이전트 소프트웨어 대체, 젠슨 황 반박, AI 프로젝트 실패율

**Part 구성:**

| Part | 제목 | 핵심 내용 |
|------|------|-----------|
| 1 | "SaaS는 죽었다" — CEO들의 선언 | 나델라, 아모데이의 발언. 골드만삭스/가트너 예측 데이터 |
| 2 | 진짜 대체되고 있는 영역 | 법률, 고객서비스, 재무 — 카테고리별 취약도 분석. 클라르나 700명 대체 사례 |
| 3 | "가장 비논리적" — 반대 진영의 데이터 | 젠슨 황, 웨드부시, JPMorgan의 반박. AI 프로젝트 80%+ 실패율. 보안 사고 88% |
| 4 | 클라르나의 교훈 — 대체와 역전 사이 | 700명 대체 성공 → 5개월 만에 재고용. AI의 한계와 인간의 가치 |
| 5 | 인큠번트의 반격 | ServiceNow+Moveworks $2.85B 인수, Salesforce Agentforce, Atlassian 23% 성장 |
| 6 | 팩트 체크 스코어보드 | 찬성 vs 반대 주장별 근거 수준 비교표 |

**핵심 인용:**
- 젠슨 황: "AI가 소프트웨어를 대체한다는 건 세상에서 가장 비논리적"
- 웨드부시 댄 아이브스: "현실과 거리가 먼 아마겟돈 시나리오를 반영"
- 애틀라시안 CEO: "소음이 신호를 압도"

---

### 3-3. 3편: 소프트웨어 생존 플레이북

> **슬러그:** `software-survival-playbook`
> **역할:** 실행 매뉴얼 — 직군별 대응 전략
> **태그:** 실전가이드
> **검색 키워드:** AI 시대 소프트웨어 전략, SaaS 기업 생존, 개발자 대응, AI 에이전트 활용법

**Part 구성:**

| Part | 제목 | 핵심 내용 |
|------|------|-----------|
| 1 | SaaS 기업이 살아남는 법 | 데이터 해자 전략, Per-seat → 성과 기반 전환, AI를 흡수하는 인큠번트 전략 |
| 2 | 개발자가 살아남는 법 | AI가 대체하기 어려운 영역 (아키텍처, 보안, 인프라), "에이전트 오케스트레이터" 역할 |
| 3 | 사무직이 살아남는 법 | Cowork를 위협이 아닌 도구로 — 실전 활용 시나리오. $20/월로 5배 생산성 |
| 4 | 한국 기업의 선택지 | 삼성SDS AX 전략, 네이버/카카오의 SaaS 독립, VC 전략 수정 |
| 5 | 투자자의 체크리스트 | 데이터 해자, AI 통합 속도, 고객 전환 비용 — 살아남을 기업 vs 사라질 기업 감별 |

**핵심 데이터:**
- Bain: "데이터를 소유하고, 표준을 주도하고, 성과 기반으로 과금하라"
- Gartner: 2026년 기업 SaaS 40%가 성과 기반 요금제 도입
- McKinsey: 미국 업무 시간의 57%가 자동화 가능 (AI 44%, 로봇 13%)

---

### 3-4. 4편: 2030년, 소프트웨어의 다음 형태

> **슬러그:** `future-of-software-2030`
> **역할:** 전망 — 미래 시나리오와 결론
> **태그:** 전망
> **검색 키워드:** 에이전틱 AI 미래, 소프트웨어 2030, AI 에이전트 타임라인, SaaS 미래

**Part 구성:**

| Part | 제목 | 핵심 내용 |
|------|------|-----------|
| 1 | 4가지 시나리오 | Bain의 프레임워크 — "AI가 SaaS를 빛나게 하는가" vs "잡아먹는가". 낙관-비관 축 |
| 2 | 2026~2030 타임라인 | 가트너 5단계 진화: 어시스턴트 → 에이전트 → 협력 에이전트 → 생태계 → 뉴노멀 |
| 3 | "2030년대의 메인프레임" | MS Charles Lamanna의 경고. 전통 SaaS가 메인프레임처럼 남아 돌아가지만 화석이 되는 미래 |
| 4 | 소프트웨어는 죽지 않는다, 변태한다 | 결론: 대체가 아니라 형태 변환. 패키지 → SaaS → 에이전트 플랫폼. 역사적 패턴 |
| 5 | 한국, 준비되었는가 | 266만 개발자, AI 에이전트 확산 원년. 준비된 기업 vs 당하는 기업 |

**핵심 인용:**
- MS Lamanna: "전통 비즈니스 앱은 2030년대의 메인프레임이 될 것"
- Bain: "3년 내에 많은 루틴 디지털 작업이 '사람+앱'에서 'AI 에이전트+API'로 이동"
- 가트너: 2035년, 에이전틱 AI가 기업 소프트웨어 매출의 ~30% ($450B+)

---

## 4. 디자인 노트

### 시리즈 고유 컴포넌트

1. **주가 하락 테이블**: 기업명 / 하락폭(%) / 카테고리를 한눈에 보여주는 데이터 테이블. 하락폭에 따라 색상 그라디언트 (진한 빨강 → 연한 빨강)
2. **타임라인 비주얼**: 2025→2035 가로 타임라인. 각 연도에 마일스톤 레이블
3. **찬반 대결 레이아웃**: 2컬럼으로 "찬성(죽는다)" vs "반대(안 죽는다)" 대비. Pull-quote 활용
4. **취약도 게이지**: 카테고리별 취약도를 5단계 게이지로 시각화
5. **한국 데이터 카드**: 한국 기업 주가 하락, 한국 기업 대응 전략을 별도 카드로 강조

### editorial-base.css 확장 필요사항
- 기존 `.mechanism-row` 레이아웃을 찬반 대결에 활용 가능
- 주가 테이블은 `.prose table` + 커스텀 셀 배경색으로 구현
- 타임라인은 페이지 고유 CSS로 구현 (flexbox/grid 기반 가로 스크롤)

---

## 5. 제작 순서

- [ ] 1편 `saaspocalypse-what-happened.html` 제작
- [ ] 2편 `is-software-really-dead.html` 제작
- [ ] 3편 `software-survival-playbook.html` 제작
- [ ] 4편 `future-of-software-2030.html` 제작
- [ ] `series-nav.js` SERIES 데이터 추가
- [ ] `assets/content-data.js` 시리즈/글 데이터 추가
- [ ] `content/index.md` 업데이트
- [ ] `CLAUDE.md` 콘텐츠 관리 섹션 업데이트
- [ ] 전체 시리즈 크로스 리뷰 (링크, 시리즈 네비, SEO)

---

## 6. 참고 자료 (출처)

### 공식 발표 / 제품
- [Claude 공식 블로그 — Introducing Cowork](https://claude.com/blog/cowork-research-preview)
- [Anthropic — Knowledge Work Plugins (GitHub)](https://github.com/anthropics/knowledge-work-plugins)
- [OpenAI — Introducing Frontier](https://openai.com/index/introducing-openai-frontier/)
- [Claude Pricing](https://claude.com/pricing)

### 시장 충격 / 주가
- [Bloomberg — What's Behind the 'SaaSpocalypse'](https://www.bloomberg.com/news/articles/2026-02-04/what-s-behind-the-saaspocalypse-plunge-in-software-stocks)
- [CNBC — AI fears pummel software stocks](https://www.cnbc.com/2026/02/06/ai-anthropic-tools-saas-software-stocks-selloff.html)
- [CNBC — Global software stocks extend losses](https://www.cnbc.com/2026/02/04/software-stocks-plunge-us-ai-disruption.html)
- [Yahoo Finance — $1 trillion lost in week](https://finance.yahoo.com/news/us-software-stocks-stabilize-bruising-121536263.html)
- [Fortune — Anthropic Claude triggered trillion-dollar selloff](https://fortune.com/2026/02/06/anthropic-claude-opus-4-6-stock-selloff-new-upgrade/)
- [Invezz — Why software stocks are crashing](https://invezz.com/news/2026/02/04/heres-why-software-stocks-like-adobe-salesforce-servicenow-atlassian-are-crashing/)
- [The Motley Fool — Why Gartner Stock Fell 31%](https://www.fool.com/investing/2026/02/03/why-gartner-stock-fell-31-this-morning/)

### 찬성론 (Bull Case)
- [Goldman Sachs — AI Agents to Boost Software Market](https://www.goldmansachs.com/insights/articles/ai-agents-to-boost-productivity-and-size-of-software-market)
- [Gartner — 40% of Enterprise Apps with AI Agents by 2026](https://www.gartner.com/en/newsroom/press-releases/2025-08-26-gartner-predicts-40-percent-of-enterprise-apps-will-feature-task-specific-ai-agents-by-2026-up-from-less-than-5-percent-in-2025)
- [McKinsey — The State of AI](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai)
- [Bain & Company — Will Agentic AI Disrupt SaaS?](https://www.bain.com/insights/will-agentic-ai-disrupt-saas-technology-report-2025/)
- [Entrepreneur — Anthropic CEO on AI replacing engineers](https://www.entrepreneur.com/business-news/ai-ceo-says-software-engineers-could-be-replaced-in-months/502087)
- [TIME — AI Is Moving Past Chatbots](https://time.com/7346545/ai-claude-cowork-code-chatbots/)

### 반대론 (Bear Case)
- [Yahoo Finance — Jensen Huang "most illogical thing"](https://finance.yahoo.com/news/nvidia-boss-jensen-huang-says-164113817.html)
- [CNBC — Wedbush "Armageddon scenario far from reality"](https://www.cnbc.com/2026/02/05/dan-ives-names-5-stocks-to-buy-amid-software-armageddon.html)
- [Bloomberg — JPMorgan "Sentenced Before Trial"](https://www.bloomberg.com/news/articles/2026-02-04/software-stocks-are-now-sentenced-before-trial-jpmorgan-says)
- [Gartner — 40%+ of Agentic AI Projects Canceled by 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
- [Gravitee — State of AI Agent Security 2026](https://www.gravitee.io/blog/state-of-ai-agent-security-2026-report-when-adoption-outpaces-control)

### 실제 사례
- [Entrepreneur — Klarna CEO reverses course](https://www.entrepreneur.com/business-news/klarna-ceo-reverses-course-by-hiring-more-humans-not-ai/491396)
- [TS2 Tech — Atlassian CEO rejects "software is dead"](https://ts2.tech/en/atlassian-stock-slides-after-q2-results-as-ceo-rejects-software-is-dead-ai-fears/)
- [TechCrunch — Harvey AI $8B valuation](https://techcrunch.com/2025/12/04/legal-ai-startup-harvey-confirms-8b-valuation/)

### 한국 데이터
- [디지털투데이 — 글로벌 SW주 시총 435조 증발](https://www.digitaltoday.co.kr/news/articleView.html?idxno=627972)
- [머니투데이 — 美 증시에 클로드 코워크 충격](https://www.mt.co.kr/world/2026/02/04/2026020414521696794)
- [AI타임스 — 클로드 코워크가 기술 주가를 폭락시킨 이유](https://www.aitimes.com/news/articleView.html?idxno=206366)
- [뉴스1 — 월가 덮친 'SW 종말 포모' 한국도 예외 아냐](https://www.news1.kr/industry/sb-founded/6063335)
- [서울경제 — 삼성SDS AI 에이전트 AX 청사진](https://www.sedaily.com/NewsView/2K77ZQANC9)
- [다음 — 2026년 AI 에이전트 확산 원년](https://v.daum.net/v/20260130161801788)
- [인사이트코리아 — 삼성SDS, LG CNS 버티컬 SaaS 맞대응](https://www.insightkorea.co.kr/news/articleView.html?idxno=239799)
- [유니콘타임스 — "사스는 죽었다" 나델라 예언 적중하나](https://www.unicorntimes.kr/news/articleView.html?idxno=11498)

### 경쟁 환경 / 산업 분석
- [Fortune — OpenAI Frontier](https://fortune.com/2026/02/05/openai-frontier-ai-agent-platform-enterprises-challenges-saas-salesforce-workday/)
- [CNBC — Anthropic $350B valuation](https://www.cnbc.com/2026/01/07/anthropic-funding-term-sheet-valuation.html)
- [G2 — AI Agent Report 2025](https://company.g2.com/news/2025-ai-agent-report)
- [Rest of World — Indian IT can't solve Claude Cowork](https://restofworld.org/2026/indian-it-ai-stock-crash-claude-cowork/)
- [The New Stack — Microsoft AI Will Kill SaaS by 2030](https://thenewstack.io/microsoft-ai-business-agents-will-kill-saas-by-2030/)

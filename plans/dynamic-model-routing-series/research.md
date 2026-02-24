# 자료조사 결과: 동적 모델 라우팅 아키텍처

> **시리즈 슬러그(안):** `dynamic-model-routing-series`
> **조사일:** 2026-02-24
> **콘텐츠 유형:** 정보전달형 (혼합 가능 — nexus-hub 실제 구현 사례를 축으로 업계 동향 분석)
> **조사 담당:** Researcher

---

## 1. 기존 컨벤션 분석

### 1-1. 프로젝트 내 유사 시리즈 패턴

이 프로젝트에는 기술 해설 정보전달형 시리즈가 다수 존재한다. 참조할 컨벤션:

| 참조 시리즈 | 패턴 | 이 시리즈에 적용할 점 |
|------------|------|---------------------|
| **Qwen3.5, 인간의 언어로** (시리즈 36) | 기술 용어 → 일상 비유 즉시 번역, 의사결정 플로차트, 비용 비교표 | 모델 라우팅 용어도 동일 패턴 적용 |
| **바이브 코딩 시리즈** (시리즈 4) | 도구 비교 → 실전 가이드 → 미래 전망 흐름 | "왜 필요한가 → 어떻게 작동하는가 → 실전 → 미래" 흐름 |
| **192.168.0.x의 규칙** (시리즈 11) | 인프라 개념을 비유로 설명, 구성도 중심 | Traefik 리버스 프록시 비유를 모델 라우터로 확장 가능 |
| **에이전트 조립 가이드** (시리즈 27) | 기술 가이드를 프롬프트 중심으로 구성 | 코드 대신 구조도+흐름도로 설명 |
| **코드는 마지막이다** (시리즈 29) | 실행 워크플로우 중심 | 설계 → 분류 → 라우팅 → 응답의 파이프라인 흐름 |

### 1-2. 기존 시리즈에서 발견된 문제점 (회피 대상)

- **과도한 벤치마크 나열**: 숫자가 많으면 독자가 이탈한다 → 핵심 수치만 선별, 나머지는 비유로 대체
- **"그래서 나는 뭘 하면 되는데?"에 대한 답 부재**: 매 편 끝에 실행 가능한 결론 필수
- **영어 용어 과다**: 한국어 비유를 먼저 제시하고, 영어 원어는 괄호 안에

---

## 2. 주제 조사: 동적 모델 라우팅

### 2-1. 개념 정의

**동적 모델 라우팅(Dynamic Model Routing)** 이란, 사용자의 질의(query)를 분석하여 최적의 AI 모델을 자동으로 선택하는 아키텍처 패턴이다.

핵심 원리:
- 모든 질문에 가장 비싼/강력한 모델을 쓰는 것은 낭비
- 간단한 질문은 가벼운 모델이, 복잡한 질문은 강력한 모델이 처리
- 이 "판별 → 배정" 과정을 자동화하는 것이 모델 라우팅

**출처:** [IDC — The Future of AI is Model Routing](https://blogs.idc.com/2025/11/17/the-future-of-ai-is-model-routing/), [MateCloud — Why 2026 Is the Year of Multi-Model Routing](https://medium.com/@MateCloud/why-2026-is-the-year-of-multi-model-routing-technical-challenges-and-system-design-2457dcdd2209)

### 2-2. 업계 동향 — "하나의 모델" 시대의 종말

| 시점 | 패러다임 | 특징 |
|------|---------|------|
| 2023 | 단일 모델 시대 | "GPT-4 하나면 된다" |
| 2024 | 모델 선택의 시대 | "용도에 맞는 모델을 골라라" |
| 2025 | 멀티모델 운영 | "여러 모델을 동시에 쓰되, 수동 전환" |
| 2026 | **동적 라우팅 시대** | "질문마다 자동으로 최적 모델 배정" |
| 2028 (IDC 예측) | 자율 라우팅 | "70%의 AI 선도 기업이 자율 모델 라우팅 사용" |

**IDC FutureScape 2026 핵심 예측:** "2028년까지 상위 AI 기업의 70%가 다양한 모델에 걸쳐 동적·자율적으로 모델 라우팅을 관리하는 고급 멀티 도구 아키텍처를 사용할 것이다."

**Gartner 관련 예측:** 2028년까지 멀티 LLM 애플리케이션을 구축하는 조직의 70%가 AI 게이트웨이 기능을 사용할 것으로 전망.

**출처:** [IDC FutureScape](https://www.idc.com/resource-center/blog/the-future-of-ai-is-model-routing/), [Gartner 2026 Predictions](https://www.gartner.com/en/articles/strategic-predictions-for-2026)

### 2-3. 2단계 라우팅 전략 (2026년 현재)

2026년 2월 기준, 모델 라우팅은 단순히 "어떤 모델을 쓸까"가 아니라 2단계로 분화되었다:

| 단계 | 결정 사항 | 예시 |
|------|----------|------|
| **Level 1: 모델 선택** | 어떤 모델 패밀리/프로바이더가 처리할까 | Claude vs GPT vs Gemini vs 오픈소스 |
| **Level 2: 추론 수준 결정** | 선택된 모델 내에서 얼마나 깊이 생각할까 | Extended Thinking 토큰 예산, reasoning effort |

이것은 nexus-hub 프로젝트의 구조(strategy + tier)와 정확히 일치한다:
- **strategy** = Level 1 (auto/cost_saving/high_quality/manual)
- **tier** (fast/deep) = Level 2 (모델 내 추론 깊이)

**출처:** [The Model Routing Playbook (Feb 2026)](https://medium.com/@Micheal-Lanham/the-model-routing-playbook-which-ai-model-to-use-for-what-in-february-2026-73061fb9d481)

### 2-4. 주요 AI 프로바이더의 가격 tier 전략 (2026년 2월 기준)

#### Anthropic Claude 라인업

| 모델 | 포지션 | 입력 ($/1M 토큰) | 출력 ($/1M 토큰) | 용도 |
|------|--------|-----------------|-----------------|------|
| Haiku 4.5 | Fast tier | $1 | $5 | 간단한 분류, FAQ, 빠른 응답 |
| Sonnet 4.5/4.6 | Balanced | $3 | $15 | 코딩, 일반 작업, 에이전트 오케스트레이션 |
| Opus 4.5/4.6 | Deep tier | $5~$15 | $25~$75 | 복잡한 추론, 장기 계획, 미션 크리티컬 |

Anthropic의 공식 전략: Sonnet을 "멀티 에이전트 시스템의 두뇌"로 포지셔닝하고, 복잡한 작업을 분해한 뒤 Haiku에 위임하는 구조를 권장.

**출처:** [Anthropic Claude API Pricing 2026](https://www.metacto.com/blogs/anthropic-api-pricing-a-full-breakdown-of-costs-and-integration), [Claude Models Overview](https://platform.claude.com/docs/en/about-claude/models/overview)

#### 프로바이더 간 가격 비교 (소비자 플랜)

| 프로바이더 | 기본 | 프로 | 최상위 |
|-----------|------|------|--------|
| OpenAI | 무료 | $20/월 (Plus) | $200/월 (Pro) |
| Anthropic | 무료 | $20/월 (Pro) | $100~$200/월 (Max) |
| Google | 무료 | $20/월 (AI Premium) | — |

시장이 $20/월 진입점으로 수렴하고 있으며, 상위 tier에서 $200/월로 경쟁 중.

**출처:** [IntuitionLabs AI API Pricing Comparison 2026](https://intuitionlabs.ai/articles/ai-api-pricing-comparison-grok-gemini-openai-claude), [2026 AI Subscription Prices](https://www.sentisight.ai/ai-price-comparison-gemini-chatgpt-claude-grok/)

### 2-5. 모델 라우팅 플랫폼/도구 현황

#### 전문 라우팅 플랫폼

| 플랫폼 | 핵심 기능 | 투자/채택 | 비용 절감 효과 |
|--------|----------|----------|---------------|
| **Martian** | 실시간 최적 LLM 라우팅, Model Mapping 기술 | Accenture 투자, 300+ 기업(Amazon~Zapier) | GPT-4 대비 최대 30배 비용 절감 |
| **Not Diamond** | 쿼리별 최적 LLM 예측, 프롬프트 자동 적응 | IBM 투자, 10만+ 사용자 | 정확도 39% 향상, 일부 모델 2배 성능 |
| **OpenRouter** | 500+ 모델 통합 API, 자동 failover | SOC 2 Type I, 월 수십억 건 처리 | 5% 수수료로 멀티모델 접근 |
| **RouteLLM** (오픈소스) | LMSYS 개발, 학술적 검증 | ACL 2025 논문 | MT-Bench에서 85% 비용 절감 |

**출처:** [VentureBeat — Model Routing Key to Enterprise AI](https://venturebeat.com/ai/why-accenture-and-martian-see-model-routing-as-key-to-enterprise-ai-success), [Not Diamond](https://www.notdiamond.ai/), [Felicis — Routing the Future](https://www.felicis.com/insight/model-routing), [RouteLLM](https://lmsys.org/blog/2024-07-01-routellm/)

#### 라우팅 기능 포함 게이트웨이

| 플랫폼 | 유형 | 특징 |
|--------|------|------|
| **LiteLLM** | 오픈소스 게이트웨이 | OpenAI 호환 API로 100+ 모델 통합 |
| **Requesty** | 관리형 게이트웨이 | 엔터프라이즈 라우팅 + 비용 추적 |
| **Helicone** | 관측성 플랫폼 | 비용 분석 + 라우팅 최적화 |
| **Portkey** | AI 게이트웨이 | 로드밸런싱 + fallback + 캐싱 |

#### 벤처 캐피털 관점

Felicis Ventures는 모델 라우팅을 **$10B+ 플랫폼 기회**로 평가. "클라우드 시대에 AWS/Azure/GCP가 $250B 연매출을 달성한 것처럼, AI 시대에는 모델 라우팅 계층이 그 역할을 할 수 있다"고 분석.

**출처:** [Felicis — Routing the Future](https://www.felicis.com/insight/model-routing)

### 2-6. 비용 절감 실증 데이터

| 연구/사례 | 방법 | 비용 절감 | 품질 유지 |
|----------|------|----------|----------|
| RouteLLM (LMSYS) | 강/약 모델 라우터 학습 | MT-Bench 85% 절감 | GPT-4 대비 95% 품질 |
| RouteLLM 데이터 증강 | LLM 판사 + 라우터 | 75% 절감 | 95% 품질 (강 모델 14%만 사용) |
| 엔터프라이즈 평균 | 게이트웨이 + 캐싱 + 라우팅 | 30~50% 절감 | 품질 저하 없음 |
| 하이브리드 쿼리 라우팅 | 간단/복잡 질의 분류 | LLM 사용 37~46% 감소 | 응답 32~38% 빨라짐 |
| Martian | Model Mapping | GPT-4 대비 최대 30배 | 동등 품질 유지 |

핵심 인사이트: **"모든 질문의 70~80%는 가벼운 모델로 충분하다."** 이것이 라우팅의 경제적 근거.

**출처:** [RouteLLM Paper (arXiv)](https://arxiv.org/pdf/2406.18665), [Swfte AI — Intelligent LLM Routing](https://www.swfte.com/blog/intelligent-llm-routing-multi-model-ai), [Pondhouse Data — Saving Costs with LLM Routing](https://www.pondhouse-data.com/blog/saving-costs-with-llm-routing)

### 2-7. 한국 기업/서비스 사례

#### 확인된 사례

| 기업/서비스 | 구현 내용 | 상세 |
|-----------|----------|------|
| **KT Model Orchestrator** | 카테고리 기반 라우팅 | Task, Domain, Level, Capability 4가지 축으로 쿼리 분석 → 최적 모델 자동 선택 |
| **NAVER CLOVA LLM 라우터** | 경량 분류 모델 기반 라우팅 | 도메인/필터링 성능에서 대형 모델 수준을 경량 모델로 달성, 비용 효율 극대화 |
| **카카오 T 배차 시스템** | (비유 소재) AI 배차 알고리즘 | 30개 변수 분석으로 최적 드라이버-승객 매칭 — 모델 라우팅의 완벽한 비유 |

#### 한국 시장 맥락

- 2026년이 한국 기업 AI 도입의 **실질적 원년**으로 평가됨
- Multi LLM Agent 전략이 부상하나, 아직 "모델 라우팅"을 명시적으로 도입한 공개 사례는 제한적
- KT, NAVER가 선도하고 있으며, 대부분의 기업은 단일 모델 API 호출 단계
- 중소기업은 OpenRouter 같은 게이트웨이를 통한 간접 라우팅이 현실적 대안

**출처:** [KT Enterprise — Multi LLM Gateway 적용 사례](https://enterprise.kt.com/bt/P_BT_TI_VW_001.do?bbsId=3691&bbsTP=A), [NAVER CLOVA — LLM 라우터](https://clova.ai/tech-blog/%EB%A7%A5%EB%9D%BD%EC%9D%84-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94-%EB%98%91%EB%98%91%ED%95%9C-ai-%EB%B6%84%EB%A5%98-%EC%97%94%EC%A7%84-llm-%EB%9D%BC%EC%9A%B0%ED%84%B0), [AI타임스 — 모델 라우팅 등장](https://www.aitimes.com/news/articleView.html?idxno=153902)

### 2-8. nexus-hub 프로젝트와의 매핑

nexus-hub의 동적 모델 라우팅 시스템은 업계 트렌드와 정확히 일치하는 구조를 가지고 있다:

| nexus-hub 구성요소 | 업계 대응 개념 | 설명 |
|-------------------|---------------|------|
| TaskClassifier (4유형 분류) | Query Classifier / Intent Analyzer | 규칙+LLM 하이브리드로 질의 복잡도 판별 |
| ModelRouter (strategy 4가지) | Routing Policy Engine | auto/cost_saving/high_quality/manual 전략 |
| tier (fast/deep) | 2-Level Routing의 Level 2 | 모델 내 추론 깊이 결정 |
| PipelineLogger | Observability Layer | 분류→선택→응답 전 과정 비동기 기록 |
| Phase 2: global_ai_settings | AI Gateway 중앙화 | API 키 결합 해제 → 프로바이더 독립 선택 |
| isRecommended 기반 정렬 | Quality Ranking | 추천 모델 우선 표시 |
| 비용 추적 UI | Cost Dashboard | 실시간 비용 모니터링 |

---

## 3. 비전문가를 위한 비유/메타포

### 3-1. 핵심 비유: "AI 세계의 카카오 T 배차 시스템"

**선정 이유:** 한국인이 가장 체감하기 쉬운 비유. 카카오 T가 30개 변수를 분석하여 최적의 택시를 배정하듯, 모델 라우터는 질문의 특성을 분석하여 최적의 AI 모델을 배정한다.

| 카카오 T 배차 | 모델 라우팅 |
|-------------|-----------|
| 승객의 출발지/목적지/시간 분석 | 사용자 질문의 유형/복잡도/긴급도 분석 |
| 일반 택시 vs 블랙 vs 벤티 선택 | Haiku(빠른) vs Sonnet(균형) vs Opus(강력) 선택 |
| 가까운 기사 우선 배정 | 비용 효율 좋은 모델 우선 배정 |
| 기사 부재 시 다른 기사 배정 | 모델 장애 시 fallback 모델로 전환 |
| 배차 이력 기록 | 파이프라인 로그 기록 |

### 3-2. 보조 비유들

| 비유 | 설명 | 적용 포인트 |
|------|------|------------|
| **종합병원 접수처** | 감기면 내과, 골절이면 정형외과, 중증이면 응급실. 접수처가 증상을 보고 최적의 과를 배정 | Task Classifier의 분류 기능 |
| **레스토랑 주방** | 파스타는 파스타 셰프, 스테이크는 그릴 셰프, 디저트는 파티시에. 주방장이 주문을 보고 배분 | 전문화된 모델 선택 |
| **전화 교환원 (옛날)** | "어디로 연결해 드릴까요?" → 부서 연결. 자동 교환기 등장 후 다이얼만 돌리면 자동 연결 | 수동→자동 라우팅의 진화 |
| **내비게이션** | 같은 목적지라도 "빠른 길" vs "편한 길" vs "최단 거리"를 선택 | strategy(auto/cost_saving/high_quality) |

### 3-3. 비유 활용 전략

- **1편 도입부**: 카카오 T 배차 비유로 시작 → "AI에게도 이런 배차 시스템이 있다"
- **분류 설명**: 종합병원 접수처 비유
- **전략 설명**: 내비게이션 비유 (빠른 길/저렴한 길/정확한 길)
- **비용 절감 설명**: "블랙 택시를 타야 할 때만 블랙을 타면 택시비가 85% 줄어든다"

---

## 4. 시리즈 방향성 분석

### 4-1. 이 주제가 비전문가에게 흥미로운 이유

1. **일상에서 이미 겪고 있다**: ChatGPT/Claude를 쓸 때 "어떤 모델을 선택해야 하지?"라는 고민이 이미 존재
2. **돈이 걸려 있다**: API 비용, 구독료 차이가 현실적인 문제 (월 $20 vs $200)
3. **자동화의 쾌감**: "고민 없이 알아서 최적을 골라준다"는 콘셉트가 직관적으로 매력적
4. **한국 사례가 있다**: 카카오 T 배차, KT Model Orchestrator 등 한국 맥락 연결 가능
5. **실제 프로젝트의 구현기**: nexus-hub라는 실전 프로젝트가 있어 추상적이지 않음

### 4-2. 시리즈 구성안 (4편)

> 3~5편 범위에서 4편이 적절하다고 판단. 이유:
> - 3편이면 실전/구현기를 충분히 다루기 어려움
> - 5편이면 비전문가 독자가 이탈할 수 있는 길이
> - 4편: 개념 → 구조 → 실전 → 전망의 자연스러운 기승전결

| 편 | 제목(안) | 역할 | 핵심 메시지 | 독자 이해도 목표 |
|----|---------|------|-----------|----------------|
| 1 | **AI에게도 배차 시스템이 있다** | 개념/도입 | "모든 질문에 가장 비싼 AI를 쓸 필요 없다. 질문마다 최적의 AI를 자동 배정하는 시스템이 있다" | "모델 라우팅이 뭔지, 왜 필요한지" 설명 가능 |
| 2 | **질문을 읽는 기계** | 구조/원리 | "라우터는 질문의 난이도를 판별하고, 전략에 따라 모델을 고른다. 이 과정은 0.1초 안에 일어난다" | "분류→선택→응답 파이프라인" 이해 |
| 3 | **비용이 85% 줄었다** | 실전/사례 | "실제 프로젝트에서 모델 라우팅을 구현한 이야기. KT, NAVER, 글로벌 기업의 사례" | "실전에서 어떤 효과가 나는지" 체감 |
| 4 | **AI 시대의 교통 인프라** | 전망/정리 | "2028년까지 70%의 AI 기업이 자율 라우팅을 쓸 것이다. 이것은 AI의 고속도로다" | "이 기술이 어디로 향하는지" 전망 |

### 4-3. 편별 상세 구조

#### 1편: AI에게도 배차 시스템이 있다

| Part | 제목 | 핵심 내용 |
|------|------|-----------|
| 1 | "카카오 T가 택시를 고르듯" | 배차 비유로 모델 라우팅 개념 도입. "간단한 질문에 가장 비싼 AI를 쓰는 건, 편의점 갈 때 블랙 택시를 부르는 것" |
| 2 | "AI도 종류가 있다" | Haiku/Sonnet/Opus (또는 fast/deep) 티어 구조. 가격 차이. "같은 AI 회사인데 왜 모델이 3개인가?" |
| 3 | "하나의 모델 시대는 끝났다" | 2023→2026 패러다임 변화. 단일 모델 → 멀티모델 → 자동 라우팅 진화 타임라인 |
| 4 | "그래서 모델 라우팅이 뭔데" | 3줄 정의. IDC 예측 인용. "2028년까지 70%가 쓸 것" |

#### 2편: 질문을 읽는 기계

| Part | 제목 | 핵심 내용 |
|------|------|-----------|
| 1 | "접수처에서 일어나는 일" | TaskClassifier: 질문 유형 분류 (simple/complex/creative/analytical). 종합병원 접수처 비유 |
| 2 | "네 가지 전략" | auto/cost_saving/high_quality/manual. 내비게이션 비유 (빠른 길/저렴한 길/정확한 길/직접 선택) |
| 3 | "0.1초의 판단" | 분류→tier 결정→모델 선택→LLM 호출 파이프라인 흐름도. PipelineSummary 개념 |
| 4 | "기록이 남는다" | PipelineLogger: 모든 의사결정 과정이 기록되는 이유. 비용 추적, 품질 모니터링 |

#### 3편: 비용이 85% 줄었다

| Part | 제목 | 핵심 내용 |
|------|------|-----------|
| 1 | "모든 질문의 70%는 가벼운 AI로 충분하다" | RouteLLM 실험 결과. "GPT-4의 95% 품질을, 15%의 비용으로" |
| 2 | "KT와 NAVER가 먼저 움직였다" | KT Model Orchestrator, NAVER CLOVA LLM 라우터 사례 |
| 3 | "Martian과 Not Diamond" | 글로벌 라우팅 플랫폼 사례. Accenture/IBM 투자. 300+ 기업 도입 |
| 4 | "nexus-hub의 선택" | 실제 프로젝트 구현기. 왜 이 구조를 선택했는지, Phase 2 진화 방향 |

#### 4편: AI 시대의 교통 인프라

| Part | 제목 | 핵심 내용 |
|------|------|-----------|
| 1 | "10조 원짜리 계층" | Felicis의 $10B+ 플랫폼 기회 분석. AWS/Azure처럼 가치가 집중될 계층 |
| 2 | "2028년의 풍경" | IDC/Gartner 예측 종합. 자율 라우팅, 에이전트 AI, 멀티모델 오케스트레이션 |
| 3 | "당신의 AI도 라우팅이 필요하다" | 개인/중소기업 관점: OpenRouter 같은 게이트웨이 활용법. 비용 절감 시작점 |
| 4 | "고속도로가 먼저 깔려야 차가 달린다" | 결론: 모델 라우팅은 AI 시대의 교통 인프라. 인프라가 갖춰져야 AI 서비스가 꽃핀다 |

### 4-4. 시리즈 톤 & 스타일

- **Qwen 시리즈(시리즈 36)의 "용어 즉시 번역" 패턴** 적용: 기술 용어가 나올 때마다 괄호 안에 일상 비유
- **바이브 코딩 시리즈(시리즈 4)의 "비교표 + 플로차트" 패턴** 적용: 시각적 의사결정 도구
- **nexus-hub 구현기를 3편에 집중 배치**: 추상적 해설이 아니라 "실제로 만들어본 사람의 이야기"
- **매 편 끝에 "그래서 어떡하라고" 섹션**: 독자가 실행할 수 있는 1가지 이상의 액션 아이템

---

## 5. 참고 자료 (전체 출처)

### 업계 동향 / 예측
- [IDC — The Future of AI is Model Routing](https://blogs.idc.com/2025/11/17/the-future-of-ai-is-model-routing/)
- [MateCloud — Why 2026 Is the Year of Multi-Model Routing](https://medium.com/@MateCloud/why-2026-is-the-year-of-multi-model-routing-technical-challenges-and-system-design-2457dcdd2209)
- [Gartner — Strategic Predictions for 2026](https://www.gartner.com/en/articles/strategic-predictions-for-2026)
- [Felicis — Routing the Future](https://www.felicis.com/insight/model-routing)
- [The Model Routing Playbook (Feb 2026)](https://medium.com/@Micheal-Lanham/the-model-routing-playbook-which-ai-model-to-use-for-what-in-february-2026-73061fb9d481)

### 모델 라우팅 플랫폼
- [VentureBeat — Martian & Accenture](https://venturebeat.com/ai/why-accenture-and-martian-see-model-routing-as-key-to-enterprise-ai-success)
- [Not Diamond](https://www.notdiamond.ai/)
- [Not Diamond — awesome-ai-model-routing (GitHub)](https://github.com/Not-Diamond/awesome-ai-model-routing)
- [IBM — Why We Invested in Not Diamond](https://www.ibm.com/think/insights/why-ibm-ventures-invested-in-not-diamond)
- [OpenRouter Documentation](https://openrouter.ai/docs/guides/routing/provider-selection)
- [Red Hat — vLLM Semantic Router](https://www.redhat.com/en/blog/bringing-intelligent-efficient-routing-open-source-ai-vllm-semantic-router)
- [ACL 2025 — TagRouter](https://www.oreateai.com/blog/acl-2025-how-tagrouter-is-revolutionizing-large-language-model-routing/33b90e505da3a546bd37874c479eb9cd)

### 비용 절감 / 실증 데이터
- [RouteLLM (LMSYS)](https://lmsys.org/blog/2024-07-01-routellm/)
- [RouteLLM Paper (arXiv)](https://arxiv.org/pdf/2406.18665)
- [Swfte AI — Intelligent LLM Routing](https://www.swfte.com/blog/intelligent-llm-routing-multi-model-ai)
- [Pondhouse Data — Saving Costs with LLM Routing](https://www.pondhouse-data.com/blog/saving-costs-with-llm-routing)
- [Burnwise — LLM Model Routing Guide](https://www.burnwise.io/blog/llm-model-routing-guide)
- [Requesty — Enterprise AI Routing](https://www.requesty.ai/blog/intelligent-llm-routing-in-enterprise-ai-uptime-cost-efficiency-and-model)

### AI 프로바이더 가격
- [Anthropic Claude API Pricing 2026](https://www.metacto.com/blogs/anthropic-api-pricing-a-full-breakdown-of-costs-and-integration)
- [Claude Models Overview](https://platform.claude.com/docs/en/about-claude/models/overview)
- [IntuitionLabs — AI API Pricing Comparison 2026](https://intuitionlabs.ai/articles/ai-api-pricing-comparison-grok-gemini-openai-claude)
- [Anthropic — Claude Haiku 4.5](https://www.anthropic.com/news/claude-haiku-4-5)
- [Axios — Claude Sonnet 4.6](https://www.axios.com/2026/02/17/anthropic-new-claude-sonnet-faster-cheaper)

### 한국 사례
- [KT Enterprise — Multi LLM Gateway](https://enterprise.kt.com/bt/P_BT_TI_VW_001.do?bbsId=3691&bbsTP=A)
- [NAVER CLOVA — LLM 라우터](https://clova.ai/tech-blog/%EB%A7%A5%EB%9D%BD%EC%9D%84-%EC%9D%B4%ED%95%B4%ED%95%98%EB%8A%94-%EB%98%91%EB%98%91%ED%95%9C-ai-%EB%B6%84%EB%A5%98-%EC%97%94%EC%A7%84-llm-%EB%9D%BC%EC%9A%B0%ED%84%B0)
- [AI타임스 — 모델 라우팅 등장](https://www.aitimes.com/news/articleView.html?idxno=153902)
- [카카오모빌리티 — 택시 AI 배차 시스템](https://www.kakaomobility.com/contents/taxi-dispatch)
- [IT AI Totality — 2026 Multi LLM Agent 시대](https://blog.ai.dmomo.co.kr/tech/20399)
- [MakeBot — 2026 AI/LLM 시장 트렌드](https://www.makebot.ai/blog/llm-market-enterprise-trends)

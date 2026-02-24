# 시리즈 39: 동적 모델 라우팅 (dynamic-model-routing-series)

> 작성일: 2026-02-24 | 유형: 정보전달형 (기술 해설)
> 시리즈 번호: 39 | 슬러그: `dynamic-model-routing-series`
> 스킬 적용: editorial-content-page + seo + prompt-driven-guide

---

## 1. 시리즈 개요

### 1.1 한 줄 요약
AI 모델이 수십 개인 시대, 질문마다 최적의 모델을 자동 선택하는 '동적 모델 라우팅' 아키텍처를 실제 구현 사례 기반으로 풀어낸다.

### 1.2 대상 독자
- AI를 쓰고 있지만 "모델 선택"에 대해 깊이 생각해 본 적 없는 사용자
- AI 도입을 고려하는 비개발자 의사결정자 (팀장, 대표)
- SaaS 제품에 AI를 붙이려는 초기 단계 개발자

### 1.3 접근 방식
- 비유 없이 기술 개념을 직관적으로 풀어냄
- 실제 프로젝트(nexus-hub) 아키텍처를 축으로 설명
- 업계 데이터와 한국 사례로 근거 보강

---

## 2. 시리즈 구성 (4편)

| 편 | 슬러그 | 제목 | 역할 | 핵심 메시지 |
|----|--------|------|------|-----------|
| 1 | `what-is-model-routing.html` | 동적 모델 라우팅이란 | 개념/구조 | 왜 필요하고, 어떤 구조인가 |
| 2 | `task-classifier-and-router.html` | 분류기와 라우터 | 핵심 서비스 | 질문 분류 → 모델 선택 파이프라인 |
| 3 | `cost-and-performance.html` | 비용과 성능 사이 | 실증/사례 | 85% 비용 절감의 근거와 사례 |
| 4 | `centralization-and-future.html` | 중앙화와 그 다음 | 진화/전망 | 설정 중앙화, 업계 방향 |

---

## 3. 1편 상세 설계 — "동적 모델 라우팅이란"

### 3.1 메타 정보

```yaml
layout: layouts/article.njk
pageTitle: "동적 모델 라우팅이란"
description: "같은 질문이라도 어떤 AI 모델이 답하느냐에 따라 비용이 15배 차이 난다. 질문의 복잡도를 판별하고 최적의 모델을 자동 선택하는 동적 모델 라우팅의 구조를 풀어본다."
datePublished: "2026-02-24"
```

### 3.2 구조

```
Masthead
  issue: "Series 39 — 동적 모델 라우팅 · 01"
  h1: "같은 질문,\n다른 모델"
  deck: "Haiku에 물으면 $1, Opus에 물으면 $15.\n같은 답이 나온다면, 왜 비싼 모델을 쓰는가.\n질문마다 최적의 모델을 자동 선택하는 구조가 있다."

Part I — 모델이 여러 개인 이유
  - AI 프로바이더는 왜 모델을 3~5개씩 출시하는가
  - 비용·속도·품질의 트레이드오프 구조
  - stat-row (3칸): Haiku $1/M · 응답 0.5s | Sonnet $3/M · 1.5s | Opus $15/M · 3s+
  - mechanism-row (3칸): fast tier — 분류·요약·FAQ | balanced — 코딩·분석·일반 | deep tier — 추론·계획·미션크리티컬
  - 핵심: 모든 질문의 70~80%는 fast tier로 충분하다 (RouteLLM)

Part II — 동적 모델 라우팅의 구조
  - 정의: 사용자 질의의 복잡도를 자동 판별하고, 적합한 tier의 모델을 선택하는 아키텍처 패턴
  - 3단계 흐름도 (step-flow 또는 mechanism-row):
    질문 입력 → Task Classifier(복잡도 판별) → Model Router(모델 선택) → LLM 응답
  - pull-quote: "라우팅의 핵심은 '판별'이다. 어떤 모델을 쓸지가 아니라, 이 질문이 얼마나 어려운지를 먼저 결정한다."
  - 4가지 전략 소개 (mechanism-row 4칸 또는 테이블):
    auto — 질문마다 자동 판별 | cost_saving — 항상 fast | high_quality — 항상 deep | manual — 직접 지정

Part III — 단일 모델 vs 동적 라우팅
  - mechanism-2col (Before/After):
    Before: 하나의 모델로 모든 질문 처리 → 비싼 모델이면 비용 낭비, 싼 모델이면 품질 저하
    After: 질문마다 tier 분기 → 비용 최적화 + 품질 유지
  - stat-row (3칸): 85% 비용 절감 | 95% 품질 유지 | 전체의 14%만 고성능 모델 사용
  - timeline: 2023 단일 모델 → 2024 수동 선택 → 2025 멀티모델 운영 → 2026 동적 라우팅 → 2028 자율 라우팅 (IDC)
  - IDC 예측: 2028년까지 AI 선도 기업의 70%가 자율 모델 라우팅 사용

Part IV — 실제 아키텍처 미리보기
  - nexus-hub 프로젝트의 전체 흐름도 (간략 버전)
    사용자 메시지 → strategy 확인 → TaskClassifier → tier 결정 → ModelRouter → LLM 호출 → PipelineSummary → 프론트엔드
  - 핵심 서비스 3개 소개 (mechanism-row):
    task-classifier.service — 질문 분류 | model-router.service — 모델 선택 | pipeline-logger.service — 과정 기록
  - 다음 편 예고: 분류기(TaskClassifier)는 어떻게 질문의 난이도를 판별하는가

Closing
  h2: "모든 질문에 같은 모델을 쓰는 건\n모든 환자에게 같은 약을 주는 것과 같다"
  p.sub: "다음 편에서 질문을 분류하고 모델을 선택하는 핵심 서비스를 분해한다."

Footer
  Sources: IDC FutureScape 2026 · RouteLLM (LMSYS, 2024) · Anthropic Claude Models 2026
  Research assisted by Claude · 2026
```

### 3.3 디자인 노트

- **prompt-driven-guide 스킬 적용**: 코드 블록 없음. 구성도(mechanism-row, step-flow)와 통계(stat-row)로 시각화
- **색상**: accent(#c43e2a)만 사용. 이모지/아이콘 없음
- **그리드**: mechanism-row(3~4칸), mechanism-2col(2칸), stat-row(3칸)
- **모바일**: 700px 이하에서 1-column 전환
- **다크 모드**: CSS 변수 기반 자동 대응
- **톤**: 평서문, 직설적. 기술 개념을 쉬운 문장으로 직접 설명 (비유 최소화)

### 3.4 1편에서 사용할 핵심 데이터

| 데이터 | 출처 | 사용 위치 |
|--------|------|----------|
| Haiku $1/Sonnet $3/Opus $15 (1M 토큰 기준) | Anthropic 공식 | Part I stat-row |
| 70~80% 질문은 fast tier로 충분 | RouteLLM 논문 | Part I |
| 85% 비용 절감, 95% 품질 유지 | RouteLLM MT-Bench | Part III stat-row |
| 전체의 14%만 고성능 모델 사용 | RouteLLM 실험 | Part III stat-row |
| 2028년 70% 기업 자율 라우팅 | IDC FutureScape 2026 | Part III timeline |
| nexus-hub 서비스 구조 (3개) | 프로젝트 내부 | Part IV |

---

## 4. 나머지 편 개요 (추후 상세 설계)

### 2편: 분류기와 라우터
- Part I: Task Classifier — 규칙 기반 + LLM 보조 하이브리드 분류
- Part II: 4가지 질문 유형 (simple/complex/creative/analytical) → tier 매핑
- Part III: Model Router — DB 조회, isRecommended 정렬, fallback
- Part IV: Pipeline Logger — 전 과정 비동기 기록, PipelineSummary 구조

### 3편: 비용과 성능 사이
- Part I: RouteLLM 실험 결과 상세
- Part II: KT Model Orchestrator, NAVER CLOVA LLM 라우터
- Part III: Martian, Not Diamond, OpenRouter — 글로벌 플랫폼
- Part IV: nexus-hub 구현 결과 — 23개 파일, 61개 테스트

### 4편: 중앙화와 그 다음
- Part I: API 키에 결합된 설정의 문제 → global_ai_settings 분리
- Part II: 채팅/임베딩 프로바이더 독립 선택 아키텍처
- Part III: Felicis $10B+ 전망, IDC/Gartner 2028 예측
- Part IV: 2단계 라우팅(모델 선택 + 추론 깊이)의 미래

---

## 5. 제작 체크리스트 (1편)

### Phase 2: 집필
- [ ] content/dynamic-model-routing-series/what-is-model-routing.html 작성
- [ ] front matter + style + body 구조
- [ ] editorial-content-page + seo + prompt-driven-guide 스킬 준수

### Phase 3: 검증
- [ ] Fact Checker: 데이터 정확성 (가격, 비율, 예측 수치)
- [ ] Editor: 문체 검수 (직관성, 클리셰 탐지)
- [ ] 기술 검증: HTML, CSS, 빌드

### Phase 4: 배포
- [ ] series-nav.js 업데이트
- [ ] content-data.js 업데이트
- [ ] sitemap.xml 업데이트
- [ ] catalog.md 업데이트
- [ ] content/index.md 업데이트
- [ ] npx eleventy 빌드 확인

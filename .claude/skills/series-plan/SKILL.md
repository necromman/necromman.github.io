---
name: series-plan
description: Use this skill when planning a new content series before creating HTML pages. Trigger when the user wants to create a new series, requests research before content creation, or asks for a structured plan document. This skill defines the pre-production workflow — research, planning, and documentation that happens before any HTML content is generated.
---

# Series Plan — 시리즈 기획 워크플로우

새로운 콘텐츠 시리즈를 제작하기 전에 자료조사와 기획을 먼저 수행하는 선행 워크플로우 스킬.

## 왜 필요한가

콘텐츠를 바로 HTML로 만들면:
- 자료가 부실해지고
- 시리즈 간 논리 흐름이 끊기고
- 나중에 구조를 바꾸려면 전체를 다시 만들어야 한다

기획 문서를 먼저 만들면:
- 자료조사 결과를 한 곳에 정리할 수 있고
- 시리즈 전체 구조를 조감할 수 있고
- 콘텐츠 제작 시 기획서를 참조하면 일관성이 유지된다

## 폴더 구조

```
plans/
└── [시리즈-슬러그]/
    └── series-plan.md          # 시리즈 기획서 (자료조사 + 구성 + 디자인 노트)
```

**규칙:**
- `plans/` 폴더는 프로젝트 루트에 위치한다
- 시리즈 슬러그는 `content/` 아래 폴더명과 동일하게 맞춘다
- 기획서 파일명은 `series-plan.md`로 통일한다

## 기획서 작성 순서

### 1단계: 자료조사

웹 검색을 통해 시리즈 주제에 대한 최신 데이터를 수집한다.

**필수 수집 항목:**
- 정량 데이터 (통계, 수치, 연구 결과)
- 전문가 의견/인용
- 한국 맥락의 데이터 (글로벌만으로 부족)
- 반대 의견/반박 자료 (균형 확보)
- 출처 URL

**자료조사 원칙:**
- 2024년 이후 최신 자료를 우선한다
- 학술 논문, 공식 리포트 > 블로그, 유튜브
- 한국 데이터가 없으면 글로벌 데이터 + "한국에서는" 맥락 추가
- 하나의 주장에 반드시 근거 데이터를 붙인다

### 2단계: 기획서 작성

다음 섹션을 포함하는 `series-plan.md`를 작성한다:

```markdown
# 시리즈 기획서: [시리즈 제목]

> **시리즈 슬러그:** `[slug]`
> **시리즈 번호:** Series XX
> **기획일:** YYYY-MM-DD
> **상태:** 기획 완료 → 콘텐츠 제작 대기

## 1. 시리즈 컨셉
- 핵심 질문
- 타겟 독자
- 시리즈 톤

## 2. 자료조사 요약
- 주제별 핵심 데이터와 출처

## 3. 시리즈 구성 (N편)
- 각 편의 슬러그, 제목, 역할, 태그
- Part 구성과 핵심 데이터/인용

## 4. 디자인 노트
- 시리즈 고유 컴포넌트
- editorial-base.css 확장 필요사항

## 5. 제작 순서
- 체크리스트

## 6. 참고 자료 (출처)
- 학술/리포트, 산업 통계, 전문가 의견, 한국 데이터
```

### 3단계: 검수

기획서 작성 후 아래 항목을 확인한다:

- [ ] 각 편의 핵심 주장에 데이터 근거가 있는가
- [ ] 시리즈 전체가 논리적 흐름을 가지는가 (팩트 → 반박 → 실행 → 결론 등)
- [ ] 타겟 독자가 명확한가
- [ ] 한국 맥락의 데이터가 포함되어 있는가
- [ ] 슬러그가 영문 소문자 + 하이픈 규칙을 따르는가
- [ ] 출처 URL이 기록되어 있는가

### 4단계: 콘텐츠 제작 진입

기획서가 완성되면:
1. `editorial-content-page` + `seo` 스킬을 참조하여 HTML 제작
2. 기획서의 Part 구성과 핵심 데이터를 그대로 따른다
3. 제작 중 기획서에 없는 내용이 필요하면 기획서도 함께 업데이트

## CLAUDE.md 연동

새 시리즈의 기획이 완료되면:
1. `CLAUDE.md`의 콘텐츠 관리 섹션에 시리즈 정보 추가
2. `content/index.md` 업데이트
3. 기획서의 `상태`를 "콘텐츠 제작 중" → "완료"로 갱신

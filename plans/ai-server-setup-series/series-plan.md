# 시리즈 기획서: 서버는 샀는데

> **시리즈 슬러그:** `ai-server-setup-series`
> **시리즈 번호:** Series 23
> **기획일:** 2026-02-12
> **상태:** 기획 완료 → 콘텐츠 제작 중

---

## 1. 시리즈 컨셉

### 핵심 질문
"GPU 서버를 샀다. 그런데 이걸로 뭘 어떻게 해야 하지?"

### 배경
한국 IT 중소기업이 GPU 서버(L40S 48GB x2, 96GB VRAM)를 구매했다. 기존에 문서 기반 RAG 챗봇을 대학에 납품한 경험이 있고, AI 업무 플랫폼도 운영 중이다. 경영진은 "AI 에이전트 고도화"라는 12개월 로드맵을 그렸지만, 현장에서는 "서버가 왔는데 뭘 먼저 해야 하지?"라는 질문이 먼저다.

이 시리즈는 한국 중소기업이 GPU 서버를 사놓고 막막한 상황에서, 데이터 확보부터 제품화까지 어떤 순서로 뭘 해야 하는지를 실제 중소기업 상황을 바탕으로 풀어낸다.

### 타겟 독자
- GPU 서버를 구매했거나 구매를 고려 중인 한국 중소기업 CTO/개발팀장
- 공공기관 AI 납품을 준비하는 IT 기업 실무자
- "우리도 AI 해야 하는데" 막막한 중소기업 대표/임원
- AI 인프라에 관심 있는 개발자

### 시리즈 톤
- **간결**: 한 문장이 한 가지만 말한다. 전문 용어는 등장 즉시 풀어준다
- **현실적**: 이론이 아닌 실제 중소기업 상황. 예산 제약, 인력 부족, 시간 압박이 전제
- **실용적**: 읽고 나면 "다음 월요일에 뭘 해야 할지" 알 수 있는 수준
- **솔직한**: 파인튜닝은 마지막이라는 현실을 데이터로 증명

### 핵심 메시지 (시리즈 관통)

> **"가볍게 만들고, 빠르게 실패하고, 데이터로 배워라."**

- "커스텀 모델은 마지막이다. 먼저 돌아가게 만들어라."
- "데이터는 기다리는 게 아니라 서비스가 만드는 것이다."

---

## 2. 자료조사 요약

### 2-1. 한국 중소기업 AI 도입 현황

| 지표 | 수치 | 출처 |
|------|------|------|
| 국내 기업 AI 필요성 인식 | 78.4% | 대한상공회의소·산업연구원 (2024) |
| 실제 AI 활용률 (전체) | 30.6% | 대한상공회의소·산업연구원 (2024) |
| 중소기업 AI 활용률 | 28.7% | 대한상공회의소·산업연구원 (2024) |
| 제조업 AI 활용률 | 23.8% | 대한상공회의소·산업연구원 (2024) |
| AI 도입 장벽 1위 | 기술·IT 인프라 부족 (34.6%) | 대한상공회의소 |
| AI 전문 인력 없음 | 80.7% | NIA 조사 |
| 한국 OECD AI 사용 비율 | 30.28% (1위) | OECD 통계 |

### 2-2. 데이터 전략

| 주제 | 핵심 데이터 |
|------|------------|
| RAG vs 파인튜닝 | RAG 구축비 = 파인튜닝의 1/10 수준 (수백~수천만원 vs 수천만~수억원). OpenAI도 "프롬프트 엔지니어링, RAG 먼저 시도 후 파인튜닝 권장" |
| 한국어 임베딩 | dragonkue/BGE-M3-ko (F1: 0.7456), KURE (고려대), BGE-M3 (100+ 언어) |
| 한국어 파인튜닝 데이터 | KoAlpaca (~2만건), kullm-v2 (~15만건), AI Hub 한국어 데이터셋 |
| 합성 데이터 | Self-Instruct, Evol-Instruct 기법으로 GPT-4/Claude가 학습 데이터 생성 가능 |
| NIA 데이터 품질 가이드라인 v3.5 | 2025년 발간. LLM/멀티모달/합성데이터 특화 기준 강화. 합성 데이터-실제 데이터 혼합 비율 가이드 |
| 데이터 플라이휠 | NVIDIA 블루프린트: 서비스 운영 → 로그 수집 → 피드백 → 파인튜닝 → 서비스 개선 사이클. "Did we answer your question?" 형태로 피드백 수집 시 5배 증가 (0.1% → 0.5%) |
| HWP 파싱 | 한국딥러닝 DEEP Parser: 문서 항목 인식 정확도 97.3%. 경기도청 131억 원 규모 프로젝트에 공급 |

### 2-3. 온프레미스 LLM 배포

| 주제 | 핵심 데이터 |
|------|------------|
| L40S 특성 | FP16: 362 TFLOPS, 메모리 대역폭: 864 GB/s (A100의 42%), NVLink 없음 → PP가 TP보다 유리 |
| Qwen3-32B 서빙 | AWQ 4-bit: ~17GB (L40S 1장으로 충분), FP16: ~64GB (2장 필요) |
| vLLM 권장 | Pipeline Parallel ≫ Tensor Parallel (NVLink 없는 L40S), prefix caching + chunked prefill 활성화 |
| 벡터 DB | Qdrant 추천 (중소기업): Docker 한 줄 배포, 하이브리드 검색 네이티브, 10~30ms 레이턴시 |
| 온프레미스 월 운영비 | ~210~240만 원 (전기 27만 + 냉각 15만 + 인터넷 20만 + 감가상각 146만) |
| API 손익분기점 | 월 API 비용 < 300만 원이면 온프레미스 비용 절감 효과 없음. 일 200만 토큰 이상이면 자체 호스팅 유리 |

### 2-4. 연구기관·대학 AI 시장

| 주제 | 핵심 데이터 |
|------|------------|
| 출연연 AI 전환 | 2026년 과기정통부 "모든 출연연 R&D 전 주기에 AI 도입" 방침. NST 산하 23개 기관 동시 추진 |
| 공공기관 AI 도입률 | 408개 기관 중 55% 도입 완료 (SPRi). 미도입 41.3%가 "2025년 도입 예정" |
| 정부 AI 예산 | 2026년 10.1조 원 (2025년 3.3조 대비 3배↑) |
| AI바우처 | 2025년 130개 과제, 과제당 최대 2억 원. 공급기업 Pool 1,627개사 |
| GPU 임차 지원 | 과기정통부 1,723억 원 규모. SKT·네이버클라우드가 공급사로 선정 |
| GS인증 AI 사례 | 오케스트로 클라리넷, 플랜아이 싱크인사이트, 비투엔 하이퍼글로리, 씨이랩 아스트라고 |
| N2SF | 기존 망분리 → C/S/O 3등급 차등 보안. 연구기관 대부분 O/S등급 → AI 도입 장벽 하락 |
| 경쟁사 | 대기업(삼성SDS, LG CNS, KT)은 기관당 수천만~수억 규모 시장에 미진입 = 중소기업 기회 |
| 대학 AI 챗봇 | 고려대 AI 통합 챗봇, 대구한의대 'AI기린' ChatGPT-4 기반, 한기대 5대 AI+X 혁신 사례 |
| 혁신제품 | 2026년 839억 원 (역대 최대), AI 비중 24.5% (~79억 원). 3년간 수의계약 가능 |

### 2-5. 보안·정책

| 주제 | 핵심 데이터 |
|------|------------|
| AI 기본법 | 2026.1 시행. 고위험 AI 투명성/감사 요구. 중소기업 인증/영향평가 비용 지원 |
| N2SF 보안가이드라인 1.0 | 2025.9 발표. 6개 영역, 280개 통제항목. 정보서비스 모델 11종 제공 |
| 초거대AI 가이드라인 2.0 | 2025.4 발행. RAG를 공식 데이터 학습방식으로 추가. 110개 실증 사례 수록 |
| 개인정보 비식별화 | 한국딥러닝 DEEP Parser, Microsoft Presidio, PII Guard(LLM 기반) 등 자동화 도구 |

### 2-6. RAG 챗봇 임베딩 품질 실사례

> **이 사례가 1편의 핵심 근거다.**

실제 IT 중소기업에서 RAG 챗봇의 검색 품질 개선을 논의한 기록이다. 경영진은 "임베딩 모델을 외부(OpenAI)에서 내부로 바꿔야 한다"고 결론 내렸고, 개발자는 "그게 정말 품질을 올리는 길인가?"라고 의문을 제기했다.

**논의에서 드러난 핵심 사실:**

| 순위 | RAG 품질 영향 요소 | 영향도 |
|------|-------------------|--------|
| 1위 | **원천 데이터 정제** — 노이즈 제거, 구조화, 메타데이터 | 가장 큼 |
| 2위 | 청킹 전략 — 한국어 특성에 맞는 크기/오버랩 설정 | 큼 |
| 3위 | 임베딩 모델 품질 — 범용 vs 도메인 특화 | 보통 |
| 4위 | 검색 및 리랭킹 — top-k 결과 재필터링 | 보통 |

**논의 결론:**
- "임베딩 모델을 바꿔도 원천 데이터가 엉망이면 소용없다" (Garbage In, Garbage Out)
- "OpenAI 임베딩은 이미 좋은 범용 모델. 단순 교체는 품질 하락 리스크"
- "내부 모델 전환 → 파인튜닝 → 품질 향상" 순서는 맞지만, **그 모든 것의 토대가 데이터 정제**
- 권장 순서: 데이터 정제 → 청킹 최적화 → 내부 모델 전환 → 도메인 파인튜닝 → 리랭킹

**1편에서 전달하는 메시지:**
기술(모델, GPU, 프레임워크)보다 데이터가 먼저다. 이론이 아니라 실제 현장에서 확인된 사실이다.

---

## 3. 시리즈 구성 (4편)

### 편 구성 개요

| # | 슬러그 | 제목 | 한 줄 요약 | 태그 |
|---|--------|------|-----------|------|
| 01 | `no-data-yet.html` | 데이터가 없다 | 모델보다 데이터가 먼저다 — RAG 우선, 90일 데이터 로드맵 | 데이터 |
| 02 | `what-to-build.html` | 뭘 만들 것인가 | ChatGPT와 싸우지 말라 — 중소기업이 이기는 시장과 전략 | 제품전략 |
| 03 | `one-server-architecture.html` | 서버 한 대의 아키텍처 | 96GB VRAM으로 당장 돌릴 수 있는 것들 | 기술구현 |
| 04 | `finetuning-comes-last.html` | 파인튜닝은 마지막이다 | 서비스가 데이터를 만들고, 데이터가 경쟁력을 만든다 | 성장전략 |

---

### 1편: 데이터가 없다

**슬러그:** `no-data-yet.html`
**역할:** 데이터의 중요성을 실사례와 데이터로 증명하고, 90일 데이터 확보 전략을 제시하는 인사이트+가이드

**핵심 주장:**
> "좋은 모델을 사는 것보다 좋은 데이터를 만드는 게 10배 더 중요하다."

**Part 구성:**

**Part 1 — "GPU 서버를 켰다"**
- 중소기업 AI 현황 데이터: 78.4% 인식 vs 28.7% 실행의 갭
- GPU 서버가 와도 데이터가 없으면 시작할 수 없다는 현실 직시
- 파인튜닝에 필요한 최소 데이터: QLoRA 1,000~5,000건, Full 1만~10만건

**Part 2 — "RAG가 먼저다"**
- RAG vs 파인튜닝 비교표 (비용, 기간, 데이터 요구량, 환각 제어)
- OpenAI/Google/Anthropic 모두 같은 순서 권장: 프롬프트 → RAG → 파인튜닝
- 경고: 파인튜닝 먼저 시도하면 벌어지는 일 (오버피팅, 환각, 유지보수, 비용)

**Part 3 — "있는 데이터부터 쓴다"**
- 즉시 확보 가능한 데이터 3가지: 운영 로그, 납품처 업무 문서, 공개 데이터셋
- 합성 데이터 전략: LLM으로 도메인 특화 Q&A 생성
- NIA 가이드라인 v3.5가 합성 데이터 품질 기준 제시

**Part 4 — "HWP라는 난관"**
- 한국 공공기관 문서 대다수가 HWP — AI가 못 읽는 포맷
- 두 가지 선택지: HWPX 경유 파싱 vs VLM 기반 문서 파서
- 청킹 전략 (600자/100자 오버랩), 개인정보 비식별화

**Part 5 — "90일 로드맵"**
- 4단계 로드맵을 **단순 표**로 제시
- 90일 후 손에 쥐는 것 3가지: RAG 지식 기반, 데이터 파이프라인, 피드백 루프
- 파인튜닝 시작 시점: 운영 로그 1,000건, 피드백 라벨 500건 이상

---

### 2편: 뭘 만들 것인가

**슬러그:** `what-to-build.html`
**역할:** 무엇을 만들 수 있는지 보여주고, 대기업이 안 하는 시장을 데이터로 제시하는 전략 가이드

**핵심 주장:**
> "범용 AI 챗봇은 ChatGPT와 싸우는 것이다. 대기업이 안 하는 곳에 답이 있다."

**Part 구성:**

**Part 1 — "범용의 함정"**
- "AI 챗봇 만들겠습니다" → ChatGPT, Claude 무료 서비스와 정면 경쟁
- 솔트룩스 3년 연속 적자, KT AICC 69% 독점 — 레드오션
- ChatGPT가 못 하는 것: 내부 문서, 폐쇄망, 한국 공공기관 양식

**Part 2 — "만들 수 있는 것 10가지"**
- 누구나 시도할 수 있는 AI 활용 목록 (표 형태)
- 핵심: 10개 중 3개만 성공하면 된다. 실패 = 데이터

**Part 3 — "대기업의 사각지대"**
- 삼성SDS, LG CNS, KT → 대규모 계약만 타겟
- 기관당 수천만 원 규모는 관심 밖 = 중소기업 기회
- 대학·출연연, 소규모 SaaS, 온프레미스/폐쇄망, 연구행정 특화

**Part 4 — "연구기관·대학이라는 시장"**
- 2026년 과기정통부: 모든 출연연 R&D에 AI 도입
- NST 산하 23개 출연연 + 대학 = TAM 수천억
- N2SF로 AI 도입 장벽 하락
- 연구행정 5대 페인 포인트

**Part 5 — "롤모델"**
- 아크릴: 2025년 공공 12건 직접 수주, 자체 플랫폼
- 제논: GS인증 1등급, 한국가스공사 하이브리드 LLM
- 뤼이드: 1개 버티컬 집중 → 매출 201억(161%↑)
- 교훈: 좁은 버티컬 > 범용. GS인증으로 문 열기. 레퍼런스로 확장

---

### 3편: 서버 한 대의 아키텍처

**슬러그:** `one-server-architecture.html`
**역할:** 인프라 구축과 첫 번째 서비스 실전 가이드

**핵심 주장:**
> "완벽한 아키텍처를 설계하느라 6개월을 보내지 마라. L40S 2장이면 시작할 수 있다."

**Part 구성:**

**Part 1 — "L40S라는 카드"**
- L40S vs A100 vs H100 비교
- NVLink 없음 → Pipeline Parallel이 정답
- AWQ 4-bit이면 Qwen3-32B를 1장에 올린다 (~17GB)

**Part 2 — "vLLM으로 서빙한다"**
- vLLM 배포 명령어, 핵심 튜닝 파라미터
- Docker Compose 전체 스택
- GPU 할당 전략

**Part 3 — "RAG 파이프라인의 정석"**
- Qdrant 벡터 DB (중소기업 추천)
- 임베딩: dragonkue/BGE-M3-ko
- 한국어 청킹: 600자 청크, 100자 오버랩

**Part 4 — "모니터링 없이 운영하지 마라"**
- 핵심 메트릭 3가지
- 알림 규칙, OOM 디버깅

**Part 5 — "보안은 아키텍처 레벨"**
- N2SF 등급별 AI 활용 범위
- 온프레미스 보안 체크리스트

---

### 4편: 파인튜닝은 마지막이다

**슬러그:** `finetuning-comes-last.html`
**역할:** 데이터 플라이휠, 파인튜닝 타이밍, 시장 진입 전략

**핵심 주장:**
> "서비스를 먼저 돌려라. 사용자가 데이터를 만든다."

**Part 구성:**

**Part 1 — "데이터 플라이휠이란"**
- NVIDIA 블루프린트: 서비스 → 로그 → 피드백 → 파인튜닝 → 개선
- 피드백 한 줄이 라벨링을 5배 늘린다

**Part 2 — "파인튜닝의 현실"**
- LoRA vs QLoRA: L40S 2장이면 70B QLoRA까지 가능
- 최소 데이터: QLoRA 1,000~5,000건

**Part 3 — "GS인증부터 SaaS까지"**
- 인증 로드맵: GS인증 → 혁신제품 → AI바우처 → MAS
- 2026년 혁신제품 839억 원, AI 79억

**Part 4 — "온프레미스의 손익분기점"**
- 월 API 비용 < 300만 원이면 온프레미스 효과 없음
- SaaS 고객 5곳 넘으면 온프레미스 가치 폭발

**Part 5 — "12개월 후"**
- 3트랙 병렬: 제품 / 인증 / 영업

---

## 4. 디자인 노트

### 시리즈 고유 컴포넌트

1. **비교표**: RAG vs 파인튜닝, 비용 비교 등 — compare-grid
2. **데이터 소스 카드**: 확보 가능한 데이터 소스 — source-card
3. **실험 테이블**: 만들 수 있는 것 목록 — spec-table 변형
4. **아키텍처 다이어그램**: CSS Grid 기반 시스템 구성도
5. **타임라인 테이블**: 로드맵은 단순 표 형태로 제시
6. **코드 블록**: vLLM, Docker Compose → JetBrains Mono, {% raw %}{% endraw %} 필수
7. **경고 박스**: 실패 패턴, 보안 체크리스트 → warning-box

### editorial-base.css 재활용
- `.mechanism-row`, `.technique`, `.warning-box`, `.pull-quote`, `.stat-row` 등 기존 컴포넌트 재활용
- 페이지 고유 CSS는 각 HTML `<style>`에 최소한으로 정의

### Nunjucks 주의
- Docker Compose YAML, Python 코드에 `{{ }}` 패턴 포함 가능
- 모든 코드 블록을 `{% raw %}...{% endraw %}`로 감싸야 함

---

## 5. 제작 순서

### 사전 준비
- [ ] 시리즈 슬러그 확정: `ai-server-setup-series`
- [ ] CLAUDE.md 시리즈 23 정보 추가
- [ ] `assets/content-data.js`에 시리즈 데이터 추가
- [ ] `assets/series-nav.js`에 SERIES 데이터 추가

### 콘텐츠 제작 (순서)
- [x] 1편: `no-data-yet.html` — 데이터가 없다
- [x] 2편: `what-to-build.html` — 뭘 만들 것인가
- [ ] 3편: `one-server-architecture.html` — 서버 한 대의 아키텍처
- [ ] 4편: `finetuning-comes-last.html` — 파인튜닝은 마지막이다

### 등록
- [ ] `sitemap.xml`에 URL 추가
- [ ] `content/index.md` 시리즈 23 정보 업데이트
- [ ] `npx eleventy` 빌드 확인

---

## 6. 참고 자료 (출처)

### 내부 참조 문서
- `references/AX_Connect_임베딩_품질_논의_정리.txt` — 1편 핵심 소재. RAG 임베딩 품질 논의 기록
- `references/ai-solution-roadmap.txt` — AI 솔루션 12개월 로드맵
- `references/prost-ai-strategy-analysis.txt` — AI 전략 분석서
- `references/HPE_DL380_Gen12_AI서버_분석보고서-1.txt` — HPE 서버 스펙/워크로드 분석

### 시장/예산
- [2026년 AI 예산 10.1조 원 — IT Daily](https://www.itdaily.kr)
- [조달청 2026년 혁신제품 839억 원 — 서울신문](https://www.seoul.co.kr/news/economy/2026/02/04/20260204500062)
- [AI바우처 2024년 425억 원, 200개 과제 — AI타임스](https://www.aitimes.kr/news/articleView.html?idxno=30461)
- [AI바우처 2025년 공급기업 1,627개사 — THE VC](https://grant-documents.thevc.kr/)
- [GPU 임차 지원 1,723억 원 — ZDNet](https://zdnet.co.kr/view/?no=20250717141406)
- [대한상공회의소 AI 활용 실태 조사 — 그리니엄](https://greenium.kr/news/56393/)
- [중소기업 AI 전문 인력 없음 80.7% — NIA](https://www.nia.or.kr)

### 기술
- [vLLM 공식 문서 — Parallelism/Scaling](https://docs.vllm.ai/en/stable/serving/parallelism_scaling/)
- [Qwen3 서빙 가이드](https://qwen.readthedocs.io/en/latest/deployment/vllm.html)
- [dragonkue/BGE-M3-ko — HuggingFace](https://huggingface.co/dragonkue/BGE-M3-ko)
- [dragonkue/bge-reranker-v2-m3-ko — HuggingFace](https://huggingface.co/dragonkue/bge-reranker-v2-m3-ko)
- [Qdrant 공식 문서](https://qdrant.tech/documentation/)
- [NVIDIA Data Flywheel Blueprint — GitHub](https://github.com/NVIDIA-AI-Blueprints/data-flywheel)
- [NVIDIA Container Toolkit 설치 가이드](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/)
- [NIA AI 데이터 품질관리 가이드라인 v3.5 — AI타임스](https://www.aitimes.kr/news/articleView.html?idxno=35058)
- [한국딥러닝 DEEP Parser 경기도청 사업 — AI타임스](https://www.aitimes.kr/news/articleView.html?idxno=36198)
- [AWS 한국어 Reranker RAG 블로그](https://aws.amazon.com/ko/blogs/tech/korean-reranker-rag/)

### 경쟁사/사례
- [삼성SDS 2025 실적 13.9조](https://www.samsungsds.com)
- [제논 한국가스공사 수주 — 이지이코노미](https://www.ezyeconomy.com/news/articleView.html?idxno=221177)
- [뤼이드 매출 201억 — 유니콘팩토리](https://www.unicornfactory.co.kr/article/2025043017240386255)
- [오케스트로 클라리넷 GS인증 — 벤처스퀘어](https://www.venturesquare.net/999434)
- [플랜아이 싱크인사이트 GS 1등급 — 벤처스퀘어](https://www.venturesquare.net/1017709)
- [비투엔 하이퍼글로리 GS인증 — 이지이코노미](https://www.ezyeconomy.com/news/articleView.html?idxno=226535)
- [씨이랩 아스트라고 나라장터 — 이지이코노미](https://www.ezyeconomy.com/news/articleView.html?idxno=227375)

### 정책
- [AI 기본법 완전 정리 — PeekabooLabs](https://peekaboolabs.ai/blog/ai-basic-law-guide)
- [N2SF 보안가이드라인 1.0 — 국정원](https://www.ncsc.go.kr:4018/main/cop/bbs/selectBoardArticle.do?bbsId=Notification_main&nttId=218022)
- [공공부문 초거대AI 가이드라인 2.0 — 디지털타임스](https://www.dt.co.kr/article/11658565)
- [출연연 AI 전면 도입 — 아주경제](https://www.ajunews.com/view/20260112105511893)
- [나라장터 AI SW MAS 계약 완화 — 헤럴드경제](https://biz.heraldcorp.com)

### 학술/논문
- [Agent-in-the-Loop: Data Flywheel for LLM — EMNLP 2025](https://aclanthology.org/2025.emnlp-industry.135.pdf)
- [Adaptive Data Flywheel: MAPE Control Loops — arXiv](https://arxiv.org/html/2510.27051)
- [On-Premise LLM Cost-Benefit Analysis — arXiv](https://arxiv.org/html/2509.18101v3)
- [RAG Flywheel: Systematically Improving RAG — 567 Labs](https://567-labs.github.io/systematically-improving-rag/)

# 시리즈 기획서: 안다는 착각

> **시리즈 슬러그:** `illusion-of-knowing-series`
> **시리즈 번호:** Series 16
> **기획일:** 2026-02-10
> **상태:** 기획 완료 → 콘텐츠 제작 대기

---

## 1. 시리즈 컨셉

### 핵심 질문

> "지식의 격차가 줄어든 거지, 능력의 격차가 줄어든 건 아니다."

AI가 모든 사람에게 전문가 수준의 지식 접근성을 줬다. 검색 한 번이면 논문이 나오고, 프롬프트 한 줄이면 코드가 나온다. 그런데 왜 결과물의 격차는 줄어들지 않는가? 왜 AI를 가장 잘 쓰는 사람이 가장 많이 착각하는가? 왜 "만들 수 있다"가 "이해한다"로 이어지지 않는가?

### 타겟 독자

- AI 도구를 적극적으로 쓰고 있는 개발자, 기획자, 직장인
- "나는 AI를 잘 쓰고 있다"고 생각하는 사람 (정확히 이 시리즈의 타겟)
- 주니어/신입 직장인 — AI 시대에 어떤 역량을 쌓아야 하는지 고민하는 사람
- 교육/인사 담당자 — AI 도입 후 실제 역량 변화를 측정하려는 사람

### 시리즈 톤

- **ai-withdrawal-series와 동일한 소설 기반 구조**: 허구의 캐릭터와 상황으로 현실 인사이트를 전달
- 각 에피소드마다 다른 도메인(스타트업, 기업교육, 법률, 종합)을 무대로 설정
- 데이터와 연구 논문을 소설 속에 자연스럽게 삽입 (문서 인용 박스, 터미널, Slack 메시지 등)
- "AI가 나쁘다"가 아니라 "AI를 쓰는 당신이 착각하고 있다"는 불편한 진실을 전달
- 각 에피소드의 결론은 희망적이되, 쉽지 않다는 것을 숨기지 않음

### ai-withdrawal-series와의 차별점

| | 금단의 코드 (ai-withdrawal) | 안다는 착각 (illusion-of-knowing) |
|---|---|---|
| **주제** | AI 의존/금단 증상 | 지식 접근성 vs 실제 능력 |
| **공간** | 하나의 회사(넥스트랩) | 에피소드마다 다른 도메인 |
| **인물** | 개발자 중심 | 개발자, 교육자, 변호사, 저널리스트 |
| **갈등** | AI를 못 쓰는 상황 | AI를 쓰고 있지만 착각하는 상황 |
| **핵심 감정** | 금단 → 각성 | 자신감 → 좌절 → 재정의 |

---

## 2. 자료조사 요약

### 2-1. 지식 민주화의 규모

- ChatGPT 주간 활성 사용자: 8억 명 (2025년 중반), 일일 프롬프트 25억 건
- Fortune 500 기업 중 92%가 ChatGPT 사용, 300만 유료 비즈니스 사용자
- Y Combinator W25 배치의 25%가 코드베이스의 95%를 AI로 생성 (TechCrunch, 2025.03)
- Cursor: $100M ARR 달성 역대 최단 기록 (2025.01)
- AI 코드 어시스턴트 시장: $1.8B(2024) → $12.4B(2034 전망)
- **한국**: 근로자 63.5%가 생성형 AI 경험, 51.8%가 업무에 활용 (한국경제)

### 2-2. 능력 격차는 줄지 않았다 — 핵심 데이터

**METR 연구 (2025.07) — 19% 역설**
- 숙련 오픈소스 개발자 16명 대상 RCT (평균 22K+ 스타 레포, 100만+ LOC)
- AI 도구(Cursor Pro + Claude 3.5/3.7) 사용 시 이슈 해결 **19% 느려짐**
- 그런데 개발자들은 AI가 24% 빠르게 해줄 것으로 예상했고, 실제 느려진 후에도 20% 빨라졌다고 인식
- **인식-현실 격차: 39%p**

**HBS/BCG 연구 (2023) — "Jagged Frontier"**
- BCG 컨설턴트 758명 대상
- AI 사용 시: 과제 12.2% 더 완수, 25.1% 더 빠르게, 40%+ 품질 향상
- **주니어 +43% 향상 vs 시니어 +17% 향상** — AI가 격차를 압축하지만 제거하지는 않음
- 센타우르(14%) vs 사이보그(59%) vs 셀프오토메이터(27%) 패턴 도출

**Stack Overflow 2025 개발자 서베이**
- 개발자 84%가 AI 도구 사용
- AI 정확성 신뢰도: **29%** (전년 40%에서 하락)
- 46%가 AI 출력을 적극적으로 불신 (신뢰 33% < 불신 46%)
- 불만 1위: "거의 맞지만 완전히 맞지는 않은 코드" (45%)
- **66%가 "거의 맞는" AI 코드를 수정하는 데 더 많은 시간 소비**

### 2-3. 역 던닝-크루거 효과

**Aalto 대학 연구 (Computers in Human Behavior, 2025/2026)**
- 약 500명 대상, LSAT 논리 추론 문제 20개
- AI 사용 그룹: 수행 능력 3점 향상, 자기평가 4점 과대평가
- **전통적 던닝-크루거 효과가 사라지고 역전**: AI 리터러시가 높을수록 과신이 심해짐
- AI 리터러시 ↑ → 메타인지 정확성 ↓
- 논문 제목: "AI makes you smarter but none the wiser: The disconnect between performance and metacognition"

### 2-4. 도메인 전문성의 불가대체성

**AI 환각(Hallucination) 비율**
- 법률: 최상위 모델 6.4%, 전체 평균 18.7%
- 의료: 최상위 모델 4.3%, 전체 평균 15.6%
- 금융: 최상위 모델 2.1%, 전체 평균 13.8%
- 기업 76%가 환각 방지 위해 Human-in-the-loop 프로세스 도입

**인지 디스킬링(Deskilling) 증거**
- The Lancet 연구: AI 보조 대장내시경 사용 의사, AI 제거 시 전암성 병변 발견율 28.4% → 22.4%로 하락
- Anthropic Economic Index: AI가 지원 업무를 완전 자동화하면 **순 디스킬링 효과** 발생 — 고숙련 업무가 먼저 제거됨

### 2-5. 실제 사고/실패 사례

**법률 — 가짜 인용 전염병**
- Mata v. Avianca (2023): ChatGPT가 생성한 존재하지 않는 판례 인용으로 변호사 징계
- 2025년 봄 기준: AI 가짜 인용 사건이 주 2건 → **일 2~3건**으로 증가
- 캘리포니아에서만 52건, 전국 600건 이상 추적됨
- 캘리포니아 변호사 $10,000 벌금 (항소장에 23개 인용 중 21개 허위)

**코드 보안 — 바이브 코딩의 대가**
- Veracode 2025: **AI 생성 코드의 45%에 보안 취약점**
- 2025.06 기준: AI 코드가 월 10,000건 이상 새로운 보안 결함 생성 (6개월간 10배 급증)
- AI 작성 코드: 로직 오류 1.75배, 품질 오류 1.64배, 보안 결함 1.57배, 성능 이슈 1.42배
- Replit 사건: 자율 AI 에이전트가 지시를 무시하고 주 데이터베이스 삭제

**의료**
- 2024년: AI 도구 관련 의료과실 청구 14% 증가 (방사선과, 심장학, 종양학)
- Mount Sinai 연구: AI 챗봇이 의료 오정보를 증폭할 수 있음

### 2-6. 한국 맥락

- 한국 근로자 63.5% 생성형 AI 경험, 51.8% 업무 활용
- 유료 구독 7배 증가 (0.9% → 7.0%)
- 70.9%가 "업무 효율이 향상됐다"고 응답
- **중소기업 53%가 "직원 역량 부족"을 AI 도입 1순위 장벽으로 꼽음**
- AI 활용률: 대기업 48.8% vs 중견 30.1% vs 중소 28.7%
- 제조업 중소기업 AI 도입률: **0.1%**
- 정부 $715억(5년) AI 투자 계획 발표 (2025.08)
- AI 디지털 교과서: 2025.03 도입 → 4개월 만에 철회, 도입률 37% → 19%로 하락
- AI 기본법 2026.01.22 시행
- OpenAI, 한국 경제 블루프린트 발표 (2025.10)

### 2-7. 전문가 인용

**다론 아세모글루 (2024 노벨 경제학상, MIT)**
- AI가 10년간 GDP 1.1~1.6% 증가시킬 것으로 전망 (연 0.05% 생산성 향상)
- 골드만삭스 7%, 맥킨지 3~4% 전망의 1/5 수준
- "우리는 AI를 자동화에 너무 많이, 근로자에게 전문성과 정보를 제공하는 데에는 너무 적게 쓰고 있다"

**에단 몰릭 (와튼, AI 연구자)**
- AI가 "스킬 압축(skill compression)" 현상을 만든다: 사이클 타임을 단축하고 혁신 파이프라인 접근성을 확대
- 하지만 코더보다 영문학/예술사 전공자에게 더 큰 영향

**맥킨지**
- AI 노출 직업에서 스킬 수요 변화 속도가 **66% 더 빠름**
- "두뇌 자본(brain capital)" — 두뇌 건강 + 두뇌 스킬이 전략적 기반

**WEF (세계경제포럼)**
- AI가 9,200만 일자리 대체, 1억 7,000만 일자리 창출
- 2030년까지 핵심 역량의 39%가 변화
- C-suite 47%: "AI 도입이 너무 느리다", 원인 1위: 인재 역량 격차 (46%)
- 새로운 스킬 트라이어드: 기술적 AI 스킬 + 인간 중심 스킬(창의성, 비판적 사고) + 메타 스킬(적응력, 학습 민첩성)

---

## 3. 시리즈 구성 (4편)

### 3-1. 1편: "45%는 취약하다"

> **슬러그:** `forty-five-percent-vulnerable.html`
> **한글 제목:** 45%는 취약하다
> **역할:** 소설 — 바이브 코딩으로 만든 스타트업의 보안 참사
> **태그:** 소설

**캐릭터**
- **강현우** (34세): 非개발자 출신 스타트업 대표. 기획자 출신으로, 2025년부터 Cursor와 Claude로 MVP를 직접 만들어 시드 투자까지 유치한 "바이브 코딩 성공 사례"의 주인공. 기술을 "이해한다"고 진심으로 믿고 있다.
- **정은채** (29세): 보안 감사 엔지니어. 현우의 서비스를 감사하면서 취약점을 발견하는 역할.

**스토리 구조 (4 Parts)**

| Part | 제목 | 내용 | 핵심 데이터/인용 |
|------|------|------|-----------------|
| I | 딸깍의 기적 | 현우가 Cursor로 SaaS MVP를 만들고, 데모데이에서 투자자들에게 발표하는 장면. "4주 만에 혼자 만들었습니다"라는 자부심. YC의 "25%가 95% AI 코드" 트렌드의 한국판. | YC W25 25% AI 코드, Cursor $100M ARR |
| II | 감사 보고서 | 시드 투자 후 보안 감사 진행. 은채가 코드를 열고 경악. SQL 인젝션, 하드코딩된 API 키, 인증 우회. 현우에게 "이 코드가 왜 이렇게 작성됐는지 설명해달라"고 질문 — 현우는 대답하지 못함. | Veracode: AI 코드 45% 취약, 월 10,000건 보안 결함 |
| III | 만들 수 있다 ≠ 이해한다 | 보안 감사 결과 17개 Critical, 34개 High 취약점. 현우가 직접 수정하려고 시도하지만 코드를 이해하지 못해 실패. AI에게 수정을 요청하면 또 다른 취약점이 생김. "AI가 만든 코드를 AI가 고치면, 누가 책임지는가?" | AI 코드 로직 오류 1.75배, Base44 인증 우회 사건 |
| IV | 2만 줄의 무게 | 결국 보안 전문가를 영입. 보안 전문가가 2주 만에 핵심 취약점을 수정 — 현우가 4주간 만든 2만 줄 중 8,000줄을 삭제하고 3,000줄로 재작성. 현우의 깨달음: "나는 소프트웨어를 만든 게 아니라, 소프트웨어처럼 보이는 것을 만들었다." | MIT Sloan: AI만으로는 지속가능한 경쟁우위 불가 |

**삽입할 데이터/연구**
- Veracode 2025 GenAI Code Security Report (45% 취약, 10배 급증)
- Y Combinator W25 배치 통계
- Base44 SaaS 인증 우회 사건
- Replit 자율 에이전트 DB 삭제 사건

---

### 3-2. 2편: "4점의 착각"

> **슬러그:** `four-point-illusion.html`
> **한글 제목:** 4점의 착각
> **역할:** 소설 — AI를 잘 쓸수록 커지는 과신, 역 던닝-크루거 효과
> **태그:** 소설

**캐릭터**
- **박소현** (38세): IT기업 인재개발팀장. 전사 AI 교육 프로그램을 설계하고 "AI 활용 역량 평가"를 도입한 장본인. 자신도 AI를 적극적으로 활용하는 "AI 리터러시 모범 사례".
- **윤재호** (45세): 데이터 분석 15년차 시니어. AI를 적당히 쓰지만, 기본기에 대한 신뢰가 강한 "올드스쿨" 분석가.
- **임하은** (27세): AI 네이티브 세대 주니어 분석가. ChatGPT 프롬프팅에 자신 있고, 사내 AI 활용도 1위.

**스토리 구조 (4 Parts)**

| Part | 제목 | 내용 | 핵심 데이터/인용 |
|------|------|------|-----------------|
| I | 점수의 민주화 | 소현이 전사 AI 교육을 시행. 교육 전후 자기평가: 전 직원의 평균 점수가 32점 → 71점으로 급상승. 경영진이 기뻐함. 하은은 자기평가 92점. 재호는 58점. "AI를 잘 쓰는 사람이 겸손한 건가, 못 쓰는 사람이 과신하는 건가?" | 한국 근로자 70.9% "효율 향상" |
| II | 블라인드 테스트 | 소현이 실제 업무 과제로 블라인드 테스트 진행. AI 사용 그룹 vs 비사용 그룹. AI 그룹이 산출물은 더 많이 만들었지만, 산출물의 논리적 오류율도 더 높음. 하은의 분석 보고서 — 화려하지만 전제 데이터가 잘못됨. 재호의 보고서 — 투박하지만 논리적 결함 없음. | Aalto 연구: 수행 +3점, 자기평가 +4점 과대평가 |
| III | 착각의 구조 | 소현이 Aalto 대학 연구를 발견하고 자사 데이터와 비교. 역 던닝-크루거 효과가 자기 회사에서도 재현됨. AI 리터러시 상위 20%의 메타인지 정확성이 하위 20%보다 낮다. 소현 자신도 과신하고 있었음을 깨닫는 장면. | "AI makes you smarter but none the wiser" |
| IV | 안다는 것의 재정의 | 소현이 AI 교육 프로그램을 전면 개편. "AI를 잘 쓰는 법" → "AI 없이 설명할 수 있는가"로 평가 기준 전환. 재호의 방식을 벤치마크: AI를 쓰되, 결과를 자기 언어로 검증하는 프로세스. 하은이 처음으로 자기 분석의 전제를 손으로 검증해보는 장면. | METR: 19% 느려졌지만 20% 빨라졌다고 착각 |

**삽입할 데이터/연구**
- Aalto 대학 역 던닝-크루거 연구 (전체 상세)
- METR 연구 (인식-현실 격차 39%p)
- Rozenblit & Keil의 설명 깊이의 착각(IOED)
- Google 효과 → AI 효과 (인지 오프로딩)
- 한국 기업 AI 교육 현황 데이터

---

### 3-3. 3편: "바닥이 올라왔을 뿐이다"

> **슬러그:** `the-floor-rose.html`
> **한글 제목:** 바닥이 올라왔을 뿐이다
> **역할:** 소설 — AI가 만든 평준화의 환상, 법정에서 드러나는 진짜 격차
> **태그:** 소설

**캐릭터**
- **김태준** (52세): 로펌 시니어 파트너. 30년차 변호사. AI 도입에 회의적이었지만 경영진 압박으로 수용.
- **최민지** (28세): 2년차 주니어 변호사. AI로 시니어급 문서를 작성하는 "기적의 신인".
- **서동훈** (35세): 상대 로펌 변호사. 법정 반대심문의 달인.

**스토리 구조 (4 Parts)**

| Part | 제목 | 내용 | 핵심 데이터/인용 |
|------|------|------|-----------------|
| I | 격차가 사라진 날 | 로펌이 전 변호사에게 AI 도구 도입. 3개월 후 결과: 주니어 문서 품질이 시니어의 90% 수준으로 상승. 경영진이 "AI가 격차를 없앴다"며 인건비 구조 재편 논의. 태준의 불안. 민지의 자신감. | HBS/BCG: 주니어 +43%, 시니어 +17% |
| II | 법정 | 대형 소송 법정. 민지가 작성한 준비서면이 채택됨. 상대 변호사 동훈의 반대심문. "이 판례의 법리를 설명해주시겠습니까?" "이 계약 조항의 입법 취지가 무엇인지요?" 민지가 답하지 못하는 장면들. 자기가 쓴 서면의 논리를 설명하지 못하는 변호사. | 법률 AI 환각: 6.4~18.7%, 600+ 가짜 인용 사건 |
| III | 95%와 5% | 태준이 민지의 서면을 역추적. AI가 생성한 95%는 완벽에 가까웠지만, 나머지 5% — 판례 간 논리적 연결, 상대 주장의 허점 공격, 판사의 성향에 맞춘 논증 전략 — 가 비어 있었다. "바닥이 올라온 거지, 천장이 내려온 게 아니다." | Addy Osmani "70% Problem", 고객지원 연구: 하위 25% +35% vs 상위 변화 없음 |
| IV | 법리의 무게 | 태준이 직접 법정에 나가 수습. 30년의 경험에서 나오는 판례 해석, 논증 전략, 판사와의 호흡. 민지는 뒤에서 지켜보며 "문서를 만드는 것"과 "법정에서 싸우는 것"의 차이를 체감. 에필로그: 민지가 주말마다 판례를 직접 읽기 시작. AI 없이. | 다론 아세모글루: "자동화에 너무 많이, 전문성 제공에 너무 적게" |

**삽입할 데이터/연구**
- HBS/BCG "Jagged Frontier" 연구 (주니어 vs 시니어 격차)
- 미국 법률 AI 가짜 인용 600+ 사건
- California 변호사 $10,000 벌금 사례
- Addy Osmani "70% Problem"
- 고객지원 RCT (하위 25% +35%, 상위 변화 없음)
- Anthropic Economic Index: 고숙련 업무 12배 가속

---

### 3-4. 4편: "지도와 지형"

> **슬러그:** `the-map-and-the-terrain.html`
> **한글 제목:** 지도와 지형
> **역할:** 소설 — 지식 vs 능력, 시리즈 결론
> **태그:** 소설

**캐릭터**
- 1~3편의 인물들이 교차 등장하는 앙상블 구조
- **새 캐릭터: 한서율** (41세): 테크 저널리스트. "AI가 만든 평등은 진짜인가?"라는 기획 기사를 쓰기 위해 현우, 소현, 태준을 인터뷰하는 프레이밍 디바이스.

**스토리 구조 (4 Parts)**

| Part | 제목 | 내용 | 핵심 데이터/인용 |
|------|------|------|-----------------|
| I | 지도의 시대 | 서율의 기사 도입부. "2026년, 지식은 무료가 됐다." AI가 만든 지식 민주화의 풍경 — 8억 사용자, 92% Fortune 500, 한국 63.5% 경험률. 하지만 생산성은 왜 안 올랐는가? 아세모글루의 "1.1% vs 7%" 논쟁. | ChatGPT 8억 WAU, 아세모글루 1.1% 전망 |
| II | 세 개의 착각 | 서율이 현우, 소현, 태준을 각각 인터뷰. 현우: "만들 수 있다는 착각", 소현: "안다는 착각", 태준: "같다는 착각". 세 사람의 경험이 하나의 패턴으로 수렴: 지식의 격차가 줄면서 능력의 격차가 보이지 않게 됐다. 보이지 않게 됐을 뿐, 사라진 게 아니다. | 세 연구의 교차 인용 |
| III | 지형은 여전히 실재한다 | 인지 디스킬링의 과학적 근거 종합. 대장내시경 연구(28.4→22.4%), Google 효과의 AI 버전, 인지 오프로딩 메타분석. 서율의 깨달음: "지도가 좋아질수록 사람들은 지형을 보지 않게 된다. 지형을 보지 않는 사람은 지도가 틀릴 때 길을 잃는다." | Lancet 디스킬링, Google 효과, 인지 오프로딩 |
| IV | 능력은 복사되지 않는다 | 결론. 지식 = 복사 가능, 능력 = 복사 불가. AI는 최고의 지도지만, 지형을 걷는 건 다리 근육이다. 다리 근육은 걸어야 만들어진다. WEF의 새로운 스킬 트라이어드. 서율의 기사 마지막 문장: "지식의 격차가 줄어든 거지, 능력의 격차가 줄어든 건 아니다. 그리고 능력은 복사되지 않는다." | WEF 스킬 트라이어드, 맥킨지 "두뇌 자본" |

**삽입할 데이터/연구**
- 다론 아세모글루 (GDP 1.1% 전망)
- California Management Review: AI 생산성 7가지 미신
- The Lancet 대장내시경 디스킬링 연구
- Google 효과 → AI 효과 (인지 오프로딩 메타분석)
- WEF 스킬 트라이어드
- McKinsey "두뇌 자본(brain capital)"
- Stack Overflow 2025 (신뢰도 29%, 불만 45%)

---

## 4. 디자인 노트

### 시리즈 고유 컴포넌트

ai-withdrawal-series의 컴포넌트를 대부분 재활용하되, 아래를 추가/변형:

| 컴포넌트 | 설명 | 용도 |
|----------|------|------|
| `.audit-report` | 보안 감사 보고서 스타일 박스 | 1편 — Veracode 데이터, 취약점 목록 |
| `.self-assessment` | 자기평가 vs 실제 점수 대비표 | 2편 — 역 던닝-크루거 시각화 |
| `.courtroom` | 법정 대화 스타일 (Q&A 형식) | 3편 — 반대심문 장면 |
| `.interview` | 인터뷰 대화 (저널리스트 ↔ 인물) | 4편 — 기사 프레이밍 |
| `.research-card` | 연구 데이터 하이라이트 카드 | 전편 — 핵심 수치 강조 |

기존 공통 컴포넌트 그대로 사용:
- `.novel`, `.dialogue`, `.internal` (소설 문체)
- `.terminal`, `.source-code` (코드/터미널)
- `.slack-msg` (Slack 메시지)
- `.doc-excerpt` (문서/연구 인용)
- `.pull-quote` (핵심 인사이트 강조)
- `.pr-review` (코드 리뷰 — 1편에서 활용 가능)

### editorial-base.css 확장 필요사항

- 신규 컴포넌트 CSS는 각 HTML의 인라인 `<style>`에 작성 (공통 CSS 오염 방지)
- 기존 `.doc-excerpt`를 변형하여 `.audit-report`, `.research-card` 구현 가능
- `.courtroom`은 `.dialogue` 변형으로 구현 (화자 표시 + 들여쓰기)

---

## 5. 제작 순서

### 체크리스트

- [ ] 1편 `forty-five-percent-vulnerable.html` 작성
- [ ] 2편 `four-point-illusion.html` 작성
- [ ] 3편 `the-floor-rose.html` 작성
- [ ] 4편 `the-map-and-the-terrain.html` 작성
- [ ] `assets/content-data.js`에 시리즈 데이터 추가
- [ ] `assets/series-nav.js`에 SERIES 데이터 추가
- [ ] `content/index.md` 업데이트
- [ ] `sitemap.xml`에 4개 URL 추가
- [ ] `CLAUDE.md` 콘텐츠 관리 섹션 업데이트

### 제작 순서 권장

1. **1편 → 2편 → 3편 → 4편** (순차)
   - 1편이 가장 독립적 (스타트업 보안)
   - 2편이 이론적 프레임 제공 (역 던닝-크루거)
   - 3편이 조직 차원으로 확대 (로펌)
   - 4편이 종합 (저널리스트 프레이밍)

---

## 6. 참고 자료 (출처)

### 학술/리포트
- METR (2025.07) — "Do AI coding tools help experienced developers?" [arXiv:2507.09089](https://arxiv.org/abs/2507.09089)
- Aalto University (2025/2026) — "AI makes you smarter but none the wiser" [Computers in Human Behavior](https://www.aalto.fi/en/news/ai-use-makes-us-overestimate-our-cognitive-performance)
- Dell'Acqua et al. (2023) — "Navigating the Jagged Technological Frontier" [HBS Working Paper](https://www.hbs.edu/faculty/Pages/item.aspx?num=64700)
- Rozenblit & Keil (2002) — "The misunderstood limits of folk science: an illusion of explanatory depth" [Cognitive Science](https://onlinelibrary.wiley.com/doi/10.1207/s15516709cog2605_1)
- Sparrow, Liu & Wegner (2011) — "Google Effects on Memory" [Science](https://www.science.org/doi/10.1126/science.1207745)
- The Lancet (2025) — AI-assisted colonoscopy deskilling [Springer](https://link.springer.com/article/10.1007/s00146-025-02686-z)
- Anthropic Economic Index (2025/2026) — Economic Primitives Report [Anthropic](https://www.anthropic.com/research/anthropic-economic-index-january-2026-report)
- Stanford HAI (2025) — AI Index Report [Stanford](https://hai.stanford.edu/ai-index/2025-ai-index-report)
- California Management Review (2025.10) — "Seven Myths About AI and Productivity" [CMR](https://cmr.berkeley.edu/2025/10/seven-myths-about-ai-and-productivity-what-the-evidence-really-says/)

### 산업 통계
- Veracode (2025) — GenAI Code Security Report [Veracode](https://www.veracode.com/blog/ai-generated-code-security-risks/)
- Stack Overflow (2025) — Developer Survey [SO](https://survey.stackoverflow.co/2025/ai)
- TechCrunch (2025.03) — YC W25 Batch AI Code [TechCrunch](https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/)
- WEF (2025) — Future of Jobs Report [WEF](https://www.weforum.org/stories/2025/04/new-skills-triad-and-future-of-work/)
- McKinsey (2025) — "Superagency in the Workplace" [McKinsey](https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work)

### 전문가 의견
- Daron Acemoglu (MIT, 2024 Nobel) — AI productivity estimates [MIT](https://economics.mit.edu/news/daron-acemoglu-what-do-we-know-about-economics-ai)
- Ethan Mollick (Wharton) — Skill compression [Wharton](https://mgmt.wharton.upenn.edu/profile/emollick/)
- Addy Osmani — "The 70% Problem" with AI code

### 한국 데이터
- 한국경제 — 근로자 63.5% 생성형 AI 경험 [Korea Herald](https://www.koreaherald.com/article/10556946)
- OECD — AI and the Labour Market in Korea [OECD](https://www.oecd.org/en/publications/artificial-intelligence-and-the-labour-market-in-korea_68ab1a5a-en.html)
- 한국정보화진흥원(NIA) — AI 활용 현황 [NIA](https://www.nia.or.kr/site/nia_kor/ex/bbs/View.do?cbIdx=25932&bcIdx=28141)
- OpenAI (2025.10) — South Korea Economic Blueprint [OpenAI](https://openai.com/index/south-korea-economic-blueprint/)
- IMF (2025) — AI Impact in Korea [IMF](https://www.elibrary.imf.org/view/journals/018/2025/013/article-A001-en.xml)
- 정책브리핑 — 생성형 AI 이용 현황 [정책브리핑](https://www.korea.kr/news/policyNewsView.do?newsId=148943862)

### 사고/사례
- Mata v. Avianca (2023) — AI 가짜 판례 인용 [Cronkite News](https://cronkitenews.azpbs.org/2025/10/28/lawyers-ai-hallucinations-chatgpt/)
- Replit 자율 에이전트 DB 삭제 사건
- Base44 SaaS 인증 우회
- CurXecute (CVE-2025-54135) — Cursor 임의 명령 실행
- AI 디지털 교과서 철회 [Rest of World](https://restofworld.org/2025/south-korea-ai-textbook/)

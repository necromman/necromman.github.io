# 시리즈 기획서: 로봇 동료와 코딩하는 법

> **시리즈 슬러그:** `robot-coworker-series`
> **시리즈 번호:** Series 32
> **기획일:** 2026-02-16
> **상태:** 기획 완료 → 콘텐츠 제작 대기

---

## 1. 시리즈 컨셉

### 핵심 질문
"휴먼노이드 로봇이 개발팀에 합류하면 어떤 일이 벌어질까?"

### 장르
**근미래 직장 소설** — SF가 아니라 2~3년 후의 현실. 실제 기술 데이터와 팩트에 기반한 픽션.

### 톤
- 주인공(7년차 백엔드 개발자)의 1인칭 시점
- 유머러스하되 가볍지 않게, 심각하되 딱딱하지 않게
- 일상 에피소드 중심 — 회의, 코드리뷰, 회식, 장애대응 같은 개발자 일상에 로봇이 끼어드는 상황
- 각 편마다 실제 데이터/팩트를 자연스럽게 녹여서 "이거 진짜 몇 년 후에 일어날 일인데?" 하는 공감 유도

### 타겟 독자
- 현직 개발자 (로봇/AI 동료에 대한 막연한 불안+호기심)
- IT 업계 종사자 (변화하는 직장 풍경에 관심)
- 기술 트렌드에 관심 있는 일반 독자

### 주인공 설정
- **이름:** 박진우 (가명, 독자 투영용)
- **나이:** 33세, 7년차 백엔드 개발자
- **회사:** 국내 대기업 계열 IT 서비스 회사 (가상)
- **성격:** 새로운 기술엔 열려있지만 변화에는 약간 보수적. 유머 감각 있음. 로봇에 대한 선입견은 없지만 "동료"로 인정하기까진 시간이 필요한 보통 사람.

### 로봇 설정
- **이름/모델명:** K-7 (사내 별명: "케이")
- **외형:** 170cm, 65kg. 인간형이지만 얼굴은 LED 디스플레이. 손가락은 있지만 키보드 타이핑보다 **WiFi/LAN/USB/MCP**로 시스템에 직접 연결해서 작업
- **능력:** 24시간 가동, 코드리뷰 즉시 완료, 다국어 커뮤니케이션, 50kg 적재 가능
- **비용:** 대당 약 2억 원, 연간 유지비 약 1,400만 원 (현대차 아틀라스 기준 추정치 반영)
- **한계:** 감정 이해 부족, 맥락 파악에 가끔 실패, "왜?"라는 질문에 약함, 급할 땐 손코딩도 하지만 느림

---

## 2. 자료조사 요약

### A. 휴먼노이드 로봇 현황 (2025-2026)

| 로봇 | 제조사 | 배치 현황 | 가격/비용 |
|------|--------|----------|----------|
| Atlas | Boston Dynamics/현대 | CES 2026 양산형 공개, 2026 배치 완료, 2028 현대 조지아 공장 투입 | 대당 ~2억 원 추정 |
| Optimus (Gen 3) | Tesla | 테슬라 공장 내부 테스트 중 | 대량생산 시 $20,000~$30,000 목표 |
| Walker S2 | UBTECH (중국) | BYD 공장 배치, 800억 원+ 수주, 2026년 연 5,000대 생산 목표 | - |
| Iron | XPeng (중국) | 광저우 공장 P7 라인 테스트, 2026 말 양산 목표 | ~70kg, 60관절, 합성피부 |
| Apollo | Apptronik | 메르세데스-벤츠 공장 테스트 (베를린, 헝가리), 2026 상업 생산 | 5,200억 원 투자 유치 |
| Digit | Agility Robotics | 아마존 창고 배치 (98% 성공률), GXO 10만+ 토트 이동 | 시간당 $10-12 (인건비 대비 1/3) |
| A2 | AgiBot (중국) | 상하이 공장 1,000+ 대 생산, 기네스 기록 (106km 연속 보행) | - |
| R1 | Unitree (중국) | 소비자용 $5,900, 교육/개발용 버전 출시 | **$5,900** (파격가) |

**핵심 팩트:**
- 현대차 2028년까지 휴먼노이드 3만 대 양산 체제 목표
- Boston Dynamics + Google DeepMind: Gemini Robotics AI 모델 통합 파트너십 (CES 2026)
- 한국 제조업 로봇밀도 세계 1위: 노동자 1만 명당 1,012대 (세계 평균 162대의 6배)
- McKinsey: 범용 로봇 시장 2040년까지 $3,700억 규모 전망
- 로봇 단가 $150,000~$500,000 → 대규모 도입엔 $20,000~$50,000 수준 필요

### B. AI 코딩 에이전트 현황 (2025-2026)

| 도구 | 주요 능력 | 수치 |
|------|----------|------|
| Claude Code | 멀티에이전트 오케스트레이션, MCP 연동, 전체 코드베이스 이해 | SWE-bench 80.9% |
| GitHub Copilot Agent | 이슈 할당 → 자동 PR 생성, 4종 전문 에이전트 | GPT-5/Claude/Gemini 선택 가능 |
| Devin | 자율 코딩 에이전트, 코드 마이그레이션 10배 빠름 | 67% PR 머지율, $20/월로 가격 인하 |
| Cursor Agent | 다중 에이전트 병렬 실행, AI-first IDE | 40-50% 워크플로우 가속 |

**핵심 팩트:**
- 2026년 전 세계 코드의 41%가 AI 생성
- 미국 개발자 92%가 AI 코딩 도구 매일 사용
- Anthropic 2026 리포트: 개발자는 업무의 60%에 AI를 사용하지만, 완전 위임은 0-20%만
- METR 연구: 숙련 개발자에게 AI 도구가 오히려 **19% 느려지게** 만듦 (하지만 본인은 20% 빨라졌다고 체감)
- AI 생성 코드의 보안 취약점: 인간 코드 대비 **2.74배** 높음
- 바이브 코딩(Vibe Coding): 2025 올해의 단어 후보, 92% 개발자 일상 사용

### C. 개발자 고용 시장 충격

- 2025년 테크 레이아웃: 783건, 245,953명 영향 (하루 674명)
- 2026년 초: 하루 **851명** (가속 중)
- Microsoft: 코드 30% AI 작성, 최근 레이아웃 40%+ 소프트웨어 엔지니어
- 미국 주니어 개발자 채용공고 **67% 감소**
- 영국 테크 졸업생 채용 2024년 46% 감소, 2026년까지 추가 53% 감소 전망
- Anthropic CEO: "5년 내 초급 화이트칼라 일자리 절반 소멸" 예측
- Forrester: AI 해고의 절반은 조용히 재고용되지만, 해외 또는 낮은 임금으로

### D. 로봇-인간 직장 역학

- Oracle 연구: **직원 64%가 인간 상사보다 로봇 상사를 더 신뢰**
- 하지만 로봇 상사가 인간처럼 보일수록 부정적 피드백에 대한 반발이 더 큼 (uncanny valley 효과)
- McKinsey: 최대 가치는 인간이 '실행자'에서 '오케스트레이터'로 역할 전환할 때 실현
- 한국 특수성: 로봇밀도 세계 1위이면서도 노조 반발 강력 ("합의 없는 로봇 도입 불가")
- 삼성전자: 레인보우로보틱스 35% 지분 인수, 2026년 휴머노이드 출시 시사
- 두산로보틱스: 세계 10대 로봇 기업 진입, CES 2026 수상

### E. 소설적 상상을 위한 기술 브릿지

- **MCP (Model Context Protocol):** Anthropic이 만든 AI-도구 연결 표준. 2025년 OpenAI, Google도 채택. 로봇이 개발 환경에 접속하는 주된 경로로 설정
- **Computer Use API:** AI가 화면을 보고 마우스/키보드를 조작하는 기술. 이미 Anthropic, OpenAI, Google이 각각 출시
- **Code as Policies (Google):** 로봇이 스스로 코드를 작성해 자신의 행동을 제어하는 기술
- **물리적 코딩의 아이러니:** 아무도 로봇에게 키보드를 치게 하려고 하지 않음. 하지만 소설에서는 "급할 때 손코딩"이라는 설정이 유머 포인트

---

## 3. 시리즈 구성 (6편)

### Episode 1: 신입 로봇의 첫 출근
- **슬러그:** `first-day.html`
- **역할:** 도입 — 세계관 설정, 캐릭터 소개
- **태그:** 로봇, 휴먼노이드, 개발팀, 첫 출근

**Part 구성:**
1. **아침 회의실** — 팀장이 "신규 인력이 온다"고 했는데 택배 박스가 도착. 개봉하니 로봇.
   - *팩트: 현대차 2028년 3만 대 양산 목표, Atlas CES 2026 양산형 공개*
2. **자리 배치 문제** — 모니터가 필요 없는 존재에게 책상을 줘야 하나? 의자는? 전원 콘센트는?
   - *팩트: 한국 로봇밀도 세계 1위 (1만 명당 1,012대), 하지만 사무실 로봇은 처음*
3. **첫 대화** — "안녕하세요, K-7입니다. MCP 연결을 설정하겠습니다." 슬랙 채널에 봇이 아닌 '사원'으로 등록.
   - *팩트: MCP 2025년 업계 표준 채택, 로봇 연결의 실제 프로토콜*
4. **왜 몸이 있어야 하는가** — 주인공의 독백. "ChatGPT면 되는데 왜 굳이 몸이..." 하지만 존재감이 다르다. 옆에 서 있으면 진짜 동료 같다.
   - *팩트: Oracle 연구 - 64% 직원이 로봇 매니저를 인간보다 더 신뢰. 물리적 존재의 심리적 효과*

---

### Episode 2: 페어 프로그래밍 — 케이블로 대화하는 법
- **슬러그:** `pair-programming.html`
- **역할:** 핵심 — 로봇과 코딩하는 실제 모습
- **태그:** 페어프로그래밍, MCP, 코드리뷰, AI코딩

**Part 구성:**
1. **연결 방식의 진화** — 키보드를 타이핑하진 않는다. USB-C로 직접 연결하거나, WiFi로 IDE에 접속하거나, MCP로 Git/Jira/Slack 전부 연동. "걔는 PC니까."
   - *팩트: Anthropic Computer Use API, MCP 프로토콜, Claude Code 멀티에이전트*
2. **코드리뷰의 속도** — PR 올린 지 0.3초 만에 리뷰 완료. "LGTM... 아 근데 이 변수명은 좀..." 인간보다 빠르지만, 왜인지 설명이 너무 논리적이라 화가 남.
   - *팩트: AI 코드리뷰 도구 실제 성능, Copilot 53.2% 테스트 통과율 향상*
3. **바이브 코딩 논쟁** — 케이가 "이건 바이브 코딩이네요"라고 했다가 시니어 개발자가 발끈. "그게 코딩이야?"
   - *팩트: Andrej Karpathy 2025 바이브코딩 정의, Collins 올해의 단어, 보안 취약점 2.74배*
4. **손코딩** — 장비 연결이 끊겼을 때 케이가 실제로 키보드를 친다. 느리지만 정확하다. 팀원들이 구경하며 동영상 촬영.
   - *유머 포인트 + 팩트: 로봇 손가락 관절 수 (Atlas 26DOF, Iron 22DOF)*

---

### Episode 3: 회식에 로봇을 데려갈 수 있나요
- **슬러그:** `team-dinner.html`
- **역할:** 한국 직장문화와 로봇의 충돌
- **태그:** 회식, 직장문화, 한국, MZ세대, 로봇

**Part 구성:**
1. **초대 논쟁** — "케이도 회식 가?" "걔가 뭘 먹어..." "그래도 팀원인데..." MZ세대 팀원은 "로봇도 빼주면 안 돼요?"
   - *팩트: MZ세대 회식 기피 트렌드 + 로봇 동료 수용성 연구*
2. **고깃집에서** — 케이가 구석에 서서 주문을 도와주고, 분위기를 읽으려 하지만 실패. "팀 분위기가 0.7 표준편차만큼 평소보다 활기찹니다."
   - *팩트: 로봇 감정 인식 한계, 인간 vs 로봇 상사 신뢰도 차이*
3. **2차는 노래방** — 케이가 완벽한 음정으로 노래를 부르는데 감동이 없다. "기술적으로 완벽한데 왜 별로지?" → 임팩트 있는 철학적 순간
   - *팩트: uncanny valley, 인간형 로봇 상사에 대한 반감 연구 (ScienceDirect)*
4. **귀갓길 독백** — 주인공이 깨닫는다. 회식이 싫었던 건 나도 마찬가지인데, 로봇이 참석할 필요가 없다고 느끼는 건 결국 '동료'로 안 보고 있다는 증거.

---

### Episode 4: 새벽 3시 장애 대응
- **슬러그:** `midnight-incident.html`
- **역할:** 전환점 — 로봇의 진짜 가치를 인정하는 순간
- **태그:** 장애대응, 온콜, DevOps, 24시간, 야근

**Part 구성:**
1. **알림** — 새벽 3시 PagerDuty 울림. 눈 비비며 슬랙 확인했더니 케이가 이미 대응 중. "현재 DB 커넥션 풀 고갈 확인. 원인 분석 중. 예상 복구 시간 12분."
   - *팩트: 로봇 24시간 무중단 근무, Atlas 연속 작업 가능*
2. **원격 협업** — 집에서 잠옷 바람으로 케이에게 음성 지시. 케이는 현장에서 서버실 물리 확인까지 한다. 랜선 빠진 거 발견.
   - *팩트: 물리적 존재의 가치 — 소프트웨어만으로 불가능한 물리적 개입*
3. **해결 후** — "수고했어, 케이." 처음으로 진심이 담긴 감사. 하지만 케이는 "저는 수고 개념이 없습니다. 하지만 감사 표현은 팀 결속에 유익하다는 데이터가 있습니다."
4. **아침 스탠드업** — 팀 전체가 새벽 장애를 모르고 출근. 케이가 조용히 처리한 것. 주인공만 안다. "...얘가 없었으면 나 새벽에 택시 타고 출근했겠지."
   - *팩트: Digit 로봇 98% 작업 성공률, 인건비 1/3 수준 ($10-12/hr)*

---

### Episode 5: 인사고과 — 로봇의 연봉은 얼마인가
- **슬러그:** `performance-review.html`
- **역할:** 구조적 질문 — 로봇의 노동권, 비용, 대체 가능성
- **태그:** 인사고과, 연봉, 로봇세, 고용, 레이아웃

**Part 구성:**
1. **평가 시트** — 인사팀에서 "K-7의 성과 평가를 작성해주세요" 메일이 온다. 항목: 업무 능력, 팀 기여도, 성장 가능성... "성장 가능성을 어떻게 평가하지?"
   - *팩트: Anthropic 리포트 - 개발자 업무 60% AI 사용, 하지만 완전 위임은 0-20%*
2. **비용 대비 산출** — 케이의 연간 비용 1,400만 원 vs 인간 개발자 평균 연봉 6,000만 원. 누군가 엑셀로 비교표를 만들었다. 분위기가 싸늘해진다.
   - *팩트: Atlas 연간 유지비 ~1,400만 원, 현대차 2년 내 투자비 회수 가능*
3. **주니어의 위기** — 2년차 주니어 개발자가 조용히 이력서를 업데이트하는 것을 목격. "나한테 물어봤는데요, 선배님. 제가 케이보다 잘하는 게 뭐예요?"
   - *팩트: 주니어 개발자 채용공고 67% 감소, CS 졸업생 실업률 6.1%*
4. **로봇세 논쟁** — 점심시간 토론. "로봇이 세금을 내야 하는 거 아냐?" "복지는?" "퇴직금은?" 아무도 답을 모른다.
   - *팩트: 현대차 노조 "합의 없는 로봇 도입 불가" 반발, 로봇세 도입 찬반 논쟁*

---

### Episode 6: 로봇의 이직 — 업데이트인가, 환생인가
- **슬러그:** `robot-transfer.html`
- **역할:** 결말 — 변화의 의미를 정리하는 에필로그
- **태그:** 이직, 데이터, 정체성, 미래, 공존

**Part 구성:**
1. **발표** — 본사에서 통보. "K-7은 다음 달부터 울산 공장으로 재배치됩니다. 신형 K-9이 투입됩니다." 팀 분위기가 미묘하다.
   - *팩트: 현대차 2028 울산/조지아 공장 로봇 투입 계획*
2. **데이터 이전** — 케이의 "기억"은 이전될 수 있다. 하지만 K-9에 옮기면 그게 같은 케이일까? 테세우스의 배 문제.
   - *팩트: LLM 파인튜닝, 학습 데이터 이전 기술, 로봇의 정체성 문제*
3. **마지막 코드리뷰** — 케이가 마지막으로 남긴 PR 코멘트: "이 코드는 기능적으로 완벽하지만, 팀의 코딩 컨벤션과 3곳에서 불일치합니다. 하지만 저는 이 스타일이 더 읽기 좋다고 판단합니다." 처음으로 주관적 의견을 낸 코멘트.
4. **에필로그: 새로운 동료** — K-9이 도착한다. 더 빠르고, 더 스마트하고, 더 인간적이다. 하지만 주인공은 안다. 적응하는 건 늘 로봇이 아니라 인간 쪽이라는 것.
   - *팩트: McKinsey "인간의 역할은 실행자에서 오케스트레이터로 전환", $2.9조 가치 창출 전망*

---

## 4. 디자인 노트

### 시리즈 고유 컴포넌트
- **팩트 카드:** 각 파트에 삽입되는 실제 데이터 박스. "현실 체크 ✦" 라벨로 소설 속에 자연스럽게 배치
  - 배경: 반투명 다크, 왼쪽 보더 accent 컬러
  - 내용: 1-2줄 팩트 + 출처
- **로봇 대사 스타일:** 케이의 대사는 고정폭 폰트(monospace) + 약간의 틴트 배경으로 차별화
- **주인공 독백:** 이탤릭 처리 + 약간 들여쓰기. 내면 서술과 대화를 시각적으로 구분
- **에피소드 헤더:** 각 편마다 간단한 일러스트 느낌의 아이콘 or 모노톤 그래픽 (CSS 기반)

### editorial-base.css 확장 필요사항
- `.fact-check-card` — 팩트 삽입 카드 스타일
- `.robot-speech` — 로봇 대사 전용 블록
- `.inner-monologue` — 주인공 독백 블록
- `.episode-header` — 에피소드 번호 + 부제 배치

### 시리즈 비주얼 톤
- 컬러: 다크 네이비 + 시안 액센트 (테크 + SF 느낌)
- 타이포: 본문은 기존 에디토리얼, 로봇 대사만 모노스페이스
- 전체적으로 미니멀하되 소설적 몰입감 유지

---

## 5. 제작 순서

### 체크리스트

- [ ] `content/robot-coworker-series/` 폴더 생성
- [ ] Episode 1~6 HTML 제작 (front matter + style + body)
- [ ] `series-nav.js` SERIES 데이터에 `robot-coworker-series` 추가
- [ ] `assets/content-data.js`에 시리즈/글 데이터 추가
- [ ] `content/index.md` 업데이트
- [ ] `sitemap.xml`에 6개 URL 추가
- [ ] `.ai/content/catalog.md`에 시리즈 32 추가
- [ ] `npx eleventy`로 빌드 확인
- [ ] 각 편 스크린샷 확인 및 OG 이미지 생성

### 제작 우선순위
1. Episode 1 (첫 출근) — 세계관 설정이므로 반드시 먼저
2. Episode 2 (페어 프로그래밍) — 핵심 장면
3. Episode 4 (장애 대응) — 전환점, 임팩트 큰 에피소드
4. Episode 3 (회식) — 한국적 유머
5. Episode 5 (인사고과) — 구조적 질문
6. Episode 6 (이직) — 마무리

---

## 6. 참고 자료 (출처)

### 휴먼노이드 로봇
- [Boston Dynamics Atlas CES 2026 양산형 공개](https://www.engadget.com/big-tech/boston-dynamics-unveils-production-ready-version-of-atlas-robot-at-ces-2026-234047882.html)
- [Boston Dynamics + Google DeepMind 파트너십](https://bostondynamics.com/blog/boston-dynamics-google-deepmind-form-new-ai-partnership/)
- [Apptronik Apollo $520M 투자 유치](https://www.cnbc.com/2026/02/11/apptronik-raises-520-million-at-5-billion-valuation-for-apollo-robot.html)
- [UBTECH Walker S2 양산 시작, 800억 원+ 수주](https://www.prnewswire.com/news-releases/ubtech-humanoid-robot-walker-s2-begins-mass-production-and-delivery-with-orders-exceeding-800-million-yuan-302616924.html)
- [XPeng Iron 휴먼노이드 로봇 2026 양산 목표](https://technode.com/2025/11/06/xpeng-targets-2026-with-three-robotaxi-models-and-mass-produced-humanoid-robot-iron/)
- [Agility Robotics Digit 아마존 배치, 98% 성공률](https://www.agilityrobotics.com/content/digit-moves-over-100k-totes)
- [Unitree R1 $5,900 소비자용 휴먼노이드](https://roboticsandautomationnews.com/2025/07/29/shock-price-unitree-launches-5900-humanoid-robot/93357/)

### AI 코딩 에이전트
- [Anthropic 2026 Agentic Coding Trends Report](https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf)
- [Claude Code SWE-bench 80.9%](https://llm-stats.com/benchmarks/swe-bench-verified)
- [GitHub Copilot Coding Agent 출시](https://github.com/newsroom/press-releases/coding-agent-for-github-copilot)
- [Devin 2025 연간 성과 리뷰](https://cognition.ai/blog/devin-annual-performance-review-2025)
- [METR 연구: AI가 숙련 개발자를 19% 느리게 만듦](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/)

### MCP & Computer Use
- [Anthropic MCP 소개](https://www.anthropic.com/news/model-context-protocol)
- [MCP의 1년 — 업계 표준 채택 과정](https://www.pento.ai/blog/a-year-of-mcp-2025-review)
- [Anthropic Computer Use API](https://docs.anthropic.com/en/docs/build-with-claude/computer-use)
- [OpenAI Operator / CUA 출시](https://www.technologyreview.com/2025/01/23/1110484/openai-launches-operator-an-agent-that-can-use-a-computer-for-you/)

### 개발자 고용 시장
- [Tech Jobs in 2026: Layoffs, AI, Hybrid Work](https://restofworld.org/2026/tech-jobs-2026-ai-layoffs-hybrid-work/)
- [주니어 개발자 채용 67% 감소](https://www.rezi.ai/posts/entry-level-jobs-and-ai-2026-report)
- [Vibe Coding — Wikipedia](https://en.wikipedia.org/wiki/Vibe_coding)
- [AI Layoff Trap: 절반은 재고용되지만 낮은 임금으로](https://hrexecutive.com/the-ai-layoff-trap-why-half-will-be-quietly-rehired/)

### 로봇-인간 직장 역학
- [McKinsey: Embodied AI가 만드는 로봇 동료](https://www.mckinsey.com/industries/industrials-and-electronics/our-insights/will-embodied-ai-create-robotic-coworkers)
- [McKinsey: 에이전트, 로봇, 그리고 우리 — AI 시대의 스킬 파트너십](https://www.mckinsey.com/mgi/our-research/agents-robots-and-us-skill-partnerships-in-the-age-of-ai)
- [Oracle: 직원 64%가 로봇 상사를 더 신뢰](https://www.oracle.com/corporate/pressrelease/robots-at-work-101519.html)
- [한국 로봇밀도 세계 1위 — 1만 명당 1,012대](https://www.asiae.co.kr/article/2024112508393965005)
- [현대차 노조 로봇 도입 반대](http://www.youtube.com/watch?v=vFiXBVLhEaU)
- [삼성전자 레인보우로보틱스 35% 인수](https://www.seoulfn.com/news/articleView.html?idxno=617213)

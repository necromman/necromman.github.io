# 시리즈 기획서: 대표님의 미래먹거리

> **시리즈 슬러그:** `future-cashcow-series`
> **시리즈 번호:** Series 17
> **기획일:** 2026-02-10
> **상태:** 기획 완료 → 콘텐츠 제작 대기

---

## 1. 시리즈 컨셉

### 핵심 질문
> 예산 0원, 월급 250만원, 겸직 5개. AI 시대에 중소기업 개발자가 정말 무언가를 만들 수 있을까?

### 타겟 독자
- 중소기업에서 일하는 (또는 일했던) IT 직군 전체
- AI/바이브코딩에 관심은 있지만 비용 때문에 망설이는 사람
- "좋좋소", "좋코딩"에 공감했던 직장인
- 사이드 프로젝트/창업에 꿈이 있는 개발자

### 시리즈 톤
- **하이퍼 리얼리즘 + 블랙 유머**: 좋좋소/좋코딩 스타일. 웃기지만 슬프고, 슬프지만 웃긴다
- **코드가 서사의 일부**: 교육용이 아니라 스토리 전개 수단으로 코드가 등장
- **숫자 대비법**: "월급 250만원. Claude Max 29만원. 월급의 11.6%." 식의 건조한 유머
- **자조적 내면 독백**: 감정을 설명하지 않고 행동/감각으로 보여준다
- **현실적 해피엔딩**: 투자 직전까지. 성공 여부는 열린 결말

### 주인공 프로필
- **이름**: 한도현 (34세, 남)
- **직함**: 개발팀장 (팀원 0명)
- **실제 업무**: 풀스택 개발 + 서버 관리 + PC 수리 + ERP 관리 + 인사/총무 보조 + 대표 아이디어 구현
- **연봉**: 3,800만원 (세후 월 약 268만원, 중소기업 4년차 평균)
- **성격**: 꿈은 있지만 능력은 보통. 약간 게으르지만 탐구심이 있다. 유튜브로 대리만족하는 타입
- **AI 도구**: GitHub Copilot Free (월 2,000 완성) + Cody Free + 유튜브 시청
- **꿈**: 직접 만든 서비스로 독립. 하지만 매달 250만원짜리 현실에 묶여 있다

### 회사 프로필
- **사명**: (주)넥스트비전 (대표가 지은 거창한 이름)
- **실체**: 직원 12명, SI 하청 + 자체 ERP 유지보수
- **매출**: 연 8억 (대부분 SI 매출)
- **대표**: 김영수 (55세). 매달 새로운 사업 아이디어. "미래먹거리", "AI 시대", "우리도 플랫폼" 키워드 남발
- **AI 예산**: 0원 (대표가 "AI는 무료 아니야?"라고 물어본 적 있음)

---

## 2. 자료조사 요약

### 2-1. 한국 중소기업 개발자 현실

| 데이터 | 수치 | 출처 |
|--------|------|------|
| 한국 기업 중 중소기업 비율 | 99.9% | 중기부 |
| 중소기업 고용 비중 | 81~83% | 중기부 |
| 중소 신입 개발자 연봉 | 2,500~3,500만원 | 점핏 2025 |
| 대기업 신입 개발자 연봉 | 6,000~7,500만원 | 그룹바이 |
| 대기업-중소 평균 연봉 격차 | 2,694만원 (1.6배) | 경총 2024 |
| 4년차 중소 연봉 | ~3,800만원 | 점핏 2025 |
| 중소기업 IT직원 겸직 | 코딩+서버+PC수리+ERP+기획 | 일반적 현실 |

### 2-2. AI 도입 현실

| 데이터 | 수치 | 출처 |
|--------|------|------|
| 중소기업 AI 활용률 | 28.7% | 대한상의 |
| 제조 중소기업 AI 도입률 | 0.1% | NIA 2025 |
| AI 준비 완료 국내 기업 | 3% | 시스코 |
| AI 도입 후 "변화 없음" | 다수 응답 | NIA |
| 2026 기업 85% 생성형AI 도입 전망 | - | CIO |

### 2-3. AI 코딩 도구 비용

| 도구 | 월 비용 | 월급 대비 (250만원 기준) |
|------|---------|----------------------|
| GitHub Copilot Free | $0 | 0% |
| GitHub Copilot Pro | $10 (~14,500원) | 0.6% |
| Cursor Pro / Claude Pro | $20 (~29,000원) | 1.2% |
| Claude Max 5x | $100 (~145,000원) | 5.8% |
| Claude Max 20x | $200 (~290,000원) | 11.6% |

### 2-4. 무료/저가 MVP 스택

| 항목 | 도구 | 비용 |
|------|------|------|
| 프론트엔드 | Next.js + Vercel/Netlify Free | $0 |
| 백엔드/DB | Supabase Free (500MB) | $0 |
| AI API | OpenRouter 무료 모델 / DeepSeek $5 | $0~5 |
| 코딩 도구 | Copilot Free + Cody Free + Cline | $0 |
| **합계** | | **$0~5/월** |

### 2-5. 스타트업 투자 현실

| 데이터 | 수치 | 출처 |
|--------|------|------|
| 2025년 투자 건수 | 1,155건 (전년 -33%) | THE VC |
| 시드 투자 규모 | 1~5억원 | ZUZU |
| 시리즈A 투자 규모 | 5~50억원 | ZUZU |
| 일반 신생기업 5년 생존율 | 34.7% | 중기부 |
| AI 스타트업 3년 생존율 | 56.2% | 한국경제 |
| 죽음의 계곡 (시드→시리즈A) | 대다수 기업 탈락 | 업계 공통 |

### 2-6. 콘텐츠 트렌드

| 데이터 | 수치 | 출처 |
|--------|------|------|
| 좋좋소 누적 조회수 | 5,300만+ | 한국경제 |
| 좋코딩 누적 조회수 | 300만+ (SNS 통합) | 머니투데이 |
| 좋좋소 칸 시리즈 페스티벌 | 비경쟁 부문 초청 | 나무위키 |
| 중소기업 직장인 비율 | 81~83% (공감 기반) | 중기부 |

---

## 3. 시리즈 구성 (5편)

### Episode 01: 대표님, 그건 ChatGPT가 아닙니다

- **슬러그**: `boss-wants-ai.html`
- **역할**: 도입 — 인물 소개, 회사 환경, 대표의 AI 욕구 폭발
- **태그**: `소설`

**Part 구성:**

| Part | 제목 | 핵심 내용 |
|------|------|-----------|
| I | "개발팀장 (팀원 0명)" | 한도현의 하루: 09:00 출근 → ERP 오류 처리 → PC 수리 → 인사서류 → 코딩은 18시 이후. char-intro로 인물 소개 |
| II | "미래먹거리" | 월요 조회. 대표가 주말에 유튜브 본 AI 영상 링크를 카톡으로 폭격. "우리도 AI 해야 돼. 다들 한다며?" AI 준비 완료 기업 3%인데 대표는 97%는 무시 |
| III | "ChatGPT는 AI가 아닙니다" | 도현이 대표에게 AI 제품과 ChatGPT 차이를 설명하려다 좌절. 대표: "그거 있잖아 그 뭐시기 챗봇 같은 거. 우리 고객 상담도 그렇게 하면 되잖아" |
| IV | "결국 하게 됩니다" | 퇴근 후 유튜브에서 "바이브코딩으로 SaaS 만들기" 영상을 보는 도현. Claude Max $200 영상 보면서 한숨. 무료 도구 목록을 메모장에 정리하기 시작 |

**핵심 코드/UI:**
- `.slack-msg` — 대표 카톡 메시지 (AI 유튜브 링크 폭격)
- `.terminal` — ERP 서버 에러 로그 (도현의 일상)
- `.source-code` — 도현이 유지보수하는 레거시 jQuery 코드

**핵심 데이터 인용:**
- 중소기업 AI 활용률 28.7%, AI 준비 완료 기업 3%
- 중소기업 개발자 4년차 연봉 3,800만원
- Claude Max $200 = 월급의 11.6%

---

### Episode 02: 월급의 1.2%

- **슬러그**: `one-point-two-percent.html`
- **역할**: 갈등 심화 — AI 도구 비용 현실, 무료 도구 탐색, 유튜브 대리만족
- **태그**: `소설`

**Part 구성:**

| Part | 제목 | 핵심 내용 |
|------|------|-----------|
| I | "장바구니" | 도현의 AI 도구 장바구니: Cursor $20 + Claude Pro $20 + Copilot Pro $10. 합계 $50/월 = 72,500원. 월급의 2.9%. "이 정도면... 아 안 되겠다." 결국 무료 조합으로 결정 |
| II | "무료의 대가" | GitHub Copilot Free 세팅. 월 2,000 자동완성의 현실. 하루 65개. "65번의 Tab 키. 나의 하루 코딩이 65번의 Tab으로 정의된다." Cody Free + OpenRouter 무료모델 추가 |
| III | "유튜브 대학" | 밤 11시, 도현의 유튜브 시청 기록: "Cursor로 1시간 만에 SaaS 만들기", "Claude Code로 풀스택 앱 빌드", "바이브코딩 월 천만원 매출". 영상 속 세계와 자기 세계의 괴리. Ollama 로컬 모델을 시도하지만 회사 PC의 8GB VRAM으로는 7B 모델이 한계 |
| IV | "29,000원의 결심" | 한 달 고민 끝에 Claude Pro $20 결제. 개인 카드. 회사에서 쓸 도구를 개인 돈으로 산다는 자괴감. 하지만 첫 사용에서 레거시 코드 리팩토링이 30분 만에 끝남. "이게 월급의 1.2%구나" |

**핵심 코드/UI:**
- `.pricing-table` — AI 도구 가격 비교표 (커스텀 컴포넌트)
- `.youtube-card` — 유튜브 영상 카드 (제목 + 조회수 + 도현의 내면 독백)
- `.terminal` — Ollama 설치 + 모델 다운로드 과정
- `.source-code` — Claude Pro로 리팩토링한 Before/After 코드

**핵심 데이터 인용:**
- Copilot Free 월 2,000 자동완성 + 50 채팅
- Cody Free rate limit
- Claude Pro $20 = 29,000원 = 월급의 1.2%
- Ollama 7B 모델 VRAM 5GB, 16B는 10GB 필요
- Y Combinator 2025 겨울 배치 25%가 코드의 95%를 AI 생성

---

### Episode 03: Supabase 무료 티어의 500MB

- **슬러그**: `five-hundred-megabytes.html`
- **역할**: 전환점 — 실제 MVP 개발 시작, 코드 중심 에피소드
- **태그**: `소설`

**Part 구성:**

| Part | 제목 | 핵심 내용 |
|------|------|-----------|
| I | "요구사항" | 대표의 요구사항 정리: ① 고객 상담 AI 챗봇 ② 견적서 자동 생성 ③ 매출 대시보드 ④ "그리고 앱도 있으면 좋겠는데". 도현이 "그나마 쓸만한 것" 하나를 건짐: AI 견적서 자동화 |
| II | "0원 스택" | 기술 스택 선정: Next.js + Supabase Free + OpenRouter 무료모델 + Netlify Free. 총 비용 $0. Supabase 무료 티어: 500MB DB, 5만 MAU, 2개 프로젝트, 7일 미사용 시 일시정지. "500MB. 우리 회사 고객 데이터가 들어갈까?" |
| III | "새벽 2시의 커밋" | 퇴근 후 자정~새벽 2시 코딩 루틴. Claude Pro + Cline으로 API 구축. DeepSeek V3.2 API $5 충전. 견적 자동 생성 로직, Supabase RLS 설정, 프론트엔드 UI. 코드가 서사의 중심 |
| IV | "It works" | 2주 뒤, 첫 동작 확인. "견적 항목을 입력하면 AI가 표준 문구를 생성하고, PDF로 변환해서 이메일 발송." 대표에게 데모. 대표: "오 이거 괜찮은데? 근데 앱은?" |

**핵심 코드/UI:**
- `.source-code` — Next.js API Route (OpenRouter 연동, 견적 생성)
- `.source-code` — Supabase 테이블 스키마 + RLS 정책
- `.source-code` — 프론트엔드 폼 → AI 응답 → PDF 변환 플로우
- `.terminal` — `npx create-next-app`, Supabase CLI, 배포 로그
- `.ai-voice` — Claude/AI의 코드 제안과 도현의 수정

**핵심 데이터 인용:**
- Supabase Free: 500MB DB, 5만 MAU, 7일 비활성 시 일시정지
- Netlify Free: 100GB 대역폭, 상업용 가능
- DeepSeek V3.2: 입력 $0.28/M, 출력 $0.42/M
- OpenRouter 무료 모델: Gemini 2.0 Flash 등 18개+
- 무료 MVP 총 비용: ~$6.25/월

---

### Episode 04: 데모가 터진 날

- **슬러그**: `demo-day-disaster.html`
- **역할**: 위기와 성장 — 데모 실패, 복구, 외부 인물 등장
- **태그**: `소설`

**Part 구성:**

| Part | 제목 | 핵심 내용 |
|------|------|-----------|
| I | "투자자가 온다" | 대표가 어디선가 투자자 미팅을 잡아옴. "다음주 수요일에 사람 온다. 데모 보여줄 수 있지?" 3일의 시간. 도현이 미친듯이 기능 추가: 대시보드 차트 3개 + 데모 시나리오 |
| II | "Supabase가 잠들다" | 데모 당일 오전. 무료 티어 7일 미사용 정책으로 Supabase 프로젝트가 일시정지됨. "500 Internal Server Error". 복구 버튼 누르고 기다리는 30분. 투자자는 2시에 온다. 현재 1시 28분 |
| III | "피벗" | 투자자 앞에서 데모. 처음엔 잘 돌아가다가 API rate limit 초과로 AI 응답이 멈춤. 순간 도현이 "잠시만요"라며 OpenRouter에서 무료 모델을 DeepSeek 유료로 전환. 터미널에서 env 수정. 즉석 라이브 디버깅 |
| IV | "관심 있습니다" | 투자자: "기술보다 이 비용 구조가 인상적이네요. 월 운영비가 $6이라고요?" 의외의 반응. 투자자가 관심을 보이는 건 AI 기술이 아니라 "거의 0원으로 동작하는 SaaS". 명함 교환. "사업계획서 보내주세요" |

**핵심 코드/UI:**
- `.terminal` — Supabase 복구 로그, API 에러, env 변수 수정
- `.source-code` — rate limit 에러 핸들링 코드 (급하게 추가한 fallback)
- `.slack-msg` — 대표의 격려(?) 카톡: "잘 되고 있는 거지?"
- `.pitch-slide` — 투자자에게 보여주는 비용 구조표 (커스텀 컴포넌트)
- `.ai-voice` — 에러 발생 시 Claude에게 급하게 물어보는 장면

**핵심 데이터 인용:**
- Supabase Free 7일 비활성 시 일시정지
- OpenRouter rate limit / DeepSeek 유료 전환 비용
- 시드 투자 규모: 1~5억원
- AI 스타트업 3년 생존율: 56.2%
- 일반 신생기업 5년 생존율: 34.7%

---

### Episode 05: 사업계획서를 쓰는 밤

- **슬러그**: `the-business-plan.html`
- **역할**: 결말 — 투자 직전의 밤, 회고, 열린 결말
- **태그**: `소설`

**Part 구성:**

| Part | 제목 | 핵심 내용 |
|------|------|-----------|
| I | "숫자의 무게" | 사업계획서 작성. TAM/SAM/SOM, 경쟁사 분석, 재무 추정. Claude Pro가 도와주지만 "월 유료 고객 100명 확보"라는 숫자의 현실감. Supabase Free로는 안 된다. Pro $25/월이 필요하다. Vercel Pro $20/월. "성공하면 월 $45부터 시작이다" |
| II | "대표와의 대화" | 대표 방에서 단둘이 대화. 대표: "나도 안다. 매날 허무맹랑한 소리 한다는 거. 근데 이대로 SI만 하다가는..." 대표의 진심이 처음으로 드러남. 55세, 직원 12명의 생계를 책임지는 무게 |
| III | "죽음의 계곡" | 도현이 스타트업 투자 현실을 조사. 시드→시리즈A 사이의 "죽음의 계곡". 5년 생존율 34.7%. 회사를 나가야 하나, 남아야 하나. 동기 개발자 친구와의 술자리: "너 아직도 거기 있어? 우리 회사는 Copilot Business 깔아줬는데" |
| IV | "보내기" | 새벽 4시. 사업계획서 마지막 페이지: "투자 요청 금액: 3억원". 이메일 제목: "[넥스트비전] AI 견적 자동화 서비스 사업계획서". 보내기 버튼을 누르기 전 잠깐 멈춤. "29,000원으로 시작했다. 월급의 1.2%." 보내기. 열린 결말 |

**핵심 코드/UI:**
- `.source-code` — 사업계획서용 재무 추정 스프레드시트 로직
- `.business-plan` — 사업계획서 목차와 핵심 슬라이드 (커스텀 컴포넌트)
- `.cost-table` — 서비스 성장 시 비용 구조 변화표 ($0 → $45 → $200+)
- `.terminal` — 이메일 발송 로그 (마지막 장면)
- `.doc-excerpt` — 스타트업 투자 통계 인용

**핵심 데이터 인용:**
- Supabase Pro $25/월, Vercel Pro $20/월 → 서비스 운영비
- 시드 투자 규모 1~5억원, 기업가치 수억~십수억
- 죽음의 계곡: 시드→시리즈A 사이 대다수 탈락
- 5년 생존율 34.7%, AI 스타트업 3년 생존율 56.2%
- 한국 개발자 266만명, 85%가 AI 도구 정기 사용

---

## 4. 디자인 노트

### 시리즈 고유 컴포넌트

기존 소설 공통 CSS(`.novel`, `.dialogue`, `.internal`, `.scene-break`, `.char-intro`, `.part-label`, `.part-title`, `.section-divider`)에 더해 다음 고유 컴포넌트를 설계한다:

| 컴포넌트 | 용도 | 디자인 |
|----------|------|--------|
| `.terminal` | CLI/터미널 출력 | 기존 패턴 재사용 (다크 배경 #2a2a28) |
| `.source-code` | 소스 코드 | 기존 패턴 재사용 (카드 배경) |
| `.ai-voice` | AI 응답 | 기존 패턴 재사용 (액센트 왼쪽 보더) |
| `.slack-msg` | 카톡/슬랙 메시지 | 기존 패턴 변형 → 카카오톡 스타일로 |
| `.pricing-table` | 도구 가격 비교표 | 2컬럼 그리드, 강조 행은 accent |
| `.youtube-card` | 유튜브 영상 카드 | 제목 + 채널명 + 조회수, card-bg |
| `.pitch-slide` | 투자 피칭 슬라이드 | 넓은 카드, 중앙 정렬, 큰 숫자 강조 |
| `.business-plan` | 사업계획서 발췌 | doc-excerpt 변형, 구조화된 목차 |
| `.cost-table` | 비용 구조표 | 3단계 비교 (무료→성장→스케일) |
| `.kakao-msg` | 카카오톡 메시지 | 노란 말풍선, 프로필, 시간 |

### editorial-base.css 확장 필요사항
- 없음. 모든 고유 컴포넌트는 각 페이지의 `<style>` 태그에서 정의

---

## 5. 제작 순서

### 체크리스트

- [ ] Episode 01 HTML 제작 (`content/future-cashcow-series/boss-wants-ai.html`)
- [ ] Episode 02 HTML 제작 (`content/future-cashcow-series/one-point-two-percent.html`)
- [ ] Episode 03 HTML 제작 (`content/future-cashcow-series/five-hundred-megabytes.html`)
- [ ] Episode 04 HTML 제작 (`content/future-cashcow-series/demo-day-disaster.html`)
- [ ] Episode 05 HTML 제작 (`content/future-cashcow-series/the-business-plan.html`)
- [ ] `series-nav.js` SERIES 데이터에 시리즈 추가
- [ ] `assets/content-data.js`에 시리즈/글 데이터 추가
- [ ] `content/index.md` 업데이트
- [ ] `sitemap.xml`에 5개 URL 추가
- [ ] `CLAUDE.md` 콘텐츠 관리 섹션에 시리즈 17 추가
- [ ] `npx eleventy` 빌드 확인

### 제작 우선순위
1. Episode 01, 02를 먼저 제작 (캐릭터와 세계관 확립)
2. Episode 03은 코드 중심이므로 코드 예시를 정교하게 설계
3. Episode 04, 05는 서사적 긴장이 높으므로 인물 심리에 집중
4. 전 편 완성 후 시리즈 등록 작업 일괄 수행

---

## 6. 참고 자료 (출처)

### 중소기업/연봉
- [점핏 2025 개발자 연봉 리포트](https://jumpit.saramin.co.kr/report/2025/salary)
- [그룹바이 - 2025 개발자 연차별 평균연봉](https://groupby.careers/)
- [경총 - 대기업 중소기업 연봉 격차 2024](https://edukr.day7kr.com/)
- [Hyperhire - IT 중소기업 개발자 연봉](https://blog.hyperhire.in/SMEs-software-engineer-salary)
- [정책브리핑 - 국내 기업 99.9% 중소기업](https://www.korea.kr/briefing/pressReleaseView.do?newsId=156518633)

### AI 도입 현실
- [대한상의 - 국내 기업 AI 기술 활용 실태 조사](https://www.korcham.net/)
- [NIA - 기업 내 AI 활용 현황 및 애로사항 분석](https://www.nia.or.kr/)
- [CIO - AI 준비 완료 기업 3%](https://www.cio.com/)
- [CIO - 2026년 국내 기업 85% 생성형AI 도입](https://www.cio.com/)
- [정책브리핑 - 2026년 중기부 AI 예산 7,992억원](https://www.korea.kr/)

### AI 코딩 도구 비용
- [GitHub Copilot Plans](https://github.com/features/copilot/plans)
- [Cursor Pricing](https://www.cursor.com/pricing)
- [Claude Pricing](https://claude.com/pricing)
- [OpenRouter Free Models](https://openrouter.ai/collections/free-models)
- [DeepSeek API Pricing](https://api-docs.deepseek.com/quick_start/pricing/)
- [Supabase Pricing](https://supabase.com/pricing)
- [Netlify Pricing](https://www.netlify.com/pricing/)

### 스타트업 투자
- [THE VC - 2025 한국 스타트업 투자 통계](https://thevc.kr/)
- [ZUZU - 스타트업 투자 라운드](https://zuzu.network/resource/guide/investment-round/)
- [한국경제 - AI 스타트업 절반만 살았다](https://www.hankyung.com/)
- [중기부 - 일반 신생기업 5년 생존율 34.7%](https://www.korea.kr/)

### 개발자 AI 사용 현황
- [JetBrains - State of Developer Ecosystem 2025](https://blog.jetbrains.com/research/2025/10/)
- [InfoWorld - 85% of developers use AI regularly](https://www.infoworld.com/)
- [머니투데이 - 한국 AI 개발자 266만명](https://www.mt.co.kr/)
- [SK플래닛 - GitHub Copilot 활용기](https://techtopic.skplanet.com/github-copilot/)

### 콘텐츠 참조
- [좋좋소 (나무위키)](https://namu.wiki/w/%EC%A2%8B%EC%A2%8B%EC%86%8C)
- [머니투데이 - 좋코딩 누적 300만회](https://news.mt.co.kr/)
- [한국경제 - 좋좋소 누적 5300만회](https://www.hankyung.com/)

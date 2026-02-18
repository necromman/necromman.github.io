# 시리즈 기획서: Something Went Wrong — 유튜브가 멈춘 밤

> **시리즈 슬러그:** `youtube-outage-series`
> **시리즈 번호:** Series 33
> **기획일:** 2026-02-18
> **상태:** 기획 완료 → 콘텐츠 제작 대기

---

## 1. 시리즈 컨셉

### 핵심 질문
> 2026년 2월 18일 오전 9시 45분(KST), 유튜브가 멈췄다. 30만 명이 DownDetector에 신고했고, "Something went wrong"이라는 여섯 단어만 화면에 남았다. 개발자이자 화이트해커인 주인공은 이 여섯 단어 뒤에 무엇이 있는지 추적한다. 500,000대의 서버, 초당 1,000만 건의 권한 체크, 3,000개 이상의 엣지 로케이션 — 그 거대한 시스템의 어디에서 무엇이 깨졌는가?

### 장르
**테크 스릴러 + 논픽션 르포** — 소설의 몰입감으로 읽히지만, 모든 기술적 디테일은 실제 공개된 구글 인프라 논문과 과거 인시던트 보고서에 기반한다.

### 타겟 독자
- 유튜브 장애를 실시간으로 겪은 일반 사용자 (화제성)
- 구글/대규모 시스템 아키텍처에 호기심 있는 개발자
- 보안/인프라 분야에 관심 있는 IT 종사자
- 테크 스릴러/논픽션을 좋아하는 일반 독자

### 시리즈 톤
- **담백한 긴장감**: 선정적이지 않지만 페이지를 넘기게 만드는 힘
- **기술은 이야기 안에서**: 강의가 아니라 주인공의 추론 과정 속에서 자연스럽게 설명
- **실제 로그/명령어**: `curl`, `traceroute`, `dig`, Chrome DevTools 등 현실의 도구를 사용
- **시간 압박**: 장애 발생부터 복구까지의 실제 타임라인을 따라가는 구조
- **1인칭 혹은 밀착 3인칭**: 주인공의 사고 과정을 따라가는 느낌

### 주인공
- **이름**: 한세진 (32세)
- **직업**: 보안 스타트업 "그레이노드" 시니어 엔지니어, 前 KISA 침해대응팀
- **성격**: 과묵하지만 장애 앞에서는 불이 붙는 타입. 새벽에 서버가 죽으면 커피 대신 터미널부터 연다
- **습관**: 대형 서비스 장애가 나면 자동으로 원인 분석을 시작하는 직업병. 개인 블로그에 인시던트 분석 글을 올리는 것이 취미
- **기술 스택**: 네트워크 포렌식, 리버스 엔지니어링, 클라우드 인프라, BGP/DNS 분석

---

## 2. 자료조사 요약

### 2-1. 2026년 2월 18일 유튜브 장애 — 이번 사건

| 항목 | 내용 | 출처 |
|------|------|------|
| **발생 시각** | 2026.02.17 7:45 PM ET (= 02.18 09:45 KST) | [9to5Google](https://9to5google.com/2026/02/17/youtube-outage-february-2026/) |
| **DownDetector 신고** | 약 300,000~331,912건 (YouTube), 8,000+ (YouTube TV) | [XDA](https://www.xda-developers.com/300000-people-cant-access-youtube/), [TechRadar](https://www.techradar.com/news/live/youtube-down-february-2026) |
| **영향 지역** | 미국 317,000+건, 영국 38,000건, 유럽, 아시아 전역 | [TechRadar](https://www.techradar.com/news/live/youtube-down-february-2026) |
| **에러 메시지** | "Something went wrong" (문제가 발생했습니다) | [Tom's Guide](https://www.tomsguide.com/news/live/youtube-outage-february-2026) |
| **장애 범위** | 홈페이지, 구독 피드, Shorts — 모바일/웹 모두 | [9to5Google](https://9to5google.com/2026/02/17/youtube-outage-february-2026/) |
| **정상 작동** | 직접 비디오 링크, 임베드된 영상은 재생 가능 | [9to5Google](https://9to5google.com/2026/02/17/youtube-outage-february-2026/) |
| **YouTube TV** | 동시 장애, 8,000+건 신고 | [TechRadar](https://www.techradar.com/news/live/youtube-down-february-2026) |
| **YouTube Music** | 정상 작동 | [9to5Google](https://9to5google.com/2026/02/17/youtube-outage-february-2026/) |
| **구글 공식 대응** | 발생 35분 후에도 미인정 → 이후 @TeamYouTube에서 "원인을 찾아 수정했다" 발표 | [XDA](https://www.xda-developers.com/300000-people-cant-access-youtube/), [Cybernews](https://cybernews.com/news/youtube-down-worldwide-outage/) |
| **한국 언론** | 블록미디어 속보, 인사이트, CBC뉴스, 디지털데일리 등 보도 | [블록미디어](https://www.blockmedia.co.kr/archives/1048127), [디지털데일리](https://www.ddaily.co.kr/page/view/2026021810300800372) |

**핵심 단서 — 장애 패턴 분석:**
- 홈/구독/Shorts = **피드 서비스** (추천 엔진 + 사용자 데이터 조회) → 장애
- 직접 URL/임베드 = **CDN 직접 서빙** → 정상
- YouTube Music = **별도 백엔드** → 정상
- YouTube TV = **같은 인증/피드 인프라** → 장애

→ **CDN/비디오 서빙은 정상, 피드/추천/인증 레이어에서 장애 발생**으로 추론 가능

### 2-2. 과거 구글/유튜브 주요 장애 — 비교 분석용

#### 2020년 12월 14일 — "인증 시스템이 스스로를 죽였다"

| 항목 | 내용 |
|------|------|
| **근본 원인** | Google User ID Service의 자동 쿼터 관리 시스템 오류. 사용량을 0으로 잘못 보고 → 자동 스케일링이 용량을 0으로 축소 |
| **메커니즘** | 인증 시스템 업데이트 과정에서 기존 컴포넌트를 남겨둠 → 사용량 0 에러 발생 → 유예 기간(grace period) 설정 → 유예 만료 → 자동 시스템이 "사용량 0이니까 용량도 0"으로 축소 |
| **영향** | Gmail, YouTube, Drive, Docs, Calendar 등 인증 필요한 모든 서비스 47분간 장애 |
| **복구** | 03:47 발생 → 04:08 원인 파악 → 04:22 한 DC에서 쿼터 비활성화 → 04:33 전체 복구 |
| **교훈** | 자동화된 안전장치(쿼터)가 역으로 시스템을 파괴. "안전장치가 위험장치가 된" 사례 |
| **출처** | [9to5Google](https://9to5google.com/2020/12/18/google-outage-explanation/), [BleepingComputer](https://www.bleepingcomputer.com/news/google/google-outage-caused-by-critical-system-running-out-of-storage/) |

#### 2023년 11월 — "인증서가 만료됐다"

| 항목 | 내용 |
|------|------|
| **근본 원인** | CDN 인증서 만료 |
| **메커니즘** | TLS 인증서 자동 갱신 실패 → CDN 노드에서 HTTPS 핸드셰이크 실패 |
| **교훈** | 가장 단순한 것(인증서 만료일)이 가장 큰 장애를 일으킴 |
| **출처** | [Wikipedia](https://en.wikipedia.org/wiki/Google_services_outages) |

#### 2024년 6월 — "쿼터 에러"

| 항목 | 내용 |
|------|------|
| **근본 원인** | 내부 서비스 메시의 쿼터 에러 |
| **메커니즘** | 마이크로서비스 간 통신에서 rate limiting 오작동 |
| **출처** | [Wikipedia](https://en.wikipedia.org/wiki/Google_services_outages) |

#### 2025년 10월 15일 — "DNS가 길을 잃었다"

| 항목 | 내용 |
|------|------|
| **근본 원인** | 로드밸런서 마이그레이션 중 DNS 전파 실패 |
| **DownDetector** | 380,000+건 (90분 내) |
| **영향** | YouTube + YouTube Music. 미국/영국/캐나다 |
| **교훈** | 인프라 마이그레이션의 롤링 업데이트 실패. DNS TTL과 전파 시간의 불일치 |
| **출처** | [Bivash Vlog](https://www.bivashvlog.com/2025/10/youtube-outage-october-2025-global-impact.html), [Phemex](https://phemex.com/news/article/youtube-experiences-global-outage-61136) |

### 2-3. 구글/유튜브 인프라 — 소설 속 기술 설명 소재

#### Zanzibar — 전 지구적 권한 시스템

| 항목 | 데이터 |
|------|--------|
| **역할** | YouTube, Drive, Photos, Calendar, Maps 등 수백 개 서비스의 "이 사용자가 이 리소스에 접근할 수 있는가?" 판단 |
| **규모** | 10,000+ 서버, 30+ 지리적 복제본, **초당 1,000만+ 권한 체크** |
| **데이터** | **2조 개 이상의 ACL(접근 제어 목록)** 저장 |
| **성능** | 95% 요청을 10ms 이내 응답, **99.999% 가용성** (3년간) |
| **쿼리 형태** | "사용자 U가 객체 O에 대해 관계 R을 가지는가?" |
| **기반 기술** | Google Spanner (외부 일관성 보장), TrueTime (원자시계 기반 전역 타임스탬프) |
| **소설 활용** | 주인공이 "구독 피드는 죽었는데 직접 URL은 살아있다"는 단서에서 Zanzibar를 떠올림 |
| **출처** | [ByteByteGo](https://blog.bytebytego.com/p/how-google-manages-trillions-of-authorizations), [AuthZed](https://authzed.com/zanzibar), [Google Research](https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/) |

#### YouTube CDN / 비디오 서빙

| 항목 | 데이터 |
|------|--------|
| **서버 수** | 500,000+ 글로벌 서버 |
| **엣지 로케이션** | 3,000+ (Google Media CDN) |
| **캐시 적중률** | 98.5~99% |
| **저장 규모** | 10+ 엑사바이트 (각 비디오의 다중 포맷/해상도 복사본) |
| **아키텍처** | 마이크로서비스. 업로드/트랜스코딩/서빙/추천이 독립 서비스 |
| **소설 활용** | "CDN은 살아있는데 피드가 죽었다" → 비디오 서빙과 피드 서비스의 분리 구조 설명 |
| **출처** | [VDOCipher](https://www.vdocipher.com/blog/youtube-tech-stack-architecture/), [GeeksforGeeks](https://www.geeksforgeeks.org/system-design/system-design-of-youtube-a-complete-architecture/) |

#### Borg — 클러스터 오케스트레이션

| 항목 | 데이터 |
|------|--------|
| **역할** | 구글 전체 인프라의 서비스 스케줄링 및 관리 (Kubernetes의 전신) |
| **소설 활용** | 2020년 장애에서 Borg의 자동 스케일링이 역으로 시스템을 죽인 사례 참조 |

#### Spanner + TrueTime

| 항목 | 데이터 |
|------|--------|
| **역할** | 전 세계 데이터센터 간 외부 일관성 보장. 원자시계 + GPS 기반 |
| **소설 활용** | Zanzibar가 Spanner 위에서 돌아가며, TrueTime이 "이 시점에 이 사용자의 구독 데이터가 정확한가"를 보장하는 구조 |

### 2-4. 소설 속 분석 도구 — 현실의 도구

| 도구 | 용도 | 소설 장면 |
|------|------|-----------|
| `curl -I https://www.youtube.com` | HTTP 응답 헤더 확인 | 장애 초기 — 5xx vs 200 확인 |
| `dig youtube.com` / `nslookup` | DNS 레코드 조회 | 2025년 DNS 장애와 비교 |
| Chrome DevTools (Network 탭) | API 요청/응답 추적 | 피드 API 500 에러 발견 |
| `traceroute` | 네트워크 경로 추적 | CDN 엣지까지는 정상인지 확인 |
| DownDetector API | 장애 규모 모니터링 | 실시간 신고 수 추적 |
| `openssl s_client` | TLS 인증서 확인 | 2023년 인증서 만료 장애와 비교 |
| Shodan / Censys | 공개 서버 정보 조회 | 구글 엣지 서버 상태 확인 |
| BGP 라우팅 테이블 | AS 경로 변경 감지 | 네트워크 레벨 이상 탐지 |

---

## 3. 시리즈 구성 (3편)

### 에피소드 1: "Something Went Wrong"
> **슬러그:** `something-went-wrong.html`
> **역할:** 소설/르포 — 장애 발생, 실시간 추적, 증상 패턴 분석
> **태그:** `#유튜브장애` `#인시던트분석` `#팩트기반소설`

**시놉시스:**
2026년 2월 18일 화요일 오전 9시 45분. 보안 엔지니어 한세진은 커피를 내리다가 유튜브가 먹통인 것을 발견한다. 직업병이 발동한다. 터미널을 열고 `curl`을 날린다. 홈페이지는 200을 돌려주지만 피드 API는 500을 뱉는다. 구독 피드, Shorts, 홈 — 전부 죽었다. 그런데 직접 URL로 영상을 치면? 재생된다.

"CDN은 살아있어. 죽은 건 그 위의 레이어야."

DownDetector가 30만을 찍는 동안, 세진은 Chrome DevTools를 열고 실패하는 API 엔드포인트를 하나씩 기록한다. 패턴이 보이기 시작한다 — 사용자 데이터를 조회하는 모든 요청이 실패하고 있다. 비디오 자체를 서빙하는 CDN은 멀쩡하다.

**Part 구성:**
- **Part 1 — 09:45**: 장애 발견. 일상에서 비일상으로의 전환. 유튜브 화면에 "문제가 발생했습니다"
- **Part 2 — 09:52**: 터미널 진단. `curl`, DevTools, 피드 API 500 에러 확인. 한국 뉴스 속보 알림
- **Part 3 — 10:15**: 증상 패턴 정리. "홈/구독/Shorts = 죽음, 직접URL = 생존, YouTube Music = 정상, YouTube TV = 죽음". 이 패턴이 가리키는 것
- **Part 4 — 10:30**: DownDetector 30만 돌파. 전 세계가 동시에 같은 에러를 보고 있다. 구글은 침묵. 세진이 과거의 기억을 더듬기 시작한다 — "이 패턴, 전에 본 적 있어"

### 에피소드 2: "과거의 유령들"
> **슬러그:** `ghosts-of-outages-past.html`
> **역할:** 소설/분석 — 과거 인시던트 비교 분석, 구글 인프라 해부
> **태그:** `#구글인프라` `#잔지바르` `#인시던트역사`

**시놉시스:**
세진은 자신의 인시던트 분석 아카이브를 뒤진다. 2020년 12월, 구글이 스스로를 죽인 날. 인증 시스템의 자동 쿼터 관리가 "사용량 0"이라는 잘못된 신호를 받고, 시스템 용량을 0으로 줄여버렸다. 안전장치가 사형선고를 내린 셈이다.

2025년 10월, 로드밸런서 마이그레이션 중 DNS가 길을 잃었다. 38만 건의 신고가 90분 만에 쏟아졌다.

하지만 이번 장애의 패턴은 둘 다와 다르다. 2020년은 인증 자체가 죽어서 모든 서비스가 멈췄고, 2025년은 DNS가 풀려서 서비스에 도달 자체가 안 됐다. 이번에는? 서비스에 도달은 되는데, 피드만 죽었다. 더 국소적이고, 더 미묘하다.

세진은 Zanzibar를 떠올린다. 초당 1,000만 건의 권한 체크를 처리하는 전 지구적 권한 시스템. "이 사용자가 이 구독 목록을 볼 수 있는가?" — 이 질문에 답하는 시스템이 느려지거나 에러를 돌려주면, 정확히 이런 패턴이 나온다.

**Part 구성:**
- **Part 1 — 과거 #1: 2020년의 유령**: 인증 시스템이 자신을 죽인 메커니즘. User ID Service → Paxos → 쿼터 관리 → 자동 축소. "자동화의 배신"
- **Part 2 — 과거 #2: 2025년의 유령**: DNS 전파 실패. 로드밸런서 마이그레이션 → DNS TTL 불일치 → 38만 건 신고. "기초의 배신"
- **Part 3 — 차이점 분석**: 세진의 화이트보드. 세 장애의 비교표. "2020년은 전체 사망, 2025년은 도달 불가, 2026년은 부분 사망. 부분 사망이 더 무서워 — 원인을 특정하기 어려우니까"
- **Part 4 — Zanzibar**: 구글의 권한 시스템을 떠올리는 세진. 2조 개의 ACL, 10,000대의 서버, 99.999% 가용성. "0.001%의 틈새에서 세상이 멈춘다". Spanner, TrueTime, 엣지 캐시까지 연결되는 추론

### 에피소드 3: "복구, 그리고 0.001%"
> **슬러그:** `point-zero-zero-one.html`
> **역할:** 소설/결론 — 복구 과정, 원인 추론, 대규모 시스템의 철학
> **태그:** `#시스템복구` `#SRE` `#가용성`

**시놉시스:**
@TeamYouTube가 "문제를 찾아 수정했다"고 발표한다. 그것뿐이다. 구글은 항상 그렇다 — 복구는 빠르지만, 원인은 밀실에 머문다.

세진은 자신만의 결론을 정리한다. 증상 패턴, 과거 사례, 공개된 아키텍처 논문을 교차 검증한 추론. "100% 확신할 수는 없지만, 가장 가능성이 높은 시나리오"를 그린다.

그리고 마지막 질문 — 500,000대의 서버, 3,000개의 엣지, 99.999%의 가용성을 가진 시스템이 왜 여전히 멈추는가? 완벽한 시스템은 존재하지 않는다는 것, 0.001%의 틈새에서 인류의 디지털 생활이 흔들린다는 것. 그것이 인프라 엔지니어가 새벽 3시에 일어나는 이유다.

**Part 구성:**
- **Part 1 — 복구**: @TeamYouTube 트윗. 점진적 복구. 세진이 확인하는 API 응답 정상화. 한국시간 오전 11시쯤 정상화
- **Part 2 — 세진의 가설**: 증상 기반 원인 추론. "피드 서비스의 백엔드(사용자 데이터 조회 or 추천 엔진)에서 캐스케이드 실패가 발생했을 가능성이 가장 높다". 각 시나리오별 확률과 근거
- **Part 3 — 0.001%의 의미**: 99.999% 가용성 = 연간 5분 15초. 유튜브의 일일 시청 시간 10억 시간. 1시간 장애 = 4,100만 시간의 시청이 사라진다. 그 숫자가 갖는 무게
- **Part 4 — 에필로그**: 세진이 블로그에 분석 글을 올린다. 제목: "Something Went Wrong — 2026.02.18 YouTube 장애 분석". 유튜브가 다시 돌아온 화면을 보며, 커피를 마신다. 다음 장애는 언제 올까. 반드시 온다.

---

## 4. 디자인 노트

### 시리즈 고유 비주얼 요소

- **터미널 블록**: 주인공의 명령어와 출력을 보여주는 모노스페이스 블록. `curl` 응답, DNS 조회 결과 등
  - 배경: `#0d1117` (GitHub Dark), 텍스트: `#c9d1d9`, 프롬프트: `#58a6ff`
- **타임스탬프 마커**: 각 Part 시작에 `09:45 KST` 형태의 시간 마커. 실시간 추적 느낌
  - 폰트: 모노스페이스, 색상: 붉은 계열 `#ff6b6b`
- **인시던트 카드**: 과거 장애를 비교하는 카드형 레이아웃
  - 헤더에 연도, 원인 한 줄 요약, 심각도 표시
- **아키텍처 다이어그램**: 텍스트 기반 간이 구조도 (ASCII art 또는 CSS box 기반)
  - Zanzibar, CDN, Feed Service의 관계를 심플하게 표현
- **DownDetector 그래프 느낌**: 장애 규모를 보여주는 시각적 요소 (CSS로 구현한 간단한 바 차트)

### editorial-base.css 확장
- 기존 `code-block` 스타일을 활용하되, 터미널 출력 전용 스타일 추가
- 타임스탬프 마커는 페이지 전용 CSS로 처리
- 인시던트 비교 카드는 기존 카드 패턴 활용

---

## 5. 에이전트 팀 구성

이 시리즈는 뉴스 + 분석 + 소설이 합쳐진 형태이므로, 다음과 같은 역할 분담으로 제작한다:

### 역할 1: 팩트 에이전트 (자료/검증)
- **담당**: 모든 기술적 사실의 정확성 검증
- **작업**: 날짜, 시간, 숫자, 기술 용어, 인프라 구조가 공개 자료와 일치하는지 확인
- **참조**: 구글 공식 블로그, 연구 논문(Zanzibar USENIX 2019), 인시던트 보고서, 뉴스 기사
- **원칙**: "소설이지만 기술적 거짓말은 하지 않는다"

### 역할 2: 소설 에이전트 (서사/캐릭터)
- **담당**: 한세진의 캐릭터, 장면 묘사, 페이스 조절
- **작업**: 기술 설명이 강의가 되지 않도록 이야기 흐름 안에서 소화
- **스타일**: 담백하고 건조한 문체. 감탄사 최소, 행동과 사고의 묘사로 긴장감
- **원칙**: "읽는 사람이 '나도 터미널 열어봐야겠다'고 느끼게"

### 역할 3: 인프라 에이전트 (기술 해설)
- **담당**: Zanzibar, CDN, Borg, Spanner 등 구글 인프라의 정확한 설명
- **작업**: 각 기술이 이야기에 등장할 때 필요한 깊이만큼만 설명
- **원칙**: "일반인이 이해할 수 있지만 전문가가 고개를 끄덕이는 수준"
- **금지**: 구글 내부 비공개 정보 창작 (공개된 논문/블로그만 사용)

### 역할 4: 편집 에이전트 (톤/흐름)
- **담당**: 3편의 일관성, 톤 유지, 불필요한 부분 커팅
- **작업**: 강의 톤 감지 → 서사로 전환, 늘어지는 부분 압축
- **원칙**: "한 문단이라도 지루하면 잘라낸다"

---

## 6. 제작 순서

### 체크리스트

- [ ] 1편 "Something Went Wrong" 제작
  - [ ] `content/youtube-outage-series/something-went-wrong.html` 생성
  - [ ] 터미널 블록, 타임스탬프 마커 CSS 구현
  - [ ] SEO 메타 태그, OG 태그 설정
- [ ] 2편 "과거의 유령들" 제작
  - [ ] `content/youtube-outage-series/ghosts-of-outages-past.html` 생성
  - [ ] 인시던트 비교 카드, 아키텍처 다이어그램 구현
- [ ] 3편 "복구, 그리고 0.001%" 제작
  - [ ] `content/youtube-outage-series/point-zero-zero-one.html` 생성
- [ ] 시리즈 공통 작업
  - [ ] `assets/series-nav.js` SERIES 데이터 추가
  - [ ] `assets/content-data.js` 시리즈/글 데이터 추가
  - [ ] `content/index.md` 업데이트
  - [ ] `sitemap.xml`에 새 URL 추가
  - [ ] `.ai/content/catalog.md` 업데이트
  - [ ] `npx eleventy` 빌드 확인

---

## 7. 참고 자료 (출처)

### 2026년 2월 유튜브 장애
- [9to5Google — YouTube outage February 2026](https://9to5google.com/2026/02/17/youtube-outage-february-2026/)
- [TechRadar — YouTube down February 2026 (Live)](https://www.techradar.com/news/live/youtube-down-february-2026)
- [Tom's Guide — YouTube outage February 2026 (Live)](https://www.tomsguide.com/news/live/youtube-outage-february-2026)
- [XDA — 300,000 people can't access YouTube](https://www.xda-developers.com/300000-people-cant-access-youtube/)
- [Art Threat — YouTube outage hits 280K+ users](https://artthreat.net/2399-55384-youtube-outage-hits-280k-users-with-something-went-wrong-errors-worldwide/)
- [Cybernews — YouTube down in worldwide outage](https://cybernews.com/news/youtube-down-worldwide-outage/)
- [블록미디어 — 유튜브 접속 장애 발생](https://www.blockmedia.co.kr/archives/1048127)
- [디지털데일리 — 유튜브 접속 장애로 먹통](https://www.ddaily.co.kr/page/view/2026021810300800372)

### 과거 인시던트
- [9to5Google — Google outage explanation (2020)](https://9to5google.com/2020/12/18/google-outage-explanation/)
- [BleepingComputer — Google outage caused by storage (2020)](https://www.bleepingcomputer.com/news/google/google-outage-caused-by-critical-system-running-out-of-storage/)
- [Google Cloud Status — Incident zall/20013 (2020)](https://status.cloud.google.com/incident/zall/20013)
- [Jack Shirazi — OAuth Outage Analysis (2020)](https://jackshirazi.medium.com/what-reliability-engineers-can-learn-from-googles-december-2020-oauth-outage-e70c4b3e39fe)
- [Wikipedia — Google services outages](https://en.wikipedia.org/wiki/Google_services_outages)

### 구글 인프라 / Zanzibar
- [Google Research — Zanzibar paper (USENIX 2019)](https://research.google/pubs/zanzibar-googles-consistent-global-authorization-system/)
- [ByteByteGo — How Google Manages Trillions of Authorizations](https://blog.bytebytego.com/p/how-google-manages-trillions-of-authorizations)
- [AuthZed — Zanzibar Overview](https://authzed.com/zanzibar)
- [Permify — Google Zanzibar in a Nutshell](https://permify.co/post/google-zanzibar-in-a-nutshell/)
- [Google Cloud — Infrastructure Security Design](https://cloud.google.com/docs/security/infrastructure/design)

### YouTube 아키텍처
- [VDOCipher — YouTube Tech Stack Architecture](https://www.vdocipher.com/blog/youtube-tech-stack-architecture/)
- [GeeksforGeeks — System Design of YouTube](https://www.geeksforgeeks.org/system-design/system-design-of-youtube-a-complete-architecture/)
- [High Scalability — YouTube Architecture](https://highscalability.com/youtube-architecture/)

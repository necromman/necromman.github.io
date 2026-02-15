# 시리즈 기획서: 에이전트 조립 가이드

> **시리즈 슬러그:** `mcp-agent-guide-series`
> **시리즈 번호:** Series 27
> **기획일:** 2026-02-14
> **상태:** 기획 완료 → 콘텐츠 제작 대기

---

## 1. 시리즈 컨셉

### 핵심 질문

> "에이전트요? 그거 그냥 설정 파일 세 장인데요."

MCP(Model Context Protocol)와 AI 에이전트는 2026년 현재 가장 많이 들리는 버즈워드다.
하지만 대부분의 개발자는 "들어봤는데 뭔지 모르겠다"는 단계에 머물러 있다.
이 글은 MCP와 에이전트의 실체를 해부해서, **이름만 거창하지 별거 아니라는 것**을 증명한다.

- 에이전트 = LLM + 시스템 프롬프트 + 지식베이스 + 도구 세트 (설정 파일 세 장)
- Tool(Function Calling) = LLM은 판단만, 서버가 실행 (7단계 핑퐁)
- MCP = Tool의 USB-C 규격 (플러그인처럼 붙였다 뗐다)

### 타겟 독자

- "에이전트 만들어보세요"라는 말을 들은 개발자
- MCP를 들어봤지만 구현 방법을 모르는 개발자
- AI 에이전트가 뭔지 개념 정리가 안 된 기획자/PM
- "우리도 에이전트 해야 하지 않나?"라는 대표님 옆의 모든 사람

### 시리즈 톤

- **탈신비화(Demystification)**: 거창한 이름 뒤의 단순한 구조를 폭로
- **실무 중심**: 실제 회의실에서 벌어지는 상황(대표님의 지시 → 개발팀의 해석)
- **코드로 증명**: 추상적 설명이 아니라 JSON과 코드 예시로 "이게 전부"를 보여준다
- **데이터 뒷받침**: 2026년 최신 수치로 시장 현황 조감

### 차별점

기존 MCP/에이전트 콘텐츠와의 차이:
- 공식 문서: 정확하지만 지루하고 맥락 없음
- 유튜브 해설: 개념은 알려주지만 "그래서 어떻게 만드는데?"가 빠짐
- 이 글: **"별거 아니다"를 증명하는 글**. 개념 → 원리 → 코드 → "이게 끝"

---

## 2. 자료조사 요약

### 2-1. MCP 현황 (2026년 2월)

| 항목 | 수치 | 출처 |
|------|------|------|
| MCP 스펙 버전 | 2025-11-25 (1주년 업데이트) | MCP 공식 블로그 |
| 월간 SDK 다운로드 | 9,700만+ (Python 7,700만 + TypeScript) | PyPI Stats |
| 등록된 MCP 서버 | 17,316개 (Glama 디렉토리) | Glama |
| GitHub 스타 (Python SDK) | ~21,600 | GitHub |
| 서버 증가율 | 2년 내 16,000% | The New Stack |

**핵심 이벤트 타임라인:**
- 2024.11 — Anthropic이 MCP 발표, 오픈소스 공개
- 2025.03 — **OpenAI 채택** (Agents SDK, ChatGPT 데스크톱)
- 2025.04 — **Google DeepMind** MCP 지원 확인
- 2025.08 — **Microsoft** Windows/Azure 통합 발표
- 2025.12 — Linux Foundation 산하 **Agentic AI Foundation(AAIF)** 설립
  - Anthropic이 MCP를, Block이 Goose를, OpenAI가 AGENTS.md를 기부
  - 플래티넘 멤버: AWS, Anthropic, Block, Bloomberg, Cloudflare, Google, Microsoft, OpenAI

**결론:** MCP는 사실상 업계 표준이 되었다. "어떤 프로토콜을 쓸까?"는 이미 끝난 논쟁.

### 2-2. 에이전트 생태계 (2026년 2월)

| 항목 | 수치 | 출처 |
|------|------|------|
| AI 도구 사용/계획 중인 개발자 | 84% (전년 76%↑) | Stack Overflow 2025 |
| AI 도구 매일 사용하는 개발자 | 51% | Stack Overflow 2025 |
| AI 에이전트 도입 기업 | 79% | Multimodal 2026 |
| 에이전트 도입 후 생산성 향상 | 69% | Stack Overflow 2025 |
| 에이전트 도입 계획 없음 | 38% | Stack Overflow 2025 |
| 정확성 우려 | 87% | Stack Overflow 2025 |
| 보안/프라이버시 우려 | 81% | Stack Overflow 2025 |

**주요 프레임워크:**
- LangGraph (LangChain) — LinkedIn, Uber 등 400+ 기업 운영
- CrewAI — Fortune 500의 60% 사용
- AutoGen (Microsoft) — Semantic Kernel과 통합, 2026 Q1 GA

### 2-3. 한국 시장

| 항목 | 수치/현황 | 출처 |
|------|-----------|------|
| 생성 AI 도입률 | 61% | Carrot Global 2026 |
| 조직 내재화 달성 | **6.7%** | Carrot Global 2026 |
| 카카오 | MCP 기반 PlayTools 마켓플레이스 출시, Kanana AI 비서 | Etnews |
| 네이버 | Agent N 출시 (2025.11), AI 쇼핑 에이전트 2026 Q1 | Korea Times |
| 삼성 | GPU 50,000+ 기반 AI 팩토리 구축 | Microsoft Source Asia |

**핵심 인사이트:** 한국은 도입률 61%이지만 실제 내재화는 6.7%. "하고 싶은데 어떻게 하는지 모르는" 상태. 이 글의 타겟 독자와 정확히 일치.

### 2-4. MCP 구현 현실

**쉬운 점:**
- FastMCP(Python): 데코레이터 하나로 MCP 서버 구현
- Spring AI: `@Tool` 어노테이션으로 기존 코드에 MCP 노출
- 단순 서버는 100줄 이내

**어려운 점 (기업 환경):**
- OAuth 인증 복잡성 (기존 IdP와의 통합 문제)
- 스펙 변동 속도 (2024.11 → 2025.06 → 2025.11 세 번 업데이트)
- 서버 난립 (거버넌스 없이 수천 개 서버 증식)
- Python 성능 이슈 (Java/Go 대비 18% 처리량)

---

## 3. 시리즈 구성 (1편)

> 단일 편으로 MCP와 에이전트의 핵심을 모두 다룬다.
> 구조: "대표님 지시 → 에이전트 해부 → Tool 원리 → MCP 정체 → 구현 코드 → 정리"

### 01. 에이전트 조립하기

- **슬러그:** `agent-is-three-configs.html`
- **역할:** 해설 — MCP와 AI 에이전트, 이름만 거창한 설정 파일의 세계
- **태그:** `해설/기술`

---

#### Part 1: "에이전트 만들래요" — 대표님의 한마디

**도입부 (masthead)**

대표님이 단톡방에 4단계 로드맵 표를 던졌다.
"직원별 AI 에이전트 만들어요. PoC 가능하죠?"
개발팀은 당황한다. 에이전트? 그게 뭔데? 어디서부터 시작하지?

- 에이전트, MCP, Function Calling — 이름은 많이 들었다
- 하지만 검색하면 나오는 건 추상적인 다이어그램과 영어 문서뿐
- 이 글은 그 버즈워드의 실체를 까본다. 결론부터 말하면: **별거 없다**

**핵심 데이터:**
- "AI 에이전트 도입 기업 79%, 하지만 실제 내재화 6.7%" (한국 시장)
- "들어봤는데 못 만들겠다"가 대다수의 현실

**이 Part의 목적:** 독자의 공감을 잡는다. "나도 저 상황이다."

---

#### Part 2: 에이전트의 정체 — 설정 파일 세 장

**핵심 주장:** 에이전트는 새로운 기술이 아니다. 기존 LLM 호출에 세 가지 설정을 얹은 것.

```
에이전트 = LLM + ① 시스템 프롬프트 + ② 지식베이스 + ③ 도구 세트
```

**① 시스템 프롬프트 (성격/지침)**
- "너는 개발팀 홍길동의 업무 비서야. 기술 용어를 잘 알고 있어."
- "너는 경영지원팀 김철수의 업무 비서야. 회계/인사 용어를 잘 알고 있어."
- 같은 LLM이지만 지침이 다르면 다른 에이전트

**② 지식베이스 (연결된 문서)**
- A 에이전트: 개발팀 문서만 검색
- B 에이전트: 경영지원팀 문서만 검색
- RAG 임베딩으로 직원별 문서 분리

**③ 도구 세트 (호출 가능한 API)**
- A 에이전트: 코드 저장소 조회, 배포 상태 확인
- B 에이전트: 급여 조회, 채용 현황 확인
- 공통: 연차 조회, 일정 조회 (팀플래너 API)

**코드 예시 — 에이전트의 전부:**
```python
llm.chat(
    model="gpt-4",
    system_prompt=agent.prompt,       # ← 설정 1
    knowledge_base=agent.kb_id,       # ← 설정 2
    tools=agent.available_tools,      # ← 설정 3
    message="홍프로 오늘 휴가야?"
)
```

**이 Part의 목적:** "에이전트 = 설정 파일 세 장"이라는 핵심 메시지 전달

---

#### Part 3: 도구의 원리 — LLM은 판단만 한다

**핵심 주장:** LLM은 API를 직접 호출하지 않는다. "이걸 써야겠다"고 판단만 하면 서버가 실행한다.

**7단계 핑퐁 흐름도** (시각적 다이어그램):

```
1) 사용자 → "홍프로 내일 휴가야?"
2) LLM ← 질문 + 사용 가능한 Tool 목록
3) LLM → "check_leave Tool을 써야겠다" (판단)
4) 서버 → 팀플래너 API 호출 (실행)
5) 팀플래너 → { status: "working", leave_remaining: 5 }
6) 서버 → LLM에 결과 전달
7) LLM → "홍프로님은 내일 근무일입니다. 잔여 연차 5일."
```

**Tool 정의서 — JSON 한 장:**
```json
{
    "name": "check_leave",
    "description": "직원의 연차 및 휴가 정보를 조회합니다",
    "parameters": {
        "type": "object",
        "properties": {
            "employee_name": { "type": "string", "description": "조회할 직원 이름" },
            "date": { "type": "string", "description": "조회할 날짜 (YYYY-MM-DD)" }
        },
        "required": ["employee_name"]
    }
}
```

**서버 측 핸들러 — 함수 하나:**
```python
tool_handlers = {
    "check_leave": call_teamplanner_leave_api,
    "get_schedule": call_teamplanner_schedule_api,
}
# LLM이 tool_call을 응답하면:
result = tool_handlers[tool_name](arguments)
```

**핵심 인용:**
> Tool 정의서 = LLM한테 "이런 도구 있어" 알려주는 설명서
> Tool 핸들러 = 실제로 API를 호출하는 함수
> LLM의 역할 = 어떤 Tool을 쓸지 판단만
> 서버의 역할 = LLM이 요청한 Tool을 실제로 실행

**이 Part의 목적:** Function Calling의 동작 원리를 7단계로 해부

---

#### Part 4: MCP = USB-C — 플러그인으로 만드는 도구

**핵심 주장:** MCP는 Function Calling을 표준화한 프로토콜. USB-C처럼 규격을 통일한 것.

**비유 — 충전기 전쟁의 교훈:**
```
Function Calling만 쓸 때 (= 각자 충전기)
  팀플래너 Tool → AC-Connect에 하드코딩
  유니버스 Tool → AC-Connect에 하드코딩
  새 시스템 Tool → AC-Connect에 하드코딩
  → 시스템 늘어날수록 클라이언트가 뚱뚱해짐

MCP로 할 때 (= USB-C)
  팀플래너 MCP 서버 → 플러그인처럼 연결
  유니버스 MCP 서버 → 플러그인처럼 연결
  새 시스템 MCP 서버 → 플러그인처럼 연결
  → 클라이언트는 가볍게, Tool은 각 서버가 관리
```

**MCP 구조 — 서버와 클라이언트:**
- **MCP 서버** = Tool을 제공하는 쪽. "나한테 이런 도구 있어"를 표준 포맷으로 노출
- **MCP 클라이언트** = Tool을 가져다 쓰는 쪽. 연결하면 Tool 목록 자동 수집
- **통신 방식:** JSON-RPC 2.0

**MCP 시장 현황 (2026.02):**
- 17,316개 MCP 서버 등록 (Glama 디렉토리)
- 월 9,700만 SDK 다운로드
- Anthropic, OpenAI, Google, Microsoft, AWS 모두 채택
- 2025.12 Linux Foundation 산하 Agentic AI Foundation 설립
- 사실상 업계 표준 확정

**카카오의 MCP 사례:**
- PlayTools 마켓플레이스: MCP 호환 도구를 등록/사용하는 플랫폼
- AI 비서 Kanana: 카카오맵, 멜론, 톡캘린더를 MCP로 연결

**이 Part의 목적:** MCP가 왜 필요한지, USB-C 비유로 직관적으로 이해시킨다

---

#### Part 5: 구현은 이렇게 — @Tool 하나면 된다

**핵심 주장:** MCP 서버 구현은 기존 코드에 어노테이션/데코레이터를 얹는 것. 새로 짤 게 없다.

**Python — FastMCP (10줄):**
```python
from mcp.server import Server

server = Server("teamplanner")

@server.tool("check_leave",
    description="직원의 연차/휴가 정보를 조회합니다")
async def check_leave(employee_name: str, date: str = None):
    result = requests.get(
        f"/teamplanner/leave?name={employee_name}&date={date}")
    return result.json()

server.run()
```

**Spring Boot — @Tool (15줄):**
```java
@Tool(description = "직원의 연차/휴가 정보를 조회합니다")
public LeaveInfo checkLeave(
    @Param("조회할 직원 이름") String employeeName,
    @Param("조회할 날짜") String date
) {
    // 기존 Service/Repository 그대로 활용
    return leaveService.getLeaveInfo(employeeName, date);
}
```

**클라이언트 연결 — 3줄:**
```python
from mcp.client import Client

teamplanner = Client("http://localhost:3001")
tools = teamplanner.list_tools()  # Tool 목록 자동 수집
llm.chat(message="홍프로 오늘 휴가야?", tools=tools)
```

**전체 아키텍처 다이어그램:**
```
[그룹웨어]
  프론트(React) — 백엔드(Spring) — DB
                      |
                 MCP 서버 노출
                 (@Tool: check_leave, get_schedule, ...)
                      |
                      | JSON-RPC 2.0
                      |
[AI 챗봇 = MCP 클라이언트]
                      |
                 LLM 호출 + Tool 결과 조합
                      |
                 SSE 스트리밍 응답
                      |
                 사용자 채팅 화면
```

**이 Part의 목적:** "이게 전부"를 코드로 증명. 구현 장벽이 낮다는 확신 전달

---

#### Part 6: 그래서 별거 아니다 — 정리

**3줄 요약:**
```
에이전트 = 시스템 프롬프트 + 지식베이스 + 도구 세트 (설정 파일 세 장)
Tool     = JSON 정의서 + 핸들러 함수 (LLM은 판단만, 서버가 실행)
MCP      = Tool의 USB-C 규격 (플러그인처럼 붙였다 뗐다)
```

**진짜 어려운 건 따로 있다:**
- 에이전트 구조는 별거 아니다. 진짜 어려운 건:
  - 데이터 품질 (쓰레기가 들어가면 쓰레기가 나온다)
  - 프롬프트 설계 (시스템 프롬프트 한 줄이 답변 품질을 좌우)
  - 권한 관리 (누가 어떤 Tool을 쓸 수 있는지)
  - 사용자 신뢰 (87%가 정확성을 우려)
- 구조를 아는 것과 잘 만드는 것은 다른 문제

**closing:**
- "에이전트"라는 이름에 겁먹지 마라. 설정 파일 세 장이면 된다.
- MCP는 USB-C다. 한 번 만들면 어디든 꽂힌다.
- 대표님이 "에이전트 만들어요"라고 하면, 이제 뭘 해야 하는지 안다.

---

## 4. 디자인 노트

### 시각적 요소

- **7단계 핑퐁 흐름도**: Part 3의 핵심. 사용자 → LLM → 서버 → API → 서버 → LLM → 사용자 흐름을 시각적 다이어그램으로
  - CSS Grid 또는 Flexbox 기반 스텝 바이 스텝 레이아웃
  - 각 단계에 번호 + 짧은 설명 + 방향 화살표
- **USB-C 비유 대비 박스**: Function Calling(각자 충전기) vs MCP(USB-C) 2컬럼 비교
- **설정 파일 세 장 카드**: ① 시스템 프롬프트 ② 지식베이스 ③ 도구 세트를 카드 3장으로 시각화
- **코드 블록**: Python + Java 코드 예시는 `pre > code` 스타일 (JetBrains Mono)
- **타임라인**: MCP 채택 타임라인 (2024.11 → 2025.12) 을 세로 타임라인 컴포넌트로

### editorial-base.css 확장 필요사항

- `.step-flow`: 7단계 흐름도용 컴포넌트 (번호 + 설명 + 화살표)
- `.comparison-box`: 2컬럼 Before/After 비교 박스
- `.config-cards`: 설정 파일 3장을 나란히 보여주는 카드 그리드
- 기존 `.mechanism-row`, `.technique`, `.prose` 컴포넌트 활용

---

## 5. 제작 순서

- [ ] `content/mcp-agent-guide-series/agent-is-three-configs.html` 작성 (editorial-content-page + seo 스킬)
- [ ] 페이지 고유 CSS 작성 (흐름도, 비교 박스, 카드 컴포넌트)
- [ ] `series-nav.js` SERIES 데이터 추가
- [ ] `assets/content-data.js` 시리즈/글 데이터 추가
- [ ] `content/index.md` 업데이트
- [ ] `sitemap.xml` URL 추가
- [ ] `CLAUDE.md` 콘텐츠 관리 섹션 업데이트
- [ ] `npx eleventy` 빌드 확인

---

## 6. 참고 자료 (출처)

### MCP 공식/재단

- [MCP 1주년 블로그](https://blog.modelcontextprotocol.io/posts/2025-11-25-first-mcp-anniversary/) — 스펙 2025-11-25 릴리스 노트
- [Anthropic AAIF 발표](https://www.anthropic.com/news/donating-the-model-context-protocol-and-establishing-of-the-agentic-ai-foundation/) — Linux Foundation 기부, AAIF 설립
- [Linux Foundation AAIF 보도자료](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation) — 플래티넘 멤버 8사
- [OpenAI AAIF 공동 설립](https://openai.com/index/agentic-ai-foundation/) — AGENTS.md 기부

### MCP 채택/분석

- [The New Stack — Why MCP Won](https://thenewstack.io/why-the-model-context-protocol-won/) — MCP 승리 분석
- [Pento — A Year of MCP 2025 Review](https://www.pento.ai/blog/a-year-of-mcp-2025-review) — 1년 회고
- [WorkOS — MCP 2025-11-25 Spec Update](https://workos.com/blog/mcp-2025-11-25-spec-update) — 스펙 상세 분석

### 구현 가이드

- [JavaPro — Building MCP Tools with Spring AI](https://javapro.io/2026/01/07/building-mcp-tools-for-ai-agents-using-spring-ai/) — Spring AI MCP 구현
- [Baeldung — MCP Annotations in Spring AI](https://www.baeldung.com/spring-ai-mcp-annotations) — @Tool 어노테이션
- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk) — Python SDK (v1.7.1)
- [Glama MCP Servers](https://glama.ai/mcp/servers) — 17,316개 MCP 서버 디렉토리

### 엔터프라이즈 현실

- [Solo.io — Enterprise Challenges with MCP](https://www.solo.io/blog/enterprise-challenges-with-mcp-adoption) — 기업 도입 과제
- [Portkey — Hidden Challenge of MCP Adoption](https://portkey.ai/blog/the-hidden-challenge-of-mcp-adoption-in-enterprises/) — 서버 거버넌스 문제

### 개발자/시장 통계

- [Stack Overflow 2025 Developer Survey — AI](https://survey.stackoverflow.co/2025/ai) — 개발자 AI 사용 통계
- [Multimodal — AI Agent Statistics 2026](https://www.multimodal.dev/post/agentic-ai-statistics) — 에이전트 도입 현황
- [PyPI Stats — mcp](https://pypistats.org/packages/mcp) — 월간 다운로드

### 한국 시장

- [Korea Times — Naver Kakao Gear Up for Agentic AI](https://www.koreatimes.co.kr/business/tech-science/20260102/naver-kakao-gear-up-for-agentic-ai-era-in-2026) — 네이버/카카오 에이전트 전략
- [Etnews — AI Agent MCP 생태계 경쟁](https://www.etnews.com/20251017000124) — 카카오 PlayTools
- [Carrot Global — 2026 한국 기업 AI 활용 현황](https://www.carrotglobalblog.com/2026-korean-enterprise-ai-utilization-status-debriefing-260121/) — 도입률 61%, 내재화 6.7%
- [Microsoft Source Asia — Korea Frontier Firms](https://news.microsoft.com/source/asia/2025/09/25/korea-frontier-firms-with-agentic-ai/?lang=ko) — 삼성 GPU 팩토리

### 원본 자료

- AC-Connect 직원별 AI 에이전트 PoC 대화 정리 (2025-02-14) — 사용자 제공 내부 회의록

/**
 * content-data.js
 * 블로그 콘텐츠 데이터. 새 시리즈/글 추가 시 이 파일만 수정하면 됩니다.
 */
window.CONTENT_DATA = [
  {
    id: 'wasted-life',
    seriesNum: 1,
    title: '99%가 인생을 낭비하는 이유',
    description: '유튜브 영상 하나에서 출발한 5편 시리즈. 원본 정리에서 팩트 반박, 종합 분석, 실행 매뉴얼, 제작 과정까지.',
    articles: [
      {
        num: 1,
        title: '99퍼센트 인생낭비 적용가이드',
        role: '유튜브 스크립트를 에디토리얼로 재구성',
        tag: '원본 정리',
        href: 'content/wasted-life-series/99-percent-wasted-life-guide.html',
        search: '99퍼센트 인생낭비 적용가이드 원본 정리 유튜브 스크립트 에디토리얼'
      },
      {
        num: 2,
        title: '자기계발이 말하지 않는 것',
        role: '학술 논문과 OECD 데이터로 팩트 기반 반박',
        tag: '반박',
        href: 'content/wasted-life-series/what-self-help-wont-tell-you.html',
        search: '자기계발이 말하지 않는 것 반박 학술 논문 OECD 데이터 생존자편향'
      },
      {
        num: 3,
        title: '변화의 조건',
        role: '양쪽 맹점을 교차 검증하는 종합 분석',
        tag: '종합',
        href: 'content/wasted-life-series/conditions-for-change.html',
        search: '변화의 조건 종합 분석 교차 검증 맹점 행동경제학 의사결정'
      },
      {
        num: 4,
        title: '그래서 어떡하라고',
        role: '자가 진단 + 90일 실험 프로토콜 실행 매뉴얼',
        tag: '실행',
        href: 'content/wasted-life-series/so-what-now.html',
        search: '그래서 어떡하라고 실행 매뉴얼 자가진단 90일 실험 프로토콜 습관'
      },
      {
        num: 5,
        title: '이 문서는 어떻게 만들어졌는가',
        role: 'AI 워크플로우와 콘텐츠 제작 과정',
        tag: '메타',
        href: 'content/wasted-life-series/how-this-was-made.html',
        search: '이 문서는 어떻게 만들어졌는가 메타 AI 워크플로우 콘텐츠 제작 과정 Gemini Claude'
      }
    ]
  },
  {
    id: 'bithumb-60t',
    seriesNum: 2,
    title: '딸깍 한 번의 60조 원',
    description: '빗썸 비트코인 62만 개 오지급 사고의 전말. 단위 입력 실수 하나가 만든 60조 원 규모의 유령 자산과 가상자산 거래소의 구조적 문제를 분석한다.',
    articles: [
      {
        num: 1,
        title: '딸깍 한 번의 60조 원',
        role: '빗썸 비트코인 62만 개 오지급 사고 분석',
        tag: '사고 분석',
        href: 'content/bithumb-60t-series/bithumb-60-trillion-incident.html',
        search: '딸깍 한 번의 60조 원 빗썸 비트코인 오지급 사고 거래소 장부 거래 삼성증권 유령주식 가상자산 규제'
      },
      {
        num: 2,
        title: '그 돈은 누구의 것인가',
        role: '오지급 130억 원의 수익화 경로, 법적 결과, 시나리오 분석',
        tag: '법적 분석',
        href: 'content/bithumb-60t-series/whose-money-is-it.html',
        search: '그 돈은 누구의 것인가 빗썸 오지급 수익화 법적 분석 부당이득 횡령 판례 삼성증권 착오송금 시나리오'
      },
      {
        num: 3,
        title: '거래소는 왜 장부로 거래하는가',
        role: '블록체인 한계, 거래소 아키텍처, 안전장치 부재의 기술적 해부',
        tag: '기술 분석',
        href: 'content/bithumb-60t-series/why-exchanges-use-ledgers.html',
        search: '거래소는 왜 장부로 거래하는가 블록체인 내부장부 매칭엔진 TPS 핫월렛 콜드월렛 바이낸스 코인베이스 FTX PoR 준비자산증명 DEX'
      }
    ]
  },
  {
    id: 'dev-survival',
    seriesNum: 3,
    title: 'AI 시대 개발자 생존 보고서',
    description: 'AI가 개발자를 대체한다는 불안 속에서, 데이터로 현실을 직시하고 역사적 패턴으로 반론하고 구체적 생존 전략까지. 신입과 경력 모두를 위한 4편 시리즈.',
    articles: [
      {
        num: 1,
        title: 'AI가 개발자를 대체한다는 말, 얼마나 사실인가',
        role: '데이터 기반 현실 직시',
        tag: '팩트 직시',
        href: 'content/dev-survival-series/ai-replaced-developers-reality.html',
        search: 'AI가 개발자를 대체한다는 말 얼마나 사실인가 팩트 데이터 GitHub Copilot 신입 채용 한국 개발자 고용 시장 바이브코딩'
      },
      {
        num: 2,
        title: '그래도 개발자가 사라지지 않는 이유',
        role: '역사적 패턴과 AI 한계 분석',
        tag: '반론',
        href: 'content/dev-survival-series/why-developers-wont-disappear.html',
        search: '그래도 개발자가 사라지지 않는 이유 반론 역사 자동화 AI 한계 아키텍처 요구사항 코드품질 복잡성'
      },
      {
        num: 3,
        title: '개발자 생존 플레이북',
        role: '신입/경력별 구체적 생존 전략',
        tag: '실행',
        href: 'content/dev-survival-series/developer-survival-playbook.html',
        search: '개발자 생존 플레이북 실행 전략 신입 경력 오픈소스 T자형 도메인 지식 AI 활용 한국 시장 SI 스타트업'
      },
      {
        num: 4,
        title: 'AI 시대, 개발자라는 정체성',
        role: '마인드셋 전환과 5년 후 시나리오',
        tag: '결론',
        href: 'content/dev-survival-series/developer-identity-in-ai-era.html',
        search: 'AI 시대 개발자라는 정체성 결론 마인드셋 5년 후 시나리오 문제 해결 불안 적응 네트워크'
      }
    ]
  }
];

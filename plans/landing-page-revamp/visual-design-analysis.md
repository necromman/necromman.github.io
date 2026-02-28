# 비주얼 디자인 상세 분석

> 분석일: 2026-02-28

---

## 1. 컬러 시스템

### 현재 CSS 변수

```css
/* 라이트 모드 */
:root {
  --bg:        #faf8f4;   /* 크림 배경 */
  --fg:        #1a1a18;   /* 거의 검정 (따뜻한 톤) */
  --muted:     #8a8680;   /* 보조 텍스트 */
  --accent:    #c43e2a;   /* 빨강 (유일한 포인트 색) */
  --rule:      #d5d0c8;   /* 구분선 */
  --card-bg:   #f2efe9;   /* 카드/박스 배경 */
  --prose:     #3a3a36;   /* 본문 텍스트 */
  --secondary: #6a6862;   /* 부가 설명 */
}

/* 다크 모드 */
[data-theme="dark"] {
  --bg:        #1c1b18;
  --fg:        #e2ded6;
  --muted:     #8a8680;   /* 동일 */
  --accent:    #e0604e;   /* 밝은 빨강 */
  --rule:      #3a3632;
  --card-bg:   #26241f;
  --prose:     #c4bfb6;
  --secondary: #9a9690;
}
```

### 평가

| 항목 | 평가 | 비고 |
|------|------|------|
| 색상 수 | 우수 (9개) | 유지보수 용이 |
| 온난색 일관성 | 우수 | 모든 색이 따뜻한 톤 |
| fg vs bg 대비 | WCAG AAA | 20:1 이상 |
| accent vs bg 대비 | WCAG AA | 충족 |
| 다크모드 대응 | 우수 | CSS 변수 기반 자동 전환 |

### 문제점

1. **accent 색상이 하나뿐** — 강조/경고/정보 구분 불가
2. **card-bg(#f2efe9) vs bg(#faf8f4) 명도 차 3.2%** — 거의 구분 안 됨
3. **다크모드 그림자가 여전히 rgba(0,0,0,...)** — 너무 강함

### 개선안

```css
/* card-bg 명도 차 확대 */
:root { --card-bg: #ebe7df; }              /* 3.2% → 6% */
[data-theme="dark"] { --card-bg: #2f2d28; } /* 대응 강화 */

/* 카테고리별 보조 accent (선택적) */
:root {
  --accent-tech:     #1e6fa0;  /* 파랑 */
  --accent-analysis: #d97e2f;  /* 주황 */
  --accent-fiction:  #8b4d9e;  /* 보라 */
  --accent-career:   #4a7c59;  /* 초록 */
}
```

---

## 2. 타이포그래피

### 폰트 스택

```css
--serif: 'Source Serif 4', 'Source Serif 4 Fallback', 'Pretendard Variable', serif;
--mono:  'JetBrains Mono', 'JetBrains Mono Fallback', 'Courier New', monospace;
```

### 크기 체계

| 요소 | 폰트 | 크기 | weight | 줄간격 |
|------|------|------|--------|--------|
| masthead h1 | serif | 3.2rem (모바일: 2.2rem) | 400/900 | 1.2 |
| section h2 | serif | 2rem (모바일: 1.5rem) | 700 | — |
| 본문 prose | serif | 1.05rem | 400 | 1.9 |
| pull-quote | serif | 1.5rem (모바일: 1.2rem) | 600 | 1.6 |
| 라벨 | mono | 0.6~0.8rem | 600~700 | — |
| 카드 제목 | serif | 1rem | 700 | — |
| 카드 설명 | serif | 0.85rem | 400 | — |

### 평가

- **강점**: 계층 명확, Source Serif 4 선택 세련됨
- **약점**: 한글 라벨이 mono 폰트 + 0.65rem → 가독성 낮음
- **약점**: fluid typography 미사용 (고정값 점프)

### 개선안

```css
/* 한글 라벨: mono → serif, 크기 상향 */
.series-divider-num,
.section-head .num {
  font-family: var(--serif);   /* mono 아님 */
  font-size: 0.8rem;            /* 0.6rem 아님 */
  letter-spacing: 2px;          /* 4px 아님 */
}

/* fluid typography */
.masthead h1 { font-size: clamp(2.2rem, 5vw, 3.2rem); }
.section-head h2 { font-size: clamp(1.5rem, 3vw, 2rem); }
```

---

## 3. 카드 디자인 (.article-card)

### 현재

```css
.article-card {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);  /* 거의 안 보임 */
  border-radius: 4px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.08);
}
```

### 문제점

- 정적 상태에서 카드 경계 불명확 (opacity 0.04)
- 모든 카드 썸네일 placeholder가 동일 ("Editorial")
- 다크모드에서 검정 그림자가 과도하게 강함

### 개선안

```css
/* 경계 명확화 */
.article-card {
  border: 1px solid var(--rule);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* 다크모드 그림자 보정 */
[data-theme="dark"] .article-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

/* 썸네일 시리즈 라벨 표시 */
.card-thumbnail::before {
  content: attr(data-series-label);
  position: absolute;
  bottom: 12px; right: 12px;
  font-family: var(--mono);
  font-size: 0.6rem;
  color: var(--muted);
  background: var(--bg);
  padding: 4px 8px;
  border-radius: 2px;
}
```

---

## 4. 시리즈 구분자 (.series-divider)

### 현재

```css
.series-divider {
  grid-column: 1 / -1;
  padding: 32px 0 12px;
  border-bottom: 2px solid var(--fg);
}
.series-divider-num { color: var(--accent); font-weight: 600; font-size: 0.65rem; }
.series-divider-title { font-size: 1.3rem; font-weight: 700; }
```

### 개선안: 좌측 보더 추가

```css
.series-divider {
  grid-column: 1 / -1;
  padding: 32px 0 12px 16px;
  border-bottom: 2px solid var(--fg);
  border-left: 4px solid var(--accent);  /* 좌측 컬러 바 */
}
```

---

## 5. 마스트헤드 (.masthead)

### 현재

```css
.masthead { margin-bottom: 48px; text-align: left; }
.masthead h1 { font-size: 3.2rem; font-weight: 400; }
.masthead h1 strong { font-weight: 900; color: var(--accent); }
```

### 개선안: site-label 강화

```css
.masthead .site-label {
  position: relative;
  padding-left: 12px;
}
.masthead .site-label::before {
  content: '';
  position: absolute;
  left: 0; top: 50%;
  transform: translateY(-50%);
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--accent);
}
```

---

## 6. 검색 포커스 피드백

### 현재

```css
.search-input:focus { border-color: var(--fg); }
```

### 개선안

```css
.search-input:focus {
  border-color: var(--fg);
  box-shadow: 0 0 0 3px rgba(196, 62, 42, 0.05);
}
```

---

## 7. 글 페이지 디자인

### 레이아웃 (양호)

| 지표 | 값 | 평가 |
|------|-----|------|
| 최대폭 | 780px | 좋음 (55~80 char/line) |
| 패딩 (데스크) | 40px | 적절 |
| 패딩 (모바일) | 24px | 적절 |
| 본문 크기 | 1.05rem | 좋음 |
| 줄간격 | 1.9 | 좋음 |

### 개선 필요 사항

1. **pull-quote attribution 크기**: 0.75rem → 0.85rem (가독성 향상)
2. **코드블록 스타일 가이드**: 기술 시리즈가 많은데 `<pre><code>` 전용 스타일 미정의
3. **secondary 텍스트**: 색상만 다르고 size/weight 동일 → 시각 구분 약함

```css
/* secondary 시각 구분 강화 */
.secondary {
  color: var(--secondary);
  font-size: 0.95rem;   /* 1.05rem 아님 */
  line-height: 1.7;     /* 1.9 아님 */
}
```

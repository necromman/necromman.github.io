# 시리즈 기획서: Git, pair 없이 살아남기

> **시리즈 슬러그:** `git-series`
> **시리즈 번호:** Series 09
> **기획일:** 2026-02-09
> **상태:** 콘텐츠 제작 완료

---

## 1. 시리즈 컨셉

### 핵심 질문
"233만 한국 개발자 중 52%가 매달 Git으로 고생한다 — 당신은 Git을 '쓰고' 있는가, '당하고' 있는가?"

### 타겟 독자
- **주니어 개발자**: commit, push, pull만 아는 단계. 실수하면 패닉
- **경력 1~3년차**: 브랜치 전략, 리베이스에 대한 막연한 불안감
- **시니어/리드**: 팀 워크플로우를 설계해야 하는데 근거가 필요한 사람
- **비전공 바이브 코더**: AI로 코드는 만들지만 Git은 블랙박스인 사람

### 시리즈 톤
- 실수 사례를 극적으로 전개하되, 해결책은 실용적으로
- 명령어 나열이 아닌 "시나리오 → 명령어 → 결과" 스토리텔링
- 한국 개발 현장(카카오, 네이버, 토스, 배민) 맥락 적극 반영
- "이걸 모르면 손해"라는 발견의 재미 강조

### 시리즈 구조 (5편)
| # | 제목 | 역할 | 태그 |
|---|------|------|------|
| 01 | commit, push, 기도 — 주니어의 Git | 입문/정리 | Git, 입문, 명령어, 워크플로우 |
| 02 | force push 하나로 팀을 멸망시키는 법 | 실수/복구 | Git, 실수, 복구, reflog, 보안 |
| 03 | git bisect를 아는 사람은 1%뿐이다 | 숨은 기능 | Git, 고급, bisect, worktree, rerere |
| 04 | 브랜치 전략은 팀의 거울이다 | 실무/전략 | Git, 워크플로우, 브랜치, PR, 코드리뷰 |
| 05 | .gitconfig 하나로 생산성 2배 | 추천/설정 | Git, 도구, 설정, 생산성 |

---

## 2. 자료조사 요약

### 2-1. Git 시장 및 사용 통계

| 지표 | 수치 | 출처 |
|------|------|------|
| Git 시장 점유율 (VCS 중) | 93.87% | RhodeCode 2025 |
| GitHub 전 세계 개발자 | 1억 명+ | GitHub 2024 |
| GitHub 저장소 수 | 4억+ | GitHub Octoverse 2024 |
| 한국 GitHub 활동 개발자 | 233만 명+ | GitHub Korea 2024 Q4 |
| 매달 Git으로 고생하는 개발자 | 52.2% | Hutte Survey |
| Git으로 절대 고생하지 않는 개발자 | 7% | Hutte Survey |
| Stack Overflow Git 질문 수 (학술 분석) | 80,370개 | ACM 연구 |

### 2-2. 가장 흔한 Git 실수

| 실수 | 경험 비율 | 출처 |
|------|-----------|------|
| 잘못된 브랜치에 커밋 | ~60% | Hutte/GitKraken |
| 머지 충돌 경험 | ~90% | Hutte |
| 민감한 데이터(API 키 등) 커밋 | ~30% | Hutte |
| force push로 동료 작업 덮어쓰기 | ~15% (피해: 45%) | Hutte |
| git reset/revert로 작업 되돌리기 | 80% | Hutte |
| rebase를 어렵고 에러 발생하기 쉽다고 느낌 | ~55% | Hutte |
| 명령어를 완전히 이해하지 못한 채 사용 | 70% | Hutte |

### 2-3. 시크릿 유출 통계 (GitGuardian)

| 연도 | GitHub 시크릿 유출 건수 | 전년 대비 |
|------|------------------------|-----------|
| 2022 | ~1,000만 건 | — |
| 2023 | 1,280만 건 | +28% |
| 2024 | 2,380만 건 | +25% |

- 2022년 유출 시크릿 중 **70%가 2024년에도 여전히 활성 상태**
- 유출된 GitHub 토큰의 **96%가 쓰기 권한** 보유
- OpenAI API 키 유출: 2022년 대비 **1,212배** 증가

### 2-4. 주요 사고 사례

| 사고 | 연도 | 핵심 내용 |
|------|------|-----------|
| Jenkins force push | 2013 | 150+ 레포가 1개월 전으로 롤백 |
| GitLab DB 삭제 | 2017 | 300GB 중 4.5GB만 남음, 6시간 데이터 손실, 유튜브 라이브 복구 |
| Gentoo 해킹 | 2018 | rm -rf 악성 코드 커밋, 2FA 미적용이 원인 |
| Uber AWS 키 유출 | 2016 | 5,700만 명 데이터 유출, $1.48억 합의 |
| Samsung Lapsus$ 해킹 | 2022 | 190GB 소스코드 유출, 6,600+ 시크릿 키 발견 |
| Twitter 소스코드 유출 | 2023 | 퇴사자가 3개월간 47커밋으로 핵심 코드 유출 |
| Mercedes-Benz 토큰 유출 | 2024 | 퍼블릭 레포에 토큰 커밋 → 전체 소스코드 접근 가능, 3개월 방치 |
| AI 도구의 git reset --hard | 2025-26 | Claude Code가 확인 없이 파괴적 명령 실행, 작업 소실 |

### 2-5. Git 최신 동향 (2024-2026)

| 버전 | 핵심 변경 |
|------|-----------|
| Git 2.47 (2024.10) | git backfill, git survey (실험적), 10-13% 성능 향상 |
| Git 2.48 (2025.01) | Meson 빌드 시스템, range-diff --remerge-diff |
| Git 2.49 (2025.03) | **Rust 코드 최초 도입**, zlib-ng (~25% 속도 향상), Name-Hash v2 (repack 96초→34초) |
| Git 2.50 (2025.06) | ORT 머지 엔진이 recursive 완전 대체, git maintenance 확장 |
| Git 2.51-52 (2025말) | Rust 확장, reftable 안정화 |

---

## 3. 시리즈 구성 (5편)

---

### 1편: commit, push, 기도 — 주니어의 Git

> **슬러그:** `git-junior-survival-guide`
> **역할:** 입문/정리 — 필수 명령어와 기본 워크플로우
> **태그:** Git, 입문, 명령어, 워크플로우

#### Part 구성

**Part 1: "일단 이것만 알면 죽지는 않는다"**
- init, clone, add, commit, push, pull — 생존 6종 세트
- `git status`를 습관처럼 치는 이유
- `git add -p`: 하나의 파일에서 버그 수정과 리팩토링을 분리하는 법
- 핵심 데이터: Stack Overflow에서 2번째로 많이 투표된 질문이 "커밋을 되돌리는 법" (150+ 답변)

**Part 2: "브랜치는 무서운 게 아니다"**
- branch, switch, merge의 관계
- `git switch` vs `git checkout`: 2019년 Git 2.23에서 분리된 이유
- 핵심 시나리오: "main에서 직접 개발하다 충돌 지옥에 빠진 신입"

**Part 3: "커밋 메시지, 미래의 나에게 보내는 편지"**
- Conventional Commits (feat, fix, docs, refactor...)
- 좋은 커밋 메시지 vs 나쁜 커밋 메시지 Before/After
- `git commit --amend`: 마지막 커밋을 수정하는 유일한 기회 (push 전에만!)

**Part 4: "이 워크플로우 하나로 시작하라 — GitHub Flow"**
- main + feature branch + PR의 단순한 흐름
- 한국 스타트업(토스, 당근, 배민)이 GitHub Flow를 쓰는 이유
- PR 작성법: 200-400줄 이하, What/Why/How to test 구조
- 핵심 데이터: Google 연구에서 리뷰 품질은 200줄 이하에서 정점

---

### 2편: force push 하나로 팀을 멸망시키는 법

> **슬러그:** `git-disaster-and-recovery`
> **역할:** 실수/복구 — 실제 사고 사례와 복구 기법
> **태그:** Git, 실수, 복구, reflog, 보안

#### Part 구성

**Part 1: "전설의 사고들"**
- Jenkins 150개 레포 강제 푸시 사고 (2013)
- GitLab 프로덕션 DB 삭제 + 유튜브 라이브 복구 (2017)
- "백업이 있다고 생각했지만 한 번도 작동한 적 없었다"
- AI 도구의 git reset --hard 사고 (2025-2026): Claude Code가 확인 없이 파괴적 명령 실행

**Part 2: "git reset --hard를 치고 3초 후"**
- reset --soft / --mixed / --hard 차이 (다이어그램)
- reflog: Git의 타임머신 — 90일간의 안전망
- 실전 복구 시나리오: `git reflog` → `git reset --hard HEAD@{n}`
- 핵심 제한: 커밋하지 않은 작업은 reflog로도 복구 불가
- `git fsck --lost-found`: 마지막 희망

**Part 3: "잘못된 브랜치에 커밋했다"**
- cherry-pick으로 커밋 옮기기
- 잘못된 머지 되돌리기: push 전(reset) vs push 후(revert -m 1)
- reset vs revert 완전 비교표
- 핵심 데이터: 잘못된 브랜치에 커밋한 경험 ~60%

**Part 4: "2,380만 개의 비밀이 새어나가는 곳"**
- GitGuardian 2024: GitHub에서 연간 2,380만 건 시크릿 유출
- 삼성 190GB 유출 사고: 6,600개 시크릿 키 (한국 독자 공감)
- Uber: GitHub 레포 한 줄이 $1.48억(~1,900억 원) 합의로
- Mercedes-Benz: 퍼블릭 레포의 토큰 하나로 전체 소스코드 접근
- 복구법: git filter-repo, BFG Repo-Cleaner
- 예방법: gitleaks, TruffleHog, GitHub Push Protection, pre-commit hooks

**Part 5: "--force-with-lease, 또는 팀을 지키는 방법"**
- `--force` vs `--force-with-lease` 차이
- Protected Branch 설정 (GitHub)
- 팀원이 force push로 내 작업을 날렸을 때 복구법
- 예방 체크리스트: 2FA, 브랜치 보호, 시크릿 스캔, 자주 커밋

---

### 3편: git bisect를 아는 사람은 1%뿐이다

> **슬러그:** `git-hidden-gems`
> **역할:** 숨은 기능 — 알면 생산성이 달라지는 고급 기능
> **태그:** Git, 고급, bisect, worktree, rerere

#### Part 구성

**Part 1: "500개 커밋에서 범인을 9번 만에 찾는 법 — git bisect"**
- 이진 탐색으로 버그 도입 커밋 찾기 (O(log n))
- 수동 bisect: `git bisect start` → `good/bad` → `reset`
- 자동 bisect: `git bisect run npm test` — 커피 한 잔의 시간
- exit code 125 = skip (빌드 불가 커밋 건너뛰기)
- old/new 대체 용어 (성능 회귀에서 good/bad가 어색할 때)

**Part 2: "두 브랜치를 동시에 여는 마법 — git worktree"**
- 하나의 .git으로 여러 디렉토리에서 동시 작업
- 시나리오: "리팩토링 중 긴급 핫픽스 요청 → stash 대신 worktree"
- AI 병렬 개발: 터미널 패널별 worktree + AI 어시스턴트
- matklad(rust-analyzer 개발자)의 worktree 중심 워크플로우
- 핵심 장점: 디스크 절약 (.git/objects 공유), 독립 빌드/서버 가능

**Part 3: "같은 충돌을 두 번 풀지 않는다 — git rerere"**
- rerere = REuse REcorded REsolution
- 한 줄 설정: `git config --global rerere.enabled true`
- 시나리오: feature 브랜치를 main에 머지하며 충돌 해결 → 리베이스 시 같은 충돌 → rerere가 자동 해결
- `.git/rr-cache/` 구조

**Part 4: "코드 고고학 — git blame과 git log의 숨겨진 힘"**
- `git blame -w -C -C`: 포매팅 커밋 무시 + 파일 간 코드 이동 추적
- `.git-blame-ignore-revs`: Prettier 돌린 커밋 blame에서 제외 (GitHub도 지원)
- `git log -L :함수명:파일명`: 특정 함수의 변경 이력 추적
- `git log -S "API_KEY"`: 특정 텍스트가 추가/삭제된 커밋 찾기 (pickaxe)
- `git shortlog -sn --all`: 기여자 랭킹

**Part 5: "스태시의 진짜 사용법, 그리고 더"**
- `git stash push -m "설명" -- 특정파일`: 파일 지정 스태시
- pop vs apply: pop은 삭제, apply는 보존 (안전)
- `git stash branch`: 스태시를 브랜치로 변환 (충돌 방지)
- Interactive Rebase: WIP 커밋들을 깔끔하게 정리 (pick, squash, fixup, reword, drop)
- `--autosquash` + `--fixup=` 워크플로우
- git archive: .git 없이 깨끗한 스냅샷 추출
- git notes: 커밋 해시를 바꾸지 않고 메타데이터 추가

---

### 4편: 브랜치 전략은 팀의 거울이다

> **슬러그:** `git-branching-strategies`
> **역할:** 실무/전략 — 워크플로우 비교와 팀 운영
> **태그:** Git, 워크플로우, 브랜치, PR, 코드리뷰

#### Part 구성

**Part 1: "세 가지 철학 — Git Flow vs GitHub Flow vs Trunk-Based"**
- Git Flow (Vincent Driessen, 2010): main/develop/feature/release/hotfix
  - 적합: 모바일 앱, 패키지 소프트웨어, 삼성/LG CNS 등 한국 대기업 SI
  - 단점: 복잡한 브랜치 구조, CD에 부적합
- GitHub Flow: main + feature branch + PR
  - 적합: 웹 서비스, SaaS, 토스/당근/배민 등 한국 스타트업
  - 핵심: PR 기반 코드 리뷰, 짧은 브랜치 수명
- Trunk-Based Development: main 직접 커밋 또는 1-2일 단기 브랜치
  - 적합: Google, Meta 스타일 대규모 모노레포
  - 전제: Feature Flag, 강력한 CI, 빠른 리뷰
  - 한국: 카카오뱅크, 토스가 도입 중

**Part 2: "브랜치 전략 선택 가이드"**
- 팀 규모별 추천: 1~3명 / 4~10명 / 10명+ / 대기업
- 배포 빈도별 추천: 주 1회 / 매일 / 하루 수십 회
- 의사결정 플로차트 (Yes/No 트리)
- "당신의 팀에 맞는 전략은 하나뿐이다" — 모든 전략의 장단점 비교표

**Part 3: "PR을 잘 쓰는 사람이 팀을 바꾼다"**
- PR 크기: 200-400줄 이하 (Google 연구)
- PR 구조: What changed / Why / How to test / Screenshots
- 한국 컨텍스트: Jira/Linear 티켓 번호 연동, Kakao Git Guide, Naver Works 연동
- Draft PR로 방향성 먼저 확인
- Conventional Commits 자동화: commitizen, commitlint, husky

**Part 4: "merge vs rebase vs squash — 히스토리 전쟁"**
- merge: 토폴로지 보존, merge commit 생성
- rebase: 선형 히스토리, 위험도 존재 (push 후 rebase 금지 황금률)
- squash merge: PR 단위 깔끔한 히스토리
- `git pull --rebase`: 한국 IT 기업(카카오, 네이버) 권장 기본 설정
- merge conflict 해결: VS Code 3-way merge editor, IntelliJ merge tool
- `git checkout --conflict=diff3`: base 포함 3-way 충돌 마커

**Part 5: "Git Hooks — 팀의 품질 게이트"**
- pre-commit: lint-staged + ESLint/Prettier 자동 실행
- commit-msg: Conventional Commits 검증
- pre-push: 테스트 실행
- husky (Node) / pre-commit (Python) 프레임워크
- `git rerere` + `merge.conflictstyle = zdiff3`로 충돌 해결 부담 감소

---

### 5편: .gitconfig 하나로 생산성 2배

> **슬러그:** `git-productivity-setup`
> **역할:** 추천/설정 — 도구, 설정, 트렌드
> **태그:** Git, 도구, 설정, 생산성

#### Part 구성

**Part 1: "Git 코어 개발자들의 .gitconfig — 3단계 추천"**
- Tier 1 "확실히 Git을 개선하는 것" (만장일치):
  - `push.autoSetupRemote = true`, `fetch.prune = true`, `diff.algorithm = histogram`
  - `branch.sort = -committerdate`, `column.ui = auto`
- Tier 2 "안 할 이유가 없는 것":
  - `rerere.enabled = true`, `commit.verbose = true`, `rebase.autoSquash = true`
  - `help.autocorrect = prompt`
- Tier 3 "취향의 영역":
  - `merge.conflictstyle = zdiff3`, `pull.rebase = true`, `core.fsmonitor = true`
- 출처: GitButler Blog (Git 코어 개발자 Spring Cleaning 설문)

**Part 2: "복붙하면 끝나는 .gitconfig 완성본"**
- 전체 권장 .gitconfig (user, core, push, pull, fetch, merge, diff, rebase, rerere, commit, help, branch, tag, column)
- 각 설정이 실제로 무엇을 하는지 1줄 설명
- 유명 개발자 dotfiles: Mathias Bynens(30k+ stars), Paul Irish, Scott Chacon(GitHub 공동창업자)

**Part 3: "터미널을 바꿔라 — delta, lazygit, gh"**
- delta: 문법 강조 diff, 단어 단위 변경 하이라이트, side-by-side
- lazygit: Go 기반 TUI, 한 화면에 status/log/diff/staging 동시 표시
- gitui: Rust 기반, 대규모 레포에서 최고 성능
- gh (GitHub CLI): `gh pr create`, `gh pr checkout`, `gh copilot suggest`
- VS Code: GitLens(4천만+ 설치), Git Graph
- 데스크톱 GUI: Fork($49.99), GitKraken, Sourcetree(무료)

**Part 4: "Git 2025-2026, 무엇이 바뀌었나"**
- Git 2.49: **Rust 코드 최초 도입** — Git의 미래
- Git 2.49: zlib-ng 지원 (~25% 속도 향상), Name-Hash v2 (repack 96초→34초)
- Git 2.50: ORT 머지 엔진이 recursive 완전 대체 ("삭제된 코드가 디버그된 코드다!")
- Sparse Checkout + Partial Clone: 모노레포 시대의 필수 조합
- SHA-256 전환 진행 중 (아직 실험적)
- Jujutsu (jj): Google 개발 차세대 VCS, Git 호환

**Part 5: "시크릿 스캐너, AI 커밋 메시지, 그리고 미래"**
- 시크릿 탐지 도구 비교: Gitleaks vs TruffleHog vs git-secrets vs GitHub Push Protection
- AI 커밋 메시지: GitHub Copilot, aicommits — 생산성 vs 품질 트레이드오프
- GitHub Copilot for CLI: `gh copilot suggest "undo last commit"`
- Monorepo 도구: Turborepo, Nx + sparse-checkout
- SSH 기반 커밋 서명 (GPG 대체, Git 2.34+)
- `git maintenance start`: 백그라운드 최적화 자동 스케줄
- Pro Git 한국어판 (무료): https://git-scm.com/book/ko/v2

---

## 4. 디자인 노트

### 시리즈 고유 컴포넌트

1. **명령어 박스**: 터미널 스타일 코드 블록 (JetBrains Mono, 어두운 배경, 복사 버튼 불필요 — 에디토리얼이므로)
2. **시나리오 카드**: "상황 → 명령어 → 결과" 3단계 플로우 (pull-quote 변형)
3. **비교표**: reset vs revert, merge vs rebase 등 대조 테이블 (editorial-base.css의 테이블 스타일 활용)
4. **사고 타임라인**: 주요 사고 사례의 시간순 흐름도 (mechanism-row 변형)
5. **경고 박스**: 위험한 명령어 사용 시 warning-box 활용
6. **통계 하이라이트**: 큰 숫자 강조 (accent 컬러 + 큰 폰트 사이즈)

### editorial-base.css 확장 필요사항
- 기존 `.code-block` 또는 `pre > code` 스타일로 충분 (JetBrains Mono 이미 포함)
- 터미널 출력 구분을 위한 약간의 인라인 스타일 추가 가능 (입력/출력 구분)
- 대조 테이블은 기존 prose 내 `<table>` 스타일 활용
- 추가 CSS 확장은 최소화 — 각 페이지 `<style>` 내 인라인으로 처리

---

## 5. 제작 순서

- [ ] **1편** 제작: `git-junior-survival-guide.html`
  - [ ] editorial-content-page + seo 스킬 적용
  - [ ] nav.js, series-nav.js 스크립트 포함
- [ ] **2편** 제작: `git-disaster-and-recovery.html`
- [ ] **3편** 제작: `git-hidden-gems.html`
- [ ] **4편** 제작: `git-branching-strategies.html`
- [ ] **5편** 제작: `git-productivity-setup.html`
- [ ] `series-nav.js` SERIES 데이터에 git-series 추가
- [ ] `assets/content-data.js`에 시리즈/글 데이터 추가
- [ ] `content/index.md` 업데이트
- [ ] `CLAUDE.md` 콘텐츠 관리 섹션에 시리즈 정보 추가
- [ ] 전체 시각적 검수 및 반응형 테스트

---

## 6. 참고 자료 (출처)

### 공식 문서 & 교육
| 출처 | URL |
|------|-----|
| Git 공식 문서 | https://git-scm.com/doc |
| Pro Git 한국어판 (무료) | https://git-scm.com/book/ko/v2 |
| GitHub 공식 가이드 | https://docs.github.com/en |
| Atlassian Git 튜토리얼 | https://www.atlassian.com/git/tutorials |

### 워크플로우
| 출처 | URL |
|------|-----|
| Git Flow (Vincent Driessen) | https://nvie.com/posts/a-successful-git-branching-model/ |
| GitHub Flow | https://docs.github.com/en/get-started/using-github/github-flow |
| Trunk-Based Development | https://trunkbaseddevelopment.com/ |
| Conventional Commits | https://www.conventionalcommits.org/ |

### 통계 & 보고서
| 출처 | URL |
|------|-----|
| Stack Overflow 2024 Developer Survey | https://survey.stackoverflow.co/2024/ |
| GitHub Octoverse 2024 | https://github.blog/news-insights/octoverse/octoverse-2024/ |
| GitGuardian State of Secrets Sprawl 2024 | https://www.gitguardian.com/state-of-secrets-sprawl-report-2024 |
| GitGuardian State of Secrets Sprawl 2025 | https://www.gitguardian.com/state-of-secrets-sprawl-report-2025 |
| Hutte Git Statistics (110 Statistics) | https://hutte.io/trails/git-based-development-statistics/ |
| RhodeCode VCS Popularity 2025 | https://rhodecode.com/blog/156/version-control-systems-popularity-in-2025 |
| 한국 GitHub 개발자 233만 명 | https://www.e4ds.com/sub_view.asp?ch=4&t=0&idx=20758 |
| ACM - Git 명령어 사용 분석 | https://dl.acm.org/doi/10.1145/3494518 |

### 사고 사례
| 출처 | URL |
|------|-----|
| Jenkins Force Push 사고 | https://news.ycombinator.com/item?id=6713742 |
| GitLab DB 삭제 사후 분석 | https://about.gitlab.com/blog/gitlab-dot-com-database-incident/ |
| Gentoo 해킹 공식 발표 | https://www.gentoo.org/news/2018/06/28/Github-gentoo-org-hacked.html |
| Twitter 소스코드 유출 (WashPost) | https://www.washingtonpost.com/technology/2023/03/27/twitter-source-code-leak-github/ |
| Samsung Lapsus$ 해킹 | https://www.securityweek.com/thousands-secret-keys-found-leaked-samsung-source-code/ |
| Mercedes-Benz 토큰 유출 | https://www.securityweek.com/leaked-github-token-exposed-mercedes-source-code/ |
| Uber 데이터 유출 ($1.48억 합의) | https://www.huntress.com/threat-library/data-breach/uber-data-breach |

### 도구 & 설정
| 출처 | URL |
|------|-----|
| Git 코어 개발자 .gitconfig 추천 | https://blog.gitbutler.com/how-git-core-devs-configure-git |
| Julia Evans - 인기 git config 옵션 | https://jvns.ca/blog/2024/02/16/popular-git-config-options/ |
| Oh Shit, Git!?! (복구 가이드) | https://ohshitgit.com/ |
| lazygit | https://github.com/jesseduffield/lazygit |
| delta (diff 도구) | https://github.com/dandavison/delta |
| Gitleaks | https://github.com/gitleaks/gitleaks |
| TruffleHog | https://github.com/trufflesecurity/trufflehog |
| BFG Repo-Cleaner | https://rtyley.github.io/bfg-repo-cleaner/ |
| Mathias Bynens dotfiles | https://github.com/mathiasbynens/dotfiles/blob/master/.gitconfig |
| Jujutsu (jj) 차세대 VCS | https://github.com/martinvonz/jj |

### Git 버전별 변경사항
| 출처 | URL |
|------|-----|
| Git 2.47 Highlights | https://github.blog/open-source/git/highlights-from-git-2-47/ |
| Git 2.48 Highlights | https://github.blog/open-source/git/highlights-from-git-2-48/ |
| Git 2.49 Highlights | https://github.blog/open-source/git/highlights-from-git-2-49/ |
| Git 2.50 Highlights | https://github.blog/open-source/git/highlights-from-git-2-50/ |
| Git Merge 2025 (20주년) | https://github.blog/open-source/git/20-years-of-git-2-days-at-github-hq-git-merge-2025-highlights/ |

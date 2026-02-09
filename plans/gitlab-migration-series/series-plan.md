# 시리즈 기획서: CTO의 깃랩 이사 공지가 불안한 이유

> **시리즈 슬러그:** `gitlab-migration-series`
> **시리즈 번호:** Series 10
> **기획일:** 2026-02-09
> **상태:** 기획 완료 → 콘텐츠 제작 중

## 1. 시리즈 컨셉

- **핵심 질문:** CTO가 "내일 깃랩 도메인 바꿉니다"라고 했을 때, 개발자는 어떻게 대응해야 하는가? 그리고 그 공지 자체가 맞는 방법인가?
- **타겟 독자:** 사내 GitLab을 쓰는 한국 중소/스타트업 개발자, 주니어~시니어 전 레벨. DevOps/인프라에 익숙하지 않은 백엔드/프론트 개발자가 주 타겟.
- **시리즈 톤:** 에디토리얼 분석 + 실전 가이드. CTO 공지문을 서두에 배치해 "내 이야기"로 느끼게 하고, 팩트 기반으로 문제를 짚은 뒤 구체적 대안을 제시한다.
- **출발점:** 실제 사내 공지문 (git.prost.team → git.prost.kr 마이그레이션, NAS → 전용 서버)

## 2. 자료조사 요약

### 2.1 GitLab 마이그레이션 방법론
- **공식 권장:** gitlab-backup create → 새 서버에서 restore (동일 버전 필수)
- **Docker 기반:** docker exec gitlab-backup create → 볼륨 tar → scp/rsync → 새 서버 복원
- **검증 명령어:** gitlab-rake gitlab:check SANITIZE=true, gitlab:doctor:secrets, gitlab:artifacts:check
- **출처:** GitLab Docs (backup_restore/migrate_to_new_server), Medium (Neural Engineer 시리즈)

### 2.2 도메인 변경의 영향 범위
- **Git remote:** 개발자 N명 × 리포지토리 M개 = N×M 수동 URL 변경
- **CI/CD:** include 지시자, trigger URL, 환경 URL, 아티팩트 URL, Runner 등록 토큰
- **Webhook:** Slack, Jira 등 외부 연동 프로젝트별 재설정 필요
- **Container Registry:** 이미지 태그에 호스트명 포함 → 전부 retag+repush 필요 (skopeo 활용)
- **Pages:** URL 변경 → 기존 링크 404
- **DB 내 URL:** 이슈/MR 설명의 하드코딩된 URL은 자동 갱신 안 됨
- **출처:** GitLab Forum, GitLab Issue #18383, Mike Street 블로그

### 2.3 더 나은 대안
- **Option A (권장):** 도메인 유지 + DNS A 레코드만 신규 서버 IP로 변경 → 개발자 작업 0건
- **Option B:** 리버스 프록시로 구 도메인 → 신 도메인 리디렉트 (HTTP만 가능, SSH 불가)
- **Option C:** 도메인 변경 불가피 시 최소 2주 병행 운영 + 301 리디렉트
- **출처:** Nick Janetakis (Zero Downtime Domain Transfer), Mike Street (3-week migration)

### 2.4 CTO 공지문 분석 (문제점)
- 24시간 미만 사전 공지 (ITIL Normal Change 기준 최소 2주)
- 토요일 저녁 컷오프 → 일요일 이전 → 월요일 출근하면 전부 깨져있는 상황
- "다시 push 해달라"는 요청 — 데이터 유실 리스크
- 구 서버 내부 IP 제거 → 롤백 불가능
- DNS 리디렉트/병행 운영 없음

### 2.5 한국 맥락 (NAS + GitLab)
- 시놀로지 NAS에서 Docker GitLab 운영 사례 다수 (DS220+, 2GB RAM 부족 문제)
- DSM 7.0부터 GitLab 패키지 지원 중단 → Docker 직접 설치 필요
- GitLab 최소 권장: 8 vCPU, 16GB RAM (1,000 유저 기준)
- NAS의 4코어/8GB는 사실상 한계
- 출처: bearpooh.com, haservi.github.io, GitLab Docs requirements

## 3. 시리즈 구성 (3편)

### 1편: 내일 GitLab 주소 바뀝니다
- **슬러그:** `gitlab-migration-notice-anatomy`
- **역할:** CTO 공지문 해부 — 무엇이 문제이고, 왜 불안한가
- **태그:** 분석

**Part 구성:**
- Part I: 공지문 전문 + 맥락 (NAS → 전용 서버, .team → .kr)
- Part II: 도메인 변경 시 깨지는 7가지 (remote, CI/CD, webhook, registry, Pages, DB URL, 북마크)
- Part III: ITIL 변경관리 프레임워크로 본 이 공지의 문제점
- Closing: "서버를 옮기는 건 맞다. 도메인까지 바꾸는 건 다른 문제다."

### 2편: GitLab 서버 이사 — 정석은 이렇다
- **슬러그:** `gitlab-migration-the-right-way`
- **역할:** NAS → 전용 서버 마이그레이션 정석 가이드 + 도메인 전략
- **태그:** 가이드

**Part 구성:**
- Part I: NAS GitLab의 한계 (메모리/CPU, DSM 7 지원 중단, 성능 저하)
- Part II: 마이그레이션 3가지 방법 비교 (backup/restore, Docker 볼륨 이전, 프로젝트 export)
- Part III: 도메인 전략 — DNS만 바꾸기 vs 도메인 변경 vs 리버스 프록시
- Part IV: 올바른 마이그레이션 타임라인 (4주 플랜)
- Closing: "가장 좋은 마이그레이션은 아무도 모르게 끝나는 마이그레이션이다."

### 3편: 월요일 아침, git push가 안 될 때
- **슬러그:** `gitlab-migration-developer-survival`
- **역할:** 개발자 관점 생존 가이드 — 스크립트, 체크리스트, 제안 방법
- **태그:** 실전

**Part 구성:**
- Part I: 월요일 아침 시나리오 — remote 변경, SSH 키 확인, .gitmodules
- Part II: 한 방에 해결하는 자동화 스크립트 (bash one-liner ~ 전체 워크스페이스 스크립트)
- Part III: CTO에게 제안하는 더 나은 방법 (DNS 유지 제안 템플릿)
- Part IV: 체크리스트 — 마이그레이션 전/중/후 개발자 할 일
- Closing: "좋은 인프라 변경은 개발자가 눈치채지 못하는 변경이다."

## 4. 디자인 노트

### 시리즈 고유 컴포넌트
- **공지문 인용 박스:** CTO 공지문 전문을 시각적으로 구분하여 배치 (card-bg 배경, border-left accent)
- **코드 블록:** bash 명령어, gitlab.rb 설정, 스크립트 코드 다수 포함
- **비교 테이블:** 마이그레이션 방법 비교, 도메인 전략 비교
- **타임라인:** 4주 마이그레이션 플랜
- **체크리스트:** warning-box 스타일로 마이그레이션 전/중/후 체크리스트

### editorial-base.css 확장 필요사항
- 기존 컴포넌트로 충분. 코드 블록, 시나리오 박스는 git-series에서 사용한 패턴 재활용.

## 5. 제작 순서

- [x] 자료조사
- [x] 기획서 작성
- [ ] 1편 HTML 제작
- [ ] 2편 HTML 제작
- [ ] 3편 HTML 제작
- [ ] content-data.js 업데이트
- [ ] series-nav.js 업데이트
- [ ] content/index.md 업데이트
- [ ] CLAUDE.md 시리즈 정보 추가

## 6. 참고 자료 (출처)

### 공식 문서
- GitLab Docs — Migrate to a New Server: https://docs.gitlab.com/administration/backup_restore/migrate_to_new_server/
- GitLab Docs — Backup: https://docs.gitlab.com/administration/backup_restore/backup_gitlab/
- GitLab Docs — Configuration: https://docs.gitlab.com/omnibus/settings/configuration/
- GitLab Docs — Installation Requirements: https://docs.gitlab.com/install/requirements/
- GitLab Docs — Docker Backup: https://docs.gitlab.com/install/docker/backup/
- GitLab Docs — Update Git Remote URL: https://docs.gitlab.com/tutorials/update_git_remote_url/
- GitLab Docs — Project Webhooks API: https://docs.gitlab.com/api/project_webhooks/
- GitLab Docs — Maintenance Rake Tasks: https://docs.gitlab.com/ee/administration/raketasks/maintenance.html

### 커뮤니티/블로그
- Mike Street — Migrate GitLab to New Domain: https://www.mikestreety.co.uk/blog/migrate-your-gitlab-instance-to-a-new-domain/
- Medium (Neural Engineer) — Docker GitLab Migration: https://medium.com/neural-engineer/
- Copdips — Migrate GitLab in Docker: https://copdips.com/2018/10/migrate-gitlab-in-docker.html
- Nick Janetakis — Zero Downtime Domain Transfer: https://nickjanetakis.com/blog/how-to-transfer-a-domain-name-with-zero-downtime
- Inwerken — GitLab Simply Migrate: https://www.inwerken.de/gitlab-simply-migrate/

### 한국 맥락
- bearpooh.com — Docker로 GitLab 설정하기: https://www.bearpooh.com/61
- haservi.github.io — Synology NAS GitLab 설치: https://haservi.github.io/posts/devops/docker/nas-docker-gitlab-setting/
- ux.stories.pe.kr — 시놀로지 Docker GitLab 502 에러: https://ux.stories.pe.kr/83

### 변경관리/프레임워크
- ITIL Change Management: https://sharegate.com/blog/change-management-in-itil
- ManageEngine — Enterprise IT Change Management Framework: https://www.manageengine.com/academy/enterprise-it-change-management-framework.html
- Atlassian — Migration Communication Email Templates: https://www.atlassian.com/migration/plan/cloud-adoption-guide/email-templates

### GitLab 이슈/포럼
- GitLab Forum — Changing External URL: https://forum.gitlab.com/t/about-changing-the-gitlab-external-url/96572
- GitLab Forum — Redirect Old to New URL: https://forum.gitlab.com/t/how-to-redirect-old-to-new-external-url-after-changing-the-external-url/19021
- GitLab Forum — Docker Image Migration: https://forum.gitlab.com/t/gitlab-server-domain-migration-how-to-migrate-docker-images/12833
- GitLab Issue #18383 — Path Updates Break Container Registry: https://gitlab.com/gitlab-org/gitlab/-/issues/18383

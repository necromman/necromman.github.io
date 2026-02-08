Git 작업영역의 모든 변경사항을 커밋하고 푸시한다.

1. `git status`로 변경 파일 목록을 확인한다
2. 변경사항이 없으면 "커밋할 변경사항이 없습니다"라고 알려주고 종료한다
3. 변경사항이 있으면:
   - `git diff --stat`으로 변경 내역 요약을 확인한다
   - 최근 커밋 메시지 스타일을 참고한다
   - 변경 내용을 분석하여 한글 커밋 메시지를 자동 작성한다
   - `nul` 같은 Windows 아티팩트, `.env`, credentials 등 민감한 파일은 제외한다
   - 나머지 모든 파일을 `git add`한다
   - 커밋 메시지 끝에 `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`을 포함한다
   - `git push`로 원격에 푸시한다
4. 결과를 간결하게 요약한다

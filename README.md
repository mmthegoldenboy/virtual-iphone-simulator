# Virtual iPhone Simulator

이 프로젝트는 실제 iPhone처럼 보이는 가상 모바일 화면을 담은 Next.js 웹사이트입니다.

## 실행 방법

1. 의존성 설치
   ```bash
   npm install
   ```
2. 개발 서버 실행
   ```bash
   npm run dev
   ```
3. 브라우저에서 열기
   ```text
   http://localhost:3000
   ```

## 주요 기능

- 잠금 화면
- 잠금 해제 후 홈 화면
- 메시지 목록 / 대화 화면
- 메모 목록 / 상세 화면 / 잠금 메모 확인
- 열람 불가 앱의 안내 팝업
- 이미지가 없을 때 기본 배경과 아이콘으로 동작

## 데이터 수정

- `data/apps.ts`: 앱 목록과 아이콘 설정
- `data/contacts.ts`: 연락처 및 메시지 미리보기 수정
- `data/conversations.ts`: 대화 메시지 추가/수정
- `data/notes.ts`: 메모 및 잠금 메모 비밀번호 수정
- `data/notifications.ts`: 잠금 화면 알림 수정

## 이미지 추가

- `public/images/` 폴더에 파일을 넣으면 됩니다.
- 예시: `lockscreen.svg`, `homescreen.svg`, `messages.svg`, `notes.svg`, `chat-bg.svg`, `notes-bg.svg`
- 파일명이 없으면 기본 배경과 아이콘으로 화면이 정상 동작합니다.

## 배포 준비

Netlify는 저장소의 `netlify.toml` 설정에 따라 `npm run build`를 실행하고, 생성된 `out` 폴더를 게시합니다. 이 프로젝트는 Next.js 정적 내보내기(`output: "export"`)를 사용하므로 게시 폴더는 `out`이어야 합니다.

배포가 완료되면 https://ilyarozanov-rookie.netlify.app/ 에서 사이트를 열 수 있습니다.

## 추가로 바꾸기

- 메시지 텍스트와 순서: `data/conversations.ts`
- 메모 내용: `data/notes.ts`
- 홈 화면 앱 이름: `data/apps.ts`
- 잠금 화면 알림: `data/notifications.ts`

문제가 있으면 데이터 파일만 수정하면 화면이 바로 반영됩니다.
